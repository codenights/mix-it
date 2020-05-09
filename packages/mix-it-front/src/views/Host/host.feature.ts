/* eslint-disable no-console */
import { Ref, ref, reactive } from '@vue/composition-api'
import { partyService } from '@front/services'
import { Party, Playlist } from '@front/models/party'

export default function useHost(context) {
  const { partyId } = context.root.$route.params
  const party = reactive({
    id: partyId,
    playlist: [],
    owner: '',
  })

  async function fetchParty(): Promise<void> {
    const fetchedParty = await partyService.get(partyId)
    console.log('fetchedParty', fetchedParty)
    party.id = fetchedParty.id
    party.playlist = fetchedParty.playlist
    party.owner = fetchedParty.owner
  }

  async function join(): Promise<void> {
    console.log(`Joining party ${party.id}...`)
    await partyService.join(party.id)
    console.log(`Joined party ${party.id}.`)
  }

  async function leave(): Promise<void> {
    await partyService.leave(party.id)
  }

  function onPlaylist(): void {
    partyService.onPlaylist((playlist: Playlist) => {
      party.playlist = playlist
    })
  }

  async function joinRoomAsHost(player1, player2, firstVideoId, secondVideoId) {
    await join()
    setTimeout(() => {
      const player1State = player1.value.player.getPlayerState()
      const player2State = player2.value.player.getPlayerState()

      if (player1State > 1 || player2State > 1) {
        if (player2State > 1) {
          // eslint-disable-next-line no-param-reassign,prefer-destructuring
          secondVideoId.value = party.playlist[1]
          if (player1State > 1) {
            // eslint-disable-next-line no-param-reassign,prefer-destructuring
            firstVideoId.value = party.playlist[0]
          }
        } else {
          // eslint-disable-next-line no-param-reassign,prefer-destructuring
          firstVideoId.value = party.playlist[1]
        }
      }
    }, 2000)
  }

  return {
    party,
    fetchParty,
    join,
    joinRoomAsHost,
    leave,
    onPlaylist,
  }
}
