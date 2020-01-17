import { createLogger, LoggerOptions, transports } from 'winston'

type LoggerFn = (message: string) => void
interface Logger {
  debug: LoggerFn
  info: LoggerFn
  warn: LoggerFn
  error: LoggerFn
}

const options: LoggerOptions = {
  transports: [
    new transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug'
    }),
    new transports.File({ filename: 'debug.log', level: 'debug' })
  ]
}

const logger: Logger = createLogger(options)

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level')
}

export default logger
