import { Context, Middleware, Next } from 'koa'

import { errorHandler } from '../error-handler'

describe('Unit | Middleware | Error handler', () => {
  let ctx: Context
  let next: Next
  let middleware: Middleware

  beforeEach(() => {
    middleware = errorHandler()
    ctx = {
      app: {
        emit: jest.fn() as typeof ctx.app.emit
      }
    } as Context
  })

  it('returns a Koa middleware', () => {
    expect(typeof middleware).toBe('function')
  })

  it('catches errors', async () => {
    // Given
    type ExtendedError = Error & { status?: number; expose?: boolean }
    next = async () => {
      const err: ExtendedError = new Error('name required')
      err.status = 400
      err.expose = true
      throw err
    }
    // When
    await middleware(ctx, next)
    // Then
    expect(ctx.type).toBe('application/json')
    expect(ctx.body).toMatchObject({
      status: expect.any(Number)
    })
    expect(ctx.app.emit).toHaveBeenCalled()
  })
})
