import HostService from '@/services/host.service'
import RoomService from '@/services/room.service'
import { createPartyService } from '@/services/party.service'

const hostUrl = 'http://localhost:3000'

export const hostService = new HostService({ hostApi: hostUrl })
export const roomService = new RoomService({ hostApi: hostUrl })
export const partyService = createPartyService({ baseURL: hostUrl })

export default { hostService, roomService, partyService }
