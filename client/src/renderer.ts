// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import * as io from "socket.io-client";
const s = io("http://localhost:3000");
