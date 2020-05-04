import client from 'socket.io-client'

import createPartyRepository from '../../party-repository'
import { Party } from '../../party'
import getPort from 'get-port'
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

  describe('room:join', () => {
    let socket: SocketIOClient.Socket
    let party: Party

    beforeEach(async done => {
      socket = client.connect(`http://localhost:${port}/parties`)
      party = await createPartyRepository().create({
        playlist: []
      })
      socket.on('connect', done)
    })

    it('acknowledges the room was joined', done => {
      socket.emit('room:join', { clientType: 'host', partyId: party.id }, done)
    })

    it('emits an error if the party does not exist', done => {
      expect.assertions(1)
      socket.emit('room:join', { clientType: 'host', partyId: 'non existing party' }, (err: MissingPartyError) => {
        expect(err).toMatchObject({
          name: 'MissingPartyError',
          message: expect.any(String)
        })
        done()
      })
    })
  })

  describe('song:submit', () => {
    let socket: SocketIOClient.Socket
    let party: Party

    beforeEach(async done => {
      socket = client.connect(`http://localhost:${port}/parties`)
      party = await createPartyRepository().create({
        playlist: []
      })
      socket.on('connect', () => {
        socket.emit('room:join', { clientType: 'host', partyId: party.id }, done)
      })
    })

    it('emits a "playlist" event', done => {
      expect.assertions(1)
      socket.on('playlist', (playlist: string[]) => {
        expect(playlist).toStrictEqual(['abc'])
        done()
      })
      socket.emit('song:submit', 'abc')
    })

    describe('With mobile URL', () => {
      it('emits a "playlist" event', done => {
        expect.assertions(1)
        socket.on('playlist', (playlist: string[]) => {
          expect(playlist).toStrictEqual(['abc'])
          done()
        })
        socket.emit('song:submit', 'https://youtu.be/abc')
      })
    })
    describe('With desktop URL', () => {
      it('emits a "playlist" event', done => {
        expect.assertions(1)
        socket.on('playlist', (playlist: string[]) => {
          expect(playlist).toStrictEqual(['abc'])
          done()
        })
        socket.emit('song:submit', 'https://www.youtube.com/watch?v=abc')
      })
    })
    describe('With desktop URL and params', () => {
      it('emits a "playlist" event', done => {
        expect.assertions(1)
        socket.on('playlist', (playlist: string[]) => {
          expect(playlist).toStrictEqual(['abc'])
          done()
        })
        socket.emit('song:submit', 'https://www.youtube.com/watch?v=abc&s=2')
      })
    })
  })

  describe('playlist:unshift', () => {
    let socket: SocketIOClient.Socket
    let party: Party

    beforeEach(async done => {
      socket = client.connect(`http://localhost:${port}/parties`)
      party = await createPartyRepository().create({
        playlist: ['abc', 'def']
      })
      socket.on('connect', () => {
        socket.emit('room:join', { clientType: 'host', partyId: party.id }, done)
      })
    })

    it('emits a "playlist" event', done => {
      expect.assertions(1)
      socket.on('playlist', (playlist: string[]) => {
        expect(playlist).toStrictEqual(['def'])
        done()
      })
      socket.emit('playlist:unshift')
    })
  })
})
