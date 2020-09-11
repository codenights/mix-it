import { SongExistsError } from '../song-exists-error'

describe('Unit | Errors | SongExistsError', () => {
  const error = new SongExistsError('example')

  it('defines a message', () => {
    expect(error.message).toBe('The song example is already in queue')
  })

  it('has a name', () => {
    expect(error.name).toBe('SongExistsError')
  })
})
