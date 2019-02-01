
var _Coldbrew_coldbrew_internal_ = (function() {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  return (
function(_Coldbrew_coldbrew_internal_) {
  _Coldbrew_coldbrew_internal_ = _Coldbrew_coldbrew_internal_ || {};

var Module = typeof _Coldbrew_coldbrew_internal_ !== "undefined" ? _Coldbrew_coldbrew_internal_ : {};
if (!Module.expectedDataFileDownloads) {
 Module.expectedDataFileDownloads = 0;
 Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
((function() {
 var loadPackage = (function(metadata) {
  var PACKAGE_PATH;
  if (typeof window === "object") {
   PACKAGE_PATH = window["encodeURIComponent"](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf("/")) + "/");
  } else if (typeof location !== "undefined") {
   PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf("/")) + "/");
  } else {
   throw "using preloaded data can only be done on a web page or in a web worker";
  }
  var PACKAGE_NAME = ""+Coldbrew._parseUrl(_scriptDir, "origin")+Coldbrew._parseUrl(_scriptDir, "pathname").split("/").slice(0, -1).join("/")+"/coldbrew.asm.data"+"";
  var REMOTE_PACKAGE_BASE = ""+Coldbrew._parseUrl(_scriptDir, "origin")+Coldbrew._parseUrl(_scriptDir, "pathname").split("/").slice(0, -1).join("/")+"/coldbrew.asm.data"+"";
  if (typeof Module["locateFilePackage"] === "function" && !Module["locateFile"]) {
   Module["locateFile"] = Module["locateFilePackage"];
   err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)");
  }
  var REMOTE_PACKAGE_NAME = Module["locateFile"] ? Module["locateFile"](REMOTE_PACKAGE_BASE, "") : REMOTE_PACKAGE_BASE;
  var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
  var PACKAGE_UUID = metadata.package_uuid;
  function fetchRemotePackage(packageName, packageSize, callback, errback) {
   var xhr = new XMLHttpRequest;
   xhr.open("GET", packageName, true);
   xhr.responseType = "arraybuffer";
   xhr.onprogress = (function(event) {
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
   });
   xhr.onerror = (function(event) {
    throw new Error("NetworkError for: " + packageName);
   });
   xhr.onload = (function(event) {
    if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || xhr.status == 0 && xhr.response) {
     var packageData = xhr.response;
     callback(packageData);
    } else {
     throw new Error(xhr.statusText + " : " + xhr.responseURL);
    }
   });
   xhr.send(null);
  }
  function handleError(error) {
   console.error("package error:", error);
  }
  var fetchedCallback = null;
  var fetched = Module["getPreloadedPackage"] ? Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;
  if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, (function(data) {
   if (fetchedCallback) {
    fetchedCallback(data);
    fetchedCallback = null;
   } else {
    fetched = data;
   }
  }), handleError);
  function runWithFS() {
   function assert(check, msg) {
    if (!check) throw msg + (new Error).stack;
   }
   Module["FS_createPath"]("/", "usr", true, true);
   Module["FS_createPath"]("/usr", "local", true, true);
   Module["FS_createPath"]("/usr/local", "lib", true, true);
   Module["FS_createPath"]("/usr/local/lib", "python3.5", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "xml", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/xml", "dom", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/xml", "etree", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/xml", "parsers", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/xml", "sax", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "site-packages", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "lib2to3", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/lib2to3", "pgen2", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/lib2to3", "fixes", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "xmlrpc", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "html", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "asyncio", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "unittest", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "multiprocessing", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/multiprocessing", "dummy", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "venv", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/venv", "scripts", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/venv/scripts", "posix", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "turtledemo", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "dbm", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "wsgiref", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "curses", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "encodings", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "http", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "collections", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "json", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "sqlite3", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/sqlite3", "test", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "urllib", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "importlib", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "ctypes", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/ctypes", "macholib", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/ctypes", "test", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "logging", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "email", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/email", "mime", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "concurrent", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/concurrent", "futures", true, true);
   Module["FS_createPath"]("/", "files", true, true);
   Module["FS_createPath"]("/files", "files", true, true);
   Module["FS_createPath"]("/", "coldbrew", true, true);
   Module["FS_createPath"]("/coldbrew", "examples", true, true);
   function DataRequest(start, end, audio) {
    this.start = start;
    this.end = end;
    this.audio = audio;
   }
   DataRequest.prototype = {
    requests: {},
    open: (function(mode, name) {
     this.name = name;
     this.requests[name] = this;
     Module["addRunDependency"]("fp " + this.name);
    }),
    send: (function() {}),
    onload: (function() {
     var byteArray = this.byteArray.subarray(this.start, this.end);
     this.finish(byteArray);
    }),
    finish: (function(byteArray) {
     var that = this;
     Module["FS_createDataFile"](this.name, null, byteArray, true, true, true);
     Module["removeRunDependency"]("fp " + that.name);
     this.requests[this.name] = null;
    })
   };
   var files = metadata.files;
   for (var i = 0; i < files.length; ++i) {
    (new DataRequest(files[i].start, files[i].end, files[i].audio)).open("GET", files[i].filename);
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
    Module["removeRunDependency"]("datafile_"+Coldbrew._parseUrl(_scriptDir, "origin")+Coldbrew._parseUrl(_scriptDir, "pathname").split("/").slice(0, -1).join("/")+"/coldbrew.asm.data"+"");
   }
   Module["addRunDependency"]("datafile_"+Coldbrew._parseUrl(_scriptDir, "origin")+Coldbrew._parseUrl(_scriptDir, "pathname").split("/").slice(0, -1).join("/")+"/coldbrew.asm.data"+"");
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
 });
 loadPackage({
  "files": [ {
   "filename": "/usr/local/lib/python3.5/functools.py",
   "start": 0,
   "end": 28776,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/plistlib.py",
   "start": 28776,
   "end": 60247,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/socketserver.py",
   "start": 60247,
   "end": 84913,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_threading_local.py",
   "start": 84913,
   "end": 92323,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/linecache.py",
   "start": 92323,
   "end": 97635,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/codeop.py",
   "start": 97635,
   "end": 103629,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/macurl2path.py",
   "start": 103629,
   "end": 106361,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/webbrowser.py",
   "start": 106361,
   "end": 127782,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/doctest.py",
   "start": 127782,
   "end": 231818,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/dummy_threading.py",
   "start": 231818,
   "end": 234633,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/uuid.py",
   "start": 234633,
   "end": 257894,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/weakref.py",
   "start": 257894,
   "end": 277302,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sre_constants.py",
   "start": 277302,
   "end": 283750,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pyclbr.py",
   "start": 283750,
   "end": 297314,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pipes.py",
   "start": 297314,
   "end": 306230,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_pydecimal.py",
   "start": 306230,
   "end": 534030,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/imaplib.py",
   "start": 534030,
   "end": 586003,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/operator.py",
   "start": 586003,
   "end": 596866,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_sitebuiltins.py",
   "start": 596866,
   "end": 599981,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/numbers.py",
   "start": 599981,
   "end": 610224,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_pyio.py",
   "start": 610224,
   "end": 698192,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/re.py",
   "start": 698192,
   "end": 713693,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/codecs.py",
   "start": 713693,
   "end": 749924,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/bz2.py",
   "start": 749924,
   "end": 762348,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/warnings.py",
   "start": 762348,
   "end": 778198,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/stat.py",
   "start": 778198,
   "end": 783236,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ssl.py",
   "start": 783236,
   "end": 825193,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/tarfile.py",
   "start": 825193,
   "end": 918121,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/selectors.py",
   "start": 918121,
   "end": 937289,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_osx_support.py",
   "start": 937289,
   "end": 956397,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pydoc.py",
   "start": 956397,
   "end": 1059631,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/colorsys.py",
   "start": 1059631,
   "end": 1063695,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_dummy_thread.py",
   "start": 1063695,
   "end": 1068813,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/csv.py",
   "start": 1068813,
   "end": 1084941,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_markupbase.py",
   "start": 1084941,
   "end": 1099539,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site.py",
   "start": 1099539,
   "end": 1120780,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/argparse.py",
   "start": 1120780,
   "end": 1210907,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/datetime.py",
   "start": 1210907,
   "end": 1286805,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/aifc.py",
   "start": 1286805,
   "end": 1318383,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sched.py",
   "start": 1318383,
   "end": 1324599,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/io.py",
   "start": 1324599,
   "end": 1327995,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/tabnanny.py",
   "start": 1327995,
   "end": 1339394,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/poplib.py",
   "start": 1339394,
   "end": 1353903,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ast.py",
   "start": 1353903,
   "end": 1365904,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_sysconfigdata.py",
   "start": 1365904,
   "end": 1386750,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/struct.py",
   "start": 1386750,
   "end": 1387007,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xdrlib.py",
   "start": 1387007,
   "end": 1392920,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/rlcompleter.py",
   "start": 1392920,
   "end": 1399227,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/copy.py",
   "start": 1399227,
   "end": 1408173,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_bootlocale.py",
   "start": 1408173,
   "end": 1409474,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_collections_abc.py",
   "start": 1409474,
   "end": 1434180,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/enum.py",
   "start": 1434180,
   "end": 1456406,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/token.py",
   "start": 1456406,
   "end": 1459481,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/imghdr.py",
   "start": 1459481,
   "end": 1463239,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/base64.py",
   "start": 1463239,
   "end": 1483681,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pprint.py",
   "start": 1483681,
   "end": 1504541,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/configparser.py",
   "start": 1504541,
   "end": 1557993,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/smtplib.py",
   "start": 1557993,
   "end": 1601588,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/string.py",
   "start": 1601588,
   "end": 1613442,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/nntplib.py",
   "start": 1613442,
   "end": 1656520,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sndhdr.py",
   "start": 1656520,
   "end": 1662938,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/keyword.py",
   "start": 1662938,
   "end": 1665149,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/getopt.py",
   "start": 1665149,
   "end": 1672638,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/signal.py",
   "start": 1672638,
   "end": 1674761,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/genericpath.py",
   "start": 1674761,
   "end": 1679125,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/tty.py",
   "start": 1679125,
   "end": 1680004,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/mimetypes.py",
   "start": 1680004,
   "end": 1700851,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/symbol.py",
   "start": 1700851,
   "end": 1702946,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/antigravity.py",
   "start": 1702946,
   "end": 1703421,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/typing.py",
   "start": 1703421,
   "end": 1762940,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/optparse.py",
   "start": 1762940,
   "end": 1823284,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/threading.py",
   "start": 1823284,
   "end": 1872202,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/shelve.py",
   "start": 1872202,
   "end": 1880730,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/mailbox.py",
   "start": 1880730,
   "end": 1959148,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sysconfig.py",
   "start": 1959148,
   "end": 1983487,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/code.py",
   "start": 1983487,
   "end": 1993605,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/cgitb.py",
   "start": 1993605,
   "end": 2005628,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/gettext.py",
   "start": 2005628,
   "end": 2023822,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/netrc.py",
   "start": 2023822,
   "end": 2029570,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pathlib.py",
   "start": 2029570,
   "end": 2076561,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/locale.py",
   "start": 2076561,
   "end": 2151274,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/binhex.py",
   "start": 2151274,
   "end": 2165228,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/inspect.py",
   "start": 2165228,
   "end": 2278546,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pkgutil.py",
   "start": 2278546,
   "end": 2299756,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/statistics.py",
   "start": 2299756,
   "end": 2319289,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/hmac.py",
   "start": 2319289,
   "end": 2324352,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/formatter.py",
   "start": 2324352,
   "end": 2339495,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/LICENSE.txt",
   "start": 2339495,
   "end": 2352262,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/abc.py",
   "start": 2352262,
   "end": 2360890,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sunau.py",
   "start": 2360890,
   "end": 2378985,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/shlex.py",
   "start": 2378985,
   "end": 2390406,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/opcode.py",
   "start": 2390406,
   "end": 2396291,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_compat_pickle.py",
   "start": 2396291,
   "end": 2404847,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/__phello__.foo.py",
   "start": 2404847,
   "end": 2404911,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/macpath.py",
   "start": 2404911,
   "end": 2410818,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/cProfile.py",
   "start": 2410818,
   "end": 2416131,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/filecmp.py",
   "start": 2416131,
   "end": 2425961,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/wave.py",
   "start": 2425961,
   "end": 2443643,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/mailcap.py",
   "start": 2443643,
   "end": 2451080,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/fnmatch.py",
   "start": 2451080,
   "end": 2454243,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pstats.py",
   "start": 2454243,
   "end": 2480559,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/runpy.py",
   "start": 2480559,
   "end": 2491953,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/queue.py",
   "start": 2491953,
   "end": 2500733,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/zipapp.py",
   "start": 2500733,
   "end": 2507890,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/tempfile.py",
   "start": 2507890,
   "end": 2534526,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/traceback.py",
   "start": 2534526,
   "end": 2556720,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/decimal.py",
   "start": 2556720,
   "end": 2557040,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/glob.py",
   "start": 2557040,
   "end": 2562112,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pickle.py",
   "start": 2562112,
   "end": 2617960,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pickletools.py",
   "start": 2617960,
   "end": 2709721,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/shutil.py",
   "start": 2709721,
   "end": 2749584,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/cgi.py",
   "start": 2749584,
   "end": 2785620,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/bdb.py",
   "start": 2785620,
   "end": 2808974,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtle.py",
   "start": 2808974,
   "end": 2952473,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/py_compile.py",
   "start": 2952473,
   "end": 2959654,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/stringprep.py",
   "start": 2959654,
   "end": 2972571,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/contextlib.py",
   "start": 2972571,
   "end": 2984832,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ipaddress.py",
   "start": 2984832,
   "end": 3060421,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/getpass.py",
   "start": 3060421,
   "end": 3066473,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pty.py",
   "start": 3066473,
   "end": 3071236,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/fractions.py",
   "start": 3071236,
   "end": 3095626,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/symtable.py",
   "start": 3095626,
   "end": 3102817,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/zipfile.py",
   "start": 3102817,
   "end": 3176489,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ntpath.py",
   "start": 3176489,
   "end": 3199282,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/profile.py",
   "start": 3199282,
   "end": 3221303,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_compression.py",
   "start": 3221303,
   "end": 3226643,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/smtpd.py",
   "start": 3226643,
   "end": 3262005,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/compileall.py",
   "start": 3262005,
   "end": 3273700,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/trace.py",
   "start": 3273700,
   "end": 3305241,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/chunk.py",
   "start": 3305241,
   "end": 3310666,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asynchat.py",
   "start": 3310666,
   "end": 3322637,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pdb.py",
   "start": 3322637,
   "end": 3383624,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/nturl2path.py",
   "start": 3383624,
   "end": 3386068,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/__future__.py",
   "start": 3386068,
   "end": 3390909,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/tracemalloc.py",
   "start": 3390909,
   "end": 3406550,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sre_compile.py",
   "start": 3406550,
   "end": 3424960,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sre_parse.py",
   "start": 3424960,
   "end": 3459924,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/copyreg.py",
   "start": 3459924,
   "end": 3466757,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/this.py",
   "start": 3466757,
   "end": 3467760,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/reprlib.py",
   "start": 3467760,
   "end": 3473096,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/subprocess.py",
   "start": 3473096,
   "end": 3541503,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/gzip.py",
   "start": 3541503,
   "end": 3561763,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/types.py",
   "start": 3561763,
   "end": 3570562,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/imp.py",
   "start": 3570562,
   "end": 3581193,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/hashlib.py",
   "start": 3581193,
   "end": 3589172,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/quopri.py",
   "start": 3589172,
   "end": 3596426,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/socket.py",
   "start": 3596426,
   "end": 3623521,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/calendar.py",
   "start": 3623521,
   "end": 3646462,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/platform.py",
   "start": 3646462,
   "end": 3694518,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/fileinput.py",
   "start": 3694518,
   "end": 3708777,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_strptime.py",
   "start": 3708777,
   "end": 3730962,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_weakrefset.py",
   "start": 3730962,
   "end": 3736667,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/tokenize.py",
   "start": 3736667,
   "end": 3764457,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/dis.py",
   "start": 3764457,
   "end": 3781807,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/crypt.py",
   "start": 3781807,
   "end": 3783686,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/uu.py",
   "start": 3783686,
   "end": 3790441,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/bisect.py",
   "start": 3790441,
   "end": 3793036,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/cmd.py",
   "start": 3793036,
   "end": 3807896,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncore.py",
   "start": 3807896,
   "end": 3828e3,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lzma.py",
   "start": 3828e3,
   "end": 3840925,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/timeit.py",
   "start": 3840925,
   "end": 3853317,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/os.py",
   "start": 3853317,
   "end": 3890287,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/posixpath.py",
   "start": 3890287,
   "end": 3905168,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/telnetlib.py",
   "start": 3905168,
   "end": 3928184,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/random.py",
   "start": 3928184,
   "end": 3954271,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ftplib.py",
   "start": 3954271,
   "end": 3989096,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/heapq.py",
   "start": 3989096,
   "end": 4012025,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/textwrap.py",
   "start": 4012025,
   "end": 4031679,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/difflib.py",
   "start": 4031679,
   "end": 4115879,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/modulefinder.py",
   "start": 4115879,
   "end": 4138964,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/__init__.py",
   "start": 4138964,
   "end": 4139521,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/dom/pulldom.py",
   "start": 4139521,
   "end": 4151282,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/dom/expatbuilder.py",
   "start": 4151282,
   "end": 4187037,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/dom/domreg.py",
   "start": 4187037,
   "end": 4190439,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/dom/xmlbuilder.py",
   "start": 4190439,
   "end": 4203397,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/dom/__init__.py",
   "start": 4203397,
   "end": 4207416,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/dom/minicompat.py",
   "start": 4207416,
   "end": 4210783,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/dom/NodeFilter.py",
   "start": 4210783,
   "end": 4211719,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/dom/minidom.py",
   "start": 4211719,
   "end": 4278538,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/etree/ElementInclude.py",
   "start": 4278538,
   "end": 4283689,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/etree/ElementPath.py",
   "start": 4283689,
   "end": 4293613,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/etree/cElementTree.py",
   "start": 4293613,
   "end": 4293695,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/etree/__init__.py",
   "start": 4293695,
   "end": 4295299,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/etree/ElementTree.py",
   "start": 4295299,
   "end": 4352808,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/parsers/expat.py",
   "start": 4352808,
   "end": 4353056,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/parsers/__init__.py",
   "start": 4353056,
   "end": 4353223,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/sax/handler.py",
   "start": 4353223,
   "end": 4367145,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/sax/saxutils.py",
   "start": 4367145,
   "end": 4379350,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/sax/__init__.py",
   "start": 4379350,
   "end": 4382943,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/sax/_exceptions.py",
   "start": 4382943,
   "end": 4387728,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/sax/expatreader.py",
   "start": 4387728,
   "end": 4403114,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/sax/xmlreader.py",
   "start": 4403114,
   "end": 4415798,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site-packages/_ssl.py",
   "start": 4415798,
   "end": 4417079,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site-packages/_posixsubprocess.py",
   "start": 4417079,
   "end": 4417079,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site-packages/ColdbrewHTTPShim.py",
   "start": 4417079,
   "end": 4421339,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site-packages/_socket.py",
   "start": 4421339,
   "end": 4422929,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site-packages/select.py",
   "start": 4422929,
   "end": 4423005,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site-packages/Coldbrew.py",
   "start": 4423005,
   "end": 4427709,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site-packages/README",
   "start": 4427709,
   "end": 4427828,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/refactor.py",
   "start": 4427828,
   "end": 4455862,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/Grammar3.5.2.final.0.pickle",
   "start": 4455862,
   "end": 4477450,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/PatternGrammar.txt",
   "start": 4477450,
   "end": 4478243,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pygram.py",
   "start": 4478243,
   "end": 4479357,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixer_util.py",
   "start": 4479357,
   "end": 4494594,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/PatternGrammar3.5.2.final.0.pickle",
   "start": 4494594,
   "end": 4496049,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/__main__.py",
   "start": 4496049,
   "end": 4496116,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/patcomp.py",
   "start": 4496116,
   "end": 4503186,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/__init__.py",
   "start": 4503186,
   "end": 4503193,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pytree.py",
   "start": 4503193,
   "end": 4531245,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/Grammar.txt",
   "start": 4531245,
   "end": 4537996,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixer_base.py",
   "start": 4537996,
   "end": 4544701,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/main.py",
   "start": 4544701,
   "end": 4556339,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/btm_matcher.py",
   "start": 4556339,
   "end": 4563172,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/btm_utils.py",
   "start": 4563172,
   "end": 4573138,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/grammar.py",
   "start": 4573138,
   "end": 4578504,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/parse.py",
   "start": 4578504,
   "end": 4586557,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/token.py",
   "start": 4586557,
   "end": 4587843,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/literals.py",
   "start": 4587843,
   "end": 4589458,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/conv.py",
   "start": 4589458,
   "end": 4599100,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/__init__.py",
   "start": 4599100,
   "end": 4599243,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/pgen.py",
   "start": 4599243,
   "end": 4613023,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/tokenize.py",
   "start": 4613023,
   "end": 4634827,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/driver.py",
   "start": 4634827,
   "end": 4639980,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_xrange.py",
   "start": 4639980,
   "end": 4642674,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_ws_comma.py",
   "start": 4642674,
   "end": 4643764,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_long.py",
   "start": 4643764,
   "end": 4644240,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_urllib.py",
   "start": 4644240,
   "end": 4652624,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_itertools_imports.py",
   "start": 4652624,
   "end": 4654710,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_throw.py",
   "start": 4654710,
   "end": 4656292,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_repr.py",
   "start": 4656292,
   "end": 4656905,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_types.py",
   "start": 4656905,
   "end": 4658702,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_print.py",
   "start": 4658702,
   "end": 4661556,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_ne.py",
   "start": 4661556,
   "end": 4662127,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_renames.py",
   "start": 4662127,
   "end": 4664348,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_raw_input.py",
   "start": 4664348,
   "end": 4664802,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_funcattrs.py",
   "start": 4664802,
   "end": 4665446,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_methodattrs.py",
   "start": 4665446,
   "end": 4666052,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_xreadlines.py",
   "start": 4666052,
   "end": 4666741,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_unicode.py",
   "start": 4666741,
   "end": 4667997,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_itertools.py",
   "start": 4667997,
   "end": 4669545,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_basestring.py",
   "start": 4669545,
   "end": 4669865,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_reduce.py",
   "start": 4669865,
   "end": 4670702,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_dict.py",
   "start": 4670702,
   "end": 4674513,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_idioms.py",
   "start": 4674513,
   "end": 4679389,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_apply.py",
   "start": 4679389,
   "end": 4681290,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_next.py",
   "start": 4681290,
   "end": 4684464,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_filter.py",
   "start": 4684464,
   "end": 4686566,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_paren.py",
   "start": 4686566,
   "end": 4687793,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_operator.py",
   "start": 4687793,
   "end": 4691264,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_standarderror.py",
   "start": 4691264,
   "end": 4691713,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/__init__.py",
   "start": 4691713,
   "end": 4691760,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_buffer.py",
   "start": 4691760,
   "end": 4692350,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_input.py",
   "start": 4692350,
   "end": 4693058,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_callable.py",
   "start": 4693058,
   "end": 4694209,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_metaclass.py",
   "start": 4694209,
   "end": 4702412,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_exitfunc.py",
   "start": 4702412,
   "end": 4704907,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_exec.py",
   "start": 4704907,
   "end": 4705908,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_future.py",
   "start": 4705908,
   "end": 4706455,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_raise.py",
   "start": 4706455,
   "end": 4709381,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_imports.py",
   "start": 4709381,
   "end": 4715065,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_sys_exc.py",
   "start": 4715065,
   "end": 4716099,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_zip.py",
   "start": 4716099,
   "end": 4717001,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_intern.py",
   "start": 4717001,
   "end": 4717775,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_has_key.py",
   "start": 4717775,
   "end": 4720997,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_tuple_params.py",
   "start": 4720997,
   "end": 4726562,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_getcwdu.py",
   "start": 4726562,
   "end": 4727013,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_execfile.py",
   "start": 4727013,
   "end": 4729003,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_numliterals.py",
   "start": 4729003,
   "end": 4729771,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_imports2.py",
   "start": 4729771,
   "end": 4730060,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_reload.py",
   "start": 4730060,
   "end": 4730753,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_asserts.py",
   "start": 4730753,
   "end": 4731737,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_import.py",
   "start": 4731737,
   "end": 4734993,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_except.py",
   "start": 4734993,
   "end": 4738337,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_nonzero.py",
   "start": 4738337,
   "end": 4738934,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_isinstance.py",
   "start": 4738934,
   "end": 4740542,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_set_literal.py",
   "start": 4740542,
   "end": 4742239,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_map.py",
   "start": 4742239,
   "end": 4745297,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xmlrpc/server.py",
   "start": 4745297,
   "end": 4781936,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xmlrpc/client.py",
   "start": 4781936,
   "end": 4830234,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xmlrpc/__init__.py",
   "start": 4830234,
   "end": 4830272,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/html/__init__.py",
   "start": 4830272,
   "end": 4835028,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/html/parser.py",
   "start": 4835028,
   "end": 4852755,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/html/entities.py",
   "start": 4852755,
   "end": 4928070,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/windows_events.py",
   "start": 4928070,
   "end": 4955764,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/constants.py",
   "start": 4955764,
   "end": 4955959,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/futures.py",
   "start": 4955959,
   "end": 4972551,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/tasks.py",
   "start": 4972551,
   "end": 4998118,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/coroutines.py",
   "start": 4998118,
   "end": 5007711,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/proactor_events.py",
   "start": 5007711,
   "end": 5027658,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/transports.py",
   "start": 5027658,
   "end": 5037511,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/compat.py",
   "start": 5037511,
   "end": 5038054,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/windows_utils.py",
   "start": 5038054,
   "end": 5044898,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/protocols.py",
   "start": 5044898,
   "end": 5049410,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/events.py",
   "start": 5049410,
   "end": 5070915,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/sslproto.py",
   "start": 5070915,
   "end": 5096350,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/__init__.py",
   "start": 5096350,
   "end": 5097786,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/streams.py",
   "start": 5097786,
   "end": 5122205,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/test_utils.py",
   "start": 5122205,
   "end": 5135226,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/base_subprocess.py",
   "start": 5135226,
   "end": 5144169,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/queues.py",
   "start": 5144169,
   "end": 5152016,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/unix_events.py",
   "start": 5152016,
   "end": 5186803,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/base_events.py",
   "start": 5186803,
   "end": 5238665,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/subprocess.py",
   "start": 5238665,
   "end": 5245859,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/locks.py",
   "start": 5245859,
   "end": 5260660,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/selector_events.py",
   "start": 5260660,
   "end": 5300386,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/log.py",
   "start": 5300386,
   "end": 5300510,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/signals.py",
   "start": 5300510,
   "end": 5302913,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/result.py",
   "start": 5302913,
   "end": 5310355,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/util.py",
   "start": 5310355,
   "end": 5315788,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/case.py",
   "start": 5315788,
   "end": 5372320,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/runner.py",
   "start": 5372320,
   "end": 5380070,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/loader.py",
   "start": 5380070,
   "end": 5402298,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/__main__.py",
   "start": 5402298,
   "end": 5402783,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/__init__.py",
   "start": 5402783,
   "end": 5405923,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/suite.py",
   "start": 5405923,
   "end": 5416402,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/main.py",
   "start": 5416402,
   "end": 5426887,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/mock.py",
   "start": 5426887,
   "end": 5505080,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/popen_fork.py",
   "start": 5505080,
   "end": 5507407,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/resource_sharer.py",
   "start": 5507407,
   "end": 5512725,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/sharedctypes.py",
   "start": 5512725,
   "end": 5518953,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/popen_spawn_win32.py",
   "start": 5518953,
   "end": 5521951,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/synchronize.py",
   "start": 5521951,
   "end": 5534003,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/util.py",
   "start": 5534003,
   "end": 5545256,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/__init__.py",
   "start": 5545256,
   "end": 5546179,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/semaphore_tracker.py",
   "start": 5546179,
   "end": 5550999,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/forkserver.py",
   "start": 5550999,
   "end": 5558962,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/managers.py",
   "start": 5558962,
   "end": 5594922,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/process.py",
   "start": 5594922,
   "end": 5603881,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/spawn.py",
   "start": 5603881,
   "end": 5612729,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/reduction.py",
   "start": 5612729,
   "end": 5620837,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/context.py",
   "start": 5620837,
   "end": 5631506,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/queues.py",
   "start": 5631506,
   "end": 5642672,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/heap.py",
   "start": 5642672,
   "end": 5650997,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/pool.py",
   "start": 5650997,
   "end": 5675720,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/popen_spawn_posix.py",
   "start": 5675720,
   "end": 5677635,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/connection.py",
   "start": 5677635,
   "end": 5708492,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/popen_forkserver.py",
   "start": 5708492,
   "end": 5710459,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/dummy/__init__.py",
   "start": 5710459,
   "end": 5713355,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/dummy/connection.py",
   "start": 5713355,
   "end": 5714938,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/venv/__main__.py",
   "start": 5714938,
   "end": 5715083,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/venv/__init__.py",
   "start": 5715083,
   "end": 5734690,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/venv/scripts/posix/activate.fish",
   "start": 5734690,
   "end": 5737102,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/venv/scripts/posix/activate.csh",
   "start": 5737102,
   "end": 5738378,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/venv/scripts/posix/activate",
   "start": 5738378,
   "end": 5740536,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/colormixer.py",
   "start": 5740536,
   "end": 5741875,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/wikipedia.py",
   "start": 5741875,
   "end": 5743222,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/tree.py",
   "start": 5743222,
   "end": 5744647,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/penrose.py",
   "start": 5744647,
   "end": 5748187,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/paint.py",
   "start": 5748187,
   "end": 5749478,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/bytedesign.py",
   "start": 5749478,
   "end": 5753722,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/yinyang.py",
   "start": 5753722,
   "end": 5754543,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/two_canvases.py",
   "start": 5754543,
   "end": 5755663,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/turtle.cfg",
   "start": 5755663,
   "end": 5755823,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/forest.py",
   "start": 5755823,
   "end": 5758773,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/peace.py",
   "start": 5758773,
   "end": 5759839,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/__main__.py",
   "start": 5759839,
   "end": 5774125,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/nim.py",
   "start": 5774125,
   "end": 5780638,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/__init__.py",
   "start": 5780638,
   "end": 5780952,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/planet_and_moon.py",
   "start": 5780952,
   "end": 5783800,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/fractalcurves.py",
   "start": 5783800,
   "end": 5787257,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/clock.py",
   "start": 5787257,
   "end": 5790458,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/sorting_animate.py",
   "start": 5790458,
   "end": 5795510,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/minimal_hanoi.py",
   "start": 5795510,
   "end": 5797561,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/chaos.py",
   "start": 5797561,
   "end": 5798512,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/lindenmayer.py",
   "start": 5798512,
   "end": 5800946,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/round_dance.py",
   "start": 5800946,
   "end": 5802750,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/dbm/dumb.py",
   "start": 5802750,
   "end": 5813721,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/dbm/__init__.py",
   "start": 5813721,
   "end": 5819504,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/dbm/ndbm.py",
   "start": 5819504,
   "end": 5819574,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/dbm/gnu.py",
   "start": 5819574,
   "end": 5819646,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/wsgiref/headers.py",
   "start": 5819646,
   "end": 5826412,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/wsgiref/util.py",
   "start": 5826412,
   "end": 5832046,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/wsgiref/__init__.py",
   "start": 5832046,
   "end": 5832633,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/wsgiref/handlers.py",
   "start": 5832633,
   "end": 5853634,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/wsgiref/validate.py",
   "start": 5853634,
   "end": 5868797,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/wsgiref/simple_server.py",
   "start": 5868797,
   "end": 5874185,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/curses/__init__.py",
   "start": 5874185,
   "end": 5877551,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/curses/textpad.py",
   "start": 5877551,
   "end": 5884890,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/curses/ascii.py",
   "start": 5884890,
   "end": 5887497,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/curses/panel.py",
   "start": 5887497,
   "end": 5887584,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/curses/has_key.py",
   "start": 5887584,
   "end": 5893218,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp856.py",
   "start": 5893218,
   "end": 5905641,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp950.py",
   "start": 5905641,
   "end": 5906664,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1256.py",
   "start": 5906664,
   "end": 5919478,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/gbk.py",
   "start": 5919478,
   "end": 5920493,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp875.py",
   "start": 5920493,
   "end": 5933347,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_roman.py",
   "start": 5933347,
   "end": 5946827,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_3.py",
   "start": 5946827,
   "end": 5959916,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp874.py",
   "start": 5959916,
   "end": 5972511,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/koi8_r.py",
   "start": 5972511,
   "end": 5986290,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_6.py",
   "start": 5986290,
   "end": 5997123,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp500.py",
   "start": 5997123,
   "end": 6010244,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp932.py",
   "start": 6010244,
   "end": 6011267,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_jp_2.py",
   "start": 6011267,
   "end": 6012328,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_16_be.py",
   "start": 6012328,
   "end": 6013365,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1254.py",
   "start": 6013365,
   "end": 6026867,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_iceland.py",
   "start": 6026867,
   "end": 6040365,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_turkish.py",
   "start": 6040365,
   "end": 6053878,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1257.py",
   "start": 6053878,
   "end": 6067252,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/undefined.py",
   "start": 6067252,
   "end": 6068551,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1255.py",
   "start": 6068551,
   "end": 6081017,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_5.py",
   "start": 6081017,
   "end": 6094032,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_7.py",
   "start": 6094032,
   "end": 6106876,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/koi8_t.py",
   "start": 6106876,
   "end": 6120069,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_32_be.py",
   "start": 6120069,
   "end": 6120999,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/gb2312.py",
   "start": 6120999,
   "end": 6122026,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_15.py",
   "start": 6122026,
   "end": 6135238,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1251.py",
   "start": 6135238,
   "end": 6148599,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp037.py",
   "start": 6148599,
   "end": 6161720,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/ptcp154.py",
   "start": 6161720,
   "end": 6175735,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_32_le.py",
   "start": 6175735,
   "end": 6176665,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/big5hkscs.py",
   "start": 6176665,
   "end": 6177704,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_croatian.py",
   "start": 6177704,
   "end": 6191337,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp862.py",
   "start": 6191337,
   "end": 6224707,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/kz1048.py",
   "start": 6224707,
   "end": 6238430,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/hz.py",
   "start": 6238430,
   "end": 6239441,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp864.py",
   "start": 6239441,
   "end": 6273104,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_4.py",
   "start": 6273104,
   "end": 6286480,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1258.py",
   "start": 6286480,
   "end": 6299844,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp852.py",
   "start": 6299844,
   "end": 6334846,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp775.py",
   "start": 6334846,
   "end": 6369322,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/johab.py",
   "start": 6369322,
   "end": 6370345,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1252.py",
   "start": 6370345,
   "end": 6383856,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/tis_620.py",
   "start": 6383856,
   "end": 6396156,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/aliases.py",
   "start": 6396156,
   "end": 6411698,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/euc_jis_2004.py",
   "start": 6411698,
   "end": 6412749,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1140.py",
   "start": 6412749,
   "end": 6425854,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp850.py",
   "start": 6425854,
   "end": 6459959,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp65001.py",
   "start": 6459959,
   "end": 6461065,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_11.py",
   "start": 6461065,
   "end": 6473400,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_jp_3.py",
   "start": 6473400,
   "end": 6474461,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/idna.py",
   "start": 6474461,
   "end": 6483631,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp855.py",
   "start": 6483631,
   "end": 6517481,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/zlib_codec.py",
   "start": 6517481,
   "end": 6519685,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp857.py",
   "start": 6519685,
   "end": 6553593,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_10.py",
   "start": 6553593,
   "end": 6567182,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp865.py",
   "start": 6567182,
   "end": 6601800,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/bz2_codec.py",
   "start": 6601800,
   "end": 6604049,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp866.py",
   "start": 6604049,
   "end": 6638445,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp737.py",
   "start": 6638445,
   "end": 6673126,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp273.py",
   "start": 6673126,
   "end": 6687258,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/euc_jisx0213.py",
   "start": 6687258,
   "end": 6688309,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/euc_kr.py",
   "start": 6688309,
   "end": 6689336,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_16.py",
   "start": 6689336,
   "end": 6694572,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp949.py",
   "start": 6694572,
   "end": 6695595,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/rot_13.py",
   "start": 6695595,
   "end": 6698023,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/punycode.py",
   "start": 6698023,
   "end": 6704904,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp437.py",
   "start": 6704904,
   "end": 6739468,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp863.py",
   "start": 6739468,
   "end": 6773720,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/unicode_escape.py",
   "start": 6773720,
   "end": 6774904,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/__init__.py",
   "start": 6774904,
   "end": 6779971,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_16_le.py",
   "start": 6779971,
   "end": 6781008,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_32.py",
   "start": 6781008,
   "end": 6786137,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_9.py",
   "start": 6786137,
   "end": 6799293,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_14.py",
   "start": 6799293,
   "end": 6812945,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1006.py",
   "start": 6812945,
   "end": 6826513,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/shift_jis.py",
   "start": 6826513,
   "end": 6827552,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_kr.py",
   "start": 6827552,
   "end": 6828605,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_16.py",
   "start": 6828605,
   "end": 6842162,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/base64_codec.py",
   "start": 6842162,
   "end": 6843695,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_8.py",
   "start": 6843695,
   "end": 6844700,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/latin_1.py",
   "start": 6844700,
   "end": 6845964,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/shift_jisx0213.py",
   "start": 6845964,
   "end": 6847023,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/hex_codec.py",
   "start": 6847023,
   "end": 6848531,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp858.py",
   "start": 6848531,
   "end": 6882546,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/quopri_codec.py",
   "start": 6882546,
   "end": 6884071,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_arabic.py",
   "start": 6884071,
   "end": 6920538,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_jp_2004.py",
   "start": 6920538,
   "end": 6921611,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp720.py",
   "start": 6921611,
   "end": 6935297,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1026.py",
   "start": 6935297,
   "end": 6948410,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_farsi.py",
   "start": 6948410,
   "end": 6963580,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/gb18030.py",
   "start": 6963580,
   "end": 6964611,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_8_sig.py",
   "start": 6964611,
   "end": 6968744,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_greek.py",
   "start": 6968744,
   "end": 6982465,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mbcs.py",
   "start": 6982465,
   "end": 6983676,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp869.py",
   "start": 6983676,
   "end": 7016641,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1250.py",
   "start": 7016641,
   "end": 7030327,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_7.py",
   "start": 7030327,
   "end": 7031273,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/charmap.py",
   "start": 7031273,
   "end": 7033357,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/big5.py",
   "start": 7033357,
   "end": 7034376,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_8.py",
   "start": 7034376,
   "end": 7045412,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_romanian.py",
   "start": 7045412,
   "end": 7059073,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1125.py",
   "start": 7059073,
   "end": 7093670,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_jp_ext.py",
   "start": 7093670,
   "end": 7094739,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/ascii.py",
   "start": 7094739,
   "end": 7095987,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp861.py",
   "start": 7095987,
   "end": 7130620,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/shift_jis_2004.py",
   "start": 7130620,
   "end": 7131679,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/unicode_internal.py",
   "start": 7131679,
   "end": 7132875,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_jp_1.py",
   "start": 7132875,
   "end": 7133936,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_cyrillic.py",
   "start": 7133936,
   "end": 7147390,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1253.py",
   "start": 7147390,
   "end": 7160484,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_2.py",
   "start": 7160484,
   "end": 7173888,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/koi8_u.py",
   "start": 7173888,
   "end": 7187650,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/hp_roman8.py",
   "start": 7187650,
   "end": 7201125,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_1.py",
   "start": 7201125,
   "end": 7214301,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/euc_jp.py",
   "start": 7214301,
   "end": 7215328,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_latin2.py",
   "start": 7215328,
   "end": 7229446,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/raw_unicode_escape.py",
   "start": 7229446,
   "end": 7230654,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_13.py",
   "start": 7230654,
   "end": 7243925,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_jp.py",
   "start": 7243925,
   "end": 7244978,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/uu_codec.py",
   "start": 7244978,
   "end": 7247699,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp860.py",
   "start": 7247699,
   "end": 7282380,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/palmos.py",
   "start": 7282380,
   "end": 7295899,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_centeuro.py",
   "start": 7295899,
   "end": 7310001,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp424.py",
   "start": 7310001,
   "end": 7322056,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/http/server.py",
   "start": 7322056,
   "end": 7366042,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/http/client.py",
   "start": 7366042,
   "end": 7414756,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/http/__init__.py",
   "start": 7414756,
   "end": 7420709,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/http/cookies.py",
   "start": 7420709,
   "end": 7442019,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/http/cookiejar.py",
   "start": 7442019,
   "end": 7518399,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/collections/abc.py",
   "start": 7518399,
   "end": 7518467,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/collections/__main__.py",
   "start": 7518467,
   "end": 7519742,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/collections/__init__.py",
   "start": 7519742,
   "end": 7565420,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/json/encoder.py",
   "start": 7565420,
   "end": 7581381,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/json/__init__.py",
   "start": 7581381,
   "end": 7594703,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/json/tool.py",
   "start": 7594703,
   "end": 7596348,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/json/decoder.py",
   "start": 7596348,
   "end": 7608930,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/json/scanner.py",
   "start": 7608930,
   "end": 7611346,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/dump.py",
   "start": 7611346,
   "end": 7614171,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/dbapi2.py",
   "start": 7614171,
   "end": 7616858,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/__init__.py",
   "start": 7616858,
   "end": 7617876,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/regression.py",
   "start": 7617876,
   "end": 7630797,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/dump.py",
   "start": 7630797,
   "end": 7633637,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/hooks.py",
   "start": 7633637,
   "end": 7643051,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/dbapi.py",
   "start": 7643051,
   "end": 7674459,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/userfunctions.py",
   "start": 7674459,
   "end": 7690377,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/transactions.py",
   "start": 7690377,
   "end": 7697715,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/factory.py",
   "start": 7697715,
   "end": 7708386,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/__init__.py",
   "start": 7708386,
   "end": 7708386,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/types.py",
   "start": 7708386,
   "end": 7722603,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/urllib/parse.py",
   "start": 7722603,
   "end": 7756955,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/urllib/robotparser.py",
   "start": 7756955,
   "end": 7763919,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/urllib/error.py",
   "start": 7763919,
   "end": 7766682,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/urllib/__init__.py",
   "start": 7766682,
   "end": 7766682,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/urllib/request.py",
   "start": 7766682,
   "end": 7863588,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/urllib/response.py",
   "start": 7863588,
   "end": 7865887,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/importlib/util.py",
   "start": 7865887,
   "end": 7876692,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/importlib/machinery.py",
   "start": 7876692,
   "end": 7877536,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/importlib/abc.py",
   "start": 7877536,
   "end": 7888318,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/importlib/__init__.py",
   "start": 7888318,
   "end": 7894186,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/importlib/_bootstrap.py",
   "start": 7894186,
   "end": 7932094,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/importlib/_bootstrap_external.py",
   "start": 7932094,
   "end": 7985624,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/wintypes.py",
   "start": 7985624,
   "end": 7991252,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/util.py",
   "start": 7991252,
   "end": 8000508,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/_endian.py",
   "start": 8000508,
   "end": 8002508,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/__init__.py",
   "start": 8002508,
   "end": 8019355,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/fetch_macholib",
   "start": 8019355,
   "end": 8019439,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/dylib.py",
   "start": 8019439,
   "end": 8021267,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/__init__.py",
   "start": 8021267,
   "end": 8021421,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/framework.py",
   "start": 8021421,
   "end": 8023622,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/README.ctypes",
   "start": 8023622,
   "end": 8023918,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/dyld.py",
   "start": 8023918,
   "end": 8028825,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/fetch_macholib.bat",
   "start": 8028825,
   "end": 8028900,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_errno.py",
   "start": 8028900,
   "end": 8031202,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_returnfuncptrs.py",
   "start": 8031202,
   "end": 8034105,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_arrays.py",
   "start": 8034105,
   "end": 8039885,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_keeprefs.py",
   "start": 8039885,
   "end": 8043943,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_python_api.py",
   "start": 8043943,
   "end": 8046809,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_refcounts.py",
   "start": 8046809,
   "end": 8049385,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_internals.py",
   "start": 8049385,
   "end": 8052016,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_as_parameter.py",
   "start": 8052016,
   "end": 8058788,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_loading.py",
   "start": 8058788,
   "end": 8063305,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_memfunctions.py",
   "start": 8063305,
   "end": 8066598,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_funcptr.py",
   "start": 8066598,
   "end": 8070509,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_objects.py",
   "start": 8070509,
   "end": 8072191,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_delattr.py",
   "start": 8072191,
   "end": 8072724,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_random_things.py",
   "start": 8072724,
   "end": 8075551,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_frombuffer.py",
   "start": 8075551,
   "end": 8079797,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_libc.py",
   "start": 8079797,
   "end": 8080802,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_structures.py",
   "start": 8080802,
   "end": 8096582,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_parameters.py",
   "start": 8096582,
   "end": 8102778,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_win32.py",
   "start": 8102778,
   "end": 8108065,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_bytes.py",
   "start": 8108065,
   "end": 8109989,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_wintypes.py",
   "start": 8109989,
   "end": 8111455,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_sizes.py",
   "start": 8111455,
   "end": 8112270,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_buffers.py",
   "start": 8112270,
   "end": 8114554,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_pep3118.py",
   "start": 8114554,
   "end": 8122389,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_find.py",
   "start": 8122389,
   "end": 8125222,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_incomplete.py",
   "start": 8125222,
   "end": 8126245,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/__main__.py",
   "start": 8126245,
   "end": 8126313,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_stringptr.py",
   "start": 8126313,
   "end": 8128849,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_repr.py",
   "start": 8128849,
   "end": 8129691,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/__init__.py",
   "start": 8129691,
   "end": 8130090,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_init.py",
   "start": 8130090,
   "end": 8131129,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_checkretval.py",
   "start": 8131129,
   "end": 8132097,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_macholib.py",
   "start": 8132097,
   "end": 8133927,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_bitfields.py",
   "start": 8133927,
   "end": 8144007,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_unicode.py",
   "start": 8144007,
   "end": 8145768,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_simplesubclasses.py",
   "start": 8145768,
   "end": 8147057,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_pickling.py",
   "start": 8147057,
   "end": 8149275,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_numbers.py",
   "start": 8149275,
   "end": 8158566,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_anon.py",
   "start": 8158566,
   "end": 8160617,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_slicing.py",
   "start": 8160617,
   "end": 8166632,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_values.py",
   "start": 8166632,
   "end": 8170473,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_callbacks.py",
   "start": 8170473,
   "end": 8178321,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_varsize_struct.py",
   "start": 8178321,
   "end": 8180163,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_strings.py",
   "start": 8180163,
   "end": 8187298,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_byteswap.py",
   "start": 8187298,
   "end": 8198709,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_unaligned_structures.py",
   "start": 8198709,
   "end": 8199924,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_cast.py",
   "start": 8199924,
   "end": 8203112,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_struct_fields.py",
   "start": 8203112,
   "end": 8204615,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_prototypes.py",
   "start": 8204615,
   "end": 8211460,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_array_in_pointer.py",
   "start": 8211460,
   "end": 8213198,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_functions.py",
   "start": 8213198,
   "end": 8225753,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_cfuncs.py",
   "start": 8225753,
   "end": 8233433,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_pointers.py",
   "start": 8233433,
   "end": 8240545,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/logging/config.py",
   "start": 8240545,
   "end": 8276489,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/logging/__init__.py",
   "start": 8276489,
   "end": 8345902,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/logging/handlers.py",
   "start": 8345902,
   "end": 8402526,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/encoders.py",
   "start": 8402526,
   "end": 8404312,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/headerregistry.py",
   "start": 8404312,
   "end": 8424476,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/_header_value_parser.py",
   "start": 8424476,
   "end": 8529678,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/feedparser.py",
   "start": 8529678,
   "end": 8552543,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/_parseaddr.py",
   "start": 8552543,
   "end": 8569742,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/_encoded_words.py",
   "start": 8569742,
   "end": 8577656,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/charset.py",
   "start": 8577656,
   "end": 8594807,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/message.py",
   "start": 8594807,
   "end": 8640575,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/base64mime.py",
   "start": 8640575,
   "end": 8644133,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/generator.py",
   "start": 8644133,
   "end": 8664121,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/utils.py",
   "start": 8664121,
   "end": 8677809,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/errors.py",
   "start": 8677809,
   "end": 8681344,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/architecture.rst",
   "start": 8681344,
   "end": 8690904,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/__init__.py",
   "start": 8690904,
   "end": 8692670,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/iterators.py",
   "start": 8692670,
   "end": 8694805,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/contentmanager.py",
   "start": 8694805,
   "end": 8705403,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/_policybase.py",
   "start": 8705403,
   "end": 8720075,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/policy.py",
   "start": 8720075,
   "end": 8730056,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/header.py",
   "start": 8730056,
   "end": 8754156,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/parser.py",
   "start": 8754156,
   "end": 8759199,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/quoprimime.py",
   "start": 8759199,
   "end": 8769058,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/application.py",
   "start": 8769058,
   "end": 8770314,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/message.py",
   "start": 8770314,
   "end": 8771600,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/base.py",
   "start": 8771600,
   "end": 8772394,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/nonmultipart.py",
   "start": 8772394,
   "end": 8773085,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/__init__.py",
   "start": 8773085,
   "end": 8773085,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/image.py",
   "start": 8773085,
   "end": 8774849,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/text.py",
   "start": 8774849,
   "end": 8776329,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/audio.py",
   "start": 8776329,
   "end": 8779003,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/multipart.py",
   "start": 8779003,
   "end": 8780576,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/concurrent/__init__.py",
   "start": 8780576,
   "end": 8780614,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/concurrent/futures/thread.py",
   "start": 8780614,
   "end": 8785479,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/concurrent/futures/_base.py",
   "start": 8785479,
   "end": 8805505,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/concurrent/futures/__init__.py",
   "start": 8805505,
   "end": 8806305,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/concurrent/futures/process.py",
   "start": 8806305,
   "end": 8826440,
   "audio": 0
  }, {
   "filename": "/files/files/.gitkeep",
   "start": 8826440,
   "end": 8826440,
   "audio": 0
  }, {
   "filename": "/coldbrew/examples/fib.py",
   "start": 8826440,
   "end": 8828315,
   "audio": 0
  }, {
   "filename": "/coldbrew/examples/add.py",
   "start": 8828315,
   "end": 8828737,
   "audio": 0
  } ],
  "remote_package_size": 8828737,
  "package_uuid": "b5dc2175-1605-4448-9fdb-28ecbd10b77e"
 });
}))();
var _coldbrew_global = typeof window === "object" ? window : global;
var setTimeout = (function() {
 var args = arguments;
 if (args[1] < 0) {
  if (Coldbrew._resume_ie) {
   Coldbrew._resume_ie = false;
   Coldbrew.resume = Coldbrew._resumeWarn;
   args[0]();
  } else {
   Coldbrew.resume = (function() {
    Coldbrew._resume_ie = false;
    Coldbrew.resume = Coldbrew._resumeWarn;
    args[0]();
   });
  }
  return -1;
 }
 return _coldbrew_global.setTimeout.apply(_coldbrew_global, args);
});
Module.noInitialRun = true;
Module.print = (function(text) {
 var global = typeof window === "object" ? window : global;
 if (Coldbrew.forwardOut) {
  Coldbrew.onStandardOut(text);
 }
});
Module.printErr = (function(text) {
 var global = typeof window === "object" ? window : global;
 if (Coldbrew.forwardErr) {
  Coldbrew.onStandardErr(text);
 }
});
Module.preInit = [ (function() {
 Coldbrew.preInit(Module);
 if (Coldbrew._emterpreterFileResponse) {
  Module.emterpreterFile = Coldbrew._emterpreterFileResponse.responseText;
 }
}) ];
Module.preRun.push((function() {
 var global = typeof window === "object" ? window : global;
 Coldbrew.preRun(Module);
 Coldbrew._mountFS(Module);
}));
Module.onRuntimeInitialized = (function() {
 var global = typeof window === "object" ? window : global;
 Coldbrew._onRuntimeInitialized(Module);
});
var moduleOverrides = {};
var key;
for (key in Module) {
 if (Module.hasOwnProperty(key)) {
  moduleOverrides[key] = Module[key];
 }
}
Module["arguments"] = [];
Module["thisProgram"] = "./this.program";
Module["quit"] = (function(status, toThrow) {
 throw toThrow;
});
Module["preRun"] = [];
Module["postRun"] = [];
var ENVIRONMENT_IS_WEB = false;
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;
ENVIRONMENT_IS_WEB = typeof window === "object";
ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
ENVIRONMENT_IS_NODE = typeof process === "object" && typeof require === "function" && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;
ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
if (Module["ENVIRONMENT"]) {
 throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
}
var scriptDirectory = "";
function locateFile(path) {
 if (Module["locateFile"]) {
  return Module["locateFile"](path, scriptDirectory);
 } else {
  return scriptDirectory + path;
 }
}
if (ENVIRONMENT_IS_NODE) {
 scriptDirectory = __dirname + "/";
 var nodeFS;
 var nodePath;
 Module["read"] = function shell_read(filename, binary) {
  var ret;
  if (!nodeFS) nodeFS = require("fs");
  if (!nodePath) nodePath = require("path");
  filename = nodePath["normalize"](filename);
  ret = nodeFS["readFileSync"](filename);
  return binary ? ret : ret.toString();
 };
 Module["readBinary"] = function readBinary(filename) {
  var ret = Module["read"](filename, true);
  if (!ret.buffer) {
   ret = new Uint8Array(ret);
  }
  assert(ret.buffer);
  return ret;
 };
 if (process["argv"].length > 1) {
  Module["thisProgram"] = process["argv"][1].replace(/\\/g, "/");
 }
 Module["arguments"] = process["argv"].slice(2);
 process["on"]("uncaughtException", (function(ex) {
  if (!(ex instanceof ExitStatus)) {
   throw ex;
  }
 }));
 process["on"]("unhandledRejection", abort);
 Module["quit"] = (function(status) {
  process["exit"](status);
 });
 Module["inspect"] = (function() {
  return "[Emscripten Module object]";
 });
} else if (ENVIRONMENT_IS_SHELL) {
 if (typeof read != "undefined") {
  Module["read"] = function shell_read(f) {
   return read(f);
  };
 }
 Module["readBinary"] = function readBinary(f) {
  var data;
  if (typeof readbuffer === "function") {
   return new Uint8Array(readbuffer(f));
  }
  data = read(f, "binary");
  assert(typeof data === "object");
  return data;
 };
 if (typeof scriptArgs != "undefined") {
  Module["arguments"] = scriptArgs;
 } else if (typeof arguments != "undefined") {
  Module["arguments"] = arguments;
 }
 if (typeof quit === "function") {
  Module["quit"] = (function(status) {
   quit(status);
  });
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
 Module["read"] = function shell_read(url) {
  var xhr = new XMLHttpRequest;
  xhr.open("GET", url, false);
  xhr.send(null);
  return xhr.responseText;
 };
 if (ENVIRONMENT_IS_WORKER) {
  Module["readBinary"] = function readBinary(url) {
   var xhr = new XMLHttpRequest;
   xhr.open("GET", url, false);
   xhr.responseType = "arraybuffer";
   xhr.send(null);
   return new Uint8Array(xhr.response);
  };
 }
 Module["readAsync"] = function readAsync(url, onload, onerror) {
  var xhr = new XMLHttpRequest;
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
 Module["setWindowTitle"] = (function(title) {
  document.title = title;
 });
} else {
 throw new Error("environment detection error");
}
var out = Module["print"] || (typeof console !== "undefined" ? console.log.bind(console) : typeof print !== "undefined" ? print : null);
var err = Module["printErr"] || (typeof printErr !== "undefined" ? printErr : typeof console !== "undefined" && console.warn.bind(console) || out);
for (key in moduleOverrides) {
 if (moduleOverrides.hasOwnProperty(key)) {
  Module[key] = moduleOverrides[key];
 }
}
moduleOverrides = undefined;
assert(typeof Module["memoryInitializerPrefixURL"] === "undefined", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
assert(typeof Module["pthreadMainPrefixURL"] === "undefined", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
assert(typeof Module["cdInitializerPrefixURL"] === "undefined", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
assert(typeof Module["filePackagePrefixURL"] === "undefined", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
stackSave = stackRestore = stackAlloc = (function() {
 abort("cannot use the stack before compiled code is ready to run, and has provided stack access");
});
function dynamicAlloc(size) {
 assert(DYNAMICTOP_PTR);
 var ret = HEAP32[DYNAMICTOP_PTR >> 2];
 var end = ret + size + 15 & -16;
 if (end <= _emscripten_get_heap_size()) {
  HEAP32[DYNAMICTOP_PTR >> 2] = end;
 } else {
  var success = _emscripten_resize_heap(end);
  if (!success) return 0;
 }
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
var asm2wasmImports = {
 "f64-rem": (function(x, y) {
  return x % y;
 }),
 "debugger": (function() {
  debugger;
 })
};
var tempRet0 = 0;
var setTempRet0 = (function(value) {
 tempRet0 = value;
});
var getTempRet0 = (function() {
 return tempRet0;
});
var GLOBAL_BASE = 1024;
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
var JSfuncs = {
 "stackSave": (function() {
  stackSave();
 }),
 "stackRestore": (function() {
  stackRestore();
 }),
 "arrayToC": (function(arr) {
  var ret = stackAlloc(arr.length);
  writeArrayToMemory(arr, ret);
  return ret;
 }),
 "stringToC": (function(str) {
  var ret = 0;
  if (str !== null && str !== undefined && str !== 0) {
   var len = (str.length << 2) + 1;
   ret = stackAlloc(len);
   stringToUTF8(str, ret, len);
  }
  return ret;
 })
};
var toC = {
 "string": JSfuncs["stringToC"],
 "array": JSfuncs["arrayToC"]
};
function ccall(ident, returnType, argTypes, args, opts) {
 function convertReturnValue(ret) {
  if (returnType === "string") return Pointer_stringify(ret);
  if (returnType === "boolean") return Boolean(ret);
  return ret;
 }
 var func = getCFunc(ident);
 var cArgs = [];
 var stack = 0;
 assert(returnType !== "array", 'Return type should not be "array".');
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
 if (typeof EmterpreterAsync === "object" && EmterpreterAsync.state) {
  assert(opts && opts.async, "The call to " + ident + " is running asynchronously. If this was intended, add the async option to the ccall/cwrap call.");
  assert(!EmterpreterAsync.restartFunc, "Cannot have multiple async ccalls in flight at once");
  return new Promise((function(resolve) {
   EmterpreterAsync.restartFunc = func;
   EmterpreterAsync.asyncFinalizers.push((function(ret) {
    if (stack !== 0) stackRestore(stack);
    resolve(convertReturnValue(ret));
   }));
  }));
 }
 ret = convertReturnValue(ret);
 if (stack !== 0) stackRestore(stack);
 if (opts && opts.async) return Promise.resolve(ret);
 return ret;
}
function cwrap(ident, returnType, argTypes, opts) {
 return (function() {
  return ccall(ident, returnType, argTypes, arguments, opts);
 });
}
function setValue(ptr, value, type, noSafe) {
 type = type || "i8";
 if (type.charAt(type.length - 1) === "*") type = "i32";
 switch (type) {
 case "i1":
  HEAP8[ptr >> 0] = value;
  break;
 case "i8":
  HEAP8[ptr >> 0] = value;
  break;
 case "i16":
  HEAP16[ptr >> 1] = value;
  break;
 case "i32":
  HEAP32[ptr >> 2] = value;
  break;
 case "i64":
  tempI64 = [ value >>> 0, (tempDouble = value, +Math_abs(tempDouble) >= +1 ? tempDouble > +0 ? (Math_min(+Math_floor(tempDouble / +4294967296), +4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / +4294967296) >>> 0 : 0) ], HEAP32[ptr >> 2] = tempI64[0], HEAP32[ptr + 4 >> 2] = tempI64[1];
  break;
 case "float":
  HEAPF32[ptr >> 2] = value;
  break;
 case "double":
  HEAPF64[ptr >> 3] = value;
  break;
 default:
  abort("invalid type for setValue: " + type);
 }
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
  for (; ptr < stop; ptr += 4) {
   HEAP32[ptr >> 2] = 0;
  }
  stop = ret + size;
  while (ptr < stop) {
   HEAP8[ptr++ >> 0] = 0;
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
  assert(type, "Must know what type to store in allocate!");
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
function Pointer_stringify(ptr, length) {
 if (length === 0 || !ptr) return "";
 var hasUtf = 0;
 var t;
 var i = 0;
 while (1) {
  assert(ptr + i < TOTAL_MEMORY);
  t = HEAPU8[ptr + i >> 0];
  hasUtf |= t;
  if (t == 0 && !length) break;
  i++;
  if (length && i == length) break;
 }
 if (!length) length = i;
 var ret = "";
 if (hasUtf < 128) {
  var MAX_CHUNK = 1024;
  var curr;
  while (length > 0) {
   curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
   ret = ret ? ret + curr : curr;
   ptr += MAX_CHUNK;
   length -= MAX_CHUNK;
  }
  return ret;
 }
 return UTF8ToString(ptr);
}
var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;
function UTF8ArrayToString(u8Array, idx) {
 var endPtr = idx;
 while (u8Array[endPtr]) ++endPtr;
 if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
  return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
 } else {
  var str = "";
  while (1) {
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
    if ((u0 & 248) != 240) warnOnce("Invalid UTF-8 leading byte 0x" + u0.toString(16) + " encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!");
    u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u8Array[idx++] & 63;
   }
   if (u0 < 65536) {
    str += String.fromCharCode(u0);
   } else {
    var ch = u0 - 65536;
    str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
   }
  }
 }
}
function UTF8ToString(ptr) {
 return UTF8ArrayToString(HEAPU8, ptr);
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
   if (u >= 2097152) warnOnce("Invalid Unicode code point 0x" + u.toString(16) + " encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF).");
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
 assert(typeof maxBytesToWrite == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
 return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
}
function lengthBytesUTF8(str) {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
  if (u <= 127) {
   ++len;
  } else if (u <= 2047) {
   len += 2;
  } else if (u <= 65535) {
   len += 3;
  } else if (u <= 2097151) {
   len += 4;
  } else if (u <= 67108863) {
   len += 5;
  } else {
   len += 6;
  }
 }
 return len;
}
var UTF16Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;
function allocateUTF8(str) {
 var size = lengthBytesUTF8(str) + 1;
 var ret = _malloc(size);
 if (ret) stringToUTF8Array(str, HEAP8, ret, size);
 return ret;
}
function allocateUTF8OnStack(str) {
 var size = lengthBytesUTF8(str) + 1;
 var ret = stackAlloc(size);
 stringToUTF8Array(str, HEAP8, ret, size);
 return ret;
}
function demangle(func) {
 warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");
 return func;
}
function demangleAll(text) {
 var regex = /__Z[\w\d_]+/g;
 return text.replace(regex, (function(x) {
  var y = demangle(x);
  return x === y ? x : y + " [" + x + "]";
 }));
}
function jsStackTrace() {
 var err = new Error;
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
var PAGE_SIZE = 16384;
var WASM_PAGE_SIZE = 65536;
function alignUp(x, multiple) {
 if (x % multiple > 0) {
  x += multiple - x % multiple;
 }
 return x;
}
var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
function updateGlobalBuffer(buf) {
 Module["buffer"] = buffer = buf;
}
function updateGlobalBufferViews() {
 Module["HEAP8"] = HEAP8 = new Int8Array(buffer);
 Module["HEAP16"] = HEAP16 = new Int16Array(buffer);
 Module["HEAP32"] = HEAP32 = new Int32Array(buffer);
 Module["HEAPU8"] = HEAPU8 = new Uint8Array(buffer);
 Module["HEAPU16"] = HEAPU16 = new Uint16Array(buffer);
 Module["HEAPU32"] = HEAPU32 = new Uint32Array(buffer);
 Module["HEAPF32"] = HEAPF32 = new Float32Array(buffer);
 Module["HEAPF64"] = HEAPF64 = new Float64Array(buffer);
}
var STATIC_BASE = 1024, STACK_BASE = 1711472, STACK_MAX = 6954352, DYNAMIC_BASE = 6954352, DYNAMICTOP_PTR = 1711216;
assert(STACK_BASE % 16 === 0, "stack must start aligned");
assert(DYNAMIC_BASE % 16 === 0, "heap must start aligned");
function writeStackCookie() {
 assert((STACK_MAX & 3) == 0);
 HEAPU32[(STACK_MAX >> 2) - 1] = 34821223;
 HEAPU32[(STACK_MAX >> 2) - 2] = 2310721022;
}
function checkStackCookie() {
 if (HEAPU32[(STACK_MAX >> 2) - 1] != 34821223 || HEAPU32[(STACK_MAX >> 2) - 2] != 2310721022) {
  abort("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x" + HEAPU32[(STACK_MAX >> 2) - 2].toString(16) + " " + HEAPU32[(STACK_MAX >> 2) - 1].toString(16));
 }
 if (HEAP32[0] !== 1668509029) throw "Runtime error: The application has corrupted its heap memory area (address zero)!";
}
function abortStackOverflow(allocSize) {
 abort("Stack overflow! Attempted to allocate " + allocSize + " bytes on the stack, but stack has only " + (STACK_MAX - stackSave() + allocSize) + " bytes available!");
}
function abortStackOverflowEmterpreter() {
 abort("Emterpreter stack overflow! Decrease the recursion level or increase EMT_STACK_MAX in tools/emterpretify.py (current value " + EMT_STACK_MAX + ").");
}
function abortOnCannotGrowMemory() {
 abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + TOTAL_MEMORY + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ");
}
var byteLength;
try {
 byteLength = Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get);
 byteLength(new ArrayBuffer(4));
} catch (e) {
 byteLength = (function(buffer) {
  return buffer.byteLength;
 });
}
var TOTAL_STACK = 5242880;
if (Module["TOTAL_STACK"]) assert(TOTAL_STACK === Module["TOTAL_STACK"], "the stack size can no longer be determined at runtime");
var TOTAL_MEMORY = Module["TOTAL_MEMORY"] || 15728640;
if (TOTAL_MEMORY < TOTAL_STACK) err("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + TOTAL_MEMORY + "! (TOTAL_STACK=" + TOTAL_STACK + ")");
assert(typeof Int32Array !== "undefined" && typeof Float64Array !== "undefined" && Int32Array.prototype.subarray !== undefined && Int32Array.prototype.set !== undefined, "JS engine does not provide full typed array support");
if (Module["buffer"]) {
 buffer = Module["buffer"];
 assert(buffer.byteLength === TOTAL_MEMORY, "provided buffer should be " + TOTAL_MEMORY + " bytes, but it is " + buffer.byteLength);
} else {
 if (typeof WebAssembly === "object" && typeof WebAssembly.Memory === "function") {
  assert(TOTAL_MEMORY % WASM_PAGE_SIZE === 0);
  Module["wasmMemory"] = new WebAssembly.Memory({
   "initial": TOTAL_MEMORY / WASM_PAGE_SIZE
  });
  buffer = Module["wasmMemory"].buffer;
 } else {
  buffer = new ArrayBuffer(TOTAL_MEMORY);
 }
 assert(buffer.byteLength === TOTAL_MEMORY);
 Module["buffer"] = buffer;
}
updateGlobalBufferViews();
HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;
HEAP32[0] = 1668509029;
HEAP16[1] = 25459;
if (HEAPU8[2] !== 115 || HEAPU8[3] !== 99) throw "Runtime error: expected the system to be little-endian!";
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
function preRun() {
 if (Module["preRun"]) {
  if (typeof Module["preRun"] == "function") Module["preRun"] = [ Module["preRun"] ];
  while (Module["preRun"].length) {
   addOnPreRun(Module["preRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPRERUN__);
}
function ensureInitRuntime() {
 checkStackCookie();
 if (runtimeInitialized) return;
 runtimeInitialized = true;
 callRuntimeCallbacks(__ATINIT__);
}
function preMain() {
 checkStackCookie();
 callRuntimeCallbacks(__ATMAIN__);
}
function exitRuntime() {
 checkStackCookie();
 callRuntimeCallbacks(__ATEXIT__);
 runtimeExited = true;
}
function postRun() {
 checkStackCookie();
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
function writeArrayToMemory(array, buffer) {
 assert(array.length >= 0, "writeArrayToMemory array must have a length (should be an array or typed array)");
 HEAP8.set(array, buffer);
}
function writeAsciiToMemory(str, buffer, dontAddNull) {
 for (var i = 0; i < str.length; ++i) {
  assert(str.charCodeAt(i) === str.charCodeAt(i) & 255);
  HEAP8[buffer++ >> 0] = str.charCodeAt(i);
 }
 if (!dontAddNull) HEAP8[buffer >> 0] = 0;
}
assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
var Math_abs = Math.abs;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_min = Math.min;
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null;
var runDependencyTracking = {};
function getUniqueRunDependency(id) {
 var orig = id;
 while (1) {
  if (!runDependencyTracking[id]) return id;
  id = orig + Math.random();
 }
 return id;
}
function addRunDependency(id) {
 runDependencies++;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
 if (id) {
  assert(!runDependencyTracking[id]);
  runDependencyTracking[id] = 1;
  if (runDependencyWatcher === null && typeof setInterval !== "undefined") {
   runDependencyWatcher = setInterval((function() {
    if (ABORT) {
     clearInterval(runDependencyWatcher);
     runDependencyWatcher = null;
     return;
    }
    var shown = false;
    for (var dep in runDependencyTracking) {
     if (!shown) {
      shown = true;
      err("still waiting on run dependencies:");
     }
     err("dependency: " + dep);
    }
    if (shown) {
     err("(end of list)");
    }
   }), 1e4);
  }
 } else {
  err("warning: run dependency added without ID");
 }
}
function removeRunDependency(id) {
 runDependencies--;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
 if (id) {
  assert(runDependencyTracking[id]);
  delete runDependencyTracking[id];
 } else {
  err("warning: run dependency removed without ID");
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
var dataURIPrefix = "data:application/octet-stream;base64,";
function isDataURI(filename) {
 return String.prototype.startsWith ? filename.startsWith(dataURIPrefix) : filename.indexOf(dataURIPrefix) === 0;
}
var wasmBinaryFile = ""+Coldbrew._parseUrl(_scriptDir, "origin")+Coldbrew._parseUrl(_scriptDir, "pathname").split("/").slice(0, -1).join("/")+"/coldbrew.asm.wasm"+"";
if (!isDataURI(wasmBinaryFile)) {
 wasmBinaryFile = wasmBinaryFile;
}
function mergeMemory(newBuffer) {
 var oldBuffer = Module["buffer"];
 if (newBuffer.byteLength < oldBuffer.byteLength) {
  err("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here");
 }
 var oldView = new Int8Array(oldBuffer);
 var newView = new Int8Array(newBuffer);
 newView.set(oldView);
 updateGlobalBuffer(newBuffer);
 updateGlobalBufferViews();
}
function getBinary() {
 try {
  if (Module["wasmBinary"]) {
   return new Uint8Array(Module["wasmBinary"]);
  }
  if (Module["readBinary"]) {
   return Module["readBinary"](wasmBinaryFile);
  } else {
   throw "both async and sync fetching of the wasm failed";
  }
 } catch (err) {
  abort(err);
 }
}
function getBinaryPromise() {
 if (!Module["wasmBinary"] && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === "function") {
  return fetch(wasmBinaryFile, {
   credentials: "same-origin"
  }).then((function(response) {
   if (!response["ok"]) {
    throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
   }
   return response["arrayBuffer"]();
  })).catch((function() {
   return getBinary();
  }));
 }
 return new Promise((function(resolve, reject) {
  resolve(getBinary());
 }));
}
function createWasm(env) {
 if (typeof WebAssembly !== "object") {
  abort("No WebAssembly support found. Build with -s WASM=0 to target JavaScript instead.");
  err("no native wasm support detected");
  return false;
 }
 if (!(Module["wasmMemory"] instanceof WebAssembly.Memory)) {
  err("no native wasm Memory in use");
  return false;
 }
 env["memory"] = Module["wasmMemory"];
 var info = {
  "global": {
   "NaN": NaN,
   "Infinity": Infinity
  },
  "global.Math": Math,
  "env": env,
  "asm2wasm": asm2wasmImports,
  "parent": Module
 };
 function receiveInstance(instance, module) {
  var exports = instance.exports;
  if (exports.memory) mergeMemory(exports.memory);
  Module["asm"] = exports;
  removeRunDependency("wasm-instantiate");
 }
 addRunDependency("wasm-instantiate");
 if (Module["instantiateWasm"]) {
  try {
   return Module["instantiateWasm"](info, receiveInstance);
  } catch (e) {
   err("Module.instantiateWasm callback failed with error: " + e);
   return false;
  }
 }
 var trueModule = Module;
 function receiveInstantiatedSource(output) {
  assert(Module === trueModule, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
  trueModule = null;
  receiveInstance(output["instance"]);
 }
 function instantiateArrayBuffer(receiver) {
  getBinaryPromise().then((function(binary) {
   return WebAssembly.instantiate(binary, info);
  })).then(receiver, (function(reason) {
   err("failed to asynchronously prepare wasm: " + reason);
   abort(reason);
  }));
 }
 if (!Module["wasmBinary"] && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && typeof fetch === "function") {
  WebAssembly.instantiateStreaming(fetch(wasmBinaryFile, {
   credentials: "same-origin"
  }), info).then(receiveInstantiatedSource, (function(reason) {
   err("wasm streaming compile failed: " + reason);
   err("falling back to ArrayBuffer instantiation");
   instantiateArrayBuffer(receiveInstantiatedSource);
  }));
 } else {
  instantiateArrayBuffer(receiveInstantiatedSource);
 }
 return {};
}
var wasmReallocBuffer = (function(size) {
 var PAGE_MULTIPLE = 65536;
 size = alignUp(size, PAGE_MULTIPLE);
 var old = Module["buffer"];
 var oldSize = old.byteLength;
 try {
  var result = Module["wasmMemory"].grow((size - oldSize) / 65536);
  if (result !== (-1 | 0)) {
   return Module["buffer"] = Module["wasmMemory"].buffer;
  } else {
   return null;
  }
 } catch (e) {
  console.error("Module.reallocBuffer: Attempted to grow from " + oldSize + " bytes to " + size + " bytes, but got error: " + e);
  return null;
 }
});
Module["reallocBuffer"] = (function(size) {
 return wasmReallocBuffer(size);
});
Module["asm"] = (function(global, env, providedBuffer) {
 if (!env["table"]) {
  assert(Module["wasmTableSize"] !== undefined);
  var TABLE_SIZE = Module["wasmTableSize"];
  var MAX_TABLE_SIZE = Module["wasmMaxTableSize"];
  if (typeof WebAssembly === "object" && typeof WebAssembly.Table === "function") {
   if (MAX_TABLE_SIZE !== undefined) {
    env["table"] = new WebAssembly.Table({
     "initial": TABLE_SIZE,
     "maximum": MAX_TABLE_SIZE,
     "element": "anyfunc"
    });
   } else {
    env["table"] = new WebAssembly.Table({
     "initial": TABLE_SIZE,
     element: "anyfunc"
    });
   }
  } else {
   env["table"] = new Array(TABLE_SIZE);
  }
  Module["wasmTable"] = env["table"];
 }
 if (!env["__memory_base"]) {
  env["__memory_base"] = Module["STATIC_BASE"];
 }
 if (!env["__table_base"]) {
  env["__table_base"] = 0;
 }
 var exports = createWasm(env);
 assert(exports, "binaryen setup failed (no wasm support?)");
 return exports;
});
STATIC_BASE = GLOBAL_BASE;
__ATINIT__.push({
 func: (function() {
  ___emscripten_environ_constructor();
 })
});
var STATIC_BUMP = 1710448;
Module["STATIC_BASE"] = STATIC_BASE;
Module["STATIC_BUMP"] = STATIC_BUMP;
var tempDoublePtr = 1711456;
assert(tempDoublePtr % 8 == 0);
var EMTSTACKTOP = getMemory(1048576);
var EMT_STACK_MAX = EMTSTACKTOP + 1048576;
var eb = getMemory(3712792);
assert(eb % 8 === 0);
__ATPRERUN__.push((function() {
 var bytecodeFile = Module["emterpreterFile"];
 if (!(bytecodeFile instanceof ArrayBuffer)) {
  throw "bad or missing emterpreter file. If you compiled to JS (and not HTML) make sure you set Module['emterpreterFile']";
 }
 var codeSize = 3712792;
 HEAPU8.set((new Uint8Array(bytecodeFile)).subarray(0, codeSize), eb);
 assert(HEAPU8[eb] === 140);
 assert(HEAPU8[eb + 1] === 0);
 assert(HEAPU8[eb + 2] === 123);
 assert(HEAPU8[eb + 3] === 0);
 var relocationsStart = codeSize + 3 >> 2;
 var relocations = (new Uint32Array(bytecodeFile)).subarray(relocationsStart);
 assert(relocations.length === 204186);
 if (relocations.length > 0) {
  assert(relocations[0] === 80);
 }
 for (var i = 0; i < relocations.length; i++) {
  assert(relocations[i] % 4 === 0);
  assert(relocations[i] >= 0 && relocations[i] < eb + 3712792);
  assert(HEAPU32[eb + relocations[i] >> 2] + eb < -1 >>> 0, [ i, relocations[i] ]);
  HEAPU32[eb + relocations[i] >> 2] = HEAPU32[eb + relocations[i] >> 2] + eb;
 }
}));
var ENV = {};
function ___buildEnvironment(environ) {
 var MAX_ENV_VALUES = 64;
 var TOTAL_ENV_SIZE = 1024;
 var poolPtr;
 var envPtr;
 if (!___buildEnvironment.called) {
  ___buildEnvironment.called = true;
  ENV["USER"] = ENV["LOGNAME"] = "web_user";
  ENV["PATH"] = "/";
  ENV["PWD"] = "/";
  ENV["HOME"] = "/home/web_user";
  ENV["LANG"] = "C.UTF-8";
  ENV["_"] = Module["thisProgram"];
  poolPtr = getMemory(TOTAL_ENV_SIZE);
  envPtr = getMemory(MAX_ENV_VALUES * 4);
  HEAP32[envPtr >> 2] = poolPtr;
  HEAP32[environ >> 2] = envPtr;
 } else {
  envPtr = HEAP32[environ >> 2];
  poolPtr = HEAP32[envPtr >> 2];
 }
 var strings = [];
 var totalSize = 0;
 for (var key in ENV) {
  if (typeof ENV[key] === "string") {
   var line = key + "=" + ENV[key];
   strings.push(line);
   totalSize += line.length;
  }
 }
 if (totalSize > TOTAL_ENV_SIZE) {
  throw new Error("Environment size exceeded TOTAL_ENV_SIZE!");
 }
 var ptrSize = 4;
 for (var i = 0; i < strings.length; i++) {
  var line = strings[i];
  writeAsciiToMemory(line, poolPtr);
  HEAP32[envPtr + i * ptrSize >> 2] = poolPtr;
  poolPtr += line.length + 1;
 }
 HEAP32[envPtr + strings.length * ptrSize >> 2] = 0;
}
function ___libc_current_sigrtmax() {
 err("Calling stub instead of __libc_current_sigrtmax");
 return 0;
}
function ___libc_current_sigrtmin() {
 err("Calling stub instead of __libc_current_sigrtmin");
 return 0;
}
function ___lock() {}
function ___setErrNo(value) {
 if (Module["___errno_location"]) HEAP32[Module["___errno_location"]() >> 2] = value; else err("failed to set errno from JS");
 return value;
}
function ___map_file(pathname, size) {
 ___setErrNo(1);
 return -1;
}
var PATH = {
 splitPath: (function(filename) {
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  return splitPathRe.exec(filename).slice(1);
 }),
 normalizeArray: (function(parts, allowAboveRoot) {
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
   for (; up; up--) {
    parts.unshift("..");
   }
  }
  return parts;
 }),
 normalize: (function(path) {
  var isAbsolute = path.charAt(0) === "/", trailingSlash = path.substr(-1) === "/";
  path = PATH.normalizeArray(path.split("/").filter((function(p) {
   return !!p;
  })), !isAbsolute).join("/");
  if (!path && !isAbsolute) {
   path = ".";
  }
  if (path && trailingSlash) {
   path += "/";
  }
  return (isAbsolute ? "/" : "") + path;
 }),
 dirname: (function(path) {
  var result = PATH.splitPath(path), root = result[0], dir = result[1];
  if (!root && !dir) {
   return ".";
  }
  if (dir) {
   dir = dir.substr(0, dir.length - 1);
  }
  return root + dir;
 }),
 basename: (function(path) {
  if (path === "/") return "/";
  var lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return path;
  return path.substr(lastSlash + 1);
 }),
 extname: (function(path) {
  return PATH.splitPath(path)[3];
 }),
 join: (function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return PATH.normalize(paths.join("/"));
 }),
 join2: (function(l, r) {
  return PATH.normalize(l + "/" + r);
 }),
 resolve: (function() {
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
  resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter((function(p) {
   return !!p;
  })), !resolvedAbsolute).join("/");
  return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
 }),
 relative: (function(from, to) {
  from = PATH.resolve(from).substr(1);
  to = PATH.resolve(to).substr(1);
  function trim(arr) {
   var start = 0;
   for (; start < arr.length; start++) {
    if (arr[start] !== "") break;
   }
   var end = arr.length - 1;
   for (; end >= 0; end--) {
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
 })
};
var TTY = {
 ttys: [],
 init: (function() {}),
 shutdown: (function() {}),
 register: (function(dev, ops) {
  TTY.ttys[dev] = {
   input: [],
   output: [],
   ops: ops
  };
  FS.registerDevice(dev, TTY.stream_ops);
 }),
 stream_ops: {
  open: (function(stream) {
   var tty = TTY.ttys[stream.node.rdev];
   if (!tty) {
    throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
   }
   stream.tty = tty;
   stream.seekable = false;
  }),
  close: (function(stream) {
   stream.tty.ops.flush(stream.tty);
  }),
  flush: (function(stream) {
   stream.tty.ops.flush(stream.tty);
  }),
  read: (function(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.get_char) {
    throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
   }
   var bytesRead = 0;
   for (var i = 0; i < length; i++) {
    var result;
    try {
     result = stream.tty.ops.get_char(stream.tty);
    } catch (e) {
     throw new FS.ErrnoError(ERRNO_CODES.EIO);
    }
    if (result === undefined && bytesRead === 0) {
     throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
    }
    if (result === null || result === undefined) break;
    bytesRead++;
    buffer[offset + i] = result;
   }
   if (bytesRead) {
    stream.node.timestamp = Date.now();
   }
   return bytesRead;
  }),
  write: (function(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.put_char) {
    throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
   }
   try {
    for (var i = 0; i < length; i++) {
     stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
    }
   } catch (e) {
    throw new FS.ErrnoError(ERRNO_CODES.EIO);
   }
   if (length) {
    stream.node.timestamp = Date.now();
   }
   return i;
  })
 },
 default_tty_ops: {
  get_char: (function(tty) {
   if (!tty.input.length) {
    var result = null;
    if (ENVIRONMENT_IS_NODE) {
     var BUFSIZE = 256;
     var buf = new Buffer(BUFSIZE);
     var bytesRead = 0;
     var isPosixPlatform = process.platform != "win32";
     var fd = process.stdin.fd;
     if (isPosixPlatform) {
      var usingDevice = false;
      try {
       fd = fs.openSync("/dev/stdin", "r");
       usingDevice = true;
      } catch (e) {}
     }
     try {
      bytesRead = fs.readSync(fd, buf, 0, BUFSIZE, null);
     } catch (e) {
      if (e.toString().indexOf("EOF") != -1) bytesRead = 0; else throw e;
     }
     if (usingDevice) {
      fs.closeSync(fd);
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
  }),
  put_char: (function(tty, val) {
   if (val === null || val === 10) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  }),
  flush: (function(tty) {
   if (tty.output && tty.output.length > 0) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  })
 },
 default_tty1_ops: {
  put_char: (function(tty, val) {
   if (val === null || val === 10) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  }),
  flush: (function(tty) {
   if (tty.output && tty.output.length > 0) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  })
 }
};
var MEMFS = {
 ops_table: null,
 mount: (function(mount) {
  return MEMFS.createNode(null, "/", 16384 | 511, 0);
 }),
 createNode: (function(parent, name, mode, dev) {
  if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
   throw new FS.ErrnoError(ERRNO_CODES.EPERM);
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
 }),
 getFileDataAsRegularArray: (function(node) {
  if (node.contents && node.contents.subarray) {
   var arr = [];
   for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
   return arr;
  }
  return node.contents;
 }),
 getFileDataAsTypedArray: (function(node) {
  if (!node.contents) return new Uint8Array;
  if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
  return new Uint8Array(node.contents);
 }),
 expandFileStorage: (function(node, newCapacity) {
  if (node.contents && node.contents.subarray && newCapacity > node.contents.length) {
   node.contents = MEMFS.getFileDataAsRegularArray(node);
   node.usedBytes = node.contents.length;
  }
  if (!node.contents || node.contents.subarray) {
   var prevCapacity = node.contents ? node.contents.length : 0;
   if (prevCapacity >= newCapacity) return;
   var CAPACITY_DOUBLING_MAX = 1024 * 1024;
   newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) | 0);
   if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
   var oldContents = node.contents;
   node.contents = new Uint8Array(newCapacity);
   if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
   return;
  }
  if (!node.contents && newCapacity > 0) node.contents = [];
  while (node.contents.length < newCapacity) node.contents.push(0);
 }),
 resizeFileStorage: (function(node, newSize) {
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
 }),
 node_ops: {
  getattr: (function(node) {
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
  }),
  setattr: (function(node, attr) {
   if (attr.mode !== undefined) {
    node.mode = attr.mode;
   }
   if (attr.timestamp !== undefined) {
    node.timestamp = attr.timestamp;
   }
   if (attr.size !== undefined) {
    MEMFS.resizeFileStorage(node, attr.size);
   }
  }),
  lookup: (function(parent, name) {
   throw FS.genericErrors[ERRNO_CODES.ENOENT];
  }),
  mknod: (function(parent, name, mode, dev) {
   return MEMFS.createNode(parent, name, mode, dev);
  }),
  rename: (function(old_node, new_dir, new_name) {
   if (FS.isDir(old_node.mode)) {
    var new_node;
    try {
     new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}
    if (new_node) {
     for (var i in new_node.contents) {
      throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
     }
    }
   }
   delete old_node.parent.contents[old_node.name];
   old_node.name = new_name;
   new_dir.contents[new_name] = old_node;
   old_node.parent = new_dir;
  }),
  unlink: (function(parent, name) {
   delete parent.contents[name];
  }),
  rmdir: (function(parent, name) {
   var node = FS.lookupNode(parent, name);
   for (var i in node.contents) {
    throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
   }
   delete parent.contents[name];
  }),
  readdir: (function(node) {
   var entries = [ ".", ".." ];
   for (var key in node.contents) {
    if (!node.contents.hasOwnProperty(key)) {
     continue;
    }
    entries.push(key);
   }
   return entries;
  }),
  symlink: (function(parent, newname, oldpath) {
   var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
   node.link = oldpath;
   return node;
  }),
  readlink: (function(node) {
   if (!FS.isLink(node.mode)) {
    throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
   }
   return node.link;
  })
 },
 stream_ops: {
  read: (function(stream, buffer, offset, length, position) {
   var contents = stream.node.contents;
   if (position >= stream.node.usedBytes) return 0;
   var size = Math.min(stream.node.usedBytes - position, length);
   assert(size >= 0);
   if (size > 8 && contents.subarray) {
    buffer.set(contents.subarray(position, position + size), offset);
   } else {
    for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
   }
   return size;
  }),
  write: (function(stream, buffer, offset, length, position, canOwn) {
   if (canOwn) {
    warnOnce("file packager has copied file data into memory, but in memory growth we are forced to copy it again (see --no-heap-copy)");
   }
   canOwn = false;
   if (!length) return 0;
   var node = stream.node;
   node.timestamp = Date.now();
   if (buffer.subarray && (!node.contents || node.contents.subarray)) {
    if (canOwn) {
     assert(position === 0, "canOwn must imply no weird position inside the file");
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
  }),
  llseek: (function(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     position += stream.node.usedBytes;
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
   }
   return position;
  }),
  allocate: (function(stream, offset, length) {
   MEMFS.expandFileStorage(stream.node, offset + length);
   stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
  }),
  mmap: (function(stream, buffer, offset, length, position, prot, flags) {
   if (!FS.isFile(stream.node.mode)) {
    throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
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
    ptr = _malloc(length);
    if (!ptr) {
     throw new FS.ErrnoError(ERRNO_CODES.ENOMEM);
    }
    buffer.set(contents, ptr);
   }
   return {
    ptr: ptr,
    allocated: allocated
   };
  }),
  msync: (function(stream, buffer, offset, length, mmapFlags) {
   if (!FS.isFile(stream.node.mode)) {
    throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
   }
   if (mmapFlags & 2) {
    return 0;
   }
   var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
   return 0;
  })
 }
};
var IDBFS = {
 dbs: {},
 indexedDB: (function() {
  if (typeof indexedDB !== "undefined") return indexedDB;
  var ret = null;
  if (typeof window === "object") ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  assert(ret, "IDBFS used, but indexedDB not supported");
  return ret;
 }),
 DB_VERSION: 21,
 DB_STORE_NAME: "FILE_DATA",
 mount: (function(mount) {
  return MEMFS.mount.apply(null, arguments);
 }),
 syncfs: (function(mount, populate, callback) {
  IDBFS.getLocalSet(mount, (function(err, local) {
   if (err) return callback(err);
   IDBFS.getRemoteSet(mount, (function(err, remote) {
    if (err) return callback(err);
    var src = populate ? remote : local;
    var dst = populate ? local : remote;
    IDBFS.reconcile(src, dst, callback);
   }));
  }));
 }),
 getDB: (function(name, callback) {
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
  req.onupgradeneeded = (function(e) {
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
  });
  req.onsuccess = (function() {
   db = req.result;
   IDBFS.dbs[name] = db;
   callback(null, db);
  });
  req.onerror = (function(e) {
   callback(this.error);
   e.preventDefault();
  });
 }),
 getLocalSet: (function(mount, callback) {
  var entries = {};
  function isRealDir(p) {
   return p !== "." && p !== "..";
  }
  function toAbsolute(root) {
   return (function(p) {
    return PATH.join2(root, p);
   });
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
 }),
 getRemoteSet: (function(mount, callback) {
  var entries = {};
  IDBFS.getDB(mount.mountpoint, (function(err, db) {
   if (err) return callback(err);
   try {
    var transaction = db.transaction([ IDBFS.DB_STORE_NAME ], "readonly");
    transaction.onerror = (function(e) {
     callback(this.error);
     e.preventDefault();
    });
    var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
    var index = store.index("timestamp");
    index.openKeyCursor().onsuccess = (function(event) {
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
    });
   } catch (e) {
    return callback(e);
   }
  }));
 }),
 loadLocalEntry: (function(path, callback) {
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
 }),
 storeLocalEntry: (function(path, entry, callback) {
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
 }),
 removeLocalEntry: (function(path, callback) {
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
 }),
 loadRemoteEntry: (function(store, path, callback) {
  var req = store.get(path);
  req.onsuccess = (function(event) {
   callback(null, event.target.result);
  });
  req.onerror = (function(e) {
   callback(this.error);
   e.preventDefault();
  });
 }),
 storeRemoteEntry: (function(store, path, entry, callback) {
  var req = store.put(entry, path);
  req.onsuccess = (function() {
   callback(null);
  });
  req.onerror = (function(e) {
   callback(this.error);
   e.preventDefault();
  });
 }),
 removeRemoteEntry: (function(store, path, callback) {
  var req = store.delete(path);
  req.onsuccess = (function() {
   callback(null);
  });
  req.onerror = (function(e) {
   callback(this.error);
   e.preventDefault();
  });
 }),
 reconcile: (function(src, dst, callback) {
  var total = 0;
  var create = [];
  Object.keys(src.entries).forEach((function(key) {
   var e = src.entries[key];
   var e2 = dst.entries[key];
   if (!e2 || e.timestamp > e2.timestamp) {
    create.push(key);
    total++;
   }
  }));
  var remove = [];
  Object.keys(dst.entries).forEach((function(key) {
   var e = dst.entries[key];
   var e2 = src.entries[key];
   if (!e2) {
    remove.push(key);
    total++;
   }
  }));
  if (!total) {
   return callback(null);
  }
  var completed = 0;
  var db = src.type === "remote" ? src.db : dst.db;
  var transaction = db.transaction([ IDBFS.DB_STORE_NAME ], "readwrite");
  var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  function done(err) {
   if (err) {
    if (!done.errored) {
     done.errored = true;
     return callback(err);
    }
    return;
   }
   if (++completed >= total) {
    return callback(null);
   }
  }
  transaction.onerror = (function(e) {
   done(this.error);
   e.preventDefault();
  });
  create.sort().forEach((function(path) {
   if (dst.type === "local") {
    IDBFS.loadRemoteEntry(store, path, (function(err, entry) {
     if (err) return done(err);
     IDBFS.storeLocalEntry(path, entry, done);
    }));
   } else {
    IDBFS.loadLocalEntry(path, (function(err, entry) {
     if (err) return done(err);
     IDBFS.storeRemoteEntry(store, path, entry, done);
    }));
   }
  }));
  remove.sort().reverse().forEach((function(path) {
   if (dst.type === "local") {
    IDBFS.removeLocalEntry(path, done);
   } else {
    IDBFS.removeRemoteEntry(store, path, done);
   }
  }));
 })
};
var NODEFS = {
 isWindows: false,
 staticInit: (function() {
  NODEFS.isWindows = !!process.platform.match(/^win/);
  var flags = process["binding"]("constants");
  if (flags["fs"]) {
   flags = flags["fs"];
  }
  NODEFS.flagsForNodeMap = {
   "1024": flags["O_APPEND"],
   "64": flags["O_CREAT"],
   "128": flags["O_EXCL"],
   "0": flags["O_RDONLY"],
   "2": flags["O_RDWR"],
   "4096": flags["O_SYNC"],
   "512": flags["O_TRUNC"],
   "1": flags["O_WRONLY"]
  };
 }),
 bufferFrom: (function(arrayBuffer) {
  return Buffer.alloc ? Buffer.from(arrayBuffer) : new Buffer(arrayBuffer);
 }),
 mount: (function(mount) {
  assert(ENVIRONMENT_IS_NODE);
  return NODEFS.createNode(null, "/", NODEFS.getMode(mount.opts.root), 0);
 }),
 createNode: (function(parent, name, mode, dev) {
  if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
   throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
  }
  var node = FS.createNode(parent, name, mode);
  node.node_ops = NODEFS.node_ops;
  node.stream_ops = NODEFS.stream_ops;
  return node;
 }),
 getMode: (function(path) {
  var stat;
  try {
   stat = fs.lstatSync(path);
   if (NODEFS.isWindows) {
    stat.mode = stat.mode | (stat.mode & 292) >> 2;
   }
  } catch (e) {
   if (!e.code) throw e;
   throw new FS.ErrnoError(ERRNO_CODES[e.code]);
  }
  return stat.mode;
 }),
 realPath: (function(node) {
  var parts = [];
  while (node.parent !== node) {
   parts.push(node.name);
   node = node.parent;
  }
  parts.push(node.mount.opts.root);
  parts.reverse();
  return PATH.join.apply(null, parts);
 }),
 flagsForNode: (function(flags) {
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
   throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
  }
 }),
 node_ops: {
  getattr: (function(node) {
   var path = NODEFS.realPath(node);
   var stat;
   try {
    stat = fs.lstatSync(path);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(ERRNO_CODES[e.code]);
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
  }),
  setattr: (function(node, attr) {
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
    throw new FS.ErrnoError(ERRNO_CODES[e.code]);
   }
  }),
  lookup: (function(parent, name) {
   var path = PATH.join2(NODEFS.realPath(parent), name);
   var mode = NODEFS.getMode(path);
   return NODEFS.createNode(parent, name, mode);
  }),
  mknod: (function(parent, name, mode, dev) {
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
    throw new FS.ErrnoError(ERRNO_CODES[e.code]);
   }
   return node;
  }),
  rename: (function(oldNode, newDir, newName) {
   var oldPath = NODEFS.realPath(oldNode);
   var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
   try {
    fs.renameSync(oldPath, newPath);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(ERRNO_CODES[e.code]);
   }
  }),
  unlink: (function(parent, name) {
   var path = PATH.join2(NODEFS.realPath(parent), name);
   try {
    fs.unlinkSync(path);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(ERRNO_CODES[e.code]);
   }
  }),
  rmdir: (function(parent, name) {
   var path = PATH.join2(NODEFS.realPath(parent), name);
   try {
    fs.rmdirSync(path);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(ERRNO_CODES[e.code]);
   }
  }),
  readdir: (function(node) {
   var path = NODEFS.realPath(node);
   try {
    return fs.readdirSync(path);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(ERRNO_CODES[e.code]);
   }
  }),
  symlink: (function(parent, newName, oldPath) {
   var newPath = PATH.join2(NODEFS.realPath(parent), newName);
   try {
    fs.symlinkSync(oldPath, newPath);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(ERRNO_CODES[e.code]);
   }
  }),
  readlink: (function(node) {
   var path = NODEFS.realPath(node);
   try {
    path = fs.readlinkSync(path);
    path = NODEJS_PATH.relative(NODEJS_PATH.resolve(node.mount.opts.root), path);
    return path;
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(ERRNO_CODES[e.code]);
   }
  })
 },
 stream_ops: {
  open: (function(stream) {
   var path = NODEFS.realPath(stream.node);
   try {
    if (FS.isFile(stream.node.mode)) {
     stream.nfd = fs.openSync(path, NODEFS.flagsForNode(stream.flags));
    }
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(ERRNO_CODES[e.code]);
   }
  }),
  close: (function(stream) {
   try {
    if (FS.isFile(stream.node.mode) && stream.nfd) {
     fs.closeSync(stream.nfd);
    }
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(ERRNO_CODES[e.code]);
   }
  }),
  read: (function(stream, buffer, offset, length, position) {
   if (length === 0) return 0;
   try {
    return fs.readSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position);
   } catch (e) {
    throw new FS.ErrnoError(ERRNO_CODES[e.code]);
   }
  }),
  write: (function(stream, buffer, offset, length, position) {
   try {
    return fs.writeSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position);
   } catch (e) {
    throw new FS.ErrnoError(ERRNO_CODES[e.code]);
   }
  }),
  llseek: (function(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     try {
      var stat = fs.fstatSync(stream.nfd);
      position += stat.size;
     } catch (e) {
      throw new FS.ErrnoError(ERRNO_CODES[e.code]);
     }
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
   }
   return position;
  })
 }
};
var WORKERFS = {
 DIR_MODE: 16895,
 FILE_MODE: 33279,
 reader: null,
 mount: (function(mount) {
  assert(ENVIRONMENT_IS_WORKER);
  if (!WORKERFS.reader) WORKERFS.reader = new FileReaderSync;
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
  Array.prototype.forEach.call(mount.opts["files"] || [], (function(file) {
   WORKERFS.createNode(ensureParent(file.name), base(file.name), WORKERFS.FILE_MODE, 0, file, file.lastModifiedDate);
  }));
  (mount.opts["blobs"] || []).forEach((function(obj) {
   WORKERFS.createNode(ensureParent(obj["name"]), base(obj["name"]), WORKERFS.FILE_MODE, 0, obj["data"]);
  }));
  (mount.opts["packages"] || []).forEach((function(pack) {
   pack["metadata"].files.forEach((function(file) {
    var name = file.filename.substr(1);
    WORKERFS.createNode(ensureParent(name), base(name), WORKERFS.FILE_MODE, 0, pack["blob"].slice(file.start, file.end));
   }));
  }));
  return root;
 }),
 createNode: (function(parent, name, mode, dev, contents, mtime) {
  var node = FS.createNode(parent, name, mode);
  node.mode = mode;
  node.node_ops = WORKERFS.node_ops;
  node.stream_ops = WORKERFS.stream_ops;
  node.timestamp = (mtime || new Date).getTime();
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
 }),
 node_ops: {
  getattr: (function(node) {
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
  }),
  setattr: (function(node, attr) {
   if (attr.mode !== undefined) {
    node.mode = attr.mode;
   }
   if (attr.timestamp !== undefined) {
    node.timestamp = attr.timestamp;
   }
  }),
  lookup: (function(parent, name) {
   throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
  }),
  mknod: (function(parent, name, mode, dev) {
   throw new FS.ErrnoError(ERRNO_CODES.EPERM);
  }),
  rename: (function(oldNode, newDir, newName) {
   throw new FS.ErrnoError(ERRNO_CODES.EPERM);
  }),
  unlink: (function(parent, name) {
   throw new FS.ErrnoError(ERRNO_CODES.EPERM);
  }),
  rmdir: (function(parent, name) {
   throw new FS.ErrnoError(ERRNO_CODES.EPERM);
  }),
  readdir: (function(node) {
   var entries = [ ".", ".." ];
   for (var key in node.contents) {
    if (!node.contents.hasOwnProperty(key)) {
     continue;
    }
    entries.push(key);
   }
   return entries;
  }),
  symlink: (function(parent, newName, oldPath) {
   throw new FS.ErrnoError(ERRNO_CODES.EPERM);
  }),
  readlink: (function(node) {
   throw new FS.ErrnoError(ERRNO_CODES.EPERM);
  })
 },
 stream_ops: {
  read: (function(stream, buffer, offset, length, position) {
   if (position >= stream.node.size) return 0;
   var chunk = stream.node.contents.slice(position, position + length);
   var ab = WORKERFS.reader.readAsArrayBuffer(chunk);
   buffer.set(new Uint8Array(ab), offset);
   return chunk.size;
  }),
  write: (function(stream, buffer, offset, length, position) {
   throw new FS.ErrnoError(ERRNO_CODES.EIO);
  }),
  llseek: (function(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     position += stream.node.size;
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
   }
   return position;
  })
 }
};
var ERRNO_MESSAGES = {
 0: "Success",
 1: "Not super-user",
 2: "No such file or directory",
 3: "No such process",
 4: "Interrupted system call",
 5: "I/O error",
 6: "No such device or address",
 7: "Arg list too long",
 8: "Exec format error",
 9: "Bad file number",
 10: "No children",
 11: "No more processes",
 12: "Not enough core",
 13: "Permission denied",
 14: "Bad address",
 15: "Block device required",
 16: "Mount device busy",
 17: "File exists",
 18: "Cross-device link",
 19: "No such device",
 20: "Not a directory",
 21: "Is a directory",
 22: "Invalid argument",
 23: "Too many open files in system",
 24: "Too many open files",
 25: "Not a typewriter",
 26: "Text file busy",
 27: "File too large",
 28: "No space left on device",
 29: "Illegal seek",
 30: "Read only file system",
 31: "Too many links",
 32: "Broken pipe",
 33: "Math arg out of domain of func",
 34: "Math result not representable",
 35: "File locking deadlock error",
 36: "File or path name too long",
 37: "No record locks available",
 38: "Function not implemented",
 39: "Directory not empty",
 40: "Too many symbolic links",
 42: "No message of desired type",
 43: "Identifier removed",
 44: "Channel number out of range",
 45: "Level 2 not synchronized",
 46: "Level 3 halted",
 47: "Level 3 reset",
 48: "Link number out of range",
 49: "Protocol driver not attached",
 50: "No CSI structure available",
 51: "Level 2 halted",
 52: "Invalid exchange",
 53: "Invalid request descriptor",
 54: "Exchange full",
 55: "No anode",
 56: "Invalid request code",
 57: "Invalid slot",
 59: "Bad font file fmt",
 60: "Device not a stream",
 61: "No data (for no delay io)",
 62: "Timer expired",
 63: "Out of streams resources",
 64: "Machine is not on the network",
 65: "Package not installed",
 66: "The object is remote",
 67: "The link has been severed",
 68: "Advertise error",
 69: "Srmount error",
 70: "Communication error on send",
 71: "Protocol error",
 72: "Multihop attempted",
 73: "Cross mount point (not really error)",
 74: "Trying to read unreadable message",
 75: "Value too large for defined data type",
 76: "Given log. name not unique",
 77: "f.d. invalid for this operation",
 78: "Remote address changed",
 79: "Can   access a needed shared lib",
 80: "Accessing a corrupted shared lib",
 81: ".lib section in a.out corrupted",
 82: "Attempting to link in too many libs",
 83: "Attempting to exec a shared library",
 84: "Illegal byte sequence",
 86: "Streams pipe error",
 87: "Too many users",
 88: "Socket operation on non-socket",
 89: "Destination address required",
 90: "Message too long",
 91: "Protocol wrong type for socket",
 92: "Protocol not available",
 93: "Unknown protocol",
 94: "Socket type not supported",
 95: "Not supported",
 96: "Protocol family not supported",
 97: "Address family not supported by protocol family",
 98: "Address already in use",
 99: "Address not available",
 100: "Network interface is not configured",
 101: "Network is unreachable",
 102: "Connection reset by network",
 103: "Connection aborted",
 104: "Connection reset by peer",
 105: "No buffer space available",
 106: "Socket is already connected",
 107: "Socket is not connected",
 108: "Can't send after socket shutdown",
 109: "Too many references",
 110: "Connection timed out",
 111: "Connection refused",
 112: "Host is down",
 113: "Host is unreachable",
 114: "Socket already connected",
 115: "Connection already in progress",
 116: "Stale file handle",
 122: "Quota exceeded",
 123: "No medium (in tape drive)",
 125: "Operation canceled",
 130: "Previous owner died",
 131: "State not recoverable"
};
var ERRNO_CODES = {
 EPERM: 1,
 ENOENT: 2,
 ESRCH: 3,
 EINTR: 4,
 EIO: 5,
 ENXIO: 6,
 E2BIG: 7,
 ENOEXEC: 8,
 EBADF: 9,
 ECHILD: 10,
 EAGAIN: 11,
 EWOULDBLOCK: 11,
 ENOMEM: 12,
 EACCES: 13,
 EFAULT: 14,
 ENOTBLK: 15,
 EBUSY: 16,
 EEXIST: 17,
 EXDEV: 18,
 ENODEV: 19,
 ENOTDIR: 20,
 EISDIR: 21,
 EINVAL: 22,
 ENFILE: 23,
 EMFILE: 24,
 ENOTTY: 25,
 ETXTBSY: 26,
 EFBIG: 27,
 ENOSPC: 28,
 ESPIPE: 29,
 EROFS: 30,
 EMLINK: 31,
 EPIPE: 32,
 EDOM: 33,
 ERANGE: 34,
 ENOMSG: 42,
 EIDRM: 43,
 ECHRNG: 44,
 EL2NSYNC: 45,
 EL3HLT: 46,
 EL3RST: 47,
 ELNRNG: 48,
 EUNATCH: 49,
 ENOCSI: 50,
 EL2HLT: 51,
 EDEADLK: 35,
 ENOLCK: 37,
 EBADE: 52,
 EBADR: 53,
 EXFULL: 54,
 ENOANO: 55,
 EBADRQC: 56,
 EBADSLT: 57,
 EDEADLOCK: 35,
 EBFONT: 59,
 ENOSTR: 60,
 ENODATA: 61,
 ETIME: 62,
 ENOSR: 63,
 ENONET: 64,
 ENOPKG: 65,
 EREMOTE: 66,
 ENOLINK: 67,
 EADV: 68,
 ESRMNT: 69,
 ECOMM: 70,
 EPROTO: 71,
 EMULTIHOP: 72,
 EDOTDOT: 73,
 EBADMSG: 74,
 ENOTUNIQ: 76,
 EBADFD: 77,
 EREMCHG: 78,
 ELIBACC: 79,
 ELIBBAD: 80,
 ELIBSCN: 81,
 ELIBMAX: 82,
 ELIBEXEC: 83,
 ENOSYS: 38,
 ENOTEMPTY: 39,
 ENAMETOOLONG: 36,
 ELOOP: 40,
 EOPNOTSUPP: 95,
 EPFNOSUPPORT: 96,
 ECONNRESET: 104,
 ENOBUFS: 105,
 EAFNOSUPPORT: 97,
 EPROTOTYPE: 91,
 ENOTSOCK: 88,
 ENOPROTOOPT: 92,
 ESHUTDOWN: 108,
 ECONNREFUSED: 111,
 EADDRINUSE: 98,
 ECONNABORTED: 103,
 ENETUNREACH: 101,
 ENETDOWN: 100,
 ETIMEDOUT: 110,
 EHOSTDOWN: 112,
 EHOSTUNREACH: 113,
 EINPROGRESS: 115,
 EALREADY: 114,
 EDESTADDRREQ: 89,
 EMSGSIZE: 90,
 EPROTONOSUPPORT: 93,
 ESOCKTNOSUPPORT: 94,
 EADDRNOTAVAIL: 99,
 ENETRESET: 102,
 EISCONN: 106,
 ENOTCONN: 107,
 ETOOMANYREFS: 109,
 EUSERS: 87,
 EDQUOT: 122,
 ESTALE: 116,
 ENOTSUP: 95,
 ENOMEDIUM: 123,
 EILSEQ: 84,
 EOVERFLOW: 75,
 ECANCELED: 125,
 ENOTRECOVERABLE: 131,
 EOWNERDEAD: 130,
 ESTRPIPE: 86
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
 handleFSError: (function(e) {
  if (!(e instanceof FS.ErrnoError)) throw e + " : " + stackTrace();
  return ___setErrNo(e.errno);
 }),
 lookupPath: (function(path, opts) {
  path = PATH.resolve(FS.cwd(), path);
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
   throw new FS.ErrnoError(40);
  }
  var parts = PATH.normalizeArray(path.split("/").filter((function(p) {
   return !!p;
  })), false);
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
     current_path = PATH.resolve(PATH.dirname(current_path), link);
     var lookup = FS.lookupPath(current_path, {
      recurse_count: opts.recurse_count
     });
     current = lookup.node;
     if (count++ > 40) {
      throw new FS.ErrnoError(40);
     }
    }
   }
  }
  return {
   path: current_path,
   node: current
  };
 }),
 getPath: (function(node) {
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
 }),
 hashName: (function(parentid, name) {
  var hash = 0;
  for (var i = 0; i < name.length; i++) {
   hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
  }
  return (parentid + hash >>> 0) % FS.nameTable.length;
 }),
 hashAddNode: (function(node) {
  var hash = FS.hashName(node.parent.id, node.name);
  node.name_next = FS.nameTable[hash];
  FS.nameTable[hash] = node;
 }),
 hashRemoveNode: (function(node) {
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
 }),
 lookupNode: (function(parent, name) {
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
 }),
 createNode: (function(parent, name, mode, rdev) {
  if (!FS.FSNode) {
   FS.FSNode = (function(parent, name, mode, rdev) {
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
   });
   FS.FSNode.prototype = {};
   var readMode = 292 | 73;
   var writeMode = 146;
   Object.defineProperties(FS.FSNode.prototype, {
    read: {
     get: (function() {
      return (this.mode & readMode) === readMode;
     }),
     set: (function(val) {
      val ? this.mode |= readMode : this.mode &= ~readMode;
     })
    },
    write: {
     get: (function() {
      return (this.mode & writeMode) === writeMode;
     }),
     set: (function(val) {
      val ? this.mode |= writeMode : this.mode &= ~writeMode;
     })
    },
    isFolder: {
     get: (function() {
      return FS.isDir(this.mode);
     })
    },
    isDevice: {
     get: (function() {
      return FS.isChrdev(this.mode);
     })
    }
   });
  }
  var node = new FS.FSNode(parent, name, mode, rdev);
  FS.hashAddNode(node);
  return node;
 }),
 destroyNode: (function(node) {
  FS.hashRemoveNode(node);
 }),
 isRoot: (function(node) {
  return node === node.parent;
 }),
 isMountpoint: (function(node) {
  return !!node.mounted;
 }),
 isFile: (function(mode) {
  return (mode & 61440) === 32768;
 }),
 isDir: (function(mode) {
  return (mode & 61440) === 16384;
 }),
 isLink: (function(mode) {
  return (mode & 61440) === 40960;
 }),
 isChrdev: (function(mode) {
  return (mode & 61440) === 8192;
 }),
 isBlkdev: (function(mode) {
  return (mode & 61440) === 24576;
 }),
 isFIFO: (function(mode) {
  return (mode & 61440) === 4096;
 }),
 isSocket: (function(mode) {
  return (mode & 49152) === 49152;
 }),
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
 modeStringToFlags: (function(str) {
  var flags = FS.flagModes[str];
  if (typeof flags === "undefined") {
   throw new Error("Unknown file open mode: " + str);
  }
  return flags;
 }),
 flagsToPermissionString: (function(flag) {
  var perms = [ "r", "w", "rw" ][flag & 3];
  if (flag & 512) {
   perms += "w";
  }
  return perms;
 }),
 nodePermissions: (function(node, perms) {
  if (FS.ignorePermissions) {
   return 0;
  }
  if (perms.indexOf("r") !== -1 && !(node.mode & 292)) {
   return 13;
  } else if (perms.indexOf("w") !== -1 && !(node.mode & 146)) {
   return 13;
  } else if (perms.indexOf("x") !== -1 && !(node.mode & 73)) {
   return 13;
  }
  return 0;
 }),
 mayLookup: (function(dir) {
  var err = FS.nodePermissions(dir, "x");
  if (err) return err;
  if (!dir.node_ops.lookup) return 13;
  return 0;
 }),
 mayCreate: (function(dir, name) {
  try {
   var node = FS.lookupNode(dir, name);
   return 17;
  } catch (e) {}
  return FS.nodePermissions(dir, "wx");
 }),
 mayDelete: (function(dir, name, isdir) {
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
    return 20;
   }
   if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
    return 16;
   }
  } else {
   if (FS.isDir(node.mode)) {
    return 21;
   }
  }
  return 0;
 }),
 mayOpen: (function(node, flags) {
  if (!node) {
   return 2;
  }
  if (FS.isLink(node.mode)) {
   return 40;
  } else if (FS.isDir(node.mode)) {
   if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
    return 21;
   }
  }
  return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
 }),
 MAX_OPEN_FDS: 4096,
 nextfd: (function(fd_start, fd_end) {
  fd_start = fd_start || 0;
  fd_end = fd_end || FS.MAX_OPEN_FDS;
  for (var fd = fd_start; fd <= fd_end; fd++) {
   if (!FS.streams[fd]) {
    return fd;
   }
  }
  throw new FS.ErrnoError(24);
 }),
 getStream: (function(fd) {
  return FS.streams[fd];
 }),
 createStream: (function(stream, fd_start, fd_end) {
  if (!FS.FSStream) {
   FS.FSStream = (function() {});
   FS.FSStream.prototype = {};
   Object.defineProperties(FS.FSStream.prototype, {
    object: {
     get: (function() {
      return this.node;
     }),
     set: (function(val) {
      this.node = val;
     })
    },
    isRead: {
     get: (function() {
      return (this.flags & 2097155) !== 1;
     })
    },
    isWrite: {
     get: (function() {
      return (this.flags & 2097155) !== 0;
     })
    },
    isAppend: {
     get: (function() {
      return this.flags & 1024;
     })
    }
   });
  }
  var newStream = new FS.FSStream;
  for (var p in stream) {
   newStream[p] = stream[p];
  }
  stream = newStream;
  var fd = FS.nextfd(fd_start, fd_end);
  stream.fd = fd;
  FS.streams[fd] = stream;
  return stream;
 }),
 closeStream: (function(fd) {
  FS.streams[fd] = null;
 }),
 chrdev_stream_ops: {
  open: (function(stream) {
   var device = FS.getDevice(stream.node.rdev);
   stream.stream_ops = device.stream_ops;
   if (stream.stream_ops.open) {
    stream.stream_ops.open(stream);
   }
  }),
  llseek: (function() {
   throw new FS.ErrnoError(29);
  })
 },
 major: (function(dev) {
  return dev >> 8;
 }),
 minor: (function(dev) {
  return dev & 255;
 }),
 makedev: (function(ma, mi) {
  return ma << 8 | mi;
 }),
 registerDevice: (function(dev, ops) {
  FS.devices[dev] = {
   stream_ops: ops
  };
 }),
 getDevice: (function(dev) {
  return FS.devices[dev];
 }),
 getMounts: (function(mount) {
  var mounts = [];
  var check = [ mount ];
  while (check.length) {
   var m = check.pop();
   mounts.push(m);
   check.push.apply(check, m.mounts);
  }
  return mounts;
 }),
 syncfs: (function(populate, callback) {
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
   assert(FS.syncFSRequests > 0);
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
  mounts.forEach((function(mount) {
   if (!mount.type.syncfs) {
    return done(null);
   }
   mount.type.syncfs(mount, populate, done);
  }));
 }),
 mount: (function(type, opts, mountpoint) {
  var root = mountpoint === "/";
  var pseudo = !mountpoint;
  var node;
  if (root && FS.root) {
   throw new FS.ErrnoError(16);
  } else if (!root && !pseudo) {
   var lookup = FS.lookupPath(mountpoint, {
    follow_mount: false
   });
   mountpoint = lookup.path;
   node = lookup.node;
   if (FS.isMountpoint(node)) {
    throw new FS.ErrnoError(16);
   }
   if (!FS.isDir(node.mode)) {
    throw new FS.ErrnoError(20);
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
 }),
 unmount: (function(mountpoint) {
  var lookup = FS.lookupPath(mountpoint, {
   follow_mount: false
  });
  if (!FS.isMountpoint(lookup.node)) {
   throw new FS.ErrnoError(22);
  }
  var node = lookup.node;
  var mount = node.mounted;
  var mounts = FS.getMounts(mount);
  Object.keys(FS.nameTable).forEach((function(hash) {
   var current = FS.nameTable[hash];
   while (current) {
    var next = current.name_next;
    if (mounts.indexOf(current.mount) !== -1) {
     FS.destroyNode(current);
    }
    current = next;
   }
  }));
  node.mounted = null;
  var idx = node.mount.mounts.indexOf(mount);
  assert(idx !== -1);
  node.mount.mounts.splice(idx, 1);
 }),
 lookup: (function(parent, name) {
  return parent.node_ops.lookup(parent, name);
 }),
 mknod: (function(path, mode, dev) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  if (!name || name === "." || name === "..") {
   throw new FS.ErrnoError(22);
  }
  var err = FS.mayCreate(parent, name);
  if (err) {
   throw new FS.ErrnoError(err);
  }
  if (!parent.node_ops.mknod) {
   throw new FS.ErrnoError(1);
  }
  return parent.node_ops.mknod(parent, name, mode, dev);
 }),
 create: (function(path, mode) {
  mode = mode !== undefined ? mode : 438;
  mode &= 4095;
  mode |= 32768;
  return FS.mknod(path, mode, 0);
 }),
 mkdir: (function(path, mode) {
  mode = mode !== undefined ? mode : 511;
  mode &= 511 | 512;
  mode |= 16384;
  return FS.mknod(path, mode, 0);
 }),
 mkdirTree: (function(path, mode) {
  var dirs = path.split("/");
  var d = "";
  for (var i = 0; i < dirs.length; ++i) {
   if (!dirs[i]) continue;
   d += "/" + dirs[i];
   try {
    FS.mkdir(d, mode);
   } catch (e) {
    if (e.errno != 17) throw e;
   }
  }
 }),
 mkdev: (function(path, mode, dev) {
  if (typeof dev === "undefined") {
   dev = mode;
   mode = 438;
  }
  mode |= 8192;
  return FS.mknod(path, mode, dev);
 }),
 symlink: (function(oldpath, newpath) {
  if (!PATH.resolve(oldpath)) {
   throw new FS.ErrnoError(2);
  }
  var lookup = FS.lookupPath(newpath, {
   parent: true
  });
  var parent = lookup.node;
  if (!parent) {
   throw new FS.ErrnoError(2);
  }
  var newname = PATH.basename(newpath);
  var err = FS.mayCreate(parent, newname);
  if (err) {
   throw new FS.ErrnoError(err);
  }
  if (!parent.node_ops.symlink) {
   throw new FS.ErrnoError(1);
  }
  return parent.node_ops.symlink(parent, newname, oldpath);
 }),
 rename: (function(old_path, new_path) {
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
   throw new FS.ErrnoError(16);
  }
  if (!old_dir || !new_dir) throw new FS.ErrnoError(2);
  if (old_dir.mount !== new_dir.mount) {
   throw new FS.ErrnoError(18);
  }
  var old_node = FS.lookupNode(old_dir, old_name);
  var relative = PATH.relative(old_path, new_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(22);
  }
  relative = PATH.relative(new_path, old_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(39);
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
   throw new FS.ErrnoError(1);
  }
  if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
   throw new FS.ErrnoError(16);
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
 }),
 rmdir: (function(path) {
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
   throw new FS.ErrnoError(1);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(16);
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
 }),
 readdir: (function(path) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  if (!node.node_ops.readdir) {
   throw new FS.ErrnoError(20);
  }
  return node.node_ops.readdir(node);
 }),
 unlink: (function(path) {
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
   throw new FS.ErrnoError(1);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(16);
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
 }),
 readlink: (function(path) {
  var lookup = FS.lookupPath(path);
  var link = lookup.node;
  if (!link) {
   throw new FS.ErrnoError(2);
  }
  if (!link.node_ops.readlink) {
   throw new FS.ErrnoError(22);
  }
  return PATH.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
 }),
 stat: (function(path, dontFollow) {
  var lookup = FS.lookupPath(path, {
   follow: !dontFollow
  });
  var node = lookup.node;
  if (!node) {
   throw new FS.ErrnoError(2);
  }
  if (!node.node_ops.getattr) {
   throw new FS.ErrnoError(1);
  }
  return node.node_ops.getattr(node);
 }),
 lstat: (function(path) {
  return FS.stat(path, true);
 }),
 chmod: (function(path, mode, dontFollow) {
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
   throw new FS.ErrnoError(1);
  }
  node.node_ops.setattr(node, {
   mode: mode & 4095 | node.mode & ~4095,
   timestamp: Date.now()
  });
 }),
 lchmod: (function(path, mode) {
  FS.chmod(path, mode, true);
 }),
 fchmod: (function(fd, mode) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(9);
  }
  FS.chmod(stream.node, mode);
 }),
 chown: (function(path, uid, gid, dontFollow) {
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
   throw new FS.ErrnoError(1);
  }
  node.node_ops.setattr(node, {
   timestamp: Date.now()
  });
 }),
 lchown: (function(path, uid, gid) {
  FS.chown(path, uid, gid, true);
 }),
 fchown: (function(fd, uid, gid) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(9);
  }
  FS.chown(stream.node, uid, gid);
 }),
 truncate: (function(path, len) {
  if (len < 0) {
   throw new FS.ErrnoError(22);
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
   throw new FS.ErrnoError(1);
  }
  if (FS.isDir(node.mode)) {
   throw new FS.ErrnoError(21);
  }
  if (!FS.isFile(node.mode)) {
   throw new FS.ErrnoError(22);
  }
  var err = FS.nodePermissions(node, "w");
  if (err) {
   throw new FS.ErrnoError(err);
  }
  node.node_ops.setattr(node, {
   size: len,
   timestamp: Date.now()
  });
 }),
 ftruncate: (function(fd, len) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(9);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(22);
  }
  FS.truncate(stream.node, len);
 }),
 utime: (function(path, atime, mtime) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  node.node_ops.setattr(node, {
   timestamp: Math.max(atime, mtime)
  });
 }),
 open: (function(path, flags, mode, fd_start, fd_end) {
  if (path === "") {
   throw new FS.ErrnoError(2);
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
     throw new FS.ErrnoError(17);
    }
   } else {
    node = FS.mknod(path, mode, 0);
    created = true;
   }
  }
  if (!node) {
   throw new FS.ErrnoError(2);
  }
  if (FS.isChrdev(node.mode)) {
   flags &= ~512;
  }
  if (flags & 65536 && !FS.isDir(node.mode)) {
   throw new FS.ErrnoError(20);
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
 }),
 close: (function(stream) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(9);
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
 }),
 isClosed: (function(stream) {
  return stream.fd === null;
 }),
 llseek: (function(stream, offset, whence) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(9);
  }
  if (!stream.seekable || !stream.stream_ops.llseek) {
   throw new FS.ErrnoError(29);
  }
  stream.position = stream.stream_ops.llseek(stream, offset, whence);
  stream.ungotten = [];
  return stream.position;
 }),
 read: (function(stream, buffer, offset, length, position) {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(22);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(9);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(9);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(21);
  }
  if (!stream.stream_ops.read) {
   throw new FS.ErrnoError(22);
  }
  var seeking = typeof position !== "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(29);
  }
  var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
  if (!seeking) stream.position += bytesRead;
  return bytesRead;
 }),
 write: (function(stream, buffer, offset, length, position, canOwn) {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(22);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(9);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(9);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(21);
  }
  if (!stream.stream_ops.write) {
   throw new FS.ErrnoError(22);
  }
  if (stream.flags & 1024) {
   FS.llseek(stream, 0, 2);
  }
  var seeking = typeof position !== "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(29);
  }
  var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
  if (!seeking) stream.position += bytesWritten;
  try {
   if (stream.path && FS.trackingDelegate["onWriteToFile"]) FS.trackingDelegate["onWriteToFile"](stream.path);
  } catch (e) {
   console.log("FS.trackingDelegate['onWriteToFile']('" + path + "') threw an exception: " + e.message);
  }
  return bytesWritten;
 }),
 allocate: (function(stream, offset, length) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(9);
  }
  if (offset < 0 || length <= 0) {
   throw new FS.ErrnoError(22);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(9);
  }
  if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(19);
  }
  if (!stream.stream_ops.allocate) {
   throw new FS.ErrnoError(95);
  }
  stream.stream_ops.allocate(stream, offset, length);
 }),
 mmap: (function(stream, buffer, offset, length, position, prot, flags) {
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(13);
  }
  if (!stream.stream_ops.mmap) {
   throw new FS.ErrnoError(19);
  }
  return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
 }),
 msync: (function(stream, buffer, offset, length, mmapFlags) {
  if (!stream || !stream.stream_ops.msync) {
   return 0;
  }
  return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
 }),
 munmap: (function(stream) {
  return 0;
 }),
 ioctl: (function(stream, cmd, arg) {
  if (!stream.stream_ops.ioctl) {
   throw new FS.ErrnoError(25);
  }
  return stream.stream_ops.ioctl(stream, cmd, arg);
 }),
 readFile: (function(path, opts) {
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
 }),
 writeFile: (function(path, data, opts) {
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
 }),
 cwd: (function() {
  return FS.currentPath;
 }),
 chdir: (function(path) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  if (lookup.node === null) {
   throw new FS.ErrnoError(2);
  }
  if (!FS.isDir(lookup.node.mode)) {
   throw new FS.ErrnoError(20);
  }
  var err = FS.nodePermissions(lookup.node, "x");
  if (err) {
   throw new FS.ErrnoError(err);
  }
  FS.currentPath = lookup.path;
 }),
 createDefaultDirectories: (function() {
  FS.mkdir("/tmp");
  FS.mkdir("/home");
  FS.mkdir("/home/web_user");
 }),
 createDefaultDevices: (function() {
  FS.mkdir("/dev");
  FS.registerDevice(FS.makedev(1, 3), {
   read: (function() {
    return 0;
   }),
   write: (function(stream, buffer, offset, length, pos) {
    return length;
   })
  });
  FS.mkdev("/dev/null", FS.makedev(1, 3));
  TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
  TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
  FS.mkdev("/dev/tty", FS.makedev(5, 0));
  FS.mkdev("/dev/tty1", FS.makedev(6, 0));
  var random_device;
  if (typeof crypto !== "undefined") {
   var randomBuffer = new Uint8Array(1);
   random_device = (function() {
    crypto.getRandomValues(randomBuffer);
    return randomBuffer[0];
   });
  } else if (ENVIRONMENT_IS_NODE) {
   random_device = (function() {
    return require("crypto")["randomBytes"](1)[0];
   });
  } else {
   random_device = (function() {
    abort("random_device");
   });
  }
  FS.createDevice("/dev", "random", random_device);
  FS.createDevice("/dev", "urandom", random_device);
  FS.mkdir("/dev/shm");
  FS.mkdir("/dev/shm/tmp");
 }),
 createSpecialDirectories: (function() {
  FS.mkdir("/proc");
  FS.mkdir("/proc/self");
  FS.mkdir("/proc/self/fd");
  FS.mount({
   mount: (function() {
    var node = FS.createNode("/proc/self", "fd", 16384 | 511, 73);
    node.node_ops = {
     lookup: (function(parent, name) {
      var fd = +name;
      var stream = FS.getStream(fd);
      if (!stream) throw new FS.ErrnoError(9);
      var ret = {
       parent: null,
       mount: {
        mountpoint: "fake"
       },
       node_ops: {
        readlink: (function() {
         return stream.path;
        })
       }
      };
      ret.parent = ret;
      return ret;
     })
    };
    return node;
   })
  }, {}, "/proc/self/fd");
 }),
 createStandardStreams: (function() {
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
  assert(stdin.fd === 0, "invalid handle for stdin (" + stdin.fd + ")");
  var stdout = FS.open("/dev/stdout", "w");
  assert(stdout.fd === 1, "invalid handle for stdout (" + stdout.fd + ")");
  var stderr = FS.open("/dev/stderr", "w");
  assert(stderr.fd === 2, "invalid handle for stderr (" + stderr.fd + ")");
 }),
 ensureErrnoError: (function() {
  if (FS.ErrnoError) return;
  FS.ErrnoError = function ErrnoError(errno, node) {
   this.node = node;
   this.setErrno = (function(errno) {
    this.errno = errno;
    for (var key in ERRNO_CODES) {
     if (ERRNO_CODES[key] === errno) {
      this.code = key;
      break;
     }
    }
   });
   this.setErrno(errno);
   this.message = ERRNO_MESSAGES[errno];
   if (this.stack) Object.defineProperty(this, "stack", {
    value: (new Error).stack,
    writable: true
   });
   if (this.stack) this.stack = demangleAll(this.stack);
  };
  FS.ErrnoError.prototype = new Error;
  FS.ErrnoError.prototype.constructor = FS.ErrnoError;
  [ 2 ].forEach((function(code) {
   FS.genericErrors[code] = new FS.ErrnoError(code);
   FS.genericErrors[code].stack = "<generic error, no stack>";
  }));
 }),
 staticInit: (function() {
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
 }),
 init: (function(input, output, error) {
  assert(!FS.init.initialized, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
  FS.init.initialized = true;
  FS.ensureErrnoError();
  Module["stdin"] = input || Module["stdin"];
  Module["stdout"] = output || Module["stdout"];
  Module["stderr"] = error || Module["stderr"];
  FS.createStandardStreams();
 }),
 quit: (function() {
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
 }),
 getMode: (function(canRead, canWrite) {
  var mode = 0;
  if (canRead) mode |= 292 | 73;
  if (canWrite) mode |= 146;
  return mode;
 }),
 joinPath: (function(parts, forceRelative) {
  var path = PATH.join.apply(null, parts);
  if (forceRelative && path[0] == "/") path = path.substr(1);
  return path;
 }),
 absolutePath: (function(relative, base) {
  return PATH.resolve(base, relative);
 }),
 standardizePath: (function(path) {
  return PATH.normalize(path);
 }),
 findObject: (function(path, dontResolveLastLink) {
  var ret = FS.analyzePath(path, dontResolveLastLink);
  if (ret.exists) {
   return ret.object;
  } else {
   ___setErrNo(ret.error);
   return null;
  }
 }),
 analyzePath: (function(path, dontResolveLastLink) {
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
 }),
 createFolder: (function(parent, name, canRead, canWrite) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(canRead, canWrite);
  return FS.mkdir(path, mode);
 }),
 createPath: (function(parent, path, canRead, canWrite) {
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
 }),
 createFile: (function(parent, name, properties, canRead, canWrite) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(canRead, canWrite);
  return FS.create(path, mode);
 }),
 createDataFile: (function(parent, name, data, canRead, canWrite, canOwn) {
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
 }),
 createDevice: (function(parent, name, input, output) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(!!input, !!output);
  if (!FS.createDevice.major) FS.createDevice.major = 64;
  var dev = FS.makedev(FS.createDevice.major++, 0);
  FS.registerDevice(dev, {
   open: (function(stream) {
    stream.seekable = false;
   }),
   close: (function(stream) {
    if (output && output.buffer && output.buffer.length) {
     output(10);
    }
   }),
   read: (function(stream, buffer, offset, length, pos) {
    var bytesRead = 0;
    for (var i = 0; i < length; i++) {
     var result;
     try {
      result = input();
     } catch (e) {
      throw new FS.ErrnoError(5);
     }
     if (result === undefined && bytesRead === 0) {
      throw new FS.ErrnoError(11);
     }
     if (result === null || result === undefined) break;
     bytesRead++;
     buffer[offset + i] = result;
    }
    if (bytesRead) {
     stream.node.timestamp = Date.now();
    }
    return bytesRead;
   }),
   write: (function(stream, buffer, offset, length, pos) {
    for (var i = 0; i < length; i++) {
     try {
      output(buffer[offset + i]);
     } catch (e) {
      throw new FS.ErrnoError(5);
     }
    }
    if (length) {
     stream.node.timestamp = Date.now();
    }
    return i;
   })
  });
  return FS.mkdev(path, mode, dev);
 }),
 createLink: (function(parent, name, target, canRead, canWrite) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  return FS.symlink(target, path);
 }),
 forceLoadFile: (function(obj) {
  if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
  var success = true;
  if (typeof XMLHttpRequest !== "undefined") {
   throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
  } else if (Module["read"]) {
   try {
    obj.contents = intArrayFromString(Module["read"](obj.url), true);
    obj.usedBytes = obj.contents.length;
   } catch (e) {
    success = false;
   }
  } else {
   throw new Error("Cannot load without read() or XMLHttpRequest.");
  }
  if (!success) ___setErrNo(5);
  return success;
 }),
 createLazyFile: (function(parent, name, url, canRead, canWrite) {
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
   var xhr = new XMLHttpRequest;
   xhr.open("HEAD", url, false);
   xhr.send(null);
   if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
   var datalength = Number(xhr.getResponseHeader("Content-length"));
   var header;
   var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
   var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
   var chunkSize = 1024 * 1024;
   if (!hasByteServing) chunkSize = datalength;
   var doXHR = (function(from, to) {
    if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
    if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
    var xhr = new XMLHttpRequest;
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
   });
   var lazyArray = this;
   lazyArray.setDataGetter((function(chunkNum) {
    var start = chunkNum * chunkSize;
    var end = (chunkNum + 1) * chunkSize - 1;
    end = Math.min(end, datalength - 1);
    if (typeof lazyArray.chunks[chunkNum] === "undefined") {
     lazyArray.chunks[chunkNum] = doXHR(start, end);
    }
    if (typeof lazyArray.chunks[chunkNum] === "undefined") throw new Error("doXHR failed!");
    return lazyArray.chunks[chunkNum];
   }));
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
   var lazyArray = new LazyUint8Array;
   Object.defineProperties(lazyArray, {
    length: {
     get: (function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._length;
     })
    },
    chunkSize: {
     get: (function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._chunkSize;
     })
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
    get: (function() {
     return this.contents.length;
    })
   }
  });
  var stream_ops = {};
  var keys = Object.keys(node.stream_ops);
  keys.forEach((function(key) {
   var fn = node.stream_ops[key];
   stream_ops[key] = function forceLoadLazyFile() {
    if (!FS.forceLoadFile(node)) {
     throw new FS.ErrnoError(5);
    }
    return fn.apply(null, arguments);
   };
  }));
  stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
   if (!FS.forceLoadFile(node)) {
    throw new FS.ErrnoError(5);
   }
   var contents = stream.node.contents;
   if (position >= contents.length) return 0;
   var size = Math.min(contents.length - position, length);
   assert(size >= 0);
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
 }),
 createPreloadedFile: (function(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
  Browser.init();
  var fullname = name ? PATH.resolve(PATH.join2(parent, name)) : parent;
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
   Module["preloadPlugins"].forEach((function(plugin) {
    if (handled) return;
    if (plugin["canHandle"](fullname)) {
     plugin["handle"](byteArray, fullname, finish, (function() {
      if (onerror) onerror();
      removeRunDependency(dep);
     }));
     handled = true;
    }
   }));
   if (!handled) finish(byteArray);
  }
  addRunDependency(dep);
  if (typeof url == "string") {
   Browser.asyncLoad(url, (function(byteArray) {
    processData(byteArray);
   }), onerror);
  } else {
   processData(url);
  }
 }),
 indexedDB: (function() {
  return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
 }),
 DB_NAME: (function() {
  return "EM_FS_" + window.location.pathname;
 }),
 DB_VERSION: 20,
 DB_STORE_NAME: "FILE_DATA",
 saveFilesToDB: (function(paths, onload, onerror) {
  onload = onload || (function() {});
  onerror = onerror || (function() {});
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
   paths.forEach((function(path) {
    var putRequest = files.put(FS.analyzePath(path).object.contents, path);
    putRequest.onsuccess = function putRequest_onsuccess() {
     ok++;
     if (ok + fail == total) finish();
    };
    putRequest.onerror = function putRequest_onerror() {
     fail++;
     if (ok + fail == total) finish();
    };
   }));
   transaction.onerror = onerror;
  };
  openRequest.onerror = onerror;
 }),
 loadFilesFromDB: (function(paths, onload, onerror) {
  onload = onload || (function() {});
  onerror = onerror || (function() {});
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
   paths.forEach((function(path) {
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
   }));
   transaction.onerror = onerror;
  };
  openRequest.onerror = onerror;
 })
};
var SYSCALLS = {
 DEFAULT_POLLMASK: 5,
 mappings: {},
 umask: 511,
 calculateAt: (function(dirfd, path) {
  if (path[0] !== "/") {
   var dir;
   if (dirfd === -100) {
    dir = FS.cwd();
   } else {
    var dirstream = FS.getStream(dirfd);
    if (!dirstream) throw new FS.ErrnoError(ERRNO_CODES.EBADF);
    dir = dirstream.path;
   }
   path = PATH.join2(dir, path);
  }
  return path;
 }),
 doStat: (function(func, path, buf) {
  try {
   var stat = func(path);
  } catch (e) {
   if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
    return -ERRNO_CODES.ENOTDIR;
   }
   throw e;
  }
  HEAP32[buf >> 2] = stat.dev;
  HEAP32[buf + 4 >> 2] = 0;
  HEAP32[buf + 8 >> 2] = stat.ino;
  HEAP32[buf + 12 >> 2] = stat.mode;
  HEAP32[buf + 16 >> 2] = stat.nlink;
  HEAP32[buf + 20 >> 2] = stat.uid;
  HEAP32[buf + 24 >> 2] = stat.gid;
  HEAP32[buf + 28 >> 2] = stat.rdev;
  HEAP32[buf + 32 >> 2] = 0;
  HEAP32[buf + 36 >> 2] = stat.size;
  HEAP32[buf + 40 >> 2] = 4096;
  HEAP32[buf + 44 >> 2] = stat.blocks;
  HEAP32[buf + 48 >> 2] = stat.atime.getTime() / 1e3 | 0;
  HEAP32[buf + 52 >> 2] = 0;
  HEAP32[buf + 56 >> 2] = stat.mtime.getTime() / 1e3 | 0;
  HEAP32[buf + 60 >> 2] = 0;
  HEAP32[buf + 64 >> 2] = stat.ctime.getTime() / 1e3 | 0;
  HEAP32[buf + 68 >> 2] = 0;
  HEAP32[buf + 72 >> 2] = stat.ino;
  return 0;
 }),
 doMsync: (function(addr, stream, len, flags) {
  var buffer = new Uint8Array(HEAPU8.subarray(addr, addr + len));
  FS.msync(stream, buffer, 0, len, flags);
 }),
 doMkdir: (function(path, mode) {
  path = PATH.normalize(path);
  if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
  FS.mkdir(path, mode, 0);
  return 0;
 }),
 doMknod: (function(path, mode, dev) {
  switch (mode & 61440) {
  case 32768:
  case 8192:
  case 24576:
  case 4096:
  case 49152:
   break;
  default:
   return -ERRNO_CODES.EINVAL;
  }
  FS.mknod(path, mode, dev);
  return 0;
 }),
 doReadlink: (function(path, buf, bufsize) {
  if (bufsize <= 0) return -ERRNO_CODES.EINVAL;
  var ret = FS.readlink(path);
  var len = Math.min(bufsize, lengthBytesUTF8(ret));
  var endChar = HEAP8[buf + len];
  stringToUTF8(ret, buf, bufsize + 1);
  HEAP8[buf + len] = endChar;
  return len;
 }),
 doAccess: (function(path, amode) {
  if (amode & ~7) {
   return -ERRNO_CODES.EINVAL;
  }
  var node;
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  node = lookup.node;
  var perms = "";
  if (amode & 4) perms += "r";
  if (amode & 2) perms += "w";
  if (amode & 1) perms += "x";
  if (perms && FS.nodePermissions(node, perms)) {
   return -ERRNO_CODES.EACCES;
  }
  return 0;
 }),
 doDup: (function(path, flags, suggestFD) {
  var suggest = FS.getStream(suggestFD);
  if (suggest) FS.close(suggest);
  return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
 }),
 doReadv: (function(stream, iov, iovcnt, offset) {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
   var ptr = HEAP32[iov + i * 8 >> 2];
   var len = HEAP32[iov + (i * 8 + 4) >> 2];
   var curr = FS.read(stream, HEAP8, ptr, len, offset);
   if (curr < 0) return -1;
   ret += curr;
   if (curr < len) break;
  }
  return ret;
 }),
 doWritev: (function(stream, iov, iovcnt, offset) {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
   var ptr = HEAP32[iov + i * 8 >> 2];
   var len = HEAP32[iov + (i * 8 + 4) >> 2];
   var curr = FS.write(stream, HEAP8, ptr, len, offset);
   if (curr < 0) return -1;
   ret += curr;
  }
  return ret;
 }),
 varargs: 0,
 get: (function(varargs) {
  SYSCALLS.varargs += 4;
  var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
  return ret;
 }),
 getStr: (function() {
  var ret = UTF8ToString(SYSCALLS.get());
  return ret;
 }),
 getStreamFromFD: (function() {
  var stream = FS.getStream(SYSCALLS.get());
  if (!stream) throw new FS.ErrnoError(ERRNO_CODES.EBADF);
  return stream;
 }),
 getSocketFromFD: (function() {
  var socket = SOCKFS.getSocket(SYSCALLS.get());
  if (!socket) throw new FS.ErrnoError(ERRNO_CODES.EBADF);
  return socket;
 }),
 getSocketAddress: (function(allowNull) {
  var addrp = SYSCALLS.get(), addrlen = SYSCALLS.get();
  if (allowNull && addrp === 0) return null;
  var info = __read_sockaddr(addrp, addrlen);
  if (info.errno) throw new FS.ErrnoError(info.errno);
  info.addr = DNS.lookup_addr(info.addr) || info.addr;
  return info;
 }),
 get64: (function() {
  var low = SYSCALLS.get(), high = SYSCALLS.get();
  if (low >= 0) assert(high === 0); else assert(high === -1);
  return low;
 }),
 getZero: (function() {
  assert(SYSCALLS.get() === 0);
 })
};
function ___syscall10(which, varargs) {
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
function _emscripten_set_main_loop_timing(mode, value) {
 Browser.mainLoop.timingMode = mode;
 Browser.mainLoop.timingValue = value;
 if (!Browser.mainLoop.func) {
  console.error("emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.");
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
   var Browser_setImmediate_messageHandler = (function(event) {
    if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
     event.stopPropagation();
     setImmediates.shift()();
    }
   });
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
function _emscripten_get_now() {
 abort();
}
function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop, arg, noSetTiming) {
 Module["noExitRuntime"] = true;
 assert(!Browser.mainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
 Browser.mainLoop.func = func;
 Browser.mainLoop.arg = arg;
 var browserIterationFunc;
 if (typeof arg !== "undefined") {
  browserIterationFunc = (function() {
   Module["dynCall_vi"](func, arg);
  });
 } else {
  browserIterationFunc = (function() {
   Module["dynCall_v"](func);
  });
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
  checkStackCookie();
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
  pause: (function() {
   Browser.mainLoop.scheduler = null;
   Browser.mainLoop.currentlyRunningMainloop++;
  }),
  resume: (function() {
   Browser.mainLoop.currentlyRunningMainloop++;
   var timingMode = Browser.mainLoop.timingMode;
   var timingValue = Browser.mainLoop.timingValue;
   var func = Browser.mainLoop.func;
   Browser.mainLoop.func = null;
   _emscripten_set_main_loop(func, 0, false, Browser.mainLoop.arg, true);
   _emscripten_set_main_loop_timing(timingMode, timingValue);
   Browser.mainLoop.scheduler();
  }),
  updateStatus: (function() {
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
  }),
  runIter: (function(func) {
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
  })
 },
 isFullscreen: false,
 pointerLock: false,
 moduleContextCreatedCallbacks: [],
 workers: [],
 init: (function() {
  if (!Module["preloadPlugins"]) Module["preloadPlugins"] = [];
  if (Browser.initted) return;
  Browser.initted = true;
  try {
   new Blob;
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
      b = new Blob([ (new Uint8Array(byteArray)).buffer ], {
       type: Browser.getMimetype(name)
      });
     }
    } catch (e) {
     warnOnce("Blob constructor present but fails: " + e + "; falling back to blob builder");
    }
   }
   if (!b) {
    var bb = new Browser.BlobBuilder;
    bb.append((new Uint8Array(byteArray)).buffer);
    b = bb.getBlob();
   }
   var url = Browser.URLObject.createObjectURL(b);
   assert(typeof url == "string", "createObjectURL must return a url as a string");
   var img = new Image;
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
    Module["preloadedAudios"][name] = new Audio;
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
    assert(typeof url == "string", "createObjectURL must return a url as a string");
    var audio = new Audio;
    audio.addEventListener("canplaythrough", (function() {
     finish(audio);
    }), false);
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
    Browser.safeSetTimeout((function() {
     finish(audio);
    }), 1e4);
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
   canvas.requestPointerLock = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"] || canvas["webkitRequestPointerLock"] || canvas["msRequestPointerLock"] || (function() {});
   canvas.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || (function() {});
   canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
   document.addEventListener("pointerlockchange", pointerLockChange, false);
   document.addEventListener("mozpointerlockchange", pointerLockChange, false);
   document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
   document.addEventListener("mspointerlockchange", pointerLockChange, false);
   if (Module["elementPointerLock"]) {
    canvas.addEventListener("click", (function(ev) {
     if (!Browser.pointerLock && Module["canvas"].requestPointerLock) {
      Module["canvas"].requestPointerLock();
      ev.preventDefault();
     }
    }), false);
   }
  }
 }),
 createContext: (function(canvas, useWebGL, setInModule, webGLContextAttributes) {
  if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx;
  var ctx;
  var contextHandle;
  if (useWebGL) {
   var contextAttributes = {
    antialias: false,
    alpha: false
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
   Browser.moduleContextCreatedCallbacks.forEach((function(callback) {
    callback();
   }));
   Browser.init();
  }
  return ctx;
 }),
 destroyContext: (function(canvas, useWebGL, setInModule) {}),
 fullscreenHandlersInstalled: false,
 lockPointer: undefined,
 resizeCanvas: undefined,
 requestFullscreen: (function(lockPointer, resizeCanvas, vrDevice) {
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
    canvas.exitFullscreen = document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || (function() {});
    canvas.exitFullscreen = canvas.exitFullscreen.bind(document);
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
  canvasContainer.requestFullscreen = canvasContainer["requestFullscreen"] || canvasContainer["mozRequestFullScreen"] || canvasContainer["msRequestFullscreen"] || (canvasContainer["webkitRequestFullscreen"] ? (function() {
   canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"]);
  }) : null) || (canvasContainer["webkitRequestFullScreen"] ? (function() {
   canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]);
  }) : null);
  if (vrDevice) {
   canvasContainer.requestFullscreen({
    vrDisplay: vrDevice
   });
  } else {
   canvasContainer.requestFullscreen();
  }
 }),
 requestFullScreen: (function(lockPointer, resizeCanvas, vrDevice) {
  err("Browser.requestFullScreen() is deprecated. Please call Browser.requestFullscreen instead.");
  Browser.requestFullScreen = (function(lockPointer, resizeCanvas, vrDevice) {
   return Browser.requestFullscreen(lockPointer, resizeCanvas, vrDevice);
  });
  return Browser.requestFullscreen(lockPointer, resizeCanvas, vrDevice);
 }),
 nextRAF: 0,
 fakeRequestAnimationFrame: (function(func) {
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
 }),
 requestAnimationFrame: function requestAnimationFrame(func) {
  if (typeof window === "undefined") {
   Browser.fakeRequestAnimationFrame(func);
  } else {
   if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = window["requestAnimationFrame"] || window["mozRequestAnimationFrame"] || window["webkitRequestAnimationFrame"] || window["msRequestAnimationFrame"] || window["oRequestAnimationFrame"] || Browser.fakeRequestAnimationFrame;
   }
   window.requestAnimationFrame(func);
  }
 },
 safeCallback: (function(func) {
  return (function() {
   if (!ABORT) return func.apply(null, arguments);
  });
 }),
 allowAsyncCallbacks: true,
 queuedAsyncCallbacks: [],
 pauseAsyncCallbacks: (function() {
  Browser.allowAsyncCallbacks = false;
 }),
 resumeAsyncCallbacks: (function() {
  Browser.allowAsyncCallbacks = true;
  if (Browser.queuedAsyncCallbacks.length > 0) {
   var callbacks = Browser.queuedAsyncCallbacks;
   Browser.queuedAsyncCallbacks = [];
   callbacks.forEach((function(func) {
    func();
   }));
  }
 }),
 safeRequestAnimationFrame: (function(func) {
  return Browser.requestAnimationFrame((function() {
   if (ABORT) return;
   if (Browser.allowAsyncCallbacks) {
    func();
   } else {
    Browser.queuedAsyncCallbacks.push(func);
   }
  }));
 }),
 safeSetTimeout: (function(func, timeout) {
  Module["noExitRuntime"] = true;
  return setTimeout((function() {
   if (ABORT) return;
   if (Browser.allowAsyncCallbacks) {
    func();
   } else {
    Browser.queuedAsyncCallbacks.push(func);
   }
  }), timeout);
 }),
 safeSetInterval: (function(func, timeout) {
  Module["noExitRuntime"] = true;
  return setInterval((function() {
   if (ABORT) return;
   if (Browser.allowAsyncCallbacks) {
    func();
   }
  }), timeout);
 }),
 getMimetype: (function(name) {
  return {
   "jpg": "image/jpeg",
   "jpeg": "image/jpeg",
   "png": "image/png",
   "bmp": "image/bmp",
   "ogg": "audio/ogg",
   "wav": "audio/wav",
   "mp3": "audio/mpeg"
  }[name.substr(name.lastIndexOf(".") + 1)];
 }),
 getUserMedia: (function(func) {
  if (!window.getUserMedia) {
   window.getUserMedia = navigator["getUserMedia"] || navigator["mozGetUserMedia"];
  }
  window.getUserMedia(func);
 }),
 getMovementX: (function(event) {
  return event["movementX"] || event["mozMovementX"] || event["webkitMovementX"] || 0;
 }),
 getMovementY: (function(event) {
  return event["movementY"] || event["mozMovementY"] || event["webkitMovementY"] || 0;
 }),
 getMouseWheelDelta: (function(event) {
  var delta = 0;
  switch (event.type) {
  case "DOMMouseScroll":
   delta = event.detail;
   break;
  case "mousewheel":
   delta = event.wheelDelta;
   break;
  case "wheel":
   delta = event["deltaY"];
   break;
  default:
   throw "unrecognized mouse wheel event: " + event.type;
  }
  return delta;
 }),
 mouseX: 0,
 mouseY: 0,
 mouseMovementX: 0,
 mouseMovementY: 0,
 touches: {},
 lastTouches: {},
 calculateMouseEvent: (function(event) {
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
   assert(typeof scrollX !== "undefined" && typeof scrollY !== "undefined", "Unable to retrieve scroll position, mouse positions likely broken.");
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
 }),
 asyncLoad: (function(url, onload, onerror, noRunDep) {
  var dep = !noRunDep ? getUniqueRunDependency("al " + url) : "";
  Module["readAsync"](url, (function(arrayBuffer) {
   assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
   onload(new Uint8Array(arrayBuffer));
   if (dep) removeRunDependency(dep);
  }), (function(event) {
   if (onerror) {
    onerror();
   } else {
    throw 'Loading data file "' + url + '" failed.';
   }
  }));
  if (dep) addRunDependency(dep);
 }),
 resizeListeners: [],
 updateResizeListeners: (function() {
  var canvas = Module["canvas"];
  Browser.resizeListeners.forEach((function(listener) {
   listener(canvas.width, canvas.height);
  }));
 }),
 setCanvasSize: (function(width, height, noUpdates) {
  var canvas = Module["canvas"];
  Browser.updateCanvasDimensions(canvas, width, height);
  if (!noUpdates) Browser.updateResizeListeners();
 }),
 windowedWidth: 0,
 windowedHeight: 0,
 setFullscreenCanvasSize: (function() {
  if (typeof SDL != "undefined") {
   var flags = HEAPU32[SDL.screen >> 2];
   flags = flags | 8388608;
   HEAP32[SDL.screen >> 2] = flags;
  }
  Browser.updateCanvasDimensions(Module["canvas"]);
  Browser.updateResizeListeners();
 }),
 setWindowedCanvasSize: (function() {
  if (typeof SDL != "undefined") {
   var flags = HEAPU32[SDL.screen >> 2];
   flags = flags & ~8388608;
   HEAP32[SDL.screen >> 2] = flags;
  }
  Browser.updateCanvasDimensions(Module["canvas"]);
  Browser.updateResizeListeners();
 }),
 updateCanvasDimensions: (function(canvas, wNative, hNative) {
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
 }),
 wgetRequests: {},
 nextWgetRequestHandle: 0,
 getNextWgetRequestHandle: (function() {
  var handle = Browser.nextWgetRequestHandle;
  Browser.nextWgetRequestHandle++;
  return handle;
 })
};
var EmterpreterAsync = {
 initted: false,
 state: 0,
 saveStack: "",
 yieldCallbacks: [],
 postAsync: null,
 restartFunc: null,
 asyncFinalizers: [],
 ensureInit: (function() {
  if (this.initted) return;
  this.initted = true;
  abortDecorators.push((function(output, what) {
   if (EmterpreterAsync.state === 1 || EmterpreterAsync.state === 2) {
    return output + "\nThis error happened during an emterpreter-async operation. Was there non-emterpreted code on the stack during save (which is unallowed)? If so, you may want to adjust EMTERPRETIFY_BLACKLIST, EMTERPRETIFY_WHITELIST. For reference, this is what the stack looked like when we tried to save it: " + [ EmterpreterAsync.state, EmterpreterAsync.saveStack ];
   }
   return output;
  }));
 }),
 setState: (function(s) {
  this.ensureInit();
  this.state = s;
  Module["setAsyncState"](s);
 }),
 handle: (function(doAsyncOp, yieldDuring) {
  Module["noExitRuntime"] = true;
  if (EmterpreterAsync.state === 0) {
   var stack = new Int32Array(HEAP32.subarray(EMTSTACKTOP >> 2, Module["emtStackSave"]() >> 2));
   var stacktop = Module["stackSave"]();
   var resumedCallbacksForYield = false;
   function resumeCallbacksForYield() {
    if (resumedCallbacksForYield) return;
    resumedCallbacksForYield = true;
    EmterpreterAsync.yieldCallbacks.forEach((function(func) {
     func();
    }));
    Browser.resumeAsyncCallbacks();
   }
   var callingDoAsyncOp = 1;
   doAsyncOp(function resume(post) {
    if (ABORT) {
     return;
    }
    if (callingDoAsyncOp) {
     assert(callingDoAsyncOp === 1);
     callingDoAsyncOp++;
     setTimeout((function() {
      resume(post);
     }), 0);
     return;
    }
    assert(EmterpreterAsync.state === 1 || EmterpreterAsync.state === 3);
    EmterpreterAsync.setState(3);
    if (yieldDuring) {
     resumeCallbacksForYield();
    }
    HEAP32.set(stack, EMTSTACKTOP >> 2);
    assert(stacktop === Module["stackSave"]());
    EmterpreterAsync.setState(2);
    if (Browser.mainLoop.func) {
     Browser.mainLoop.resume();
    }
    assert(!EmterpreterAsync.postAsync);
    EmterpreterAsync.postAsync = post || null;
    var asyncReturnValue;
    if (!EmterpreterAsync.restartFunc) {
     Module["emterpret"](stack[0]);
    } else {
     asyncReturnValue = EmterpreterAsync.restartFunc();
    }
    if (!yieldDuring && EmterpreterAsync.state === 0) {
     Browser.resumeAsyncCallbacks();
    }
    if (EmterpreterAsync.state === 0) {
     EmterpreterAsync.restartFunc = null;
     var asyncFinalizers = EmterpreterAsync.asyncFinalizers;
     EmterpreterAsync.asyncFinalizers = [];
     asyncFinalizers.forEach((function(func) {
      func(asyncReturnValue);
     }));
    }
   });
   callingDoAsyncOp = 0;
   EmterpreterAsync.setState(1);
   EmterpreterAsync.saveStack = (new Error).stack;
   if (Browser.mainLoop.func) {
    Browser.mainLoop.pause();
   }
   if (yieldDuring) {
    setTimeout((function() {
     resumeCallbacksForYield();
    }), 0);
   } else {
    Browser.pauseAsyncCallbacks();
   }
  } else {
   assert(EmterpreterAsync.state === 2);
   EmterpreterAsync.setState(0);
   if (EmterpreterAsync.postAsync) {
    var ret = EmterpreterAsync.postAsync();
    EmterpreterAsync.postAsync = null;
    return ret;
   }
  }
 })
};
function ___syscall118(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD();
  return EmterpreterAsync.handle((function(resume) {
   var mount = stream.node.mount;
   if (!mount.type.syncfs) {
    resume((function() {
     return 0;
    }));
    return;
   }
   mount.type.syncfs(mount, false, (function(err) {
    if (err) {
     resume((function() {
      return -ERRNO_CODES.EIO;
     }));
     return;
    }
    resume((function() {
     return 0;
    }));
   }));
  }));
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall12(which, varargs) {
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
 SYSCALLS.varargs = varargs;
 try {
  var buf = SYSCALLS.get();
  if (!buf) return -ERRNO_CODES.EFAULT;
  var layout = {
   "__size__": 390,
   "sysname": 0,
   "nodename": 65,
   "release": 130,
   "version": 195,
   "machine": 260,
   "domainname": 325
  };
  function copyString(element, value) {
   var offset = layout[element];
   writeAsciiToMemory(value, buf + offset);
  }
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
var PROCINFO = {
 ppid: 1,
 pid: 42,
 sid: 42,
 pgid: 42
};
function ___syscall132(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var pid = SYSCALLS.get();
  if (pid && pid !== PROCINFO.pid) return -ERRNO_CODES.ESRCH;
  return PROCINFO.pgid;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall133(which, varargs) {
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
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), offset_high = SYSCALLS.get(), offset_low = SYSCALLS.get(), result = SYSCALLS.get(), whence = SYSCALLS.get();
  var offset = offset_low;
  FS.llseek(stream, offset, whence);
  HEAP32[result >> 2] = stream.position;
  if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall142(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var nfds = SYSCALLS.get(), readfds = SYSCALLS.get(), writefds = SYSCALLS.get(), exceptfds = SYSCALLS.get(), timeout = SYSCALLS.get();
  assert(nfds <= 64, "nfds must be less than or equal to 64");
  assert(!exceptfds, "exceptfds not supported");
  var total = 0;
  var srcReadLow = readfds ? HEAP32[readfds >> 2] : 0, srcReadHigh = readfds ? HEAP32[readfds + 4 >> 2] : 0;
  var srcWriteLow = writefds ? HEAP32[writefds >> 2] : 0, srcWriteHigh = writefds ? HEAP32[writefds + 4 >> 2] : 0;
  var srcExceptLow = exceptfds ? HEAP32[exceptfds >> 2] : 0, srcExceptHigh = exceptfds ? HEAP32[exceptfds + 4 >> 2] : 0;
  var dstReadLow = 0, dstReadHigh = 0;
  var dstWriteLow = 0, dstWriteHigh = 0;
  var dstExceptLow = 0, dstExceptHigh = 0;
  var allLow = (readfds ? HEAP32[readfds >> 2] : 0) | (writefds ? HEAP32[writefds >> 2] : 0) | (exceptfds ? HEAP32[exceptfds >> 2] : 0);
  var allHigh = (readfds ? HEAP32[readfds + 4 >> 2] : 0) | (writefds ? HEAP32[writefds + 4 >> 2] : 0) | (exceptfds ? HEAP32[exceptfds + 4 >> 2] : 0);
  function check(fd, low, high, val) {
   return fd < 32 ? low & val : high & val;
  }
  for (var fd = 0; fd < nfds; fd++) {
   var mask = 1 << fd % 32;
   if (!check(fd, allLow, allHigh, mask)) {
    continue;
   }
   var stream = FS.getStream(fd);
   if (!stream) throw new FS.ErrnoError(ERRNO_CODES.EBADF);
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
   HEAP32[readfds >> 2] = dstReadLow;
   HEAP32[readfds + 4 >> 2] = dstReadHigh;
  }
  if (writefds) {
   HEAP32[writefds >> 2] = dstWriteLow;
   HEAP32[writefds + 4 >> 2] = dstWriteHigh;
  }
  if (exceptfds) {
   HEAP32[exceptfds >> 2] = dstExceptLow;
   HEAP32[exceptfds + 4 >> 2] = dstExceptHigh;
  }
  return total;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall144(which, varargs) {
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
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), iov = SYSCALLS.get(), iovcnt = SYSCALLS.get();
  return SYSCALLS.doReadv(stream, iov, iovcnt);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall146(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), iov = SYSCALLS.get(), iovcnt = SYSCALLS.get();
  return SYSCALLS.doWritev(stream, iov, iovcnt);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall147(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var pid = SYSCALLS.get();
  if (pid && pid !== PROCINFO.pid) return -ERRNO_CODES.ESRCH;
  return PROCINFO.sid;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall148(which, varargs) {
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
 SYSCALLS.varargs = varargs;
 try {
  return -ERRNO_CODES.ENOMEM;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall180(which, varargs) {
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
 SYSCALLS.varargs = varargs;
 try {
  var buf = SYSCALLS.get(), size = SYSCALLS.get();
  if (size === 0) return -ERRNO_CODES.EINVAL;
  var cwd = FS.cwd();
  var cwdLengthInBytes = lengthBytesUTF8(cwd);
  if (size < cwdLengthInBytes + 1) return -ERRNO_CODES.ERANGE;
  stringToUTF8(cwd, buf, size);
  return buf;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall191(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var resource = SYSCALLS.get(), rlim = SYSCALLS.get();
  HEAP32[rlim >> 2] = -1;
  HEAP32[rlim + 4 >> 2] = -1;
  HEAP32[rlim + 8 >> 2] = -1;
  HEAP32[rlim + 12 >> 2] = -1;
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall192(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var addr = SYSCALLS.get(), len = SYSCALLS.get(), prot = SYSCALLS.get(), flags = SYSCALLS.get(), fd = SYSCALLS.get(), off = SYSCALLS.get();
  off <<= 12;
  var ptr;
  var allocated = false;
  if (fd === -1) {
   ptr = _memalign(PAGE_SIZE, len);
   if (!ptr) return -ERRNO_CODES.ENOMEM;
   _memset(ptr, 0, len);
   allocated = true;
  } else {
   var info = FS.getStream(fd);
   if (!info) return -ERRNO_CODES.EBADF;
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
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall193(which, varargs) {
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
 SYSCALLS.varargs = varargs;
 try {
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall199() {
 return ___syscall202.apply(null, arguments);
}
function ___syscall20(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  return PROCINFO.pid;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall200() {
 return ___syscall202.apply(null, arguments);
}
function ___syscall201() {
 return ___syscall202.apply(null, arguments);
}
function ___syscall205(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var size = SYSCALLS.get(), list = SYSCALLS.get();
  if (size < 1) return -ERRNO_CODES.EINVAL;
  HEAP32[list >> 2] = 0;
  return 1;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall207(which, varargs) {
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
 SYSCALLS.varargs = varargs;
 try {
  var ruid = SYSCALLS.get(), euid = SYSCALLS.get(), suid = SYSCALLS.get();
  HEAP32[ruid >> 2] = 0;
  HEAP32[euid >> 2] = 0;
  HEAP32[suid >> 2] = 0;
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall209() {
 return ___syscall211.apply(null, arguments);
}
function ___syscall212(which, varargs) {
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
function ___syscall220(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), dirp = SYSCALLS.get(), count = SYSCALLS.get();
  if (!stream.getdents) {
   stream.getdents = FS.readdir(stream.path);
  }
  var pos = 0;
  while (stream.getdents.length > 0 && pos + 268 <= count) {
   var id;
   var type;
   var name = stream.getdents.pop();
   if (name[0] === ".") {
    id = 1;
    type = 4;
   } else {
    var child = FS.lookupNode(stream.node, name);
    id = child.id;
    type = FS.isChrdev(child.mode) ? 2 : FS.isDir(child.mode) ? 4 : FS.isLink(child.mode) ? 10 : 8;
   }
   HEAP32[dirp + pos >> 2] = id;
   HEAP32[dirp + pos + 4 >> 2] = stream.position;
   HEAP16[dirp + pos + 8 >> 1] = 268;
   HEAP8[dirp + pos + 10 >> 0] = type;
   stringToUTF8(name, dirp + pos + 11, 256);
   pos += 268;
  }
  return pos;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall221(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), cmd = SYSCALLS.get();
  switch (cmd) {
  case 0:
   {
    var arg = SYSCALLS.get();
    if (arg < 0) {
     return -ERRNO_CODES.EINVAL;
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
  case 12:
   {
    var arg = SYSCALLS.get();
    var offset = 0;
    HEAP16[arg + offset >> 1] = 2;
    return 0;
   }
  case 13:
  case 14:
  case 13:
  case 14:
   return 0;
  case 16:
  case 8:
   return -ERRNO_CODES.EINVAL;
  case 9:
   ___setErrNo(ERRNO_CODES.EINVAL);
   return -1;
  default:
   {
    return -ERRNO_CODES.EINVAL;
   }
  }
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall268(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var path = SYSCALLS.getStr(), size = SYSCALLS.get(), buf = SYSCALLS.get();
  assert(size === 64);
  HEAP32[buf + 4 >> 2] = 4096;
  HEAP32[buf + 40 >> 2] = 4096;
  HEAP32[buf + 8 >> 2] = 1e6;
  HEAP32[buf + 12 >> 2] = 5e5;
  HEAP32[buf + 16 >> 2] = 5e5;
  HEAP32[buf + 20 >> 2] = FS.nextInode;
  HEAP32[buf + 24 >> 2] = 1e6;
  HEAP32[buf + 28 >> 2] = 42;
  HEAP32[buf + 44 >> 2] = 2;
  HEAP32[buf + 36 >> 2] = 255;
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall269(which, varargs) {
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
 SYSCALLS.varargs = varargs;
 try {
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall29(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  return -ERRNO_CODES.EINTR;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall295(which, varargs) {
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
 SYSCALLS.varargs = varargs;
 try {
  var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), owner = SYSCALLS.get(), group = SYSCALLS.get(), flags = SYSCALLS.get();
  assert(flags === 0);
  path = SYSCALLS.calculateAt(dirfd, path);
  FS.chown(path, owner, group);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall3(which, varargs) {
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
 SYSCALLS.varargs = varargs;
 try {
  var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), buf = SYSCALLS.get(), flags = SYSCALLS.get();
  var nofollow = flags & 256;
  flags = flags & ~256;
  assert(!flags, flags);
  path = SYSCALLS.calculateAt(dirfd, path);
  return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall301(which, varargs) {
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
 SYSCALLS.varargs = varargs;
 try {
  return -ERRNO_CODES.EMLINK;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall304(which, varargs) {
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
 SYSCALLS.varargs = varargs;
 try {
  var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), mode = SYSCALLS.get(), flags = SYSCALLS.get();
  assert(flags === 0);
  path = SYSCALLS.calculateAt(dirfd, path);
  FS.chmod(path, mode);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall320(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), times = SYSCALLS.get(), flags = SYSCALLS.get();
  assert(flags === 0);
  path = SYSCALLS.calculateAt(dirfd, path);
  var seconds = HEAP32[times >> 2];
  var nanoseconds = HEAP32[times + 4 >> 2];
  var atime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
  times += 8;
  seconds = HEAP32[times >> 2];
  nanoseconds = HEAP32[times + 4 >> 2];
  var mtime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
  FS.utime(path, atime, mtime);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall324(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), mode = SYSCALLS.get(), offset = SYSCALLS.get64(), len = SYSCALLS.get64();
  assert(mode === 0);
  FS.allocate(stream, offset, len);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall33(which, varargs) {
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
 SYSCALLS.varargs = varargs;
 try {
  var old = SYSCALLS.getStreamFromFD(), suggestFD = SYSCALLS.get(), flags = SYSCALLS.get();
  assert(!flags);
  if (old.fd === suggestFD) return -ERRNO_CODES.EINVAL;
  return SYSCALLS.doDup(old.path, old.flags, suggestFD);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall331(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  return -ERRNO_CODES.ENOSYS;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall34(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var inc = SYSCALLS.get();
  return -ERRNO_CODES.EPERM;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall340(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var pid = SYSCALLS.get(), resource = SYSCALLS.get(), new_limit = SYSCALLS.get(), old_limit = SYSCALLS.get();
  if (old_limit) {
   HEAP32[old_limit >> 2] = -1;
   HEAP32[old_limit + 4 >> 2] = -1;
   HEAP32[old_limit + 8 >> 2] = -1;
   HEAP32[old_limit + 12 >> 2] = -1;
  }
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall36(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall38(which, varargs) {
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
function ___syscall41(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var old = SYSCALLS.getStreamFromFD();
  return FS.open(old.path, old.flags, 0).fd;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
var PIPEFS = {
 BUCKET_BUFFER_SIZE: 8192,
 mount: (function(mount) {
  return FS.createNode(null, "/", 16384 | 511, 0);
 }),
 createPipe: (function() {
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
 }),
 stream_ops: {
  poll: (function(stream) {
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
  }),
  ioctl: (function(stream, request, varargs) {
   return ERRNO_CODES.EINVAL;
  }),
  read: (function(stream, buffer, offset, length, position) {
   var pipe = stream.node.pipe;
   var currentLength = 0;
   for (var i = 0; i < pipe.buckets.length; i++) {
    var bucket = pipe.buckets[i];
    currentLength += bucket.offset - bucket.roffset;
   }
   assert(buffer instanceof ArrayBuffer || ArrayBuffer.isView(buffer));
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
  }),
  write: (function(stream, buffer, offset, length, position) {
   var pipe = stream.node.pipe;
   assert(buffer instanceof ArrayBuffer || ArrayBuffer.isView(buffer));
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
  }),
  close: (function(stream) {
   var pipe = stream.node.pipe;
   pipe.buckets = null;
  })
 },
 nextname: (function() {
  if (!PIPEFS.nextname.current) {
   PIPEFS.nextname.current = 0;
  }
  return "pipe[" + PIPEFS.nextname.current++ + "]";
 })
};
function ___syscall42(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var fdPtr = SYSCALLS.get();
  if (fdPtr == 0) {
   throw new FS.ErrnoError(ERRNO_CODES.EFAULT);
  }
  var res = PIPEFS.createPipe();
  HEAP32[fdPtr >> 2] = res.readable_fd;
  HEAP32[fdPtr + 4 >> 2] = res.writable_fd;
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall5(which, varargs) {
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
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(), op = SYSCALLS.get();
  switch (op) {
  case 21509:
  case 21505:
   {
    if (!stream.tty) return -ERRNO_CODES.ENOTTY;
    return 0;
   }
  case 21510:
  case 21511:
  case 21512:
  case 21506:
  case 21507:
  case 21508:
   {
    if (!stream.tty) return -ERRNO_CODES.ENOTTY;
    return 0;
   }
  case 21519:
   {
    if (!stream.tty) return -ERRNO_CODES.ENOTTY;
    var argp = SYSCALLS.get();
    HEAP32[argp >> 2] = 0;
    return 0;
   }
  case 21520:
   {
    if (!stream.tty) return -ERRNO_CODES.ENOTTY;
    return -ERRNO_CODES.EINVAL;
   }
  case 21531:
   {
    var argp = SYSCALLS.get();
    return FS.ioctl(stream, op, argp);
   }
  case 21523:
   {
    if (!stream.tty) return -ERRNO_CODES.ENOTTY;
    return 0;
   }
  case 21524:
   {
    if (!stream.tty) return -ERRNO_CODES.ENOTTY;
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
 SYSCALLS.varargs = varargs;
 try {
  var pid = SYSCALLS.get(), pgid = SYSCALLS.get();
  if (pid && pid !== PROCINFO.pid) return -ERRNO_CODES.ESRCH;
  if (pgid && pgid !== PROCINFO.pgid) return -ERRNO_CODES.EPERM;
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall6(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD();
  FS.close(stream);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall60(which, varargs) {
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
 SYSCALLS.varargs = varargs;
 try {
  return PROCINFO.ppid;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall66(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall75(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall77(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var who = SYSCALLS.get(), usage = SYSCALLS.get();
  _memset(usage, 0, 136);
  HEAP32[usage >> 2] = 1;
  HEAP32[usage + 4 >> 2] = 2;
  HEAP32[usage + 8 >> 2] = 3;
  HEAP32[usage + 12 >> 2] = 4;
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall83(which, varargs) {
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
 SYSCALLS.varargs = varargs;
 try {
  var oldpath = SYSCALLS.get(), newpath = SYSCALLS.get();
  return -ERRNO_CODES.EMLINK;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall91(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var addr = SYSCALLS.get(), len = SYSCALLS.get();
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
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall94(which, varargs) {
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
 SYSCALLS.varargs = varargs;
 try {
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___syscall97(which, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  return -ERRNO_CODES.EPERM;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}
function ___unlock() {}
function ___wait() {}
function __exit(status) {
 exit(status);
}
function _abort() {
 Module["abort"]();
}
var __sigalrm_handler = 0;
function _alarm(seconds) {
 setTimeout((function() {
  if (__sigalrm_handler) Module["dynCall_vi"](__sigalrm_handler, 0);
 }), seconds * 1e3);
}
function _chroot(path) {
 ___setErrNo(13);
 return -1;
}
function _clock() {
 if (_clock.start === undefined) _clock.start = Date.now();
 return (Date.now() - _clock.start) * (1e6 / 1e3) | 0;
}
function _emscripten_get_now_res() {
 if (ENVIRONMENT_IS_NODE) {
  return 1;
 } else if (typeof dateNow !== "undefined" || (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && self["performance"] && self["performance"]["now"]) {
  return 1e3;
 } else {
  return 1e3 * 1e3;
 }
}
function _emscripten_get_now_is_monotonic() {
 return ENVIRONMENT_IS_NODE || typeof dateNow !== "undefined" || (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && self["performance"] && self["performance"]["now"];
}
function _clock_getres(clk_id, res) {
 var nsec;
 if (clk_id === 0) {
  nsec = 1e3 * 1e3;
 } else if (clk_id === 1 && _emscripten_get_now_is_monotonic()) {
  nsec = _emscripten_get_now_res();
 } else {
  ___setErrNo(22);
  return -1;
 }
 HEAP32[res >> 2] = nsec / 1e9 | 0;
 HEAP32[res + 4 >> 2] = nsec;
 return 0;
}
function _clock_gettime(clk_id, tp) {
 var now;
 if (clk_id === 0) {
  now = Date.now();
 } else if (clk_id === 1 && _emscripten_get_now_is_monotonic()) {
  now = _emscripten_get_now();
 } else {
  ___setErrNo(22);
  return -1;
 }
 HEAP32[tp >> 2] = now / 1e3 | 0;
 HEAP32[tp + 4 >> 2] = now % 1e3 * 1e3 * 1e3 | 0;
 return 0;
}
function _clock_settime(clk_id, tp) {
 ___setErrNo(clk_id === 0 ? 1 : 22);
 return -1;
}
function _confstr(name, buf, len) {
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
  ___setErrNo(22);
  return 0;
 }
 if (len == 0 || buf == 0) {
  return value.length + 1;
 } else {
  var length = Math.min(len, value.length);
  for (var i = 0; i < length; i++) {
   HEAP8[buf + i >> 0] = value.charCodeAt(i);
  }
  if (len > length) HEAP8[buf + i++ >> 0] = 0;
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
function _emscripten_exit_with_live_runtime() {
 Module["noExitRuntime"] = true;
 throw "SimulateInfiniteLoop";
}
function _emscripten_get_heap_size() {
 return TOTAL_MEMORY;
}
function _emscripten_resize_heap(requestedSize) {
 var oldSize = _emscripten_get_heap_size();
 assert(requestedSize > oldSize);
 var PAGE_MULTIPLE = 65536;
 var LIMIT = 2147483648 - PAGE_MULTIPLE;
 if (requestedSize > LIMIT) {
  err("Cannot enlarge memory, asked to go up to " + requestedSize + " bytes, but the limit is " + LIMIT + " bytes!");
  return false;
 }
 var MIN_TOTAL_MEMORY = 16777216;
 var newSize = Math.max(oldSize, MIN_TOTAL_MEMORY);
 while (newSize < requestedSize) {
  if (newSize <= 536870912) {
   newSize = alignUp(2 * newSize, PAGE_MULTIPLE);
  } else {
   newSize = Math.min(alignUp((3 * newSize + 2147483648) / 4, PAGE_MULTIPLE), LIMIT);
   if (newSize === oldSize) {
    warnOnce("Cannot ask for more memory since we reached the practical limit in browsers (which is just below 2GB), so the request would have failed. Requesting only " + TOTAL_MEMORY);
   }
  }
 }
 var start = Date.now();
 var replacement = Module["reallocBuffer"](newSize);
 if (!replacement || replacement.byteLength != newSize) {
  err("Failed to grow the heap from " + oldSize + " bytes to " + newSize + " bytes, not enough memory!");
  if (replacement) {
   err("Expected to get back a buffer of size " + newSize + " bytes, but instead got back a buffer of size " + replacement.byteLength);
  }
  return false;
 }
 updateGlobalBuffer(replacement);
 updateGlobalBufferViews();
 TOTAL_MEMORY = newSize;
 HEAPU32[DYNAMICTOP_PTR >> 2] = requestedSize;
 return true;
}
function _emscripten_run_script(ptr) {
 eval(UTF8ToString(ptr));
}
function _emscripten_run_script_string(ptr) {
 var s = eval(UTF8ToString(ptr)) + "";
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
function _emscripten_sleep(ms) {
 EmterpreterAsync.handle((function(resume) {
  setTimeout((function() {
   resume();
  }), ms);
 }));
}
function _endpwent() {
 throw "endpwent: TODO";
}
function _execl() {
 ___setErrNo(8);
 return -1;
}
function _execv() {
 return _execl.apply(null, arguments);
}
function _execve() {
 return _execl.apply(null, arguments);
}
function _exit(status) {
 __exit(status);
}
function _fexecve() {
 return _execl.apply(null, arguments);
}
function _flock(fd, operation) {
 return 0;
}
function _fork() {
 ___setErrNo(11);
 return -1;
}
function _fpathconf(fildes, name) {
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
 ___setErrNo(22);
 return -1;
}
function _getenv(name) {
 if (name === 0) return 0;
 name = UTF8ToString(name);
 if (!ENV.hasOwnProperty(name)) return 0;
 if (_getenv.ret) _free(_getenv.ret);
 _getenv.ret = allocateUTF8(ENV[name]);
 return _getenv.ret;
}
function _getitimer() {
 throw "getitimer() is not implemented yet";
}
function _getloadavg(loadavg, nelem) {
 var limit = Math.min(nelem, 3);
 var doubleSize = 8;
 for (var i = 0; i < limit; i++) {
  HEAPF64[loadavg + i * doubleSize >> 3] = .1;
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
 HEAP32[ptr >> 2] = now / 1e3 | 0;
 HEAP32[ptr + 4 >> 2] = now % 1e3 * 1e3 | 0;
 return 0;
}
var ___tm_current = 1711312;
var ___tm_timezone = (stringToUTF8("GMT", 1711360, 4), 1711360);
function _gmtime_r(time, tmPtr) {
 var date = new Date(HEAP32[time >> 2] * 1e3);
 HEAP32[tmPtr >> 2] = date.getUTCSeconds();
 HEAP32[tmPtr + 4 >> 2] = date.getUTCMinutes();
 HEAP32[tmPtr + 8 >> 2] = date.getUTCHours();
 HEAP32[tmPtr + 12 >> 2] = date.getUTCDate();
 HEAP32[tmPtr + 16 >> 2] = date.getUTCMonth();
 HEAP32[tmPtr + 20 >> 2] = date.getUTCFullYear() - 1900;
 HEAP32[tmPtr + 24 >> 2] = date.getUTCDay();
 HEAP32[tmPtr + 36 >> 2] = 0;
 HEAP32[tmPtr + 32 >> 2] = 0;
 var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
 var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0;
 HEAP32[tmPtr + 28 >> 2] = yday;
 HEAP32[tmPtr + 40 >> 2] = ___tm_timezone;
 return tmPtr;
}
function _gmtime(time) {
 return _gmtime_r(time, ___tm_current);
}
function _kill(pid, sig) {
 err("Calling stub instead of kill()");
 ___setErrNo(ERRNO_CODES.EPERM);
 return -1;
}
function _killpg() {
 err("Calling stub instead of killpg()");
 ___setErrNo(ERRNO_CODES.EPERM);
 return -1;
}
function _llvm_copysign_f64(x, y) {
 return y < 0 || y === 0 && 1 / y < 0 ? -Math_abs(x) : Math_abs(x);
}
function _llvm_log10_f32(x) {
 return Math.log(x) / Math.LN10;
}
function _llvm_log10_f64() {
 return _llvm_log10_f32.apply(null, arguments);
}
function _llvm_log2_f32(x) {
 return Math.log(x) / Math.LN2;
}
function _llvm_log2_f64() {
 return _llvm_log2_f32.apply(null, arguments);
}
function _llvm_stackrestore(p) {
 var self = _llvm_stacksave;
 var ret = self.LLVM_SAVEDSTACKS[p];
 self.LLVM_SAVEDSTACKS.splice(p, 1);
 stackRestore(ret);
}
function _llvm_stacksave() {
 var self = _llvm_stacksave;
 if (!self.LLVM_SAVEDSTACKS) {
  self.LLVM_SAVEDSTACKS = [];
 }
 self.LLVM_SAVEDSTACKS.push(stackSave());
 return self.LLVM_SAVEDSTACKS.length - 1;
}
function _llvm_trap() {
 abort("trap!");
}
function _tzset() {
 if (_tzset.called) return;
 _tzset.called = true;
 HEAP32[__get_timezone() >> 2] = (new Date).getTimezoneOffset() * 60;
 var winter = new Date(2e3, 0, 1);
 var summer = new Date(2e3, 6, 1);
 HEAP32[__get_daylight() >> 2] = Number(winter.getTimezoneOffset() != summer.getTimezoneOffset());
 function extractZone(date) {
  var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
  return match ? match[1] : "GMT";
 }
 var winterName = extractZone(winter);
 var summerName = extractZone(summer);
 var winterNamePtr = allocate(intArrayFromString(winterName), "i8", ALLOC_NORMAL);
 var summerNamePtr = allocate(intArrayFromString(summerName), "i8", ALLOC_NORMAL);
 if (summer.getTimezoneOffset() < winter.getTimezoneOffset()) {
  HEAP32[__get_tzname() >> 2] = winterNamePtr;
  HEAP32[__get_tzname() + 4 >> 2] = summerNamePtr;
 } else {
  HEAP32[__get_tzname() >> 2] = summerNamePtr;
  HEAP32[__get_tzname() + 4 >> 2] = winterNamePtr;
 }
}
function _localtime_r(time, tmPtr) {
 _tzset();
 var date = new Date(HEAP32[time >> 2] * 1e3);
 HEAP32[tmPtr >> 2] = date.getSeconds();
 HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
 HEAP32[tmPtr + 8 >> 2] = date.getHours();
 HEAP32[tmPtr + 12 >> 2] = date.getDate();
 HEAP32[tmPtr + 16 >> 2] = date.getMonth();
 HEAP32[tmPtr + 20 >> 2] = date.getFullYear() - 1900;
 HEAP32[tmPtr + 24 >> 2] = date.getDay();
 var start = new Date(date.getFullYear(), 0, 1);
 var yday = (date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24) | 0;
 HEAP32[tmPtr + 28 >> 2] = yday;
 HEAP32[tmPtr + 36 >> 2] = -(date.getTimezoneOffset() * 60);
 var summerOffset = (new Date(2e3, 6, 1)).getTimezoneOffset();
 var winterOffset = start.getTimezoneOffset();
 var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
 HEAP32[tmPtr + 32 >> 2] = dst;
 var zonePtr = HEAP32[__get_tzname() + (dst ? 4 : 0) >> 2];
 HEAP32[tmPtr + 40 >> 2] = zonePtr;
 return tmPtr;
}
function _localtime(time) {
 return _localtime_r(time, ___tm_current);
}
function _emscripten_memcpy_big(dest, src, num) {
 HEAPU8.set(HEAPU8.subarray(src, src + num), dest);
}
function _mktime(tmPtr) {
 _tzset();
 var date = new Date(HEAP32[tmPtr + 20 >> 2] + 1900, HEAP32[tmPtr + 16 >> 2], HEAP32[tmPtr + 12 >> 2], HEAP32[tmPtr + 8 >> 2], HEAP32[tmPtr + 4 >> 2], HEAP32[tmPtr >> 2], 0);
 var dst = HEAP32[tmPtr + 32 >> 2];
 var guessedOffset = date.getTimezoneOffset();
 var start = new Date(date.getFullYear(), 0, 1);
 var summerOffset = (new Date(2e3, 6, 1)).getTimezoneOffset();
 var winterOffset = start.getTimezoneOffset();
 var dstOffset = Math.min(winterOffset, summerOffset);
 if (dst < 0) {
  HEAP32[tmPtr + 32 >> 2] = Number(summerOffset != winterOffset && dstOffset == guessedOffset);
 } else if (dst > 0 != (dstOffset == guessedOffset)) {
  var nonDstOffset = Math.max(winterOffset, summerOffset);
  var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
  date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4);
 }
 HEAP32[tmPtr + 24 >> 2] = date.getDay();
 var yday = (date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24) | 0;
 HEAP32[tmPtr + 28 >> 2] = yday;
 return date.getTime() / 1e3 | 0;
}
function _usleep(useconds) {
 var msec = useconds / 1e3;
 if ((ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && self["performance"] && self["performance"]["now"]) {
  var start = self["performance"]["now"]();
  while (self["performance"]["now"]() - start < msec) {}
 } else {
  var start = Date.now();
  while (Date.now() - start < msec) {}
 }
 return 0;
}
Module["_usleep"] = _usleep;
function _nanosleep(rqtp, rmtp) {
 var seconds = HEAP32[rqtp >> 2];
 var nanoseconds = HEAP32[rqtp + 4 >> 2];
 if (rmtp !== 0) {
  HEAP32[rmtp >> 2] = 0;
  HEAP32[rmtp + 4 >> 2] = 0;
 }
 return _usleep(seconds * 1e6 + nanoseconds / 1e3);
}
function _pathconf() {
 return _fpathconf.apply(null, arguments);
}
function _pthread_attr_destroy(attr) {
 return 0;
}
function _pthread_attr_init(attr) {
 return 0;
}
function _pthread_attr_setstacksize() {}
function _pthread_cond_destroy() {
 return 0;
}
function _pthread_cond_init() {
 return 0;
}
function _pthread_cond_signal() {
 return 0;
}
function _pthread_cond_timedwait() {
 return 0;
}
function _pthread_cond_wait() {
 return 0;
}
function _pthread_create() {
 return 11;
}
function _pthread_detach() {}
function _pthread_exit(status) {
 _exit(status);
}
var PTHREAD_SPECIFIC = {};
function _pthread_getspecific(key) {
 return PTHREAD_SPECIFIC[key] || 0;
}
function _pthread_join() {}
var PTHREAD_SPECIFIC_NEXT_KEY = 1;
function _pthread_key_create(key, destructor) {
 if (key == 0) {
  return ERRNO_CODES.EINVAL;
 }
 HEAP32[key >> 2] = PTHREAD_SPECIFIC_NEXT_KEY;
 PTHREAD_SPECIFIC[PTHREAD_SPECIFIC_NEXT_KEY] = 0;
 PTHREAD_SPECIFIC_NEXT_KEY++;
 return 0;
}
function _pthread_key_delete(key) {
 if (key in PTHREAD_SPECIFIC) {
  delete PTHREAD_SPECIFIC[key];
  return 0;
 }
 return ERRNO_CODES.EINVAL;
}
function _pthread_mutex_destroy() {}
function _pthread_mutex_init() {}
function _pthread_mutexattr_destroy() {}
function _pthread_mutexattr_init() {}
function _pthread_mutexattr_settype() {}
function _pthread_setcancelstate() {
 return 0;
}
function _pthread_setspecific(key, value) {
 if (!(key in PTHREAD_SPECIFIC)) {
  return ERRNO_CODES.EINVAL;
 }
 PTHREAD_SPECIFIC[key] = value;
 return 0;
}
function _pthread_sigmask() {
 return 0;
}
function _putenv(string) {
 if (string === 0) {
  ___setErrNo(22);
  return -1;
 }
 string = UTF8ToString(string);
 var splitPoint = string.indexOf("=");
 if (string === "" || string.indexOf("=") === -1) {
  ___setErrNo(22);
  return -1;
 }
 var name = string.slice(0, splitPoint);
 var value = string.slice(splitPoint + 1);
 if (!(name in ENV) || ENV[name] !== value) {
  ENV[name] = value;
  ___buildEnvironment(__get_environ());
 }
 return 0;
}
function _raise(sig) {
 err("Calling stub instead of raise()");
 ___setErrNo(ERRNO_CODES.ENOSYS);
 warnOnce("raise() returning an error as we do not support it");
 return -1;
}
function _sched_yield() {
 return 0;
}
function _setenv(envname, envval, overwrite) {
 if (envname === 0) {
  ___setErrNo(22);
  return -1;
 }
 var name = UTF8ToString(envname);
 var val = UTF8ToString(envval);
 if (name === "" || name.indexOf("=") !== -1) {
  ___setErrNo(22);
  return -1;
 }
 if (ENV.hasOwnProperty(name) && !overwrite) return 0;
 ENV[name] = val;
 ___buildEnvironment(__get_environ());
 return 0;
}
function _sysconf(name) {
 switch (name) {
 case 30:
  return PAGE_SIZE;
 case 85:
  var maxHeapSize = 2 * 1024 * 1024 * 1024 - 65536;
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
 ___setErrNo(22);
 return -1;
}
function _setgroups(ngroups, gidset) {
 if (ngroups < 1 || ngroups > _sysconf(3)) {
  ___setErrNo(22);
  return -1;
 } else {
  ___setErrNo(1);
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
 err("Calling stub instead of sigaction()");
 return 0;
}
function _sigaddset(set, signum) {
 HEAP32[set >> 2] = HEAP32[set >> 2] | 1 << signum - 1;
 return 0;
}
function _sigemptyset(set) {
 HEAP32[set >> 2] = 0;
 return 0;
}
function _sigfillset(set) {
 HEAP32[set >> 2] = -1 >>> 0;
 return 0;
}
function _siginterrupt() {
 err("Calling stub instead of siginterrupt()");
 return 0;
}
function _sigismember(set, signum) {
 return HEAP32[set >> 2] & 1 << signum - 1;
}
function _sigpending(set) {
 HEAP32[set >> 2] = 0;
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
 var tm_zone = HEAP32[tm + 40 >> 2];
 var date = {
  tm_sec: HEAP32[tm >> 2],
  tm_min: HEAP32[tm + 4 >> 2],
  tm_hour: HEAP32[tm + 8 >> 2],
  tm_mday: HEAP32[tm + 12 >> 2],
  tm_mon: HEAP32[tm + 16 >> 2],
  tm_year: HEAP32[tm + 20 >> 2],
  tm_wday: HEAP32[tm + 24 >> 2],
  tm_yday: HEAP32[tm + 28 >> 2],
  tm_isdst: HEAP32[tm + 32 >> 2],
  tm_gmtoff: HEAP32[tm + 36 >> 2],
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
  "%X": "%H:%M:%S"
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
  "%a": (function(date) {
   return WEEKDAYS[date.tm_wday].substring(0, 3);
  }),
  "%A": (function(date) {
   return WEEKDAYS[date.tm_wday];
  }),
  "%b": (function(date) {
   return MONTHS[date.tm_mon].substring(0, 3);
  }),
  "%B": (function(date) {
   return MONTHS[date.tm_mon];
  }),
  "%C": (function(date) {
   var year = date.tm_year + 1900;
   return leadingNulls(year / 100 | 0, 2);
  }),
  "%d": (function(date) {
   return leadingNulls(date.tm_mday, 2);
  }),
  "%e": (function(date) {
   return leadingSomething(date.tm_mday, 2, " ");
  }),
  "%g": (function(date) {
   return getWeekBasedYear(date).toString().substring(2);
  }),
  "%G": (function(date) {
   return getWeekBasedYear(date);
  }),
  "%H": (function(date) {
   return leadingNulls(date.tm_hour, 2);
  }),
  "%I": (function(date) {
   var twelveHour = date.tm_hour;
   if (twelveHour == 0) twelveHour = 12; else if (twelveHour > 12) twelveHour -= 12;
   return leadingNulls(twelveHour, 2);
  }),
  "%j": (function(date) {
   return leadingNulls(date.tm_mday + __arraySum(__isLeapYear(date.tm_year + 1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon - 1), 3);
  }),
  "%m": (function(date) {
   return leadingNulls(date.tm_mon + 1, 2);
  }),
  "%M": (function(date) {
   return leadingNulls(date.tm_min, 2);
  }),
  "%n": (function() {
   return "\n";
  }),
  "%p": (function(date) {
   if (date.tm_hour >= 0 && date.tm_hour < 12) {
    return "AM";
   } else {
    return "PM";
   }
  }),
  "%S": (function(date) {
   return leadingNulls(date.tm_sec, 2);
  }),
  "%t": (function() {
   return "\t";
  }),
  "%u": (function(date) {
   var day = new Date(date.tm_year + 1900, date.tm_mon + 1, date.tm_mday, 0, 0, 0, 0);
   return day.getDay() || 7;
  }),
  "%U": (function(date) {
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
  }),
  "%V": (function(date) {
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
  }),
  "%w": (function(date) {
   var day = new Date(date.tm_year + 1900, date.tm_mon + 1, date.tm_mday, 0, 0, 0, 0);
   return day.getDay();
  }),
  "%W": (function(date) {
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
  }),
  "%y": (function(date) {
   return (date.tm_year + 1900).toString().substring(2);
  }),
  "%Y": (function(date) {
   return date.tm_year + 1900;
  }),
  "%z": (function(date) {
   var off = date.tm_gmtoff;
   var ahead = off >= 0;
   off = Math.abs(off) / 60;
   off = off / 60 * 100 + off % 60;
   return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
  }),
  "%Z": (function(date) {
   return date.tm_zone;
  }),
  "%%": (function() {
   return "%";
  })
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
 ___setErrNo(11);
 return -1;
}
function _time(ptr) {
 var ret = Date.now() / 1e3 | 0;
 if (ptr) {
  HEAP32[ptr >> 2] = ret;
 }
 return ret;
}
function _times(buffer) {
 if (buffer !== 0) {
  _memset(buffer, 0, 16);
 }
 return 0;
}
function _unsetenv(name) {
 if (name === 0) {
  ___setErrNo(22);
  return -1;
 }
 name = UTF8ToString(name);
 if (name === "" || name.indexOf("=") !== -1) {
  ___setErrNo(22);
  return -1;
 }
 if (ENV.hasOwnProperty(name)) {
  delete ENV[name];
  ___buildEnvironment(__get_environ());
 }
 return 0;
}
function _utimes(path, times) {
 var time;
 if (times) {
  var offset = 8 + 0;
  time = HEAP32[times + offset >> 2] * 1e3;
  offset = 8 + 4;
  time += HEAP32[times + offset >> 2] / 1e3;
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
 ___setErrNo(10);
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
FS.staticInit();
__ATINIT__.unshift((function() {
 if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
}));
__ATMAIN__.push((function() {
 FS.ignorePermissions = false;
}));
__ATEXIT__.push((function() {
 FS.quit();
}));
Module["FS_createFolder"] = FS.createFolder;
Module["FS_createPath"] = FS.createPath;
Module["FS_createDataFile"] = FS.createDataFile;
Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
Module["FS_createLazyFile"] = FS.createLazyFile;
Module["FS_createLink"] = FS.createLink;
Module["FS_createDevice"] = FS.createDevice;
Module["FS_unlink"] = FS.unlink;
__ATINIT__.unshift((function() {
 TTY.init();
}));
__ATEXIT__.push((function() {
 TTY.shutdown();
}));
if (ENVIRONMENT_IS_NODE) {
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
if (ENVIRONMENT_IS_NODE) {
 _emscripten_get_now = function _emscripten_get_now_actual() {
  var t = process["hrtime"]();
  return t[0] * 1e3 + t[1] / 1e6;
 };
} else if (typeof dateNow !== "undefined") {
 _emscripten_get_now = dateNow;
} else if (typeof self === "object" && self["performance"] && typeof self["performance"]["now"] === "function") {
 _emscripten_get_now = (function() {
  return self["performance"]["now"]();
 });
} else if (typeof performance === "object" && typeof performance["now"] === "function") {
 _emscripten_get_now = (function() {
  return performance["now"]();
 });
} else {
 _emscripten_get_now = Date.now;
}
__ATINIT__.push((function() {
 PIPEFS.root = FS.mount(PIPEFS, {}, null);
}));
function intArrayFromString(stringy, dontAddNull, length) {
 var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
 var u8array = new Array(len);
 var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
 if (dontAddNull) u8array.length = numBytesWritten;
 return u8array;
}
function nullFunc_X(x) {
 err("Invalid function pointer called with signature 'X'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
 err("Build with ASSERTIONS=2 for more info.");
 abort(x);
}
Module["wasmTableSize"] = 4096;
function ftCall_X(x) {
 return Module["asm"]["dynCall_X"](x);
}
function ftCall_dd(x, a0) {
 return Module["asm"]["dynCall_dd"](x, a0);
}
function ftCall_ddd(x, a0, a1) {
 return Module["asm"]["dynCall_ddd"](x, a0, a1);
}
function ftCall_i(x) {
 return Module["asm"]["dynCall_i"](x);
}
function ftCall_ii(x, a0) {
 return Module["asm"]["dynCall_ii"](x, a0);
}
function ftCall_iii(x, a0, a1) {
 return Module["asm"]["dynCall_iii"](x, a0, a1);
}
function ftCall_iiii(x, a0, a1, a2) {
 return Module["asm"]["dynCall_iiii"](x, a0, a1, a2);
}
function ftCall_iiiii(x, a0, a1, a2, a3) {
 return Module["asm"]["dynCall_iiiii"](x, a0, a1, a2, a3);
}
function ftCall_iiiiii(x, a0, a1, a2, a3, a4) {
 return Module["asm"]["dynCall_iiiiii"](x, a0, a1, a2, a3, a4);
}
function ftCall_iiiiiii(x, a0, a1, a2, a3, a4, a5) {
 return Module["asm"]["dynCall_iiiiiii"](x, a0, a1, a2, a3, a4, a5);
}
function ftCall_iiiiiiiiii(x, a0, a1, a2, a3, a4, a5, a6, a7, a8) {
 return Module["asm"]["dynCall_iiiiiiiiii"](x, a0, a1, a2, a3, a4, a5, a6, a7, a8);
}
function ftCall_v(x) {
 return Module["asm"]["dynCall_v"](x);
}
function ftCall_vi(x, a0) {
 return Module["asm"]["dynCall_vi"](x, a0);
}
function ftCall_vii(x, a0, a1) {
 return Module["asm"]["dynCall_vii"](x, a0, a1);
}
function ftCall_viii(x, a0, a1, a2) {
 return Module["asm"]["dynCall_viii"](x, a0, a1, a2);
}
function ftCall_viiii(x, a0, a1, a2, a3) {
 return Module["asm"]["dynCall_viiii"](x, a0, a1, a2, a3);
}
function ftCall_viiiii(x, a0, a1, a2, a3, a4) {
 return Module["asm"]["dynCall_viiiii"](x, a0, a1, a2, a3, a4);
}
function ftCall_viiiiii(x, a0, a1, a2, a3, a4, a5) {
 return Module["asm"]["dynCall_viiiiii"](x, a0, a1, a2, a3, a4, a5);
}
var dynCall_X = ftCall_X;
var dynCall_dd = ftCall_dd;
var dynCall_ddd = ftCall_ddd;
var dynCall_i = ftCall_i;
var dynCall_ii = ftCall_ii;
var dynCall_iii = ftCall_iii;
var dynCall_iiii = ftCall_iiii;
var dynCall_iiiii = ftCall_iiiii;
var dynCall_iiiiii = ftCall_iiiiii;
var dynCall_iiiiiii = ftCall_iiiiiii;
var dynCall_iiiiiiiiii = ftCall_iiiiiiiiii;
var dynCall_v = ftCall_v;
var dynCall_vi = ftCall_vi;
var dynCall_vii = ftCall_vii;
var dynCall_viii = ftCall_viii;
var dynCall_viiii = ftCall_viiii;
var dynCall_viiiii = ftCall_viiiii;
var dynCall_viiiiii = ftCall_viiiiii;
var asmGlobalArg = {};
Module.asmLibraryArg = {
 "f": abort,
 "N": assert,
 "j": setTempRet0,
 "h": getTempRet0,
 "jb": abortOnCannotGrowMemory,
 "g": abortStackOverflow,
 "ja": abortStackOverflowEmterpreter,
 "ib": nullFunc_X,
 "Oc": ___buildEnvironment,
 "hb": ___libc_current_sigrtmax,
 "gb": ___libc_current_sigrtmin,
 "M": ___lock,
 "fb": ___map_file,
 "Nc": ___setErrNo,
 "Mc": ___syscall10,
 "Lc": ___syscall118,
 "eb": ___syscall12,
 "Kc": ___syscall122,
 "db": ___syscall132,
 "Jc": ___syscall133,
 "Ic": ___syscall14,
 "cb": ___syscall140,
 "Hc": ___syscall142,
 "Gc": ___syscall144,
 "bb": ___syscall145,
 "ia": ___syscall146,
 "Fc": ___syscall147,
 "Ec": ___syscall148,
 "ab": ___syscall15,
 "Dc": ___syscall163,
 "Cc": ___syscall180,
 "Bc": ___syscall181,
 "Ac": ___syscall183,
 "zc": ___syscall191,
 "yc": ___syscall192,
 "xc": ___syscall193,
 "wc": ___syscall194,
 "$a": ___syscall195,
 "vc": ___syscall196,
 "uc": ___syscall197,
 "tc": ___syscall198,
 "sc": ___syscall199,
 "rc": ___syscall20,
 "qc": ___syscall200,
 "pc": ___syscall201,
 "oc": ___syscall202,
 "nc": ___syscall205,
 "mc": ___syscall207,
 "lc": ___syscall209,
 "kc": ___syscall211,
 "_a": ___syscall212,
 "jc": ___syscall220,
 "m": ___syscall221,
 "ic": ___syscall268,
 "hc": ___syscall269,
 "gc": ___syscall272,
 "fc": ___syscall29,
 "Za": ___syscall295,
 "ec": ___syscall296,
 "dc": ___syscall297,
 "cc": ___syscall298,
 "bc": ___syscall3,
 "ha": ___syscall300,
 "ac": ___syscall301,
 "$b": ___syscall302,
 "_b": ___syscall303,
 "Zb": ___syscall304,
 "Yb": ___syscall305,
 "Ya": ___syscall306,
 "Xb": ___syscall320,
 "Wb": ___syscall324,
 "Vb": ___syscall33,
 "Ub": ___syscall330,
 "Tb": ___syscall331,
 "Sb": ___syscall34,
 "Xa": ___syscall340,
 "Rb": ___syscall36,
 "Qb": ___syscall38,
 "Pb": ___syscall39,
 "Ob": ___syscall4,
 "Nb": ___syscall40,
 "Mb": ___syscall41,
 "Lb": ___syscall42,
 "Wa": ___syscall5,
 "W": ___syscall54,
 "Kb": ___syscall57,
 "J": ___syscall6,
 "Jb": ___syscall60,
 "Va": ___syscall63,
 "Ib": ___syscall64,
 "Hb": ___syscall66,
 "Gb": ___syscall75,
 "Fb": ___syscall77,
 "Eb": ___syscall83,
 "Db": ___syscall85,
 "Cb": ___syscall9,
 "Bb": ___syscall91,
 "Ab": ___syscall94,
 "zb": ___syscall96,
 "yb": ___syscall97,
 "A": ___unlock,
 "xb": ___wait,
 "V": __exit,
 "I": _abort,
 "Ua": _alarm,
 "Ta": _chroot,
 "H": _clock,
 "G": _clock_getres,
 "q": _clock_gettime,
 "Sa": _clock_settime,
 "U": _confstr,
 "Ra": _dlerror,
 "Qa": _dlopen,
 "ga": _dlsym,
 "Pa": _emscripten_exit_with_live_runtime,
 "wb": _emscripten_get_heap_size,
 "vb": _emscripten_memcpy_big,
 "ub": _emscripten_resize_heap,
 "w": _emscripten_run_script,
 "tb": _emscripten_run_script_string,
 "Oa": _emscripten_sleep,
 "fa": _endpwent,
 "Na": _execv,
 "Ma": _execve,
 "y": _exit,
 "La": _fexecve,
 "Ka": _flock,
 "ea": _fork,
 "da": _fpathconf,
 "p": _getenv,
 "Ja": _getitimer,
 "Ia": _getloadavg,
 "ca": _getpwent,
 "Ha": _getpwnam,
 "Ga": _getpwuid,
 "T": _gettimeofday,
 "L": _gmtime,
 "Fa": _kill,
 "Ea": _killpg,
 "i": _llvm_copysign_f64,
 "Da": _llvm_log10_f64,
 "Ca": _llvm_log2_f64,
 "Ba": _llvm_stackrestore,
 "sb": _llvm_stacksave,
 "rb": _llvm_trap,
 "v": _localtime,
 "S": _mktime,
 "qb": _nanosleep,
 "Aa": _pathconf,
 "R": _pthread_attr_destroy,
 "ba": _pthread_attr_init,
 "aa": _pthread_attr_setstacksize,
 "s": _pthread_cond_destroy,
 "Q": _pthread_cond_init,
 "k": _pthread_cond_signal,
 "P": _pthread_cond_timedwait,
 "K": _pthread_cond_wait,
 "$": _pthread_create,
 "za": _pthread_detach,
 "ya": _pthread_exit,
 "l": _pthread_getspecific,
 "pb": _pthread_join,
 "O": _pthread_key_create,
 "B": _pthread_key_delete,
 "r": _pthread_mutex_destroy,
 "F": _pthread_mutex_init,
 "ob": _pthread_mutexattr_destroy,
 "nb": _pthread_mutexattr_init,
 "mb": _pthread_mutexattr_settype,
 "E": _pthread_setcancelstate,
 "n": _pthread_setspecific,
 "D": _pthread_sigmask,
 "xa": _putenv,
 "C": _raise,
 "wa": _sched_yield,
 "u": _setenv,
 "va": _setgroups,
 "ua": _setitimer,
 "ta": _setpwent,
 "o": _sigaction,
 "sa": _sigaddset,
 "t": _sigemptyset,
 "_": _sigfillset,
 "ra": _siginterrupt,
 "qa": _sigismember,
 "pa": _sigpending,
 "lb": _strftime,
 "z": _sysconf,
 "oa": _system,
 "x": _time,
 "Z": _times,
 "Y": _unsetenv,
 "kb": _utimes,
 "na": _wait,
 "ma": _wait3,
 "la": _wait4,
 "ka": _waitid,
 "X": _waitpid,
 "a": DYNAMICTOP_PTR,
 "b": tempDoublePtr,
 "c": EMTSTACKTOP,
 "d": EMT_STACK_MAX,
 "e": eb
};
var asm = Module["asm"](asmGlobalArg, Module.asmLibraryArg, buffer);
var real____divdi3 = asm["___divdi3"];
asm["___divdi3"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real____divdi3.apply(null, arguments);
});
var real____emscripten_environ_constructor = asm["___emscripten_environ_constructor"];
asm["___emscripten_environ_constructor"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real____emscripten_environ_constructor.apply(null, arguments);
});
var real____errno_location = asm["___errno_location"];
asm["___errno_location"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real____errno_location.apply(null, arguments);
});
var real____muldi3 = asm["___muldi3"];
asm["___muldi3"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real____muldi3.apply(null, arguments);
});
var real____remdi3 = asm["___remdi3"];
asm["___remdi3"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real____remdi3.apply(null, arguments);
});
var real____udivdi3 = asm["___udivdi3"];
asm["___udivdi3"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real____udivdi3.apply(null, arguments);
});
var real____uremdi3 = asm["___uremdi3"];
asm["___uremdi3"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real____uremdi3.apply(null, arguments);
});
var real___coldbrew_yield_to_javascript = asm["__coldbrew_yield_to_javascript"];
asm["__coldbrew_yield_to_javascript"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real___coldbrew_yield_to_javascript.apply(null, arguments);
});
var real___get_daylight = asm["__get_daylight"];
asm["__get_daylight"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real___get_daylight.apply(null, arguments);
});
var real___get_environ = asm["__get_environ"];
asm["__get_environ"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real___get_environ.apply(null, arguments);
});
var real___get_timezone = asm["__get_timezone"];
asm["__get_timezone"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real___get_timezone.apply(null, arguments);
});
var real___get_tzname = asm["__get_tzname"];
asm["__get_tzname"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real___get_tzname.apply(null, arguments);
});
var real__bitshift64Ashr = asm["_bitshift64Ashr"];
asm["_bitshift64Ashr"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__bitshift64Ashr.apply(null, arguments);
});
var real__bitshift64Lshr = asm["_bitshift64Lshr"];
asm["_bitshift64Lshr"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__bitshift64Lshr.apply(null, arguments);
});
var real__bitshift64Shl = asm["_bitshift64Shl"];
asm["_bitshift64Shl"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__bitshift64Shl.apply(null, arguments);
});
var real__export__runFile = asm["_export__runFile"];
asm["_export__runFile"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__export__runFile.apply(null, arguments);
});
var real__export__runFileAsync = asm["_export__runFileAsync"];
asm["_export__runFileAsync"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__export__runFileAsync.apply(null, arguments);
});
var real__export_chdir = asm["_export_chdir"];
asm["_export_chdir"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__export_chdir.apply(null, arguments);
});
var real__export_getAsyncYieldRate = asm["_export_getAsyncYieldRate"];
asm["_export_getAsyncYieldRate"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__export_getAsyncYieldRate.apply(null, arguments);
});
var real__export_reset = asm["_export_reset"];
asm["_export_reset"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__export_reset.apply(null, arguments);
});
var real__export_run = asm["_export_run"];
asm["_export_run"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__export_run.apply(null, arguments);
});
var real__export_runAsync = asm["_export_runAsync"];
asm["_export_runAsync"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__export_runAsync.apply(null, arguments);
});
var real__export_setAsyncYieldRate = asm["_export_setAsyncYieldRate"];
asm["_export_setAsyncYieldRate"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__export_setAsyncYieldRate.apply(null, arguments);
});
var real__export_setenv = asm["_export_setenv"];
asm["_export_setenv"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__export_setenv.apply(null, arguments);
});
var real__export_unsetenv = asm["_export_unsetenv"];
asm["_export_unsetenv"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__export_unsetenv.apply(null, arguments);
});
var real__fflush = asm["_fflush"];
asm["_fflush"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__fflush.apply(null, arguments);
});
var real__free = asm["_free"];
asm["_free"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__free.apply(null, arguments);
});
var real__i64Add = asm["_i64Add"];
asm["_i64Add"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__i64Add.apply(null, arguments);
});
var real__i64Subtract = asm["_i64Subtract"];
asm["_i64Subtract"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__i64Subtract.apply(null, arguments);
});
var real__llvm_bswap_i16 = asm["_llvm_bswap_i16"];
asm["_llvm_bswap_i16"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__llvm_bswap_i16.apply(null, arguments);
});
var real__llvm_bswap_i32 = asm["_llvm_bswap_i32"];
asm["_llvm_bswap_i32"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__llvm_bswap_i32.apply(null, arguments);
});
var real__llvm_round_f64 = asm["_llvm_round_f64"];
asm["_llvm_round_f64"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__llvm_round_f64.apply(null, arguments);
});
var real__main = asm["_main"];
asm["_main"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__main.apply(null, arguments);
});
var real__malloc = asm["_malloc"];
asm["_malloc"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__malloc.apply(null, arguments);
});
var real__memalign = asm["_memalign"];
asm["_memalign"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__memalign.apply(null, arguments);
});
var real__memmove = asm["_memmove"];
asm["_memmove"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__memmove.apply(null, arguments);
});
var real__pthread_mutex_lock = asm["_pthread_mutex_lock"];
asm["_pthread_mutex_lock"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__pthread_mutex_lock.apply(null, arguments);
});
var real__pthread_mutex_trylock = asm["_pthread_mutex_trylock"];
asm["_pthread_mutex_trylock"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__pthread_mutex_trylock.apply(null, arguments);
});
var real__pthread_mutex_unlock = asm["_pthread_mutex_unlock"];
asm["_pthread_mutex_unlock"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__pthread_mutex_unlock.apply(null, arguments);
});
var real__sbrk = asm["_sbrk"];
asm["_sbrk"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__sbrk.apply(null, arguments);
});
var real_emtStackRestore = asm["emtStackRestore"];
asm["emtStackRestore"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_emtStackRestore.apply(null, arguments);
});
var real_emtStackSave = asm["emtStackSave"];
asm["emtStackSave"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_emtStackSave.apply(null, arguments);
});
var real_emterpret = asm["emterpret"];
asm["emterpret"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_emterpret.apply(null, arguments);
});
var real_establishStackSpace = asm["establishStackSpace"];
asm["establishStackSpace"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_establishStackSpace.apply(null, arguments);
});
var real_getEmtStackMax = asm["getEmtStackMax"];
asm["getEmtStackMax"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_getEmtStackMax.apply(null, arguments);
});
var real_setAsyncState = asm["setAsyncState"];
asm["setAsyncState"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_setAsyncState.apply(null, arguments);
});
var real_setEmtStackMax = asm["setEmtStackMax"];
asm["setEmtStackMax"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_setEmtStackMax.apply(null, arguments);
});
var real_setThrew = asm["setThrew"];
asm["setThrew"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_setThrew.apply(null, arguments);
});
var real_stackAlloc = asm["stackAlloc"];
asm["stackAlloc"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_stackAlloc.apply(null, arguments);
});
var real_stackRestore = asm["stackRestore"];
asm["stackRestore"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_stackRestore.apply(null, arguments);
});
var real_stackSave = asm["stackSave"];
asm["stackSave"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_stackSave.apply(null, arguments);
});
Module["asm"] = asm;
var ___divdi3 = Module["___divdi3"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Pc"].apply(null, arguments);
});
var ___emscripten_environ_constructor = Module["___emscripten_environ_constructor"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Qc"].apply(null, arguments);
});
var ___errno_location = Module["___errno_location"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Rc"].apply(null, arguments);
});
var ___muldi3 = Module["___muldi3"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Sc"].apply(null, arguments);
});
var ___remdi3 = Module["___remdi3"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Tc"].apply(null, arguments);
});
var ___udivdi3 = Module["___udivdi3"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Uc"].apply(null, arguments);
});
var ___uremdi3 = Module["___uremdi3"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Vc"].apply(null, arguments);
});
var __coldbrew_yield_to_javascript = Module["__coldbrew_yield_to_javascript"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Wc"].apply(null, arguments);
});
var __get_daylight = Module["__get_daylight"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Xc"].apply(null, arguments);
});
var __get_environ = Module["__get_environ"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Yc"].apply(null, arguments);
});
var __get_timezone = Module["__get_timezone"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Zc"].apply(null, arguments);
});
var __get_tzname = Module["__get_tzname"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["_c"].apply(null, arguments);
});
var _bitshift64Ashr = Module["_bitshift64Ashr"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["$c"].apply(null, arguments);
});
var _bitshift64Lshr = Module["_bitshift64Lshr"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["ad"].apply(null, arguments);
});
var _bitshift64Shl = Module["_bitshift64Shl"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["bd"].apply(null, arguments);
});
var _export__runFile = Module["_export__runFile"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["cd"].apply(null, arguments);
});
var _export__runFileAsync = Module["_export__runFileAsync"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["dd"].apply(null, arguments);
});
var _export_chdir = Module["_export_chdir"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["ed"].apply(null, arguments);
});
var _export_getAsyncYieldRate = Module["_export_getAsyncYieldRate"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["fd"].apply(null, arguments);
});
var _export_reset = Module["_export_reset"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["gd"].apply(null, arguments);
});
var _export_run = Module["_export_run"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["hd"].apply(null, arguments);
});
var _export_runAsync = Module["_export_runAsync"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["id"].apply(null, arguments);
});
var _export_setAsyncYieldRate = Module["_export_setAsyncYieldRate"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["jd"].apply(null, arguments);
});
var _export_setenv = Module["_export_setenv"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["kd"].apply(null, arguments);
});
var _export_unsetenv = Module["_export_unsetenv"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["ld"].apply(null, arguments);
});
var _fflush = Module["_fflush"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["md"].apply(null, arguments);
});
var _free = Module["_free"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["nd"].apply(null, arguments);
});
var _i64Add = Module["_i64Add"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["od"].apply(null, arguments);
});
var _i64Subtract = Module["_i64Subtract"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["pd"].apply(null, arguments);
});
var _llvm_bswap_i16 = Module["_llvm_bswap_i16"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["qd"].apply(null, arguments);
});
var _llvm_bswap_i32 = Module["_llvm_bswap_i32"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["rd"].apply(null, arguments);
});
var _llvm_round_f64 = Module["_llvm_round_f64"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["sd"].apply(null, arguments);
});
var _main = Module["_main"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["td"].apply(null, arguments);
});
var _malloc = Module["_malloc"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["ud"].apply(null, arguments);
});
var _memalign = Module["_memalign"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["vd"].apply(null, arguments);
});
var _memmove = Module["_memmove"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["wd"].apply(null, arguments);
});
var _memset = Module["_memset"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["xd"].apply(null, arguments);
});
var _pthread_mutex_lock = Module["_pthread_mutex_lock"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["yd"].apply(null, arguments);
});
var _pthread_mutex_trylock = Module["_pthread_mutex_trylock"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["zd"].apply(null, arguments);
});
var _pthread_mutex_unlock = Module["_pthread_mutex_unlock"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Ad"].apply(null, arguments);
});
var _sbrk = Module["_sbrk"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Bd"].apply(null, arguments);
});
var emtStackRestore = Module["emtStackRestore"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Cd"].apply(null, arguments);
});
var emtStackSave = Module["emtStackSave"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Dd"].apply(null, arguments);
});
var emterpret = Module["emterpret"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Ed"].apply(null, arguments);
});
var establishStackSpace = Module["establishStackSpace"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Fd"].apply(null, arguments);
});
var getEmtStackMax = Module["getEmtStackMax"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Gd"].apply(null, arguments);
});
var setAsyncState = Module["setAsyncState"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Hd"].apply(null, arguments);
});
var setEmtStackMax = Module["setEmtStackMax"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Id"].apply(null, arguments);
});
var setThrew = Module["setThrew"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Jd"].apply(null, arguments);
});
var stackAlloc = Module["stackAlloc"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Kd"].apply(null, arguments);
});
var stackRestore = Module["stackRestore"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Ld"].apply(null, arguments);
});
var stackSave = Module["stackSave"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Md"].apply(null, arguments);
});
Module["dynCall_X"] = dynCall_X;
Module["dynCall_dd"] = dynCall_dd;
Module["dynCall_ddd"] = dynCall_ddd;
Module["dynCall_i"] = dynCall_i;
Module["dynCall_ii"] = dynCall_ii;
Module["dynCall_iii"] = dynCall_iii;
Module["dynCall_iiii"] = dynCall_iiii;
Module["dynCall_iiiii"] = dynCall_iiiii;
Module["dynCall_iiiiii"] = dynCall_iiiiii;
Module["dynCall_iiiiiii"] = dynCall_iiiiiii;
Module["dynCall_iiiiiiiiii"] = dynCall_iiiiiiiiii;
Module["dynCall_v"] = dynCall_v;
Module["dynCall_vi"] = dynCall_vi;
Module["dynCall_vii"] = dynCall_vii;
Module["dynCall_viii"] = dynCall_viii;
Module["dynCall_viiii"] = dynCall_viiii;
Module["dynCall_viiiii"] = dynCall_viiiii;
Module["dynCall_viiiiii"] = dynCall_viiiiii;
Module["asm"] = asm;
if (!Module["intArrayFromString"]) Module["intArrayFromString"] = (function() {
 abort("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["intArrayToString"]) Module["intArrayToString"] = (function() {
 abort("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Module["ccall"] = ccall;
Module["cwrap"] = cwrap;
if (!Module["setValue"]) Module["setValue"] = (function() {
 abort("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["getValue"]) Module["getValue"] = (function() {
 abort("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["allocate"]) Module["allocate"] = (function() {
 abort("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Module["getMemory"] = getMemory;
if (!Module["Pointer_stringify"]) Module["Pointer_stringify"] = (function() {
 abort("'Pointer_stringify' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["AsciiToString"]) Module["AsciiToString"] = (function() {
 abort("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["stringToAscii"]) Module["stringToAscii"] = (function() {
 abort("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["UTF8ArrayToString"]) Module["UTF8ArrayToString"] = (function() {
 abort("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["UTF8ToString"]) Module["UTF8ToString"] = (function() {
 abort("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["stringToUTF8Array"]) Module["stringToUTF8Array"] = (function() {
 abort("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["stringToUTF8"]) Module["stringToUTF8"] = (function() {
 abort("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["lengthBytesUTF8"]) Module["lengthBytesUTF8"] = (function() {
 abort("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["UTF16ToString"]) Module["UTF16ToString"] = (function() {
 abort("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["stringToUTF16"]) Module["stringToUTF16"] = (function() {
 abort("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["lengthBytesUTF16"]) Module["lengthBytesUTF16"] = (function() {
 abort("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["UTF32ToString"]) Module["UTF32ToString"] = (function() {
 abort("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["stringToUTF32"]) Module["stringToUTF32"] = (function() {
 abort("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["lengthBytesUTF32"]) Module["lengthBytesUTF32"] = (function() {
 abort("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["allocateUTF8"]) Module["allocateUTF8"] = (function() {
 abort("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["stackTrace"]) Module["stackTrace"] = (function() {
 abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["addOnPreRun"]) Module["addOnPreRun"] = (function() {
 abort("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["addOnInit"]) Module["addOnInit"] = (function() {
 abort("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["addOnPreMain"]) Module["addOnPreMain"] = (function() {
 abort("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["addOnExit"]) Module["addOnExit"] = (function() {
 abort("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["addOnPostRun"]) Module["addOnPostRun"] = (function() {
 abort("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["writeStringToMemory"]) Module["writeStringToMemory"] = (function() {
 abort("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["writeArrayToMemory"]) Module["writeArrayToMemory"] = (function() {
 abort("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["writeAsciiToMemory"]) Module["writeAsciiToMemory"] = (function() {
 abort("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
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
if (!Module["GL"]) Module["GL"] = (function() {
 abort("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["dynamicAlloc"]) Module["dynamicAlloc"] = (function() {
 abort("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["warnOnce"]) Module["warnOnce"] = (function() {
 abort("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["loadDynamicLibrary"]) Module["loadDynamicLibrary"] = (function() {
 abort("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["loadWebAssemblyModule"]) Module["loadWebAssemblyModule"] = (function() {
 abort("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["getLEB"]) Module["getLEB"] = (function() {
 abort("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["getFunctionTables"]) Module["getFunctionTables"] = (function() {
 abort("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["alignFunctionTables"]) Module["alignFunctionTables"] = (function() {
 abort("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["registerFunctions"]) Module["registerFunctions"] = (function() {
 abort("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["addFunction"]) Module["addFunction"] = (function() {
 abort("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["removeFunction"]) Module["removeFunction"] = (function() {
 abort("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["getFuncWrapper"]) Module["getFuncWrapper"] = (function() {
 abort("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["prettyPrint"]) Module["prettyPrint"] = (function() {
 abort("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["makeBigInt"]) Module["makeBigInt"] = (function() {
 abort("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["dynCall"]) Module["dynCall"] = (function() {
 abort("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["getCompilerSetting"]) Module["getCompilerSetting"] = (function() {
 abort("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["stackSave"]) Module["stackSave"] = (function() {
 abort("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["stackRestore"]) Module["stackRestore"] = (function() {
 abort("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["stackAlloc"]) Module["stackAlloc"] = (function() {
 abort("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["establishStackSpace"]) Module["establishStackSpace"] = (function() {
 abort("'establishStackSpace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["print"]) Module["print"] = (function() {
 abort("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["printErr"]) Module["printErr"] = (function() {
 abort("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["getTempRet0"]) Module["getTempRet0"] = (function() {
 abort("'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["setTempRet0"]) Module["setTempRet0"] = (function() {
 abort("'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Module["ALLOC_NORMAL"]) Object.defineProperty(Module, "ALLOC_NORMAL", {
 get: (function() {
  abort("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
 })
});
if (!Module["ALLOC_STACK"]) Object.defineProperty(Module, "ALLOC_STACK", {
 get: (function() {
  abort("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
 })
});
if (!Module["ALLOC_DYNAMIC"]) Object.defineProperty(Module, "ALLOC_DYNAMIC", {
 get: (function() {
  abort("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
 })
});
if (!Module["ALLOC_NONE"]) Object.defineProperty(Module, "ALLOC_NONE", {
 get: (function() {
  abort("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
 })
});
Module["then"] = (function(func) {
 if (Module["calledRun"]) {
  func(Module);
 } else {
  var old = Module["onRuntimeInitialized"];
  Module["onRuntimeInitialized"] = (function() {
   if (old) old();
   func(Module);
  });
 }
 return Module;
});
function ExitStatus(status) {
 this.name = "ExitStatus";
 this.message = "Program terminated with exit(" + status + ")";
 this.status = status;
}
ExitStatus.prototype = new Error;
ExitStatus.prototype.constructor = ExitStatus;
var calledMain = false;
dependenciesFulfilled = function runCaller() {
 if (!Module["calledRun"]) run();
 if (!Module["calledRun"]) dependenciesFulfilled = runCaller;
};
Module["callMain"] = function callMain(args) {
 assert(runDependencies == 0, "cannot call main when async dependencies remain! (listen on __ATMAIN__)");
 assert(__ATPRERUN__.length == 0, "cannot call main when preRun functions remain to be called");
 args = args || [];
 ensureInitRuntime();
 var argc = args.length + 1;
 var argv = stackAlloc((argc + 1) * 4);
 HEAP32[argv >> 2] = allocateUTF8OnStack(Module["thisProgram"]);
 for (var i = 1; i < argc; i++) {
  HEAP32[(argv >> 2) + i] = allocateUTF8OnStack(args[i - 1]);
 }
 HEAP32[(argv >> 2) + argc] = 0;
 var initialEmtStackTop = Module["emtStackSave"]();
 try {
  var ret = Module["_main"](argc, argv, 0);
  if (typeof EmterpreterAsync === "object" && EmterpreterAsync.state !== 1) {
   exit(ret, true);
  }
 } catch (e) {
  if (e instanceof ExitStatus) {
   return;
  } else if (e == "SimulateInfiniteLoop") {
   Module["noExitRuntime"] = true;
   Module["emtStackRestore"](initialEmtStackTop);
   return;
  } else {
   var toLog = e;
   if (e && typeof e === "object" && e.stack) {
    toLog = [ e, e.stack ];
   }
   err("exception thrown: " + toLog);
   Module["quit"](1, e);
  }
 } finally {
  calledMain = true;
 }
};
function run(args) {
 args = args || Module["arguments"];
 if (runDependencies > 0) {
  return;
 }
 writeStackCookie();
 preRun();
 if (runDependencies > 0) return;
 if (Module["calledRun"]) return;
 function doRun() {
  if (Module["calledRun"]) return;
  Module["calledRun"] = true;
  if (ABORT) return;
  ensureInitRuntime();
  preMain();
  if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
  if (Module["_main"] && shouldRunNow) Module["callMain"](args);
  postRun();
 }
 if (Module["setStatus"]) {
  Module["setStatus"]("Running...");
  setTimeout((function() {
   setTimeout((function() {
    Module["setStatus"]("");
   }), 1);
   doRun();
  }), 1);
 } else {
  doRun();
 }
 checkStackCookie();
}
Module["run"] = run;
function checkUnflushedContent() {
 var print = out;
 var printErr = err;
 var has = false;
 out = err = (function(x) {
  has = true;
 });
 try {
  var flush = Module["_fflush"];
  if (flush) flush(0);
  var hasFS = true;
  if (hasFS) {
   [ "stdout", "stderr" ].forEach((function(name) {
    var info = FS.analyzePath("/dev/" + name);
    if (!info) return;
    var stream = info.object;
    var rdev = stream.rdev;
    var tty = TTY.ttys[rdev];
    if (tty && tty.output && tty.output.length) {
     has = true;
    }
   }));
  }
 } catch (e) {}
 out = print;
 err = printErr;
 if (has) {
  warnOnce("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc.");
 }
}
function exit(status, implicit) {
 checkUnflushedContent();
 if (implicit && Module["noExitRuntime"] && status === 0) {
  return;
 }
 if (Module["noExitRuntime"]) {
  if (!implicit) {
   err("exit(" + status + ") called, but EXIT_RUNTIME is not set, so halting execution but not exiting the runtime or preventing further async execution (build with EXIT_RUNTIME=1, if you want a true shutdown)");
  }
 } else {
  ABORT = true;
  EXITSTATUS = status;
  exitRuntime();
  if (Module["onExit"]) Module["onExit"](status);
 }
 Module["quit"](status, new ExitStatus(status));
}
var abortDecorators = [];
function abort(what) {
 if (Module["onAbort"]) {
  Module["onAbort"](what);
 }
 if (what !== undefined) {
  out(what);
  err(what);
  what = JSON.stringify(what);
 } else {
  what = "";
 }
 ABORT = true;
 EXITSTATUS = 1;
 var extra = "";
 var output = "abort(" + what + ") at " + stackTrace() + extra;
 if (abortDecorators) {
  abortDecorators.forEach((function(decorator) {
   output = decorator(output, what);
  }));
 }
 throw output;
}
Module["abort"] = abort;
if (Module["preInit"]) {
 if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
 while (Module["preInit"].length > 0) {
  Module["preInit"].pop()();
 }
}
var shouldRunNow = true;
if (Module["noInitialRun"]) {
 shouldRunNow = false;
}
Module["noExitRuntime"] = true;
run();





  return _Coldbrew_coldbrew_internal_;
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
      module.exports = _Coldbrew_coldbrew_internal_;
    else if (typeof define === 'function' && define['amd'])
      define([], function() { return _Coldbrew_coldbrew_internal_; });
    else if (typeof exports === 'object')
      exports["_Coldbrew_coldbrew_internal_"] = _Coldbrew_coldbrew_internal_;
    
(function() {

class JavaScriptError extends Error {
  constructor(...args) {
    super(...args)
    Error.captureStackTrace(this, JavaScriptError);
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

const parseUrl = (string, prop) =>  {
  const a = document.createElement('a'); 
  a.setAttribute('href', string);
  const {host, hostname, pathname, port, protocol, search, hash} = a;
  const origin = `${protocol}//${hostname}${port.length ? `:${port}`:''}`;
  return prop ? eval(prop) : {origin, host, hostname, pathname, port, protocol, search, hash}
}

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

function sendRequest(method, url, body, headers, timeout, binary = false) {
  return new Promise(function (resolve, reject) {
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
      console.log(this);
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
        headers: this.getAllResponseHeaders(),
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
        headers: this.getAllResponseHeaders(),
      }
      reject(e);
    };
    request.send(body);
  });
}

var global = (typeof window === 'object') ? window : global;
global._coldbrew_internal_global = global;

global._Coldbrew_coldbrew_internal_instance = (function() {
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

global._Coldbrew_coldbrew_internal_fs_configure = (function() {
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

var Coldbrew = {
  _convertError: function (e) {
    return {
      '_internal_coldbrew_error': true,
      'type': e.constructor.name,
      'name': e.name,
      'message': e.message,
      'stack': e.stack,
      'data': (typeof e.errorData !== 'undefined') ? e.errorData : null,
    };
  },
  _try: function(func) {
    try {
      return func();
    } catch (e) {
      return Coldbrew._convertError(e);
    }
  },
  _parseUrl: parseUrl,
  loaded: false,
  exited: false,
  forwardOut: true,
  forwardErr: true,
  _queuedOnReady: [],
  standardInBuffer: 'This is the first line of standard input.\nTo override this, either set `Coldbrew.standardInBuffer` to the full standard input OR set `Coldbrew.onStandardInRead(int size)` to respond interactively to standard input reads OR set `Coldbrew.onStandardInReadAsync(int size)` to respond interactively and asynchronously (by returning a Promise).',
  _standardInTell: 0,
  _resumeWarn: function(warn=true) { if (warn) { return Coldbrew.run('Coldbrew._warn("The Coldbrew Python interpreter is not currently sleeping. Resuming has no effect.")'); } else return 0; },
  resume: function(...args) { return Coldbrew._resumeWarn(...args); },
  _mountFS: function(Module) {},
  preInit: function(Module) {},
  preRun: function(Module) {},
  onStandardOut: function(text) { console.log(text); },
  onStandardErr: function(text) { console.warn(text); },
  onStandardInRead: function(size) { 
    var read = Coldbrew.standardInBuffer.substring(Coldbrew._standardInTell, Coldbrew._standardInTell+size);
    Coldbrew._standardInTell += size;
    return read;
  },
  onStandardInReadAsync: function(size) { 
    return Promise.resolve(Coldbrew.onStandardInRead(size));
  },
  _onRuntimeInitialized: function(Module) {
    Module.callMain();
    Coldbrew._ORIGINAL_ENV_ = Object.assign({}, Module.ENV);
    var oldLoaded = Coldbrew.loaded;
    Coldbrew.loaded = true;
    if (!oldLoaded) {
      Coldbrew._queuedOnReady.forEach(function(onReady) {
        onReady(null, Coldbrew);
      });
      Coldbrew._queuedOnReady = [];
    }
  },
  _fsReady: function(cb) {
    // If the user already called configure FS, these "false, false, {}" parameters
    // will get ignored, if the user hasn't, "false, false, {}" will be used, but will
    // have no effect.
    global._Coldbrew_coldbrew_internal_fs_configure(false, false, false, false, {}, function(err, mountPoints) {
      Coldbrew._mountFS = function(Module) {
        var prefix = '.filesystem';
        Module.FS.createFolder(Module.FS.root, prefix, true, true);
        Object.keys(mountPoints).forEach(function(mountPoint) {
          var fsNamespace = 'coldbrew_fs_';
          var isShared = mountPoints[mountPoint] & 1;
          var isPersist = mountPoints[mountPoint] & 2;
          var filesystem = Module.FS.filesystems.MEMFS;
          if (!isShared) {
            fsNamespace += 'Coldbrew_';
          }
          if (isPersist) {
            filesystem = Module.FS.filesystems.IDBFS;
          }
          try {
            Module.FS.rmdir(mountPoint+'/web_user');
          } catch (e) {};
          try {
            Module.FS.rmdir(mountPoint);
          } catch (e) {};
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
          } else if (false) {
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
    global._Coldbrew_coldbrew_internal_fs_configure(
      finalizedOptions.sharedHome,
      finalizedOptions.sharedTmp,
      finalizedOptions.persistHome,
      finalizedOptions.persistTmp,
      finalizedOptions.browserFSOptions,
      cb
    );
  },
  load: function(arg1, arg2) {
    if (window.location.protocol === 'file:') {
      throw new Error("You are trying to run this HTML file under a `file://` URL. This is not supported. You must run this file under a HTTP server under a `http://` or `https://` protocol. On most computers, you can do this by opening terminal, navigating to where this HTML file is, and running either `python -m SimpleHTTPServer` for Python 2 or `python3 -m http.server` for Python 3. Then, you can navigate to `http://localhost:8000` in a web browser to see this file. Alternatively, if you have downloaded the Coldbrew source code, you can just run `./serve.sh` from the project root and navigate to `http://localhost:8000` in a web browser to see this file after building.");
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
    var defaultOptions = {
      fsOptions: {},
      hideWarnings: false,
      monitorFileUsage: false,
    };
    var finalizedOptions = Object.assign({}, defaultOptions, options);
    if (finalizedOptions.fsOptions) {
      Coldbrew.configureFS(finalizedOptions.fsOptions);
    }
    Coldbrew._emterpreterFile.then(function(emterpreterFileResponse) {
      Coldbrew._emterpreterFileResponse = emterpreterFileResponse;
      Coldbrew._fsReady(function(err, mountPoints) {
        Coldbrew._slots = {};
        Coldbrew._textDecoder = new TextDecoder("utf-8");
        Coldbrew._usedFiles = new Set();
        Coldbrew.mountPoints = mountPoints;
        Coldbrew.Module = global._Coldbrew_coldbrew_internal_instance();
        Coldbrew.pyversion =  "3.5.2";
        Coldbrew.version =  "0.0.23";
        Coldbrew.getAsyncYieldRate = Coldbrew.Module.cwrap('export_getAsyncYieldRate', 'number', []);
        Coldbrew.setAsyncYieldRate = Coldbrew.Module.cwrap('export_setAsyncYieldRate', null, ['number']);
        Coldbrew.run = Coldbrew.Module.cwrap('export_run', 'number', ['string']);
        if (!false) {
          Coldbrew.runAsync = Coldbrew.Module.cwrap('export_runAsync', 'number', ['string'], {
            async: true,
          });
        }
        Coldbrew._runFile = Coldbrew.Module.cwrap('export__runFile', 'number', ['string']);
        if (!false) {
          Coldbrew._runFileAsync = Coldbrew.Module.cwrap('export__runFileAsync', 'number', ['string'], {
            async: true,
          });
        }
        Coldbrew.getVariable = function(expression) {
          var uid = randid();
          Coldbrew.run('Coldbrew.run("_coldbrew_internal_global.Coldbrew._slots.'+uid+' = "+Coldbrew.json.dumps(Coldbrew.json.dumps('+expression+')))');
          var rval = (typeof Coldbrew._slots[uid] !== 'undefined') ? JSON.parse(Coldbrew._slots[uid]) : null;
          delete Coldbrew._slots[uid];
          return rval;
        };
        if (!false) {
          Coldbrew.getVariableAsync = function(expression) {
            var uid = randid();
            return Coldbrew.runAsync('Coldbrew.run("_coldbrew_internal_global.Coldbrew._slots.'+uid+' = "+Coldbrew.json.dumps(Coldbrew.json.dumps('+expression+')))').then(function() {
              var rval = (typeof Coldbrew._slots[uid] !== 'undefined') ? JSON.parse(Coldbrew._slots[uid]) : null;
              delete Coldbrew._slots[uid];
              return rval;
            });
          };
        }
        Coldbrew.getExceptionInfo = function() {
          return Coldbrew.getVariable('Coldbrew._exception');
        };
        Coldbrew.runFunction = function(functionExpression, ...args) {
          return Coldbrew.getVariable(functionExpression+'('+args.map(arg => JSON.stringify(arg)).join(',')+')');
        };
        if (!false) {
          Coldbrew.runFunctionAsync = function(functionExpression, ...args) {
            return Coldbrew.getVariableAsync(functionExpression+'('+args.map(arg => JSON.stringify(arg)).join(',')+')');
          };
        }
        Coldbrew.getenv = function() { return Coldbrew.Module.ENV };
        Coldbrew.setenv = Coldbrew.Module.cwrap('export_setenv', 'number', ['string', 'string']);
        Coldbrew.unsetenv = Coldbrew.Module.cwrap('export_unsetenv', 'number', ['string']);
        Coldbrew.getcwd = Coldbrew.runFunction.bind(Coldbrew, 'Coldbrew._getcwd');
        Coldbrew.chdir = Coldbrew.Module.cwrap('export_chdir', 'number', ['string']);
        Coldbrew.listFiles = function(path='/') {
          return Coldbrew.Module.FS.readdir(path)
            .filter(function(file) {
              return file !== '.' && file !== '..';
            })
            .map(function (file) {
              var analyzed = Coldbrew.Module.FS.analyzePath(path+'/'+file);
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
          return Coldbrew.Module.FS.mkdirTree(path);
        };
        Coldbrew.addFile = function(path, data) {
          if (path.indexOf('/') >= 0) {
            Coldbrew.Module.FS.mkdirTree(path.split('/').slice(0,-1).join("/"));
          }
          Coldbrew.Module.FS.writeFile(path, data);
        };
        if (true) {
          Coldbrew.addFilesFromZip = function(path, urlToZip) {
            return new JSZip.external.Promise(function (resolve, reject) {
              JSZipUtils.getBinaryContent(urlToZip, function(err, data) {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(data);
                  }
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
                  return Promise.resolve(undefined);
                }
              }));
            });
          };
        }
        Coldbrew.readFile = function(path) {
          return Coldbrew._textDecoder.decode(Coldbrew.Module.FS.readFile(path));
        };
        Coldbrew.readBinaryFile = function(path) {
          return Coldbrew.Module.FS.readFile(path);
        };
        Coldbrew.pathExists = function(path) {
          var analyzed = Coldbrew.Module.FS.analyzePath(path);
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
            if (Coldbrew.Module.FS.analyzePath(path).object 
              && Coldbrew.Module.FS.analyzePath(path).object.isFolder) {
              var fileList = Coldbrew.listFiles(path);
              if (fileList.length > 0) {
                fileList.forEach(function (file) {
                  deleteHelper(path+'/'+file.name);
                });
              }
              Coldbrew.Module.FS.rmdir(path);
            } else {
              Coldbrew.Module.FS.unlink(path);
            }
          };
          if (path.length > 0 && path.slice(-1) === '/') {
            path = path.slice(0, -1);
          }
          deleteHelper(path);
          return true;
        };
        Coldbrew.saveFiles = function() {
          var isPersistable = Object.keys(mountPoints).map(function(mountPoint) {
            var isPersist = mountPoints[mountPoint] & 2;
            return !!isPersist;
          }).includes(true);
          return new Promise(function (resolve, reject) {
            if (isPersistable) {
              return Coldbrew.Module.FS.syncfs(0, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
              });
            } else {
              reject(new Error("The file system was not configured to persist any paths."));
            }
          });
        };
        Coldbrew.loadFiles = function() {
          var isPersistable = Object.keys(mountPoints).map(function(mountPoint) {
            var isPersist = mountPoints[mountPoint] & 2;
            return !!isPersist;
          }).includes(true);
          return new Promise(function (resolve, reject) {
            if (isPersistable) {
              return Coldbrew.Module.FS.syncfs(1, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
              });
            } else {
              reject(new Error("The file system was not configured to persist any paths."));
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
              Coldbrew.chdir(oldcwd);
              return ret;
            });
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
          Coldbrew.run('Coldbrew._clear_argv()');
          Coldbrew.runFunction('Coldbrew._append_argv', 'coldbrew.py');
          if (finalizedOptions.hideWarnings) {
            Coldbrew.setenv("COLDBREW_WARNINGS", Number(!finalizedOptions.hideWarnings).toString());
          }
        };
        Coldbrew._reset = Coldbrew.Module.cwrap('export_reset', null, []);
        Coldbrew.reset = function() {
          Coldbrew._standardInTell = 0;
          var ret = Coldbrew._reset();
          Coldbrew._initializer();
          return ret;
        };
        if (finalizedOptions.monitorFileUsage) {
          console.warn('Coldbrew is monitoring file usage...use `Coldbrew.getUsedFiles()` after running through all relevant code paths in your Python program.');
          var _oldOpen = Coldbrew.Module.FS.open.bind(Coldbrew.Module.FS);
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
        Coldbrew.onReady(function() {
          Coldbrew._initializer();
        });
        Coldbrew.onReady(onReadyFunc);
      });
    });
  },
  onReady: function(onReadyFunc) {
    if (onReadyFunc) {
      if (Coldbrew.loaded) {
        onReadyFunc(null, Coldbrew);
      } else {
        Coldbrew._queuedOnReady.push(onReadyFunc);
      }
    }
  },
  _sendRequest: sendRequest,
  _emterpreterFile: (!false) ? sendRequest('GET', parseUrl(document.currentScript.src, "origin")+parseUrl(document.currentScript.src, "pathname").split("/").slice(0, -1).join("/")+'/coldbrew.asm.embin', null, {}, true, true) : Promise.resolve(null),
};

if (typeof module !== 'undefined') module.exports = Coldbrew;
if (typeof define === 'function') define(Coldbrew);
if (typeof window === 'object') window.Coldbrew = Coldbrew;
global.Coldbrew = Coldbrew;

})();
/*!

JSZip v3.1.5 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.JSZip=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";var d=a("./utils"),e=a("./support"),f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";c.encode=function(a){for(var b,c,e,g,h,i,j,k=[],l=0,m=a.length,n=m,o="string"!==d.getTypeOf(a);l<a.length;)n=m-l,o?(b=a[l++],c=l<m?a[l++]:0,e=l<m?a[l++]:0):(b=a.charCodeAt(l++),c=l<m?a.charCodeAt(l++):0,e=l<m?a.charCodeAt(l++):0),g=b>>2,h=(3&b)<<4|c>>4,i=n>1?(15&c)<<2|e>>6:64,j=n>2?63&e:64,k.push(f.charAt(g)+f.charAt(h)+f.charAt(i)+f.charAt(j));return k.join("")},c.decode=function(a){var b,c,d,g,h,i,j,k=0,l=0,m="data:";if(a.substr(0,m.length)===m)throw new Error("Invalid base64 input, it looks like a data url.");a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");var n=3*a.length/4;if(a.charAt(a.length-1)===f.charAt(64)&&n--,a.charAt(a.length-2)===f.charAt(64)&&n--,n%1!==0)throw new Error("Invalid base64 input, bad content length.");var o;for(o=e.uint8array?new Uint8Array(0|n):new Array(0|n);k<a.length;)g=f.indexOf(a.charAt(k++)),h=f.indexOf(a.charAt(k++)),i=f.indexOf(a.charAt(k++)),j=f.indexOf(a.charAt(k++)),b=g<<2|h>>4,c=(15&h)<<4|i>>2,d=(3&i)<<6|j,o[l++]=b,64!==i&&(o[l++]=c),64!==j&&(o[l++]=d);return o}},{"./support":30,"./utils":32}],2:[function(a,b,c){"use strict";function d(a,b,c,d,e){this.compressedSize=a,this.uncompressedSize=b,this.crc32=c,this.compression=d,this.compressedContent=e}var e=a("./external"),f=a("./stream/DataWorker"),g=a("./stream/DataLengthProbe"),h=a("./stream/Crc32Probe"),g=a("./stream/DataLengthProbe");d.prototype={getContentWorker:function(){var a=new f(e.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new g("data_length")),b=this;return a.on("end",function(){if(this.streamInfo.data_length!==b.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),a},getCompressedWorker:function(){return new f(e.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},d.createWorkerFrom=function(a,b,c){return a.pipe(new h).pipe(new g("uncompressedSize")).pipe(b.compressWorker(c)).pipe(new g("compressedSize")).withStreamInfo("compression",b)},b.exports=d},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(a,b,c){"use strict";var d=a("./stream/GenericWorker");c.STORE={magic:"\0\0",compressWorker:function(a){return new d("STORE compression")},uncompressWorker:function(){return new d("STORE decompression")}},c.DEFLATE=a("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(a,b,c){"use strict";function d(){for(var a,b=[],c=0;c<256;c++){a=c;for(var d=0;d<8;d++)a=1&a?3988292384^a>>>1:a>>>1;b[c]=a}return b}function e(a,b,c,d){var e=h,f=d+c;a^=-1;for(var g=d;g<f;g++)a=a>>>8^e[255&(a^b[g])];return a^-1}function f(a,b,c,d){var e=h,f=d+c;a^=-1;for(var g=d;g<f;g++)a=a>>>8^e[255&(a^b.charCodeAt(g))];return a^-1}var g=a("./utils"),h=d();b.exports=function(a,b){if("undefined"==typeof a||!a.length)return 0;var c="string"!==g.getTypeOf(a);return c?e(0|b,a,a.length,0):f(0|b,a,a.length,0)}},{"./utils":32}],5:[function(a,b,c){"use strict";c.base64=!1,c.binary=!1,c.dir=!1,c.createFolders=!0,c.date=null,c.compression=null,c.compressionOptions=null,c.comment=null,c.unixPermissions=null,c.dosPermissions=null},{}],6:[function(a,b,c){"use strict";var d=null;d="undefined"!=typeof Promise?Promise:a("lie"),b.exports={Promise:d}},{lie:58}],7:[function(a,b,c){"use strict";function d(a,b){h.call(this,"FlateWorker/"+a),this._pako=null,this._pakoAction=a,this._pakoOptions=b,this.meta={}}var e="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,f=a("pako"),g=a("./utils"),h=a("./stream/GenericWorker"),i=e?"uint8array":"array";c.magic="\b\0",g.inherits(d,h),d.prototype.processChunk=function(a){this.meta=a.meta,null===this._pako&&this._createPako(),this._pako.push(g.transformTo(i,a.data),!1)},d.prototype.flush=function(){h.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},d.prototype.cleanUp=function(){h.prototype.cleanUp.call(this),this._pako=null},d.prototype._createPako=function(){this._pako=new f[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var a=this;this._pako.onData=function(b){a.push({data:b,meta:a.meta})}},c.compressWorker=function(a){return new d("Deflate",a)},c.uncompressWorker=function(){return new d("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:59}],8:[function(a,b,c){"use strict";function d(a,b,c,d){f.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=b,this.zipPlatform=c,this.encodeFileName=d,this.streamFiles=a,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}var e=a("../utils"),f=a("../stream/GenericWorker"),g=a("../utf8"),h=a("../crc32"),i=a("../signature"),j=function(a,b){var c,d="";for(c=0;c<b;c++)d+=String.fromCharCode(255&a),a>>>=8;return d},k=function(a,b){var c=a;return a||(c=b?16893:33204),(65535&c)<<16},l=function(a,b){return 63&(a||0)},m=function(a,b,c,d,f,m){var n,o,p=a.file,q=a.compression,r=m!==g.utf8encode,s=e.transformTo("string",m(p.name)),t=e.transformTo("string",g.utf8encode(p.name)),u=p.comment,v=e.transformTo("string",m(u)),w=e.transformTo("string",g.utf8encode(u)),x=t.length!==p.name.length,y=w.length!==u.length,z="",A="",B="",C=p.dir,D=p.date,E={crc32:0,compressedSize:0,uncompressedSize:0};b&&!c||(E.crc32=a.crc32,E.compressedSize=a.compressedSize,E.uncompressedSize=a.uncompressedSize);var F=0;b&&(F|=8),r||!x&&!y||(F|=2048);var G=0,H=0;C&&(G|=16),"UNIX"===f?(H=798,G|=k(p.unixPermissions,C)):(H=20,G|=l(p.dosPermissions,C)),n=D.getUTCHours(),n<<=6,n|=D.getUTCMinutes(),n<<=5,n|=D.getUTCSeconds()/2,o=D.getUTCFullYear()-1980,o<<=4,o|=D.getUTCMonth()+1,o<<=5,o|=D.getUTCDate(),x&&(A=j(1,1)+j(h(s),4)+t,z+="up"+j(A.length,2)+A),y&&(B=j(1,1)+j(h(v),4)+w,z+="uc"+j(B.length,2)+B);var I="";I+="\n\0",I+=j(F,2),I+=q.magic,I+=j(n,2),I+=j(o,2),I+=j(E.crc32,4),I+=j(E.compressedSize,4),I+=j(E.uncompressedSize,4),I+=j(s.length,2),I+=j(z.length,2);var J=i.LOCAL_FILE_HEADER+I+s+z,K=i.CENTRAL_FILE_HEADER+j(H,2)+I+j(v.length,2)+"\0\0\0\0"+j(G,4)+j(d,4)+s+z+v;return{fileRecord:J,dirRecord:K}},n=function(a,b,c,d,f){var g="",h=e.transformTo("string",f(d));return g=i.CENTRAL_DIRECTORY_END+"\0\0\0\0"+j(a,2)+j(a,2)+j(b,4)+j(c,4)+j(h.length,2)+h},o=function(a){var b="";return b=i.DATA_DESCRIPTOR+j(a.crc32,4)+j(a.compressedSize,4)+j(a.uncompressedSize,4)};e.inherits(d,f),d.prototype.push=function(a){var b=a.meta.percent||0,c=this.entriesCount,d=this._sources.length;this.accumulate?this.contentBuffer.push(a):(this.bytesWritten+=a.data.length,f.prototype.push.call(this,{data:a.data,meta:{currentFile:this.currentFile,percent:c?(b+100*(c-d-1))/c:100}}))},d.prototype.openedSource=function(a){this.currentSourceOffset=this.bytesWritten,this.currentFile=a.file.name;var b=this.streamFiles&&!a.file.dir;if(b){var c=m(a,b,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:c.fileRecord,meta:{percent:0}})}else this.accumulate=!0},d.prototype.closedSource=function(a){this.accumulate=!1;var b=this.streamFiles&&!a.file.dir,c=m(a,b,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(c.dirRecord),b)this.push({data:o(a),meta:{percent:100}});else for(this.push({data:c.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},d.prototype.flush=function(){for(var a=this.bytesWritten,b=0;b<this.dirRecords.length;b++)this.push({data:this.dirRecords[b],meta:{percent:100}});var c=this.bytesWritten-a,d=n(this.dirRecords.length,c,a,this.zipComment,this.encodeFileName);this.push({data:d,meta:{percent:100}})},d.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},d.prototype.registerPrevious=function(a){this._sources.push(a);var b=this;return a.on("data",function(a){b.processChunk(a)}),a.on("end",function(){b.closedSource(b.previous.streamInfo),b._sources.length?b.prepareNextSource():b.end()}),a.on("error",function(a){b.error(a)}),this},d.prototype.resume=function(){return!!f.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},d.prototype.error=function(a){var b=this._sources;if(!f.prototype.error.call(this,a))return!1;for(var c=0;c<b.length;c++)try{b[c].error(a)}catch(a){}return!0},d.prototype.lock=function(){f.prototype.lock.call(this);for(var a=this._sources,b=0;b<a.length;b++)a[b].lock()},b.exports=d},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(a,b,c){"use strict";var d=a("../compressions"),e=a("./ZipFileWorker"),f=function(a,b){var c=a||b,e=d[c];if(!e)throw new Error(c+" is not a valid compression method !");return e};c.generateWorker=function(a,b,c){var d=new e(b.streamFiles,c,b.platform,b.encodeFileName),g=0;try{a.forEach(function(a,c){g++;var e=f(c.options.compression,b.compression),h=c.options.compressionOptions||b.compressionOptions||{},i=c.dir,j=c.date;c._compressWorker(e,h).withStreamInfo("file",{name:a,dir:i,date:j,comment:c.comment||"",unixPermissions:c.unixPermissions,dosPermissions:c.dosPermissions}).pipe(d)}),d.entriesCount=g}catch(h){d.error(h)}return d}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(a,b,c){"use strict";function d(){if(!(this instanceof d))return new d;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files={},this.comment=null,this.root="",this.clone=function(){var a=new d;for(var b in this)"function"!=typeof this[b]&&(a[b]=this[b]);return a}}d.prototype=a("./object"),d.prototype.loadAsync=a("./load"),d.support=a("./support"),d.defaults=a("./defaults"),d.version="3.1.5",d.loadAsync=function(a,b){return(new d).loadAsync(a,b)},d.external=a("./external"),b.exports=d},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(a,b,c){"use strict";function d(a){return new f.Promise(function(b,c){var d=a.decompressed.getContentWorker().pipe(new i);d.on("error",function(a){c(a)}).on("end",function(){d.streamInfo.crc32!==a.decompressed.crc32?c(new Error("Corrupted zip : CRC32 mismatch")):b()}).resume()})}var e=a("./utils"),f=a("./external"),g=a("./utf8"),e=a("./utils"),h=a("./zipEntries"),i=a("./stream/Crc32Probe"),j=a("./nodejsUtils");b.exports=function(a,b){var c=this;return b=e.extend(b||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:g.utf8decode}),j.isNode&&j.isStream(a)?f.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):e.prepareContent("the loaded zip file",a,!0,b.optimizedBinaryString,b.base64).then(function(a){var c=new h(b);return c.load(a),c}).then(function(a){var c=[f.Promise.resolve(a)],e=a.files;if(b.checkCRC32)for(var g=0;g<e.length;g++)c.push(d(e[g]));return f.Promise.all(c)}).then(function(a){for(var d=a.shift(),e=d.files,f=0;f<e.length;f++){var g=e[f];c.file(g.fileNameStr,g.decompressed,{binary:!0,optimizedBinaryString:!0,date:g.date,dir:g.dir,comment:g.fileCommentStr.length?g.fileCommentStr:null,unixPermissions:g.unixPermissions,dosPermissions:g.dosPermissions,createFolders:b.createFolders})}return d.zipComment.length&&(c.comment=d.zipComment),c})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(a,b,c){"use strict";function d(a,b){f.call(this,"Nodejs stream input adapter for "+a),this._upstreamEnded=!1,this._bindStream(b)}var e=a("../utils"),f=a("../stream/GenericWorker");e.inherits(d,f),d.prototype._bindStream=function(a){var b=this;this._stream=a,a.pause(),a.on("data",function(a){b.push({data:a,meta:{percent:0}})}).on("error",function(a){b.isPaused?this.generatedError=a:b.error(a)}).on("end",function(){b.isPaused?b._upstreamEnded=!0:b.end()})},d.prototype.pause=function(){return!!f.prototype.pause.call(this)&&(this._stream.pause(),!0)},d.prototype.resume=function(){return!!f.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},b.exports=d},{"../stream/GenericWorker":28,"../utils":32}],13:[function(a,b,c){"use strict";function d(a,b,c){e.call(this,b),this._helper=a;var d=this;a.on("data",function(a,b){d.push(a)||d._helper.pause(),c&&c(b)}).on("error",function(a){d.emit("error",a)}).on("end",function(){d.push(null)})}var e=a("readable-stream").Readable,f=a("../utils");f.inherits(d,e),d.prototype._read=function(){this._helper.resume()},b.exports=d},{"../utils":32,"readable-stream":16}],14:[function(a,b,c){"use strict";b.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(a,b){return new Buffer(a,b)},allocBuffer:function(a){return Buffer.alloc?Buffer.alloc(a):new Buffer(a)},isBuffer:function(a){return Buffer.isBuffer(a)},isStream:function(a){return a&&"function"==typeof a.on&&"function"==typeof a.pause&&"function"==typeof a.resume}}},{}],15:[function(a,b,c){"use strict";function d(a){return"[object RegExp]"===Object.prototype.toString.call(a)}var e=a("./utf8"),f=a("./utils"),g=a("./stream/GenericWorker"),h=a("./stream/StreamHelper"),i=a("./defaults"),j=a("./compressedObject"),k=a("./zipObject"),l=a("./generate"),m=a("./nodejsUtils"),n=a("./nodejs/NodejsStreamInputAdapter"),o=function(a,b,c){var d,e=f.getTypeOf(b),h=f.extend(c||{},i);h.date=h.date||new Date,null!==h.compression&&(h.compression=h.compression.toUpperCase()),"string"==typeof h.unixPermissions&&(h.unixPermissions=parseInt(h.unixPermissions,8)),h.unixPermissions&&16384&h.unixPermissions&&(h.dir=!0),h.dosPermissions&&16&h.dosPermissions&&(h.dir=!0),h.dir&&(a=q(a)),h.createFolders&&(d=p(a))&&r.call(this,d,!0);var l="string"===e&&h.binary===!1&&h.base64===!1;c&&"undefined"!=typeof c.binary||(h.binary=!l);var o=b instanceof j&&0===b.uncompressedSize;(o||h.dir||!b||0===b.length)&&(h.base64=!1,h.binary=!0,b="",h.compression="STORE",e="string");var s=null;s=b instanceof j||b instanceof g?b:m.isNode&&m.isStream(b)?new n(a,b):f.prepareContent(a,b,h.binary,h.optimizedBinaryString,h.base64);var t=new k(a,s,h);this.files[a]=t},p=function(a){"/"===a.slice(-1)&&(a=a.substring(0,a.length-1));var b=a.lastIndexOf("/");return b>0?a.substring(0,b):""},q=function(a){return"/"!==a.slice(-1)&&(a+="/"),a},r=function(a,b){return b="undefined"!=typeof b?b:i.createFolders,a=q(a),this.files[a]||o.call(this,a,null,{dir:!0,createFolders:b}),this.files[a]},s={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(a){var b,c,d;for(b in this.files)this.files.hasOwnProperty(b)&&(d=this.files[b],c=b.slice(this.root.length,b.length),c&&b.slice(0,this.root.length)===this.root&&a(c,d))},filter:function(a){var b=[];return this.forEach(function(c,d){a(c,d)&&b.push(d)}),b},file:function(a,b,c){if(1===arguments.length){if(d(a)){var e=a;return this.filter(function(a,b){return!b.dir&&e.test(a)})}var f=this.files[this.root+a];return f&&!f.dir?f:null}return a=this.root+a,o.call(this,a,b,c),this},folder:function(a){if(!a)return this;if(d(a))return this.filter(function(b,c){return c.dir&&a.test(b)});var b=this.root+a,c=r.call(this,b),e=this.clone();return e.root=c.name,e},remove:function(a){a=this.root+a;var b=this.files[a];if(b||("/"!==a.slice(-1)&&(a+="/"),b=this.files[a]),b&&!b.dir)delete this.files[a];else for(var c=this.filter(function(b,c){return c.name.slice(0,a.length)===a}),d=0;d<c.length;d++)delete this.files[c[d].name];return this},generate:function(a){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(a){var b,c={};try{if(c=f.extend(a||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:e.utf8encode}),c.type=c.type.toLowerCase(),c.compression=c.compression.toUpperCase(),"binarystring"===c.type&&(c.type="string"),!c.type)throw new Error("No output type specified.");f.checkSupport(c.type),"darwin"!==c.platform&&"freebsd"!==c.platform&&"linux"!==c.platform&&"sunos"!==c.platform||(c.platform="UNIX"),"win32"===c.platform&&(c.platform="DOS");var d=c.comment||this.comment||"";b=l.generateWorker(this,c,d)}catch(i){b=new g("error"),b.error(i)}return new h(b,c.type||"string",c.mimeType)},generateAsync:function(a,b){return this.generateInternalStream(a).accumulate(b)},generateNodeStream:function(a,b){return a=a||{},a.type||(a.type="nodebuffer"),this.generateInternalStream(a).toNodejsStream(b)}};b.exports=s},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(a,b,c){b.exports=a("stream")},{stream:void 0}],17:[function(a,b,c){"use strict";function d(a){e.call(this,a);for(var b=0;b<this.data.length;b++)a[b]=255&a[b]}var e=a("./DataReader"),f=a("../utils");f.inherits(d,e),d.prototype.byteAt=function(a){return this.data[this.zero+a]},d.prototype.lastIndexOfSignature=function(a){for(var b=a.charCodeAt(0),c=a.charCodeAt(1),d=a.charCodeAt(2),e=a.charCodeAt(3),f=this.length-4;f>=0;--f)if(this.data[f]===b&&this.data[f+1]===c&&this.data[f+2]===d&&this.data[f+3]===e)return f-this.zero;return-1},d.prototype.readAndCheckSignature=function(a){var b=a.charCodeAt(0),c=a.charCodeAt(1),d=a.charCodeAt(2),e=a.charCodeAt(3),f=this.readData(4);return b===f[0]&&c===f[1]&&d===f[2]&&e===f[3]},d.prototype.readData=function(a){if(this.checkOffset(a),0===a)return[];var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"../utils":32,"./DataReader":18}],18:[function(a,b,c){"use strict";function d(a){this.data=a,this.length=a.length,this.index=0,this.zero=0}var e=a("../utils");d.prototype={checkOffset:function(a){this.checkIndex(this.index+a)},checkIndex:function(a){if(this.length<this.zero+a||a<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+a+"). Corrupted zip ?")},setIndex:function(a){this.checkIndex(a),this.index=a},skip:function(a){this.setIndex(this.index+a)},byteAt:function(a){},readInt:function(a){var b,c=0;for(this.checkOffset(a),b=this.index+a-1;b>=this.index;b--)c=(c<<8)+this.byteAt(b);return this.index+=a,c},readString:function(a){return e.transformTo("string",this.readData(a))},readData:function(a){},lastIndexOfSignature:function(a){},readAndCheckSignature:function(a){},readDate:function(){var a=this.readInt(4);return new Date(Date.UTC((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&31,a>>5&63,(31&a)<<1))}},b.exports=d},{"../utils":32}],19:[function(a,b,c){"use strict";function d(a){e.call(this,a)}var e=a("./Uint8ArrayReader"),f=a("../utils");f.inherits(d,e),d.prototype.readData=function(a){this.checkOffset(a);var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(a,b,c){"use strict";function d(a){e.call(this,a)}var e=a("./DataReader"),f=a("../utils");f.inherits(d,e),d.prototype.byteAt=function(a){return this.data.charCodeAt(this.zero+a)},d.prototype.lastIndexOfSignature=function(a){return this.data.lastIndexOf(a)-this.zero},d.prototype.readAndCheckSignature=function(a){var b=this.readData(4);return a===b},d.prototype.readData=function(a){this.checkOffset(a);var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"../utils":32,"./DataReader":18}],21:[function(a,b,c){"use strict";function d(a){e.call(this,a)}var e=a("./ArrayReader"),f=a("../utils");f.inherits(d,e),d.prototype.readData=function(a){if(this.checkOffset(a),0===a)return new Uint8Array(0);var b=this.data.subarray(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"../utils":32,"./ArrayReader":17}],22:[function(a,b,c){"use strict";var d=a("../utils"),e=a("../support"),f=a("./ArrayReader"),g=a("./StringReader"),h=a("./NodeBufferReader"),i=a("./Uint8ArrayReader");b.exports=function(a){var b=d.getTypeOf(a);return d.checkSupport(b),"string"!==b||e.uint8array?"nodebuffer"===b?new h(a):e.uint8array?new i(d.transformTo("uint8array",a)):new f(d.transformTo("array",a)):new g(a)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(a,b,c){"use strict";c.LOCAL_FILE_HEADER="PK",c.CENTRAL_FILE_HEADER="PK",c.CENTRAL_DIRECTORY_END="PK",c.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",c.ZIP64_CENTRAL_DIRECTORY_END="PK",c.DATA_DESCRIPTOR="PK\b"},{}],24:[function(a,b,c){"use strict";function d(a){e.call(this,"ConvertWorker to "+a),this.destType=a}var e=a("./GenericWorker"),f=a("../utils");f.inherits(d,e),d.prototype.processChunk=function(a){this.push({data:f.transformTo(this.destType,a.data),meta:a.meta})},b.exports=d},{"../utils":32,"./GenericWorker":28}],25:[function(a,b,c){"use strict";function d(){e.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}var e=a("./GenericWorker"),f=a("../crc32"),g=a("../utils");g.inherits(d,e),d.prototype.processChunk=function(a){this.streamInfo.crc32=f(a.data,this.streamInfo.crc32||0),this.push(a)},b.exports=d},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(a,b,c){"use strict";function d(a){f.call(this,"DataLengthProbe for "+a),this.propName=a,this.withStreamInfo(a,0)}var e=a("../utils"),f=a("./GenericWorker");e.inherits(d,f),d.prototype.processChunk=function(a){if(a){var b=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=b+a.data.length}f.prototype.processChunk.call(this,a)},b.exports=d},{"../utils":32,"./GenericWorker":28}],27:[function(a,b,c){"use strict";function d(a){f.call(this,"DataWorker");var b=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,a.then(function(a){b.dataIsReady=!0,b.data=a,b.max=a&&a.length||0,b.type=e.getTypeOf(a),b.isPaused||b._tickAndRepeat()},function(a){b.error(a)})}var e=a("../utils"),f=a("./GenericWorker"),g=16384;e.inherits(d,f),d.prototype.cleanUp=function(){f.prototype.cleanUp.call(this),this.data=null},d.prototype.resume=function(){return!!f.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,e.delay(this._tickAndRepeat,[],this)),!0)},d.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(e.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},d.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var a=g,b=null,c=Math.min(this.max,this.index+a);if(this.index>=this.max)return this.end();switch(this.type){case"string":b=this.data.substring(this.index,c);break;case"uint8array":b=this.data.subarray(this.index,c);break;case"array":case"nodebuffer":b=this.data.slice(this.index,c)}return this.index=c,this.push({data:b,meta:{percent:this.max?this.index/this.max*100:0}})},b.exports=d},{"../utils":32,"./GenericWorker":28}],28:[function(a,b,c){"use strict";function d(a){this.name=a||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}d.prototype={push:function(a){this.emit("data",a)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(a){this.emit("error",a)}return!0},error:function(a){return!this.isFinished&&(this.isPaused?this.generatedError=a:(this.isFinished=!0,this.emit("error",a),this.previous&&this.previous.error(a),this.cleanUp()),!0)},on:function(a,b){return this._listeners[a].push(b),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(a,b){if(this._listeners[a])for(var c=0;c<this._listeners[a].length;c++)this._listeners[a][c].call(this,b)},pipe:function(a){return a.registerPrevious(this)},registerPrevious:function(a){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=a.streamInfo,this.mergeStreamInfo(),this.previous=a;var b=this;return a.on("data",function(a){b.processChunk(a)}),a.on("end",function(){b.end()}),a.on("error",function(a){b.error(a)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;this.isPaused=!1;var a=!1;return this.generatedError&&(this.error(this.generatedError),a=!0),this.previous&&this.previous.resume(),!a},flush:function(){},processChunk:function(a){this.push(a)},withStreamInfo:function(a,b){return this.extraStreamInfo[a]=b,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var a in this.extraStreamInfo)this.extraStreamInfo.hasOwnProperty(a)&&(this.streamInfo[a]=this.extraStreamInfo[a])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var a="Worker "+this.name;return this.previous?this.previous+" -> "+a:a}},b.exports=d},{}],29:[function(a,b,c){"use strict";function d(a,b,c){switch(a){case"blob":return h.newBlob(h.transformTo("arraybuffer",b),c);case"base64":return k.encode(b);default:return h.transformTo(a,b)}}function e(a,b){var c,d=0,e=null,f=0;for(c=0;c<b.length;c++)f+=b[c].length;switch(a){case"string":return b.join("");case"array":return Array.prototype.concat.apply([],b);case"uint8array":for(e=new Uint8Array(f),c=0;c<b.length;c++)e.set(b[c],d),d+=b[c].length;return e;case"nodebuffer":return Buffer.concat(b);default:throw new Error("concat : unsupported type '"+a+"'")}}function f(a,b){return new m.Promise(function(c,f){var g=[],h=a._internalType,i=a._outputType,j=a._mimeType;a.on("data",function(a,c){g.push(a),b&&b(c)}).on("error",function(a){g=[],f(a)}).on("end",function(){try{var a=d(i,e(h,g),j);c(a)}catch(b){f(b)}g=[]}).resume()})}function g(a,b,c){var d=b;switch(b){case"blob":case"arraybuffer":d="uint8array";break;case"base64":d="string"}try{this._internalType=d,this._outputType=b,this._mimeType=c,h.checkSupport(d),this._worker=a.pipe(new i(d)),a.lock()}catch(e){this._worker=new j("error"),this._worker.error(e)}}var h=a("../utils"),i=a("./ConvertWorker"),j=a("./GenericWorker"),k=a("../base64"),l=a("../support"),m=a("../external"),n=null;if(l.nodestream)try{n=a("../nodejs/NodejsStreamOutputAdapter")}catch(o){}g.prototype={accumulate:function(a){return f(this,a)},on:function(a,b){var c=this;return"data"===a?this._worker.on(a,function(a){b.call(c,a.data,a.meta)}):this._worker.on(a,function(){h.delay(b,arguments,c)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(a){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new n(this,{objectMode:"nodebuffer"!==this._outputType},a)}},b.exports=g},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(a,b,c){"use strict";if(c.base64=!0,c.array=!0,c.string=!0,c.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,c.nodebuffer="undefined"!=typeof Buffer,c.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)c.blob=!1;else{var d=new ArrayBuffer(0);try{c.blob=0===new Blob([d],{type:"application/zip"}).size}catch(e){try{var f=self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder,g=new f;g.append(d),c.blob=0===g.getBlob("application/zip").size}catch(e){c.blob=!1}}}try{c.nodestream=!!a("readable-stream").Readable}catch(e){c.nodestream=!1}},{"readable-stream":16}],31:[function(a,b,c){"use strict";function d(){i.call(this,"utf-8 decode"),this.leftOver=null}function e(){i.call(this,"utf-8 encode")}for(var f=a("./utils"),g=a("./support"),h=a("./nodejsUtils"),i=a("./stream/GenericWorker"),j=new Array(256),k=0;k<256;k++)j[k]=k>=252?6:k>=248?5:k>=240?4:k>=224?3:k>=192?2:1;j[254]=j[254]=1;var l=function(a){var b,c,d,e,f,h=a.length,i=0;for(e=0;e<h;e++)c=a.charCodeAt(e),55296===(64512&c)&&e+1<h&&(d=a.charCodeAt(e+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),e++)),i+=c<128?1:c<2048?2:c<65536?3:4;for(b=g.uint8array?new Uint8Array(i):new Array(i),f=0,e=0;f<i;e++)c=a.charCodeAt(e),55296===(64512&c)&&e+1<h&&(d=a.charCodeAt(e+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),e++)),c<128?b[f++]=c:c<2048?(b[f++]=192|c>>>6,b[f++]=128|63&c):c<65536?(b[f++]=224|c>>>12,b[f++]=128|c>>>6&63,b[f++]=128|63&c):(b[f++]=240|c>>>18,b[f++]=128|c>>>12&63,b[f++]=128|c>>>6&63,b[f++]=128|63&c);return b},m=function(a,b){var c;for(b=b||a.length,b>a.length&&(b=a.length),c=b-1;c>=0&&128===(192&a[c]);)c--;return c<0?b:0===c?b:c+j[a[c]]>b?c:b},n=function(a){var b,c,d,e,g=a.length,h=new Array(2*g);for(c=0,b=0;b<g;)if(d=a[b++],d<128)h[c++]=d;else if(e=j[d],e>4)h[c++]=65533,b+=e-1;else{for(d&=2===e?31:3===e?15:7;e>1&&b<g;)d=d<<6|63&a[b++],e--;e>1?h[c++]=65533:d<65536?h[c++]=d:(d-=65536,h[c++]=55296|d>>10&1023,h[c++]=56320|1023&d)}return h.length!==c&&(h.subarray?h=h.subarray(0,c):h.length=c),f.applyFromCharCode(h)};c.utf8encode=function(a){return g.nodebuffer?h.newBufferFrom(a,"utf-8"):l(a)},c.utf8decode=function(a){return g.nodebuffer?f.transformTo("nodebuffer",a).toString("utf-8"):(a=f.transformTo(g.uint8array?"uint8array":"array",a),n(a))},f.inherits(d,i),d.prototype.processChunk=function(a){var b=f.transformTo(g.uint8array?"uint8array":"array",a.data);if(this.leftOver&&this.leftOver.length){if(g.uint8array){var d=b;b=new Uint8Array(d.length+this.leftOver.length),b.set(this.leftOver,0),b.set(d,this.leftOver.length)}else b=this.leftOver.concat(b);this.leftOver=null}var e=m(b),h=b;e!==b.length&&(g.uint8array?(h=b.subarray(0,e),this.leftOver=b.subarray(e,b.length)):(h=b.slice(0,e),this.leftOver=b.slice(e,b.length))),this.push({data:c.utf8decode(h),meta:a.meta})},d.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:c.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},c.Utf8DecodeWorker=d,f.inherits(e,i),e.prototype.processChunk=function(a){this.push({data:c.utf8encode(a.data),meta:a.meta})},c.Utf8EncodeWorker=e},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(a,b,c){"use strict";function d(a){var b=null;return b=i.uint8array?new Uint8Array(a.length):new Array(a.length),f(a,b)}function e(a){return a}function f(a,b){for(var c=0;c<a.length;++c)b[c]=255&a.charCodeAt(c);return b}function g(a){var b=65536,d=c.getTypeOf(a),e=!0;if("uint8array"===d?e=n.applyCanBeUsed.uint8array:"nodebuffer"===d&&(e=n.applyCanBeUsed.nodebuffer),e)for(;b>1;)try{return n.stringifyByChunk(a,d,b)}catch(f){b=Math.floor(b/2)}return n.stringifyByChar(a)}function h(a,b){for(var c=0;c<a.length;c++)b[c]=a[c];
return b}var i=a("./support"),j=a("./base64"),k=a("./nodejsUtils"),l=a("core-js/library/fn/set-immediate"),m=a("./external");c.newBlob=function(a,b){c.checkSupport("blob");try{return new Blob([a],{type:b})}catch(d){try{var e=self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder,f=new e;return f.append(a),f.getBlob(b)}catch(d){throw new Error("Bug : can't construct the Blob.")}}};var n={stringifyByChunk:function(a,b,c){var d=[],e=0,f=a.length;if(f<=c)return String.fromCharCode.apply(null,a);for(;e<f;)"array"===b||"nodebuffer"===b?d.push(String.fromCharCode.apply(null,a.slice(e,Math.min(e+c,f)))):d.push(String.fromCharCode.apply(null,a.subarray(e,Math.min(e+c,f)))),e+=c;return d.join("")},stringifyByChar:function(a){for(var b="",c=0;c<a.length;c++)b+=String.fromCharCode(a[c]);return b},applyCanBeUsed:{uint8array:function(){try{return i.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(a){return!1}}(),nodebuffer:function(){try{return i.nodebuffer&&1===String.fromCharCode.apply(null,k.allocBuffer(1)).length}catch(a){return!1}}()}};c.applyFromCharCode=g;var o={};o.string={string:e,array:function(a){return f(a,new Array(a.length))},arraybuffer:function(a){return o.string.uint8array(a).buffer},uint8array:function(a){return f(a,new Uint8Array(a.length))},nodebuffer:function(a){return f(a,k.allocBuffer(a.length))}},o.array={string:g,array:e,arraybuffer:function(a){return new Uint8Array(a).buffer},uint8array:function(a){return new Uint8Array(a)},nodebuffer:function(a){return k.newBufferFrom(a)}},o.arraybuffer={string:function(a){return g(new Uint8Array(a))},array:function(a){return h(new Uint8Array(a),new Array(a.byteLength))},arraybuffer:e,uint8array:function(a){return new Uint8Array(a)},nodebuffer:function(a){return k.newBufferFrom(new Uint8Array(a))}},o.uint8array={string:g,array:function(a){return h(a,new Array(a.length))},arraybuffer:function(a){return a.buffer},uint8array:e,nodebuffer:function(a){return k.newBufferFrom(a)}},o.nodebuffer={string:g,array:function(a){return h(a,new Array(a.length))},arraybuffer:function(a){return o.nodebuffer.uint8array(a).buffer},uint8array:function(a){return h(a,new Uint8Array(a.length))},nodebuffer:e},c.transformTo=function(a,b){if(b||(b=""),!a)return b;c.checkSupport(a);var d=c.getTypeOf(b),e=o[d][a](b);return e},c.getTypeOf=function(a){return"string"==typeof a?"string":"[object Array]"===Object.prototype.toString.call(a)?"array":i.nodebuffer&&k.isBuffer(a)?"nodebuffer":i.uint8array&&a instanceof Uint8Array?"uint8array":i.arraybuffer&&a instanceof ArrayBuffer?"arraybuffer":void 0},c.checkSupport=function(a){var b=i[a.toLowerCase()];if(!b)throw new Error(a+" is not supported by this platform")},c.MAX_VALUE_16BITS=65535,c.MAX_VALUE_32BITS=-1,c.pretty=function(a){var b,c,d="";for(c=0;c<(a||"").length;c++)b=a.charCodeAt(c),d+="\\x"+(b<16?"0":"")+b.toString(16).toUpperCase();return d},c.delay=function(a,b,c){l(function(){a.apply(c||null,b||[])})},c.inherits=function(a,b){var c=function(){};c.prototype=b.prototype,a.prototype=new c},c.extend=function(){var a,b,c={};for(a=0;a<arguments.length;a++)for(b in arguments[a])arguments[a].hasOwnProperty(b)&&"undefined"==typeof c[b]&&(c[b]=arguments[a][b]);return c},c.prepareContent=function(a,b,e,f,g){var h=m.Promise.resolve(b).then(function(a){var b=i.blob&&(a instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(a))!==-1);return b&&"undefined"!=typeof FileReader?new m.Promise(function(b,c){var d=new FileReader;d.onload=function(a){b(a.target.result)},d.onerror=function(a){c(a.target.error)},d.readAsArrayBuffer(a)}):a});return h.then(function(b){var h=c.getTypeOf(b);return h?("arraybuffer"===h?b=c.transformTo("uint8array",b):"string"===h&&(g?b=j.decode(b):e&&f!==!0&&(b=d(b))),b):m.Promise.reject(new Error("Can't read the data of '"+a+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"core-js/library/fn/set-immediate":36}],33:[function(a,b,c){"use strict";function d(a){this.files=[],this.loadOptions=a}var e=a("./reader/readerFor"),f=a("./utils"),g=a("./signature"),h=a("./zipEntry"),i=(a("./utf8"),a("./support"));d.prototype={checkSignature:function(a){if(!this.reader.readAndCheckSignature(a)){this.reader.index-=4;var b=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+f.pretty(b)+", expected "+f.pretty(a)+")")}},isSignature:function(a,b){var c=this.reader.index;this.reader.setIndex(a);var d=this.reader.readString(4),e=d===b;return this.reader.setIndex(c),e},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var a=this.reader.readData(this.zipCommentLength),b=i.uint8array?"uint8array":"array",c=f.transformTo(b,a);this.zipComment=this.loadOptions.decodeFileName(c)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var a,b,c,d=this.zip64EndOfCentralSize-44,e=0;e<d;)a=this.reader.readInt(2),b=this.reader.readInt(4),c=this.reader.readData(b),this.zip64ExtensibleData[a]={id:a,length:b,value:c}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),this.disksCount>1)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var a,b;for(a=0;a<this.files.length;a++)b=this.files[a],this.reader.setIndex(b.localHeaderOffset),this.checkSignature(g.LOCAL_FILE_HEADER),b.readLocalPart(this.reader),b.handleUTF8(),b.processAttributes()},readCentralDir:function(){var a;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(g.CENTRAL_FILE_HEADER);)a=new h({zip64:this.zip64},this.loadOptions),a.readCentralPart(this.reader),this.files.push(a);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var a=this.reader.lastIndexOfSignature(g.CENTRAL_DIRECTORY_END);if(a<0){var b=!this.isSignature(0,g.LOCAL_FILE_HEADER);throw b?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory")}this.reader.setIndex(a);var c=a;if(this.checkSignature(g.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===f.MAX_VALUE_16BITS||this.diskWithCentralDirStart===f.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===f.MAX_VALUE_16BITS||this.centralDirRecords===f.MAX_VALUE_16BITS||this.centralDirSize===f.MAX_VALUE_32BITS||this.centralDirOffset===f.MAX_VALUE_32BITS){if(this.zip64=!0,a=this.reader.lastIndexOfSignature(g.ZIP64_CENTRAL_DIRECTORY_LOCATOR),a<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(a),this.checkSignature(g.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,g.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(g.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(g.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var d=this.centralDirOffset+this.centralDirSize;this.zip64&&(d+=20,d+=12+this.zip64EndOfCentralSize);var e=c-d;if(e>0)this.isSignature(c,g.CENTRAL_FILE_HEADER)||(this.reader.zero=e);else if(e<0)throw new Error("Corrupted zip: missing "+Math.abs(e)+" bytes.")},prepareReader:function(a){this.reader=e(a)},load:function(a){this.prepareReader(a),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},b.exports=d},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utf8":31,"./utils":32,"./zipEntry":34}],34:[function(a,b,c){"use strict";function d(a,b){this.options=a,this.loadOptions=b}var e=a("./reader/readerFor"),f=a("./utils"),g=a("./compressedObject"),h=a("./crc32"),i=a("./utf8"),j=a("./compressions"),k=a("./support"),l=0,m=3,n=function(a){for(var b in j)if(j.hasOwnProperty(b)&&j[b].magic===a)return j[b];return null};d.prototype={isEncrypted:function(){return 1===(1&this.bitFlag)},useUTF8:function(){return 2048===(2048&this.bitFlag)},readLocalPart:function(a){var b,c;if(a.skip(22),this.fileNameLength=a.readInt(2),c=a.readInt(2),this.fileName=a.readData(this.fileNameLength),a.skip(c),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(b=n(this.compressionMethod),null===b)throw new Error("Corrupted zip : compression "+f.pretty(this.compressionMethod)+" unknown (inner file : "+f.transformTo("string",this.fileName)+")");this.decompressed=new g(this.compressedSize,this.uncompressedSize,this.crc32,b,a.readData(this.compressedSize))},readCentralPart:function(a){this.versionMadeBy=a.readInt(2),a.skip(2),this.bitFlag=a.readInt(2),this.compressionMethod=a.readString(2),this.date=a.readDate(),this.crc32=a.readInt(4),this.compressedSize=a.readInt(4),this.uncompressedSize=a.readInt(4);var b=a.readInt(2);if(this.extraFieldsLength=a.readInt(2),this.fileCommentLength=a.readInt(2),this.diskNumberStart=a.readInt(2),this.internalFileAttributes=a.readInt(2),this.externalFileAttributes=a.readInt(4),this.localHeaderOffset=a.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");a.skip(b),this.readExtraFields(a),this.parseZIP64ExtraField(a),this.fileComment=a.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var a=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),a===l&&(this.dosPermissions=63&this.externalFileAttributes),a===m&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(a){if(this.extraFields[1]){var b=e(this.extraFields[1].value);this.uncompressedSize===f.MAX_VALUE_32BITS&&(this.uncompressedSize=b.readInt(8)),this.compressedSize===f.MAX_VALUE_32BITS&&(this.compressedSize=b.readInt(8)),this.localHeaderOffset===f.MAX_VALUE_32BITS&&(this.localHeaderOffset=b.readInt(8)),this.diskNumberStart===f.MAX_VALUE_32BITS&&(this.diskNumberStart=b.readInt(4))}},readExtraFields:function(a){var b,c,d,e=a.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});a.index<e;)b=a.readInt(2),c=a.readInt(2),d=a.readData(c),this.extraFields[b]={id:b,length:c,value:d}},handleUTF8:function(){var a=k.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=i.utf8decode(this.fileName),this.fileCommentStr=i.utf8decode(this.fileComment);else{var b=this.findExtraFieldUnicodePath();if(null!==b)this.fileNameStr=b;else{var c=f.transformTo(a,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(c)}var d=this.findExtraFieldUnicodeComment();if(null!==d)this.fileCommentStr=d;else{var e=f.transformTo(a,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(e)}}},findExtraFieldUnicodePath:function(){var a=this.extraFields[28789];if(a){var b=e(a.value);return 1!==b.readInt(1)?null:h(this.fileName)!==b.readInt(4)?null:i.utf8decode(b.readData(a.length-5))}return null},findExtraFieldUnicodeComment:function(){var a=this.extraFields[25461];if(a){var b=e(a.value);return 1!==b.readInt(1)?null:h(this.fileComment)!==b.readInt(4)?null:i.utf8decode(b.readData(a.length-5))}return null}},b.exports=d},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(a,b,c){"use strict";var d=a("./stream/StreamHelper"),e=a("./stream/DataWorker"),f=a("./utf8"),g=a("./compressedObject"),h=a("./stream/GenericWorker"),i=function(a,b,c){this.name=a,this.dir=c.dir,this.date=c.date,this.comment=c.comment,this.unixPermissions=c.unixPermissions,this.dosPermissions=c.dosPermissions,this._data=b,this._dataBinary=c.binary,this.options={compression:c.compression,compressionOptions:c.compressionOptions}};i.prototype={internalStream:function(a){var b=null,c="string";try{if(!a)throw new Error("No output type specified.");c=a.toLowerCase();var e="string"===c||"text"===c;"binarystring"!==c&&"text"!==c||(c="string"),b=this._decompressWorker();var g=!this._dataBinary;g&&!e&&(b=b.pipe(new f.Utf8EncodeWorker)),!g&&e&&(b=b.pipe(new f.Utf8DecodeWorker))}catch(i){b=new h("error"),b.error(i)}return new d(b,c,"")},async:function(a,b){return this.internalStream(a).accumulate(b)},nodeStream:function(a,b){return this.internalStream(a||"nodebuffer").toNodejsStream(b)},_compressWorker:function(a,b){if(this._data instanceof g&&this._data.compression.magic===a.magic)return this._data.getCompressedWorker();var c=this._decompressWorker();return this._dataBinary||(c=c.pipe(new f.Utf8EncodeWorker)),g.createWorkerFrom(c,a,b)},_decompressWorker:function(){return this._data instanceof g?this._data.getContentWorker():this._data instanceof h?this._data:new e(this._data)}};for(var j=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],k=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},l=0;l<j.length;l++)i.prototype[j[l]]=k;b.exports=i},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(a,b,c){a("../modules/web.immediate"),b.exports=a("../modules/_core").setImmediate},{"../modules/_core":40,"../modules/web.immediate":56}],37:[function(a,b,c){b.exports=function(a){if("function"!=typeof a)throw TypeError(a+" is not a function!");return a}},{}],38:[function(a,b,c){var d=a("./_is-object");b.exports=function(a){if(!d(a))throw TypeError(a+" is not an object!");return a}},{"./_is-object":51}],39:[function(a,b,c){var d={}.toString;b.exports=function(a){return d.call(a).slice(8,-1)}},{}],40:[function(a,b,c){var d=b.exports={version:"2.3.0"};"number"==typeof __e&&(__e=d)},{}],41:[function(a,b,c){var d=a("./_a-function");b.exports=function(a,b,c){if(d(a),void 0===b)return a;switch(c){case 1:return function(c){return a.call(b,c)};case 2:return function(c,d){return a.call(b,c,d)};case 3:return function(c,d,e){return a.call(b,c,d,e)}}return function(){return a.apply(b,arguments)}}},{"./_a-function":37}],42:[function(a,b,c){b.exports=!a("./_fails")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},{"./_fails":45}],43:[function(a,b,c){var d=a("./_is-object"),e=a("./_global").document,f=d(e)&&d(e.createElement);b.exports=function(a){return f?e.createElement(a):{}}},{"./_global":46,"./_is-object":51}],44:[function(a,b,c){var d=a("./_global"),e=a("./_core"),f=a("./_ctx"),g=a("./_hide"),h="prototype",i=function(a,b,c){var j,k,l,m=a&i.F,n=a&i.G,o=a&i.S,p=a&i.P,q=a&i.B,r=a&i.W,s=n?e:e[b]||(e[b]={}),t=s[h],u=n?d:o?d[b]:(d[b]||{})[h];n&&(c=b);for(j in c)k=!m&&u&&void 0!==u[j],k&&j in s||(l=k?u[j]:c[j],s[j]=n&&"function"!=typeof u[j]?c[j]:q&&k?f(l,d):r&&u[j]==l?function(a){var b=function(b,c,d){if(this instanceof a){switch(arguments.length){case 0:return new a;case 1:return new a(b);case 2:return new a(b,c)}return new a(b,c,d)}return a.apply(this,arguments)};return b[h]=a[h],b}(l):p&&"function"==typeof l?f(Function.call,l):l,p&&((s.virtual||(s.virtual={}))[j]=l,a&i.R&&t&&!t[j]&&g(t,j,l)))};i.F=1,i.G=2,i.S=4,i.P=8,i.B=16,i.W=32,i.U=64,i.R=128,b.exports=i},{"./_core":40,"./_ctx":41,"./_global":46,"./_hide":47}],45:[function(a,b,c){b.exports=function(a){try{return!!a()}catch(b){return!0}}},{}],46:[function(a,b,c){var d=b.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=d)},{}],47:[function(a,b,c){var d=a("./_object-dp"),e=a("./_property-desc");b.exports=a("./_descriptors")?function(a,b,c){return d.f(a,b,e(1,c))}:function(a,b,c){return a[b]=c,a}},{"./_descriptors":42,"./_object-dp":52,"./_property-desc":53}],48:[function(a,b,c){b.exports=a("./_global").document&&document.documentElement},{"./_global":46}],49:[function(a,b,c){b.exports=!a("./_descriptors")&&!a("./_fails")(function(){return 7!=Object.defineProperty(a("./_dom-create")("div"),"a",{get:function(){return 7}}).a})},{"./_descriptors":42,"./_dom-create":43,"./_fails":45}],50:[function(a,b,c){b.exports=function(a,b,c){var d=void 0===c;switch(b.length){case 0:return d?a():a.call(c);case 1:return d?a(b[0]):a.call(c,b[0]);case 2:return d?a(b[0],b[1]):a.call(c,b[0],b[1]);case 3:return d?a(b[0],b[1],b[2]):a.call(c,b[0],b[1],b[2]);case 4:return d?a(b[0],b[1],b[2],b[3]):a.call(c,b[0],b[1],b[2],b[3])}return a.apply(c,b)}},{}],51:[function(a,b,c){b.exports=function(a){return"object"==typeof a?null!==a:"function"==typeof a}},{}],52:[function(a,b,c){var d=a("./_an-object"),e=a("./_ie8-dom-define"),f=a("./_to-primitive"),g=Object.defineProperty;c.f=a("./_descriptors")?Object.defineProperty:function(a,b,c){if(d(a),b=f(b,!0),d(c),e)try{return g(a,b,c)}catch(h){}if("get"in c||"set"in c)throw TypeError("Accessors not supported!");return"value"in c&&(a[b]=c.value),a}},{"./_an-object":38,"./_descriptors":42,"./_ie8-dom-define":49,"./_to-primitive":55}],53:[function(a,b,c){b.exports=function(a,b){return{enumerable:!(1&a),configurable:!(2&a),writable:!(4&a),value:b}}},{}],54:[function(a,b,c){var d,e,f,g=a("./_ctx"),h=a("./_invoke"),i=a("./_html"),j=a("./_dom-create"),k=a("./_global"),l=k.process,m=k.setImmediate,n=k.clearImmediate,o=k.MessageChannel,p=0,q={},r="onreadystatechange",s=function(){var a=+this;if(q.hasOwnProperty(a)){var b=q[a];delete q[a],b()}},t=function(a){s.call(a.data)};m&&n||(m=function(a){for(var b=[],c=1;arguments.length>c;)b.push(arguments[c++]);return q[++p]=function(){h("function"==typeof a?a:Function(a),b)},d(p),p},n=function(a){delete q[a]},"process"==a("./_cof")(l)?d=function(a){l.nextTick(g(s,a,1))}:o?(e=new o,f=e.port2,e.port1.onmessage=t,d=g(f.postMessage,f,1)):k.addEventListener&&"function"==typeof postMessage&&!k.importScripts?(d=function(a){k.postMessage(a+"","*")},k.addEventListener("message",t,!1)):d=r in j("script")?function(a){i.appendChild(j("script"))[r]=function(){i.removeChild(this),s.call(a)}}:function(a){setTimeout(g(s,a,1),0)}),b.exports={set:m,clear:n}},{"./_cof":39,"./_ctx":41,"./_dom-create":43,"./_global":46,"./_html":48,"./_invoke":50}],55:[function(a,b,c){var d=a("./_is-object");b.exports=function(a,b){if(!d(a))return a;var c,e;if(b&&"function"==typeof(c=a.toString)&&!d(e=c.call(a)))return e;if("function"==typeof(c=a.valueOf)&&!d(e=c.call(a)))return e;if(!b&&"function"==typeof(c=a.toString)&&!d(e=c.call(a)))return e;throw TypeError("Can't convert object to primitive value")}},{"./_is-object":51}],56:[function(a,b,c){var d=a("./_export"),e=a("./_task");d(d.G+d.B,{setImmediate:e.set,clearImmediate:e.clear})},{"./_export":44,"./_task":54}],57:[function(a,b,c){(function(a){"use strict";function c(){k=!0;for(var a,b,c=l.length;c;){for(b=l,l=[],a=-1;++a<c;)b[a]();c=l.length}k=!1}function d(a){1!==l.push(a)||k||e()}var e,f=a.MutationObserver||a.WebKitMutationObserver;if(f){var g=0,h=new f(c),i=a.document.createTextNode("");h.observe(i,{characterData:!0}),e=function(){i.data=g=++g%2}}else if(a.setImmediate||"undefined"==typeof a.MessageChannel)e="document"in a&&"onreadystatechange"in a.document.createElement("script")?function(){var b=a.document.createElement("script");b.onreadystatechange=function(){c(),b.onreadystatechange=null,b.parentNode.removeChild(b),b=null},a.document.documentElement.appendChild(b)}:function(){setTimeout(c,0)};else{var j=new a.MessageChannel;j.port1.onmessage=c,e=function(){j.port2.postMessage(0)}}var k,l=[];b.exports=d}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],58:[function(a,b,c){"use strict";function d(){}function e(a){if("function"!=typeof a)throw new TypeError("resolver must be a function");this.state=s,this.queue=[],this.outcome=void 0,a!==d&&i(this,a)}function f(a,b,c){this.promise=a,"function"==typeof b&&(this.onFulfilled=b,this.callFulfilled=this.otherCallFulfilled),"function"==typeof c&&(this.onRejected=c,this.callRejected=this.otherCallRejected)}function g(a,b,c){o(function(){var d;try{d=b(c)}catch(e){return p.reject(a,e)}d===a?p.reject(a,new TypeError("Cannot resolve promise with itself")):p.resolve(a,d)})}function h(a){var b=a&&a.then;if(a&&("object"==typeof a||"function"==typeof a)&&"function"==typeof b)return function(){b.apply(a,arguments)}}function i(a,b){function c(b){f||(f=!0,p.reject(a,b))}function d(b){f||(f=!0,p.resolve(a,b))}function e(){b(d,c)}var f=!1,g=j(e);"error"===g.status&&c(g.value)}function j(a,b){var c={};try{c.value=a(b),c.status="success"}catch(d){c.status="error",c.value=d}return c}function k(a){return a instanceof this?a:p.resolve(new this(d),a)}function l(a){var b=new this(d);return p.reject(b,a)}function m(a){function b(a,b){function d(a){g[b]=a,++h!==e||f||(f=!0,p.resolve(j,g))}c.resolve(a).then(d,function(a){f||(f=!0,p.reject(j,a))})}var c=this;if("[object Array]"!==Object.prototype.toString.call(a))return this.reject(new TypeError("must be an array"));var e=a.length,f=!1;if(!e)return this.resolve([]);for(var g=new Array(e),h=0,i=-1,j=new this(d);++i<e;)b(a[i],i);return j}function n(a){function b(a){c.resolve(a).then(function(a){f||(f=!0,p.resolve(h,a))},function(a){f||(f=!0,p.reject(h,a))})}var c=this;if("[object Array]"!==Object.prototype.toString.call(a))return this.reject(new TypeError("must be an array"));var e=a.length,f=!1;if(!e)return this.resolve([]);for(var g=-1,h=new this(d);++g<e;)b(a[g]);return h}var o=a("immediate"),p={},q=["REJECTED"],r=["FULFILLED"],s=["PENDING"];b.exports=e,e.prototype["catch"]=function(a){return this.then(null,a)},e.prototype.then=function(a,b){if("function"!=typeof a&&this.state===r||"function"!=typeof b&&this.state===q)return this;var c=new this.constructor(d);if(this.state!==s){var e=this.state===r?a:b;g(c,e,this.outcome)}else this.queue.push(new f(c,a,b));return c},f.prototype.callFulfilled=function(a){p.resolve(this.promise,a)},f.prototype.otherCallFulfilled=function(a){g(this.promise,this.onFulfilled,a)},f.prototype.callRejected=function(a){p.reject(this.promise,a)},f.prototype.otherCallRejected=function(a){g(this.promise,this.onRejected,a)},p.resolve=function(a,b){var c=j(h,b);if("error"===c.status)return p.reject(a,c.value);var d=c.value;if(d)i(a,d);else{a.state=r,a.outcome=b;for(var e=-1,f=a.queue.length;++e<f;)a.queue[e].callFulfilled(b)}return a},p.reject=function(a,b){a.state=q,a.outcome=b;for(var c=-1,d=a.queue.length;++c<d;)a.queue[c].callRejected(b);return a},e.resolve=k,e.reject=l,e.all=m,e.race=n},{immediate:57}],59:[function(a,b,c){"use strict";var d=a("./lib/utils/common").assign,e=a("./lib/deflate"),f=a("./lib/inflate"),g=a("./lib/zlib/constants"),h={};d(h,e,f,g),b.exports=h},{"./lib/deflate":60,"./lib/inflate":61,"./lib/utils/common":62,"./lib/zlib/constants":65}],60:[function(a,b,c){"use strict";function d(a){if(!(this instanceof d))return new d(a);this.options=i.assign({level:s,method:u,chunkSize:16384,windowBits:15,memLevel:8,strategy:t,to:""},a||{});var b=this.options;b.raw&&b.windowBits>0?b.windowBits=-b.windowBits:b.gzip&&b.windowBits>0&&b.windowBits<16&&(b.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new l,this.strm.avail_out=0;var c=h.deflateInit2(this.strm,b.level,b.method,b.windowBits,b.memLevel,b.strategy);if(c!==p)throw new Error(k[c]);if(b.header&&h.deflateSetHeader(this.strm,b.header),b.dictionary){var e;if(e="string"==typeof b.dictionary?j.string2buf(b.dictionary):"[object ArrayBuffer]"===m.call(b.dictionary)?new Uint8Array(b.dictionary):b.dictionary,c=h.deflateSetDictionary(this.strm,e),c!==p)throw new Error(k[c]);this._dict_set=!0}}function e(a,b){var c=new d(b);if(c.push(a,!0),c.err)throw c.msg||k[c.err];return c.result}function f(a,b){return b=b||{},b.raw=!0,e(a,b)}function g(a,b){return b=b||{},b.gzip=!0,e(a,b)}var h=a("./zlib/deflate"),i=a("./utils/common"),j=a("./utils/strings"),k=a("./zlib/messages"),l=a("./zlib/zstream"),m=Object.prototype.toString,n=0,o=4,p=0,q=1,r=2,s=-1,t=0,u=8;d.prototype.push=function(a,b){var c,d,e=this.strm,f=this.options.chunkSize;if(this.ended)return!1;d=b===~~b?b:b===!0?o:n,"string"==typeof a?e.input=j.string2buf(a):"[object ArrayBuffer]"===m.call(a)?e.input=new Uint8Array(a):e.input=a,e.next_in=0,e.avail_in=e.input.length;do{if(0===e.avail_out&&(e.output=new i.Buf8(f),e.next_out=0,e.avail_out=f),c=h.deflate(e,d),c!==q&&c!==p)return this.onEnd(c),this.ended=!0,!1;0!==e.avail_out&&(0!==e.avail_in||d!==o&&d!==r)||("string"===this.options.to?this.onData(j.buf2binstring(i.shrinkBuf(e.output,e.next_out))):this.onData(i.shrinkBuf(e.output,e.next_out)))}while((e.avail_in>0||0===e.avail_out)&&c!==q);return d===o?(c=h.deflateEnd(this.strm),this.onEnd(c),this.ended=!0,c===p):d!==r||(this.onEnd(p),e.avail_out=0,!0)},d.prototype.onData=function(a){this.chunks.push(a)},d.prototype.onEnd=function(a){a===p&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=a,this.msg=this.strm.msg},c.Deflate=d,c.deflate=e,c.deflateRaw=f,c.gzip=g},{"./utils/common":62,"./utils/strings":63,"./zlib/deflate":67,"./zlib/messages":72,"./zlib/zstream":74}],61:[function(a,b,c){"use strict";function d(a){if(!(this instanceof d))return new d(a);this.options=h.assign({chunkSize:16384,windowBits:0,to:""},a||{});var b=this.options;b.raw&&b.windowBits>=0&&b.windowBits<16&&(b.windowBits=-b.windowBits,0===b.windowBits&&(b.windowBits=-15)),!(b.windowBits>=0&&b.windowBits<16)||a&&a.windowBits||(b.windowBits+=32),b.windowBits>15&&b.windowBits<48&&0===(15&b.windowBits)&&(b.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new l,this.strm.avail_out=0;var c=g.inflateInit2(this.strm,b.windowBits);if(c!==j.Z_OK)throw new Error(k[c]);this.header=new m,g.inflateGetHeader(this.strm,this.header)}function e(a,b){var c=new d(b);if(c.push(a,!0),c.err)throw c.msg||k[c.err];return c.result}function f(a,b){return b=b||{},b.raw=!0,e(a,b)}var g=a("./zlib/inflate"),h=a("./utils/common"),i=a("./utils/strings"),j=a("./zlib/constants"),k=a("./zlib/messages"),l=a("./zlib/zstream"),m=a("./zlib/gzheader"),n=Object.prototype.toString;d.prototype.push=function(a,b){var c,d,e,f,k,l,m=this.strm,o=this.options.chunkSize,p=this.options.dictionary,q=!1;if(this.ended)return!1;d=b===~~b?b:b===!0?j.Z_FINISH:j.Z_NO_FLUSH,"string"==typeof a?m.input=i.binstring2buf(a):"[object ArrayBuffer]"===n.call(a)?m.input=new Uint8Array(a):m.input=a,m.next_in=0,m.avail_in=m.input.length;do{if(0===m.avail_out&&(m.output=new h.Buf8(o),m.next_out=0,m.avail_out=o),c=g.inflate(m,j.Z_NO_FLUSH),c===j.Z_NEED_DICT&&p&&(l="string"==typeof p?i.string2buf(p):"[object ArrayBuffer]"===n.call(p)?new Uint8Array(p):p,c=g.inflateSetDictionary(this.strm,l)),c===j.Z_BUF_ERROR&&q===!0&&(c=j.Z_OK,q=!1),c!==j.Z_STREAM_END&&c!==j.Z_OK)return this.onEnd(c),this.ended=!0,!1;m.next_out&&(0!==m.avail_out&&c!==j.Z_STREAM_END&&(0!==m.avail_in||d!==j.Z_FINISH&&d!==j.Z_SYNC_FLUSH)||("string"===this.options.to?(e=i.utf8border(m.output,m.next_out),f=m.next_out-e,k=i.buf2string(m.output,e),m.next_out=f,m.avail_out=o-f,f&&h.arraySet(m.output,m.output,e,f,0),this.onData(k)):this.onData(h.shrinkBuf(m.output,m.next_out)))),0===m.avail_in&&0===m.avail_out&&(q=!0)}while((m.avail_in>0||0===m.avail_out)&&c!==j.Z_STREAM_END);return c===j.Z_STREAM_END&&(d=j.Z_FINISH),d===j.Z_FINISH?(c=g.inflateEnd(this.strm),this.onEnd(c),this.ended=!0,c===j.Z_OK):d!==j.Z_SYNC_FLUSH||(this.onEnd(j.Z_OK),m.avail_out=0,!0)},d.prototype.onData=function(a){this.chunks.push(a)},d.prototype.onEnd=function(a){a===j.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=h.flattenChunks(this.chunks)),this.chunks=[],this.err=a,this.msg=this.strm.msg},c.Inflate=d,c.inflate=e,c.inflateRaw=f,c.ungzip=e},{"./utils/common":62,"./utils/strings":63,"./zlib/constants":65,"./zlib/gzheader":68,"./zlib/inflate":70,"./zlib/messages":72,"./zlib/zstream":74}],62:[function(a,b,c){"use strict";var d="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;c.assign=function(a){for(var b=Array.prototype.slice.call(arguments,1);b.length;){var c=b.shift();if(c){if("object"!=typeof c)throw new TypeError(c+"must be non-object");for(var d in c)c.hasOwnProperty(d)&&(a[d]=c[d])}}return a},c.shrinkBuf=function(a,b){return a.length===b?a:a.subarray?a.subarray(0,b):(a.length=b,a)};var e={arraySet:function(a,b,c,d,e){if(b.subarray&&a.subarray)return void a.set(b.subarray(c,c+d),e);for(var f=0;f<d;f++)a[e+f]=b[c+f]},flattenChunks:function(a){var b,c,d,e,f,g;for(d=0,b=0,c=a.length;b<c;b++)d+=a[b].length;for(g=new Uint8Array(d),e=0,b=0,c=a.length;b<c;b++)f=a[b],g.set(f,e),e+=f.length;return g}},f={arraySet:function(a,b,c,d,e){for(var f=0;f<d;f++)a[e+f]=b[c+f]},flattenChunks:function(a){return[].concat.apply([],a)}};c.setTyped=function(a){a?(c.Buf8=Uint8Array,c.Buf16=Uint16Array,c.Buf32=Int32Array,c.assign(c,e)):(c.Buf8=Array,c.Buf16=Array,c.Buf32=Array,c.assign(c,f))},c.setTyped(d)},{}],63:[function(a,b,c){"use strict";function d(a,b){if(b<65537&&(a.subarray&&g||!a.subarray&&f))return String.fromCharCode.apply(null,e.shrinkBuf(a,b));for(var c="",d=0;d<b;d++)c+=String.fromCharCode(a[d]);return c}var e=a("./common"),f=!0,g=!0;try{String.fromCharCode.apply(null,[0])}catch(h){f=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(h){g=!1}for(var i=new e.Buf8(256),j=0;j<256;j++)i[j]=j>=252?6:j>=248?5:j>=240?4:j>=224?3:j>=192?2:1;i[254]=i[254]=1,c.string2buf=function(a){var b,c,d,f,g,h=a.length,i=0;for(f=0;f<h;f++)c=a.charCodeAt(f),55296===(64512&c)&&f+1<h&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),i+=c<128?1:c<2048?2:c<65536?3:4;for(b=new e.Buf8(i),g=0,f=0;g<i;f++)c=a.charCodeAt(f),55296===(64512&c)&&f+1<h&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),c<128?b[g++]=c:c<2048?(b[g++]=192|c>>>6,b[g++]=128|63&c):c<65536?(b[g++]=224|c>>>12,b[g++]=128|c>>>6&63,b[g++]=128|63&c):(b[g++]=240|c>>>18,b[g++]=128|c>>>12&63,b[g++]=128|c>>>6&63,b[g++]=128|63&c);return b},c.buf2binstring=function(a){return d(a,a.length)},c.binstring2buf=function(a){for(var b=new e.Buf8(a.length),c=0,d=b.length;c<d;c++)b[c]=a.charCodeAt(c);return b},c.buf2string=function(a,b){var c,e,f,g,h=b||a.length,j=new Array(2*h);for(e=0,c=0;c<h;)if(f=a[c++],f<128)j[e++]=f;else if(g=i[f],g>4)j[e++]=65533,c+=g-1;else{for(f&=2===g?31:3===g?15:7;g>1&&c<h;)f=f<<6|63&a[c++],g--;g>1?j[e++]=65533:f<65536?j[e++]=f:(f-=65536,j[e++]=55296|f>>10&1023,j[e++]=56320|1023&f)}return d(j,e)},c.utf8border=function(a,b){var c;for(b=b||a.length,b>a.length&&(b=a.length),c=b-1;c>=0&&128===(192&a[c]);)c--;return c<0?b:0===c?b:c+i[a[c]]>b?c:b}},{"./common":62}],64:[function(a,b,c){"use strict";function d(a,b,c,d){for(var e=65535&a|0,f=a>>>16&65535|0,g=0;0!==c;){g=c>2e3?2e3:c,c-=g;do e=e+b[d++]|0,f=f+e|0;while(--g);e%=65521,f%=65521}return e|f<<16|0;
}b.exports=d},{}],65:[function(a,b,c){"use strict";b.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],66:[function(a,b,c){"use strict";function d(){for(var a,b=[],c=0;c<256;c++){a=c;for(var d=0;d<8;d++)a=1&a?3988292384^a>>>1:a>>>1;b[c]=a}return b}function e(a,b,c,d){var e=f,g=d+c;a^=-1;for(var h=d;h<g;h++)a=a>>>8^e[255&(a^b[h])];return a^-1}var f=d();b.exports=e},{}],67:[function(a,b,c){"use strict";function d(a,b){return a.msg=I[b],b}function e(a){return(a<<1)-(a>4?9:0)}function f(a){for(var b=a.length;--b>=0;)a[b]=0}function g(a){var b=a.state,c=b.pending;c>a.avail_out&&(c=a.avail_out),0!==c&&(E.arraySet(a.output,b.pending_buf,b.pending_out,c,a.next_out),a.next_out+=c,b.pending_out+=c,a.total_out+=c,a.avail_out-=c,b.pending-=c,0===b.pending&&(b.pending_out=0))}function h(a,b){F._tr_flush_block(a,a.block_start>=0?a.block_start:-1,a.strstart-a.block_start,b),a.block_start=a.strstart,g(a.strm)}function i(a,b){a.pending_buf[a.pending++]=b}function j(a,b){a.pending_buf[a.pending++]=b>>>8&255,a.pending_buf[a.pending++]=255&b}function k(a,b,c,d){var e=a.avail_in;return e>d&&(e=d),0===e?0:(a.avail_in-=e,E.arraySet(b,a.input,a.next_in,e,c),1===a.state.wrap?a.adler=G(a.adler,b,e,c):2===a.state.wrap&&(a.adler=H(a.adler,b,e,c)),a.next_in+=e,a.total_in+=e,e)}function l(a,b){var c,d,e=a.max_chain_length,f=a.strstart,g=a.prev_length,h=a.nice_match,i=a.strstart>a.w_size-la?a.strstart-(a.w_size-la):0,j=a.window,k=a.w_mask,l=a.prev,m=a.strstart+ka,n=j[f+g-1],o=j[f+g];a.prev_length>=a.good_match&&(e>>=2),h>a.lookahead&&(h=a.lookahead);do if(c=b,j[c+g]===o&&j[c+g-1]===n&&j[c]===j[f]&&j[++c]===j[f+1]){f+=2,c++;do;while(j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&f<m);if(d=ka-(m-f),f=m-ka,d>g){if(a.match_start=b,g=d,d>=h)break;n=j[f+g-1],o=j[f+g]}}while((b=l[b&k])>i&&0!==--e);return g<=a.lookahead?g:a.lookahead}function m(a){var b,c,d,e,f,g=a.w_size;do{if(e=a.window_size-a.lookahead-a.strstart,a.strstart>=g+(g-la)){E.arraySet(a.window,a.window,g,g,0),a.match_start-=g,a.strstart-=g,a.block_start-=g,c=a.hash_size,b=c;do d=a.head[--b],a.head[b]=d>=g?d-g:0;while(--c);c=g,b=c;do d=a.prev[--b],a.prev[b]=d>=g?d-g:0;while(--c);e+=g}if(0===a.strm.avail_in)break;if(c=k(a.strm,a.window,a.strstart+a.lookahead,e),a.lookahead+=c,a.lookahead+a.insert>=ja)for(f=a.strstart-a.insert,a.ins_h=a.window[f],a.ins_h=(a.ins_h<<a.hash_shift^a.window[f+1])&a.hash_mask;a.insert&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[f+ja-1])&a.hash_mask,a.prev[f&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=f,f++,a.insert--,!(a.lookahead+a.insert<ja)););}while(a.lookahead<la&&0!==a.strm.avail_in)}function n(a,b){var c=65535;for(c>a.pending_buf_size-5&&(c=a.pending_buf_size-5);;){if(a.lookahead<=1){if(m(a),0===a.lookahead&&b===J)return ua;if(0===a.lookahead)break}a.strstart+=a.lookahead,a.lookahead=0;var d=a.block_start+c;if((0===a.strstart||a.strstart>=d)&&(a.lookahead=a.strstart-d,a.strstart=d,h(a,!1),0===a.strm.avail_out))return ua;if(a.strstart-a.block_start>=a.w_size-la&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.strstart>a.block_start&&(h(a,!1),0===a.strm.avail_out)?ua:ua}function o(a,b){for(var c,d;;){if(a.lookahead<la){if(m(a),a.lookahead<la&&b===J)return ua;if(0===a.lookahead)break}if(c=0,a.lookahead>=ja&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart),0!==c&&a.strstart-c<=a.w_size-la&&(a.match_length=l(a,c)),a.match_length>=ja)if(d=F._tr_tally(a,a.strstart-a.match_start,a.match_length-ja),a.lookahead-=a.match_length,a.match_length<=a.max_lazy_match&&a.lookahead>=ja){a.match_length--;do a.strstart++,a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart;while(0!==--a.match_length);a.strstart++}else a.strstart+=a.match_length,a.match_length=0,a.ins_h=a.window[a.strstart],a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+1])&a.hash_mask;else d=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++;if(d&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=a.strstart<ja-1?a.strstart:ja-1,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function p(a,b){for(var c,d,e;;){if(a.lookahead<la){if(m(a),a.lookahead<la&&b===J)return ua;if(0===a.lookahead)break}if(c=0,a.lookahead>=ja&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart),a.prev_length=a.match_length,a.prev_match=a.match_start,a.match_length=ja-1,0!==c&&a.prev_length<a.max_lazy_match&&a.strstart-c<=a.w_size-la&&(a.match_length=l(a,c),a.match_length<=5&&(a.strategy===U||a.match_length===ja&&a.strstart-a.match_start>4096)&&(a.match_length=ja-1)),a.prev_length>=ja&&a.match_length<=a.prev_length){e=a.strstart+a.lookahead-ja,d=F._tr_tally(a,a.strstart-1-a.prev_match,a.prev_length-ja),a.lookahead-=a.prev_length-1,a.prev_length-=2;do++a.strstart<=e&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart);while(0!==--a.prev_length);if(a.match_available=0,a.match_length=ja-1,a.strstart++,d&&(h(a,!1),0===a.strm.avail_out))return ua}else if(a.match_available){if(d=F._tr_tally(a,0,a.window[a.strstart-1]),d&&h(a,!1),a.strstart++,a.lookahead--,0===a.strm.avail_out)return ua}else a.match_available=1,a.strstart++,a.lookahead--}return a.match_available&&(d=F._tr_tally(a,0,a.window[a.strstart-1]),a.match_available=0),a.insert=a.strstart<ja-1?a.strstart:ja-1,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function q(a,b){for(var c,d,e,f,g=a.window;;){if(a.lookahead<=ka){if(m(a),a.lookahead<=ka&&b===J)return ua;if(0===a.lookahead)break}if(a.match_length=0,a.lookahead>=ja&&a.strstart>0&&(e=a.strstart-1,d=g[e],d===g[++e]&&d===g[++e]&&d===g[++e])){f=a.strstart+ka;do;while(d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&e<f);a.match_length=ka-(f-e),a.match_length>a.lookahead&&(a.match_length=a.lookahead)}if(a.match_length>=ja?(c=F._tr_tally(a,1,a.match_length-ja),a.lookahead-=a.match_length,a.strstart+=a.match_length,a.match_length=0):(c=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++),c&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function r(a,b){for(var c;;){if(0===a.lookahead&&(m(a),0===a.lookahead)){if(b===J)return ua;break}if(a.match_length=0,c=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++,c&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function s(a,b,c,d,e){this.good_length=a,this.max_lazy=b,this.nice_length=c,this.max_chain=d,this.func=e}function t(a){a.window_size=2*a.w_size,f(a.head),a.max_lazy_match=D[a.level].max_lazy,a.good_match=D[a.level].good_length,a.nice_match=D[a.level].nice_length,a.max_chain_length=D[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=ja-1,a.match_available=0,a.ins_h=0}function u(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=$,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new E.Buf16(2*ha),this.dyn_dtree=new E.Buf16(2*(2*fa+1)),this.bl_tree=new E.Buf16(2*(2*ga+1)),f(this.dyn_ltree),f(this.dyn_dtree),f(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new E.Buf16(ia+1),this.heap=new E.Buf16(2*ea+1),f(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new E.Buf16(2*ea+1),f(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function v(a){var b;return a&&a.state?(a.total_in=a.total_out=0,a.data_type=Z,b=a.state,b.pending=0,b.pending_out=0,b.wrap<0&&(b.wrap=-b.wrap),b.status=b.wrap?na:sa,a.adler=2===b.wrap?0:1,b.last_flush=J,F._tr_init(b),O):d(a,Q)}function w(a){var b=v(a);return b===O&&t(a.state),b}function x(a,b){return a&&a.state?2!==a.state.wrap?Q:(a.state.gzhead=b,O):Q}function y(a,b,c,e,f,g){if(!a)return Q;var h=1;if(b===T&&(b=6),e<0?(h=0,e=-e):e>15&&(h=2,e-=16),f<1||f>_||c!==$||e<8||e>15||b<0||b>9||g<0||g>X)return d(a,Q);8===e&&(e=9);var i=new u;return a.state=i,i.strm=a,i.wrap=h,i.gzhead=null,i.w_bits=e,i.w_size=1<<i.w_bits,i.w_mask=i.w_size-1,i.hash_bits=f+7,i.hash_size=1<<i.hash_bits,i.hash_mask=i.hash_size-1,i.hash_shift=~~((i.hash_bits+ja-1)/ja),i.window=new E.Buf8(2*i.w_size),i.head=new E.Buf16(i.hash_size),i.prev=new E.Buf16(i.w_size),i.lit_bufsize=1<<f+6,i.pending_buf_size=4*i.lit_bufsize,i.pending_buf=new E.Buf8(i.pending_buf_size),i.d_buf=1*i.lit_bufsize,i.l_buf=3*i.lit_bufsize,i.level=b,i.strategy=g,i.method=c,w(a)}function z(a,b){return y(a,b,$,aa,ba,Y)}function A(a,b){var c,h,k,l;if(!a||!a.state||b>N||b<0)return a?d(a,Q):Q;if(h=a.state,!a.output||!a.input&&0!==a.avail_in||h.status===ta&&b!==M)return d(a,0===a.avail_out?S:Q);if(h.strm=a,c=h.last_flush,h.last_flush=b,h.status===na)if(2===h.wrap)a.adler=0,i(h,31),i(h,139),i(h,8),h.gzhead?(i(h,(h.gzhead.text?1:0)+(h.gzhead.hcrc?2:0)+(h.gzhead.extra?4:0)+(h.gzhead.name?8:0)+(h.gzhead.comment?16:0)),i(h,255&h.gzhead.time),i(h,h.gzhead.time>>8&255),i(h,h.gzhead.time>>16&255),i(h,h.gzhead.time>>24&255),i(h,9===h.level?2:h.strategy>=V||h.level<2?4:0),i(h,255&h.gzhead.os),h.gzhead.extra&&h.gzhead.extra.length&&(i(h,255&h.gzhead.extra.length),i(h,h.gzhead.extra.length>>8&255)),h.gzhead.hcrc&&(a.adler=H(a.adler,h.pending_buf,h.pending,0)),h.gzindex=0,h.status=oa):(i(h,0),i(h,0),i(h,0),i(h,0),i(h,0),i(h,9===h.level?2:h.strategy>=V||h.level<2?4:0),i(h,ya),h.status=sa);else{var m=$+(h.w_bits-8<<4)<<8,n=-1;n=h.strategy>=V||h.level<2?0:h.level<6?1:6===h.level?2:3,m|=n<<6,0!==h.strstart&&(m|=ma),m+=31-m%31,h.status=sa,j(h,m),0!==h.strstart&&(j(h,a.adler>>>16),j(h,65535&a.adler)),a.adler=1}if(h.status===oa)if(h.gzhead.extra){for(k=h.pending;h.gzindex<(65535&h.gzhead.extra.length)&&(h.pending!==h.pending_buf_size||(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending!==h.pending_buf_size));)i(h,255&h.gzhead.extra[h.gzindex]),h.gzindex++;h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),h.gzindex===h.gzhead.extra.length&&(h.gzindex=0,h.status=pa)}else h.status=pa;if(h.status===pa)if(h.gzhead.name){k=h.pending;do{if(h.pending===h.pending_buf_size&&(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending===h.pending_buf_size)){l=1;break}l=h.gzindex<h.gzhead.name.length?255&h.gzhead.name.charCodeAt(h.gzindex++):0,i(h,l)}while(0!==l);h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),0===l&&(h.gzindex=0,h.status=qa)}else h.status=qa;if(h.status===qa)if(h.gzhead.comment){k=h.pending;do{if(h.pending===h.pending_buf_size&&(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending===h.pending_buf_size)){l=1;break}l=h.gzindex<h.gzhead.comment.length?255&h.gzhead.comment.charCodeAt(h.gzindex++):0,i(h,l)}while(0!==l);h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),0===l&&(h.status=ra)}else h.status=ra;if(h.status===ra&&(h.gzhead.hcrc?(h.pending+2>h.pending_buf_size&&g(a),h.pending+2<=h.pending_buf_size&&(i(h,255&a.adler),i(h,a.adler>>8&255),a.adler=0,h.status=sa)):h.status=sa),0!==h.pending){if(g(a),0===a.avail_out)return h.last_flush=-1,O}else if(0===a.avail_in&&e(b)<=e(c)&&b!==M)return d(a,S);if(h.status===ta&&0!==a.avail_in)return d(a,S);if(0!==a.avail_in||0!==h.lookahead||b!==J&&h.status!==ta){var o=h.strategy===V?r(h,b):h.strategy===W?q(h,b):D[h.level].func(h,b);if(o!==wa&&o!==xa||(h.status=ta),o===ua||o===wa)return 0===a.avail_out&&(h.last_flush=-1),O;if(o===va&&(b===K?F._tr_align(h):b!==N&&(F._tr_stored_block(h,0,0,!1),b===L&&(f(h.head),0===h.lookahead&&(h.strstart=0,h.block_start=0,h.insert=0))),g(a),0===a.avail_out))return h.last_flush=-1,O}return b!==M?O:h.wrap<=0?P:(2===h.wrap?(i(h,255&a.adler),i(h,a.adler>>8&255),i(h,a.adler>>16&255),i(h,a.adler>>24&255),i(h,255&a.total_in),i(h,a.total_in>>8&255),i(h,a.total_in>>16&255),i(h,a.total_in>>24&255)):(j(h,a.adler>>>16),j(h,65535&a.adler)),g(a),h.wrap>0&&(h.wrap=-h.wrap),0!==h.pending?O:P)}function B(a){var b;return a&&a.state?(b=a.state.status,b!==na&&b!==oa&&b!==pa&&b!==qa&&b!==ra&&b!==sa&&b!==ta?d(a,Q):(a.state=null,b===sa?d(a,R):O)):Q}function C(a,b){var c,d,e,g,h,i,j,k,l=b.length;if(!a||!a.state)return Q;if(c=a.state,g=c.wrap,2===g||1===g&&c.status!==na||c.lookahead)return Q;for(1===g&&(a.adler=G(a.adler,b,l,0)),c.wrap=0,l>=c.w_size&&(0===g&&(f(c.head),c.strstart=0,c.block_start=0,c.insert=0),k=new E.Buf8(c.w_size),E.arraySet(k,b,l-c.w_size,c.w_size,0),b=k,l=c.w_size),h=a.avail_in,i=a.next_in,j=a.input,a.avail_in=l,a.next_in=0,a.input=b,m(c);c.lookahead>=ja;){d=c.strstart,e=c.lookahead-(ja-1);do c.ins_h=(c.ins_h<<c.hash_shift^c.window[d+ja-1])&c.hash_mask,c.prev[d&c.w_mask]=c.head[c.ins_h],c.head[c.ins_h]=d,d++;while(--e);c.strstart=d,c.lookahead=ja-1,m(c)}return c.strstart+=c.lookahead,c.block_start=c.strstart,c.insert=c.lookahead,c.lookahead=0,c.match_length=c.prev_length=ja-1,c.match_available=0,a.next_in=i,a.input=j,a.avail_in=h,c.wrap=g,O}var D,E=a("../utils/common"),F=a("./trees"),G=a("./adler32"),H=a("./crc32"),I=a("./messages"),J=0,K=1,L=3,M=4,N=5,O=0,P=1,Q=-2,R=-3,S=-5,T=-1,U=1,V=2,W=3,X=4,Y=0,Z=2,$=8,_=9,aa=15,ba=8,ca=29,da=256,ea=da+1+ca,fa=30,ga=19,ha=2*ea+1,ia=15,ja=3,ka=258,la=ka+ja+1,ma=32,na=42,oa=69,pa=73,qa=91,ra=103,sa=113,ta=666,ua=1,va=2,wa=3,xa=4,ya=3;D=[new s(0,0,0,0,n),new s(4,4,8,4,o),new s(4,5,16,8,o),new s(4,6,32,32,o),new s(4,4,16,16,p),new s(8,16,32,32,p),new s(8,16,128,128,p),new s(8,32,128,256,p),new s(32,128,258,1024,p),new s(32,258,258,4096,p)],c.deflateInit=z,c.deflateInit2=y,c.deflateReset=w,c.deflateResetKeep=v,c.deflateSetHeader=x,c.deflate=A,c.deflateEnd=B,c.deflateSetDictionary=C,c.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":62,"./adler32":64,"./crc32":66,"./messages":72,"./trees":73}],68:[function(a,b,c){"use strict";function d(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}b.exports=d},{}],69:[function(a,b,c){"use strict";var d=30,e=12;b.exports=function(a,b){var c,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C;c=a.state,f=a.next_in,B=a.input,g=f+(a.avail_in-5),h=a.next_out,C=a.output,i=h-(b-a.avail_out),j=h+(a.avail_out-257),k=c.dmax,l=c.wsize,m=c.whave,n=c.wnext,o=c.window,p=c.hold,q=c.bits,r=c.lencode,s=c.distcode,t=(1<<c.lenbits)-1,u=(1<<c.distbits)-1;a:do{q<15&&(p+=B[f++]<<q,q+=8,p+=B[f++]<<q,q+=8),v=r[p&t];b:for(;;){if(w=v>>>24,p>>>=w,q-=w,w=v>>>16&255,0===w)C[h++]=65535&v;else{if(!(16&w)){if(0===(64&w)){v=r[(65535&v)+(p&(1<<w)-1)];continue b}if(32&w){c.mode=e;break a}a.msg="invalid literal/length code",c.mode=d;break a}x=65535&v,w&=15,w&&(q<w&&(p+=B[f++]<<q,q+=8),x+=p&(1<<w)-1,p>>>=w,q-=w),q<15&&(p+=B[f++]<<q,q+=8,p+=B[f++]<<q,q+=8),v=s[p&u];c:for(;;){if(w=v>>>24,p>>>=w,q-=w,w=v>>>16&255,!(16&w)){if(0===(64&w)){v=s[(65535&v)+(p&(1<<w)-1)];continue c}a.msg="invalid distance code",c.mode=d;break a}if(y=65535&v,w&=15,q<w&&(p+=B[f++]<<q,q+=8,q<w&&(p+=B[f++]<<q,q+=8)),y+=p&(1<<w)-1,y>k){a.msg="invalid distance too far back",c.mode=d;break a}if(p>>>=w,q-=w,w=h-i,y>w){if(w=y-w,w>m&&c.sane){a.msg="invalid distance too far back",c.mode=d;break a}if(z=0,A=o,0===n){if(z+=l-w,w<x){x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}}else if(n<w){if(z+=l+n-w,w-=n,w<x){x-=w;do C[h++]=o[z++];while(--w);if(z=0,n<x){w=n,x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}}}else if(z+=n-w,w<x){x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}for(;x>2;)C[h++]=A[z++],C[h++]=A[z++],C[h++]=A[z++],x-=3;x&&(C[h++]=A[z++],x>1&&(C[h++]=A[z++]))}else{z=h-y;do C[h++]=C[z++],C[h++]=C[z++],C[h++]=C[z++],x-=3;while(x>2);x&&(C[h++]=C[z++],x>1&&(C[h++]=C[z++]))}break}}break}}while(f<g&&h<j);x=q>>3,f-=x,q-=x<<3,p&=(1<<q)-1,a.next_in=f,a.next_out=h,a.avail_in=f<g?5+(g-f):5-(f-g),a.avail_out=h<j?257+(j-h):257-(h-j),c.hold=p,c.bits=q}},{}],70:[function(a,b,c){"use strict";function d(a){return(a>>>24&255)+(a>>>8&65280)+((65280&a)<<8)+((255&a)<<24)}function e(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new s.Buf16(320),this.work=new s.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function f(a){var b;return a&&a.state?(b=a.state,a.total_in=a.total_out=b.total=0,a.msg="",b.wrap&&(a.adler=1&b.wrap),b.mode=L,b.last=0,b.havedict=0,b.dmax=32768,b.head=null,b.hold=0,b.bits=0,b.lencode=b.lendyn=new s.Buf32(pa),b.distcode=b.distdyn=new s.Buf32(qa),b.sane=1,b.back=-1,D):G}function g(a){var b;return a&&a.state?(b=a.state,b.wsize=0,b.whave=0,b.wnext=0,f(a)):G}function h(a,b){var c,d;return a&&a.state?(d=a.state,b<0?(c=0,b=-b):(c=(b>>4)+1,b<48&&(b&=15)),b&&(b<8||b>15)?G:(null!==d.window&&d.wbits!==b&&(d.window=null),d.wrap=c,d.wbits=b,g(a))):G}function i(a,b){var c,d;return a?(d=new e,a.state=d,d.window=null,c=h(a,b),c!==D&&(a.state=null),c):G}function j(a){return i(a,sa)}function k(a){if(ta){var b;for(q=new s.Buf32(512),r=new s.Buf32(32),b=0;b<144;)a.lens[b++]=8;for(;b<256;)a.lens[b++]=9;for(;b<280;)a.lens[b++]=7;for(;b<288;)a.lens[b++]=8;for(w(y,a.lens,0,288,q,0,a.work,{bits:9}),b=0;b<32;)a.lens[b++]=5;w(z,a.lens,0,32,r,0,a.work,{bits:5}),ta=!1}a.lencode=q,a.lenbits=9,a.distcode=r,a.distbits=5}function l(a,b,c,d){var e,f=a.state;return null===f.window&&(f.wsize=1<<f.wbits,f.wnext=0,f.whave=0,f.window=new s.Buf8(f.wsize)),d>=f.wsize?(s.arraySet(f.window,b,c-f.wsize,f.wsize,0),f.wnext=0,f.whave=f.wsize):(e=f.wsize-f.wnext,e>d&&(e=d),s.arraySet(f.window,b,c-d,e,f.wnext),d-=e,d?(s.arraySet(f.window,b,c-d,d,0),f.wnext=d,f.whave=f.wsize):(f.wnext+=e,f.wnext===f.wsize&&(f.wnext=0),f.whave<f.wsize&&(f.whave+=e))),0}function m(a,b){var c,e,f,g,h,i,j,m,n,o,p,q,r,pa,qa,ra,sa,ta,ua,va,wa,xa,ya,za,Aa=0,Ba=new s.Buf8(4),Ca=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!a||!a.state||!a.output||!a.input&&0!==a.avail_in)return G;c=a.state,c.mode===W&&(c.mode=X),h=a.next_out,f=a.output,j=a.avail_out,g=a.next_in,e=a.input,i=a.avail_in,m=c.hold,n=c.bits,o=i,p=j,xa=D;a:for(;;)switch(c.mode){case L:if(0===c.wrap){c.mode=X;break}for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(2&c.wrap&&35615===m){c.check=0,Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0),m=0,n=0,c.mode=M;break}if(c.flags=0,c.head&&(c.head.done=!1),!(1&c.wrap)||(((255&m)<<8)+(m>>8))%31){a.msg="incorrect header check",c.mode=ma;break}if((15&m)!==K){a.msg="unknown compression method",c.mode=ma;break}if(m>>>=4,n-=4,wa=(15&m)+8,0===c.wbits)c.wbits=wa;else if(wa>c.wbits){a.msg="invalid window size",c.mode=ma;break}c.dmax=1<<wa,a.adler=c.check=1,c.mode=512&m?U:W,m=0,n=0;break;case M:for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(c.flags=m,(255&c.flags)!==K){a.msg="unknown compression method",c.mode=ma;break}if(57344&c.flags){a.msg="unknown header flags set",c.mode=ma;break}c.head&&(c.head.text=m>>8&1),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0,c.mode=N;case N:for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.head&&(c.head.time=m),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,Ba[2]=m>>>16&255,Ba[3]=m>>>24&255,c.check=u(c.check,Ba,4,0)),m=0,n=0,c.mode=O;case O:for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.head&&(c.head.xflags=255&m,c.head.os=m>>8),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0,c.mode=P;case P:if(1024&c.flags){for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.length=m,c.head&&(c.head.extra_len=m),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0}else c.head&&(c.head.extra=null);c.mode=Q;case Q:if(1024&c.flags&&(q=c.length,q>i&&(q=i),q&&(c.head&&(wa=c.head.extra_len-c.length,c.head.extra||(c.head.extra=new Array(c.head.extra_len)),s.arraySet(c.head.extra,e,g,q,wa)),512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,c.length-=q),c.length))break a;c.length=0,c.mode=R;case R:if(2048&c.flags){if(0===i)break a;q=0;do wa=e[g+q++],c.head&&wa&&c.length<65536&&(c.head.name+=String.fromCharCode(wa));while(wa&&q<i);if(512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,wa)break a}else c.head&&(c.head.name=null);c.length=0,c.mode=S;case S:if(4096&c.flags){if(0===i)break a;q=0;do wa=e[g+q++],c.head&&wa&&c.length<65536&&(c.head.comment+=String.fromCharCode(wa));while(wa&&q<i);if(512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,wa)break a}else c.head&&(c.head.comment=null);c.mode=T;case T:if(512&c.flags){for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m!==(65535&c.check)){a.msg="header crc mismatch",c.mode=ma;break}m=0,n=0}c.head&&(c.head.hcrc=c.flags>>9&1,c.head.done=!0),a.adler=c.check=0,c.mode=W;break;case U:for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}a.adler=c.check=d(m),m=0,n=0,c.mode=V;case V:if(0===c.havedict)return a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,F;a.adler=c.check=1,c.mode=W;case W:if(b===B||b===C)break a;case X:if(c.last){m>>>=7&n,n-=7&n,c.mode=ja;break}for(;n<3;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}switch(c.last=1&m,m>>>=1,n-=1,3&m){case 0:c.mode=Y;break;case 1:if(k(c),c.mode=ca,b===C){m>>>=2,n-=2;break a}break;case 2:c.mode=_;break;case 3:a.msg="invalid block type",c.mode=ma}m>>>=2,n-=2;break;case Y:for(m>>>=7&n,n-=7&n;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if((65535&m)!==(m>>>16^65535)){a.msg="invalid stored block lengths",c.mode=ma;break}if(c.length=65535&m,m=0,n=0,c.mode=Z,b===C)break a;case Z:c.mode=$;case $:if(q=c.length){if(q>i&&(q=i),q>j&&(q=j),0===q)break a;s.arraySet(f,e,g,q,h),i-=q,g+=q,j-=q,h+=q,c.length-=q;break}c.mode=W;break;case _:for(;n<14;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(c.nlen=(31&m)+257,m>>>=5,n-=5,c.ndist=(31&m)+1,m>>>=5,n-=5,c.ncode=(15&m)+4,m>>>=4,n-=4,c.nlen>286||c.ndist>30){a.msg="too many length or distance symbols",c.mode=ma;break}c.have=0,c.mode=aa;case aa:for(;c.have<c.ncode;){for(;n<3;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.lens[Ca[c.have++]]=7&m,m>>>=3,n-=3}for(;c.have<19;)c.lens[Ca[c.have++]]=0;if(c.lencode=c.lendyn,c.lenbits=7,ya={bits:c.lenbits},xa=w(x,c.lens,0,19,c.lencode,0,c.work,ya),c.lenbits=ya.bits,xa){a.msg="invalid code lengths set",c.mode=ma;break}c.have=0,c.mode=ba;case ba:for(;c.have<c.nlen+c.ndist;){for(;Aa=c.lencode[m&(1<<c.lenbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(sa<16)m>>>=qa,n-=qa,c.lens[c.have++]=sa;else{if(16===sa){for(za=qa+2;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m>>>=qa,n-=qa,0===c.have){a.msg="invalid bit length repeat",c.mode=ma;break}wa=c.lens[c.have-1],q=3+(3&m),m>>>=2,n-=2}else if(17===sa){for(za=qa+3;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=qa,n-=qa,wa=0,q=3+(7&m),m>>>=3,n-=3}else{for(za=qa+7;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=qa,n-=qa,wa=0,q=11+(127&m),m>>>=7,n-=7}if(c.have+q>c.nlen+c.ndist){a.msg="invalid bit length repeat",c.mode=ma;break}for(;q--;)c.lens[c.have++]=wa}}if(c.mode===ma)break;if(0===c.lens[256]){a.msg="invalid code -- missing end-of-block",c.mode=ma;break}if(c.lenbits=9,ya={bits:c.lenbits},xa=w(y,c.lens,0,c.nlen,c.lencode,0,c.work,ya),c.lenbits=ya.bits,xa){a.msg="invalid literal/lengths set",c.mode=ma;break}if(c.distbits=6,c.distcode=c.distdyn,ya={bits:c.distbits},xa=w(z,c.lens,c.nlen,c.ndist,c.distcode,0,c.work,ya),c.distbits=ya.bits,xa){a.msg="invalid distances set",c.mode=ma;break}if(c.mode=ca,b===C)break a;case ca:c.mode=da;case da:if(i>=6&&j>=258){a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,v(a,p),h=a.next_out,f=a.output,j=a.avail_out,g=a.next_in,e=a.input,i=a.avail_in,m=c.hold,n=c.bits,c.mode===W&&(c.back=-1);break}for(c.back=0;Aa=c.lencode[m&(1<<c.lenbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(ra&&0===(240&ra)){for(ta=qa,ua=ra,va=sa;Aa=c.lencode[va+((m&(1<<ta+ua)-1)>>ta)],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(ta+qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=ta,n-=ta,c.back+=ta}if(m>>>=qa,n-=qa,c.back+=qa,c.length=sa,0===ra){c.mode=ia;break}if(32&ra){c.back=-1,c.mode=W;break}if(64&ra){a.msg="invalid literal/length code",c.mode=ma;break}c.extra=15&ra,c.mode=ea;case ea:if(c.extra){for(za=c.extra;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.length+=m&(1<<c.extra)-1,m>>>=c.extra,n-=c.extra,c.back+=c.extra}c.was=c.length,c.mode=fa;case fa:for(;Aa=c.distcode[m&(1<<c.distbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(0===(240&ra)){for(ta=qa,ua=ra,va=sa;Aa=c.distcode[va+((m&(1<<ta+ua)-1)>>ta)],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(ta+qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=ta,n-=ta,c.back+=ta}if(m>>>=qa,n-=qa,c.back+=qa,64&ra){a.msg="invalid distance code",c.mode=ma;break}c.offset=sa,c.extra=15&ra,c.mode=ga;case ga:if(c.extra){for(za=c.extra;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.offset+=m&(1<<c.extra)-1,m>>>=c.extra,n-=c.extra,c.back+=c.extra}if(c.offset>c.dmax){a.msg="invalid distance too far back",c.mode=ma;break}c.mode=ha;case ha:if(0===j)break a;if(q=p-j,c.offset>q){if(q=c.offset-q,q>c.whave&&c.sane){a.msg="invalid distance too far back",c.mode=ma;break}q>c.wnext?(q-=c.wnext,r=c.wsize-q):r=c.wnext-q,q>c.length&&(q=c.length),pa=c.window}else pa=f,r=h-c.offset,q=c.length;q>j&&(q=j),j-=q,c.length-=q;do f[h++]=pa[r++];while(--q);0===c.length&&(c.mode=da);break;case ia:if(0===j)break a;f[h++]=c.length,j--,c.mode=da;break;case ja:if(c.wrap){for(;n<32;){if(0===i)break a;i--,m|=e[g++]<<n,n+=8}if(p-=j,a.total_out+=p,c.total+=p,p&&(a.adler=c.check=c.flags?u(c.check,f,p,h-p):t(c.check,f,p,h-p)),p=j,(c.flags?m:d(m))!==c.check){a.msg="incorrect data check",c.mode=ma;break}m=0,n=0}c.mode=ka;case ka:if(c.wrap&&c.flags){for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m!==(4294967295&c.total)){a.msg="incorrect length check",c.mode=ma;break}m=0,n=0}c.mode=la;case la:xa=E;break a;case ma:xa=H;break a;case na:return I;case oa:default:return G}return a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,(c.wsize||p!==a.avail_out&&c.mode<ma&&(c.mode<ja||b!==A))&&l(a,a.output,a.next_out,p-a.avail_out)?(c.mode=na,I):(o-=a.avail_in,p-=a.avail_out,a.total_in+=o,a.total_out+=p,c.total+=p,c.wrap&&p&&(a.adler=c.check=c.flags?u(c.check,f,p,a.next_out-p):t(c.check,f,p,a.next_out-p)),a.data_type=c.bits+(c.last?64:0)+(c.mode===W?128:0)+(c.mode===ca||c.mode===Z?256:0),(0===o&&0===p||b===A)&&xa===D&&(xa=J),xa)}function n(a){if(!a||!a.state)return G;var b=a.state;return b.window&&(b.window=null),a.state=null,D}function o(a,b){var c;return a&&a.state?(c=a.state,0===(2&c.wrap)?G:(c.head=b,b.done=!1,D)):G}function p(a,b){var c,d,e,f=b.length;return a&&a.state?(c=a.state,0!==c.wrap&&c.mode!==V?G:c.mode===V&&(d=1,d=t(d,b,f,0),d!==c.check)?H:(e=l(a,b,f,f))?(c.mode=na,I):(c.havedict=1,D)):G}var q,r,s=a("../utils/common"),t=a("./adler32"),u=a("./crc32"),v=a("./inffast"),w=a("./inftrees"),x=0,y=1,z=2,A=4,B=5,C=6,D=0,E=1,F=2,G=-2,H=-3,I=-4,J=-5,K=8,L=1,M=2,N=3,O=4,P=5,Q=6,R=7,S=8,T=9,U=10,V=11,W=12,X=13,Y=14,Z=15,$=16,_=17,aa=18,ba=19,ca=20,da=21,ea=22,fa=23,ga=24,ha=25,ia=26,ja=27,ka=28,la=29,ma=30,na=31,oa=32,pa=852,qa=592,ra=15,sa=ra,ta=!0;c.inflateReset=g,c.inflateReset2=h,c.inflateResetKeep=f,c.inflateInit=j,c.inflateInit2=i,c.inflate=m,c.inflateEnd=n,c.inflateGetHeader=o,c.inflateSetDictionary=p,c.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":62,"./adler32":64,"./crc32":66,"./inffast":69,"./inftrees":71}],71:[function(a,b,c){"use strict";var d=a("../utils/common"),e=15,f=852,g=592,h=0,i=1,j=2,k=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],l=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],m=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],n=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];b.exports=function(a,b,c,o,p,q,r,s){var t,u,v,w,x,y,z,A,B,C=s.bits,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=null,O=0,P=new d.Buf16(e+1),Q=new d.Buf16(e+1),R=null,S=0;for(D=0;D<=e;D++)P[D]=0;for(E=0;E<o;E++)P[b[c+E]]++;for(H=C,G=e;G>=1&&0===P[G];G--);if(H>G&&(H=G),0===G)return p[q++]=20971520,p[q++]=20971520,s.bits=1,0;for(F=1;F<G&&0===P[F];F++);for(H<F&&(H=F),K=1,D=1;D<=e;D++)if(K<<=1,K-=P[D],K<0)return-1;if(K>0&&(a===h||1!==G))return-1;for(Q[1]=0,D=1;D<e;D++)Q[D+1]=Q[D]+P[D];for(E=0;E<o;E++)0!==b[c+E]&&(r[Q[b[c+E]]++]=E);if(a===h?(N=R=r,y=19):a===i?(N=k,O-=257,R=l,S-=257,y=256):(N=m,R=n,y=-1),M=0,E=0,D=F,x=q,I=H,J=0,v=-1,L=1<<H,w=L-1,a===i&&L>f||a===j&&L>g)return 1;for(;;){z=D-J,r[E]<y?(A=0,B=r[E]):r[E]>y?(A=R[S+r[E]],B=N[O+r[E]]):(A=96,B=0),t=1<<D-J,u=1<<I,F=u;do u-=t,p[x+(M>>J)+u]=z<<24|A<<16|B|0;while(0!==u);for(t=1<<D-1;M&t;)t>>=1;if(0!==t?(M&=t-1,M+=t):M=0,E++,0===--P[D]){if(D===G)break;D=b[c+r[E]]}if(D>H&&(M&w)!==v){for(0===J&&(J=H),x+=F,I=D-J,K=1<<I;I+J<G&&(K-=P[I+J],!(K<=0));)I++,K<<=1;if(L+=1<<I,a===i&&L>f||a===j&&L>g)return 1;v=M&w,p[v]=H<<24|I<<16|x-q|0}}return 0!==M&&(p[x+M]=D-J<<24|64<<16|0),s.bits=H,0}},{"../utils/common":62}],72:[function(a,b,c){"use strict";b.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],73:[function(a,b,c){"use strict";function d(a){for(var b=a.length;--b>=0;)a[b]=0}function e(a,b,c,d,e){this.static_tree=a,this.extra_bits=b,this.extra_base=c,this.elems=d,this.max_length=e,this.has_stree=a&&a.length}function f(a,b){this.dyn_tree=a,this.max_code=0,this.stat_desc=b}function g(a){return a<256?ia[a]:ia[256+(a>>>7)]}function h(a,b){a.pending_buf[a.pending++]=255&b,a.pending_buf[a.pending++]=b>>>8&255}function i(a,b,c){a.bi_valid>X-c?(a.bi_buf|=b<<a.bi_valid&65535,h(a,a.bi_buf),a.bi_buf=b>>X-a.bi_valid,a.bi_valid+=c-X):(a.bi_buf|=b<<a.bi_valid&65535,a.bi_valid+=c)}function j(a,b,c){i(a,c[2*b],c[2*b+1])}function k(a,b){var c=0;do c|=1&a,a>>>=1,c<<=1;while(--b>0);return c>>>1}function l(a){16===a.bi_valid?(h(a,a.bi_buf),a.bi_buf=0,a.bi_valid=0):a.bi_valid>=8&&(a.pending_buf[a.pending++]=255&a.bi_buf,a.bi_buf>>=8,a.bi_valid-=8)}function m(a,b){var c,d,e,f,g,h,i=b.dyn_tree,j=b.max_code,k=b.stat_desc.static_tree,l=b.stat_desc.has_stree,m=b.stat_desc.extra_bits,n=b.stat_desc.extra_base,o=b.stat_desc.max_length,p=0;for(f=0;f<=W;f++)a.bl_count[f]=0;for(i[2*a.heap[a.heap_max]+1]=0,
c=a.heap_max+1;c<V;c++)d=a.heap[c],f=i[2*i[2*d+1]+1]+1,f>o&&(f=o,p++),i[2*d+1]=f,d>j||(a.bl_count[f]++,g=0,d>=n&&(g=m[d-n]),h=i[2*d],a.opt_len+=h*(f+g),l&&(a.static_len+=h*(k[2*d+1]+g)));if(0!==p){do{for(f=o-1;0===a.bl_count[f];)f--;a.bl_count[f]--,a.bl_count[f+1]+=2,a.bl_count[o]--,p-=2}while(p>0);for(f=o;0!==f;f--)for(d=a.bl_count[f];0!==d;)e=a.heap[--c],e>j||(i[2*e+1]!==f&&(a.opt_len+=(f-i[2*e+1])*i[2*e],i[2*e+1]=f),d--)}}function n(a,b,c){var d,e,f=new Array(W+1),g=0;for(d=1;d<=W;d++)f[d]=g=g+c[d-1]<<1;for(e=0;e<=b;e++){var h=a[2*e+1];0!==h&&(a[2*e]=k(f[h]++,h))}}function o(){var a,b,c,d,f,g=new Array(W+1);for(c=0,d=0;d<Q-1;d++)for(ka[d]=c,a=0;a<1<<ba[d];a++)ja[c++]=d;for(ja[c-1]=d,f=0,d=0;d<16;d++)for(la[d]=f,a=0;a<1<<ca[d];a++)ia[f++]=d;for(f>>=7;d<T;d++)for(la[d]=f<<7,a=0;a<1<<ca[d]-7;a++)ia[256+f++]=d;for(b=0;b<=W;b++)g[b]=0;for(a=0;a<=143;)ga[2*a+1]=8,a++,g[8]++;for(;a<=255;)ga[2*a+1]=9,a++,g[9]++;for(;a<=279;)ga[2*a+1]=7,a++,g[7]++;for(;a<=287;)ga[2*a+1]=8,a++,g[8]++;for(n(ga,S+1,g),a=0;a<T;a++)ha[2*a+1]=5,ha[2*a]=k(a,5);ma=new e(ga,ba,R+1,S,W),na=new e(ha,ca,0,T,W),oa=new e(new Array(0),da,0,U,Y)}function p(a){var b;for(b=0;b<S;b++)a.dyn_ltree[2*b]=0;for(b=0;b<T;b++)a.dyn_dtree[2*b]=0;for(b=0;b<U;b++)a.bl_tree[2*b]=0;a.dyn_ltree[2*Z]=1,a.opt_len=a.static_len=0,a.last_lit=a.matches=0}function q(a){a.bi_valid>8?h(a,a.bi_buf):a.bi_valid>0&&(a.pending_buf[a.pending++]=a.bi_buf),a.bi_buf=0,a.bi_valid=0}function r(a,b,c,d){q(a),d&&(h(a,c),h(a,~c)),G.arraySet(a.pending_buf,a.window,b,c,a.pending),a.pending+=c}function s(a,b,c,d){var e=2*b,f=2*c;return a[e]<a[f]||a[e]===a[f]&&d[b]<=d[c]}function t(a,b,c){for(var d=a.heap[c],e=c<<1;e<=a.heap_len&&(e<a.heap_len&&s(b,a.heap[e+1],a.heap[e],a.depth)&&e++,!s(b,d,a.heap[e],a.depth));)a.heap[c]=a.heap[e],c=e,e<<=1;a.heap[c]=d}function u(a,b,c){var d,e,f,h,k=0;if(0!==a.last_lit)do d=a.pending_buf[a.d_buf+2*k]<<8|a.pending_buf[a.d_buf+2*k+1],e=a.pending_buf[a.l_buf+k],k++,0===d?j(a,e,b):(f=ja[e],j(a,f+R+1,b),h=ba[f],0!==h&&(e-=ka[f],i(a,e,h)),d--,f=g(d),j(a,f,c),h=ca[f],0!==h&&(d-=la[f],i(a,d,h)));while(k<a.last_lit);j(a,Z,b)}function v(a,b){var c,d,e,f=b.dyn_tree,g=b.stat_desc.static_tree,h=b.stat_desc.has_stree,i=b.stat_desc.elems,j=-1;for(a.heap_len=0,a.heap_max=V,c=0;c<i;c++)0!==f[2*c]?(a.heap[++a.heap_len]=j=c,a.depth[c]=0):f[2*c+1]=0;for(;a.heap_len<2;)e=a.heap[++a.heap_len]=j<2?++j:0,f[2*e]=1,a.depth[e]=0,a.opt_len--,h&&(a.static_len-=g[2*e+1]);for(b.max_code=j,c=a.heap_len>>1;c>=1;c--)t(a,f,c);e=i;do c=a.heap[1],a.heap[1]=a.heap[a.heap_len--],t(a,f,1),d=a.heap[1],a.heap[--a.heap_max]=c,a.heap[--a.heap_max]=d,f[2*e]=f[2*c]+f[2*d],a.depth[e]=(a.depth[c]>=a.depth[d]?a.depth[c]:a.depth[d])+1,f[2*c+1]=f[2*d+1]=e,a.heap[1]=e++,t(a,f,1);while(a.heap_len>=2);a.heap[--a.heap_max]=a.heap[1],m(a,b),n(f,j,a.bl_count)}function w(a,b,c){var d,e,f=-1,g=b[1],h=0,i=7,j=4;for(0===g&&(i=138,j=3),b[2*(c+1)+1]=65535,d=0;d<=c;d++)e=g,g=b[2*(d+1)+1],++h<i&&e===g||(h<j?a.bl_tree[2*e]+=h:0!==e?(e!==f&&a.bl_tree[2*e]++,a.bl_tree[2*$]++):h<=10?a.bl_tree[2*_]++:a.bl_tree[2*aa]++,h=0,f=e,0===g?(i=138,j=3):e===g?(i=6,j=3):(i=7,j=4))}function x(a,b,c){var d,e,f=-1,g=b[1],h=0,k=7,l=4;for(0===g&&(k=138,l=3),d=0;d<=c;d++)if(e=g,g=b[2*(d+1)+1],!(++h<k&&e===g)){if(h<l){do j(a,e,a.bl_tree);while(0!==--h)}else 0!==e?(e!==f&&(j(a,e,a.bl_tree),h--),j(a,$,a.bl_tree),i(a,h-3,2)):h<=10?(j(a,_,a.bl_tree),i(a,h-3,3)):(j(a,aa,a.bl_tree),i(a,h-11,7));h=0,f=e,0===g?(k=138,l=3):e===g?(k=6,l=3):(k=7,l=4)}}function y(a){var b;for(w(a,a.dyn_ltree,a.l_desc.max_code),w(a,a.dyn_dtree,a.d_desc.max_code),v(a,a.bl_desc),b=U-1;b>=3&&0===a.bl_tree[2*ea[b]+1];b--);return a.opt_len+=3*(b+1)+5+5+4,b}function z(a,b,c,d){var e;for(i(a,b-257,5),i(a,c-1,5),i(a,d-4,4),e=0;e<d;e++)i(a,a.bl_tree[2*ea[e]+1],3);x(a,a.dyn_ltree,b-1),x(a,a.dyn_dtree,c-1)}function A(a){var b,c=4093624447;for(b=0;b<=31;b++,c>>>=1)if(1&c&&0!==a.dyn_ltree[2*b])return I;if(0!==a.dyn_ltree[18]||0!==a.dyn_ltree[20]||0!==a.dyn_ltree[26])return J;for(b=32;b<R;b++)if(0!==a.dyn_ltree[2*b])return J;return I}function B(a){pa||(o(),pa=!0),a.l_desc=new f(a.dyn_ltree,ma),a.d_desc=new f(a.dyn_dtree,na),a.bl_desc=new f(a.bl_tree,oa),a.bi_buf=0,a.bi_valid=0,p(a)}function C(a,b,c,d){i(a,(L<<1)+(d?1:0),3),r(a,b,c,!0)}function D(a){i(a,M<<1,3),j(a,Z,ga),l(a)}function E(a,b,c,d){var e,f,g=0;a.level>0?(a.strm.data_type===K&&(a.strm.data_type=A(a)),v(a,a.l_desc),v(a,a.d_desc),g=y(a),e=a.opt_len+3+7>>>3,f=a.static_len+3+7>>>3,f<=e&&(e=f)):e=f=c+5,c+4<=e&&b!==-1?C(a,b,c,d):a.strategy===H||f===e?(i(a,(M<<1)+(d?1:0),3),u(a,ga,ha)):(i(a,(N<<1)+(d?1:0),3),z(a,a.l_desc.max_code+1,a.d_desc.max_code+1,g+1),u(a,a.dyn_ltree,a.dyn_dtree)),p(a),d&&q(a)}function F(a,b,c){return a.pending_buf[a.d_buf+2*a.last_lit]=b>>>8&255,a.pending_buf[a.d_buf+2*a.last_lit+1]=255&b,a.pending_buf[a.l_buf+a.last_lit]=255&c,a.last_lit++,0===b?a.dyn_ltree[2*c]++:(a.matches++,b--,a.dyn_ltree[2*(ja[c]+R+1)]++,a.dyn_dtree[2*g(b)]++),a.last_lit===a.lit_bufsize-1}var G=a("../utils/common"),H=4,I=0,J=1,K=2,L=0,M=1,N=2,O=3,P=258,Q=29,R=256,S=R+1+Q,T=30,U=19,V=2*S+1,W=15,X=16,Y=7,Z=256,$=16,_=17,aa=18,ba=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ca=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],da=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],ea=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],fa=512,ga=new Array(2*(S+2));d(ga);var ha=new Array(2*T);d(ha);var ia=new Array(fa);d(ia);var ja=new Array(P-O+1);d(ja);var ka=new Array(Q);d(ka);var la=new Array(T);d(la);var ma,na,oa,pa=!1;c._tr_init=B,c._tr_stored_block=C,c._tr_flush_block=E,c._tr_tally=F,c._tr_align=D},{"../utils/common":62}],74:[function(a,b,c){"use strict";function d(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}b.exports=d},{}]},{},[10])(10)});/*!

JSZipUtils - A collection of cross-browser utilities to go along with JSZip.
<http://stuk.github.io/jszip-utils>

(c) 2014 Stuart Knightley, David Duponchel
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip-utils/master/LICENSE.markdown.

*/
!function(a){"object"==typeof exports?module.exports=a():"function"==typeof define&&define.amd?define(a):"undefined"!=typeof window?window.JSZipUtils=a():"undefined"!=typeof global?global.JSZipUtils=a():"undefined"!=typeof self&&(self.JSZipUtils=a())}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){"use strict";function c(){try{return new window.XMLHttpRequest}catch(a){}}function d(){try{return new window.ActiveXObject("Microsoft.XMLHTTP")}catch(a){}}var e={};e._getBinaryFromXHR=function(a){return a.response||a.responseText};var f=window.ActiveXObject?function(){return c()||d()}:c;e.getBinaryContent=function(a,b){try{var c=f();c.open("GET",a,!0),"responseType"in c&&(c.responseType="arraybuffer"),c.overrideMimeType&&c.overrideMimeType("text/plain; charset=x-user-defined"),c.onreadystatechange=function(){var d,f;if(4===c.readyState)if(200===c.status||0===c.status){d=null,f=null;try{d=e._getBinaryFromXHR(c)}catch(g){f=new Error(g)}b(f,d)}else b(new Error("Ajax error for "+a+" : "+this.status+" "+this.statusText),null)},c.send()}catch(d){b(new Error(d),null)}},b.exports=e},{}]},{},[1])(1)});
(function(l){function m(b){b=void 0===b?"utf-8":b;if("utf-8"!==b)throw new RangeError("Failed to construct 'TextEncoder': The encoding label provided ('"+b+"') is invalid.");}function k(b,a){b='utf-8';b=void 0===b?"utf-8":b;a=void 0===a?{fatal:!1}:a;if("utf-8"!==b)throw new RangeError("Failed to construct 'TextDecoder': The encoding label provided ('"+b+"') is invalid.");if(a.fatal)throw Error("Failed to construct 'TextDecoder': the 'fatal' option is unsupported.");}if(l.TextEncoder&&l.TextDecoder)return!1;
Object.defineProperty(m.prototype,"encoding",{value:"utf-8"});m.prototype.encode=function(b,a){a=void 0===a?{stream:!1}:a;if(a.stream)throw Error("Failed to encode: the 'stream' option is unsupported.");a=0;for(var h=b.length,f=0,c=Math.max(32,h+(h>>1)+7),e=new Uint8Array(c>>3<<3);a<h;){var d=b.charCodeAt(a++);if(55296<=d&&56319>=d){if(a<h){var g=b.charCodeAt(a);56320===(g&64512)&&(++a,d=((d&1023)<<10)+(g&1023)+65536)}if(55296<=d&&56319>=d)continue}f+4>e.length&&(c+=8,c*=1+a/b.length*2,c=c>>3<<3,
g=new Uint8Array(c),g.set(e),e=g);if(0===(d&4294967168))e[f++]=d;else{if(0===(d&4294965248))e[f++]=d>>6&31|192;else if(0===(d&4294901760))e[f++]=d>>12&15|224,e[f++]=d>>6&63|128;else if(0===(d&4292870144))e[f++]=d>>18&7|240,e[f++]=d>>12&63|128,e[f++]=d>>6&63|128;else continue;e[f++]=d&63|128}}return e.slice(0,f)};Object.defineProperty(k.prototype,"encoding",{value:"utf-8"});Object.defineProperty(k.prototype,"fatal",{value:!1});Object.defineProperty(k.prototype,"ignoreBOM",{value:!1});k.prototype.decode=
function(b,a){a=void 0===a?{stream:!1}:a;if(a.stream)throw Error("Failed to decode: the 'stream' option is unsupported.");b=new Uint8Array(b);a=0;for(var h=b.length,f=[];a<h;){var c=b[a++];if(0===c)break;if(0===(c&128))f.push(c);else if(192===(c&224)){var e=b[a++]&63;f.push((c&31)<<6|e)}else if(224===(c&240)){e=b[a++]&63;var d=b[a++]&63;f.push((c&31)<<12|e<<6|d)}else if(240===(c&248)){e=b[a++]&63;d=b[a++]&63;var g=b[a++]&63;c=(c&7)<<18|e<<12|d<<6|g;65535<c&&(c-=65536,f.push(c>>>10&1023|55296),c=56320|
c&1023);f.push(c)}}return String.fromCharCode.apply(null,f)};l.TextEncoder=m;l.TextDecoder=k})("undefined"!==typeof window?window:"undefined"!==typeof global?global:this);
