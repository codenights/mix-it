import { Socket } from 'socket.io'

import { PartyRepository } from '../party-repository'
import { Party } from '../party'
import { logger } from '../../core'
import { PlaylistEvents } from './playlist'
import { room } from '../../core/socket-utils'

export interface WithSongOptions {
  party: Party
  partyRepository: PartyRepository
}

function makeSafeSongId(song: string): string {
  const res = song.match(/https:\/\/youtu\.be\/([-_a-zA-Z0-9]*)|https:\/\/www\.youtube\.com\/watch\?v=([-_a-zA-Z0-9]*)/)
  if (res) {
    return res[1] || res[2]
  }
  return song
}

export enum SongEvents {
  SONG_SUBMIT = 'song:submit'
}

/**
 * Register a handler to react when a song is submitted.
 * @param opts
 */
export const onSongSubmit = (opts: WithSongOptions) => (socket: Socket): Socket => {
  const partyId = opts.party.id
  const toRoom = room(socket, partyId)

  socket.on(SongEvents.SONG_SUBMIT, async (song: string, onSongSubmitted?: Function) => {
    logger.info(`Song received ${song} to the party ${partyId}`)
    const safeSong = makeSafeSongId(song)
    const party: Party = await opts.partyRepository.addSong(partyId, safeSong)
    logger.info(`Added song ${safeSong} to the party ${partyId}`)
    onSongSubmitted?.()
    // Deprecated
    toRoom.emit('playlist', party.playlist)
    toRoom.emit(PlaylistEvents.PLAYLIST_REFRESH, party.playlist)
  })
  return socket
}

/**
 * Register all the song event listeners.
 * @param opts
 */
export const withSong = (opts: WithSongOptions) => onSongSubmit(opts)

export const withoutSong = (socket: Socket): Socket => {
  const events: SongEvents[] = Object.values(SongEvents)
  events.forEach(event => {
    socket.removeAllListeners(event)
  })
  return socket
}

export default withSong
