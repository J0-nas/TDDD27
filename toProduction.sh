#!/usr/bin/env bash
#!/bin bash
cd dev_server && ./node_modules/webpack/bin/webpack.js -p src/ && cd ../ && bash deploy_static_page.sh && cd mousika && mix do deps.get, compile && MIX_ENV=prod mix phoenix.digest && MIX_ENV=prod mix compile && MIC_ENV=prod mix release
