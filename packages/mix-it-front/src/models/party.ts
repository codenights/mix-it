export type Playlist = string[]

export interface Party {
  id?: string
  playlist: Playlist
  owner: string
}
