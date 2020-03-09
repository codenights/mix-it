import { createLogger, LoggerOptions, transports } from 'winston'

import config from '../config'

type LoggerFn = (message: string, context?: object) => void
interface Logger {
  debug: LoggerFn
  info: LoggerFn
  warn: LoggerFn
  error: LoggerFn
}

const logLevel = config.log.level ?? config.env === 'production' ? 'error' : 'debug'

const options: LoggerOptions = {
  transports: [
    new transports.Console({
      level: logLevel
    }),
    new transports.File({ filename: 'debug.log', level: 'debug' })
  ]
}

export const logger: Logger = createLogger(options)
