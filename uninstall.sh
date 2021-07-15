 #! /bin/sh


pgrep -f "$HOME/.local/share/kservices5/joplin-runner/src/index.js" | grep -v $$ | xargs kill &>/dev/null

[ -d "$HOME/.local/share/kservices5/joplin-runner/" ] && rm -r $HOME/.local/share/kservices5/joplin-runner/; 

[ -f "$HOME/.local/share/dbus-1/services/joplin-runner.service" ] && rm $HOME/.local/share/dbus-1/services/joplin-runner.service; 

kquitapp5 krunner


printf "Done."

