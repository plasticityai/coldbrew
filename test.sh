#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

if [[ ! -z "$CI" ]]; then
  echo "Detected CI...not building...."
else
  ./build.sh
fi

(
  cd $DIR
  echo "Launching server..."
  $(./serve.sh || true)&

  sleep 5;

  echo "Running mocha tests..."
  node_modules/mocha/bin/mocha --exit --timeout 20000 --retries 5 $@ tests/**/*;
)