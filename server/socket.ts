import { Server, Socket, type ServerOptions } from 'socket.io';
import type { H3Event } from 'h3';
import type { Element } from '~/types/element.type';

const options: Partial<ServerOptions> = {
  path: '/api/socket.io',
  serveClient: false
};

export const io = new Server(options);

export function initSocket(event: H3Event) {
  //@ts-ignore
  io.attach(event.node.res.socket?.server);
  io.of('/draw').on('connection', (socket: Socket) => {
    socket.on('client-ready', () => {
      socket.broadcast.emit('get-canvas');
    });
    socket.on('draw-elements', (element: Element) => {
      socket.broadcast.emit('draw-elements', element);
    });
    socket.on('canvas-state', (state) => {
      socket.broadcast.emit('canvas-state-server', state);
    });
  });
}
