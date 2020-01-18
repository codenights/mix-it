import createServer from 'http-server.ts'

;(async () => {
  const server = createServer()
  await server.listen()
})()
