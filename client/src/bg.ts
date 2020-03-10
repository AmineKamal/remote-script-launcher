// tslint:disable:no-console

console.log("Running in background...");

import * as io from "socket.io-client";
const s = io("http://localhost:3000");
