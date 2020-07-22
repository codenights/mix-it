import { Socket } from 'socket.io'

export const room = (socket: Socket, room: string) => socket.nsp.to(room)

export function cleanUp(socket: Socket, events: string[]): void {
  socket.leaveAll()
  events.forEach(event => {
    socket.removeAllListeners(event)
  })
}
