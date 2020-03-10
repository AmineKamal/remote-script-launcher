import { Express } from "express";
import { indexController } from "../controllers/index.controller";

export default class Routes {
  constructor(app: Express) {
    app.route("/").get(indexController.index);
  }
}
