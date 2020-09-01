import getPort from 'get-port'
import http, { Server as HttpServer } from 'http'
import { mock, MockProxy } from 'jest-mock-extended'
import server, { Server, Socket } from 'socket.io'
import io from 'socket.io-client'

import { onSongSubmit, SongEvents } from '../song'
import { Party } from '../../party'
import { PartyRepository } from '../../party-repository'
import { PlaylistEvents } from '../playlist'
import { Playlist } from '../../playlist'

describe('Integration | Socket | Song', () => {
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
      onSongSubmit({ party, partyRepository })(serverSocket)
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

  describe(SongEvents.SONG_SUBMIT, () => {
    beforeEach(done => {
      serverSocket.join(party.id, () => {
        partyRepository.get.mockImplementation(async (id: string) => {
          return {
            id,
            playlist: []
          }
        })
        partyRepository.addSong.mockImplementation(async (id: string, song: string) => {
          return {
            playlist: [song]
          }
        })
        done()
      })
    })

    it('acknowledges that the song was submitted', done => {
      socket.emit(SongEvents.SONG_SUBMIT, 'abc', done)
    })

    it(`emits ${PlaylistEvents.PLAYLIST_REFRESH} with the playlist as payload`, done => {
      socket.on(PlaylistEvents.PLAYLIST_REFRESH, (playlist: Playlist) => {
        expect(playlist).toStrictEqual(['song'])
        done()
      })
      socket.emit(SongEvents.SONG_SUBMIT, 'song')
    })

    it('emits an error when the playlist already contains the given song', done => {
      partyRepository.get.mockImplementation(async id => {
        return {
          id,
          playlist: ['song']
        }
      })
      socket.on('error', (error: Error) => {
        expect(error).toStrictEqual({
          message: expect.any(String),
          name: 'SongExistsError'
        })
        done()
      })
      socket.emit(SongEvents.SONG_SUBMIT, 'song')
    })
  })
})
