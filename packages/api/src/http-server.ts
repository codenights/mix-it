import Koa from 'koa'

import config from './config'
import host from './host'

export interface Server {
  callback: any
  start(): Promise<number>
}

export interface ServerOptions {
  port: number
}

export function createServer(opts: ServerOptions = config): Server {
  const koa = new Koa()
  const listen = (port: number) => new Promise(resolve => koa.listen(port, resolve))

  // Register API modules
  koa.use(host)
  return {
    callback: koa.callback(),
    async start(): Promise<number> {
      await listen(opts.port)
      return opts.port
    }
  }
}

export function createTestServer() {
  return createServer().callback
}

export default createServer
