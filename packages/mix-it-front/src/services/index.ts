import HostService from '@/services/host.service'
import RoomService from '@/services/room.service'
import { createPartyService } from '@/services/party.service'
import config from '@/config'

export const hostService = new HostService({ hostApi: config.api })
export const roomService = new RoomService({ hostApi: config.api })
export const partyService = createPartyService({ baseURL: config.api })

export default { hostService, roomService, partyService }
