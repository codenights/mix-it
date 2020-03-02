import HostService from '@/services/host.service'
import { createPartyService } from '@/services/party.service'

const hostUrl = 'http://localhost:3000'

export const hostService = new HostService({ hostApi: hostUrl })
export const partyService = createPartyService({ baseURL: hostUrl })

// eslint-disable-next-line import/prefer-default-export
export default { hostService, partyService }
