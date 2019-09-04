// Internally patch  Browser.safeSetTimeout to indefinitely
// pause when encountering a negative timeout. The resume
// function is stored into a reference so it can be manually
// called later.
setTimeout(function() {
  // Patch Browser.setSafeTimeout to support -1
  var _coldbrew_oldSetTimeout = Browser.safeSetTimeout;

  var _coldbrew_resumeReportError = function(e) {
    // There is a function pointer on the stack.

    // Emscripten's Asyncify cannot unwind the stack with function pointers on the
    // stack since we didn't mark them in ASYNC_FUNCS in src/Makefile.
    // To fix this as a one off if this error is seen, add the function that was
    // a function pointer on the stack to ASYNC_FUNCS.
    // If this error keeps coming up over and over again, you can add all
    // of the functions in CPython to ASYNC_FUNCS. This should prevent this error from
    // coming up again. Unfortunately, this will increase the .wasm size significantly.
    console.error("FATAL – Coldbrew tried to true sleep using Asyncify, with a function pointer on the stack before unwinding. Please report an issue at https://git.io/fjANP and share the *full stack trace with DEBUG mode on* of this error.");
  };

  Browser.safeSetTimeout = function() {
    var args = arguments;
    if (args[1] < 0) {
      if (MODULE_NAME._resume_ie) {
        // Immediately execute
        MODULE_NAME._resume_ie = false;
        MODULE_NAME.resume = MODULE_NAME._resumeWarn;
        try {
          args[0]();
        } catch (e) {
          _coldbrew_resumeReportError(e);
        }
      } else {
        // Save resume execution for later
        MODULE_NAME.resume = function() {
          MODULE_NAME._resume_ie = false;
          MODULE_NAME.resume = MODULE_NAME._resumeWarn;
          try {
            args[0]();
          } catch (e) {
            _coldbrew_resumeReportError(e);
          }
        };
      }
      return -1;
    }
    return _coldbrew_oldSetTimeout.apply(null, args);
  };

  // Patch PThread.allocateUnusedWorkers to support changing pool size
  if (ENABLE_THREADING) {
    var _coldbrew_oldAllocateUnusedWorkers = PThread.allocateUnusedWorkers;
    PThread.allocateUnusedWorkers = function() {
      var args = arguments;
      if (args[0] === 4) {
        args[0] = COLDBREW_TOP_SCOPE.PTHREAD_POOL_SIZE;
      }
      return _coldbrew_oldAllocateUnusedWorkers.apply(null, args);
    };
  }
}, 0);

// Use custom implementation of Worker
var Worker = COLDBREW_TOP_SCOPE.Worker;

// Setup various Model properties
Module.noInitialRun = true;

Module.print = function(text) {
  if (MODULE_NAME.forwardOut) {
    MODULE_NAME.onStandardOut(text);
  }
};

Module.printErr = function(text) {
  if (MODULE_NAME.forwardErr) {
    MODULE_NAME.onStandardErr(text);
  }
};

Module.preInit = [function() {
  // This URL gets loaded by pthread web workers
  if (ENABLE_THREADING) {
    Module.mainScriptUrlOrBlob = SCRIPT_SOURCE; 
  }

  MODULE_NAME.preInit(Module);
}];

Module.preRun.push(function() {
  MODULE_NAME.preRun(Module);
  MODULE_NAME._mountFS(Module);
});

Module.onRuntimeInitialized = function() {
  MODULE_NAME._onRuntimeInitialized(Module);
};