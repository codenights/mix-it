import { ref } from '@vue/composition-api'

export default function usePlayerFeature(context, playlist) {
  const player = ref({} as any)
  const player2 = ref(null)
  const videoId = ref<string>('')
  let interval: number

  function linkPlayer(refPlayer2) {
    player2.value = refPlayer2
  }

  function onPlay() {
    interval = setInterval(() => {
      if (player.value.player.getCurrentTime() >= player.value.player.getDuration() - 10) {
        // @ts-ignore
        player2.value.player.playVideo()
      }
    }, 1000)
  }

  function onPause() {
    clearInterval(interval)
  }

  function onReady() {
    if (player.value.player.playVideo) {
      player.value.player.playVideo()
    }
  }

  function onEnded() {
    clearInterval(interval)
    // unshift playlist by socket
    const [, second] = playlist
    videoId.value = second
    // @ts-ignore
    player.value.player.stopVideo()
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
