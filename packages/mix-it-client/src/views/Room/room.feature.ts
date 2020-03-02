import { onMounted, onUnmounted, ref } from '@vue/composition-api'
import { partyService } from '@/services'

export default function useRoom(context) {
  const roomId = ref(context.root.$route.params.roomId)

  async function join(): Promise<void> {
    await partyService.join(roomId.value)
    console.log(`Joined party ${roomId.value}`)
  }

  async function leave(): Promise<void> {
    await partyService.leave(roomId.value)
    console.log(`Left party ${roomId.value}`)
  }

  async function submitSong(songId) {
    await partyService.submitSong(songId)
    console.log(`Submitted song ${songId}`)
  }

  onMounted(join)
  onUnmounted(leave)

  return { roomId, submitSong }
}
