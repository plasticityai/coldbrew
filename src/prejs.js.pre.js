if (typeof window !== 'undefined') {
  var _coldbrew_oldSetTimeout = window.setTimeout;
} else if (typeof global !== 'undefined') {
  var _coldbrew_oldSetTimeout = global.setTimeout;
} else if (typeof self !== 'undefined') {
  var _coldbrew_oldSetTimeout = self.setTimeout;
} else {
  var _coldbrew_oldSetTimeout = setTimeout;
}

var getModule = function() {
  var M;
  if (typeof window === 'undefined' && typeof self === 'undefined') { 
    M = module.exports;
  } else {
    M = MODULE_NAME;
  }
  return M;
}

var setTimeout = function() {
  var M = getModule();
  var args = arguments;
  if (args[1] < 0) {
    if (M._resume_ie) {
      // Immediately execute
      M._resume_ie = false;
      M.resume = M._resumeWarn;
      args[0]();
    } else {
      // Save resume execution for later
      M.resume = function() {
        M._resume_ie = false;
        M.resume = M._resumeWarn;
        args[0]();
      };
    }
    return -1;
  }
  return _coldbrew_oldSetTimeout.apply(null, args);
};

Module.noInitialRun = true;

Module.print = function(text) {
  var M = getModule();

  if (M.forwardOut) {
    M.onStandardOut(text);
  }
};

Module.printErr = function(text) {
  var M = getModule();

  if (M.forwardErr) {
    M.onStandardErr(text);
  }
};

Module.preInit = [function() {
  var M = getModule();
  M.preInit(Module);

  if (M._emterpreterFileResponse && typeof M._emterpreterFileResponse.responseText !== 'undefined') {
    Module.emterpreterFile = M._emterpreterFileResponse.responseText;
  } else if (M._emterpreterFileResponse) {
    Module.emterpreterFile = M._emterpreterFileResponse;
  }
}];

Module.preRun.push(function() {
  var M = getModule();

  M.preRun(Module);
  M._mountFS(Module);
});

Module.onRuntimeInitialized = function() {
  var M = getModule();

  M._onRuntimeInitialized(Module);
};
