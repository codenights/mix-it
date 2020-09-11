import cors from '@koa/cors'
import { createServer, Server as HttpServer } from 'http'
import { Http2Server } from 'http2'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import morgan from 'koa-morgan'

import { errorHandler } from './core'
import partyModule from './party'

export function createHttpServer(): HttpServer | Http2Server {
  const koa = new Koa()

  // Register middlewares
  koa.use(errorHandler())
  koa.use(morgan('dev'))
  koa.use(bodyParser())
  koa.use(cors())

  // Register API modules
  koa.use(partyModule)

  return createServer(koa.callback())
}

export default createHttpServer
