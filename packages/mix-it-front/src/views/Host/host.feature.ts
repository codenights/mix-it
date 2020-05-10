/* eslint-disable no-console */
import { Ref, ref, reactive } from '@vue/composition-api'

import { partyService } from '@front/services'
import { Party, Playlist } from '@front/models/party'

export default function useHost(context) {
  const { partyId } = context.root.$route.params
  const party = reactive({
    id: partyId,
    playlist: [],
    owner: ''
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

  async function joinRoomAsHost() {
    await join()
  }

  return {
    party,
    fetchParty,
    join,
    joinRoomAsHost,
    leave,
    onPlaylist
  }
}
