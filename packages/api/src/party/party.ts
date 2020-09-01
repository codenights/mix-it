import { Playlist } from './playlist'

export interface Party {
  id?: string
  playlist: Playlist
}

export function hasSong(song: string) {
  return (party: Party) => party.playlist.includes(song)
}
