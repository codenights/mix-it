import VueCompositionAPI from '@vue/composition-api'
import Vue from 'vue'
import VueRouter from 'vue-router'

import { mock } from 'jest-mock-extended'
import useHome from '@/views/Home/home.feature'
import { PartyService } from '@/services/party.service'
import { Party } from '@/models'

Vue.use(VueCompositionAPI)

describe('Home feature', () => {
  let router

  beforeEach(() => {
    router = mock<VueRouter>()
  })

  describe('#redirectToRoom', () => {
    let partyService: PartyService

    describe('The party exists', () => {
      beforeEach(async () => {
        partyService = mock<PartyService>({
          get: jest.fn(async (id) => ({ id, playlist: [], owner: '' }))
        })
        const { room, redirectToRoom } = useHome({ router, partyService })
        room.value = 'id'
        await redirectToRoom()
      })

      it('should push the route', async () => {
        expect(router.push).toHaveBeenCalledWith('/room/id')
      })

      it('should call the party service', () => {
        expect(partyService.get).toHaveBeenCalledWith('id')
      })
    })

    describe('The party does not exist', () => {
      let err: Error

      beforeEach(async () => {
        partyService = mock<PartyService>({
          get: jest.fn(() => {
            throw new Error('Party not found')
          })
        })
        const { error, room, redirectToRoom } = useHome({ router, partyService })
        room.value = 'id'
        await redirectToRoom()
        err = error.value
      })

      it('should set an error', async () => {
        expect(err).toBeInstanceOf(Error)
      })
    })
  })
})
