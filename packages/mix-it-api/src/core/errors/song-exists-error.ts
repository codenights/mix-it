import { SerializableError } from './serializable-error'

export class SongExistsError extends SerializableError {
  constructor(song: string) {
    super(`The song ${song} is already in queue`)
  }
}
