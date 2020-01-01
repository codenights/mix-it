import { ref } from '@vue/composition-api'

export default function useRoom(context) {
  const roomId = ref('a')

  function addSongToPlaylist(songId) {
    console.log(songId)
    context.root.$socket.emit('addSong', songId)
  }

  return { roomId, addSongToPlaylist }
}
