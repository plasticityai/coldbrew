
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
   "end": 4416959,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site-packages/ColdbrewHTTPShim.py",
   "start": 4416959,
   "end": 4421219,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site-packages/_socket.py",
   "start": 4421219,
   "end": 4422786,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site-packages/select.py",
   "start": 4422786,
   "end": 4422862,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site-packages/Coldbrew.py",
   "start": 4422862,
   "end": 4427566,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site-packages/README",
   "start": 4427566,
   "end": 4427685,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/refactor.py",
   "start": 4427685,
   "end": 4455719,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/Grammar3.5.2.final.0.pickle",
   "start": 4455719,
   "end": 4477337,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/PatternGrammar.txt",
   "start": 4477337,
   "end": 4478130,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pygram.py",
   "start": 4478130,
   "end": 4479244,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixer_util.py",
   "start": 4479244,
   "end": 4494481,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/PatternGrammar3.5.2.final.0.pickle",
   "start": 4494481,
   "end": 4495936,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/__main__.py",
   "start": 4495936,
   "end": 4496003,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/patcomp.py",
   "start": 4496003,
   "end": 4503073,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/__init__.py",
   "start": 4503073,
   "end": 4503080,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pytree.py",
   "start": 4503080,
   "end": 4531132,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/Grammar.txt",
   "start": 4531132,
   "end": 4537883,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixer_base.py",
   "start": 4537883,
   "end": 4544588,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/main.py",
   "start": 4544588,
   "end": 4556226,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/btm_matcher.py",
   "start": 4556226,
   "end": 4563059,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/btm_utils.py",
   "start": 4563059,
   "end": 4573025,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/grammar.py",
   "start": 4573025,
   "end": 4578391,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/parse.py",
   "start": 4578391,
   "end": 4586444,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/token.py",
   "start": 4586444,
   "end": 4587730,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/literals.py",
   "start": 4587730,
   "end": 4589345,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/conv.py",
   "start": 4589345,
   "end": 4598987,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/__init__.py",
   "start": 4598987,
   "end": 4599130,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/pgen.py",
   "start": 4599130,
   "end": 4612910,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/tokenize.py",
   "start": 4612910,
   "end": 4634714,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/driver.py",
   "start": 4634714,
   "end": 4639867,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_xrange.py",
   "start": 4639867,
   "end": 4642561,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_ws_comma.py",
   "start": 4642561,
   "end": 4643651,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_long.py",
   "start": 4643651,
   "end": 4644127,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_urllib.py",
   "start": 4644127,
   "end": 4652511,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_itertools_imports.py",
   "start": 4652511,
   "end": 4654597,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_throw.py",
   "start": 4654597,
   "end": 4656179,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_repr.py",
   "start": 4656179,
   "end": 4656792,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_types.py",
   "start": 4656792,
   "end": 4658589,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_print.py",
   "start": 4658589,
   "end": 4661443,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_ne.py",
   "start": 4661443,
   "end": 4662014,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_renames.py",
   "start": 4662014,
   "end": 4664235,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_raw_input.py",
   "start": 4664235,
   "end": 4664689,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_funcattrs.py",
   "start": 4664689,
   "end": 4665333,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_methodattrs.py",
   "start": 4665333,
   "end": 4665939,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_xreadlines.py",
   "start": 4665939,
   "end": 4666628,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_unicode.py",
   "start": 4666628,
   "end": 4667884,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_itertools.py",
   "start": 4667884,
   "end": 4669432,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_basestring.py",
   "start": 4669432,
   "end": 4669752,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_reduce.py",
   "start": 4669752,
   "end": 4670589,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_dict.py",
   "start": 4670589,
   "end": 4674400,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_idioms.py",
   "start": 4674400,
   "end": 4679276,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_apply.py",
   "start": 4679276,
   "end": 4681177,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_next.py",
   "start": 4681177,
   "end": 4684351,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_filter.py",
   "start": 4684351,
   "end": 4686453,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_paren.py",
   "start": 4686453,
   "end": 4687680,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_operator.py",
   "start": 4687680,
   "end": 4691151,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_standarderror.py",
   "start": 4691151,
   "end": 4691600,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/__init__.py",
   "start": 4691600,
   "end": 4691647,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_buffer.py",
   "start": 4691647,
   "end": 4692237,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_input.py",
   "start": 4692237,
   "end": 4692945,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_callable.py",
   "start": 4692945,
   "end": 4694096,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_metaclass.py",
   "start": 4694096,
   "end": 4702299,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_exitfunc.py",
   "start": 4702299,
   "end": 4704794,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_exec.py",
   "start": 4704794,
   "end": 4705795,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_future.py",
   "start": 4705795,
   "end": 4706342,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_raise.py",
   "start": 4706342,
   "end": 4709268,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_imports.py",
   "start": 4709268,
   "end": 4714952,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_sys_exc.py",
   "start": 4714952,
   "end": 4715986,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_zip.py",
   "start": 4715986,
   "end": 4716888,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_intern.py",
   "start": 4716888,
   "end": 4717662,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_has_key.py",
   "start": 4717662,
   "end": 4720884,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_tuple_params.py",
   "start": 4720884,
   "end": 4726449,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_getcwdu.py",
   "start": 4726449,
   "end": 4726900,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_execfile.py",
   "start": 4726900,
   "end": 4728890,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_numliterals.py",
   "start": 4728890,
   "end": 4729658,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_imports2.py",
   "start": 4729658,
   "end": 4729947,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_reload.py",
   "start": 4729947,
   "end": 4730640,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_asserts.py",
   "start": 4730640,
   "end": 4731624,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_import.py",
   "start": 4731624,
   "end": 4734880,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_except.py",
   "start": 4734880,
   "end": 4738224,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_nonzero.py",
   "start": 4738224,
   "end": 4738821,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_isinstance.py",
   "start": 4738821,
   "end": 4740429,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_set_literal.py",
   "start": 4740429,
   "end": 4742126,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_map.py",
   "start": 4742126,
   "end": 4745184,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xmlrpc/server.py",
   "start": 4745184,
   "end": 4781823,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xmlrpc/client.py",
   "start": 4781823,
   "end": 4830121,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xmlrpc/__init__.py",
   "start": 4830121,
   "end": 4830159,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/html/__init__.py",
   "start": 4830159,
   "end": 4834915,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/html/parser.py",
   "start": 4834915,
   "end": 4852642,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/html/entities.py",
   "start": 4852642,
   "end": 4927957,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/windows_events.py",
   "start": 4927957,
   "end": 4955651,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/constants.py",
   "start": 4955651,
   "end": 4955846,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/futures.py",
   "start": 4955846,
   "end": 4972438,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/tasks.py",
   "start": 4972438,
   "end": 4998005,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/coroutines.py",
   "start": 4998005,
   "end": 5007598,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/proactor_events.py",
   "start": 5007598,
   "end": 5027545,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/transports.py",
   "start": 5027545,
   "end": 5037398,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/compat.py",
   "start": 5037398,
   "end": 5037941,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/windows_utils.py",
   "start": 5037941,
   "end": 5044785,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/protocols.py",
   "start": 5044785,
   "end": 5049297,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/events.py",
   "start": 5049297,
   "end": 5070802,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/sslproto.py",
   "start": 5070802,
   "end": 5096237,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/__init__.py",
   "start": 5096237,
   "end": 5097673,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/streams.py",
   "start": 5097673,
   "end": 5122092,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/test_utils.py",
   "start": 5122092,
   "end": 5135113,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/base_subprocess.py",
   "start": 5135113,
   "end": 5144056,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/queues.py",
   "start": 5144056,
   "end": 5151903,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/unix_events.py",
   "start": 5151903,
   "end": 5186690,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/base_events.py",
   "start": 5186690,
   "end": 5238552,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/subprocess.py",
   "start": 5238552,
   "end": 5245746,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/locks.py",
   "start": 5245746,
   "end": 5260547,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/selector_events.py",
   "start": 5260547,
   "end": 5300273,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/log.py",
   "start": 5300273,
   "end": 5300397,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/signals.py",
   "start": 5300397,
   "end": 5302800,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/result.py",
   "start": 5302800,
   "end": 5310242,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/util.py",
   "start": 5310242,
   "end": 5315675,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/case.py",
   "start": 5315675,
   "end": 5372207,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/runner.py",
   "start": 5372207,
   "end": 5379957,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/loader.py",
   "start": 5379957,
   "end": 5402185,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/__main__.py",
   "start": 5402185,
   "end": 5402670,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/__init__.py",
   "start": 5402670,
   "end": 5405810,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/suite.py",
   "start": 5405810,
   "end": 5416289,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/main.py",
   "start": 5416289,
   "end": 5426774,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/mock.py",
   "start": 5426774,
   "end": 5504967,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/popen_fork.py",
   "start": 5504967,
   "end": 5507294,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/resource_sharer.py",
   "start": 5507294,
   "end": 5512612,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/sharedctypes.py",
   "start": 5512612,
   "end": 5518840,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/popen_spawn_win32.py",
   "start": 5518840,
   "end": 5521838,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/synchronize.py",
   "start": 5521838,
   "end": 5533890,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/util.py",
   "start": 5533890,
   "end": 5545143,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/__init__.py",
   "start": 5545143,
   "end": 5546066,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/semaphore_tracker.py",
   "start": 5546066,
   "end": 5550886,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/forkserver.py",
   "start": 5550886,
   "end": 5558849,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/managers.py",
   "start": 5558849,
   "end": 5594809,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/process.py",
   "start": 5594809,
   "end": 5603768,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/spawn.py",
   "start": 5603768,
   "end": 5612616,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/reduction.py",
   "start": 5612616,
   "end": 5620724,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/context.py",
   "start": 5620724,
   "end": 5631393,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/queues.py",
   "start": 5631393,
   "end": 5642559,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/heap.py",
   "start": 5642559,
   "end": 5650884,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/pool.py",
   "start": 5650884,
   "end": 5675607,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/popen_spawn_posix.py",
   "start": 5675607,
   "end": 5677522,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/connection.py",
   "start": 5677522,
   "end": 5708379,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/popen_forkserver.py",
   "start": 5708379,
   "end": 5710346,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/dummy/__init__.py",
   "start": 5710346,
   "end": 5713242,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/dummy/connection.py",
   "start": 5713242,
   "end": 5714825,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/venv/__main__.py",
   "start": 5714825,
   "end": 5714970,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/venv/__init__.py",
   "start": 5714970,
   "end": 5734577,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/venv/scripts/posix/activate.fish",
   "start": 5734577,
   "end": 5736989,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/venv/scripts/posix/activate.csh",
   "start": 5736989,
   "end": 5738265,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/venv/scripts/posix/activate",
   "start": 5738265,
   "end": 5740423,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/colormixer.py",
   "start": 5740423,
   "end": 5741762,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/wikipedia.py",
   "start": 5741762,
   "end": 5743109,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/tree.py",
   "start": 5743109,
   "end": 5744534,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/penrose.py",
   "start": 5744534,
   "end": 5748074,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/paint.py",
   "start": 5748074,
   "end": 5749365,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/bytedesign.py",
   "start": 5749365,
   "end": 5753609,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/yinyang.py",
   "start": 5753609,
   "end": 5754430,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/two_canvases.py",
   "start": 5754430,
   "end": 5755550,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/turtle.cfg",
   "start": 5755550,
   "end": 5755710,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/forest.py",
   "start": 5755710,
   "end": 5758660,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/peace.py",
   "start": 5758660,
   "end": 5759726,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/__main__.py",
   "start": 5759726,
   "end": 5774012,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/nim.py",
   "start": 5774012,
   "end": 5780525,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/__init__.py",
   "start": 5780525,
   "end": 5780839,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/planet_and_moon.py",
   "start": 5780839,
   "end": 5783687,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/fractalcurves.py",
   "start": 5783687,
   "end": 5787144,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/clock.py",
   "start": 5787144,
   "end": 5790345,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/sorting_animate.py",
   "start": 5790345,
   "end": 5795397,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/minimal_hanoi.py",
   "start": 5795397,
   "end": 5797448,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/chaos.py",
   "start": 5797448,
   "end": 5798399,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/lindenmayer.py",
   "start": 5798399,
   "end": 5800833,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/round_dance.py",
   "start": 5800833,
   "end": 5802637,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/dbm/dumb.py",
   "start": 5802637,
   "end": 5813608,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/dbm/__init__.py",
   "start": 5813608,
   "end": 5819391,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/dbm/ndbm.py",
   "start": 5819391,
   "end": 5819461,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/dbm/gnu.py",
   "start": 5819461,
   "end": 5819533,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/wsgiref/headers.py",
   "start": 5819533,
   "end": 5826299,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/wsgiref/util.py",
   "start": 5826299,
   "end": 5831933,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/wsgiref/__init__.py",
   "start": 5831933,
   "end": 5832520,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/wsgiref/handlers.py",
   "start": 5832520,
   "end": 5853521,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/wsgiref/validate.py",
   "start": 5853521,
   "end": 5868684,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/wsgiref/simple_server.py",
   "start": 5868684,
   "end": 5874072,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/curses/__init__.py",
   "start": 5874072,
   "end": 5877438,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/curses/textpad.py",
   "start": 5877438,
   "end": 5884777,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/curses/ascii.py",
   "start": 5884777,
   "end": 5887384,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/curses/panel.py",
   "start": 5887384,
   "end": 5887471,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/curses/has_key.py",
   "start": 5887471,
   "end": 5893105,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp856.py",
   "start": 5893105,
   "end": 5905528,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp950.py",
   "start": 5905528,
   "end": 5906551,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1256.py",
   "start": 5906551,
   "end": 5919365,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/gbk.py",
   "start": 5919365,
   "end": 5920380,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp875.py",
   "start": 5920380,
   "end": 5933234,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_roman.py",
   "start": 5933234,
   "end": 5946714,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_3.py",
   "start": 5946714,
   "end": 5959803,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp874.py",
   "start": 5959803,
   "end": 5972398,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/koi8_r.py",
   "start": 5972398,
   "end": 5986177,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_6.py",
   "start": 5986177,
   "end": 5997010,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp500.py",
   "start": 5997010,
   "end": 6010131,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp932.py",
   "start": 6010131,
   "end": 6011154,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_jp_2.py",
   "start": 6011154,
   "end": 6012215,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_16_be.py",
   "start": 6012215,
   "end": 6013252,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1254.py",
   "start": 6013252,
   "end": 6026754,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_iceland.py",
   "start": 6026754,
   "end": 6040252,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_turkish.py",
   "start": 6040252,
   "end": 6053765,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1257.py",
   "start": 6053765,
   "end": 6067139,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/undefined.py",
   "start": 6067139,
   "end": 6068438,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1255.py",
   "start": 6068438,
   "end": 6080904,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_5.py",
   "start": 6080904,
   "end": 6093919,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_7.py",
   "start": 6093919,
   "end": 6106763,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/koi8_t.py",
   "start": 6106763,
   "end": 6119956,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_32_be.py",
   "start": 6119956,
   "end": 6120886,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/gb2312.py",
   "start": 6120886,
   "end": 6121913,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_15.py",
   "start": 6121913,
   "end": 6135125,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1251.py",
   "start": 6135125,
   "end": 6148486,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp037.py",
   "start": 6148486,
   "end": 6161607,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/ptcp154.py",
   "start": 6161607,
   "end": 6175622,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_32_le.py",
   "start": 6175622,
   "end": 6176552,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/big5hkscs.py",
   "start": 6176552,
   "end": 6177591,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_croatian.py",
   "start": 6177591,
   "end": 6191224,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp862.py",
   "start": 6191224,
   "end": 6224594,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/kz1048.py",
   "start": 6224594,
   "end": 6238317,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/hz.py",
   "start": 6238317,
   "end": 6239328,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp864.py",
   "start": 6239328,
   "end": 6272991,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_4.py",
   "start": 6272991,
   "end": 6286367,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1258.py",
   "start": 6286367,
   "end": 6299731,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp852.py",
   "start": 6299731,
   "end": 6334733,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp775.py",
   "start": 6334733,
   "end": 6369209,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/johab.py",
   "start": 6369209,
   "end": 6370232,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1252.py",
   "start": 6370232,
   "end": 6383743,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/tis_620.py",
   "start": 6383743,
   "end": 6396043,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/aliases.py",
   "start": 6396043,
   "end": 6411585,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/euc_jis_2004.py",
   "start": 6411585,
   "end": 6412636,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1140.py",
   "start": 6412636,
   "end": 6425741,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp850.py",
   "start": 6425741,
   "end": 6459846,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp65001.py",
   "start": 6459846,
   "end": 6460952,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_11.py",
   "start": 6460952,
   "end": 6473287,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_jp_3.py",
   "start": 6473287,
   "end": 6474348,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/idna.py",
   "start": 6474348,
   "end": 6483518,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp855.py",
   "start": 6483518,
   "end": 6517368,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/zlib_codec.py",
   "start": 6517368,
   "end": 6519572,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp857.py",
   "start": 6519572,
   "end": 6553480,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_10.py",
   "start": 6553480,
   "end": 6567069,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp865.py",
   "start": 6567069,
   "end": 6601687,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/bz2_codec.py",
   "start": 6601687,
   "end": 6603936,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp866.py",
   "start": 6603936,
   "end": 6638332,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp737.py",
   "start": 6638332,
   "end": 6673013,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp273.py",
   "start": 6673013,
   "end": 6687145,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/euc_jisx0213.py",
   "start": 6687145,
   "end": 6688196,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/euc_kr.py",
   "start": 6688196,
   "end": 6689223,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_16.py",
   "start": 6689223,
   "end": 6694459,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp949.py",
   "start": 6694459,
   "end": 6695482,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/rot_13.py",
   "start": 6695482,
   "end": 6697910,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/punycode.py",
   "start": 6697910,
   "end": 6704791,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp437.py",
   "start": 6704791,
   "end": 6739355,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp863.py",
   "start": 6739355,
   "end": 6773607,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/unicode_escape.py",
   "start": 6773607,
   "end": 6774791,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/__init__.py",
   "start": 6774791,
   "end": 6779858,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_16_le.py",
   "start": 6779858,
   "end": 6780895,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_32.py",
   "start": 6780895,
   "end": 6786024,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_9.py",
   "start": 6786024,
   "end": 6799180,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_14.py",
   "start": 6799180,
   "end": 6812832,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1006.py",
   "start": 6812832,
   "end": 6826400,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/shift_jis.py",
   "start": 6826400,
   "end": 6827439,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_kr.py",
   "start": 6827439,
   "end": 6828492,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_16.py",
   "start": 6828492,
   "end": 6842049,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/base64_codec.py",
   "start": 6842049,
   "end": 6843582,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_8.py",
   "start": 6843582,
   "end": 6844587,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/latin_1.py",
   "start": 6844587,
   "end": 6845851,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/shift_jisx0213.py",
   "start": 6845851,
   "end": 6846910,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/hex_codec.py",
   "start": 6846910,
   "end": 6848418,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp858.py",
   "start": 6848418,
   "end": 6882433,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/quopri_codec.py",
   "start": 6882433,
   "end": 6883958,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_arabic.py",
   "start": 6883958,
   "end": 6920425,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_jp_2004.py",
   "start": 6920425,
   "end": 6921498,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp720.py",
   "start": 6921498,
   "end": 6935184,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1026.py",
   "start": 6935184,
   "end": 6948297,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_farsi.py",
   "start": 6948297,
   "end": 6963467,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/gb18030.py",
   "start": 6963467,
   "end": 6964498,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_8_sig.py",
   "start": 6964498,
   "end": 6968631,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_greek.py",
   "start": 6968631,
   "end": 6982352,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mbcs.py",
   "start": 6982352,
   "end": 6983563,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp869.py",
   "start": 6983563,
   "end": 7016528,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1250.py",
   "start": 7016528,
   "end": 7030214,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_7.py",
   "start": 7030214,
   "end": 7031160,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/charmap.py",
   "start": 7031160,
   "end": 7033244,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/big5.py",
   "start": 7033244,
   "end": 7034263,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_8.py",
   "start": 7034263,
   "end": 7045299,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_romanian.py",
   "start": 7045299,
   "end": 7058960,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1125.py",
   "start": 7058960,
   "end": 7093557,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_jp_ext.py",
   "start": 7093557,
   "end": 7094626,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/ascii.py",
   "start": 7094626,
   "end": 7095874,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp861.py",
   "start": 7095874,
   "end": 7130507,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/shift_jis_2004.py",
   "start": 7130507,
   "end": 7131566,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/unicode_internal.py",
   "start": 7131566,
   "end": 7132762,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_jp_1.py",
   "start": 7132762,
   "end": 7133823,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_cyrillic.py",
   "start": 7133823,
   "end": 7147277,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1253.py",
   "start": 7147277,
   "end": 7160371,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_2.py",
   "start": 7160371,
   "end": 7173775,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/koi8_u.py",
   "start": 7173775,
   "end": 7187537,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/hp_roman8.py",
   "start": 7187537,
   "end": 7201012,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_1.py",
   "start": 7201012,
   "end": 7214188,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/euc_jp.py",
   "start": 7214188,
   "end": 7215215,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_latin2.py",
   "start": 7215215,
   "end": 7229333,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/raw_unicode_escape.py",
   "start": 7229333,
   "end": 7230541,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_13.py",
   "start": 7230541,
   "end": 7243812,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_jp.py",
   "start": 7243812,
   "end": 7244865,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/uu_codec.py",
   "start": 7244865,
   "end": 7247586,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp860.py",
   "start": 7247586,
   "end": 7282267,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/palmos.py",
   "start": 7282267,
   "end": 7295786,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_centeuro.py",
   "start": 7295786,
   "end": 7309888,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp424.py",
   "start": 7309888,
   "end": 7321943,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/http/server.py",
   "start": 7321943,
   "end": 7365929,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/http/client.py",
   "start": 7365929,
   "end": 7414643,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/http/__init__.py",
   "start": 7414643,
   "end": 7420596,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/http/cookies.py",
   "start": 7420596,
   "end": 7441906,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/http/cookiejar.py",
   "start": 7441906,
   "end": 7518286,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/collections/abc.py",
   "start": 7518286,
   "end": 7518354,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/collections/__main__.py",
   "start": 7518354,
   "end": 7519629,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/collections/__init__.py",
   "start": 7519629,
   "end": 7565307,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/json/encoder.py",
   "start": 7565307,
   "end": 7581268,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/json/__init__.py",
   "start": 7581268,
   "end": 7594590,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/json/tool.py",
   "start": 7594590,
   "end": 7596235,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/json/decoder.py",
   "start": 7596235,
   "end": 7608817,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/json/scanner.py",
   "start": 7608817,
   "end": 7611233,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/dump.py",
   "start": 7611233,
   "end": 7614058,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/dbapi2.py",
   "start": 7614058,
   "end": 7616745,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/__init__.py",
   "start": 7616745,
   "end": 7617763,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/regression.py",
   "start": 7617763,
   "end": 7630684,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/dump.py",
   "start": 7630684,
   "end": 7633524,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/hooks.py",
   "start": 7633524,
   "end": 7642938,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/dbapi.py",
   "start": 7642938,
   "end": 7674346,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/userfunctions.py",
   "start": 7674346,
   "end": 7690264,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/transactions.py",
   "start": 7690264,
   "end": 7697602,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/factory.py",
   "start": 7697602,
   "end": 7708273,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/__init__.py",
   "start": 7708273,
   "end": 7708273,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/types.py",
   "start": 7708273,
   "end": 7722490,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/urllib/parse.py",
   "start": 7722490,
   "end": 7756842,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/urllib/robotparser.py",
   "start": 7756842,
   "end": 7763806,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/urllib/error.py",
   "start": 7763806,
   "end": 7766569,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/urllib/__init__.py",
   "start": 7766569,
   "end": 7766569,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/urllib/request.py",
   "start": 7766569,
   "end": 7863475,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/urllib/response.py",
   "start": 7863475,
   "end": 7865774,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/importlib/util.py",
   "start": 7865774,
   "end": 7876579,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/importlib/machinery.py",
   "start": 7876579,
   "end": 7877423,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/importlib/abc.py",
   "start": 7877423,
   "end": 7888205,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/importlib/__init__.py",
   "start": 7888205,
   "end": 7894073,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/importlib/_bootstrap.py",
   "start": 7894073,
   "end": 7931981,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/importlib/_bootstrap_external.py",
   "start": 7931981,
   "end": 7985511,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/wintypes.py",
   "start": 7985511,
   "end": 7991139,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/util.py",
   "start": 7991139,
   "end": 8000395,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/_endian.py",
   "start": 8000395,
   "end": 8002395,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/__init__.py",
   "start": 8002395,
   "end": 8019242,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/fetch_macholib",
   "start": 8019242,
   "end": 8019326,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/dylib.py",
   "start": 8019326,
   "end": 8021154,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/__init__.py",
   "start": 8021154,
   "end": 8021308,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/framework.py",
   "start": 8021308,
   "end": 8023509,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/README.ctypes",
   "start": 8023509,
   "end": 8023805,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/dyld.py",
   "start": 8023805,
   "end": 8028712,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/fetch_macholib.bat",
   "start": 8028712,
   "end": 8028787,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_errno.py",
   "start": 8028787,
   "end": 8031089,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_returnfuncptrs.py",
   "start": 8031089,
   "end": 8033992,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_arrays.py",
   "start": 8033992,
   "end": 8039772,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_keeprefs.py",
   "start": 8039772,
   "end": 8043830,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_python_api.py",
   "start": 8043830,
   "end": 8046696,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_refcounts.py",
   "start": 8046696,
   "end": 8049272,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_internals.py",
   "start": 8049272,
   "end": 8051903,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_as_parameter.py",
   "start": 8051903,
   "end": 8058675,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_loading.py",
   "start": 8058675,
   "end": 8063192,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_memfunctions.py",
   "start": 8063192,
   "end": 8066485,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_funcptr.py",
   "start": 8066485,
   "end": 8070396,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_objects.py",
   "start": 8070396,
   "end": 8072078,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_delattr.py",
   "start": 8072078,
   "end": 8072611,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_random_things.py",
   "start": 8072611,
   "end": 8075438,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_frombuffer.py",
   "start": 8075438,
   "end": 8079684,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_libc.py",
   "start": 8079684,
   "end": 8080689,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_structures.py",
   "start": 8080689,
   "end": 8096469,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_parameters.py",
   "start": 8096469,
   "end": 8102665,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_win32.py",
   "start": 8102665,
   "end": 8107952,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_bytes.py",
   "start": 8107952,
   "end": 8109876,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_wintypes.py",
   "start": 8109876,
   "end": 8111342,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_sizes.py",
   "start": 8111342,
   "end": 8112157,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_buffers.py",
   "start": 8112157,
   "end": 8114441,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_pep3118.py",
   "start": 8114441,
   "end": 8122276,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_find.py",
   "start": 8122276,
   "end": 8125109,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_incomplete.py",
   "start": 8125109,
   "end": 8126132,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/__main__.py",
   "start": 8126132,
   "end": 8126200,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_stringptr.py",
   "start": 8126200,
   "end": 8128736,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_repr.py",
   "start": 8128736,
   "end": 8129578,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/__init__.py",
   "start": 8129578,
   "end": 8129977,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_init.py",
   "start": 8129977,
   "end": 8131016,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_checkretval.py",
   "start": 8131016,
   "end": 8131984,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_macholib.py",
   "start": 8131984,
   "end": 8133814,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_bitfields.py",
   "start": 8133814,
   "end": 8143894,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_unicode.py",
   "start": 8143894,
   "end": 8145655,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_simplesubclasses.py",
   "start": 8145655,
   "end": 8146944,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_pickling.py",
   "start": 8146944,
   "end": 8149162,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_numbers.py",
   "start": 8149162,
   "end": 8158453,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_anon.py",
   "start": 8158453,
   "end": 8160504,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_slicing.py",
   "start": 8160504,
   "end": 8166519,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_values.py",
   "start": 8166519,
   "end": 8170360,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_callbacks.py",
   "start": 8170360,
   "end": 8178208,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_varsize_struct.py",
   "start": 8178208,
   "end": 8180050,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_strings.py",
   "start": 8180050,
   "end": 8187185,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_byteswap.py",
   "start": 8187185,
   "end": 8198596,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_unaligned_structures.py",
   "start": 8198596,
   "end": 8199811,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_cast.py",
   "start": 8199811,
   "end": 8202999,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_struct_fields.py",
   "start": 8202999,
   "end": 8204502,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_prototypes.py",
   "start": 8204502,
   "end": 8211347,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_array_in_pointer.py",
   "start": 8211347,
   "end": 8213085,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_functions.py",
   "start": 8213085,
   "end": 8225640,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_cfuncs.py",
   "start": 8225640,
   "end": 8233320,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_pointers.py",
   "start": 8233320,
   "end": 8240432,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/logging/config.py",
   "start": 8240432,
   "end": 8276376,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/logging/__init__.py",
   "start": 8276376,
   "end": 8345789,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/logging/handlers.py",
   "start": 8345789,
   "end": 8402413,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/encoders.py",
   "start": 8402413,
   "end": 8404199,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/headerregistry.py",
   "start": 8404199,
   "end": 8424363,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/_header_value_parser.py",
   "start": 8424363,
   "end": 8529565,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/feedparser.py",
   "start": 8529565,
   "end": 8552430,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/_parseaddr.py",
   "start": 8552430,
   "end": 8569629,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/_encoded_words.py",
   "start": 8569629,
   "end": 8577543,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/charset.py",
   "start": 8577543,
   "end": 8594694,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/message.py",
   "start": 8594694,
   "end": 8640462,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/base64mime.py",
   "start": 8640462,
   "end": 8644020,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/generator.py",
   "start": 8644020,
   "end": 8664008,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/utils.py",
   "start": 8664008,
   "end": 8677696,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/errors.py",
   "start": 8677696,
   "end": 8681231,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/architecture.rst",
   "start": 8681231,
   "end": 8690791,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/__init__.py",
   "start": 8690791,
   "end": 8692557,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/iterators.py",
   "start": 8692557,
   "end": 8694692,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/contentmanager.py",
   "start": 8694692,
   "end": 8705290,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/_policybase.py",
   "start": 8705290,
   "end": 8719962,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/policy.py",
   "start": 8719962,
   "end": 8729943,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/header.py",
   "start": 8729943,
   "end": 8754043,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/parser.py",
   "start": 8754043,
   "end": 8759086,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/quoprimime.py",
   "start": 8759086,
   "end": 8768945,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/application.py",
   "start": 8768945,
   "end": 8770201,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/message.py",
   "start": 8770201,
   "end": 8771487,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/base.py",
   "start": 8771487,
   "end": 8772281,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/nonmultipart.py",
   "start": 8772281,
   "end": 8772972,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/__init__.py",
   "start": 8772972,
   "end": 8772972,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/image.py",
   "start": 8772972,
   "end": 8774736,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/text.py",
   "start": 8774736,
   "end": 8776216,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/audio.py",
   "start": 8776216,
   "end": 8778890,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/multipart.py",
   "start": 8778890,
   "end": 8780463,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/concurrent/__init__.py",
   "start": 8780463,
   "end": 8780501,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/concurrent/futures/thread.py",
   "start": 8780501,
   "end": 8785366,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/concurrent/futures/_base.py",
   "start": 8785366,
   "end": 8805392,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/concurrent/futures/__init__.py",
   "start": 8805392,
   "end": 8806192,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/concurrent/futures/process.py",
   "start": 8806192,
   "end": 8826327,
   "audio": 0
  }, {
   "filename": "/files/files/.gitkeep",
   "start": 8826327,
   "end": 8826327,
   "audio": 0
  }, {
   "filename": "/coldbrew/examples/fib.py",
   "start": 8826327,
   "end": 8828202,
   "audio": 0
  }, {
   "filename": "/coldbrew/examples/add.py",
   "start": 8828202,
   "end": 8828624,
   "audio": 0
  } ],
  "remote_package_size": 8828624,
  "package_uuid": "e97cc112-ad48-4ac9-a2e4-4b1555713b8e"
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
var STATIC_BASE = 1024, STACK_BASE = 1701824, STACK_MAX = 6944704, DYNAMIC_BASE = 6944704, DYNAMICTOP_PTR = 1701568;
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
var STATIC_BUMP = 1700800;
Module["STATIC_BASE"] = STATIC_BASE;
Module["STATIC_BUMP"] = STATIC_BUMP;
var tempDoublePtr = 1701808;
assert(tempDoublePtr % 8 == 0);
var EMTSTACKTOP = getMemory(1048576);
var EMT_STACK_MAX = EMTSTACKTOP + 1048576;
var eb = getMemory(3639288);
assert(eb % 8 === 0);
__ATPRERUN__.push((function() {
 var bytecodeFile = Module["emterpreterFile"];
 if (!(bytecodeFile instanceof ArrayBuffer)) {
  throw "bad or missing emterpreter file. If you compiled to JS (and not HTML) make sure you set Module['emterpreterFile']";
 }
 var codeSize = 3639288;
 HEAPU8.set((new Uint8Array(bytecodeFile)).subarray(0, codeSize), eb);
 assert(HEAPU8[eb] === 140);
 assert(HEAPU8[eb + 1] === 0);
 assert(HEAPU8[eb + 2] === 123);
 assert(HEAPU8[eb + 3] === 0);
 var relocationsStart = codeSize + 3 >> 2;
 var relocations = (new Uint32Array(bytecodeFile)).subarray(relocationsStart);
 assert(relocations.length === 202911);
 if (relocations.length > 0) {
  assert(relocations[0] === 80);
 }
 for (var i = 0; i < relocations.length; i++) {
  assert(relocations[i] % 4 === 0);
  assert(relocations[i] >= 0 && relocations[i] < eb + 3639288);
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
var ___tm_current = 1701664;
var ___tm_timezone = (stringToUTF8("GMT", 1701712, 4), 1701712);
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
 "M": assert,
 "j": setTempRet0,
 "h": getTempRet0,
 "kb": abortOnCannotGrowMemory,
 "g": abortStackOverflow,
 "ia": abortStackOverflowEmterpreter,
 "jb": nullFunc_X,
 "Oc": ___buildEnvironment,
 "ib": ___libc_current_sigrtmax,
 "hb": ___libc_current_sigrtmin,
 "L": ___lock,
 "gb": ___map_file,
 "Nc": ___setErrNo,
 "Mc": ___syscall10,
 "Lc": ___syscall118,
 "fb": ___syscall12,
 "Kc": ___syscall122,
 "eb": ___syscall132,
 "Jc": ___syscall133,
 "Ic": ___syscall14,
 "db": ___syscall140,
 "Hc": ___syscall142,
 "Gc": ___syscall144,
 "cb": ___syscall145,
 "ha": ___syscall146,
 "Fc": ___syscall147,
 "Ec": ___syscall148,
 "bb": ___syscall15,
 "Dc": ___syscall163,
 "Cc": ___syscall180,
 "Bc": ___syscall181,
 "Ac": ___syscall183,
 "zc": ___syscall191,
 "yc": ___syscall192,
 "xc": ___syscall193,
 "wc": ___syscall194,
 "ab": ___syscall195,
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
 "$a": ___syscall212,
 "jc": ___syscall220,
 "m": ___syscall221,
 "ic": ___syscall268,
 "hc": ___syscall269,
 "gc": ___syscall272,
 "fc": ___syscall29,
 "_a": ___syscall295,
 "ec": ___syscall296,
 "dc": ___syscall297,
 "cc": ___syscall298,
 "bc": ___syscall3,
 "ga": ___syscall300,
 "ac": ___syscall301,
 "$b": ___syscall302,
 "_b": ___syscall303,
 "Zb": ___syscall304,
 "Yb": ___syscall305,
 "Za": ___syscall306,
 "Xb": ___syscall320,
 "Wb": ___syscall324,
 "Vb": ___syscall33,
 "Ub": ___syscall330,
 "Tb": ___syscall331,
 "Sb": ___syscall34,
 "Ya": ___syscall340,
 "Rb": ___syscall36,
 "Qb": ___syscall38,
 "Pb": ___syscall39,
 "Ob": ___syscall4,
 "Nb": ___syscall40,
 "Mb": ___syscall41,
 "Lb": ___syscall42,
 "Xa": ___syscall5,
 "U": ___syscall54,
 "Kb": ___syscall57,
 "J": ___syscall6,
 "Jb": ___syscall60,
 "Wa": ___syscall63,
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
 "T": __exit,
 "I": _abort,
 "Va": _alarm,
 "Ua": _chroot,
 "H": _clock,
 "G": _clock_getres,
 "q": _clock_gettime,
 "Ta": _clock_settime,
 "S": _confstr,
 "Sa": _dlerror,
 "Ra": _dlopen,
 "fa": _dlsym,
 "Qa": _emscripten_exit_with_live_runtime,
 "wb": _emscripten_get_heap_size,
 "vb": _emscripten_memcpy_big,
 "ub": _emscripten_resize_heap,
 "v": _emscripten_run_script,
 "tb": _emscripten_run_script_string,
 "Pa": _emscripten_sleep,
 "ea": _endpwent,
 "Oa": _execv,
 "Na": _execve,
 "x": _exit,
 "Ma": _fexecve,
 "La": _flock,
 "da": _fork,
 "ca": _fpathconf,
 "p": _getenv,
 "Ka": _getitimer,
 "Ja": _getloadavg,
 "ba": _getpwent,
 "Ia": _getpwnam,
 "Ha": _getpwuid,
 "R": _gettimeofday,
 "Ga": _gmtime,
 "Fa": _kill,
 "Ea": _killpg,
 "i": _llvm_copysign_f64,
 "Da": _llvm_log10_f64,
 "Ca": _llvm_log2_f64,
 "Ba": _llvm_stackrestore,
 "sb": _llvm_stacksave,
 "rb": _llvm_trap,
 "z": _localtime,
 "aa": _mktime,
 "qb": _nanosleep,
 "Aa": _pathconf,
 "Q": _pthread_attr_destroy,
 "$": _pthread_attr_init,
 "_": _pthread_attr_setstacksize,
 "s": _pthread_cond_destroy,
 "P": _pthread_cond_init,
 "k": _pthread_cond_signal,
 "O": _pthread_cond_timedwait,
 "K": _pthread_cond_wait,
 "Z": _pthread_create,
 "za": _pthread_detach,
 "ya": _pthread_exit,
 "l": _pthread_getspecific,
 "pb": _pthread_join,
 "N": _pthread_key_create,
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
 "Y": _sigfillset,
 "ra": _siginterrupt,
 "qa": _sigismember,
 "pa": _sigpending,
 "oa": _strftime,
 "y": _sysconf,
 "na": _system,
 "w": _time,
 "X": _times,
 "W": _unsetenv,
 "lb": _utimes,
 "ma": _wait,
 "la": _wait3,
 "ka": _wait4,
 "ja": _waitid,
 "V": _waitpid,
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
var _export_reset = Module["_export_reset"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["fd"].apply(null, arguments);
});
var _export_run = Module["_export_run"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["gd"].apply(null, arguments);
});
var _export_runAsync = Module["_export_runAsync"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["hd"].apply(null, arguments);
});
var _export_setenv = Module["_export_setenv"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["id"].apply(null, arguments);
});
var _export_unsetenv = Module["_export_unsetenv"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["jd"].apply(null, arguments);
});
var _fflush = Module["_fflush"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["kd"].apply(null, arguments);
});
var _free = Module["_free"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["ld"].apply(null, arguments);
});
var _i64Add = Module["_i64Add"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["md"].apply(null, arguments);
});
var _i64Subtract = Module["_i64Subtract"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["nd"].apply(null, arguments);
});
var _llvm_bswap_i16 = Module["_llvm_bswap_i16"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["od"].apply(null, arguments);
});
var _llvm_bswap_i32 = Module["_llvm_bswap_i32"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["pd"].apply(null, arguments);
});
var _llvm_round_f64 = Module["_llvm_round_f64"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["qd"].apply(null, arguments);
});
var _main = Module["_main"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["rd"].apply(null, arguments);
});
var _malloc = Module["_malloc"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["sd"].apply(null, arguments);
});
var _memalign = Module["_memalign"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["td"].apply(null, arguments);
});
var _memmove = Module["_memmove"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["ud"].apply(null, arguments);
});
var _memset = Module["_memset"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["vd"].apply(null, arguments);
});
var _pthread_mutex_lock = Module["_pthread_mutex_lock"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["wd"].apply(null, arguments);
});
var _pthread_mutex_trylock = Module["_pthread_mutex_trylock"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["xd"].apply(null, arguments);
});
var _pthread_mutex_unlock = Module["_pthread_mutex_unlock"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["yd"].apply(null, arguments);
});
var _sbrk = Module["_sbrk"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["zd"].apply(null, arguments);
});
var emtStackRestore = Module["emtStackRestore"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Ad"].apply(null, arguments);
});
var emtStackSave = Module["emtStackSave"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Bd"].apply(null, arguments);
});
var emterpret = Module["emterpret"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Cd"].apply(null, arguments);
});
var establishStackSpace = Module["establishStackSpace"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Dd"].apply(null, arguments);
});
var getEmtStackMax = Module["getEmtStackMax"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Ed"].apply(null, arguments);
});
var setAsyncState = Module["setAsyncState"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Fd"].apply(null, arguments);
});
var setEmtStackMax = Module["setEmtStackMax"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Gd"].apply(null, arguments);
});
var setThrew = Module["setThrew"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Hd"].apply(null, arguments);
});
var stackAlloc = Module["stackAlloc"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Id"].apply(null, arguments);
});
var stackRestore = Module["stackRestore"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Jd"].apply(null, arguments);
});
var stackSave = Module["stackSave"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Kd"].apply(null, arguments);
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
    