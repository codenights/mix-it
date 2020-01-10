import { ref } from '@vue/composition-api'
import { hostService } from '@/services'

interface Party {
  partyId: string
  playlist: string[]
}

export default function useHost(context) {
  const room = ref({} as Party)
  const firstVideoId = ref('')
  const secondVideoId = ref('')
  async function createRoom() {
    const user = await context.root.$gAuth.GoogleAuth.currentUser.get()
    const result = await hostService.create(user.getId())
    room.value = result.data
    const [firstValue, secondValue] = [...room.value.playlist]
    firstVideoId.value = firstValue
    secondVideoId.value = secondValue
    context.root.$socket.emit('addHost', room.value.partyId)
  }

  function joinRoomAsHost() {
    context.root.sockets.subscribe(room.value.partyId, (data: Party) => {
      console.log('Message receive', data)
      room.value = data
      context.root.$socket.emit('a', 'dataTest')
    })
  }

  return {
    room,
    firstVideoId,
    secondVideoId,
    createRoom,
    joinRoomAsHost
  }
}
