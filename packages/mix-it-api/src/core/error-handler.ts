import { Context, Middleware, Next } from 'koa'

export function errorHandler(): Middleware {
  return async (ctx: Context, next: Next) => {
    try {
      await next()
    } catch (err) {
      ctx.type = 'application/json'
      ctx.status = err.status ?? 500
      ctx.body = err
      ctx.app.emit('error', err, ctx)
    }
  }
}
