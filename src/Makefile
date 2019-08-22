COLDBREW_VERSION=$(shell python -c "import sys; sys.path.append('../'); import version; print(version.__version__)")

MODULE_NAME=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(MODULE_NAME)")
MODULE_NAME_LOWER=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(MODULE_NAME.lower())")
NODE=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(str(NODE).lower())")
DEFAULT_MEMORY=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(DEFAULT_MEMORY)")
AGGRESSIVE_VARIABLE_ELIMINATION=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(AGGRESSIVE_VARIABLE_ELIMINATION)")
UNUSED_MODULES=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(UNUSED_MODULES)")
BROWSERFS=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(str(BROWSERFS).lower())")
JSZIP=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(str(JSZIP).lower())")
PTHREAD_CFLAGS=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(PTHREAD_CFLAGS)")
PTHREAD_LDFLAGS=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(PTHREAD_LDFLAGS)")
SYMBOLS_DEBUG_MODE=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(' -g2 ' if DEBUG_MODE else '  ')")
ASSERTIONS_DEBUG_MODE=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(' -s ASSERTIONS=1 ' if DEBUG_MODE and not(NO_ASSERTIONS) else '  ')")
export EMCC_DEBUG := $(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print('2' if DEBUG_MODE and not(NO_ASSERTIONS) else '0')")
SMALL_BUT_NO_ASYNC=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(str(SMALL_BUT_NO_ASYNC).lower())")
SMALL_BUT_SLOW_SYNC=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(str(SMALL_BUT_SLOW_SYNC).lower())")

ALWAYS_ASYNC_FUNCS='export_runAsync\nexport__runFileAsync\n_Coldbrew__sleep\n_coldbrew_yield_to_javascript\nPyCFunction_Call'
ASYNC_FUNCS='PyCFunction_Call\nPyObject_Call\nPyEval_EvalCode\nPyEval_EvalCodeEx\nPyEval_EvalFrame\nPyEval_EvalFrameEx\nPyImport_ExecCodeModule\nPyImport_ExecCodeModuleEx\nPyImport_ExecCodeModuleObject\nPyImport_ExecCodeModuleWithPathnames\nPyImport_ImportFrozenModule\nPyImport_ImportFrozenModuleObject\nPyRun_AnyFile\nPyRun_AnyFileEx\nPyRun_AnyFileExFlags\nPyRun_AnyFileFlags\nPyRun_File\nPyRun_FileEx\nPyRun_FileExFlags\nPyRun_FileFlags\nPyRun_InteractiveLoop\nPyRun_InteractiveLoopFlags\nPyRun_InteractiveOne\nPyRun_InteractiveOneFlags\nPyRun_InteractiveOneObject\nPyRun_SimpleFile\nPyRun_SimpleFileEx\nPyRun_SimpleFileExFlags\nPyRun_SimpleString\nPyRun_SimpleStringFlags\nPyRun_String\nPyRun_StringFlags\nPy_FrozenMain\nPy_Initialize\nPy_InitializeEx\nPy_Main\nPy_NewInterpreter\n_PyEval_EvalCodeWithName\n_PyGen_Finalize\n_PyGen_Send\n_Py_InitializeEx_Private\n_imp_init_frozen\nbuiltin___build_class__\nbuiltin_eval\nbuiltin_exec\ncoro_wrapper_close\ncoro_wrapper_iternext\ncoro_wrapper_send\ncoro_wrapper_throw\nfast_function\nframe_clear\nfunction_call\ngen_close\ngen_close_iter\ngen_iternext\ngen_send_ex\ngen_throw\nimport_init\nzipimporter_load_module'
ASYNC_WHITELIST=$(shell (echo -n '["'; (echo $(ALWAYS_ASYNC_FUNCS); echo $(ASYNC_FUNCS)) | cat | sed -e ':a;N;$$!ba;s/\n/",\n"/g'; echo -n '"]') | sed -e ':a;N;$$!ba;s/\n"]/"]/g')
PYTHON_FUNCS=$(eval PYTHON_FUNCS:=$(shell (llvm-nm ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).o | grep -E '\-\-\-\-\-\-\-\- T |\-\-\-\-\-\-\-\- t ' | sed -e 's/-------- T /_/g'| sed -e 's/-------- t /_/g') | cat | sed -e ':a;N;$$!ba;s/\n/","/g';))$(PYTHON_FUNCS)

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
SHOULD_EMTERPRET =
ifeq ($(SMALL_BUT_NO_ASYNC),false)
    SHOULD_EMTERPRET = yes
endif
ifeq ($(SMALL_BUT_SLOW_SYNC),true)
    SHOULD_EMTERPRET = yes
endif

SHOULD_SYNC = yes
ifeq ($(SMALL_BUT_NO_ASYNC),true)
    SHOULD_SYNC =
endif
ifeq ($(SMALL_BUT_SLOW_SYNC),true)
    SHOULD_SYNC =
endif

# Might need to uncomment (if build is not working to try and debug?)
# ifneq ($(EMCC_DEBUG),0)
# 	export EM_BUILD_VERBOSE=3
# 	export EMSCRIPT_MAX_CHUNK_SIZE=16777216
# 	export EMCC_CORES=1
# endif

# Error check settings
ifeq ($(SMALL_BUT_NO_ASYNC),true)
ifeq ($(SMALL_BUT_SLOW_SYNC),true)
EXIT_ERROR=Coldbrew Settings Error: You can't set both SMALL_BUT_NO_ASYNC and SMALL_BUT_SLOW_SYNC
$(error $(EXIT_ERROR))
endif
endif

# Set variables from options and flags
ifeq ($(NODE),true)
$(eval EMCC_FILE_FLAG = --embed-file)
else
$(eval EMCC_FILE_FLAG = --preload-file)
endif

ifdef SHOULD_EMTERPRET
$(eval EMTERPRETERFLAGS = -s ASYNCIFY=1 -s ASYNCIFY_WHITELIST='$(ASYNC_WHITELIST)')
endif
ifneq ($(EMCC_DEBUG),0)
$(eval UGLIFY = cat)
else
$(eval UGLIFY = uglifyjs --compress)
endif

SRCS := $(wildcard *.c)
BCS := $(SRCS:.c=.bc)

rwildcard=$(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2) $(filter $(subst *,%,$2),$d))


all: ../$(COLDBREW_DIST_DIR) $(MODULE_NAME_LOWER).asm.js.make index.html

python: ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).syncified.o

index.html: index.html.pre.html $(MODULE_NAME_LOWER).asm.js Makefile
	sed -e 's/SMALL_BUT_SLOW_SYNC/$(SMALL_BUT_SLOW_SYNC)/g; s/SMALL_BUT_NO_ASYNC/$(SMALL_BUT_NO_ASYNC)/g; s/MODULE_NAME_LOWER/$(MODULE_NAME_LOWER)/g; s/MODULE_NAME/$(MODULE_NAME)/g;' index.html.pre.html > index.html

../$(COLDBREW_DIST_DIR): $(MODULE_NAME_LOWER).asm.js.make Makefile index.html ../README.md ../package.json
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

$(MODULE_NAME_LOWER).asm.js.make: $(MODULE_NAME_LOWER).asm.js ../customize/export.js module.js.pre.js ../third_party/fast-text-encoding/text.min.js ../third_party/comlink/comlink.js
	# Start global closure
	echo "(function () {" > $(MODULE_NAME_LOWER).asm.js
	echo "const SCRIPT_SOURCE = (typeof document !== 'undefined' && document.currentScript.src) || (typeof self !== 'undefined' && self.location && self.location.href) || (this.thread && this.thread.__filename) || __filename;" >> $(MODULE_NAME_LOWER).asm.js
	# Start a named closure, this is so that we can unload() and reload() everything the library does easily
	echo "(function COLDBREW_TOP_SCOPE_FUNC(shouldExportColdbrew = true, coldbrewObjectReference={}) {" >> $(MODULE_NAME_LOWER).asm.js
	echo "const COLDBREW_TOP_SCOPE = {};" >> $(MODULE_NAME_LOWER).asm.js
	echo "const $(MODULE_NAME) = coldbrewObjectReference;" >> $(MODULE_NAME_LOWER).asm.js
	# Define some helper indicator variables
	echo "const IS_NODE_JS = typeof process !== 'undefined'" >> $(MODULE_NAME_LOWER).asm.js
	echo "const IS_WORKER_SCRIPT = (typeof window === 'undefined' && typeof self !== 'undefined' && !IS_NODE_JS) || ((typeof process !== 'undefined') && process.env._COLDBREW_WORKER_FORK_);" >> $(MODULE_NAME_LOWER).asm.js
	echo "if (typeof window !== 'undefined') var COLDBREW_GLOBAL_SCOPE = window;" >> $(MODULE_NAME_LOWER).asm.js
	echo "if (typeof self !== 'undefined' && !IS_NODE_JS) var COLDBREW_GLOBAL_SCOPE = self;" >> $(MODULE_NAME_LOWER).asm.js
	echo "if (typeof global !== 'undefined') var COLDBREW_GLOBAL_SCOPE = global;" >> $(MODULE_NAME_LOWER).asm.js
	# Append the file created by Emscripten
	echo "" >> $(MODULE_NAME_LOWER).asm.js;
	cat $(MODULE_NAME_LOWER).asm.js.bak >> $(MODULE_NAME_LOWER).asm.js

	# Build JS Files
	sed -f inject_exports.sed module.js.pre.js > module.js.pre.js.intermediate.js
	sed -e 's/SMALL_BUT_SLOW_SYNC/$(SMALL_BUT_SLOW_SYNC)/g; s/SMALL_BUT_NO_ASYNC/$(SMALL_BUT_NO_ASYNC)/g; s/BROWSERFS/$(BROWSERFS)/g; s/JSZIP/$(JSZIP)/g; s/MODULE_NAME_LOWER/$(MODULE_NAME_LOWER)/g; s/MODULE_NAME/$(MODULE_NAME)/g; s/PYVERSION/$(PYVERSION)/g; s/COLDBREW_VERSION/$(COLDBREW_VERSION)/g;' module.js.pre.js.intermediate.js | $(UGLIFY) > module.js
ifeq ($(EMCC_DEBUG),0)
	rm module.js.pre.js.intermediate.js
endif

	# Add extra modifications to the .asm.js file for the final build
	echo "" >> $(MODULE_NAME_LOWER).asm.js
	cat module.js >> $(MODULE_NAME_LOWER).asm.js
	echo "" >> $(MODULE_NAME_LOWER).asm.js
	echo "if (IS_NODE_JS) { module1 = module };" >> $(MODULE_NAME_LOWER).asm.js	
ifeq ($(BROWSERFS),true)
	echo "" >> $(MODULE_NAME_LOWER).asm.js
	echo "if (IS_NODE_JS) { module = module2 };" >> $(MODULE_NAME_LOWER).asm.js	
	echo "" >> $(MODULE_NAME_LOWER).asm.js
	cat ../third_party/browserfs/browserfs.min.js >> $(MODULE_NAME_LOWER).asm.js
endif
ifeq ($(JSZIP),true)
	echo "" >> $(MODULE_NAME_LOWER).asm.js
	echo "if (IS_NODE_JS) { module = module3 };" >> $(MODULE_NAME_LOWER).asm.js	
	echo "" >> $(MODULE_NAME_LOWER).asm.js
	cat ../third_party/jszip/jszip.min.js >> $(MODULE_NAME_LOWER).asm.js
	echo "" >> $(MODULE_NAME_LOWER).asm.js
endif
	echo "" >> $(MODULE_NAME_LOWER).asm.js
	echo "if (IS_NODE_JS) { module = module4 };" >> $(MODULE_NAME_LOWER).asm.js	
	echo "" >> $(MODULE_NAME_LOWER).asm.js
	cat ../third_party/fast-text-encoding/text.min.js >> $(MODULE_NAME_LOWER).asm.js
	echo "" >> $(MODULE_NAME_LOWER).asm.js
	echo "if (IS_NODE_JS) { module = module5 };" >> $(MODULE_NAME_LOWER).asm.js	
	echo "" >> $(MODULE_NAME_LOWER).asm.js
	cat ../third_party/comlink/comlink.js | $(UGLIFY) >> $(MODULE_NAME_LOWER).asm.js
	echo "" >> $(MODULE_NAME_LOWER).asm.js
	echo "if (IS_NODE_JS) { module = module1 };" >> $(MODULE_NAME_LOWER).asm.js	

	echo "" >> $(MODULE_NAME_LOWER).asm.js
	# End named closure
	echo "return $(MODULE_NAME);" >> $(MODULE_NAME_LOWER).asm.js
	echo "})();" >> $(MODULE_NAME_LOWER).asm.js
	# End global closure
	echo "})();" >> $(MODULE_NAME_LOWER).asm.js

ifeq ($(NODE),false)
	# Final compression
	cat $(MODULE_NAME_LOWER).asm.js | $(UGLIFY) > $(MODULE_NAME_LOWER).asm.js.tmp
	mv $(MODULE_NAME_LOWER).asm.js.tmp $(MODULE_NAME_LOWER).asm.js
endif

	touch $(MODULE_NAME_LOWER).asm.js.make

$(MODULE_NAME_LOWER).asm.js: root root.make sources+python+strings.o extract_sync_code.py prejs.js.pre.js
	rm *.embin 2>/dev/null || true
	# Build JS files
	sed -e 's/SMALL_BUT_SLOW_SYNC/$(SMALL_BUT_SLOW_SYNC)/g; s/SMALL_BUT_NO_ASYNC/$(SMALL_BUT_NO_ASYNC)/g; s/BROWSERFS/$(BROWSERFS)/g; s/JSZIP/$(JSZIP)/g; s/MODULE_NAME_LOWER/$(MODULE_NAME_LOWER)/g; s/MODULE_NAME/$(MODULE_NAME)/g; s/PYVERSION/$(PYVERSION)/g; s/COLDBREW_VERSION/$(COLDBREW_VERSION)/g;' prejs.js.pre.js | $(UGLIFY) > prejs.js
	# Build async_funcs.tmp
ifdef SHOULD_EMTERPRET
	(echo -n '["'; (echo $(ALWAYS_ASYNC_FUNCS_2); llvm-nm ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).syncified.o | grep 'coldbrew_sync' | grep '\-\-\-\-\-\-\-\- W ' | sed -e 's/-------- W //g') | sed -e 's/_coldbrew_sync//g' | cat | sed -e ':a;N;$$!ba;s/\n/",\n"/g'; echo -n '"]') | sed -e ':a;N;$$!ba;s/\n"]/"]/g' > async_funcs.tmp
else
	echo '[]' > async_funcs.tmp
endif
	# Keep a back up of emmc.py
	cp $(EMSCRIPTEN_PATH)/emcc.py $(EMSCRIPTEN_PATH)/emcc.py.bak
	# Modify emcc.py to run asm-patcher in build process
	cp asm-patcher.py $(EMSCRIPTEN_PATH)/tools/asm-patcher.py
	python -c 'source = open("$(EMSCRIPTEN_PATH)/emcc.py", "r").read(); source = source.replace("""# Remove some trivial whitespace""","""args = [shared.PYTHON,shared.path_from_root("tools", "asm-patcher.py"),final,final];shared.check_call(args);\n# Remove some trivial whitespace"""); print(source)' > $(EMSCRIPTEN_PATH)/emcc.py.tmp
	! cmp $(EMSCRIPTEN_PATH)/emcc.py.tmp $(EMSCRIPTEN_PATH)/emcc.py
	mv $(EMSCRIPTEN_PATH)/emcc.py.tmp $(EMSCRIPTEN_PATH)/emcc.py
ifdef SHOULD_SYNC
	# Modify asm-patcher.py to keep intermediate files
	python -c 'source = open("$(EMSCRIPTEN_PATH)/tools/asm-patcher.py", "r").read(); source = source.replace("""temp_files.clean()""","""os.system("cp "+outfile+" "+os.getcwd()+"/sync-$@.intermediate.js");temp_files.clean();sys.exit(1)"""); print(source)' > $(EMSCRIPTEN_PATH)/tools/asm-patcher.py.tmp
	! cmp $(EMSCRIPTEN_PATH)/tools/asm-patcher.py.tmp $(EMSCRIPTEN_PATH)/tools/asm-patcher.py
	mv $(EMSCRIPTEN_PATH)/tools/asm-patcher.py.tmp $(EMSCRIPTEN_PATH)/tools/asm-patcher.py
	# Build synchronous version of .asm.js
	rm sync-$@.intermediate.js 2>/dev/null || true
	$(CC) -o sync-$@ sources+python+strings.o -s EXPORTED_FUNCTIONS='["_main"]' $(LDFLAGS) $(ALLOWMEMORYGROWTHFLAGS) $(PREJSFLAGS) $(MODULARIZEFLAGS) $(EMTERPRETERFLAGS) -s ASYNCIFY_WHITELIST='["export_runAsync"]' \
		$(foreach d,$(wildcard root/*),$(EMCC_FILE_FLAG) $d@/$(notdir $d)) || true
	cat sync-$@.intermediate.js 1>/dev/null
	# Extract the synchronous function bodies of functions we will want to run both synchronously and asynchronously
	echo '"$(ASYNC_FUNCS)"' > extract_sync_code_arg_1.tmp
	echo '"$(PYTHON_FUNCS)"' > extract_sync_code_arg_2.tmp
	python extract_sync_code.py sync-$@.intermediate.js > synchronous-func-bodies.intermediate.js
	# Clean up the mess from the synchronous build
ifneq ($(EMCC_DEBUG),0)
	mv sync-coldbrew.asm.js.intermediate.js tmp-sync-coldbrew.asm.js.intermediate.js.tmp
endif
	rm sync-* 2>/dev/null || true
ifneq ($(EMCC_DEBUG),0)
	mv tmp-sync-coldbrew.asm.js.intermediate.js.tmp sync-coldbrew.asm.js.intermediate.js
endif
endif
	# Modify asm-patcher.py to add in the synchronous function bodies
ifdef SHOULD_SYNC
	python -c 'source = open("$(EMSCRIPTEN_PATH)/tools/asm-patcher.py", "r").read(); source = source.replace("""# second pass, finalize trampolines""","""# second pass, finalize trampolines\n  lines = [lines[0]] + open("synchronous-func-bodies.intermediate.js", "r").read().split("\\n")+ lines[1:]"""); print(source)' > $(EMSCRIPTEN_PATH)/tools/asm-patcher.py.tmp
	! cmp $(EMSCRIPTEN_PATH)/tools/asm-patcher.py.tmp $(EMSCRIPTEN_PATH)/tools/asm-patcher.py
	mv $(EMSCRIPTEN_PATH)/tools/asm-patcher.py.tmp $(EMSCRIPTEN_PATH)/tools/asm-patcher.py
endif
# 	# Modify asm-patcher.py to keep intermediate files
# ifneq ($(EMCC_DEBUG),0)
# 	python -c 'source = open("$(EMSCRIPTEN_PATH)/tools/asm-patcher.py", "r").read(); source = source.replace("""temp_files.clean()""","""os.system("cp "+outfile+" "+os.getcwd()+"/$@.intermediate.js");temp_files.clean()"""); print(source)' > $(EMSCRIPTEN_PATH)/tools/asm-patcher.py.tmp
# 	! cmp $(EMSCRIPTEN_PATH)/tools/asm-patcher.py.tmp $(EMSCRIPTEN_PATH)/tools/asm-patcher.py
# 	mv $(EMSCRIPTEN_PATH)/tools/asm-patcher.py.tmp $(EMSCRIPTEN_PATH)/tools/asm-patcher.py
# endif
	# Modify asm-patcher.py to branch to the synchronous function bodies when running synchronously with an if-statement
ifdef SHOULD_SYNC
	python -c 'source = open("$(EMSCRIPTEN_PATH)/tools/asm-patcher.py", "r").read(); source = source.replace("""func = line.split('\'' '\'')[1].split('\''('\'')[0]""", """func = line.split('\'' '\'')[1].split('\''('\'')[0]; funcargs = line.split('\''('\'')[1].split('\'')'\'')[0];\n    elif "if ((asyncState | 0) != 2) {" in lines[i]:\n      lines[i] = ("if ((HEAP32["+re.search("function __Coldbrew_is_async.*?HEAP32\\[(.*?)\\]", asm.js, flags=re.S|re.M).groups()[0]+"] | 0) == 0) {  return " + func + "_coldbrew_sync("+ funcargs +"); }" if func + "_coldbrew_sync" in [func.strip() for func in open("extract_sync_code_arg_1.tmp", "r").read().replace("\\"", "").split(",")] else "") + lines[i] """); print(source)' > $(EMSCRIPTEN_PATH)/tools/asm-patcher.py.tmp
	! cmp $(EMSCRIPTEN_PATH)/tools/asm-patcher.py.tmp $(EMSCRIPTEN_PATH)/tools/asm-patcher.py
	mv $(EMSCRIPTEN_PATH)/tools/asm-patcher.py.tmp $(EMSCRIPTEN_PATH)/tools/asm-patcher.py
endif
# # Modify asm-patcher.py on debug builds to ignore duplicated dynCall functions by renaming them and suffixing them with _dup
# ifneq ($(EMCC_DEBUG),0)
# 	python -c 'source = open("$(EMSCRIPTEN_PATH)/tools/asm-patcher.py", "r").read(); source = source.replace("""func = line.split('\'' '\'')[1].split('\''('\'')[0]""", """func = line.split('\'' '\'')[1].split('\''('\'')[0]; lines.__setitem__(i, lines[i].replace("function "+func+"(", "function "+func+"_dup(")) if func.startswith("dynCall_") else str(); print("Replaced duplicate function symbol:", lines[i]) if func.startswith("dynCall_") else str()"""); print(source)' > $(EMSCRIPTEN_PATH)/tools/asm-patcher.py.tmp
# 	! cmp $(EMSCRIPTEN_PATH)/tools/asm-patcher.py.tmp $(EMSCRIPTEN_PATH)/tools/asm-patcher.py
# 	mv $(EMSCRIPTEN_PATH)/tools/asm-patcher.py.tmp $(EMSCRIPTEN_PATH)/tools/asm-patcher.py
# 	python -c 'source = open("$(EMSCRIPTEN_PATH)/tools/asm-patcher.py", "r").read(); source = source.replace("""asm.write(outfile)""","""asm.write(outfile);new_outfile_content = re.sub("(dynCall_[a-z0-9A-Z]+): (dynCall_[a-z0-9A-Z]+)", r"\\1_dup: \\2_dup", open(outfile, "r").read());open(outfile, "w+").write(new_outfile_content)"""); print(source)' > $(EMSCRIPTEN_PATH)/tools/asm-patcher.py.tmp
# 	! cmp $(EMSCRIPTEN_PATH)/tools/asm-patcher.py.tmp $(EMSCRIPTEN_PATH)/tools/asm-patcher.py
# 	mv $(EMSCRIPTEN_PATH)/tools/asm-patcher.py.tmp $(EMSCRIPTEN_PATH)/tools/asm-patcher.py
# endif
	# Build asynchronous version of .asm.js (with branching to synchronous function bodies)
	$(CC) -o $@ sources+python+strings.o -s EXPORTED_FUNCTIONS='["_main"]' $(LDFLAGS) $(ALLOWMEMORYGROWTHFLAGS) $(PREJSFLAGS) $(MODULARIZEFLAGS) $(EMTERPRETERFLAGS) \
		$(foreach d,$(wildcard root/*),$(EMCC_FILE_FLAG) $d@/$(notdir $d))
ifeq ($(NODE),false)
	sed -e 's/$(MODULE_NAME_LOWER).asm.data/"+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "origin")+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "pathname").split("\/").slice(0, -1).join("\/")+"\/$(MODULE_NAME_LOWER).asm.data"+"/g; ' $(MODULE_NAME_LOWER).asm.js > $(MODULE_NAME_LOWER).asm.js.tmp
	mv $(MODULE_NAME_LOWER).asm.js.tmp $(MODULE_NAME_LOWER).asm.js
	sed -e 's/$(MODULE_NAME_LOWER).asm.wasm/"+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "origin")+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "pathname").split("\/").slice(0, -1).join("\/")+"\/$(MODULE_NAME_LOWER).asm.wasm"+"/g; ' $(MODULE_NAME_LOWER).asm.js > $(MODULE_NAME_LOWER).asm.js.tmp
	mv $(MODULE_NAME_LOWER).asm.js.tmp $(MODULE_NAME_LOWER).asm.js
	sed -e 's/locateFile(wasmBinaryFile)/wasmBinaryFile/g; ' $(MODULE_NAME_LOWER).asm.js > $(MODULE_NAME_LOWER).asm.js.tmp
	mv $(MODULE_NAME_LOWER).asm.js.tmp $(MODULE_NAME_LOWER).asm.js
	sed -e 's/var crypto = require(/let crypto = require(/g;' $(MODULE_NAME_LOWER).asm.js > $(MODULE_NAME_LOWER).asm.js.tmp
	mv $(MODULE_NAME_LOWER).asm.js.tmp $(MODULE_NAME_LOWER).asm.js
	sed -e 's/var crypto=require(/let crypto=require(/g;' $(MODULE_NAME_LOWER).asm.js > $(MODULE_NAME_LOWER).asm.js.tmp
	mv $(MODULE_NAME_LOWER).asm.js.tmp $(MODULE_NAME_LOWER).asm.js
else
	sed -e 's/if (typeof crypto !== "undefined")/if (typeof crypto !== "undefined" \&\& !ENVIRONMENT_IS_NODE)/g;' $(MODULE_NAME_LOWER).asm.js > $(MODULE_NAME_LOWER).asm.js.tmp
	mv $(MODULE_NAME_LOWER).asm.js.tmp $(MODULE_NAME_LOWER).asm.js
	sed -e 's/if(typeof crypto!=="undefined")/if(typeof crypto!=="undefined"\&\&!ENVIRONMENT_IS_NODE)/g;' $(MODULE_NAME_LOWER).asm.js > $(MODULE_NAME_LOWER).asm.js.tmp
	mv $(MODULE_NAME_LOWER).asm.js.tmp $(MODULE_NAME_LOWER).asm.js
	sed -e 's/var crypto = require(/let crypto = require(/g;' $(MODULE_NAME_LOWER).asm.js > $(MODULE_NAME_LOWER).asm.js.tmp
	mv $(MODULE_NAME_LOWER).asm.js.tmp $(MODULE_NAME_LOWER).asm.js
	sed -e 's/var crypto=require(/let crypto=require(/g;' $(MODULE_NAME_LOWER).asm.js > $(MODULE_NAME_LOWER).asm.js.tmp
	mv $(MODULE_NAME_LOWER).asm.js.tmp $(MODULE_NAME_LOWER).asm.js
endif
	cp $(MODULE_NAME_LOWER).asm.js $(MODULE_NAME_LOWER).asm.js.bak
	# Restore the backup copy of emcc.py
	cp $(EMSCRIPTEN_PATH)/emcc.py.bak $(EMSCRIPTEN_PATH)/emcc.py


sources+python+strings.o: $(BCS) requirements.make Makefile main.c main.bc ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).syncified.o ../customize/coldbrew_settings.py
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

../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).syncified.o: ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).o ../$(PYVERSION)/SyncPathCreator.cpp
	g++ ../$(PYVERSION)/SyncPathCreator.cpp -o ../installs/python-$(PYVERSION)/lib/SyncPathCreator.o -shared -fPIC $(shell llvm-config --cxxflags --ldflags) -I/usr/local/coldbrew/emsdk/clang/include
	$(dir $(shell which llvm-config))/opt -load ../installs/python-$(PYVERSION)/lib/SyncPathCreator.o -syncify ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).o > ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).syncified.o
	llvm-extract -rfunc=".+_coldbrew_sync" -rglob="\.str*|.*PyId_.*" ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).syncified.o > ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).syncified.extracted.o
	if [ -f "$(BUILD)/Modules/_sqlite/_sqlite.o" ]; then cp $(BUILD)/Modules/_sqlite/_sqlite.o ../installs/python-$(PYVERSION)/lib/_sqlite.o; fi
	rm ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).syncified.extracted.o
	rm -rf $(BUILD)
	rm -rf $(DOWNLOADS)

../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).o: $(PYLIB)
	( \
		rm -rf ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR) 2>/dev/null || true; \
		mkdir -p ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR); \
		cd ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR); \
		emar -x ../libpython$(PYMINOR).a; \
	)
	llvm-link ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR)/*.o -o ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).o
