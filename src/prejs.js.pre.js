if (typeof window !== 'undefined') {
  var _coldbrew_oldSetTimeout = window.setTimeout;
} else if (typeof global !== 'undefined') {
  var _coldbrew_oldSetTimeout = global.setTimeout;
} else if (typeof self !== 'undefined') {
  var _coldbrew_oldSetTimeout = self.setTimeout;
} else {
  var _coldbrew_oldSetTimeout = setTimeout;
}

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
  return _coldbrew_oldSetTimeout.apply(null, args);
};

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
  MODULE_NAME.preInit(Module);

  if (MODULE_NAME._emterpreterFileResponse && typeof MODULE_NAME._emterpreterFileResponse.responseText !== 'undefined') {
    Module.emterpreterFile = MODULE_NAME._emterpreterFileResponse.responseText;
  } else if (MODULE_NAME._emterpreterFileResponse) {
    Module.emterpreterFile = MODULE_NAME._emterpreterFileResponse;
  }
}];

Module.preRun.push(function() {
  MODULE_NAME.preRun(Module);
  MODULE_NAME._mountFS(Module);
});

Module.onRuntimeInitialized = function() {
  MODULE_NAME._onRuntimeInitialized(Module);
};
