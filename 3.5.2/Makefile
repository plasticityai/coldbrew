PYVERSION=3.5.2
PYMINOR=$(basename $(PYVERSION))

SQLITE_VERSION=3260000

ROOT=$(abspath ..)

HOSTINSTALL=$(ROOT)/build/$(PYVERSION)/host
HOSTBUILD=$(HOSTINSTALL)/Python-$(PYVERSION)
HOSTPYTHON=$(HOSTINSTALL)/bin/python3$(EXE)
HOSTPGEN=$(HOSTINSTALL)/bin/pgen$(EXE)

BUILD=$(ROOT)/build/$(PYVERSION)/Python-$(PYVERSION)
INSTALL=$(ROOT)/installs/python-$(PYVERSION)
TARBALL=$(ROOT)/downloads/Python-$(PYVERSION).tgz
URL=https://www.python.org/ftp/python/$(PYVERSION)/Python-$(PYVERSION).tgz
LIB=libpython$(PYMINOR).a

PTHREAD_CFLAGS=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(PTHREAD_CFLAGS)")
CFLAGS=$(PTHREAD_CFLAGS) -s WASM_OBJECT_FILES=0

all: install

clean:
	-rm -fr $(HOSTINSTALL)
	-rm -fr $(BUILD)


$(TARBALL):
	[ -d ../downloads ] || mkdir ../downloads
	wget -q -O $@ $(URL)
	md5sum --quiet --check checksums || (rm $@; false)


$(HOSTPYTHON) $(HOSTPGEN): $(TARBALL)
	mkdir -p $(HOSTINSTALL)
	[ -d $(HOSTBUILD) ] || tar -C $(HOSTINSTALL) -xf $(TARBALL)
	( \
		cd $(HOSTBUILD); \
		./configure --prefix=$(HOSTINSTALL) && \
		make install && \
		cp Parser/pgen$(EXE) $(HOSTINSTALL)/bin/ && \
		make distclean \
	)


$(BUILD)/.patched: $(TARBALL)
	[ -d $(BUILD) ] || (mkdir -p $(dir $(BUILD)); tar -C $(dir $(BUILD)) -xf $(TARBALL))
	cat patches/*.patch | (cd $(BUILD) ; patch -b -p1)
	( \
		cd $(BUILD); \
		patch -b Python/ceval.c ../../../$(PYVERSION)/patches/add-interpreter-loop-yield.diffpatch; \
		patch -b Objects/methodobject.c ../../../$(PYVERSION)/patches/no-yield-pycfunction_call.diffpatch; \
		patch -b Objects/abstract.c ../../../$(PYVERSION)/patches/no-yield-pyobject_call.diffpatch; \
	)
	touch $@


$(BUILD)/Makefile: $(BUILD)/.patched
	cp config.site $(BUILD)/
	( \
		cd $(BUILD); \
		CONFIG_SITE=./config.site READELF=true emconfigure ./configure --without-pymalloc --disable-shared --disable-ipv6 --without-gcc --host=asmjs-unknown-emscripten --build=$(shell $(BUILD)/config.guess) --prefix=$(INSTALL) CFLAGS='$(CFLAGS)' ; \
	)

$(BUILD)/Modules/_sqlite/_sqlite.o:
	( \
		cd $(BUILD); \
		wget https://www.sqlite.org/2018/sqlite-amalgamation-$(SQLITE_VERSION).zip -O Modules/_sqlite/sqlite.zip; \
		unzip Modules/_sqlite/sqlite.zip -d Modules/_sqlite; \
		cp Modules/_sqlite/sqlite-amal*/* Modules/_sqlite/; \
		emcc -DNDEBUG -DMODULE_NAME="\"sqlite3\"" -DSQLITE_OMIT_LOAD_EXTENSION=0 -DSQLITE_ENABLE_FTS3=1 -DSQLITE_ENABLE_FTS3_PARENTHESIS=1 -DSQLITE_ENABLE_FTS4=1 -DSQLITE_ENABLE_FTS5=1 -DSQLITE_ENABLE_JSON1=1 -I./Modules/_sqlite -I./Include/ -I./ -o Modules/_sqlite/_sqlite.o Modules/_sqlite/sqlite3.c Modules/_sqlite/cache.c Modules/_sqlite/connection.c Modules/_sqlite/cursor.c Modules/_sqlite/microprotocols.c Modules/_sqlite/module.c Modules/_sqlite/prepare_protocol.c Modules/_sqlite/row.c Modules/_sqlite/statement.c Modules/_sqlite/util.c $(CFLAGS) \
	)

$(BUILD)/$(LIB): $(BUILD)/Makefile $(HOSTPYTHON) $(HOSTPGEN) Setup.local $(BUILD)/Modules/_sqlite/_sqlite.o
	cp Setup.local $(BUILD)/Modules/
	( \
		cd $(BUILD)/Modules/zlib; \
		emconfigure ./configure --static \
	)
	( \
		cd $(BUILD); \
		emmake make HOSTPYTHON=$(HOSTPYTHON) HOSTPGEN=$(HOSTPGEN) CROSS_COMPILE=yes $(LIB) \
	)

install: $(BUILD)/$(LIB)
	( \
		cd $(BUILD); \
		sed -i -e 's/libinstall:.*/libinstall:/' Makefile; \
		emmake make HOSTPYTHON=$(HOSTPYTHON) PYTHON_FOR_BUILD=$(HOSTPYTHON) CROSS_COMPILE=yes inclinstall libinstall $(LIB) && \
		cp $(LIB) $(INSTALL)/lib/ && \
		cp $(HOSTINSTALL)/lib/python$(PYMINOR)/_sysconfigdata.py $(INSTALL)/lib/python$(PYMINOR)/ \
	)