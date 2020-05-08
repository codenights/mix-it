import { ref } from '@vue/composition-api'
import { partyService } from '@/services'

export default function usePlayerFeature(partyId) {
  const player = ref({} as any)
  const player2 = ref(null)
  const localPartyId = partyId
  const videoId = ref<string>('')
  const nextVideoId = ref<string>('')
  let interval: number

  function linkPlayer(refPlayer2) {
    player2.value = refPlayer2
  }

  function onPlay() {
    interval = setInterval(async () => {
      if (player.value.player.getCurrentTime() >= player.value.player.getDuration() - 10) {
        clearInterval(interval)
        // @ts-ignore
        player2.value.player.playVideo()
        await partyService.unshiftPlaylist(localPartyId)
      }
    }, 1000)
  }

  function onPause() {
    clearInterval(interval)
  }

  function onEnded() {
    clearInterval(interval)
    videoId.value = nextVideoId.value
    player.value.player.stopVideo()
  }

  return {
    player,
    videoId,
    linkPlayer,
    nextVideoId,
    onPlay,
    onPause,
    onEnded,
  }
}
