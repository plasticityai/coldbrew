#!/usr/bin/env bash

docker build . -t coldbrew:latest
docker run --rm -it -v $(pwd):/BUILD coldbrew:latest /bin/bash -c "cd /usr/local/coldbrew/emsdk; source ./emsdk_env.sh; cd /BUILD/; /bin/bash"