import getPort from 'get-port'
import http, { Server as HttpServer } from 'http'
import { mock, MockProxy } from 'jest-mock-extended'
import server, { Server, Socket } from 'socket.io'
import io from 'socket.io-client'

import { Party } from '../../party'
import { PartyRepository } from '../../party-repository'
import withPlaylist, { PlaylistEvents } from '../playlist'
import { Playlist } from '../../playlist'

describe('Integration | Socket | Playlist', () => {
  let port: number
  let socket: SocketIOClient.Socket
  let serverSocket: Socket
  let httpServer: HttpServer
  let ioServer: Server
  let party: Party
  let partyRepository: MockProxy<PartyRepository>

  /**
   * Setup WS & HTTP servers
   */
  beforeAll(done => {
    getPort().then(result => {
      port = result
      httpServer = http.createServer()
      ioServer = server(httpServer)
      httpServer.listen(port, 'localhost', done)

      ioServer.on('connection', socket => {
        serverSocket = socket
      })
    })
  })

  beforeEach(done => {
    party = mock<Party>({ id: 'foo' })
    partyRepository = mock<PartyRepository>()
    // Do not hardcode server port and address, square brackets are used for IPv6
    socket = io.connect(`http://localhost:${port}`, {
      forceNew: true,
      transports: ['websocket']
    })
    socket.on('connect', () => {
      withPlaylist({ party, partyRepository })(serverSocket)
      done()
    })
  })

  afterEach(() => {
    if (socket.connected) {
      socket.disconnect()
    }
  })

  afterAll(() => {
    ioServer.close()
    httpServer.close()
  })

  describe(PlaylistEvents.PLAYLIST_UNSHIFT, () => {
    beforeEach(done => {
      serverSocket.join(party.id, () => {
        partyRepository.unshiftPlaylist.mockImplementation(async () => {
          return {
            playlist: ['b', 'c']
          }
        })
        done()
      })
    })

    it('acknowledges that the playlist was unqueued', done => {
      socket.emit(PlaylistEvents.PLAYLIST_UNSHIFT, done)
    })

    it(`emits ${PlaylistEvents.PLAYLIST_REFRESH} with the playlist as payload`, done => {
      socket.on(PlaylistEvents.PLAYLIST_REFRESH, (playlist: Playlist) => {
        expect(playlist).toStrictEqual(['b', 'c'])
        done()
      })
      socket.emit(PlaylistEvents.PLAYLIST_UNSHIFT)
    })
  })
})
