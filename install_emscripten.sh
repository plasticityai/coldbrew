#!/usr/bin/env bash

# List all of the installable things
mkdir -p /usr/local/coldbrew/ && cd /usr/local/coldbrew/ && rm -rf emsdk && git clone https://github.com/juj/emsdk.git && cd ./emsdk && ./emsdk list --old

# Install the latest SDK, but use a custom and full version of clang
mkdir -p /usr/local/coldbrew/ && cd /usr/local/coldbrew/ && rm -rf emsdk && git clone https://github.com/juj/emsdk.git && cd ./emsdk && ./emsdk install latest && ./emsdk activate latest && source /usr/local/coldbrew/emsdk/emsdk_env.sh && ./emsdk install clang-e1.38.28-64bit
echo -e "\n\nPATH=/usr/local/coldbrew/emsdk/fastcomp/bin/:/usr/local/coldbrew/emsdk/clang/e1.38.28_64bit:$PATH" >> /usr/local/coldbrew/emsdk/emsdk_env.sh
