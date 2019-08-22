COLDBREW_VERSION=$(shell python -c "import sys; sys.path.append('../'); import version; print(version.__version__)")

MODULE_NAME=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(MODULE_NAME)")
MODULE_NAME_LOWER=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(MODULE_NAME.lower())")
NODE=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(str(NODE).lower())")
DEFAULT_MEMORY=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(DEFAULT_MEMORY)")
AGGRESSIVE_VARIABLE_ELIMINATION=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(AGGRESSIVE_VARIABLE_ELIMINATION)")
UNUSED_MODULES=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(UNUSED_MODULES)")
BROWSERFS=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(str(BROWSERFS).lower())")
JSZIP=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(str(JSZIP or COMPRESS_NETWORK_FILES).lower())")
PTHREAD_CFLAGS=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(PTHREAD_CFLAGS)")
PTHREAD_LDFLAGS=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(PTHREAD_LDFLAGS)")
SYMBOLS_DEBUG_MODE=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(' -g2 ' if DEBUG_MODE else '  ')")
ASSERTIONS_DEBUG_MODE=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(' -s ASSERTIONS=1 ' if DEBUG_MODE and not(NO_ASSERTIONS) else '  ')")
export EMCC_DEBUG := $(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print('2' if DEBUG_MODE and not(NO_ASSERTIONS) else '0')")
COMPRESS_NETWORK_FILES=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(str(COMPRESS_NETWORK_FILES and not NODE).lower())")
FAST_AND_SMALL_BUT_NO_ASYNC=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(str(FAST_AND_SMALL_BUT_NO_ASYNC).lower())")

ALWAYS_ASYNC_FUNCS='export_runAsync\nexport__runFileAsync\n_Coldbrew__sleep\n_coldbrew_yield_to_javascript\nPyCFunction_Call'
ASYNC_FUNCS='PyCFunction_Call\nPyObject_Call\nPyEval_EvalCode\nPyEval_EvalCodeEx\nPyEval_EvalFrame\nPyEval_EvalFrameEx\nPyImport_ExecCodeModule\nPyImport_ExecCodeModuleEx\nPyImport_ExecCodeModuleObject\nPyImport_ExecCodeModuleWithPathnames\nPyImport_ImportFrozenModule\nPyImport_ImportFrozenModuleObject\nPyRun_AnyFile\nPyRun_AnyFileEx\nPyRun_AnyFileExFlags\nPyRun_AnyFileFlags\nPyRun_File\nPyRun_FileEx\nPyRun_FileExFlags\nPyRun_FileFlags\nPyRun_InteractiveLoop\nPyRun_InteractiveLoopFlags\nPyRun_InteractiveOne\nPyRun_InteractiveOneFlags\nPyRun_InteractiveOneObject\nPyRun_SimpleFile\nPyRun_SimpleFileEx\nPyRun_SimpleFileExFlags\nPyRun_SimpleString\nPyRun_SimpleStringFlags\nPyRun_String\nPyRun_StringFlags\nPy_FrozenMain\nPy_Initialize\nPy_InitializeEx\nPy_Main\nPy_NewInterpreter\n_PyEval_EvalCodeWithName\n_PyGen_Finalize\n_PyGen_Send\n_Py_InitializeEx_Private\n_imp_init_frozen\nbuiltin___build_class__\nbuiltin_eval\nbuiltin_exec\ncoro_wrapper_close\ncoro_wrapper_iternext\ncoro_wrapper_send\ncoro_wrapper_throw\nfast_function\nframe_clear\nfunction_call\ngen_close\ngen_close_iter\ngen_iternext\ngen_send_ex\ngen_throw\nimport_init\nzipimporter_load_module'
ASYNC_WHITELIST=$(shell (echo -n '["'; (echo $(ALWAYS_ASYNC_FUNCS); echo $(ASYNC_FUNCS)) | cat | sed -e ':a;N;$$!ba;s/\n/",\n"/g'; echo -n '"]') | sed -e ':a;N;$$!ba;s/\n"]/"]/g')

PYVERSION=3.5.2
PYMINOR=$(basename $(PYVERSION))
EMSCRIPTEN_PATH=/usr/local/coldbrew/emsdk/upstream/emscripten
EMSCRIPTEN_VERSION=$(shell cd $(EMSCRIPTEN_PATH)/*; basename $$(pwd);)
ROOT=$(abspath ..)
DOWNLOADS=$(ROOT)/downloads
BUILD=$(ROOT)/build/$(PYVERSION)/Python-$(PYVERSION)
INSTALLS=$(ROOT)/installs
CUSTOMIZED_FILES=../customize/files
COLDBREW_DIST_DIR ?= dist
PYLIB=../installs/python-$(PYVERSION)/lib/python$(PYMINOR)
CC=emcc
OPTFLAGS=-O3
CFLAGS=-std=gnu99 $(OPTFLAGS) -g -I ../installs/python-$(PYVERSION)/include/python$(PYMINOR)/ -Wno-warn-absolute-paths $(PTHREAD_CFLAGS) -s WASM_OBJECT_FILES=0
LDFLAGS=$(OPTFLAGS) $(SYMBOLS_DEBUG_MODE) \
  -s TOTAL_MEMORY=$(DEFAULT_MEMORY) \
  -s EMULATE_FUNCTION_POINTER_CASTS=1 \
  -s EXTRA_EXPORTED_RUNTIME_METHODS='["callMain", "ccall", "cwrap", "FS", "ENV"]' \
  $(PTHREAD_LDFLAGS) \
  $(AGGRESSIVE_VARIABLE_ELIMINATION) \
  --llvm-lto 1 --memory-init-file 0 \
  $(ASSERTIONS_DEBUG_MODE)
ALLOWMEMORYGROWTHFLAGS = -s ALLOW_MEMORY_GROWTH=1 --no-heap-copy
PREJSFLAGS = --pre-js prejs.js
MODULARIZEFLAGS = -s MODULARIZE=1 -s EXPORT_NAME="'_$(MODULE_NAME)_coldbrew_internal_'"

# Set flags from settings
SHOULD_ASYNCIFY =
ifeq ($(FAST_AND_SMALL_BUT_NO_ASYNC),false)
    SHOULD_ASYNCIFY = yes
endif

# Might need to uncomment (if build is not working to try and debug?)
# ifneq ($(EMCC_DEBUG),0)
# 	export EM_BUILD_VERBOSE=3
# 	export EMSCRIPT_MAX_CHUNK_SIZE=16777216
# 	export EMCC_CORES=1
# endif

# Set variables from options and flags
ifeq ($(NODE),true)
$(eval EMCC_FILE_FLAG = --embed-file)
else
$(eval EMCC_FILE_FLAG = --preload-file)
endif

ifdef SHOULD_ASYNCIFY
$(eval ASYNCFLAGS = -s ASYNCIFY=1 -s ASYNCIFY_WHITELIST='$(ASYNC_WHITELIST)')
endif
ifneq ($(EMCC_DEBUG),0)
$(eval _JSCC = cat)
$(eval JSCC = cat)
$(eval UGLIFY = cat)
else
$(eval JSCC = google-closure-compiler -W QUIET )
$(eval UGLIFY = uglifyjs --compress )
endif

SRCS := $(wildcard *.c)
BCS := $(SRCS:.c=.bc)

rwildcard=$(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2) $(filter $(subst *,%,$2),$d))


all: ../$(COLDBREW_DIST_DIR) $(MODULE_NAME_LOWER).js.make index.html

python: ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).o

index.html: index.html.pre.html $(MODULE_NAME_LOWER).js Makefile
	sed -e 's/FAST_AND_SMALL_BUT_NO_ASYNC/$(FAST_AND_SMALL_BUT_NO_ASYNC)/g; s/MODULE_NAME_LOWER/$(MODULE_NAME_LOWER)/g; s/MODULE_NAME/$(MODULE_NAME)/g;' index.html.pre.html > index.html

../$(COLDBREW_DIST_DIR): $(MODULE_NAME_LOWER).js.make Makefile index.html ../README.md ../package.json
	rm -rf ../$(COLDBREW_DIST_DIR)/* || true
	rm -rf ../$(COLDBREW_DIST_DIR)/**/* || true
	mkdir -p ../$(COLDBREW_DIST_DIR) || true
	cp $(MODULE_NAME_LOWER).* ../$(COLDBREW_DIST_DIR)
	cp index.html ../$(COLDBREW_DIST_DIR)
	rm ../$(COLDBREW_DIST_DIR)/*.wasm.pre 2>/dev/null || true
	rm ../$(COLDBREW_DIST_DIR)/*.orig.js 2>/dev/null || true
	rm ../$(COLDBREW_DIST_DIR)/*.intermediate.js 2>/dev/null || true
	rm ../$(COLDBREW_DIST_DIR)/*.wast 2>/dev/null || true
	rm ../$(COLDBREW_DIST_DIR)/*.bak 2>/dev/null || true
	rm ../$(COLDBREW_DIST_DIR)/*.make 2>/dev/null || true
	rm ../$(COLDBREW_DIST_DIR)/*.tmp 2>/dev/null || true
ifeq ($(NODE),true)
		sed -e 's/VERSION/$(COLDBREW_VERSION)/g; s/MODULE_NAME_LOWER/$(MODULE_NAME_LOWER)/g;' ../package.json > ../$(COLDBREW_DIST_DIR)/package.json
		sed -e 's/VERSION/$(COLDBREW_VERSION)/g; s/MODULE_NAME_LOWER/$(MODULE_NAME_LOWER)/g;' ../package-lock.json > ../$(COLDBREW_DIST_DIR)/package-lock.json
		( \
			cd ../$(COLDBREW_DIST_DIR); \
		)
		cp ../README.md ../$(COLDBREW_DIST_DIR)/README.md
endif

$(MODULE_NAME_LOWER).js.make: $(MODULE_NAME_LOWER).js ../customize/export.js module.js.pre.js ../third_party/fast-text-encoding/text.min.js ../third_party/comlink/comlink.js
	# Start global closure
	echo "(function () {" > $(MODULE_NAME_LOWER).js
	echo "const SCRIPT_SOURCE = (typeof document !== 'undefined' && document.currentScript.src) || (typeof self !== 'undefined' && self.location && self.location.href) || (this.thread && this.thread.__filename) || __filename;" >> $(MODULE_NAME_LOWER).js
	# Start a named closure, this is so that we can unload() and reload() everything the library does easily
	echo "(function COLDBREW_TOP_SCOPE_FUNC(shouldExportColdbrew = true, coldbrewObjectReference={}) {" >> $(MODULE_NAME_LOWER).js
	echo "const COLDBREW_TOP_SCOPE = {};" >> $(MODULE_NAME_LOWER).js
	echo "const $(MODULE_NAME) = coldbrewObjectReference;" >> $(MODULE_NAME_LOWER).js
	# Define some helper indicator variables
	echo "const IS_NODE_JS = typeof process !== 'undefined'" >> $(MODULE_NAME_LOWER).js
	echo "const IS_WORKER_SCRIPT = (typeof window === 'undefined' && typeof self !== 'undefined' && !IS_NODE_JS) || ((typeof process !== 'undefined') && process.env._COLDBREW_WORKER_FORK_);" >> $(MODULE_NAME_LOWER).js
	echo "if (typeof window !== 'undefined') var COLDBREW_GLOBAL_SCOPE = window;" >> $(MODULE_NAME_LOWER).js
	echo "if (typeof self !== 'undefined' && !IS_NODE_JS) var COLDBREW_GLOBAL_SCOPE = self;" >> $(MODULE_NAME_LOWER).js
	echo "if (typeof global !== 'undefined') var COLDBREW_GLOBAL_SCOPE = global;" >> $(MODULE_NAME_LOWER).js
	# Append the file created by Emscripten
	echo "" >> $(MODULE_NAME_LOWER).js;
	cat $(MODULE_NAME_LOWER).js.bak >> $(MODULE_NAME_LOWER).js

	# Build JS Files
	sed -f inject_exports.sed module.js.pre.js > module.js.pre.js.intermediate.js
	sed -e 's/FAST_AND_SMALL_BUT_NO_ASYNC/$(FAST_AND_SMALL_BUT_NO_ASYNC)/g; s/BROWSERFS/$(BROWSERFS)/g; s/JSZIP/$(JSZIP)/g; s/MODULE_NAME_LOWER/$(MODULE_NAME_LOWER)/g; s/MODULE_NAME/$(MODULE_NAME)/g; s/PYVERSION/$(PYVERSION)/g; s/COLDBREW_VERSION/$(COLDBREW_VERSION)/g;' module.js.pre.js.intermediate.js | $(JSCC) > module.js
ifeq ($(EMCC_DEBUG),0)
	rm module.js.pre.js.intermediate.js
endif

	# Add extra modifications to the .js file for the final build
	echo "" >> $(MODULE_NAME_LOWER).js
	cat module.js >> $(MODULE_NAME_LOWER).js
	echo "" >> $(MODULE_NAME_LOWER).js
	echo "if (IS_NODE_JS) { module1 = module };" >> $(MODULE_NAME_LOWER).js	
ifeq ($(BROWSERFS),true)
	echo "" >> $(MODULE_NAME_LOWER).js
	echo "if (IS_NODE_JS) { module = module2 };" >> $(MODULE_NAME_LOWER).js	
	echo "" >> $(MODULE_NAME_LOWER).js
	cat ../third_party/browserfs/browserfs.min.js >> $(MODULE_NAME_LOWER).js
endif
ifeq ($(JSZIP),true)
	echo "" >> $(MODULE_NAME_LOWER).js
	echo "if (IS_NODE_JS) { module = module3 };" >> $(MODULE_NAME_LOWER).js	
	echo "" >> $(MODULE_NAME_LOWER).js
	cat ../third_party/jszip/jszip.min.js >> $(MODULE_NAME_LOWER).js
	echo "" >> $(MODULE_NAME_LOWER).js
endif
	echo "" >> $(MODULE_NAME_LOWER).js
	echo "if (IS_NODE_JS) { module = module4 };" >> $(MODULE_NAME_LOWER).js	
	echo "" >> $(MODULE_NAME_LOWER).js
	cat ../third_party/fast-text-encoding/text.min.js >> $(MODULE_NAME_LOWER).js
	echo "" >> $(MODULE_NAME_LOWER).js
	echo "if (IS_NODE_JS) { module = module5 };" >> $(MODULE_NAME_LOWER).js	
	echo "" >> $(MODULE_NAME_LOWER).js
	cat ../third_party/comlink/comlink.js | $(JSCC) >> $(MODULE_NAME_LOWER).js
	echo "" >> $(MODULE_NAME_LOWER).js
	echo "if (IS_NODE_JS) { module = module1 };" >> $(MODULE_NAME_LOWER).js	

	echo "" >> $(MODULE_NAME_LOWER).js
	# End named closure
	echo "return $(MODULE_NAME);" >> $(MODULE_NAME_LOWER).js
	echo "})();" >> $(MODULE_NAME_LOWER).js
	# End global closure
	echo "})();" >> $(MODULE_NAME_LOWER).js

ifeq ($(NODE),false)
	# Final compression
	cat $(MODULE_NAME_LOWER).js | $(JSCC) | $(UGLIFY) > $(MODULE_NAME_LOWER).js.tmp
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
endif

	touch $(MODULE_NAME_LOWER).js.make

$(MODULE_NAME_LOWER).js: root root.make sources+python+strings.o prejs.js.pre.js
	# Add .gitignore
	echo "$(MODULE_NAME_LOWER).js" > .gitignore
	# Build JS files
	sed -e 's/FAST_AND_SMALL_BUT_NO_ASYNC/$(FAST_AND_SMALL_BUT_NO_ASYNC)/g; s/BROWSERFS/$(BROWSERFS)/g; s/JSZIP/$(JSZIP)/g; s/MODULE_NAME_LOWER/$(MODULE_NAME_LOWER)/g; s/MODULE_NAME/$(MODULE_NAME)/g; s/PYVERSION/$(PYVERSION)/g; s/COLDBREW_VERSION/$(COLDBREW_VERSION)/g;' prejs.js.pre.js | $(JSCC) > prejs.js
	# Build .js + .wasm + .data
	$(CC) -o $@ sources+python+strings.o -s EXPORTED_FUNCTIONS='["_main"]' $(LDFLAGS) $(ALLOWMEMORYGROWTHFLAGS) $(PREJSFLAGS) $(MODULARIZEFLAGS) $(ASYNCFLAGS) \
		$(foreach d,$(wildcard root/*),$(EMCC_FILE_FLAG) $d@/$(notdir $d))
ifeq ($(NODE),false)
	sed -e 's/$(MODULE_NAME_LOWER).data/"+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "origin")+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "pathname").split("\/").slice(0, -1).join("\/")+"\/$(MODULE_NAME_LOWER).data"+"/g; ' $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	sed -e 's/$(MODULE_NAME_LOWER).wasm/"+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "origin")+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "pathname").split("\/").slice(0, -1).join("\/")+"\/$(MODULE_NAME_LOWER).wasm"+"/g; ' $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	sed -e 's/locateFile(wasmBinaryFile)/wasmBinaryFile/g; ' $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	sed -e 's/var crypto = require(/let crypto = require(/g;' $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	sed -e 's/var crypto=require(/let crypto=require(/g;' $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
else
	sed -e 's/if (typeof crypto !== "undefined")/if (typeof crypto !== "undefined" \&\& !ENVIRONMENT_IS_NODE)/g;' $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	sed -e 's/if(typeof crypto!=="undefined")/if(typeof crypto!=="undefined"\&\&!ENVIRONMENT_IS_NODE)/g;' $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	sed -e 's/var crypto = require(/let crypto = require(/g;' $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	sed -e 's/var crypto=require(/let crypto=require(/g;' $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
endif
	# Compress the output files
ifeq ($(COMPRESS_NETWORK_FILES),true)
	zip -9 -j $(MODULE_NAME_LOWER).wasm.tmp $(MODULE_NAME_LOWER).wasm;
	mv $(MODULE_NAME_LOWER).wasm.tmp $(MODULE_NAME_LOWER).wasm;
	zip -9 -j $(MODULE_NAME_LOWER).data.tmp $(MODULE_NAME_LOWER).data;
	mv $(MODULE_NAME_LOWER).data.tmp $(MODULE_NAME_LOWER).data;
	sed -e 's/typeof WebAssembly.instantiateStreaming/undefined/g;' $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	sed -e 's/response\["arrayBuffer"\]()/Promise.resolve(response["arrayBuffer"]()).then(JSZip.loadAsync).then(function(zip) { return zip.files[Object.keys(zip.files)].async("arraybuffer") })/g;' $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	sed -e 's/response.arrayBuffer()/Promise.resolve(response.arrayBuffer()).then(JSZip.loadAsync).then(function(zip) { return zip.files[Object.keys(zip.files)].async("arraybuffer") })/g;' $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	sed -e 's/callback(packageData)/Promise.resolve(packageData).then(JSZip.loadAsync).then(function(zip) { return zip.files[Object.keys(zip.files)].async("arraybuffer") }).then(callback)/g;' $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
endif
	# Compress
	$(JSCC) $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	# Save a backup copy of the file
	cp $(MODULE_NAME_LOWER).js $(MODULE_NAME_LOWER).js.bak

sources+python+strings.o: $(BCS) requirements.make Makefile main.c main.bc ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).o ../customize/coldbrew_settings.py
	cp ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).o python.o
	llvm-link $(filter-out %.c.pre.bc,$(filter %.bc,$^)) ../installs/python-$(PYVERSION)/lib/_sqlite.o $(subst $() $()../, $() $()--override=../,$(call rwildcard, ../customize/requirements/lib/python/site-packages/, *-x86_64-linux-gnu.so)) > sources.o
	llvm-extract -rglob="\.str*" python.o > python-strings.o
	llvm-link --only-needed sources.o python.o $(call rwildcard, ../customize/requirements/lib/python/site-packages/, *-x86_64-linux-gnu.so) --override=python.o > sources+python.o
	llvm-link sources+python.o python-strings.o --override=python.o > sources+python+strings.o

clean:
	rm -rf ../build || true
	rm -rf ../downloads || true
	rm -rf ../installs || true
	make cleanlocal

cleanlocal:
	rm -rf ../cache || true
	rm -rf ../$(COLDBREW_DIST_DIR)/* || true
	rm -rf ../$(COLDBREW_DIST_DIR)/**/* || true
	rm -rf root || true
	rm -rf /root/.emscripten_cache/ || true
	rm *.bc 2>/dev/null || true
	rm *.mem 2>/dev/null || true
	rm *.asm.js 2>/dev/null || true
	rm $(MODULE_NAME_LOWER).js 2>/dev/null || true
	rm *.orig.js 2>/dev/null || true
	rm *.intermediate.js 2>/dev/null || true
	rm *.wasm 2>/dev/null || true
	rm *.embin 2>/dev/null || true
	rm *.so 2>/dev/null || true
	rm *.o 2>/dev/null || true
	rm *.data 2>/dev/null || true
	rm *.zip 2>/dev/null || true
	rm *.bak 2>/dev/null || true
	rm *.pre 2>/dev/null || true
	rm *.wast 2>/dev/null || true
	rm *.map 2>/dev/null || true
	rm *.make 2>/dev/null || true
	rm *.tmp 2>/dev/null || true
	rm index.html 2>/dev/null || true
	rm module.js 2>/dev/null || true
	rm prejs.js 2>/dev/null || true
	rm main.c 2>/dev/null || true

main.c: $(PYLIB) add_requirements.py main.c.pre.c requirements.make
	python add_requirements.py main.c.pre.c main.c


%.bc: %.c $(PYLIB) Makefile
	$(CC) -o $@ $< $(CFLAGS) -DMODULE_NAME=$(MODULE_NAME) -DMODULE_NAME_LOWER=$(MODULE_NAME_LOWER) -DPYVERSION=$(PYVERSION) -DCOLDBREW_VERSION=$(COLDBREW_VERSION)

main.bc: main.c $(PYLIB) Makefile
	$(CC) -o $@ $< $(CFLAGS) -DMODULE_NAME=$(MODULE_NAME) -DMODULE_NAME_LOWER=$(MODULE_NAME_LOWER) -DPYVERSION=$(PYVERSION) -DCOLDBREW_VERSION=$(COLDBREW_VERSION)

root: $(PYLIB) ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).o Coldbrew.py shims/*.py examples/*.py slim_data_bundle.py requirements.make $(CUSTOMIZED_FILES)
	rm -rf root || true
	rm -rf root || true
	rm -rf root || true
	mkdir -p root/files || true
	rsync -rv --exclude=.DS_Store --exclude="*.pyc" $(CUSTOMIZED_FILES) root/files
	rm root/files/.gitkeep 2>/dev/null || true
	mkdir -p root/usr/local/lib
	rsync -rv --exclude=.DS_Store --exclude="*.pyc" $(dir $(PYLIB))/python$(PYMINOR) root/usr/local/lib
	rsync -rv --exclude=.DS_Store --exclude="*.pyc" --exclude="*.so" ../customize/requirements/lib/python/site-packages/ root/usr/local/lib/python$(PYMINOR)/site-packages || true
	rsync -rv --exclude="*.pyc" examples root/coldbrew
	cp Coldbrew.py root/usr/local/lib/python$(PYMINOR)/site-packages/Coldbrew.py
	cp shims/*.py root/usr/local/lib/python$(PYMINOR)/site-packages/
	# Clean up unused modules
	( \
		cd root/usr/local/lib/python$(PYMINOR); \
		rm -fr $(UNUSED_MODULES); \
	)
	rm -rf root/usr/local/lib/python$(PYMINOR)/pydoc_data || true # Remove these unneeded files taking up space
	rm -rf root/usr/local/lib/python$(PYMINOR)/unittest/test || true # Remove these unneeded files taking up space
	rm -rf root/usr/local/lib/python$(PYMINOR)/lib2to3/tests || true # Remove these unneeded files taking up space
	python slim_data_bundle.py

root.make: $(PYLIB) ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).o Coldbrew.py
	touch root.make

$(PYLIB): ../$(PYVERSION)/Setup.local
	make -C ../$(PYVERSION)

requirements.make: ../customize/requirements.txt ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).o
	$(eval GPP := $(shell which g++))
	( \
		rm -rf ../customize/requirements || true; \
		python -m venv ../customize/requirements; \
		python -m venv ../customize/requirements/builder; \
		/bin/bash -c "source ../customize/requirements/builder/bin/activate && pip3 install -r ../customize/requirements.txt && pip freeze | grep -E \"numpy|torch|h5py|tensorflow|pymagnitude|supersqlite\" -v > ../customize/requirements/builder/new_requirements.txt"; \
		mv /usr/local/include/python* /usr/local/include/python.bak || true; \
		/bin/bash -c "source ../customize/requirements/bin/activate && mv $(GPP) $(GPP).bak && ln -s $(shell which em++) $(GPP) && CC=$(CC) LDSHARED=$(CC) CFLAGS=-I$(INSTALLS)/python-$(PYVERSION)/include/python$(PYMINOR)/ pip3 install -r ../customize/requirements/builder/new_requirements.txt -vvv --no-deps --no-binary :all:"; \
		mv ../customize/requirements/lib/python*/ ../customize/requirements/lib/python/ || true; \
		rm -rf ../customize/requirements/lib/python/site-packages/*.dist-info || true; \
		rm -rf ../customize/requirements/lib/python/site-packages/*.egg-info || true; \
		rm -rf ../customize/requirements/lib/python/site-packages/pkg_resources || true; \
		rm -rf ../customize/requirements/lib/python/site-packages/setuptools || true; \
		rm -rf ../customize/requirements/lib/python/site-packages/setuptools* || true; \
		rm -rf ../customize/requirements/lib/python/site-packages/pip || true; \
		rm -rf ../customize/requirements/lib/python/site-packages/pip* || true; \
		rm -rf ../customize/requirements/lib/python/site-packages/easy_install.py || true; \
		rm -rf ../customize/requirements/lib/python/site-packages/__pycache__ || true; \
		touch requirements.make; \
		find /usr/local/include/ -type d -name '*.bak' -exec sh -c 'x="{}"; mv "$x" "${x%.bak}"' \;; \
		/bin/bash -c "mv $(GPP).bak $(GPP)" \
	)

../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).o: $(PYLIB)
	( \
		rm -rf ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR) 2>/dev/null || true; \
		mkdir -p ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR); \
		cd ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR); \
		emar -x ../libpython$(PYMINOR).a; \
	)
	# echo for d in $(find installs/python-3.5.2/lib/libpython3.5 -type f); do (llvm-nm $d 2>/dev/null | grep "T PyInit__" 1>/dev/null) && echo "$d"; done ###### TODO unused modules
	llvm-link ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR)/*.o -o ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).o
	if [ -f "$(BUILD)/Modules/_sqlite/_sqlite.o" ]; then cp $(BUILD)/Modules/_sqlite/_sqlite.o ../installs/python-$(PYVERSION)/lib/_sqlite.o; fi
	rm -rf $(BUILD)
	rm -rf $(DOWNLOADS)
