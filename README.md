# Plasma Joplin-runner

This plugin uses DBus to communicate with KRunner.


## Dependencies
- This plugin relies on [sendAction](https://github.com/BelkaDev/joplin-send-action-plugin) plugin to control the Joplin client externally.
- xdotool  

## Installation

```
git clone https://github.com/BelkaDev/KRunner-joplin-plugin
cd KRunner-joplin-plugin
chmod +x install.sh && ./install.sh

```
## Features
* Lookup notes following the joplin data API [documentation ](https://joplinapp.org/api/references/rest_api/)
* Search and Format results in a hierarchical structure: `Notebook/Note` (1-depth)
* Open / create notes and send focus upon selection
* Opens Joplin client automatically if it's not running




## Troubleshooting 
### Notes aren't showing up
* Make sure a joplin client or daemon is running in server mode (enable webClipper and check token in config file) 
* Make sure you have an active dbus session running using 
```
env | grep DBUS_SESSION_BUS_ADDRESS
```
if nothing shows up, add it manually in your shell settings file:
```
echo "export $(dbus-launch | head -n1)" >> ~/.bashrc
```


### Selection/Focus isn't working 
* Check that the config settings are matching to the plugins.

### Config file isn't updating
* Run `updateSettings.sh` to update your config changes.