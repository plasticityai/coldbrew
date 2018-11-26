#!/usr/bin/env bash

docker build . -t coldbrew:latest
docker run --rm -v $(pwd):/BUILD coldbrew:latest