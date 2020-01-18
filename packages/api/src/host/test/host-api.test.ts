import request from 'supertest'

import { createTestServer, Server } from '../../http-server'

describe('Integration | API | Host', () => {
  let app: Server

  beforeAll(() => {
    app = createTestServer()
  })

  describe('GET /hosts', () => {
    it('should return 200 OK', async () => {
      const { body, status, type } = await request(app).get('/hosts')
      expect(status).toBe(200)
      expect(type).toBe('application/json')
      expect(body).toStrictEqual({
        partyId: expect.any(String),
        playlist: ['6OFHXmiZP38', '4IMaIbfAFLY', 'zD80w-mPrKw']
      })
    })
  })
})
