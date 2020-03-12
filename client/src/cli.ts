// tslint:disable:no-console

console.log("Running in background...");

import { App } from "./app/app";
const app = new App();
app.connect();

class Dialogs {
  public async prompt(str: string) {
    return "";
  }

  public async alert(str: string) {
    return;
  }

  public async confirm(str: string) {
    return true;
  }
}

const dialogs = new Dialogs();

const edit = async (name: string) => {
  const res = await dialogs.prompt(
    "Enter the new action to run for the command " + name + "."
  );

  if (!res) return;

  app.editCommand(name, res);
  await dialogs.alert("Command Updated!");
};

const del = async (name: string) => {
  const res = await dialogs.confirm(
    "Are you sure you want to delete the command " + name + "."
  );

  if (res) {
    app.deleteCommand(name);
    document.getElementById("command-" + name).remove();
  }
};

const play = async (name: string) => {
  const res = await app.run(name);
  await dialogs.alert(JSON.stringify(res));
};
