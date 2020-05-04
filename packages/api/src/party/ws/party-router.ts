import { Namespace, Server, Socket } from 'socket.io'

import { logger, MissingPartyError } from '../../core'
import createPartyRepository, { PartyRepository } from '../party-repository'
import { Party } from '../party'

const partyRepository: PartyRepository = createPartyRepository()

interface PartyJoinOptions {
  clientType: 'host' | 'client'
  partyId: string
}

function makeSafeSongId(song: string): string {
  const res = song.match(/https:\/\/youtu\.be\/([-_a-zA-Z0-9]*)|https:\/\/www\.youtube\.com\/watch\?v=([-_a-zA-Z0-9]*)/)
  if (res) {
    return res[1] || res[2]
  }
  return song
}

export function createPartyNamespace(server: Server): Namespace {
  function cleanUp(socket: Socket): void {
    socket.leaveAll()
    const events: string[] = ['playlist', 'song:submit']
    events.forEach(event => {
      socket.removeAllListeners(event)
    })
  }

  function setUp(socket: Socket): void {
    socket.on('room:join', async (opts: PartyJoinOptions, onRoomJoined: Function) => {
      // TODO: validate every input
      const { partyId } = opts
      const party: Party | null = await partyRepository.get(partyId)
      if (!party) {
        const error = new MissingPartyError(partyId)
        return onRoomJoined(error)
      }

      const room = () => socket.nsp.to(partyId)

      // Join the room
      socket.join(partyId, err => {
        if (err) throw err

        logger.debug(`Socket ${socket.id} joined the party ${partyId}`)
        socket.on('song:submit', async (song: string, onSongSubmitted?: Function) => {
          logger.info(`Song received ${song} to the party ${partyId}`)
          const safeSong = makeSafeSongId(song)
          const party: Party = await partyRepository.addSong(partyId, safeSong)
          logger.info(`Added song ${safeSong} to the party ${partyId}`)
          onSongSubmitted?.()
          room().emit('playlist', party.playlist)
        })

        socket.on('room:leave', () => {
          socket.leave(partyId)
          logger.info(`Socket ${socket.id} left the party ${partyId}`)
          socket.broadcast.emit('room:left')
          cleanUp(socket)
          setUp(socket)
        })

        socket.on('playlist:unshift', async () => {
          const party: Party = await partyRepository.unshiftPlaylist(partyId)
          logger.info(`Socket ${socket.id} unshift the playlist, new value:  ${party.playlist.join(',')}`)
          room().emit('playlist', party.playlist)
        })

        // Acknowledge the room was joined
        onRoomJoined?.()
      })
    })
  }

  return server.of('/parties').on('connection', (socket: Socket) => {
    setUp(socket)
    // When a socket disconnects
    socket.on('disconnect', () => {
      logger.debug(`Socket ${socket.id} disconnected`)
    })
  })
}

export default createPartyNamespace
