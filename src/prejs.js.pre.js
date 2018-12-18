var _coldbrew_global = (typeof window === 'object') ? window : global;
var setTimeout = function() {
  var args = arguments;
  if (args[1] < 0) {
    if (MODULE_NAME._resume_ie) {
      // Immediately execute
      MODULE_NAME._resume_ie = false;
      MODULE_NAME.resume = MODULE_NAME._resumeWarn;
      args[0]();
    } else {
      // Save resume execution for later
      MODULE_NAME.resume = function() {
        MODULE_NAME._resume_ie = false;
        MODULE_NAME.resume = MODULE_NAME._resumeWarn;
        args[0]();
      };
    }
    return -1;
  }
  return _coldbrew_global.setTimeout.apply(_coldbrew_global, args);
};

Module.noInitialRun = true;

Module.print = function(text) {
  var global = (typeof window === 'object') ? window : global;

  if (MODULE_NAME.forwardOut) {
    MODULE_NAME.onStandardOut(text);
  }
};

Module.printErr = function(text) {
  var global = (typeof window === 'object') ? window : global;

  if (MODULE_NAME.forwardErr) {
    MODULE_NAME.onStandardErr(text);
  }
};

Module.preInit = [function() {
  MODULE_NAME.preInit(Module);

  Module.FS.init(function() {
    return 'z'.charCodeAt(0);
  });
}];

Module.preRun.push(function() {
  var global = (typeof window === 'object') ? window : global;

  MODULE_NAME.preRun(Module);
  MODULE_NAME._mountFS(Module);
});

Module.onRuntimeInitialized = function() {
  var global = (typeof window === 'object') ? window : global;

  MODULE_NAME._onRuntimeInitialized(Module);
};