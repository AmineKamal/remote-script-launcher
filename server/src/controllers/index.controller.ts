import { Request, Response } from "express";
import { Socket } from "../socket/index";

export default class IndexController {
  public index(req: Request, res: Response, next: Function): void {
    res.render("index", { title: "Remote Script Launcher Server" });
  }

  public run(req: Request, res: Response, next: Function): void {
    Socket.get().run("ls");
    res.json(null);
  }
}

export const indexController = new IndexController();
