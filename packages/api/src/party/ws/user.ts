import { name } from 'faker'
import { Socket } from 'socket.io'

import { PartyRepository } from '../party-repository'
import { Party } from '../party'
import withSong, { withoutSong } from './song'
import { MissingPartyError } from '../../core/errors'
import { logger } from '../../core'

export interface WithUserOptions {
  partyRepository: PartyRepository
}

const users: Map<string, User> = new Map()

function cleanUp(socket: Socket): void {
  users.delete(socket.id)
  socket.leaveAll()
  withoutSong(socket)
  const events: string[] = []
  events.forEach(event => {
    socket.removeAllListeners(event)
  })
}

export interface User {
  socket: Socket
  name: string
}

export enum UserEvents {
  USER_JOIN = 'user:join',
  USER_JOINED = 'user:joined',
  USER_LEAVE = 'user:leave',
  USER_LEFT = 'user:left'
}

export const generateName: () => string = name.findName

export const withUser = (opts: WithUserOptions) => (socket: Socket): Socket => {
  const { partyRepository } = opts

  socket.on(UserEvents.USER_JOIN, async (partyId: string, onUserJoined?: Function) => {
    const party: Party | null = await partyRepository.get(partyId)
    if (!party) {
      const error = new MissingPartyError(partyId)
      return onUserJoined(error)
    }

    socket.join(partyId, err => {
      if (err) throw err

      // Add this user to the map
      const user: User = { socket, name: generateName() }
      users.set(socket.id, user)

      // Register song event listeners
      withSong({ partyRepository: opts.partyRepository, party })(socket)

      socket.once(UserEvents.USER_LEAVE, () => {
        logger.info(`Socket ${socket.id} left the party ${partyId}`)
        socket.emit(UserEvents.USER_LEFT)
        cleanUp(socket)
        // Set up again
        withUser(opts)(socket)
      })

      // Acknowledge the room was joined
      logger.debug(`The user ${users.get(socket.id)?.name} joined the party ${partyId}`)
      onUserJoined?.()
      socket.to(partyId).emit(
        UserEvents.USER_JOINED,
        Array.from(users.values()).map(users => users.name)
      )
    })

    socket.on('disconnect', () => {
      users.delete(socket.id)
      socket.to(partyId).emit(
        UserEvents.USER_LEFT,
        Array.from(users.values()).map(users => users.name)
      )
    })
  })
  return socket
}
