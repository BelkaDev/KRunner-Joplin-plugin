# Plasma Joplin-runner

This plugin uses DBus to communicate with KRunner.


## Dependencies
- This plugin relies on [sendAction](https://github.com/BelkaDev/joplin-send-action-plugin) plugin to control the Joplin client externally.
- xdotool  

## Installation

``` bash

curl -s https://raw.githubusercontent.com/BelkaDev/KRunner-Joplin-plugin/master/install.sh | sh

### Or
git clone https://github.com/BelkaDev/KRunner-joplin-plugin
cd KRunner-joplin-plugin
chmod +x install.sh && ./install.sh
```
Note: The runner will not work without updating `config.js`
Make sure to edit the config file and run `updateSettings.sh` to apply your settings.

## Manual installation
```bash
git clone https://github.com/BelkaDev/KRunner-joplin-plugin
cd KRunner-joplin-plugin
npm install
chmod +x src/index.js
```
Edit `Config.js` File
copy folder to `~/.local/share/kservices5/joplin-runner`
copy file `joplin-runner.service` to  `~/.local/share/dbus-1/services/joplin-runner.service`
```bash
kquitapp5 krunner
```


## Features
* Lookup notes following the joplin data API [documentation ](https://joplinapp.org/api/references/rest_api/)
* Search and Format results in a hierarchical structure: `Notebook/Note` (one depth down)
* Open / create notes and send focus upon selection
* Opens Joplin client automatically if it's not running


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