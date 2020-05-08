import { ref, Ref } from '@vue/composition-api'
import VueRouter, { Route } from 'vue-router'

import { PartyService } from '../../services'

interface HomeFeatureOptions {
  router: VueRouter
  partyService: PartyService
}

export default function useHome({ router, partyService }: HomeFeatureOptions) {
  const room: Ref<string> = ref<string>('')
  const error: Ref<Error> = ref<Error>()

  async function redirectToRoom(): Promise<void> {
    try {
      const party = await partyService.get(room.value)
      await router.push(`/room/${party.id}`)
    } catch (err) {
      error.value = err
    }
  }

  return { error, room, redirectToRoom }
}
