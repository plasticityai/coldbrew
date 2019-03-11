#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

(
  cd $DIR;
  diff -u build/3.5.2/Python-3.5.2/Python/ceval.c.orig build/3.5.2/Python-3.5.2/Python/ceval.c > 3.5.2/patches/add-interpreter-loop-yield.diffpatch;
  diff -u build/3.5.2/Python-3.5.2/Objects/methodobject.c.orig build/3.5.2/Python-3.5.2/Objects/methodobject.c > 3.5.2/patches/no-yield-pycfunction_call.diffpatch;
  diff -u build/3.5.2/Python-3.5.2/Objects/abstract.c.orig build/3.5.2/Python-3.5.2/Objects/abstract.c > 3.5.2/patches/no-yield-pyobject_call.diffpatch;
)