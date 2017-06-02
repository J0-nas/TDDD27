#!/bin/bash

cd dev_server
./node_modules/webpack/bin/webpack.js -p src/
cd ..
bash deploy_static_page.sh

#compile for the js and html to be up to date ?!?
cd mousika
MIX_ENV=dev mix compile
MIX_ENV=dev mix phoenix.digest
MIX_ENV=dev PORT=4000 mix phoenix.server
