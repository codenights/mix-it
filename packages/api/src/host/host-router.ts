import Router from '@koa/router'
import compose from 'koa-compose'

import createHostController from './host-controller'

const hostController = createHostController()
const hostRouter = new Router().get('/hosts', hostController.index)

export default compose([hostRouter.routes(), hostRouter.allowedMethods()])
