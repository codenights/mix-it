import { Server as HttpServer } from 'http'
import io, { Server, Socket } from 'socket.io'

import { logger } from './core'
import { createPartyNamespace } from './party/ws/party-router'

export function createWebsocketServer(http: HttpServer): Server {
  const webSocketServer = io(http)

  createPartyNamespace(webSocketServer)

  webSocketServer.on('connection', (socket: Socket) => {
    logger.debug(`Socket ${socket.id} connected`)
  })

  return webSocketServer
}

export default createWebsocketServer
