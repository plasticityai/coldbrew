(function() {

function randid() {
  return 'rxxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function base64decode(string) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      // Regular expression to check formal correctness of base64 encoded strings
      b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
    // atob can work with strings with whitespaces, even inside the encoded part,
    // but only \t, \n, \f, \r and ' ', which can be stripped.
    string = String(string).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(string))
        throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");

    // Adding the padding if missing, for semplicity
    string += "==".slice(2 - (string.length & 3));
    var bitmap, result = "", r1, r2, i = 0;
    for (; i < string.length;) {
        bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12
                | (r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)));

        result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255)
                : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255)
                : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
}

var global = (typeof window === 'object') ? window : global;
global._coldbrew_internal_global = global;

global._MODULE_NAME_coldbrew_internal_instance = (function() {
  var executed = false;
  var singleton = null;
  return function() {
    if (!executed) {
      executed = true;
      singleton = _MODULE_NAME_coldbrew_internal_();
    }
    return singleton;
  };
})();

global._MODULE_NAME_coldbrew_internal_fs_configure = (function() {
  var executed = false;
  var singleton = {};
  var configured = false;
  var queuedCbs = [];
  return function(sharedHome, sharedTmp, persistHome, persistTmp, browserFSOptions, cb) {
    cb = cb || function() {};
    queuedCbs.push(cb);
    if (!executed) {
      executed = true;
      singleton['/.slots'] = 0;
      if (sharedHome || persistHome) {
        singleton['/home'] = 0;
      }
      if (sharedTmp || persistTmp) {
        singleton['/tmp'] = 0;
      }
      if (sharedHome) {
        singleton['/home'] |= 1;
      }
      if (sharedTmp) {
        singleton['/tmp'] |=  1;
      }
      if (persistHome) {
        singleton['/home'] |=  2;
      }
      if (persistTmp) {
        singleton['/tmp'] |= 2;
      }
      if (BROWSERFS) {
        // Handle BrowserFS here        
        Object.keys(finalizedOptions).forEach(function(mountPoint) {
          singleton[mountPoint] = 0;
        });
        configured = true;
        while (queuedCbs.length > 0) {
          queuedCbs.pop()(null, singleton);
        }
      } else {
        configured = true;
        while (queuedCbs.length > 0) {
          queuedCbs.pop()(null, singleton);
        }
      }
    } else {
      if (configured) {
        cb(null, singleton);
        queuedCbs = [];
      }
    }
  };
})();

var MODULE_NAME = {
  loaded: false,
  exited: false,
  forwardOut: true,
  forwardErr: true,
  _queuedOnReady: [],
  _resumeWarn: function(warn=true) { if (warn) { return MODULE_NAME.run('Coldbrew._warn("The Coldbrew Python interpreter is not currently sleeping. Resuming has no effect.")'); } else return 0; },
  resume: function(...args) { return MODULE_NAME._resumeWarn(...args); },
  _mountFS: function(Module) {},
  preInit: function(Module) {},
  preRun: function(Module) {},
  onStandardOut: function(text) { console.log(text); },
  onStandardErr: function(text) { console.warn(text); },
  _onRuntimeInitialized: function(Module) {
    Module.callMain();
    MODULE_NAME._ORIGINAL_ENV_ = Object.assign({}, Module.ENV);
    var oldLoaded = MODULE_NAME.loaded;
    MODULE_NAME.loaded = true;
    if (!oldLoaded) {
      MODULE_NAME._queuedOnReady.forEach(function(onReady) {
        onReady(null, MODULE_NAME);
      });
      MODULE_NAME._queuedOnReady = [];
    }
  },
  _fsReady: function(cb) {
    // If the user already called configure FS, these "false, false, {}" parameters
    // will get ignored, if the user hasn't, "false, false, {}" will be used, but will
    // have no effect.
    global._MODULE_NAME_coldbrew_internal_fs_configure(false, false, false, false, {}, function(err, mountPoints) {
      MODULE_NAME._mountFS = function(Module) {
        var prefix = '.filesystem';
        Module.FS.createFolder(Module.FS.root, prefix, true, true);
        Object.keys(mountPoints).forEach(function(mountPoint) {
          var fsNamespace = 'coldbrew_fs_';
          var isShared = mountPoints[mountPoint] & 1;
          var isPersist = mountPoints[mountPoint] & 2;
          var filesystem = Module.FS.filesystems.MEMFS;
          if (!isShared) {
            fsNamespace += 'MODULE_NAME_';
          }
          if (isPersist) {
            filesystem = Module.FS.filesystems.IDBFS;
          }
          try {
            Module.FS.rmdir(mountPoint+'/web_user');
          } catch {};
          try {
            Module.FS.rmdir(mountPoint);
          } catch {};
          Module.FS.createFolder(Module.FS.root, '/'+prefix+'/'+fsNamespace+mountPoint.trim().substring(1), true, true);
          var old = filesystem.mount;
          if (mountPoints[mountPoint]) {
            if (!global.ColdbrewMountPointNodes) {
              global.ColdbrewMountPointNodes = {};
            }
            if (isShared) {
              filesystem.mount = function(...args) { 
                var mountPoint = args[0].mountpoint;
                global.ColdbrewMountPointNodes[mountPoint] = global.ColdbrewMountPointNodes[mountPoint] || old(...args);
                return global.ColdbrewMountPointNodes[mountPoint]; 
              };
            }
            Module.FS.mount(filesystem, {}, '/'+prefix+'/'+fsNamespace+mountPoint.trim().substring(1));
          } else if (BROWSERFS) {
            // Handle BrowserFS here
          }
          Module.FS.symlink('/'+prefix+'/'+fsNamespace+mountPoint.trim().substring(1), mountPoint);
        });
      }
      cb(err, mountPoints);
    });
  },
  configureFS: function(options = {}, cb) {
    var defaultOptions = {
      sharedHome: false,
      sharedTmp: false,
      persistHome: false,
      persistTmp: false,
      browserFSOptions: {},
    };
    var finalizedOptions = Object.assign({}, defaultOptions, options);
    global._MODULE_NAME_coldbrew_internal_fs_configure(
      finalizedOptions.sharedHome,
      finalizedOptions.sharedTmp,
      finalizedOptions.persistHome,
      finalizedOptions.persistTmp,
      finalizedOptions.browserFSOptions,
      cb
    );
  },
  load: function(arg1, arg2) {
    var onReadyFunc = null;
    var options = {};
    if (!arg2 && typeof arg1 == 'function') {
      onReadyFunc = arg1;
    } else if (!arg2 && typeof arg1 == 'object') {
      options = arg1;
    } else {
      options = arg1;
      onReadyFunc = arg2;
    }
    var defaultOptions = {
      preRun: function(Module) {},
      configureFS: null,
    };
    var finalizedOptions = Object.assign({}, defaultOptions, options);
    if (finalizedOptions.fsOptions) {
      MODULE_NAME.configureFS(finalizedOptions.fsOptions);
    }
    MODULE_NAME._fsReady(function(err, mountPoints) {
      MODULE_NAME._slots = {};
      MODULE_NAME.mountPoints = mountPoints;
      MODULE_NAME.Module = global._MODULE_NAME_coldbrew_internal_instance();
      MODULE_NAME.pyversion =  "PYVERSION";
      MODULE_NAME.version =  "COLDBREW_VERSION";
      MODULE_NAME.run = MODULE_NAME.Module.cwrap('export_run', 'number', ['string']);
      MODULE_NAME.runAsync = MODULE_NAME.Module.cwrap('export_runAsync', 'number', ['string'], {
        async: true,
      });
      MODULE_NAME._runFile = MODULE_NAME.Module.cwrap('export__runFile', 'number', ['string']);
      MODULE_NAME._runFileAsync = MODULE_NAME.Module.cwrap('export__runFileAsync', 'number', ['string'], {
        async: true,
      });
      MODULE_NAME.getVariable = function(expression) {
        var uid = randid();
        MODULE_NAME.run('Coldbrew.run("_coldbrew_internal_global.MODULE_NAME._slots.'+uid+' = "+Coldbrew.json.dumps(Coldbrew.json.dumps('+expression+')))');
        var rval = (typeof MODULE_NAME._slots[uid] !== 'undefined') ? JSON.parse(MODULE_NAME._slots[uid]) : null;
        delete MODULE_NAME._slots[uid];
        return rval;
      };
      MODULE_NAME.getVariableAsync = function(expression) {
        var uid = randid();
        return MODULE_NAME.runAsync('Coldbrew.run("_coldbrew_internal_global.MODULE_NAME._slots.'+uid+' = "+Coldbrew.json.dumps(Coldbrew.json.dumps('+expression+')))').then(function() {
          var rval = (typeof MODULE_NAME._slots[uid] !== 'undefined') ? JSON.parse(MODULE_NAME._slots[uid]) : null;
          delete MODULE_NAME._slots[uid];
          return rval;
        });
      };
      MODULE_NAME.getExceptionInfo = function() {
        return MODULE_NAME.getVariable('Coldbrew._exception');
      };
      MODULE_NAME.runFunction = function(functionExpression, ...args) {
        return MODULE_NAME.getVariable(functionExpression+'('+args.map(arg => JSON.stringify(arg)).join(',')+')');
      };
      MODULE_NAME.runFunctionAsync = function(functionExpression, ...args) {
        return MODULE_NAME.getVariableAsync(functionExpression+'('+args.map(arg => JSON.stringify(arg)).join(',')+')');
      };
      MODULE_NAME.getenv = function() { return MODULE_NAME.Module.ENV };
      MODULE_NAME.setenv = MODULE_NAME.Module.cwrap('export_setenv', 'number', ['string', 'string']);
      MODULE_NAME.unsetenv = MODULE_NAME.Module.cwrap('export_unsetenv', 'number', ['string']);
      MODULE_NAME.chdir = MODULE_NAME.Module.cwrap('export_chdir', 'number', ['string']);
      MODULE_NAME.runFile = function(path, options={}) {
        var defaultOptions = {
          cwd: null,
          args: [],
          env: {},
        };
        var finalizedOptions = Object.assign({}, defaultOptions, options);
        if (finalizedOptions.cwd) {
          MODULE_NAME.chdir(finalizedOptions.cwd);
        }
        MODULE_NAME.run('Coldbrew._clear_argv()');
        MODULE_NAME.runFunction('Coldbrew._append_argv', path);
        finalizedOptions.args.forEach(function(arg) {
          MODULE_NAME.runFunction('Coldbrew._append_argv', arg);
        });
        Object.keys(finalizedOptions.env).forEach(function(key) {
          MODULE_NAME.setenv(key, finalizedOptions.env[key]);
        });
        return MODULE_NAME._runFile(path);
      };
      MODULE_NAME.runFileAsync = function(path, options={}) {
        var defaultOptions = {
          cwd: null,
          args: [],
          env: {},
        };
        var finalizedOptions = Object.assign({}, defaultOptions, options);
        if (finalizedOptions.cwd) {
          MODULE_NAME.chdir(finalizedOptions.cwd);
        }
        MODULE_NAME.run('Coldbrew._clear_argv()');
        MODULE_NAME.runFunction('Coldbrew._append_argv', path);
        finalizedOptions.args.forEach(function(arg) {
          MODULE_NAME.runFunction('Coldbrew._append_argv', arg);
        });
        Object.keys(finalizedOptions.env).forEach(function(key) {
          MODULE_NAME.setenv(key, finalizedOptions.env[key]);
        });
        return MODULE_NAME._runFileAsync(path);
      };
      MODULE_NAME.resetenv = function() {
        Object.keys(MODULE_NAME.getenv()).forEach(function(key) {
          if (typeof MODULE_NAME._ORIGINAL_ENV_[key] !== 'undefined') {
            MODULE_NAME.setenv(key, MODULE_NAME._ORIGINAL_ENV_[key]);
          } else {
            MODULE_NAME.unsetenv(key);
          }
        });
      };
      MODULE_NAME.reset = MODULE_NAME.Module.cwrap('export_reset', null, []);
      if (finalizedOptions.hideWarnings) {
        MODULE_NAME.setenv("COLDBREW_WARNINGS", Number(!finalizedOptions.hideWarnings).toString());
      }
      MODULE_NAME.onReady(function() {
        MODULE_NAME.runFunction('Coldbrew._append_argv', '<coldbrew>');
      });
      MODULE_NAME.onReady(onReadyFunc);
    });
  },
  onReady: function(onReadyFunc) {
    if (onReadyFunc) {
      if (MODULE_NAME.loaded) {
        onReadyFunc(null, MODULE_NAME);
      } else {
        MODULE_NAME._queuedOnReady.push(onReadyFunc);
      }
    }
  },
};

if (typeof module !== 'undefined') module.exports = MODULE_NAME;
if (typeof define === 'function') define(MODULE_NAME);
if (typeof window === 'object') window.MODULE_NAME = MODULE_NAME;
global.MODULE_NAME = MODULE_NAME;

})();