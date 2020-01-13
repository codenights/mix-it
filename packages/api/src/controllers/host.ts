import { Request, Response } from 'express'
import { Socket } from 'socket.io'
import crypto from 'crypto'

interface Room {
  host?: Socket;
  clients: Array<Socket>;
  party: Party;
}

interface Party {
  partyId: string;
  playlist: string[];
}
export const partyList = new Map<string, Room>()

/**
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response) => {
  let room: Room = partyList.get(req.query.userId)
  const roomId = crypto.randomBytes(20).toString('hex')
  if(!room) {
    room = { clients: [], party: { partyId: roomId, playlist: ['6OFHXmiZP38', '4IMaIbfAFLY', 'zD80w-mPrKw'] } }
    partyList.set(roomId, room)
  }
  return res.send(room.party)
}
