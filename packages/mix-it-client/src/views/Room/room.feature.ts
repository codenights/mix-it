import { ref } from '@vue/composition-api'

export default function useRoom(context) {
  const roomId = ref(context.root.$route.params.roomId)

  function addSongToPlaylist(songId) {
    context.root.$socket.emit('addSong', { songId, partyId: roomId.value })
  }

  return { roomId, addSongToPlaylist }
}
