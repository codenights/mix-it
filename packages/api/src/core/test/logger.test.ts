import logger from '../logger'

describe('Unit | Core | Logger', () => {
  it('should be able to log in debug, info, warn and error', () => {
    expect(logger).toHaveProperty('debug', expect.any(Function))
    expect(logger).toHaveProperty('info', expect.any(Function))
    expect(logger).toHaveProperty('warn', expect.any(Function))
    expect(logger).toHaveProperty('error', expect.any(Function))
  })
})
