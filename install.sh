 #! /bin/sh

set -eE -o functrace

log_err() {
  local lineno=$1;local msg=$2
  printf "\nError at $lineno: $msg"
}

trap 'log_err ${LINENO} "$BASH_COMMAND"' ERR

[[ -z $(xdotool -v)  ]] && echo "Dependency Xdotool was not found. Exiting." && exit 1

[ ! -d "$HOME/.local/share/kservices5/" ] && mkdir -p $HOME/.local/share/kservices5/
[ ! -d "$HOME/.local/share/dbus-1/services/" ] && mkdir -p $HOME/.local/share/dbus-1/services/

[ ! -f "plasma-runner-joplin.desktop" ] && git clone "https://github.com/BelkaDev/KRunner-joplin-plugin" "KRunner-joplin-plugin" && cd KRunner-joplin-plugin

npm install

chmod +x src/index.js

rsync -a --exclude=".*" --exclude "assets" . ~/.local/share/kservices5/joplin-runner

sed "s|%{BASE_DIR}|$HOME|g" joplin-runner.service > ~/.local/share/dbus-1/services/joplin-runner.service

kquitapp5 krunner

printf "\nInstallation complete."
