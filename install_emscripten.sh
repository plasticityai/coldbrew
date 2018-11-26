#!/usr/bin/env bash

mkdir -p /usr/local/coldbrew/ && cd /usr/local/coldbrew/ && rm -rf emsdk && git clone https://github.com/juj/emsdk.git && cd ./emsdk && ./emsdk install latest && ./emsdk activate latest
