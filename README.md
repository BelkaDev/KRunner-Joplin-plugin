
# KRunner-Joplin-plugin 

This plugin uses DBus to communicate with KRunner. 

https://user-images.githubusercontent.com/49416514/126008779-d9b0d368-8517-4d2c-ae8a-4f6173c43cdb.mp4


Usage:
- Search all notes: `<prefix> <filter>:<query>`
- Search all notes inside a notebook `<prefix> <notebook>/<filter>:<search>` <br/>
[Filters reference](https://joplinapp.org/help/#search-filters) from Joplin API. <br/>

Requirements:
- Xdotool

## Installation

### Joplin Send Action plugin
First, you need to install the latest released JPL plugin package (*.jpl) from [here](https://github.com/BelkaDev/joplin-send-action-plugin/releases/tag/V1.0.0). Then:
- Cmd :
```bash
# Replace config file with your own
cp com.joplin.sendAction.jpl ~/.config/joplin-desktop/plugins 
```
- Manually

  *  Open Joplin and navigate to Tools > Options > Plugins
  *  Press Install plugin and select the previously downloaded jpl file
  *  Confirm selection
  <br/>

Restart Joplin to enable the plugin.
***
### Krunner plugin
##### CMD
``` bash
curl -s https://raw.githubusercontent.com/BelkaDev/KRunner-Joplin-plugin/master/install.sh | sh
### Or
git clone https://github.com/BelkaDev/KRunner-joplin-plugin
cd KRunner-joplin-plugin
chmod +x install.sh && ./install.sh
```
Important: The runner will not work without changing `config.js` <br/>
You can fetch notes from a daemonized Joplin instance using this command (run on startup):
```bash
# Replace config file with your own
joplin --profile ~/.config/joplin-desktop/ server start
```

##### Manual
```bash
git clone https://github.com/BelkaDev/KRunner-joplin-plugin
cd KRunner-joplin-plugin
npm install
chmod +x src/index.js
```
* Edit `Config.js` File
* Copy folder to `~/.local/share/kservices5/joplin-runner`
* Copy file `joplin-runner.service` to  `~/.local/share/dbus-1/services/joplin-runner.service`
```bash
kquitapp5 krunner
```
***
## Features
* Search, open, create new notes.
* Output formatting.
* Send focus to client upon selection.
* Launch Joplin if it's not running initially


## Troubleshooting 
### Notes aren't showing up
* Make sure a joplin client or daemon is running in server mode (enable webClipper) 
To run joplin daemon:
```bash
joplin --profile ~/.config/joplin-desktop/ server start
```
* Make sure you have an active Dbus session running with this command
```bash
env | grep DBUS_SESSION_BUS_ADDRESS
```
If empty, add it manually to your shell settings file:
```bash
echo "export $(dbus-launch | head -n1)" >> ~/.bashrc
```

### Selection/Focus isn't working 
* Check that the config settings are matching to the plugins.

### Config file isn't updating
* Run `updateSettings.sh` to update your config changes.

### I want to delete the runner
* Run `uninstall.sh`
