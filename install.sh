 #! /bin/bash

set -e

[[ -z $(xdotool -v)  ]] && echo "Dependency Xdotool was not found. Exiting." && exit 1

[ ! -d "$HOME/.local/share/kservices5/" ] && mkdir -p $HOME/.local/share/kservices5/
[ ! -d "$HOME/.local/share/dbus-1/services/" ] && mkdir -p $HOME/.local/share/dbus-1/services/

npm install

chmod +x src/index.js

cp -r . ~/.local/share/kservices5/joplin-runner

sed "s|%{BASE_DIR}|$HOME|g" joplin-runner.service > ~/.local/share/dbus-1/services/joplin-runner.service


pgrep -f "$HOME/.local/share/kservices5/joplin-runner/src/index.js" | grep -v $$ | xargs kill &>/dev/null

kquitapp5 krunner

printf "\nDone."