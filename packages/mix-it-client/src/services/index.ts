import HostService from '@client/services/host.service'
import { createPartyService } from '@client/services/party.service'
import config from '@client/config'

export const hostService = new HostService({ hostApi: config.api })
export const partyService = createPartyService({ baseURL: config.api })

export * from './party.service'

// eslint-disable-next-line import/prefer-default-export
export default { hostService, partyService }
