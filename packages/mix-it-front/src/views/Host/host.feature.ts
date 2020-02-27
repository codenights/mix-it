import { reactive, ref } from '@vue/composition-api'
import { hostService } from '@/services'

interface Party {
  partyId: string
  playlist: string[]
}

export default function useHost(context) {
  context.root.$socket.connect()
  const room = ref({} as Party)
  const playlist = ref([])
  async function createRoom() {
    const user = await context.root.$gAuth.GoogleAuth.currentUser.get()
    const result = await hostService.create(user.getId())
    room.value = result.data
    playlist.value = room.value.playlist
    context.root.$socket.emit('addHost', room.value.partyId)
  }

  function joinRoomAsHost(player1, player2, firstVideoId, secondVideoId) {
    context.root.sockets.subscribe(room.value.partyId, (data: Party) => {
      console.log(player1.value.player)
      console.log(player2.value.player)
      room.value = data
      playlist.value = room.value.playlist
      const player1State = player1.value.player.getPlayerState()
      const player2State = player2.value.player.getPlayerState()

      if (player1State > 1 || player2State > 1) {
        if (player2State > 1) {
          // eslint-disable-next-line no-param-reassign,prefer-destructuring
          secondVideoId.value = playlist.value[1]
          if (player1State > 1) {
            // eslint-disable-next-line no-param-reassign,prefer-destructuring
            firstVideoId.value = playlist.value[0]
          }
        } else {
          // eslint-disable-next-line no-param-reassign,prefer-destructuring
          firstVideoId.value = playlist.value[1]
        }
      }
      context.root.$socket.emit('a', 'dataTest')
    })
  }

  return {
    room,
    playlist,
    createRoom,
    joinRoomAsHost
  }
}
