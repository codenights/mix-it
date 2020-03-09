import { Namespace, Server, Socket } from 'socket.io'

import { logger, MissingPartyError } from '../../core'
import createPartyRepository, { PartyRepository } from '../party-repository'
import { Party } from '../party'

const partyRepository: PartyRepository = createPartyRepository()

interface PartyJoinOptions {
  clientType: 'host' | 'client'
  partyId: string
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
          const party: Party = await partyRepository.addSong(partyId, song)
          logger.info(`Added song ${song} to the party ${partyId}`)
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
