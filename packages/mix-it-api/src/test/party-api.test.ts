import getPort from 'get-port'
import { Server as HttpServer } from 'http'
import { Http2Server } from 'http2'
import request from 'supertest'

import { createApp } from '../app'
import { createPartyRepository } from '../party/party-repository'
import { Party } from '../party'

describe('Integration | API | Host', () => {
  let server: HttpServer | Http2Server

  beforeAll(async () => {
    const port = await getPort()
    server = createApp({ port }).http
  })

  describe('POST /parties', () => {
    it('201 Created', async () => {
      const { body, status, type } = await request(server)
        .post('/parties')
        .set('Content-Type', 'application/json')
      expect(status).toBe(201)
      expect(type).toBe('application/json')
      expect(body).toStrictEqual({
        id: expect.any(String),
        playlist: []
      })
    })
  })

  describe('GET /parties/:id', () => {
    it('200 OK', async () => {
      const party: Party = await createPartyRepository().create({ playlist: ['abc'] })
      const { body, status, type } = await request(server)
        .get(`/parties/${party.id}`)
        .set('Content-Type', 'application/json')
      expect(status).toBe(200)
      expect(type).toBe('application/json')
      expect(body).toStrictEqual({
        id: expect.any(String),
        playlist: ['abc']
      })
    })

    it('404 Not found', async () => {
      const { status, type } = await request(server)
        .get('/parties/non-existing')
        .set('Content-Type', 'application/json')
      expect(status).toBe(404)
      expect(type).toBe('application/json')
    })
  })
})
