#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

(
  cd $DIR;
    if docker pull "registry.gitlab.com/plasticity/coldbrew/builder:$(python3 -c "import version; print(version.__version__)")"; then
        echo "Using remote pre-built Coldbrew Docker image...";
        docker tag "registry.gitlab.com/plasticity/coldbrew/builder:$(python3 -c "import version; print(version.__version__)")" "coldbrew:latest";
        docker rmi "registry.gitlab.com/plasticity/coldbrew/builder:$(python3 -c "import version; print(version.__version__)")";
        docker run --rm -it -v $(pwd)/customize:/BUILD/customize -v $(pwd)/dist:/BUILD/dist -v $(pwd)/src:/BUILD/src -v $(pwd)/third_party:/BUILD/third_party coldbrew:latest /bin/bash -c "cd /BUILD/src; make clean";
        docker run --rm -it -v $(pwd)/customize:/BUILD/customize -v $(pwd)/dist:/BUILD/dist -v $(pwd)/src:/BUILD/src -v $(pwd)/third_party:/BUILD/third_party coldbrew:latest /bin/bash -c "cd /BUILD/src; make clean";
        docker run --rm -it -v $(pwd)/customize:/BUILD/customize -v $(pwd)/dist:/BUILD/dist -v $(pwd)/src:/BUILD/src -v $(pwd)/third_party:/BUILD/third_party coldbrew:latest /bin/bash -c "cd /BUILD/src; make clean";
    else
        echo "Using locally built Coldbrew Docker image...";
        docker build . -t coldbrew:latest;
        mkdir -p $(pwd)/cache;
        docker run --rm -it -v $(pwd):/BUILD -v $(pwd)/cache:/root/.emscripten_cache/ coldbrew:latest /bin/bash -c "cd /BUILD/src; make clean";
        docker run --rm -it -v $(pwd):/BUILD -v $(pwd)/cache:/root/.emscripten_cache/ coldbrew:latest /bin/bash -c "cd /BUILD/src; make clean";
        docker run --rm -it -v $(pwd):/BUILD -v $(pwd)/cache:/root/.emscripten_cache/ coldbrew:latest /bin/bash -c "cd /BUILD/src; make clean";
    fi
)