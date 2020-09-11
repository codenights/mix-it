import { hasSong } from '../party'

describe('Unit | Domain | Party', () => {
  describe('#hasSong', () => {
    const isInQueue = hasSong('song')

    it('returns false if the song does not exist in the playlist', () => {
      const actual = isInQueue({
        playlist: []
      })
      expect(actual).toBe(false)
    })

    it('returns true if the song exists in the playlist', () => {
      const actual = isInQueue({
        playlist: ['song']
      })
      expect(actual).toBe(true)
    })
  })
})
