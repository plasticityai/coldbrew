#!/usr/bin/env bash

docker build . -t coldbrew:latest
mkdir -p $(pwd)/cache
docker run --rm -it -v $(pwd):/BUILD -v $(pwd)/cache:/root/.emscripten_cache/ coldbrew:latest /bin/bash -c "cd /usr/local/coldbrew/emsdk; source ./emsdk_env.sh; cd /BUILD/; /bin/bash"