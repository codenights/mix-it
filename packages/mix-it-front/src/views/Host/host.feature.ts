import { Ref, ref } from '@vue/composition-api'
import { partyService } from '@/services'
import { Party, Playlist } from '@/models/party'

export default function useHost(context) {
  const { partyId } = context.root.$route.params
  const party: Ref<Party> = ref<Party>({
    id: partyId,
    playlist: [],
    owner: ''
  })

  async function join(): Promise<void> {
    console.log(`Joining party ${party.value.id}...`)
    await partyService.join(party.value.id)
    console.log(`Joined party ${party.value.id}.`)
  }

  async function leave(): Promise<void> {
    await partyService.leave(party.value.id)
    console.log(`Left party ${party.value.id}.`)
  }

  function onPlaylist(): void {
    partyService.onPlaylist((playlist: Playlist) => {
      // eslint-disable-next-line no-param-reassign
      // @ts-ignore
      party.value = ref<Party>({
        ...party.value,
        playlist
      })
      console.log('new playlist', party.value.playlist)
    })
  }

  async function joinRoomAsHost(player1, player2, firstVideoId, secondVideoId) {
    await join()
    console.log(player1.value)
    setTimeout(() => {
      const player1State = player1.value.player.getPlayerState()
      const player2State = player2.value.player.getPlayerState()

      if (player1State > 1 || player2State > 1) {
        if (player2State > 1) {
          // eslint-disable-next-line no-param-reassign,prefer-destructuring
          secondVideoId.value = party.value.playlist[1]
          if (player1State > 1) {
            // eslint-disable-next-line no-param-reassign,prefer-destructuring
            firstVideoId.value = party.value.playlist[0]
          }
        } else {
          // eslint-disable-next-line no-param-reassign,prefer-destructuring
          firstVideoId.value = party.value.playlist[1]
        }
      }
    }, 2000)
  }

  return {
    party,
    join,
    joinRoomAsHost,
    leave,
    onPlaylist
  }
}
