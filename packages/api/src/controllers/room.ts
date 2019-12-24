import { Request, Response } from 'express'

/**
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response) => {
  console.log('Get room')
  return res.send('get room')
}
