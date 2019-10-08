(function () {
const SCRIPT_SOURCE = (typeof BLOB_SCRIPT_SOURCE !== 'undefined' && BLOB_SCRIPT_SOURCE) || (typeof document !== 'undefined' && document.currentScript.src) || (typeof self !== 'undefined' && self.location && self.location.href) || (this.thread && this.thread.__filename) || __filename;
(function COLDBREW_TOP_SCOPE_FUNC(shouldExportColdbrew = true, coldbrewObjectReference={}) {
const COLDBREW_TOP_SCOPE = {};
const Coldbrew = coldbrewObjectReference;
const IS_NODE_JS = typeof process !== 'undefined'
const IS_WORKER_SCRIPT = (typeof window === 'undefined' && typeof self !== 'undefined' && typeof self.Module === 'undefined' && !IS_NODE_JS) || ((typeof process !== 'undefined') && process.env._COLDBREW_WORKER_FORK_);
const IS_THREAD_SCRIPT = (typeof window === 'undefined' && typeof self !== 'undefined' && typeof self.Module !== 'undefined' && self.Module.ENVIRONMENT_IS_PTHREAD);
if (typeof window !== 'undefined') var COLDBREW_GLOBAL_SCOPE = window;
if (typeof self !== 'undefined' && !IS_NODE_JS) var COLDBREW_GLOBAL_SCOPE = self;
if (typeof global !== 'undefined') var COLDBREW_GLOBAL_SCOPE = global;
// Internally patch Worker so that it works by using
// a forked process in Node.js (since Node.js workers
// are still experimental).
//
// Moreover, this Worker class keeps track of all references
// to created workers so that they can be batch terminated
// when Coldbrew is unloaded. With the built-in Worker class,
// if you lose a reference to the worker object, there is no
// way to terminate that running worker AFAIK.
var _coldbrew_oldWorker = COLDBREW_GLOBAL_SCOPE.Worker;
var _coldbrew_allWorkers = [];
var Worker = new Proxy(function(){}, {
  construct: function (target, args) {
    var worker = null;
    var underlyingWorker = null;
    if (typeof _coldbrew_oldWorker === 'undefined' && IS_NODE_JS) {
      const fork = require('child_process').fork;
      require('node-comlink').patchMessageChannel();
      const NodeMessageAdapter = require('node-comlink').NodeMessageAdapter;
      underlyingWorker = fork(args[0], { env : { _COLDBREW_WORKER_FORK_ : 1 } });
      worker = new NodeMessageAdapter(underlyingWorker);
    } else {
      worker = new (_coldbrew_oldWorker.bind.apply(_coldbrew_oldWorker, [_coldbrew_oldWorker].concat(args)));
      underlyingWorker = worker;
    }
    _coldbrew_allWorkers.push(worker);
    worker.underlyingWorker = underlyingWorker;
    return worker;
  },
  get: function(target, prop) {
    if (prop === 'terminateAllWorkers') {
      return function(defer = false) {
        function _terminateWorkers(workers) {
          workers.forEach(function(worker) {
            if (worker.underlyingWorker && worker.underlyingWorker.kill) {
              worker.underlyingWorker.kill();
            }
            if (worker.terminate) {
              worker.terminate();
            }
          });
        }
        if (defer) {
          var _terminateWorkersBinded = _terminateWorkers.bind(null, [..._coldbrew_allWorkers]);
          setTimeout(function() {
            _terminateWorkersBinded();
          }, 1);
        } else {
          _terminateWorkers(_coldbrew_allWorkers);
        }
        _coldbrew_allWorkers = [];
      };
    }
    return Reflect.get(_coldbrew_oldWorker, prop);
  },
  set: function(target, prop, value) {
    Reflect.set(_coldbrew_oldWorker, prop, value);
  },
  ownKeys: function(target) {
    return Reflect.ownKeys(_coldbrew_oldWorker);
  },
  has: function(target, prop) {
    return Reflect.has(_coldbrew_oldWorker, prop);
  },
  deleteProperty: function(target, prop) {
    Reflect.deleteProperty(_coldbrew_oldWorker, prop);
  }
});
COLDBREW_TOP_SCOPE.Worker = Worker;

var _Coldbrew_coldbrew_internal_ = (function() {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  return (
function(_Coldbrew_coldbrew_internal_) {
  _Coldbrew_coldbrew_internal_ = _Coldbrew_coldbrew_internal_ || {};

function GROWABLE_HEAP_STORE_I8(ptr, value) {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 HEAP8[ptr] = value;
}

function GROWABLE_HEAP_STORE_I16(ptr, value) {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 HEAP16[ptr >> 1] = value;
}

function GROWABLE_HEAP_STORE_I32(ptr, value) {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 HEAP32[ptr >> 2] = value;
}

function GROWABLE_HEAP_STORE_F32(ptr, value) {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 HEAPF32[ptr >> 2] = value;
}

function GROWABLE_HEAP_STORE_F64(ptr, value) {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 HEAPF64[ptr >> 3] = value;
}

function GROWABLE_HEAP_LOAD_I8(ptr) {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 return HEAP8[ptr];
}

function GROWABLE_HEAP_LOAD_U8(ptr) {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 return HEAPU8[ptr];
}

function GROWABLE_HEAP_LOAD_I32(ptr) {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 return HEAP32[ptr >> 2];
}

function GROWABLE_HEAP_LOAD_U32(ptr) {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 return HEAPU32[ptr >> 2];
}

function GROWABLE_HEAP_LOAD_F64(ptr) {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 return HEAPF64[ptr >> 3];
}

var Module = typeof _Coldbrew_coldbrew_internal_ !== "undefined" ? _Coldbrew_coldbrew_internal_ : {};

if (!Module.expectedDataFileDownloads) {
 Module.expectedDataFileDownloads = 0;
 Module.finishedDataFileDownloads = 0;
}

Module.expectedDataFileDownloads++;

(function() {
 var loadPackage = function(metadata) {
  var PACKAGE_PATH;
  if (typeof window === "object") {
   PACKAGE_PATH = window["encodeURIComponent"](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf("/")) + "/");
  } else if (typeof location !== "undefined") {
   PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf("/")) + "/");
  } else {
   throw "using preloaded data can only be done on a web page or in a web worker";
  }
  var PACKAGE_NAME = ""+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "origin")+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "pathname").split("/").slice(0, -1).join("/")+"/coldbrew.data"+"";
  var REMOTE_PACKAGE_BASE = ""+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "origin")+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "pathname").split("/").slice(0, -1).join("/")+"/coldbrew.data"+"";
  if (typeof Module["locateFilePackage"] === "function" && !Module["locateFile"]) {
   Module["locateFile"] = Module["locateFilePackage"];
   err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)");
  }
  var REMOTE_PACKAGE_NAME = Module["locateFile"] ? Module["locateFile"](REMOTE_PACKAGE_BASE, "") : REMOTE_PACKAGE_BASE;
  var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
  var PACKAGE_UUID = metadata.package_uuid;
  function fetchRemotePackage(packageName, packageSize, callback, errback) {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", packageName, true);
   xhr.responseType = "arraybuffer";
   xhr.onprogress = function(event) {
    var url = packageName;
    var size = packageSize;
    if (event.total) size = event.total;
    if (event.loaded) {
     if (!xhr.addedTotal) {
      xhr.addedTotal = true;
      if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
      Module.dataFileDownloads[url] = {
       loaded: event.loaded,
       total: size
      };
     } else {
      Module.dataFileDownloads[url].loaded = event.loaded;
     }
     var total = 0;
     var loaded = 0;
     var num = 0;
     for (var download in Module.dataFileDownloads) {
      var data = Module.dataFileDownloads[download];
      total += data.total;
      loaded += data.loaded;
      num++;
     }
     total = Math.ceil(total * Module.expectedDataFileDownloads / num);
     if (Module["setStatus"]) Module["setStatus"]("Downloading data... (" + loaded + "/" + total + ")");
    } else if (!Module.dataFileDownloads) {
     if (Module["setStatus"]) Module["setStatus"]("Downloading data...");
    }
   };
   xhr.onerror = function(event) {
    throw new Error("NetworkError for: " + packageName);
   };
   xhr.onload = function(event) {
    if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || xhr.status == 0 && xhr.response) {
     var packageData = xhr.response;
     Promise.resolve(packageData).then(JSZip.loadAsync).then(function(zip) { return zip.files[Object.keys(zip.files)].async("arraybuffer") }).then(callback);
    } else {
     throw new Error(xhr.statusText + " : " + xhr.responseURL);
    }
   };
   xhr.send(null);
  }
  function handleError(error) {
   console.error("package error:", error);
  }
  var fetchedCallback = null;
  var fetched = Module["getPreloadedPackage"] ? Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;
  if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
   if (fetchedCallback) {
    fetchedCallback(data);
    fetchedCallback = null;
   } else {
    fetched = data;
   }
  }, handleError);
  function runWithFS() {
   function assert(check, msg) {
    if (!check) throw msg + new Error().stack;
   }
   Module["FS_createPath"]("/", "usr", true, true);
   Module["FS_createPath"]("/usr", "local", true, true);
   Module["FS_createPath"]("/usr/local", "lib", true, true);
   Module["FS_createPath"]("/usr/local/lib", "python3.8", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "xml", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8/xml", "dom", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8/xml", "etree", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8/xml", "parsers", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8/xml", "sax", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "site-packages", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "lib2to3", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8/lib2to3", "pgen2", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8/lib2to3", "fixes", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "xmlrpc", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "html", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "asyncio", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "unittest", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "multiprocessing", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8/multiprocessing", "dummy", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "venv", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8/venv", "scripts", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8/venv/scripts", "posix", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8/venv/scripts", "common", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "turtledemo", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "dbm", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "wsgiref", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "curses", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "encodings", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "http", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "collections", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "json", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "sqlite3", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8/sqlite3", "test", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "urllib", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "importlib", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "ctypes", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8/ctypes", "macholib", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8/ctypes", "test", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "logging", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "email", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8/email", "mime", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8", "concurrent", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.8/concurrent", "futures", true, true);
   Module["FS_createPath"]("/", "coldbrew", true, true);
   Module["FS_createPath"]("/coldbrew", "examples", true, true);
   function DataRequest(start, end, audio) {
    this.start = start;
    this.end = end;
    this.audio = audio;
   }
   DataRequest.prototype = {
    requests: {},
    open: function(mode, name) {
     this.name = name;
     this.requests[name] = this;
     Module["addRunDependency"]("fp " + this.name);
    },
    send: function() {},
    onload: function() {
     var byteArray = this.byteArray.subarray(this.start, this.end);
     this.finish(byteArray);
    },
    finish: function(byteArray) {
     var that = this;
     Module["FS_createDataFile"](this.name, null, byteArray, true, true, true);
     Module["removeRunDependency"]("fp " + that.name);
     this.requests[this.name] = null;
    }
   };
   var files = metadata.files;
   for (var i = 0; i < files.length; ++i) {
    new DataRequest(files[i].start, files[i].end, files[i].audio).open("GET", files[i].filename);
   }
   function processPackageData(arrayBuffer) {
    Module.finishedDataFileDownloads++;
    assert(arrayBuffer, "Loading data file failed.");
    assert(arrayBuffer instanceof ArrayBuffer, "bad input to processPackageData");
    var byteArray = new Uint8Array(arrayBuffer);
    DataRequest.prototype.byteArray = byteArray;
    var files = metadata.files;
    for (var i = 0; i < files.length; ++i) {
     DataRequest.prototype.requests[files[i].filename].onload();
    }
    Module["removeRunDependency"]("datafile_"+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "origin")+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "pathname").split("/").slice(0, -1).join("/")+"/coldbrew.data"+"");
   }
   Module["addRunDependency"]("datafile_"+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "origin")+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "pathname").split("/").slice(0, -1).join("/")+"/coldbrew.data"+"");
   if (!Module.preloadResults) Module.preloadResults = {};
   Module.preloadResults[PACKAGE_NAME] = {
    fromCache: false
   };
   if (fetched) {
    processPackageData(fetched);
    fetched = null;
   } else {
    fetchedCallback = processPackageData;
   }
  }
  if (Module["calledRun"]) {
   runWithFS();
  } else {
   if (!Module["preRun"]) Module["preRun"] = [];
   Module["preRun"].push(runWithFS);
  }
 };
 loadPackage({
  "files": [ {
   "filename": "/usr/local/lib/python3.8/functools.py",
   "start": 0,
   "end": 37360,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/plistlib.py",
   "start": 37360,
   "end": 68611,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/socketserver.py",
   "start": 68611,
   "end": 95533,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/_threading_local.py",
   "start": 95533,
   "end": 102753,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/linecache.py",
   "start": 102753,
   "end": 108065,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/codeop.py",
   "start": 108065,
   "end": 114059,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/webbrowser.py",
   "start": 114059,
   "end": 137473,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/doctest.py",
   "start": 137473,
   "end": 241740,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/dummy_threading.py",
   "start": 241740,
   "end": 244555,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/uuid.py",
   "start": 244555,
   "end": 274950,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/weakref.py",
   "start": 274950,
   "end": 296333,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/sre_constants.py",
   "start": 296333,
   "end": 303487,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/pyclbr.py",
   "start": 303487,
   "end": 318742,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/pipes.py",
   "start": 318742,
   "end": 327658,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/_pydecimal.py",
   "start": 327658,
   "end": 556169,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/imaplib.py",
   "start": 556169,
   "end": 609775,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/operator.py",
   "start": 609775,
   "end": 620486,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/_sitebuiltins.py",
   "start": 620486,
   "end": 623601,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/numbers.py",
   "start": 623601,
   "end": 633845,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/_pyio.py",
   "start": 633845,
   "end": 726882,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/re.py",
   "start": 726882,
   "end": 742629,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/codecs.py",
   "start": 742629,
   "end": 779219,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/bz2.py",
   "start": 779219,
   "end": 791777,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/warnings.py",
   "start": 791777,
   "end": 811627,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/stat.py",
   "start": 811627,
   "end": 816759,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/_py_abc.py",
   "start": 816759,
   "end": 822948,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ssl.py",
   "start": 822948,
   "end": 873708,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/tarfile.py",
   "start": 873708,
   "end": 967324,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/selectors.py",
   "start": 967324,
   "end": 985885,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/_osx_support.py",
   "start": 985885,
   "end": 1005023,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/pydoc.py",
   "start": 1005023,
   "end": 1112424,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/colorsys.py",
   "start": 1112424,
   "end": 1116488,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/_dummy_thread.py",
   "start": 1116488,
   "end": 1122515,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/csv.py",
   "start": 1122515,
   "end": 1138659,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/_markupbase.py",
   "start": 1138659,
   "end": 1153257,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/site.py",
   "start": 1153257,
   "end": 1174595,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/argparse.py",
   "start": 1174595,
   "end": 1270242,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/datetime.py",
   "start": 1270242,
   "end": 1358316,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/aifc.py",
   "start": 1358316,
   "end": 1391130,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/sched.py",
   "start": 1391130,
   "end": 1397572,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/io.py",
   "start": 1397572,
   "end": 1401113,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/tabnanny.py",
   "start": 1401113,
   "end": 1412521,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/poplib.py",
   "start": 1412521,
   "end": 1427598,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/zipimport.py",
   "start": 1427598,
   "end": 1458362,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ast.py",
   "start": 1458362,
   "end": 1476836,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/struct.py",
   "start": 1476836,
   "end": 1477093,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xdrlib.py",
   "start": 1477093,
   "end": 1483006,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/rlcompleter.py",
   "start": 1483006,
   "end": 1490103,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/copy.py",
   "start": 1490103,
   "end": 1498723,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/_bootlocale.py",
   "start": 1498723,
   "end": 1500524,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/_collections_abc.py",
   "start": 1500524,
   "end": 1526624,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/contextvars.py",
   "start": 1526624,
   "end": 1526753,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/enum.py",
   "start": 1526753,
   "end": 1561370,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/token.py",
   "start": 1561370,
   "end": 1563738,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/imghdr.py",
   "start": 1563738,
   "end": 1567533,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/base64.py",
   "start": 1567533,
   "end": 1587913,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/pprint.py",
   "start": 1587913,
   "end": 1609397,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/configparser.py",
   "start": 1609397,
   "end": 1663771,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/smtplib.py",
   "start": 1663771,
   "end": 1708074,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/string.py",
   "start": 1708074,
   "end": 1718609,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/nntplib.py",
   "start": 1718609,
   "end": 1761871,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/sndhdr.py",
   "start": 1761871,
   "end": 1768957,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/keyword.py",
   "start": 1768957,
   "end": 1769902,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/getopt.py",
   "start": 1769902,
   "end": 1777391,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/signal.py",
   "start": 1777391,
   "end": 1779664,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/genericpath.py",
   "start": 1779664,
   "end": 1784618,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/tty.py",
   "start": 1784618,
   "end": 1785497,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/mimetypes.py",
   "start": 1785497,
   "end": 1807021,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/symbol.py",
   "start": 1807021,
   "end": 1809130,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/antigravity.py",
   "start": 1809130,
   "end": 1809607,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/typing.py",
   "start": 1809607,
   "end": 1875809,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/optparse.py",
   "start": 1875809,
   "end": 1936178,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/threading.py",
   "start": 1936178,
   "end": 1986763,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/shelve.py",
   "start": 1986763,
   "end": 1995290,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/mailbox.py",
   "start": 1995290,
   "end": 2073951,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/sysconfig.py",
   "start": 2073951,
   "end": 2098413,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/code.py",
   "start": 2098413,
   "end": 2109032,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/cgitb.py",
   "start": 2109032,
   "end": 2121128,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/gettext.py",
   "start": 2121128,
   "end": 2148266,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/netrc.py",
   "start": 2148266,
   "end": 2153832,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/pathlib.py",
   "start": 2153832,
   "end": 2204737,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/locale.py",
   "start": 2204737,
   "end": 2282928,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/binhex.py",
   "start": 2282928,
   "end": 2296882,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/inspect.py",
   "start": 2296882,
   "end": 2414875,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/pkgutil.py",
   "start": 2414875,
   "end": 2436336,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/statistics.py",
   "start": 2436336,
   "end": 2475407,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/hmac.py",
   "start": 2475407,
   "end": 2481531,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/formatter.py",
   "start": 2481531,
   "end": 2496674,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/LICENSE.txt",
   "start": 2496674,
   "end": 2509443,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/abc.py",
   "start": 2509443,
   "end": 2513932,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/sunau.py",
   "start": 2513932,
   "end": 2532307,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/shlex.py",
   "start": 2532307,
   "end": 2545488,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/opcode.py",
   "start": 2545488,
   "end": 2551296,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/_compat_pickle.py",
   "start": 2551296,
   "end": 2560045,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/__phello__.foo.py",
   "start": 2560045,
   "end": 2560109,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/cProfile.py",
   "start": 2560109,
   "end": 2566709,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/filecmp.py",
   "start": 2566709,
   "end": 2576539,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/wave.py",
   "start": 2576539,
   "end": 2594768,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/mailcap.py",
   "start": 2594768,
   "end": 2602872,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/fnmatch.py",
   "start": 2602872,
   "end": 2606928,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/pstats.py",
   "start": 2606928,
   "end": 2634245,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/runpy.py",
   "start": 2634245,
   "end": 2646204,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/queue.py",
   "start": 2646204,
   "end": 2657560,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/zipapp.py",
   "start": 2657560,
   "end": 2665095,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/tempfile.py",
   "start": 2665095,
   "end": 2692627,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/traceback.py",
   "start": 2692627,
   "end": 2716106,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/decimal.py",
   "start": 2716106,
   "end": 2716426,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/_sysconfigdata__linux_x86_64-linux-gnu.py",
   "start": 2716426,
   "end": 2738456,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/glob.py",
   "start": 2738456,
   "end": 2744153,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/pickle.py",
   "start": 2744153,
   "end": 2808545,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/pickletools.py",
   "start": 2808545,
   "end": 2902031,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/shutil.py",
   "start": 2902031,
   "end": 2952277,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/cgi.py",
   "start": 2952277,
   "end": 2985721,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/bdb.py",
   "start": 2985721,
   "end": 3017972,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtle.py",
   "start": 3017972,
   "end": 3161574,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/py_compile.py",
   "start": 3161574,
   "end": 3169824,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/stringprep.py",
   "start": 3169824,
   "end": 3182741,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/contextlib.py",
   "start": 3182741,
   "end": 3207736,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ipaddress.py",
   "start": 3207736,
   "end": 3278896,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/getpass.py",
   "start": 3278896,
   "end": 3284890,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/pty.py",
   "start": 3284890,
   "end": 3289653,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/fractions.py",
   "start": 3289653,
   "end": 3313869,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/symtable.py",
   "start": 3313869,
   "end": 3321437,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/zipfile.py",
   "start": 3321437,
   "end": 3407318,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ntpath.py",
   "start": 3407318,
   "end": 3432087,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/profile.py",
   "start": 3432087,
   "end": 3455223,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/_compression.py",
   "start": 3455223,
   "end": 3460563,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/smtpd.py",
   "start": 3460563,
   "end": 3495274,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/compileall.py",
   "start": 3495274,
   "end": 3508813,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/trace.py",
   "start": 3508813,
   "end": 3538716,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/chunk.py",
   "start": 3538716,
   "end": 3544151,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asynchat.py",
   "start": 3544151,
   "end": 3555479,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/pdb.py",
   "start": 3555479,
   "end": 3617968,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/nturl2path.py",
   "start": 3617968,
   "end": 3620552,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/__future__.py",
   "start": 3620552,
   "end": 3625653,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/tracemalloc.py",
   "start": 3625653,
   "end": 3642729,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/sre_compile.py",
   "start": 3642729,
   "end": 3669424,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/sre_parse.py",
   "start": 3669424,
   "end": 3709654,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/copyreg.py",
   "start": 3709654,
   "end": 3716789,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/this.py",
   "start": 3716789,
   "end": 3717792,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/reprlib.py",
   "start": 3717792,
   "end": 3723059,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/subprocess.py",
   "start": 3723059,
   "end": 3798623,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/gzip.py",
   "start": 3798623,
   "end": 3819846,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/types.py",
   "start": 3819846,
   "end": 3829559,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/imp.py",
   "start": 3829559,
   "end": 3840095,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/hashlib.py",
   "start": 3840095,
   "end": 3849629,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/quopri.py",
   "start": 3849629,
   "end": 3856883,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/socket.py",
   "start": 3856883,
   "end": 3887818,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/calendar.py",
   "start": 3887818,
   "end": 3912650,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/platform.py",
   "start": 3912650,
   "end": 3952956,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/fileinput.py",
   "start": 3952956,
   "end": 3967665,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/_strptime.py",
   "start": 3967665,
   "end": 3992933,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/_weakrefset.py",
   "start": 3992933,
   "end": 3998668,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/tokenize.py",
   "start": 3998668,
   "end": 4024509,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/dis.py",
   "start": 4024509,
   "end": 4044838,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/crypt.py",
   "start": 4044838,
   "end": 4048448,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/dataclasses.py",
   "start": 4048448,
   "end": 4097537,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/uu.py",
   "start": 4097537,
   "end": 4104353,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/bisect.py",
   "start": 4104353,
   "end": 4106567,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/cmd.py",
   "start": 4106567,
   "end": 4121427,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncore.py",
   "start": 4121427,
   "end": 4141521,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lzma.py",
   "start": 4141521,
   "end": 4154504,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/timeit.py",
   "start": 4154504,
   "end": 4167948,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/os.py",
   "start": 4167948,
   "end": 4206798,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/posixpath.py",
   "start": 4206798,
   "end": 4222425,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/telnetlib.py",
   "start": 4222425,
   "end": 4245679,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/secrets.py",
   "start": 4245679,
   "end": 4247717,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/random.py",
   "start": 4247717,
   "end": 4276519,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ftplib.py",
   "start": 4276519,
   "end": 4311287,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/heapq.py",
   "start": 4311287,
   "end": 4334164,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/textwrap.py",
   "start": 4334164,
   "end": 4353571,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/difflib.py",
   "start": 4353571,
   "end": 4437623,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/modulefinder.py",
   "start": 4437623,
   "end": 4462086,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/__init__.py",
   "start": 4462086,
   "end": 4462643,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/dom/pulldom.py",
   "start": 4462643,
   "end": 4474640,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/dom/expatbuilder.py",
   "start": 4474640,
   "end": 4510396,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/dom/domreg.py",
   "start": 4510396,
   "end": 4513847,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/dom/xmlbuilder.py",
   "start": 4513847,
   "end": 4526250,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/dom/__init__.py",
   "start": 4526250,
   "end": 4530269,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/dom/minicompat.py",
   "start": 4530269,
   "end": 4533636,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/dom/NodeFilter.py",
   "start": 4533636,
   "end": 4534572,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/dom/minidom.py",
   "start": 4534572,
   "end": 4601429,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/etree/ElementInclude.py",
   "start": 4601429,
   "end": 4606580,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/etree/ElementPath.py",
   "start": 4606580,
   "end": 4619698,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/etree/cElementTree.py",
   "start": 4619698,
   "end": 4619780,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/etree/__init__.py",
   "start": 4619780,
   "end": 4621384,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/etree/ElementTree.py",
   "start": 4621384,
   "end": 4694112,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/parsers/expat.py",
   "start": 4694112,
   "end": 4694360,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/parsers/__init__.py",
   "start": 4694360,
   "end": 4694527,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/sax/handler.py",
   "start": 4694527,
   "end": 4708449,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/sax/saxutils.py",
   "start": 4708449,
   "end": 4720704,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/sax/__init__.py",
   "start": 4720704,
   "end": 4724351,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/sax/_exceptions.py",
   "start": 4724351,
   "end": 4729136,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/sax/expatreader.py",
   "start": 4729136,
   "end": 4744840,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xml/sax/xmlreader.py",
   "start": 4744840,
   "end": 4757524,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/site-packages/_ssl.py",
   "start": 4757524,
   "end": 4759172,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/site-packages/README.txt",
   "start": 4759172,
   "end": 4759291,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/site-packages/_posixsubprocess.py",
   "start": 4759291,
   "end": 4759291,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/site-packages/ColdbrewHTTPShim.py",
   "start": 4759291,
   "end": 4763596,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/site-packages/_socket.py",
   "start": 4763596,
   "end": 4766286,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/site-packages/select.py",
   "start": 4766286,
   "end": 4766362,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/site-packages/Coldbrew.py",
   "start": 4766362,
   "end": 4795536,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/refactor.py",
   "start": 4795536,
   "end": 4822935,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/PatternGrammar.txt",
   "start": 4822935,
   "end": 4823728,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/pygram.py",
   "start": 4823728,
   "end": 4825033,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/Grammar3.8.0.beta.4.pickle",
   "start": 4825033,
   "end": 4839825,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/PatternGrammar3.8.0.beta.4.pickle",
   "start": 4839825,
   "end": 4841050,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixer_util.py",
   "start": 4841050,
   "end": 4856257,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/__main__.py",
   "start": 4856257,
   "end": 4856324,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/patcomp.py",
   "start": 4856324,
   "end": 4863378,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/__init__.py",
   "start": 4863378,
   "end": 4863385,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/pytree.py",
   "start": 4863385,
   "end": 4891345,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/Grammar.txt",
   "start": 4891345,
   "end": 4897907,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixer_base.py",
   "start": 4897907,
   "end": 4904597,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/main.py",
   "start": 4904597,
   "end": 4916250,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/btm_matcher.py",
   "start": 4916250,
   "end": 4922873,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/btm_utils.py",
   "start": 4922873,
   "end": 4932839,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/pgen2/grammar.py",
   "start": 4932839,
   "end": 4938358,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/pgen2/parse.py",
   "start": 4938358,
   "end": 4946513,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/pgen2/token.py",
   "start": 4946513,
   "end": 4947799,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/pgen2/literals.py",
   "start": 4947799,
   "end": 4949434,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/pgen2/conv.py",
   "start": 4949434,
   "end": 4959076,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/pgen2/__init__.py",
   "start": 4959076,
   "end": 4959219,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/pgen2/pgen.py",
   "start": 4959219,
   "end": 4973031,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/pgen2/tokenize.py",
   "start": 4973031,
   "end": 4994079,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/pgen2/driver.py",
   "start": 4994079,
   "end": 5000048,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_xrange.py",
   "start": 5000048,
   "end": 5002742,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_ws_comma.py",
   "start": 5002742,
   "end": 5003832,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_long.py",
   "start": 5003832,
   "end": 5004308,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_urllib.py",
   "start": 5004308,
   "end": 5012661,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_itertools_imports.py",
   "start": 5012661,
   "end": 5014747,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_throw.py",
   "start": 5014747,
   "end": 5016329,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_repr.py",
   "start": 5016329,
   "end": 5016942,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_types.py",
   "start": 5016942,
   "end": 5018716,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_print.py",
   "start": 5018716,
   "end": 5021560,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_ne.py",
   "start": 5021560,
   "end": 5022131,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_renames.py",
   "start": 5022131,
   "end": 5024352,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_raw_input.py",
   "start": 5024352,
   "end": 5024806,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_funcattrs.py",
   "start": 5024806,
   "end": 5025450,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_methodattrs.py",
   "start": 5025450,
   "end": 5026056,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_xreadlines.py",
   "start": 5026056,
   "end": 5026745,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_unicode.py",
   "start": 5026745,
   "end": 5028001,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_itertools.py",
   "start": 5028001,
   "end": 5029549,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_basestring.py",
   "start": 5029549,
   "end": 5029869,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_reduce.py",
   "start": 5029869,
   "end": 5030706,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_dict.py",
   "start": 5030706,
   "end": 5034466,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_idioms.py",
   "start": 5034466,
   "end": 5039342,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_apply.py",
   "start": 5039342,
   "end": 5041772,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_next.py",
   "start": 5041772,
   "end": 5044946,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_filter.py",
   "start": 5044946,
   "end": 5047597,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_paren.py",
   "start": 5047597,
   "end": 5048824,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_operator.py",
   "start": 5048824,
   "end": 5052250,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_standarderror.py",
   "start": 5052250,
   "end": 5052699,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/__init__.py",
   "start": 5052699,
   "end": 5052746,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_buffer.py",
   "start": 5052746,
   "end": 5053336,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_input.py",
   "start": 5053336,
   "end": 5054044,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_metaclass.py",
   "start": 5054044,
   "end": 5062240,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_exitfunc.py",
   "start": 5062240,
   "end": 5064735,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_exec.py",
   "start": 5064735,
   "end": 5065714,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_future.py",
   "start": 5065714,
   "end": 5066261,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_raise.py",
   "start": 5066261,
   "end": 5069187,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_imports.py",
   "start": 5069187,
   "end": 5074871,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_sys_exc.py",
   "start": 5074871,
   "end": 5075905,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_zip.py",
   "start": 5075905,
   "end": 5077194,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_intern.py",
   "start": 5077194,
   "end": 5078429,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_has_key.py",
   "start": 5078429,
   "end": 5081625,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_tuple_params.py",
   "start": 5081625,
   "end": 5087190,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_getcwdu.py",
   "start": 5087190,
   "end": 5087641,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_execfile.py",
   "start": 5087641,
   "end": 5089689,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_numliterals.py",
   "start": 5089689,
   "end": 5090457,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_imports2.py",
   "start": 5090457,
   "end": 5090746,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_reload.py",
   "start": 5090746,
   "end": 5091918,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_asserts.py",
   "start": 5091918,
   "end": 5092902,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_import.py",
   "start": 5092902,
   "end": 5096158,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_except.py",
   "start": 5096158,
   "end": 5099502,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_nonzero.py",
   "start": 5099502,
   "end": 5100093,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_isinstance.py",
   "start": 5100093,
   "end": 5101701,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_set_literal.py",
   "start": 5101701,
   "end": 5103398,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/lib2to3/fixes/fix_map.py",
   "start": 5103398,
   "end": 5107038,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xmlrpc/server.py",
   "start": 5107038,
   "end": 5143678,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xmlrpc/client.py",
   "start": 5143678,
   "end": 5192826,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/xmlrpc/__init__.py",
   "start": 5192826,
   "end": 5192864,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/html/__init__.py",
   "start": 5192864,
   "end": 5197620,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/html/parser.py",
   "start": 5197620,
   "end": 5215341,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/html/entities.py",
   "start": 5215341,
   "end": 5290656,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/windows_events.py",
   "start": 5290656,
   "end": 5323290,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/constants.py",
   "start": 5323290,
   "end": 5324178,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/futures.py",
   "start": 5324178,
   "end": 5337219,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/tasks.py",
   "start": 5337219,
   "end": 5369677,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/runners.py",
   "start": 5369677,
   "end": 5371670,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/format_helpers.py",
   "start": 5371670,
   "end": 5374074,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/coroutines.py",
   "start": 5374074,
   "end": 5382871,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/proactor_events.py",
   "start": 5382871,
   "end": 5413998,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/transports.py",
   "start": 5413998,
   "end": 5424276,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/windows_utils.py",
   "start": 5424276,
   "end": 5429336,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/protocols.py",
   "start": 5429336,
   "end": 5436472,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/events.py",
   "start": 5436472,
   "end": 5462607,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/trsock.py",
   "start": 5462607,
   "end": 5468483,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/base_futures.py",
   "start": 5468483,
   "end": 5470305,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/staggered.py",
   "start": 5470305,
   "end": 5476269,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/base_tasks.py",
   "start": 5476269,
   "end": 5478476,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/sslproto.py",
   "start": 5478476,
   "end": 5505686,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/__main__.py",
   "start": 5505686,
   "end": 5509029,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/__init__.py",
   "start": 5509029,
   "end": 5511763,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/streams.py",
   "start": 5511763,
   "end": 5575186,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/exceptions.py",
   "start": 5575186,
   "end": 5576746,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/base_subprocess.py",
   "start": 5576746,
   "end": 5585589,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/queues.py",
   "start": 5585589,
   "end": 5593592,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/unix_events.py",
   "start": 5593592,
   "end": 5642044,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/base_events.py",
   "start": 5642044,
   "end": 5714045,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/subprocess.py",
   "start": 5714045,
   "end": 5723042,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/locks.py",
   "start": 5723042,
   "end": 5739272,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/selector_events.py",
   "start": 5739272,
   "end": 5777967,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/asyncio/log.py",
   "start": 5777967,
   "end": 5778091,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/unittest/signals.py",
   "start": 5778091,
   "end": 5780494,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/unittest/async_case.py",
   "start": 5780494,
   "end": 5786197,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/unittest/result.py",
   "start": 5786197,
   "end": 5793639,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/unittest/util.py",
   "start": 5793639,
   "end": 5798854,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/unittest/case.py",
   "start": 5798854,
   "end": 5858278,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/unittest/runner.py",
   "start": 5858278,
   "end": 5866045,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/unittest/loader.py",
   "start": 5866045,
   "end": 5888747,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/unittest/__main__.py",
   "start": 5888747,
   "end": 5889219,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/unittest/__init__.py",
   "start": 5889219,
   "end": 5892486,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/unittest/suite.py",
   "start": 5892486,
   "end": 5905301,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/unittest/main.py",
   "start": 5905301,
   "end": 5916539,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/unittest/mock.py",
   "start": 5916539,
   "end": 6014294,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/popen_fork.py",
   "start": 6014294,
   "end": 6016862,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/resource_sharer.py",
   "start": 6016862,
   "end": 6022214,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/sharedctypes.py",
   "start": 6022214,
   "end": 6028520,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/popen_spawn_win32.py",
   "start": 6028520,
   "end": 6032531,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/synchronize.py",
   "start": 6032531,
   "end": 6044140,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/util.py",
   "start": 6044140,
   "end": 6056830,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/shared_memory.py",
   "start": 6056830,
   "end": 6074046,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/__init__.py",
   "start": 6074046,
   "end": 6074962,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/forkserver.py",
   "start": 6074962,
   "end": 6087342,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/resource_tracker.py",
   "start": 6087342,
   "end": 6095632,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/managers.py",
   "start": 6095632,
   "end": 6144364,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/process.py",
   "start": 6144364,
   "end": 6156263,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/spawn.py",
   "start": 6156263,
   "end": 6165559,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/reduction.py",
   "start": 6165559,
   "end": 6175071,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/context.py",
   "start": 6175071,
   "end": 6186278,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/queues.py",
   "start": 6186278,
   "end": 6197968,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/heap.py",
   "start": 6197968,
   "end": 6209594,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/pool.py",
   "start": 6209594,
   "end": 6241954,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/popen_spawn_posix.py",
   "start": 6241954,
   "end": 6243983,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/connection.py",
   "start": 6243983,
   "end": 6275486,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/popen_forkserver.py",
   "start": 6275486,
   "end": 6277716,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/dummy/__init__.py",
   "start": 6277716,
   "end": 6280777,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/multiprocessing/dummy/connection.py",
   "start": 6280777,
   "end": 6282375,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/venv/__main__.py",
   "start": 6282375,
   "end": 6282520,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/venv/__init__.py",
   "start": 6282520,
   "end": 6303582,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/venv/scripts/posix/activate.fish",
   "start": 6303582,
   "end": 6306008,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/venv/scripts/posix/activate.csh",
   "start": 6306008,
   "end": 6307284,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/venv/scripts/common/activate",
   "start": 6307284,
   "end": 6309502,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/venv/scripts/common/Activate.ps1",
   "start": 6309502,
   "end": 6318027,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/rosette.py",
   "start": 6318027,
   "end": 6319388,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/colormixer.py",
   "start": 6319388,
   "end": 6320727,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/tree.py",
   "start": 6320727,
   "end": 6322128,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/penrose.py",
   "start": 6322128,
   "end": 6325508,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/paint.py",
   "start": 6325508,
   "end": 6326799,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/bytedesign.py",
   "start": 6326799,
   "end": 6331047,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/yinyang.py",
   "start": 6331047,
   "end": 6331868,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/two_canvases.py",
   "start": 6331868,
   "end": 6332988,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/turtle.cfg",
   "start": 6332988,
   "end": 6333148,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/forest.py",
   "start": 6333148,
   "end": 6336114,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/peace.py",
   "start": 6336114,
   "end": 6337180,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/__main__.py",
   "start": 6337180,
   "end": 6351443,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/nim.py",
   "start": 6351443,
   "end": 6357956,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/__init__.py",
   "start": 6357956,
   "end": 6358270,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/planet_and_moon.py",
   "start": 6358270,
   "end": 6361095,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/fractalcurves.py",
   "start": 6361095,
   "end": 6364568,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/clock.py",
   "start": 6364568,
   "end": 6367769,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/sorting_animate.py",
   "start": 6367769,
   "end": 6372821,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/minimal_hanoi.py",
   "start": 6372821,
   "end": 6374872,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/chaos.py",
   "start": 6374872,
   "end": 6375823,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/lindenmayer.py",
   "start": 6375823,
   "end": 6378257,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/turtledemo/round_dance.py",
   "start": 6378257,
   "end": 6380061,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/dbm/dumb.py",
   "start": 6380061,
   "end": 6391597,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/dbm/__init__.py",
   "start": 6391597,
   "end": 6397436,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/dbm/ndbm.py",
   "start": 6397436,
   "end": 6397506,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/dbm/gnu.py",
   "start": 6397506,
   "end": 6397578,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/wsgiref/headers.py",
   "start": 6397578,
   "end": 6404344,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/wsgiref/util.py",
   "start": 6404344,
   "end": 6410195,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/wsgiref/__init__.py",
   "start": 6410195,
   "end": 6410782,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/wsgiref/handlers.py",
   "start": 6410782,
   "end": 6432451,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/wsgiref/validate.py",
   "start": 6432451,
   "end": 6447550,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/wsgiref/simple_server.py",
   "start": 6447550,
   "end": 6452721,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/curses/__init__.py",
   "start": 6452721,
   "end": 6456521,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/curses/textpad.py",
   "start": 6456521,
   "end": 6464178,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/curses/ascii.py",
   "start": 6464178,
   "end": 6466725,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/curses/panel.py",
   "start": 6466725,
   "end": 6466812,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/curses/has_key.py",
   "start": 6466812,
   "end": 6472446,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp856.py",
   "start": 6472446,
   "end": 6484869,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp950.py",
   "start": 6484869,
   "end": 6485892,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp1256.py",
   "start": 6485892,
   "end": 6498706,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/gbk.py",
   "start": 6498706,
   "end": 6499721,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp875.py",
   "start": 6499721,
   "end": 6512575,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/mac_roman.py",
   "start": 6512575,
   "end": 6526055,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso8859_3.py",
   "start": 6526055,
   "end": 6539144,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp874.py",
   "start": 6539144,
   "end": 6551739,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/koi8_r.py",
   "start": 6551739,
   "end": 6565518,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso8859_6.py",
   "start": 6565518,
   "end": 6576351,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp500.py",
   "start": 6576351,
   "end": 6589472,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp932.py",
   "start": 6589472,
   "end": 6590495,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso2022_jp_2.py",
   "start": 6590495,
   "end": 6591556,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/utf_16_be.py",
   "start": 6591556,
   "end": 6592593,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp1254.py",
   "start": 6592593,
   "end": 6606095,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/mac_iceland.py",
   "start": 6606095,
   "end": 6619593,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/mac_turkish.py",
   "start": 6619593,
   "end": 6633106,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp1257.py",
   "start": 6633106,
   "end": 6646480,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/undefined.py",
   "start": 6646480,
   "end": 6647779,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp1255.py",
   "start": 6647779,
   "end": 6660245,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso8859_5.py",
   "start": 6660245,
   "end": 6673260,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso8859_7.py",
   "start": 6673260,
   "end": 6686104,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/koi8_t.py",
   "start": 6686104,
   "end": 6699297,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/utf_32_be.py",
   "start": 6699297,
   "end": 6700227,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/gb2312.py",
   "start": 6700227,
   "end": 6701254,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso8859_15.py",
   "start": 6701254,
   "end": 6714466,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp1251.py",
   "start": 6714466,
   "end": 6727827,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp037.py",
   "start": 6727827,
   "end": 6740948,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/ptcp154.py",
   "start": 6740948,
   "end": 6754963,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/utf_32_le.py",
   "start": 6754963,
   "end": 6755893,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/big5hkscs.py",
   "start": 6755893,
   "end": 6756932,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/mac_croatian.py",
   "start": 6756932,
   "end": 6770565,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp862.py",
   "start": 6770565,
   "end": 6803935,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/kz1048.py",
   "start": 6803935,
   "end": 6817658,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/hz.py",
   "start": 6817658,
   "end": 6818669,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp864.py",
   "start": 6818669,
   "end": 6852332,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso8859_4.py",
   "start": 6852332,
   "end": 6865708,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp1258.py",
   "start": 6865708,
   "end": 6879072,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp852.py",
   "start": 6879072,
   "end": 6914074,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp775.py",
   "start": 6914074,
   "end": 6948550,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/johab.py",
   "start": 6948550,
   "end": 6949573,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp1252.py",
   "start": 6949573,
   "end": 6963084,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/tis_620.py",
   "start": 6963084,
   "end": 6975384,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/aliases.py",
   "start": 6975384,
   "end": 6990997,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/euc_jis_2004.py",
   "start": 6990997,
   "end": 6992048,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp1140.py",
   "start": 6992048,
   "end": 7005153,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp850.py",
   "start": 7005153,
   "end": 7039258,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso8859_11.py",
   "start": 7039258,
   "end": 7051593,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso2022_jp_3.py",
   "start": 7051593,
   "end": 7052654,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/idna.py",
   "start": 7052654,
   "end": 7061824,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp855.py",
   "start": 7061824,
   "end": 7095674,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/zlib_codec.py",
   "start": 7095674,
   "end": 7097878,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp857.py",
   "start": 7097878,
   "end": 7131786,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso8859_10.py",
   "start": 7131786,
   "end": 7145375,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp865.py",
   "start": 7145375,
   "end": 7179993,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/bz2_codec.py",
   "start": 7179993,
   "end": 7182242,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp866.py",
   "start": 7182242,
   "end": 7216638,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp737.py",
   "start": 7216638,
   "end": 7251319,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp273.py",
   "start": 7251319,
   "end": 7265451,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/euc_jisx0213.py",
   "start": 7265451,
   "end": 7266502,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/euc_kr.py",
   "start": 7266502,
   "end": 7267529,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/utf_16.py",
   "start": 7267529,
   "end": 7272765,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp949.py",
   "start": 7272765,
   "end": 7273788,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/rot_13.py",
   "start": 7273788,
   "end": 7276236,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/punycode.py",
   "start": 7276236,
   "end": 7283117,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp437.py",
   "start": 7283117,
   "end": 7317681,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp863.py",
   "start": 7317681,
   "end": 7351933,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/unicode_escape.py",
   "start": 7351933,
   "end": 7353117,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/__init__.py",
   "start": 7353117,
   "end": 7358705,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/utf_16_le.py",
   "start": 7358705,
   "end": 7359742,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/utf_32.py",
   "start": 7359742,
   "end": 7364871,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso8859_9.py",
   "start": 7364871,
   "end": 7378027,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso8859_14.py",
   "start": 7378027,
   "end": 7391679,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp1006.py",
   "start": 7391679,
   "end": 7405247,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/shift_jis.py",
   "start": 7405247,
   "end": 7406286,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso2022_kr.py",
   "start": 7406286,
   "end": 7407339,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso8859_16.py",
   "start": 7407339,
   "end": 7420896,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/base64_codec.py",
   "start": 7420896,
   "end": 7422429,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/utf_8.py",
   "start": 7422429,
   "end": 7423434,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/latin_1.py",
   "start": 7423434,
   "end": 7424698,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/shift_jisx0213.py",
   "start": 7424698,
   "end": 7425757,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/hex_codec.py",
   "start": 7425757,
   "end": 7427265,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp858.py",
   "start": 7427265,
   "end": 7461280,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/quopri_codec.py",
   "start": 7461280,
   "end": 7462805,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/mac_arabic.py",
   "start": 7462805,
   "end": 7499272,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso2022_jp_2004.py",
   "start": 7499272,
   "end": 7500345,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp720.py",
   "start": 7500345,
   "end": 7514031,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp1026.py",
   "start": 7514031,
   "end": 7527144,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/mac_farsi.py",
   "start": 7527144,
   "end": 7542314,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/gb18030.py",
   "start": 7542314,
   "end": 7543345,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/utf_8_sig.py",
   "start": 7543345,
   "end": 7547478,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/mac_greek.py",
   "start": 7547478,
   "end": 7561199,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/mbcs.py",
   "start": 7561199,
   "end": 7562410,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp869.py",
   "start": 7562410,
   "end": 7595375,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp1250.py",
   "start": 7595375,
   "end": 7609061,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/utf_7.py",
   "start": 7609061,
   "end": 7610007,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/charmap.py",
   "start": 7610007,
   "end": 7612091,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/big5.py",
   "start": 7612091,
   "end": 7613110,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso8859_8.py",
   "start": 7613110,
   "end": 7624146,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/mac_romanian.py",
   "start": 7624146,
   "end": 7637807,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp1125.py",
   "start": 7637807,
   "end": 7672404,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso2022_jp_ext.py",
   "start": 7672404,
   "end": 7673473,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/ascii.py",
   "start": 7673473,
   "end": 7674721,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp861.py",
   "start": 7674721,
   "end": 7709354,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/oem.py",
   "start": 7709354,
   "end": 7710373,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/shift_jis_2004.py",
   "start": 7710373,
   "end": 7711432,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso2022_jp_1.py",
   "start": 7711432,
   "end": 7712493,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/mac_cyrillic.py",
   "start": 7712493,
   "end": 7725947,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp1253.py",
   "start": 7725947,
   "end": 7739041,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso8859_2.py",
   "start": 7739041,
   "end": 7752445,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/koi8_u.py",
   "start": 7752445,
   "end": 7766207,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/hp_roman8.py",
   "start": 7766207,
   "end": 7779682,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso8859_1.py",
   "start": 7779682,
   "end": 7792858,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/euc_jp.py",
   "start": 7792858,
   "end": 7793885,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/mac_latin2.py",
   "start": 7793885,
   "end": 7808003,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/raw_unicode_escape.py",
   "start": 7808003,
   "end": 7809211,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso8859_13.py",
   "start": 7809211,
   "end": 7822482,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/iso2022_jp.py",
   "start": 7822482,
   "end": 7823535,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/uu_codec.py",
   "start": 7823535,
   "end": 7826256,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp860.py",
   "start": 7826256,
   "end": 7860937,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/palmos.py",
   "start": 7860937,
   "end": 7874456,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/mac_centeuro.py",
   "start": 7874456,
   "end": 7888558,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/encodings/cp424.py",
   "start": 7888558,
   "end": 7900613,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/http/server.py",
   "start": 7900613,
   "end": 7947399,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/http/client.py",
   "start": 7947399,
   "end": 8001725,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/http/__init__.py",
   "start": 8001725,
   "end": 8008103,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/http/cookies.py",
   "start": 8008103,
   "end": 8028515,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/http/cookiejar.py",
   "start": 8028515,
   "end": 8105307,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/collections/abc.py",
   "start": 8105307,
   "end": 8105375,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/collections/__init__.py",
   "start": 8105375,
   "end": 8152896,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/json/encoder.py",
   "start": 8152896,
   "end": 8168968,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/json/__init__.py",
   "start": 8168968,
   "end": 8183313,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/json/tool.py",
   "start": 8183313,
   "end": 8185170,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/json/decoder.py",
   "start": 8185170,
   "end": 8197642,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/json/scanner.py",
   "start": 8197642,
   "end": 8200067,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/sqlite3/dump.py",
   "start": 8200067,
   "end": 8202892,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/sqlite3/dbapi2.py",
   "start": 8202892,
   "end": 8205579,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/sqlite3/__init__.py",
   "start": 8205579,
   "end": 8206597,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/sqlite3/test/regression.py",
   "start": 8206597,
   "end": 8221607,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/sqlite3/test/dump.py",
   "start": 8221607,
   "end": 8224447,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/sqlite3/test/hooks.py",
   "start": 8224447,
   "end": 8234993,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/sqlite3/test/dbapi.py",
   "start": 8234993,
   "end": 8270361,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/sqlite3/test/userfunctions.py",
   "start": 8270361,
   "end": 8286622,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/sqlite3/test/backup.py",
   "start": 8286622,
   "end": 8292293,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/sqlite3/test/transactions.py",
   "start": 8292293,
   "end": 8300148,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/sqlite3/test/factory.py",
   "start": 8300148,
   "end": 8311498,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/sqlite3/test/__init__.py",
   "start": 8311498,
   "end": 8311498,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/sqlite3/test/types.py",
   "start": 8311498,
   "end": 8327947,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/urllib/parse.py",
   "start": 8327947,
   "end": 8369527,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/urllib/robotparser.py",
   "start": 8369527,
   "end": 8378951,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/urllib/error.py",
   "start": 8378951,
   "end": 8381583,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/urllib/__init__.py",
   "start": 8381583,
   "end": 8381583,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/urllib/request.py",
   "start": 8381583,
   "end": 8481666,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/urllib/response.py",
   "start": 8481666,
   "end": 8483965,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/importlib/util.py",
   "start": 8483965,
   "end": 8495284,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/importlib/machinery.py",
   "start": 8495284,
   "end": 8496128,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/importlib/abc.py",
   "start": 8496128,
   "end": 8509001,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/importlib/__init__.py",
   "start": 8509001,
   "end": 8515062,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/importlib/_bootstrap.py",
   "start": 8515062,
   "end": 8554706,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/importlib/_bootstrap_external.py",
   "start": 8554706,
   "end": 8618722,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/importlib/resources.py",
   "start": 8618722,
   "end": 8628159,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/importlib/metadata.py",
   "start": 8628159,
   "end": 8640430,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/wintypes.py",
   "start": 8640430,
   "end": 8646058,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/util.py",
   "start": 8646058,
   "end": 8659137,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/_endian.py",
   "start": 8659137,
   "end": 8661137,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/__init__.py",
   "start": 8661137,
   "end": 8678794,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/_aix.py",
   "start": 8678794,
   "end": 8691361,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/macholib/fetch_macholib",
   "start": 8691361,
   "end": 8691445,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/macholib/dylib.py",
   "start": 8691445,
   "end": 8693273,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/macholib/__init__.py",
   "start": 8693273,
   "end": 8693427,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/macholib/framework.py",
   "start": 8693427,
   "end": 8695628,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/macholib/README.ctypes",
   "start": 8695628,
   "end": 8695924,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/macholib/dyld.py",
   "start": 8695924,
   "end": 8700857,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/macholib/fetch_macholib.bat",
   "start": 8700857,
   "end": 8700932,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_errno.py",
   "start": 8700932,
   "end": 8703103,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_returnfuncptrs.py",
   "start": 8703103,
   "end": 8705996,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_arrays.py",
   "start": 8705996,
   "end": 8713501,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_keeprefs.py",
   "start": 8713501,
   "end": 8717559,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_python_api.py",
   "start": 8717559,
   "end": 8720425,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_refcounts.py",
   "start": 8720425,
   "end": 8723001,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_internals.py",
   "start": 8723001,
   "end": 8725632,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_as_parameter.py",
   "start": 8725632,
   "end": 8732551,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_loading.py",
   "start": 8732551,
   "end": 8739511,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_memfunctions.py",
   "start": 8739511,
   "end": 8742804,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_funcptr.py",
   "start": 8742804,
   "end": 8746830,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_objects.py",
   "start": 8746830,
   "end": 8748507,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_delattr.py",
   "start": 8748507,
   "end": 8749040,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_random_things.py",
   "start": 8749040,
   "end": 8751867,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_frombuffer.py",
   "start": 8751867,
   "end": 8757082,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_libc.py",
   "start": 8757082,
   "end": 8758087,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_structures.py",
   "start": 8758087,
   "end": 8775239,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_parameters.py",
   "start": 8775239,
   "end": 8782569,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_win32.py",
   "start": 8782569,
   "end": 8787596,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_bytes.py",
   "start": 8787596,
   "end": 8789583,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_wintypes.py",
   "start": 8789583,
   "end": 8791049,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_sizes.py",
   "start": 8791049,
   "end": 8791853,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_buffers.py",
   "start": 8791853,
   "end": 8794464,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_pep3118.py",
   "start": 8794464,
   "end": 8802980,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_find.py",
   "start": 8802980,
   "end": 8806928,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_incomplete.py",
   "start": 8806928,
   "end": 8807951,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/__main__.py",
   "start": 8807951,
   "end": 8808019,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_stringptr.py",
   "start": 8808019,
   "end": 8810555,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_repr.py",
   "start": 8810555,
   "end": 8811397,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/__init__.py",
   "start": 8811397,
   "end": 8811796,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_init.py",
   "start": 8811796,
   "end": 8812835,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_checkretval.py",
   "start": 8812835,
   "end": 8813803,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_macholib.py",
   "start": 8813803,
   "end": 8815633,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_bitfields.py",
   "start": 8815633,
   "end": 8825855,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_unicode.py",
   "start": 8825855,
   "end": 8827616,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_simplesubclasses.py",
   "start": 8827616,
   "end": 8828905,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_pickling.py",
   "start": 8828905,
   "end": 8831123,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_numbers.py",
   "start": 8831123,
   "end": 8840649,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_anon.py",
   "start": 8840649,
   "end": 8843189,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_slicing.py",
   "start": 8843189,
   "end": 8849214,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_values.py",
   "start": 8849214,
   "end": 8853085,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_callbacks.py",
   "start": 8853085,
   "end": 8862621,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_varsize_struct.py",
   "start": 8862621,
   "end": 8864463,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_strings.py",
   "start": 8864463,
   "end": 8871766,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_byteswap.py",
   "start": 8871766,
   "end": 8883177,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_unaligned_structures.py",
   "start": 8883177,
   "end": 8884392,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_cast.py",
   "start": 8884392,
   "end": 8888120,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_struct_fields.py",
   "start": 8888120,
   "end": 8890541,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_prototypes.py",
   "start": 8890541,
   "end": 8897386,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_array_in_pointer.py",
   "start": 8897386,
   "end": 8899124,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_functions.py",
   "start": 8899124,
   "end": 8911679,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_cfuncs.py",
   "start": 8911679,
   "end": 8919359,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/ctypes/test/test_pointers.py",
   "start": 8919359,
   "end": 8926598,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/logging/config.py",
   "start": 8926598,
   "end": 8962847,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/logging/__init__.py",
   "start": 8962847,
   "end": 9040384,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/logging/handlers.py",
   "start": 9040384,
   "end": 9098269,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/encoders.py",
   "start": 9098269,
   "end": 9100055,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/headerregistry.py",
   "start": 9100055,
   "end": 9120646,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/_header_value_parser.py",
   "start": 9120646,
   "end": 9225413,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/feedparser.py",
   "start": 9225413,
   "end": 9248193,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/_parseaddr.py",
   "start": 9248193,
   "end": 9265797,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/_encoded_words.py",
   "start": 9265797,
   "end": 9274321,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/charset.py",
   "start": 9274321,
   "end": 9291449,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/message.py",
   "start": 9291449,
   "end": 9338521,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/base64mime.py",
   "start": 9338521,
   "end": 9342079,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/generator.py",
   "start": 9342079,
   "end": 9362054,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/utils.py",
   "start": 9362054,
   "end": 9375542,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/errors.py",
   "start": 9375542,
   "end": 9379189,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/architecture.rst",
   "start": 9379189,
   "end": 9388750,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/__init__.py",
   "start": 9388750,
   "end": 9390516,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/iterators.py",
   "start": 9390516,
   "end": 9392651,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/contentmanager.py",
   "start": 9392651,
   "end": 9403323,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/_policybase.py",
   "start": 9403323,
   "end": 9418396,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/policy.py",
   "start": 9418396,
   "end": 9428779,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/header.py",
   "start": 9428779,
   "end": 9452881,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/parser.py",
   "start": 9452881,
   "end": 9457922,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/quoprimime.py",
   "start": 9457922,
   "end": 9467780,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/mime/application.py",
   "start": 9467780,
   "end": 9469101,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/mime/message.py",
   "start": 9469101,
   "end": 9470418,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/mime/base.py",
   "start": 9470418,
   "end": 9471334,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/mime/nonmultipart.py",
   "start": 9471334,
   "end": 9472025,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/mime/__init__.py",
   "start": 9472025,
   "end": 9472025,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/mime/image.py",
   "start": 9472025,
   "end": 9473854,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/mime/text.py",
   "start": 9473854,
   "end": 9475291,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/mime/audio.py",
   "start": 9475291,
   "end": 9478030,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/email/mime/multipart.py",
   "start": 9478030,
   "end": 9479651,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/concurrent/__init__.py",
   "start": 9479651,
   "end": 9479689,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/concurrent/futures/thread.py",
   "start": 9479689,
   "end": 9488457,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/concurrent/futures/_base.py",
   "start": 9488457,
   "end": 9510929,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/concurrent/futures/__init__.py",
   "start": 9510929,
   "end": 9512483,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.8/concurrent/futures/process.py",
   "start": 9512483,
   "end": 9540765,
   "audio": 0
  }, {
   "filename": "/coldbrew/examples/threads.py",
   "start": 9540765,
   "end": 9541623,
   "audio": 0
  }, {
   "filename": "/coldbrew/examples/fib.py",
   "start": 9541623,
   "end": 9543498,
   "audio": 0
  }, {
   "filename": "/coldbrew/examples/add.py",
   "start": 9543498,
   "end": 9543920,
   "audio": 0
  } ],
  "remote_package_size": 9543920,
  "package_uuid": "7cc82302-e6db-412f-8217-24e529242579"
 });
})();

var _coldbrew_resumeReportError = function(e) {
 if (e.message.indexOf("unreachable") >= 0) {
  console.error("FATAL – Coldbrew tried to true sleep using Asyncify, with a function pointer on the stack before unwinding. Please report an issue at https://git.io/fjANP and share the *full stack trace with DEBUG mode on* of this error.");
 }
 console.error("Encountered an error: ", e);
 throw e;
};

var _coldbrew_oldSetTimeout = setTimeout;

var _coldbrew_newSetTimeout = function(_coldbrew_oldSetTimeout) {
 return function() {
  var args = arguments;
  if (args[1] < 0) {
   if (Coldbrew._resume_ie) {
    Coldbrew._resume_ie = false;
    Coldbrew.resume = Coldbrew._resumeWarn;
    try {
     args[0]();
    } catch (e) {
     _coldbrew_resumeReportError(e);
    }
   } else {
    Coldbrew.resume = function() {
     Coldbrew._resume_ie = false;
     Coldbrew.resume = Coldbrew._resumeWarn;
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
};

setTimeout(function() {
 if (!IS_NODE_JS) {
  _coldbrew_oldSetTimeout = Browser.safeSetTimeout;
  Browser.safeSetTimeout = _coldbrew_newSetTimeout(_coldbrew_oldSetTimeout);
 }
 if (true && !!PThread) {
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

if (IS_NODE_JS) {
 setTimeout = _coldbrew_newSetTimeout(_coldbrew_oldSetTimeout);
}

var Worker = COLDBREW_TOP_SCOPE.Worker;

Module.noInitialRun = true;

Module.print = function(text) {
 if (Coldbrew.forwardOut) {
  if (!IS_WORKER_SCRIPT) {
   Coldbrew.onStandardOut(text);
  } else {
   Coldbrew._runMain("Coldbrew.onStandardOut(" + JSON.stringify(text) + ")");
  }
 }
};

Module.printErr = function(text) {
 if (Coldbrew.forwardErr) {
  if (!IS_WORKER_SCRIPT) {
   Coldbrew.onStandardErr(text);
  } else {
   Coldbrew._runMain("Coldbrew.onStandardErr(" + JSON.stringify(text) + ")");
  }
 }
};

Module.preInit = [ function() {
 if (true) {
  Module.mainScriptUrlOrBlob = SCRIPT_SOURCE;
 }
 Coldbrew.preInit(Module);
} ];

Module.preRun.push(function() {
 Coldbrew.preRun(Module);
 Coldbrew._mountFS(Module);
});

Module.onRuntimeInitialized = function() {
 Coldbrew._onRuntimeInitialized(Module);
};

var moduleOverrides = {};

var key;

for (key in Module) {
 if (Module.hasOwnProperty(key)) {
  moduleOverrides[key] = Module[key];
 }
}

var arguments_ = [];

var thisProgram = "./this.program";

var quit_ = function(status, toThrow) {
 throw toThrow;
};

var ENVIRONMENT_IS_WEB = false;

var ENVIRONMENT_IS_WORKER = false;

var ENVIRONMENT_IS_NODE = false;

var ENVIRONMENT_HAS_NODE = false;

var ENVIRONMENT_IS_SHELL = false;

ENVIRONMENT_IS_WEB = typeof window === "object";

ENVIRONMENT_IS_WORKER = typeof importScripts === "function";

ENVIRONMENT_HAS_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";

ENVIRONMENT_IS_NODE = ENVIRONMENT_HAS_NODE && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;

ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

var ENVIRONMENT_IS_PTHREAD = Module.ENVIRONMENT_IS_PTHREAD || false;

if (!ENVIRONMENT_IS_PTHREAD) {
 var PthreadWorkerInit = {};
} else {
 var buffer = _Coldbrew_coldbrew_internal_.buffer;
 var tempDoublePtr = _Coldbrew_coldbrew_internal_.tempDoublePtr;
 var STATICTOP = _Coldbrew_coldbrew_internal_.STATICTOP;
 var DYNAMIC_BASE = _Coldbrew_coldbrew_internal_.DYNAMIC_BASE;
 var DYNAMICTOP_PTR = _Coldbrew_coldbrew_internal_.DYNAMICTOP_PTR;
 var PthreadWorkerInit = _Coldbrew_coldbrew_internal_.PthreadWorkerInit;
}

var scriptDirectory = "";

function locateFile(path) {
 if (Module["locateFile"]) {
  return Module["locateFile"](path, scriptDirectory);
 }
 return scriptDirectory + path;
}

var read_, readAsync, readBinary, setWindowTitle;

if (ENVIRONMENT_IS_NODE) {
 scriptDirectory = __dirname + "/";
 var nodeFS;
 var nodePath;
 read_ = function shell_read(filename, binary) {
  var ret;
  if (!nodeFS) nodeFS = require("fs");
  if (!nodePath) nodePath = require("path");
  filename = nodePath["normalize"](filename);
  ret = nodeFS["readFileSync"](filename);
  return binary ? ret : ret.toString();
 };
 readBinary = function readBinary(filename) {
  var ret = read_(filename, true);
  if (!ret.buffer) {
   ret = new Uint8Array(ret);
  }
  assert(ret.buffer);
  return ret;
 };
 if (process["argv"].length > 1) {
  thisProgram = process["argv"][1].replace(/\\/g, "/");
 }
 arguments_ = process["argv"].slice(2);
 process["on"]("uncaughtException", function(ex) {
  if (!(ex instanceof ExitStatus)) {
   throw ex;
  }
 });
 process["on"]("unhandledRejection", abort);
 quit_ = function(status) {
  process["exit"](status);
 };
 Module["inspect"] = function() {
  return "[Emscripten Module object]";
 };
} else if (ENVIRONMENT_IS_SHELL) {
 if (typeof read != "undefined") {
  read_ = function shell_read(f) {
   return read(f);
  };
 }
 readBinary = function readBinary(f) {
  var data;
  if (typeof readbuffer === "function") {
   return new Uint8Array(readbuffer(f));
  }
  data = read(f, "binary");
  assert(typeof data === "object");
  return data;
 };
 if (typeof scriptArgs != "undefined") {
  arguments_ = scriptArgs;
 } else if (typeof arguments != "undefined") {
  arguments_ = arguments;
 }
 if (typeof quit === "function") {
  quit_ = function(status) {
   quit(status);
  };
 }
 if (typeof print !== "undefined") {
  if (typeof console === "undefined") console = {};
  console.log = print;
  console.warn = console.error = typeof printErr !== "undefined" ? printErr : print;
 }
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = self.location.href;
 } else if (document.currentScript) {
  scriptDirectory = document.currentScript.src;
 }
 if (_scriptDir) {
  scriptDirectory = _scriptDir;
 }
 if (scriptDirectory.indexOf("blob:") !== 0) {
  scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1);
 } else {
  scriptDirectory = "";
 }
 read_ = function shell_read(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send(null);
  return xhr.responseText;
 };
 if (ENVIRONMENT_IS_WORKER) {
  readBinary = function readBinary(url) {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", url, false);
   xhr.responseType = "arraybuffer";
   xhr.send(null);
   return new Uint8Array(xhr.response);
  };
 }
 readAsync = function readAsync(url, onload, onerror) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "arraybuffer";
  xhr.onload = function xhr_onload() {
   if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
    onload(xhr.response);
    return;
   }
   onerror();
  };
  xhr.onerror = onerror;
  xhr.send(null);
 };
 setWindowTitle = function(title) {
  document.title = title;
 };
} else {}

var out = Module["print"] || console.log.bind(console);

var err = Module["printErr"] || console.warn.bind(console);

for (key in moduleOverrides) {
 if (moduleOverrides.hasOwnProperty(key)) {
  Module[key] = moduleOverrides[key];
 }
}

moduleOverrides = null;

if (Module["arguments"]) arguments_ = Module["arguments"];

if (Module["thisProgram"]) thisProgram = Module["thisProgram"];

if (Module["quit"]) quit_ = Module["quit"];

function dynamicAlloc(size) {
 var ret = GROWABLE_HEAP_LOAD_I32(DYNAMICTOP_PTR | 0);
 var end = ret + size + 15 & -16;
 if (end > _emscripten_get_heap_size()) {
  abort();
 }
 GROWABLE_HEAP_STORE_I32(DYNAMICTOP_PTR | 0, end);
 return ret;
}

function getNativeTypeSize(type) {
 switch (type) {
 case "i1":
 case "i8":
  return 1;

 case "i16":
  return 2;

 case "i32":
  return 4;

 case "i64":
  return 8;

 case "float":
  return 4;

 case "double":
  return 8;

 default:
  {
   if (type[type.length - 1] === "*") {
    return 4;
   } else if (type[0] === "i") {
    var bits = parseInt(type.substr(1));
    assert(bits % 8 === 0, "getNativeTypeSize invalid bits " + bits + ", type " + type);
    return bits / 8;
   } else {
    return 0;
   }
  }
 }
}

function warnOnce(text) {
 if (!warnOnce.shown) warnOnce.shown = {};
 if (!warnOnce.shown[text]) {
  warnOnce.shown[text] = 1;
  err(text);
 }
}

function establishStackSpace(base, max) {
 stackRestore(max);
}

var Atomics_load = Atomics.load;

var Atomics_store = Atomics.store;

var Atomics_compareExchange = Atomics.compareExchange;

var wasmBinary;

if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];

var noExitRuntime;

if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];

if (typeof WebAssembly !== "object") {
 err("no native wasm support detected");
}

function setValue(ptr, value, type, noSafe) {
 type = type || "i8";
 if (type.charAt(type.length - 1) === "*") type = "i32";
 switch (type) {
 case "i1":
  GROWABLE_HEAP_STORE_I8(ptr >> 0 | 0, value);
  break;

 case "i8":
  GROWABLE_HEAP_STORE_I8(ptr >> 0 | 0, value);
  break;

 case "i16":
  GROWABLE_HEAP_STORE_I16(ptr | 0, value);
  break;

 case "i32":
  GROWABLE_HEAP_STORE_I32(ptr | 0, value);
  break;

 case "i64":
  tempI64 = [ value >>> 0, (tempDouble = value, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  GROWABLE_HEAP_STORE_I32(ptr | 0, tempI64[0]), GROWABLE_HEAP_STORE_I32(ptr + 4 | 0, tempI64[1]);
  break;

 case "float":
  GROWABLE_HEAP_STORE_F32(ptr | 0, value);
  break;

 case "double":
  GROWABLE_HEAP_STORE_F64(ptr | 0, value);
  break;

 default:
  abort("invalid type for setValue: " + type);
 }
}

var wasmMemory;

var wasmTable = new WebAssembly.Table({
 "initial": 3506,
 "maximum": 3506 + 0,
 "element": "anyfunc"
});

var wasmModule;

var ABORT = false;

var EXITSTATUS = 0;

function assert(condition, text) {
 if (!condition) {
  abort("Assertion failed: " + text);
 }
}

function getCFunc(ident) {
 var func = Module["_" + ident];
 assert(func, "Cannot call unknown function " + ident + ", make sure it is exported");
 return func;
}

function ccall(ident, returnType, argTypes, args, opts) {
 var toC = {
  "string": function(str) {
   var ret = 0;
   if (str !== null && str !== undefined && str !== 0) {
    var len = (str.length << 2) + 1;
    ret = stackAlloc(len);
    stringToUTF8(str, ret, len);
   }
   return ret;
  },
  "array": function(arr) {
   var ret = stackAlloc(arr.length);
   writeArrayToMemory(arr, ret);
   return ret;
  }
 };
 function convertReturnValue(ret) {
  if (returnType === "string") return UTF8ToString(ret);
  if (returnType === "boolean") return Boolean(ret);
  return ret;
 }
 var func = getCFunc(ident);
 var cArgs = [];
 var stack = 0;
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
 var asyncMode = opts && opts.async;
 var runningAsync = typeof Asyncify === "object" && Asyncify.currData;
 var prevRunningAsync = typeof Asyncify === "object" && Asyncify.asyncFinalizers.length > 0;
 if (runningAsync && !prevRunningAsync) {
  return new Promise(function(resolve) {
   Asyncify.asyncFinalizers.push(function(ret) {
    if (stack !== 0) stackRestore(stack);
    resolve(convertReturnValue(ret));
   });
  });
 }
 ret = convertReturnValue(ret);
 if (stack !== 0) stackRestore(stack);
 if (opts && opts.async) return Promise.resolve(ret);
 return ret;
}

function cwrap(ident, returnType, argTypes, opts) {
 argTypes = argTypes || [];
 var numericArgs = argTypes.every(function(type) {
  return type === "number";
 });
 var numericRet = returnType !== "string";
 if (numericRet && numericArgs && !opts) {
  return getCFunc(ident);
 }
 return function() {
  return ccall(ident, returnType, argTypes, arguments, opts);
 };
}

var ALLOC_NORMAL = 0;

var ALLOC_NONE = 3;

function allocate(slab, types, allocator, ptr) {
 var zeroinit, size;
 if (typeof slab === "number") {
  zeroinit = true;
  size = slab;
 } else {
  zeroinit = false;
  size = slab.length;
 }
 var singleType = typeof types === "string" ? types : null;
 var ret;
 if (allocator == ALLOC_NONE) {
  ret = ptr;
 } else {
  ret = [ _malloc, stackAlloc, dynamicAlloc ][allocator](Math.max(size, singleType ? 1 : types.length));
 }
 if (zeroinit) {
  var stop;
  ptr = ret;
  assert((ret & 3) == 0);
  stop = ret + (size & ~3);
  for (;ptr < stop; ptr += 4) {
   GROWABLE_HEAP_STORE_I32(ptr | 0, 0);
  }
  stop = ret + size;
  while (ptr < stop) {
   GROWABLE_HEAP_STORE_I8(ptr++ >> 0 | 0, 0);
  }
  return ret;
 }
 if (singleType === "i8") {
  if (slab.subarray || slab.slice) {
   HEAPU8.set(slab, ret);
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
  if (type == "i64") type = "i32";
  setValue(ret + i, curr, type);
  if (previousType !== type) {
   typeSize = getNativeTypeSize(type);
   previousType = type;
  }
  i += typeSize;
 }
 return ret;
}

function getMemory(size) {
 if (!runtimeInitialized) return dynamicAlloc(size);
 return _malloc(size);
}

function AsciiToString(ptr) {
 var str = "";
 while (1) {
  var ch = GROWABLE_HEAP_LOAD_U8(ptr++ >> 0 | 0);
  if (!ch) return str;
  str += String.fromCharCode(ch);
 }
}

function UTF8ArrayToString(u8Array, idx, maxBytesToRead) {
 var endIdx = idx + maxBytesToRead;
 var str = "";
 while (!(idx >= endIdx)) {
  var u0 = u8Array[idx++];
  if (!u0) return str;
  if (!(u0 & 128)) {
   str += String.fromCharCode(u0);
   continue;
  }
  var u1 = u8Array[idx++] & 63;
  if ((u0 & 224) == 192) {
   str += String.fromCharCode((u0 & 31) << 6 | u1);
   continue;
  }
  var u2 = u8Array[idx++] & 63;
  if ((u0 & 240) == 224) {
   u0 = (u0 & 15) << 12 | u1 << 6 | u2;
  } else {
   u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u8Array[idx++] & 63;
  }
  if (u0 < 65536) {
   str += String.fromCharCode(u0);
  } else {
   var ch = u0 - 65536;
   str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
  }
 }
 return str;
}

function UTF8ToString(ptr, maxBytesToRead) {
 return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
}

function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
 if (!(maxBytesToWrite > 0)) return 0;
 var startIdx = outIdx;
 var endIdx = outIdx + maxBytesToWrite - 1;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) {
   var u1 = str.charCodeAt(++i);
   u = 65536 + ((u & 1023) << 10) | u1 & 1023;
  }
  if (u <= 127) {
   if (outIdx >= endIdx) break;
   outU8Array[outIdx++] = u;
  } else if (u <= 2047) {
   if (outIdx + 1 >= endIdx) break;
   outU8Array[outIdx++] = 192 | u >> 6;
   outU8Array[outIdx++] = 128 | u & 63;
  } else if (u <= 65535) {
   if (outIdx + 2 >= endIdx) break;
   outU8Array[outIdx++] = 224 | u >> 12;
   outU8Array[outIdx++] = 128 | u >> 6 & 63;
   outU8Array[outIdx++] = 128 | u & 63;
  } else {
   if (outIdx + 3 >= endIdx) break;
   outU8Array[outIdx++] = 240 | u >> 18;
   outU8Array[outIdx++] = 128 | u >> 12 & 63;
   outU8Array[outIdx++] = 128 | u >> 6 & 63;
   outU8Array[outIdx++] = 128 | u & 63;
  }
 }
 outU8Array[outIdx] = 0;
 return outIdx - startIdx;
}

function stringToUTF8(str, outPtr, maxBytesToWrite) {
 return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
}

function lengthBytesUTF8(str) {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
  if (u <= 127) ++len; else if (u <= 2047) len += 2; else if (u <= 65535) len += 3; else len += 4;
 }
 return len;
}

function allocateUTF8OnStack(str) {
 var size = lengthBytesUTF8(str) + 1;
 var ret = stackAlloc(size);
 stringToUTF8Array(str, HEAP8, ret, size);
 return ret;
}

function writeArrayToMemory(array, buffer) {
 HEAP8.set(array, buffer);
}

function writeAsciiToMemory(str, buffer, dontAddNull) {
 for (var i = 0; i < str.length; ++i) {
  GROWABLE_HEAP_STORE_I8(buffer++ >> 0 | 0, str.charCodeAt(i));
 }
 if (!dontAddNull) GROWABLE_HEAP_STORE_I8(buffer >> 0 | 0, 0);
}

var PAGE_SIZE = 16384;

var WASM_PAGE_SIZE = 65536;

function alignUp(x, multiple) {
 if (x % multiple > 0) {
  x += multiple - x % multiple;
 }
 return x;
}

var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

function updateGlobalBufferAndViews(buf) {
 buffer = buf;
 Module["HEAP8"] = HEAP8 = new Int8Array(buf);
 Module["HEAP16"] = HEAP16 = new Int16Array(buf);
 Module["HEAP32"] = HEAP32 = new Int32Array(buf);
 Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
 Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
 Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
 Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
 Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
}

if (!ENVIRONMENT_IS_PTHREAD) {
 var STACK_BASE = 7226768, STACKTOP = STACK_BASE, STACK_MAX = 1983888, DYNAMIC_BASE = 7226768, DYNAMICTOP_PTR = 1982896;
}

var INITIAL_TOTAL_MEMORY = Module["TOTAL_MEMORY"] || 20971520;

if (ENVIRONMENT_IS_PTHREAD) {
 wasmMemory = Module["wasmMemory"];
} else {
 if (Module["wasmMemory"]) {
  wasmMemory = Module["wasmMemory"];
 } else {
  wasmMemory = new WebAssembly.Memory({
   "initial": INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE,
   "maximum": 2130706432 / WASM_PAGE_SIZE,
   "shared": true
  });
  assert(wasmMemory.buffer instanceof SharedArrayBuffer, "requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag");
 }
}

if (wasmMemory) {
 buffer = wasmMemory.buffer;
}

INITIAL_TOTAL_MEMORY = buffer.byteLength;

updateGlobalBufferAndViews(buffer);

if (!ENVIRONMENT_IS_PTHREAD) {
 GROWABLE_HEAP_STORE_I32(DYNAMICTOP_PTR | 0, DYNAMIC_BASE);
}

function callRuntimeCallbacks(callbacks) {
 while (callbacks.length > 0) {
  var callback = callbacks.shift();
  if (typeof callback == "function") {
   callback();
   continue;
  }
  var func = callback.func;
  if (typeof func === "number") {
   if (callback.arg === undefined) {
    Module["dynCall_v"](func);
   } else {
    Module["dynCall_vi"](func, callback.arg);
   }
  } else {
   func(callback.arg === undefined ? null : callback.arg);
  }
 }
}

var __ATPRERUN__ = [];

var __ATINIT__ = [];

var __ATMAIN__ = [];

var __ATEXIT__ = [];

var __ATPOSTRUN__ = [];

var runtimeInitialized = false;

var runtimeExited = false;

if (ENVIRONMENT_IS_PTHREAD) runtimeInitialized = true;

function preRun() {
 if (ENVIRONMENT_IS_PTHREAD) return;
 if (Module["preRun"]) {
  if (typeof Module["preRun"] == "function") Module["preRun"] = [ Module["preRun"] ];
  while (Module["preRun"].length) {
   addOnPreRun(Module["preRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
 runtimeInitialized = true;
 if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
 TTY.init();
 PIPEFS.root = FS.mount(PIPEFS, {}, null);
 callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
 if (ENVIRONMENT_IS_PTHREAD) return;
 FS.ignorePermissions = false;
 callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
 if (ENVIRONMENT_IS_PTHREAD) return;
 runtimeExited = true;
}

function postRun() {
 if (ENVIRONMENT_IS_PTHREAD) return;
 if (Module["postRun"]) {
  if (typeof Module["postRun"] == "function") Module["postRun"] = [ Module["postRun"] ];
  while (Module["postRun"].length) {
   addOnPostRun(Module["postRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
 __ATPRERUN__.unshift(cb);
}

function addOnPostRun(cb) {
 __ATPOSTRUN__.unshift(cb);
}

var Math_abs = Math.abs;

var Math_ceil = Math.ceil;

var Math_floor = Math.floor;

var Math_min = Math.min;

var runDependencies = 0;

var runDependencyWatcher = null;

var dependenciesFulfilled = null;

function getUniqueRunDependency(id) {
 return id;
}

function addRunDependency(id) {
 assert(!ENVIRONMENT_IS_PTHREAD, "addRunDependency cannot be used in a pthread worker");
 runDependencies++;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
}

function removeRunDependency(id) {
 runDependencies--;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
 if (runDependencies == 0) {
  if (runDependencyWatcher !== null) {
   clearInterval(runDependencyWatcher);
   runDependencyWatcher = null;
  }
  if (dependenciesFulfilled) {
   var callback = dependenciesFulfilled;
   dependenciesFulfilled = null;
   callback();
  }
 }
}

Module["preloadedImages"] = {};

Module["preloadedAudios"] = {};

function abort(what) {
 if (Module["onAbort"]) {
  Module["onAbort"](what);
 }
 if (ENVIRONMENT_IS_PTHREAD) console.error("Pthread aborting at " + new Error().stack);
 what += "";
 out(what);
 err(what);
 ABORT = true;
 EXITSTATUS = 1;
 throw "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
}

if (!ENVIRONMENT_IS_PTHREAD) addOnPreRun(function() {
 if (typeof SharedArrayBuffer !== "undefined") {
  addRunDependency("pthreads");
  PThread.allocateUnusedWorkers(4, function() {
   removeRunDependency("pthreads");
  });
 }
});

var dataURIPrefix = "data:application/octet-stream;base64,";

function isDataURI(filename) {
 return String.prototype.startsWith ? filename.startsWith(dataURIPrefix) : filename.indexOf(dataURIPrefix) === 0;
}

var wasmBinaryFile = ""+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "origin")+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "pathname").split("/").slice(0, -1).join("/")+"/coldbrew.wasm"+"";

if (!isDataURI(wasmBinaryFile)) {
 wasmBinaryFile = wasmBinaryFile;
}

function getBinary() {
 try {
  if (wasmBinary) {
   return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
   return readBinary(wasmBinaryFile);
  } else {
   throw "both async and sync fetching of the wasm failed";
  }
 } catch (err) {
  abort(err);
 }
}

function getBinaryPromise() {
 if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === "function") {
  return fetch(wasmBinaryFile, {
   credentials: "same-origin"
  }).then(function(response) {
   if (!response["ok"]) {
    throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
   }
   return Promise.resolve(response["arrayBuffer"]()).then(JSZip.loadAsync).then(function(zip) { return zip.files[Object.keys(zip.files)].async("arraybuffer") });
  }).catch(function() {
   return getBinary();
  });
 }
 return new Promise(function(resolve, reject) {
  resolve(getBinary());
 });
}

function createWasm() {
 var info = {
  "env": asmLibraryArg,
  "wasi_unstable": asmLibraryArg
 };
 function receiveInstance(instance, module) {
  var exports = instance.exports;
  exports = Asyncify.instrumentWasmExports(exports);
  Module["asm"] = exports;
  wasmModule = module;
  if (!ENVIRONMENT_IS_PTHREAD) removeRunDependency("wasm-instantiate");
 }
 if (!ENVIRONMENT_IS_PTHREAD) {
  addRunDependency("wasm-instantiate");
 }
 function receiveInstantiatedSource(output) {
  receiveInstance(output["instance"], output["module"]);
 }
 function instantiateArrayBuffer(receiver) {
  return getBinaryPromise().then(function(binary) {
   return WebAssembly.instantiate(binary, info);
  }).then(receiver, function(reason) {
   err("failed to asynchronously prepare wasm: " + reason);
   abort(reason);
  });
 }
 function instantiateAsync() {
  if (!wasmBinary && undefined === "function" && !isDataURI(wasmBinaryFile) && typeof fetch === "function") {
   fetch(wasmBinaryFile, {
    credentials: "same-origin"
   }).then(function(response) {
    var result = WebAssembly.instantiateStreaming(response, info);
    return result.then(receiveInstantiatedSource, function(reason) {
     err("wasm streaming compile failed: " + reason);
     err("falling back to ArrayBuffer instantiation");
     instantiateArrayBuffer(receiveInstantiatedSource);
    });
   });
  } else {
   return instantiateArrayBuffer(receiveInstantiatedSource);
  }
 }
 if (Module["instantiateWasm"]) {
  try {
   var exports = Module["instantiateWasm"](info, receiveInstance);
   exports = Asyncify.instrumentWasmExports(exports);
   return exports;
  } catch (e) {
   err("Module.instantiateWasm callback failed with error: " + e);
   return false;
  }
 }
 instantiateAsync();
 return {};
}

var tempDouble;

var tempI64;

var ASM_CONSTS = [ function() {
 throw "Canceled!";
}, function() {
 postMessage({
  cmd: "processQueuedMainThreadWork"
 });
}, function($0) {
 if (!ENVIRONMENT_IS_PTHREAD) {
  if (!PThread.pthreads[$0] || !PThread.pthreads[$0].worker) {
   return 0;
  }
  PThread.pthreads[$0].worker.postMessage({
   cmd: "processThreadQueue"
  });
 } else {
  postMessage({
   targetThread: $0,
   cmd: "processThreadQueue"
  });
 }
 return 1;
}, function() {
 return !!Module["canvas"];
}, function() {
 noExitRuntime = true;
} ];

function _emscripten_asm_const_iii(code, sig_ptr, argbuf) {
 var sig = AsciiToString(sig_ptr);
 var args = [];
 var align_to = function(ptr, align) {
  return ptr + align - 1 & ~(align - 1);
 };
 var buf = argbuf;
 for (var i = 0; i < sig.length; i++) {
  var c = sig[i];
  if (c == "d" || c == "f") {
   buf = align_to(buf, 8);
   args.push(GROWABLE_HEAP_LOAD_F64(buf | 0));
   buf += 8;
  } else if (c == "i") {
   buf = align_to(buf, 4);
   args.push(GROWABLE_HEAP_LOAD_I32(buf | 0));
   buf += 4;
  }
 }
 return ASM_CONSTS[code].apply(null, args);
}

function initPthreadsJS() {
 PThread.initRuntime();
}

function set_asyncify_stack_size(size) {
 Asyncify.StackSize = size;
}

if (!ENVIRONMENT_IS_PTHREAD) __ATINIT__.push({
 func: function() {
  ___wasm_call_ctors();
 }
});

function demangle(func) {
 return func;
}

function demangleAll(text) {
 var regex = /\b_Z[\w\d_]+/g;
 return text.replace(regex, function(x) {
  var y = demangle(x);
  return x === y ? x : y + " [" + x + "]";
 });
}

var PROCINFO = {
 ppid: 1,
 pid: 42,
 sid: 42,
 pgid: 42
};

var __pthread_ptr = 0;

var __pthread_is_main_runtime_thread = 0;

var __pthread_is_main_browser_thread = 0;

function __register_pthread_ptr(pthreadPtr, isMainBrowserThread, isMainRuntimeThread) {
 pthreadPtr = pthreadPtr | 0;
 isMainBrowserThread = isMainBrowserThread | 0;
 isMainRuntimeThread = isMainRuntimeThread | 0;
 __pthread_ptr = pthreadPtr;
 __pthread_is_main_browser_thread = isMainBrowserThread;
 __pthread_is_main_runtime_thread = isMainRuntimeThread;
}

Module["__register_pthread_ptr"] = __register_pthread_ptr;

var ERRNO_CODES = {
 EPERM: 63,
 ENOENT: 44,
 ESRCH: 71,
 EINTR: 27,
 EIO: 29,
 ENXIO: 60,
 E2BIG: 1,
 ENOEXEC: 45,
 EBADF: 8,
 ECHILD: 12,
 EAGAIN: 6,
 EWOULDBLOCK: 6,
 ENOMEM: 48,
 EACCES: 2,
 EFAULT: 21,
 ENOTBLK: 105,
 EBUSY: 10,
 EEXIST: 20,
 EXDEV: 75,
 ENODEV: 43,
 ENOTDIR: 54,
 EISDIR: 31,
 EINVAL: 28,
 ENFILE: 41,
 EMFILE: 33,
 ENOTTY: 59,
 ETXTBSY: 74,
 EFBIG: 22,
 ENOSPC: 51,
 ESPIPE: 70,
 EROFS: 69,
 EMLINK: 34,
 EPIPE: 64,
 EDOM: 18,
 ERANGE: 68,
 ENOMSG: 49,
 EIDRM: 24,
 ECHRNG: 106,
 EL2NSYNC: 156,
 EL3HLT: 107,
 EL3RST: 108,
 ELNRNG: 109,
 EUNATCH: 110,
 ENOCSI: 111,
 EL2HLT: 112,
 EDEADLK: 16,
 ENOLCK: 46,
 EBADE: 113,
 EBADR: 114,
 EXFULL: 115,
 ENOANO: 104,
 EBADRQC: 103,
 EBADSLT: 102,
 EDEADLOCK: 16,
 EBFONT: 101,
 ENOSTR: 100,
 ENODATA: 116,
 ETIME: 117,
 ENOSR: 118,
 ENONET: 119,
 ENOPKG: 120,
 EREMOTE: 121,
 ENOLINK: 47,
 EADV: 122,
 ESRMNT: 123,
 ECOMM: 124,
 EPROTO: 65,
 EMULTIHOP: 36,
 EDOTDOT: 125,
 EBADMSG: 9,
 ENOTUNIQ: 126,
 EBADFD: 127,
 EREMCHG: 128,
 ELIBACC: 129,
 ELIBBAD: 130,
 ELIBSCN: 131,
 ELIBMAX: 132,
 ELIBEXEC: 133,
 ENOSYS: 52,
 ENOTEMPTY: 55,
 ENAMETOOLONG: 37,
 ELOOP: 32,
 EOPNOTSUPP: 138,
 EPFNOSUPPORT: 139,
 ECONNRESET: 15,
 ENOBUFS: 42,
 EAFNOSUPPORT: 5,
 EPROTOTYPE: 67,
 ENOTSOCK: 57,
 ENOPROTOOPT: 50,
 ESHUTDOWN: 140,
 ECONNREFUSED: 14,
 EADDRINUSE: 3,
 ECONNABORTED: 13,
 ENETUNREACH: 40,
 ENETDOWN: 38,
 ETIMEDOUT: 73,
 EHOSTDOWN: 142,
 EHOSTUNREACH: 23,
 EINPROGRESS: 26,
 EALREADY: 7,
 EDESTADDRREQ: 17,
 EMSGSIZE: 35,
 EPROTONOSUPPORT: 66,
 ESOCKTNOSUPPORT: 137,
 EADDRNOTAVAIL: 4,
 ENETRESET: 39,
 EISCONN: 30,
 ENOTCONN: 53,
 ETOOMANYREFS: 141,
 EUSERS: 136,
 EDQUOT: 19,
 ESTALE: 72,
 ENOTSUP: 138,
 ENOMEDIUM: 148,
 EILSEQ: 25,
 EOVERFLOW: 61,
 ECANCELED: 11,
 ENOTRECOVERABLE: 56,
 EOWNERDEAD: 62,
 ESTRPIPE: 135
};

var __main_thread_futex_wait_address;

if (ENVIRONMENT_IS_PTHREAD) __main_thread_futex_wait_address = PthreadWorkerInit.__main_thread_futex_wait_address; else PthreadWorkerInit.__main_thread_futex_wait_address = __main_thread_futex_wait_address = 1983872;

function _emscripten_futex_wake(addr, count) {
 if (addr <= 0 || addr > HEAP8.length || addr & 3 != 0 || count < 0) return -28;
 if (count == 0) return 0;
 if (count >= 2147483647) count = Infinity;
 var mainThreadWaitAddress = Atomics.load(HEAP32, __main_thread_futex_wait_address >> 2);
 var mainThreadWoken = 0;
 if (mainThreadWaitAddress == addr) {
  var loadedAddr = Atomics.compareExchange(HEAP32, __main_thread_futex_wait_address >> 2, mainThreadWaitAddress, 0);
  if (loadedAddr == mainThreadWaitAddress) {
   --count;
   mainThreadWoken = 1;
   if (count <= 0) return 1;
  }
 }
 var ret = Atomics.notify(HEAP32, addr >> 2, count);
 if (ret >= 0) return ret + mainThreadWoken;
 throw "Atomics.notify returned an unexpected value " + ret;
}

var PThread = {
 MAIN_THREAD_ID: 1,
 mainThreadInfo: {
  schedPolicy: 0,
  schedPrio: 0
 },
 preallocatedWorkers: [],
 unusedWorkers: [],
 runningWorkers: [],
 initRuntime: function() {
  __register_pthread_ptr(PThread.mainThreadBlock, !ENVIRONMENT_IS_WORKER, 1);
  _emscripten_register_main_browser_thread_id(PThread.mainThreadBlock);
 },
 initMainThreadBlock: function() {
  if (ENVIRONMENT_IS_PTHREAD) return undefined;
  var requestedPoolSize = 4;
  PThread.preallocatedWorkers = PThread.createNewWorkers(requestedPoolSize);
  PThread.mainThreadBlock = 1983088;
  for (var i = 0; i < 244 / 4; ++i) GROWABLE_HEAP_STORE_I32((PThread.mainThreadBlock / 4 + i) * 4 | 0, 0);
  GROWABLE_HEAP_STORE_I32(PThread.mainThreadBlock + 24 | 0, PThread.mainThreadBlock);
  var headPtr = PThread.mainThreadBlock + 168;
  GROWABLE_HEAP_STORE_I32(headPtr | 0, headPtr);
  var tlsMemory = 1983344;
  for (var i = 0; i < 128; ++i) GROWABLE_HEAP_STORE_I32((tlsMemory / 4 + i) * 4 | 0, 0);
  Atomics.store(HEAPU32, PThread.mainThreadBlock + 116 >> 2, tlsMemory);
  Atomics.store(HEAPU32, PThread.mainThreadBlock + 52 >> 2, PThread.mainThreadBlock);
  Atomics.store(HEAPU32, PThread.mainThreadBlock + 56 >> 2, PROCINFO.pid);
 },
 pthreads: {},
 exitHandlers: null,
 setThreadStatus: function() {},
 runExitHandlers: function() {
  if (PThread.exitHandlers !== null) {
   while (PThread.exitHandlers.length > 0) {
    PThread.exitHandlers.pop()();
   }
   PThread.exitHandlers = null;
  }
  if (ENVIRONMENT_IS_PTHREAD && threadInfoStruct) ___pthread_tsd_run_dtors();
 },
 threadExit: function(exitCode) {
  var tb = _pthread_self();
  if (tb) {
   Atomics.store(HEAPU32, tb + 4 >> 2, exitCode);
   Atomics.store(HEAPU32, tb + 0 >> 2, 1);
   Atomics.store(HEAPU32, tb + 72 >> 2, 1);
   Atomics.store(HEAPU32, tb + 76 >> 2, 0);
   PThread.runExitHandlers();
   _emscripten_futex_wake(tb + 0, 2147483647);
   __register_pthread_ptr(0, 0, 0);
   threadInfoStruct = 0;
   if (ENVIRONMENT_IS_PTHREAD) {
    postMessage({
     cmd: "exit"
    });
   }
  }
 },
 threadCancel: function() {
  PThread.runExitHandlers();
  Atomics.store(HEAPU32, threadInfoStruct + 4 >> 2, -1);
  Atomics.store(HEAPU32, threadInfoStruct + 0 >> 2, 1);
  _emscripten_futex_wake(threadInfoStruct + 0, 2147483647);
  threadInfoStruct = selfThreadId = 0;
  __register_pthread_ptr(0, 0, 0);
  postMessage({
   cmd: "cancelDone"
  });
 },
 terminateAllThreads: function() {
  for (var t in PThread.pthreads) {
   var pthread = PThread.pthreads[t];
   if (pthread) {
    PThread.freeThreadData(pthread);
    if (pthread.worker) pthread.worker.terminate();
   }
  }
  PThread.pthreads = {};
  for (var i = 0; i < PThread.preallocatedWorkers.length; ++i) {
   var worker = PThread.preallocatedWorkers[i];
   worker.terminate();
  }
  PThread.preallocatedWorkers = [];
  for (var i = 0; i < PThread.unusedWorkers.length; ++i) {
   var worker = PThread.unusedWorkers[i];
   worker.terminate();
  }
  PThread.unusedWorkers = [];
  for (var i = 0; i < PThread.runningWorkers.length; ++i) {
   var worker = PThread.runningWorkers[i];
   var pthread = worker.pthread;
   PThread.freeThreadData(pthread);
   worker.terminate();
  }
  PThread.runningWorkers = [];
 },
 freeThreadData: function(pthread) {
  if (!pthread) return;
  if (pthread.threadInfoStruct) {
   var tlsMemory = GROWABLE_HEAP_LOAD_I32(pthread.threadInfoStruct + 116 | 0);
   GROWABLE_HEAP_STORE_I32(pthread.threadInfoStruct + 116 | 0, 0);
   _free(tlsMemory);
   _free(pthread.threadInfoStruct);
  }
  pthread.threadInfoStruct = 0;
  if (pthread.allocatedOwnStack && pthread.stackBase) _free(pthread.stackBase);
  pthread.stackBase = 0;
  if (pthread.worker) pthread.worker.pthread = null;
 },
 returnWorkerToPool: function(worker) {
  delete PThread.pthreads[worker.pthread.thread];
  PThread.unusedWorkers.push(worker);
  PThread.runningWorkers.splice(PThread.runningWorkers.indexOf(worker), 1);
  PThread.freeThreadData(worker.pthread);
  worker.pthread = undefined;
 },
 receiveObjectTransfer: function(data) {},
 allocateUnusedWorkers: function(numWorkers, onFinishedLoading) {
  if (typeof SharedArrayBuffer === "undefined") return;
  var workers = [];
  var numWorkersToCreate = numWorkers;
  if (PThread.preallocatedWorkers.length > 0) {
   var workersUsed = Math.min(PThread.preallocatedWorkers.length, numWorkers);
   workers = workers.concat(PThread.preallocatedWorkers.splice(0, workersUsed));
   numWorkersToCreate -= workersUsed;
  }
  if (numWorkersToCreate > 0) {
   workers = workers.concat(PThread.createNewWorkers(numWorkersToCreate));
  }
  PThread.attachListenerToWorkers(workers, onFinishedLoading);
  for (var i = 0; i < numWorkers; ++i) {
   var worker = workers[i];
   worker.postMessage({
    cmd: "load",
    urlOrBlob: Module["mainScriptUrlOrBlob"] || _scriptDir,
    wasmMemory: wasmMemory,
    wasmModule: wasmModule,
    DYNAMIC_BASE: DYNAMIC_BASE,
    DYNAMICTOP_PTR: DYNAMICTOP_PTR,
    PthreadWorkerInit: PthreadWorkerInit
   });
   PThread.unusedWorkers.push(worker);
  }
 },
 attachListenerToWorkers: function(workers, onFinishedLoading) {
  var numWorkersLoaded = 0;
  var numWorkers = workers.length;
  for (var i = 0; i < numWorkers; ++i) {
   var worker = workers[i];
   (function(worker) {
    worker.onmessage = function(e) {
     var d = e.data;
     if (worker.pthread) PThread.currentProxiedOperationCallerThread = worker.pthread.threadInfoStruct;
     if (d.targetThread && d.targetThread != _pthread_self()) {
      var thread = PThread.pthreads[d.targetThread];
      if (thread) {
       thread.worker.postMessage(e.data, d.transferList);
      } else {
       console.error('Internal error! Worker sent a message "' + d.cmd + '" to target pthread ' + d.targetThread + ", but that thread no longer exists!");
      }
      PThread.currentProxiedOperationCallerThread = undefined;
      return;
     }
     if (d.cmd === "processQueuedMainThreadWork") {
      _emscripten_main_thread_process_queued_calls();
     } else if (d.cmd === "spawnThread") {
      __spawn_thread(e.data);
     } else if (d.cmd === "cleanupThread") {
      __cleanup_thread(d.thread);
     } else if (d.cmd === "killThread") {
      __kill_thread(d.thread);
     } else if (d.cmd === "cancelThread") {
      __cancel_thread(d.thread);
     } else if (d.cmd === "loaded") {
      worker.loaded = true;
      if (worker.runPthread) {
       worker.runPthread();
       delete worker.runPthread;
      }
      ++numWorkersLoaded;
      if (numWorkersLoaded === numWorkers && onFinishedLoading) {
       onFinishedLoading();
      }
     } else if (d.cmd === "print") {
      out("Thread " + d.threadId + ": " + d.text);
     } else if (d.cmd === "printErr") {
      err("Thread " + d.threadId + ": " + d.text);
     } else if (d.cmd === "alert") {
      alert("Thread " + d.threadId + ": " + d.text);
     } else if (d.cmd === "exit") {
      var detached = worker.pthread && Atomics.load(HEAPU32, worker.pthread.thread + 80 >> 2);
      if (detached) {
       PThread.returnWorkerToPool(worker);
      }
     } else if (d.cmd === "exitProcess") {
      noExitRuntime = false;
      try {
       exit(d.returnCode);
      } catch (e) {
       if (e instanceof ExitStatus) return;
       throw e;
      }
     } else if (d.cmd === "cancelDone") {
      PThread.returnWorkerToPool(worker);
     } else if (d.cmd === "objectTransfer") {
      PThread.receiveObjectTransfer(e.data);
     } else if (e.data.target === "setimmediate") {
      worker.postMessage(e.data);
     } else {
      err("worker sent an unknown command " + d.cmd);
     }
     PThread.currentProxiedOperationCallerThread = undefined;
    };
    worker.onerror = function(e) {
     err("pthread sent an error! " + e.filename + ":" + e.lineno + ": " + e.message);
    };
   })(worker);
  }
 },
 createNewWorkers: function(numWorkers) {
  if (typeof SharedArrayBuffer === "undefined") return [];
  var pthreadMainJs = "coldbrew.worker.js";
  pthreadMainJs = URL.createObjectURL(new Blob(["const BLOB_SCRIPT_SOURCE='"+SCRIPT_SOURCE+"';\n\n"+"// Copyright 2015 The Emscripten Authors.  All rights reserved.\n// Emscripten is available under two separate licenses, the MIT license and the\n// University of Illinois/NCSA Open Source License.  Both these licenses can be\n// found in the LICENSE file.\n\n// Pthread Web Worker startup routine:\n// This is the entry point file that is loaded first by each Web Worker\n// that executes pthreads on the Emscripten application.\n\n// Thread-local:\nvar threadInfoStruct = 0; // Info area for this thread in Emscripten HEAP (shared). If zero, this worker is not currently hosting an executing pthread.\nvar selfThreadId = 0; // The ID of this thread. 0 if not hosting a pthread.\nvar parentThreadId = 0; // The ID of the parent pthread that launched this thread.\n\n// Thread-local: Each thread has its own allocated stack space.\nvar STACK_BASE = 0;\nvar STACKTOP = 0;\nvar STACK_MAX = 0;\n\n// These are system-wide memory area parameters that are set at main runtime startup in main thread, and stay constant throughout the application.\nvar buffer; // All pthreads share the same Emscripten HEAP as SharedArrayBuffer with the main execution thread.\nvar DYNAMICTOP_PTR = 0;\nvar DYNAMIC_BASE = 0;\n\nvar noExitRuntime;\n\nvar PthreadWorkerInit = {};\n\n// performance.now() is specced to return a wallclock time in msecs since that Web Worker/main thread launched. However for pthreads this can cause\n// subtle problems in emscripten_get_now() as this essentially would measure time from pthread_create(), meaning that the clocks between each threads\n// would be wildly out of sync. Therefore sync all pthreads to the clock on the main browser thread, so that different threads see a somewhat\n// coherent clock across each of them (+/- 0.1msecs in testing)\nvar __performance_now_clock_drift = 0;\n\n// Cannot use console.log or console.error in a web worker, since that would risk a browser deadlock! https://bugzilla.mozilla.org/show_bug.cgi?id=1049091\n// Therefore implement custom logging facility for threads running in a worker, which queue the messages to main thread to print.\nvar Module = {};\n\n// These modes need to assign to these variables because of how scoping works in them.\nvar PThread;\nvar HEAPU32;\n\n\n// When error objects propagate from Web Worker to main thread, they lose helpful call stack and thread ID information, so print out errors early here,\n// before that happens.\nthis.addEventListener('error', function(e) {\n  if (e.message.indexOf('SimulateInfiniteLoop') != -1) return e.preventDefault();\n\n  var errorSource = ' in ' + e.filename + ':' + e.lineno + ':' + e.colno;\n  console.error('Pthread ' + selfThreadId + ' uncaught exception' + (e.filename || e.lineno || e.colno ? errorSource : \"\") + ': ' + e.message + '. Error object:');\n  console.error(e.error);\n});\n\nfunction threadPrintErr() {\n  var text = Array.prototype.slice.call(arguments).join(' ');\n  console.error(text);\n  console.error(new Error().stack);\n}\nfunction threadAlert() {\n  var text = Array.prototype.slice.call(arguments).join(' ');\n  postMessage({cmd: 'alert', text: text, threadId: selfThreadId});\n}\nvar err = threadPrintErr;\nthis.alert = threadAlert;\n\n// When using postMessage to send an object, it is processed by the structured clone algorithm.\n// The prototype, and hence methods, on that object is then lost. This function adds back the lost prototype.\n// This does not work with nested objects that has prototypes, but it suffices for WasmSourceMap and WasmOffsetConverter.\nfunction resetPrototype(constructor, attrs) {\n  var object = Object.create(constructor.prototype);\n  for (var key in attrs) {\n    if (attrs.hasOwnProperty(key)) {\n      object[key] = attrs[key];\n    }\n  }\n  return object;\n}\n\nModule['instantiateWasm'] = function(info, receiveInstance) {\n  // Instantiate from the module posted from the main thread.\n  // We can just use sync instantiation in the worker.\n  var instance = new WebAssembly.Instance(wasmModule, info);\n  // We don't need the module anymore; new threads will be spawned from the main thread.\n  wasmModule = null;\n  receiveInstance(instance); // The second 'module' parameter is intentionally null here, we don't need to keep a ref to the Module object from here.\n  return instance.exports;\n};\n\nvar wasmModule;\nvar wasmMemory;\n\nthis.onmessage = function(e) {\n  try {\n    if (e.data.cmd === 'load') { // Preload command that is called once per worker to parse and load the Emscripten code.\n\n      // Initialize the global \"process\"-wide fields:\n      Module['DYNAMIC_BASE'] = DYNAMIC_BASE = e.data.DYNAMIC_BASE;\n      Module['DYNAMICTOP_PTR'] = DYNAMICTOP_PTR = e.data.DYNAMICTOP_PTR;\n\n      // The Wasm module will have import fields for STACKTOP and STACK_MAX. At 'load' stage of Worker startup, we are just\n      // spawning this Web Worker to act as a host for future created pthreads, i.e. we do not have a pthread to start up here yet.\n      // (A single Worker can also host multiple pthreads throughout its lifetime, shutting down a pthread will not shut down its hosting Worker,\n      // but the Worker is reused for later spawned pthreads). The 'run' stage below will actually start running a pthread.\n      // The stack space for a pthread is allocated and deallocated when a pthread is actually run, not yet at Worker 'load' stage.\n      // However, the WebAssembly module we are loading up here has import fields for STACKTOP and STACK_MAX, which it needs to get filled in\n      // immediately at Wasm Module instantiation time. The values of these will not get used until pthread is actually running some code, so\n      // we'll proceed to set up temporary invalid values for these fields for import purposes. Then whenever a pthread is launched at 'run' stage\n      // below, these values are rewritten to establish proper stack area for the particular pthread.\n      Module['STACK_MAX'] = Module['STACKTOP']  = 0x7FFFFFFF;\n\n      // Module and memory were sent from main thread\n      Module['wasmModule'] = wasmModule = e.data.wasmModule;\n      Module['wasmMemory'] = wasmMemory = e.data.wasmMemory;\n      Module['buffer'] = buffer = Module['wasmMemory'].buffer;\n\n      Module['PthreadWorkerInit'] = PthreadWorkerInit = e.data.PthreadWorkerInit;\n      Module['ENVIRONMENT_IS_PTHREAD'] = true;\n\n      if (typeof e.data.urlOrBlob === 'string') {\n        importScripts(e.data.urlOrBlob);\n      } else {\n        var objectUrl = URL.createObjectURL(e.data.urlOrBlob);\n        importScripts(objectUrl);\n        URL.revokeObjectURL(objectUrl);\n      }\n      Module = _Coldbrew_coldbrew_internal_(Module);\n      PThread = Module['PThread'];\n      HEAPU32 = Module['HEAPU32'];\n\n      if (typeof FS !== 'undefined' && typeof FS.createStandardStreams === 'function') FS.createStandardStreams();\n      postMessage({ cmd: 'loaded' });\n    } else if (e.data.cmd === 'objectTransfer') {\n      PThread.receiveObjectTransfer(e.data);\n    } else if (e.data.cmd === 'run') { // This worker was idle, and now should start executing its pthread entry point.\n      __performance_now_clock_drift = performance.now() - e.data.time; // Sync up to the clock of the main thread.\n      threadInfoStruct = e.data.threadInfoStruct;\n      Module['__register_pthread_ptr'](threadInfoStruct, /*isMainBrowserThread=*/0, /*isMainRuntimeThread=*/0); // Pass the thread address inside the asm.js scope to store it for fast access that avoids the need for a FFI out.\n      selfThreadId = e.data.selfThreadId;\n      parentThreadId = e.data.parentThreadId;\n      // Establish the stack frame for this thread in global scope\n      // The stack grows downwards\n      var max = e.data.stackBase;\n      var top = e.data.stackBase + e.data.stackSize;\n      Module['STACK_BASE'] = STACK_BASE = top;\n      Module['STACKTOP'] = STACKTOP = top;\n      Module['STACK_MAX'] = STACK_MAX = max;\n      // Call inside asm.js/wasm module to set up the stack frame for this pthread in asm.js/wasm module scope\n      Module['establishStackSpace'](e.data.stackBase, e.data.stackBase + e.data.stackSize);\n      // Also call inside JS module to set up the stack frame for this pthread in JS module scope\n      Module['establishStackSpaceInJsModule'](e.data.stackBase, e.data.stackBase + e.data.stackSize);\n      Module['_emscripten_tls_init']();\n\n      PThread.receiveObjectTransfer(e.data);\n      PThread.setThreadStatus(Module['_pthread_self'](), 1/*EM_THREAD_STATUS_RUNNING*/);\n\n      try {\n        // pthread entry points are always of signature 'void *ThreadMain(void *arg)'\n        // Native codebases sometimes spawn threads with other thread entry point signatures,\n        // such as void ThreadMain(void *arg), void *ThreadMain(), or void ThreadMain().\n        // That is not acceptable per C/C++ specification, but x86 compiler ABI extensions\n        // enable that to work. If you find the following line to crash, either change the signature\n        // to \"proper\" void *ThreadMain(void *arg) form, or try linking with the Emscripten linker\n        // flag -s EMULATE_FUNCTION_POINTER_CASTS=1 to add in emulation for this x86 ABI extension.\n        var result = Module['dynCall_ii'](e.data.start_routine, e.data.arg);\n\n\n      } catch(e) {\n        if (e === 'Canceled!') {\n          PThread.threadCancel();\n          return;\n        } else if (e === 'SimulateInfiniteLoop' || e === 'pthread_exit') {\n          return;\n        } else {\n          Atomics.store(HEAPU32, (threadInfoStruct + 4 /*C_STRUCTS.pthread.threadExitCode*/ ) >> 2, (e instanceof Module['ExitStatus']) ? e.status : -2 /*A custom entry specific to Emscripten denoting that the thread crashed.*/);\n          Atomics.store(HEAPU32, (threadInfoStruct + 0 /*C_STRUCTS.pthread.threadStatus*/ ) >> 2, 1); // Mark the thread as no longer running.\n          Module['_emscripten_futex_wake'](threadInfoStruct + 0 /*C_STRUCTS.pthread.threadStatus*/, 0x7FFFFFFF/*INT_MAX*/); // Wake all threads waiting on this thread to finish.\n          if (!(e instanceof Module['ExitStatus'])) throw e;\n        }\n      }\n      // The thread might have finished without calling pthread_exit(). If so, then perform the exit operation ourselves.\n      // (This is a no-op if explicit pthread_exit() had been called prior.)\n      if (!noExitRuntime) PThread.threadExit(result);\n    } else if (e.data.cmd === 'cancel') { // Main thread is asking for a pthread_cancel() on this thread.\n      if (threadInfoStruct && PThread.thisThreadCancelState == 0/*PTHREAD_CANCEL_ENABLE*/) {\n        PThread.threadCancel();\n      }\n    } else if (e.data.target === 'setimmediate') {\n      // no-op\n    } else if (e.data.cmd === 'processThreadQueue') {\n      if (threadInfoStruct) { // If this thread is actually running?\n        Module['_emscripten_current_thread_process_queued_calls']();\n      }\n    } else {\n      err('worker.js received unknown command ' + e.data.cmd);\n      console.error(e.data);\n    }\n  } catch(e) {\n    console.error('worker.js onmessage() captured an uncaught exception: ' + e);\n    console.error(e.stack);\n    throw e;\n  }\n};\n\n\n"], {type: 'application/javascript'}));
  var newWorkers = [];
  for (var i = 0; i < numWorkers; ++i) {
   newWorkers.push(new Worker(pthreadMainJs));
  }
  return newWorkers;
 },
 getNewWorker: function() {
  if (PThread.unusedWorkers.length == 0) PThread.allocateUnusedWorkers(1);
  if (PThread.unusedWorkers.length > 0) return PThread.unusedWorkers.pop(); else return null;
 },
 busySpinWait: function(msecs) {
  var t = performance.now() + msecs;
  while (performance.now() < t) {}
 }
};

function establishStackSpaceInJsModule(stackBase, stackMax) {
 STACK_BASE = stackBase;
 STACKTOP = stackMax;
 STACK_MAX = stackBase;
}

Module["establishStackSpaceInJsModule"] = establishStackSpaceInJsModule;

function jsStackTrace() {
 var err = new Error();
 if (!err.stack) {
  try {
   throw new Error(0);
  } catch (e) {
   err = e;
  }
  if (!err.stack) {
   return "(no stack trace available)";
  }
 }
 return err.stack.toString();
}

function stackTrace() {
 var js = jsStackTrace();
 if (Module["extraStackTrace"]) js += "\n" + Module["extraStackTrace"]();
 return demangleAll(js);
}

function ___assert_fail(condition, filename, line, func) {
 abort("Assertion failed: " + UTF8ToString(condition) + ", at: " + [ filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function" ]);
}

function ___call_main(argc, argv) {
 var returnCode = _main(argc, argv);
 if (!noExitRuntime) postMessage({
  cmd: "exitProcess",
  returnCode: returnCode
 });
 return returnCode;
}

function _emscripten_get_now() {
 abort();
}

function _emscripten_get_now_is_monotonic() {
 return 0 || ENVIRONMENT_IS_NODE || typeof dateNow !== "undefined" || typeof performance === "object" && performance && typeof performance["now"] === "function";
}

function ___setErrNo(value) {
 if (Module["___errno_location"]) GROWABLE_HEAP_STORE_I32(Module["___errno_location"]() | 0, value);
 return value;
}

function _clock_gettime(clk_id, tp) {
 var now;
 if (clk_id === 0) {
  now = Date.now();
 } else if (clk_id === 1 && _emscripten_get_now_is_monotonic()) {
  now = _emscripten_get_now();
 } else {
  ___setErrNo(28);
  return -1;
 }
 GROWABLE_HEAP_STORE_I32(tp | 0, now / 1e3 | 0);
 GROWABLE_HEAP_STORE_I32(tp + 4 | 0, now % 1e3 * 1e3 * 1e3 | 0);
 return 0;
}

function ___clock_gettime(a0, a1) {
 return _clock_gettime(a0, a1);
}

function ___libc_current_sigrtmax() {
 return 0;
}

function ___libc_current_sigrtmin() {
 return 0;
}

function ___lock() {}

function ___map_file(pathname, size) {
 ___setErrNo(63);
 return -1;
}

var PATH = {
 splitPath: function(filename) {
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  return splitPathRe.exec(filename).slice(1);
 },
 normalizeArray: function(parts, allowAboveRoot) {
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
   var last = parts[i];
   if (last === ".") {
    parts.splice(i, 1);
   } else if (last === "..") {
    parts.splice(i, 1);
    up++;
   } else if (up) {
    parts.splice(i, 1);
    up--;
   }
  }
  if (allowAboveRoot) {
   for (;up; up--) {
    parts.unshift("..");
   }
  }
  return parts;
 },
 normalize: function(path) {
  var isAbsolute = path.charAt(0) === "/", trailingSlash = path.substr(-1) === "/";
  path = PATH.normalizeArray(path.split("/").filter(function(p) {
   return !!p;
  }), !isAbsolute).join("/");
  if (!path && !isAbsolute) {
   path = ".";
  }
  if (path && trailingSlash) {
   path += "/";
  }
  return (isAbsolute ? "/" : "") + path;
 },
 dirname: function(path) {
  var result = PATH.splitPath(path), root = result[0], dir = result[1];
  if (!root && !dir) {
   return ".";
  }
  if (dir) {
   dir = dir.substr(0, dir.length - 1);
  }
  return root + dir;
 },
 basename: function(path) {
  if (path === "/") return "/";
  var lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return path;
  return path.substr(lastSlash + 1);
 },
 extname: function(path) {
  return PATH.splitPath(path)[3];
 },
 join: function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return PATH.normalize(paths.join("/"));
 },
 join2: function(l, r) {
  return PATH.normalize(l + "/" + r);
 }
};

var PATH_FS = {
 resolve: function() {
  var resolvedPath = "", resolvedAbsolute = false;
  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
   var path = i >= 0 ? arguments[i] : FS.cwd();
   if (typeof path !== "string") {
    throw new TypeError("Arguments to path.resolve must be strings");
   } else if (!path) {
    return "";
   }
   resolvedPath = path + "/" + resolvedPath;
   resolvedAbsolute = path.charAt(0) === "/";
  }
  resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(function(p) {
   return !!p;
  }), !resolvedAbsolute).join("/");
  return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
 },
 relative: function(from, to) {
  from = PATH_FS.resolve(from).substr(1);
  to = PATH_FS.resolve(to).substr(1);
  function trim(arr) {
   var start = 0;
   for (;start < arr.length; start++) {
    if (arr[start] !== "") break;
   }
   var end = arr.length - 1;
   for (;end >= 0; end--) {
    if (arr[end] !== "") break;
   }
   if (start > end) return [];
   return arr.slice(start, end - start + 1);
  }
  var fromParts = trim(from.split("/"));
  var toParts = trim(to.split("/"));
  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
   if (fromParts[i] !== toParts[i]) {
    samePartsLength = i;
    break;
   }
  }
  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
   outputParts.push("..");
  }
  outputParts = outputParts.concat(toParts.slice(samePartsLength));
  return outputParts.join("/");
 }
};

var TTY = {
 ttys: [],
 init: function() {},
 shutdown: function() {},
 register: function(dev, ops) {
  TTY.ttys[dev] = {
   input: [],
   output: [],
   ops: ops
  };
  FS.registerDevice(dev, TTY.stream_ops);
 },
 stream_ops: {
  open: function(stream) {
   var tty = TTY.ttys[stream.node.rdev];
   if (!tty) {
    throw new FS.ErrnoError(43);
   }
   stream.tty = tty;
   stream.seekable = false;
  },
  close: function(stream) {
   stream.tty.ops.flush(stream.tty);
  },
  flush: function(stream) {
   stream.tty.ops.flush(stream.tty);
  },
  read: function(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.get_char) {
    throw new FS.ErrnoError(60);
   }
   var bytesRead = 0;
   for (var i = 0; i < length; i++) {
    var result;
    try {
     result = stream.tty.ops.get_char(stream.tty);
    } catch (e) {
     throw new FS.ErrnoError(29);
    }
    if (result === undefined && bytesRead === 0) {
     throw new FS.ErrnoError(6);
    }
    if (result === null || result === undefined) break;
    bytesRead++;
    buffer[offset + i] = result;
   }
   if (bytesRead) {
    stream.node.timestamp = Date.now();
   }
   return bytesRead;
  },
  write: function(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.put_char) {
    throw new FS.ErrnoError(60);
   }
   try {
    for (var i = 0; i < length; i++) {
     stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
    }
   } catch (e) {
    throw new FS.ErrnoError(29);
   }
   if (length) {
    stream.node.timestamp = Date.now();
   }
   return i;
  }
 },
 default_tty_ops: {
  get_char: function(tty) {
   if (!tty.input.length) {
    var result = null;
    if (ENVIRONMENT_IS_NODE) {
     var BUFSIZE = 256;
     var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);
     var bytesRead = 0;
     try {
      bytesRead = fs.readSync(process.stdin.fd, buf, 0, BUFSIZE, null);
     } catch (e) {
      if (e.toString().indexOf("EOF") != -1) bytesRead = 0; else throw e;
     }
     if (bytesRead > 0) {
      result = buf.slice(0, bytesRead).toString("utf-8");
     } else {
      result = null;
     }
    } else if (typeof window != "undefined" && typeof window.prompt == "function") {
     result = window.prompt("Input: ");
     if (result !== null) {
      result += "\n";
     }
    } else if (typeof readline == "function") {
     result = readline();
     if (result !== null) {
      result += "\n";
     }
    }
    if (!result) {
     return null;
    }
    tty.input = intArrayFromString(result, true);
   }
   return tty.input.shift();
  },
  put_char: function(tty, val) {
   if (val === null || val === 10) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  flush: function(tty) {
   if (tty.output && tty.output.length > 0) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  }
 },
 default_tty1_ops: {
  put_char: function(tty, val) {
   if (val === null || val === 10) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  flush: function(tty) {
   if (tty.output && tty.output.length > 0) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  }
 }
};

var MEMFS = {
 ops_table: null,
 mount: function(mount) {
  return MEMFS.createNode(null, "/", 16384 | 511, 0);
 },
 createNode: function(parent, name, mode, dev) {
  if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
   throw new FS.ErrnoError(63);
  }
  if (!MEMFS.ops_table) {
   MEMFS.ops_table = {
    dir: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr,
      lookup: MEMFS.node_ops.lookup,
      mknod: MEMFS.node_ops.mknod,
      rename: MEMFS.node_ops.rename,
      unlink: MEMFS.node_ops.unlink,
      rmdir: MEMFS.node_ops.rmdir,
      readdir: MEMFS.node_ops.readdir,
      symlink: MEMFS.node_ops.symlink
     },
     stream: {
      llseek: MEMFS.stream_ops.llseek
     }
    },
    file: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr
     },
     stream: {
      llseek: MEMFS.stream_ops.llseek,
      read: MEMFS.stream_ops.read,
      write: MEMFS.stream_ops.write,
      allocate: MEMFS.stream_ops.allocate,
      mmap: MEMFS.stream_ops.mmap,
      msync: MEMFS.stream_ops.msync
     }
    },
    link: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr,
      readlink: MEMFS.node_ops.readlink
     },
     stream: {}
    },
    chrdev: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr
     },
     stream: FS.chrdev_stream_ops
    }
   };
  }
  var node = FS.createNode(parent, name, mode, dev);
  if (FS.isDir(node.mode)) {
   node.node_ops = MEMFS.ops_table.dir.node;
   node.stream_ops = MEMFS.ops_table.dir.stream;
   node.contents = {};
  } else if (FS.isFile(node.mode)) {
   node.node_ops = MEMFS.ops_table.file.node;
   node.stream_ops = MEMFS.ops_table.file.stream;
   node.usedBytes = 0;
   node.contents = null;
  } else if (FS.isLink(node.mode)) {
   node.node_ops = MEMFS.ops_table.link.node;
   node.stream_ops = MEMFS.ops_table.link.stream;
  } else if (FS.isChrdev(node.mode)) {
   node.node_ops = MEMFS.ops_table.chrdev.node;
   node.stream_ops = MEMFS.ops_table.chrdev.stream;
  }
  node.timestamp = Date.now();
  if (parent) {
   parent.contents[name] = node;
  }
  return node;
 },
 getFileDataAsRegularArray: function(node) {
  if (node.contents && node.contents.subarray) {
   var arr = [];
   for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
   return arr;
  }
  return node.contents;
 },
 getFileDataAsTypedArray: function(node) {
  if (!node.contents) return new Uint8Array();
  if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
  return new Uint8Array(node.contents);
 },
 expandFileStorage: function(node, newCapacity) {
  var prevCapacity = node.contents ? node.contents.length : 0;
  if (prevCapacity >= newCapacity) return;
  var CAPACITY_DOUBLING_MAX = 1024 * 1024;
  newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) | 0);
  if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
  var oldContents = node.contents;
  node.contents = new Uint8Array(newCapacity);
  if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
  return;
 },
 resizeFileStorage: function(node, newSize) {
  if (node.usedBytes == newSize) return;
  if (newSize == 0) {
   node.contents = null;
   node.usedBytes = 0;
   return;
  }
  if (!node.contents || node.contents.subarray) {
   var oldContents = node.contents;
   node.contents = new Uint8Array(new ArrayBuffer(newSize));
   if (oldContents) {
    node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
   }
   node.usedBytes = newSize;
   return;
  }
  if (!node.contents) node.contents = [];
  if (node.contents.length > newSize) node.contents.length = newSize; else while (node.contents.length < newSize) node.contents.push(0);
  node.usedBytes = newSize;
 },
 node_ops: {
  getattr: function(node) {
   var attr = {};
   attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
   attr.ino = node.id;
   attr.mode = node.mode;
   attr.nlink = 1;
   attr.uid = 0;
   attr.gid = 0;
   attr.rdev = node.rdev;
   if (FS.isDir(node.mode)) {
    attr.size = 4096;
   } else if (FS.isFile(node.mode)) {
    attr.size = node.usedBytes;
   } else if (FS.isLink(node.mode)) {
    attr.size = node.link.length;
   } else {
    attr.size = 0;
   }
   attr.atime = new Date(node.timestamp);
   attr.mtime = new Date(node.timestamp);
   attr.ctime = new Date(node.timestamp);
   attr.blksize = 4096;
   attr.blocks = Math.ceil(attr.size / attr.blksize);
   return attr;
  },
  setattr: function(node, attr) {
   if (attr.mode !== undefined) {
    node.mode = attr.mode;
   }
   if (attr.timestamp !== undefined) {
    node.timestamp = attr.timestamp;
   }
   if (attr.size !== undefined) {
    MEMFS.resizeFileStorage(node, attr.size);
   }
  },
  lookup: function(parent, name) {
   throw FS.genericErrors[44];
  },
  mknod: function(parent, name, mode, dev) {
   return MEMFS.createNode(parent, name, mode, dev);
  },
  rename: function(old_node, new_dir, new_name) {
   if (FS.isDir(old_node.mode)) {
    var new_node;
    try {
     new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}
    if (new_node) {
     for (var i in new_node.contents) {
      throw new FS.ErrnoError(55);
     }
    }
   }
   delete old_node.parent.contents[old_node.name];
   old_node.name = new_name;
   new_dir.contents[new_name] = old_node;
   old_node.parent = new_dir;
  },
  unlink: function(parent, name) {
   delete parent.contents[name];
  },
  rmdir: function(parent, name) {
   var node = FS.lookupNode(parent, name);
   for (var i in node.contents) {
    throw new FS.ErrnoError(55);
   }
   delete parent.contents[name];
  },
  readdir: function(node) {
   var entries = [ ".", ".." ];
   for (var key in node.contents) {
    if (!node.contents.hasOwnProperty(key)) {
     continue;
    }
    entries.push(key);
   }
   return entries;
  },
  symlink: function(parent, newname, oldpath) {
   var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
   node.link = oldpath;
   return node;
  },
  readlink: function(node) {
   if (!FS.isLink(node.mode)) {
    throw new FS.ErrnoError(28);
   }
   return node.link;
  }
 },
 stream_ops: {
  read: function(stream, buffer, offset, length, position) {
   var contents = stream.node.contents;
   if (position >= stream.node.usedBytes) return 0;
   var size = Math.min(stream.node.usedBytes - position, length);
   if (size > 8 && contents.subarray) {
    buffer.set(contents.subarray(position, position + size), offset);
   } else {
    for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
   }
   return size;
  },
  write: function(stream, buffer, offset, length, position, canOwn) {
   canOwn = false;
   if (!length) return 0;
   var node = stream.node;
   node.timestamp = Date.now();
   if (buffer.subarray && (!node.contents || node.contents.subarray)) {
    if (canOwn) {
     node.contents = buffer.subarray(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (node.usedBytes === 0 && position === 0) {
     node.contents = new Uint8Array(buffer.subarray(offset, offset + length));
     node.usedBytes = length;
     return length;
    } else if (position + length <= node.usedBytes) {
     node.contents.set(buffer.subarray(offset, offset + length), position);
     return length;
    }
   }
   MEMFS.expandFileStorage(node, position + length);
   if (node.contents.subarray && buffer.subarray) node.contents.set(buffer.subarray(offset, offset + length), position); else {
    for (var i = 0; i < length; i++) {
     node.contents[position + i] = buffer[offset + i];
    }
   }
   node.usedBytes = Math.max(node.usedBytes, position + length);
   return length;
  },
  llseek: function(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     position += stream.node.usedBytes;
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(28);
   }
   return position;
  },
  allocate: function(stream, offset, length) {
   MEMFS.expandFileStorage(stream.node, offset + length);
   stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
  },
  mmap: function(stream, buffer, offset, length, position, prot, flags) {
   if (!FS.isFile(stream.node.mode)) {
    throw new FS.ErrnoError(43);
   }
   var ptr;
   var allocated;
   var contents = stream.node.contents;
   if (!(flags & 2) && (contents.buffer === buffer || contents.buffer === buffer.buffer)) {
    allocated = false;
    ptr = contents.byteOffset;
   } else {
    if (position > 0 || position + length < stream.node.usedBytes) {
     if (contents.subarray) {
      contents = contents.subarray(position, position + length);
     } else {
      contents = Array.prototype.slice.call(contents, position, position + length);
     }
    }
    allocated = true;
    var fromHeap = buffer.buffer == HEAP8.buffer;
    ptr = _malloc(length);
    if (!ptr) {
     throw new FS.ErrnoError(48);
    }
    (fromHeap ? HEAP8 : buffer).set(contents, ptr);
   }
   return {
    ptr: ptr,
    allocated: allocated
   };
  },
  msync: function(stream, buffer, offset, length, mmapFlags) {
   if (!FS.isFile(stream.node.mode)) {
    throw new FS.ErrnoError(43);
   }
   if (mmapFlags & 2) {
    return 0;
   }
   var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
   return 0;
  }
 }
};

var IDBFS = {
 dbs: {},
 indexedDB: function() {
  if (typeof indexedDB !== "undefined") return indexedDB;
  var ret = null;
  if (typeof window === "object") ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  assert(ret, "IDBFS used, but indexedDB not supported");
  return ret;
 },
 DB_VERSION: 21,
 DB_STORE_NAME: "FILE_DATA",
 mount: function(mount) {
  return MEMFS.mount.apply(null, arguments);
 },
 syncfs: function(mount, populate, callback) {
  IDBFS.getLocalSet(mount, function(err, local) {
   if (err) return callback(err);
   IDBFS.getRemoteSet(mount, function(err, remote) {
    if (err) return callback(err);
    var src = populate ? remote : local;
    var dst = populate ? local : remote;
    IDBFS.reconcile(src, dst, callback);
   });
  });
 },
 getDB: function(name, callback) {
  var db = IDBFS.dbs[name];
  if (db) {
   return callback(null, db);
  }
  var req;
  try {
   req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
  } catch (e) {
   return callback(e);
  }
  if (!req) {
   return callback("Unable to connect to IndexedDB");
  }
  req.onupgradeneeded = function(e) {
   var db = e.target.result;
   var transaction = e.target.transaction;
   var fileStore;
   if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
    fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
   } else {
    fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
   }
   if (!fileStore.indexNames.contains("timestamp")) {
    fileStore.createIndex("timestamp", "timestamp", {
     unique: false
    });
   }
  };
  req.onsuccess = function() {
   db = req.result;
   IDBFS.dbs[name] = db;
   callback(null, db);
  };
  req.onerror = function(e) {
   callback(this.error);
   e.preventDefault();
  };
 },
 getLocalSet: function(mount, callback) {
  var entries = {};
  function isRealDir(p) {
   return p !== "." && p !== "..";
  }
  function toAbsolute(root) {
   return function(p) {
    return PATH.join2(root, p);
   };
  }
  var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  while (check.length) {
   var path = check.pop();
   var stat;
   try {
    stat = FS.stat(path);
   } catch (e) {
    return callback(e);
   }
   if (FS.isDir(stat.mode)) {
    check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
   }
   entries[path] = {
    timestamp: stat.mtime
   };
  }
  return callback(null, {
   type: "local",
   entries: entries
  });
 },
 getRemoteSet: function(mount, callback) {
  var entries = {};
  IDBFS.getDB(mount.mountpoint, function(err, db) {
   if (err) return callback(err);
   try {
    var transaction = db.transaction([ IDBFS.DB_STORE_NAME ], "readonly");
    transaction.onerror = function(e) {
     callback(this.error);
     e.preventDefault();
    };
    var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
    var index = store.index("timestamp");
    index.openKeyCursor().onsuccess = function(event) {
     var cursor = event.target.result;
     if (!cursor) {
      return callback(null, {
       type: "remote",
       db: db,
       entries: entries
      });
     }
     entries[cursor.primaryKey] = {
      timestamp: cursor.key
     };
     cursor.continue();
    };
   } catch (e) {
    return callback(e);
   }
  });
 },
 loadLocalEntry: function(path, callback) {
  var stat, node;
  try {
   var lookup = FS.lookupPath(path);
   node = lookup.node;
   stat = FS.stat(path);
  } catch (e) {
   return callback(e);
  }
  if (FS.isDir(stat.mode)) {
   return callback(null, {
    timestamp: stat.mtime,
    mode: stat.mode
   });
  } else if (FS.isFile(stat.mode)) {
   node.contents = MEMFS.getFileDataAsTypedArray(node);
   return callback(null, {
    timestamp: stat.mtime,
    mode: stat.mode,
    contents: node.contents
   });
  } else {
   return callback(new Error("node type not supported"));
  }
 },
 storeLocalEntry: function(path, entry, callback) {
  try {
   if (FS.isDir(entry.mode)) {
    FS.mkdir(path, entry.mode);
   } else if (FS.isFile(entry.mode)) {
    FS.writeFile(path, entry.contents, {
     canOwn: true
    });
   } else {
    return callback(new Error("node type not supported"));
   }
   FS.chmod(path, entry.mode);
   FS.utime(path, entry.timestamp, entry.timestamp);
  } catch (e) {
   return callback(e);
  }
  callback(null);
 },
 removeLocalEntry: function(path, callback) {
  try {
   var lookup = FS.lookupPath(path);
   var stat = FS.stat(path);
   if (FS.isDir(stat.mode)) {
    FS.rmdir(path);
   } else if (FS.isFile(stat.mode)) {
    FS.unlink(path);
   }
  } catch (e) {
   return callback(e);
  }
  callback(null);
 },
 loadRemoteEntry: function(store, path, callback) {
  var req = store.get(path);
  req.onsuccess = function(event) {
   callback(null, event.target.result);
  };
  req.onerror = function(e) {
   callback(this.error);
   e.preventDefault();
  };
 },
 storeRemoteEntry: function(store, path, entry, callback) {
  var req = store.put(entry, path);
  req.onsuccess = function() {
   callback(null);
  };
  req.onerror = function(e) {
   callback(this.error);
   e.preventDefault();
  };
 },
 removeRemoteEntry: function(store, path, callback) {
  var req = store.delete(path);
  req.onsuccess = function() {
   callback(null);
  };
  req.onerror = function(e) {
   callback(this.error);
   e.preventDefault();
  };
 },
 reconcile: function(src, dst, callback) {
  var total = 0;
  var create = [];
  Object.keys(src.entries).forEach(function(key) {
   var e = src.entries[key];
   var e2 = dst.entries[key];
   if (!e2 || e.timestamp > e2.timestamp) {
    create.push(key);
    total++;
   }
  });
  var remove = [];
  Object.keys(dst.entries).forEach(function(key) {
   var e = dst.entries[key];
   var e2 = src.entries[key];
   if (!e2) {
    remove.push(key);
    total++;
   }
  });
  if (!total) {
   return callback(null);
  }
  var errored = false;
  var db = src.type === "remote" ? src.db : dst.db;
  var transaction = db.transaction([ IDBFS.DB_STORE_NAME ], "readwrite");
  var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  function done(err) {
   if (err && !errored) {
    errored = true;
    return callback(err);
   }
  }
  transaction.onerror = function(e) {
   done(this.error);
   e.preventDefault();
  };
  transaction.oncomplete = function(e) {
   if (!errored) {
    callback(null);
   }
  };
  create.sort().forEach(function(path) {
   if (dst.type === "local") {
    IDBFS.loadRemoteEntry(store, path, function(err, entry) {
     if (err) return done(err);
     IDBFS.storeLocalEntry(path, entry, done);
    });
   } else {
    IDBFS.loadLocalEntry(path, function(err, entry) {
     if (err) return done(err);
     IDBFS.storeRemoteEntry(store, path, entry, done);
    });
   }
  });
  remove.sort().reverse().forEach(function(path) {
   if (dst.type === "local") {
    IDBFS.removeLocalEntry(path, done);
   } else {
    IDBFS.removeRemoteEntry(store, path, done);
   }
  });
 }
};

var NODEFS = {
 isWindows: false,
 staticInit: function() {
  NODEFS.isWindows = !!process.platform.match(/^win/);
  var flags = process["binding"]("constants");
  if (flags["fs"]) {
   flags = flags["fs"];
  }
  NODEFS.flagsForNodeMap = {
   1024: flags["O_APPEND"],
   64: flags["O_CREAT"],
   128: flags["O_EXCL"],
   0: flags["O_RDONLY"],
   2: flags["O_RDWR"],
   4096: flags["O_SYNC"],
   512: flags["O_TRUNC"],
   1: flags["O_WRONLY"]
  };
 },
 bufferFrom: function(arrayBuffer) {
  return Buffer["alloc"] ? Buffer.from(arrayBuffer) : new Buffer(arrayBuffer);
 },
 convertNodeCode: function(e) {
  var code = e.code;
  assert(code in ERRNO_CODES);
  return ERRNO_CODES[code];
 },
 mount: function(mount) {
  assert(ENVIRONMENT_HAS_NODE);
  return NODEFS.createNode(null, "/", NODEFS.getMode(mount.opts.root), 0);
 },
 createNode: function(parent, name, mode, dev) {
  if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
   throw new FS.ErrnoError(28);
  }
  var node = FS.createNode(parent, name, mode);
  node.node_ops = NODEFS.node_ops;
  node.stream_ops = NODEFS.stream_ops;
  return node;
 },
 getMode: function(path) {
  var stat;
  try {
   stat = fs.lstatSync(path);
   if (NODEFS.isWindows) {
    stat.mode = stat.mode | (stat.mode & 292) >> 2;
   }
  } catch (e) {
   if (!e.code) throw e;
   throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
  }
  return stat.mode;
 },
 realPath: function(node) {
  var parts = [];
  while (node.parent !== node) {
   parts.push(node.name);
   node = node.parent;
  }
  parts.push(node.mount.opts.root);
  parts.reverse();
  return PATH.join.apply(null, parts);
 },
 flagsForNode: function(flags) {
  flags &= ~2097152;
  flags &= ~2048;
  flags &= ~32768;
  flags &= ~524288;
  var newFlags = 0;
  for (var k in NODEFS.flagsForNodeMap) {
   if (flags & k) {
    newFlags |= NODEFS.flagsForNodeMap[k];
    flags ^= k;
   }
  }
  if (!flags) {
   return newFlags;
  } else {
   throw new FS.ErrnoError(28);
  }
 },
 node_ops: {
  getattr: function(node) {
   var path = NODEFS.realPath(node);
   var stat;
   try {
    stat = fs.lstatSync(path);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
   if (NODEFS.isWindows && !stat.blksize) {
    stat.blksize = 4096;
   }
   if (NODEFS.isWindows && !stat.blocks) {
    stat.blocks = (stat.size + stat.blksize - 1) / stat.blksize | 0;
   }
   return {
    dev: stat.dev,
    ino: stat.ino,
    mode: stat.mode,
    nlink: stat.nlink,
    uid: stat.uid,
    gid: stat.gid,
    rdev: stat.rdev,
    size: stat.size,
    atime: stat.atime,
    mtime: stat.mtime,
    ctime: stat.ctime,
    blksize: stat.blksize,
    blocks: stat.blocks
   };
  },
  setattr: function(node, attr) {
   var path = NODEFS.realPath(node);
   try {
    if (attr.mode !== undefined) {
     fs.chmodSync(path, attr.mode);
     node.mode = attr.mode;
    }
    if (attr.timestamp !== undefined) {
     var date = new Date(attr.timestamp);
     fs.utimesSync(path, date, date);
    }
    if (attr.size !== undefined) {
     fs.truncateSync(path, attr.size);
    }
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  },
  lookup: function(parent, name) {
   var path = PATH.join2(NODEFS.realPath(parent), name);
   var mode = NODEFS.getMode(path);
   return NODEFS.createNode(parent, name, mode);
  },
  mknod: function(parent, name, mode, dev) {
   var node = NODEFS.createNode(parent, name, mode, dev);
   var path = NODEFS.realPath(node);
   try {
    if (FS.isDir(node.mode)) {
     fs.mkdirSync(path, node.mode);
    } else {
     fs.writeFileSync(path, "", {
      mode: node.mode
     });
    }
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
   return node;
  },
  rename: function(oldNode, newDir, newName) {
   var oldPath = NODEFS.realPath(oldNode);
   var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
   try {
    fs.renameSync(oldPath, newPath);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  },
  unlink: function(parent, name) {
   var path = PATH.join2(NODEFS.realPath(parent), name);
   try {
    fs.unlinkSync(path);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  },
  rmdir: function(parent, name) {
   var path = PATH.join2(NODEFS.realPath(parent), name);
   try {
    fs.rmdirSync(path);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  },
  readdir: function(node) {
   var path = NODEFS.realPath(node);
   try {
    return fs.readdirSync(path);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  },
  symlink: function(parent, newName, oldPath) {
   var newPath = PATH.join2(NODEFS.realPath(parent), newName);
   try {
    fs.symlinkSync(oldPath, newPath);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  },
  readlink: function(node) {
   var path = NODEFS.realPath(node);
   try {
    path = fs.readlinkSync(path);
    path = NODEJS_PATH.relative(NODEJS_PATH.resolve(node.mount.opts.root), path);
    return path;
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  }
 },
 stream_ops: {
  open: function(stream) {
   var path = NODEFS.realPath(stream.node);
   try {
    if (FS.isFile(stream.node.mode)) {
     stream.nfd = fs.openSync(path, NODEFS.flagsForNode(stream.flags));
    }
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  },
  close: function(stream) {
   try {
    if (FS.isFile(stream.node.mode) && stream.nfd) {
     fs.closeSync(stream.nfd);
    }
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  },
  read: function(stream, buffer, offset, length, position) {
   if (length === 0) return 0;
   try {
    return fs.readSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position);
   } catch (e) {
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  },
  write: function(stream, buffer, offset, length, position) {
   try {
    return fs.writeSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position);
   } catch (e) {
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  },
  llseek: function(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     try {
      var stat = fs.fstatSync(stream.nfd);
      position += stat.size;
     } catch (e) {
      throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
     }
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(28);
   }
   return position;
  }
 }
};

var WORKERFS = {
 DIR_MODE: 16895,
 FILE_MODE: 33279,
 reader: null,
 mount: function(mount) {
  assert(ENVIRONMENT_IS_WORKER);
  if (!WORKERFS.reader) WORKERFS.reader = new FileReaderSync();
  var root = WORKERFS.createNode(null, "/", WORKERFS.DIR_MODE, 0);
  var createdParents = {};
  function ensureParent(path) {
   var parts = path.split("/");
   var parent = root;
   for (var i = 0; i < parts.length - 1; i++) {
    var curr = parts.slice(0, i + 1).join("/");
    if (!createdParents[curr]) {
     createdParents[curr] = WORKERFS.createNode(parent, parts[i], WORKERFS.DIR_MODE, 0);
    }
    parent = createdParents[curr];
   }
   return parent;
  }
  function base(path) {
   var parts = path.split("/");
   return parts[parts.length - 1];
  }
  Array.prototype.forEach.call(mount.opts["files"] || [], function(file) {
   WORKERFS.createNode(ensureParent(file.name), base(file.name), WORKERFS.FILE_MODE, 0, file, file.lastModifiedDate);
  });
  (mount.opts["blobs"] || []).forEach(function(obj) {
   WORKERFS.createNode(ensureParent(obj["name"]), base(obj["name"]), WORKERFS.FILE_MODE, 0, obj["data"]);
  });
  (mount.opts["packages"] || []).forEach(function(pack) {
   pack["metadata"].files.forEach(function(file) {
    var name = file.filename.substr(1);
    WORKERFS.createNode(ensureParent(name), base(name), WORKERFS.FILE_MODE, 0, pack["blob"].slice(file.start, file.end));
   });
  });
  return root;
 },
 createNode: function(parent, name, mode, dev, contents, mtime) {
  var node = FS.createNode(parent, name, mode);
  node.mode = mode;
  node.node_ops = WORKERFS.node_ops;
  node.stream_ops = WORKERFS.stream_ops;
  node.timestamp = (mtime || new Date()).getTime();
  assert(WORKERFS.FILE_MODE !== WORKERFS.DIR_MODE);
  if (mode === WORKERFS.FILE_MODE) {
   node.size = contents.size;
   node.contents = contents;
  } else {
   node.size = 4096;
   node.contents = {};
  }
  if (parent) {
   parent.contents[name] = node;
  }
  return node;
 },
 node_ops: {
  getattr: function(node) {
   return {
    dev: 1,
    ino: undefined,
    mode: node.mode,
    nlink: 1,
    uid: 0,
    gid: 0,
    rdev: undefined,
    size: node.size,
    atime: new Date(node.timestamp),
    mtime: new Date(node.timestamp),
    ctime: new Date(node.timestamp),
    blksize: 4096,
    blocks: Math.ceil(node.size / 4096)
   };
  },
  setattr: function(node, attr) {
   if (attr.mode !== undefined) {
    node.mode = attr.mode;
   }
   if (attr.timestamp !== undefined) {
    node.timestamp = attr.timestamp;
   }
  },
  lookup: function(parent, name) {
   throw new FS.ErrnoError(44);
  },
  mknod: function(parent, name, mode, dev) {
   throw new FS.ErrnoError(63);
  },
  rename: function(oldNode, newDir, newName) {
   throw new FS.ErrnoError(63);
  },
  unlink: function(parent, name) {
   throw new FS.ErrnoError(63);
  },
  rmdir: function(parent, name) {
   throw new FS.ErrnoError(63);
  },
  readdir: function(node) {
   var entries = [ ".", ".." ];
   for (var key in node.contents) {
    if (!node.contents.hasOwnProperty(key)) {
     continue;
    }
    entries.push(key);
   }
   return entries;
  },
  symlink: function(parent, newName, oldPath) {
   throw new FS.ErrnoError(63);
  },
  readlink: function(node) {
   throw new FS.ErrnoError(63);
  }
 },
 stream_ops: {
  read: function(stream, buffer, offset, length, position) {
   if (position >= stream.node.size) return 0;
   var chunk = stream.node.contents.slice(position, position + length);
   var ab = WORKERFS.reader.readAsArrayBuffer(chunk);
   buffer.set(new Uint8Array(ab), offset);
   return chunk.size;
  },
  write: function(stream, buffer, offset, length, position) {
   throw new FS.ErrnoError(29);
  },
  llseek: function(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     position += stream.node.size;
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(28);
   }
   return position;
  }
 }
};

var FS = {
 root: null,
 mounts: [],
 devices: {},
 streams: [],
 nextInode: 1,
 nameTable: null,
 currentPath: "/",
 initialized: false,
 ignorePermissions: true,
 trackingDelegate: {},
 tracking: {
  openFlags: {
   READ: 1,
   WRITE: 2
  }
 },
 ErrnoError: null,
 genericErrors: {},
 filesystems: null,
 syncFSRequests: 0,
 handleFSError: function(e) {
  if (!(e instanceof FS.ErrnoError)) throw e + " : " + stackTrace();
  return ___setErrNo(e.errno);
 },
 lookupPath: function(path, opts) {
  path = PATH_FS.resolve(FS.cwd(), path);
  opts = opts || {};
  if (!path) return {
   path: "",
   node: null
  };
  var defaults = {
   follow_mount: true,
   recurse_count: 0
  };
  for (var key in defaults) {
   if (opts[key] === undefined) {
    opts[key] = defaults[key];
   }
  }
  if (opts.recurse_count > 8) {
   throw new FS.ErrnoError(32);
  }
  var parts = PATH.normalizeArray(path.split("/").filter(function(p) {
   return !!p;
  }), false);
  var current = FS.root;
  var current_path = "/";
  for (var i = 0; i < parts.length; i++) {
   var islast = i === parts.length - 1;
   if (islast && opts.parent) {
    break;
   }
   current = FS.lookupNode(current, parts[i]);
   current_path = PATH.join2(current_path, parts[i]);
   if (FS.isMountpoint(current)) {
    if (!islast || islast && opts.follow_mount) {
     current = current.mounted.root;
    }
   }
   if (!islast || opts.follow) {
    var count = 0;
    while (FS.isLink(current.mode)) {
     var link = FS.readlink(current_path);
     current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
     var lookup = FS.lookupPath(current_path, {
      recurse_count: opts.recurse_count
     });
     current = lookup.node;
     if (count++ > 40) {
      throw new FS.ErrnoError(32);
     }
    }
   }
  }
  return {
   path: current_path,
   node: current
  };
 },
 getPath: function(node) {
  var path;
  while (true) {
   if (FS.isRoot(node)) {
    var mount = node.mount.mountpoint;
    if (!path) return mount;
    return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path;
   }
   path = path ? node.name + "/" + path : node.name;
   node = node.parent;
  }
 },
 hashName: function(parentid, name) {
  var hash = 0;
  for (var i = 0; i < name.length; i++) {
   hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
  }
  return (parentid + hash >>> 0) % FS.nameTable.length;
 },
 hashAddNode: function(node) {
  var hash = FS.hashName(node.parent.id, node.name);
  node.name_next = FS.nameTable[hash];
  FS.nameTable[hash] = node;
 },
 hashRemoveNode: function(node) {
  var hash = FS.hashName(node.parent.id, node.name);
  if (FS.nameTable[hash] === node) {
   FS.nameTable[hash] = node.name_next;
  } else {
   var current = FS.nameTable[hash];
   while (current) {
    if (current.name_next === node) {
     current.name_next = node.name_next;
     break;
    }
    current = current.name_next;
   }
  }
 },
 lookupNode: function(parent, name) {
  var err = FS.mayLookup(parent);
  if (err) {
   throw new FS.ErrnoError(err, parent);
  }
  var hash = FS.hashName(parent.id, name);
  for (var node = FS.nameTable[hash]; node; node = node.name_next) {
   var nodeName = node.name;
   if (node.parent.id === parent.id && nodeName === name) {
    return node;
   }
  }
  return FS.lookup(parent, name);
 },
 createNode: function(parent, name, mode, rdev) {
  if (!FS.FSNode) {
   FS.FSNode = function(parent, name, mode, rdev) {
    if (!parent) {
     parent = this;
    }
    this.parent = parent;
    this.mount = parent.mount;
    this.mounted = null;
    this.id = FS.nextInode++;
    this.name = name;
    this.mode = mode;
    this.node_ops = {};
    this.stream_ops = {};
    this.rdev = rdev;
   };
   FS.FSNode.prototype = {};
   var readMode = 292 | 73;
   var writeMode = 146;
   Object.defineProperties(FS.FSNode.prototype, {
    read: {
     get: function() {
      return (this.mode & readMode) === readMode;
     },
     set: function(val) {
      val ? this.mode |= readMode : this.mode &= ~readMode;
     }
    },
    write: {
     get: function() {
      return (this.mode & writeMode) === writeMode;
     },
     set: function(val) {
      val ? this.mode |= writeMode : this.mode &= ~writeMode;
     }
    },
    isFolder: {
     get: function() {
      return FS.isDir(this.mode);
     }
    },
    isDevice: {
     get: function() {
      return FS.isChrdev(this.mode);
     }
    }
   });
  }
  var node = new FS.FSNode(parent, name, mode, rdev);
  FS.hashAddNode(node);
  return node;
 },
 destroyNode: function(node) {
  FS.hashRemoveNode(node);
 },
 isRoot: function(node) {
  return node === node.parent;
 },
 isMountpoint: function(node) {
  return !!node.mounted;
 },
 isFile: function(mode) {
  return (mode & 61440) === 32768;
 },
 isDir: function(mode) {
  return (mode & 61440) === 16384;
 },
 isLink: function(mode) {
  return (mode & 61440) === 40960;
 },
 isChrdev: function(mode) {
  return (mode & 61440) === 8192;
 },
 isBlkdev: function(mode) {
  return (mode & 61440) === 24576;
 },
 isFIFO: function(mode) {
  return (mode & 61440) === 4096;
 },
 isSocket: function(mode) {
  return (mode & 49152) === 49152;
 },
 flagModes: {
  "r": 0,
  "rs": 1052672,
  "r+": 2,
  "w": 577,
  "wx": 705,
  "xw": 705,
  "w+": 578,
  "wx+": 706,
  "xw+": 706,
  "a": 1089,
  "ax": 1217,
  "xa": 1217,
  "a+": 1090,
  "ax+": 1218,
  "xa+": 1218
 },
 modeStringToFlags: function(str) {
  var flags = FS.flagModes[str];
  if (typeof flags === "undefined") {
   throw new Error("Unknown file open mode: " + str);
  }
  return flags;
 },
 flagsToPermissionString: function(flag) {
  var perms = [ "r", "w", "rw" ][flag & 3];
  if (flag & 512) {
   perms += "w";
  }
  return perms;
 },
 nodePermissions: function(node, perms) {
  if (FS.ignorePermissions) {
   return 0;
  }
  if (perms.indexOf("r") !== -1 && !(node.mode & 292)) {
   return 2;
  } else if (perms.indexOf("w") !== -1 && !(node.mode & 146)) {
   return 2;
  } else if (perms.indexOf("x") !== -1 && !(node.mode & 73)) {
   return 2;
  }
  return 0;
 },
 mayLookup: function(dir) {
  var err = FS.nodePermissions(dir, "x");
  if (err) return err;
  if (!dir.node_ops.lookup) return 2;
  return 0;
 },
 mayCreate: function(dir, name) {
  try {
   var node = FS.lookupNode(dir, name);
   return 20;
  } catch (e) {}
  return FS.nodePermissions(dir, "wx");
 },
 mayDelete: function(dir, name, isdir) {
  var node;
  try {
   node = FS.lookupNode(dir, name);
  } catch (e) {
   return e.errno;
  }
  var err = FS.nodePermissions(dir, "wx");
  if (err) {
   return err;
  }
  if (isdir) {
   if (!FS.isDir(node.mode)) {
    return 54;
   }
   if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
    return 10;
   }
  } else {
   if (FS.isDir(node.mode)) {
    return 31;
   }
  }
  return 0;
 },
 mayOpen: function(node, flags) {
  if (!node) {
   return 44;
  }
  if (FS.isLink(node.mode)) {
   return 32;
  } else if (FS.isDir(node.mode)) {
   if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
    return 31;
   }
  }
  return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
 },
 MAX_OPEN_FDS: 4096,
 nextfd: function(fd_start, fd_end) {
  fd_start = fd_start || 0;
  fd_end = fd_end || FS.MAX_OPEN_FDS;
  for (var fd = fd_start; fd <= fd_end; fd++) {
   if (!FS.streams[fd]) {
    return fd;
   }
  }
  throw new FS.ErrnoError(33);
 },
 getStream: function(fd) {
  return FS.streams[fd];
 },
 createStream: function(stream, fd_start, fd_end) {
  if (!FS.FSStream) {
   FS.FSStream = function() {};
   FS.FSStream.prototype = {};
   Object.defineProperties(FS.FSStream.prototype, {
    object: {
     get: function() {
      return this.node;
     },
     set: function(val) {
      this.node = val;
     }
    },
    isRead: {
     get: function() {
      return (this.flags & 2097155) !== 1;
     }
    },
    isWrite: {
     get: function() {
      return (this.flags & 2097155) !== 0;
     }
    },
    isAppend: {
     get: function() {
      return this.flags & 1024;
     }
    }
   });
  }
  var newStream = new FS.FSStream();
  for (var p in stream) {
   newStream[p] = stream[p];
  }
  stream = newStream;
  var fd = FS.nextfd(fd_start, fd_end);
  stream.fd = fd;
  FS.streams[fd] = stream;
  return stream;
 },
 closeStream: function(fd) {
  FS.streams[fd] = null;
 },
 chrdev_stream_ops: {
  open: function(stream) {
   var device = FS.getDevice(stream.node.rdev);
   stream.stream_ops = device.stream_ops;
   if (stream.stream_ops.open) {
    stream.stream_ops.open(stream);
   }
  },
  llseek: function() {
   throw new FS.ErrnoError(70);
  }
 },
 major: function(dev) {
  return dev >> 8;
 },
 minor: function(dev) {
  return dev & 255;
 },
 makedev: function(ma, mi) {
  return ma << 8 | mi;
 },
 registerDevice: function(dev, ops) {
  FS.devices[dev] = {
   stream_ops: ops
  };
 },
 getDevice: function(dev) {
  return FS.devices[dev];
 },
 getMounts: function(mount) {
  var mounts = [];
  var check = [ mount ];
  while (check.length) {
   var m = check.pop();
   mounts.push(m);
   check.push.apply(check, m.mounts);
  }
  return mounts;
 },
 syncfs: function(populate, callback) {
  if (typeof populate === "function") {
   callback = populate;
   populate = false;
  }
  FS.syncFSRequests++;
  if (FS.syncFSRequests > 1) {
   console.log("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
  }
  var mounts = FS.getMounts(FS.root.mount);
  var completed = 0;
  function doCallback(err) {
   FS.syncFSRequests--;
   return callback(err);
  }
  function done(err) {
   if (err) {
    if (!done.errored) {
     done.errored = true;
     return doCallback(err);
    }
    return;
   }
   if (++completed >= mounts.length) {
    doCallback(null);
   }
  }
  mounts.forEach(function(mount) {
   if (!mount.type.syncfs) {
    return done(null);
   }
   mount.type.syncfs(mount, populate, done);
  });
 },
 mount: function(type, opts, mountpoint) {
  var root = mountpoint === "/";
  var pseudo = !mountpoint;
  var node;
  if (root && FS.root) {
   throw new FS.ErrnoError(10);
  } else if (!root && !pseudo) {
   var lookup = FS.lookupPath(mountpoint, {
    follow_mount: false
   });
   mountpoint = lookup.path;
   node = lookup.node;
   if (FS.isMountpoint(node)) {
    throw new FS.ErrnoError(10);
   }
   if (!FS.isDir(node.mode)) {
    throw new FS.ErrnoError(54);
   }
  }
  var mount = {
   type: type,
   opts: opts,
   mountpoint: mountpoint,
   mounts: []
  };
  var mountRoot = type.mount(mount);
  mountRoot.mount = mount;
  mount.root = mountRoot;
  if (root) {
   FS.root = mountRoot;
  } else if (node) {
   node.mounted = mount;
   if (node.mount) {
    node.mount.mounts.push(mount);
   }
  }
  return mountRoot;
 },
 unmount: function(mountpoint) {
  var lookup = FS.lookupPath(mountpoint, {
   follow_mount: false
  });
  if (!FS.isMountpoint(lookup.node)) {
   throw new FS.ErrnoError(28);
  }
  var node = lookup.node;
  var mount = node.mounted;
  var mounts = FS.getMounts(mount);
  Object.keys(FS.nameTable).forEach(function(hash) {
   var current = FS.nameTable[hash];
   while (current) {
    var next = current.name_next;
    if (mounts.indexOf(current.mount) !== -1) {
     FS.destroyNode(current);
    }
    current = next;
   }
  });
  node.mounted = null;
  var idx = node.mount.mounts.indexOf(mount);
  node.mount.mounts.splice(idx, 1);
 },
 lookup: function(parent, name) {
  return parent.node_ops.lookup(parent, name);
 },
 mknod: function(path, mode, dev) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  if (!name || name === "." || name === "..") {
   throw new FS.ErrnoError(28);
  }
  var err = FS.mayCreate(parent, name);
  if (err) {
   throw new FS.ErrnoError(err);
  }
  if (!parent.node_ops.mknod) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.mknod(parent, name, mode, dev);
 },
 create: function(path, mode) {
  mode = mode !== undefined ? mode : 438;
  mode &= 4095;
  mode |= 32768;
  return FS.mknod(path, mode, 0);
 },
 mkdir: function(path, mode) {
  mode = mode !== undefined ? mode : 511;
  mode &= 511 | 512;
  mode |= 16384;
  return FS.mknod(path, mode, 0);
 },
 mkdirTree: function(path, mode) {
  var dirs = path.split("/");
  var d = "";
  for (var i = 0; i < dirs.length; ++i) {
   if (!dirs[i]) continue;
   d += "/" + dirs[i];
   try {
    FS.mkdir(d, mode);
   } catch (e) {
    if (e.errno != 20) throw e;
   }
  }
 },
 mkdev: function(path, mode, dev) {
  if (typeof dev === "undefined") {
   dev = mode;
   mode = 438;
  }
  mode |= 8192;
  return FS.mknod(path, mode, dev);
 },
 symlink: function(oldpath, newpath) {
  if (!PATH_FS.resolve(oldpath)) {
   throw new FS.ErrnoError(44);
  }
  var lookup = FS.lookupPath(newpath, {
   parent: true
  });
  var parent = lookup.node;
  if (!parent) {
   throw new FS.ErrnoError(44);
  }
  var newname = PATH.basename(newpath);
  var err = FS.mayCreate(parent, newname);
  if (err) {
   throw new FS.ErrnoError(err);
  }
  if (!parent.node_ops.symlink) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.symlink(parent, newname, oldpath);
 },
 rename: function(old_path, new_path) {
  var old_dirname = PATH.dirname(old_path);
  var new_dirname = PATH.dirname(new_path);
  var old_name = PATH.basename(old_path);
  var new_name = PATH.basename(new_path);
  var lookup, old_dir, new_dir;
  try {
   lookup = FS.lookupPath(old_path, {
    parent: true
   });
   old_dir = lookup.node;
   lookup = FS.lookupPath(new_path, {
    parent: true
   });
   new_dir = lookup.node;
  } catch (e) {
   throw new FS.ErrnoError(10);
  }
  if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
  if (old_dir.mount !== new_dir.mount) {
   throw new FS.ErrnoError(75);
  }
  var old_node = FS.lookupNode(old_dir, old_name);
  var relative = PATH_FS.relative(old_path, new_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(28);
  }
  relative = PATH_FS.relative(new_path, old_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(55);
  }
  var new_node;
  try {
   new_node = FS.lookupNode(new_dir, new_name);
  } catch (e) {}
  if (old_node === new_node) {
   return;
  }
  var isdir = FS.isDir(old_node.mode);
  var err = FS.mayDelete(old_dir, old_name, isdir);
  if (err) {
   throw new FS.ErrnoError(err);
  }
  err = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
  if (err) {
   throw new FS.ErrnoError(err);
  }
  if (!old_dir.node_ops.rename) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
   throw new FS.ErrnoError(10);
  }
  if (new_dir !== old_dir) {
   err = FS.nodePermissions(old_dir, "w");
   if (err) {
    throw new FS.ErrnoError(err);
   }
  }
  try {
   if (FS.trackingDelegate["willMovePath"]) {
    FS.trackingDelegate["willMovePath"](old_path, new_path);
   }
  } catch (e) {
   console.log("FS.trackingDelegate['willMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
  }
  FS.hashRemoveNode(old_node);
  try {
   old_dir.node_ops.rename(old_node, new_dir, new_name);
  } catch (e) {
   throw e;
  } finally {
   FS.hashAddNode(old_node);
  }
  try {
   if (FS.trackingDelegate["onMovePath"]) FS.trackingDelegate["onMovePath"](old_path, new_path);
  } catch (e) {
   console.log("FS.trackingDelegate['onMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
  }
 },
 rmdir: function(path) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var err = FS.mayDelete(parent, name, true);
  if (err) {
   throw new FS.ErrnoError(err);
  }
  if (!parent.node_ops.rmdir) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  try {
   if (FS.trackingDelegate["willDeletePath"]) {
    FS.trackingDelegate["willDeletePath"](path);
   }
  } catch (e) {
   console.log("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
  }
  parent.node_ops.rmdir(parent, name);
  FS.destroyNode(node);
  try {
   if (FS.trackingDelegate["onDeletePath"]) FS.trackingDelegate["onDeletePath"](path);
  } catch (e) {
   console.log("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
  }
 },
 readdir: function(path) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  if (!node.node_ops.readdir) {
   throw new FS.ErrnoError(54);
  }
  return node.node_ops.readdir(node);
 },
 unlink: function(path) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var err = FS.mayDelete(parent, name, false);
  if (err) {
   throw new FS.ErrnoError(err);
  }
  if (!parent.node_ops.unlink) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  try {
   if (FS.trackingDelegate["willDeletePath"]) {
    FS.trackingDelegate["willDeletePath"](path);
   }
  } catch (e) {
   console.log("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
  }
  parent.node_ops.unlink(parent, name);
  FS.destroyNode(node);
  try {
   if (FS.trackingDelegate["onDeletePath"]) FS.trackingDelegate["onDeletePath"](path);
  } catch (e) {
   console.log("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
  }
 },
 readlink: function(path) {
  var lookup = FS.lookupPath(path);
  var link = lookup.node;
  if (!link) {
   throw new FS.ErrnoError(44);
  }
  if (!link.node_ops.readlink) {
   throw new FS.ErrnoError(28);
  }
  return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
 },
 stat: function(path, dontFollow) {
  var lookup = FS.lookupPath(path, {
   follow: !dontFollow
  });
  var node = lookup.node;
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (!node.node_ops.getattr) {
   throw new FS.ErrnoError(63);
  }
  return node.node_ops.getattr(node);
 },
 lstat: function(path) {
  return FS.stat(path, true);
 },
 chmod: function(path, mode, dontFollow) {
  var node;
  if (typeof path === "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   mode: mode & 4095 | node.mode & ~4095,
   timestamp: Date.now()
  });
 },
 lchmod: function(path, mode) {
  FS.chmod(path, mode, true);
 },
 fchmod: function(fd, mode) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  FS.chmod(stream.node, mode);
 },
 chown: function(path, uid, gid, dontFollow) {
  var node;
  if (typeof path === "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   timestamp: Date.now()
  });
 },
 lchown: function(path, uid, gid) {
  FS.chown(path, uid, gid, true);
 },
 fchown: function(fd, uid, gid) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  FS.chown(stream.node, uid, gid);
 },
 truncate: function(path, len) {
  if (len < 0) {
   throw new FS.ErrnoError(28);
  }
  var node;
  if (typeof path === "string") {
   var lookup = FS.lookupPath(path, {
    follow: true
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isDir(node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!FS.isFile(node.mode)) {
   throw new FS.ErrnoError(28);
  }
  var err = FS.nodePermissions(node, "w");
  if (err) {
   throw new FS.ErrnoError(err);
  }
  node.node_ops.setattr(node, {
   size: len,
   timestamp: Date.now()
  });
 },
 ftruncate: function(fd, len) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(28);
  }
  FS.truncate(stream.node, len);
 },
 utime: function(path, atime, mtime) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  node.node_ops.setattr(node, {
   timestamp: Math.max(atime, mtime)
  });
 },
 open: function(path, flags, mode, fd_start, fd_end) {
  if (path === "") {
   throw new FS.ErrnoError(44);
  }
  flags = typeof flags === "string" ? FS.modeStringToFlags(flags) : flags;
  mode = typeof mode === "undefined" ? 438 : mode;
  if (flags & 64) {
   mode = mode & 4095 | 32768;
  } else {
   mode = 0;
  }
  var node;
  if (typeof path === "object") {
   node = path;
  } else {
   path = PATH.normalize(path);
   try {
    var lookup = FS.lookupPath(path, {
     follow: !(flags & 131072)
    });
    node = lookup.node;
   } catch (e) {}
  }
  var created = false;
  if (flags & 64) {
   if (node) {
    if (flags & 128) {
     throw new FS.ErrnoError(20);
    }
   } else {
    node = FS.mknod(path, mode, 0);
    created = true;
   }
  }
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (FS.isChrdev(node.mode)) {
   flags &= ~512;
  }
  if (flags & 65536 && !FS.isDir(node.mode)) {
   throw new FS.ErrnoError(54);
  }
  if (!created) {
   var err = FS.mayOpen(node, flags);
   if (err) {
    throw new FS.ErrnoError(err);
   }
  }
  if (flags & 512) {
   FS.truncate(node, 0);
  }
  flags &= ~(128 | 512);
  var stream = FS.createStream({
   node: node,
   path: FS.getPath(node),
   flags: flags,
   seekable: true,
   position: 0,
   stream_ops: node.stream_ops,
   ungotten: [],
   error: false
  }, fd_start, fd_end);
  if (stream.stream_ops.open) {
   stream.stream_ops.open(stream);
  }
  if (Module["logReadFiles"] && !(flags & 1)) {
   if (!FS.readFiles) FS.readFiles = {};
   if (!(path in FS.readFiles)) {
    FS.readFiles[path] = 1;
    console.log("FS.trackingDelegate error on read file: " + path);
   }
  }
  try {
   if (FS.trackingDelegate["onOpenFile"]) {
    var trackingFlags = 0;
    if ((flags & 2097155) !== 1) {
     trackingFlags |= FS.tracking.openFlags.READ;
    }
    if ((flags & 2097155) !== 0) {
     trackingFlags |= FS.tracking.openFlags.WRITE;
    }
    FS.trackingDelegate["onOpenFile"](path, trackingFlags);
   }
  } catch (e) {
   console.log("FS.trackingDelegate['onOpenFile']('" + path + "', flags) threw an exception: " + e.message);
  }
  return stream;
 },
 close: function(stream) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (stream.getdents) stream.getdents = null;
  try {
   if (stream.stream_ops.close) {
    stream.stream_ops.close(stream);
   }
  } catch (e) {
   throw e;
  } finally {
   FS.closeStream(stream.fd);
  }
  stream.fd = null;
 },
 isClosed: function(stream) {
  return stream.fd === null;
 },
 llseek: function(stream, offset, whence) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (!stream.seekable || !stream.stream_ops.llseek) {
   throw new FS.ErrnoError(70);
  }
  if (whence != 0 && whence != 1 && whence != 2) {
   throw new FS.ErrnoError(28);
  }
  stream.position = stream.stream_ops.llseek(stream, offset, whence);
  stream.ungotten = [];
  return stream.position;
 },
 read: function(stream, buffer, offset, length, position) {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.read) {
   throw new FS.ErrnoError(28);
  }
  var seeking = typeof position !== "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
  if (!seeking) stream.position += bytesRead;
  return bytesRead;
 },
 write: function(stream, buffer, offset, length, position, canOwn) {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.write) {
   throw new FS.ErrnoError(28);
  }
  if (stream.flags & 1024) {
   FS.llseek(stream, 0, 2);
  }
  var seeking = typeof position !== "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
  if (!seeking) stream.position += bytesWritten;
  try {
   if (stream.path && FS.trackingDelegate["onWriteToFile"]) FS.trackingDelegate["onWriteToFile"](stream.path);
  } catch (e) {
   console.log("FS.trackingDelegate['onWriteToFile']('" + stream.path + "') threw an exception: " + e.message);
  }
  return bytesWritten;
 },
 allocate: function(stream, offset, length) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (offset < 0 || length <= 0) {
   throw new FS.ErrnoError(28);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(43);
  }
  if (!stream.stream_ops.allocate) {
   throw new FS.ErrnoError(138);
  }
  stream.stream_ops.allocate(stream, offset, length);
 },
 mmap: function(stream, buffer, offset, length, position, prot, flags) {
  if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
   throw new FS.ErrnoError(2);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(2);
  }
  if (!stream.stream_ops.mmap) {
   throw new FS.ErrnoError(43);
  }
  return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
 },
 msync: function(stream, buffer, offset, length, mmapFlags) {
  if (!stream || !stream.stream_ops.msync) {
   return 0;
  }
  return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
 },
 munmap: function(stream) {
  return 0;
 },
 ioctl: function(stream, cmd, arg) {
  if (!stream.stream_ops.ioctl) {
   throw new FS.ErrnoError(59);
  }
  return stream.stream_ops.ioctl(stream, cmd, arg);
 },
 readFile: function(path, opts) {
  opts = opts || {};
  opts.flags = opts.flags || "r";
  opts.encoding = opts.encoding || "binary";
  if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
   throw new Error('Invalid encoding type "' + opts.encoding + '"');
  }
  var ret;
  var stream = FS.open(path, opts.flags);
  var stat = FS.stat(path);
  var length = stat.size;
  var buf = new Uint8Array(length);
  FS.read(stream, buf, 0, length, 0);
  if (opts.encoding === "utf8") {
   ret = UTF8ArrayToString(buf, 0);
  } else if (opts.encoding === "binary") {
   ret = buf;
  }
  FS.close(stream);
  return ret;
 },
 writeFile: function(path, data, opts) {
  opts = opts || {};
  opts.flags = opts.flags || "w";
  var stream = FS.open(path, opts.flags, opts.mode);
  if (typeof data === "string") {
   var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
   var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
   FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
  } else if (ArrayBuffer.isView(data)) {
   FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
  } else {
   throw new Error("Unsupported data type");
  }
  FS.close(stream);
 },
 cwd: function() {
  return FS.currentPath;
 },
 chdir: function(path) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  if (lookup.node === null) {
   throw new FS.ErrnoError(44);
  }
  if (!FS.isDir(lookup.node.mode)) {
   throw new FS.ErrnoError(54);
  }
  var err = FS.nodePermissions(lookup.node, "x");
  if (err) {
   throw new FS.ErrnoError(err);
  }
  FS.currentPath = lookup.path;
 },
 createDefaultDirectories: function() {
  FS.mkdir("/tmp");
  FS.mkdir("/home");
  FS.mkdir("/home/web_user");
 },
 createDefaultDevices: function() {
  FS.mkdir("/dev");
  FS.registerDevice(FS.makedev(1, 3), {
   read: function() {
    return 0;
   },
   write: function(stream, buffer, offset, length, pos) {
    return length;
   }
  });
  FS.mkdev("/dev/null", FS.makedev(1, 3));
  TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
  TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
  FS.mkdev("/dev/tty", FS.makedev(5, 0));
  FS.mkdev("/dev/tty1", FS.makedev(6, 0));
  var random_device;
  if (typeof crypto === "object" && typeof crypto["getRandomValues"] === "function") {
   var randomBuffer = new Uint8Array(1);
   random_device = function() {
    crypto.getRandomValues(randomBuffer);
    return randomBuffer[0];
   };
  } else if (ENVIRONMENT_IS_NODE) {
   try {
    var crypto_module = require("crypto");
    random_device = function() {
     return crypto_module["randomBytes"](1)[0];
    };
   } catch (e) {}
  } else {}
  if (!random_device) {
   random_device = function() {
    abort("random_device");
   };
  }
  FS.createDevice("/dev", "random", random_device);
  FS.createDevice("/dev", "urandom", random_device);
  FS.mkdir("/dev/shm");
  FS.mkdir("/dev/shm/tmp");
 },
 createSpecialDirectories: function() {
  FS.mkdir("/proc");
  FS.mkdir("/proc/self");
  FS.mkdir("/proc/self/fd");
  FS.mount({
   mount: function() {
    var node = FS.createNode("/proc/self", "fd", 16384 | 511, 73);
    node.node_ops = {
     lookup: function(parent, name) {
      var fd = +name;
      var stream = FS.getStream(fd);
      if (!stream) throw new FS.ErrnoError(8);
      var ret = {
       parent: null,
       mount: {
        mountpoint: "fake"
       },
       node_ops: {
        readlink: function() {
         return stream.path;
        }
       }
      };
      ret.parent = ret;
      return ret;
     }
    };
    return node;
   }
  }, {}, "/proc/self/fd");
 },
 createStandardStreams: function() {
  if (Module["stdin"]) {
   FS.createDevice("/dev", "stdin", Module["stdin"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdin");
  }
  if (Module["stdout"]) {
   FS.createDevice("/dev", "stdout", null, Module["stdout"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdout");
  }
  if (Module["stderr"]) {
   FS.createDevice("/dev", "stderr", null, Module["stderr"]);
  } else {
   FS.symlink("/dev/tty1", "/dev/stderr");
  }
  var stdin = FS.open("/dev/stdin", "r");
  var stdout = FS.open("/dev/stdout", "w");
  var stderr = FS.open("/dev/stderr", "w");
 },
 ensureErrnoError: function() {
  if (FS.ErrnoError) return;
  FS.ErrnoError = function ErrnoError(errno, node) {
   this.node = node;
   this.setErrno = function(errno) {
    this.errno = errno;
   };
   this.setErrno(errno);
   this.message = "FS error";
  };
  FS.ErrnoError.prototype = new Error();
  FS.ErrnoError.prototype.constructor = FS.ErrnoError;
  [ 44 ].forEach(function(code) {
   FS.genericErrors[code] = new FS.ErrnoError(code);
   FS.genericErrors[code].stack = "<generic error, no stack>";
  });
 },
 staticInit: function() {
  FS.ensureErrnoError();
  FS.nameTable = new Array(4096);
  FS.mount(MEMFS, {}, "/");
  FS.createDefaultDirectories();
  FS.createDefaultDevices();
  FS.createSpecialDirectories();
  FS.filesystems = {
   "MEMFS": MEMFS,
   "IDBFS": IDBFS,
   "NODEFS": NODEFS,
   "WORKERFS": WORKERFS
  };
 },
 init: function(input, output, error) {
  FS.init.initialized = true;
  FS.ensureErrnoError();
  Module["stdin"] = input || Module["stdin"];
  Module["stdout"] = output || Module["stdout"];
  Module["stderr"] = error || Module["stderr"];
  FS.createStandardStreams();
 },
 quit: function() {
  FS.init.initialized = false;
  var fflush = Module["_fflush"];
  if (fflush) fflush(0);
  for (var i = 0; i < FS.streams.length; i++) {
   var stream = FS.streams[i];
   if (!stream) {
    continue;
   }
   FS.close(stream);
  }
 },
 getMode: function(canRead, canWrite) {
  var mode = 0;
  if (canRead) mode |= 292 | 73;
  if (canWrite) mode |= 146;
  return mode;
 },
 joinPath: function(parts, forceRelative) {
  var path = PATH.join.apply(null, parts);
  if (forceRelative && path[0] == "/") path = path.substr(1);
  return path;
 },
 absolutePath: function(relative, base) {
  return PATH_FS.resolve(base, relative);
 },
 standardizePath: function(path) {
  return PATH.normalize(path);
 },
 findObject: function(path, dontResolveLastLink) {
  var ret = FS.analyzePath(path, dontResolveLastLink);
  if (ret.exists) {
   return ret.object;
  } else {
   ___setErrNo(ret.error);
   return null;
  }
 },
 analyzePath: function(path, dontResolveLastLink) {
  try {
   var lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   path = lookup.path;
  } catch (e) {}
  var ret = {
   isRoot: false,
   exists: false,
   error: 0,
   name: null,
   path: null,
   object: null,
   parentExists: false,
   parentPath: null,
   parentObject: null
  };
  try {
   var lookup = FS.lookupPath(path, {
    parent: true
   });
   ret.parentExists = true;
   ret.parentPath = lookup.path;
   ret.parentObject = lookup.node;
   ret.name = PATH.basename(path);
   lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   ret.exists = true;
   ret.path = lookup.path;
   ret.object = lookup.node;
   ret.name = lookup.node.name;
   ret.isRoot = lookup.path === "/";
  } catch (e) {
   ret.error = e.errno;
  }
  return ret;
 },
 createFolder: function(parent, name, canRead, canWrite) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(canRead, canWrite);
  return FS.mkdir(path, mode);
 },
 createPath: function(parent, path, canRead, canWrite) {
  parent = typeof parent === "string" ? parent : FS.getPath(parent);
  var parts = path.split("/").reverse();
  while (parts.length) {
   var part = parts.pop();
   if (!part) continue;
   var current = PATH.join2(parent, part);
   try {
    FS.mkdir(current);
   } catch (e) {}
   parent = current;
  }
  return current;
 },
 createFile: function(parent, name, properties, canRead, canWrite) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(canRead, canWrite);
  return FS.create(path, mode);
 },
 createDataFile: function(parent, name, data, canRead, canWrite, canOwn) {
  var path = name ? PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name) : parent;
  var mode = FS.getMode(canRead, canWrite);
  var node = FS.create(path, mode);
  if (data) {
   if (typeof data === "string") {
    var arr = new Array(data.length);
    for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
    data = arr;
   }
   FS.chmod(node, mode | 146);
   var stream = FS.open(node, "w");
   FS.write(stream, data, 0, data.length, 0, canOwn);
   FS.close(stream);
   FS.chmod(node, mode);
  }
  return node;
 },
 createDevice: function(parent, name, input, output) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(!!input, !!output);
  if (!FS.createDevice.major) FS.createDevice.major = 64;
  var dev = FS.makedev(FS.createDevice.major++, 0);
  FS.registerDevice(dev, {
   open: function(stream) {
    stream.seekable = false;
   },
   close: function(stream) {
    if (output && output.buffer && output.buffer.length) {
     output(10);
    }
   },
   read: function(stream, buffer, offset, length, pos) {
    var bytesRead = 0;
    for (var i = 0; i < length; i++) {
     var result;
     try {
      result = input();
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
     if (result === undefined && bytesRead === 0) {
      throw new FS.ErrnoError(6);
     }
     if (result === null || result === undefined) break;
     bytesRead++;
     buffer[offset + i] = result;
    }
    if (bytesRead) {
     stream.node.timestamp = Date.now();
    }
    return bytesRead;
   },
   write: function(stream, buffer, offset, length, pos) {
    for (var i = 0; i < length; i++) {
     try {
      output(buffer[offset + i]);
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
    }
    if (length) {
     stream.node.timestamp = Date.now();
    }
    return i;
   }
  });
  return FS.mkdev(path, mode, dev);
 },
 createLink: function(parent, name, target, canRead, canWrite) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  return FS.symlink(target, path);
 },
 forceLoadFile: function(obj) {
  if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
  var success = true;
  if (typeof XMLHttpRequest !== "undefined") {
   throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
  } else if (read_) {
   try {
    obj.contents = intArrayFromString(read_(obj.url), true);
    obj.usedBytes = obj.contents.length;
   } catch (e) {
    success = false;
   }
  } else {
   throw new Error("Cannot load without read() or XMLHttpRequest.");
  }
  if (!success) ___setErrNo(29);
  return success;
 },
 createLazyFile: function(parent, name, url, canRead, canWrite) {
  function LazyUint8Array() {
   this.lengthKnown = false;
   this.chunks = [];
  }
  LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
   if (idx > this.length - 1 || idx < 0) {
    return undefined;
   }
   var chunkOffset = idx % this.chunkSize;
   var chunkNum = idx / this.chunkSize | 0;
   return this.getter(chunkNum)[chunkOffset];
  };
  LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
   this.getter = getter;
  };
  LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
   var xhr = new XMLHttpRequest();
   xhr.open("HEAD", url, false);
   xhr.send(null);
   if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
   var datalength = Number(xhr.getResponseHeader("Content-length"));
   var header;
   var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
   var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
   var chunkSize = 1024 * 1024;
   if (!hasByteServing) chunkSize = datalength;
   var doXHR = function(from, to) {
    if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
    if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
    if (typeof Uint8Array != "undefined") xhr.responseType = "arraybuffer";
    if (xhr.overrideMimeType) {
     xhr.overrideMimeType("text/plain; charset=x-user-defined");
    }
    xhr.send(null);
    if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
    if (xhr.response !== undefined) {
     return new Uint8Array(xhr.response || []);
    } else {
     return intArrayFromString(xhr.responseText || "", true);
    }
   };
   var lazyArray = this;
   lazyArray.setDataGetter(function(chunkNum) {
    var start = chunkNum * chunkSize;
    var end = (chunkNum + 1) * chunkSize - 1;
    end = Math.min(end, datalength - 1);
    if (typeof lazyArray.chunks[chunkNum] === "undefined") {
     lazyArray.chunks[chunkNum] = doXHR(start, end);
    }
    if (typeof lazyArray.chunks[chunkNum] === "undefined") throw new Error("doXHR failed!");
    return lazyArray.chunks[chunkNum];
   });
   if (usesGzip || !datalength) {
    chunkSize = datalength = 1;
    datalength = this.getter(0).length;
    chunkSize = datalength;
    console.log("LazyFiles on gzip forces download of the whole file when length is accessed");
   }
   this._length = datalength;
   this._chunkSize = chunkSize;
   this.lengthKnown = true;
  };
  if (typeof XMLHttpRequest !== "undefined") {
   if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
   var lazyArray = new LazyUint8Array();
   Object.defineProperties(lazyArray, {
    length: {
     get: function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._length;
     }
    },
    chunkSize: {
     get: function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._chunkSize;
     }
    }
   });
   var properties = {
    isDevice: false,
    contents: lazyArray
   };
  } else {
   var properties = {
    isDevice: false,
    url: url
   };
  }
  var node = FS.createFile(parent, name, properties, canRead, canWrite);
  if (properties.contents) {
   node.contents = properties.contents;
  } else if (properties.url) {
   node.contents = null;
   node.url = properties.url;
  }
  Object.defineProperties(node, {
   usedBytes: {
    get: function() {
     return this.contents.length;
    }
   }
  });
  var stream_ops = {};
  var keys = Object.keys(node.stream_ops);
  keys.forEach(function(key) {
   var fn = node.stream_ops[key];
   stream_ops[key] = function forceLoadLazyFile() {
    if (!FS.forceLoadFile(node)) {
     throw new FS.ErrnoError(29);
    }
    return fn.apply(null, arguments);
   };
  });
  stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
   if (!FS.forceLoadFile(node)) {
    throw new FS.ErrnoError(29);
   }
   var contents = stream.node.contents;
   if (position >= contents.length) return 0;
   var size = Math.min(contents.length - position, length);
   if (contents.slice) {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents[position + i];
    }
   } else {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents.get(position + i);
    }
   }
   return size;
  };
  node.stream_ops = stream_ops;
  return node;
 },
 createPreloadedFile: function(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
  Browser.init();
  var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
  var dep = getUniqueRunDependency("cp " + fullname);
  function processData(byteArray) {
   function finish(byteArray) {
    if (preFinish) preFinish();
    if (!dontCreateFile) {
     FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
    }
    if (onload) onload();
    removeRunDependency(dep);
   }
   var handled = false;
   Module["preloadPlugins"].forEach(function(plugin) {
    if (handled) return;
    if (plugin["canHandle"](fullname)) {
     plugin["handle"](byteArray, fullname, finish, function() {
      if (onerror) onerror();
      removeRunDependency(dep);
     });
     handled = true;
    }
   });
   if (!handled) finish(byteArray);
  }
  addRunDependency(dep);
  if (typeof url == "string") {
   Browser.asyncLoad(url, function(byteArray) {
    processData(byteArray);
   }, onerror);
  } else {
   processData(url);
  }
 },
 indexedDB: function() {
  return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
 },
 DB_NAME: function() {
  return "EM_FS_" + window.location.pathname;
 },
 DB_VERSION: 20,
 DB_STORE_NAME: "FILE_DATA",
 saveFilesToDB: function(paths, onload, onerror) {
  onload = onload || function() {};
  onerror = onerror || function() {};
  var indexedDB = FS.indexedDB();
  try {
   var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
  } catch (e) {
   return onerror(e);
  }
  openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
   console.log("creating db");
   var db = openRequest.result;
   db.createObjectStore(FS.DB_STORE_NAME);
  };
  openRequest.onsuccess = function openRequest_onsuccess() {
   var db = openRequest.result;
   var transaction = db.transaction([ FS.DB_STORE_NAME ], "readwrite");
   var files = transaction.objectStore(FS.DB_STORE_NAME);
   var ok = 0, fail = 0, total = paths.length;
   function finish() {
    if (fail == 0) onload(); else onerror();
   }
   paths.forEach(function(path) {
    var putRequest = files.put(FS.analyzePath(path).object.contents, path);
    putRequest.onsuccess = function putRequest_onsuccess() {
     ok++;
     if (ok + fail == total) finish();
    };
    putRequest.onerror = function putRequest_onerror() {
     fail++;
     if (ok + fail == total) finish();
    };
   });
   transaction.onerror = onerror;
  };
  openRequest.onerror = onerror;
 },
 loadFilesFromDB: function(paths, onload, onerror) {
  onload = onload || function() {};
  onerror = onerror || function() {};
  var indexedDB = FS.indexedDB();
  try {
   var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
  } catch (e) {
   return onerror(e);
  }
  openRequest.onupgradeneeded = onerror;
  openRequest.onsuccess = function openRequest_onsuccess() {
   var db = openRequest.result;
   try {
    var transaction = db.transaction([ FS.DB_STORE_NAME ], "readonly");
   } catch (e) {
    onerror(e);
    return;
   }
   var files = transaction.objectStore(FS.DB_STORE_NAME);
   var ok = 0, fail = 0, total = paths.length;
   function finish() {
    if (fail == 0) onload(); else onerror();
   }
   paths.forEach(function(path) {
    var getRequest = files.get(path);
    getRequest.onsuccess = function getRequest_onsuccess() {
     if (FS.analyzePath(path).exists) {
      FS.unlink(path);
     }
     FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
     ok++;
     if (ok + fail == total) finish();
    };
    getRequest.onerror = function getRequest_onerror() {
     fail++;
     if (ok + fail == total) finish();
    };
   });
   transaction.onerror = onerror;
  };
  openRequest.onerror = onerror;
 }
};

var SYSCALLS = {
 DEFAULT_POLLMASK: 5,
 mappings: {},
 umask: 511,
 calculateAt: function(dirfd, path) {
  if (path[0] !== "/") {
   var dir;
   if (dirfd === -100) {
    dir = FS.cwd();
   } else {
    var dirstream = FS.getStream(dirfd);
    if (!dirstream) throw new FS.ErrnoError(8);
    dir = dirstream.path;
   }
   path = PATH.join2(dir, path);
  }
  return path;
 },
 doStat: function(func, path, buf) {
  try {
   var stat = func(path);
  } catch (e) {
   if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
    return -54;
   }
   throw e;
  }
  GROWABLE_HEAP_STORE_I32(buf | 0, stat.dev);
  GROWABLE_HEAP_STORE_I32(buf + 4 | 0, 0);
  GROWABLE_HEAP_STORE_I32(buf + 8 | 0, stat.ino);
  GROWABLE_HEAP_STORE_I32(buf + 12 | 0, stat.mode);
  GROWABLE_HEAP_STORE_I32(buf + 16 | 0, stat.nlink);
  GROWABLE_HEAP_STORE_I32(buf + 20 | 0, stat.uid);
  GROWABLE_HEAP_STORE_I32(buf + 24 | 0, stat.gid);
  GROWABLE_HEAP_STORE_I32(buf + 28 | 0, stat.rdev);
  GROWABLE_HEAP_STORE_I32(buf + 32 | 0, 0);
  tempI64 = [ stat.size >>> 0, (tempDouble = stat.size, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  GROWABLE_HEAP_STORE_I32(buf + 40 | 0, tempI64[0]), GROWABLE_HEAP_STORE_I32(buf + 44 | 0, tempI64[1]);
  GROWABLE_HEAP_STORE_I32(buf + 48 | 0, 4096);
  GROWABLE_HEAP_STORE_I32(buf + 52 | 0, stat.blocks);
  GROWABLE_HEAP_STORE_I32(buf + 56 | 0, stat.atime.getTime() / 1e3 | 0);
  GROWABLE_HEAP_STORE_I32(buf + 60 | 0, 0);
  GROWABLE_HEAP_STORE_I32(buf + 64 | 0, stat.mtime.getTime() / 1e3 | 0);
  GROWABLE_HEAP_STORE_I32(buf + 68 | 0, 0);
  GROWABLE_HEAP_STORE_I32(buf + 72 | 0, stat.ctime.getTime() / 1e3 | 0);
  GROWABLE_HEAP_STORE_I32(buf + 76 | 0, 0);
  tempI64 = [ stat.ino >>> 0, (tempDouble = stat.ino, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  GROWABLE_HEAP_STORE_I32(buf + 80 | 0, tempI64[0]), GROWABLE_HEAP_STORE_I32(buf + 84 | 0, tempI64[1]);
  return 0;
 },
 doMsync: function(addr, stream, len, flags) {
  var buffer = new Uint8Array(HEAPU8.subarray(addr, addr + len));
  FS.msync(stream, buffer, 0, len, flags);
 },
 doMkdir: function(path, mode) {
  path = PATH.normalize(path);
  if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
  FS.mkdir(path, mode, 0);
  return 0;
 },
 doMknod: function(path, mode, dev) {
  switch (mode & 61440) {
  case 32768:
  case 8192:
  case 24576:
  case 4096:
  case 49152:
   break;

  default:
   return -28;
  }
  FS.mknod(path, mode, dev);
  return 0;
 },
 doReadlink: function(path, buf, bufsize) {
  if (bufsize <= 0) return -28;
  var ret = FS.readlink(path);
  var len = Math.min(bufsize, lengthBytesUTF8(ret));
  var endChar = GROWABLE_HEAP_LOAD_I8(buf + len | 0);
  stringToUTF8(ret, buf, bufsize + 1);
  GROWABLE_HEAP_STORE_I8(buf + len | 0, endChar);
  return len;
 },
 doAccess: function(path, amode) {
  if (amode & ~7) {
   return -28;
  }
  var node;
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  node = lookup.node;
  if (!node) {
   return -44;
  }
  var perms = "";
  if (amode & 4) perms += "r";
  if (amode & 2) perms += "w";
  if (amode & 1) perms += "x";
  if (perms && FS.nodePermissions(node, perms)) {
   return -2;
  }
  return 0;
 },
 doDup: function(path, flags, suggestFD) {
  var suggest = FS.getStream(suggestFD);
  if (suggest) FS.close(suggest);
  return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
 },
 doReadv: function(stream, iov, iovcnt, offset) {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
   var ptr = GROWABLE_HEAP_LOAD_I32(iov + i * 8 | 0);
   var len = GROWABLE_HEAP_LOAD_I32(iov + (i * 8 + 4) | 0);
   var curr = FS.read(stream, HEAP8, ptr, len, offset);
   if (curr < 0) return -1;
   ret += curr;
   if (curr < len) break;
  }
  return ret;
 },
 doWritev: function(stream, iov, iovcnt, offset) {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
   var ptr = GROWABLE_HEAP_LOAD_I32(iov + i * 8 | 0);
   var len = GROWABLE_HEAP_LOAD_I32(iov + (i * 8 + 4) | 0);
   var curr = FS.write(stream, HEAP8, ptr, len, offset);
   if (curr < 0) return -1;
   ret += curr;
  }
  return ret;
 },
 varargs: 0,
 get: function(varargs) {
  SYSCALLS.varargs += 4;
  var ret = GROWABLE_HEAP_LOAD_I32(SYSCALLS.varargs - 4 | 0);
  return ret;
 },
 getStr: function() {
  var ret = UTF8ToString(SYSCALLS.get());
  return ret;
 },
 getStreamFromFD: function(fd) {
  if (!fd) fd = SYSCALLS.get();
  var stream = FS.getStream(fd);
  if (!stream) throw new FS.ErrnoError(8);
  return stream;
 },
 get64: function() {
  var low = SYSCALLS.get(), high = SYSCALLS.get();
  return low;
 },
 getZero: function() {
  SYSCALLS.get();
 }
};

function ___syscall10(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(1, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var path = SYSCALLS.getStr();
  FS.unlink(path);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall118(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(2, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD();
  return Asyncify.handleSleep(function(wakeUp) {
   var mount = stream.node.mount;
   if (!mount.type.syncfs) {
    wakeUp(0);
    return;
   }
   mount.type.syncfs(mount, false, function(err) {
    if (err) {
     wakeUp(function() {
      return -29;
     });
     return;
    }
    wakeUp(0);
   });
  });
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall12(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(3, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var path = SYSCALLS.getStr();
  FS.chdir(path);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall122(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(4, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var buf = SYSCALLS.get();
  if (!buf) return -21;
  var layout = {
   "sysname": 0,
   "nodename": 65,
   "domainname": 325,
   "machine": 260,
   "version": 195,
   "release": 130,
   "__size__": 390
  };
  var copyString = function(element, value) {
   var offset = layout[element];
   writeAsciiToMemory(value, buf + offset);
  };
  copyString("sysname", "Emscripten");
  copyString("nodename", "emscripten");
  copyString("release", "1.0");
  copyString("version", "#1");
  copyString("machine", "x86-JS");
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall132(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(5, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var pid = SYSCALLS.get();
  if (pid && pid !== PROCINFO.pid) return -71;
  return PROCINFO.pgid;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall133(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(6, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD();
  FS.chdir(stream.path);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall14(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(7, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var path = SYSCALLS.getStr(), mode = SYSCALLS.get(), dev = SYSCALLS.get();
  return SYSCALLS.doMknod(path, mode, dev);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall140(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(8, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), offset_high = SYSCALLS.get(), offset_low = SYSCALLS.get(), result = SYSCALLS.get(), whence = SYSCALLS.get();
  var HIGH_OFFSET = 4294967296;
  var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
  var DOUBLE_LIMIT = 9007199254740992;
  if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
   return -61;
  }
  FS.llseek(stream, offset, whence);
  tempI64 = [ stream.position >>> 0, (tempDouble = stream.position, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  GROWABLE_HEAP_STORE_I32(result | 0, tempI64[0]), GROWABLE_HEAP_STORE_I32(result + 4 | 0, tempI64[1]);
  if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall142(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(9, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var nfds = SYSCALLS.get(), readfds = SYSCALLS.get(), writefds = SYSCALLS.get(), exceptfds = SYSCALLS.get(), timeout = SYSCALLS.get();
  var total = 0;
  var srcReadLow = readfds ? GROWABLE_HEAP_LOAD_I32(readfds | 0) : 0, srcReadHigh = readfds ? GROWABLE_HEAP_LOAD_I32(readfds + 4 | 0) : 0;
  var srcWriteLow = writefds ? GROWABLE_HEAP_LOAD_I32(writefds | 0) : 0, srcWriteHigh = writefds ? GROWABLE_HEAP_LOAD_I32(writefds + 4 | 0) : 0;
  var srcExceptLow = exceptfds ? GROWABLE_HEAP_LOAD_I32(exceptfds | 0) : 0, srcExceptHigh = exceptfds ? GROWABLE_HEAP_LOAD_I32(exceptfds + 4 | 0) : 0;
  var dstReadLow = 0, dstReadHigh = 0;
  var dstWriteLow = 0, dstWriteHigh = 0;
  var dstExceptLow = 0, dstExceptHigh = 0;
  var allLow = (readfds ? GROWABLE_HEAP_LOAD_I32(readfds | 0) : 0) | (writefds ? GROWABLE_HEAP_LOAD_I32(writefds | 0) : 0) | (exceptfds ? GROWABLE_HEAP_LOAD_I32(exceptfds | 0) : 0);
  var allHigh = (readfds ? GROWABLE_HEAP_LOAD_I32(readfds + 4 | 0) : 0) | (writefds ? GROWABLE_HEAP_LOAD_I32(writefds + 4 | 0) : 0) | (exceptfds ? GROWABLE_HEAP_LOAD_I32(exceptfds + 4 | 0) : 0);
  var check = function(fd, low, high, val) {
   return fd < 32 ? low & val : high & val;
  };
  for (var fd = 0; fd < nfds; fd++) {
   var mask = 1 << fd % 32;
   if (!check(fd, allLow, allHigh, mask)) {
    continue;
   }
   var stream = FS.getStream(fd);
   if (!stream) throw new FS.ErrnoError(8);
   var flags = SYSCALLS.DEFAULT_POLLMASK;
   if (stream.stream_ops.poll) {
    flags = stream.stream_ops.poll(stream);
   }
   if (flags & 1 && check(fd, srcReadLow, srcReadHigh, mask)) {
    fd < 32 ? dstReadLow = dstReadLow | mask : dstReadHigh = dstReadHigh | mask;
    total++;
   }
   if (flags & 4 && check(fd, srcWriteLow, srcWriteHigh, mask)) {
    fd < 32 ? dstWriteLow = dstWriteLow | mask : dstWriteHigh = dstWriteHigh | mask;
    total++;
   }
   if (flags & 2 && check(fd, srcExceptLow, srcExceptHigh, mask)) {
    fd < 32 ? dstExceptLow = dstExceptLow | mask : dstExceptHigh = dstExceptHigh | mask;
    total++;
   }
  }
  if (readfds) {
   GROWABLE_HEAP_STORE_I32(readfds | 0, dstReadLow);
   GROWABLE_HEAP_STORE_I32(readfds + 4 | 0, dstReadHigh);
  }
  if (writefds) {
   GROWABLE_HEAP_STORE_I32(writefds | 0, dstWriteLow);
   GROWABLE_HEAP_STORE_I32(writefds + 4 | 0, dstWriteHigh);
  }
  if (exceptfds) {
   GROWABLE_HEAP_STORE_I32(exceptfds | 0, dstExceptLow);
   GROWABLE_HEAP_STORE_I32(exceptfds + 4 | 0, dstExceptHigh);
  }
  return total;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall144(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(10, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var addr = SYSCALLS.get(), len = SYSCALLS.get(), flags = SYSCALLS.get();
  var info = SYSCALLS.mappings[addr];
  if (!info) return 0;
  SYSCALLS.doMsync(addr, FS.getStream(info.fd), len, info.flags);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall145(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(11, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), iov = SYSCALLS.get(), iovcnt = SYSCALLS.get();
  return SYSCALLS.doReadv(stream, iov, iovcnt);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall147(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(12, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var pid = SYSCALLS.get();
  if (pid && pid !== PROCINFO.pid) return -71;
  return PROCINFO.sid;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall148(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(13, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD();
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall15(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(14, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var path = SYSCALLS.getStr(), mode = SYSCALLS.get();
  FS.chmod(path, mode);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall163(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(15, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  return -48;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall180(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(16, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), buf = SYSCALLS.get(), count = SYSCALLS.get(), zero = SYSCALLS.getZero(), offset = SYSCALLS.get64();
  return FS.read(stream, HEAP8, buf, count, offset);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall181(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(17, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), buf = SYSCALLS.get(), count = SYSCALLS.get(), zero = SYSCALLS.getZero(), offset = SYSCALLS.get64();
  return FS.write(stream, HEAP8, buf, count, offset);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall183(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(18, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var buf = SYSCALLS.get(), size = SYSCALLS.get();
  if (size === 0) return -28;
  var cwd = FS.cwd();
  var cwdLengthInBytes = lengthBytesUTF8(cwd);
  if (size < cwdLengthInBytes + 1) return -68;
  stringToUTF8(cwd, buf, size);
  return buf;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall191(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(19, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var resource = SYSCALLS.get(), rlim = SYSCALLS.get();
  GROWABLE_HEAP_STORE_I32(rlim | 0, -1);
  GROWABLE_HEAP_STORE_I32(rlim + 4 | 0, -1);
  GROWABLE_HEAP_STORE_I32(rlim + 8 | 0, -1);
  GROWABLE_HEAP_STORE_I32(rlim + 12 | 0, -1);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function _memset(ptr, value, num) {
 ptr = ptr | 0;
 value = value | 0;
 num = num | 0;
 var end = 0, aligned_end = 0, block_aligned_end = 0, value4 = 0;
 end = ptr + num | 0;
 value = value & 255;
 if ((num | 0) >= 67) {
  while ((ptr & 3) != 0) {
   GROWABLE_HEAP_STORE_I8(ptr >> 0 | 0, value);
   ptr = ptr + 1 | 0;
  }
  aligned_end = end & -4 | 0;
  value4 = value | value << 8 | value << 16 | value << 24;
  block_aligned_end = aligned_end - 64 | 0;
  while ((ptr | 0) <= (block_aligned_end | 0)) {
   GROWABLE_HEAP_STORE_I32(ptr | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 4 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 8 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 12 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 16 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 20 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 24 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 28 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 32 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 36 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 40 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 44 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 48 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 52 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 56 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 60 | 0, value4);
   ptr = ptr + 64 | 0;
  }
  while ((ptr | 0) < (aligned_end | 0)) {
   GROWABLE_HEAP_STORE_I32(ptr | 0, value4);
   ptr = ptr + 4 | 0;
  }
 }
 while ((ptr | 0) < (end | 0)) {
  GROWABLE_HEAP_STORE_I8(ptr >> 0 | 0, value);
  ptr = ptr + 1 | 0;
 }
 return end - num | 0;
}

function __emscripten_syscall_mmap2(addr, len, prot, flags, fd, off) {
 off <<= 12;
 var ptr;
 var allocated = false;
 if ((flags & 16) !== 0 && addr % PAGE_SIZE !== 0) {
  return -28;
 }
 if ((flags & 32) !== 0) {
  ptr = _memalign(PAGE_SIZE, len);
  if (!ptr) return -48;
  _memset(ptr, 0, len);
  allocated = true;
 } else {
  var info = FS.getStream(fd);
  if (!info) return -8;
  var res = FS.mmap(info, HEAPU8, addr, len, off, prot, flags);
  ptr = res.ptr;
  allocated = res.allocated;
 }
 SYSCALLS.mappings[ptr] = {
  malloc: ptr,
  len: len,
  allocated: allocated,
  fd: fd,
  flags: flags
 };
 return ptr;
}

function ___syscall192(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(20, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var addr = SYSCALLS.get(), len = SYSCALLS.get(), prot = SYSCALLS.get(), flags = SYSCALLS.get(), fd = SYSCALLS.get(), off = SYSCALLS.get();
  return __emscripten_syscall_mmap2(addr, len, prot, flags, fd, off);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall193(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(21, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var path = SYSCALLS.getStr(), zero = SYSCALLS.getZero(), length = SYSCALLS.get64();
  FS.truncate(path, length);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall194(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(22, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var fd = SYSCALLS.get(), zero = SYSCALLS.getZero(), length = SYSCALLS.get64();
  FS.ftruncate(fd, length);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall195(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(23, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var path = SYSCALLS.getStr(), buf = SYSCALLS.get();
  return SYSCALLS.doStat(FS.stat, path, buf);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall196(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(24, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var path = SYSCALLS.getStr(), buf = SYSCALLS.get();
  return SYSCALLS.doStat(FS.lstat, path, buf);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall197(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(25, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), buf = SYSCALLS.get();
  return SYSCALLS.doStat(FS.stat, stream.path, buf);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall198(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(26, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var path = SYSCALLS.getStr(), owner = SYSCALLS.get(), group = SYSCALLS.get();
  FS.chown(path, owner, group);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall202(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(27, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall199(a0, a1) {
 return ___syscall202(a0, a1);
}

function ___syscall20(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(28, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  return PROCINFO.pid;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall200(a0, a1) {
 return ___syscall202(a0, a1);
}

function ___syscall201(a0, a1) {
 return ___syscall202(a0, a1);
}

function ___syscall205(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(29, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var size = SYSCALLS.get(), list = SYSCALLS.get();
  if (size < 1) return -28;
  GROWABLE_HEAP_STORE_I32(list | 0, 0);
  return 1;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall207(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(30, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var fd = SYSCALLS.get(), owner = SYSCALLS.get(), group = SYSCALLS.get();
  FS.fchown(fd, owner, group);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall211(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(31, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var ruid = SYSCALLS.get(), euid = SYSCALLS.get(), suid = SYSCALLS.get();
  GROWABLE_HEAP_STORE_I32(ruid | 0, 0);
  GROWABLE_HEAP_STORE_I32(euid | 0, 0);
  GROWABLE_HEAP_STORE_I32(suid | 0, 0);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall209(a0, a1) {
 return ___syscall211(a0, a1);
}

function ___syscall212(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(32, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var path = SYSCALLS.getStr(), owner = SYSCALLS.get(), group = SYSCALLS.get();
  FS.chown(path, owner, group);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall219(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(33, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall220(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(34, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), dirp = SYSCALLS.get(), count = SYSCALLS.get();
  if (!stream.getdents) {
   stream.getdents = FS.readdir(stream.path);
  }
  var struct_size = 280;
  var pos = 0;
  var off = FS.llseek(stream, 0, 1);
  var idx = Math.floor(off / struct_size);
  while (idx < stream.getdents.length && pos + struct_size <= count) {
   var id;
   var type;
   var name = stream.getdents[idx];
   if (name[0] === ".") {
    id = 1;
    type = 4;
   } else {
    var child = FS.lookupNode(stream.node, name);
    id = child.id;
    type = FS.isChrdev(child.mode) ? 2 : FS.isDir(child.mode) ? 4 : FS.isLink(child.mode) ? 10 : 8;
   }
   tempI64 = [ id >>> 0, (tempDouble = id, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
   GROWABLE_HEAP_STORE_I32(dirp + pos | 0, tempI64[0]), GROWABLE_HEAP_STORE_I32(dirp + pos + 4 | 0, tempI64[1]);
   tempI64 = [ (idx + 1) * struct_size >>> 0, (tempDouble = (idx + 1) * struct_size, 
   +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
   GROWABLE_HEAP_STORE_I32(dirp + pos + 8 | 0, tempI64[0]), GROWABLE_HEAP_STORE_I32(dirp + pos + 12 | 0, tempI64[1]);
   GROWABLE_HEAP_STORE_I16(dirp + pos + 16 | 0, 280);
   GROWABLE_HEAP_STORE_I8(dirp + pos + 18 >> 0 | 0, type);
   stringToUTF8(name, dirp + pos + 19, 256);
   pos += struct_size;
   idx += 1;
  }
  FS.llseek(stream, idx * struct_size, 0);
  return pos;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall221(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(35, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), cmd = SYSCALLS.get();
  switch (cmd) {
  case 0:
   {
    var arg = SYSCALLS.get();
    if (arg < 0) {
     return -28;
    }
    var newStream;
    newStream = FS.open(stream.path, stream.flags, 0, arg);
    return newStream.fd;
   }

  case 1:
  case 2:
   return 0;

  case 3:
   return stream.flags;

  case 4:
   {
    var arg = SYSCALLS.get();
    stream.flags |= arg;
    return 0;
   }

  case 12:
   {
    var arg = SYSCALLS.get();
    var offset = 0;
    GROWABLE_HEAP_STORE_I16(arg + offset | 0, 2);
    return 0;
   }

  case 13:
  case 14:
   return 0;

  case 16:
  case 8:
   return -28;

  case 9:
   ___setErrNo(28);
   return -1;

  default:
   {
    return -28;
   }
  }
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall268(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(36, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var path = SYSCALLS.getStr(), size = SYSCALLS.get(), buf = SYSCALLS.get();
  GROWABLE_HEAP_STORE_I32(buf + 4 | 0, 4096);
  GROWABLE_HEAP_STORE_I32(buf + 40 | 0, 4096);
  GROWABLE_HEAP_STORE_I32(buf + 8 | 0, 1e6);
  GROWABLE_HEAP_STORE_I32(buf + 12 | 0, 5e5);
  GROWABLE_HEAP_STORE_I32(buf + 16 | 0, 5e5);
  GROWABLE_HEAP_STORE_I32(buf + 20 | 0, FS.nextInode);
  GROWABLE_HEAP_STORE_I32(buf + 24 | 0, 1e6);
  GROWABLE_HEAP_STORE_I32(buf + 28 | 0, 42);
  GROWABLE_HEAP_STORE_I32(buf + 44 | 0, 2);
  GROWABLE_HEAP_STORE_I32(buf + 36 | 0, 255);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall269(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(37, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), size = SYSCALLS.get(), buf = SYSCALLS.get();
  return ___syscall([ 268, 0, size, buf ], 0);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall272(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(38, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall29(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(39, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  return -27;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall295(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(40, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), flags = SYSCALLS.get(), mode = SYSCALLS.get();
  path = SYSCALLS.calculateAt(dirfd, path);
  return FS.open(path, flags, mode).fd;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall296(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(41, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), mode = SYSCALLS.get();
  path = SYSCALLS.calculateAt(dirfd, path);
  return SYSCALLS.doMkdir(path, mode);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall297(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(42, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), mode = SYSCALLS.get(), dev = SYSCALLS.get();
  path = SYSCALLS.calculateAt(dirfd, path);
  return SYSCALLS.doMknod(path, mode, dev);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall298(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(43, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), owner = SYSCALLS.get(), group = SYSCALLS.get(), flags = SYSCALLS.get();
  path = SYSCALLS.calculateAt(dirfd, path);
  FS.chown(path, owner, group);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall3(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(44, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), buf = SYSCALLS.get(), count = SYSCALLS.get();
  return FS.read(stream, HEAP8, buf, count);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall300(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(45, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), buf = SYSCALLS.get(), flags = SYSCALLS.get();
  var nofollow = flags & 256;
  flags = flags & ~256;
  path = SYSCALLS.calculateAt(dirfd, path);
  return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall301(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(46, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), flags = SYSCALLS.get();
  path = SYSCALLS.calculateAt(dirfd, path);
  if (flags === 0) {
   FS.unlink(path);
  } else if (flags === 512) {
   FS.rmdir(path);
  } else {
   abort("Invalid flags passed to unlinkat");
  }
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall302(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(47, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var olddirfd = SYSCALLS.get(), oldpath = SYSCALLS.getStr(), newdirfd = SYSCALLS.get(), newpath = SYSCALLS.getStr();
  oldpath = SYSCALLS.calculateAt(olddirfd, oldpath);
  newpath = SYSCALLS.calculateAt(newdirfd, newpath);
  FS.rename(oldpath, newpath);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall303(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(48, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  return -34;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall304(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(49, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var target = SYSCALLS.get(), newdirfd = SYSCALLS.get(), linkpath = SYSCALLS.get();
  linkpath = SYSCALLS.calculateAt(newdirfd, linkpath);
  FS.symlink(target, linkpath);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall305(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(50, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), buf = SYSCALLS.get(), bufsize = SYSCALLS.get();
  path = SYSCALLS.calculateAt(dirfd, path);
  return SYSCALLS.doReadlink(path, buf, bufsize);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall306(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(51, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), mode = SYSCALLS.get(), flags = SYSCALLS.get();
  path = SYSCALLS.calculateAt(dirfd, path);
  FS.chmod(path, mode);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall320(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(52, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), times = SYSCALLS.get(), flags = SYSCALLS.get();
  path = SYSCALLS.calculateAt(dirfd, path);
  var seconds = GROWABLE_HEAP_LOAD_I32(times | 0);
  var nanoseconds = GROWABLE_HEAP_LOAD_I32(times + 4 | 0);
  var atime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
  times += 8;
  seconds = GROWABLE_HEAP_LOAD_I32(times | 0);
  nanoseconds = GROWABLE_HEAP_LOAD_I32(times + 4 | 0);
  var mtime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
  FS.utime(path, atime, mtime);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall324(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(53, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), mode = SYSCALLS.get(), offset = SYSCALLS.get64(), len = SYSCALLS.get64();
  FS.allocate(stream, offset, len);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall33(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(54, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var path = SYSCALLS.getStr(), amode = SYSCALLS.get();
  return SYSCALLS.doAccess(path, amode);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall330(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(55, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var old = SYSCALLS.getStreamFromFD(), suggestFD = SYSCALLS.get(), flags = SYSCALLS.get();
  if (old.fd === suggestFD) return -28;
  return SYSCALLS.doDup(old.path, old.flags, suggestFD);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall331(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(56, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  return -52;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall333(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(57, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), iov = SYSCALLS.get(), iovcnt = SYSCALLS.get(), offset = SYSCALLS.get();
  return SYSCALLS.doReadv(stream, iov, iovcnt, offset);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall334(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(58, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), iov = SYSCALLS.get(), iovcnt = SYSCALLS.get(), offset = SYSCALLS.get();
  return SYSCALLS.doWritev(stream, iov, iovcnt, offset);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall34(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(59, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var inc = SYSCALLS.get();
  return -63;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall340(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(60, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var pid = SYSCALLS.get(), resource = SYSCALLS.get(), new_limit = SYSCALLS.get(), old_limit = SYSCALLS.get();
  if (old_limit) {
   GROWABLE_HEAP_STORE_I32(old_limit | 0, -1);
   GROWABLE_HEAP_STORE_I32(old_limit + 4 | 0, -1);
   GROWABLE_HEAP_STORE_I32(old_limit + 8 | 0, -1);
   GROWABLE_HEAP_STORE_I32(old_limit + 12 | 0, -1);
  }
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall36(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(61, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall38(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(62, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var old_path = SYSCALLS.getStr(), new_path = SYSCALLS.getStr();
  FS.rename(old_path, new_path);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall39(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(63, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var path = SYSCALLS.getStr(), mode = SYSCALLS.get();
  return SYSCALLS.doMkdir(path, mode);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall4(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(64, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), buf = SYSCALLS.get(), count = SYSCALLS.get();
  return FS.write(stream, HEAP8, buf, count);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall40(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(65, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var path = SYSCALLS.getStr();
  FS.rmdir(path);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

var PIPEFS = {
 BUCKET_BUFFER_SIZE: 8192,
 mount: function(mount) {
  return FS.createNode(null, "/", 16384 | 511, 0);
 },
 createPipe: function() {
  var pipe = {
   buckets: []
  };
  pipe.buckets.push({
   buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
   offset: 0,
   roffset: 0
  });
  var rName = PIPEFS.nextname();
  var wName = PIPEFS.nextname();
  var rNode = FS.createNode(PIPEFS.root, rName, 4096, 0);
  var wNode = FS.createNode(PIPEFS.root, wName, 4096, 0);
  rNode.pipe = pipe;
  wNode.pipe = pipe;
  var readableStream = FS.createStream({
   path: rName,
   node: rNode,
   flags: FS.modeStringToFlags("r"),
   seekable: false,
   stream_ops: PIPEFS.stream_ops
  });
  rNode.stream = readableStream;
  var writableStream = FS.createStream({
   path: wName,
   node: wNode,
   flags: FS.modeStringToFlags("w"),
   seekable: false,
   stream_ops: PIPEFS.stream_ops
  });
  wNode.stream = writableStream;
  return {
   readable_fd: readableStream.fd,
   writable_fd: writableStream.fd
  };
 },
 stream_ops: {
  poll: function(stream) {
   var pipe = stream.node.pipe;
   if ((stream.flags & 2097155) === 1) {
    return 256 | 4;
   } else {
    if (pipe.buckets.length > 0) {
     for (var i = 0; i < pipe.buckets.length; i++) {
      var bucket = pipe.buckets[i];
      if (bucket.offset - bucket.roffset > 0) {
       return 64 | 1;
      }
     }
    }
   }
   return 0;
  },
  ioctl: function(stream, request, varargs) {
   return ERRNO_CODES.EINVAL;
  },
  fsync: function(stream) {
   return ERRNO_CODES.EINVAL;
  },
  read: function(stream, buffer, offset, length, position) {
   var pipe = stream.node.pipe;
   var currentLength = 0;
   for (var i = 0; i < pipe.buckets.length; i++) {
    var bucket = pipe.buckets[i];
    currentLength += bucket.offset - bucket.roffset;
   }
   assert(buffer instanceof ArrayBuffer || buffer instanceof SharedArrayBuffer || ArrayBuffer.isView(buffer));
   var data = buffer.subarray(offset, offset + length);
   if (length <= 0) {
    return 0;
   }
   if (currentLength == 0) {
    throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
   }
   var toRead = Math.min(currentLength, length);
   var totalRead = toRead;
   var toRemove = 0;
   for (var i = 0; i < pipe.buckets.length; i++) {
    var currBucket = pipe.buckets[i];
    var bucketSize = currBucket.offset - currBucket.roffset;
    if (toRead <= bucketSize) {
     var tmpSlice = currBucket.buffer.subarray(currBucket.roffset, currBucket.offset);
     if (toRead < bucketSize) {
      tmpSlice = tmpSlice.subarray(0, toRead);
      currBucket.roffset += toRead;
     } else {
      toRemove++;
     }
     data.set(tmpSlice);
     break;
    } else {
     var tmpSlice = currBucket.buffer.subarray(currBucket.roffset, currBucket.offset);
     data.set(tmpSlice);
     data = data.subarray(tmpSlice.byteLength);
     toRead -= tmpSlice.byteLength;
     toRemove++;
    }
   }
   if (toRemove && toRemove == pipe.buckets.length) {
    toRemove--;
    pipe.buckets[toRemove].offset = 0;
    pipe.buckets[toRemove].roffset = 0;
   }
   pipe.buckets.splice(0, toRemove);
   return totalRead;
  },
  write: function(stream, buffer, offset, length, position) {
   var pipe = stream.node.pipe;
   assert(buffer instanceof ArrayBuffer || buffer instanceof SharedArrayBuffer || ArrayBuffer.isView(buffer));
   var data = buffer.subarray(offset, offset + length);
   var dataLen = data.byteLength;
   if (dataLen <= 0) {
    return 0;
   }
   var currBucket = null;
   if (pipe.buckets.length == 0) {
    currBucket = {
     buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
     offset: 0,
     roffset: 0
    };
    pipe.buckets.push(currBucket);
   } else {
    currBucket = pipe.buckets[pipe.buckets.length - 1];
   }
   assert(currBucket.offset <= PIPEFS.BUCKET_BUFFER_SIZE);
   var freeBytesInCurrBuffer = PIPEFS.BUCKET_BUFFER_SIZE - currBucket.offset;
   if (freeBytesInCurrBuffer >= dataLen) {
    currBucket.buffer.set(data, currBucket.offset);
    currBucket.offset += dataLen;
    return dataLen;
   } else if (freeBytesInCurrBuffer > 0) {
    currBucket.buffer.set(data.subarray(0, freeBytesInCurrBuffer), currBucket.offset);
    currBucket.offset += freeBytesInCurrBuffer;
    data = data.subarray(freeBytesInCurrBuffer, data.byteLength);
   }
   var numBuckets = data.byteLength / PIPEFS.BUCKET_BUFFER_SIZE | 0;
   var remElements = data.byteLength % PIPEFS.BUCKET_BUFFER_SIZE;
   for (var i = 0; i < numBuckets; i++) {
    var newBucket = {
     buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
     offset: PIPEFS.BUCKET_BUFFER_SIZE,
     roffset: 0
    };
    pipe.buckets.push(newBucket);
    newBucket.buffer.set(data.subarray(0, PIPEFS.BUCKET_BUFFER_SIZE));
    data = data.subarray(PIPEFS.BUCKET_BUFFER_SIZE, data.byteLength);
   }
   if (remElements > 0) {
    var newBucket = {
     buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
     offset: data.byteLength,
     roffset: 0
    };
    pipe.buckets.push(newBucket);
    newBucket.buffer.set(data);
   }
   return dataLen;
  },
  close: function(stream) {
   var pipe = stream.node.pipe;
   pipe.buckets = null;
  }
 },
 nextname: function() {
  if (!PIPEFS.nextname.current) {
   PIPEFS.nextname.current = 0;
  }
  return "pipe[" + PIPEFS.nextname.current++ + "]";
 }
};

function ___syscall42(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(66, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var fdPtr = SYSCALLS.get();
  if (fdPtr == 0) {
   throw new FS.ErrnoError(21);
  }
  var res = PIPEFS.createPipe();
  GROWABLE_HEAP_STORE_I32(fdPtr | 0, res.readable_fd);
  GROWABLE_HEAP_STORE_I32(fdPtr + 4 | 0, res.writable_fd);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall5(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(67, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var pathname = SYSCALLS.getStr(), flags = SYSCALLS.get(), mode = SYSCALLS.get();
  var stream = FS.open(pathname, flags, mode);
  return stream.fd;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall54(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(68, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), op = SYSCALLS.get();
  switch (op) {
  case 21509:
  case 21505:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21510:
  case 21511:
  case 21512:
  case 21506:
  case 21507:
  case 21508:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21519:
   {
    if (!stream.tty) return -59;
    var argp = SYSCALLS.get();
    GROWABLE_HEAP_STORE_I32(argp | 0, 0);
    return 0;
   }

  case 21520:
   {
    if (!stream.tty) return -59;
    return -28;
   }

  case 21531:
   {
    var argp = SYSCALLS.get();
    return FS.ioctl(stream, op, argp);
   }

  case 21523:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21524:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  default:
   abort("bad ioctl syscall " + op);
  }
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall57(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(69, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var pid = SYSCALLS.get(), pgid = SYSCALLS.get();
  if (pid && pid !== PROCINFO.pid) return -71;
  if (pgid && pgid !== PROCINFO.pgid) return -63;
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall60(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(70, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var mask = SYSCALLS.get();
  var old = SYSCALLS.umask;
  SYSCALLS.umask = mask;
  return old;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall63(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(71, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var old = SYSCALLS.getStreamFromFD(), suggestFD = SYSCALLS.get();
  if (old.fd === suggestFD) return suggestFD;
  return SYSCALLS.doDup(old.path, old.flags, suggestFD);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall64(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(72, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  return PROCINFO.ppid;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall66(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(73, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall75(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(74, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall77(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(75, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var who = SYSCALLS.get(), usage = SYSCALLS.get();
  _memset(usage, 0, 136);
  GROWABLE_HEAP_STORE_I32(usage | 0, 1);
  GROWABLE_HEAP_STORE_I32(usage + 4 | 0, 2);
  GROWABLE_HEAP_STORE_I32(usage + 8 | 0, 3);
  GROWABLE_HEAP_STORE_I32(usage + 12 | 0, 4);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall83(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(76, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var target = SYSCALLS.getStr(), linkpath = SYSCALLS.getStr();
  FS.symlink(target, linkpath);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall85(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(77, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var path = SYSCALLS.getStr(), buf = SYSCALLS.get(), bufsize = SYSCALLS.get();
  return SYSCALLS.doReadlink(path, buf, bufsize);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall9(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(78, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var oldpath = SYSCALLS.get(), newpath = SYSCALLS.get();
  return -34;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function __emscripten_syscall_munmap(addr, len) {
 if (addr === -1 || len === 0) {
  return -28;
 }
 var info = SYSCALLS.mappings[addr];
 if (!info) return 0;
 if (len === info.len) {
  var stream = FS.getStream(info.fd);
  SYSCALLS.doMsync(addr, stream, len, info.flags);
  FS.munmap(stream);
  SYSCALLS.mappings[addr] = null;
  if (info.allocated) {
   _free(info.malloc);
  }
 }
 return 0;
}

function ___syscall91(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(79, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var addr = SYSCALLS.get(), len = SYSCALLS.get();
  return __emscripten_syscall_munmap(addr, len);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall94(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(80, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var fd = SYSCALLS.get(), mode = SYSCALLS.get();
  FS.fchmod(fd, mode);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall96(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(81, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall97(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(82, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  return -63;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___unlock() {}

function _exit(status) {
 exit(status);
}

function __exit(a0) {
 return _exit(a0);
}

function _abort() {
 abort();
}

var __sigalrm_handler = 0;

function _alarm(seconds) {
 setTimeout(function() {
  if (__sigalrm_handler) dynCall_vi(__sigalrm_handler, 0);
 }, seconds * 1e3);
}

function _chroot(path) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(83, 1, path);
 ___setErrNo(2);
 return -1;
}

function _clock() {
 if (_clock.start === undefined) _clock.start = Date.now();
 return (Date.now() - _clock.start) * (1e6 / 1e3) | 0;
}

function _emscripten_get_now_res() {
 if (ENVIRONMENT_IS_NODE) {
  return 1;
 } else if (typeof dateNow !== "undefined") {
  return 1e3;
 } else if (typeof performance === "object" && performance && typeof performance["now"] === "function") {
  return 1e3;
 } else {
  return 1e3 * 1e3;
 }
}

function _clock_getres(clk_id, res) {
 var nsec;
 if (clk_id === 0) {
  nsec = 1e3 * 1e3;
 } else if (clk_id === 1 && _emscripten_get_now_is_monotonic()) {
  nsec = _emscripten_get_now_res();
 } else {
  ___setErrNo(28);
  return -1;
 }
 GROWABLE_HEAP_STORE_I32(res | 0, nsec / 1e9 | 0);
 GROWABLE_HEAP_STORE_I32(res + 4 | 0, nsec);
 return 0;
}

function _clock_settime(clk_id, tp) {
 ___setErrNo(clk_id === 0 ? 63 : 28);
 return -1;
}

var ENV = {};

function _confstr(name, buf, len) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(84, 1, name, buf, len);
 var value;
 switch (name) {
 case 0:
  value = ENV["PATH"] || "/";
  break;

 case 1:
  value = "POSIX_V6_ILP32_OFF32\nPOSIX_V6_ILP32_OFFBIG";
  break;

 case 2:
  value = "glibc 2.14";
  break;

 case 3:
  value = "";
  break;

 case 1118:
 case 1122:
 case 1124:
 case 1125:
 case 1126:
 case 1128:
 case 1129:
 case 1130:
  value = "";
  break;

 case 1116:
 case 1117:
 case 1121:
  value = "-m32";
  break;

 case 1120:
  value = "-m32 -D_LARGEFILE_SOURCE -D_FILE_OFFSET_BITS=64";
  break;

 default:
  ___setErrNo(28);
  return 0;
 }
 if (len == 0 || buf == 0) {
  return value.length + 1;
 } else {
  var length = Math.min(len, value.length);
  for (var i = 0; i < length; i++) {
   GROWABLE_HEAP_STORE_I8(buf + i >> 0 | 0, value.charCodeAt(i));
  }
  if (len > length) GROWABLE_HEAP_STORE_I8(buf + i++ >> 0 | 0, 0);
  return i;
 }
}

function _dlopen() {
 abort("To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking");
}

function _dlerror() {
 return _dlopen.apply(null, arguments);
}

function _dlsym() {
 return _dlopen.apply(null, arguments);
}

function _emscripten_conditional_set_current_thread_status(expectedStatus, newStatus) {
 expectedStatus = expectedStatus | 0;
 newStatus = newStatus | 0;
}

function _emscripten_set_main_loop_timing(mode, value) {
 Browser.mainLoop.timingMode = mode;
 Browser.mainLoop.timingValue = value;
 if (!Browser.mainLoop.func) {
  return 1;
 }
 if (mode == 0) {
  Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
   var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
   setTimeout(Browser.mainLoop.runner, timeUntilNextTick);
  };
  Browser.mainLoop.method = "timeout";
 } else if (mode == 1) {
  Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
   Browser.requestAnimationFrame(Browser.mainLoop.runner);
  };
  Browser.mainLoop.method = "rAF";
 } else if (mode == 2) {
  if (typeof setImmediate === "undefined") {
   var setImmediates = [];
   var emscriptenMainLoopMessageId = "setimmediate";
   var Browser_setImmediate_messageHandler = function(event) {
    if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
     event.stopPropagation();
     setImmediates.shift()();
    }
   };
   addEventListener("message", Browser_setImmediate_messageHandler, true);
   setImmediate = function Browser_emulated_setImmediate(func) {
    setImmediates.push(func);
    if (ENVIRONMENT_IS_WORKER) {
     if (Module["setImmediates"] === undefined) Module["setImmediates"] = [];
     Module["setImmediates"].push(func);
     postMessage({
      target: emscriptenMainLoopMessageId
     });
    } else postMessage(emscriptenMainLoopMessageId, "*");
   };
  }
  Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
   setImmediate(Browser.mainLoop.runner);
  };
  Browser.mainLoop.method = "immediate";
 }
 return 0;
}

function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop, arg, noSetTiming) {
 noExitRuntime = true;
 assert(!Browser.mainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
 Browser.mainLoop.func = func;
 Browser.mainLoop.arg = arg;
 var browserIterationFunc;
 if (typeof arg !== "undefined") {
  browserIterationFunc = function() {
   Module["dynCall_vi"](func, arg);
  };
 } else {
  browserIterationFunc = function() {
   Module["dynCall_v"](func);
  };
 }
 var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop;
 Browser.mainLoop.runner = function Browser_mainLoop_runner() {
  if (ABORT) return;
  if (Browser.mainLoop.queue.length > 0) {
   var start = Date.now();
   var blocker = Browser.mainLoop.queue.shift();
   blocker.func(blocker.arg);
   if (Browser.mainLoop.remainingBlockers) {
    var remaining = Browser.mainLoop.remainingBlockers;
    var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
    if (blocker.counted) {
     Browser.mainLoop.remainingBlockers = next;
    } else {
     next = next + .5;
     Browser.mainLoop.remainingBlockers = (8 * remaining + next) / 9;
    }
   }
   console.log('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + " ms");
   Browser.mainLoop.updateStatus();
   if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
   setTimeout(Browser.mainLoop.runner, 0);
   return;
  }
  if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
  Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
  if (Browser.mainLoop.timingMode == 1 && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
   Browser.mainLoop.scheduler();
   return;
  } else if (Browser.mainLoop.timingMode == 0) {
   Browser.mainLoop.tickStartTime = _emscripten_get_now();
  }
  if (Browser.mainLoop.method === "timeout" && Module.ctx) {
   err("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!");
   Browser.mainLoop.method = "";
  }
  Browser.mainLoop.runIter(browserIterationFunc);
  if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
  if (typeof SDL === "object" && SDL.audio && SDL.audio.queueNewAudioData) SDL.audio.queueNewAudioData();
  Browser.mainLoop.scheduler();
 };
 if (!noSetTiming) {
  if (fps && fps > 0) _emscripten_set_main_loop_timing(0, 1e3 / fps); else _emscripten_set_main_loop_timing(1, 1);
  Browser.mainLoop.scheduler();
 }
 if (simulateInfiniteLoop) {
  throw "SimulateInfiniteLoop";
 }
}

var Browser = {
 mainLoop: {
  scheduler: null,
  method: "",
  currentlyRunningMainloop: 0,
  func: null,
  arg: 0,
  timingMode: 0,
  timingValue: 0,
  currentFrameNumber: 0,
  queue: [],
  pause: function() {
   Browser.mainLoop.scheduler = null;
   Browser.mainLoop.currentlyRunningMainloop++;
  },
  resume: function() {
   Browser.mainLoop.currentlyRunningMainloop++;
   var timingMode = Browser.mainLoop.timingMode;
   var timingValue = Browser.mainLoop.timingValue;
   var func = Browser.mainLoop.func;
   Browser.mainLoop.func = null;
   _emscripten_set_main_loop(func, 0, false, Browser.mainLoop.arg, true);
   _emscripten_set_main_loop_timing(timingMode, timingValue);
   Browser.mainLoop.scheduler();
  },
  updateStatus: function() {
   if (Module["setStatus"]) {
    var message = Module["statusMessage"] || "Please wait...";
    var remaining = Browser.mainLoop.remainingBlockers;
    var expected = Browser.mainLoop.expectedBlockers;
    if (remaining) {
     if (remaining < expected) {
      Module["setStatus"](message + " (" + (expected - remaining) + "/" + expected + ")");
     } else {
      Module["setStatus"](message);
     }
    } else {
     Module["setStatus"]("");
    }
   }
  },
  runIter: function(func) {
   if (ABORT) return;
   if (Module["preMainLoop"]) {
    var preRet = Module["preMainLoop"]();
    if (preRet === false) {
     return;
    }
   }
   try {
    func();
   } catch (e) {
    if (e instanceof ExitStatus) {
     return;
    } else {
     if (e && typeof e === "object" && e.stack) err("exception thrown: " + [ e, e.stack ]);
     throw e;
    }
   }
   if (Module["postMainLoop"]) Module["postMainLoop"]();
  }
 },
 isFullscreen: false,
 pointerLock: false,
 moduleContextCreatedCallbacks: [],
 workers: [],
 init: function() {
  if (!Module["preloadPlugins"]) Module["preloadPlugins"] = [];
  if (Browser.initted) return;
  Browser.initted = true;
  try {
   new Blob();
   Browser.hasBlobConstructor = true;
  } catch (e) {
   Browser.hasBlobConstructor = false;
   console.log("warning: no blob constructor, cannot create blobs with mimetypes");
  }
  Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : !Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null;
  Browser.URLObject = typeof window != "undefined" ? window.URL ? window.URL : window.webkitURL : undefined;
  if (!Module.noImageDecoding && typeof Browser.URLObject === "undefined") {
   console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
   Module.noImageDecoding = true;
  }
  var imagePlugin = {};
  imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
   return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
  };
  imagePlugin["handle"] = function imagePlugin_handle(byteArray, name, onload, onerror) {
   var b = null;
   if (Browser.hasBlobConstructor) {
    try {
     b = new Blob([ byteArray ], {
      type: Browser.getMimetype(name)
     });
     if (b.size !== byteArray.length) {
      b = new Blob([ new Uint8Array(byteArray).buffer ], {
       type: Browser.getMimetype(name)
      });
     }
    } catch (e) {
     warnOnce("Blob constructor present but fails: " + e + "; falling back to blob builder");
    }
   }
   if (!b) {
    var bb = new Browser.BlobBuilder();
    bb.append(new Uint8Array(byteArray).buffer);
    b = bb.getBlob();
   }
   var url = Browser.URLObject.createObjectURL(b);
   var img = new Image();
   img.onload = function img_onload() {
    assert(img.complete, "Image " + name + " could not be decoded");
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    Module["preloadedImages"][name] = canvas;
    Browser.URLObject.revokeObjectURL(url);
    if (onload) onload(byteArray);
   };
   img.onerror = function img_onerror(event) {
    console.log("Image " + url + " could not be decoded");
    if (onerror) onerror();
   };
   img.src = url;
  };
  Module["preloadPlugins"].push(imagePlugin);
  var audioPlugin = {};
  audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
   return !Module.noAudioDecoding && name.substr(-4) in {
    ".ogg": 1,
    ".wav": 1,
    ".mp3": 1
   };
  };
  audioPlugin["handle"] = function audioPlugin_handle(byteArray, name, onload, onerror) {
   var done = false;
   function finish(audio) {
    if (done) return;
    done = true;
    Module["preloadedAudios"][name] = audio;
    if (onload) onload(byteArray);
   }
   function fail() {
    if (done) return;
    done = true;
    Module["preloadedAudios"][name] = new Audio();
    if (onerror) onerror();
   }
   if (Browser.hasBlobConstructor) {
    try {
     var b = new Blob([ byteArray ], {
      type: Browser.getMimetype(name)
     });
    } catch (e) {
     return fail();
    }
    var url = Browser.URLObject.createObjectURL(b);
    var audio = new Audio();
    audio.addEventListener("canplaythrough", function() {
     finish(audio);
    }, false);
    audio.onerror = function audio_onerror(event) {
     if (done) return;
     console.log("warning: browser could not fully decode audio " + name + ", trying slower base64 approach");
     function encode64(data) {
      var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var PAD = "=";
      var ret = "";
      var leftchar = 0;
      var leftbits = 0;
      for (var i = 0; i < data.length; i++) {
       leftchar = leftchar << 8 | data[i];
       leftbits += 8;
       while (leftbits >= 6) {
        var curr = leftchar >> leftbits - 6 & 63;
        leftbits -= 6;
        ret += BASE[curr];
       }
      }
      if (leftbits == 2) {
       ret += BASE[(leftchar & 3) << 4];
       ret += PAD + PAD;
      } else if (leftbits == 4) {
       ret += BASE[(leftchar & 15) << 2];
       ret += PAD;
      }
      return ret;
     }
     audio.src = "data:audio/x-" + name.substr(-3) + ";base64," + encode64(byteArray);
     finish(audio);
    };
    audio.src = url;
    Browser.safeSetTimeout(function() {
     finish(audio);
    }, 1e4);
   } else {
    return fail();
   }
  };
  Module["preloadPlugins"].push(audioPlugin);
  function pointerLockChange() {
   Browser.pointerLock = document["pointerLockElement"] === Module["canvas"] || document["mozPointerLockElement"] === Module["canvas"] || document["webkitPointerLockElement"] === Module["canvas"] || document["msPointerLockElement"] === Module["canvas"];
  }
  var canvas = Module["canvas"];
  if (canvas) {
   canvas.requestPointerLock = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"] || canvas["webkitRequestPointerLock"] || canvas["msRequestPointerLock"] || function() {};
   canvas.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || function() {};
   canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
   document.addEventListener("pointerlockchange", pointerLockChange, false);
   document.addEventListener("mozpointerlockchange", pointerLockChange, false);
   document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
   document.addEventListener("mspointerlockchange", pointerLockChange, false);
   if (Module["elementPointerLock"]) {
    canvas.addEventListener("click", function(ev) {
     if (!Browser.pointerLock && Module["canvas"].requestPointerLock) {
      Module["canvas"].requestPointerLock();
      ev.preventDefault();
     }
    }, false);
   }
  }
 },
 createContext: function(canvas, useWebGL, setInModule, webGLContextAttributes) {
  if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx;
  var ctx;
  var contextHandle;
  if (useWebGL) {
   var contextAttributes = {
    antialias: false,
    alpha: false,
    majorVersion: 1
   };
   if (webGLContextAttributes) {
    for (var attribute in webGLContextAttributes) {
     contextAttributes[attribute] = webGLContextAttributes[attribute];
    }
   }
   if (typeof GL !== "undefined") {
    contextHandle = GL.createContext(canvas, contextAttributes);
    if (contextHandle) {
     ctx = GL.getContext(contextHandle).GLctx;
    }
   }
  } else {
   ctx = canvas.getContext("2d");
  }
  if (!ctx) return null;
  if (setInModule) {
   if (!useWebGL) assert(typeof GLctx === "undefined", "cannot set in module if GLctx is used, but we are a non-GL context that would replace it");
   Module.ctx = ctx;
   if (useWebGL) GL.makeContextCurrent(contextHandle);
   Module.useWebGL = useWebGL;
   Browser.moduleContextCreatedCallbacks.forEach(function(callback) {
    callback();
   });
   Browser.init();
  }
  return ctx;
 },
 destroyContext: function(canvas, useWebGL, setInModule) {},
 fullscreenHandlersInstalled: false,
 lockPointer: undefined,
 resizeCanvas: undefined,
 requestFullscreen: function(lockPointer, resizeCanvas, vrDevice) {
  Browser.lockPointer = lockPointer;
  Browser.resizeCanvas = resizeCanvas;
  Browser.vrDevice = vrDevice;
  if (typeof Browser.lockPointer === "undefined") Browser.lockPointer = true;
  if (typeof Browser.resizeCanvas === "undefined") Browser.resizeCanvas = false;
  if (typeof Browser.vrDevice === "undefined") Browser.vrDevice = null;
  var canvas = Module["canvas"];
  function fullscreenChange() {
   Browser.isFullscreen = false;
   var canvasContainer = canvas.parentNode;
   if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvasContainer) {
    canvas.exitFullscreen = Browser.exitFullscreen;
    if (Browser.lockPointer) canvas.requestPointerLock();
    Browser.isFullscreen = true;
    if (Browser.resizeCanvas) {
     Browser.setFullscreenCanvasSize();
    } else {
     Browser.updateCanvasDimensions(canvas);
    }
   } else {
    canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
    canvasContainer.parentNode.removeChild(canvasContainer);
    if (Browser.resizeCanvas) {
     Browser.setWindowedCanvasSize();
    } else {
     Browser.updateCanvasDimensions(canvas);
    }
   }
   if (Module["onFullScreen"]) Module["onFullScreen"](Browser.isFullscreen);
   if (Module["onFullscreen"]) Module["onFullscreen"](Browser.isFullscreen);
  }
  if (!Browser.fullscreenHandlersInstalled) {
   Browser.fullscreenHandlersInstalled = true;
   document.addEventListener("fullscreenchange", fullscreenChange, false);
   document.addEventListener("mozfullscreenchange", fullscreenChange, false);
   document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
   document.addEventListener("MSFullscreenChange", fullscreenChange, false);
  }
  var canvasContainer = document.createElement("div");
  canvas.parentNode.insertBefore(canvasContainer, canvas);
  canvasContainer.appendChild(canvas);
  canvasContainer.requestFullscreen = canvasContainer["requestFullscreen"] || canvasContainer["mozRequestFullScreen"] || canvasContainer["msRequestFullscreen"] || (canvasContainer["webkitRequestFullscreen"] ? function() {
   canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"]);
  } : null) || (canvasContainer["webkitRequestFullScreen"] ? function() {
   canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]);
  } : null);
  if (vrDevice) {
   canvasContainer.requestFullscreen({
    vrDisplay: vrDevice
   });
  } else {
   canvasContainer.requestFullscreen();
  }
 },
 requestFullScreen: function(lockPointer, resizeCanvas, vrDevice) {
  err("Browser.requestFullScreen() is deprecated. Please call Browser.requestFullscreen instead.");
  Browser.requestFullScreen = function(lockPointer, resizeCanvas, vrDevice) {
   return Browser.requestFullscreen(lockPointer, resizeCanvas, vrDevice);
  };
  return Browser.requestFullscreen(lockPointer, resizeCanvas, vrDevice);
 },
 exitFullscreen: function() {
  if (!Browser.isFullscreen) {
   return false;
  }
  var CFS = document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || function() {};
  CFS.apply(document, []);
  return true;
 },
 nextRAF: 0,
 fakeRequestAnimationFrame: function(func) {
  var now = Date.now();
  if (Browser.nextRAF === 0) {
   Browser.nextRAF = now + 1e3 / 60;
  } else {
   while (now + 2 >= Browser.nextRAF) {
    Browser.nextRAF += 1e3 / 60;
   }
  }
  var delay = Math.max(Browser.nextRAF - now, 0);
  setTimeout(func, delay);
 },
 requestAnimationFrame: function(func) {
  if (typeof requestAnimationFrame === "function") {
   requestAnimationFrame(func);
   return;
  }
  var RAF = Browser.fakeRequestAnimationFrame;
  RAF(func);
 },
 safeCallback: function(func) {
  return function() {
   if (!ABORT) return func.apply(null, arguments);
  };
 },
 allowAsyncCallbacks: true,
 queuedAsyncCallbacks: [],
 pauseAsyncCallbacks: function() {
  Browser.allowAsyncCallbacks = false;
 },
 resumeAsyncCallbacks: function() {
  Browser.allowAsyncCallbacks = true;
  if (Browser.queuedAsyncCallbacks.length > 0) {
   var callbacks = Browser.queuedAsyncCallbacks;
   Browser.queuedAsyncCallbacks = [];
   callbacks.forEach(function(func) {
    func();
   });
  }
 },
 safeRequestAnimationFrame: function(func) {
  return Browser.requestAnimationFrame(function() {
   if (ABORT) return;
   if (Browser.allowAsyncCallbacks) {
    func();
   } else {
    Browser.queuedAsyncCallbacks.push(func);
   }
  });
 },
 safeSetTimeout: function(func, timeout) {
  noExitRuntime = true;
  return setTimeout(function() {
   if (ABORT) return;
   if (Browser.allowAsyncCallbacks) {
    func();
   } else {
    Browser.queuedAsyncCallbacks.push(func);
   }
  }, timeout);
 },
 safeSetInterval: function(func, timeout) {
  noExitRuntime = true;
  return setInterval(function() {
   if (ABORT) return;
   if (Browser.allowAsyncCallbacks) {
    func();
   }
  }, timeout);
 },
 getMimetype: function(name) {
  return {
   "jpg": "image/jpeg",
   "jpeg": "image/jpeg",
   "png": "image/png",
   "bmp": "image/bmp",
   "ogg": "audio/ogg",
   "wav": "audio/wav",
   "mp3": "audio/mpeg"
  }[name.substr(name.lastIndexOf(".") + 1)];
 },
 getUserMedia: function(func) {
  if (!window.getUserMedia) {
   window.getUserMedia = navigator["getUserMedia"] || navigator["mozGetUserMedia"];
  }
  window.getUserMedia(func);
 },
 getMovementX: function(event) {
  return event["movementX"] || event["mozMovementX"] || event["webkitMovementX"] || 0;
 },
 getMovementY: function(event) {
  return event["movementY"] || event["mozMovementY"] || event["webkitMovementY"] || 0;
 },
 getMouseWheelDelta: function(event) {
  var delta = 0;
  switch (event.type) {
  case "DOMMouseScroll":
   delta = event.detail / 3;
   break;

  case "mousewheel":
   delta = event.wheelDelta / 120;
   break;

  case "wheel":
   delta = event.deltaY;
   switch (event.deltaMode) {
   case 0:
    delta /= 100;
    break;

   case 1:
    delta /= 3;
    break;

   case 2:
    delta *= 80;
    break;

   default:
    throw "unrecognized mouse wheel delta mode: " + event.deltaMode;
   }
   break;

  default:
   throw "unrecognized mouse wheel event: " + event.type;
  }
  return delta;
 },
 mouseX: 0,
 mouseY: 0,
 mouseMovementX: 0,
 mouseMovementY: 0,
 touches: {},
 lastTouches: {},
 calculateMouseEvent: function(event) {
  if (Browser.pointerLock) {
   if (event.type != "mousemove" && "mozMovementX" in event) {
    Browser.mouseMovementX = Browser.mouseMovementY = 0;
   } else {
    Browser.mouseMovementX = Browser.getMovementX(event);
    Browser.mouseMovementY = Browser.getMovementY(event);
   }
   if (typeof SDL != "undefined") {
    Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
    Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
   } else {
    Browser.mouseX += Browser.mouseMovementX;
    Browser.mouseY += Browser.mouseMovementY;
   }
  } else {
   var rect = Module["canvas"].getBoundingClientRect();
   var cw = Module["canvas"].width;
   var ch = Module["canvas"].height;
   var scrollX = typeof window.scrollX !== "undefined" ? window.scrollX : window.pageXOffset;
   var scrollY = typeof window.scrollY !== "undefined" ? window.scrollY : window.pageYOffset;
   if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
    var touch = event.touch;
    if (touch === undefined) {
     return;
    }
    var adjustedX = touch.pageX - (scrollX + rect.left);
    var adjustedY = touch.pageY - (scrollY + rect.top);
    adjustedX = adjustedX * (cw / rect.width);
    adjustedY = adjustedY * (ch / rect.height);
    var coords = {
     x: adjustedX,
     y: adjustedY
    };
    if (event.type === "touchstart") {
     Browser.lastTouches[touch.identifier] = coords;
     Browser.touches[touch.identifier] = coords;
    } else if (event.type === "touchend" || event.type === "touchmove") {
     var last = Browser.touches[touch.identifier];
     if (!last) last = coords;
     Browser.lastTouches[touch.identifier] = last;
     Browser.touches[touch.identifier] = coords;
    }
    return;
   }
   var x = event.pageX - (scrollX + rect.left);
   var y = event.pageY - (scrollY + rect.top);
   x = x * (cw / rect.width);
   y = y * (ch / rect.height);
   Browser.mouseMovementX = x - Browser.mouseX;
   Browser.mouseMovementY = y - Browser.mouseY;
   Browser.mouseX = x;
   Browser.mouseY = y;
  }
 },
 asyncLoad: function(url, onload, onerror, noRunDep) {
  var dep = !noRunDep ? getUniqueRunDependency("al " + url) : "";
  readAsync(url, function(arrayBuffer) {
   assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
   onload(new Uint8Array(arrayBuffer));
   if (dep) removeRunDependency(dep);
  }, function(event) {
   if (onerror) {
    onerror();
   } else {
    throw 'Loading data file "' + url + '" failed.';
   }
  });
  if (dep) addRunDependency(dep);
 },
 resizeListeners: [],
 updateResizeListeners: function() {
  var canvas = Module["canvas"];
  Browser.resizeListeners.forEach(function(listener) {
   listener(canvas.width, canvas.height);
  });
 },
 setCanvasSize: function(width, height, noUpdates) {
  var canvas = Module["canvas"];
  Browser.updateCanvasDimensions(canvas, width, height);
  if (!noUpdates) Browser.updateResizeListeners();
 },
 windowedWidth: 0,
 windowedHeight: 0,
 setFullscreenCanvasSize: function() {
  if (typeof SDL != "undefined") {
   var flags = GROWABLE_HEAP_LOAD_U32(SDL.screen | 0);
   flags = flags | 8388608;
   GROWABLE_HEAP_STORE_I32(SDL.screen | 0, flags);
  }
  Browser.updateCanvasDimensions(Module["canvas"]);
  Browser.updateResizeListeners();
 },
 setWindowedCanvasSize: function() {
  if (typeof SDL != "undefined") {
   var flags = GROWABLE_HEAP_LOAD_U32(SDL.screen | 0);
   flags = flags & ~8388608;
   GROWABLE_HEAP_STORE_I32(SDL.screen | 0, flags);
  }
  Browser.updateCanvasDimensions(Module["canvas"]);
  Browser.updateResizeListeners();
 },
 updateCanvasDimensions: function(canvas, wNative, hNative) {
  if (wNative && hNative) {
   canvas.widthNative = wNative;
   canvas.heightNative = hNative;
  } else {
   wNative = canvas.widthNative;
   hNative = canvas.heightNative;
  }
  var w = wNative;
  var h = hNative;
  if (Module["forcedAspectRatio"] && Module["forcedAspectRatio"] > 0) {
   if (w / h < Module["forcedAspectRatio"]) {
    w = Math.round(h * Module["forcedAspectRatio"]);
   } else {
    h = Math.round(w / Module["forcedAspectRatio"]);
   }
  }
  if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvas.parentNode && typeof screen != "undefined") {
   var factor = Math.min(screen.width / w, screen.height / h);
   w = Math.round(w * factor);
   h = Math.round(h * factor);
  }
  if (Browser.resizeCanvas) {
   if (canvas.width != w) canvas.width = w;
   if (canvas.height != h) canvas.height = h;
   if (typeof canvas.style != "undefined") {
    canvas.style.removeProperty("width");
    canvas.style.removeProperty("height");
   }
  } else {
   if (canvas.width != wNative) canvas.width = wNative;
   if (canvas.height != hNative) canvas.height = hNative;
   if (typeof canvas.style != "undefined") {
    if (w != wNative || h != hNative) {
     canvas.style.setProperty("width", w + "px", "important");
     canvas.style.setProperty("height", h + "px", "important");
    } else {
     canvas.style.removeProperty("width");
     canvas.style.removeProperty("height");
    }
   }
  }
 },
 wgetRequests: {},
 nextWgetRequestHandle: 0,
 getNextWgetRequestHandle: function() {
  var handle = Browser.nextWgetRequestHandle;
  Browser.nextWgetRequestHandle++;
  return handle;
 }
};

function _emscripten_exit_with_live_runtime() {
 noExitRuntime = true;
 throw "SimulateInfiniteLoop";
}

function _emscripten_futex_wait(addr, val, timeout) {
 if (addr <= 0 || addr > HEAP8.length || addr & 3 != 0) return -28;
 if (ENVIRONMENT_IS_WORKER) {
  var ret = Atomics.wait(HEAP32, addr >> 2, val, timeout);
  if (ret === "timed-out") return -73;
  if (ret === "not-equal") return -6;
  if (ret === "ok") return 0;
  throw "Atomics.wait returned an unexpected value " + ret;
 } else {
  var loadedVal = Atomics.load(HEAP32, addr >> 2);
  if (val != loadedVal) return -6;
  var tNow = performance.now();
  var tEnd = tNow + timeout;
  Atomics.store(HEAP32, __main_thread_futex_wait_address >> 2, addr);
  var ourWaitAddress = addr;
  while (addr == ourWaitAddress) {
   tNow = performance.now();
   if (tNow > tEnd) {
    return -73;
   }
   _emscripten_main_thread_process_queued_calls();
   addr = Atomics.load(HEAP32, __main_thread_futex_wait_address >> 2);
  }
  return 0;
 }
}

function _emscripten_get_heap_size() {
 return HEAP8.length;
}

function _emscripten_has_threading_support() {
 return typeof SharedArrayBuffer !== "undefined";
}

function _emscripten_is_main_browser_thread() {
 return __pthread_is_main_browser_thread | 0;
}

function _emscripten_is_main_runtime_thread() {
 return __pthread_is_main_runtime_thread | 0;
}

function _emscripten_memcpy_big(dest, src, num) {
 HEAPU8.set(HEAPU8.subarray(src, src + num), dest);
}

function _emscripten_proxy_to_main_thread_js(index, sync) {
 var numCallArgs = arguments.length - 2;
 var stack = stackSave();
 var args = stackAlloc(numCallArgs * 8);
 var b = args >> 3;
 for (var i = 0; i < numCallArgs; i++) {
  GROWABLE_HEAP_STORE_F64((b + i) * 8 | 0, arguments[2 + i]);
 }
 var ret = _emscripten_run_in_main_runtime_thread_js(index, numCallArgs, args, sync);
 stackRestore(stack);
 return ret;
}

var _emscripten_receive_on_main_thread_js_callArgs = [];

function _emscripten_receive_on_main_thread_js(index, numCallArgs, args) {
 _emscripten_receive_on_main_thread_js_callArgs.length = numCallArgs;
 var b = args >> 3;
 for (var i = 0; i < numCallArgs; i++) {
  _emscripten_receive_on_main_thread_js_callArgs[i] = GROWABLE_HEAP_LOAD_F64((b + i) * 8 | 0);
 }
 var func = index > 0 ? proxiedFunctionTable[index] : ASM_CONSTS[-index - 1];
 return func.apply(null, _emscripten_receive_on_main_thread_js_callArgs);
}

function emscripten_realloc_buffer(size) {
 try {
  wasmMemory.grow(size - buffer.byteLength + 65535 >> 16);
  updateGlobalBufferAndViews(wasmMemory.buffer);
  return 1;
 } catch (e) {}
}

function _emscripten_resize_heap(requestedSize) {
 var oldSize = _emscripten_get_heap_size();
 if (requestedSize <= oldSize) {
  return false;
 }
 var PAGE_MULTIPLE = 65536;
 var LIMIT = 2147483648 - PAGE_MULTIPLE;
 if (requestedSize > LIMIT) {
  return false;
 }
 var MIN_TOTAL_MEMORY = 16777216;
 var newSize = Math.max(oldSize, MIN_TOTAL_MEMORY);
 while (newSize < requestedSize) {
  if (newSize <= 536870912) {
   newSize = alignUp(2 * newSize, PAGE_MULTIPLE);
  } else {
   newSize = Math.min(alignUp((3 * newSize + 2147483648) / 4, PAGE_MULTIPLE), LIMIT);
  }
 }
 newSize = Math.min(newSize, 2130706432);
 if (newSize == oldSize) {
  return false;
 }
 var replacement = emscripten_realloc_buffer(newSize);
 if (!replacement) {
  return false;
 }
 return true;
}

function _emscripten_run_script(ptr) {
 eval(UTF8ToString(ptr));
}

function _emscripten_run_script_string(ptr) {
 var s = eval(UTF8ToString(ptr));
 if (s == null) {
  return 0;
 }
 s += "";
 var me = _emscripten_run_script_string;
 var len = lengthBytesUTF8(s);
 if (!me.bufferSize || me.bufferSize < len + 1) {
  if (me.bufferSize) _free(me.buffer);
  me.bufferSize = len + 1;
  me.buffer = _malloc(me.bufferSize);
 }
 stringToUTF8(s, me.buffer, me.bufferSize);
 return me.buffer;
}

var JSEvents = {
 keyEvent: 0,
 mouseEvent: 0,
 wheelEvent: 0,
 uiEvent: 0,
 focusEvent: 0,
 deviceOrientationEvent: 0,
 deviceMotionEvent: 0,
 fullscreenChangeEvent: 0,
 pointerlockChangeEvent: 0,
 visibilityChangeEvent: 0,
 touchEvent: 0,
 previousFullscreenElement: null,
 previousScreenX: null,
 previousScreenY: null,
 removeEventListenersRegistered: false,
 removeAllEventListeners: function() {
  for (var i = JSEvents.eventHandlers.length - 1; i >= 0; --i) {
   JSEvents._removeHandler(i);
  }
  JSEvents.eventHandlers = [];
  JSEvents.deferredCalls = [];
 },
 registerRemoveEventListeners: function() {
  if (!JSEvents.removeEventListenersRegistered) {
   __ATEXIT__.push(JSEvents.removeAllEventListeners);
   JSEvents.removeEventListenersRegistered = true;
  }
 },
 deferredCalls: [],
 deferCall: function(targetFunction, precedence, argsList) {
  function arraysHaveEqualContent(arrA, arrB) {
   if (arrA.length != arrB.length) return false;
   for (var i in arrA) {
    if (arrA[i] != arrB[i]) return false;
   }
   return true;
  }
  for (var i in JSEvents.deferredCalls) {
   var call = JSEvents.deferredCalls[i];
   if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
    return;
   }
  }
  JSEvents.deferredCalls.push({
   targetFunction: targetFunction,
   precedence: precedence,
   argsList: argsList
  });
  JSEvents.deferredCalls.sort(function(x, y) {
   return x.precedence < y.precedence;
  });
 },
 removeDeferredCalls: function(targetFunction) {
  for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
   if (JSEvents.deferredCalls[i].targetFunction == targetFunction) {
    JSEvents.deferredCalls.splice(i, 1);
    --i;
   }
  }
 },
 canPerformEventHandlerRequests: function() {
  return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
 },
 runDeferredCalls: function() {
  if (!JSEvents.canPerformEventHandlerRequests()) {
   return;
  }
  for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
   var call = JSEvents.deferredCalls[i];
   JSEvents.deferredCalls.splice(i, 1);
   --i;
   call.targetFunction.apply(this, call.argsList);
  }
 },
 inEventHandler: 0,
 currentEventHandler: null,
 eventHandlers: [],
 isInternetExplorer: function() {
  return navigator.userAgent.indexOf("MSIE") !== -1 || navigator.appVersion.indexOf("Trident/") > 0;
 },
 removeAllHandlersOnTarget: function(target, eventTypeString) {
  for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
   if (JSEvents.eventHandlers[i].target == target && (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
    JSEvents._removeHandler(i--);
   }
  }
 },
 _removeHandler: function(i) {
  var h = JSEvents.eventHandlers[i];
  h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
  JSEvents.eventHandlers.splice(i, 1);
 },
 registerOrRemoveHandler: function(eventHandler) {
  var jsEventHandler = function jsEventHandler(event) {
   ++JSEvents.inEventHandler;
   JSEvents.currentEventHandler = eventHandler;
   JSEvents.runDeferredCalls();
   eventHandler.handlerFunc(event);
   JSEvents.runDeferredCalls();
   --JSEvents.inEventHandler;
  };
  if (eventHandler.callbackfunc) {
   eventHandler.eventListenerFunc = jsEventHandler;
   eventHandler.target.addEventListener(eventHandler.eventTypeString, jsEventHandler, eventHandler.useCapture);
   JSEvents.eventHandlers.push(eventHandler);
   JSEvents.registerRemoveEventListeners();
  } else {
   for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
    if (JSEvents.eventHandlers[i].target == eventHandler.target && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
     JSEvents._removeHandler(i--);
    }
   }
  }
 },
 queueEventHandlerOnThread_iiii: function(targetThread, eventHandlerFunc, eventTypeId, eventData, userData) {
  var stackTop = stackSave();
  var varargs = stackAlloc(12);
  GROWABLE_HEAP_STORE_I32(varargs | 0, eventTypeId);
  GROWABLE_HEAP_STORE_I32(varargs + 4 | 0, eventData);
  GROWABLE_HEAP_STORE_I32(varargs + 8 | 0, userData);
  _emscripten_async_queue_on_thread_(targetThread, 637534208, eventHandlerFunc, eventData, varargs);
  stackRestore(stackTop);
 },
 getTargetThreadForEventCallback: function(targetThread) {
  switch (targetThread) {
  case 1:
   return 0;

  case 2:
   return PThread.currentProxiedOperationCallerThread;

  default:
   return targetThread;
  }
 },
 getBoundingClientRectOrZeros: function(target) {
  return target.getBoundingClientRect ? target.getBoundingClientRect() : {
   left: 0,
   top: 0
  };
 },
 pageScrollPos: function() {
  if (pageXOffset > 0 || pageYOffset > 0) {
   return [ pageXOffset, pageYOffset ];
  }
  if (typeof document.documentElement.scrollLeft !== "undefined" || typeof document.documentElement.scrollTop !== "undefined") {
   return [ document.documentElement.scrollLeft, document.documentElement.scrollTop ];
  }
  return [ document.body.scrollLeft | 0, document.body.scrollTop | 0 ];
 },
 getNodeNameForTarget: function(target) {
  if (!target) return "";
  if (target == window) return "#window";
  if (target == screen) return "#screen";
  return target && target.nodeName ? target.nodeName : "";
 },
 tick: function() {
  if (window["performance"] && window["performance"]["now"]) return window["performance"]["now"](); else return Date.now();
 },
 fullscreenEnabled: function() {
  return document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled;
 }
};

function stringToNewUTF8(jsString) {
 var length = lengthBytesUTF8(jsString) + 1;
 var cString = _malloc(length);
 stringToUTF8(jsString, cString, length);
 return cString;
}

function _emscripten_set_offscreencanvas_size_on_target_thread_js(targetThread, targetCanvas, width, height) {
 var stackTop = stackSave();
 var varargs = stackAlloc(12);
 var targetCanvasPtr = 0;
 if (targetCanvas) {
  targetCanvasPtr = stringToNewUTF8(targetCanvas);
 }
 GROWABLE_HEAP_STORE_I32(varargs | 0, targetCanvasPtr);
 GROWABLE_HEAP_STORE_I32(varargs + 4 | 0, width);
 GROWABLE_HEAP_STORE_I32(varargs + 8 | 0, height);
 _emscripten_async_queue_on_thread_(targetThread, 657457152, 0, targetCanvasPtr, varargs);
 stackRestore(stackTop);
}

function _emscripten_set_offscreencanvas_size_on_target_thread(targetThread, targetCanvas, width, height) {
 targetCanvas = targetCanvas ? UTF8ToString(targetCanvas) : "";
 _emscripten_set_offscreencanvas_size_on_target_thread_js(targetThread, targetCanvas, width, height);
}

var __specialEventTargets = [ 0, typeof document !== "undefined" ? document : 0, typeof window !== "undefined" ? window : 0 ];

function __findEventTarget(target) {
 try {
  if (!target) return window;
  if (typeof target === "number") target = __specialEventTargets[target] || UTF8ToString(target);
  if (target === "#window") return window; else if (target === "#document") return document; else if (target === "#screen") return screen; else if (target === "#canvas") return Module["canvas"];
  return typeof target === "string" ? document.getElementById(target) : target;
 } catch (e) {
  return null;
 }
}

function __findCanvasEventTarget(target) {
 if (typeof target === "number") target = UTF8ToString(target);
 if (!target || target === "#canvas") {
  if (typeof GL !== "undefined" && GL.offscreenCanvases["canvas"]) return GL.offscreenCanvases["canvas"];
  return Module["canvas"];
 }
 if (typeof GL !== "undefined" && GL.offscreenCanvases[target]) return GL.offscreenCanvases[target];
 return __findEventTarget(target);
}

function _emscripten_set_canvas_element_size_calling_thread(target, width, height) {
 var canvas = __findCanvasEventTarget(target);
 if (!canvas) return -4;
 if (canvas.canvasSharedPtr) {
  GROWABLE_HEAP_STORE_I32(canvas.canvasSharedPtr | 0, width);
  GROWABLE_HEAP_STORE_I32(canvas.canvasSharedPtr + 4 | 0, height);
 }
 if (canvas.offscreenCanvas || !canvas.controlTransferredOffscreen) {
  if (canvas.offscreenCanvas) canvas = canvas.offscreenCanvas;
  var autoResizeViewport = false;
  if (canvas.GLctxObject && canvas.GLctxObject.GLctx) {
   var prevViewport = canvas.GLctxObject.GLctx.getParameter(canvas.GLctxObject.GLctx.VIEWPORT);
   autoResizeViewport = prevViewport[0] === 0 && prevViewport[1] === 0 && prevViewport[2] === canvas.width && prevViewport[3] === canvas.height;
  }
  canvas.width = width;
  canvas.height = height;
  if (autoResizeViewport) {
   canvas.GLctxObject.GLctx.viewport(0, 0, width, height);
  }
 } else if (canvas.canvasSharedPtr) {
  var targetThread = GROWABLE_HEAP_LOAD_I32(canvas.canvasSharedPtr + 8 | 0);
  _emscripten_set_offscreencanvas_size_on_target_thread(targetThread, target, width, height);
  return 1;
 } else {
  return -4;
 }
 return 0;
}

function _emscripten_set_canvas_element_size_main_thread(target, width, height) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(85, 1, target, width, height);
 return _emscripten_set_canvas_element_size_calling_thread(target, width, height);
}

function _emscripten_set_canvas_element_size(target, width, height) {
 var canvas = __findCanvasEventTarget(target);
 if (canvas) {
  return _emscripten_set_canvas_element_size_calling_thread(target, width, height);
 } else {
  return _emscripten_set_canvas_element_size_main_thread(target, width, height);
 }
}

function _emscripten_set_current_thread_status(newStatus) {
 newStatus = newStatus | 0;
}

function _emscripten_set_thread_name(threadId, name) {
 threadId = threadId | 0;
 name = name | 0;
}

function _emscripten_sleep(ms) {
 Asyncify.handleSleep(function(wakeUp) {
  Browser.safeSetTimeout(wakeUp, ms);
 });
}

function _emscripten_syscall(which, varargs) {
 switch (which) {
 case 10:
  return ___syscall10(which, varargs);

 case 118:
  return ___syscall118(which, varargs);

 case 12:
  return ___syscall12(which, varargs);

 case 122:
  return ___syscall122(which, varargs);

 case 132:
  return ___syscall132(which, varargs);

 case 133:
  return ___syscall133(which, varargs);

 case 14:
  return ___syscall14(which, varargs);

 case 140:
  return ___syscall140(which, varargs);

 case 142:
  return ___syscall142(which, varargs);

 case 144:
  return ___syscall144(which, varargs);

 case 145:
  return ___syscall145(which, varargs);

 case 147:
  return ___syscall147(which, varargs);

 case 148:
  return ___syscall148(which, varargs);

 case 15:
  return ___syscall15(which, varargs);

 case 163:
  return ___syscall163(which, varargs);

 case 180:
  return ___syscall180(which, varargs);

 case 181:
  return ___syscall181(which, varargs);

 case 183:
  return ___syscall183(which, varargs);

 case 191:
  return ___syscall191(which, varargs);

 case 192:
  return ___syscall192(which, varargs);

 case 193:
  return ___syscall193(which, varargs);

 case 194:
  return ___syscall194(which, varargs);

 case 195:
  return ___syscall195(which, varargs);

 case 196:
  return ___syscall196(which, varargs);

 case 197:
  return ___syscall197(which, varargs);

 case 198:
  return ___syscall198(which, varargs);

 case 199:
  return ___syscall199(which, varargs);

 case 20:
  return ___syscall20(which, varargs);

 case 200:
  return ___syscall200(which, varargs);

 case 201:
  return ___syscall201(which, varargs);

 case 202:
  return ___syscall202(which, varargs);

 case 205:
  return ___syscall205(which, varargs);

 case 207:
  return ___syscall207(which, varargs);

 case 209:
  return ___syscall209(which, varargs);

 case 211:
  return ___syscall211(which, varargs);

 case 212:
  return ___syscall212(which, varargs);

 case 219:
  return ___syscall219(which, varargs);

 case 220:
  return ___syscall220(which, varargs);

 case 221:
  return ___syscall221(which, varargs);

 case 268:
  return ___syscall268(which, varargs);

 case 269:
  return ___syscall269(which, varargs);

 case 272:
  return ___syscall272(which, varargs);

 case 29:
  return ___syscall29(which, varargs);

 case 295:
  return ___syscall295(which, varargs);

 case 296:
  return ___syscall296(which, varargs);

 case 297:
  return ___syscall297(which, varargs);

 case 298:
  return ___syscall298(which, varargs);

 case 3:
  return ___syscall3(which, varargs);

 case 300:
  return ___syscall300(which, varargs);

 case 301:
  return ___syscall301(which, varargs);

 case 302:
  return ___syscall302(which, varargs);

 case 303:
  return ___syscall303(which, varargs);

 case 304:
  return ___syscall304(which, varargs);

 case 305:
  return ___syscall305(which, varargs);

 case 306:
  return ___syscall306(which, varargs);

 case 320:
  return ___syscall320(which, varargs);

 case 324:
  return ___syscall324(which, varargs);

 case 33:
  return ___syscall33(which, varargs);

 case 330:
  return ___syscall330(which, varargs);

 case 331:
  return ___syscall331(which, varargs);

 case 333:
  return ___syscall333(which, varargs);

 case 334:
  return ___syscall334(which, varargs);

 case 34:
  return ___syscall34(which, varargs);

 case 340:
  return ___syscall340(which, varargs);

 case 36:
  return ___syscall36(which, varargs);

 case 38:
  return ___syscall38(which, varargs);

 case 39:
  return ___syscall39(which, varargs);

 case 4:
  return ___syscall4(which, varargs);

 case 40:
  return ___syscall40(which, varargs);

 case 42:
  return ___syscall42(which, varargs);

 case 5:
  return ___syscall5(which, varargs);

 case 54:
  return ___syscall54(which, varargs);

 case 57:
  return ___syscall57(which, varargs);

 case 60:
  return ___syscall60(which, varargs);

 case 63:
  return ___syscall63(which, varargs);

 case 64:
  return ___syscall64(which, varargs);

 case 66:
  return ___syscall66(which, varargs);

 case 75:
  return ___syscall75(which, varargs);

 case 77:
  return ___syscall77(which, varargs);

 case 83:
  return ___syscall83(which, varargs);

 case 85:
  return ___syscall85(which, varargs);

 case 9:
  return ___syscall9(which, varargs);

 case 91:
  return ___syscall91(which, varargs);

 case 94:
  return ___syscall94(which, varargs);

 case 96:
  return ___syscall96(which, varargs);

 case 97:
  return ___syscall97(which, varargs);

 default:
  throw "surprising proxied syscall: " + which;
 }
}

var GL = {
 counter: 1,
 lastError: 0,
 buffers: [],
 mappedBuffers: {},
 programs: [],
 framebuffers: [],
 renderbuffers: [],
 textures: [],
 uniforms: [],
 shaders: [],
 vaos: [],
 contexts: {},
 currentContext: null,
 offscreenCanvases: {},
 timerQueriesEXT: [],
 programInfos: {},
 stringCache: {},
 unpackAlignment: 4,
 init: function() {
  GL.miniTempBuffer = new Float32Array(GL.MINI_TEMP_BUFFER_SIZE);
  for (var i = 0; i < GL.MINI_TEMP_BUFFER_SIZE; i++) {
   GL.miniTempBufferViews[i] = GL.miniTempBuffer.subarray(0, i + 1);
  }
 },
 recordError: function recordError(errorCode) {
  if (!GL.lastError) {
   GL.lastError = errorCode;
  }
 },
 getNewId: function(table) {
  var ret = GL.counter++;
  for (var i = table.length; i < ret; i++) {
   table[i] = null;
  }
  return ret;
 },
 MINI_TEMP_BUFFER_SIZE: 256,
 miniTempBuffer: null,
 miniTempBufferViews: [ 0 ],
 getSource: function(shader, count, string, length) {
  var source = "";
  for (var i = 0; i < count; ++i) {
   var len = length ? GROWABLE_HEAP_LOAD_I32(length + i * 4 | 0) : -1;
   source += UTF8ToString(GROWABLE_HEAP_LOAD_I32(string + i * 4 | 0), len < 0 ? undefined : len);
  }
  return source;
 },
 createContext: function(canvas, webGLContextAttributes) {
  var ctx = canvas.getContext("webgl", webGLContextAttributes) || canvas.getContext("experimental-webgl", webGLContextAttributes);
  if (!ctx) return 0;
  var handle = GL.registerContext(ctx, webGLContextAttributes);
  return handle;
 },
 registerContext: function(ctx, webGLContextAttributes) {
  var handle = _malloc(8);
  GROWABLE_HEAP_STORE_I32(handle + 4 | 0, _pthread_self());
  var context = {
   handle: handle,
   attributes: webGLContextAttributes,
   version: webGLContextAttributes.majorVersion,
   GLctx: ctx
  };
  if (ctx.canvas) ctx.canvas.GLctxObject = context;
  GL.contexts[handle] = context;
  if (typeof webGLContextAttributes.enableExtensionsByDefault === "undefined" || webGLContextAttributes.enableExtensionsByDefault) {
   GL.initExtensions(context);
  }
  return handle;
 },
 makeContextCurrent: function(contextHandle) {
  GL.currentContext = GL.contexts[contextHandle];
  Module.ctx = GLctx = GL.currentContext && GL.currentContext.GLctx;
  return !(contextHandle && !GLctx);
 },
 getContext: function(contextHandle) {
  return GL.contexts[contextHandle];
 },
 deleteContext: function(contextHandle) {
  if (GL.currentContext === GL.contexts[contextHandle]) GL.currentContext = null;
  if (typeof JSEvents === "object") JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
  if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas) GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
  _free(GL.contexts[contextHandle]);
  GL.contexts[contextHandle] = null;
 },
 acquireInstancedArraysExtension: function(ctx) {
  var ext = ctx.getExtension("ANGLE_instanced_arrays");
  if (ext) {
   ctx["vertexAttribDivisor"] = function(index, divisor) {
    ext["vertexAttribDivisorANGLE"](index, divisor);
   };
   ctx["drawArraysInstanced"] = function(mode, first, count, primcount) {
    ext["drawArraysInstancedANGLE"](mode, first, count, primcount);
   };
   ctx["drawElementsInstanced"] = function(mode, count, type, indices, primcount) {
    ext["drawElementsInstancedANGLE"](mode, count, type, indices, primcount);
   };
  }
 },
 acquireVertexArrayObjectExtension: function(ctx) {
  var ext = ctx.getExtension("OES_vertex_array_object");
  if (ext) {
   ctx["createVertexArray"] = function() {
    return ext["createVertexArrayOES"]();
   };
   ctx["deleteVertexArray"] = function(vao) {
    ext["deleteVertexArrayOES"](vao);
   };
   ctx["bindVertexArray"] = function(vao) {
    ext["bindVertexArrayOES"](vao);
   };
   ctx["isVertexArray"] = function(vao) {
    return ext["isVertexArrayOES"](vao);
   };
  }
 },
 acquireDrawBuffersExtension: function(ctx) {
  var ext = ctx.getExtension("WEBGL_draw_buffers");
  if (ext) {
   ctx["drawBuffers"] = function(n, bufs) {
    ext["drawBuffersWEBGL"](n, bufs);
   };
  }
 },
 initExtensions: function(context) {
  if (!context) context = GL.currentContext;
  if (context.initExtensionsDone) return;
  context.initExtensionsDone = true;
  var GLctx = context.GLctx;
  if (context.version < 2) {
   GL.acquireInstancedArraysExtension(GLctx);
   GL.acquireVertexArrayObjectExtension(GLctx);
   GL.acquireDrawBuffersExtension(GLctx);
  }
  GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
  var automaticallyEnabledExtensions = [ "OES_texture_float", "OES_texture_half_float", "OES_standard_derivatives", "OES_vertex_array_object", "WEBGL_compressed_texture_s3tc", "WEBGL_depth_texture", "OES_element_index_uint", "EXT_texture_filter_anisotropic", "EXT_frag_depth", "WEBGL_draw_buffers", "ANGLE_instanced_arrays", "OES_texture_float_linear", "OES_texture_half_float_linear", "EXT_blend_minmax", "EXT_shader_texture_lod", "WEBGL_compressed_texture_pvrtc", "EXT_color_buffer_half_float", "WEBGL_color_buffer_float", "EXT_sRGB", "WEBGL_compressed_texture_etc1", "EXT_disjoint_timer_query", "WEBGL_compressed_texture_etc", "WEBGL_compressed_texture_astc", "EXT_color_buffer_float", "WEBGL_compressed_texture_s3tc_srgb", "EXT_disjoint_timer_query_webgl2" ];
  var exts = GLctx.getSupportedExtensions() || [];
  exts.forEach(function(ext) {
   if (automaticallyEnabledExtensions.indexOf(ext) != -1) {
    GLctx.getExtension(ext);
   }
  });
 },
 populateUniformTable: function(program) {
  var p = GL.programs[program];
  var ptable = GL.programInfos[program] = {
   uniforms: {},
   maxUniformLength: 0,
   maxAttributeLength: -1,
   maxUniformBlockNameLength: -1
  };
  var utable = ptable.uniforms;
  var numUniforms = GLctx.getProgramParameter(p, 35718);
  for (var i = 0; i < numUniforms; ++i) {
   var u = GLctx.getActiveUniform(p, i);
   var name = u.name;
   ptable.maxUniformLength = Math.max(ptable.maxUniformLength, name.length + 1);
   if (name.slice(-1) == "]") {
    name = name.slice(0, name.lastIndexOf("["));
   }
   var loc = GLctx.getUniformLocation(p, name);
   if (loc) {
    var id = GL.getNewId(GL.uniforms);
    utable[name] = [ u.size, id ];
    GL.uniforms[id] = loc;
    for (var j = 1; j < u.size; ++j) {
     var n = name + "[" + j + "]";
     loc = GLctx.getUniformLocation(p, n);
     id = GL.getNewId(GL.uniforms);
     GL.uniforms[id] = loc;
    }
   }
  }
 }
};

var __emscripten_webgl_power_preferences = [ "default", "low-power", "high-performance" ];

function _emscripten_webgl_do_create_context(target, attributes) {
 var contextAttributes = {};
 var a = attributes >> 2;
 contextAttributes["alpha"] = !!GROWABLE_HEAP_LOAD_I32((a + (0 >> 2)) * 4 | 0);
 contextAttributes["depth"] = !!GROWABLE_HEAP_LOAD_I32((a + (4 >> 2)) * 4 | 0);
 contextAttributes["stencil"] = !!GROWABLE_HEAP_LOAD_I32((a + (8 >> 2)) * 4 | 0);
 contextAttributes["antialias"] = !!GROWABLE_HEAP_LOAD_I32((a + (12 >> 2)) * 4 | 0);
 contextAttributes["premultipliedAlpha"] = !!GROWABLE_HEAP_LOAD_I32((a + (16 >> 2)) * 4 | 0);
 contextAttributes["preserveDrawingBuffer"] = !!GROWABLE_HEAP_LOAD_I32((a + (20 >> 2)) * 4 | 0);
 var powerPreference = GROWABLE_HEAP_LOAD_I32((a + (24 >> 2)) * 4 | 0);
 contextAttributes["powerPreference"] = __emscripten_webgl_power_preferences[powerPreference];
 contextAttributes["failIfMajorPerformanceCaveat"] = !!GROWABLE_HEAP_LOAD_I32((a + (28 >> 2)) * 4 | 0);
 contextAttributes.majorVersion = GROWABLE_HEAP_LOAD_I32((a + (32 >> 2)) * 4 | 0);
 contextAttributes.minorVersion = GROWABLE_HEAP_LOAD_I32((a + (36 >> 2)) * 4 | 0);
 contextAttributes.enableExtensionsByDefault = GROWABLE_HEAP_LOAD_I32((a + (40 >> 2)) * 4 | 0);
 contextAttributes.explicitSwapControl = GROWABLE_HEAP_LOAD_I32((a + (44 >> 2)) * 4 | 0);
 contextAttributes.proxyContextToMainThread = GROWABLE_HEAP_LOAD_I32((a + (48 >> 2)) * 4 | 0);
 contextAttributes.renderViaOffscreenBackBuffer = GROWABLE_HEAP_LOAD_I32((a + (52 >> 2)) * 4 | 0);
 var canvas = __findCanvasEventTarget(target);
 if (!canvas) {
  return 0;
 }
 if (contextAttributes.explicitSwapControl) {
  return 0;
 }
 var contextHandle = GL.createContext(canvas, contextAttributes);
 return contextHandle;
}

function _emscripten_webgl_create_context(a0, a1) {
 return _emscripten_webgl_do_create_context(a0, a1);
}

function _endpwent() {
 throw "endpwent: TODO";
}

function _emscripten_get_environ() {
 if (!_emscripten_get_environ.strings) {
  var ENV = {};
  ENV["USER"] = ENV["LOGNAME"] = "web_user";
  ENV["PATH"] = "/";
  ENV["PWD"] = "/";
  ENV["HOME"] = "/home/web_user";
  ENV["LANG"] = (typeof navigator === "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
  ENV["_"] = thisProgram;
  var strings = [];
  for (var key in ENV) {
   strings.push(key + "=" + ENV[key]);
  }
  _emscripten_get_environ.strings = strings;
 }
 return _emscripten_get_environ.strings;
}

function _environ_get(__environ, environ_buf) {
 var strings = _emscripten_get_environ();
 var bufSize = 0;
 strings.forEach(function(string, i) {
  var ptr = environ_buf + bufSize;
  GROWABLE_HEAP_STORE_I32(__environ + i * 4 | 0, ptr);
  writeAsciiToMemory(string, ptr);
  bufSize += string.length + 1;
 });
 return 0;
}

function _environ_sizes_get(environ_count, environ_buf_size) {
 var strings = _emscripten_get_environ();
 GROWABLE_HEAP_STORE_I32(environ_count | 0, strings.length);
 var bufSize = 0;
 strings.forEach(function(string) {
  bufSize += string.length + 1;
 });
 GROWABLE_HEAP_STORE_I32(environ_buf_size | 0, bufSize);
 return 0;
}

function _execl() {
 ___setErrNo(45);
 return -1;
}

function _execv() {
 return _execl.apply(null, arguments);
}

function _execve() {
 return _execl.apply(null, arguments);
}

function _fd_close(fd) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(86, 1, fd);
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  FS.close(stream);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return e.errno;
 }
}

function _fd_write(fd, iov, iovcnt, pnum) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(87, 1, fd, iov, iovcnt, pnum);
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = SYSCALLS.doWritev(stream, iov, iovcnt);
  GROWABLE_HEAP_STORE_I32(pnum | 0, num);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return e.errno;
 }
}

function _fexecve() {
 return _execl.apply(null, arguments);
}

function _flock(fd, operation) {
 return 0;
}

function _fork() {
 ___setErrNo(6);
 return -1;
}

function _fpathconf(fildes, name) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(88, 1, fildes, name);
 switch (name) {
 case 0:
  return 32e3;

 case 1:
 case 2:
 case 3:
  return 255;

 case 4:
 case 5:
 case 16:
 case 17:
 case 18:
  return 4096;

 case 6:
 case 7:
 case 20:
  return 1;

 case 8:
  return 0;

 case 9:
 case 10:
 case 11:
 case 12:
 case 14:
 case 15:
 case 19:
  return -1;

 case 13:
  return 64;
 }
 ___setErrNo(28);
 return -1;
}

function _getitimer() {
 throw "getitimer() is not implemented yet";
}

function _getloadavg(loadavg, nelem) {
 var limit = Math.min(nelem, 3);
 var doubleSize = 8;
 for (var i = 0; i < limit; i++) {
  GROWABLE_HEAP_STORE_F64(loadavg + i * doubleSize | 0, .1);
 }
 return limit;
}

function _getpwent() {
 throw "getpwent: TODO";
}

function _getpwnam() {
 throw "getpwnam: TODO";
}

function _getpwuid(uid) {
 return 0;
}

function _gettimeofday(ptr) {
 var now = Date.now();
 GROWABLE_HEAP_STORE_I32(ptr | 0, now / 1e3 | 0);
 GROWABLE_HEAP_STORE_I32(ptr + 4 | 0, now % 1e3 * 1e3 | 0);
 return 0;
}

var ___tm_timezone;

if (ENVIRONMENT_IS_PTHREAD) ___tm_timezone = PthreadWorkerInit.___tm_timezone; else PthreadWorkerInit.___tm_timezone = ___tm_timezone = (stringToUTF8("GMT", 1982992, 4), 
1982992);

function _gmtime_r(time, tmPtr) {
 var date = new Date(GROWABLE_HEAP_LOAD_I32(time | 0) * 1e3);
 GROWABLE_HEAP_STORE_I32(tmPtr | 0, date.getUTCSeconds());
 GROWABLE_HEAP_STORE_I32(tmPtr + 4 | 0, date.getUTCMinutes());
 GROWABLE_HEAP_STORE_I32(tmPtr + 8 | 0, date.getUTCHours());
 GROWABLE_HEAP_STORE_I32(tmPtr + 12 | 0, date.getUTCDate());
 GROWABLE_HEAP_STORE_I32(tmPtr + 16 | 0, date.getUTCMonth());
 GROWABLE_HEAP_STORE_I32(tmPtr + 20 | 0, date.getUTCFullYear() - 1900);
 GROWABLE_HEAP_STORE_I32(tmPtr + 24 | 0, date.getUTCDay());
 GROWABLE_HEAP_STORE_I32(tmPtr + 36 | 0, 0);
 GROWABLE_HEAP_STORE_I32(tmPtr + 32 | 0, 0);
 var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
 var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0;
 GROWABLE_HEAP_STORE_I32(tmPtr + 28 | 0, yday);
 GROWABLE_HEAP_STORE_I32(tmPtr + 40 | 0, ___tm_timezone);
 return tmPtr;
}

function _kill(pid, sig) {
 ___setErrNo(ERRNO_CODES.EPERM);
 return -1;
}

function _killpg() {
 ___setErrNo(ERRNO_CODES.EPERM);
 return -1;
}

var ___tm_current;

if (ENVIRONMENT_IS_PTHREAD) ___tm_current = PthreadWorkerInit.___tm_current; else PthreadWorkerInit.___tm_current = ___tm_current = 1982944;

function _tzset() {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(89, 1);
 if (_tzset.called) return;
 _tzset.called = true;
 GROWABLE_HEAP_STORE_I32(__get_timezone() | 0, new Date().getTimezoneOffset() * 60);
 var currentYear = new Date().getFullYear();
 var winter = new Date(currentYear, 0, 1);
 var summer = new Date(currentYear, 6, 1);
 GROWABLE_HEAP_STORE_I32(__get_daylight() | 0, Number(winter.getTimezoneOffset() != summer.getTimezoneOffset()));
 function extractZone(date) {
  var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
  return match ? match[1] : "GMT";
 }
 var winterName = extractZone(winter);
 var summerName = extractZone(summer);
 var winterNamePtr = allocate(intArrayFromString(winterName), "i8", ALLOC_NORMAL);
 var summerNamePtr = allocate(intArrayFromString(summerName), "i8", ALLOC_NORMAL);
 if (summer.getTimezoneOffset() < winter.getTimezoneOffset()) {
  GROWABLE_HEAP_STORE_I32(__get_tzname() | 0, winterNamePtr);
  GROWABLE_HEAP_STORE_I32(__get_tzname() + 4 | 0, summerNamePtr);
 } else {
  GROWABLE_HEAP_STORE_I32(__get_tzname() | 0, summerNamePtr);
  GROWABLE_HEAP_STORE_I32(__get_tzname() + 4 | 0, winterNamePtr);
 }
}

function _localtime_r(time, tmPtr) {
 _tzset();
 var date = new Date(GROWABLE_HEAP_LOAD_I32(time | 0) * 1e3);
 GROWABLE_HEAP_STORE_I32(tmPtr | 0, date.getSeconds());
 GROWABLE_HEAP_STORE_I32(tmPtr + 4 | 0, date.getMinutes());
 GROWABLE_HEAP_STORE_I32(tmPtr + 8 | 0, date.getHours());
 GROWABLE_HEAP_STORE_I32(tmPtr + 12 | 0, date.getDate());
 GROWABLE_HEAP_STORE_I32(tmPtr + 16 | 0, date.getMonth());
 GROWABLE_HEAP_STORE_I32(tmPtr + 20 | 0, date.getFullYear() - 1900);
 GROWABLE_HEAP_STORE_I32(tmPtr + 24 | 0, date.getDay());
 var start = new Date(date.getFullYear(), 0, 1);
 var yday = (date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24) | 0;
 GROWABLE_HEAP_STORE_I32(tmPtr + 28 | 0, yday);
 GROWABLE_HEAP_STORE_I32(tmPtr + 36 | 0, -(date.getTimezoneOffset() * 60));
 var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
 var winterOffset = start.getTimezoneOffset();
 var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
 GROWABLE_HEAP_STORE_I32(tmPtr + 32 | 0, dst);
 var zonePtr = GROWABLE_HEAP_LOAD_I32(__get_tzname() + (dst ? 4 : 0) | 0);
 GROWABLE_HEAP_STORE_I32(tmPtr + 40 | 0, zonePtr);
 return tmPtr;
}

function _localtime(time) {
 return _localtime_r(time, ___tm_current);
}

function _mktime(tmPtr) {
 _tzset();
 var date = new Date(GROWABLE_HEAP_LOAD_I32(tmPtr + 20 | 0) + 1900, GROWABLE_HEAP_LOAD_I32(tmPtr + 16 | 0), GROWABLE_HEAP_LOAD_I32(tmPtr + 12 | 0), GROWABLE_HEAP_LOAD_I32(tmPtr + 8 | 0), GROWABLE_HEAP_LOAD_I32(tmPtr + 4 | 0), GROWABLE_HEAP_LOAD_I32(tmPtr | 0), 0);
 var dst = GROWABLE_HEAP_LOAD_I32(tmPtr + 32 | 0);
 var guessedOffset = date.getTimezoneOffset();
 var start = new Date(date.getFullYear(), 0, 1);
 var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
 var winterOffset = start.getTimezoneOffset();
 var dstOffset = Math.min(winterOffset, summerOffset);
 if (dst < 0) {
  GROWABLE_HEAP_STORE_I32(tmPtr + 32 | 0, Number(summerOffset != winterOffset && dstOffset == guessedOffset));
 } else if (dst > 0 != (dstOffset == guessedOffset)) {
  var nonDstOffset = Math.max(winterOffset, summerOffset);
  var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
  date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4);
 }
 GROWABLE_HEAP_STORE_I32(tmPtr + 24 | 0, date.getDay());
 var yday = (date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24) | 0;
 GROWABLE_HEAP_STORE_I32(tmPtr + 28 | 0, yday);
 return date.getTime() / 1e3 | 0;
}

function _pathconf() {
 return _fpathconf.apply(null, arguments);
}

function __spawn_thread(threadParams) {
 if (ENVIRONMENT_IS_PTHREAD) throw "Internal Error! _spawn_thread() can only ever be called from main application thread!";
 var worker = PThread.getNewWorker();
 if (worker.pthread !== undefined) throw "Internal error!";
 if (!threadParams.pthread_ptr) throw "Internal error, no pthread ptr!";
 PThread.runningWorkers.push(worker);
 var tlsMemory = _malloc(128 * 4);
 for (var i = 0; i < 128; ++i) {
  GROWABLE_HEAP_STORE_I32(tlsMemory + i * 4 | 0, 0);
 }
 var stackHigh = threadParams.stackBase + threadParams.stackSize;
 var pthread = PThread.pthreads[threadParams.pthread_ptr] = {
  worker: worker,
  stackBase: threadParams.stackBase,
  stackSize: threadParams.stackSize,
  allocatedOwnStack: threadParams.allocatedOwnStack,
  thread: threadParams.pthread_ptr,
  threadInfoStruct: threadParams.pthread_ptr
 };
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 0 >> 2, 0);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 4 >> 2, 0);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 20 >> 2, 0);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 80 >> 2, threadParams.detached);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 116 >> 2, tlsMemory);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 60 >> 2, 0);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 52 >> 2, pthread.threadInfoStruct);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 56 >> 2, PROCINFO.pid);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 120 >> 2, threadParams.stackSize);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 96 >> 2, threadParams.stackSize);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 92 >> 2, stackHigh);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 120 + 8 >> 2, stackHigh);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 120 + 12 >> 2, threadParams.detached);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 120 + 20 >> 2, threadParams.schedPolicy);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 120 + 24 >> 2, threadParams.schedPrio);
 var global_libc = _emscripten_get_global_libc();
 var global_locale = global_libc + 40;
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 188 >> 2, global_locale);
 worker.pthread = pthread;
 var msg = {
  cmd: "run",
  start_routine: threadParams.startRoutine,
  arg: threadParams.arg,
  threadInfoStruct: threadParams.pthread_ptr,
  selfThreadId: threadParams.pthread_ptr,
  parentThreadId: threadParams.parent_pthread_ptr,
  stackBase: threadParams.stackBase,
  stackSize: threadParams.stackSize
 };
 worker.runPthread = function() {
  msg.time = performance.now();
  worker.postMessage(msg, threadParams.transferList);
 };
 if (worker.loaded) {
  worker.runPthread();
  delete worker.runPthread;
 }
}

function _pthread_getschedparam(thread, policy, schedparam) {
 if (!policy && !schedparam) return ERRNO_CODES.EINVAL;
 if (!thread) {
  err("pthread_getschedparam called with a null thread pointer!");
  return ERRNO_CODES.ESRCH;
 }
 var self = GROWABLE_HEAP_LOAD_I32(thread + 24 | 0);
 if (self !== thread) {
  err("pthread_getschedparam attempted on thread " + thread + ", which does not point to a valid thread, or does not exist anymore!");
  return ERRNO_CODES.ESRCH;
 }
 var schedPolicy = Atomics.load(HEAPU32, thread + 120 + 20 >> 2);
 var schedPrio = Atomics.load(HEAPU32, thread + 120 + 24 >> 2);
 if (policy) GROWABLE_HEAP_STORE_I32(policy | 0, schedPolicy);
 if (schedparam) GROWABLE_HEAP_STORE_I32(schedparam | 0, schedPrio);
 return 0;
}

function _pthread_self() {
 return __pthread_ptr | 0;
}

Module["_pthread_self"] = _pthread_self;

function _pthread_create(pthread_ptr, attr, start_routine, arg) {
 if (typeof SharedArrayBuffer === "undefined") {
  err("Current environment does not support SharedArrayBuffer, pthreads are not available!");
  return 6;
 }
 if (!pthread_ptr) {
  err("pthread_create called with a null thread pointer!");
  return 28;
 }
 var transferList = [];
 var error = 0;
 if (ENVIRONMENT_IS_PTHREAD && (transferList.length === 0 || error)) {
  return _emscripten_sync_run_in_main_thread_4(687865856, pthread_ptr, attr, start_routine, arg);
 }
 if (error) return error;
 var stackSize = 0;
 var stackBase = 0;
 var detached = 0;
 var schedPolicy = 0;
 var schedPrio = 0;
 if (attr) {
  stackSize = GROWABLE_HEAP_LOAD_I32(attr | 0);
  stackSize += 81920;
  stackBase = GROWABLE_HEAP_LOAD_I32(attr + 8 | 0);
  detached = GROWABLE_HEAP_LOAD_I32(attr + 12 | 0) !== 0;
  var inheritSched = GROWABLE_HEAP_LOAD_I32(attr + 16 | 0) === 0;
  if (inheritSched) {
   var prevSchedPolicy = GROWABLE_HEAP_LOAD_I32(attr + 20 | 0);
   var prevSchedPrio = GROWABLE_HEAP_LOAD_I32(attr + 24 | 0);
   var parentThreadPtr = PThread.currentProxiedOperationCallerThread ? PThread.currentProxiedOperationCallerThread : _pthread_self();
   _pthread_getschedparam(parentThreadPtr, attr + 20, attr + 24);
   schedPolicy = GROWABLE_HEAP_LOAD_I32(attr + 20 | 0);
   schedPrio = GROWABLE_HEAP_LOAD_I32(attr + 24 | 0);
   GROWABLE_HEAP_STORE_I32(attr + 20 | 0, prevSchedPolicy);
   GROWABLE_HEAP_STORE_I32(attr + 24 | 0, prevSchedPrio);
  } else {
   schedPolicy = GROWABLE_HEAP_LOAD_I32(attr + 20 | 0);
   schedPrio = GROWABLE_HEAP_LOAD_I32(attr + 24 | 0);
  }
 } else {
  stackSize = 2097152;
 }
 var allocatedOwnStack = stackBase == 0;
 if (allocatedOwnStack) {
  stackBase = _memalign(16, stackSize);
 } else {
  stackBase -= stackSize;
  assert(stackBase > 0);
 }
 var threadInfoStruct = _malloc(244);
 for (var i = 0; i < 244 >> 2; ++i) GROWABLE_HEAP_STORE_I32(((threadInfoStruct >> 2) + i) * 4 | 0, 0);
 GROWABLE_HEAP_STORE_I32(pthread_ptr | 0, threadInfoStruct);
 GROWABLE_HEAP_STORE_I32(threadInfoStruct + 24 | 0, threadInfoStruct);
 var headPtr = threadInfoStruct + 168;
 GROWABLE_HEAP_STORE_I32(headPtr | 0, headPtr);
 var threadParams = {
  stackBase: stackBase,
  stackSize: stackSize,
  allocatedOwnStack: allocatedOwnStack,
  schedPolicy: schedPolicy,
  schedPrio: schedPrio,
  detached: detached,
  startRoutine: start_routine,
  pthread_ptr: threadInfoStruct,
  parent_pthread_ptr: _pthread_self(),
  arg: arg,
  transferList: transferList
 };
 if (ENVIRONMENT_IS_PTHREAD) {
  threadParams.cmd = "spawnThread";
  postMessage(threadParams, transferList);
 } else {
  __spawn_thread(threadParams);
 }
 return 0;
}

function _pthread_detach(thread) {
 if (!thread) {
  err("pthread_detach attempted on a null thread pointer!");
  return ERRNO_CODES.ESRCH;
 }
 var self = GROWABLE_HEAP_LOAD_I32(thread + 24 | 0);
 if (self !== thread) {
  err("pthread_detach attempted on thread " + thread + ", which does not point to a valid thread, or does not exist anymore!");
  return ERRNO_CODES.ESRCH;
 }
 var threadStatus = Atomics.load(HEAPU32, thread + 0 >> 2);
 var wasDetached = Atomics.compareExchange(HEAPU32, thread + 80 >> 2, 0, 2);
 return wasDetached ? ERRNO_CODES.EINVAL : 0;
}

function _pthread_exit(status) {
 if (!ENVIRONMENT_IS_PTHREAD) _exit(status); else PThread.threadExit(status);
 throw "pthread_exit";
}

function __cleanup_thread(pthread_ptr) {
 if (ENVIRONMENT_IS_PTHREAD) throw "Internal Error! _cleanup_thread() can only ever be called from main application thread!";
 if (!pthread_ptr) throw "Internal Error! Null pthread_ptr in _cleanup_thread!";
 GROWABLE_HEAP_STORE_I32(pthread_ptr + 24 | 0, 0);
 var pthread = PThread.pthreads[pthread_ptr];
 if (pthread) {
  var worker = pthread.worker;
  PThread.returnWorkerToPool(worker);
 }
}

function __pthread_testcancel_js() {
 if (!ENVIRONMENT_IS_PTHREAD) return;
 if (!threadInfoStruct) return;
 var cancelDisabled = Atomics.load(HEAPU32, threadInfoStruct + 72 >> 2);
 if (cancelDisabled) return;
 var canceled = Atomics.load(HEAPU32, threadInfoStruct + 0 >> 2);
 if (canceled == 2) throw "Canceled!";
}

function _pthread_join(thread, status) {
 if (!thread) {
  err("pthread_join attempted on a null thread pointer!");
  return ERRNO_CODES.ESRCH;
 }
 if (ENVIRONMENT_IS_PTHREAD && selfThreadId == thread) {
  err("PThread " + thread + " is attempting to join to itself!");
  return ERRNO_CODES.EDEADLK;
 } else if (!ENVIRONMENT_IS_PTHREAD && PThread.mainThreadBlock == thread) {
  err("Main thread " + thread + " is attempting to join to itself!");
  return ERRNO_CODES.EDEADLK;
 }
 var self = GROWABLE_HEAP_LOAD_I32(thread + 24 | 0);
 if (self !== thread) {
  err("pthread_join attempted on thread " + thread + ", which does not point to a valid thread, or does not exist anymore!");
  return ERRNO_CODES.ESRCH;
 }
 var detached = Atomics.load(HEAPU32, thread + 80 >> 2);
 if (detached) {
  err("Attempted to join thread " + thread + ", which was already detached!");
  return ERRNO_CODES.EINVAL;
 }
 for (;;) {
  var threadStatus = Atomics.load(HEAPU32, thread + 0 >> 2);
  if (threadStatus == 1) {
   var threadExitCode = Atomics.load(HEAPU32, thread + 4 >> 2);
   if (status) GROWABLE_HEAP_STORE_I32(status | 0, threadExitCode);
   Atomics.store(HEAPU32, thread + 80 >> 2, 1);
   if (!ENVIRONMENT_IS_PTHREAD) __cleanup_thread(thread); else postMessage({
    cmd: "cleanupThread",
    thread: thread
   });
   return 0;
  }
  __pthread_testcancel_js();
  if (!ENVIRONMENT_IS_PTHREAD) _emscripten_main_thread_process_queued_calls();
  _emscripten_futex_wait(thread + 0, threadStatus, ENVIRONMENT_IS_PTHREAD ? 100 : 1);
 }
}

function _pthread_sigmask(how, set, oldset) {
 err("pthread_sigmask() is not supported: this is a no-op.");
 return 0;
}

function _raise(sig) {
 ___setErrNo(ERRNO_CODES.ENOSYS);
 return -1;
}

function _round(d) {
 d = +d;
 return d >= +0 ? +Math_floor(d + +.5) : +Math_ceil(d - +.5);
}

function _sched_yield() {
 return 0;
}

function _sysconf(name) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(90, 1, name);
 switch (name) {
 case 30:
  return PAGE_SIZE;

 case 85:
  var maxHeapSize = 2 * 1024 * 1024 * 1024 - 65536;
  maxHeapSize = 2130706432;
  return maxHeapSize / PAGE_SIZE;

 case 132:
 case 133:
 case 12:
 case 137:
 case 138:
 case 15:
 case 235:
 case 16:
 case 17:
 case 18:
 case 19:
 case 20:
 case 149:
 case 13:
 case 10:
 case 236:
 case 153:
 case 9:
 case 21:
 case 22:
 case 159:
 case 154:
 case 14:
 case 77:
 case 78:
 case 139:
 case 80:
 case 81:
 case 82:
 case 68:
 case 67:
 case 164:
 case 11:
 case 29:
 case 47:
 case 48:
 case 95:
 case 52:
 case 51:
 case 46:
  return 200809;

 case 79:
  return 0;

 case 27:
 case 246:
 case 127:
 case 128:
 case 23:
 case 24:
 case 160:
 case 161:
 case 181:
 case 182:
 case 242:
 case 183:
 case 184:
 case 243:
 case 244:
 case 245:
 case 165:
 case 178:
 case 179:
 case 49:
 case 50:
 case 168:
 case 169:
 case 175:
 case 170:
 case 171:
 case 172:
 case 97:
 case 76:
 case 32:
 case 173:
 case 35:
  return -1;

 case 176:
 case 177:
 case 7:
 case 155:
 case 8:
 case 157:
 case 125:
 case 126:
 case 92:
 case 93:
 case 129:
 case 130:
 case 131:
 case 94:
 case 91:
  return 1;

 case 74:
 case 60:
 case 69:
 case 70:
 case 4:
  return 1024;

 case 31:
 case 42:
 case 72:
  return 32;

 case 87:
 case 26:
 case 33:
  return 2147483647;

 case 34:
 case 1:
  return 47839;

 case 38:
 case 36:
  return 99;

 case 43:
 case 37:
  return 2048;

 case 0:
  return 2097152;

 case 3:
  return 65536;

 case 28:
  return 32768;

 case 44:
  return 32767;

 case 75:
  return 16384;

 case 39:
  return 1e3;

 case 89:
  return 700;

 case 71:
  return 256;

 case 40:
  return 255;

 case 2:
  return 100;

 case 180:
  return 64;

 case 25:
  return 20;

 case 5:
  return 16;

 case 6:
  return 6;

 case 73:
  return 4;

 case 84:
  {
   if (typeof navigator === "object") return navigator["hardwareConcurrency"] || 1;
   return 1;
  }
 }
 ___setErrNo(28);
 return -1;
}

function _setgroups(ngroups, gidset) {
 if (ngroups < 1 || ngroups > _sysconf(3)) {
  ___setErrNo(28);
  return -1;
 } else {
  ___setErrNo(63);
  return -1;
 }
}

function _setitimer() {
 throw "setitimer() is not implemented yet";
}

function _setpwent() {
 throw "setpwent: TODO";
}

function _sigaction(signum, act, oldact) {
 return 0;
}

function _sigaddset(set, signum) {
 GROWABLE_HEAP_STORE_I32(set | 0, GROWABLE_HEAP_LOAD_I32(set | 0) | 1 << signum - 1);
 return 0;
}

function _sigemptyset(set) {
 GROWABLE_HEAP_STORE_I32(set | 0, 0);
 return 0;
}

function _sigfillset(set) {
 GROWABLE_HEAP_STORE_I32(set | 0, -1 >>> 0);
 return 0;
}

function _siginterrupt() {
 return 0;
}

function _sigismember(set, signum) {
 return GROWABLE_HEAP_LOAD_I32(set | 0) & 1 << signum - 1;
}

function _sigpending(set) {
 GROWABLE_HEAP_STORE_I32(set | 0, 0);
 return 0;
}

function __isLeapYear(year) {
 return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function __arraySum(array, index) {
 var sum = 0;
 for (var i = 0; i <= index; sum += array[i++]) ;
 return sum;
}

var __MONTH_DAYS_LEAP = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

var __MONTH_DAYS_REGULAR = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

function __addDays(date, days) {
 var newDate = new Date(date.getTime());
 while (days > 0) {
  var leap = __isLeapYear(newDate.getFullYear());
  var currentMonth = newDate.getMonth();
  var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
  if (days > daysInCurrentMonth - newDate.getDate()) {
   days -= daysInCurrentMonth - newDate.getDate() + 1;
   newDate.setDate(1);
   if (currentMonth < 11) {
    newDate.setMonth(currentMonth + 1);
   } else {
    newDate.setMonth(0);
    newDate.setFullYear(newDate.getFullYear() + 1);
   }
  } else {
   newDate.setDate(newDate.getDate() + days);
   return newDate;
  }
 }
 return newDate;
}

function _strftime(s, maxsize, format, tm) {
 var tm_zone = GROWABLE_HEAP_LOAD_I32(tm + 40 | 0);
 var date = {
  tm_sec: GROWABLE_HEAP_LOAD_I32(tm | 0),
  tm_min: GROWABLE_HEAP_LOAD_I32(tm + 4 | 0),
  tm_hour: GROWABLE_HEAP_LOAD_I32(tm + 8 | 0),
  tm_mday: GROWABLE_HEAP_LOAD_I32(tm + 12 | 0),
  tm_mon: GROWABLE_HEAP_LOAD_I32(tm + 16 | 0),
  tm_year: GROWABLE_HEAP_LOAD_I32(tm + 20 | 0),
  tm_wday: GROWABLE_HEAP_LOAD_I32(tm + 24 | 0),
  tm_yday: GROWABLE_HEAP_LOAD_I32(tm + 28 | 0),
  tm_isdst: GROWABLE_HEAP_LOAD_I32(tm + 32 | 0),
  tm_gmtoff: GROWABLE_HEAP_LOAD_I32(tm + 36 | 0),
  tm_zone: tm_zone ? UTF8ToString(tm_zone) : ""
 };
 var pattern = UTF8ToString(format);
 var EXPANSION_RULES_1 = {
  "%c": "%a %b %d %H:%M:%S %Y",
  "%D": "%m/%d/%y",
  "%F": "%Y-%m-%d",
  "%h": "%b",
  "%r": "%I:%M:%S %p",
  "%R": "%H:%M",
  "%T": "%H:%M:%S",
  "%x": "%m/%d/%y",
  "%X": "%H:%M:%S",
  "%Ec": "%c",
  "%EC": "%C",
  "%Ex": "%m/%d/%y",
  "%EX": "%H:%M:%S",
  "%Ey": "%y",
  "%EY": "%Y",
  "%Od": "%d",
  "%Oe": "%e",
  "%OH": "%H",
  "%OI": "%I",
  "%Om": "%m",
  "%OM": "%M",
  "%OS": "%S",
  "%Ou": "%u",
  "%OU": "%U",
  "%OV": "%V",
  "%Ow": "%w",
  "%OW": "%W",
  "%Oy": "%y"
 };
 for (var rule in EXPANSION_RULES_1) {
  pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule]);
 }
 var WEEKDAYS = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
 var MONTHS = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
 function leadingSomething(value, digits, character) {
  var str = typeof value === "number" ? value.toString() : value || "";
  while (str.length < digits) {
   str = character[0] + str;
  }
  return str;
 }
 function leadingNulls(value, digits) {
  return leadingSomething(value, digits, "0");
 }
 function compareByDay(date1, date2) {
  function sgn(value) {
   return value < 0 ? -1 : value > 0 ? 1 : 0;
  }
  var compare;
  if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
   if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
    compare = sgn(date1.getDate() - date2.getDate());
   }
  }
  return compare;
 }
 function getFirstWeekStartDate(janFourth) {
  switch (janFourth.getDay()) {
  case 0:
   return new Date(janFourth.getFullYear() - 1, 11, 29);

  case 1:
   return janFourth;

  case 2:
   return new Date(janFourth.getFullYear(), 0, 3);

  case 3:
   return new Date(janFourth.getFullYear(), 0, 2);

  case 4:
   return new Date(janFourth.getFullYear(), 0, 1);

  case 5:
   return new Date(janFourth.getFullYear() - 1, 11, 31);

  case 6:
   return new Date(janFourth.getFullYear() - 1, 11, 30);
  }
 }
 function getWeekBasedYear(date) {
  var thisDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
  var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
  var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
  var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
  var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
   if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
    return thisDate.getFullYear() + 1;
   } else {
    return thisDate.getFullYear();
   }
  } else {
   return thisDate.getFullYear() - 1;
  }
 }
 var EXPANSION_RULES_2 = {
  "%a": function(date) {
   return WEEKDAYS[date.tm_wday].substring(0, 3);
  },
  "%A": function(date) {
   return WEEKDAYS[date.tm_wday];
  },
  "%b": function(date) {
   return MONTHS[date.tm_mon].substring(0, 3);
  },
  "%B": function(date) {
   return MONTHS[date.tm_mon];
  },
  "%C": function(date) {
   var year = date.tm_year + 1900;
   return leadingNulls(year / 100 | 0, 2);
  },
  "%d": function(date) {
   return leadingNulls(date.tm_mday, 2);
  },
  "%e": function(date) {
   return leadingSomething(date.tm_mday, 2, " ");
  },
  "%g": function(date) {
   return getWeekBasedYear(date).toString().substring(2);
  },
  "%G": function(date) {
   return getWeekBasedYear(date);
  },
  "%H": function(date) {
   return leadingNulls(date.tm_hour, 2);
  },
  "%I": function(date) {
   var twelveHour = date.tm_hour;
   if (twelveHour == 0) twelveHour = 12; else if (twelveHour > 12) twelveHour -= 12;
   return leadingNulls(twelveHour, 2);
  },
  "%j": function(date) {
   return leadingNulls(date.tm_mday + __arraySum(__isLeapYear(date.tm_year + 1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon - 1), 3);
  },
  "%m": function(date) {
   return leadingNulls(date.tm_mon + 1, 2);
  },
  "%M": function(date) {
   return leadingNulls(date.tm_min, 2);
  },
  "%n": function() {
   return "\n";
  },
  "%p": function(date) {
   if (date.tm_hour >= 0 && date.tm_hour < 12) {
    return "AM";
   } else {
    return "PM";
   }
  },
  "%S": function(date) {
   return leadingNulls(date.tm_sec, 2);
  },
  "%t": function() {
   return "\t";
  },
  "%u": function(date) {
   return date.tm_wday || 7;
  },
  "%U": function(date) {
   var janFirst = new Date(date.tm_year + 1900, 0, 1);
   var firstSunday = janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7 - janFirst.getDay());
   var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday);
   if (compareByDay(firstSunday, endDate) < 0) {
    var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
    var firstSundayUntilEndJanuary = 31 - firstSunday.getDate();
    var days = firstSundayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
    return leadingNulls(Math.ceil(days / 7), 2);
   }
   return compareByDay(firstSunday, janFirst) === 0 ? "01" : "00";
  },
  "%V": function(date) {
   var janFourthThisYear = new Date(date.tm_year + 1900, 0, 4);
   var janFourthNextYear = new Date(date.tm_year + 1901, 0, 4);
   var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
   var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
   var endDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
   if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
    return "53";
   }
   if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
    return "01";
   }
   var daysDifference;
   if (firstWeekStartThisYear.getFullYear() < date.tm_year + 1900) {
    daysDifference = date.tm_yday + 32 - firstWeekStartThisYear.getDate();
   } else {
    daysDifference = date.tm_yday + 1 - firstWeekStartThisYear.getDate();
   }
   return leadingNulls(Math.ceil(daysDifference / 7), 2);
  },
  "%w": function(date) {
   return date.tm_wday;
  },
  "%W": function(date) {
   var janFirst = new Date(date.tm_year, 0, 1);
   var firstMonday = janFirst.getDay() === 1 ? janFirst : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7 - janFirst.getDay() + 1);
   var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday);
   if (compareByDay(firstMonday, endDate) < 0) {
    var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
    var firstMondayUntilEndJanuary = 31 - firstMonday.getDate();
    var days = firstMondayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
    return leadingNulls(Math.ceil(days / 7), 2);
   }
   return compareByDay(firstMonday, janFirst) === 0 ? "01" : "00";
  },
  "%y": function(date) {
   return (date.tm_year + 1900).toString().substring(2);
  },
  "%Y": function(date) {
   return date.tm_year + 1900;
  },
  "%z": function(date) {
   var off = date.tm_gmtoff;
   var ahead = off >= 0;
   off = Math.abs(off) / 60;
   off = off / 60 * 100 + off % 60;
   return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
  },
  "%Z": function(date) {
   return date.tm_zone;
  },
  "%%": function() {
   return "%";
  }
 };
 for (var rule in EXPANSION_RULES_2) {
  if (pattern.indexOf(rule) >= 0) {
   pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date));
  }
 }
 var bytes = intArrayFromString(pattern, false);
 if (bytes.length > maxsize) {
  return 0;
 }
 writeArrayToMemory(bytes, s);
 return bytes.length - 1;
}

function _system(command) {
 ___setErrNo(6);
 return -1;
}

function _time(ptr) {
 var ret = Date.now() / 1e3 | 0;
 if (ptr) {
  GROWABLE_HEAP_STORE_I32(ptr | 0, ret);
 }
 return ret;
}

function _times(buffer) {
 if (buffer !== 0) {
  _memset(buffer, 0, 16);
 }
 return 0;
}

function _utimes(path, times) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(91, 1, path, times);
 var time;
 if (times) {
  var offset = 8 + 0;
  time = GROWABLE_HEAP_LOAD_I32(times + offset | 0) * 1e3;
  offset = 8 + 4;
  time += GROWABLE_HEAP_LOAD_I32(times + offset | 0) / 1e3;
 } else {
  time = Date.now();
 }
 path = UTF8ToString(path);
 try {
  FS.utime(path, time, time);
  return 0;
 } catch (e) {
  FS.handleFSError(e);
  return -1;
 }
}

function _wait(stat_loc) {
 ___setErrNo(12);
 return -1;
}

function _wait3() {
 return _wait.apply(null, arguments);
}

function _wait4() {
 return _wait.apply(null, arguments);
}

function _waitid() {
 return _wait.apply(null, arguments);
}

function _waitpid() {
 return _wait.apply(null, arguments);
}

function runAndAbortIfError(func) {
 try {
  return func();
 } catch (e) {
  abort(e);
 }
}

var Asyncify = {
 State: {
  Normal: 0,
  Unwinding: 1,
  Rewinding: 2
 },
 state: 0,
 StackSize: 4096,
 currData: null,
 dataInfo: {},
 handleSleepReturnValue: 0,
 exportCallStack: [],
 afterUnwind: null,
 asyncFinalizers: [],
 instrumentWasmExports: function(exports) {
  var ret = {};
  for (var x in exports) {
   (function(x) {
    var original = exports[x];
    if (typeof original === "function") {
     ret[x] = function() {
      Asyncify.exportCallStack.push(x);
      try {
       return original.apply(null, arguments);
      } finally {
       if (ABORT) return;
       var y = Asyncify.exportCallStack.pop(x);
       assert(y === x);
       if (Asyncify.currData && Asyncify.state === Asyncify.State.Unwinding && Asyncify.exportCallStack.length === 0) {
        Asyncify.state = Asyncify.State.Normal;
        runAndAbortIfError(Module["_asyncify_stop_unwind"]);
        if (Asyncify.afterUnwind) {
         Asyncify.afterUnwind();
         Asyncify.afterUnwind = null;
        }
       }
      }
     };
    } else {
     ret[x] = original;
    }
   })(x);
  }
  return ret;
 },
 allocateData: function() {
  var ptr = _malloc(Asyncify.StackSize + 8);
  GROWABLE_HEAP_STORE_I32(ptr | 0, ptr + 8);
  GROWABLE_HEAP_STORE_I32(ptr + 4 | 0, ptr + 8 + Asyncify.StackSize);
  var bottomOfCallStack = Asyncify.exportCallStack[0];
  Asyncify.dataInfo[ptr] = {
   bottomOfCallStack: bottomOfCallStack
  };
  return ptr;
 },
 freeData: function(ptr) {
  _free(ptr);
  Asyncify.dataInfo[ptr] = null;
 },
 handleSleep: function(startAsync) {
  if (ABORT) return;
  noExitRuntime = true;
  if (Asyncify.state === Asyncify.State.Normal) {
   var reachedCallback = false;
   var reachedAfterCallback = false;
   startAsync(function(handleSleepReturnValue) {
    if (ABORT) return;
    Asyncify.handleSleepReturnValue = handleSleepReturnValue || 0;
    reachedCallback = true;
    if (!reachedAfterCallback) {
     return;
    }
    Asyncify.state = Asyncify.State.Rewinding;
    runAndAbortIfError(function() {
     Module["_asyncify_start_rewind"](Asyncify.currData);
    });
    if (Browser.mainLoop.func) {
     Browser.mainLoop.resume();
    }
    var start = Asyncify.dataInfo[Asyncify.currData].bottomOfCallStack;
    var asyncWasmReturnValue = Module["asm"][start]();
    if (!Asyncify.currData) {
     var asyncFinalizers = Asyncify.asyncFinalizers;
     Asyncify.asyncFinalizers = [];
     asyncFinalizers.forEach(function(func) {
      func(asyncWasmReturnValue);
     });
    }
   });
   reachedAfterCallback = true;
   if (!reachedCallback) {
    Asyncify.state = Asyncify.State.Unwinding;
    Asyncify.currData = Asyncify.allocateData();
    runAndAbortIfError(function() {
     Module["_asyncify_start_unwind"](Asyncify.currData);
    });
    if (Browser.mainLoop.func) {
     Browser.mainLoop.pause();
    }
   }
  } else if (Asyncify.state === Asyncify.State.Rewinding) {
   Asyncify.state = Asyncify.State.Normal;
   runAndAbortIfError(Module["_asyncify_stop_rewind"]);
   Asyncify.freeData(Asyncify.currData);
   Asyncify.currData = null;
  } else {
   abort("invalid state: " + Asyncify.state);
  }
  return Asyncify.handleSleepReturnValue;
 }
};

if (!ENVIRONMENT_IS_PTHREAD) PThread.initMainThreadBlock();

if (ENVIRONMENT_IS_NODE) {
 _emscripten_get_now = function _emscripten_get_now_actual() {
  var t = process["hrtime"]();
  return t[0] * 1e3 + t[1] / 1e6;
 };
} else if (ENVIRONMENT_IS_PTHREAD) {
 _emscripten_get_now = function() {
  return performance["now"]() - __performance_now_clock_drift;
 };
} else if (typeof dateNow !== "undefined") {
 _emscripten_get_now = dateNow;
} else if (typeof performance === "object" && performance && typeof performance["now"] === "function") {
 _emscripten_get_now = function() {
  return performance["now"]();
 };
} else {
 _emscripten_get_now = Date.now;
}

FS.staticInit();

Module["FS_createFolder"] = FS.createFolder;

Module["FS_createPath"] = FS.createPath;

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

Module["FS_createLazyFile"] = FS.createLazyFile;

Module["FS_createLink"] = FS.createLink;

Module["FS_createDevice"] = FS.createDevice;

Module["FS_unlink"] = FS.unlink;

if (ENVIRONMENT_HAS_NODE) {
 var fs = require("fs");
 var NODEJS_PATH = require("path");
 NODEFS.staticInit();
}

Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas, vrDevice) {
 err("Module.requestFullScreen is deprecated. Please call Module.requestFullscreen instead.");
 Module["requestFullScreen"] = Module["requestFullscreen"];
 Browser.requestFullScreen(lockPointer, resizeCanvas, vrDevice);
};

Module["requestFullscreen"] = function Module_requestFullscreen(lockPointer, resizeCanvas, vrDevice) {
 Browser.requestFullscreen(lockPointer, resizeCanvas, vrDevice);
};

Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) {
 Browser.requestAnimationFrame(func);
};

Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) {
 Browser.setCanvasSize(width, height, noUpdates);
};

Module["pauseMainLoop"] = function Module_pauseMainLoop() {
 Browser.mainLoop.pause();
};

Module["resumeMainLoop"] = function Module_resumeMainLoop() {
 Browser.mainLoop.resume();
};

Module["getUserMedia"] = function Module_getUserMedia() {
 Browser.getUserMedia();
};

Module["createContext"] = function Module_createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
 return Browser.createContext(canvas, useWebGL, setInModule, webGLContextAttributes);
};

var GLctx;

GL.init();

var proxiedFunctionTable = [ null, ___syscall10, ___syscall118, ___syscall12, ___syscall122, ___syscall132, ___syscall133, ___syscall14, ___syscall140, ___syscall142, ___syscall144, ___syscall145, ___syscall147, ___syscall148, ___syscall15, ___syscall163, ___syscall180, ___syscall181, ___syscall183, ___syscall191, ___syscall192, ___syscall193, ___syscall194, ___syscall195, ___syscall196, ___syscall197, ___syscall198, ___syscall202, ___syscall20, ___syscall205, ___syscall207, ___syscall211, ___syscall212, ___syscall219, ___syscall220, ___syscall221, ___syscall268, ___syscall269, ___syscall272, ___syscall29, ___syscall295, ___syscall296, ___syscall297, ___syscall298, ___syscall3, ___syscall300, ___syscall301, ___syscall302, ___syscall303, ___syscall304, ___syscall305, ___syscall306, ___syscall320, ___syscall324, ___syscall33, ___syscall330, ___syscall331, ___syscall333, ___syscall334, ___syscall34, ___syscall340, ___syscall36, ___syscall38, ___syscall39, ___syscall4, ___syscall40, ___syscall42, ___syscall5, ___syscall54, ___syscall57, ___syscall60, ___syscall63, ___syscall64, ___syscall66, ___syscall75, ___syscall77, ___syscall83, ___syscall85, ___syscall9, ___syscall91, ___syscall94, ___syscall96, ___syscall97, _chroot, _confstr, _emscripten_set_canvas_element_size_main_thread, _fd_close, _fd_write, _fpathconf, _tzset, _sysconf, _utimes ];

function intArrayFromString(stringy, dontAddNull, length) {
 var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
 var u8array = new Array(len);
 var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
 if (dontAddNull) u8array.length = numBytesWritten;
 return u8array;
}

var asmLibraryArg = {
 "k": ___assert_fail,
 "J": ___call_main,
 "uc": ___clock_gettime,
 "tc": ___libc_current_sigrtmax,
 "sc": ___libc_current_sigrtmin,
 "w": ___lock,
 "ga": ___map_file,
 "rc": ___syscall10,
 "qc": ___syscall118,
 "fa": ___syscall12,
 "pc": ___syscall122,
 "ea": ___syscall132,
 "oc": ___syscall133,
 "nc": ___syscall14,
 "da": ___syscall140,
 "mc": ___syscall142,
 "lc": ___syscall144,
 "ca": ___syscall145,
 "kc": ___syscall147,
 "jc": ___syscall148,
 "ba": ___syscall15,
 "ic": ___syscall163,
 "hc": ___syscall180,
 "gc": ___syscall181,
 "fc": ___syscall183,
 "ec": ___syscall191,
 "dc": ___syscall192,
 "cc": ___syscall193,
 "bc": ___syscall194,
 "aa": ___syscall195,
 "ac": ___syscall196,
 "$b": ___syscall197,
 "_b": ___syscall198,
 "Zb": ___syscall199,
 "Yb": ___syscall20,
 "Xb": ___syscall200,
 "Wb": ___syscall201,
 "Vb": ___syscall202,
 "Ub": ___syscall205,
 "Tb": ___syscall207,
 "Sb": ___syscall209,
 "Rb": ___syscall211,
 "$": ___syscall212,
 "Qb": ___syscall219,
 "Pb": ___syscall220,
 "d": ___syscall221,
 "Ob": ___syscall268,
 "Nb": ___syscall269,
 "Mb": ___syscall272,
 "Lb": ___syscall29,
 "_": ___syscall295,
 "Kb": ___syscall296,
 "Jb": ___syscall297,
 "Ib": ___syscall298,
 "Hb": ___syscall3,
 "I": ___syscall300,
 "Gb": ___syscall301,
 "Fb": ___syscall302,
 "Eb": ___syscall303,
 "Db": ___syscall304,
 "Cb": ___syscall305,
 "Z": ___syscall306,
 "Bb": ___syscall320,
 "Ab": ___syscall324,
 "zb": ___syscall33,
 "yb": ___syscall330,
 "xb": ___syscall331,
 "wb": ___syscall333,
 "vb": ___syscall334,
 "ub": ___syscall34,
 "Y": ___syscall340,
 "tb": ___syscall36,
 "sb": ___syscall38,
 "rb": ___syscall39,
 "qb": ___syscall4,
 "pb": ___syscall40,
 "ob": ___syscall42,
 "H": ___syscall5,
 "G": ___syscall54,
 "nb": ___syscall57,
 "mb": ___syscall60,
 "X": ___syscall63,
 "lb": ___syscall64,
 "kb": ___syscall66,
 "jb": ___syscall75,
 "ib": ___syscall77,
 "hb": ___syscall83,
 "gb": ___syscall85,
 "fb": ___syscall9,
 "eb": ___syscall91,
 "db": ___syscall94,
 "cb": ___syscall96,
 "bb": ___syscall97,
 "j": ___unlock,
 "F": __exit,
 "b": _abort,
 "_a": _alarm,
 "Za": _chroot,
 "E": _clock,
 "v": _clock_getres,
 "c": _clock_gettime,
 "V": _clock_settime,
 "D": _confstr,
 "Ya": _dlerror,
 "Xa": _dlopen,
 "U": _dlsym,
 "r": _emscripten_asm_const_iii,
 "A": _emscripten_conditional_set_current_thread_status,
 "Wa": _emscripten_exit_with_live_runtime,
 "q": _emscripten_futex_wait,
 "h": _emscripten_futex_wake,
 "l": _emscripten_get_now,
 "Va": _emscripten_has_threading_support,
 "t": _emscripten_is_main_browser_thread,
 "Ua": _emscripten_is_main_runtime_thread,
 "Ta": _emscripten_memcpy_big,
 "Sa": _emscripten_receive_on_main_thread_js,
 "Ra": _emscripten_resize_heap,
 "u": _emscripten_run_script,
 "Qa": _emscripten_run_script_string,
 "Pa": _emscripten_set_canvas_element_size,
 "T": _emscripten_set_current_thread_status,
 "Oa": _emscripten_set_thread_name,
 "S": _emscripten_sleep,
 "Na": _emscripten_syscall,
 "Ma": _emscripten_webgl_create_context,
 "La": _endpwent,
 "ab": _environ_get,
 "$a": _environ_sizes_get,
 "Ka": _execv,
 "Ja": _execve,
 "s": _exit,
 "m": _fd_close,
 "W": _fd_write,
 "Ia": _fexecve,
 "R": _flock,
 "Q": _fork,
 "P": _fpathconf,
 "Ha": _getitimer,
 "Ga": _getloadavg,
 "O": _getpwent,
 "Fa": _getpwnam,
 "Ea": _getpwuid,
 "C": _gettimeofday,
 "z": _gmtime_r,
 "Da": initPthreadsJS,
 "Ca": _kill,
 "Ba": _killpg,
 "Aa": _localtime,
 "f": _localtime_r,
 "memory": wasmMemory || Module["wasmMemory"],
 "za": _mktime,
 "ya": _pathconf,
 "y": _pthread_create,
 "xa": _pthread_detach,
 "wa": _pthread_exit,
 "va": _pthread_join,
 "a": _pthread_self,
 "x": _pthread_sigmask,
 "p": _raise,
 "i": _round,
 "ua": _sched_yield,
 "N": set_asyncify_stack_size,
 "ta": _setgroups,
 "sa": _setitimer,
 "ra": _setpwent,
 "e": _sigaction,
 "qa": _sigaddset,
 "g": _sigemptyset,
 "B": _sigfillset,
 "M": _siginterrupt,
 "pa": _sigismember,
 "oa": _sigpending,
 "na": _strftime,
 "o": _sysconf,
 "ma": _system,
 "table": wasmTable,
 "n": _time,
 "L": _times,
 "la": _utimes,
 "ka": _wait,
 "ja": _wait3,
 "ia": _wait4,
 "ha": _waitid,
 "K": _waitpid
};

var asm = createWasm();

Module["asm"] = asm;

var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function() {
 return Module["asm"]["vc"].apply(null, arguments);
};

var _export__runFile = Module["_export__runFile"] = function() {
 return Module["asm"]["wc"].apply(null, arguments);
};

var _export__runFileAsync = Module["_export__runFileAsync"] = function() {
 return Module["asm"]["xc"].apply(null, arguments);
};

var _export_chdir = Module["_export_chdir"] = function() {
 return Module["asm"]["yc"].apply(null, arguments);
};

var _export_getAsyncYieldRate = Module["_export_getAsyncYieldRate"] = function() {
 return Module["asm"]["zc"].apply(null, arguments);
};

var _export_reset = Module["_export_reset"] = function() {
 return Module["asm"]["Ac"].apply(null, arguments);
};

var _export_run = Module["_export_run"] = function() {
 return Module["asm"]["Bc"].apply(null, arguments);
};

var _export_runAsync = Module["_export_runAsync"] = function() {
 return Module["asm"]["Cc"].apply(null, arguments);
};

var _export_setAsyncYieldRate = Module["_export_setAsyncYieldRate"] = function() {
 return Module["asm"]["Dc"].apply(null, arguments);
};

var _main = Module["_main"] = function() {
 return Module["asm"]["Ec"].apply(null, arguments);
};

var _free = Module["_free"] = function() {
 return Module["asm"]["Fc"].apply(null, arguments);
};

var _malloc = Module["_malloc"] = function() {
 return Module["asm"]["Gc"].apply(null, arguments);
};

var ___errno_location = Module["___errno_location"] = function() {
 return Module["asm"]["Hc"].apply(null, arguments);
};

var _emscripten_get_global_libc = Module["_emscripten_get_global_libc"] = function() {
 return Module["asm"]["Ic"].apply(null, arguments);
};

var __get_tzname = Module["__get_tzname"] = function() {
 return Module["asm"]["Jc"].apply(null, arguments);
};

var __get_daylight = Module["__get_daylight"] = function() {
 return Module["asm"]["Kc"].apply(null, arguments);
};

var __get_timezone = Module["__get_timezone"] = function() {
 return Module["asm"]["Lc"].apply(null, arguments);
};

var _memalign = Module["_memalign"] = function() {
 return Module["asm"]["Mc"].apply(null, arguments);
};

var ___pthread_tsd_run_dtors = Module["___pthread_tsd_run_dtors"] = function() {
 return Module["asm"]["Nc"].apply(null, arguments);
};

var _emscripten_main_thread_process_queued_calls = Module["_emscripten_main_thread_process_queued_calls"] = function() {
 return Module["asm"]["Oc"].apply(null, arguments);
};

var _emscripten_current_thread_process_queued_calls = Module["_emscripten_current_thread_process_queued_calls"] = function() {
 return Module["asm"]["Pc"].apply(null, arguments);
};

var _emscripten_register_main_browser_thread_id = Module["_emscripten_register_main_browser_thread_id"] = function() {
 return Module["asm"]["Qc"].apply(null, arguments);
};

var _emscripten_main_browser_thread_id = Module["_emscripten_main_browser_thread_id"] = function() {
 return Module["asm"]["Rc"].apply(null, arguments);
};

var _emscripten_async_run_in_main_thread = Module["_emscripten_async_run_in_main_thread"] = function() {
 return Module["asm"]["Sc"].apply(null, arguments);
};

var _emscripten_sync_run_in_main_thread = Module["_emscripten_sync_run_in_main_thread"] = function() {
 return Module["asm"]["Tc"].apply(null, arguments);
};

var _emscripten_sync_run_in_main_thread_0 = Module["_emscripten_sync_run_in_main_thread_0"] = function() {
 return Module["asm"]["Uc"].apply(null, arguments);
};

var _emscripten_sync_run_in_main_thread_1 = Module["_emscripten_sync_run_in_main_thread_1"] = function() {
 return Module["asm"]["Vc"].apply(null, arguments);
};

var _emscripten_sync_run_in_main_thread_2 = Module["_emscripten_sync_run_in_main_thread_2"] = function() {
 return Module["asm"]["Wc"].apply(null, arguments);
};

var _emscripten_sync_run_in_main_thread_xprintf_varargs = Module["_emscripten_sync_run_in_main_thread_xprintf_varargs"] = function() {
 return Module["asm"]["Xc"].apply(null, arguments);
};

var _emscripten_sync_run_in_main_thread_3 = Module["_emscripten_sync_run_in_main_thread_3"] = function() {
 return Module["asm"]["Yc"].apply(null, arguments);
};

var _emscripten_sync_run_in_main_thread_4 = Module["_emscripten_sync_run_in_main_thread_4"] = function() {
 return Module["asm"]["Zc"].apply(null, arguments);
};

var _emscripten_sync_run_in_main_thread_5 = Module["_emscripten_sync_run_in_main_thread_5"] = function() {
 return Module["asm"]["_c"].apply(null, arguments);
};

var _emscripten_sync_run_in_main_thread_6 = Module["_emscripten_sync_run_in_main_thread_6"] = function() {
 return Module["asm"]["$c"].apply(null, arguments);
};

var _emscripten_sync_run_in_main_thread_7 = Module["_emscripten_sync_run_in_main_thread_7"] = function() {
 return Module["asm"]["ad"].apply(null, arguments);
};

var _emscripten_run_in_main_runtime_thread_js = Module["_emscripten_run_in_main_runtime_thread_js"] = function() {
 return Module["asm"]["bd"].apply(null, arguments);
};

var _emscripten_async_queue_on_thread_ = Module["_emscripten_async_queue_on_thread_"] = function() {
 return Module["asm"]["cd"].apply(null, arguments);
};

var _proxy_main = Module["_proxy_main"] = function() {
 return Module["asm"]["dd"].apply(null, arguments);
};

var _emscripten_tls_init = Module["_emscripten_tls_init"] = function() {
 return Module["asm"]["ed"].apply(null, arguments);
};

var stackSave = Module["stackSave"] = function() {
 return Module["asm"]["fd"].apply(null, arguments);
};

var stackAlloc = Module["stackAlloc"] = function() {
 return Module["asm"]["gd"].apply(null, arguments);
};

var stackRestore = Module["stackRestore"] = function() {
 return Module["asm"]["hd"].apply(null, arguments);
};

var dynCall_vi = Module["dynCall_vi"] = function() {
 return Module["asm"]["id"].apply(null, arguments);
};

var dynCall_ii = Module["dynCall_ii"] = function() {
 return Module["asm"]["jd"].apply(null, arguments);
};

var _asyncify_start_unwind = Module["_asyncify_start_unwind"] = function() {
 return Module["asm"]["kd"].apply(null, arguments);
};

var _asyncify_stop_unwind = Module["_asyncify_stop_unwind"] = function() {
 return Module["asm"]["ld"].apply(null, arguments);
};

var _asyncify_start_rewind = Module["_asyncify_start_rewind"] = function() {
 return Module["asm"]["md"].apply(null, arguments);
};

var _asyncify_stop_rewind = Module["_asyncify_stop_rewind"] = function() {
 return Module["asm"]["nd"].apply(null, arguments);
};

Module["asm"] = asm;

Module["ccall"] = ccall;

Module["cwrap"] = cwrap;

Module["getMemory"] = getMemory;

Module["addRunDependency"] = addRunDependency;

Module["removeRunDependency"] = removeRunDependency;

Module["ENV"] = ENV;

Module["FS"] = FS;

Module["FS_createFolder"] = FS.createFolder;

Module["FS_createPath"] = FS.createPath;

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

Module["FS_createLazyFile"] = FS.createLazyFile;

Module["FS_createLink"] = FS.createLink;

Module["FS_createDevice"] = FS.createDevice;

Module["FS_unlink"] = FS.unlink;

Module["establishStackSpace"] = establishStackSpace;

Module["callMain"] = callMain;

Module["PThread"] = PThread;

Module["ExitStatus"] = ExitStatus;

Module["dynCall_ii"] = dynCall_ii;

Module["calledRun"] = calledRun;

var calledRun;

Module["then"] = function(func) {
 if (calledRun) {
  func(Module);
 } else {
  var old = Module["onRuntimeInitialized"];
  Module["onRuntimeInitialized"] = function() {
   if (old) old();
   func(Module);
  };
 }
 return Module;
};

function ExitStatus(status) {
 this.name = "ExitStatus";
 this.message = "Program terminated with exit(" + status + ")";
 this.status = status;
}

var calledMain = false;

dependenciesFulfilled = function runCaller() {
 if (!calledRun) run();
 if (!calledRun) dependenciesFulfilled = runCaller;
};

function callMain(args) {
 args = args || [];
 var argc = args.length + 1;
 var argv = stackAlloc((argc + 1) * 4);
 GROWABLE_HEAP_STORE_I32(argv | 0, allocateUTF8OnStack(thisProgram));
 for (var i = 1; i < argc; i++) {
  GROWABLE_HEAP_STORE_I32(((argv >> 2) + i) * 4 | 0, allocateUTF8OnStack(args[i - 1]));
 }
 GROWABLE_HEAP_STORE_I32(((argv >> 2) + argc) * 4 | 0, 0);
 try {
  var ret = Module["_main"](argc, argv);
  if (!noExitRuntime) {
   exit(ret, true);
  }
 } catch (e) {
  if (e instanceof ExitStatus) {
   return;
  } else if (e == "SimulateInfiniteLoop") {
   noExitRuntime = true;
   return;
  } else {
   var toLog = e;
   if (e && typeof e === "object" && e.stack) {
    toLog = [ e, e.stack ];
   }
   err("exception thrown: " + toLog);
   quit_(1, e);
  }
 } finally {
  calledMain = true;
 }
}

function run(args) {
 args = args || arguments_;
 if (runDependencies > 0) {
  return;
 }
 preRun();
 if (runDependencies > 0) return;
 function doRun() {
  if (calledRun) return;
  calledRun = true;
  Module["calledRun"] = true;
  if (ABORT) return;
  initRuntime();
  preMain();
  if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
  if (shouldRunNow) callMain(args);
  postRun();
 }
 if (Module["setStatus"]) {
  Module["setStatus"]("Running...");
  setTimeout(function() {
   setTimeout(function() {
    Module["setStatus"]("");
   }, 1);
   doRun();
  }, 1);
 } else {
  doRun();
 }
}

Module["run"] = run;

function exit(status, implicit) {
 if (implicit && noExitRuntime && status === 0) {
  return;
 }
 if (noExitRuntime) {} else {
  PThread.terminateAllThreads();
  ABORT = true;
  EXITSTATUS = status;
  exitRuntime();
  if (Module["onExit"]) Module["onExit"](status);
 }
 quit_(status, new ExitStatus(status));
}

if (Module["preInit"]) {
 if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
 while (Module["preInit"].length > 0) {
  Module["preInit"].pop()();
 }
}

var shouldRunNow = true;

if (Module["noInitialRun"]) shouldRunNow = false;

if (!ENVIRONMENT_IS_PTHREAD) noExitRuntime = true;

if (!ENVIRONMENT_IS_PTHREAD) run();


  return _Coldbrew_coldbrew_internal_
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
      module.exports = _Coldbrew_coldbrew_internal_;
    else if (typeof define === 'function' && define['amd'])
      define([], function() { return _Coldbrew_coldbrew_internal_; });
    else if (typeof exports === 'object')
      exports["_Coldbrew_coldbrew_internal_"] = _Coldbrew_coldbrew_internal_;
    

// This same script is run on the browser, in Node.js, and in workers. Because of that, there is
// some branching that controls code that specifically needs to run in each of those environments.

// Define only one other thing in the global scope. We need this to track
// shared mount point nodes.
if (typeof COLDBREW_GLOBAL_SCOPE._coldbrewMountPointNodes === 'undefined') {
  COLDBREW_GLOBAL_SCOPE._coldbrewMountPointNodes = {};
}

/**********************************************************/
/***************START SHARED MEMORY ERROR******************/
/**********************************************************/
if (typeof COLDBREW_GLOBAL_SCOPE.Atomics === 'undefined') {
  var flagMessage = '';
  if (navigator.userAgent.search("Firefox") >= 0) {
    flagMessage = ' However, from version 57 in Firefox: this feature is behind the javascript.options.shared_memory preference (needs to be set to true). To change preferences in Firefox, visit about:config.';
  }
  throw new Error("This browser is currently not supported with Coldbrew due to threading support being enabled. See 'https://git.io/fjANP#using-multiple-threads-in-python' for more information. You can build a custom build of Coldbrew with threading disabled if you need to use this in environments that don't support threading yet."+flagMessage);
}
/**********************************************************/
/****************END SHARED MEMORY ERROR*******************/
/**********************************************************/


/**********************************************************/
/***************START MODULE DEFINITIONS*******************/
/**********************************************************/
// Since when 'window' is not available, some of the 
// third-party libraries export to module.exports, we have a list of 
// modules objects that get assigned to each third-party library
/**********************************************************/
if (IS_NODE_JS) {
  var module1 = {exports: {}}; // the current module (this file!)
  var module2 = {exports: {}}; // browserfs
  var module3 = {exports: {}}; // jszip
  var module4 = {exports: {}}; // fast-text-encoding
  var module5 = {exports: {}}; // comlink
}
/**********************************************************/
/****************END MODULE DEFINITIONS********************/
/**********************************************************/

/**********************************************************/
/***********START BEGINNING OF GLOBAL CLOSURE**************/
/**********************************************************/
// Creating a closure to wrap all code in this file within
// a closed scope.
/**********************************************************/
(function() {
/**********************************************************/
/************END BEGINNING OF GLOBAL CLOSURE***************/
/**********************************************************/


/**********************************************************/
/***********START DEFINE GETTER FOR COMLINK****************/
/**********************************************************/
// Defines a function that returns the Comlink instance,
// which is used for worker communication. It is
// particularly different than getting any other library
// since in Node.js, a monkey-patch needs to be performed
// using patchMessageChannel() to make a forked-process
// behave like a Worker with Worker APIs.
/**********************************************************/
function getComlink() {
  if (IS_NODE_JS) {
    require('node-comlink').patchMessageChannel();
    var Comlink = require('comlinkjs/umd/comlink.js');
    return Comlink;
  } else {
    var Comlink;
    if ((!COLDBREW_GLOBAL_SCOPE || typeof COLDBREW_GLOBAL_SCOPE.Comlink === 'undefined')) {
      Comlink = module5.exports;
    } else {
      Comlink = COLDBREW_GLOBAL_SCOPE.Comlink;
    }
    return Comlink;    
  }
}
/**********************************************************/
/***********END DEFINE GETTER FOR COMLINK******************/
/**********************************************************/

/**********************************************************/
/**************START DEFINE MISC CLASSES*******************/
/**********************************************************/
// Defines miscellaneous classes that the Coldbrew runtime
// uses. 
/**********************************************************/
class JavaScriptError extends Error {
  constructor(...args) {
    super(...args)
    Error.captureStackTrace(this, JavaScriptError);
  }
}
class PythonError extends Error {
  constructor(exceptionInfo) {
    super(exceptionInfo.value)
    Error.captureStackTrace(this, PythonError);
    this.errorData = exceptionInfo;
  }
}
class HTTPResponseError extends Error {
  constructor(...args) {
    super(...args)
    Error.captureStackTrace(this, HTTPResponseError);
  }
}
class HTTPAbortError extends Error {
  constructor(...args) {
    super(...args)
    Error.captureStackTrace(this, HTTPAbortError);
  }
}
class HTTPTimeoutError extends Error {
  constructor(...args) {
    super(...args)
    Error.captureStackTrace(this, HTTPTimeoutError);
  }
}
class PythonVariable {
  static isPythonVariable(obj) {
    if (obj instanceof Object) {
      if (obj._internal_coldbrew_native_js_worker_proxy === true) {
        // Since this is also a proxy variable it can easily get confused, immediately return false
        return false;
      }
      var vals = PythonVariable.internalKeyDefs
        .filter(function(internalKeyDef) { return !['toString', 'toJSON', '__destroyed__'].includes(internalKeyDef); })
        .map(function(internalKeyDef) { return obj[internalKeyDef]; });
      var plainPythonVariable = vals.every(function(val) { return typeof val !== 'undefined' && typeof val.then === 'undefined'; });
      var potentialWorkerPythonVariable = typeof obj.__raw_promise__ !== 'undefined' && vals.every(function(val) { return (typeof val !== 'undefined' && typeof val.then !== 'undefined') || typeof val === 'string' || typeof val === 'function'; });
      if (plainPythonVariable) {
        return true;
      } else if (potentialWorkerPythonVariable) {
        return Promise.all(vals).then(function(vals) {
          return vals.every(function(val) { return typeof val !== 'undefined' && typeof val.then === 'undefined'; });
        });
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
}
PythonVariable.internalKeyDefs = ['__type__', '__uid__', '__inspect__', '__destroy__', '__destroyed__', 'toString', 'toJSON'];
PythonVariable.internalSecretKeyDefs = ['_internal_coldbrew_repr'];
class PythonDynamicallyEvaluatedValue {}
class _PythonKeywords {
  constructor(keywords, resolvePromises = false) {
    var newKeywords = {};
    Object.keys(keywords).forEach(function(key) {
      newKeywords[key] = serializeToPython(keywords[key], false, resolvePromises);
    });
    this.keywords = newKeywords;
  }
}
/**********************************************************/
/**************END DEFINE MISC CLASSES*********************/
/**********************************************************/

/**********************************************************/
/*****************START HELPER UTILITIES*******************/
/**********************************************************/
// Defines various helper utility functions.
/**********************************************************/
function defer(val) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(val);
    }, 1);
  });
}

function parseUrl(string, prop) {
  return (new URL(string))[prop];
}
// Exporting parseUrl to the top scope, since we actually use it
// to load assets for the wasm like (.data, .embin, .wasm) files.
COLDBREW_TOP_SCOPE.parseUrl = parseUrl;

function stringifyToJson(obj) {
  return JSON.stringify(obj, function(k, v) {
    return v === undefined ? null : v;
  });
};

function randid() {
  return 'rxxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Source: isPlainObject from lodash.isPlainObject
var isPlainObject = null;
(function() {
  var objectTag = '[object Object]';
  function isHostObject(value) {
    var result = false;
    if (value != null && typeof value.toString != 'function') {
      try {
        result = !!(value + '');
      } catch (e) {}
    }
    return result;
  }
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  var funcProto = Function.prototype,
      objectProto = Object.prototype;
  var funcToString = funcProto.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var objectCtorString = funcToString.call(Object);
  var objectToString = objectProto.toString;
  var getPrototype = overArg(Object.getPrototypeOf, Object);
  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }
  isPlainObject = function(value) {
    if (!isObjectLike(value) ||
        objectToString.call(value) != objectTag || isHostObject(value)) {
      return false;
    }
    var proto = getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return (typeof Ctor == 'function' &&
      Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
  };
})();

function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1]
}

function isConstructor(obj) {
  return !!obj.prototype && !!obj.prototype.constructor.name;
}

function isSerializable(obj) {
  var isNestedSerializable;
  function isPlain(val) {
    return (typeof val === 'undefined' || val == null || typeof val === 'string' || typeof val === 'boolean' || typeof val === 'number' || Array.isArray(val) || isPlainObject(val));
  }
  if (!isPlain(obj)) {
    return false;
  }
  var properties = ((typeof obj ===  'object' && obj != null) || typeof obj ===  'function') ? Object.getOwnPropertyNames(obj) : [];
  for (var i=0; i<properties.length; i++) {
    var property = properties[i];
    if (!isPlain(obj[property])) {
      return false;
    }
    if (typeof obj[property] == "object") {
      isNestedSerializable = isSerializable(obj[property]);
      if (!isNestedSerializable) {
        return false;
      }
    }
  };
  return true;
}

function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}

function isPromise(val) {
  return !(val && val._internal_coldbrew_native_js_worker_proxy === true) && !!(val && typeof val.then === 'function');
}

function getColdbrewConcurrencyError() {
  var e = new Error('Coldbrew Error: The Coldbrew Python interpreter is already running. You cannot run the Coldbrew Python interpreter concurrently. Please wait for all previous executions to finish.');
  e.coldbrewConcurrencyError = true;
  return e;
}

/**********************************************************/
/******************END HELPER UTILITIES********************/
/**********************************************************/

/**********************************************************/
/*****************START HTTP SEND REQUEST******************/
/**********************************************************/
// A HTTP/HTTPS sendRequest function that helps send a
// HTTP/HTTPS request in both the browser through XHR
// or in Node.js through the `http` client library.
// This function is used to load some assets for the wasm
// like (.embin) or load .zip files. It is also what 
// ultimately shims Python's HTTP library.
/**********************************************************/
function sendRequest(method, url, body, headers, timeout, binary = false, level=0) {
  if (level > 25) {
    var e = new HTTPResponseError("The request has been redirected too many times.");
    e.errorData = {
      status: 0,
      statusText: "",
      responseText: "",
      responseType: "",
      responseURL: url,
      headers: "",
    }
    return Promise.reject(e);
  }
  return new Promise(function (resolve, reject) {
    if (typeof XMLHttpRequest !== 'undefined') {
      var request = new XMLHttpRequest();
      if (timeout !== null) {
        request.timeout = timeout * 1000;
      }
      if (binary) {
        request.responseType = "arraybuffer";
      }
      request.open(method, url, true);
      Object.keys(headers).forEach(function(header) {
        if (!["host", "connection", "user-agent", "accept-encoding", "content-length"].includes(header.toLowerCase())) {
          request.setRequestHeader(header, headers[header]);
        }
      });
      request.onreadystatechange = function () {
        var headers = this.getAllResponseHeaders();
        if (this.readyState === 4) {
          var responseContent  = !binary ? this.responseText : this.response;
          var responseLength = !binary ? responseContent.length : responseContent.byteLength;
          headers += 'content-length: '+responseLength.toString()+'\r\n';
          if (this.status >= 200 && this.status < 400) {
            resolve({
              status: this.status,
              statusText: this.statusText,
              responseText: responseContent,
              responseType: this.responseType,
              responseURL: this.responseURL,
              headers: headers,
            });
          } else {
            var e = new HTTPResponseError("The request has failed.");
            e.errorData = {
              status: this.status,
              statusText: this.statusText,
              responseText: responseContent,
              responseType: this.responseType,
              responseURL: this.responseURL,
              headers: headers,
            }
            reject(e);
          }
        }
      };
      request.ontimeout = function () {
        var e = new HTTPTimeoutError("The request has timed out.");
        e.errorData = {
          status: 0,
          statusText: "",
          responseText: "",
          responseType: "",
          responseURL: url,
          headers: {},
        }
        reject(e);
      };
      request.onabort = function () {
        var e = new HTTPAbortError("The request has been aborted.");
        e.errorData = {
          status: 0,
          statusText: "",
          responseText: "",
          responseType: "",
          responseURL: url,
          headers: {},
        }
        reject(e);
      };
      request.send(body);
    } else {
      var urllib = require('url');
      var parsedUrl = urllib.parse(url);
      var httplib = (parsedUrl.protocol === 'http:') ? require('http') : require('https');
      var requestOptions = {
        method: method,
        host: parsedUrl.hostname,
        port: parsedUrl.port,
        path: parsedUrl.path,
        headers: headers,
      };
      if (timeout !== null) {
        requestOptions.timeout = timeout;
      }
      var request = httplib.request(requestOptions, function (res) {
        if (binary) res.setEncoding('binary');
        var responseContent = binary ? [] : "";
        res.on("data", function (data) {
          if (binary) {
            responseContent.push(Buffer.from(data, 'binary'));
          } else {
            responseContent += data;
          }
        });
        res.on("end", function () {
          if (res.statusCode == 301 || res.statusCode == 302 || res.statusCode == 303 && typeof res.headers.location !== 'undefined') {
            Object.keys(headers).forEach(function(header) {
              if (header.toLowerCase() === 'host') {
                headers[header] = urllib.parse(res.headers.location).host;
              }
            });
            sendRequest('GET', res.headers.location, body, headers, timeout, binary, level+1).then(resolve).catch(reject);
            return;
          } else if (res.statusCode == 307 || res.statusCode == 308 && typeof res.headers.location !== 'undefined') {
            Object.keys(headers).forEach(function(header) {
              if (header.toLowerCase() === 'host') {
                headers[header] = urllib.parse(res.headers.location).host;
              }
            });
            sendRequest(method, res.headers.location, body, headers, timeout, binary, level+1).then(resolve).catch(reject);
            return;
          } else if (res.statusCode >= 200 && res.statusCode < 400) {
            resolve({
              status: res.statusCode,
              statusText: res.statusMessage,
              responseText: (binary) ? toArrayBuffer(Buffer.concat(responseContent)) : responseContent,
              responseType: (binary) ? "arraybuffer" : "",
              responseURL: typeof res.headers.location !== 'undefined' ? res.headers.location : url,
              headers: res.rawHeaders.map(h => h+'\r\n').join(''),
            });
          } else {
            var e = new HTTPResponseError("The request has failed.");
            e.errorData = {
              status: res.statusCode,
              statusText: res.statusMessage,
              responseText: (binary) ? toArrayBuffer(Buffer.concat(responseContent)) : responseContent,
              responseType: (binary) ? "arraybuffer" : "",
              responseURL: typeof res.headers.location !== 'undefined' ? res.headers.location : url,
              headers: res.rawHeaders.map(h => h+'\r\n').join(''),
            }
            reject(e);
          }
        });
      });
      request.on('error', function(error) {
        var e = new HTTPResponseError("The request has failed.");
        e.errorData = {
          status: 0,
          statusText: error.message,
          responseText: "",
          responseType: "",
          responseURL: url,
          headers: {},
        }
        reject(e);
      });
      request.on('abort', function() {
        var e = new HTTPAbortError("The request has been aborted.");
        e.errorData = {
          status: 0,
          statusText: "",
          responseText: "",
          responseType: "",
          responseURL: url,
          headers: {},
        }
        reject(e);
      });
      request.on('timeout', function(e) {
        var e = new HTTPTimeoutError("The request has timed out.");
        e.errorData = {
          status: 0,
          statusText: "",
          responseText: "",
          responseType: "",
          responseURL: url,
          headers: {},
        }
        reject(e);
      });
      if (body !== null) {
        request.write(body);
      }
      request.end();
    }
  });
}
/**********************************************************/
/******************END HTTP SEND REQUEST*******************/
/**********************************************************/

/**********************************************************/
/***********START DEFINE SINGLETON INTIALIZERS*************/
/**********************************************************/
// These singletons initialze the underlying Emscripten
// Module or configure the options for the virtual file
// system (which should both only be done once).
/**********************************************************/
/**********************************************************/
var _Coldbrew_coldbrew_internal_instance = (function() {
  var executed = false;
  var singleton = null;
  return function() {
    if (!executed) {
      executed = true;
      singleton = _Coldbrew_coldbrew_internal_();
    }
    return singleton;
  };
})();

var _Coldbrew_coldbrew_internal_fs_configure = (function() {
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
      if (false) {
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
/**********************************************************/
/************END DEFINE SINGLETON INTIALIZERS**************/
/**********************************************************/

/**********************************************************/
/*********START DEFINE CREATE VARIABLE PROXY***************/
/**********************************************************/
// This function takes what might be returned by Python 
// and converts it into an ES6 proxy object that tries to
// mirror that Python variables and make it look like a 
// native JavaScript variable. If the argument is not a 
// reference to a native Python variable, it is simply
// returned.
/**********************************************************/
function createVariableProxy(obj) {
  if (obj && obj._internal_coldbrew_python_object) {
    if (!/^[A-Za-z0-9_\.]+$/.test(obj.type)) {
      throw new Error("Coldbrew Error: Cannot proxy a Python variable with a type with special characters in type name: "+ obj.type);
    }
    if (!/^[A-Za-z0-9_\.]+$/.test(obj.name)) {
      throw new Error("Coldbrew Error: Cannot proxy a Python variable with a name with special characters in type name: "+obj.name);
    }
    var getVariable = Coldbrew.getVariable;
    var run = Coldbrew.run;
    if (obj.is_async) {
      getVariable = Coldbrew.getVariableAsync;
      run = Coldbrew.runAsync;
    }
    var transformProp = function(prop, reverse=null) {
      if (!(reverse instanceof Array) && Coldbrew._finalizedOptions.transformVariableCasing) {
        if (/^[A-Za-z0-9]+(_[A-Za-z0-9]*)*$/.test(prop)) {
          if (prop === 'to_json') {
            return 'toJSON';
          }
          return prop.replace(/([-_][a-z0-9])/ig, function ($1) {
            return $1.toUpperCase()
              .replace('-', '')
              .replace('_', '');
          });
        } else {
          return prop;
        }
      } else if (Coldbrew._finalizedOptions.transformVariableCasing) {
        var transformedKeys = reverse.map(transformProp);
        var indexOfTransformedProp = transformedKeys.indexOf(prop);
        if (indexOfTransformedProp >= 0) {
          return reverse[indexOfTransformedProp];
        } else {
          return prop;
        }
      } else {
        return prop;
      }
    };
    function getTProp(prop) {
      var keys = Coldbrew.getVariable("('"+obj.uid+"' in Coldbrew._vars and dir(Coldbrew._vars['"+obj.uid+"'])) or []");
      if (typeof keys.then !== 'undefined') {
        return keys.then(function(keys) {
          return transformProp(prop, keys);
        });
      } else {
        return transformProp(prop, keys);
      }
    }
    var $handler = {
        construct: function(target, args) {
          return (getVariable("Coldbrew._call_func(Coldbrew._vars['"+obj.uid+"'],"+args.map(arg => serializeToPython(arg)).join(',')+")"));
        },
        apply: function(target, thisArg, argumentsList) {
          return (getVariable("Coldbrew._call_func(Coldbrew._vars['"+obj.uid+"'].im_func,"+serializeToPython(thisArg)+","+argumentsList.map(arg => serializeToPython(arg)).join(',')+") if hasattr(Coldbrew._vars['"+obj.uid+"'], 'im_func') else Coldbrew._call_func(Coldbrew._vars['"+obj.uid+"'],"+argumentsList.map(arg => serializeToPython(arg)).join(',')+")"));
        },
        get: function(target, prop) {
          if (prop === '_internal_coldbrew_repr') {
            return obj;
          } else if (typeof prop === 'string' && prop.startsWith('_internal_coldbrew')) {
            return undefined;
          } else if (prop === '__raw_promise__') {
            // So it doesn't get confused with a ChainablePromise object
            return undefined;
          } else if (prop === Symbol.iterator) {
            var hasIter = Coldbrew.getVariable("hasattr(Coldbrew._vars['"+obj.uid+"'], '__iter__')");
            if (!isPromise(hasIter)) {
              return (function*() {
                if (hasIter) {
                  var pyiter = Coldbrew.getVariable("iter(Coldbrew._vars['"+obj.uid+"'])");
                  var sentinel = Coldbrew.getVariable("Coldbrew._StopIteration()");
                  while (true) {
                    var nextValue = Coldbrew.runFunction('next', pyiter, sentinel);
                    var done = (typeof nextValue.__type__ !== 'undefined') ? nextValue.__type__ == '_StopIteration' : false;
                    if (done) {
                      pyiter.__destroy__();
                      sentinel.__destroy__();
                      break;
                    }
                    yield nextValue;
                  }
                }
              });
            } else {
              return (async function*() {
                if (await hasIter) {
                  var pyiter = getVariable("iter(Coldbrew._vars['"+obj.uid+"'])");
                  var sentinel = getVariable("Coldbrew._StopIteration()");
                  while (true) {
                    var nextValue = await Coldbrew.runFunction('next', pyiter, sentinel);
                    var done = (typeof nextValue.__type__ !== 'undefined') ? nextValue.__type__ == '_StopIteration' : false;
                    if (done) {
                      await pyiter.__destroy__();
                      await sentinel.__destroy__();
                      break;
                    }
                    yield (nextValue);
                  }
                }
              });
            }          
          } else if (typeof prop === 'symbol') {
            // These are a JavaScript special property that the engine expects to not be defined sometimes, ignore them.
            return undefined;
          } else if (prop === '__proto__') {
            // This is a JavaScript special property that the engine expects to be defined;
            return Reflect.get(target, prop);
          } else if (prop === 'then') {
            // This is a JavaScript special property that the engine expects to not be defined if not a Promise.
            return undefined;
          } else if (prop === 'toJSON') {
            // This is a JavaScript special property that the engine expects to be defined for custom JSON serialization.
            var tprop = getTProp(prop);
            function toJSON(tprop) {
              return getVariable("(getattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+")() if hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+") else Coldbrew.json.dumps(str(Coldbrew._vars['"+obj.uid+"'])))");
            }
            return function() {
              if (!isPromise(tprop)) {
                return toJSON(tprop);
              } else {
                return (tprop.then(function(tprop) {
                  return toJSON(tprop);
                }));
              }
            };
          } else if (prop === 'toString') {
            // This is a JavaScript special property that the engine expects to be defined for custom string serialization.
            var tprop = getTProp(prop);
            function toString(tprop) {
              return getVariable("(getattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+")() if hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+") else str(Coldbrew._vars['"+obj.uid+"']))");
            }
            return function() {
              if (!isPromise(tprop)) {
                return toString(tprop);
              } else {
                return (tprop.then(function(tprop) {
                  return toString(tprop);
                }));
              }
            };
          } else if (prop === '__inspect__') {
            function inspect(res) {
              res = res.map(transformProp); 
              return Coldbrew.PythonVariable.internalKeyDefs.concat(res); 
            }
            return function() {
              var res = Coldbrew.getVariable("dir(Coldbrew._vars['"+obj.uid+"'])");
              if (!isPromise(res)) {
                return inspect(res);
              } else {
                return res.then(function(res) {
                  return inspect(res);
                });
              }
            };
          } else if (prop === '__destroy__') {
            return (function() {
              return Coldbrew.run("try:\n\tdel Coldbrew._vars['"+obj.uid+"']\nexcept KeyError:\n\tpass");
            });
          } else if (prop === '__destroyed__') {
              return Coldbrew.getVariable("'"+obj.uid+"' not in Coldbrew._vars");
          } else if (prop === '__type__') {
            return obj.type;
          } else if (prop === '__uid__') {
            return obj.uid;
          } else {
            var tprop = getTProp(prop);
            function get(tprop) {
              var hasAttrOrItem = Coldbrew.getVariable("hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+") or ((hasattr(Coldbrew._vars['"+obj.uid+"'], '__contains__')) and (hasattr(Coldbrew._vars['"+obj.uid+"'], '__getitem__')) and type(Coldbrew._vars['"+obj.uid+"']) != type and Coldbrew._try(lambda: Coldbrew._unserialize_from_js("+serializeToPython(prop)+") in Coldbrew._vars['"+obj.uid+"']))");
              function _get(hasAttrOrItem) {
                if (hasAttrOrItem) {
                  return getVariable("getattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+") if hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+") else Coldbrew._vars['"+obj.uid+"'][Coldbrew._unserialize_from_js("+serializeToPython(prop)+")]");
                } else {
                  return undefined;
                }
              }
              if (!isPromise(hasAttrOrItem)) {
                return _get(hasAttrOrItem);
              } else {
                return hasAttrOrItem.then(function(hasAttrOrItem) {
                  return _get(hasAttrOrItem);
                });
              }
            }
            if (!isPromise(tprop)) {
              return get(tprop);
            } else {
              return (tprop.then(function(tprop) {
                return get(tprop);
              }));
            }
          }
        },
        set: function(target, prop, value) {
          if (prop === '__proto__') {
            Reflect.set(target, prop, value);
            return value;
          }
          var tprop = getTProp(prop);
          function set(tprop) {
            Coldbrew.run("(setattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+", Coldbrew._unserialize_from_js("+serializeToPython(value)+")) if hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+") else Coldbrew._vars['"+obj.uid+"'].__setitem__(Coldbrew._unserialize_from_js("+serializeToPython(prop)+"), Coldbrew._unserialize_from_js("+serializeToPython(value)+")))");
          }
          if (!isPromise(tprop)) {
            set(tprop);
          } else {
            return tprop.then(function(tprop) {
              set(tprop);
            });
          }
          return value;
        },
        ownKeys: function(target) {
          var reflectRes = [...PythonVariable.internalKeyDefs];
          var res = Coldbrew.getVariable("dir(Coldbrew._vars['"+obj.uid+"'])");
          if (!isPromise(res)) {
            res = res.map(transformProp);
            if (reflectRes.length > 0) {
              return reflectRes.concat(res);
            } else {
              return res;
            }
          } else {
            return reflectRes;
          }
        },
        has: function(target, prop) {
          var tprop = getTProp(prop);
          if (!isPromise(tprop)) {
            return Coldbrew.getVariable("(hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+") or Coldbrew._unserialize_from_js("+serializeToPython(prop)+") in Coldbrew._vars['"+obj.uid+"']) if (hasattr(Coldbrew._vars['"+obj.uid+"'], '__contains__')) and type(Coldbrew._vars['"+obj.uid+"']) != type else hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+")");
          } else {
            throw new Error("Coldbrew Error: Cannot run 'has' operation (or `in` operator) on PythonVariable when using worker mode.");
          }
        },
        deleteProperty: function(target, prop) {
          var tprop = getTProp(prop);
          function deleteProperty(tprop) {
            var hasAttrOrItem = Coldbrew.getVariable("hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+") or ((hasattr(Coldbrew._vars['"+obj.uid+"'], '__contains__')) and (hasattr(Coldbrew._vars['"+obj.uid+"'], '__getitem__')) and type(Coldbrew._vars['"+obj.uid+"']) != type and Coldbrew._try(lambda: Coldbrew._unserialize_from_js("+serializeToPython(prop)+") in Coldbrew._vars['"+obj.uid+"']))");
            function _deleteProperty(hasAttrOrItem) {
              if (hasAttrOrItem) {
                Coldbrew.run("if hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+"):\n\tdelattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+")\nelse:\n\tColdbrew._vars['"+obj.uid+"'].__delitem__(Coldbrew._unserialize_from_js("+serializeToPython(prop)+"))");
              }
            }
            if (!isPromise(hasAttrOrItem)) {
              return _deleteProperty(hasAttrOrItem);
            } else {
              return hasAttrOrItem.then(function(hasAttrOrItem) {
                return _deleteProperty(hasAttrOrItem);
              });
            }
          }
          if (!isPromise(tprop)) {
            deleteProperty(tprop);
          } else {
            return tprop.then(function(tprop) {
              deleteProperty(tprop);
            });
          }
          return true;
        },
    };
    if (obj.constructable) {
      delete $handler.apply;
    } else if (obj.callable) {
      delete $handler.constructable;
    } else {
      delete $handler.constructable;
      delete $handler.apply;
    }
    var varObj = null;
    if (obj.constructable || obj.callable) {
      try {
        eval(`class ${obj.type} extends Coldbrew.PythonVariable {} varObj = ${obj.type};`);
      } catch (e) {
        eval(`class py_${obj.type} extends Coldbrew.PythonVariable {} varObj = py_${obj.type};`);
      }
    } else {
      varObj = new Coldbrew.PythonVariable();
    }

    var $keyDefs = [];
    try {
      $keyDefs = Coldbrew.getVariable("dir(Coldbrew._vars['"+obj.uid+"'])");
    } catch (e) {
      // Ignore concurrency errors, attaching debugging information isn't that important
      if (!e.coldbrewConcurrencyError) {
        throw e;
      }
    }
    
    // This function adds introspection/debugging information that
    // displays when using the browser's console or the Node.js REPL
    // to interactively view the proxy variable.
    function attachDebuggingInformation(varObj, $handler, $keyDefs) {
      $keyDefs = $keyDefs.map(transformProp).concat(Coldbrew.PythonVariable.internalKeyDefs);
      var keyDefPrototype = {};
      if ((!obj.constructable && !obj.callable) || IS_NODE_JS) {
        varObj['__type__'] = $handler.get({}, '__type__');
        keyDefPrototype['__type__'] = $handler.get({}, '__type__');
        $keyDefs.forEach(function(keyDef) {
          if (Coldbrew.PythonVariable.internalKeyDefs.includes(keyDef)) {
            varObj[keyDef] = $handler.get({}, keyDef);
            keyDefPrototype[keyDef] = $handler.get({}, keyDef);
          } else {
            varObj[keyDef] = new PythonDynamicallyEvaluatedValue();
            keyDefPrototype[keyDef] = new PythonDynamicallyEvaluatedValue();
          }
        });
        Object.setPrototypeOf(varObj, keyDefPrototype);
        var proxy = new Proxy(varObj, $handler);
        return proxy;
      } else if (obj.constructable || obj.callable) {
        var $proxy = new Proxy(varObj, $handler);
        var $newProxy = null;
        // Adds introspection/debugging information
        if (obj.constructable) {
          eval(`class ${obj.name} { constructor(...args) { return new $proxy(...args); } } $newProxy = ${obj.name};`);
        } else if (obj.callable) {
          eval(`function ${obj.name}(...args) { return $proxy(...args); } $newProxy = ${obj.name};`);
        }
        $newProxy.__proto__ = {}; // not using Object.setPrototypeOf($newProxy, proxy); as it quashes debugging information in the console
        $keyDefs.concat(Coldbrew.PythonVariable.internalSecretKeyDefs).forEach(function(keyDef) {
          try {
            Object.defineProperty($newProxy.__proto__, keyDef, {
              configurable: false,
              enumerable: true,
              get: $handler.get.bind($handler, {}, keyDef),
              set: $handler.set.bind($handler, {}, keyDef),
            });
          } catch (e) {
          }
        });
        return $newProxy;
      }
    }

    if (typeof $keyDefs.then !== 'undefined') {
      return $keyDefs.then(function($keyDefs) {
        return attachDebuggingInformation(varObj, $handler, $keyDefs);
      }).catch(function(e) {
        // Ignore concurrency errors, attaching debugging information isn't that important
        if (!e.coldbrewConcurrencyError) {
          return Promise.reject(e);
        }
        return attachDebuggingInformation(varObj, $handler, []);
      });
    } else {
      return attachDebuggingInformation(varObj, $handler, $keyDefs);
    }
  } else {
    return obj;
  }
};
/**********************************************************/
/*********END DEFINE CREATE VARIABLE PROXY***************/
/**********************************************************/

/**********************************************************/
/*********START DEFINE COMMUNICATION HELPERS***************/
/**********************************************************/
// Various functions that help communicate between the 
// languages (JavaScript and Python) or between the main
// thread and a worker thread by serializing and
// unserializing data.
/**********************************************************/
function primitize(obj, _export = false, resolvePromises = false) {
  var isPythonVariable = Coldbrew.PythonVariable.isPythonVariable(obj);
  if (isPythonVariable === true) {
    return obj._internal_coldbrew_repr;
  } else if (isPythonVariable !== false) {
    return isPythonVariable.then(function(isPythonVariable) {
      if (isPythonVariable) {
        return obj._internal_coldbrew_repr;
      } else {
        return primitize(obj, _export, resolvePromises);
      }
    });
  } else if (obj && obj._internal_coldbrew_keywords_promise === true) {
    return obj.then(function(obj) {
      return primitize(obj, _export, resolvePromises);
    });
  } else if (obj instanceof _PythonKeywords) {
    return {
      '_internal_coldbrew_keywords': true,
      'keywords': obj.keywords,
    };
  } else if (isPromise(obj) && resolvePromises === true) {
    return obj.then(function(obj) {
      return primitize(obj, false, true);
    });
  } else if (!isSerializable(obj)) {
    if (obj && obj._internal_coldbrew_native_js_worker_proxy && Coldbrew._pending_main_thread_vars.has(obj._internal_coldbrew_get_var_id)) {
      Coldbrew._pending_main_thread_vars.delete(obj._internal_coldbrew_get_var_id)
      delete Coldbrew._main_thread_vars[obj._internal_coldbrew_get_var_id];
    }
    if (_export) {
      var uid = randid();
      Coldbrew._vars[uid] = obj;
      return {
          '_internal_coldbrew_javascript_object': true,
          'uid': uid,
          'constructable': (typeof obj._internal_coldbrew_constructable == 'boolean') ? obj._internal_coldbrew_constructable : (obj instanceof Function && isConstructor(obj)),
          'callable': (typeof obj._internal_coldbrew_callable == 'boolean') ? obj._internal_coldbrew_callable : (obj instanceof Function && !isConstructor(obj)),
          'type': obj._internal_coldbrew_type || ((typeof obj.constructor !== 'undefined') ? toType(obj) : (typeof obj)),
          'name': obj._internal_coldbrew_name || ((typeof obj.name !== 'undefined' ? obj.name : 'JavaScriptUnnamed')),
      };
    } else {
      var uid = randid();
      if (Coldbrew._finalizedOptions.worker && !IS_WORKER_SCRIPT) {
        Coldbrew._main_thread_vars[uid] = obj;
        Coldbrew.worker.postMessage({
          '_internal_coldbrew_message': true, 
          '_get_var': uid,
          'constructable': obj instanceof Function && isConstructor(obj),
          'callable': obj instanceof Function && !isConstructor(obj),
          'type': (typeof obj.constructor !== 'undefined') ? toType(obj) : (typeof obj),
          'name': (typeof obj.name !== 'undefined' ? obj.name : 'JavaScriptUnnamed'),
        });
      } else {
        Coldbrew._main_thread_vars[uid] = obj;
      }
      return {
        '_internal_coldbrew_get_var': true,
        'uid': uid,
      };  
    }
  } else {
    return obj;
  }
}

function serializeToPython(obj, _export = false, resolvePromises = false) {
  obj = primitize(obj, _export, resolvePromises);
  if (typeof obj === 'undefined') {
    obj = null;
  } else if (isPromise(obj)) {
    return obj.then(function(obj) {
      return serializeToPython(obj, _export, resolvePromises);
    });
  }
  if (obj && obj._internal_coldbrew_python_object) {
    return 'Coldbrew.json.loads('+JSON.stringify(stringifyToJson({
      '_internal_coldbrew_var': true,
      'uid': obj.uid,
    }))+')';
  }
  return 'Coldbrew.json.loads('+JSON.stringify(stringifyToJson(obj))+')';
}

function unserializeFromPython(arg) {
  arg = createVariableProxy(arg);
  if (arg && arg._internal_coldbrew_get_js_var === true) {
    return Coldbrew._main_thread_vars[arg['uid']];
  } else if (arg && arg._internal_coldbrew_var === true) {
    return Coldbrew._vars[arg.uid];
  } else if (arg && arg._internal_coldbrew_error) {
    return new Promise(function(resolve, reject) {
      Coldbrew.getExceptionInfo().then(function(exceptionInfo) {
        reject(new Coldbrew.PythonError(exceptionInfo));
      });
    });
  } else {
    return arg;
  }
}

function serializeToJS(obj) {
  if (isSerializable(obj) || typeof obj === 'symbol') {
    return obj;
  } else {
    return primitize(obj, false, true);
  }
}

function unserializeFromJS(arg) {
  if (arg && arg._internal_coldbrew_get_var && Coldbrew._finalizedOptions.worker && IS_WORKER_SCRIPT) {
    return Coldbrew._main_thread_vars[arg.uid];
  } else {
    return unserializeFromPython(arg);
  }
}
/**********************************************************/
/**********END DEFINE COMMUNICATION HELPERS****************/
/**********************************************************/


/**********************************************************/
/************START DEFINE CHAINABLE PROMISE****************/
/**********************************************************/
// This function takes a Promise and returns a 
// "ChainablePromise." When using workers, you might have
// to do something like this normally since every operation
// has to be asynchronous due to the communciation with the 
// worker over postMessage():
// getVariable('os')
//  .then(os => os.getcwd)
//  .then(getcwd => getcwd())
//  .then(res => console.log(res))
//
// When that same original promise is wrapped 
// (and we do this automatically) as a ChainablePromise you 
// can still do what you did above OR you can more 
// succinctly do:
// getVariable('os').getcwd().then(res => console.log(res))
//
// This makes a big difference when you go many levels deep.
/**********************************************************/
function makePromiseChainable(p, attachDebuggingInformation=true, executePromiseImmediately=true) {
  var varObj = null;
  eval(`class ChainablePromise {} varObj = ChainablePromise;`);
  varObj.__real_type__ = 'Chainable Promise Value';
  varObj.__raw_promise__ = p;
  Object.getOwnPropertyNames(Object.getPrototypeOf(p)).filter(function(key) {
    return !['arguments', 'caller', 'callee'].includes(key);
  }).forEach(function(key) {
    varObj[key] = function(){};
  });

  // This attaches introspection/debugging information that
  // displays when using the browser's console or the Node.js REPL
  // after the promise resolves.
  var debugAttached = p;
  if (executePromiseImmediately) {
    debugAttached = p.then(async function(val) {
      if (await PythonVariable.isPythonVariable(val)) {
        varObj['__type__'] = await val.__type__;
        if (attachDebuggingInformation) {
          var keyDefs = [];
          try {
            keyDefs = (await val.__inspect__()).filter(function(keyDef) {
              return !PythonVariable.internalKeyDefs.includes(keyDef);
            });
          } catch (e) {
            // Ignore concurrency errors, attaching debugging information isn't that important
            if (!e.coldbrewConcurrencyError) {
              throw e;
            }
          }
          keyDefs.concat(PythonVariable.internalKeyDefs.filter(function(internalKeyDef) {
            return internalKeyDef !== '__type__';
          })).forEach(async function(keyDef) {
            try {
              if (Coldbrew.PythonVariable.internalKeyDefs.includes(keyDef)) {
                varObj[keyDef] = await val[keyDef];
              } else {
                varObj[keyDef] = new PythonDynamicallyEvaluatedValue();
              }
            } catch (e) {
              // Ignore concurrency errors, attaching debugging information isn't that important
              if (!e.coldbrewConcurrencyError) {
                throw e;
              }
            }
          });
        }
      }
      return val;
    });
  }

  return new Proxy(varObj, {
    construct: function(target, args) {
      return makePromiseChainable(debugAttached.then(async function(val) {
        var serializedArgs = await Promise.all(args.map(function(arg) {
          return serializeToJS(arg);
        }));
        return new val(...serializedArgs);
      }));
    },
    apply: function(target, thisArg, argumentsList) {
      return makePromiseChainable(debugAttached.then(async function(val) {
        var serializedArgs = await Promise.all(argumentsList.map(function(arg) {
          return serializeToJS(arg);
        }));
        return val(...serializedArgs);
      }));
    },
    get: function(target, prop) {
      if (prop == Symbol.toPrimitive || prop === 'valueOf') {
        // Chrome console accesses these, ugh...
        return undefined;
      }
      if (prop === 'toString') {
        // Chrome console accesses this, ugh...
        // Ugly hack to differentiate when Chrome is trying to access toString()
        // vs an actual user.
        var stackHeight = (((new Error()).stack || '').match(/\n/g) || []).length;
        if (stackHeight == 1) {
          // Detected Chrome access
          return function() {
            return 'ChainablePromise - use .then() to access its value or you can chain methods and use .then() at the end.';
          }
        }
      }
      if (Object.getOwnPropertyNames(Object.getPrototypeOf(p)).includes(prop) && prop != 'toString') {
        return Reflect.get(p, prop).bind(p);
      }
      if (prop == '__raw_promise__') {
        return p;
      }
      if (prop === Symbol.asyncIterator) {
        return async function*() {
          var iter = (await debugAttached.then(function(val) {
            return val[Symbol.iterator];
          }))();
          var readNext = await iter.next();
          while (!readNext.done) {
            yield readNext.value;
            readNext = await iter.next();
          }
        };
      }
      return makePromiseChainable(debugAttached.then(async function(val) {
        return val[await serializeToJS(prop)];
      }));
    },
    set: function(target, prop, value) {
      debugAttached.then(async function(val) {
        val[await serializeToJS(prop)] = await serializeToJS(value);
      });
      return value;
    },
    ownKeys: function(target) {
      return Reflect.ownKeys(target);
    },
    has: function(target, prop) {
      return Reflect.has(target, prop);
    },
    deleteProperty: function(target, prop) {
      debugAttached.then(async function(val) {
        delete val[await serializeToJS(prop)];
      });
      return true;
    }
  });
};
/**********************************************************/
/*************END DEFINE CHAINABLE PROMISE*****************/
/**********************************************************/

/**********************************************************/
/***********START DEFINE MAIN COLDBREW API*****************/
/**********************************************************/
// A couple of notable things:
// 1. The _load() function adds a bunch of
//    properties / methods to the Coldbrew
//    when called.
// 2. When worker mode is enabled, the true Coldbrew
//    is initialized in the worker thread. A proxy to it
//    is given to the main thread by the Comlink library,
//    and a reference to it is stored in _workerProxy.
//    Only a couple of methods on Coldbrew in the main
//    thread actually run in the main thread and aren't
//    just proxies to the worker thread.
// 3. The message handling (from the worker thread to 
//    the main thread) is handled in this section. The
//    handler can be found in load(). The worker sends
//    messages to the main thread requesting information
//    about variables in the main thread scope.
/**********************************************************/
Coldbrew.PythonError = PythonError;
Coldbrew.PythonVariable = PythonVariable;
Coldbrew.PythonKeywords = function(keywords) { 
  var pykw = new _PythonKeywords(keywords, Coldbrew._finalizedOptions.worker && !IS_WORKER_SCRIPT);
  var async = Object.keys(pykw.keywords).some(function(key) {
    return isPromise(pykw.keywords[key]);
  });
  if (async) {
    var entries = Object.entries(pykw.keywords);
    var values = entries.map(function(entry) { return entry[1]; });
    var keywordsPromise =  Promise.all(values).then(function(values) {
      var newKeywords = {};
      entries.forEach(function(entry, i) {
        newKeywords[entry[0]] = values[i];
      });
      pykw.keywords = newKeywords;
      return pykw;
    });
    keywordsPromise._internal_coldbrew_keywords_promise = true;
    return keywordsPromise;
  } else {
    return pykw;
  }
};
Coldbrew.pyversion =  "3.8.0";
Coldbrew.version =  "0.0.74";
Coldbrew._slots = {};  // Temporarily stores the JSON serialized version of anything being transferred to JavaScript from Python, before it is returned to the caller.
Coldbrew._promises_resolved_values = {};  // Temporarily stores the resolved values of Promises that need to be resolved before being transferred to Python.
Coldbrew._vars = {}; // Stores references to JavaScript variables, while Python has proxy objects that shim them.
Coldbrew._main_thread_vars = {}; // In the main thread, stores references to main thread JavaScript variables, while the worker thread has proxy objects that shim them. In the worker thread, temporarily holds Proxy objects to main thread JavaScript variables, but later they get moved to _vars.
Coldbrew._isPromise = isPromise;
Coldbrew._convertError = function (e) {
  return {
    '_internal_coldbrew_error': true,
    'type': e.constructor.name,
    'name': e.name,
    'message': e.message,
    'stack': e.stack,
    'data': (typeof e.errorData !== 'undefined') ? e.errorData : null,
  };
};
Coldbrew._try = function(func) {
  try {
    return func();
  } catch (e) {
    return Coldbrew._convertError(e);
  }
};
Coldbrew._callFunc = function(isAsync, constructable, func, ...args) {
  function resultBuilder(isAsync, constructable, func, unserializedArgs) {
    unserializedArgs = unserializedArgs.map(function(arg) {
      if (isAsync && Coldbrew.PythonVariable.isPythonVariable(arg) && typeof arg.__raw_promise__ === 'undefined') {
        return makePromiseChainable(Promise.resolve(arg), false);
      } else {
        return arg;
      }
    });
    if (constructable) {
      return new func(...unserializedArgs);
    } else {
      return func(...unserializedArgs);
    }
  }

  var unserializedArgs = args.map(unserializeFromPython);
  if (Coldbrew._finalizedOptions.worker && !IS_WORKER_SCRIPT) {
    return (async function() {
      unserializedArgs = await Promise.all(unserializedArgs);
      return resultBuilder(true, constructable, func, unserializedArgs);
    })();
  } else {
    return resultBuilder(isAsync, constructable, func, unserializedArgs);
  }
};
Coldbrew._serializeToPython = serializeToPython;
Coldbrew._unserializeFromPython = unserializeFromPython;
Coldbrew._parseUrl = parseUrl;
Coldbrew.loaded = false;
Coldbrew.initialized = false;
Coldbrew.exited = false;
Coldbrew.forwardOut = true;
Coldbrew.forwardErr = true;
Coldbrew._queuedOnReady = [];
Coldbrew.standardInBuffer = 'This is the first line of standard input.\nTo override this, either set `Coldbrew.standardInBuffer` to the full standard input OR set `Coldbrew.onStandardInRead(int size)` to respond interactively to standard input reads OR set `Coldbrew.onStandardInReadAsync(int size)` to respond interactively and asynchronously (by returning a Promise).';
Coldbrew._standardInTell = 0;
Coldbrew._resumeWarn = function(warn=true) { if (warn) { return Coldbrew.run('Coldbrew._warn("The Coldbrew Python interpreter is not currently sleeping. Resuming has no effect.")'); } else return 0; };
Coldbrew.resume = function(...args) { return Coldbrew._resumeWarn(...args); };
Coldbrew._mountFS = function(Module) {};
Coldbrew.preInit = function(Module) {};
Coldbrew.preRun = function(Module) {};
Coldbrew.onStandardOut = function(text) { console.log(text); };
Coldbrew.onStandardErr = function(text) { console.warn(text); };
Coldbrew.onStandardInRead = function(size) { 
  var read = Coldbrew.standardInBuffer.substring(Coldbrew._standardInTell, Coldbrew._standardInTell+size);
  Coldbrew._standardInTell += size;
  return read;
};
Coldbrew.onStandardInReadAsync = function(size) { 
  return Promise.resolve(Coldbrew.onStandardInRead(size));
};
Coldbrew._onRuntimeInitialized = function(Module) {
  Module.callMain();
  var oldLoaded = Coldbrew.loaded;
  Coldbrew.loaded = true;
  if (!oldLoaded) {
    Coldbrew._queuedOnReady.forEach(function(onReady) {
      onReady(null, Coldbrew);
    });
    Coldbrew._queuedOnReady = [];
  }
};
Coldbrew._fsReady = function(cb) {
  // If the user already called configure FS, these "false, false, {}" parameters
  // will get ignored, if the user hasn't, "false, false, {}" will be used, but will
  // have no effect.
  _Coldbrew_coldbrew_internal_fs_configure(false, false, false, false, {}, function(err, mountPoints) {
    Coldbrew._mountFS = function(Module) {
      var prefix = '.filesystem';
      Module.FS.$createFolder(Module.FS.root, prefix, true, true);

      if (IS_NODE_JS) {
        // Load external files
        var pyLibPath = '/usr/local/lib/python'+("3.8.0".split('.').slice(0,2).join('.'));
        var pyLibPathBuggy = '/usr/local/lib/python'+("3.8.0".split('.').slice(0,1).join('.'));
        mountPoints['/files'] = 2;
        Module.FS.$mkdirTree('/usr/local/lib/');
        mountPoints[pyLibPath] = 2;

        // Sync the folders back to their original state before each load
        var fs = require('fs');
        var syncFolders = require("sync-folders");
        syncFolders(__dirname+'/node_root/files', __dirname, {
          onSync: (...args) => {
            resolve();
          }
        });
        fs.renameSync(__dirname+pyLibPath, __dirname+pyLibPathBuggy); // syncFolders has bug where it doesn't support dots in the file name
        syncFolders(__dirname+'/node_root'+pyLibPath, __dirname+'/usr/local/lib/', {
          onSync: (...args) => {
            resolve();
          }
        });
        fs.renameSync(__dirname+pyLibPathBuggy, __dirname+pyLibPath); // syncFolders has bug where it doesn't support dots in the file name
      }

      Object.keys(mountPoints).forEach(function(mountPoint) {
        var fsNamespace = 'coldbrew_fs_';
        var isShared = mountPoints[mountPoint] & 1;
        var isPersist = mountPoints[mountPoint] & 2;
        var filesystem = Module.FS.filesystems.MEMFS;
        var filesystemOptions = {};
        if (!isShared) {
          fsNamespace += 'Coldbrew_';
        }
        var mountSource = '/'+prefix+'/'+fsNamespace+mountPoint.trim().replace(/\//g, '_s_');
        if (isPersist) {
          if (IS_NODE_JS) {
            filesystem = Module.FS.filesystems.NODEFS;
            var fs = require('fs');
            try {
              fs.mkdirSync(__dirname+mountPoint);
            } catch (e) {
              // Already exists
            }
            filesystemOptions.root = __dirname+mountPoint;
          } else {
            filesystem = Module.FS.filesystems.IDBFS;
          }
        }
        try {
          Module.FS.$rmdir(mountPoint+'/web_user');
        } catch (e) {};
        try {
          Module.FS.$rmdir(mountPoint);
        } catch (e) {};
        Module.FS.$createFolder(Module.FS.root, mountSource, true, true);
        var old = filesystem.mount;
        if (mountPoints[mountPoint]) {
          if (!COLDBREW_GLOBAL_SCOPE._coldbrewMountPointNodes) {
            COLDBREW_GLOBAL_SCOPE._coldbrewMountPointNodes = {};
          }
          if (isShared) {
            filesystem.mount = function(...args) { 
              var mountPoint = args[0].mountpoint;
              COLDBREW_GLOBAL_SCOPE._coldbrewMountPointNodes[mountPoint] = COLDBREW_GLOBAL_SCOPE._coldbrewMountPointNodes[mountPoint] || old(...args);
              return COLDBREW_GLOBAL_SCOPE._coldbrewMountPointNodes[mountPoint]; 
            };
          }
          Module.FS.$mount(filesystem, filesystemOptions, mountSource);
        } else if (false) {
          // Handle BrowserFS here
        }
        Module.FS.$symlink(mountSource, mountPoint);
      });
    }
    cb(err, mountPoints);
  });
};
Coldbrew.configureFS = function(options = {}, cb) {
  var defaultOptions = {
    sharedHome: false,
    sharedTmp: false,
    persistHome: false,
    persistTmp: false,
    browserFSOptions: {},
  };
  var finalizedOptions = Object.assign({}, defaultOptions, options);
  _Coldbrew_coldbrew_internal_fs_configure(
    finalizedOptions.sharedHome,
    finalizedOptions.sharedTmp,
    finalizedOptions.persistHome,
    finalizedOptions.persistTmp,
    finalizedOptions.browserFSOptions,
    cb
  );
};
function finalizeMainOptions(options) {
  var defaultOptions = {
    fsOptions: {},
    hideWarnings: false,
    monitorFileUsage: false,
    asyncYieldRate: null,
    worker: false,
    transformVariableCasing: true,
  };
  if (true) {
    defaultOptions.threadWorkers = 1;
    if (false && options.worker) {
      throw new Error("Coldbrew Error: You cannot use worker mode because you built Coldbrew with async functionality disabled.");
    }
    if (options.threadWorkers <= 0) {
      throw new Error("Coldbrew Error: The 'threadWorkers' option must be greater than 0.");
    }
  } else if (options.threadWorkers) {
    throw new Error("Coldbrew Error: You are trying to load with the 'threadWorkers' option when threading is disabled. Please enable threading in the settings file.");
  }
  return Object.assign(options, Object.assign({}, defaultOptions, options));
}
Coldbrew._load = function(arg1, arg2) {
  if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
    throw new Error("Coldbrew Error: You are trying to run this HTML file under a `file://` URL. This is not supported. You must run this file under a HTTP server under a `http://` or `https://` protocol. On most computers, you can do this by opening terminal, navigating to where this HTML file is, and running either `python -m SimpleHTTPServer` for Python 2 or `python3 -m http.server` for Python 3. Then, you can navigate to `http://localhost:8000` in a web browser to see this file. Alternatively, if you have downloaded the Coldbrew source code, you can just run `./serve.sh` from the project root and navigate to `http://localhost:8000` in a web browser to see this file after building.");
  } 
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
  var finalizedOptions = finalizeMainOptions(options);
  Coldbrew._finalizedOptions = finalizedOptions;
  if (finalizedOptions.fsOptions) {
    Coldbrew.configureFS(finalizedOptions.fsOptions);
  }
  Coldbrew._fsReady(function(err, mountPoints) {
    if (IS_WORKER_SCRIPT) {
      Coldbrew._pending_main_thread_vars = new Set();
      Coldbrew._getMainVariableResponsePromises = {}
      Coldbrew._getMainVariable = function(varName) {
        var uid = randid();
        postMessage({'_internal_coldbrew_message': true, '_get_main_var': varName, 'uid': uid});
        return new Promise(function(resolve, reject) {
          Coldbrew._getMainVariableResponsePromises[uid] = resolve;
        });
      };
      Coldbrew._runMain = function(expression) {
        postMessage({'_internal_coldbrew_message': true, '_run_main': expression});
      };
    }
    Coldbrew._usedFiles = new Set();
    Coldbrew._textDecoder = (typeof TextDecoder !== 'undefined') ? new TextDecoder("utf-8") : new module4.exports.TextDecoder("utf-8");
    Coldbrew.mountPoints = mountPoints;
    COLDBREW_TOP_SCOPE.PTHREAD_POOL_SIZE = finalizedOptions.threadWorkers;
    Coldbrew.Module = _Coldbrew_coldbrew_internal_instance();
    Object.getOwnPropertyNames(Coldbrew.Module.FS).forEach(function(propertyName) {
      if (typeof Coldbrew.Module.FS[propertyName] === 'function') {
        var oldFSFunction = Coldbrew.Module.FS[propertyName].bind(Coldbrew.Module.FS);
        (function(oldFSFunction) {
          Coldbrew.Module.FS['$'+propertyName] = function(...args) {
            try {
              return oldFSFunction.apply(null, args);
            } catch (e) {
              delete e.setErrno;
              throw e;
            }
          };
        })(oldFSFunction);
      }
    });
    Coldbrew._getAsyncYieldRate = Coldbrew.Module.cwrap('export_getAsyncYieldRate', 'number', []);
    Coldbrew.getAsyncYieldRate = function() {
      var asyncYieldRate = Coldbrew._getAsyncYieldRate();
      if (asyncYieldRate >= 2147483647) {
        return Infinity;
      } else {
        return asyncYieldRate;
      }
    };
    Coldbrew._setAsyncYieldRate = Coldbrew.Module.cwrap('export_setAsyncYieldRate', null, ['number']);
    Coldbrew.setAsyncYieldRate = function(rate) {
      if (Coldbrew._finalizedOptions.worker) {
        Coldbrew.run('Coldbrew._warn("Ignoring manually setting the async yield rate. When workers mode is enabled, we automatically set the yield rate to infinity for you to improve performance. =)")');
        return null;
      }
      if (rate >= 2147483647) {
        rate = 2147483647;
      }
      return Coldbrew._setAsyncYieldRate(rate);
    };
    Coldbrew._run = Coldbrew.Module.cwrap('export_run', 'number', ['string']);
    Coldbrew.run = function(script) {
      var ret = Coldbrew._run(script);
      if (ret === -1 && Coldbrew.initialized) {
        if (!IS_WORKER_SCRIPT) {
          throw new Coldbrew.PythonError(Coldbrew.getExceptionInfo());
        } else {
          ret = {'_internal_coldbrew_error': true};
        }
      } else if (ret === -2) {
        throw getColdbrewConcurrencyError();
      }
      return ret;
    };
    if (!false) {
      Coldbrew._runAsync = Coldbrew.Module.cwrap('export_runAsync', 'number', ['string'], {
        async: true,
      });
      Coldbrew.runAsync = function(script) {
        var retp = Coldbrew._runAsync(script);
        return retp.then(function(ret) {
          if (ret === -1 && Coldbrew.initialized) {
            if (!IS_WORKER_SCRIPT) {
              return Promise.reject(new Coldbrew.PythonError(Coldbrew.getExceptionInfo()));
            } else {
              return Promise.resolve({'_internal_coldbrew_error': true}); 
            }
          } else if (ret === -2) {
            return Promise.reject(getColdbrewConcurrencyError());
          } else {
            return Promise.resolve(ret);
          }
        }).then(defer); 
      };
    }
    Coldbrew._runFile = Coldbrew.Module.cwrap('export__runFile', 'number', ['string']);
    if (!false) {
      Coldbrew._runFileAsync = Coldbrew.Module.cwrap('export__runFileAsync', 'number', ['string'], {
        async: true,
      });
    }
    Coldbrew.getVariable = function(expression, allowProxy = !finalizedOptions.worker) {
      var uid = randid();
      Coldbrew.run('Coldbrew._run(Coldbrew.module_name_var+"._slots.'+uid+' = "+Coldbrew.json.dumps(Coldbrew._serialize_to_js('+expression+')))');
      var ret = (typeof Coldbrew._slots[uid] !== 'undefined') ? JSON.parse(Coldbrew._slots[uid]) : null;
      delete Coldbrew._slots[uid];
      if (allowProxy) {
        return unserializeFromPython(ret);
      } else {
        return ret;
      }
    };
    if (!false) {
      Coldbrew.getVariableAsync = function(expression, allowProxy = !finalizedOptions.worker) {
        var uid = randid();
        return makePromiseChainable(Coldbrew.runAsync('Coldbrew._run(Coldbrew.module_name_var+"._slots.'+uid+' = "+Coldbrew.json.dumps(Coldbrew._serialize_to_js('+expression+')))').then(function() {
          var ret = (typeof Coldbrew._slots[uid] !== 'undefined') ? JSON.parse(Coldbrew._slots[uid]) : null;
          delete Coldbrew._slots[uid];
          if (allowProxy) {
            return unserializeFromPython(ret);
          } else {
            return ret;
          }
        }), !IS_WORKER_SCRIPT, !IS_WORKER_SCRIPT);
      };
    }
    Coldbrew.destroyAllVariables = function() {
      return Coldbrew.run("for uid in list(Coldbrew._vars):\n\ttry:\n\t\tdel Coldbrew._vars[uid]\n\texcept KeyError:\n\t\tpass");
    };
    Coldbrew.getExceptionInfo = function() {
      return Coldbrew.getVariable('Coldbrew._exception');
    };
    Coldbrew.runFunction = function(functionExpression, ...args) {
      return Coldbrew.getVariable('Coldbrew._call_func('+functionExpression+','+args.map(arg => serializeToPython(arg)).join(',')+')');
    };
    if (!false) {
      Coldbrew.runFunctionAsync = function(functionExpression, ...args) {
        return Coldbrew.getVariableAsync('Coldbrew._call_func('+functionExpression+','+args.map(arg => serializeToPython(arg)).join(',')+')');
      };
    }
    Coldbrew.getenv = function() { 
      return Coldbrew.getVariable('{k:v for k,v in Coldbrew.os.environ.items()}') 
    };
    Coldbrew.setenv = function(envVar, val) {
      return Coldbrew.runFunction('Coldbrew.os.environ.__setitem__', envVar, val);
    };
    Coldbrew.unsetenv = function(envVar, val) {
      return Coldbrew.runFunction('(lambda x: Coldbrew._try(lambda: Coldbrew.os.environ.__delitem__(x)))', envVar);
    };
    Coldbrew.getcwd = Coldbrew.runFunction.bind(Coldbrew, 'Coldbrew._getcwd');
    Coldbrew._chdir = Coldbrew.Module.cwrap('export_chdir', 'number', ['string']);
    Coldbrew.chdir = function(path) {
      var ret = Coldbrew._chdir(path);
      if (ret === -2) {
        throw getColdbrewConcurrencyError();
      }
      return;
    };
    Coldbrew.listFiles = function(path='/') {
      return Coldbrew.Module.FS.$readdir(path)
        .filter(function(file) {
          return file !== '.' && file !== '..';
        })
        .map(function (file) {
          var analyzed = Coldbrew.Module.FS.$analyzePath(path+'/'+file);
          return {
            name: file,
            isFolder: analyzed.object.isFolder,
            isFile: !analyzed.object.isFolder,
            mode: analyzed.object.mode,
            timestamp: analyzed.object.timestamp,
          }
        });
    };
    Coldbrew.createFolder = function(path) {
      return Coldbrew.Module.FS.$mkdirTree(path);
    };
    Coldbrew.addFile = function(path, data) {
      if (path.indexOf('/') >= 0) {
        Coldbrew.Module.FS.$mkdirTree(path.split('/').slice(0,-1).join("/"));
      }
      Coldbrew.Module.FS.$writeFile(path, data);
    };
    if (true) {
      var JSZip;
      if ((!COLDBREW_GLOBAL_SCOPE || typeof COLDBREW_GLOBAL_SCOPE.JSZip === 'undefined')) {
        JSZip = module3.exports;
      } else {
        JSZip = COLDBREW_GLOBAL_SCOPE.JSZip;
      }
      Coldbrew.addFilesFromZip = function(path, urlToZip) {
        return new Promise(function (resolve, reject) {
          Coldbrew._sendRequest('GET', urlToZip, null, {}, null, true)
          .then(function(data) {
            resolve(data.responseText);
          })
          .catch(function(e) {
            reject(e);
          });
        })
        .then(JSZip.loadAsync)
        .then(function(zip) {
          return Promise.all(Object.keys(zip.files).map(function(file) {
            if (!zip.files[file].dir) {
              return zip.files[file].async("string").then(function(textData) {
                Coldbrew.addFile(path+'/'+file, textData);
              });
            } else {
              return Coldbrew.createFolder(path+'/'+file);
            }
          }));
        });
      };
      Coldbrew.downloadPathToZip = function(path, downloadName='download.zip') {
        var zip = new JSZip();
        var zipHelper = function(path, basePath) {
          if (Coldbrew.Module.FS.$analyzePath(path).object 
            && Coldbrew.Module.FS.$analyzePath(path).object.isFolder) {
            var fileList = Coldbrew.listFiles(path);
            if (fileList.length > 0) {
              fileList.forEach(function (file) {
                if (path !== '/' || !['dev', 'proc', '.filesystem', '.slots'].includes(file.name)) {
                  var newPath = path+'/'+file.name;
                  var zippedPath = newPath;
                  if (zippedPath.startsWith(basePath)) {
                    zippedPath = zippedPath.replace(basePath, '');
                  }
                  if (file.isFolder) {
                    zip.folder(zippedPath);
                  }
                  zipHelper(newPath, basePath);
                }
              });
            }
          } else {
            var zippedPath = path;
            if (zippedPath.startsWith(basePath)) {
              zippedPath = zippedPath.replace(basePath, '');
            }
            zip.file(zippedPath, Coldbrew.readBinaryFile(path));
          }
        };
        path = path.replace(/\/+/g, '/');
        if (path.length > 1 && path.slice(-1) === '/') {
          path = path.slice(0, -1);
        }
        var basePath = path + '/';
        if (Coldbrew.pathExists(path) && Coldbrew.pathExists(path).isFile) {
          basePath = path.split('/').slice(0, -1).join('/') + '/';
        }
        zipHelper(path, basePath);
        return zip.generateAsync({type: IS_NODE_JS ? "arraybuffer" : "blob"}).then(function (blob) {
          if (IS_NODE_JS) {
            var fs = require('fs');
            fs.writeFileSync(downloadName, Buffer.from(blob));
          } else if (IS_WORKER_SCRIPT) {
            var objectUrl = URL.createObjectURL(blob, {type: 'application/zip'});
            postMessage({
              '_internal_coldbrew_message': true,
              'download_url': objectUrl,
              'download_name': downloadName,
            });
          } else {
            var objectUrl = URL.createObjectURL(blob, {type: 'application/zip'});
            var aElement = document.createElement("a");
            aElement.href = objectUrl;
            aElement.download = downloadName;
            aElement.click();
          }
        });
      };
    }
    Coldbrew.readFile = function(path) {
      return Coldbrew._textDecoder.decode(Coldbrew.Module.FS.$readFile(path));
    };
    Coldbrew.readBinaryFile = function(path) {
      return Coldbrew.Module.FS.$readFile(path);
    };
    Coldbrew.pathExists = function(path) {
      var analyzed = Coldbrew.Module.FS.$analyzePath(path);
      var exists = analyzed.exists;
      if (!exists) {
        return null;
      } else {
        return {
            isFolder: analyzed.object.isFolder,
            isFile: !analyzed.object.isFolder,
            mode: analyzed.object.mode,
            timestamp: analyzed.object.timestamp,
        };
      }
    };
    Coldbrew.deletePath = function(path) {
      var deleteHelper = function(path) {
        if (Coldbrew.Module.FS.$analyzePath(path).object 
          && Coldbrew.Module.FS.$analyzePath(path).object.isFolder) {
          var fileList = Coldbrew.listFiles(path);
          if (fileList.length > 0) {
            fileList.forEach(function (file) {
              deleteHelper(path+'/'+file.name);
            });
          }
          Coldbrew.Module.FS.$rmdir(path);
        } else {
          Coldbrew.Module.FS.$unlink(path);
        }
      };
      if (path.length > 0 && path.slice(-1) === '/') {
        path = path.slice(0, -1);
      }
      deleteHelper(path);
      return true;
    };
    Coldbrew.saveFiles = function() {
      if (IS_NODE_JS) {
        Coldbrew.run('Coldbrew._warn("No need to use saveFiles() when using Node.js, files are persisted automatically.")');
        return Promise.resolve(true);
      }
      var isPersistable = Object.keys(mountPoints).map(function(mountPoint) {
        var isPersist = mountPoints[mountPoint] & 2;
        return !!isPersist;
      }).includes(true);
      return new Promise(function (resolve, reject) {
        if (isPersistable) {
          return Coldbrew.Module.FS.$syncfs(0, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
          });
        } else {
          reject(new Error("Coldbrew Error: The file system was not configured to persist any paths."));
        }
      });
    };
    Coldbrew.loadFiles = function() {
      if (IS_NODE_JS) {
        Coldbrew.run('Coldbrew._warn("No need to use loadFiles() when using Node.js, persisted files are loaded automatically.")');
        return Promise.resolve(true);
      }
      var isPersistable = Object.keys(mountPoints).map(function(mountPoint) {
        var isPersist = mountPoints[mountPoint] & 2;
        return !!isPersist;
      }).includes(true);
      return new Promise(function (resolve, reject) {
        if (isPersistable) {
          return Coldbrew.Module.FS.$syncfs(1, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
          });
        } else {
          reject(new Error("Coldbrew Error: The file system was not configured to persist any paths."));
        }
      });
    };
    Coldbrew.runFile = function(path, options={}) {
      var oldcwd = Coldbrew.getcwd();
      var defaultOptions = {
        cwd: null,
        args: [],
        env: {},
      };
      var finalizedOptions = Object.assign({}, defaultOptions, options);
      if (finalizedOptions.cwd) {
        Coldbrew.chdir(finalizedOptions.cwd);
      }
      Coldbrew.run('Coldbrew._clear_argv()');
      Coldbrew.runFunction('Coldbrew._append_argv', path);
      finalizedOptions.args.forEach(function(arg) {
        Coldbrew.runFunction('Coldbrew._append_argv', arg);
      });
      Object.keys(finalizedOptions.env).forEach(function(key) {
        Coldbrew.setenv(key, finalizedOptions.env[key]);
      });
      var ret = Coldbrew._runFile(path);
      if (ret === -2) {
        throw getColdbrewConcurrencyError();
      }
      Coldbrew.chdir(oldcwd);
      return ret;
    };
    if (!false) {
      Coldbrew.runFileAsync = function(path, options={}) {
        var oldcwd = Coldbrew.getcwd();
        var defaultOptions = {
          cwd: null,
          args: [],
          env: {},
        };
        var finalizedOptions = Object.assign({}, defaultOptions, options);
        if (finalizedOptions.cwd) {
          Coldbrew.chdir(finalizedOptions.cwd);
        }
        Coldbrew.run('Coldbrew._clear_argv()');
        Coldbrew.runFunction('Coldbrew._append_argv', path);
        finalizedOptions.args.forEach(function(arg) {
          Coldbrew.runFunction('Coldbrew._append_argv', arg);
        });
        Object.keys(finalizedOptions.env).forEach(function(key) {
          Coldbrew.setenv(key, finalizedOptions.env[key]);
        });
        var retp = Coldbrew._runFileAsync(path);
        return retp.then(function(ret) {
          if (ret === -2) {
            throw getColdbrewConcurrencyError();
          }
          Coldbrew.chdir(oldcwd);
          return ret;
        }).then(defer);
      };
    }
    Coldbrew.resetenv = function() {
      Object.keys(Coldbrew.getenv()).forEach(function(key) {
        if (typeof Coldbrew._ORIGINAL_ENV_[key] !== 'undefined') {
          Coldbrew.setenv(key, Coldbrew._ORIGINAL_ENV_[key]);
        } else {
          Coldbrew.unsetenv(key);
        }
      });
    };
    Coldbrew._initializer = function() {
      Coldbrew.run('Coldbrew._finalized_options = '+serializeToPython(finalizedOptions));
      if (finalizedOptions.worker) {
        Coldbrew._setAsyncYieldRate(2147483647);
      }
      if (finalizedOptions.asyncYieldRate !== null && typeof finalizedOptions.asyncYieldRate !== 'undefined') {
        Coldbrew.setAsyncYieldRate(finalizedOptions.asyncYieldRate);
      }
      var res = Coldbrew.run('Coldbrew._clear_argv()');
      res = res + Coldbrew.runFunction('Coldbrew._append_argv', 'coldbrew.py');
      Coldbrew._ORIGINAL_ENV_ = Coldbrew.getenv();
      if (res === 0) {
        Coldbrew.initialized = true;
        if (!finalizedOptions.hideWarnings) {
          console.warn('Initialized Coldbrew Python Environment.');
        }
      } else {
        throw new Error('Failed to initialize Coldbrew Python Environment.');
      }
    };
    Coldbrew._reset = Coldbrew.Module.cwrap('export_reset', null, []);
    Coldbrew.reset = function() {
      Coldbrew._standardInTell = 0;
      var ret = Coldbrew._reset();
      if (ret === -2) {
        throw getColdbrewConcurrencyError();
      }
      Coldbrew._initializer();
      return ret;
    };
    if (finalizedOptions.monitorFileUsage) {
      console.warn('Coldbrew is monitoring file usage...use `Coldbrew.getUsedFiles()` after running through all relevant code paths in your Python program.');
      var _oldOpen = Coldbrew.Module.FS.$open.bind(Coldbrew.Module.FS);
      Coldbrew.Module.FS.open = function(...args) {
        if (args[0].startsWith && args[0].startsWith('/usr/local/lib/python')) {
          Coldbrew._usedFiles.add(args[0]);
        }
        return _oldOpen(...args)
      };
    }
    Coldbrew.getUsedFiles = function() {
      return Array.from(Coldbrew._usedFiles).join('\n');
    };
    Coldbrew.getUnusedModules = function() {
      // Python doesn't boot without required modules
      var requiredModules = ["gc", "imp", "faulthandler", "_tracemalloc",  "_signal"];
      var usedModules = Coldbrew.runFunction('Coldbrew._get_imported_modules').concat(requiredModules);
      var allModules = "_struct _locale faulthandler _abc _sha256 _imp fcntl _ast array _operator _codecs errno time _sqlite3 itertools atexit _random _sha3 _sha1 _md5 _sha512 pwd _json _datetime _sre cmath _weakref _bisect _symtable _functools _coldbrew_stubs math _signal _stat _tracemalloc gc _io unicodedata binascii xxsubtype _thread posix mmap _blake2 _collections _string zlib".split(" ");
      return JSON.stringify(allModules.filter(function(module) {
        return !usedModules.includes(module);
      }));
    };
    if (!Coldbrew.loaded) {
      Coldbrew.onReady(function() {
        Coldbrew._initializer();
      });
    }
    Coldbrew.onReady(onReadyFunc);
  });
};
Coldbrew.unload = function(arg1, arg2) {
  if (Coldbrew.loaded) {
    Coldbrew.run('pass');
    Object.getOwnPropertyNames(Coldbrew).forEach(function (prop) {
      delete Coldbrew[prop];
    });
    var oldModule = null;
    if (IS_NODE_JS) {
      oldModule = module;
      module = {exports: {}};
    }
    COLDBREW_TOP_SCOPE.Worker.terminateAllWorkers(true);
    COLDBREW_TOP_SCOPE_FUNC(false, Coldbrew);
    if (IS_NODE_JS) {
      module = oldModule;
    }
  }
};
Coldbrew.load = function(options = {}) {
  var finalizedOptions = finalizeMainOptions(options);
  if (options.worker && !IS_WORKER_SCRIPT && !Coldbrew.loaded) {
    Coldbrew._finalizedOptions = finalizedOptions;
    var worker = new COLDBREW_TOP_SCOPE.Worker(SCRIPT_SOURCE);
    var Coldbrew_proxy = getComlink().proxy(worker);
    Coldbrew.worker = worker;
    Coldbrew._workerProxy = Coldbrew_proxy;
    return new Promise(function (resolve, reject) {
      worker.addEventListener("message", function workerReadyHandler(event) {
        if (event.data._internal_coldbrew_message && event.data.ready) {
          // Worker is ready, load Coldbrew in the worker
          Coldbrew._workerProxy.load(options);
        } else if (event.data._internal_coldbrew_message && event.data.download_url) {
          var aElement = document.createElement("a");
          aElement.href = event.data.download_url;
          aElement.download = event.data.download_name;
          aElement.click();
        } else if (event.data._internal_coldbrew_message && event.data.props) {
          // Assign the proxied properties of the worker module to the main module
          Object.keys(event.data.props).forEach(function (prop) {
            if (!['unload', '_parseUrl', 'createNewInstance', 'PythonVariable', 'PythonError', 'PythonKeywords', '_getMainVariable', '_callFunc', '_try', '_convertError', 'onStandardInRead', 'onStandardInReadAsync'].includes(prop) && event.data.props[prop] === 'function') {
              Coldbrew[prop] = function(...args) {
                var serializedArgs = args.map(function(arg) {
                  return serializeToJS(arg);
                });
                var result = Promise.all(serializedArgs)
                  .then(function(serializedArgs) {
                    var retp = Coldbrew_proxy[prop](...serializedArgs);
                    return retp.then(function(ret) {
                      return unserializeFromPython(ret);
                    });
                  });
                if (['getVariable', 'getVariableAsync', 'runFunction', 'runFunctionAsync'].includes(prop)) {
                  return makePromiseChainable(result, false, false);
                } else {
                  return result;
                }
              };
            }
            if (['forwardOut', 'forwardErr'].includes(prop) && 
                  (
                    event.data.props[prop] === 'number' ||
                    event.data.props[prop] === 'string' ||
                    event.data.props[prop] === 'boolean'
                  )
            ) {
              Object.defineProperty(Coldbrew, prop, {
                get: Coldbrew_proxy[prop],
                set: function(val) {
                  return Coldbrew_proxy[prop](prop, val);
                }
              });
            }
          });
          Coldbrew.Module = null;
          Coldbrew.loaded = true;
          Coldbrew.run = Coldbrew.runAsync;
          Coldbrew.runFunction = Coldbrew.runFunctionAsync;
          Coldbrew.runFile = Coldbrew.runFileAsync;
          Coldbrew.getVariable = Coldbrew.getVariableAsync;
          // Done loading Coldbrew with worker option
          resolve();
        } else if (event.data._internal_coldbrew_message && event.data._get_var_action) {
          (async function() {
            var value = null;
            var getvar = Coldbrew._main_thread_vars[event.data.uid];
            if (event.data._get_var_action === 'construct') {
              value = new getvar(...(await Promise.all(event.data.args.map(unserializeFromJS)))); 
            } else if (event.data._get_var_action === 'apply') {
              value = getvar(...(await Promise.all(event.data.argumentsList.map(unserializeFromJS)))); 
            } else if (event.data._get_var_action === 'has') {
              value = Reflect.has(getvar, await unserializeFromJS(event.data.prop)); 
            } else if (event.data._get_var_action === 'ownKeys') {
              value = Object.getOwnPropertyNames(getvar).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(getvar))); 
            } else if (event.data._get_var_action === 'isPromise') {
              value = isPromise(getvar); 
            } else if (event.data._get_var_action === 'destroy') {
              delete Coldbrew._main_thread_vars[event.data.uid];
              value = true; 
            } else if (event.data._get_var_action === 'typeofProp') {
              value = typeof (await Reflect.get(getvar, await unserializeFromJS(event.data.prop)));
            } else if (event.data._get_var_action === 'hasProp') {
              value = (await unserializeFromJS(event.data.prop)) in getvar;
            } else if (event.data._get_var_action === 'iterator') {
              value = await Reflect.get(getvar, await unserializeFromJS(Symbol.iterator));
              if (typeof value === "function") {
                value = value.bind(getvar);
              }
            } else if (event.data._get_var_action === 'get') {
              value = await Reflect.get(getvar, await unserializeFromJS(event.data.prop));
              if (typeof value === "function") {
                value = value.bind(getvar);
              }
            } else if (event.data._get_var_action === 'set') {
              var unserializedValue = await unserializeFromJS(event.data.value);
              Reflect.set(getvar, await unserializeFromJS(event.data.prop), unserializedValue);
              value = unserializedValue; 
            } else if (event.data._get_var_action === 'deleteProperty') {
              Reflect.deleteProperty(getvar, await unserializeFromJS(event.data.prop));
              value = true; 
            }
            Coldbrew.worker.postMessage({
              '_internal_coldbrew_message': true,
              '_get_var_action_response': true,
              'actionId': event.data.actionId,
              'value': await serializeToJS(value)
            });
          })();
        } else if (event.data._internal_coldbrew_message && event.data._run_main) {
          eval(event.data._run_main);
        } else if (event.data._internal_coldbrew_message && event.data._get_main_var) {
          (async function () {
            var obj = await eval(event.data._get_main_var);
            var isPythonVariable = false;
            var serializable = isSerializable(obj);
            if (obj && await obj._internal_coldbrew_repr) {
              // Checking for the '_internal_coldbrew_repr' hackily
              // tells us if it is a PythonVariable. We should 
              // theoretically be using 
              // Coldbrew.PythonVariable.isPythonVariable(),
              // but since that method calls back into Python we
              // cannot use it here.
              isPythonVariable = true;
              obj = {
                '_internal_coldbrew_var': true,
                'uid': await obj.__uid__,
              };
            }
            Coldbrew._main_thread_vars[event.data.uid] = obj;
            Coldbrew.worker.postMessage({
              '_internal_coldbrew_message': true, 
              '_get_var': event.data.uid,
              'constructable': obj instanceof Function && isConstructor(obj),
              'callable': obj instanceof Function && !isConstructor(obj),
              'type': (obj && typeof obj.constructor !== 'undefined') ? toType(obj) : (typeof obj),
              'name': (obj && typeof obj.name !== 'undefined' ? obj.name : 'JavaScriptUnnamed'),
              '_internal_coldbrew_var': (isPythonVariable) ? obj : undefined,
              'serializable': serializable,
              'serializable_obj': (serializable) ? obj : undefined,
            });
          })();
        }
      });
    });
  } else {
    return new Promise(function (resolve, reject) {
      Coldbrew._load(options, function() {
        // Notify parent of what properties were loaded in, so they can be proxied
        if (IS_WORKER_SCRIPT) {
          postMessage({
            '_internal_coldbrew_message': true, 
            'props': Object.getOwnPropertyNames(Coldbrew).reduce(function(props, prop) {
              props[prop] = typeof Coldbrew[prop];
              return props;
            }, {})
          });
        }
        resolve();
      });
    });
  }
};
Coldbrew.createNewInstance = function() {
  return COLDBREW_TOP_SCOPE_FUNC(false);
};
Coldbrew.onReady = function(onReadyFunc) {
  if (onReadyFunc) {
    if (Coldbrew.loaded) {
      onReadyFunc(null, Coldbrew);
    } else {
      Coldbrew._queuedOnReady.push(onReadyFunc);
    }
  }
};
Coldbrew._sendRequest = sendRequest;
/**********************************************************/
/************END DEFINE MAIN COLDBREW API******************/
/**********************************************************/

/**********************************************************/
/************START WORKER SPECIFIC ROUTINE*****************/
/**********************************************************/
// Does 3 things:
// 1. Informs the main thread when it is ready.
// 2. Exposes the Coldbrew variable using Comlink.
// 3. Creates a ES6 Proxy Variable in the worker thread that 
//    behaves like native JavaScript variable that models
//    native JavaScript variables on the main thread that
//    might need to be passed to Python.
/**********************************************************/
if (IS_WORKER_SCRIPT) {
  // Deferring to the next tick here since Comlink is defined later
  setTimeout(function() {
    if (IS_NODE_JS) {
      require('node-comlink').patchMessageChannel();
      const NodeMessageAdapter = require('node-comlink').NodeMessageAdapter;
      const messageAdapter = new NodeMessageAdapter();
      COLDBREW_GLOBAL_SCOPE.postMessage = messageAdapter.postMessage.bind(messageAdapter);
      COLDBREW_GLOBAL_SCOPE.addEventListener = messageAdapter.addEventListener.bind(messageAdapter);
      getComlink().expose(Coldbrew, messageAdapter);
    } else {
      getComlink().expose(Coldbrew, self);
    }
    var responsePromises = {};
    addEventListener("message", function GetVarHandler(event) {
      if (event.data._internal_coldbrew_message && event.data._get_var_action_response) {
        var resolve = responsePromises[event.data.actionId];
        delete responsePromises[event.data.actionId];
        resolve(unserializeFromJS(event.data.value));
      } else if (event.data._internal_coldbrew_message && event.data._get_var) {
        Coldbrew._pending_main_thread_vars.add(event.data._get_var);
        Coldbrew._main_thread_vars[event.data._get_var] = new Proxy(function() {}, {
          construct: function(...args) {
            return (async function(target, args) {
              var actionId = randid();
              postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'construct', 'uid': event.data._get_var, 'actionId': actionId, 'args': await Promise.all(args.map(serializeToJS))});
              return new Promise(function (resolve, reject) {
                responsePromises[actionId] = resolve;
              });              
            }).apply(null, args);
          },
          apply: function(...args) {
            return (async function(target, thisArg, argumentsList) {
              if (typeof argumentsList === 'undefined') {
                argumentsList = [];
              }
              var actionId = randid();
              postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'apply', 'uid': event.data._get_var, 'actionId': actionId, 'argumentsList': await Promise.all(argumentsList.map(serializeToJS))});
              return new Promise(function (resolve, reject) {
                responsePromises[actionId] = resolve;
              });
            }).apply(null, args);
          },
          get: function(target, prop) {
            if (prop == Symbol.toPrimitive || prop === 'valueOf' || prop === 'then') {
              // Chrome console accesses these, ugh...
              return undefined;
            }
            if (prop === '_internal_coldbrew_native_js_worker_proxy') {
              return true;
            } else if (prop === '_internal_coldbrew_get_var_id') {
              return event.data._get_var;
            } else if (prop === '_internal_coldbrew_constructable') {
              return event.data.constructable;
            } else if (prop === '_internal_coldbrew_callable') {
              return event.data.callable;
            } else if (prop === '_internal_coldbrew_name') {
              return event.data.name;
            } else if (prop === '_internal_coldbrew_type') {
              return event.data.type;
            } else if (prop === '_internal_coldbrew_has') {
              return async function(prop) {
                var actionId = randid();
                postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'has', 'uid': event.data._get_var, 'actionId': actionId, 'prop': await serializeToJS(prop)});
                return new Promise(function (resolve, reject) {
                  responsePromises[actionId] = resolve;
                });
              };
            } else if (prop === '_internal_coldbrew_own_keys') {
              return function() {
                var actionId = randid();
                postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'ownKeys', 'uid': event.data._get_var, 'actionId': actionId});
                return new Promise(function (resolve, reject) {
                  responsePromises[actionId] = resolve;
                });
              };
            } else if (prop === '_internal_coldbrew_is_promise') {
              return function() {
                var actionId = randid();
                postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'isPromise', 'uid': event.data._get_var, 'actionId': actionId});
                return new Promise(function (resolve, reject) {
                  responsePromises[actionId] = resolve;
                });
              };
            } else if (prop === '_internal_coldbrew_destroy') {
              return function() {
                var actionId = randid();
                postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'destroy', 'uid': event.data._get_var, 'actionId': actionId});
                return new Promise(function (resolve, reject) {
                  responsePromises[actionId] = resolve;
                });
              };
            } else if (prop === '_internal_coldbrew_typeof_prop') {
              return async function(prop) {
                var actionId = randid();
                postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'typeofProp', 'uid': event.data._get_var, 'actionId': actionId, 'prop': await serializeToJS(prop)});
                return new Promise(function (resolve, reject) {
                  responsePromises[actionId] = resolve;
                });
              };
            } else if (prop === '_internal_coldbrew_has_prop') {
              return async function(prop) {
                var actionId = randid();
                postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'hasProp', 'uid': event.data._get_var, 'actionId': actionId, 'prop': await serializeToJS(prop)});
                return new Promise(function (resolve, reject) {
                  responsePromises[actionId] = resolve;
                });
              };
            } else if (prop === Symbol.iterator) {
              return (async function() {
                var actionId = randid();
                postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'iterator', 'uid': event.data._get_var, 'actionId': actionId});
                return new Promise(function (resolve, reject) {
                  responsePromises[actionId] = resolve;
                });
              })();
            } else {
              return (async function() {
                var actionId = randid();
                postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'get', 'uid': event.data._get_var, 'actionId': actionId, 'prop': await serializeToJS(prop)});
                return new Promise(function (resolve, reject) {
                  responsePromises[actionId] = resolve;
                });
              })();
            }
          },
          set: async function(target, prop, value) {
            var actionId = randid();
            postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'set', 'uid': event.data._get_var, 'actionId': actionId, 'prop': await serializeToJS(prop), 'value': await serializeToJS(value)});
            new Promise(function (resolve, reject) {
              responsePromises[actionId] = resolve;
            });
            return value;
          },
          ownKeys: function(target) {
            return Reflect.ownKeys(target);
          },
          has: function(target, prop) {
            return Reflect.has(target, prop);
          },
          deleteProperty: async function(target, prop) {
            var actionId = randid();
            postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'deleteProperty', 'uid': event.data._get_var, 'actionId': actionId, 'prop': await serializeToJS(prop)});
            new Promise(function (resolve, reject) {
              responsePromises[actionId] = resolve;
            });
            return true;
          }
        });
        if (typeof Coldbrew._getMainVariableResponsePromises[event.data._get_var] !== 'undefined') {
          if (event.data.serializable) {
            delete Coldbrew._main_thread_vars[event.data._get_var];
            Coldbrew._getMainVariableResponsePromises[event.data._get_var](event.data.serializable_obj);
          } else if (event.data._internal_coldbrew_var) {
            delete Coldbrew._main_thread_vars[event.data._get_var];
            Coldbrew._getMainVariableResponsePromises[event.data._get_var](event.data._internal_coldbrew_var);
          } else {
            Coldbrew._getMainVariableResponsePromises[event.data._get_var]({
              '_internal_coldbrew_get_var': true,
              'uid': event.data._get_var,
            });
          }
          delete Coldbrew._getMainVariableResponsePromises[event.data._get_var];
        }
      }
    });
    postMessage({'_internal_coldbrew_message': true, 'ready': true});
  }, 1);
}
/**********************************************************/
/*************END WORKER SPECIFIC ROUTINE******************/
/**********************************************************/


/**********************************************************/
/*****************START EXPORT OF COLDBREW*****************/
/**********************************************************/
// Export the Coldbrew module defined in this file.
// Only exports if `shouldExportColdbrew` is true.
// `shouldExportColdbrew` is only false when unload() is 
// called and the named closure COLDBREW_TOP_SCOPE_FUNC
// is re-called. In that case, Coldbrew has already been
// exported and the already exported object is modified, 
// instead of replaced (cause you can't replace an export
// after it has been exported in environments like Node.js).
/**********************************************************/
if (shouldExportColdbrew) {
  var EXPORT = (function(Coldbrew) {
    var EXPORT = null;

    // DO NOT TOUCH THE LINE BELOW - IT IS AUTO REPLACED

// Use this file to customize what the library exports

// Whatever you set the EXPORT variable to, is what the global variable named "<Coldbrew>" 
// (the same Coldbrew from coldbrew_settings.py) will be set to in browsers or what 
// will be exported in Node.js when require()-ing this library.

// The entire Coldbrew Python environment is be exported by default.

EXPORT = Coldbrew;
    // DO NOT TOUCH THE LINE ABOVE - IT IS AUTO REPLACED

    if (EXPORT === null || typeof EXPORT === 'undefined') {
      EXPORT = Coldbrew;
    }
    return EXPORT;
  })(Coldbrew);

  if (typeof module !== 'undefined') module.exports = EXPORT;
  if (typeof window !== 'undefined') window.Coldbrew = EXPORT;
  if (typeof self !== 'undefined') self.Coldbrew = EXPORT;

  // Inside a pthread, provide _Coldbrew_coldbrew_internal_
  if (true && IS_THREAD_SCRIPT) {
    COLDBREW_GLOBAL_SCOPE._Coldbrew_coldbrew_internal_ = _Coldbrew_coldbrew_internal_; 
  }
}
/**********************************************************/
/******************END EXPORT OF COLDBREW******************/
/**********************************************************/

/**********************************************************/
/************START ENDING OF GLOBAL CLOSURE***************/
/**********************************************************/
// Closes the closure that wraps all code in this file
// within a closed scope.
/**********************************************************/
})();
/**********************************************************/
/************END ENDING OF GLOBAL CLOSURE******************/
/**********************************************************/
if (IS_NODE_JS) { module1 = module };

if (IS_NODE_JS) { module = module3 };

/*!

JSZip v3.2.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.JSZip = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var utils = require('./utils');
var support = require('./support');
// private property
var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";


// public method for encoding
exports.encode = function(input) {
    var output = [];
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0, len = input.length, remainingBytes = len;

    var isArray = utils.getTypeOf(input) !== "string";
    while (i < input.length) {
        remainingBytes = len - i;

        if (!isArray) {
            chr1 = input.charCodeAt(i++);
            chr2 = i < len ? input.charCodeAt(i++) : 0;
            chr3 = i < len ? input.charCodeAt(i++) : 0;
        } else {
            chr1 = input[i++];
            chr2 = i < len ? input[i++] : 0;
            chr3 = i < len ? input[i++] : 0;
        }

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = remainingBytes > 1 ? (((chr2 & 15) << 2) | (chr3 >> 6)) : 64;
        enc4 = remainingBytes > 2 ? (chr3 & 63) : 64;

        output.push(_keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4));

    }

    return output.join("");
};

// public method for decoding
exports.decode = function(input) {
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0, resultIndex = 0;

    var dataUrlPrefix = "data:";

    if (input.substr(0, dataUrlPrefix.length) === dataUrlPrefix) {
        // This is a common error: people give a data url
        // (data:image/png;base64,iVBOR...) with a {base64: true} and
        // wonders why things don't work.
        // We can detect that the string input looks like a data url but we
        // *can't* be sure it is one: removing everything up to the comma would
        // be too dangerous.
        throw new Error("Invalid base64 input, it looks like a data url.");
    }

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    var totalLength = input.length * 3 / 4;
    if(input.charAt(input.length - 1) === _keyStr.charAt(64)) {
        totalLength--;
    }
    if(input.charAt(input.length - 2) === _keyStr.charAt(64)) {
        totalLength--;
    }
    if (totalLength % 1 !== 0) {
        // totalLength is not an integer, the length does not match a valid
        // base64 content. That can happen if:
        // - the input is not a base64 content
        // - the input is *almost* a base64 content, with a extra chars at the
        //   beginning or at the end
        // - the input uses a base64 variant (base64url for example)
        throw new Error("Invalid base64 input, bad content length.");
    }
    var output;
    if (support.uint8array) {
        output = new Uint8Array(totalLength|0);
    } else {
        output = new Array(totalLength|0);
    }

    while (i < input.length) {

        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output[resultIndex++] = chr1;

        if (enc3 !== 64) {
            output[resultIndex++] = chr2;
        }
        if (enc4 !== 64) {
            output[resultIndex++] = chr3;
        }

    }

    return output;
};

},{"./support":30,"./utils":32}],2:[function(require,module,exports){
'use strict';

var external = require("./external");
var DataWorker = require('./stream/DataWorker');
var DataLengthProbe = require('./stream/DataLengthProbe');
var Crc32Probe = require('./stream/Crc32Probe');
var DataLengthProbe = require('./stream/DataLengthProbe');

/**
 * Represent a compressed object, with everything needed to decompress it.
 * @constructor
 * @param {number} compressedSize the size of the data compressed.
 * @param {number} uncompressedSize the size of the data after decompression.
 * @param {number} crc32 the crc32 of the decompressed file.
 * @param {object} compression the type of compression, see lib/compressions.js.
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the compressed data.
 */
function CompressedObject(compressedSize, uncompressedSize, crc32, compression, data) {
    this.compressedSize = compressedSize;
    this.uncompressedSize = uncompressedSize;
    this.crc32 = crc32;
    this.compression = compression;
    this.compressedContent = data;
}

CompressedObject.prototype = {
    /**
     * Create a worker to get the uncompressed content.
     * @return {GenericWorker} the worker.
     */
    getContentWorker : function () {
        var worker = new DataWorker(external.Promise.resolve(this.compressedContent))
        .pipe(this.compression.uncompressWorker())
        .pipe(new DataLengthProbe("data_length"));

        var that = this;
        worker.on("end", function () {
            if(this.streamInfo['data_length'] !== that.uncompressedSize) {
                throw new Error("Bug : uncompressed data size mismatch");
            }
        });
        return worker;
    },
    /**
     * Create a worker to get the compressed content.
     * @return {GenericWorker} the worker.
     */
    getCompressedWorker : function () {
        return new DataWorker(external.Promise.resolve(this.compressedContent))
        .withStreamInfo("compressedSize", this.compressedSize)
        .withStreamInfo("uncompressedSize", this.uncompressedSize)
        .withStreamInfo("crc32", this.crc32)
        .withStreamInfo("compression", this.compression)
        ;
    }
};

/**
 * Chain the given worker with other workers to compress the content with the
 * given compression.
 * @param {GenericWorker} uncompressedWorker the worker to pipe.
 * @param {Object} compression the compression object.
 * @param {Object} compressionOptions the options to use when compressing.
 * @return {GenericWorker} the new worker compressing the content.
 */
CompressedObject.createWorkerFrom = function (uncompressedWorker, compression, compressionOptions) {
    return uncompressedWorker
    .pipe(new Crc32Probe())
    .pipe(new DataLengthProbe("uncompressedSize"))
    .pipe(compression.compressWorker(compressionOptions))
    .pipe(new DataLengthProbe("compressedSize"))
    .withStreamInfo("compression", compression);
};

module.exports = CompressedObject;

},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(require,module,exports){
'use strict';

var GenericWorker = require("./stream/GenericWorker");

exports.STORE = {
    magic: "\x00\x00",
    compressWorker : function (compressionOptions) {
        return new GenericWorker("STORE compression");
    },
    uncompressWorker : function () {
        return new GenericWorker("STORE decompression");
    }
};
exports.DEFLATE = require('./flate');

},{"./flate":7,"./stream/GenericWorker":28}],4:[function(require,module,exports){
'use strict';

var utils = require('./utils');

/**
 * The following functions come from pako, from pako/lib/zlib/crc32.js
 * released under the MIT license, see pako https://github.com/nodeca/pako/
 */

// Use ordinary array, since untyped makes no boost here
function makeTable() {
    var c, table = [];

    for(var n =0; n < 256; n++){
        c = n;
        for(var k =0; k < 8; k++){
            c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }
        table[n] = c;
    }

    return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
    var t = crcTable, end = pos + len;

    crc = crc ^ (-1);

    for (var i = pos; i < end; i++ ) {
        crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
    }

    return (crc ^ (-1)); // >>> 0;
}

// That's all for the pako functions.

/**
 * Compute the crc32 of a string.
 * This is almost the same as the function crc32, but for strings. Using the
 * same function for the two use cases leads to horrible performances.
 * @param {Number} crc the starting value of the crc.
 * @param {String} str the string to use.
 * @param {Number} len the length of the string.
 * @param {Number} pos the starting position for the crc32 computation.
 * @return {Number} the computed crc32.
 */
function crc32str(crc, str, len, pos) {
    var t = crcTable, end = pos + len;

    crc = crc ^ (-1);

    for (var i = pos; i < end; i++ ) {
        crc = (crc >>> 8) ^ t[(crc ^ str.charCodeAt(i)) & 0xFF];
    }

    return (crc ^ (-1)); // >>> 0;
}

module.exports = function crc32wrapper(input, crc) {
    if (typeof input === "undefined" || !input.length) {
        return 0;
    }

    var isArray = utils.getTypeOf(input) !== "string";

    if(isArray) {
        return crc32(crc|0, input, input.length, 0);
    } else {
        return crc32str(crc|0, input, input.length, 0);
    }
};

},{"./utils":32}],5:[function(require,module,exports){
'use strict';
exports.base64 = false;
exports.binary = false;
exports.dir = false;
exports.createFolders = true;
exports.date = null;
exports.compression = null;
exports.compressionOptions = null;
exports.comment = null;
exports.unixPermissions = null;
exports.dosPermissions = null;

},{}],6:[function(require,module,exports){
/* global Promise */
'use strict';

// load the global object first:
// - it should be better integrated in the system (unhandledRejection in node)
// - the environment may have a custom Promise implementation (see zone.js)
var ES6Promise = null;
if (typeof Promise !== "undefined") {
    ES6Promise = Promise;
} else {
    ES6Promise = require("lie");
}

/**
 * Let the user use/change some implementations.
 */
module.exports = {
    Promise: ES6Promise
};

},{"lie":37}],7:[function(require,module,exports){
'use strict';
var USE_TYPEDARRAY = (typeof Uint8Array !== 'undefined') && (typeof Uint16Array !== 'undefined') && (typeof Uint32Array !== 'undefined');

var pako = require("pako");
var utils = require("./utils");
var GenericWorker = require("./stream/GenericWorker");

var ARRAY_TYPE = USE_TYPEDARRAY ? "uint8array" : "array";

exports.magic = "\x08\x00";

/**
 * Create a worker that uses pako to inflate/deflate.
 * @constructor
 * @param {String} action the name of the pako function to call : either "Deflate" or "Inflate".
 * @param {Object} options the options to use when (de)compressing.
 */
function FlateWorker(action, options) {
    GenericWorker.call(this, "FlateWorker/" + action);

    this._pako = null;
    this._pakoAction = action;
    this._pakoOptions = options;
    // the `meta` object from the last chunk received
    // this allow this worker to pass around metadata
    this.meta = {};
}

utils.inherits(FlateWorker, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
FlateWorker.prototype.processChunk = function (chunk) {
    this.meta = chunk.meta;
    if (this._pako === null) {
        this._createPako();
    }
    this._pako.push(utils.transformTo(ARRAY_TYPE, chunk.data), false);
};

/**
 * @see GenericWorker.flush
 */
FlateWorker.prototype.flush = function () {
    GenericWorker.prototype.flush.call(this);
    if (this._pako === null) {
        this._createPako();
    }
    this._pako.push([], true);
};
/**
 * @see GenericWorker.cleanUp
 */
FlateWorker.prototype.cleanUp = function () {
    GenericWorker.prototype.cleanUp.call(this);
    this._pako = null;
};

/**
 * Create the _pako object.
 * TODO: lazy-loading this object isn't the best solution but it's the
 * quickest. The best solution is to lazy-load the worker list. See also the
 * issue #446.
 */
FlateWorker.prototype._createPako = function () {
    this._pako = new pako[this._pakoAction]({
        raw: true,
        level: this._pakoOptions.level || -1 // default compression
    });
    var self = this;
    this._pako.onData = function(data) {
        self.push({
            data : data,
            meta : self.meta
        });
    };
};

exports.compressWorker = function (compressionOptions) {
    return new FlateWorker("Deflate", compressionOptions);
};
exports.uncompressWorker = function () {
    return new FlateWorker("Inflate", {});
};

},{"./stream/GenericWorker":28,"./utils":32,"pako":38}],8:[function(require,module,exports){
'use strict';

var utils = require('../utils');
var GenericWorker = require('../stream/GenericWorker');
var utf8 = require('../utf8');
var crc32 = require('../crc32');
var signature = require('../signature');

/**
 * Transform an integer into a string in hexadecimal.
 * @private
 * @param {number} dec the number to convert.
 * @param {number} bytes the number of bytes to generate.
 * @returns {string} the result.
 */
var decToHex = function(dec, bytes) {
    var hex = "", i;
    for (i = 0; i < bytes; i++) {
        hex += String.fromCharCode(dec & 0xff);
        dec = dec >>> 8;
    }
    return hex;
};

/**
 * Generate the UNIX part of the external file attributes.
 * @param {Object} unixPermissions the unix permissions or null.
 * @param {Boolean} isDir true if the entry is a directory, false otherwise.
 * @return {Number} a 32 bit integer.
 *
 * adapted from http://unix.stackexchange.com/questions/14705/the-zip-formats-external-file-attribute :
 *
 * TTTTsstrwxrwxrwx0000000000ADVSHR
 * ^^^^____________________________ file type, see zipinfo.c (UNX_*)
 *     ^^^_________________________ setuid, setgid, sticky
 *        ^^^^^^^^^________________ permissions
 *                 ^^^^^^^^^^______ not used ?
 *                           ^^^^^^ DOS attribute bits : Archive, Directory, Volume label, System file, Hidden, Read only
 */
var generateUnixExternalFileAttr = function (unixPermissions, isDir) {

    var result = unixPermissions;
    if (!unixPermissions) {
        // I can't use octal values in strict mode, hence the hexa.
        //  040775 => 0x41fd
        // 0100664 => 0x81b4
        result = isDir ? 0x41fd : 0x81b4;
    }
    return (result & 0xFFFF) << 16;
};

/**
 * Generate the DOS part of the external file attributes.
 * @param {Object} dosPermissions the dos permissions or null.
 * @param {Boolean} isDir true if the entry is a directory, false otherwise.
 * @return {Number} a 32 bit integer.
 *
 * Bit 0     Read-Only
 * Bit 1     Hidden
 * Bit 2     System
 * Bit 3     Volume Label
 * Bit 4     Directory
 * Bit 5     Archive
 */
var generateDosExternalFileAttr = function (dosPermissions, isDir) {

    // the dir flag is already set for compatibility
    return (dosPermissions || 0)  & 0x3F;
};

/**
 * Generate the various parts used in the construction of the final zip file.
 * @param {Object} streamInfo the hash with information about the compressed file.
 * @param {Boolean} streamedContent is the content streamed ?
 * @param {Boolean} streamingEnded is the stream finished ?
 * @param {number} offset the current offset from the start of the zip file.
 * @param {String} platform let's pretend we are this platform (change platform dependents fields)
 * @param {Function} encodeFileName the function to encode the file name / comment.
 * @return {Object} the zip parts.
 */
var generateZipParts = function(streamInfo, streamedContent, streamingEnded, offset, platform, encodeFileName) {
    var file = streamInfo['file'],
    compression = streamInfo['compression'],
    useCustomEncoding = encodeFileName !== utf8.utf8encode,
    encodedFileName = utils.transformTo("string", encodeFileName(file.name)),
    utfEncodedFileName = utils.transformTo("string", utf8.utf8encode(file.name)),
    comment = file.comment,
    encodedComment = utils.transformTo("string", encodeFileName(comment)),
    utfEncodedComment = utils.transformTo("string", utf8.utf8encode(comment)),
    useUTF8ForFileName = utfEncodedFileName.length !== file.name.length,
    useUTF8ForComment = utfEncodedComment.length !== comment.length,
    dosTime,
    dosDate,
    extraFields = "",
    unicodePathExtraField = "",
    unicodeCommentExtraField = "",
    dir = file.dir,
    date = file.date;


    var dataInfo = {
        crc32 : 0,
        compressedSize : 0,
        uncompressedSize : 0
    };

    // if the content is streamed, the sizes/crc32 are only available AFTER
    // the end of the stream.
    if (!streamedContent || streamingEnded) {
        dataInfo.crc32 = streamInfo['crc32'];
        dataInfo.compressedSize = streamInfo['compressedSize'];
        dataInfo.uncompressedSize = streamInfo['uncompressedSize'];
    }

    var bitflag = 0;
    if (streamedContent) {
        // Bit 3: the sizes/crc32 are set to zero in the local header.
        // The correct values are put in the data descriptor immediately
        // following the compressed data.
        bitflag |= 0x0008;
    }
    if (!useCustomEncoding && (useUTF8ForFileName || useUTF8ForComment)) {
        // Bit 11: Language encoding flag (EFS).
        bitflag |= 0x0800;
    }


    var extFileAttr = 0;
    var versionMadeBy = 0;
    if (dir) {
        // dos or unix, we set the dos dir flag
        extFileAttr |= 0x00010;
    }
    if(platform === "UNIX") {
        versionMadeBy = 0x031E; // UNIX, version 3.0
        extFileAttr |= generateUnixExternalFileAttr(file.unixPermissions, dir);
    } else { // DOS or other, fallback to DOS
        versionMadeBy = 0x0014; // DOS, version 2.0
        extFileAttr |= generateDosExternalFileAttr(file.dosPermissions, dir);
    }

    // date
    // @see http://www.delorie.com/djgpp/doc/rbinter/it/52/13.html
    // @see http://www.delorie.com/djgpp/doc/rbinter/it/65/16.html
    // @see http://www.delorie.com/djgpp/doc/rbinter/it/66/16.html

    dosTime = date.getUTCHours();
    dosTime = dosTime << 6;
    dosTime = dosTime | date.getUTCMinutes();
    dosTime = dosTime << 5;
    dosTime = dosTime | date.getUTCSeconds() / 2;

    dosDate = date.getUTCFullYear() - 1980;
    dosDate = dosDate << 4;
    dosDate = dosDate | (date.getUTCMonth() + 1);
    dosDate = dosDate << 5;
    dosDate = dosDate | date.getUTCDate();

    if (useUTF8ForFileName) {
        // set the unicode path extra field. unzip needs at least one extra
        // field to correctly handle unicode path, so using the path is as good
        // as any other information. This could improve the situation with
        // other archive managers too.
        // This field is usually used without the utf8 flag, with a non
        // unicode path in the header (winrar, winzip). This helps (a bit)
        // with the messy Windows' default compressed folders feature but
        // breaks on p7zip which doesn't seek the unicode path extra field.
        // So for now, UTF-8 everywhere !
        unicodePathExtraField =
            // Version
            decToHex(1, 1) +
            // NameCRC32
            decToHex(crc32(encodedFileName), 4) +
            // UnicodeName
            utfEncodedFileName;

        extraFields +=
            // Info-ZIP Unicode Path Extra Field
            "\x75\x70" +
            // size
            decToHex(unicodePathExtraField.length, 2) +
            // content
            unicodePathExtraField;
    }

    if(useUTF8ForComment) {

        unicodeCommentExtraField =
            // Version
            decToHex(1, 1) +
            // CommentCRC32
            decToHex(crc32(encodedComment), 4) +
            // UnicodeName
            utfEncodedComment;

        extraFields +=
            // Info-ZIP Unicode Path Extra Field
            "\x75\x63" +
            // size
            decToHex(unicodeCommentExtraField.length, 2) +
            // content
            unicodeCommentExtraField;
    }

    var header = "";

    // version needed to extract
    header += "\x0A\x00";
    // general purpose bit flag
    header += decToHex(bitflag, 2);
    // compression method
    header += compression.magic;
    // last mod file time
    header += decToHex(dosTime, 2);
    // last mod file date
    header += decToHex(dosDate, 2);
    // crc-32
    header += decToHex(dataInfo.crc32, 4);
    // compressed size
    header += decToHex(dataInfo.compressedSize, 4);
    // uncompressed size
    header += decToHex(dataInfo.uncompressedSize, 4);
    // file name length
    header += decToHex(encodedFileName.length, 2);
    // extra field length
    header += decToHex(extraFields.length, 2);


    var fileRecord = signature.LOCAL_FILE_HEADER + header + encodedFileName + extraFields;

    var dirRecord = signature.CENTRAL_FILE_HEADER +
        // version made by (00: DOS)
        decToHex(versionMadeBy, 2) +
        // file header (common to file and central directory)
        header +
        // file comment length
        decToHex(encodedComment.length, 2) +
        // disk number start
        "\x00\x00" +
        // internal file attributes TODO
        "\x00\x00" +
        // external file attributes
        decToHex(extFileAttr, 4) +
        // relative offset of local header
        decToHex(offset, 4) +
        // file name
        encodedFileName +
        // extra field
        extraFields +
        // file comment
        encodedComment;

    return {
        fileRecord: fileRecord,
        dirRecord: dirRecord
    };
};

/**
 * Generate the EOCD record.
 * @param {Number} entriesCount the number of entries in the zip file.
 * @param {Number} centralDirLength the length (in bytes) of the central dir.
 * @param {Number} localDirLength the length (in bytes) of the local dir.
 * @param {String} comment the zip file comment as a binary string.
 * @param {Function} encodeFileName the function to encode the comment.
 * @return {String} the EOCD record.
 */
var generateCentralDirectoryEnd = function (entriesCount, centralDirLength, localDirLength, comment, encodeFileName) {
    var dirEnd = "";
    var encodedComment = utils.transformTo("string", encodeFileName(comment));

    // end of central dir signature
    dirEnd = signature.CENTRAL_DIRECTORY_END +
        // number of this disk
        "\x00\x00" +
        // number of the disk with the start of the central directory
        "\x00\x00" +
        // total number of entries in the central directory on this disk
        decToHex(entriesCount, 2) +
        // total number of entries in the central directory
        decToHex(entriesCount, 2) +
        // size of the central directory   4 bytes
        decToHex(centralDirLength, 4) +
        // offset of start of central directory with respect to the starting disk number
        decToHex(localDirLength, 4) +
        // .ZIP file comment length
        decToHex(encodedComment.length, 2) +
        // .ZIP file comment
        encodedComment;

    return dirEnd;
};

/**
 * Generate data descriptors for a file entry.
 * @param {Object} streamInfo the hash generated by a worker, containing information
 * on the file entry.
 * @return {String} the data descriptors.
 */
var generateDataDescriptors = function (streamInfo) {
    var descriptor = "";
    descriptor = signature.DATA_DESCRIPTOR +
        // crc-32                          4 bytes
        decToHex(streamInfo['crc32'], 4) +
        // compressed size                 4 bytes
        decToHex(streamInfo['compressedSize'], 4) +
        // uncompressed size               4 bytes
        decToHex(streamInfo['uncompressedSize'], 4);

    return descriptor;
};


/**
 * A worker to concatenate other workers to create a zip file.
 * @param {Boolean} streamFiles `true` to stream the content of the files,
 * `false` to accumulate it.
 * @param {String} comment the comment to use.
 * @param {String} platform the platform to use, "UNIX" or "DOS".
 * @param {Function} encodeFileName the function to encode file names and comments.
 */
function ZipFileWorker(streamFiles, comment, platform, encodeFileName) {
    GenericWorker.call(this, "ZipFileWorker");
    // The number of bytes written so far. This doesn't count accumulated chunks.
    this.bytesWritten = 0;
    // The comment of the zip file
    this.zipComment = comment;
    // The platform "generating" the zip file.
    this.zipPlatform = platform;
    // the function to encode file names and comments.
    this.encodeFileName = encodeFileName;
    // Should we stream the content of the files ?
    this.streamFiles = streamFiles;
    // If `streamFiles` is false, we will need to accumulate the content of the
    // files to calculate sizes / crc32 (and write them *before* the content).
    // This boolean indicates if we are accumulating chunks (it will change a lot
    // during the lifetime of this worker).
    this.accumulate = false;
    // The buffer receiving chunks when accumulating content.
    this.contentBuffer = [];
    // The list of generated directory records.
    this.dirRecords = [];
    // The offset (in bytes) from the beginning of the zip file for the current source.
    this.currentSourceOffset = 0;
    // The total number of entries in this zip file.
    this.entriesCount = 0;
    // the name of the file currently being added, null when handling the end of the zip file.
    // Used for the emitted metadata.
    this.currentFile = null;



    this._sources = [];
}
utils.inherits(ZipFileWorker, GenericWorker);

/**
 * @see GenericWorker.push
 */
ZipFileWorker.prototype.push = function (chunk) {

    var currentFilePercent = chunk.meta.percent || 0;
    var entriesCount = this.entriesCount;
    var remainingFiles = this._sources.length;

    if(this.accumulate) {
        this.contentBuffer.push(chunk);
    } else {
        this.bytesWritten += chunk.data.length;

        GenericWorker.prototype.push.call(this, {
            data : chunk.data,
            meta : {
                currentFile : this.currentFile,
                percent : entriesCount ? (currentFilePercent + 100 * (entriesCount - remainingFiles - 1)) / entriesCount : 100
            }
        });
    }
};

/**
 * The worker started a new source (an other worker).
 * @param {Object} streamInfo the streamInfo object from the new source.
 */
ZipFileWorker.prototype.openedSource = function (streamInfo) {
    this.currentSourceOffset = this.bytesWritten;
    this.currentFile = streamInfo['file'].name;

    var streamedContent = this.streamFiles && !streamInfo['file'].dir;

    // don't stream folders (because they don't have any content)
    if(streamedContent) {
        var record = generateZipParts(streamInfo, streamedContent, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        this.push({
            data : record.fileRecord,
            meta : {percent:0}
        });
    } else {
        // we need to wait for the whole file before pushing anything
        this.accumulate = true;
    }
};

/**
 * The worker finished a source (an other worker).
 * @param {Object} streamInfo the streamInfo object from the finished source.
 */
ZipFileWorker.prototype.closedSource = function (streamInfo) {
    this.accumulate = false;
    var streamedContent = this.streamFiles && !streamInfo['file'].dir;
    var record = generateZipParts(streamInfo, streamedContent, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);

    this.dirRecords.push(record.dirRecord);
    if(streamedContent) {
        // after the streamed file, we put data descriptors
        this.push({
            data : generateDataDescriptors(streamInfo),
            meta : {percent:100}
        });
    } else {
        // the content wasn't streamed, we need to push everything now
        // first the file record, then the content
        this.push({
            data : record.fileRecord,
            meta : {percent:0}
        });
        while(this.contentBuffer.length) {
            this.push(this.contentBuffer.shift());
        }
    }
    this.currentFile = null;
};

/**
 * @see GenericWorker.flush
 */
ZipFileWorker.prototype.flush = function () {

    var localDirLength = this.bytesWritten;
    for(var i = 0; i < this.dirRecords.length; i++) {
        this.push({
            data : this.dirRecords[i],
            meta : {percent:100}
        });
    }
    var centralDirLength = this.bytesWritten - localDirLength;

    var dirEnd = generateCentralDirectoryEnd(this.dirRecords.length, centralDirLength, localDirLength, this.zipComment, this.encodeFileName);

    this.push({
        data : dirEnd,
        meta : {percent:100}
    });
};

/**
 * Prepare the next source to be read.
 */
ZipFileWorker.prototype.prepareNextSource = function () {
    this.previous = this._sources.shift();
    this.openedSource(this.previous.streamInfo);
    if (this.isPaused) {
        this.previous.pause();
    } else {
        this.previous.resume();
    }
};

/**
 * @see GenericWorker.registerPrevious
 */
ZipFileWorker.prototype.registerPrevious = function (previous) {
    this._sources.push(previous);
    var self = this;

    previous.on('data', function (chunk) {
        self.processChunk(chunk);
    });
    previous.on('end', function () {
        self.closedSource(self.previous.streamInfo);
        if(self._sources.length) {
            self.prepareNextSource();
        } else {
            self.end();
        }
    });
    previous.on('error', function (e) {
        self.error(e);
    });
    return this;
};

/**
 * @see GenericWorker.resume
 */
ZipFileWorker.prototype.resume = function () {
    if(!GenericWorker.prototype.resume.call(this)) {
        return false;
    }

    if (!this.previous && this._sources.length) {
        this.prepareNextSource();
        return true;
    }
    if (!this.previous && !this._sources.length && !this.generatedError) {
        this.end();
        return true;
    }
};

/**
 * @see GenericWorker.error
 */
ZipFileWorker.prototype.error = function (e) {
    var sources = this._sources;
    if(!GenericWorker.prototype.error.call(this, e)) {
        return false;
    }
    for(var i = 0; i < sources.length; i++) {
        try {
            sources[i].error(e);
        } catch(e) {
            // the `error` exploded, nothing to do
        }
    }
    return true;
};

/**
 * @see GenericWorker.lock
 */
ZipFileWorker.prototype.lock = function () {
    GenericWorker.prototype.lock.call(this);
    var sources = this._sources;
    for(var i = 0; i < sources.length; i++) {
        sources[i].lock();
    }
};

module.exports = ZipFileWorker;

},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(require,module,exports){
'use strict';

var compressions = require('../compressions');
var ZipFileWorker = require('./ZipFileWorker');

/**
 * Find the compression to use.
 * @param {String} fileCompression the compression defined at the file level, if any.
 * @param {String} zipCompression the compression defined at the load() level.
 * @return {Object} the compression object to use.
 */
var getCompression = function (fileCompression, zipCompression) {

    var compressionName = fileCompression || zipCompression;
    var compression = compressions[compressionName];
    if (!compression) {
        throw new Error(compressionName + " is not a valid compression method !");
    }
    return compression;
};

/**
 * Create a worker to generate a zip file.
 * @param {JSZip} zip the JSZip instance at the right root level.
 * @param {Object} options to generate the zip file.
 * @param {String} comment the comment to use.
 */
exports.generateWorker = function (zip, options, comment) {

    var zipFileWorker = new ZipFileWorker(options.streamFiles, comment, options.platform, options.encodeFileName);
    var entriesCount = 0;
    try {

        zip.forEach(function (relativePath, file) {
            entriesCount++;
            var compression = getCompression(file.options.compression, options.compression);
            var compressionOptions = file.options.compressionOptions || options.compressionOptions || {};
            var dir = file.dir, date = file.date;

            file._compressWorker(compression, compressionOptions)
            .withStreamInfo("file", {
                name : relativePath,
                dir : dir,
                date : date,
                comment : file.comment || "",
                unixPermissions : file.unixPermissions,
                dosPermissions : file.dosPermissions
            })
            .pipe(zipFileWorker);
        });
        zipFileWorker.entriesCount = entriesCount;
    } catch (e) {
        zipFileWorker.error(e);
    }

    return zipFileWorker;
};

},{"../compressions":3,"./ZipFileWorker":8}],10:[function(require,module,exports){
'use strict';

/**
 * Representation a of zip file in js
 * @constructor
 */
function JSZip() {
    // if this constructor is used without `new`, it adds `new` before itself:
    if(!(this instanceof JSZip)) {
        return new JSZip();
    }

    if(arguments.length) {
        throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
    }

    // object containing the files :
    // {
    //   "folder/" : {...},
    //   "folder/data.txt" : {...}
    // }
    this.files = {};

    this.comment = null;

    // Where we are in the hierarchy
    this.root = "";
    this.clone = function() {
        var newObj = new JSZip();
        for (var i in this) {
            if (typeof this[i] !== "function") {
                newObj[i] = this[i];
            }
        }
        return newObj;
    };
}
JSZip.prototype = require('./object');
JSZip.prototype.loadAsync = require('./load');
JSZip.support = require('./support');
JSZip.defaults = require('./defaults');

// TODO find a better way to handle this version,
// a require('package.json').version doesn't work with webpack, see #327
JSZip.version = "3.2.0";

JSZip.loadAsync = function (content, options) {
    return new JSZip().loadAsync(content, options);
};

JSZip.external = require("./external");
module.exports = JSZip;

},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(require,module,exports){
'use strict';
var utils = require('./utils');
var external = require("./external");
var utf8 = require('./utf8');
var utils = require('./utils');
var ZipEntries = require('./zipEntries');
var Crc32Probe = require('./stream/Crc32Probe');
var nodejsUtils = require("./nodejsUtils");

/**
 * Check the CRC32 of an entry.
 * @param {ZipEntry} zipEntry the zip entry to check.
 * @return {Promise} the result.
 */
function checkEntryCRC32(zipEntry) {
    return new external.Promise(function (resolve, reject) {
        var worker = zipEntry.decompressed.getContentWorker().pipe(new Crc32Probe());
        worker.on("error", function (e) {
            reject(e);
        })
        .on("end", function () {
            if (worker.streamInfo.crc32 !== zipEntry.decompressed.crc32) {
                reject(new Error("Corrupted zip : CRC32 mismatch"));
            } else {
                resolve();
            }
        })
        .resume();
    });
}

module.exports = function(data, options) {
    var zip = this;
    options = utils.extend(options || {}, {
        base64: false,
        checkCRC32: false,
        optimizedBinaryString: false,
        createFolders: false,
        decodeFileName: utf8.utf8decode
    });

    if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
        return external.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."));
    }

    return utils.prepareContent("the loaded zip file", data, true, options.optimizedBinaryString, options.base64)
    .then(function(data) {
        var zipEntries = new ZipEntries(options);
        zipEntries.load(data);
        return zipEntries;
    }).then(function checkCRC32(zipEntries) {
        var promises = [external.Promise.resolve(zipEntries)];
        var files = zipEntries.files;
        if (options.checkCRC32) {
            for (var i = 0; i < files.length; i++) {
                promises.push(checkEntryCRC32(files[i]));
            }
        }
        return external.Promise.all(promises);
    }).then(function addFiles(results) {
        var zipEntries = results.shift();
        var files = zipEntries.files;
        for (var i = 0; i < files.length; i++) {
            var input = files[i];
            zip.file(input.fileNameStr, input.decompressed, {
                binary: true,
                optimizedBinaryString: true,
                date: input.date,
                dir: input.dir,
                comment : input.fileCommentStr.length ? input.fileCommentStr : null,
                unixPermissions : input.unixPermissions,
                dosPermissions : input.dosPermissions,
                createFolders: options.createFolders
            });
        }
        if (zipEntries.zipComment.length) {
            zip.comment = zipEntries.zipComment;
        }

        return zip;
    });
};

},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(require,module,exports){
"use strict";

var utils = require('../utils');
var GenericWorker = require('../stream/GenericWorker');

/**
 * A worker that use a nodejs stream as source.
 * @constructor
 * @param {String} filename the name of the file entry for this stream.
 * @param {Readable} stream the nodejs stream.
 */
function NodejsStreamInputAdapter(filename, stream) {
    GenericWorker.call(this, "Nodejs stream input adapter for " + filename);
    this._upstreamEnded = false;
    this._bindStream(stream);
}

utils.inherits(NodejsStreamInputAdapter, GenericWorker);

/**
 * Prepare the stream and bind the callbacks on it.
 * Do this ASAP on node 0.10 ! A lazy binding doesn't always work.
 * @param {Stream} stream the nodejs stream to use.
 */
NodejsStreamInputAdapter.prototype._bindStream = function (stream) {
    var self = this;
    this._stream = stream;
    stream.pause();
    stream
    .on("data", function (chunk) {
        self.push({
            data: chunk,
            meta : {
                percent : 0
            }
        });
    })
    .on("error", function (e) {
        if(self.isPaused) {
            this.generatedError = e;
        } else {
            self.error(e);
        }
    })
    .on("end", function () {
        if(self.isPaused) {
            self._upstreamEnded = true;
        } else {
            self.end();
        }
    });
};
NodejsStreamInputAdapter.prototype.pause = function () {
    if(!GenericWorker.prototype.pause.call(this)) {
        return false;
    }
    this._stream.pause();
    return true;
};
NodejsStreamInputAdapter.prototype.resume = function () {
    if(!GenericWorker.prototype.resume.call(this)) {
        return false;
    }

    if(this._upstreamEnded) {
        this.end();
    } else {
        this._stream.resume();
    }

    return true;
};

module.exports = NodejsStreamInputAdapter;

},{"../stream/GenericWorker":28,"../utils":32}],13:[function(require,module,exports){
'use strict';

var Readable = require('readable-stream').Readable;

var utils = require('../utils');
utils.inherits(NodejsStreamOutputAdapter, Readable);

/**
* A nodejs stream using a worker as source.
* @see the SourceWrapper in http://nodejs.org/api/stream.html
* @constructor
* @param {StreamHelper} helper the helper wrapping the worker
* @param {Object} options the nodejs stream options
* @param {Function} updateCb the update callback.
*/
function NodejsStreamOutputAdapter(helper, options, updateCb) {
    Readable.call(this, options);
    this._helper = helper;

    var self = this;
    helper.on("data", function (data, meta) {
        if (!self.push(data)) {
            self._helper.pause();
        }
        if(updateCb) {
            updateCb(meta);
        }
    })
    .on("error", function(e) {
        self.emit('error', e);
    })
    .on("end", function () {
        self.push(null);
    });
}


NodejsStreamOutputAdapter.prototype._read = function() {
    this._helper.resume();
};

module.exports = NodejsStreamOutputAdapter;

},{"../utils":32,"readable-stream":16}],14:[function(require,module,exports){
'use strict';

module.exports = {
    /**
     * True if this is running in Nodejs, will be undefined in a browser.
     * In a browser, browserify won't include this file and the whole module
     * will be resolved an empty object.
     */
    isNode : typeof Buffer !== "undefined",
    /**
     * Create a new nodejs Buffer from an existing content.
     * @param {Object} data the data to pass to the constructor.
     * @param {String} encoding the encoding to use.
     * @return {Buffer} a new Buffer.
     */
    newBufferFrom: function(data, encoding) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) {
            return Buffer.from(data, encoding);
        } else {
            if (typeof data === "number") {
                // Safeguard for old Node.js versions. On newer versions,
                // Buffer.from(number) / Buffer(number, encoding) already throw.
                throw new Error("The \"data\" argument must not be a number");
            }
            return new Buffer(data, encoding);
        }
    },
    /**
     * Create a new nodejs Buffer with the specified size.
     * @param {Integer} size the size of the buffer.
     * @return {Buffer} a new Buffer.
     */
    allocBuffer: function (size) {
        if (Buffer.alloc) {
            return Buffer.alloc(size);
        } else {
            var buf = new Buffer(size);
            buf.fill(0);
            return buf;
        }
    },
    /**
     * Find out if an object is a Buffer.
     * @param {Object} b the object to test.
     * @return {Boolean} true if the object is a Buffer, false otherwise.
     */
    isBuffer : function(b){
        return Buffer.isBuffer(b);
    },

    isStream : function (obj) {
        return obj &&
            typeof obj.on === "function" &&
            typeof obj.pause === "function" &&
            typeof obj.resume === "function";
    }
};

},{}],15:[function(require,module,exports){
'use strict';
var utf8 = require('./utf8');
var utils = require('./utils');
var GenericWorker = require('./stream/GenericWorker');
var StreamHelper = require('./stream/StreamHelper');
var defaults = require('./defaults');
var CompressedObject = require('./compressedObject');
var ZipObject = require('./zipObject');
var generate = require("./generate");
var nodejsUtils = require("./nodejsUtils");
var NodejsStreamInputAdapter = require("./nodejs/NodejsStreamInputAdapter");


/**
 * Add a file in the current folder.
 * @private
 * @param {string} name the name of the file
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data of the file
 * @param {Object} originalOptions the options of the file
 * @return {Object} the new file.
 */
var fileAdd = function(name, data, originalOptions) {
    // be sure sub folders exist
    var dataType = utils.getTypeOf(data),
        parent;


    /*
     * Correct options.
     */

    var o = utils.extend(originalOptions || {}, defaults);
    o.date = o.date || new Date();
    if (o.compression !== null) {
        o.compression = o.compression.toUpperCase();
    }

    if (typeof o.unixPermissions === "string") {
        o.unixPermissions = parseInt(o.unixPermissions, 8);
    }

    // UNX_IFDIR  0040000 see zipinfo.c
    if (o.unixPermissions && (o.unixPermissions & 0x4000)) {
        o.dir = true;
    }
    // Bit 4    Directory
    if (o.dosPermissions && (o.dosPermissions & 0x0010)) {
        o.dir = true;
    }

    if (o.dir) {
        name = forceTrailingSlash(name);
    }
    if (o.createFolders && (parent = parentFolder(name))) {
        folderAdd.call(this, parent, true);
    }

    var isUnicodeString = dataType === "string" && o.binary === false && o.base64 === false;
    if (!originalOptions || typeof originalOptions.binary === "undefined") {
        o.binary = !isUnicodeString;
    }


    var isCompressedEmpty = (data instanceof CompressedObject) && data.uncompressedSize === 0;

    if (isCompressedEmpty || o.dir || !data || data.length === 0) {
        o.base64 = false;
        o.binary = true;
        data = "";
        o.compression = "STORE";
        dataType = "string";
    }

    /*
     * Convert content to fit.
     */

    var zipObjectContent = null;
    if (data instanceof CompressedObject || data instanceof GenericWorker) {
        zipObjectContent = data;
    } else if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
        zipObjectContent = new NodejsStreamInputAdapter(name, data);
    } else {
        zipObjectContent = utils.prepareContent(name, data, o.binary, o.optimizedBinaryString, o.base64);
    }

    var object = new ZipObject(name, zipObjectContent, o);
    this.files[name] = object;
    /*
    TODO: we can't throw an exception because we have async promises
    (we can have a promise of a Date() for example) but returning a
    promise is useless because file(name, data) returns the JSZip
    object for chaining. Should we break that to allow the user
    to catch the error ?

    return external.Promise.resolve(zipObjectContent)
    .then(function () {
        return object;
    });
    */
};

/**
 * Find the parent folder of the path.
 * @private
 * @param {string} path the path to use
 * @return {string} the parent folder, or ""
 */
var parentFolder = function (path) {
    if (path.slice(-1) === '/') {
        path = path.substring(0, path.length - 1);
    }
    var lastSlash = path.lastIndexOf('/');
    return (lastSlash > 0) ? path.substring(0, lastSlash) : "";
};

/**
 * Returns the path with a slash at the end.
 * @private
 * @param {String} path the path to check.
 * @return {String} the path with a trailing slash.
 */
var forceTrailingSlash = function(path) {
    // Check the name ends with a /
    if (path.slice(-1) !== "/") {
        path += "/"; // IE doesn't like substr(-1)
    }
    return path;
};

/**
 * Add a (sub) folder in the current folder.
 * @private
 * @param {string} name the folder's name
 * @param {boolean=} [createFolders] If true, automatically create sub
 *  folders. Defaults to false.
 * @return {Object} the new folder.
 */
var folderAdd = function(name, createFolders) {
    createFolders = (typeof createFolders !== 'undefined') ? createFolders : defaults.createFolders;

    name = forceTrailingSlash(name);

    // Does this folder already exist?
    if (!this.files[name]) {
        fileAdd.call(this, name, null, {
            dir: true,
            createFolders: createFolders
        });
    }
    return this.files[name];
};

/**
* Cross-window, cross-Node-context regular expression detection
* @param  {Object}  object Anything
* @return {Boolean}        true if the object is a regular expression,
* false otherwise
*/
function isRegExp(object) {
    return Object.prototype.toString.call(object) === "[object RegExp]";
}

// return the actual prototype of JSZip
var out = {
    /**
     * @see loadAsync
     */
    load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    },


    /**
     * Call a callback function for each entry at this folder level.
     * @param {Function} cb the callback function:
     * function (relativePath, file) {...}
     * It takes 2 arguments : the relative path and the file.
     */
    forEach: function(cb) {
        var filename, relativePath, file;
        for (filename in this.files) {
            if (!this.files.hasOwnProperty(filename)) {
                continue;
            }
            file = this.files[filename];
            relativePath = filename.slice(this.root.length, filename.length);
            if (relativePath && filename.slice(0, this.root.length) === this.root) { // the file is in the current root
                cb(relativePath, file); // TODO reverse the parameters ? need to be clean AND consistent with the filter search fn...
            }
        }
    },

    /**
     * Filter nested files/folders with the specified function.
     * @param {Function} search the predicate to use :
     * function (relativePath, file) {...}
     * It takes 2 arguments : the relative path and the file.
     * @return {Array} An array of matching elements.
     */
    filter: function(search) {
        var result = [];
        this.forEach(function (relativePath, entry) {
            if (search(relativePath, entry)) { // the file matches the function
                result.push(entry);
            }

        });
        return result;
    },

    /**
     * Add a file to the zip file, or search a file.
     * @param   {string|RegExp} name The name of the file to add (if data is defined),
     * the name of the file to find (if no data) or a regex to match files.
     * @param   {String|ArrayBuffer|Uint8Array|Buffer} data  The file data, either raw or base64 encoded
     * @param   {Object} o     File options
     * @return  {JSZip|Object|Array} this JSZip object (when adding a file),
     * a file (when searching by string) or an array of files (when searching by regex).
     */
    file: function(name, data, o) {
        if (arguments.length === 1) {
            if (isRegExp(name)) {
                var regexp = name;
                return this.filter(function(relativePath, file) {
                    return !file.dir && regexp.test(relativePath);
                });
            }
            else { // text
                var obj = this.files[this.root + name];
                if (obj && !obj.dir) {
                    return obj;
                } else {
                    return null;
                }
            }
        }
        else { // more than one argument : we have data !
            name = this.root + name;
            fileAdd.call(this, name, data, o);
        }
        return this;
    },

    /**
     * Add a directory to the zip file, or search.
     * @param   {String|RegExp} arg The name of the directory to add, or a regex to search folders.
     * @return  {JSZip} an object with the new directory as the root, or an array containing matching folders.
     */
    folder: function(arg) {
        if (!arg) {
            return this;
        }

        if (isRegExp(arg)) {
            return this.filter(function(relativePath, file) {
                return file.dir && arg.test(relativePath);
            });
        }

        // else, name is a new folder
        var name = this.root + arg;
        var newFolder = folderAdd.call(this, name);

        // Allow chaining by returning a new object with this folder as the root
        var ret = this.clone();
        ret.root = newFolder.name;
        return ret;
    },

    /**
     * Delete a file, or a directory and all sub-files, from the zip
     * @param {string} name the name of the file to delete
     * @return {JSZip} this JSZip object
     */
    remove: function(name) {
        name = this.root + name;
        var file = this.files[name];
        if (!file) {
            // Look for any folders
            if (name.slice(-1) !== "/") {
                name += "/";
            }
            file = this.files[name];
        }

        if (file && !file.dir) {
            // file
            delete this.files[name];
        } else {
            // maybe a folder, delete recursively
            var kids = this.filter(function(relativePath, file) {
                return file.name.slice(0, name.length) === name;
            });
            for (var i = 0; i < kids.length; i++) {
                delete this.files[kids[i].name];
            }
        }

        return this;
    },

    /**
     * Generate the complete zip file
     * @param {Object} options the options to generate the zip file :
     * - compression, "STORE" by default.
     * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
     * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the zip file
     */
    generate: function(options) {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    },

    /**
     * Generate the complete zip file as an internal stream.
     * @param {Object} options the options to generate the zip file :
     * - compression, "STORE" by default.
     * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
     * @return {StreamHelper} the streamed zip file.
     */
    generateInternalStream: function(options) {
      var worker, opts = {};
      try {
          opts = utils.extend(options || {}, {
              streamFiles: false,
              compression: "STORE",
              compressionOptions : null,
              type: "",
              platform: "DOS",
              comment: null,
              mimeType: 'application/zip',
              encodeFileName: utf8.utf8encode
          });

          opts.type = opts.type.toLowerCase();
          opts.compression = opts.compression.toUpperCase();

          // "binarystring" is preferred but the internals use "string".
          if(opts.type === "binarystring") {
            opts.type = "string";
          }

          if (!opts.type) {
            throw new Error("No output type specified.");
          }

          utils.checkSupport(opts.type);

          // accept nodejs `process.platform`
          if(
              opts.platform === 'darwin' ||
              opts.platform === 'freebsd' ||
              opts.platform === 'linux' ||
              opts.platform === 'sunos'
          ) {
              opts.platform = "UNIX";
          }
          if (opts.platform === 'win32') {
              opts.platform = "DOS";
          }

          var comment = opts.comment || this.comment || "";
          worker = generate.generateWorker(this, opts, comment);
      } catch (e) {
        worker = new GenericWorker("error");
        worker.error(e);
      }
      return new StreamHelper(worker, opts.type || "string", opts.mimeType);
    },
    /**
     * Generate the complete zip file asynchronously.
     * @see generateInternalStream
     */
    generateAsync: function(options, onUpdate) {
        return this.generateInternalStream(options).accumulate(onUpdate);
    },
    /**
     * Generate the complete zip file asynchronously.
     * @see generateInternalStream
     */
    generateNodeStream: function(options, onUpdate) {
        options = options || {};
        if (!options.type) {
            options.type = "nodebuffer";
        }
        return this.generateInternalStream(options).toNodejsStream(onUpdate);
    }
};
module.exports = out;

},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(require,module,exports){
/*
 * This file is used by module bundlers (browserify/webpack/etc) when
 * including a stream implementation. We use "readable-stream" to get a
 * consistent behavior between nodejs versions but bundlers often have a shim
 * for "stream". Using this shim greatly improve the compatibility and greatly
 * reduce the final size of the bundle (only one stream implementation, not
 * two).
 */
module.exports = require("stream");

},{"stream":undefined}],17:[function(require,module,exports){
'use strict';
var DataReader = require('./DataReader');
var utils = require('../utils');

function ArrayReader(data) {
    DataReader.call(this, data);
	for(var i = 0; i < this.data.length; i++) {
		data[i] = data[i] & 0xFF;
	}
}
utils.inherits(ArrayReader, DataReader);
/**
 * @see DataReader.byteAt
 */
ArrayReader.prototype.byteAt = function(i) {
    return this.data[this.zero + i];
};
/**
 * @see DataReader.lastIndexOfSignature
 */
ArrayReader.prototype.lastIndexOfSignature = function(sig) {
    var sig0 = sig.charCodeAt(0),
        sig1 = sig.charCodeAt(1),
        sig2 = sig.charCodeAt(2),
        sig3 = sig.charCodeAt(3);
    for (var i = this.length - 4; i >= 0; --i) {
        if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) {
            return i - this.zero;
        }
    }

    return -1;
};
/**
 * @see DataReader.readAndCheckSignature
 */
ArrayReader.prototype.readAndCheckSignature = function (sig) {
    var sig0 = sig.charCodeAt(0),
        sig1 = sig.charCodeAt(1),
        sig2 = sig.charCodeAt(2),
        sig3 = sig.charCodeAt(3),
        data = this.readData(4);
    return sig0 === data[0] && sig1 === data[1] && sig2 === data[2] && sig3 === data[3];
};
/**
 * @see DataReader.readData
 */
ArrayReader.prototype.readData = function(size) {
    this.checkOffset(size);
    if(size === 0) {
        return [];
    }
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
};
module.exports = ArrayReader;

},{"../utils":32,"./DataReader":18}],18:[function(require,module,exports){
'use strict';
var utils = require('../utils');

function DataReader(data) {
    this.data = data; // type : see implementation
    this.length = data.length;
    this.index = 0;
    this.zero = 0;
}
DataReader.prototype = {
    /**
     * Check that the offset will not go too far.
     * @param {string} offset the additional offset to check.
     * @throws {Error} an Error if the offset is out of bounds.
     */
    checkOffset: function(offset) {
        this.checkIndex(this.index + offset);
    },
    /**
     * Check that the specified index will not be too far.
     * @param {string} newIndex the index to check.
     * @throws {Error} an Error if the index is out of bounds.
     */
    checkIndex: function(newIndex) {
        if (this.length < this.zero + newIndex || newIndex < 0) {
            throw new Error("End of data reached (data length = " + this.length + ", asked index = " + (newIndex) + "). Corrupted zip ?");
        }
    },
    /**
     * Change the index.
     * @param {number} newIndex The new index.
     * @throws {Error} if the new index is out of the data.
     */
    setIndex: function(newIndex) {
        this.checkIndex(newIndex);
        this.index = newIndex;
    },
    /**
     * Skip the next n bytes.
     * @param {number} n the number of bytes to skip.
     * @throws {Error} if the new index is out of the data.
     */
    skip: function(n) {
        this.setIndex(this.index + n);
    },
    /**
     * Get the byte at the specified index.
     * @param {number} i the index to use.
     * @return {number} a byte.
     */
    byteAt: function(i) {
        // see implementations
    },
    /**
     * Get the next number with a given byte size.
     * @param {number} size the number of bytes to read.
     * @return {number} the corresponding number.
     */
    readInt: function(size) {
        var result = 0,
            i;
        this.checkOffset(size);
        for (i = this.index + size - 1; i >= this.index; i--) {
            result = (result << 8) + this.byteAt(i);
        }
        this.index += size;
        return result;
    },
    /**
     * Get the next string with a given byte size.
     * @param {number} size the number of bytes to read.
     * @return {string} the corresponding string.
     */
    readString: function(size) {
        return utils.transformTo("string", this.readData(size));
    },
    /**
     * Get raw data without conversion, <size> bytes.
     * @param {number} size the number of bytes to read.
     * @return {Object} the raw data, implementation specific.
     */
    readData: function(size) {
        // see implementations
    },
    /**
     * Find the last occurrence of a zip signature (4 bytes).
     * @param {string} sig the signature to find.
     * @return {number} the index of the last occurrence, -1 if not found.
     */
    lastIndexOfSignature: function(sig) {
        // see implementations
    },
    /**
     * Read the signature (4 bytes) at the current position and compare it with sig.
     * @param {string} sig the expected signature
     * @return {boolean} true if the signature matches, false otherwise.
     */
    readAndCheckSignature: function(sig) {
        // see implementations
    },
    /**
     * Get the next date.
     * @return {Date} the date.
     */
    readDate: function() {
        var dostime = this.readInt(4);
        return new Date(Date.UTC(
        ((dostime >> 25) & 0x7f) + 1980, // year
        ((dostime >> 21) & 0x0f) - 1, // month
        (dostime >> 16) & 0x1f, // day
        (dostime >> 11) & 0x1f, // hour
        (dostime >> 5) & 0x3f, // minute
        (dostime & 0x1f) << 1)); // second
    }
};
module.exports = DataReader;

},{"../utils":32}],19:[function(require,module,exports){
'use strict';
var Uint8ArrayReader = require('./Uint8ArrayReader');
var utils = require('../utils');

function NodeBufferReader(data) {
    Uint8ArrayReader.call(this, data);
}
utils.inherits(NodeBufferReader, Uint8ArrayReader);

/**
 * @see DataReader.readData
 */
NodeBufferReader.prototype.readData = function(size) {
    this.checkOffset(size);
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
};
module.exports = NodeBufferReader;

},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(require,module,exports){
'use strict';
var DataReader = require('./DataReader');
var utils = require('../utils');

function StringReader(data) {
    DataReader.call(this, data);
}
utils.inherits(StringReader, DataReader);
/**
 * @see DataReader.byteAt
 */
StringReader.prototype.byteAt = function(i) {
    return this.data.charCodeAt(this.zero + i);
};
/**
 * @see DataReader.lastIndexOfSignature
 */
StringReader.prototype.lastIndexOfSignature = function(sig) {
    return this.data.lastIndexOf(sig) - this.zero;
};
/**
 * @see DataReader.readAndCheckSignature
 */
StringReader.prototype.readAndCheckSignature = function (sig) {
    var data = this.readData(4);
    return sig === data;
};
/**
 * @see DataReader.readData
 */
StringReader.prototype.readData = function(size) {
    this.checkOffset(size);
    // this will work because the constructor applied the "& 0xff" mask.
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
};
module.exports = StringReader;

},{"../utils":32,"./DataReader":18}],21:[function(require,module,exports){
'use strict';
var ArrayReader = require('./ArrayReader');
var utils = require('../utils');

function Uint8ArrayReader(data) {
    ArrayReader.call(this, data);
}
utils.inherits(Uint8ArrayReader, ArrayReader);
/**
 * @see DataReader.readData
 */
Uint8ArrayReader.prototype.readData = function(size) {
    this.checkOffset(size);
    if(size === 0) {
        // in IE10, when using subarray(idx, idx), we get the array [0x00] instead of [].
        return new Uint8Array(0);
    }
    var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
};
module.exports = Uint8ArrayReader;

},{"../utils":32,"./ArrayReader":17}],22:[function(require,module,exports){
'use strict';

var utils = require('../utils');
var support = require('../support');
var ArrayReader = require('./ArrayReader');
var StringReader = require('./StringReader');
var NodeBufferReader = require('./NodeBufferReader');
var Uint8ArrayReader = require('./Uint8ArrayReader');

/**
 * Create a reader adapted to the data.
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data to read.
 * @return {DataReader} the data reader.
 */
module.exports = function (data) {
    var type = utils.getTypeOf(data);
    utils.checkSupport(type);
    if (type === "string" && !support.uint8array) {
        return new StringReader(data);
    }
    if (type === "nodebuffer") {
        return new NodeBufferReader(data);
    }
    if (support.uint8array) {
        return new Uint8ArrayReader(utils.transformTo("uint8array", data));
    }
    return new ArrayReader(utils.transformTo("array", data));
};

},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(require,module,exports){
'use strict';
exports.LOCAL_FILE_HEADER = "PK\x03\x04";
exports.CENTRAL_FILE_HEADER = "PK\x01\x02";
exports.CENTRAL_DIRECTORY_END = "PK\x05\x06";
exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07";
exports.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06";
exports.DATA_DESCRIPTOR = "PK\x07\x08";

},{}],24:[function(require,module,exports){
'use strict';

var GenericWorker = require('./GenericWorker');
var utils = require('../utils');

/**
 * A worker which convert chunks to a specified type.
 * @constructor
 * @param {String} destType the destination type.
 */
function ConvertWorker(destType) {
    GenericWorker.call(this, "ConvertWorker to " + destType);
    this.destType = destType;
}
utils.inherits(ConvertWorker, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
ConvertWorker.prototype.processChunk = function (chunk) {
    this.push({
        data : utils.transformTo(this.destType, chunk.data),
        meta : chunk.meta
    });
};
module.exports = ConvertWorker;

},{"../utils":32,"./GenericWorker":28}],25:[function(require,module,exports){
'use strict';

var GenericWorker = require('./GenericWorker');
var crc32 = require('../crc32');
var utils = require('../utils');

/**
 * A worker which calculate the crc32 of the data flowing through.
 * @constructor
 */
function Crc32Probe() {
    GenericWorker.call(this, "Crc32Probe");
    this.withStreamInfo("crc32", 0);
}
utils.inherits(Crc32Probe, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
Crc32Probe.prototype.processChunk = function (chunk) {
    this.streamInfo.crc32 = crc32(chunk.data, this.streamInfo.crc32 || 0);
    this.push(chunk);
};
module.exports = Crc32Probe;

},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(require,module,exports){
'use strict';

var utils = require('../utils');
var GenericWorker = require('./GenericWorker');

/**
 * A worker which calculate the total length of the data flowing through.
 * @constructor
 * @param {String} propName the name used to expose the length
 */
function DataLengthProbe(propName) {
    GenericWorker.call(this, "DataLengthProbe for " + propName);
    this.propName = propName;
    this.withStreamInfo(propName, 0);
}
utils.inherits(DataLengthProbe, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
DataLengthProbe.prototype.processChunk = function (chunk) {
    if(chunk) {
        var length = this.streamInfo[this.propName] || 0;
        this.streamInfo[this.propName] = length + chunk.data.length;
    }
    GenericWorker.prototype.processChunk.call(this, chunk);
};
module.exports = DataLengthProbe;


},{"../utils":32,"./GenericWorker":28}],27:[function(require,module,exports){
'use strict';

var utils = require('../utils');
var GenericWorker = require('./GenericWorker');

// the size of the generated chunks
// TODO expose this as a public variable
var DEFAULT_BLOCK_SIZE = 16 * 1024;

/**
 * A worker that reads a content and emits chunks.
 * @constructor
 * @param {Promise} dataP the promise of the data to split
 */
function DataWorker(dataP) {
    GenericWorker.call(this, "DataWorker");
    var self = this;
    this.dataIsReady = false;
    this.index = 0;
    this.max = 0;
    this.data = null;
    this.type = "";

    this._tickScheduled = false;

    dataP.then(function (data) {
        self.dataIsReady = true;
        self.data = data;
        self.max = data && data.length || 0;
        self.type = utils.getTypeOf(data);
        if(!self.isPaused) {
            self._tickAndRepeat();
        }
    }, function (e) {
        self.error(e);
    });
}

utils.inherits(DataWorker, GenericWorker);

/**
 * @see GenericWorker.cleanUp
 */
DataWorker.prototype.cleanUp = function () {
    GenericWorker.prototype.cleanUp.call(this);
    this.data = null;
};

/**
 * @see GenericWorker.resume
 */
DataWorker.prototype.resume = function () {
    if(!GenericWorker.prototype.resume.call(this)) {
        return false;
    }

    if (!this._tickScheduled && this.dataIsReady) {
        this._tickScheduled = true;
        utils.delay(this._tickAndRepeat, [], this);
    }
    return true;
};

/**
 * Trigger a tick a schedule an other call to this function.
 */
DataWorker.prototype._tickAndRepeat = function() {
    this._tickScheduled = false;
    if(this.isPaused || this.isFinished) {
        return;
    }
    this._tick();
    if(!this.isFinished) {
        utils.delay(this._tickAndRepeat, [], this);
        this._tickScheduled = true;
    }
};

/**
 * Read and push a chunk.
 */
DataWorker.prototype._tick = function() {

    if(this.isPaused || this.isFinished) {
        return false;
    }

    var size = DEFAULT_BLOCK_SIZE;
    var data = null, nextIndex = Math.min(this.max, this.index + size);
    if (this.index >= this.max) {
        // EOF
        return this.end();
    } else {
        switch(this.type) {
            case "string":
                data = this.data.substring(this.index, nextIndex);
            break;
            case "uint8array":
                data = this.data.subarray(this.index, nextIndex);
            break;
            case "array":
            case "nodebuffer":
                data = this.data.slice(this.index, nextIndex);
            break;
        }
        this.index = nextIndex;
        return this.push({
            data : data,
            meta : {
                percent : this.max ? this.index / this.max * 100 : 0
            }
        });
    }
};

module.exports = DataWorker;

},{"../utils":32,"./GenericWorker":28}],28:[function(require,module,exports){
'use strict';

/**
 * A worker that does nothing but passing chunks to the next one. This is like
 * a nodejs stream but with some differences. On the good side :
 * - it works on IE 6-9 without any issue / polyfill
 * - it weights less than the full dependencies bundled with browserify
 * - it forwards errors (no need to declare an error handler EVERYWHERE)
 *
 * A chunk is an object with 2 attributes : `meta` and `data`. The former is an
 * object containing anything (`percent` for example), see each worker for more
 * details. The latter is the real data (String, Uint8Array, etc).
 *
 * @constructor
 * @param {String} name the name of the stream (mainly used for debugging purposes)
 */
function GenericWorker(name) {
    // the name of the worker
    this.name = name || "default";
    // an object containing metadata about the workers chain
    this.streamInfo = {};
    // an error which happened when the worker was paused
    this.generatedError = null;
    // an object containing metadata to be merged by this worker into the general metadata
    this.extraStreamInfo = {};
    // true if the stream is paused (and should not do anything), false otherwise
    this.isPaused = true;
    // true if the stream is finished (and should not do anything), false otherwise
    this.isFinished = false;
    // true if the stream is locked to prevent further structure updates (pipe), false otherwise
    this.isLocked = false;
    // the event listeners
    this._listeners = {
        'data':[],
        'end':[],
        'error':[]
    };
    // the previous worker, if any
    this.previous = null;
}

GenericWorker.prototype = {
    /**
     * Push a chunk to the next workers.
     * @param {Object} chunk the chunk to push
     */
    push : function (chunk) {
        this.emit("data", chunk);
    },
    /**
     * End the stream.
     * @return {Boolean} true if this call ended the worker, false otherwise.
     */
    end : function () {
        if (this.isFinished) {
            return false;
        }

        this.flush();
        try {
            this.emit("end");
            this.cleanUp();
            this.isFinished = true;
        } catch (e) {
            this.emit("error", e);
        }
        return true;
    },
    /**
     * End the stream with an error.
     * @param {Error} e the error which caused the premature end.
     * @return {Boolean} true if this call ended the worker with an error, false otherwise.
     */
    error : function (e) {
        if (this.isFinished) {
            return false;
        }

        if(this.isPaused) {
            this.generatedError = e;
        } else {
            this.isFinished = true;

            this.emit("error", e);

            // in the workers chain exploded in the middle of the chain,
            // the error event will go downward but we also need to notify
            // workers upward that there has been an error.
            if(this.previous) {
                this.previous.error(e);
            }

            this.cleanUp();
        }
        return true;
    },
    /**
     * Add a callback on an event.
     * @param {String} name the name of the event (data, end, error)
     * @param {Function} listener the function to call when the event is triggered
     * @return {GenericWorker} the current object for chainability
     */
    on : function (name, listener) {
        this._listeners[name].push(listener);
        return this;
    },
    /**
     * Clean any references when a worker is ending.
     */
    cleanUp : function () {
        this.streamInfo = this.generatedError = this.extraStreamInfo = null;
        this._listeners = [];
    },
    /**
     * Trigger an event. This will call registered callback with the provided arg.
     * @param {String} name the name of the event (data, end, error)
     * @param {Object} arg the argument to call the callback with.
     */
    emit : function (name, arg) {
        if (this._listeners[name]) {
            for(var i = 0; i < this._listeners[name].length; i++) {
                this._listeners[name][i].call(this, arg);
            }
        }
    },
    /**
     * Chain a worker with an other.
     * @param {Worker} next the worker receiving events from the current one.
     * @return {worker} the next worker for chainability
     */
    pipe : function (next) {
        return next.registerPrevious(this);
    },
    /**
     * Same as `pipe` in the other direction.
     * Using an API with `pipe(next)` is very easy.
     * Implementing the API with the point of view of the next one registering
     * a source is easier, see the ZipFileWorker.
     * @param {Worker} previous the previous worker, sending events to this one
     * @return {Worker} the current worker for chainability
     */
    registerPrevious : function (previous) {
        if (this.isLocked) {
            throw new Error("The stream '" + this + "' has already been used.");
        }

        // sharing the streamInfo...
        this.streamInfo = previous.streamInfo;
        // ... and adding our own bits
        this.mergeStreamInfo();
        this.previous =  previous;
        var self = this;
        previous.on('data', function (chunk) {
            self.processChunk(chunk);
        });
        previous.on('end', function () {
            self.end();
        });
        previous.on('error', function (e) {
            self.error(e);
        });
        return this;
    },
    /**
     * Pause the stream so it doesn't send events anymore.
     * @return {Boolean} true if this call paused the worker, false otherwise.
     */
    pause : function () {
        if(this.isPaused || this.isFinished) {
            return false;
        }
        this.isPaused = true;

        if(this.previous) {
            this.previous.pause();
        }
        return true;
    },
    /**
     * Resume a paused stream.
     * @return {Boolean} true if this call resumed the worker, false otherwise.
     */
    resume : function () {
        if(!this.isPaused || this.isFinished) {
            return false;
        }
        this.isPaused = false;

        // if true, the worker tried to resume but failed
        var withError = false;
        if(this.generatedError) {
            this.error(this.generatedError);
            withError = true;
        }
        if(this.previous) {
            this.previous.resume();
        }

        return !withError;
    },
    /**
     * Flush any remaining bytes as the stream is ending.
     */
    flush : function () {},
    /**
     * Process a chunk. This is usually the method overridden.
     * @param {Object} chunk the chunk to process.
     */
    processChunk : function(chunk) {
        this.push(chunk);
    },
    /**
     * Add a key/value to be added in the workers chain streamInfo once activated.
     * @param {String} key the key to use
     * @param {Object} value the associated value
     * @return {Worker} the current worker for chainability
     */
    withStreamInfo : function (key, value) {
        this.extraStreamInfo[key] = value;
        this.mergeStreamInfo();
        return this;
    },
    /**
     * Merge this worker's streamInfo into the chain's streamInfo.
     */
    mergeStreamInfo : function () {
        for(var key in this.extraStreamInfo) {
            if (!this.extraStreamInfo.hasOwnProperty(key)) {
                continue;
            }
            this.streamInfo[key] = this.extraStreamInfo[key];
        }
    },

    /**
     * Lock the stream to prevent further updates on the workers chain.
     * After calling this method, all calls to pipe will fail.
     */
    lock: function () {
        if (this.isLocked) {
            throw new Error("The stream '" + this + "' has already been used.");
        }
        this.isLocked = true;
        if (this.previous) {
            this.previous.lock();
        }
    },

    /**
     *
     * Pretty print the workers chain.
     */
    toString : function () {
        var me = "Worker " + this.name;
        if (this.previous) {
            return this.previous + " -> " + me;
        } else {
            return me;
        }
    }
};

module.exports = GenericWorker;

},{}],29:[function(require,module,exports){
'use strict';

var utils = require('../utils');
var ConvertWorker = require('./ConvertWorker');
var GenericWorker = require('./GenericWorker');
var base64 = require('../base64');
var support = require("../support");
var external = require("../external");

var NodejsStreamOutputAdapter = null;
if (support.nodestream) {
    try {
        NodejsStreamOutputAdapter = require('../nodejs/NodejsStreamOutputAdapter');
    } catch(e) {}
}

/**
 * Apply the final transformation of the data. If the user wants a Blob for
 * example, it's easier to work with an U8intArray and finally do the
 * ArrayBuffer/Blob conversion.
 * @param {String} type the name of the final type
 * @param {String|Uint8Array|Buffer} content the content to transform
 * @param {String} mimeType the mime type of the content, if applicable.
 * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the content in the right format.
 */
function transformZipOutput(type, content, mimeType) {
    switch(type) {
        case "blob" :
            return utils.newBlob(utils.transformTo("arraybuffer", content), mimeType);
        case "base64" :
            return base64.encode(content);
        default :
            return utils.transformTo(type, content);
    }
}

/**
 * Concatenate an array of data of the given type.
 * @param {String} type the type of the data in the given array.
 * @param {Array} dataArray the array containing the data chunks to concatenate
 * @return {String|Uint8Array|Buffer} the concatenated data
 * @throws Error if the asked type is unsupported
 */
function concat (type, dataArray) {
    var i, index = 0, res = null, totalLength = 0;
    for(i = 0; i < dataArray.length; i++) {
        totalLength += dataArray[i].length;
    }
    switch(type) {
        case "string":
            return dataArray.join("");
          case "array":
            return Array.prototype.concat.apply([], dataArray);
        case "uint8array":
            res = new Uint8Array(totalLength);
            for(i = 0; i < dataArray.length; i++) {
                res.set(dataArray[i], index);
                index += dataArray[i].length;
            }
            return res;
        case "nodebuffer":
            return Buffer.concat(dataArray);
        default:
            throw new Error("concat : unsupported type '"  + type + "'");
    }
}

/**
 * Listen a StreamHelper, accumulate its content and concatenate it into a
 * complete block.
 * @param {StreamHelper} helper the helper to use.
 * @param {Function} updateCallback a callback called on each update. Called
 * with one arg :
 * - the metadata linked to the update received.
 * @return Promise the promise for the accumulation.
 */
function accumulate(helper, updateCallback) {
    return new external.Promise(function (resolve, reject){
        var dataArray = [];
        var chunkType = helper._internalType,
            resultType = helper._outputType,
            mimeType = helper._mimeType;
        helper
        .on('data', function (data, meta) {
            dataArray.push(data);
            if(updateCallback) {
                updateCallback(meta);
            }
        })
        .on('error', function(err) {
            dataArray = [];
            reject(err);
        })
        .on('end', function (){
            try {
                var result = transformZipOutput(resultType, concat(chunkType, dataArray), mimeType);
                resolve(result);
            } catch (e) {
                reject(e);
            }
            dataArray = [];
        })
        .resume();
    });
}

/**
 * An helper to easily use workers outside of JSZip.
 * @constructor
 * @param {Worker} worker the worker to wrap
 * @param {String} outputType the type of data expected by the use
 * @param {String} mimeType the mime type of the content, if applicable.
 */
function StreamHelper(worker, outputType, mimeType) {
    var internalType = outputType;
    switch(outputType) {
        case "blob":
        case "arraybuffer":
            internalType = "uint8array";
        break;
        case "base64":
            internalType = "string";
        break;
    }

    try {
        // the type used internally
        this._internalType = internalType;
        // the type used to output results
        this._outputType = outputType;
        // the mime type
        this._mimeType = mimeType;
        utils.checkSupport(internalType);
        this._worker = worker.pipe(new ConvertWorker(internalType));
        // the last workers can be rewired without issues but we need to
        // prevent any updates on previous workers.
        worker.lock();
    } catch(e) {
        this._worker = new GenericWorker("error");
        this._worker.error(e);
    }
}

StreamHelper.prototype = {
    /**
     * Listen a StreamHelper, accumulate its content and concatenate it into a
     * complete block.
     * @param {Function} updateCb the update callback.
     * @return Promise the promise for the accumulation.
     */
    accumulate : function (updateCb) {
        return accumulate(this, updateCb);
    },
    /**
     * Add a listener on an event triggered on a stream.
     * @param {String} evt the name of the event
     * @param {Function} fn the listener
     * @return {StreamHelper} the current helper.
     */
    on : function (evt, fn) {
        var self = this;

        if(evt === "data") {
            this._worker.on(evt, function (chunk) {
                fn.call(self, chunk.data, chunk.meta);
            });
        } else {
            this._worker.on(evt, function () {
                utils.delay(fn, arguments, self);
            });
        }
        return this;
    },
    /**
     * Resume the flow of chunks.
     * @return {StreamHelper} the current helper.
     */
    resume : function () {
        utils.delay(this._worker.resume, [], this._worker);
        return this;
    },
    /**
     * Pause the flow of chunks.
     * @return {StreamHelper} the current helper.
     */
    pause : function () {
        this._worker.pause();
        return this;
    },
    /**
     * Return a nodejs stream for this helper.
     * @param {Function} updateCb the update callback.
     * @return {NodejsStreamOutputAdapter} the nodejs stream.
     */
    toNodejsStream : function (updateCb) {
        utils.checkSupport("nodestream");
        if (this._outputType !== "nodebuffer") {
            // an object stream containing blob/arraybuffer/uint8array/string
            // is strange and I don't know if it would be useful.
            // I you find this comment and have a good usecase, please open a
            // bug report !
            throw new Error(this._outputType + " is not supported by this method");
        }

        return new NodejsStreamOutputAdapter(this, {
            objectMode : this._outputType !== "nodebuffer"
        }, updateCb);
    }
};


module.exports = StreamHelper;

},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(require,module,exports){
'use strict';

exports.base64 = true;
exports.array = true;
exports.string = true;
exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
exports.nodebuffer = typeof Buffer !== "undefined";
// contains true if JSZip can read/generate Uint8Array, false otherwise.
exports.uint8array = typeof Uint8Array !== "undefined";

if (typeof ArrayBuffer === "undefined") {
    exports.blob = false;
}
else {
    var buffer = new ArrayBuffer(0);
    try {
        exports.blob = new Blob([buffer], {
            type: "application/zip"
        }).size === 0;
    }
    catch (e) {
        try {
            var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
            var builder = new Builder();
            builder.append(buffer);
            exports.blob = builder.getBlob('application/zip').size === 0;
        }
        catch (e) {
            exports.blob = false;
        }
    }
}

try {
    exports.nodestream = !!require('readable-stream').Readable;
} catch(e) {
    exports.nodestream = false;
}

},{"readable-stream":16}],31:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var support = require('./support');
var nodejsUtils = require('./nodejsUtils');
var GenericWorker = require('./stream/GenericWorker');

/**
 * The following functions come from pako, from pako/lib/utils/strings
 * released under the MIT license, see pako https://github.com/nodeca/pako/
 */

// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new Array(256);
for (var i=0; i<256; i++) {
  _utf8len[i] = (i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1);
}
_utf8len[254]=_utf8len[254]=1; // Invalid sequence start

// convert string to array (typed, when possible)
var string2buf = function (str) {
    var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

    // count binary size
    for (m_pos = 0; m_pos < str_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
            c2 = str.charCodeAt(m_pos+1);
            if ((c2 & 0xfc00) === 0xdc00) {
                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
                m_pos++;
            }
        }
        buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
    }

    // allocate buffer
    if (support.uint8array) {
        buf = new Uint8Array(buf_len);
    } else {
        buf = new Array(buf_len);
    }

    // convert
    for (i=0, m_pos = 0; i < buf_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
            c2 = str.charCodeAt(m_pos+1);
            if ((c2 & 0xfc00) === 0xdc00) {
                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
                m_pos++;
            }
        }
        if (c < 0x80) {
            /* one byte */
            buf[i++] = c;
        } else if (c < 0x800) {
            /* two bytes */
            buf[i++] = 0xC0 | (c >>> 6);
            buf[i++] = 0x80 | (c & 0x3f);
        } else if (c < 0x10000) {
            /* three bytes */
            buf[i++] = 0xE0 | (c >>> 12);
            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
            buf[i++] = 0x80 | (c & 0x3f);
        } else {
            /* four bytes */
            buf[i++] = 0xf0 | (c >>> 18);
            buf[i++] = 0x80 | (c >>> 12 & 0x3f);
            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
            buf[i++] = 0x80 | (c & 0x3f);
        }
    }

    return buf;
};

// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
var utf8border = function(buf, max) {
    var pos;

    max = max || buf.length;
    if (max > buf.length) { max = buf.length; }

    // go back from last position, until start of sequence found
    pos = max-1;
    while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

    // Fuckup - very small and broken sequence,
    // return max, because we should return something anyway.
    if (pos < 0) { return max; }

    // If we came to start of buffer - that means vuffer is too small,
    // return max too.
    if (pos === 0) { return max; }

    return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};

// convert array to string
var buf2string = function (buf) {
    var str, i, out, c, c_len;
    var len = buf.length;

    // Reserve max possible length (2 words per char)
    // NB: by unknown reasons, Array is significantly faster for
    //     String.fromCharCode.apply than Uint16Array.
    var utf16buf = new Array(len*2);

    for (out=0, i=0; i<len;) {
        c = buf[i++];
        // quick process ascii
        if (c < 0x80) { utf16buf[out++] = c; continue; }

        c_len = _utf8len[c];
        // skip 5 & 6 byte codes
        if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len-1; continue; }

        // apply mask on first byte
        c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
        // join the rest
        while (c_len > 1 && i < len) {
            c = (c << 6) | (buf[i++] & 0x3f);
            c_len--;
        }

        // terminated by end of string?
        if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

        if (c < 0x10000) {
            utf16buf[out++] = c;
        } else {
            c -= 0x10000;
            utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
            utf16buf[out++] = 0xdc00 | (c & 0x3ff);
        }
    }

    // shrinkBuf(utf16buf, out)
    if (utf16buf.length !== out) {
        if(utf16buf.subarray) {
            utf16buf = utf16buf.subarray(0, out);
        } else {
            utf16buf.length = out;
        }
    }

    // return String.fromCharCode.apply(null, utf16buf);
    return utils.applyFromCharCode(utf16buf);
};


// That's all for the pako functions.


/**
 * Transform a javascript string into an array (typed if possible) of bytes,
 * UTF-8 encoded.
 * @param {String} str the string to encode
 * @return {Array|Uint8Array|Buffer} the UTF-8 encoded string.
 */
exports.utf8encode = function utf8encode(str) {
    if (support.nodebuffer) {
        return nodejsUtils.newBufferFrom(str, "utf-8");
    }

    return string2buf(str);
};


/**
 * Transform a bytes array (or a representation) representing an UTF-8 encoded
 * string into a javascript string.
 * @param {Array|Uint8Array|Buffer} buf the data de decode
 * @return {String} the decoded string.
 */
exports.utf8decode = function utf8decode(buf) {
    if (support.nodebuffer) {
        return utils.transformTo("nodebuffer", buf).toString("utf-8");
    }

    buf = utils.transformTo(support.uint8array ? "uint8array" : "array", buf);

    return buf2string(buf);
};

/**
 * A worker to decode utf8 encoded binary chunks into string chunks.
 * @constructor
 */
function Utf8DecodeWorker() {
    GenericWorker.call(this, "utf-8 decode");
    // the last bytes if a chunk didn't end with a complete codepoint.
    this.leftOver = null;
}
utils.inherits(Utf8DecodeWorker, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
Utf8DecodeWorker.prototype.processChunk = function (chunk) {

    var data = utils.transformTo(support.uint8array ? "uint8array" : "array", chunk.data);

    // 1st step, re-use what's left of the previous chunk
    if (this.leftOver && this.leftOver.length) {
        if(support.uint8array) {
            var previousData = data;
            data = new Uint8Array(previousData.length + this.leftOver.length);
            data.set(this.leftOver, 0);
            data.set(previousData, this.leftOver.length);
        } else {
            data = this.leftOver.concat(data);
        }
        this.leftOver = null;
    }

    var nextBoundary = utf8border(data);
    var usableData = data;
    if (nextBoundary !== data.length) {
        if (support.uint8array) {
            usableData = data.subarray(0, nextBoundary);
            this.leftOver = data.subarray(nextBoundary, data.length);
        } else {
            usableData = data.slice(0, nextBoundary);
            this.leftOver = data.slice(nextBoundary, data.length);
        }
    }

    this.push({
        data : exports.utf8decode(usableData),
        meta : chunk.meta
    });
};

/**
 * @see GenericWorker.flush
 */
Utf8DecodeWorker.prototype.flush = function () {
    if(this.leftOver && this.leftOver.length) {
        this.push({
            data : exports.utf8decode(this.leftOver),
            meta : {}
        });
        this.leftOver = null;
    }
};
exports.Utf8DecodeWorker = Utf8DecodeWorker;

/**
 * A worker to endcode string chunks into utf8 encoded binary chunks.
 * @constructor
 */
function Utf8EncodeWorker() {
    GenericWorker.call(this, "utf-8 encode");
}
utils.inherits(Utf8EncodeWorker, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
Utf8EncodeWorker.prototype.processChunk = function (chunk) {
    this.push({
        data : exports.utf8encode(chunk.data),
        meta : chunk.meta
    });
};
exports.Utf8EncodeWorker = Utf8EncodeWorker;

},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(require,module,exports){
'use strict';

var support = require('./support');
var base64 = require('./base64');
var nodejsUtils = require('./nodejsUtils');
var setImmediate = require('set-immediate-shim');
var external = require("./external");


/**
 * Convert a string that pass as a "binary string": it should represent a byte
 * array but may have > 255 char codes. Be sure to take only the first byte
 * and returns the byte array.
 * @param {String} str the string to transform.
 * @return {Array|Uint8Array} the string in a binary format.
 */
function string2binary(str) {
    var result = null;
    if (support.uint8array) {
      result = new Uint8Array(str.length);
    } else {
      result = new Array(str.length);
    }
    return stringToArrayLike(str, result);
}

/**
 * Create a new blob with the given content and the given type.
 * @param {String|ArrayBuffer} part the content to put in the blob. DO NOT use
 * an Uint8Array because the stock browser of android 4 won't accept it (it
 * will be silently converted to a string, "[object Uint8Array]").
 *
 * Use only ONE part to build the blob to avoid a memory leak in IE11 / Edge:
 * when a large amount of Array is used to create the Blob, the amount of
 * memory consumed is nearly 100 times the original data amount.
 *
 * @param {String} type the mime type of the blob.
 * @return {Blob} the created blob.
 */
exports.newBlob = function(part, type) {
    exports.checkSupport("blob");

    try {
        // Blob constructor
        return new Blob([part], {
            type: type
        });
    }
    catch (e) {

        try {
            // deprecated, browser only, old way
            var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
            var builder = new Builder();
            builder.append(part);
            return builder.getBlob(type);
        }
        catch (e) {

            // well, fuck ?!
            throw new Error("Bug : can't construct the Blob.");
        }
    }


};
/**
 * The identity function.
 * @param {Object} input the input.
 * @return {Object} the same input.
 */
function identity(input) {
    return input;
}

/**
 * Fill in an array with a string.
 * @param {String} str the string to use.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to fill in (will be mutated).
 * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated array.
 */
function stringToArrayLike(str, array) {
    for (var i = 0; i < str.length; ++i) {
        array[i] = str.charCodeAt(i) & 0xFF;
    }
    return array;
}

/**
 * An helper for the function arrayLikeToString.
 * This contains static information and functions that
 * can be optimized by the browser JIT compiler.
 */
var arrayToStringHelper = {
    /**
     * Transform an array of int into a string, chunk by chunk.
     * See the performances notes on arrayLikeToString.
     * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
     * @param {String} type the type of the array.
     * @param {Integer} chunk the chunk size.
     * @return {String} the resulting string.
     * @throws Error if the chunk is too big for the stack.
     */
    stringifyByChunk: function(array, type, chunk) {
        var result = [], k = 0, len = array.length;
        // shortcut
        if (len <= chunk) {
            return String.fromCharCode.apply(null, array);
        }
        while (k < len) {
            if (type === "array" || type === "nodebuffer") {
                result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
            }
            else {
                result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
            }
            k += chunk;
        }
        return result.join("");
    },
    /**
     * Call String.fromCharCode on every item in the array.
     * This is the naive implementation, which generate A LOT of intermediate string.
     * This should be used when everything else fail.
     * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
     * @return {String} the result.
     */
    stringifyByChar: function(array){
        var resultStr = "";
        for(var i = 0; i < array.length; i++) {
            resultStr += String.fromCharCode(array[i]);
        }
        return resultStr;
    },
    applyCanBeUsed : {
        /**
         * true if the browser accepts to use String.fromCharCode on Uint8Array
         */
        uint8array : (function () {
            try {
                return support.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
            } catch (e) {
                return false;
            }
        })(),
        /**
         * true if the browser accepts to use String.fromCharCode on nodejs Buffer.
         */
        nodebuffer : (function () {
            try {
                return support.nodebuffer && String.fromCharCode.apply(null, nodejsUtils.allocBuffer(1)).length === 1;
            } catch (e) {
                return false;
            }
        })()
    }
};

/**
 * Transform an array-like object to a string.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
 * @return {String} the result.
 */
function arrayLikeToString(array) {
    // Performances notes :
    // --------------------
    // String.fromCharCode.apply(null, array) is the fastest, see
    // see http://jsperf.com/converting-a-uint8array-to-a-string/2
    // but the stack is limited (and we can get huge arrays !).
    //
    // result += String.fromCharCode(array[i]); generate too many strings !
    //
    // This code is inspired by http://jsperf.com/arraybuffer-to-string-apply-performance/2
    // TODO : we now have workers that split the work. Do we still need that ?
    var chunk = 65536,
        type = exports.getTypeOf(array),
        canUseApply = true;
    if (type === "uint8array") {
        canUseApply = arrayToStringHelper.applyCanBeUsed.uint8array;
    } else if (type === "nodebuffer") {
        canUseApply = arrayToStringHelper.applyCanBeUsed.nodebuffer;
    }

    if (canUseApply) {
        while (chunk > 1) {
            try {
                return arrayToStringHelper.stringifyByChunk(array, type, chunk);
            } catch (e) {
                chunk = Math.floor(chunk / 2);
            }
        }
    }

    // no apply or chunk error : slow and painful algorithm
    // default browser on android 4.*
    return arrayToStringHelper.stringifyByChar(array);
}

exports.applyFromCharCode = arrayLikeToString;


/**
 * Copy the data from an array-like to an other array-like.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayFrom the origin array.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayTo the destination array which will be mutated.
 * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated destination array.
 */
function arrayLikeToArrayLike(arrayFrom, arrayTo) {
    for (var i = 0; i < arrayFrom.length; i++) {
        arrayTo[i] = arrayFrom[i];
    }
    return arrayTo;
}

// a matrix containing functions to transform everything into everything.
var transform = {};

// string to ?
transform["string"] = {
    "string": identity,
    "array": function(input) {
        return stringToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return transform["string"]["uint8array"](input).buffer;
    },
    "uint8array": function(input) {
        return stringToArrayLike(input, new Uint8Array(input.length));
    },
    "nodebuffer": function(input) {
        return stringToArrayLike(input, nodejsUtils.allocBuffer(input.length));
    }
};

// array to ?
transform["array"] = {
    "string": arrayLikeToString,
    "array": identity,
    "arraybuffer": function(input) {
        return (new Uint8Array(input)).buffer;
    },
    "uint8array": function(input) {
        return new Uint8Array(input);
    },
    "nodebuffer": function(input) {
        return nodejsUtils.newBufferFrom(input);
    }
};

// arraybuffer to ?
transform["arraybuffer"] = {
    "string": function(input) {
        return arrayLikeToString(new Uint8Array(input));
    },
    "array": function(input) {
        return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
    },
    "arraybuffer": identity,
    "uint8array": function(input) {
        return new Uint8Array(input);
    },
    "nodebuffer": function(input) {
        return nodejsUtils.newBufferFrom(new Uint8Array(input));
    }
};

// uint8array to ?
transform["uint8array"] = {
    "string": arrayLikeToString,
    "array": function(input) {
        return arrayLikeToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return input.buffer;
    },
    "uint8array": identity,
    "nodebuffer": function(input) {
        return nodejsUtils.newBufferFrom(input);
    }
};

// nodebuffer to ?
transform["nodebuffer"] = {
    "string": arrayLikeToString,
    "array": function(input) {
        return arrayLikeToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return transform["nodebuffer"]["uint8array"](input).buffer;
    },
    "uint8array": function(input) {
        return arrayLikeToArrayLike(input, new Uint8Array(input.length));
    },
    "nodebuffer": identity
};

/**
 * Transform an input into any type.
 * The supported output type are : string, array, uint8array, arraybuffer, nodebuffer.
 * If no output type is specified, the unmodified input will be returned.
 * @param {String} outputType the output type.
 * @param {String|Array|ArrayBuffer|Uint8Array|Buffer} input the input to convert.
 * @throws {Error} an Error if the browser doesn't support the requested output type.
 */
exports.transformTo = function(outputType, input) {
    if (!input) {
        // undefined, null, etc
        // an empty string won't harm.
        input = "";
    }
    if (!outputType) {
        return input;
    }
    exports.checkSupport(outputType);
    var inputType = exports.getTypeOf(input);
    var result = transform[inputType][outputType](input);
    return result;
};

/**
 * Return the type of the input.
 * The type will be in a format valid for JSZip.utils.transformTo : string, array, uint8array, arraybuffer.
 * @param {Object} input the input to identify.
 * @return {String} the (lowercase) type of the input.
 */
exports.getTypeOf = function(input) {
    if (typeof input === "string") {
        return "string";
    }
    if (Object.prototype.toString.call(input) === "[object Array]") {
        return "array";
    }
    if (support.nodebuffer && nodejsUtils.isBuffer(input)) {
        return "nodebuffer";
    }
    if (support.uint8array && input instanceof Uint8Array) {
        return "uint8array";
    }
    if (support.arraybuffer && input instanceof ArrayBuffer) {
        return "arraybuffer";
    }
};

/**
 * Throw an exception if the type is not supported.
 * @param {String} type the type to check.
 * @throws {Error} an Error if the browser doesn't support the requested type.
 */
exports.checkSupport = function(type) {
    var supported = support[type.toLowerCase()];
    if (!supported) {
        throw new Error(type + " is not supported by this platform");
    }
};

exports.MAX_VALUE_16BITS = 65535;
exports.MAX_VALUE_32BITS = -1; // well, "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF" is parsed as -1

/**
 * Prettify a string read as binary.
 * @param {string} str the string to prettify.
 * @return {string} a pretty string.
 */
exports.pretty = function(str) {
    var res = '',
        code, i;
    for (i = 0; i < (str || "").length; i++) {
        code = str.charCodeAt(i);
        res += '\\x' + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
    }
    return res;
};

/**
 * Defer the call of a function.
 * @param {Function} callback the function to call asynchronously.
 * @param {Array} args the arguments to give to the callback.
 */
exports.delay = function(callback, args, self) {
    setImmediate(function () {
        callback.apply(self || null, args || []);
    });
};

/**
 * Extends a prototype with an other, without calling a constructor with
 * side effects. Inspired by nodejs' `utils.inherits`
 * @param {Function} ctor the constructor to augment
 * @param {Function} superCtor the parent constructor to use
 */
exports.inherits = function (ctor, superCtor) {
    var Obj = function() {};
    Obj.prototype = superCtor.prototype;
    ctor.prototype = new Obj();
};

/**
 * Merge the objects passed as parameters into a new one.
 * @private
 * @param {...Object} var_args All objects to merge.
 * @return {Object} a new object with the data of the others.
 */
exports.extend = function() {
    var result = {}, i, attr;
    for (i = 0; i < arguments.length; i++) { // arguments is not enumerable in some browsers
        for (attr in arguments[i]) {
            if (arguments[i].hasOwnProperty(attr) && typeof result[attr] === "undefined") {
                result[attr] = arguments[i][attr];
            }
        }
    }
    return result;
};

/**
 * Transform arbitrary content into a Promise.
 * @param {String} name a name for the content being processed.
 * @param {Object} inputData the content to process.
 * @param {Boolean} isBinary true if the content is not an unicode string
 * @param {Boolean} isOptimizedBinaryString true if the string content only has one byte per character.
 * @param {Boolean} isBase64 true if the string content is encoded with base64.
 * @return {Promise} a promise in a format usable by JSZip.
 */
exports.prepareContent = function(name, inputData, isBinary, isOptimizedBinaryString, isBase64) {

    // if inputData is already a promise, this flatten it.
    var promise = external.Promise.resolve(inputData).then(function(data) {
        
        
        var isBlob = support.blob && (data instanceof Blob || ['[object File]', '[object Blob]'].indexOf(Object.prototype.toString.call(data)) !== -1);

        if (isBlob && typeof FileReader !== "undefined") {
            return new external.Promise(function (resolve, reject) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    resolve(e.target.result);
                };
                reader.onerror = function(e) {
                    reject(e.target.error);
                };
                reader.readAsArrayBuffer(data);
            });
        } else {
            return data;
        }
    });

    return promise.then(function(data) {
        var dataType = exports.getTypeOf(data);

        if (!dataType) {
            return external.Promise.reject(
                new Error("Can't read the data of '" + name + "'. Is it " +
                          "in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?")
            );
        }
        // special case : it's way easier to work with Uint8Array than with ArrayBuffer
        if (dataType === "arraybuffer") {
            data = exports.transformTo("uint8array", data);
        } else if (dataType === "string") {
            if (isBase64) {
                data = base64.decode(data);
            }
            else if (isBinary) {
                // optimizedBinaryString === true means that the file has already been filtered with a 0xFF mask
                if (isOptimizedBinaryString !== true) {
                    // this is a string, not in a base64 format.
                    // Be sure that this is a correct "binary string"
                    data = string2binary(data);
                }
            }
        }
        return data;
    });
};

},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"set-immediate-shim":54}],33:[function(require,module,exports){
'use strict';
var readerFor = require('./reader/readerFor');
var utils = require('./utils');
var sig = require('./signature');
var ZipEntry = require('./zipEntry');
var utf8 = require('./utf8');
var support = require('./support');
//  class ZipEntries {{{
/**
 * All the entries in the zip file.
 * @constructor
 * @param {Object} loadOptions Options for loading the stream.
 */
function ZipEntries(loadOptions) {
    this.files = [];
    this.loadOptions = loadOptions;
}
ZipEntries.prototype = {
    /**
     * Check that the reader is on the specified signature.
     * @param {string} expectedSignature the expected signature.
     * @throws {Error} if it is an other signature.
     */
    checkSignature: function(expectedSignature) {
        if (!this.reader.readAndCheckSignature(expectedSignature)) {
            this.reader.index -= 4;
            var signature = this.reader.readString(4);
            throw new Error("Corrupted zip or bug: unexpected signature " + "(" + utils.pretty(signature) + ", expected " + utils.pretty(expectedSignature) + ")");
        }
    },
    /**
     * Check if the given signature is at the given index.
     * @param {number} askedIndex the index to check.
     * @param {string} expectedSignature the signature to expect.
     * @return {boolean} true if the signature is here, false otherwise.
     */
    isSignature: function(askedIndex, expectedSignature) {
        var currentIndex = this.reader.index;
        this.reader.setIndex(askedIndex);
        var signature = this.reader.readString(4);
        var result = signature === expectedSignature;
        this.reader.setIndex(currentIndex);
        return result;
    },
    /**
     * Read the end of the central directory.
     */
    readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2);
        this.diskWithCentralDirStart = this.reader.readInt(2);
        this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
        this.centralDirRecords = this.reader.readInt(2);
        this.centralDirSize = this.reader.readInt(4);
        this.centralDirOffset = this.reader.readInt(4);

        this.zipCommentLength = this.reader.readInt(2);
        // warning : the encoding depends of the system locale
        // On a linux machine with LANG=en_US.utf8, this field is utf8 encoded.
        // On a windows machine, this field is encoded with the localized windows code page.
        var zipComment = this.reader.readData(this.zipCommentLength);
        var decodeParamType = support.uint8array ? "uint8array" : "array";
        // To get consistent behavior with the generation part, we will assume that
        // this is utf8 encoded unless specified otherwise.
        var decodeContent = utils.transformTo(decodeParamType, zipComment);
        this.zipComment = this.loadOptions.decodeFileName(decodeContent);
    },
    /**
     * Read the end of the Zip 64 central directory.
     * Not merged with the method readEndOfCentral :
     * The end of central can coexist with its Zip64 brother,
     * I don't want to read the wrong number of bytes !
     */
    readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8);
        this.reader.skip(4);
        // this.versionMadeBy = this.reader.readString(2);
        // this.versionNeeded = this.reader.readInt(2);
        this.diskNumber = this.reader.readInt(4);
        this.diskWithCentralDirStart = this.reader.readInt(4);
        this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
        this.centralDirRecords = this.reader.readInt(8);
        this.centralDirSize = this.reader.readInt(8);
        this.centralDirOffset = this.reader.readInt(8);

        this.zip64ExtensibleData = {};
        var extraDataSize = this.zip64EndOfCentralSize - 44,
            index = 0,
            extraFieldId,
            extraFieldLength,
            extraFieldValue;
        while (index < extraDataSize) {
            extraFieldId = this.reader.readInt(2);
            extraFieldLength = this.reader.readInt(4);
            extraFieldValue = this.reader.readData(extraFieldLength);
            this.zip64ExtensibleData[extraFieldId] = {
                id: extraFieldId,
                length: extraFieldLength,
                value: extraFieldValue
            };
        }
    },
    /**
     * Read the end of the Zip 64 central directory locator.
     */
    readBlockZip64EndOfCentralLocator: function() {
        this.diskWithZip64CentralDirStart = this.reader.readInt(4);
        this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
        this.disksCount = this.reader.readInt(4);
        if (this.disksCount > 1) {
            throw new Error("Multi-volumes zip are not supported");
        }
    },
    /**
     * Read the local files, based on the offset read in the central part.
     */
    readLocalFiles: function() {
        var i, file;
        for (i = 0; i < this.files.length; i++) {
            file = this.files[i];
            this.reader.setIndex(file.localHeaderOffset);
            this.checkSignature(sig.LOCAL_FILE_HEADER);
            file.readLocalPart(this.reader);
            file.handleUTF8();
            file.processAttributes();
        }
    },
    /**
     * Read the central directory.
     */
    readCentralDir: function() {
        var file;

        this.reader.setIndex(this.centralDirOffset);
        while (this.reader.readAndCheckSignature(sig.CENTRAL_FILE_HEADER)) {
            file = new ZipEntry({
                zip64: this.zip64
            }, this.loadOptions);
            file.readCentralPart(this.reader);
            this.files.push(file);
        }

        if (this.centralDirRecords !== this.files.length) {
            if (this.centralDirRecords !== 0 && this.files.length === 0) {
                // We expected some records but couldn't find ANY.
                // This is really suspicious, as if something went wrong.
                throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
            } else {
                // We found some records but not all.
                // Something is wrong but we got something for the user: no error here.
                // console.warn("expected", this.centralDirRecords, "records in central dir, got", this.files.length);
            }
        }
    },
    /**
     * Read the end of central directory.
     */
    readEndOfCentral: function() {
        var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);
        if (offset < 0) {
            // Check if the content is a truncated zip or complete garbage.
            // A "LOCAL_FILE_HEADER" is not required at the beginning (auto
            // extractible zip for example) but it can give a good hint.
            // If an ajax request was used without responseType, we will also
            // get unreadable data.
            var isGarbage = !this.isSignature(0, sig.LOCAL_FILE_HEADER);

            if (isGarbage) {
                throw new Error("Can't find end of central directory : is this a zip file ? " +
                                "If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
            } else {
                throw new Error("Corrupted zip: can't find end of central directory");
            }

        }
        this.reader.setIndex(offset);
        var endOfCentralDirOffset = offset;
        this.checkSignature(sig.CENTRAL_DIRECTORY_END);
        this.readBlockEndOfCentral();


        /* extract from the zip spec :
            4)  If one of the fields in the end of central directory
                record is too small to hold required data, the field
                should be set to -1 (0xFFFF or 0xFFFFFFFF) and the
                ZIP64 format record should be created.
            5)  The end of central directory record and the
                Zip64 end of central directory locator record must
                reside on the same disk when splitting or spanning
                an archive.
         */
        if (this.diskNumber === utils.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS || this.centralDirRecords === utils.MAX_VALUE_16BITS || this.centralDirSize === utils.MAX_VALUE_32BITS || this.centralDirOffset === utils.MAX_VALUE_32BITS) {
            this.zip64 = true;

            /*
            Warning : the zip64 extension is supported, but ONLY if the 64bits integer read from
            the zip file can fit into a 32bits integer. This cannot be solved : JavaScript represents
            all numbers as 64-bit double precision IEEE 754 floating point numbers.
            So, we have 53bits for integers and bitwise operations treat everything as 32bits.
            see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Bitwise_Operators
            and http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf section 8.5
            */

            // should look for a zip64 EOCD locator
            offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
            if (offset < 0) {
                throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
            }
            this.reader.setIndex(offset);
            this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
            this.readBlockZip64EndOfCentralLocator();

            // now the zip64 EOCD record
            if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, sig.ZIP64_CENTRAL_DIRECTORY_END)) {
                // console.warn("ZIP64 end of central directory not where expected.");
                this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
                if (this.relativeOffsetEndOfZip64CentralDir < 0) {
                    throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                }
            }
            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
            this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
            this.readBlockZip64EndOfCentral();
        }

        var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize;
        if (this.zip64) {
            expectedEndOfCentralDirOffset += 20; // end of central dir 64 locator
            expectedEndOfCentralDirOffset += 12 /* should not include the leading 12 bytes */ + this.zip64EndOfCentralSize;
        }

        var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset;

        if (extraBytes > 0) {
            // console.warn(extraBytes, "extra bytes at beginning or within zipfile");
            if (this.isSignature(endOfCentralDirOffset, sig.CENTRAL_FILE_HEADER)) {
                // The offsets seem wrong, but we have something at the specified offset.
                // So… we keep it.
            } else {
                // the offset is wrong, update the "zero" of the reader
                // this happens if data has been prepended (crx files for example)
                this.reader.zero = extraBytes;
            }
        } else if (extraBytes < 0) {
            throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.");
        }
    },
    prepareReader: function(data) {
        this.reader = readerFor(data);
    },
    /**
     * Read a zip file and create ZipEntries.
     * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
     */
    load: function(data) {
        this.prepareReader(data);
        this.readEndOfCentral();
        this.readCentralDir();
        this.readLocalFiles();
    }
};
// }}} end of ZipEntries
module.exports = ZipEntries;

},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utf8":31,"./utils":32,"./zipEntry":34}],34:[function(require,module,exports){
'use strict';
var readerFor = require('./reader/readerFor');
var utils = require('./utils');
var CompressedObject = require('./compressedObject');
var crc32fn = require('./crc32');
var utf8 = require('./utf8');
var compressions = require('./compressions');
var support = require('./support');

var MADE_BY_DOS = 0x00;
var MADE_BY_UNIX = 0x03;

/**
 * Find a compression registered in JSZip.
 * @param {string} compressionMethod the method magic to find.
 * @return {Object|null} the JSZip compression object, null if none found.
 */
var findCompression = function(compressionMethod) {
    for (var method in compressions) {
        if (!compressions.hasOwnProperty(method)) {
            continue;
        }
        if (compressions[method].magic === compressionMethod) {
            return compressions[method];
        }
    }
    return null;
};

// class ZipEntry {{{
/**
 * An entry in the zip file.
 * @constructor
 * @param {Object} options Options of the current file.
 * @param {Object} loadOptions Options for loading the stream.
 */
function ZipEntry(options, loadOptions) {
    this.options = options;
    this.loadOptions = loadOptions;
}
ZipEntry.prototype = {
    /**
     * say if the file is encrypted.
     * @return {boolean} true if the file is encrypted, false otherwise.
     */
    isEncrypted: function() {
        // bit 1 is set
        return (this.bitFlag & 0x0001) === 0x0001;
    },
    /**
     * say if the file has utf-8 filename/comment.
     * @return {boolean} true if the filename/comment is in utf-8, false otherwise.
     */
    useUTF8: function() {
        // bit 11 is set
        return (this.bitFlag & 0x0800) === 0x0800;
    },
    /**
     * Read the local part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readLocalPart: function(reader) {
        var compression, localExtraFieldsLength;

        // we already know everything from the central dir !
        // If the central dir data are false, we are doomed.
        // On the bright side, the local part is scary  : zip64, data descriptors, both, etc.
        // The less data we get here, the more reliable this should be.
        // Let's skip the whole header and dash to the data !
        reader.skip(22);
        // in some zip created on windows, the filename stored in the central dir contains \ instead of /.
        // Strangely, the filename here is OK.
        // I would love to treat these zip files as corrupted (see http://www.info-zip.org/FAQ.html#backslashes
        // or APPNOTE#4.4.17.1, "All slashes MUST be forward slashes '/'") but there are a lot of bad zip generators...
        // Search "unzip mismatching "local" filename continuing with "central" filename version" on
        // the internet.
        //
        // I think I see the logic here : the central directory is used to display
        // content and the local directory is used to extract the files. Mixing / and \
        // may be used to display \ to windows users and use / when extracting the files.
        // Unfortunately, this lead also to some issues : http://seclists.org/fulldisclosure/2009/Sep/394
        this.fileNameLength = reader.readInt(2);
        localExtraFieldsLength = reader.readInt(2); // can't be sure this will be the same as the central dir
        // the fileName is stored as binary data, the handleUTF8 method will take care of the encoding.
        this.fileName = reader.readData(this.fileNameLength);
        reader.skip(localExtraFieldsLength);

        if (this.compressedSize === -1 || this.uncompressedSize === -1) {
            throw new Error("Bug or corrupted zip : didn't get enough information from the central directory " + "(compressedSize === -1 || uncompressedSize === -1)");
        }

        compression = findCompression(this.compressionMethod);
        if (compression === null) { // no compression found
            throw new Error("Corrupted zip : compression " + utils.pretty(this.compressionMethod) + " unknown (inner file : " + utils.transformTo("string", this.fileName) + ")");
        }
        this.decompressed = new CompressedObject(this.compressedSize, this.uncompressedSize, this.crc32, compression, reader.readData(this.compressedSize));
    },

    /**
     * Read the central part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readCentralPart: function(reader) {
        this.versionMadeBy = reader.readInt(2);
        reader.skip(2);
        // this.versionNeeded = reader.readInt(2);
        this.bitFlag = reader.readInt(2);
        this.compressionMethod = reader.readString(2);
        this.date = reader.readDate();
        this.crc32 = reader.readInt(4);
        this.compressedSize = reader.readInt(4);
        this.uncompressedSize = reader.readInt(4);
        var fileNameLength = reader.readInt(2);
        this.extraFieldsLength = reader.readInt(2);
        this.fileCommentLength = reader.readInt(2);
        this.diskNumberStart = reader.readInt(2);
        this.internalFileAttributes = reader.readInt(2);
        this.externalFileAttributes = reader.readInt(4);
        this.localHeaderOffset = reader.readInt(4);

        if (this.isEncrypted()) {
            throw new Error("Encrypted zip are not supported");
        }

        // will be read in the local part, see the comments there
        reader.skip(fileNameLength);
        this.readExtraFields(reader);
        this.parseZIP64ExtraField(reader);
        this.fileComment = reader.readData(this.fileCommentLength);
    },

    /**
     * Parse the external file attributes and get the unix/dos permissions.
     */
    processAttributes: function () {
        this.unixPermissions = null;
        this.dosPermissions = null;
        var madeBy = this.versionMadeBy >> 8;

        // Check if we have the DOS directory flag set.
        // We look for it in the DOS and UNIX permissions
        // but some unknown platform could set it as a compatibility flag.
        this.dir = this.externalFileAttributes & 0x0010 ? true : false;

        if(madeBy === MADE_BY_DOS) {
            // first 6 bits (0 to 5)
            this.dosPermissions = this.externalFileAttributes & 0x3F;
        }

        if(madeBy === MADE_BY_UNIX) {
            this.unixPermissions = (this.externalFileAttributes >> 16) & 0xFFFF;
            // the octal permissions are in (this.unixPermissions & 0x01FF).toString(8);
        }

        // fail safe : if the name ends with a / it probably means a folder
        if (!this.dir && this.fileNameStr.slice(-1) === '/') {
            this.dir = true;
        }
    },

    /**
     * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
     * @param {DataReader} reader the reader to use.
     */
    parseZIP64ExtraField: function(reader) {

        if (!this.extraFields[0x0001]) {
            return;
        }

        // should be something, preparing the extra reader
        var extraReader = readerFor(this.extraFields[0x0001].value);

        // I really hope that these 64bits integer can fit in 32 bits integer, because js
        // won't let us have more.
        if (this.uncompressedSize === utils.MAX_VALUE_32BITS) {
            this.uncompressedSize = extraReader.readInt(8);
        }
        if (this.compressedSize === utils.MAX_VALUE_32BITS) {
            this.compressedSize = extraReader.readInt(8);
        }
        if (this.localHeaderOffset === utils.MAX_VALUE_32BITS) {
            this.localHeaderOffset = extraReader.readInt(8);
        }
        if (this.diskNumberStart === utils.MAX_VALUE_32BITS) {
            this.diskNumberStart = extraReader.readInt(4);
        }
    },
    /**
     * Read the central part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readExtraFields: function(reader) {
        var end = reader.index + this.extraFieldsLength,
            extraFieldId,
            extraFieldLength,
            extraFieldValue;

        if (!this.extraFields) {
            this.extraFields = {};
        }

        while (reader.index < end) {
            extraFieldId = reader.readInt(2);
            extraFieldLength = reader.readInt(2);
            extraFieldValue = reader.readData(extraFieldLength);

            this.extraFields[extraFieldId] = {
                id: extraFieldId,
                length: extraFieldLength,
                value: extraFieldValue
            };
        }
    },
    /**
     * Apply an UTF8 transformation if needed.
     */
    handleUTF8: function() {
        var decodeParamType = support.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) {
            this.fileNameStr = utf8.utf8decode(this.fileName);
            this.fileCommentStr = utf8.utf8decode(this.fileComment);
        } else {
            var upath = this.findExtraFieldUnicodePath();
            if (upath !== null) {
                this.fileNameStr = upath;
            } else {
                // ASCII text or unsupported code page
                var fileNameByteArray =  utils.transformTo(decodeParamType, this.fileName);
                this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);
            }

            var ucomment = this.findExtraFieldUnicodeComment();
            if (ucomment !== null) {
                this.fileCommentStr = ucomment;
            } else {
                // ASCII text or unsupported code page
                var commentByteArray =  utils.transformTo(decodeParamType, this.fileComment);
                this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);
            }
        }
    },

    /**
     * Find the unicode path declared in the extra field, if any.
     * @return {String} the unicode path, null otherwise.
     */
    findExtraFieldUnicodePath: function() {
        var upathField = this.extraFields[0x7075];
        if (upathField) {
            var extraReader = readerFor(upathField.value);

            // wrong version
            if (extraReader.readInt(1) !== 1) {
                return null;
            }

            // the crc of the filename changed, this field is out of date.
            if (crc32fn(this.fileName) !== extraReader.readInt(4)) {
                return null;
            }

            return utf8.utf8decode(extraReader.readData(upathField.length - 5));
        }
        return null;
    },

    /**
     * Find the unicode comment declared in the extra field, if any.
     * @return {String} the unicode comment, null otherwise.
     */
    findExtraFieldUnicodeComment: function() {
        var ucommentField = this.extraFields[0x6375];
        if (ucommentField) {
            var extraReader = readerFor(ucommentField.value);

            // wrong version
            if (extraReader.readInt(1) !== 1) {
                return null;
            }

            // the crc of the comment changed, this field is out of date.
            if (crc32fn(this.fileComment) !== extraReader.readInt(4)) {
                return null;
            }

            return utf8.utf8decode(extraReader.readData(ucommentField.length - 5));
        }
        return null;
    }
};
module.exports = ZipEntry;

},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(require,module,exports){
'use strict';

var StreamHelper = require('./stream/StreamHelper');
var DataWorker = require('./stream/DataWorker');
var utf8 = require('./utf8');
var CompressedObject = require('./compressedObject');
var GenericWorker = require('./stream/GenericWorker');

/**
 * A simple object representing a file in the zip file.
 * @constructor
 * @param {string} name the name of the file
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data
 * @param {Object} options the options of the file
 */
var ZipObject = function(name, data, options) {
    this.name = name;
    this.dir = options.dir;
    this.date = options.date;
    this.comment = options.comment;
    this.unixPermissions = options.unixPermissions;
    this.dosPermissions = options.dosPermissions;

    this._data = data;
    this._dataBinary = options.binary;
    // keep only the compression
    this.options = {
        compression : options.compression,
        compressionOptions : options.compressionOptions
    };
};

ZipObject.prototype = {
    /**
     * Create an internal stream for the content of this object.
     * @param {String} type the type of each chunk.
     * @return StreamHelper the stream.
     */
    internalStream: function (type) {
        var result = null, outputType = "string";
        try {
            if (!type) {
                throw new Error("No output type specified.");
            }
            outputType = type.toLowerCase();
            var askUnicodeString = outputType === "string" || outputType === "text";
            if (outputType === "binarystring" || outputType === "text") {
                outputType = "string";
            }
            result = this._decompressWorker();

            var isUnicodeString = !this._dataBinary;

            if (isUnicodeString && !askUnicodeString) {
                result = result.pipe(new utf8.Utf8EncodeWorker());
            }
            if (!isUnicodeString && askUnicodeString) {
                result = result.pipe(new utf8.Utf8DecodeWorker());
            }
        } catch (e) {
            result = new GenericWorker("error");
            result.error(e);
        }

        return new StreamHelper(result, outputType, "");
    },

    /**
     * Prepare the content in the asked type.
     * @param {String} type the type of the result.
     * @param {Function} onUpdate a function to call on each internal update.
     * @return Promise the promise of the result.
     */
    async: function (type, onUpdate) {
        return this.internalStream(type).accumulate(onUpdate);
    },

    /**
     * Prepare the content as a nodejs stream.
     * @param {String} type the type of each chunk.
     * @param {Function} onUpdate a function to call on each internal update.
     * @return Stream the stream.
     */
    nodeStream: function (type, onUpdate) {
        return this.internalStream(type || "nodebuffer").toNodejsStream(onUpdate);
    },

    /**
     * Return a worker for the compressed content.
     * @private
     * @param {Object} compression the compression object to use.
     * @param {Object} compressionOptions the options to use when compressing.
     * @return Worker the worker.
     */
    _compressWorker: function (compression, compressionOptions) {
        if (
            this._data instanceof CompressedObject &&
            this._data.compression.magic === compression.magic
        ) {
            return this._data.getCompressedWorker();
        } else {
            var result = this._decompressWorker();
            if(!this._dataBinary) {
                result = result.pipe(new utf8.Utf8EncodeWorker());
            }
            return CompressedObject.createWorkerFrom(result, compression, compressionOptions);
        }
    },
    /**
     * Return a worker for the decompressed content.
     * @private
     * @return Worker the worker.
     */
    _decompressWorker : function () {
        if (this._data instanceof CompressedObject) {
            return this._data.getContentWorker();
        } else if (this._data instanceof GenericWorker) {
            return this._data;
        } else {
            return new DataWorker(this._data);
        }
    }
};

var removedMethods = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"];
var removedFn = function () {
    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
};

for(var i = 0; i < removedMethods.length; i++) {
    ZipObject.prototype[removedMethods[i]] = removedFn;
}
module.exports = ZipObject;

},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(require,module,exports){
(function (global){
'use strict';
var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],37:[function(require,module,exports){
'use strict';
var immediate = require('immediate');

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["finally"] = function (callback) {
  if (typeof callback !== 'function') {
    return this;
  }
  var p = this.constructor;
  return this.then(resolve, reject);

  function resolve(value) {
    function yes () {
      return value;
    }
    return p.resolve(callback()).then(yes);
  }
  function reject(reason) {
    function no () {
      throw reason;
    }
    return p.resolve(callback()).then(no);
  }
};
Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }

  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}

Promise.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

Promise.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

Promise.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

Promise.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}

},{"immediate":36}],38:[function(require,module,exports){
// Top level file is just a mixin of submodules & constants
'use strict';

var assign    = require('./lib/utils/common').assign;

var deflate   = require('./lib/deflate');
var inflate   = require('./lib/inflate');
var constants = require('./lib/zlib/constants');

var pako = {};

assign(pako, deflate, inflate, constants);

module.exports = pako;

},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(require,module,exports){
'use strict';


var zlib_deflate = require('./zlib/deflate');
var utils        = require('./utils/common');
var strings      = require('./utils/strings');
var msg          = require('./zlib/messages');
var ZStream      = require('./zlib/zstream');

var toString = Object.prototype.toString;

/* Public constants ==========================================================*/
/* ===========================================================================*/

var Z_NO_FLUSH      = 0;
var Z_FINISH        = 4;

var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_SYNC_FLUSH    = 2;

var Z_DEFAULT_COMPRESSION = -1;

var Z_DEFAULT_STRATEGY    = 0;

var Z_DEFLATED  = 8;

/* ===========================================================================*/


/**
 * class Deflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[deflate]],
 * [[deflateRaw]] and [[gzip]].
 **/

/* internal
 * Deflate.chunks -> Array
 *
 * Chunks of output data, if [[Deflate#onData]] not overridden.
 **/

/**
 * Deflate.result -> Uint8Array|Array
 *
 * Compressed result, generated by default [[Deflate#onData]]
 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
 * push a chunk with explicit flush (call [[Deflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Deflate.err -> Number
 *
 * Error code after deflate finished. 0 (Z_OK) on success.
 * You will not need it in real life, because deflate errors
 * are possible only on wrong options or bad `onData` / `onEnd`
 * custom handlers.
 **/

/**
 * Deflate.msg -> String
 *
 * Error message, if [[Deflate.err]] != 0
 **/


/**
 * new Deflate(options)
 * - options (Object): zlib deflate options.
 *
 * Creates new deflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `level`
 * - `windowBits`
 * - `memLevel`
 * - `strategy`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw deflate
 * - `gzip` (Boolean) - create gzip wrapper
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 * - `header` (Object) - custom header for gzip
 *   - `text` (Boolean) - true if compressed data believed to be text
 *   - `time` (Number) - modification time, unix timestamp
 *   - `os` (Number) - operation system code
 *   - `extra` (Array) - array of bytes with extra data (max 65536)
 *   - `name` (String) - file name (binary string)
 *   - `comment` (String) - comment (binary string)
 *   - `hcrc` (Boolean) - true if header crc should be added
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var deflate = new pako.Deflate({ level: 3});
 *
 * deflate.push(chunk1, false);
 * deflate.push(chunk2, true);  // true -> last chunk
 *
 * if (deflate.err) { throw new Error(deflate.err); }
 *
 * console.log(deflate.result);
 * ```
 **/
function Deflate(options) {
  if (!(this instanceof Deflate)) return new Deflate(options);

  this.options = utils.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY,
    to: ''
  }, options || {});

  var opt = this.options;

  if (opt.raw && (opt.windowBits > 0)) {
    opt.windowBits = -opt.windowBits;
  }

  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
    opt.windowBits += 16;
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm = new ZStream();
  this.strm.avail_out = 0;

  var status = zlib_deflate.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );

  if (status !== Z_OK) {
    throw new Error(msg[status]);
  }

  if (opt.header) {
    zlib_deflate.deflateSetHeader(this.strm, opt.header);
  }

  if (opt.dictionary) {
    var dict;
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      // If we need to compress text, change encoding to utf8.
      dict = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }

    status = zlib_deflate.deflateSetDictionary(this.strm, dict);

    if (status !== Z_OK) {
      throw new Error(msg[status]);
    }

    this._dict_set = true;
  }
}

/**
 * Deflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
 *   converted to utf8 byte sequence.
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
 *
 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
 * new compressed chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the compression context.
 *
 * On fail call [[Deflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * array format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Deflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;

  if (this.ended) { return false; }

  _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // If we need to compress text, change encoding to utf8.
    strm.input = strings.string2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */

    if (status !== Z_STREAM_END && status !== Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }
    if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
      if (this.options.to === 'string') {
        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
      } else {
        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
      }
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);

  // Finalize on the last chunk.
  if (_mode === Z_FINISH) {
    status = zlib_deflate.deflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === Z_SYNC_FLUSH) {
    this.onEnd(Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Deflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): output data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Deflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Deflate#onEnd(status) -> Void
 * - status (Number): deflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called once after you tell deflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Deflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === Z_OK) {
    if (this.options.to === 'string') {
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * deflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * Compress `data` with deflate algorithm and `options`.
 *
 * Supported options are:
 *
 * - level
 * - windowBits
 * - memLevel
 * - strategy
 * - dictionary
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
 *
 * console.log(pako.deflate(data));
 * ```
 **/
function deflate(input, options) {
  var deflator = new Deflate(options);

  deflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (deflator.err) { throw deflator.msg || msg[deflator.err]; }

  return deflator.result;
}


/**
 * deflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function deflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return deflate(input, options);
}


/**
 * gzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but create gzip wrapper instead of
 * deflate one.
 **/
function gzip(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate(input, options);
}


exports.Deflate = Deflate;
exports.deflate = deflate;
exports.deflateRaw = deflateRaw;
exports.gzip = gzip;

},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(require,module,exports){
'use strict';


var zlib_inflate = require('./zlib/inflate');
var utils        = require('./utils/common');
var strings      = require('./utils/strings');
var c            = require('./zlib/constants');
var msg          = require('./zlib/messages');
var ZStream      = require('./zlib/zstream');
var GZheader     = require('./zlib/gzheader');

var toString = Object.prototype.toString;

/**
 * class Inflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[inflate]]
 * and [[inflateRaw]].
 **/

/* internal
 * inflate.chunks -> Array
 *
 * Chunks of output data, if [[Inflate#onData]] not overridden.
 **/

/**
 * Inflate.result -> Uint8Array|Array|String
 *
 * Uncompressed result, generated by default [[Inflate#onData]]
 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
 * push a chunk with explicit flush (call [[Inflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Inflate.err -> Number
 *
 * Error code after inflate finished. 0 (Z_OK) on success.
 * Should be checked if broken data possible.
 **/

/**
 * Inflate.msg -> String
 *
 * Error message, if [[Inflate.err]] != 0
 **/


/**
 * new Inflate(options)
 * - options (Object): zlib inflate options.
 *
 * Creates new inflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `windowBits`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw inflate
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 * By default, when no options set, autodetect deflate/gzip data format via
 * wrapper header.
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var inflate = new pako.Inflate({ level: 3});
 *
 * inflate.push(chunk1, false);
 * inflate.push(chunk2, true);  // true -> last chunk
 *
 * if (inflate.err) { throw new Error(inflate.err); }
 *
 * console.log(inflate.result);
 * ```
 **/
function Inflate(options) {
  if (!(this instanceof Inflate)) return new Inflate(options);

  this.options = utils.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ''
  }, options || {});

  var opt = this.options;

  // Force window size for `raw` data, if not set directly,
  // because we have no header for autodetect.
  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) { opt.windowBits = -15; }
  }

  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
      !(options && options.windowBits)) {
    opt.windowBits += 32;
  }

  // Gzip header has no info about windows size, we can do autodetect only
  // for deflate. So, if window size not set, force it to max when gzip possible
  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
    // bit 3 (16) -> gzipped data
    // bit 4 (32) -> autodetect gzip/deflate
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm   = new ZStream();
  this.strm.avail_out = 0;

  var status  = zlib_inflate.inflateInit2(
    this.strm,
    opt.windowBits
  );

  if (status !== c.Z_OK) {
    throw new Error(msg[status]);
  }

  this.header = new GZheader();

  zlib_inflate.inflateGetHeader(this.strm, this.header);
}

/**
 * Inflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
 *
 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
 * new output chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
 *
 * On fail call [[Inflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Inflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var dictionary = this.options.dictionary;
  var status, _mode;
  var next_out_utf8, tail, utf8str;
  var dict;

  // Flag to properly process Z_BUF_ERROR on testing inflate call
  // when we check that all output data was flushed.
  var allowBufError = false;

  if (this.ended) { return false; }
  _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // Only binary strings can be decompressed on practice
    strm.input = strings.binstring2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

    if (status === c.Z_NEED_DICT && dictionary) {
      // Convert data if needed
      if (typeof dictionary === 'string') {
        dict = strings.string2buf(dictionary);
      } else if (toString.call(dictionary) === '[object ArrayBuffer]') {
        dict = new Uint8Array(dictionary);
      } else {
        dict = dictionary;
      }

      status = zlib_inflate.inflateSetDictionary(this.strm, dict);

    }

    if (status === c.Z_BUF_ERROR && allowBufError === true) {
      status = c.Z_OK;
      allowBufError = false;
    }

    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }

    if (strm.next_out) {
      if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {

        if (this.options.to === 'string') {

          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

          tail = strm.next_out - next_out_utf8;
          utf8str = strings.buf2string(strm.output, next_out_utf8);

          // move tail
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

          this.onData(utf8str);

        } else {
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
        }
      }
    }

    // When no more input data, we should check that internal inflate buffers
    // are flushed. The only way to do it when avail_out = 0 - run one more
    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
    // Here we set flag to process this error properly.
    //
    // NOTE. Deflate does not return error in this case and does not needs such
    // logic.
    if (strm.avail_in === 0 && strm.avail_out === 0) {
      allowBufError = true;
    }

  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

  if (status === c.Z_STREAM_END) {
    _mode = c.Z_FINISH;
  }

  // Finalize on the last chunk.
  if (_mode === c.Z_FINISH) {
    status = zlib_inflate.inflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === c.Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === c.Z_SYNC_FLUSH) {
    this.onEnd(c.Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Inflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): output data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Inflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Inflate#onEnd(status) -> Void
 * - status (Number): inflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called either after you tell inflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Inflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === c.Z_OK) {
    if (this.options.to === 'string') {
      // Glue & convert here, until we teach pako to send
      // utf8 aligned strings to onData
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * inflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Decompress `data` with inflate/ungzip and `options`. Autodetect
 * format via wrapper header by default. That's why we don't provide
 * separate `ungzip` method.
 *
 * Supported options are:
 *
 * - windowBits
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
 *   , output;
 *
 * try {
 *   output = pako.inflate(input);
 * } catch (err)
 *   console.log(err);
 * }
 * ```
 **/
function inflate(input, options) {
  var inflator = new Inflate(options);

  inflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (inflator.err) { throw inflator.msg || msg[inflator.err]; }

  return inflator.result;
}


/**
 * inflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * The same as [[inflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate(input, options);
}


/**
 * ungzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Just shortcut to [[inflate]], because it autodetects format
 * by header.content. Done for convenience.
 **/


exports.Inflate = Inflate;
exports.inflate = inflate;
exports.inflateRaw = inflateRaw;
exports.ungzip  = inflate;

},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(require,module,exports){
'use strict';


var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
                (typeof Uint16Array !== 'undefined') &&
                (typeof Int32Array !== 'undefined');


exports.assign = function (obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    var source = sources.shift();
    if (!source) { continue; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be non-object');
    }

    for (var p in source) {
      if (source.hasOwnProperty(p)) {
        obj[p] = source[p];
      }
    }
  }

  return obj;
};


// reduce buffer size, avoiding mem copy
exports.shrinkBuf = function (buf, size) {
  if (buf.length === size) { return buf; }
  if (buf.subarray) { return buf.subarray(0, size); }
  buf.length = size;
  return buf;
};


var fnTyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
      return;
    }
    // Fallback to ordinary array
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    var i, l, len, pos, chunk, result;

    // calculate data length
    len = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      len += chunks[i].length;
    }

    // join chunks
    result = new Uint8Array(len);
    pos = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }

    return result;
  }
};

var fnUntyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    return [].concat.apply([], chunks);
  }
};


// Enable/Disable typed arrays use, for testing
//
exports.setTyped = function (on) {
  if (on) {
    exports.Buf8  = Uint8Array;
    exports.Buf16 = Uint16Array;
    exports.Buf32 = Int32Array;
    exports.assign(exports, fnTyped);
  } else {
    exports.Buf8  = Array;
    exports.Buf16 = Array;
    exports.Buf32 = Array;
    exports.assign(exports, fnUntyped);
  }
};

exports.setTyped(TYPED_OK);

},{}],42:[function(require,module,exports){
// String encode/decode helpers
'use strict';


var utils = require('./common');


// Quick check if we can use fast array to bin string conversion
//
// - apply(Array) can fail on Android 2.2
// - apply(Uint8Array) can fail on iOS 5.1 Safary
//
var STR_APPLY_OK = true;
var STR_APPLY_UIA_OK = true;

try { String.fromCharCode.apply(null, [ 0 ]); } catch (__) { STR_APPLY_OK = false; }
try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new utils.Buf8(256);
for (var q = 0; q < 256; q++) {
  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
}
_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start


// convert string to array (typed, when possible)
exports.string2buf = function (str) {
  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

  // count binary size
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }

  // allocate buffer
  buf = new utils.Buf8(buf_len);

  // convert
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xC0 | (c >>> 6);
      buf[i++] = 0x80 | (c & 0x3f);
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xE0 | (c >>> 12);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | (c >>> 18);
      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    }
  }

  return buf;
};

// Helper (used in 2 places)
function buf2binstring(buf, len) {
  // use fallback for big arrays to avoid stack overflow
  if (len < 65537) {
    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
    }
  }

  var result = '';
  for (var i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}


// Convert byte array to binary string
exports.buf2binstring = function (buf) {
  return buf2binstring(buf, buf.length);
};


// Convert binary string (typed, when possible)
exports.binstring2buf = function (str) {
  var buf = new utils.Buf8(str.length);
  for (var i = 0, len = buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
};


// convert array to string
exports.buf2string = function (buf, max) {
  var i, out, c, c_len;
  var len = max || buf.length;

  // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.
  var utf16buf = new Array(len * 2);

  for (out = 0, i = 0; i < len;) {
    c = buf[i++];
    // quick process ascii
    if (c < 0x80) { utf16buf[out++] = c; continue; }

    c_len = _utf8len[c];
    // skip 5 & 6 byte codes
    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

    // apply mask on first byte
    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
    // join the rest
    while (c_len > 1 && i < len) {
      c = (c << 6) | (buf[i++] & 0x3f);
      c_len--;
    }

    // terminated by end of string?
    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
    }
  }

  return buf2binstring(utf16buf, out);
};


// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
exports.utf8border = function (buf, max) {
  var pos;

  max = max || buf.length;
  if (max > buf.length) { max = buf.length; }

  // go back from last position, until start of sequence found
  pos = max - 1;
  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

  // Fuckup - very small and broken sequence,
  // return max, because we should return something anyway.
  if (pos < 0) { return max; }

  // If we came to start of buffer - that means vuffer is too small,
  // return max too.
  if (pos === 0) { return max; }

  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};

},{"./common":41}],43:[function(require,module,exports){
'use strict';

// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It doesn't worth to make additional optimizationa as in original.
// Small size is preferable.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function adler32(adler, buf, len, pos) {
  var s1 = (adler & 0xffff) |0,
      s2 = ((adler >>> 16) & 0xffff) |0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
}


module.exports = adler32;

},{}],44:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {

  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH:         0,
  Z_PARTIAL_FLUSH:    1,
  Z_SYNC_FLUSH:       2,
  Z_FULL_FLUSH:       3,
  Z_FINISH:           4,
  Z_BLOCK:            5,
  Z_TREES:            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK:               0,
  Z_STREAM_END:       1,
  Z_NEED_DICT:        2,
  Z_ERRNO:           -1,
  Z_STREAM_ERROR:    -2,
  Z_DATA_ERROR:      -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR:       -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION:         0,
  Z_BEST_SPEED:             1,
  Z_BEST_COMPRESSION:       9,
  Z_DEFAULT_COMPRESSION:   -1,


  Z_FILTERED:               1,
  Z_HUFFMAN_ONLY:           2,
  Z_RLE:                    3,
  Z_FIXED:                  4,
  Z_DEFAULT_STRATEGY:       0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY:                 0,
  Z_TEXT:                   1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN:                2,

  /* The deflate compression method */
  Z_DEFLATED:               8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};

},{}],45:[function(require,module,exports){
'use strict';

// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// Use ordinary array, since untyped makes no boost here
function makeTable() {
  var c, table = [];

  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
  var t = crcTable,
      end = pos + len;

  crc ^= -1;

  for (var i = pos; i < end; i++) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
}


module.exports = crc32;

},{}],46:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils   = require('../utils/common');
var trees   = require('./trees');
var adler32 = require('./adler32');
var crc32   = require('./crc32');
var msg     = require('./messages');

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
var Z_NO_FLUSH      = 0;
var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
//var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
//var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
//var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;


/* compression levels */
//var Z_NO_COMPRESSION      = 0;
//var Z_BEST_SPEED          = 1;
//var Z_BEST_COMPRESSION    = 9;
var Z_DEFAULT_COMPRESSION = -1;


var Z_FILTERED            = 1;
var Z_HUFFMAN_ONLY        = 2;
var Z_RLE                 = 3;
var Z_FIXED               = 4;
var Z_DEFAULT_STRATEGY    = 0;

/* Possible values of the data_type field (though see inflate()) */
//var Z_BINARY              = 0;
//var Z_TEXT                = 1;
//var Z_ASCII               = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;


/* The deflate compression method */
var Z_DEFLATED  = 8;

/*============================================================================*/


var MAX_MEM_LEVEL = 9;
/* Maximum value for memLevel in deflateInit2 */
var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_MEM_LEVEL = 8;


var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */
var LITERALS      = 256;
/* number of literal bytes 0..255 */
var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */
var D_CODES       = 30;
/* number of distance codes */
var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */
var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */
var MAX_BITS  = 15;
/* All codes must not exceed MAX_BITS bits */

var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

var PRESET_DICT = 0x20;

var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;

var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
var BS_BLOCK_DONE     = 2; /* block flush performed */
var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

function err(strm, errorCode) {
  strm.msg = msg[errorCode];
  return errorCode;
}

function rank(f) {
  return ((f) << 1) - ((f) > 4 ? 9 : 0);
}

function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


/* =========================================================================
 * Flush as much pending output as possible. All deflate() output goes
 * through this function so some applications may wish to modify it
 * to avoid allocating a large strm->output buffer and copying into it.
 * (See also read_buf()).
 */
function flush_pending(strm) {
  var s = strm.state;

  //_tr_flush_bits(s);
  var len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) { return; }

  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
}


function flush_block_only(s, last) {
  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
}


function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}


/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
function putShortMSB(s, b) {
//  put_byte(s, (Byte)(b >> 8));
//  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
}


/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;

  if (len > size) { len = size; }
  if (len === 0) { return 0; }

  strm.avail_in -= len;

  // zmemcpy(buf, strm->next_in, len);
  utils.arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32(strm.adler, buf, len, start);
  }

  else if (strm.state.wrap === 2) {
    strm.adler = crc32(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;

  return len;
}


/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length;      /* max hash chain length */
  var scan = s.strstart; /* current string */
  var match;                       /* matched string */
  var len;                           /* length of current match */
  var best_len = s.prev_length;              /* best match length so far */
  var nice_match = s.nice_match;             /* stop if match long enough */
  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

  var _win = s.window; // shortcut

  var wmask = s.w_mask;
  var prev  = s.prev;

  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  var strend = s.strstart + MAX_MATCH;
  var scan_end1  = _win[scan + best_len - 1];
  var scan_end   = _win[scan + best_len];

  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;

    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len]     !== scan_end  ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match]                !== _win[scan] ||
        _win[++match]              !== _win[scan + 1]) {
      continue;
    }

    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
    scan += 2;
    match++;
    // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             scan < strend);

    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1  = _win[scan + best_len - 1];
      scan_end   = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
}


/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str;

  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart;

    // JS ints have 32 bit, block below not needed
    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}


    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */
      s.block_start -= _w_size;

      /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = (m >= _w_size ? m - _w_size : 0);
      } while (--n);

      n = _w_size;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
      } while (--n);

      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }

    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;

    /* Initialize the hash value now that we have some input: */
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];

      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
//#if MIN_MATCH != 3
//        Call update_hash() MIN_MATCH-3 more times
//#endif
      while (s.insert) {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
//  if (s.high_water < s.window_size) {
//    var curr = s.strstart + s.lookahead;
//    var init = 0;
//
//    if (s.high_water < curr) {
//      /* Previous high water mark below current data -- zero WIN_INIT
//       * bytes or up to end of window, whichever is less.
//       */
//      init = s.window_size - curr;
//      if (init > WIN_INIT)
//        init = WIN_INIT;
//      zmemzero(s->window + curr, (unsigned)init);
//      s->high_water = curr + init;
//    }
//    else if (s->high_water < (ulg)curr + WIN_INIT) {
//      /* High water mark at or above current data, but below current data
//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
//       * to end of window, whichever is less.
//       */
//      init = (ulg)curr + WIN_INIT - s->high_water;
//      if (init > s->window_size - s->high_water)
//        init = s->window_size - s->high_water;
//      zmemzero(s->window + s->high_water, (unsigned)init);
//      s->high_water += init;
//    }
//  }
//
//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
//    "not enough room for search");
}

/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 * This function does not insert new strings in the dictionary since
 * uncompressible data is probably not useful. This function is used
 * only for the level=0 compression option.
 * NOTE: this function should be optimized to avoid extra copying from
 * window to pending_buf.
 */
function deflate_stored(s, flush) {
  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
   * to pending_buf_size, and each stored block has a 5 byte header:
   */
  var max_block_size = 0xffff;

  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }

  /* Copy as much as possible from input to output: */
  for (;;) {
    /* Fill the window as much as possible: */
    if (s.lookahead <= 1) {

      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
      //  s->block_start >= (long)s->w_size, "slide too late");
//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
//        s.block_start >= s.w_size)) {
//        throw  new Error("slide too late");
//      }

      fill_window(s);
      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */
    }
    //Assert(s->block_start >= 0L, "block gone");
//    if (s.block_start < 0) throw new Error("block gone");

    s.strstart += s.lookahead;
    s.lookahead = 0;

    /* Emit a stored block if pending_buf will be full: */
    var max_start = s.block_start + max_block_size;

    if (s.strstart === 0 || s.strstart >= max_start) {
      /* strstart == 0 is possible when wraparound on 16-bit machine */
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/


    }
    /* Flush if we may have to slide, otherwise block_start may become
     * negative and the data will be gone:
     */
    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }

  s.insert = 0;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }

  if (s.strstart > s.block_start) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_NEED_MORE;
}

/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
function deflate_fast(s, flush) {
  var hash_head;        /* head of the hash chain */
  var bflush;           /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break; /* flush the current block */
      }
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }
    if (s.match_length >= MIN_MATCH) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;

      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
        s.match_length--; /* string at strstart already in table */
        do {
          s.strstart++;
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);
        s.strstart++;
      } else
      {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

//#if MIN_MATCH != 3
//                Call UPDATE_HASH() MIN_MATCH-3 more times
//#endif
        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
function deflate_slow(s, flush) {
  var hash_head;          /* head of hash chain */
  var bflush;              /* set if current block must be flushed */

  var max_insert;

  /* Process the input block. */
  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     */
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;

    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */

      if (s.match_length <= 5 &&
         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

        /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
        s.match_length = MIN_MATCH - 1;
      }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      /* Do not insert strings in hash table beyond this. */

      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  //Assert (flush != Z_NO_FLUSH, "no flush?");
  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_BLOCK_DONE;
}


/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
function deflate_rle(s, flush) {
  var bflush;            /* set if current block must be flushed */
  var prev;              /* byte at distance one to match */
  var scan, strend;      /* scan goes up to strend for length of run */

  var _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* See how many times the previous byte repeats */
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
    }

    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
    if (s.match_length >= MIN_MATCH) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
function deflate_huff(s, flush) {
  var bflush;             /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        break;      /* flush the current block */
      }
    }

    /* Output a literal byte */
    s.match_length = 0;
    //Tracevv((stderr,"%c", s->window[s->strstart]));
    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}

var configuration_table;

configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
];


/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
function lm_init(s) {
  s.window_size = 2 * s.w_size;

  /*** CLEAR_HASH(s); ***/
  zero(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;

  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
}


function DeflateState() {
  this.strm = null;            /* pointer back to this zlib stream */
  this.status = 0;            /* as the name implies */
  this.pending_buf = null;      /* output still pending */
  this.pending_buf_size = 0;  /* size of pending_buf */
  this.pending_out = 0;       /* next pending byte to output to the stream */
  this.pending = 0;           /* nb of bytes in the pending buffer */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.gzhead = null;         /* gzip header information to write */
  this.gzindex = 0;           /* where in extra, name, or comment */
  this.method = Z_DEFLATED; /* can only be DEFLATED */
  this.last_flush = -1;   /* value of flush param for previous deflate call */

  this.w_size = 0;  /* LZ77 window size (32K by default) */
  this.w_bits = 0;  /* log2(w_size)  (8..16) */
  this.w_mask = 0;  /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null;   /* Heads of the hash chains or NIL. */

  this.ins_h = 0;       /* hash index of string to be inserted */
  this.hash_size = 0;   /* number of elements in hash table */
  this.hash_bits = 0;   /* log2(hash_size) */
  this.hash_mask = 0;   /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0;      /* length of best match */
  this.prev_match = 0;        /* previous match */
  this.match_available = 0;   /* set if previous match exists */
  this.strstart = 0;          /* start of string to insert */
  this.match_start = 0;       /* start of matching string */
  this.lookahead = 0;         /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;
  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0;     /* compression level (1..9) */
  this.strategy = 0;  /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0; /* Stop searching when current match exceeds this */

              /* used by trees.c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */

  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective
  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
  this.dyn_dtree  = new utils.Buf16((2 * D_CODES + 1) * 2);
  this.bl_tree    = new utils.Buf16((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);

  this.l_desc   = null;         /* desc. for literal tree */
  this.d_desc   = null;         /* desc. for distance tree */
  this.bl_desc  = null;         /* desc. for bit length tree */

  //ush bl_count[MAX_BITS+1];
  this.bl_count = new utils.Buf16(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
  this.heap = new utils.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
  zero(this.heap);

  this.heap_len = 0;               /* number of elements in the heap */
  this.heap_max = 0;               /* element of largest frequency */
  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all trees.
   */

  this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
  zero(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.l_buf = 0;          /* buffer index for literals or lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.last_lit = 0;      /* running index in l_buf */

  this.d_buf = 0;
  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
   * the same number of elements. To use different lengths, an extra flag
   * array would be necessary.
   */

  this.opt_len = 0;       /* bit length of current block with optimal trees */
  this.static_len = 0;    /* bit length of current block with static trees */
  this.matches = 0;       /* number of string matches in current block */
  this.insert = 0;        /* bytes at end of window left to insert */


  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;
  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}


function deflateResetKeep(strm) {
  var s;

  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;

  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }
  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
  strm.adler = (s.wrap === 2) ?
    0  // crc32(0, Z_NULL, 0)
  :
    1; // adler32(0, Z_NULL, 0)
  s.last_flush = Z_NO_FLUSH;
  trees._tr_init(s);
  return Z_OK;
}


function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK) {
    lm_init(strm.state);
  }
  return ret;
}


function deflateSetHeader(strm, head) {
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
  strm.state.gzhead = head;
  return Z_OK;
}


function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) { // === Z_NULL
    return Z_STREAM_ERROR;
  }
  var wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION) {
    level = 6;
  }

  if (windowBits < 0) { /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  }

  else if (windowBits > 15) {
    wrap = 2;           /* write gzip wrapper instead */
    windowBits -= 16;
  }


  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
    strategy < 0 || strategy > Z_FIXED) {
    return err(strm, Z_STREAM_ERROR);
  }


  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */

  var s = new DeflateState();

  strm.state = s;
  s.strm = strm;

  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;

  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

  s.window = new utils.Buf8(s.w_size * 2);
  s.head = new utils.Buf16(s.hash_size);
  s.prev = new utils.Buf16(s.w_size);

  // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

  s.pending_buf_size = s.lit_bufsize * 4;

  //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
  //s->pending_buf = (uchf *) overlay;
  s.pending_buf = new utils.Buf8(s.pending_buf_size);

  // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
  //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
  s.d_buf = 1 * s.lit_bufsize;

  //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
  s.l_buf = (1 + 2) * s.lit_bufsize;

  s.level = level;
  s.strategy = strategy;
  s.method = method;

  return deflateReset(strm);
}

function deflateInit(strm, level) {
  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
}


function deflate(strm, flush) {
  var old_flush, s;
  var beg, val; // for gzip header write only

  if (!strm || !strm.state ||
    flush > Z_BLOCK || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
  }

  s = strm.state;

  if (!strm.output ||
      (!strm.input && strm.avail_in !== 0) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
  }

  s.strm = strm; /* just in case */
  old_flush = s.last_flush;
  s.last_flush = flush;

  /* Write the header */
  if (s.status === INIT_STATE) {

    if (s.wrap === 2) { // GZIP header
      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) { // s->gzhead == Z_NULL
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      }
      else {
        put_byte(s, (s.gzhead.text ? 1 : 0) +
                    (s.gzhead.hcrc ? 2 : 0) +
                    (!s.gzhead.extra ? 0 : 4) +
                    (!s.gzhead.name ? 0 : 8) +
                    (!s.gzhead.comment ? 0 : 16)
                );
        put_byte(s, s.gzhead.time & 0xff);
        put_byte(s, (s.gzhead.time >> 8) & 0xff);
        put_byte(s, (s.gzhead.time >> 16) & 0xff);
        put_byte(s, (s.gzhead.time >> 24) & 0xff);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, s.gzhead.os & 0xff);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 0xff);
          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    }
    else // DEFLATE header
    {
      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
      var level_flags = -1;

      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= (level_flags << 6);
      if (s.strstart !== 0) { header |= PRESET_DICT; }
      header += 31 - (header % 31);

      s.status = BUSY_STATE;
      putShortMSB(s, header);

      /* Save the adler32 of the preset dictionary: */
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 0xffff);
      }
      strm.adler = 1; // adler32(0L, Z_NULL, 0);
    }
  }

//#ifdef GZIP
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */

      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            break;
          }
        }
        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
        s.gzindex++;
      }
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (s.gzindex === s.gzhead.extra.length) {
        s.gzindex = 0;
        s.status = NAME_STATE;
      }
    }
    else {
      s.status = NAME_STATE;
    }
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.gzindex = 0;
        s.status = COMMENT_STATE;
      }
    }
    else {
      s.status = COMMENT_STATE;
    }
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.status = HCRC_STATE;
      }
    }
    else {
      s.status = HCRC_STATE;
    }
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }
      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, (strm.adler >> 8) & 0xff);
        strm.adler = 0; //crc32(0L, Z_NULL, 0);
        s.status = BUSY_STATE;
      }
    }
    else {
      s.status = BUSY_STATE;
    }
  }
//#endif

  /* Flush as much pending output as possible */
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK;
    }

    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
    flush !== Z_FINISH) {
    return err(strm, Z_BUF_ERROR);
  }

  /* User must not provide more input after the first FINISH: */
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR);
  }

  /* Start a new block or continue the current one.
   */
  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
        configuration_table[s.level].func(s, flush));

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }
      return Z_OK;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        trees._tr_align(s);
      }
      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

        trees._tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
        if (flush === Z_FULL_FLUSH) {
          /*** CLEAR_HASH(s); ***/             /* forget history */
          zero(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
        return Z_OK;
      }
    }
  }
  //Assert(strm->avail_out > 0, "bug2");
  //if (strm.avail_out <= 0) { throw new Error("bug2");}

  if (flush !== Z_FINISH) { return Z_OK; }
  if (s.wrap <= 0) { return Z_STREAM_END; }

  /* Write the trailer */
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, (strm.adler >> 8) & 0xff);
    put_byte(s, (strm.adler >> 16) & 0xff);
    put_byte(s, (strm.adler >> 24) & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, (strm.total_in >> 8) & 0xff);
    put_byte(s, (strm.total_in >> 16) & 0xff);
    put_byte(s, (strm.total_in >> 24) & 0xff);
  }
  else
  {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
  if (s.wrap > 0) { s.wrap = -s.wrap; }
  /* write the trailer only once! */
  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
}

function deflateEnd(strm) {
  var status;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  status = strm.state.status;
  if (status !== INIT_STATE &&
    status !== EXTRA_STATE &&
    status !== NAME_STATE &&
    status !== COMMENT_STATE &&
    status !== HCRC_STATE &&
    status !== BUSY_STATE &&
    status !== FINISH_STATE
  ) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.state = null;

  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
}


/* =========================================================================
 * Initializes the compression dictionary from the given byte
 * sequence without producing any compressed output.
 */
function deflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var s;
  var str, n;
  var wrap;
  var avail;
  var next;
  var input;
  var tmpDict;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  s = strm.state;
  wrap = s.wrap;

  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
    return Z_STREAM_ERROR;
  }

  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
  if (wrap === 1) {
    /* adler32(strm->adler, dictionary, dictLength); */
    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
  }

  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

  /* if dictionary would fill window, just replace the history */
  if (dictLength >= s.w_size) {
    if (wrap === 0) {            /* already empty otherwise */
      /*** CLEAR_HASH(s); ***/
      zero(s.head); // Fill with NIL (= 0);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    /* use the tail */
    // dictionary = dictionary.slice(dictLength - s.w_size);
    tmpDict = new utils.Buf8(s.w_size);
    utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  /* insert dictionary into window and hash */
  avail = strm.avail_in;
  next = strm.next_in;
  input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    str = s.strstart;
    n = s.lookahead - (MIN_MATCH - 1);
    do {
      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

      s.prev[str & s.w_mask] = s.head[s.ins_h];

      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK;
}


exports.deflateInit = deflateInit;
exports.deflateInit2 = deflateInit2;
exports.deflateReset = deflateReset;
exports.deflateResetKeep = deflateResetKeep;
exports.deflateSetHeader = deflateSetHeader;
exports.deflate = deflate;
exports.deflateEnd = deflateEnd;
exports.deflateSetDictionary = deflateSetDictionary;
exports.deflateInfo = 'pako deflate (from Nodeca project)';

/* Not implemented
exports.deflateBound = deflateBound;
exports.deflateCopy = deflateCopy;
exports.deflateParams = deflateParams;
exports.deflatePending = deflatePending;
exports.deflatePrime = deflatePrime;
exports.deflateTune = deflateTune;
*/

},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function GZheader() {
  /* true if compressed data believed to be text */
  this.text       = 0;
  /* modification time */
  this.time       = 0;
  /* extra flags (not used when writing a gzip file) */
  this.xflags     = 0;
  /* operating system */
  this.os         = 0;
  /* pointer to extra field or Z_NULL if none */
  this.extra      = null;
  /* extra field length (valid if extra != Z_NULL) */
  this.extra_len  = 0; // Actually, we don't need it in JS,
                       // but leave for few code modifications

  //
  // Setup limits is not necessary because in js we should not preallocate memory
  // for inflate use constant limit in 65536 bytes
  //

  /* space at extra (only when reading header) */
  // this.extra_max  = 0;
  /* pointer to zero-terminated file name or Z_NULL */
  this.name       = '';
  /* space at name (only when reading header) */
  // this.name_max   = 0;
  /* pointer to zero-terminated comment or Z_NULL */
  this.comment    = '';
  /* space at comment (only when reading header) */
  // this.comm_max   = 0;
  /* true if there was or will be a header crc */
  this.hcrc       = 0;
  /* true when done reading gzip header (not used when writing a gzip file) */
  this.done       = false;
}

module.exports = GZheader;

},{}],48:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// See state defs from inflate.js
var BAD = 30;       /* got a data error -- remain here until reset */
var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
module.exports = function inflate_fast(strm, start) {
  var state;
  var _in;                    /* local strm.input */
  var last;                   /* have enough input while in < last */
  var _out;                   /* local strm.output */
  var beg;                    /* inflate()'s initial strm.output */
  var end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  var dmax;                   /* maximum distance from zlib header */
//#endif
  var wsize;                  /* window size or zero if not using window */
  var whave;                  /* valid bytes in the window */
  var wnext;                  /* window write index */
  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
  var s_window;               /* allocated sliding window, if wsize != 0 */
  var hold;                   /* local strm.hold */
  var bits;                   /* local strm.bits */
  var lcode;                  /* local strm.lencode */
  var dcode;                  /* local strm.distcode */
  var lmask;                  /* mask for first level of length codes */
  var dmask;                  /* mask for first level of distance codes */
  var here;                   /* retrieved table entry */
  var op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  var len;                    /* match length, unused bytes */
  var dist;                   /* match distance */
  var from;                   /* where to copy match from */
  var from_source;


  var input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break top;
                }

// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = s_window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
};

},{}],49:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils         = require('../utils/common');
var adler32       = require('./adler32');
var crc32         = require('./crc32');
var inflate_fast  = require('./inffast');
var inflate_table = require('./inftrees');

var CODES = 0;
var LENS = 1;
var DISTS = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
//var Z_NO_FLUSH      = 0;
//var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
//var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;

/* The deflate compression method */
var Z_DEFLATED  = 8;


/* STATES ====================================================================*/
/* ===========================================================================*/


var    HEAD = 1;       /* i: waiting for magic header */
var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
var    TIME = 3;       /* i: waiting for modification time (gzip) */
var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
var    NAME = 7;       /* i: waiting for end of file name (gzip) */
var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
var    HCRC = 9;       /* i: waiting for header crc (gzip) */
var    DICTID = 10;    /* i: waiting for dictionary check value */
var    DICT = 11;      /* waiting for inflateSetDictionary() call */
var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
var        STORED = 14;    /* i: waiting for stored size (length and complement) */
var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
var        LENLENS = 18;   /* i: waiting for code length code lengths */
var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
var            LEN = 21;       /* i: waiting for length/lit/eob code */
var            LENEXT = 22;    /* i: waiting for length extra bits */
var            DIST = 23;      /* i: waiting for distance code */
var            DISTEXT = 24;   /* i: waiting for distance extra bits */
var            MATCH = 25;     /* o: waiting for output space to copy string */
var            LIT = 26;       /* o: waiting for output space to write literal */
var    CHECK = 27;     /* i: waiting for 32-bit check value */
var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
var    DONE = 29;      /* finished check, done -- remain here until reset */
var    BAD = 30;       /* got a data error -- remain here until reset */
var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_WBITS = MAX_WBITS;


function zswap32(q) {
  return  (((q >>> 24) & 0xff) +
          ((q >>> 8) & 0xff00) +
          ((q & 0xff00) << 8) +
          ((q & 0xff) << 24));
}


function InflateState() {
  this.mode = 0;             /* current inflate mode */
  this.last = false;          /* true if processing last block */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.havedict = false;      /* true if dictionary provided */
  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0;             /* protected copy of check value */
  this.total = 0;             /* protected copy of output count */
  // TODO: may be {}
  this.head = null;           /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0;             /* log base 2 of requested window size */
  this.wsize = 0;             /* window size or zero if not using window */
  this.whave = 0;             /* valid bytes in the window */
  this.wnext = 0;             /* window write index */
  this.window = null;         /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0;              /* input bit accumulator */
  this.bits = 0;              /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0;            /* literal or length of data to copy */
  this.offset = 0;            /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0;             /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null;          /* starting table for length/literal codes */
  this.distcode = null;         /* starting table for distance codes */
  this.lenbits = 0;           /* index bits for lencode */
  this.distbits = 0;          /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0;             /* number of code length code lengths */
  this.nlen = 0;              /* number of length code lengths */
  this.ndist = 0;             /* number of distance code lengths */
  this.have = 0;              /* number of code lengths in lens[] */
  this.next = null;              /* next available space in codes[] */

  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
  this.work = new utils.Buf16(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
  this.sane = 0;                   /* if false, allow invalid distance too far */
  this.back = 0;                   /* bits back of last unprocessed length/lit */
  this.was = 0;                    /* initial length of match */
}

function inflateResetKeep(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) {       /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null/*Z_NULL*/;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\n"));
  return Z_OK;
}

function inflateReset(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

}

function inflateReset2(strm, windowBits) {
  var wrap;
  var state;

  /* get the state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  }
  else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}

function inflateInit2(strm, windowBits) {
  var ret;
  var state;

  if (!strm) { return Z_STREAM_ERROR; }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));
  strm.state = state;
  state.window = null/*Z_NULL*/;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK) {
    strm.state = null/*Z_NULL*/;
  }
  return ret;
}

function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
var virgin = true;

var lenfix, distfix; // We have no pointers in JS, so keep tables separate

function fixedtables(state) {
  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    var sym;

    lenfix = new utils.Buf32(512);
    distfix = new utils.Buf32(32);

    /* literal/length table */
    sym = 0;
    while (sym < 144) { state.lens[sym++] = 8; }
    while (sym < 256) { state.lens[sym++] = 9; }
    while (sym < 280) { state.lens[sym++] = 7; }
    while (sym < 288) { state.lens[sym++] = 8; }

    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

    /* distance table */
    sym = 0;
    while (sym < 32) { state.lens[sym++] = 5; }

    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;

    state.window = new utils.Buf8(state.wsize);
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  }
  else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      utils.arraySet(state.window, src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    }
    else {
      state.wnext += dist;
      if (state.wnext === state.wsize) { state.wnext = 0; }
      if (state.whave < state.wsize) { state.whave += dist; }
    }
  }
  return 0;
}

function inflate(strm, flush) {
  var state;
  var input, output;          // input/output buffers
  var next;                   /* next input INDEX */
  var put;                    /* next output INDEX */
  var have, left;             /* available input and output */
  var hold;                   /* bit buffer */
  var bits;                   /* bits in bit buffer */
  var _in, _out;              /* save starting available input and output */
  var copy;                   /* number of stored or match bytes to copy */
  var from;                   /* where to copy match bytes from */
  var from_source;
  var here = 0;               /* current decoding table entry */
  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //var last;                   /* parent table entry */
  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  var len;                    /* length to copy for repeats, bits to drop */
  var ret;                    /* return code */
  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
  var opts;

  var n; // temporary var for NEED_BITS

  var order = /* permutation of code lengths */
    [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];


  if (!strm || !strm.state || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
    case HEAD:
      if (state.wrap === 0) {
        state.mode = TYPEDO;
        break;
      }
      //=== NEEDBITS(16);
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
        state.check = 0/*crc32(0L, Z_NULL, 0)*/;
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//

        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = FLAGS;
        break;
      }
      state.flags = 0;           /* expect zlib header */
      if (state.head) {
        state.head.done = false;
      }
      if (!(state.wrap & 1) ||   /* check if zlib header allowed */
        (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
        strm.msg = 'incorrect header check';
        state.mode = BAD;
        break;
      }
      if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
        strm.msg = 'unknown compression method';
        state.mode = BAD;
        break;
      }
      //--- DROPBITS(4) ---//
      hold >>>= 4;
      bits -= 4;
      //---//
      len = (hold & 0x0f)/*BITS(4)*/ + 8;
      if (state.wbits === 0) {
        state.wbits = len;
      }
      else if (len > state.wbits) {
        strm.msg = 'invalid window size';
        state.mode = BAD;
        break;
      }
      state.dmax = 1 << len;
      //Tracev((stderr, "inflate:   zlib header ok\n"));
      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
      state.mode = hold & 0x200 ? DICTID : TYPE;
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      break;
    case FLAGS:
      //=== NEEDBITS(16); */
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.flags = hold;
      if ((state.flags & 0xff) !== Z_DEFLATED) {
        strm.msg = 'unknown compression method';
        state.mode = BAD;
        break;
      }
      if (state.flags & 0xe000) {
        strm.msg = 'unknown header flags set';
        state.mode = BAD;
        break;
      }
      if (state.head) {
        state.head.text = ((hold >> 8) & 1);
      }
      if (state.flags & 0x0200) {
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = TIME;
      /* falls through */
    case TIME:
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if (state.head) {
        state.head.time = hold;
      }
      if (state.flags & 0x0200) {
        //=== CRC4(state.check, hold)
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        hbuf[2] = (hold >>> 16) & 0xff;
        hbuf[3] = (hold >>> 24) & 0xff;
        state.check = crc32(state.check, hbuf, 4, 0);
        //===
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = OS;
      /* falls through */
    case OS:
      //=== NEEDBITS(16); */
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if (state.head) {
        state.head.xflags = (hold & 0xff);
        state.head.os = (hold >> 8);
      }
      if (state.flags & 0x0200) {
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = EXLEN;
      /* falls through */
    case EXLEN:
      if (state.flags & 0x0400) {
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.length = hold;
        if (state.head) {
          state.head.extra_len = hold;
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
      }
      else if (state.head) {
        state.head.extra = null/*Z_NULL*/;
      }
      state.mode = EXTRA;
      /* falls through */
    case EXTRA:
      if (state.flags & 0x0400) {
        copy = state.length;
        if (copy > have) { copy = have; }
        if (copy) {
          if (state.head) {
            len = state.head.extra_len - state.length;
            if (!state.head.extra) {
              // Use untyped array for more conveniend processing later
              state.head.extra = new Array(state.head.extra_len);
            }
            utils.arraySet(
              state.head.extra,
              input,
              next,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              copy,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              len
            );
            //zmemcpy(state.head.extra + len, next,
            //        len + copy > state.head.extra_max ?
            //        state.head.extra_max - len : copy);
          }
          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          state.length -= copy;
        }
        if (state.length) { break inf_leave; }
      }
      state.length = 0;
      state.mode = NAME;
      /* falls through */
    case NAME:
      if (state.flags & 0x0800) {
        if (have === 0) { break inf_leave; }
        copy = 0;
        do {
          // TODO: 2 or 1 bytes?
          len = input[next + copy++];
          /* use constant limit because in js we should not preallocate memory */
          if (state.head && len &&
              (state.length < 65536 /*state.head.name_max*/)) {
            state.head.name += String.fromCharCode(len);
          }
        } while (len && copy < have);

        if (state.flags & 0x0200) {
          state.check = crc32(state.check, input, copy, next);
        }
        have -= copy;
        next += copy;
        if (len) { break inf_leave; }
      }
      else if (state.head) {
        state.head.name = null;
      }
      state.length = 0;
      state.mode = COMMENT;
      /* falls through */
    case COMMENT:
      if (state.flags & 0x1000) {
        if (have === 0) { break inf_leave; }
        copy = 0;
        do {
          len = input[next + copy++];
          /* use constant limit because in js we should not preallocate memory */
          if (state.head && len &&
              (state.length < 65536 /*state.head.comm_max*/)) {
            state.head.comment += String.fromCharCode(len);
          }
        } while (len && copy < have);
        if (state.flags & 0x0200) {
          state.check = crc32(state.check, input, copy, next);
        }
        have -= copy;
        next += copy;
        if (len) { break inf_leave; }
      }
      else if (state.head) {
        state.head.comment = null;
      }
      state.mode = HCRC;
      /* falls through */
    case HCRC:
      if (state.flags & 0x0200) {
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (hold !== (state.check & 0xffff)) {
          strm.msg = 'header crc mismatch';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
      }
      if (state.head) {
        state.head.hcrc = ((state.flags >> 9) & 1);
        state.head.done = true;
      }
      strm.adler = state.check = 0;
      state.mode = TYPE;
      break;
    case DICTID:
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      strm.adler = state.check = zswap32(hold);
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = DICT;
      /* falls through */
    case DICT:
      if (state.havedict === 0) {
        //--- RESTORE() ---
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        //---
        return Z_NEED_DICT;
      }
      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
      state.mode = TYPE;
      /* falls through */
    case TYPE:
      if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case TYPEDO:
      if (state.last) {
        //--- BYTEBITS() ---//
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        state.mode = CHECK;
        break;
      }
      //=== NEEDBITS(3); */
      while (bits < 3) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.last = (hold & 0x01)/*BITS(1)*/;
      //--- DROPBITS(1) ---//
      hold >>>= 1;
      bits -= 1;
      //---//

      switch ((hold & 0x03)/*BITS(2)*/) {
      case 0:                             /* stored block */
        //Tracev((stderr, "inflate:     stored block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = STORED;
        break;
      case 1:                             /* fixed block */
        fixedtables(state);
        //Tracev((stderr, "inflate:     fixed codes block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = LEN_;             /* decode codes */
        if (flush === Z_TREES) {
          //--- DROPBITS(2) ---//
          hold >>>= 2;
          bits -= 2;
          //---//
          break inf_leave;
        }
        break;
      case 2:                             /* dynamic block */
        //Tracev((stderr, "inflate:     dynamic codes block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = TABLE;
        break;
      case 3:
        strm.msg = 'invalid block type';
        state.mode = BAD;
      }
      //--- DROPBITS(2) ---//
      hold >>>= 2;
      bits -= 2;
      //---//
      break;
    case STORED:
      //--- BYTEBITS() ---// /* go to byte boundary */
      hold >>>= bits & 7;
      bits -= bits & 7;
      //---//
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
        strm.msg = 'invalid stored block lengths';
        state.mode = BAD;
        break;
      }
      state.length = hold & 0xffff;
      //Tracev((stderr, "inflate:       stored length %u\n",
      //        state.length));
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = COPY_;
      if (flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case COPY_:
      state.mode = COPY;
      /* falls through */
    case COPY:
      copy = state.length;
      if (copy) {
        if (copy > have) { copy = have; }
        if (copy > left) { copy = left; }
        if (copy === 0) { break inf_leave; }
        //--- zmemcpy(put, next, copy); ---
        utils.arraySet(output, input, next, copy, put);
        //---//
        have -= copy;
        next += copy;
        left -= copy;
        put += copy;
        state.length -= copy;
        break;
      }
      //Tracev((stderr, "inflate:       stored end\n"));
      state.mode = TYPE;
      break;
    case TABLE:
      //=== NEEDBITS(14); */
      while (bits < 14) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
      //--- DROPBITS(5) ---//
      hold >>>= 5;
      bits -= 5;
      //---//
      state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
      //--- DROPBITS(5) ---//
      hold >>>= 5;
      bits -= 5;
      //---//
      state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
      //--- DROPBITS(4) ---//
      hold >>>= 4;
      bits -= 4;
      //---//
//#ifndef PKZIP_BUG_WORKAROUND
      if (state.nlen > 286 || state.ndist > 30) {
        strm.msg = 'too many length or distance symbols';
        state.mode = BAD;
        break;
      }
//#endif
      //Tracev((stderr, "inflate:       table sizes ok\n"));
      state.have = 0;
      state.mode = LENLENS;
      /* falls through */
    case LENLENS:
      while (state.have < state.ncode) {
        //=== NEEDBITS(3);
        while (bits < 3) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
        //--- DROPBITS(3) ---//
        hold >>>= 3;
        bits -= 3;
        //---//
      }
      while (state.have < 19) {
        state.lens[order[state.have++]] = 0;
      }
      // We have separate tables & no pointers. 2 commented lines below not needed.
      //state.next = state.codes;
      //state.lencode = state.next;
      // Switch to use dynamic table
      state.lencode = state.lendyn;
      state.lenbits = 7;

      opts = { bits: state.lenbits };
      ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
      state.lenbits = opts.bits;

      if (ret) {
        strm.msg = 'invalid code lengths set';
        state.mode = BAD;
        break;
      }
      //Tracev((stderr, "inflate:       code lengths ok\n"));
      state.have = 0;
      state.mode = CODELENS;
      /* falls through */
    case CODELENS:
      while (state.have < state.nlen + state.ndist) {
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_val < 16) {
          //--- DROPBITS(here.bits) ---//
          hold >>>= here_bits;
          bits -= here_bits;
          //---//
          state.lens[state.have++] = here_val;
        }
        else {
          if (here_val === 16) {
            //=== NEEDBITS(here.bits + 2);
            n = here_bits + 2;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            if (state.have === 0) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }
            len = state.lens[state.have - 1];
            copy = 3 + (hold & 0x03);//BITS(2);
            //--- DROPBITS(2) ---//
            hold >>>= 2;
            bits -= 2;
            //---//
          }
          else if (here_val === 17) {
            //=== NEEDBITS(here.bits + 3);
            n = here_bits + 3;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            len = 0;
            copy = 3 + (hold & 0x07);//BITS(3);
            //--- DROPBITS(3) ---//
            hold >>>= 3;
            bits -= 3;
            //---//
          }
          else {
            //=== NEEDBITS(here.bits + 7);
            n = here_bits + 7;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            len = 0;
            copy = 11 + (hold & 0x7f);//BITS(7);
            //--- DROPBITS(7) ---//
            hold >>>= 7;
            bits -= 7;
            //---//
          }
          if (state.have + copy > state.nlen + state.ndist) {
            strm.msg = 'invalid bit length repeat';
            state.mode = BAD;
            break;
          }
          while (copy--) {
            state.lens[state.have++] = len;
          }
        }
      }

      /* handle error breaks in while */
      if (state.mode === BAD) { break; }

      /* check for end-of-block code (better have one) */
      if (state.lens[256] === 0) {
        strm.msg = 'invalid code -- missing end-of-block';
        state.mode = BAD;
        break;
      }

      /* build code tables -- note: do not change the lenbits or distbits
         values here (9 and 6) without reading the comments in inftrees.h
         concerning the ENOUGH constants, which depend on those values */
      state.lenbits = 9;

      opts = { bits: state.lenbits };
      ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
      // We have separate tables & no pointers. 2 commented lines below not needed.
      // state.next_index = opts.table_index;
      state.lenbits = opts.bits;
      // state.lencode = state.next;

      if (ret) {
        strm.msg = 'invalid literal/lengths set';
        state.mode = BAD;
        break;
      }

      state.distbits = 6;
      //state.distcode.copy(state.codes);
      // Switch to use dynamic table
      state.distcode = state.distdyn;
      opts = { bits: state.distbits };
      ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
      // We have separate tables & no pointers. 2 commented lines below not needed.
      // state.next_index = opts.table_index;
      state.distbits = opts.bits;
      // state.distcode = state.next;

      if (ret) {
        strm.msg = 'invalid distances set';
        state.mode = BAD;
        break;
      }
      //Tracev((stderr, 'inflate:       codes ok\n'));
      state.mode = LEN_;
      if (flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case LEN_:
      state.mode = LEN;
      /* falls through */
    case LEN:
      if (have >= 6 && left >= 258) {
        //--- RESTORE() ---
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        //---
        inflate_fast(strm, _out);
        //--- LOAD() ---
        put = strm.next_out;
        output = strm.output;
        left = strm.avail_out;
        next = strm.next_in;
        input = strm.input;
        have = strm.avail_in;
        hold = state.hold;
        bits = state.bits;
        //---

        if (state.mode === TYPE) {
          state.back = -1;
        }
        break;
      }
      state.back = 0;
      for (;;) {
        here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
        here_bits = here >>> 24;
        here_op = (here >>> 16) & 0xff;
        here_val = here & 0xffff;

        if (here_bits <= bits) { break; }
        //--- PULLBYTE() ---//
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
        //---//
      }
      if (here_op && (here_op & 0xf0) === 0) {
        last_bits = here_bits;
        last_op = here_op;
        last_val = here_val;
        for (;;) {
          here = state.lencode[last_val +
                  ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((last_bits + here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        //--- DROPBITS(last.bits) ---//
        hold >>>= last_bits;
        bits -= last_bits;
        //---//
        state.back += last_bits;
      }
      //--- DROPBITS(here.bits) ---//
      hold >>>= here_bits;
      bits -= here_bits;
      //---//
      state.back += here_bits;
      state.length = here_val;
      if (here_op === 0) {
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        state.mode = LIT;
        break;
      }
      if (here_op & 32) {
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.back = -1;
        state.mode = TYPE;
        break;
      }
      if (here_op & 64) {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break;
      }
      state.extra = here_op & 15;
      state.mode = LENEXT;
      /* falls through */
    case LENEXT:
      if (state.extra) {
        //=== NEEDBITS(state.extra);
        n = state.extra;
        while (bits < n) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
        //--- DROPBITS(state.extra) ---//
        hold >>>= state.extra;
        bits -= state.extra;
        //---//
        state.back += state.extra;
      }
      //Tracevv((stderr, "inflate:         length %u\n", state.length));
      state.was = state.length;
      state.mode = DIST;
      /* falls through */
    case DIST:
      for (;;) {
        here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
        here_bits = here >>> 24;
        here_op = (here >>> 16) & 0xff;
        here_val = here & 0xffff;

        if ((here_bits) <= bits) { break; }
        //--- PULLBYTE() ---//
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
        //---//
      }
      if ((here_op & 0xf0) === 0) {
        last_bits = here_bits;
        last_op = here_op;
        last_val = here_val;
        for (;;) {
          here = state.distcode[last_val +
                  ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((last_bits + here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        //--- DROPBITS(last.bits) ---//
        hold >>>= last_bits;
        bits -= last_bits;
        //---//
        state.back += last_bits;
      }
      //--- DROPBITS(here.bits) ---//
      hold >>>= here_bits;
      bits -= here_bits;
      //---//
      state.back += here_bits;
      if (here_op & 64) {
        strm.msg = 'invalid distance code';
        state.mode = BAD;
        break;
      }
      state.offset = here_val;
      state.extra = (here_op) & 15;
      state.mode = DISTEXT;
      /* falls through */
    case DISTEXT:
      if (state.extra) {
        //=== NEEDBITS(state.extra);
        n = state.extra;
        while (bits < n) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
        //--- DROPBITS(state.extra) ---//
        hold >>>= state.extra;
        bits -= state.extra;
        //---//
        state.back += state.extra;
      }
//#ifdef INFLATE_STRICT
      if (state.offset > state.dmax) {
        strm.msg = 'invalid distance too far back';
        state.mode = BAD;
        break;
      }
//#endif
      //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
      state.mode = MATCH;
      /* falls through */
    case MATCH:
      if (left === 0) { break inf_leave; }
      copy = _out - left;
      if (state.offset > copy) {         /* copy from window */
        copy = state.offset - copy;
        if (copy > state.whave) {
          if (state.sane) {
            strm.msg = 'invalid distance too far back';
            state.mode = BAD;
            break;
          }
// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//          Trace((stderr, "inflate.c too far\n"));
//          copy -= state.whave;
//          if (copy > state.length) { copy = state.length; }
//          if (copy > left) { copy = left; }
//          left -= copy;
//          state.length -= copy;
//          do {
//            output[put++] = 0;
//          } while (--copy);
//          if (state.length === 0) { state.mode = LEN; }
//          break;
//#endif
        }
        if (copy > state.wnext) {
          copy -= state.wnext;
          from = state.wsize - copy;
        }
        else {
          from = state.wnext - copy;
        }
        if (copy > state.length) { copy = state.length; }
        from_source = state.window;
      }
      else {                              /* copy from output */
        from_source = output;
        from = put - state.offset;
        copy = state.length;
      }
      if (copy > left) { copy = left; }
      left -= copy;
      state.length -= copy;
      do {
        output[put++] = from_source[from++];
      } while (--copy);
      if (state.length === 0) { state.mode = LEN; }
      break;
    case LIT:
      if (left === 0) { break inf_leave; }
      output[put++] = state.length;
      left--;
      state.mode = LEN;
      break;
    case CHECK:
      if (state.wrap) {
        //=== NEEDBITS(32);
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          // Use '|' insdead of '+' to make sure that result is signed
          hold |= input[next++] << bits;
          bits += 8;
        }
        //===//
        _out -= left;
        strm.total_out += _out;
        state.total += _out;
        if (_out) {
          strm.adler = state.check =
              /*UPDATE(state.check, put - _out, _out);*/
              (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

        }
        _out = left;
        // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
        if ((state.flags ? hold : zswap32(hold)) !== state.check) {
          strm.msg = 'incorrect data check';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        //Tracev((stderr, "inflate:   check matches trailer\n"));
      }
      state.mode = LENGTH;
      /* falls through */
    case LENGTH:
      if (state.wrap && state.flags) {
        //=== NEEDBITS(32);
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (hold !== (state.total & 0xffffffff)) {
          strm.msg = 'incorrect length check';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        //Tracev((stderr, "inflate:   length matches trailer\n"));
      }
      state.mode = DONE;
      /* falls through */
    case DONE:
      ret = Z_STREAM_END;
      break inf_leave;
    case BAD:
      ret = Z_DATA_ERROR;
      break inf_leave;
    case MEM:
      return Z_MEM_ERROR;
    case SYNC:
      /* falls through */
    default:
      return Z_STREAM_ERROR;
    }
  }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                      (state.mode < CHECK || flush !== Z_FINISH))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
                    (state.mode === TYPE ? 128 : 0) +
                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  return ret;
}

function inflateEnd(strm) {

  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
    return Z_STREAM_ERROR;
  }

  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK;
}

function inflateGetHeader(strm, head) {
  var state;

  /* check state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

  /* save header structure */
  state.head = head;
  head.done = false;
  return Z_OK;
}

function inflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var state;
  var dictid;
  var ret;

  /* check state */
  if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
  state = strm.state;

  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR;
  }

  /* check for correct dictionary identifier */
  if (state.mode === DICT) {
    dictid = 1; /* adler32(0, null, 0)*/
    /* dictid = adler32(dictid, dictionary, dictLength); */
    dictid = adler32(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR;
    }
  }
  /* copy dictionary to window using updatewindow(), which will amend the
   existing dictionary if appropriate */
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR;
  }
  state.havedict = 1;
  // Tracev((stderr, "inflate:   dictionary set\n"));
  return Z_OK;
}

exports.inflateReset = inflateReset;
exports.inflateReset2 = inflateReset2;
exports.inflateResetKeep = inflateResetKeep;
exports.inflateInit = inflateInit;
exports.inflateInit2 = inflateInit2;
exports.inflate = inflate;
exports.inflateEnd = inflateEnd;
exports.inflateGetHeader = inflateGetHeader;
exports.inflateSetDictionary = inflateSetDictionary;
exports.inflateInfo = 'pako inflate (from Nodeca project)';

/* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/

},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils = require('../utils/common');

var MAXBITS = 15;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

var lbase = [ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
];

var lext = [ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
];

var dbase = [ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
];

var dext = [ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
];

module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
{
  var bits = opts.bits;
      //here = opts.here; /* table entry for duplication */

  var len = 0;               /* a code's length in bits */
  var sym = 0;               /* index of code symbols */
  var min = 0, max = 0;          /* minimum and maximum code lengths */
  var root = 0;              /* number of index bits for root table */
  var curr = 0;              /* number of index bits for current table */
  var drop = 0;              /* code bits to drop for sub-table */
  var left = 0;                   /* number of prefix codes available */
  var used = 0;              /* code entries in table used */
  var huff = 0;              /* Huffman code */
  var incr;              /* for incrementing code, index */
  var fill;              /* index for replicating entries */
  var low;               /* low bits for current root entry */
  var mask;              /* mask for low root bits */
  var next;             /* next available space in table */
  var base = null;     /* base value table to use */
  var base_index = 0;
//  var shoextra;    /* extra bits table to use */
  var end;                    /* use base and extra for symbol > end */
  var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
  var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
  var extra = null;
  var extra_index = 0;

  var here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) { break; }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {                     /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0;     /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) { break; }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }        /* over-subscribed */
  }
  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;                      /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES) {
    base = extra = work;    /* dummy value--not used */
    end = 19;

  } else if (type === LENS) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;

  } else {                    /* DISTS */
    base = dbase;
    extra = dext;
    end = -1;
  }

  /* initialize opts for loop */
  huff = 0;                   /* starting code */
  sym = 0;                    /* starting code symbol */
  len = min;                  /* starting code length */
  next = table_index;              /* current table to fill in */
  curr = root;                /* current table index bits */
  drop = 0;                   /* current bits to drop from code for index */
  low = -1;                   /* trigger new sub-table when len > root */
  used = 1 << root;          /* use root table entries */
  mask = used - 1;            /* mask for comparing low */

  /* check available table space */
  if ((type === LENS && used > ENOUGH_LENS) ||
    (type === DISTS && used > ENOUGH_DISTS)) {
    return 1;
  }

  /* process all codes and make table entries */
  for (;;) {
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    }
    else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    }
    else {
      here_op = 32 + 64;         /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill;                 /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) { break; }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min;            /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) { break; }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS && used > ENOUGH_LENS) ||
        (type === DISTS && used > ENOUGH_DISTS)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
};

},{"../utils/common":41}],51:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {
  2:      'need dictionary',     /* Z_NEED_DICT       2  */
  1:      'stream end',          /* Z_STREAM_END      1  */
  0:      '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};

},{}],52:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils = require('../utils/common');

/* Public constants ==========================================================*/
/* ===========================================================================*/


//var Z_FILTERED          = 1;
//var Z_HUFFMAN_ONLY      = 2;
//var Z_RLE               = 3;
var Z_FIXED               = 4;
//var Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */
var Z_BINARY              = 0;
var Z_TEXT                = 1;
//var Z_ASCII             = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;

/*============================================================================*/


function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

// From zutil.h

var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES    = 2;
/* The three kinds of block type */

var MIN_MATCH    = 3;
var MAX_MATCH    = 258;
/* The minimum and maximum match lengths */

// From deflate.h
/* ===========================================================================
 * Internal compression state.
 */

var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */

var LITERALS      = 256;
/* number of literal bytes 0..255 */

var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */

var D_CODES       = 30;
/* number of distance codes */

var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */

var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */

var MAX_BITS      = 15;
/* All codes must not exceed MAX_BITS bits */

var Buf_size      = 16;
/* size of bit buffer in bi_buf */


/* ===========================================================================
 * Constants
 */

var MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

var END_BLOCK   = 256;
/* end of block literal code */

var REP_3_6     = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

var REPZ_3_10   = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

var REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

/* eslint-disable comma-spacing,array-bracket-spacing */
var extra_lbits =   /* extra bits for each length code */
  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

var extra_dbits =   /* extra bits for each distance code */
  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

var extra_blbits =  /* extra bits for each bit length code */
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

var bl_order =
  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
/* eslint-enable comma-spacing,array-bracket-spacing */

/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */

// We pre-fill arrays with 0 to avoid uninitialized gaps

var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

// !!!! Use flat array insdead of structure, Freq = i*2, Len = i*2+1
var static_ltree  = new Array((L_CODES + 2) * 2);
zero(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

var static_dtree  = new Array(D_CODES * 2);
zero(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

var _dist_code    = new Array(DIST_CODE_LEN);
zero(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
zero(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

var base_length   = new Array(LENGTH_CODES);
zero(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

var base_dist     = new Array(D_CODES);
zero(base_dist);
/* First normalized distance for each code (0 = distance of 1) */


function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

  this.static_tree  = static_tree;  /* static tree or NULL */
  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
  this.extra_base   = extra_base;   /* base index for extra_bits */
  this.elems        = elems;        /* max number of elements in the tree */
  this.max_length   = max_length;   /* max bit length for the codes */

  // show if `static_tree` has data or dummy - needed for monomorphic objects
  this.has_stree    = static_tree && static_tree.length;
}


var static_l_desc;
var static_d_desc;
var static_bl_desc;


function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;     /* the dynamic tree */
  this.max_code = 0;            /* largest code with non zero frequency */
  this.stat_desc = stat_desc;   /* the corresponding static tree */
}



function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}


/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
function put_short(s, w) {
//    put_byte(s, (uch)((w) & 0xff));
//    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = (w) & 0xff;
  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
}


/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
function send_bits(s, value, length) {
  if (s.bi_valid > (Buf_size - length)) {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> (Buf_size - s.bi_valid);
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    s.bi_valid += length;
  }
}


function send_code(s, c, tree) {
  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
}


/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}


/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;

  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}


/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
function gen_bitlen(s, desc)
//    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */
{
  var tree            = desc.dyn_tree;
  var max_code        = desc.max_code;
  var stree           = desc.stat_desc.static_tree;
  var has_stree       = desc.stat_desc.has_stree;
  var extra           = desc.stat_desc.extra_bits;
  var base            = desc.stat_desc.extra_base;
  var max_length      = desc.stat_desc.max_length;
  var h;              /* heap index */
  var n, m;           /* iterate over the tree elements */
  var bits;           /* bit length */
  var xbits;          /* extra bits */
  var f;              /* frequency */
  var overflow = 0;   /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS; bits++) {
    s.bl_count[bits] = 0;
  }

  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1]/*.Len*/ = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) { continue; } /* not a leaf node */

    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2]/*.Freq*/;
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
    }
  }
  if (overflow === 0) { return; }

  // Trace((stderr,"\nbit length overflow\n"));
  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) { bits--; }
    s.bl_count[bits]--;      /* move one leaf down the tree */
    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
  } while (overflow > 0);

  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) { continue; }
      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
        tree[m * 2 + 1]/*.Len*/ = bits;
      }
      n--;
    }
  }
}


/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
function gen_codes(tree, max_code, bl_count)
//    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */
{
  var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
  var code = 0;              /* running code value */
  var bits;                  /* bit index */
  var n;                     /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
  for (bits = 1; bits <= MAX_BITS; bits++) {
    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

  for (n = 0;  n <= max_code; n++) {
    var len = tree[n * 2 + 1]/*.Len*/;
    if (len === 0) { continue; }
    /* Now reverse the bits */
    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
}


/* ===========================================================================
 * Initialize the various 'constant' tables.
 */
function tr_static_init() {
  var n;        /* iterates over tree elements */
  var bits;     /* bit counter */
  var length;   /* length value */
  var code;     /* code value */
  var dist;     /* distance index */
  var bl_count = new Array(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */
/*#ifdef NO_INIT_GLOBAL_POINTERS
  static_l_desc.static_tree = static_ltree;
  static_l_desc.extra_bits = extra_lbits;
  static_d_desc.static_tree = static_dtree;
  static_d_desc.extra_bits = extra_dbits;
  static_bl_desc.extra_bits = extra_blbits;
#endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */
  length = 0;
  for (code = 0; code < LENGTH_CODES - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < (1 << extra_lbits[code]); n++) {
      _length_code[length++] = code;
    }
  }
  //Assert (length == 256, "tr_static_init: length != 256");
  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
  _length_code[length - 1] = code;

  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < (1 << extra_dbits[code]); n++) {
      _dist_code[dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: dist != 256");
  dist >>= 7; /* from now on, all distances are divided by 128 */
  for (; code < D_CODES; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */
  for (bits = 0; bits <= MAX_BITS; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1]/*.Len*/ = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1]/*.Len*/ = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
  gen_codes(static_ltree, L_CODES + 1, bl_count);

  /* The static distance tree is trivial: */
  for (n = 0; n < D_CODES; n++) {
    static_dtree[n * 2 + 1]/*.Len*/ = 5;
    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
  }

  // Now data ready and we can init static trees
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

  //static_init_done = true;
}


/* ===========================================================================
 * Initialize a new block.
 */
function init_block(s) {
  var n; /* iterates over tree elements */

  /* Initialize the trees. */
  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}


/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
function bi_windup(s)
{
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
}

/* ===========================================================================
 * Copy a stored block, storing first the length and its
 * one's complement if requested.
 */
function copy_block(s, buf, len, header)
//DeflateState *s;
//charf    *buf;    /* the input data */
//unsigned len;     /* its length */
//int      header;  /* true if block header must be written */
{
  bi_windup(s);        /* align on byte boundary */

  if (header) {
    put_short(s, len);
    put_short(s, ~len);
  }
//  while (len--) {
//    put_byte(s, *buf++);
//  }
  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}

/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
function smaller(tree, n, m, depth) {
  var _n2 = n * 2;
  var _m2 = m * 2;
  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
}

/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
function pqdownheap(s, tree, k)
//    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */
{
  var v = s.heap[k];
  var j = k << 1;  /* left son of k */
  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len &&
      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */
    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

    /* Exchange v with the smallest son */
    s.heap[k] = s.heap[j];
    k = j;

    /* And continue down the tree, setting j to the left son of k */
    j <<= 1;
  }
  s.heap[k] = v;
}


// inlined manually
// var SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
function compress_block(s, ltree, dtree)
//    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */
{
  var dist;           /* distance of matched string */
  var lc;             /* match length or unmatched char (if dist == 0) */
  var lx = 0;         /* running index in l_buf */
  var code;           /* the code to send */
  var extra;          /* number of extra bits to send */

  if (s.last_lit !== 0) {
    do {
      dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
      lc = s.pending_buf[s.l_buf + lx];
      lx++;

      if (dist === 0) {
        send_code(s, lc, ltree); /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code + LITERALS + 1, ltree); /* send the length code */
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);       /* send the extra length bits */
        }
        dist--; /* dist is now the match distance - 1 */
        code = d_code(dist);
        //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree);       /* send the distance code */
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);   /* send the extra distance bits */
        }
      } /* literal or match pair ? */

      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
      //       "pendingBuf overflow");

    } while (lx < s.last_lit);
  }

  send_code(s, END_BLOCK, ltree);
}


/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
function build_tree(s, desc)
//    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */
{
  var tree     = desc.dyn_tree;
  var stree    = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems    = desc.stat_desc.elems;
  var n, m;          /* iterate over heap elements */
  var max_code = -1; /* largest code with non zero frequency */
  var node;          /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2]/*.Freq*/ !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;

    } else {
      tree[n * 2 + 1]/*.Len*/ = 0;
    }
  }

  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[node * 2]/*.Freq*/ = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node * 2 + 1]/*.Len*/;
    }
    /* node is 0 or 1 so it does not have extra bits */
  }
  desc.max_code = max_code;

  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
  node = elems;              /* next internal node of the tree */
  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */
    /*** pqremove ***/
    n = s.heap[1/*SMALLEST*/];
    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1/*SMALLEST*/);
    /***/

    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
    s.heap[--s.heap_max] = m;

    /* Create a new node father of n and m */
    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

    /* and insert the new node in the heap */
    s.heap[1/*SMALLEST*/] = node++;
    pqdownheap(s, tree, 1/*SMALLEST*/);

  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
  gen_bitlen(s, desc);

  /* The field len is now set, we can generate the bit codes */
  gen_codes(tree, max_code, s.bl_count);
}


/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
function scan_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      s.bl_tree[curlen * 2]/*.Freq*/ += count;

    } else if (curlen !== 0) {

      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

    } else {
      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
function send_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  /* tree[max_code+1].Len = -1; */  /* guard already set */
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      //Assert(count >= 3 && count <= 6, " 3_6?");
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);

    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);

    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }

    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
function build_bl_tree(s) {
  var max_blindex;  /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

  /* Build the bit length tree: */
  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
}


/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
function send_all_trees(s, lcodes, dcodes, blcodes)
//    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
{
  var rank;                    /* index in bl_order */

  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\nbl counts: "));
  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
  send_bits(s, dcodes - 1,   5);
  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
  }
  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
}


/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "black list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
function detect_data_type(s) {
  /* black_mask is the bit mask of black-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  var black_mask = 0xf3ffc07f;
  var n;

  /* Check for non-textual ("black-listed") bytes. */
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
      return Z_BINARY;
    }
  }

  /* Check for textual ("white-listed") bytes. */
  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS; n++) {
    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
      return Z_TEXT;
    }
  }

  /* There are no "black-listed" or "white-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
  return Z_BINARY;
}


var static_init_done = false;

/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
function _tr_init(s)
{

  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

  s.bi_buf = 0;
  s.bi_valid = 0;

  /* Initialize the first block of the first file: */
  init_block(s);
}


/* ===========================================================================
 * Send a stored block
 */
function _tr_stored_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
  copy_block(s, buf, stored_len, true); /* with header */
}


/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
function _tr_align(s) {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}


/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and output the encoded block to the zip file.
 */
function _tr_flush_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
  var max_blindex = 0;        /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */
  if (s.level > 0) {

    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN) {
      s.strm.data_type = detect_data_type(s);
    }

    /* Construct the literal and distance trees */
    build_tree(s, s.l_desc);
    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc);
    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));
    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
    max_blindex = build_bl_tree(s);

    /* Determine the best encoding. Compute the block lengths in bytes. */
    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
    static_lenb = (s.static_len + 3 + 7) >>> 3;

    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->last_lit));

    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
  }

  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block(s, buf, stored_len, last);

  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);

  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
  init_block(s);

  if (last) {
    bi_windup(s);
  }
  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));
}

/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
function _tr_tally(s, dist, lc)
//    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
{
  //var out_length, in_length, dcode;

  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
  s.last_lit++;

  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc * 2]/*.Freq*/++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */
    dist--;             /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
  }

// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility

//#ifdef TRUNCATE_BLOCK
//  /* Try to guess if it is profitable to stop the current block here */
//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
//    /* Compute an upper bound for the compressed length */
//    out_length = s.last_lit*8;
//    in_length = s.strstart - s.block_start;
//
//    for (dcode = 0; dcode < D_CODES; dcode++) {
//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
//    }
//    out_length >>>= 3;
//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
//    //       s->last_lit, in_length, out_length,
//    //       100L - out_length*100L/in_length));
//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
//      return true;
//    }
//  }
//#endif

  return (s.last_lit === s.lit_bufsize - 1);
  /* We avoid equality with lit_bufsize because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */
}

exports._tr_init  = _tr_init;
exports._tr_stored_block = _tr_stored_block;
exports._tr_flush_block  = _tr_flush_block;
exports._tr_tally = _tr_tally;
exports._tr_align = _tr_align;

},{"../utils/common":41}],53:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

module.exports = ZStream;

},{}],54:[function(require,module,exports){
'use strict';
module.exports = typeof setImmediate === 'function' ? setImmediate :
	function setImmediate() {
		var args = [].slice.apply(arguments);
		args.splice(1, 0, 0);
		setTimeout.apply(null, args);
	};

},{}]},{},[10])(10)
});

if (IS_NODE_JS) { module = module4 };

(function(l){function m(b){b=void 0===b?"utf-8":b;if("utf-8"!==b)throw new RangeError("Failed to construct 'TextEncoder': The encoding label provided ('"+b+"') is invalid.");}function k(b,a){b='utf-8';b=void 0===b?"utf-8":b;a=void 0===a?{fatal:!1}:a;if("utf-8"!==b)throw new RangeError("Failed to construct 'TextDecoder': The encoding label provided ('"+b+"') is invalid.");if(a.fatal)throw Error("Failed to construct 'TextDecoder': the 'fatal' option is unsupported.");}if(l.TextEncoder&&l.TextDecoder)return!1;
Object.defineProperty(m.prototype,"encoding",{value:"utf-8"});m.prototype.encode=function(b,a){a=void 0===a?{stream:!1}:a;if(a.stream)throw Error("Failed to encode: the 'stream' option is unsupported.");a=0;for(var h=b.length,f=0,c=Math.max(32,h+(h>>1)+7),e=new Uint8Array(c>>3<<3);a<h;){var d=b.charCodeAt(a++);if(55296<=d&&56319>=d){if(a<h){var g=b.charCodeAt(a);56320===(g&64512)&&(++a,d=((d&1023)<<10)+(g&1023)+65536)}if(55296<=d&&56319>=d)continue}f+4>e.length&&(c+=8,c*=1+a/b.length*2,c=c>>3<<3,
g=new Uint8Array(c),g.set(e),e=g);if(0===(d&4294967168))e[f++]=d;else{if(0===(d&4294965248))e[f++]=d>>6&31|192;else if(0===(d&4294901760))e[f++]=d>>12&15|224,e[f++]=d>>6&63|128;else if(0===(d&4292870144))e[f++]=d>>18&7|240,e[f++]=d>>12&63|128,e[f++]=d>>6&63|128;else continue;e[f++]=d&63|128}}return e.slice(0,f)};Object.defineProperty(k.prototype,"encoding",{value:"utf-8"});Object.defineProperty(k.prototype,"fatal",{value:!1});Object.defineProperty(k.prototype,"ignoreBOM",{value:!1});k.prototype.decode=
function(b,a){a=void 0===a?{stream:!1}:a;if(a.stream)throw Error("Failed to decode: the 'stream' option is unsupported.");b=new Uint8Array(b);a=0;for(var h=b.length,f=[];a<h;){var c=b[a++];if(0===c)break;if(0===(c&128))f.push(c);else if(192===(c&224)){var e=b[a++]&63;f.push((c&31)<<6|e)}else if(224===(c&240)){e=b[a++]&63;var d=b[a++]&63;f.push((c&31)<<12|e<<6|d)}else if(240===(c&248)){e=b[a++]&63;d=b[a++]&63;var g=b[a++]&63;c=(c&7)<<18|e<<12|d<<6|g;65535<c&&(c-=65536,f.push(c>>>10&1023|55296),c=56320|
c&1023);f.push(c)}}return String.fromCharCode.apply(null,f)};l.TextEncoder=m;l.TextDecoder=k})("undefined"!==typeof window?window:"undefined"!==typeof module?module.exports:self);

if (IS_NODE_JS) { module = module5 };

const exportObj = "undefined"!==typeof window?(window.Comlink={}):"undefined"!==typeof module?module.exports:(self.Comlink={});
const windowy = ("undefined"!==typeof self) ? self : global;

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Symbol that gets added to objects by `Comlink.proxy()`.
 */
const proxyValueSymbol = Symbol("comlinkProxyValue");
/**
 * Returns true if the given value has the proxy value symbol added to it.
 */
const isProxyValue = (value) => !!value && value[proxyValueSymbol] === true;
const TRANSFERABLE_TYPES = ["ArrayBuffer", "MessagePort", "OffscreenCanvas"]
    .filter(f => f in windowy)
    .map(f => windowy[f]);
const uid = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
const throwSymbol = Symbol("throw");
const proxyTransferHandler = {
    canHandle: isProxyValue,
    serialize: (obj) => {
        const { port1, port2 } = new MessageChannel();
        expose(obj, port1);
        return port2;
    },
    deserialize: (obj) => {
        return proxy(obj);
    }
};
const throwTransferHandler = {
    canHandle: (obj) => obj && obj[throwSymbol],
    serialize: (obj) => {
        const message = obj && obj.message;
        const stack = obj && obj.stack;
        return Object.assign({}, obj, { message, stack });
    },
    deserialize: (obj) => {
        throw Object.assign(Error(), obj);
    }
};
const transferHandlers = new Map([
    ["PROXY", proxyTransferHandler],
    ["THROW", throwTransferHandler]
]);
let pingPongMessageCounter = 0;
function proxy(endpoint, target) {
    if (isWindow(endpoint))
        endpoint = windowEndpoint(endpoint);
    if (!isEndpoint(endpoint))
        throw Error("endpoint does not have all of addEventListener, removeEventListener and postMessage defined");
    activateEndpoint(endpoint);
    return cbProxy(async (irequest) => {
        let args = [];
        if (irequest.type === "APPLY" || irequest.type === "CONSTRUCT")
            args = irequest.argumentsList.map(wrapValue);
        const response = await pingPongMessage(endpoint, Object.assign({}, irequest, { argumentsList: args }), transferableProperties(args));
        const result = response.data;
        return unwrapValue(result.value);
    }, [], target);
}
function proxyValue(obj) {
    const proxyVal = obj;
    proxyVal[proxyValueSymbol] = true;
    return proxyVal;
}
function expose(rootObj, endpoint) {
    if (isWindow(endpoint))
        endpoint = windowEndpoint(endpoint);
    if (!isEndpoint(endpoint))
        throw Error("endpoint does not have all of addEventListener, removeEventListener and postMessage defined");
    activateEndpoint(endpoint);
    attachMessageHandler(endpoint, async function (event) {
        if (!event.data.id || !event.data.callPath)
            return;
        const irequest = event.data;
        let that = await irequest.callPath
            .slice(0, -1)
            .reduce((obj, propName) => obj[propName], rootObj);
        let obj = await irequest.callPath.reduce((obj, propName) => obj[propName], rootObj);
        let iresult = obj;
        let args = [];
        if (irequest.type === "APPLY" || irequest.type === "CONSTRUCT")
            args = irequest.argumentsList.map(unwrapValue);
        if (irequest.type === "APPLY") {
            if (typeof obj === 'function') {
                try {
                    iresult = await obj.apply(that, args);
                }
                catch (e) {
                    iresult = e;
                    iresult[throwSymbol] = true;
                }
            } else {
                if (args.length > 0) {
                    rootObj[args[0]] = args[1];
                    iresult = args[1];
                } else {
                    iresult = obj;
                }
            }
        }
        if (irequest.type === "CONSTRUCT") {
            try {
                iresult = new obj(...args); // eslint-disable-line new-cap
                iresult = proxyValue(iresult);
            }
            catch (e) {
                iresult = e;
                iresult[throwSymbol] = true;
            }
        }
        if (irequest.type === "SET") {
            obj[irequest.property] = irequest.value;
            // FIXME: ES6 Proxy Handler `set` methods are supposed to return a
            // boolean. To show good will, we return true asynchronously ¯\_(ツ)_/¯
            iresult = true;
        }
        iresult = makeInvocationResult(iresult);
        iresult.id = irequest.id;
        return endpoint.postMessage(iresult, transferableProperties([iresult]));
    });
}
function wrapValue(arg) {
    // Is arg itself handled by a TransferHandler?
    for (const [key, transferHandler] of transferHandlers) {
        if (transferHandler.canHandle(arg)) {
            return {
                type: key,
                value: transferHandler.serialize(arg)
            };
        }
    }
    // If not, traverse the entire object and find handled values.
    let wrappedChildren = [];
    for (const item of iterateAllProperties(arg)) {
        for (const [key, transferHandler] of transferHandlers) {
            if (transferHandler.canHandle(item.value)) {
                wrappedChildren.push({
                    path: item.path,
                    wrappedValue: {
                        type: key,
                        value: transferHandler.serialize(item.value)
                    }
                });
            }
        }
    }
    for (const wrappedChild of wrappedChildren) {
        const container = wrappedChild.path
            .slice(0, -1)
            .reduce((obj, key) => obj[key], arg);
        container[wrappedChild.path[wrappedChild.path.length - 1]] = null;
    }
    return {
        type: "RAW",
        value: arg,
        wrappedChildren
    };
}
function unwrapValue(arg) {
    if (transferHandlers.has(arg.type)) {
        const transferHandler = transferHandlers.get(arg.type);
        return transferHandler.deserialize(arg.value);
    }
    else if (isRawWrappedValue(arg)) {
        for (const wrappedChildValue of arg.wrappedChildren || []) {
            if (!transferHandlers.has(wrappedChildValue.wrappedValue.type))
                throw Error(`Unknown value type "${arg.type}" at ${wrappedChildValue.path.join(".")}`);
            const transferHandler = transferHandlers.get(wrappedChildValue.wrappedValue.type);
            const newValue = transferHandler.deserialize(wrappedChildValue.wrappedValue.value);
            replaceValueInObjectAtPath(arg.value, wrappedChildValue.path, newValue);
        }
        return arg.value;
    }
    else {
        throw Error(`Unknown value type "${arg.type}"`);
    }
}
function replaceValueInObjectAtPath(obj, path, newVal) {
    const lastKey = path.slice(-1)[0];
    const lastObj = path
        .slice(0, -1)
        .reduce((obj, key) => obj[key], obj);
    lastObj[lastKey] = newVal;
}
function isRawWrappedValue(arg) {
    return arg.type === "RAW";
}
function windowEndpoint(w) {
    if (self.constructor.name !== "Window")
        throw Error("self is not a window");
    return {
        addEventListener: self.addEventListener.bind(self),
        removeEventListener: self.removeEventListener.bind(self),
        postMessage: (msg, transfer) => w.postMessage(msg, "*", transfer)
    };
}
function isEndpoint(endpoint) {
    return ("addEventListener" in endpoint &&
        "removeEventListener" in endpoint &&
        "postMessage" in endpoint);
}
function activateEndpoint(endpoint) {
    if (isMessagePort(endpoint))
        endpoint.start();
}
function attachMessageHandler(endpoint, f) {
    // Checking all possible types of `endpoint` manually satisfies TypeScript’s
    // type checker. Not sure why the inference is failing here. Since it’s
    // unnecessary code I’m going to resort to `any` for now.
    // if(isWorker(endpoint))
    //   endpoint.addEventListener('message', f);
    // if(isMessagePort(endpoint))
    //   endpoint.addEventListener('message', f);
    // if(isOtherWindow(endpoint))
    //   endpoint.addEventListener('message', f);
    endpoint.addEventListener("message", f);
}
function detachMessageHandler(endpoint, f) {
    // Same as above.
    endpoint.removeEventListener("message", f);
}
function isMessagePort(endpoint) {
    return endpoint.constructor.name === "MessagePort";
}
function isWindow(endpoint) {
    // TODO: This doesn’t work on cross-origin iframes.
    // return endpoint.constructor.name === 'Window';
    return ["window", "length", "location", "parent", "opener"].every(prop => prop in endpoint);
}
/**
 * `pingPongMessage` sends a `postMessage` and waits for a reply. Replies are
 * identified by a unique id that is attached to the payload.
 */
function pingPongMessage(endpoint, msg, transferables) {
    const id = `${uid}-${pingPongMessageCounter++}`;
    return new Promise(resolve => {
        attachMessageHandler(endpoint, function handler(event) {
            if (event.data.id !== id)
                return;
            detachMessageHandler(endpoint, handler);
            resolve(event);
        });
        // Copy msg and add `id` property
        msg = Object.assign({}, msg, { id });
        endpoint.postMessage(msg, transferables);
    });
}
function cbProxy(cb, callPath = [], target = function () { }) {
    return new Proxy(target, {
        construct(_target, argumentsList, proxy) {
            return cb({
                type: "CONSTRUCT",
                callPath,
                argumentsList
            });
        },
        apply(_target, _thisArg, argumentsList) {
            // We use `bind` as an indicator to have a remote function bound locally.
            // The actual target for `bind()` is currently ignored.
            if (callPath[callPath.length - 1] === "bind")
                return cbProxy(cb, callPath.slice(0, -1));
            return cb({
                type: "APPLY",
                callPath,
                argumentsList
            });
        },
        get(_target, property, proxy) {
            if (property === "then" && callPath.length === 0) {
                return { then: () => proxy };
            }
            else if (property === "then") {
                const r = cb({
                    type: "GET",
                    callPath
                });
                return Promise.resolve(r).then.bind(r);
            }
            else {
                return cbProxy(cb, callPath.concat(property), _target[property]);
            }
        },
        set(_target, property, value, _proxy) {
            return cb({
                type: "SET",
                callPath,
                property,
                value
            });
        }
    });
}
function isTransferable(thing) {
    return TRANSFERABLE_TYPES.some(type => thing instanceof type);
}
function* iterateAllProperties(value, path = [], visited = null) {
    if (!value)
        return;
    if (!visited)
        visited = new WeakSet();
    if (visited.has(value))
        return;
    if (typeof value === "string")
        return;
    if (typeof value === "object")
        visited.add(value);
    if (ArrayBuffer.isView(value))
        return;
    yield { value, path };
    const keys = Object.keys(value);
    for (const key of keys)
        yield* iterateAllProperties(value[key], [...path, key], visited);
}
function transferableProperties(obj) {
    const r = [];
    for (const prop of iterateAllProperties(obj)) {
        if (isTransferable(prop.value))
            r.push(prop.value);
    }
    return r;
}
function makeInvocationResult(obj) {
    for (const [type, transferHandler] of transferHandlers) {
        if (transferHandler.canHandle(obj)) {
            const value = transferHandler.serialize(obj);
            return {
                value: { type, value }
            };
        }
    }
    return {
        value: {
            type: "RAW",
            value: obj
        }
    };
}

exportObj.proxyValueSymbol = proxyValueSymbol;
exportObj.transferHandlers = transferHandlers;
exportObj.proxy = proxy;
exportObj.proxyValue = proxyValue;
exportObj.expose = expose;
if (IS_NODE_JS) { module = module1 };

return Coldbrew;
})();
})();
