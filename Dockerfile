FROM python:latest

RUN apt-get update

# Install Java
RUN apt-get install default-jre -y

# Install Emscripten
RUN curl https://gitlab.com/Plasticity/coldbrew/raw/master/install_emscripten.sh | /bin/bash

# Install Clang libraries
RUN cd /usr/local/coldbrew/ && curl -o clang+llvm.tar.xz http://releases.llvm.org/6.0.1/clang+llvm-6.0.1-x86_64-linux-gnu-ubuntu-16.04.tar.xz
RUN cd /usr/local/coldbrew/ && mkdir -p ./clang+llvm && tar -C ./clang+llvm -xvf clang+llvm.tar.xz
RUN cd /usr/local/coldbrew/ && cp -R ./clang+llvm/*/ ./emsdk/clang/lib/
RUN cd /usr/local/coldbrew/emsdk/clang/lib/lib && (cp * ../ || true)
RUN cd /usr/local/coldbrew/ && cp -R ./clang+llvm/*/ ./emsdk/clang/include/
RUN cd /usr/local/coldbrew/emsdk/clang/include/include && (cp -r * ../ || true)

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

# Install Makefile dependencies
RUN apt-get install unzip rsync -y

# Install wasm-nm
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
RUN /bin/bash -c "source $HOME/.cargo/env; cargo install wasm-nm"

VOLUME /BUILD

CMD /bin/bash -c "cd /usr/local/coldbrew/emsdk; source ./emsdk_env.sh; cd /BUILD/src; make"
