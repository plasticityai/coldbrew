FROM python:latest

RUN apt-get update

RUN curl https://gitlab.com/Plasticity/coldbrew/raw/master/install_emscripten.sh | /bin/bash

VOLUME /BUILD

CMD /bin/bash -c "cd /usr/local/coldbrew/emsdk; source ./emsdk_env.sh; cd /BUILD/src; make"
