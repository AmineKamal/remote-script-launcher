import { Request, Response } from "express";
import { Socket } from "../socket/index";

export default class IndexController {
  public index(req: Request, res: Response, next: Function): void {
    res.render("index", { title: "Remote Script Launcher Server" });
  }

  public async run(req: Request, res: Response, next: Function): Promise<void> {
    const r = await Socket.get().run("ls");
    res.json(r);
  }
}

export const indexController = new IndexController();
