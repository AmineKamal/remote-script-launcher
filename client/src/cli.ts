// tslint:disable:no-console

console.log("Running in background...");

import { App } from "./app/app";
const app = new App();
app.connect();
