import axios, { AxiosInstance } from 'axios'
import socketio from 'socket.io-client'

import { Party, Playlist } from '@front/models/party'
import { Client } from '@client/models'

interface PartyOptions {
  owner: string
}

type OnClientCallback = (clients: Client[]) => void
type OnPlaylistCallback = (playlist: Playlist) => void

export interface PartyService {
  create(partyOptions: PartyOptions): Promise<Party>
  get(partyId: string): Promise<Party>
  join(partyId: string): Promise<void>
  leave(partyId: string): Promise<void>
  onClientJoined(cb: OnClientCallback): void
  onClientLeft(cb: OnClientCallback): void
  onPlaylist(cb: OnPlaylistCallback): void
  unshiftPlaylist(partyId: string): Promise<void>
  cleanUp(): void
}

class PartyServiceImpl implements PartyService {
  private readonly api: AxiosInstance

  private readonly socket: SocketIOClient.Socket

  constructor({ baseURL }) {
    this.api = axios.create({ baseURL })
    this.socket = socketio(`${baseURL}/parties`)
  }

  async create(partyOptions: PartyOptions): Promise<Party> {
    const { data: party } = await this.api.post('/parties', partyOptions)
    return party
  }

  async get(partyId: string): Promise<Party> {
    const { data: party } = await this.api.get(`/parties/${partyId}`)
    return party
  }

  join(partyId: string): Promise<void> {
    return new Promise((resolve) => {
      this.socket.emit('host:join', partyId, resolve)
    })
  }

  leave(partyId: string): Promise<void> {
    return new Promise((resolve) => {
      this.socket.removeAllListeners()
      this.socket.emit('host:leave', resolve)
    })
  }

  onClientJoined(cb: OnClientCallback): void {
    this.socket.on('user:joined', cb)
  }

  onClientLeft(cb: OnClientCallback): void {
    this.socket.on('user:left', cb)
  }

  onPlaylist(cb: OnPlaylistCallback): void {
    this.socket.on('playlist', cb)
  }

  unshiftPlaylist(partyId: string): Promise<void> {
    return new Promise((resolve) => {
      this.socket.emit('playlist:unshift', resolve)
    })
  }

  cleanUp(): void {
    this.socket.removeAllListeners()
  }
}

export interface PartyServiceOptions {
  baseURL: string
}

export function createPartyService(opts: PartyServiceOptions): PartyService {
  return new PartyServiceImpl(opts)
}

export default PartyService
