import HostService from '@front/services/host.service'
import RoomService from '@front/services/room.service'
import { createPartyService } from '@front/services/party.service'
import config from '@front/config'
import { createGoogleService } from '@front/services/google.service'

export const hostService = new HostService({ hostApi: config.api })
export const roomService = new RoomService({ hostApi: config.api })
export const partyService = createPartyService({ baseURL: config.api })
export const googleService = createGoogleService()

export default { hostService, roomService, partyService, googleService }
