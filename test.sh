#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

./serve.sh || true
mocha --exit --timeout 120000 tests/**/*;