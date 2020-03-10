import * as socket from "socket.io";

export namespace SocketUtils {
  export type Event = "";

  export class Socket {
    private s: socket.Socket;

    public constructor(s: socket.Socket) {
      this.s = s;
    }

    public get connected() {
      return this.s.connected;
    }

    public on<T>(event: Event, listener: (args: T) => void) {
      if (this.connected) {
        this.s.on(event, (args: any) => {
          listener(this.parse(args));
        });
      }
    }

    public emit<T>(event: Event, data: T) {
      if (this.connected) {
        this.s.emit(event, data);
      }
    }

    public forget(event: Event) {
      this.s.removeAllListeners(event);
    }

    public get id() {
      return this.s.id;
    }

    private parse<T>(args: string | T) {
      let ret: T;

      try {
        ret = JSON.parse(args as string) as T;
      } catch (e) {
        ret = args as T;
      }

      return ret;
    }
  }
}
