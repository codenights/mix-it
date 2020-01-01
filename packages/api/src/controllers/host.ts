import { Request, Response } from 'express'

interface Party {
  partyId: string;
  playlist: string[];
}
export const partyList = new Map<string, Party>()

/**
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response) => {
  let party: Party = partyList.get(req.query.userId)
  if(!party) {
    party = { partyId: 'a', playlist: ['6OFHXmiZP38', '4IMaIbfAFLY', 'zD80w-mPrKw'] }
    partyList.set(req.query.userId, party)
  }
  return res.send(party)
}

export const hostMessage = (req: Request, res: Response) => {
  return res.send('coucou')
}
