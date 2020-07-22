/* eslint-disable no-console */
import { onMounted, onUnmounted, reactive, ref } from '@vue/composition-api'

import { partyService } from '@front/services'
import { Playlist } from '@front/models/party'

export default function useHost(partyId: string) {
  const party = reactive({
    id: partyId,
    playlist: [],
    owner: ''
  })
  const users = ref<string[]>([])

  async function fetchParty(): Promise<void> {
    const fetchedParty = await partyService.get(partyId)
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

  function onClientJoined(): void {
    partyService.onClientJoined((clients: string[]) => {
      users.value = clients
    })
  }

  function onPlaylist(): void {
    partyService.onPlaylist((playlist: Playlist) => {
      party.playlist = playlist
    })
  }

  onMounted(async () => {
    onPlaylist()
    onClientJoined()
    await join()
  })

  onUnmounted(async () => {
    await leave()
  })

  return {
    party,
    users,
    fetchParty,
    join,
    leave
  }
}
