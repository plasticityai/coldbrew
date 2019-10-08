COLDBREW_VERSION=$(shell python -c "import sys; sys.path.append('../'); import version; print(version.__version__)")

MODULE_NAME=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(MODULE_NAME)")
MODULE_NAME_LOWER=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(MODULE_NAME.lower())")
NODE?=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(str(NODE).lower())")
MIN_MEMORY=(64*1024)*320
DEFAULT_MEMORY=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(max($(MIN_MEMORY), DEFAULT_MEMORY))")
ENABLE_THREADING=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(str(ENABLE_THREADING and not '$(NODE)' == 'true').lower())")
MAX_MEMORY=2032MB
AGGRESSIVE_VARIABLE_ELIMINATION=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(AGGRESSIVE_VARIABLE_ELIMINATION)")
UNUSED_MODULES=test distutils ensurepip idlelib __pycache__ tkinter
UNUSED_BUILTIN_MODULES=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print('|'.join(['T PyInit_'+m for m in UNUSED_BUILTIN_MODULES]) if len(UNUSED_BUILTIN_MODULES) > 0 else '****no unused builtin modules****')")
UNUSED_BUILTIN_MODULES_STUB_CODE=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; [print(open('tools/removed_module_stub.c.template').read().replace('STUBMODULE', m)) for m in UNUSED_BUILTIN_MODULES]")
BROWSERFS=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(str(BROWSERFS).lower())")
JSZIP=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(str(JSZIP or COMPRESS_NETWORK_FILES).lower())")
COMPRESS_NETWORK_FILES=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(str(COMPRESS_NETWORK_FILES and not '$(NODE)' == 'true').lower())")
FAST_AND_SMALL_BUT_NO_ASYNC=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(str(FAST_AND_SMALL_BUT_NO_ASYNC).lower())")

ASYNC_DEBUG ?= 0
ALWAYS_ASYNC_FUNCS='export_runAsync\nexport__runFileAsync\n_Coldbrew__sleep\n_coldbrew_yield_to_javascript\n_Coldbrew__run'
ASYNC_FUNCS='PyCFunction_Call\nPyObject_Call\nPyEval_EvalCode\nPyEval_EvalCodeEx\nPyEval_EvalFrame\nPyEval_EvalFrameEx\nPyImport_ExecCodeModule\nPyImport_ExecCodeModuleEx\nPyImport_ExecCodeModuleObject\nPyImport_ExecCodeModuleWithPathnames\nPyImport_ImportFrozenModule\nPyImport_ImportFrozenModuleObject\nPyRun_AnyFile\nPyRun_AnyFileEx\nPyRun_AnyFileExFlags\nPyRun_AnyFileFlags\nPyRun_File\nPyRun_FileEx\nPyRun_FileExFlags\nPyRun_FileFlags\nPyRun_InteractiveLoop\nPyRun_InteractiveLoopFlags\nPyRun_InteractiveOne\nPyRun_InteractiveOneFlags\nPyRun_InteractiveOneObject\nPyRun_SimpleFile\nPyRun_SimpleFileEx\nPyRun_SimpleFileExFlags\nPyRun_SimpleString\nPyRun_SimpleStringFlags\nPyRun_String\nPyRun_StringFlags\nPy_FrozenMain\nPy_Initialize\nPy_InitializeEx\nPy_Main\nPy_NewInterpreter\n_PyEval_EvalCodeWithName\n_PyGen_Finalize\n_PyGen_Send\n_Py_InitializeEx_Private\n_imp_init_frozen\nbuiltin___build_class__\nbuiltin_eval\nbuiltin_exec\ncoro_wrapper_close\ncoro_wrapper_iternext\ncoro_wrapper_send\ncoro_wrapper_throw\nfast_function\nframe_clear\nfunction_call\ngen_close\ngen_close_iter\ngen_iternext\ngen_send_ex\ngen_throw\nimport_init\nzipimporter_load_module\nPyFile_GetLine\nbuiltin_input\n_PyEval_EvalFrameDefault\nPyImport_ImportModuleLevelObject\n_PyObject_CallMethodIdObjArgs\nobject_vacall\n_PyFunction_Vectorcall\nfunction_code_fastcall\ncall_function\nPyVectorcall_Call\nmethod_vectorcall\ncfunction_call_varargs\n_PyObject_MakeTpCall\n_PyObject_FastCallDict\n_PyObject_Call_Prepend\nslot_tp_init\ntype_call\ncfunction_vectorcall_FASTCALL_KEYWORDS\nslot_tp_getattr_hook\nPyObject_CallFunctionObjArgs\nslot_tp_finalize\nsubtype_dealloc\nframe_dealloc\n_PyObject_GenericGetAttrWithDict\nproperty_descr_get\n_PyObject_FastCall_Prepend\nslot_mp_subscript\nPyObject_GetItem\ntupledealloc\n_PyObject_GetMethod\ncfunction_vectorcall_FASTCALL\ncfunction_vectorcall_O\nbuiltin_repr\nPyObject_Repr\nslot_tp_repr\nPyObject_SetAttr\nslot_tp_setattro\nbuiltin_next\nPyObject_SetItem\nslot_mp_ass_subscript\nPyObject_DelItem\nlist___init__\nlist_extend\nPyObject_LengthHint\nslot_sq_length\ndict_ass_sub\n_PyDict_DelItem_KnownHash\nslot_tp_call\nbuiltin_dir\nslot_sq_contains\nPyDict_SetItem\ninsertdict'
ASYNC_WHITELIST=$(shell (echo -n '["'; (echo $(ALWAYS_ASYNC_FUNCS); echo $(ASYNC_FUNCS)) | cat | sed -e ':a;N;$$!ba;s/\n/",\n"/g'; echo -n '"]') | sed -e ':a;N;$$!ba;s/\n"]/"]/g')

DEBUG_MODE=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(str((DEBUG_MODE or bool(int('$(ASYNC_DEBUG)')))).lower())")
SYMBOLS_DEBUG_MODE=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(' -g2 ' if (DEBUG_MODE or bool(int('$(ASYNC_DEBUG)'))) else '  ')")
# ASSERTIONS_DEBUG_MODE=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(' -s ASSERTIONS=1 ' if (DEBUG_MODE or bool(int('$(ASYNC_DEBUG)'))) and not(NO_ASSERTIONS) else '  ')")
export EMCC_DEBUG := $(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print('2' if (DEBUG_MODE or bool(int('$(ASYNC_DEBUG)'))) and not(NO_ASSERTIONS) else '0')")

PYVERSION=3.8.0
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
ifeq ($(ENABLE_THREADING),true)
PTHREAD_CFLAGS=-s USE_PTHREADS=1
PTHREAD_LDFLAGS=-s USE_PTHREADS=1 -s PTHREAD_POOL_SIZE=4
else
PTHREAD_CFLAGS=
PTHREAD_LDFLAGS=
endif
CFLAGS=-std=gnu99 $(OPTFLAGS) -g -I ../installs/python-$(PYVERSION)/include/python$(PYMINOR)/ -Wno-warn-absolute-paths $(PTHREAD_CFLAGS) -s WASM_OBJECT_FILES=0
LDFLAGS=$(OPTFLAGS) $(SYMBOLS_DEBUG_MODE) \
  -s TOTAL_MEMORY=$(DEFAULT_MEMORY) \
  -s WASM_MEM_MAX="$(MAX_MEMORY)" \
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

# Set variables from options and flags
ifeq ($(NODE),true)
$(eval EMCC_FILE_FLAG = --embed-file)
else
$(eval EMCC_FILE_FLAG = --preload-file)
endif

ifdef SHOULD_ASYNCIFY
$(eval ASYNCFLAGS = -s ASYNCIFY=1 -s ASYNCIFY_WHITELIST='$(ASYNC_WHITELIST)')
endif
ifneq ($(DEBUG_MODE),false)
$(eval JSCC = cat)
$(eval JSCCFLAGS = )
$(eval UGLIFY = cat)
else
ifeq ($(NODE),true)
$(eval JSCC = cat)
$(eval JSCCFLAGS = )
else
$(eval JSCC = google-closure-compiler -W QUIET -O ADVANCED --externs ../third_party/externs.js --externs $(EMSCRIPTEN_PATH)/src/closure-externs.js  --isolation_mode "IIFE" )
$(eval JSCCFLAGS = --isolation_mode NONE )
endif
$(eval UGLIFY = uglifyjs --compress )
endif

SRCS := $(wildcard *.c)
BCS := $(SRCS:.c=.bc)

rwildcard=$(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2) $(filter $(subst *,%,$2),$d))


SHELL:=/bin/bash

all: dist.make $(MODULE_NAME_LOWER).js.make index.html

python: ../installs/python-$(PYVERSION)/lib/linked/libpython$(PYMINOR).o

index.html: index.html.pre.html $(MODULE_NAME_LOWER).js Makefile
	sed -e 's/ENABLE_THREADING/$(ENABLE_THREADING)/g; s/FAST_AND_SMALL_BUT_NO_ASYNC/$(FAST_AND_SMALL_BUT_NO_ASYNC)/g; s/MODULE_NAME_LOWER/$(MODULE_NAME_LOWER)/g; s/MODULE_NAME/$(MODULE_NAME)/g;' index.html.pre.html > index.html

dist.make: $(MODULE_NAME_LOWER).js.make Makefile index.html ../README.md ../package.json
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
		sed -e 's/0.0.0/$(COLDBREW_VERSION)/g; s/MODULE_NAME_LOWER/$(MODULE_NAME_LOWER)/g;' ../package.json > ../$(COLDBREW_DIST_DIR)/package.json
		sed -e 's/0.0.0/$(COLDBREW_VERSION)/g; s/MODULE_NAME_LOWER/$(MODULE_NAME_LOWER)/g;' ../package-lock.json > ../$(COLDBREW_DIST_DIR)/package-lock.json
		cp -R node_root ../$(COLDBREW_DIST_DIR)/node_root
		cp -R node_root/usr ../$(COLDBREW_DIST_DIR)/usr
		cp -R node_root/files ../$(COLDBREW_DIST_DIR)/files
		( \
			cd ../$(COLDBREW_DIST_DIR); \
		)
		cp ../README.md ../$(COLDBREW_DIST_DIR)/README.md
		rm ../$(COLDBREW_DIST_DIR)/index.html
endif
	@echo "\n\n\n"
	@echo "========================================"
	@echo "❄️  ☕ ❄️   Brewed Successfully!   ❄️  ☕ ❄️ "
	@echo "========================================"
	@echo "* See the '$(COLDBREW_DIST_DIR)' folder for outputs."
	@echo "* Run the './serve.sh $(COLDBREW_DIST_DIR)' script for a test"
	@echo "  page."
	@echo "* Vist https://git.io/fjANP for more"
	@echo "  documentation / support."
	@echo "========================================"
	@touch dist.make

$(MODULE_NAME_LOWER).js.make: tools/externs.js Worker.js $(MODULE_NAME_LOWER).js ../customize/export.js module.js.pre.js ../third_party/fast-text-encoding/text.min.js ../third_party/comlink/comlink.js ../third_party/externs.js
	# Restore externs for closure compiler
	mv $(EMSCRIPTEN_PATH)/src/closure-externs.js.bak $(EMSCRIPTEN_PATH)/src/closure-externs.js || true
	# Patch externs for closure compiler
	cp $(EMSCRIPTEN_PATH)/src/closure-externs.js $(EMSCRIPTEN_PATH)/src/closure-externs.js.bak
	cat tools/externs.js | sed -e 's/MODULE_NAME/$(MODULE_NAME)/g;' >> $(EMSCRIPTEN_PATH)/src/closure-externs.js 
	# This has to be defined in here and not at the beginning of the file
	$(eval BUILTIN_MODULES := $(shell for d in $$(find ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR) -type f); do (llvm-nm $$d 2>/dev/null | grep "T PyInit_" | sed -e 's/-------- T PyInit_/,/g' | sed -e 's/^,//g'); done))
	# Start global closure
	echo "(function () {" > $(MODULE_NAME_LOWER).js
	echo "const SCRIPT_SOURCE = (typeof BLOB_SCRIPT_SOURCE !== 'undefined' && BLOB_SCRIPT_SOURCE) || (typeof document !== 'undefined' && document.currentScript.src) || (typeof self !== 'undefined' && self.location && self.location.href) || (this.thread && this.thread.__filename) || __filename;" >> $(MODULE_NAME_LOWER).js
	# Start a named closure, this is so that we can unload() and reload() everything the library does easily
	echo "(function COLDBREW_TOP_SCOPE_FUNC(shouldExportColdbrew = true, coldbrewObjectReference={}) {" >> $(MODULE_NAME_LOWER).js
	echo "const COLDBREW_TOP_SCOPE = {};" >> $(MODULE_NAME_LOWER).js
	echo "const $(MODULE_NAME) = coldbrewObjectReference;" >> $(MODULE_NAME_LOWER).js
	# Define some helper indicator variables
	echo "const IS_NODE_JS = typeof process !== 'undefined'" >> $(MODULE_NAME_LOWER).js
	echo "const IS_WORKER_SCRIPT = (typeof window === 'undefined' && typeof self !== 'undefined' && typeof self.Module === 'undefined' && !IS_NODE_JS) || ((typeof process !== 'undefined') && process.env._COLDBREW_WORKER_FORK_);" >> $(MODULE_NAME_LOWER).js
	echo "const IS_THREAD_SCRIPT = (typeof window === 'undefined' && typeof self !== 'undefined' && typeof self.Module !== 'undefined' && self.Module.ENVIRONMENT_IS_PTHREAD);" >> $(MODULE_NAME_LOWER).js
	echo "if (typeof window !== 'undefined') var COLDBREW_GLOBAL_SCOPE = window;" >> $(MODULE_NAME_LOWER).js
	echo "if (typeof self !== 'undefined' && !IS_NODE_JS) var COLDBREW_GLOBAL_SCOPE = self;" >> $(MODULE_NAME_LOWER).js
	echo "if (typeof global !== 'undefined') var COLDBREW_GLOBAL_SCOPE = global;" >> $(MODULE_NAME_LOWER).js
	# Append Worker.js
	cat Worker.js | $(JSCC) | $(UGLIFY) >> $(MODULE_NAME_LOWER).js
	# Append the file created by Emscripten
	echo "" >> $(MODULE_NAME_LOWER).js;
	cat $(MODULE_NAME_LOWER).js.bak >> $(MODULE_NAME_LOWER).js
	# Build JS Files
	sed -f tools/inject_exports.sed module.js.pre.js > module.js.pre.js.intermediate.js
	sed -e 's/ENABLE_THREADING/$(ENABLE_THREADING)/g; s/FAST_AND_SMALL_BUT_NO_ASYNC/$(FAST_AND_SMALL_BUT_NO_ASYNC)/g; s/BROWSERFS/$(BROWSERFS)/g; s/JSZIP/$(JSZIP)/g; s/MODULE_NAME_LOWER/$(MODULE_NAME_LOWER)/g; s/MODULE_NAME/$(MODULE_NAME)/g; s/PYVERSION/$(PYVERSION)/g; s/COLDBREW_VERSION/$(COLDBREW_VERSION)/g; s/BUILTIN_MODULES/$(BUILTIN_MODULES)/g;' module.js.pre.js.intermediate.js > module.js
ifeq ($(DEBUG_MODE),false)
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
	cat ../third_party/browserfs/browserfs.min.js | $(JSCC) | $(UGLIFY) >> $(MODULE_NAME_LOWER).js
endif
ifeq ($(JSZIP),true)
	echo "" >> $(MODULE_NAME_LOWER).js
	echo "if (IS_NODE_JS) { module = module3 };" >> $(MODULE_NAME_LOWER).js	
	echo "" >> $(MODULE_NAME_LOWER).js
	cat ../third_party/jszip/jszip.js | $(JSCC) | $(UGLIFY) >> $(MODULE_NAME_LOWER).js
	echo "" >> $(MODULE_NAME_LOWER).js
endif
	echo "" >> $(MODULE_NAME_LOWER).js
	echo "if (IS_NODE_JS) { module = module4 };" >> $(MODULE_NAME_LOWER).js	
	echo "" >> $(MODULE_NAME_LOWER).js
	cat ../third_party/fast-text-encoding/text.min.js | $(JSCC) | $(UGLIFY) >> $(MODULE_NAME_LOWER).js
	echo "" >> $(MODULE_NAME_LOWER).js
	echo "if (IS_NODE_JS) { module = module5 };" >> $(MODULE_NAME_LOWER).js	
	echo "" >> $(MODULE_NAME_LOWER).js
	cat ../third_party/comlink/comlink.js | $(JSCC) | $(UGLIFY) >> $(MODULE_NAME_LOWER).js
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
	cat $(MODULE_NAME_LOWER).js | $(UGLIFY) > $(MODULE_NAME_LOWER).js.tmp
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
endif

	touch $(MODULE_NAME_LOWER).js.make

$(MODULE_NAME_LOWER).js: tools/externs.js root root.make sources+python.o prejs.js.pre.js tools/embed_thread_script.py node_root
	rm -rf *.wasm 2>/dev/null || true
	rm -rf *.data 2>/dev/null || true
	rm -rf *.worker.js 2>/dev/null || true
	# Detect outdated cache
ifeq ($(ENABLE_THREADING),true)
	(llvm-nm /root/.emscripten_cache/wasm-obj/*.a 1>/dev/null 2>/dev/null && (llvm-nm /root/.emscripten_cache/wasm-obj/*.a 2>/dev/null | grep 'T __atomic_compare_exchange' 1>/dev/null) || (echo -e "\nDetected outdated cache! Deleting...\n" && rm -rf /root/.emscripten_cache/wasm-obj/)) || echo -e "\nNo cache files.\n"
else
	(llvm-nm /root/.emscripten_cache/wasm-obj/*.a 1>/dev/null 2>/dev/null && (llvm-nm /root/.emscripten_cache/wasm-obj/*.a 2>/dev/null | grep 'T __atomic_compare_exchange' 1>/dev/null) && (echo -e "\nDetected outdated cache! Deleting...\n" && rm -rf /root/.emscripten_cache/wasm-obj/)) || echo -e "\nNo cache files.\n"
endif
	# Restore externs for closure compiler
	mv $(EMSCRIPTEN_PATH)/src/closure-externs.js.bak $(EMSCRIPTEN_PATH)/src/closure-externs.js || true
	# Patch externs for closure compiler
	cp $(EMSCRIPTEN_PATH)/src/closure-externs.js $(EMSCRIPTEN_PATH)/src/closure-externs.js.bak
	cat tools/externs.js | sed -e 's/MODULE_NAME/$(MODULE_NAME)/g;' >> $(EMSCRIPTEN_PATH)/src/closure-externs.js 
	# Add .gitignore
	echo "$(MODULE_NAME_LOWER).js" > .gitignore
	# Build JS files
	sed -e 's/ENABLE_THREADING/$(ENABLE_THREADING)/g; s/FAST_AND_SMALL_BUT_NO_ASYNC/$(FAST_AND_SMALL_BUT_NO_ASYNC)/g; s/BROWSERFS/$(BROWSERFS)/g; s/JSZIP/$(JSZIP)/g; s/MODULE_NAME_LOWER/$(MODULE_NAME_LOWER)/g; s/MODULE_NAME/$(MODULE_NAME)/g; s/PYVERSION/$(PYVERSION)/g; s/COLDBREW_VERSION/$(COLDBREW_VERSION)/g;' prejs.js.pre.js > prejs.js
	# Build .js + .wasm + .data
	$(CC) -o $@ sources+python.o -s EXPORTED_FUNCTIONS='["_main"]' $(LDFLAGS) $(ALLOWMEMORYGROWTHFLAGS) $(PREJSFLAGS) $(MODULARIZEFLAGS) $(ASYNCFLAGS) \
		$(foreach d,$(wildcard root/*),$(EMCC_FILE_FLAG) $d@/$(notdir $d))
	# Patch output files
ifeq ($(NODE),false)
	# Use absolute path for .data file
	sed -e 's/$(MODULE_NAME_LOWER).data/"+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "origin")+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "pathname").split("\/").slice(0, -1).join("\/")+"\/$(MODULE_NAME_LOWER).data"+"/g; ' $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	! cmp -s $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	# Use absolute path for .wasm file
	sed -e 's/$(MODULE_NAME_LOWER).wasm/"+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "origin")+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "pathname").split("\/").slice(0, -1).join("\/")+"\/$(MODULE_NAME_LOWER).wasm"+"/g; ' $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	! cmp -s $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	# Don't use locateFile() for .wasm file
	sed -e 's/locateFile(wasmBinaryFile)/wasmBinaryFile/g; ' $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	! cmp -s $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
endif
ifeq ($(ENABLE_THREADING),true)
	# Embed the thread script into the main JS file as a Blob URL
	$(JSCC) $(JSCCFLAGS) $(MODULE_NAME_LOWER).worker.js | $(UGLIFY) > $(MODULE_NAME_LOWER).worker.js.tmp
	mv $(MODULE_NAME_LOWER).worker.js.tmp $(MODULE_NAME_LOWER).worker.js
	python tools/embed_thread_script.py $(MODULE_NAME_LOWER).js $(MODULE_NAME_LOWER).worker.js > $(MODULE_NAME_LOWER).js.tmp
	! cmp -s $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	rm $(MODULE_NAME_LOWER).worker.js
endif
	# Compress the output files
ifeq ($(COMPRESS_NETWORK_FILES),true)
	zip -9 -j $(MODULE_NAME_LOWER).wasm.tmp $(MODULE_NAME_LOWER).wasm;
	mv $(MODULE_NAME_LOWER).wasm.tmp $(MODULE_NAME_LOWER).wasm;
	zip -9 -j $(MODULE_NAME_LOWER).data.tmp $(MODULE_NAME_LOWER).data;
	mv $(MODULE_NAME_LOWER).data.tmp $(MODULE_NAME_LOWER).data;
ifeq ($(ENABLE_THREADING),true)
	# Disable WebAssembly.instantiateStreaming since we are using a zipped .wasm file
	sed -e 's/typeof WebAssembly.instantiateStreaming/undefined/g;' $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	! cmp -s $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
endif
	# Unzip the .wasm file
	sed -e 's/response\["arrayBuffer"\]()/Promise.resolve(response["arrayBuffer"]()).then(JSZip.loadAsync).then(function(zip) { return zip.files[Object.keys(zip.files)].async("arraybuffer") })/g; s/response.arrayBuffer()/Promise.resolve(response.arrayBuffer()).then(JSZip.loadAsync).then(function(zip) { return zip.files[Object.keys(zip.files)].async("arraybuffer") })/g;' $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	! cmp -s $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	# Unzip the .data file
	sed -e 's/callback(packageData)/Promise.resolve(packageData).then(JSZip.loadAsync).then(function(zip) { return zip.files[Object.keys(zip.files)].async("arraybuffer") }).then(callback)/g;' $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	! cmp -s $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
endif
	# Compress
	cat $(MODULE_NAME_LOWER).js > $(MODULE_NAME_LOWER).js.tmp
	mv $(MODULE_NAME_LOWER).js.tmp $(MODULE_NAME_LOWER).js
	# Save a backup copy of the file
	cp $(MODULE_NAME_LOWER).js $(MODULE_NAME_LOWER).js.bak

stub_removed_modules.bc: ../customize/coldbrew_settings.py
	echo '#include "Python.h"' > /tmp/stub_removed_modules.c
	echo 'static PyMethodDef stub_methods[] = {};' >> /tmp/stub_removed_modules.c
	echo '$(UNUSED_BUILTIN_MODULES_STUB_CODE)' >> /tmp/stub_removed_modules.c
	cat /tmp/stub_removed_modules.c
	$(CC) -o stub_removed_modules.bc /tmp/stub_removed_modules.c $(CFLAGS)
	rm /tmp/stub_removed_modules.c

sources+python.o: $(BCS) requirements.make Makefile main.c main.bc ../installs/python-$(PYVERSION)/lib/linked/libpython$(PYMINOR).o stub_removed_modules.bc
	echo '#include "Python.h"' > /tmp/stub_manual_compile_modules.c
	echo "PyObject* PyInit__sqlite3(void); void __coldbrew_pyinit_stub__sqlite3() { PyInit__sqlite3(); }" >> /tmp/stub_manual_compile_modules.c
	$(CC) -o stub_manual_compile_modules.bc /tmp/stub_manual_compile_modules.c $(CFLAGS)
	cp ../installs/python-$(PYVERSION)/lib/linked/libpython$(PYMINOR).o python.o
ifeq ($(ENABLE_THREADING),true)
	llvm-link $(filter-out thread_stub.bc,$(filter-out %.c.pre.bc,$(filter %.bc,$^))) stub_manual_compile_modules.bc --override=stub_removed_modules.bc $(subst $() $()../, $() $()--override=../,$(call rwildcard, ../customize/requirements/lib/python/site-packages/, *-x86_64-linux-gnu.so)) > sources.o
else
	llvm-link $(filter-out %.c.pre.bc,$(filter %.bc,$^)) stub_manual_compile_modules.bc --override=stub_removed_modules.bc $(subst $() $()../, $() $()--override=../,$(call rwildcard, ../customize/requirements/lib/python/site-packages/, *-x86_64-linux-gnu.so)) > sources.o
endif
	llvm-link sources.o python.o $(call rwildcard, ../customize/requirements/lib/python/site-packages/, *-x86_64-linux-gnu.so) > sources+python.o

clean:
	rm -rf ../build || true
	rm -rf ../downloads || true
	rm -rf ../installs || true
	make cleandist
	make cleanlocal

cleandist:
	rm -rf ../$(COLDBREW_DIST_DIR)/* || true
	rm -rf ../$(COLDBREW_DIST_DIR)/**/* || true

cleanlocal:
	rm -rf ../cache/wasm-obj || true
	rm -rf ../cache/wasm-bc || true
	rm -rf root || true
	rm -rf /root/.emscripten_cache/wasm-obj || true
	rm -rf /root/.emscripten_cache/wasm-bc || true
	rm *.bc 2>/dev/null || true
	rm *.mem 2>/dev/null || true
	rm *.asm.js 2>/dev/null || true
	rm $(MODULE_NAME_LOWER).js 2>/dev/null || true
	rm *.orig.js 2>/dev/null || true
	rm *.intermediate.js 2>/dev/null || true
	rm *.worker.js 2>/dev/null || true
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

main.c: $(PYLIB) tools/add_requirements.py main.c.pre.c requirements.make
	python tools/add_requirements.py main.c.pre.c main.c


%.bc: %.c $(PYLIB) Makefile
	$(CC) -o $@ $< $(CFLAGS) -D__COLDBREW_ASYNC_DEBUG__=$(ASYNC_DEBUG)

main.bc: main.c $(PYLIB) Makefile
	$(CC) -o $@ $< $(CFLAGS) -DMODULE_NAME=$(MODULE_NAME) -DMODULE_NAME_LOWER=$(MODULE_NAME_LOWER) -DPYVERSION=$(PYVERSION) -DCOLDBREW_VERSION=$(COLDBREW_VERSION) -D__COLDBREW_ASYNC_DEBUG__=$(ASYNC_DEBUG)

node_root: root Makefile
	while [[ -d root ]]; do rm -rf root; sleep 1; done
	while [[ -d node_root ]]; do rm -rf node_root; sleep 1; done
	while [[ -d root.tmp ]]; do rm -rf root.tmp; sleep 1; done
	while [[ -d node_root.tmp ]]; do rm -rf node_root.tmp; sleep 1; done
	cp -R root_orig root.tmp
ifeq ($(NODE),true)
	cp -R root.tmp node_root.tmp
	rm -rf root.tmp/files
	rm -rf root.tmp/usr/local/lib/python$(PYMINOR)
	rm -rf node_root.tmp/coldbrew
	mv node_root.tmp node_root
else
	mkdir -p node_root
endif
	mv root.tmp root

root: $(PYLIB) ../installs/python-$(PYVERSION)/lib/linked/libpython$(PYMINOR).o Coldbrew.py shims/*.py examples/*.py tools/slim_data_bundle.py requirements.make $(CUSTOMIZED_FILES)
	while [[ -d root ]]; do rm -rf root; sleep 1; done
	while [[ -d root_orig ]]; do rm -rf root_orig; sleep 1; done

	rsync -rv --exclude=.DS_Store --exclude="*.pyc" $(CUSTOMIZED_FILES) root
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
	python tools/slim_data_bundle.py
	cp -R root root_orig

root.make: $(PYLIB) ../installs/python-$(PYVERSION)/lib/linked/libpython$(PYMINOR).o Coldbrew.py
	touch root.make

$(PYLIB): ../$(PYVERSION)/Setup.local
	make -C ../$(PYVERSION)

requirements.make: ../customize/requirements.txt ../installs/python-$(PYVERSION)/lib/linked/libpython$(PYMINOR).o
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

../installs/python-$(PYVERSION)/lib/linked/libpython$(PYMINOR).o: ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR)/lib.make ../customize/coldbrew_settings.py
	mkdir -p ../installs/python-$(PYVERSION)/lib/linked/ || true
	rm -rf ../installs/python-$(PYVERSION)/lib/workspace || true
	cp -r ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR) ../installs/python-$(PYVERSION)/lib/workspace
	( \
		for d in $$(find ../installs/python-$(PYVERSION)/lib/workspace -type f); do (llvm-nm $$d 2>/dev/null | grep -E "$(UNUSED_BUILTIN_MODULES)" 1>/dev/null) && echo "Ignoring: $$d" && mv $$d $$d.ignore; done \
	) || true
	llvm-link ../installs/python-$(PYVERSION)/lib/workspace/*.o -o ../installs/python-$(PYVERSION)/lib/linked/libpython$(PYMINOR).o
	rm -rf ../installs/python-$(PYVERSION)/lib/workspace

../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR)/lib.make: $(PYLIB)
	( \
		rm -rf ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR) 2>/dev/null || true; \
		mkdir -p ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR); \
		cd ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR); \
		emar -x ../libpython$(PYMINOR).a; \
	)
	if [ -f "$(BUILD)/Modules/_sqlite/_sqlite.o" ]; then cp $(BUILD)/Modules/_sqlite/_sqlite.o ../installs/python-$(PYVERSION)/lib/_sqlite.o; fi
	cp ../installs/python-$(PYVERSION)/lib/_sqlite.o ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR)/_sqlite.o
	rm -rf $(BUILD)
	rm -rf $(DOWNLOADS)
	touch ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR)/lib.make