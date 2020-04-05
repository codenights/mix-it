import { googleService, partyService } from '@/services'
import { Party } from '@/models/party'

export default function useHome() {
  async function createParty(): Promise<Party> {
    const user = await googleService.getCurrentGoogleUser()
    return partyService.create({ owner: user.getId() })
  }

  return {
    createParty
  }
}
