PYVERSION=3.5.2
PYMINOR=$(basename $(PYVERSION))
PYLIB=../installs/python-$(PYVERSION)/lib/python$(PYMINOR)
CC=emcc
OPTFLAGS=-O2
CFLAGS=-std=gnu99 $(OPTFLAGS) -g -I ../installs/python-$(PYVERSION)/include/python$(PYMINOR)/ -Wno-warn-absolute-paths
LDFLAGS=$(OPTFLAGS) ../installs/python-$(PYVERSION)/lib/libpython$(PYMINOR).a \
  -s TOTAL_MEMORY=268435456 \
  -s MAIN_MODULE=1 \
  -s ASSERTIONS=2 \
  -s EMULATE_FUNCTION_POINTER_CASTS=1 \
  -s -s EXPORTED_FUNCTIONS='["_main","_runpython"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' \
  --memory-init-file 0

SRCS := $(wildcard *.c)
BCS := $(SRCS:.c=.bc)


all: ../dist  .asm.js

../dist: coldbrew.asm.js
	rm -rf ../dist
	mkdir -p ../dist
	cp coldbrew.* ../dist

coldbrew.asm.js: $(BCS) root
	$(CC) -o $@ $(filter %.bc,$^) $(LDFLAGS) \
		$(foreach d,$(wildcard root/*),--preload-file $d@/$(notdir $d))

clean:
	rm -rf ../build 2>/dev F/null || true
	rm -rf ../downloads 2>/dev F/null || true
	rm -rf ../installs 2>/dev F/null || true
	rm -rf ../dist 2>/dev F/null || true
	rm -rf root 2>/dev F/null || true
	rm *.bc 2>/dev/null || true
	rm *.js 2>/dev/null || true
	rm *.wasm 2>/dev/null || true
	rm *.so 2>/dev/null || true
	rm *.data 2>/dev/null || true
	rm *.zip 2>/dev/null || true
	rm *.pre 2>/dev/null || true
	rm *.wast 2>/dev/null || true
	rm *.map 2>/dev/null || true
	rm *.make 2>/dev/null || true

%.bc: %.c $(PYLIB)
	$(CC) -o $@ $< $(CFLAGS)

root: $(PYLIB)
	mkdir -p root/lib
	cp -a $(PYLIB)/ root/lib
	# Clean up unused modules
	( \
		cd root/lib/python$(PYMINOR); \
		rm -fr test distutils ensurepip idlelib __pycache__ tkinter; \
	)


$(PYLIB):
	make -C ../$(PYVERSION)
