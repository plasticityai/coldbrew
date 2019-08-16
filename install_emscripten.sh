#!/usr/bin/env bash

# List all of the installable things
mkdir -p /usr/local/coldbrew/ && cd /usr/local/coldbrew/ && rm -rf emsdk && git clone https://github.com/juj/emsdk.git && cd ./emsdk && ./emsdk list --old

# Install
mkdir -p /usr/local/coldbrew/ && cd /usr/local/coldbrew/ && rm -rf emsdk && git clone https://github.com/juj/emsdk.git && cd ./emsdk && ./emsdk install latest-upstream && ./emsdk activate latest-upstream && source /usr/local/coldbrew/emsdk/emsdk_env.sh && ./emsdk install clang-master-64bit
echo -e "\n\nPATH=/usr/local/coldbrew/emsdk/upstream/bin:/usr/local/coldbrew/emsdk/clang/fastcomp/build_master_64/bin:$PATH" >> /usr/local/coldbrew/emsdk/emsdk_env.sh
