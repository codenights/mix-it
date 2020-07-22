import { flow } from 'fp-ts/lib/function'
import { Namespace, Server, Socket } from 'socket.io'

import { logger } from '../../core'
import createPartyRepository, { PartyRepository } from '../party-repository'
import { withHost } from './host'
import { withUser } from './user'

const partyRepository: PartyRepository = createPartyRepository()

export function createPartyNamespace(server: Server): Namespace {
  return server.of('/parties').on('connection', (socket: Socket) => {
    flow(withHost({ partyRepository }), withUser({ partyRepository }))(socket)

    // When a socket disconnects
    socket.on('disconnect', () => {
      logger.debug(`Socket ${socket.id} disconnected`)
    })
  })
}

export default createPartyNamespace
