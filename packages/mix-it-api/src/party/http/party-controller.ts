import { Middleware } from '@koa/router'
import { constants } from 'http2'
import shortid from 'shortid'

import { PartyRepository } from '../party-repository'
import { Party } from '../party'

export interface PartyController {
  create: Middleware
  show: Middleware
}

export default function createPartyController(partyRepository: PartyRepository): PartyController {
  return {
    /**
     * POST /parties
     * @param ctx
     */
    async create(ctx): Promise<void> {
      const { body } = ctx.request
      const party: Party = await partyRepository.create({
        ...body,
        playlist: [],
        id: shortid.generate()
      })
      ctx.status = constants.HTTP_STATUS_CREATED
      ctx.body = party
      ctx.type = 'application/json'
      ctx.set('Location', `/parties/${party.id}`)
    },

    async show(ctx): Promise<void> {
      const { id } = ctx.params
      const party: Party = await partyRepository.get(id)
      if (!party) {
        return ctx.throw(constants.HTTP_STATUS_NOT_FOUND, `Party "${id}" not found.`)
      }
      ctx.body = party
      ctx.status = constants.HTTP_STATUS_OK
      ctx.type = 'application/json'
    }
  }
}
