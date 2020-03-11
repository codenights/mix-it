import convict from 'convict'

export interface Configuration {
  env: string
  api: string
}

const config = convict<Configuration>({
  env: {
    env: 'NODE_ENV',
    format: ['development', 'test', 'production'],
    default: 'development'
  },
  api: {
    env: 'VUE_APP_API',
    format: String,
    default: 'http://localhost:3000'
  }
})

config.validate()

export default config.get()
