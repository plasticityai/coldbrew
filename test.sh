#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "Launching server..."
$(./serve.sh || true)&

sleep 5;

echo "Running mocha tests..."
mocha --exit --timeout 120000 tests/**/*;