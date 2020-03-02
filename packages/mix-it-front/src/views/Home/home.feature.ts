import { partyService } from '@/services'
import { Party } from '@/models/party'

export default function useHome(context) {
  function redirectToRoom() {
    context.root.$router.push('room/a')
  }
  function redirectToHost(partyId: string) {
    context.root.$router.push(`host/${partyId}`)
  }

  async function createParty(): Promise<void> {
    const user = await context.root.$gAuth.GoogleAuth.currentUser.get()
    const party: Party = await partyService.create({ owner: user.getId() })
    redirectToHost(party.id)
  }

  return {
    createParty,
    redirectToRoom,
    redirectToHost
  }
}
