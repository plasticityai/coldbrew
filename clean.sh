#!/usr/bin/env bash

if docker pull "registry.gitlab.com/plasticity/coldbrew/builder:$(python3 -c "import version; print(version.__version__)")"; then
    echo "Using remote pre-built Coldbrew Docker image..."
    docker tag "registry.gitlab.com/plasticity/coldbrew/builder:$(python3 -c "import version; print(version.__version__)")" "coldbrew:latest"
    docker run --rm -it -v $(pwd)/customize:/BUILD/customize coldbrew:latest /bin/bash -c "cd /BUILD/src; make clean"
    docker run --rm -it -v $(pwd)/customize:/BUILD/customize coldbrew:latest /bin/bash -c "cd /BUILD/src; make clean"
    docker run --rm -it -v $(pwd)/customize:/BUILD/customize coldbrew:latest /bin/bash -c "cd /BUILD/src; make clean"
else
    echo "Using locally built Coldbrew Docker image..."
    docker build . -t coldbrew:latest
    mkdir -p $(pwd)/cache
    docker run --rm -it -v $(pwd):/BUILD -v $(pwd)/cache:/root/.emscripten_cache/ coldbrew:latest /bin/bash -c "cd /BUILD/src; make clean"
    docker run --rm -it -v $(pwd):/BUILD -v $(pwd)/cache:/root/.emscripten_cache/ coldbrew:latest /bin/bash -c "cd /BUILD/src; make clean"
    docker run --rm -it -v $(pwd):/BUILD -v $(pwd)/cache:/root/.emscripten_cache/ coldbrew:latest /bin/bash -c "cd /BUILD/src; make clean"
fi