import client from 'socket.io-client'

import getPort from 'get-port'
import createPartyRepository from '../../party-repository'
import { Party } from '../../party'
import createApp from '../../../app'
import { MissingPartyError } from '../../../core/errors'

describe('Integration | Socket | Party ', () => {
  let port: number

  beforeAll(async () => {
    port = await getPort()
    const app = createApp({ port })
    await app.start()
  })

  it('connects to the namespace /parties', done => {
    expect.assertions(3)
    const socket = client.connect(`http://localhost:${port}/parties`)
    socket.on('connect', () => {
      expect(socket).toBeDefined()
      expect(socket.connected).toBeTruthy()
      expect(socket.nsp).toBe('/parties')
      done()
    })
  })
})
