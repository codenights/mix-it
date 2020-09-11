import createApp from '../src/app'
import { logger } from '../src/core'

const app = createApp()
app.start().catch(logger.error)
