import HostService from '@/services/host.service'
import RoomService from '@/services/room.service'

const hostUrl = 'http://localhost:3000'

const hostService = new HostService({ hostApi: hostUrl })
const roomService = new RoomService({ hostApi: hostUrl })

export { hostService, roomService }
