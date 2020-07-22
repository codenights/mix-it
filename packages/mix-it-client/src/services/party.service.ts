import axios, { AxiosInstance } from 'axios'
import socketio from 'socket.io-client'

import { Client, Party, Playlist } from '@client/models'

interface PartyOptions {
  owner: string
}

type OnClientCallback = (clients: Client[]) => void
type OnPlaylistCallback = (playlist: Playlist) => void

export interface PartyService {
  get(partyId: string): Promise<Party>
  join(partyId: string): Promise<void>
  leave(partyId: string): Promise<void>
  submitSong(songId: string): Promise<void>
  onClientJoined(cb: OnClientCallback): void
  onClientLeft(cb: OnClientCallback): void
  onPlaylist(cb: OnPlaylistCallback): void
}

class PartyServiceImpl implements PartyService {
  private readonly api: AxiosInstance

  private readonly socket: SocketIOClient.Socket

  constructor({ baseURL }) {
    this.api = axios.create({ baseURL })
    this.socket = socketio(`${baseURL}/parties`)
  }

  async get(partyId: string): Promise<Party> {
    const { data } = await this.api.get<Party>(`/parties/${partyId}`)
    return data
  }

  async join(partyId: string): Promise<void> {
    return new Promise((resolve) => {
      this.socket.emit('user:join', partyId, resolve)
    })
  }

  async leave(partyId: string): Promise<void> {
    return new Promise((resolve) => {
      this.socket.emit('user:leave', resolve)
    })
  }

  async submitSong(songId: string): Promise<void> {
    return new Promise((resolve) => {
      this.socket.emit('song:submit', songId, resolve)
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
}

export interface PartyServiceOptions {
  baseURL: string
}

export function createPartyService(opts: PartyServiceOptions): PartyService {
  return new PartyServiceImpl(opts)
}

export default PartyService
