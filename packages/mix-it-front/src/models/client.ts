interface User {
  name: string
}

export interface Client {
  socket: SocketIOClient.Socket
  user?: User
}
