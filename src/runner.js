const dbus = require("dbus-native");
const fetch = require("node-fetch");
const config = require("../config.js");
const exec = require("child_process").exec;
const { createKRunnerInterface } = require("./dbus-connection");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const execSync = cmd => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) console.warn(error);
     !(stderr||error) 
     ? resolve(...stdout.split('\n')) 
     : reject(new Error(`${stderr} ${error}`));
    });
  });
};


const sessionBus = dbus.sessionBus();
if (!sessionBus) throw new Error("Failed to connect to the session bus");

createKRunnerInterface({
  path: "/joplin",
  async runFunction(match,action) {

    const [note, folder] = match.split(":");

    const path = folder
      ? `http://localhost:${config.sendAction.port}/notes/create?folderId=${folder}&noteTitle=${note}`
      : `http://localhost:${config.sendAction.port}/notes/open/${note}`;


    await execSync(`echo "$(xdotool search --onlyvisible --class joplin)"`)
      .then(async (WID) => {
        await fetch(path).then( () => {
        // Focus window
        execSync(`xdotool windowactivate ${WID}`)
        });
      })
      .catch(async ex => {
        // Open client 
            var proc = require("child_process").spawn(config.runner.joplinPath, [] , {detached:true, stdio:['ignore']});
            proc.unref();

        await execSync(`until WID="$(xdotool search --onlyvisible --class joplin)"
      do sleep 1; done; printf "$WID"`).then(async (WID) => {      
          await execSync("sleep 2s && echo ''").then(async ()=>{ // wait for client/plugin to init
          await fetch(path).then((x)=>{ 
          // Focus window
          execSync(`xdotool windowactivate ${WID}`).catch()
          }).catch((e) =>
          console.error(e) 
          );
          }); 
 
        });
      });
  },
  async matchFunction(query,log) {
    if (query.replace(/ .*/, "") !== config.runner.prefix) matchFunction();

    query = query
      .split(/\s/)
      .slice(1)
      .join(" ");

    query = query === "" ? "-" : query;

    let folder = "";
    if (/\//.test(query)) {
      folder = `${query.split("/")[0]}`;
      query = `notebook:${folder} ${query.split("/")[1]}`;
    }

    let results = await fetch(
      `http://localhost:${config.webClipper.port}/search?query=${query}\
      &order_by=${config.runner.order_by}\
      &order_dir=${config.runner.order_dir}\
      &limit=${config.runner.show}\
      &token=${config.webClipper.token}`
    )
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        return data.items;
      });
    let notes = results.map(async note => {
      await fetch(
        `http://localhost:${config.webClipper.port}/folders/${note.parent_id}?token=${config.webClipper.token}`
      )
        .then(res => {
          return res.json();
        })
        .then(notebook => {
          note.title = `[${notebook.title}] ${note.title}`;
        });
      return note;
    });
    notes = await Promise.all(notes).then(note => {
      return note;
    });

    const output = notes.map(note => {
      return [note.id, note.title, "joplin", 50, 10, {}];
    });

    query = /:/.test(query) ? query.split(":")[query.split(":").length -1] : query; // ignore filters
    if (folder) {
      const searchFolder = await fetch(
        `http://localhost:${config.webClipper.port}/search?query=${folder}&type=folder&token=${config.webClipper.token}`
      );
      const notebook = await searchFolder.json();
      if (notebook.items)
        output.push([
          `${query.replace(folder, "")}:${notebook.items[0].id}`,
          `Create new note "${query.replace(folder+" ", "")}" in ${
            notebook.items[0].title
          }`,
          "joplin",
          50,
          10,
          {}
        ]);
    }
    return output;
  }
});
