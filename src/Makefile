COLDBREW_VERSION=$(shell python -c "import sys; sys.path.append('../'); import version; print(version.__version__)")
MODULE_NAME=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(MODULE_NAME)")
MODULE_NAME_LOWER=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(MODULE_NAME.lower())")
AGGRESSIVE_VARIABLE_ELIMINATION=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(AGGRESSIVE_VARIABLE_ELIMINATION)")
UNUSED_MODULES=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(UNUSED_MODULES)")
BROWSERFS=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(str(BROWSERFS).lower())")
PTHREAD_CFLAGS=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(PTHREAD_CFLAGS)")
PTHREAD_LDFLAGS=$(shell python -c "import sys; sys.path.append('../customize/'); from coldbrew_settings import *; print(PTHREAD_LDFLAGS)")

PYVERSION=3.5.2
PYMINOR=$(basename $(PYVERSION))
ROOT=$(abspath ..)
BUILD=$(ROOT)/build/$(PYVERSION)/Python-$(PYVERSION)
INSTALLS=$(ROOT)/installs
CUSTOMIZED_FILES=../customize/files
PYLIB=../installs/python-$(PYVERSION)/lib/python$(PYMINOR)
CC=emcc
OPTFLAGS=-O3
CFLAGS=-std=gnu99 $(OPTFLAGS) -g -I ../installs/python-$(PYVERSION)/include/python$(PYMINOR)/ -Wno-warn-absolute-paths $(PTHREAD_CFLAGS)
LDFLAGS=$(OPTFLAGS) -g3 \
  -s TOTAL_MEMORY=268435456 \
  -s EMULATE_FUNCTION_POINTER_CASTS=1 \
  -s EXPORTED_FUNCTIONS='["_main"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap", "FS", "ENV"]' \
  $(PTHREAD_LDFLAGS) \
  $(AGGRESSIVE_VARIABLE_ELIMINATION) \
  --memory-init-file 0 \
  --llvm-lto 1 -s ASSERTIONS=1
ALLOWMEMORYGROWTHFLAGS = -s ALLOW_MEMORY_GROWTH=1 --no-heap-copy
PREJSFLAGS = --pre-js prejs.js
MODULARIZEFLAGS = -s MODULARIZE=1 -s EXPORT_NAME="'_$(MODULE_NAME)_coldbrew_internal_'"
EMTERPRETERFLAGS = -s EMTERPRETIFY=1 -s EMTERPRETIFY_ASYNC=1 -s EMTERPRETIFY_WHITELIST='["_export_runAsync","_export__runFileAsync","_PyCFunction_Call","_slot_mp_ass_subscript","_PyObject_SetItem","_PyRun_StringFlags","_listextend","_PySequence_Fast","_PyUnicode_Join","_unicode_join","_slot_sq_length","_PyObject_Size","_builtin_len","_partial_call","_slot_sq_item","_iter_iternext","_call_method","_slot_mp_subscript","_PyObject_GetItem","_PyObject_ClearWeakRefs","_subtype_dealloc","_dict_dealloc","_method_dealloc","_slot_tp_new","_PyEval_CallObjectWithKeywords","_PyObject_IsSubclass","_builtin_issubclass","_gen_send_ex","_gen_iternext","_builtin_any","_builtin___build_class__","_PyObject_CallFunctionObjArgs","_PyEval_EvalFrameEx","__PyEval_EvalCodeWithName","_builtin_exec","_method_call","_slot_tp_init","_type_call","_property_descr_get","__PyObject_GenericGetAttrWithDict","_PyObject_GenericGetAttr","_PyObject_Call","_function_call","__PyObject_CallMethodIdObjArgs","_PyImport_ImportModuleLevelObject","_builtin___import__","__Coldbrew__sleep","_PyEval_EvalCode_coldbrew_async","_PyEval_EvalCodeEx_coldbrew_async","_PyEval_EvalFrame_coldbrew_async","_PyEval_EvalFrameEx_coldbrew_async","_PyImport_ExecCodeModule_coldbrew_async","_PyImport_ExecCodeModuleEx_coldbrew_async","_PyImport_ExecCodeModuleObject_coldbrew_async","_PyImport_ExecCodeModuleWithPathnames_coldbrew_async","_PyImport_ImportFrozenModule_coldbrew_async","_PyImport_ImportFrozenModuleObject_coldbrew_async","_PyRun_AnyFile_coldbrew_async","_PyRun_AnyFileEx_coldbrew_async","_PyRun_AnyFileExFlags_coldbrew_async","_PyRun_AnyFileFlags_coldbrew_async","_PyRun_File_coldbrew_async","_PyRun_FileEx_coldbrew_async","_PyRun_FileExFlags_coldbrew_async","_PyRun_FileFlags_coldbrew_async","_PyRun_InteractiveLoop_coldbrew_async","_PyRun_InteractiveLoopFlags_coldbrew_async","_PyRun_InteractiveOne_coldbrew_async","_PyRun_InteractiveOneFlags_coldbrew_async","_PyRun_InteractiveOneObject_coldbrew_async","_PyRun_SimpleFile_coldbrew_async","_PyRun_SimpleFileEx_coldbrew_async","_PyRun_SimpleFileExFlags_coldbrew_async","_PyRun_SimpleString_coldbrew_async","_PyRun_SimpleStringFlags_coldbrew_async","_PyRun_String_coldbrew_async","_PyRun_StringFlags_coldbrew_async","_Py_FrozenMain_coldbrew_async","_Py_Initialize_coldbrew_async","_Py_InitializeEx_coldbrew_async","_Py_Main_coldbrew_async","_Py_NewInterpreter_coldbrew_async","__PyEval_EvalCodeWithName_coldbrew_async","__PyGen_Finalize_coldbrew_async","__PyGen_Send_coldbrew_async","__Py_InitializeEx_Private_coldbrew_async","__coldbrew_yield_to_javascript_coldbrew_async","__imp_init_frozen_coldbrew_async","_builtin___build_class___coldbrew_async","_builtin_eval_coldbrew_async","_builtin_exec_coldbrew_async","_coro_wrapper_close_coldbrew_async","_coro_wrapper_iternext_coldbrew_async","_coro_wrapper_send_coldbrew_async","_coro_wrapper_throw_coldbrew_async","_fast_function_coldbrew_async","_frame_clear_coldbrew_async","_function_call_coldbrew_async","_gen_close_coldbrew_async","_gen_close_iter_coldbrew_async","_gen_iternext_coldbrew_async","_gen_send_ex_coldbrew_async","_gen_throw_coldbrew_async","_import_init_coldbrew_async","_zipimporter_load_module_coldbrew_async"]'

SRCS := $(wildcard *.c)
BCS := $(SRCS:.c=.bc)

rwildcard=$(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2) $(filter $(subst *,%,$2),$d))


all: ../dist $(MODULE_NAME_LOWER).asm.js index.html

index.html: index.html.pre.html $(MODULE_NAME_LOWER).asm.js Makefile
	sed -e 's/MODULE_NAME_LOWER/$(MODULE_NAME_LOWER)/g; s/MODULE_NAME/$(MODULE_NAME)/g;' index.html.pre.html > index.html

../dist: $(MODULE_NAME_LOWER).asm.js Makefile
	rm -rf ../dist
	mkdir -p ../dist
	cp $(MODULE_NAME_LOWER).* ../dist

$(MODULE_NAME_LOWER).asm.js: $(BCS) root root.make requirements.make prejs.js.pre.js module.js.pre.js Makefile
	llvm-link $(filter-out %.c.pre.bc,$(filter %.bc,$^)) $(BUILD)/Modules/_sqlite/_sqlite.o $(subst $() $()../, $() $()--override=../,$(call rwildcard, ../customize/requirements/lib/python/site-packages/, *.so)) > sources.o
	llvm-extract -rglob="\.str*" ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).asyncified.o > asyncpython-strings.o
	llvm-link --only-needed sources.o ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).o ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).asyncified.o $(call rwildcard, ../customize/requirements/lib/python/site-packages/, *.so) > sources+python.o
	llvm-link sources+python.o asyncpython-strings.o > sources+python+strings.o
	sed -e 's/BROWSERFS/$(BROWSERFS)/g; s/MODULE_NAME_LOWER/$(MODULE_NAME_LOWER)/g; s/MODULE_NAME/$(MODULE_NAME)/g; s/PYVERSION/$(PYVERSION)/g; s/COLDBREW_VERSION/$(COLDBREW_VERSION)/g;' prejs.js.pre.js > prejs.js
	sed -e 's/BROWSERFS/$(BROWSERFS)/g; s/MODULE_NAME_LOWER/$(MODULE_NAME_LOWER)/g; s/MODULE_NAME/$(MODULE_NAME)/g; s/PYVERSION/$(PYVERSION)/g; s/COLDBREW_VERSION/$(COLDBREW_VERSION)/g;' module.js.pre.js > module.js
	$(CC) -o $@ sources+python+strings.o $(LDFLAGS) $(ALLOWMEMORYGROWTHFLAGS) $(PREJSFLAGS) $(MODULARIZEFLAGS) $(EMTERPRETERFLAGS) \
		$(foreach d,$(wildcard root/*),--preload-file $d@/$(notdir $d))
	echo "" >> $@
	cat module.js >> $@
ifeq ($(BROWSERFS),true)
	echo "" >> $@
	cat ../third_party/browserfs/browserfs.min.js >> $@
endif

clean:
	rm -rf ../build || true
	rm -rf ../downloads || true
	rm -rf ../installs || true
	rm -rf ../dist || true
	rm -rf root || true
	rm *.bc 2>/dev/null || true
	rm *.asm.js 2>/dev/null || true
	rm *.orig.js 2>/dev/null || true
	rm *.wasm 2>/dev/null || true
	rm *.so 2>/dev/null || true
	rm *.o 2>/dev/null || true
	rm *.data 2>/dev/null || true
	rm *.zip 2>/dev/null || true
	rm *.pre 2>/dev/null || true
	rm *.wast 2>/dev/null || true
	rm *.map 2>/dev/null || true
	rm *.make 2>/dev/null || true
	rm *.tmp 2>/dev/null || true
	rm index.html 2>/dev/null || true
	rm module.js 2>/dev/null || true
	rm prejs.js 2>/dev/null || true
	rm main.c 2>/dev/null || true

main.c: add_requirements.py main.c.pre.c
	python add_requirements.py main.c.pre.c main.c


%.bc: %.c $(PYLIB) Makefile main.c
	$(CC) -o $@ $< $(CFLAGS) -DMODULE_NAME=$(MODULE_NAME) -DMODULE_NAME_LOWER=$(MODULE_NAME_LOWER) -DPYVERSION=$(PYVERSION) -DCOLDBREW_VERSION=$(COLDBREW_VERSION)

root: $(PYLIB) ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).o Makefile Coldbrew.py examples/add.py
	rm -rf root
	mkdir -p root/files || true
	rsync -rv --exclude=.DS_Store --exclude=".pyc" $(CUSTOMIZED_FILES) root/files
	rm root/files/.gitkeep 2>/dev/null || true
	mkdir -p root/usr/local/lib
	rsync -rv --exclude=.DS_Store $(dir $(PYLIB))/python$(PYMINOR) root/usr/local/lib
	rsync -rv --exclude=.DS_Store --exclude=".pyc" --exclude="*.so" ../customize/requirements/lib/python/site-packages/ root/usr/local/lib/python$(PYMINOR)/site-packages || true
	rsync -rv --exclude=".pyc" examples root/coldbrew
	cp Coldbrew.py root/usr/local/lib/python$(PYMINOR)/site-packages/Coldbrew.py
	# Clean up unused modules
	( \
		cd root/usr/local/lib/python$(PYMINOR); \
		rm -fr $(UNUSED_MODULES); \
	)

root.make: $(PYLIB) ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).o Makefile Coldbrew.py
	touch root.make

$(PYLIB): ../customize/coldbrew_settings.py ../$(PYVERSION)/AsyncPathCreator.cpp ../$(PYVERSION)/Setup.local
	make -C ../$(PYVERSION)

requirements.make: ../customize/requirements.txt
	( \
		rm -rf ../customize/requirements || true; \
		python -m venv ../customize/requirements; \
		mv /usr/local/include/python* /usr/local/include/python.bak || true; \
		/bin/bash -c "source ../customize/requirements/bin/activate && CC=$(CC) LDSHARED=$(CC) CFLAGS=-I$(INSTALLS)/python-$(PYVERSION)/include/python$(PYMINOR)/ pip install -r ../customize/requirements.txt -vvv --no-binary :all:"; \
		mv ../customize/requirements/lib/python*/ ../customize/requirements/lib/python/ || true; \
		rm -rf ../customize/requirements/lib/python/site-packages/*.dist-info || true; \
		rm -rf ../customize/requirements/lib/python/site-packages/*.egg-info || true; \
		rm -rf ../customize/requirements/lib/python/site-packages/pkg_resources || true; \
		rm -rf ../customize/requirements/lib/python/site-packages/setuptools || true; \
		rm -rf ../customize/requirements/lib/python/site-packages/setuptools* || true; \
		rm -rf ../customize/requirements/lib/python/site-packages/pip || true; \
		rm -rf ../customize/requirements/lib/python/site-packages/pip* || true; \
		rm -rf ../customize/requirements/lib/python/site-packages/*.py || true; \
		rm -rf ../customize/requirements/lib/python/site-packages/__pycache__ || true; \
	)

../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).o: $(PYLIB)
	( \
		rm -rf ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR) 2>/dev/null || true; \
		mkdir -p ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR); \
		cd ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR); \
		emar -x ../libpython$(PYMINOR).a; \
	)
	llvm-link ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR)/*.o -o ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).o
	g++ ../$(PYVERSION)/AsyncPathCreator.cpp -o ../installs/python-$(PYVERSION)/lib/AsyncPathCreator.o -shared -fPIC $(shell llvm-config --cxxflags --ldflags --libs) -I/usr/local/coldbrew/emsdk/clang/include
	opt -load ../installs/python-$(PYVERSION)/lib/AsyncPathCreator.o -asyncify ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).o > ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).asyncified.o
	llvm-extract -rfunc=".+_coldbrew_async" -rglob="\.str*|.*PyId_.*" ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).asyncified.o > ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).asyncified.extracted.o
