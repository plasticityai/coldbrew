FROM python:3.8.0b4

RUN apt-get update

# Install Java
RUN apt-get install default-jre cmake ninja-build -y

# Install Emscripten
ADD src/tools/install_emscripten.sh /tmp/install_emscripten.sh
RUN /tmp/install_emscripten.sh

# Install Python dependencies
RUN apt-get install build-essential -y
RUN apt-get install libffi-dev libssl-dev zlib1g-dev libncurses5-dev libncursesw5-dev libreadline-dev libsqlite3-dev  -y
RUN apt-get install libgdbm-dev libdb5.3-dev libbz2-dev libexpat1-dev liblzma-dev tk-dev -y

# Install OpenSSL with thread support
RUN wget http://www.openssl.org/source/openssl-1.0.1g.tar.gz
RUN tar -xvzf openssl-1.0.1g.tar.gz
RUN cd openssl-1.0.1g && ./config threads -D_REENTRANT
RUN cd openssl-1.0.1g && make
RUN cd openssl-1.0.1g && make install_sw
RUN rm -rf openssl-1.0.1g.tar.gz openssl-1.0.1g

# Install Java for Closure Compiler
RUN cd /opt && curl -L https://github.com/AdoptOpenJDK/openjdk8-binaries/releases/download/jdk8u222-b10/OpenJDK8U-jre_x64_linux_hotspot_8u222b10.tar.gz -o jre.tar.gz && tar zxvf jre.tar.gz --one-top-level=jre
RUN rm /opt/jre.tar.gz
RUN echo "\n\nPATH=/opt/jre/jdk8u222-b10-jre/bin:\$PATH" >> /usr/local/coldbrew/emsdk/emsdk_env.sh

# Install Makefile dependencies
RUN apt-get install zip unzip rsync -y

# Install wasm-nm and wasm-gc
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
RUN /bin/bash -c "source $HOME/.cargo/env; cargo install wasm-nm"
RUN /bin/bash -c "source $HOME/.cargo/env; cargo install wasm-gc"

# Install uglify-js and Google Closure Compiler
RUN /bin/bash -c "cd /usr/local/coldbrew/emsdk; source ./emsdk_env.sh; npm install -g uglify-es google-closure-compiler"

# Increase node memory size
RUN /bin/bash -c "cd /usr/local/coldbrew/emsdk; source ./emsdk_env.sh; mv \$EMSDK_NODE \$EMSDK_NODE.bak"
RUN /bin/bash -c "cd /usr/local/coldbrew/emsdk; source ./emsdk_env.sh; echo -e '#!/usr/bin/env bash' >> \$EMSDK_NODE"
RUN /bin/bash -c "cd /usr/local/coldbrew/emsdk; source ./emsdk_env.sh; echo -e \"\$EMSDK_NODE.bak --max_old_space_size=16384 \\\"\\\$@\\\"\" >> \$EMSDK_NODE"
RUN /bin/bash -c "cd /usr/local/coldbrew/emsdk; source ./emsdk_env.sh; chmod +x \$EMSDK_NODE"
RUN /bin/bash -c "cd /usr/local/coldbrew/emsdk; source ./emsdk_env.sh; cat \$EMSDK_NODE"

# Clean up the Docker image, for smaller image sizes
RUN rm -rf /usr/share/locale/*
RUN rm -rf /var/lib/apt/lists/*
RUN rm -rf /root/.rustup
# RUN rm -rf /usr/share/*
RUN rm -rf /usr/lib/x86_64-linux-gnu/dri
RUN rm -rf /usr/lib/x86_64-linux-gnu/libicudata.a
RUN rm -rf /usr/lib/x86_64-linux-gnu/libicudata.so.57.1
RUN rm -rf /usr/lib/x86_64-linux-gnu/libicui18n.a
RUN rm -rf /usr/lib/x86_64-linux-gnu/libicuuc.a
RUN rm -rf /usr/lib/x86_64-linux-gnu/perl
RUN rm -rf /usr/lib/jvm/*
RUN find /usr/local/coldbrew/emsdk/clang/fastcomp/llvm -mindepth 1 -maxdepth 1 ! -name 'include' -type d,f,l -exec rm -rf {} +
RUN find /usr/local/coldbrew/emsdk/clang/fastcomp/build_master_64 -mindepth 1 -maxdepth 1 ! -name 'lib' ! -name 'include' ! -name 'bin' -type d,f,l -exec rm -rf {} +
RUN find /usr/local/coldbrew/emsdk/clang/fastcomp/build_master_64/bin -mindepth 1 -maxdepth 1  ! -name 'llvm-config' ! -name 'llvm-extract' ! -name 'opt' -type d,f,l -exec rm -rf {} +

RUN mkdir -p /BUILD

CMD /bin/bash -c "cd /usr/local/coldbrew/emsdk; source ./emsdk_env.sh; cd /BUILD/src; make"
