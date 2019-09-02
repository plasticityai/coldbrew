#!/usr/bin/env bash

WASM_LD=$(which wasm-ld)
mv $WASM_LD $WASM_LD.bak
echo -e '#!'"/bin/sh\n\n$WASM_LD.bak \"\$@\" || $WASM_LD.bak --shared-memory \"\$@\"" > $WASM_LD
chmod +x $WASM_LD