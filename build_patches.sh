#!/usr/bin/env bash

diff -u build/3.5.2/Python-3.5.2/Python/ceval.c.orig build/3.5.2/Python-3.5.2/Python/ceval.c > 3.5.2/patches/add-interpreter-loop-yield.diffpatch
diff -u build/3.5.2/Python-3.5.2/Objects/funcobject.c.orig build/3.5.2/Python-3.5.2/Objects/funcobject.c > 3.5.2/patches/log-func-call.diffpatch