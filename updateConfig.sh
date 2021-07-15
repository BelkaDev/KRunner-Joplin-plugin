 #! /bin/bash

# run after you update config.js

rm $HOME/.local/share/kservices5/joplin-runner/config.js
cp config.js $HOME/.local/share/kservices5/joplin-runner/
pgrep -f "$HOME/.local/share/kservices5/joplin-runner/src/index.js" | grep -v $$ | xargs kill &>/dev/null