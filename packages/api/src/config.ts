import convict from 'convict'
import dotenv from 'dotenv'

dotenv.config()

export interface Configuration {
  env: string
  port: number
  log: {
    level: string
  }
  host?: string
}

const config = convict<Configuration>({
  env: {
    env: 'NODE_ENV',
    format: ['production', 'test', 'development'],
    default: 'development'
  },
  host: {
    env: 'HOST',
    format: String,
    default: undefined
  },
  port: {
    env: 'PORT',
    format: 'port',
    default: 3000
  },
  log: {
    level: {
      env: 'LOG_LEVEL',
      format: ['debug', 'info', 'warn', 'error'],
      default: 'debug'
    }
  }
})

config.validate()

export default config.get()
