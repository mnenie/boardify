import { Server, type ServerOptions } from "socket.io";
import type { H3Event } from "h3";

const options: Partial<ServerOptions> = {
  path: "/api/socket.io",
  serveClient: false,
};

type Point = { x: number; y: number };

type DrawLine = {
  prevPoint: Point | null;
  currentPoint: Point;
  color: string;
  radius: number;
  line: number;
};

export const io = new Server(options);

export function initSocket(event: H3Event) {
  //@ts-ignore
  io.attach(event.node.res.socket?.server);
  io.of("/draw").on("connection", (socket) => {
    socket.on("client-ready", () => {
      socket.broadcast.emit("get-canvas");
    });
    socket.on("canvas-state", (state) => {
      socket.broadcast.emit("canvas-state-server", state);
    });
    socket.on(
      "draw-line",
      ({ prevPoint, currentPoint, color, radius, line }: DrawLine) => {
        socket.broadcast.emit("draw-line", {
          prevPoint,
          currentPoint,
          color,
          radius,
          line,
        });
      }
    );
  });
}
