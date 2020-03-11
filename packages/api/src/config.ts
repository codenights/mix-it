import convict from 'convict'
import dotenv from 'dotenv'

dotenv.config()

const config = convict({
  env: {
    env: 'NODE_ENV',
    format: ['production', 'test', 'development'],
    default: 'development'
  },
  host: {
    env: 'HOST',
    format: String
  },
  port: {
    env: 'PORT',
    format: 'port',
    default: 3000
  },
  log: {
    level: {
      env: 'LOG_LEVEL',
      format: ['debug', 'info', 'warn', 'error']
    }
  }
})

config.validate()

export default config.get()
