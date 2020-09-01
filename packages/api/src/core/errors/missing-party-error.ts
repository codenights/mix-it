import { SerializableError } from './serializable-error'

export class MissingPartyError extends SerializableError {
  constructor(partyId: string) {
    super(`The party "${partyId}" does not exist`)
  }
}
