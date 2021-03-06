import * as http from "http";
import config from "./config/config";
import { Socket } from "./socket/index";

// tslint:disable-next-line: no-require-imports
require("dotenv").config();

// tslint:disable-next-line: no-require-imports
const app = require("./config/express").default();

const server: http.Server = new http.Server(app);

server.listen(parseInt(config.port, 10), "0.0.0.0");
Socket.get(server);

server.on("error", (e: Error) => {
  console.log("Error starting server" + e);
});

server.on("listening", () => {
  if (config.useMongo) {
    console.log(
      `Server started on port ${config.port} on env ${process.env.NODE_ENV ||
        "dev"} dbcon ${process.env.APP_DB_CONN}`
    );
  } else {
    console.log(
      `Server started on port ${config.port} on env ${process.env.NODE_ENV ||
        "dev"}`
    );
  }
});
