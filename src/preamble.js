// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

#if BENCHMARK
Module.realPrint = out;
out = err = function(){};
#endif

{{{ makeModuleReceiveWithVar('wasmBinary') }}}

#if WASM2JS
#include "wasm2js.js"
#endif

#if WASM
if (typeof WebAssembly !== 'object') {
#if ASSERTIONS
  abort('No WebAssembly support found. Build with -s WASM=0 to target JavaScript instead.');
#else
  err('no native wasm support detected');
#endif
}
#endif

#include "runtime_safe_heap.js"

// Wasm globals

var wasmMemory;

// Potentially used for direct table calls.
var wasmTable;

#if USE_PTHREADS
// For sending to workers.
var wasmModule;
#endif // USE_PTHREADS

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS = 0;

/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  var func = Module['_' + ident]; // closure exported function
  assert(func, 'Cannot call unknown function ' + ident + ', make sure it is exported');
  return func;
}

// C calling interface.
function ccall(ident, returnType, argTypes, args, opts) {
  // For fast lookup of conversion functions
  var toC = {
    'string': function(str) {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) { // null string
        // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
        var len = (str.length << 2) + 1;
        ret = stackAlloc(len);
        stringToUTF8(str, ret, len);
      }
      return ret;
    },
    'array': function(arr) {
      var ret = stackAlloc(arr.length);
      writeArrayToMemory(arr, ret);
      return ret;
    }
  };

  function convertReturnValue(ret) {
    if (returnType === 'string') return UTF8ToString(ret);
    if (returnType === 'boolean') return Boolean(ret);
    return ret;
  }

  var func = getCFunc(ident);
  var cArgs = [];
  var stack = 0;
#if ASSERTIONS
  assert(returnType !== 'array', 'Return type should not be "array".');
#endif
  if (args) {
    for (var i = 0; i < args.length; i++) {
      var converter = toC[argTypes[i]];
      if (converter) {
        if (stack === 0) stack = stackSave();
        cArgs[i] = converter(args[i]);
      } else {
        cArgs[i] = args[i];
      }
    }
  }
  var ret = func.apply(null, cArgs);
#if EMTERPRETIFY_ASYNC
  if (typeof EmterpreterAsync === 'object' && EmterpreterAsync.state) {
#if ASSERTIONS
    assert(opts && opts.async, 'The call to ' + ident + ' is running asynchronously. If this was intended, add the async option to the ccall/cwrap call.');
    assert(!EmterpreterAsync.restartFunc, 'Cannot have multiple async ccalls in flight at once');
#endif
    return new Promise(function(resolve) {
      EmterpreterAsync.restartFunc = func;
      EmterpreterAsync.asyncFinalizers.push(function(ret) {
        if (stack !== 0) stackRestore(stack);
        resolve(convertReturnValue(ret));
      });
    });
  }
#endif
#if ASYNCIFY && WASM_BACKEND
  if (typeof Asyncify === 'object' && Asyncify.currData !== null) {
#if ASSERTIONS
    assert(opts && opts.async, 'The call to ' + ident + ' is running asynchronously. If this was intended, add the async option to the ccall/cwrap call.');
    assert(Asyncify.asyncFinalizers.length === 0, 'Cannot have multiple async ccalls in flight at once');
#endif
    return new Promise(function(resolve) {
      Asyncify.asyncFinalizers.push(function(ret) {
        if (stack !== 0) stackRestore(stack);
        resolve(convertReturnValue(ret));
      });
    });
  }
#endif // EMTERPRETIFY_ASYNC

  ret = convertReturnValue(ret);
  if (stack !== 0) stackRestore(stack);
#if EMTERPRETIFY_ASYNC || (ASYNCIFY && WASM_BACKEND)
  // If this is an async ccall, ensure we return a promise
  if (opts && opts.async) return Promise.resolve(ret);
#endif
  return ret;
}

function cwrap(ident, returnType, argTypes, opts) {
#if !ASSERTIONS
  argTypes = argTypes || [];
  // When the function takes numbers and returns a number, we can just return
  // the original function
  var numericArgs = argTypes.every(function(type){ return type === 'number'});
  var numericRet = returnType !== 'string';
  if (numericRet && numericArgs && !opts) {
    return getCFunc(ident);
  }
#endif
  return function() {
    return ccall(ident, returnType, argTypes, arguments, opts);
  }
}

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_DYNAMIC = 2; // Cannot be freed except through sbrk
var ALLOC_NONE = 3; // Do not allocate

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
/** @type {function((TypedArray|Array<number>|number), string, number, number=)} */
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc,
#if DECLARE_ASM_MODULE_EXPORTS    
    stackAlloc,
#else
    typeof stackAlloc !== 'undefined' ? stackAlloc : null,
#endif
    dynamicAlloc][allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var stop;
    ptr = ret;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      {{{ makeSetValue('ptr', '0', '0', 'i32', null, true) }}};
    }
    stop = ret + size;
    while (ptr < stop) {
      {{{ makeSetValue('ptr++', '0', '0', 'i8', null, true) }}};
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(/** @type {!Uint8Array} */ (slab), ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
#if ASSERTIONS
    assert(type, 'Must know what type to store in allocate!');
#endif

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}

// Allocate memory during any stage of startup - static memory early on, dynamic memory later, malloc when ready
function getMemory(size) {
  if (!runtimeInitialized) return dynamicAlloc(size);
  return _malloc(size);
}

#include "runtime_strings.js"

// Memory management

var PAGE_SIZE = 16384;
var WASM_PAGE_SIZE = {{{ WASM_PAGE_SIZE }}};
var ASMJS_PAGE_SIZE = {{{ ASMJS_PAGE_SIZE }}};

function alignUp(x, multiple) {
  if (x % multiple > 0) {
    x += multiple - (x % multiple);
  }
  return x;
}

var HEAP,
/** @type {ArrayBuffer} */
  buffer,
/** @type {Int8Array} */
  HEAP8,
/** @type {Uint8Array} */
  HEAPU8,
/** @type {Int16Array} */
  HEAP16,
/** @type {Uint16Array} */
  HEAPU16,
/** @type {Int32Array} */
  HEAP32,
/** @type {Uint32Array} */
  HEAPU32,
/** @type {Float32Array} */
  HEAPF32,
/** @type {Float64Array} */
  HEAPF64;

function updateGlobalBufferViews() {
  Module['HEAP8'] = HEAP8 = new Int8Array(buffer);
  Module['HEAP16'] = HEAP16 = new Int16Array(buffer);
  Module['HEAP32'] = HEAP32 = new Int32Array(buffer);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(buffer);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(buffer);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(buffer);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(buffer);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(buffer);
}

#if USE_PTHREADS
if (!ENVIRONMENT_IS_PTHREAD) { // Pthreads have already initialized these variables in src/worker.js, where they were passed to the thread worker at startup time
#endif

var STATIC_BASE = {{{ GLOBAL_BASE }}},
    STACK_BASE = {{{ getQuoted('STACK_BASE') }}},
    STACKTOP = STACK_BASE,
    STACK_MAX = {{{ getQuoted('STACK_MAX') }}},
    DYNAMIC_BASE = {{{ getQuoted('DYNAMIC_BASE') }}},
    DYNAMICTOP_PTR = {{{ makeStaticAlloc(4) }}};

#if ASSERTIONS
assert(STACK_BASE % 16 === 0, 'stack must start aligned');
assert(DYNAMIC_BASE % 16 === 0, 'heap must start aligned');
#endif

#if USE_PTHREADS
}
#endif

#if EMTERPRETIFY
function abortStackOverflowEmterpreter() {
  abort("Emterpreter stack overflow! Decrease the recursion level or increase EMT_STACK_MAX in tools/emterpretify.py (current value " + EMT_STACK_MAX + ").");
}
#endif

var TOTAL_STACK = {{{ TOTAL_STACK }}};
#if ASSERTIONS
if (Module['TOTAL_STACK']) assert(TOTAL_STACK === Module['TOTAL_STACK'], 'the stack size can no longer be determined at runtime')
#endif
#if MAIN_MODULE && !WASM
// JS side modules use this value to decide their stack size.
Module['TOTAL_STACK'] = TOTAL_STACK;
#endif

{{{ makeModuleReceiveWithVar('INITIAL_TOTAL_MEMORY', 'TOTAL_MEMORY', TOTAL_MEMORY) }}}

#if ASSERTIONS
assert(INITIAL_TOTAL_MEMORY >= TOTAL_STACK, 'TOTAL_MEMORY should be larger than TOTAL_STACK, was ' + INITIAL_TOTAL_MEMORY + '! (TOTAL_STACK=' + TOTAL_STACK + ')');

// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray !== undefined && Int32Array.prototype.set !== undefined,
       'JS engine does not provide full typed array support');
#endif

#if IN_TEST_HARNESS

// Test runs in browsers should always be free from uncaught exceptions. If an uncaught exception is thrown, we fail browser test execution in the REPORT_RESULT() macro to output an error value.
if (ENVIRONMENT_IS_WEB) {
  window.addEventListener('error', function(e) {
    if (e.message.indexOf('SimulateInfiniteLoop') != -1) return;
    console.error('Page threw an exception ' + e);
    Module['pageThrewException'] = true;
  });
}

#if USE_PTHREADS
if (typeof SharedArrayBuffer === 'undefined' || typeof Atomics === 'undefined') {
  xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8888/report_result?skipped:%20SharedArrayBuffer%20is%20not%20supported!');
  xhr.send();
  setTimeout(function() { window.close() }, 2000);
}
#endif
#endif

#include "runtime_sab_polyfill.js"

#if USE_PTHREADS
if (ENVIRONMENT_IS_PTHREAD) {
#if MODULARIZE && WASM
  // In pthreads mode the wasmMemory and others are received in an onmessage, and that
  // onmessage then loadScripts us, sending wasmMemory etc. on Module. Here we recapture
  // it to a local so it can be used normally.
  wasmMemory = Module['wasmMemory'];
#endif
} else {
#endif // USE_PTHREADS
#if WASM

#if expectToReceiveOnModule('wasmMemory')
  if (Module['wasmMemory']) {
    wasmMemory = Module['wasmMemory'];
  } else
#endif
  {
    wasmMemory = new WebAssembly.Memory({
      'initial': INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE
#if ALLOW_MEMORY_GROWTH
#if WASM_MEM_MAX != -1
      ,
      'maximum': {{{ WASM_MEM_MAX }}} / WASM_PAGE_SIZE
#endif
#else
      ,
      'maximum': INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE
#endif // ALLOW_MEMORY_GROWTH
#if USE_PTHREADS
      ,
      'shared': true
#endif
    });
#if USE_PTHREADS
    assert(wasmMemory.buffer instanceof SharedArrayBuffer, 'requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag');
#endif
  }

#else // WASM

  if (Module['buffer']) {
    buffer = Module['buffer'];
  }
#ifdef USE_PTHREADS
  else if (typeof SharedArrayBuffer !== 'undefined') {
    buffer = new SharedArrayBuffer(INITIAL_TOTAL_MEMORY);
  }
#endif
  else {
    buffer = new ArrayBuffer(INITIAL_TOTAL_MEMORY);
  }
#endif // WASM
#if USE_PTHREADS
}
#endif

#if WASM
if (wasmMemory) {
  buffer = wasmMemory.buffer;
}
#endif

// If the user provides an incorrect length, just use that length instead rather than providing the user to
// specifically provide the memory length with Module['TOTAL_MEMORY'].
INITIAL_TOTAL_MEMORY = buffer.byteLength;
#ifdef ASSERTIONS && WASM
assert(INITIAL_TOTAL_MEMORY % WASM_PAGE_SIZE === 0);
#ifdef ALLOW_MEMORY_GROWTH && WASM_MEM_MAX != -1
assert({{{ WASM_PAGE_SIZE }}} % WASM_PAGE_SIZE === 0);
#endif
#endif
updateGlobalBufferViews();

#if USE_PTHREADS
if (!ENVIRONMENT_IS_PTHREAD) { // Pthreads have already initialized these variables in src/worker.js, where they were passed to the thread worker at startup time
#endif
HEAP32[DYNAMICTOP_PTR>>2] = DYNAMIC_BASE;
#if USE_PTHREADS
}
#endif

#include "runtime_stack_check.js"
#include "runtime_assertions.js"

function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Module['dynCall_v'](func);
      } else {
        Module['dynCall_vi'](func, callback.arg);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}

var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;
var runtimeExited = false;

#if USE_PTHREADS
if (ENVIRONMENT_IS_PTHREAD) runtimeInitialized = true; // The runtime is hosted in the main thread, and bits shared to pthreads via SharedArrayBuffer. No need to init again in pthread.
#endif

function preRun() {
#if USE_PTHREADS
  if (ENVIRONMENT_IS_PTHREAD) return; // PThreads reuse the runtime from the main thread.
#endif

#if expectToReceiveOnModule('preRun')
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
#endif

  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
#if STACK_OVERFLOW_CHECK
  checkStackCookie();
#endif
#if ASSERTIONS
  assert(!runtimeInitialized);
#endif
  runtimeInitialized = true;
  {{{ getQuoted('ATINITS') }}}
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
#if STACK_OVERFLOW_CHECK
  checkStackCookie();
#endif
#if USE_PTHREADS
  if (ENVIRONMENT_IS_PTHREAD) return; // PThreads reuse the runtime from the main thread.
#endif
  {{{ getQuoted('ATMAINS') }}}
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
#if STACK_OVERFLOW_CHECK
  checkStackCookie();
#endif
#if USE_PTHREADS
  if (ENVIRONMENT_IS_PTHREAD) return; // PThreads reuse the runtime from the main thread.
#endif
#if EXIT_RUNTIME
  callRuntimeCallbacks(__ATEXIT__);
  {{{ getQuoted('ATEXITS') }}}
#endif
  runtimeExited = true;
}

function postRun() {
#if STACK_OVERFLOW_CHECK
  checkStackCookie();
#endif
#if USE_PTHREADS
  if (ENVIRONMENT_IS_PTHREAD) return; // PThreads reuse the runtime from the main thread.
#endif

#if expectToReceiveOnModule('postRun')
  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
#endif

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
#if EXIT_RUNTIME
  __ATEXIT__.unshift(cb);
#endif
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

{{{ unSign }}}
{{{ reSign }}}

#include "runtime_math.js"

// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
#if ASSERTIONS
var runDependencyTracking = {};
#endif

function getUniqueRunDependency(id) {
#if ASSERTIONS
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
#endif
  return id;
}

function addRunDependency(id) {
#if USE_PTHREADS
  // We should never get here in pthreads (could no-op this out if called in pthreads, but that might indicate a bug in caller side,
  // so good to be very explicit)
  assert(!ENVIRONMENT_IS_PTHREAD, "addRunDependency cannot be used in a pthread worker");
#endif
  runDependencies++;

#if expectToReceiveOnModule('monitorRunDependencies')
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
#endif

#if ASSERTIONS
  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval !== 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(function() {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err('dependency: ' + dep);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
#endif
}

function removeRunDependency(id) {
  runDependencies--;

#if expectToReceiveOnModule('monitorRunDependencies')
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
#endif

#if ASSERTIONS
  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
#endif
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data
#if WASM && MAIN_MODULE
Module["preloadedWasm"] = {}; // maps url to wasm instance exports
#endif

#if RELOCATABLE
{{{
(function() {
  // add in RUNTIME_LINKED_LIBS, if provided
  if (RUNTIME_LINKED_LIBS.length > 0) {
    return "if (!Module['dynamicLibraries']) Module['dynamicLibraries'] = [];\n" +
           "Module['dynamicLibraries'] = " + JSON.stringify(RUNTIME_LINKED_LIBS) + ".concat(Module['dynamicLibraries']);\n";
  }
  return '';
})()
}}}

addOnPreRun(function() {
  function loadDynamicLibraries(libs) {
    if (libs) {
      libs.forEach(function(lib) {
        // libraries linked to main never go away
        loadDynamicLibrary(lib, {global: true, nodelete: true});
      });
    }
  }
  // if we can load dynamic libraries synchronously, do so, otherwise, preload
#if WASM
  if (Module['dynamicLibraries'] && Module['dynamicLibraries'].length > 0 && !readBinary) {
    // we can't read binary data synchronously, so preload
    addRunDependency('preload_dynamicLibraries');
    Promise.all(Module['dynamicLibraries'].map(function(lib) {
      return loadDynamicLibrary(lib, {loadAsync: true, global: true, nodelete: true});
    })).then(function() {
      // we got them all, wonderful
      removeRunDependency('preload_dynamicLibraries');
    });
    return;
  }
#endif
  loadDynamicLibraries(Module['dynamicLibraries']);
});

#if ASSERTIONS
function lookupSymbol(ptr) { // for a pointer, print out all symbols that resolve to it
  var ret = [];
  for (var i in Module) {
    if (Module[i] === ptr) ret.push(i);
  }
  print(ptr + ' is ' + ret);
}
#endif
#endif

var memoryInitializer = null;

#if MEMORYPROFILER
#include "memoryprofiler.js"
#endif

#if USE_PTHREADS && PTHREAD_HINT_NUM_CORES < 0
if (!ENVIRONMENT_IS_PTHREAD) addOnPreRun(function() {
  addRunDependency('pthreads_querycores');

  var bg = document.createElement('div');
  bg.style = "position: absolute; top: 0%; left: 0%; width: 100%; height: 100%; background-color: black; z-index:1001; -moz-opacity: 0.8; opacity:.80; filter: alpha(opacity=80);";
  var div = document.createElement('div');
  var default_num_cores = navigator.hardwareConcurrency || 4;
  var hwConcurrency = navigator.hardwareConcurrency ? ("says " + navigator.hardwareConcurrency) : "is not available";
  var html = '<div style="width: 100%; text-align:center;"> Thread setup</div> <br /> Number of logical cores: <input type="number" style="width: 50px;" value="'
    + default_num_cores + '" min="1" max="32" id="thread_setup_num_logical_cores"></input> <br /><span style="font-size: 75%;">(<span style="font-family: monospace;">navigator.hardwareConcurrency</span> '
    + hwConcurrency + ')</span> <br />';
#if PTHREAD_POOL_SIZE < 0
  html += 'PThread pool size: <input type="number" style="width: 50px;" value="'
    + default_num_cores + '" min="1" max="32" id="thread_setup_pthread_pool_size"></input> <br />';
#endif
  html += ' <br /> <input type="button" id="thread_setup_button_go" value="Go"></input>';
  div.innerHTML = html;
  div.style = 'position: absolute; top: 35%; left: 35%; width: 30%; height: 150px; padding: 16px; border: 16px solid gray; background-color: white; z-index:1002; overflow: auto;';
  document.body.appendChild(bg);
  document.body.appendChild(div);
  var goButton = document.getElementById('thread_setup_button_go');
  goButton.onclick = function() {
    var num_logical_cores = parseInt(document.getElementById('thread_setup_num_logical_cores').value);
    _emscripten_force_num_logical_cores(num_logical_cores);
#if PTHREAD_POOL_SIZE < 0
    var pthread_pool_size = parseInt(document.getElementById('thread_setup_pthread_pool_size').value);
    PThread.allocateUnusedWorkers(pthread_pool_size, function() { removeRunDependency('pthreads_querycores'); });
#else
    removeRunDependency('pthreads_querycores');
#endif
    document.body.removeChild(bg);
    document.body.removeChild(div);
  }
});
#endif

#if PTHREAD_POOL_SIZE > 0
// To work around https://bugzilla.mozilla.org/show_bug.cgi?id=1049079, warm up a worker pool before starting up the application.
if (!ENVIRONMENT_IS_PTHREAD) addOnPreRun(function() { if (typeof SharedArrayBuffer !== 'undefined') { addRunDependency('pthreads'); PThread.allocateUnusedWorkers({{{PTHREAD_POOL_SIZE}}}, function() { removeRunDependency('pthreads'); }); }});
#endif

#if ASSERTIONS && !('$FS' in addedLibraryItems) && !ASMFS
// show errors on likely calls to FS when it was not included
var FS = {
  error: function() {
    abort('Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with  -s FORCE_FILESYSTEM=1');
  },
  init: function() { FS.error() },
  createDataFile: function() { FS.error() },
  createPreloadedFile: function() { FS.error() },
  createLazyFile: function() { FS.error() },
  open: function() { FS.error() },
  mkdev: function() { FS.error() },
  registerDevice: function() { FS.error() },
  analyzePath: function() { FS.error() },
  loadFilesFromDB: function() { FS.error() },

  ErrnoError: function ErrnoError() { FS.error() },
};
Module['FS_createDataFile'] = FS.createDataFile;
Module['FS_createPreloadedFile'] = FS.createPreloadedFile;
#endif

#if CYBERDWARF
var cyberDWARFFile = '{{{ BUNDLED_CD_DEBUG_FILE }}}';
#endif

#include "URIUtils.js"

#if WASM
var wasmBinaryFile = '{{{ WASM_BINARY_FILE }}}';
if (!isDataURI(wasmBinaryFile)) {
  wasmBinaryFile = locateFile(wasmBinaryFile);
}

function getBinary() {
  try {
    if (wasmBinary) {
      return new Uint8Array(wasmBinary);
    }

#if SUPPORT_BASE64_EMBEDDING
    var binary = tryParseAsDataURI(wasmBinaryFile);
    if (binary) {
      return binary;
    }
#endif
    if (readBinary) {
      return readBinary(wasmBinaryFile);
    } else {
#if WASM_ASYNC_COMPILATION
      throw "both async and sync fetching of the wasm failed";
#else
      throw "sync fetching of the wasm failed: you can preload it to Module['wasmBinary'] manually, or emcc.py will do that for you when generating HTML (but not JS)";
#endif
    }
  }
  catch (err) {
    abort(err);
  }
}

function getBinaryPromise() {
  // if we don't have the binary yet, and have the Fetch api, use that
  // in some environments, like Electron's render process, Fetch api may be present, but have a different context than expected, let's only use it on the Web
  if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === 'function') {
    return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function(response) {
      if (!response['ok']) {
        throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
      }
      return response['arrayBuffer']();
    }).catch(function () {
      return getBinary();
    });
  }
  // Otherwise, getBinary should be able to get it synchronously
  return new Promise(function(resolve, reject) {
    resolve(getBinary());
  });
}

#if LOAD_SOURCE_MAP
var wasmSourceMap;
#include "source_map_support.js"
#endif

#if USE_OFFSET_CONVERTER
var wasmOffsetConverter;
#include "wasm_offset_converter.js"
#endif

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm(env) {
#if WASM2JS || AUTODEBUG
  // wasm2js legalization of i64 support code may require these
  // autodebug may also need them
  env['setTempRet0'] = setTempRet0;
  env['getTempRet0'] = getTempRet0;
#endif
#if AUTODEBUG
  env['log_execution'] = function(loc) {
    console.log('log_execution ' + loc);
  };
  env['get_i32'] = function(loc, index, value) {
    console.log('get_i32 ' + [loc, index, value]);
    return value;
  };
  env['get_i64'] = function(loc, index, low, high) {
    console.log('get_i64 ' + [loc, index, low, high]);
    env['setTempRet0'](high);
    return low;
  };
  env['get_f32'] = function(loc, index, value) {
    console.log('get_f32 ' + [loc, index, value]);
    return value;
  };
  env['get_f64'] = function(loc, index, value) {
    console.log('get_f64 ' + [loc, index, value]);
    return value;
  };
  env['set_i32'] = function(loc, index, value) {
    console.log('set_i32 ' + [loc, index, value]);
    return value;
  };
  env['set_i64'] = function(loc, index, low, high) {
    console.log('set_i64 ' + [loc, index, low, high]);
    env['setTempRet0'](high);
    return low;
  };
  env['set_f32'] = function(loc, index, value) {
    console.log('set_f32 ' + [loc, index, value]);
    return value;
  };
  env['set_f64'] = function(loc, index, value) {
    console.log('set_f64 ' + [loc, index, value]);
    return value;
  };
  env['load_ptr'] = function(loc, bytes, offset, ptr) {
    console.log('load_ptr ' + [loc, bytes, offset, ptr]);
    return ptr;
  };
  env['load_val_i32'] = function(loc, value) {
    console.log('load_val_i32 ' + [loc, value]);
    return value;
  };
  env['load_val_i64'] = function(loc, low, high) {
    console.log('load_val_i64 ' + [loc, low, high]);
    env['setTempRet0'](high);
    return low;
  };
  env['load_val_f32'] = function(loc, value) {
    console.log('loaload_val_i32d_ptr ' + [loc, value]);
    return value;
  };
  env['load_val_f64'] = function(loc, value) {
    console.log('load_val_f64 ' + [loc, value]);
    return value;
  };
  env['store_ptr'] = function(loc, bytes, offset, ptr) {
    console.log('store_ptr ' + [loc, bytes, offset, ptr]);
    return ptr;
  };
  env['store_val_i32'] = function(loc, value) {
    console.log('store_val_i32 ' + [loc, value]);
    return value;
  };
  env['store_val_i64'] = function(loc, low, high) {
    console.log('store_val_i64 ' + [loc, low, high]);
    env['setTempRet0'](high);
    return low;
  };
  env['store_val_f32'] = function(loc, value) {
    console.log('loastore_val_i32d_ptr ' + [loc, value]);
    return value;
  };
  env['store_val_f64'] = function(loc, value) {
    console.log('store_val_f64 ' + [loc, value]);
    return value;
  };
#endif

  // prepare imports
  var info = {
    'env': env
#if WASM_BACKEND == 0
    ,
    'global': {
      'NaN': NaN,
      'Infinity': Infinity
    },
    'global.Math': Math,
    'asm2wasm': asm2wasmImports
#endif
  };
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  function receiveInstance(instance, module) {
    var exports = instance.exports;
#if WASM_BACKEND && ASYNCIFY
    exports = Asyncify.instrumentWasmExports(exports);
#endif
    Module['asm'] = exports;
#if USE_PTHREADS
    // Keep a reference to the compiled module so we can post it to the workers.
    wasmModule = module;
    // Instantiation is synchronous in pthreads and we assert on run dependencies.
    if (!ENVIRONMENT_IS_PTHREAD) removeRunDependency('wasm-instantiate');
#else
    removeRunDependency('wasm-instantiate');
#endif
  }
   // we can't run yet (except in a pthread, where we have a custom sync instantiator)
  {{{ runOnMainThread("addRunDependency('wasm-instantiate');") }}}

#if LOAD_SOURCE_MAP
  {{{ runOnMainThread("addRunDependency('source-map');") }}}

  function receiveSourceMapJSON(sourceMap) {
    wasmSourceMap = new WasmSourceMap(sourceMap);
    {{{ runOnMainThread("removeRunDependency('source-map');") }}}
  }
#endif

#if ASSERTIONS
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
#endif
  function receiveInstantiatedSource(output) {
    // 'output' is a WebAssemblyInstantiatedSource object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
#if ASSERTIONS
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
#endif
#if USE_PTHREADS
    receiveInstance(output['instance'], output['module']);
#else
      // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
      // When the regression is fixed, can restore the above USE_PTHREADS-enabled path.
    receiveInstance(output['instance']);
#endif
  }

#if USE_OFFSET_CONVERTER
  {{{ runOnMainThread("addRunDependency('offset-converter');") }}}
#endif

  function instantiateArrayBuffer(receiver) {
    return getBinaryPromise().then(function(binary) {
#if USE_OFFSET_CONVERTER
      var result = WebAssembly.instantiate(binary, info);
      result.then(function (instance) {
        wasmOffsetConverter = new WasmOffsetConverter(binary, instance.module);
        {{{ runOnMainThread("removeRunDependency('offset-converter');") }}}
      });
      return result;
#else
      return WebAssembly.instantiate(binary, info);
#endif
    }).then(receiver, function(reason) {
      err('failed to asynchronously prepare wasm: ' + reason);
      abort(reason);
    });
  }

  // Prefer streaming instantiation if available.
#if WASM_ASYNC_COMPILATION
  function instantiateAsync() {
    if (!wasmBinary &&
        typeof WebAssembly.instantiateStreaming === 'function' &&
        !isDataURI(wasmBinaryFile) &&
        typeof fetch === 'function') {
      fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function (response) {
        var result = WebAssembly.instantiateStreaming(response, info);
#if USE_OFFSET_CONVERTER
        // This doesn't actually do another request, it only copies the Response object.
        // Copying lets us consume it independently of WebAssembly.instantiateStreaming.
        Promise.all([response.clone().arrayBuffer(), result]).then(function (results) {
          wasmOffsetConverter = new WasmOffsetConverter(new Uint8Array(results[0]), results[1].module);
          {{{ runOnMainThread("removeRunDependency('offset-converter');") }}}
        });
#endif
        return result.then(receiveInstantiatedSource, function(reason) {
            // We expect the most common failure cause to be a bad MIME type for the binary,
            // in which case falling back to ArrayBuffer instantiation should work.
            err('wasm streaming compile failed: ' + reason);
            err('falling back to ArrayBuffer instantiation');
            instantiateArrayBuffer(receiveInstantiatedSource);
          });
      });
    } else {
      return instantiateArrayBuffer(receiveInstantiatedSource);
    }
  }
#else
  function instantiateSync() {
    var instance;
    var module;
    var binary;
    try {
      binary = getBinary();
      module = new WebAssembly.Module(binary);
      instance = new WebAssembly.Instance(module, info);
#if USE_OFFSET_CONVERTER
      wasmOffsetConverter = new WasmOffsetConverter(binary, module);
      {{{ runOnMainThread("removeRunDependency('offset-converter');") }}}
#endif
    } catch (e) {
      var str = e.toString();
      err('failed to compile wasm module: ' + str);
      if (str.indexOf('imported Memory') >= 0 ||
          str.indexOf('memory import') >= 0) {
        err('Memory size incompatibility issues may be due to changing TOTAL_MEMORY at runtime to something too large. Use ALLOW_MEMORY_GROWTH to allow any size memory (and also make sure not to set TOTAL_MEMORY at runtime to something smaller than it was at compile time).');
      }
      throw e;
    }
#if LOAD_SOURCE_MAP
    receiveSourceMapJSON(getSourceMap());
#endif
    receiveInstance(instance, module);
  }
#endif
  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to run the instantiation parallel
  // to any other async startup actions they are performing.
  if (Module['instantiateWasm']) {
    try {
      var exports = Module['instantiateWasm'](info, receiveInstance);
#if WASM_BACKEND && ASYNCIFY
      exports = Asyncify.instrumentWasmExports(exports);
#endif
      return exports;
    } catch(e) {
      err('Module.instantiateWasm callback failed with error: ' + e);
      return false;
    }
  }

#if WASM_ASYNC_COMPILATION
#if RUNTIME_LOGGING
  err('asynchronously preparing wasm');
#endif
  instantiateAsync();
#if LOAD_SOURCE_MAP
  getSourceMapPromise().then(receiveSourceMapJSON);
#endif
  return {}; // no exports yet; we'll fill them in later
#else
  instantiateSync();
  return Module['asm']; // exports were assigned here
#endif
}

// Provide an "asm.js function" for the application, called to "link" the asm.js module. We instantiate
// the wasm module at that time, and it receives imports and provides exports and so forth, the app
// doesn't need to care that it is wasm or asm.js.

Module['asm'] = function(global, env, providedBuffer) {
  // memory was already allocated (so js could use the buffer)
  env['memory'] = wasmMemory
#if MODULARIZE && USE_PTHREADS
  // Pthreads assign wasmMemory in their worker startup. In MODULARIZE mode, they cannot assign inside the
  // Module scope, so lookup via Module as well.
  || Module['wasmMemory']
#endif
  ;
  // import table
  env['table'] = wasmTable = new WebAssembly.Table({
    'initial': {{{ getQuoted('WASM_TABLE_SIZE') }}},
#if !ALLOW_TABLE_GROWTH
#if WASM_BACKEND
    'maximum': {{{ getQuoted('WASM_TABLE_SIZE') }}} + {{{ RESERVED_FUNCTION_POINTERS }}},
#else
    'maximum': {{{ getQuoted('WASM_TABLE_SIZE') }}},
#endif
#endif // WASM_BACKEND
    'element': 'anyfunc'
  });
  // With the wasm backend __memory_base and __table_base and only needed for
  // relocatable output.
#if RELOCATABLE || !WASM_BACKEND
  env['__memory_base'] = {{{ GLOBAL_BASE }}}; // tell the memory segments where to place themselves
#if WASM_BACKEND
  env['__stack_pointer'] = STACK_BASE;
  // We reserve slot 0 in the table for the NULL function pointer.
  // This means the __table_base for the main module (even in dynamic linking)
  // is always 1.
  env['__table_base'] = 1;
#else
  // table starts at 0 by default (even in dynamic linking, for the main module)
  env['__table_base'] = 0;
#endif
#endif

  var exports = createWasm(env);
#if ASSERTIONS
  assert(exports, 'binaryen setup failed (no wasm support?)');
#endif
  return exports;
};
#endif

// Globals used by JS i64 conversions
var tempDouble;
var tempI64;

// === Body ===