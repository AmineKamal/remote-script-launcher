import { Server } from "http";
import * as socket from "socket.io";
import { SocketUtils } from "../utils/socket.utils";

export class Socket {
  public io: socket.Server;
  private sockets: { [name: string]: socket.Socket } = {};

  private static instance: Socket;

  public static get(http?: Server) {
    if (this.instance) return this.instance;
    this.instance = new Socket(http);

    return this.instance;
  }

  private constructor(http: Server) {
    this.io = socket(http);
    this.connect();
  }

  public connect() {
    this.io.on("connection", (s: socket.Socket) => {
      if (!s.handshake.query.name) return;

      console.log(`connected : ${s.id} - ${s.handshake.query.name}`);

      this.sockets[s.handshake.query.name] = s;
      this.handlers(s, new SocketUtils.Socket(s));
    });
  }

  public handlers(s: socket.Socket, cs: SocketUtils.Socket) {
    this.disconnectHandler(s, cs);
  }

  public disconnectHandler(s: socket.Socket, cs: SocketUtils.Socket) {
    s.on("disconnect", () => {
      console.log(`Socket disconnected : ${s.id}`);
    });
  }

  public run(command: string, name?: string) {
    return new Promise(resolve => {
      const n = name ? name : Object.keys(this.sockets)[0];
      this.sockets[n].emit("run", command, resolve);
    });
  }
}
