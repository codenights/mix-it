import compose from 'koa-compose'
import createRouter, { Joi } from 'koa-joi-router'

import createPartyController from './party-controller'
import createPartyRepository from '../party-repository'

const partyRepository = createPartyRepository()
const partyController = createPartyController(partyRepository)
const partyRouter = createRouter()
  .route({
    method: 'post',
    path: '/parties',
    validate: {
      body: Joi.object({
        owner: Joi.string().required()
      }).required()
    },
    handler: partyController.create
  })
  .get('/parties/:id', partyController.show)

export default partyRouter
