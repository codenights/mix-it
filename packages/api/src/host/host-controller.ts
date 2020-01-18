import { Middleware } from '@koa/router'
import { Socket } from 'socket.io'
import crypto from 'crypto'

interface Room {
  host?: Socket
  clients: Array<Socket>
  party: Party
}

interface Party {
  partyId: string
  playlist: string[]
}
export const partyList = new Map<string, Room>()

export interface HostController {
  index: Middleware
}

export default function createHostController(): HostController {
  return {
    /**
     * GET /hosts
     * List hosts.
     */
    async index(ctx) {
      let room: Room = partyList.get(ctx.query.userId)
      const roomId = crypto.randomBytes(20).toString('hex')
      if (!room) {
        room = { clients: [], party: { partyId: roomId, playlist: ['6OFHXmiZP38', '4IMaIbfAFLY', 'zD80w-mPrKw'] } }
        partyList.set(roomId, room)
      }
      ctx.body = room.party
    }
  }
}
