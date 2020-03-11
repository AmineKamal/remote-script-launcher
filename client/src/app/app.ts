import { exec } from "child_process";
import * as fs from "fs";
import * as io from "socket.io-client";
import * as util from "util";
import * as _ from "./commands.json";
import * as Config from "./config";

const run = util.promisify(exec);

export class App {
  public commands: { [key: string]: string };
  private s: SocketIOClient.Socket;
  private runHtml?: (name: string, b: boolean) => void;

  public constructor(runHtml?: (name: string, b: boolean) => void) {
    this.commands = JSON.parse(
      fs.readFileSync(__dirname + "/commands.json", "utf-8")
    );
    this.runHtml = runHtml;
  }

  public keys() {
    return Object.keys(this.commands);
  }

  public connect() {
    if (!this.s) {
      this.s = io(Config.BACKEND_URL + "?name=desktop_1");
      this.handlers();
    }
  }

  public disconnect() {
    if (this.s) {
      this.s.disconnect();
      this.s = undefined;
    }
  }

  public editCommand(name: string, command: string) {
    this.commands[name] = command;
    this.saveCommands();
  }

  public deleteCommand(name: string) {
    delete this.commands[name];
    this.saveCommands();
  }

  public async run(command: string) {
    if (!this.commands[command]) return null;

    if (this.runHtml) this.runHtml(command, true);
    const res = await run(this.commands[command]);
    if (this.runHtml) this.runHtml(command, false);

    // tslint:disable-next-line:no-console
    console.log(res);
    return res;
  }

  private saveCommands() {
    fs.writeFileSync(
      __dirname + "/commands.json",
      JSON.stringify(this.commands)
    );
  }

  private handlers() {
    this.s.on("run", async (command: string) => {
      const res = await this.run(command);
      this.s.emit("res", res);
    });
  }
}
