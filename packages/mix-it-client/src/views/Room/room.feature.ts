import { onMounted, onUnmounted, ref } from '@vue/composition-api'
import Router from 'vue-router'

import { partyService } from '@client/services'

export default function useRoom(roomId: string, router: Router) {
  const room = ref(roomId)

  async function join(): Promise<void> {
    try {
      await partyService.join(room.value)
      console.log(`Joined party ${room.value}`)
    } catch (error) {
      // TODO: 404 Not found
      await router.replace({ name: 'home' })
    }
  }

  async function leave(): Promise<void> {
    await partyService.leave(room.value)
    console.log(`Left party ${room.value}`)
  }

  async function submitSong(songId: string) {
    await partyService.submitSong(songId)
    console.log(`Submitted song ${songId}`)
  }

  onMounted(join)
  onUnmounted(leave)

  return { roomId: room, submitSong }
}
