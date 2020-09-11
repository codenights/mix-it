import { createLogger, LoggerOptions, transports } from 'winston'

import config from '../config'

type LoggerFn = (message: string, context?: object) => void
interface Logger {
  debug: LoggerFn
  info: LoggerFn
  warn: LoggerFn
  error: LoggerFn
}

const options: LoggerOptions = {
  transports: [
    new transports.Console({
      level: config.log.level
    }),
    new transports.File({ filename: 'debug.log', level: 'debug' })
  ]
}

export const logger: Logger = createLogger(options)
