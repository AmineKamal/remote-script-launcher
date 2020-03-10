import { Server } from "http";
import * as socket from "socket.io";
import { SocketUtils } from "../utils/socket.utils";

export class Socket {
  public io: socket.Server;

  constructor(http: Server) {
    this.io = socket(http);
    this.connect();
  }

  public connect() {
    this.io.on("connection", (s: socket.Socket) => {
      console.log(`connected : ${s.id}`);
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
}
