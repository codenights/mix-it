import HostService from '@/services/host.service'
import RoomService from '@/services/room.service'
import { createPartyService } from '@/services/party.service'
import config from '@/config'
import { createGoogleService } from '@/services/google.service'

export const hostService = new HostService({ hostApi: config.api })
export const roomService = new RoomService({ hostApi: config.api })
export const partyService = createPartyService({ baseURL: config.api })
export const googleService = createGoogleService()

export default { hostService, roomService, partyService, googleService }
