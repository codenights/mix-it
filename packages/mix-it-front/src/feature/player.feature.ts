import { ref } from '@vue/composition-api'

export default function usePlayerFeature(playlist) {
  const player = ref({} as any)
  const player2 = ref(null)
  const localPlaylist = ref(playlist)
  const videoId = ref<string>('')
  let interval: number

  function linkPlayer(refPlayer2) {
    player2.value = refPlayer2
  }

  function onPlay() {
    interval = setInterval(() => {
      if (
        // @ts-ignore
        player2.value.player.getPlayerState() !== 1 &&
        player.value.player.getCurrentTime() >= player.value.player.getDuration() - 10
      ) {
        // @ts-ignore
        player2.value.player.playVideo()
        clearInterval(interval)
      }
    }, 1000)
  }

  function onPause() {
    clearInterval(interval)
  }

  function onReady() {}

  function onEnded() {
    clearInterval(interval)
    // unshift playlist by socket
    localPlaylist.value.splice(0, 1)
    const [, value] = localPlaylist.value
    // @ts-ignore
    player.value.player.stopVideo()
    videoId.value = value
  }

  return {
    player,
    videoId,
    linkPlayer,
    onPlay,
    onPause,
    onEnded,
    onReady
  }
}
