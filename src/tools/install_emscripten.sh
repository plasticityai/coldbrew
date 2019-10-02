#!/usr/bin/env bash

# List all of the installable things
mkdir -p /usr/local/coldbrew/ && cd /usr/local/coldbrew/ && rm -rf emsdk && git clone https://github.com/juj/emsdk.git && cd ./emsdk && ./emsdk list --old

# Install  emsdk
mkdir -p /usr/local/coldbrew/ && cd /usr/local/coldbrew/ && rm -rf emsdk && git clone https://github.com/juj/emsdk.git && cd ./emsdk && ./emsdk install latest-upstream && ./emsdk activate latest-upstream

# Install latest clang
# Temporarily make it so that ld cannot run in parallel (since compiling clang crashes when linking in parallel due to large files)
mv /usr/bin/ld /usr/bin/ld.bak
echo -e '#!/bin/sh\n\nflock /tmp/llvm-build.lock /usr/bin/ld.bak "$@"' > /usr/bin/ld
chmod +x /usr/bin/ld
if [[ ! -z "$CI" ]]; then
  echo "Detected CI...using 30 jobs to build...."
  mkdir -p /usr/local/coldbrew/emsdk/clang/fastcomp/ && cd /usr/local/coldbrew/emsdk/clang/fastcomp/ && git clone --recurse-submodules https://github.com/llvm-mirror/llvm.git && mkdir -p build_master_64 && cd build_master_64 && cmake -GNinja -DCMAKE_BUILD_TYPE=Release -DLLVM_TARGETS_TO_BUILD="X86" -DLLVM_EXPERIMENTAL_TARGETS_TO_BUILD="WebAssembly" ../llvm && ninja -j30
else
  mkdir -p /usr/local/coldbrew/emsdk/clang/fastcomp/ && cd /usr/local/coldbrew/emsdk/clang/fastcomp/ && git clone --recurse-submodules https://github.com/llvm-mirror/llvm.git && mkdir -p build_master_64 && cd build_master_64 && cmake -GNinja -DCMAKE_BUILD_TYPE=Release -DLLVM_TARGETS_TO_BUILD="X86" -DLLVM_EXPERIMENTAL_TARGETS_TO_BUILD="WebAssembly" ../llvm && ninja
fi
# Restore old version of ld
mv /usr/bin/ld.bak /usr/bin/ld

echo -e "\n\nPATH=/usr/local/coldbrew/emsdk/upstream/emscripten:/usr/local/coldbrew/emsdk/node/12.9.1_64bit/bin:/usr/local/coldbrew/emsdk/upstream/bin:/usr/local/coldbrew/emsdk/clang/fastcomp/build_master_64/bin:$PATH" >> /usr/local/coldbrew/emsdk/emsdk_env.sh
