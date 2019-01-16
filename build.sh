#!/usr/bin/env bash

docker build . -t coldbrew:latest
mkdir -p $(pwd)/cache
echo docker run --rm -t -v $(pwd):/BUILD -v $(pwd)/cache:/root/.emscripten_cache/ coldbrew:latest
ls $(pwd)/src
docker run --rm -t -v $(pwd):/BUILD -v $(pwd)/cache:/root/.emscripten_cache/ coldbrew:latest