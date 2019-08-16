#!/usr/bin/env bash

mkdir -p /usr/local/coldbrew/ && cd /usr/local/coldbrew/ && rm -rf emsdk && git clone https://github.com/juj/emsdk.git && cd ./emsdk && ./emsdk list --old && ./emsdk install sdk-1.38.28-64bit && ./emsdk activate sdk-1.38.28-64bit
