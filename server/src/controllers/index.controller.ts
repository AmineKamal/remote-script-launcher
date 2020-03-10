import { Request, Response } from "express";

export default class IndexController {
  public index(req: Request, res: Response, next: Function): void {
    res.render("index", { title: "Remote Script Launcher Server" });
  }
}

export const indexController = new IndexController();
