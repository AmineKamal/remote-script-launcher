// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// tslint:disable-next-line:no-var-requires
const Dialogs = require("dialogs");

import { App } from "./app/app";

const app = new App(run);
const dialogs = new Dialogs();
app.connect();

const template = `<li
id="command-$name"
class="collection-item avatar"
style="display: flex; align-items: center; justify-content: space-between; height: 100px;"
>
<div style="display: flex; align-items: center; height: 100px;">
  <i class="material-icons circle">settings</i>
  <span class="title">$name</span>
</div>
<span id="run-$name" class="btn-floating green" style="display:none">
    <i class="material-icons">directions_run</i>
  </span>
<div
  style="display: flex; width: 150px; height: 100%; justify-content: space-around; align-items: center"
>
  <button id="play-$name" class="btn-floating green">
    <i class="material-icons">play_arrow</i>
  </button>
  <button id="edit-$name" class="btn-floating yellow">
    <i class="material-icons">edit</i>
  </button>
  <button id="delete-$name" class="btn-floating red">
    <i class="material-icons">delete</i>
  </button>
</div>
</li>`;

function makeNode(str: string) {
  const div = document.createElement("div");
  div.innerHTML = str.trim();

  return div.firstChild;
}

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

function run(name: string, b: boolean) {
  const s = b ? "block" : "none";
  document.getElementById("run-" + name).style.display = s;
}

function createCommand(name: string) {
  const t = template.replace(/\$name/g, name);
  document.getElementById("commands").appendChild(makeNode(t));
  const e = document.getElementById("edit-" + name);
  const d = document.getElementById("delete-" + name);
  const p = document.getElementById("play-" + name);

  e.addEventListener("click", () => edit(name));
  d.addEventListener("click", () => del(name));
  p.addEventListener("click", () => play(name));
}

const add = async () => {
  do {
    const name = await dialogs.prompt("Enter the name of the new command");
    if (!name) return;

    if (app.keys().includes(name))
      await dialogs.alert("This command already exist!");
  } while (app.keys().includes(name));

  const command = await dialogs.prompt(
    "Enter the action to run for the command " + name + "."
  );

  if (!command) return;

  app.editCommand(name, command);
  createCommand(name);
  await dialogs.alert("Command Added!");
};

document.getElementById("add-command").addEventListener("click", () => add());
app.keys().forEach(k => createCommand(k));
