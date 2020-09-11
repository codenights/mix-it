import { flow } from 'fp-ts/lib/function'
import { Socket } from 'socket.io'

import { PartyRepository } from '../party-repository'
import { Party } from '../party'
import { logger, room } from '../../core'

export interface WithPlaylistOptions {
  party: Party
  partyRepository: PartyRepository
}

export enum PlaylistEvents {
  PLAYLIST_UNSHIFT = 'playlist:unshift',
  PLAYLIST_REFRESH = 'playlist:refresh'
}

export const onPlaylistUnshift = (opts: WithPlaylistOptions) => (socket: Socket): Socket => {
  const { party, partyRepository } = opts
  const partyId = party.id
  const toRoom = () => room(socket, partyId)

  socket.on(PlaylistEvents.PLAYLIST_UNSHIFT, async (onPlaylistUnshift?: Function) => {
    const party: Party = await partyRepository.unshiftPlaylist(partyId)
    logger.info(`Socket ${socket.id} unshift the playlist, new value: [${party.playlist.join(', ')}]`)
    onPlaylistUnshift?.()
    // Deprecated
    toRoom().emit('playlist', party.playlist)
    // The new event
    toRoom().emit(PlaylistEvents.PLAYLIST_REFRESH, party.playlist)
  })
  return socket
}

export const withPlaylist = (opts: WithPlaylistOptions) => flow(onPlaylistUnshift(opts))

export default withPlaylist
