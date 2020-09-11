import { Http2Server } from 'http2'
import io, { Server } from 'socket.io'

import { logger } from './core'
import createPartyNamespace from './party/ws/party-router'

export function createWebsocketServer(http: Http2Server): Server {
  const webSocketServer = io(http)

  createPartyNamespace(webSocketServer)

  webSocketServer.on('connection', socket => {
    logger.debug(`Socket ${socket.id} connected`)
  })

  return webSocketServer
}

export default createWebsocketServer
