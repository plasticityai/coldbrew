#!/usr/bin/env bash

docker build . -t coldbrew:latest
docker run --rm -it -v $(pwd):/BUILD coldbrew:latest