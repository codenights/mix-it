import Http from 'http'
import { Http2Server } from 'http2'
import { Server as WebSocketServer } from 'socket.io'

import createHttpServer from './http-server'
import createWebsocketServer from './websocket-server'
import { logger } from './core'
import config from './config'

interface App {
  http: Http.Server | Http2Server
  ws: WebSocketServer
  start(): Promise<void>
  stop(): Promise<void>
}

interface AppOptions {
  host?: string
  port?: number
}

export function createApp(opts: AppOptions = config): App {
  const http = createHttpServer()
  const ws = createWebsocketServer(http)
  return {
    http,
    ws,
    async start(): Promise<void> {
      return new Promise(resolve => {
        http.listen(opts, () => {
          logger.info(`App running on port ${opts.port}`)
          resolve()
        })
      })
    },
    async stop(): Promise<void> {
      return new Promise((resolve, reject) => {
        http.close((err?: Error) => {
          if (err) return reject(err)
          resolve()
        })
      })
    }
  }
}

export default createApp
