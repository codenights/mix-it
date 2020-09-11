import { Socket } from 'socket.io'

import { PartyRepository } from '../party-repository'
import { Party } from '../party'
import { MissingPartyError } from '../../core/errors'
import { cleanUp, logger } from '../../core'
import withPlaylist from './playlist'
import { SongEvents } from './song'

export interface WithHostOptions {
  partyRepository: PartyRepository
}

export enum HostEvents {
  HOST_JOIN = 'host:join',
  HOST_JOINED = 'host:joined',
  HOST_LEAVE = 'host:leave',
  HOST_LEFT = 'host:left'
}

export const withHost = (opts: WithHostOptions) => (socket: Socket): Socket => {
  const { partyRepository } = opts

  socket.on(HostEvents.HOST_JOIN, async (partyId: string, onHostJoined?: Function) => {
    const party: Party | null = await partyRepository.get(partyId)
    if (!party) {
      const error = new MissingPartyError(partyId)
      return onHostJoined?.(error)
    }

    socket.join(partyId, err => {
      if (err) throw err

      // Register playlist event listeners
      withPlaylist({ partyRepository, party })(socket)

      socket.once(HostEvents.HOST_LEAVE, () => {
        logger.info(`The host ${socket.id} left the party ${partyId}`)
        socket.broadcast.emit(HostEvents.HOST_LEFT)
        cleanUp(socket, [SongEvents.SONG_SUBMIT])
        // Set up again
        withHost(opts)(socket)
      })

      // Acknowledge the room was joined
      logger.debug(`The host ${socket.id} joined the party ${partyId}`)
      onHostJoined?.()
    })
  })
  return socket
}
