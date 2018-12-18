#!/usr/bin/env bash

docker build . -t coldbrew:latest
docker run --rm -it -v $(pwd):/BUILD coldbrew:latest /bin/bash -c "cd /BUILD/src; make clean"
docker run --rm -it -v $(pwd):/BUILD coldbrew:latest /bin/bash -c "cd /BUILD/src; make clean"
docker run --rm -it -v $(pwd):/BUILD coldbrew:latest /bin/bash -c "cd /BUILD/src; make clean"