import getPort from 'get-port'
import http, { Server as HttpServer } from 'http'
import { mock, MockProxy } from 'jest-mock-extended'
import server, { Server, Socket } from 'socket.io'
import io from 'socket.io-client'

import { Party } from '../../party'
import { PartyRepository } from '../../party-repository'
import { HostEvents, withHost } from '../host'

describe('Integration | Socket | Host', () => {
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
      withHost({ partyRepository })(serverSocket)
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

  describe(HostEvents.HOST_JOIN, () => {
    it('acknowledges that the host joined the party', done => {
      partyRepository.get.mockResolvedValue(party)
      socket.emit(HostEvents.HOST_JOIN, 'foo', done)
    })

    it('returns an error if the party does not exist', done => {
      partyRepository.get.mockResolvedValue(null)
      socket.emit(HostEvents.HOST_JOIN, 'non existing', (err: Error) => {
        expect(err).toStrictEqual({
          name: 'MissingPartyError',
          message: 'The party "non existing" does not exist.'
        })
        done()
      })
    })
  })

  describe(HostEvents.HOST_LEAVE, () => {
    // TODO
  })
})
