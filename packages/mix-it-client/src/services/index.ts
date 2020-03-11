import HostService from '@/services/host.service'
import { createPartyService } from '@/services/party.service'
import config from '@/config'

export const hostService = new HostService({ hostApi: config.api })
export const partyService = createPartyService({ baseURL: config.api })

// eslint-disable-next-line import/prefer-default-export
export default { hostService, partyService }
