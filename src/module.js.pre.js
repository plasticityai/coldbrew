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
var _MODULE_NAME_coldbrew_internal_instance = (function() {
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

var _MODULE_NAME_coldbrew_internal_fs_configure = (function() {
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
    var getVariable = MODULE_NAME.getVariable;
    var run = MODULE_NAME.run;
    if (obj.is_async) {
      getVariable = MODULE_NAME.getVariableAsync;
      run = MODULE_NAME.runAsync;
    }
    var transformProp = function(prop, reverse=null) {
      if (!(reverse instanceof Array) && MODULE_NAME._finalizedOptions.transformVariableCasing) {
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
      } else if (MODULE_NAME._finalizedOptions.transformVariableCasing) {
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
      var keys = MODULE_NAME.getVariable("('"+obj.uid+"' in Coldbrew._vars and dir(Coldbrew._vars['"+obj.uid+"'])) or []");
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
            var hasIter = MODULE_NAME.getVariable("hasattr(Coldbrew._vars['"+obj.uid+"'], '__iter__')");
            if (!isPromise(hasIter)) {
              return (function*() {
                if (hasIter) {
                  var pyiter = MODULE_NAME.getVariable("iter(Coldbrew._vars['"+obj.uid+"'])");
                  var sentinel = MODULE_NAME.getVariable("Coldbrew._StopIteration()");
                  while (true) {
                    var nextValue = MODULE_NAME.runFunction('next', pyiter, sentinel);
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
                    var nextValue = await MODULE_NAME.runFunction('next', pyiter, sentinel);
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
              return MODULE_NAME.PythonVariable.internalKeyDefs.concat(res); 
            }
            return function() {
              var res = MODULE_NAME.getVariable("dir(Coldbrew._vars['"+obj.uid+"'])");
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
              return MODULE_NAME.run("try:\n\tdel Coldbrew._vars['"+obj.uid+"']\nexcept KeyError:\n\tpass");
            });
          } else if (prop === '__destroyed__') {
              return MODULE_NAME.getVariable("'"+obj.uid+"' not in Coldbrew._vars");
          } else if (prop === '__type__') {
            return obj.type;
          } else if (prop === '__uid__') {
            return obj.uid;
          } else {
            var tprop = getTProp(prop);
            function get(tprop) {
              var hasAttrOrItem = MODULE_NAME.getVariable("hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+") or ((hasattr(Coldbrew._vars['"+obj.uid+"'], '__contains__')) and (hasattr(Coldbrew._vars['"+obj.uid+"'], '__getitem__')) and type(Coldbrew._vars['"+obj.uid+"']) != type and Coldbrew._try(lambda: Coldbrew._unserialize_from_js("+serializeToPython(prop)+") in Coldbrew._vars['"+obj.uid+"']))");
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
            MODULE_NAME.run("(setattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+", Coldbrew._unserialize_from_js("+serializeToPython(value)+")) if hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+") else Coldbrew._vars['"+obj.uid+"'].__setitem__(Coldbrew._unserialize_from_js("+serializeToPython(prop)+"), Coldbrew._unserialize_from_js("+serializeToPython(value)+")))");
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
          var res = MODULE_NAME.getVariable("dir(Coldbrew._vars['"+obj.uid+"'])");
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
            return MODULE_NAME.getVariable("(hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+") or Coldbrew._unserialize_from_js("+serializeToPython(prop)+") in Coldbrew._vars['"+obj.uid+"']) if (hasattr(Coldbrew._vars['"+obj.uid+"'], '__contains__')) and type(Coldbrew._vars['"+obj.uid+"']) != type else hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+")");
          } else {
            throw new Error("Coldbrew Error: Cannot run 'has' operation (or `in` operator) on PythonVariable when using worker mode.");
          }
        },
        deleteProperty: function(target, prop) {
          var tprop = getTProp(prop);
          function deleteProperty(tprop) {
            var hasAttrOrItem = MODULE_NAME.getVariable("hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+") or ((hasattr(Coldbrew._vars['"+obj.uid+"'], '__contains__')) and (hasattr(Coldbrew._vars['"+obj.uid+"'], '__getitem__')) and type(Coldbrew._vars['"+obj.uid+"']) != type and Coldbrew._try(lambda: Coldbrew._unserialize_from_js("+serializeToPython(prop)+") in Coldbrew._vars['"+obj.uid+"']))");
            function _deleteProperty(hasAttrOrItem) {
              if (hasAttrOrItem) {
                MODULE_NAME.run("if hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+"):\n\tdelattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+")\nelse:\n\tColdbrew._vars['"+obj.uid+"'].__delitem__(Coldbrew._unserialize_from_js("+serializeToPython(prop)+"))");
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
        eval(`class ${obj.type} extends MODULE_NAME.PythonVariable {} varObj = ${obj.type};`);
      } catch (e) {
        eval(`class py_${obj.type} extends MODULE_NAME.PythonVariable {} varObj = py_${obj.type};`);
      }
    } else {
      varObj = new MODULE_NAME.PythonVariable();
    }

    var $keyDefs = [];
    try {
      $keyDefs = MODULE_NAME.getVariable("dir(Coldbrew._vars['"+obj.uid+"'])");
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
      $keyDefs = $keyDefs.map(transformProp).concat(MODULE_NAME.PythonVariable.internalKeyDefs);
      var keyDefPrototype = {};
      if ((!obj.constructable && !obj.callable) || IS_NODE_JS) {
        varObj['__type__'] = $handler.get({}, '__type__');
        keyDefPrototype['__type__'] = $handler.get({}, '__type__');
        $keyDefs.forEach(function(keyDef) {
          if (MODULE_NAME.PythonVariable.internalKeyDefs.includes(keyDef)) {
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
        $keyDefs.concat(MODULE_NAME.PythonVariable.internalSecretKeyDefs).forEach(function(keyDef) {
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
  var isPythonVariable = MODULE_NAME.PythonVariable.isPythonVariable(obj);
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
    if (obj && obj._internal_coldbrew_native_js_worker_proxy && MODULE_NAME._pending_main_thread_vars.has(obj._internal_coldbrew_get_var_id)) {
      MODULE_NAME._pending_main_thread_vars.delete(obj._internal_coldbrew_get_var_id)
      delete MODULE_NAME._main_thread_vars[obj._internal_coldbrew_get_var_id];
    }
    if (_export) {
      var uid = randid();
      MODULE_NAME._vars[uid] = obj;
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
      if (MODULE_NAME._finalizedOptions.worker && !IS_WORKER_SCRIPT) {
        MODULE_NAME._main_thread_vars[uid] = obj;
        MODULE_NAME.worker.postMessage({
          '_internal_coldbrew_message': true, 
          '_get_var': uid,
          'constructable': obj instanceof Function && isConstructor(obj),
          'callable': obj instanceof Function && !isConstructor(obj),
          'type': (typeof obj.constructor !== 'undefined') ? toType(obj) : (typeof obj),
          'name': (typeof obj.name !== 'undefined' ? obj.name : 'JavaScriptUnnamed'),
        });
      } else {
        MODULE_NAME._main_thread_vars[uid] = obj;
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
    return MODULE_NAME._main_thread_vars[arg['uid']];
  } else if (arg && arg._internal_coldbrew_var === true) {
    return MODULE_NAME._vars[arg.uid];
  } else if (arg && arg._internal_coldbrew_error) {
    return new Promise(function(resolve, reject) {
      MODULE_NAME.getExceptionInfo().then(function(exceptionInfo) {
        reject(new MODULE_NAME.PythonError(exceptionInfo));
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
  if (arg && arg._internal_coldbrew_get_var && MODULE_NAME._finalizedOptions.worker && IS_WORKER_SCRIPT) {
    return MODULE_NAME._main_thread_vars[arg.uid];
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
              if (MODULE_NAME.PythonVariable.internalKeyDefs.includes(keyDef)) {
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
//    properties / methods to the MODULE_NAME
//    when called.
// 2. When worker mode is enabled, the true MODULE_NAME
//    is initialized in the worker thread. A proxy to it
//    is given to the main thread by the Comlink library,
//    and a reference to it is stored in _workerProxy.
//    Only a couple of methods on MODULE_NAME in the main
//    thread actually run in the main thread and aren't
//    just proxies to the worker thread.
// 3. The message handling (from the worker thread to 
//    the main thread) is handled in this section. The
//    handler can be found in load(). The worker sends
//    messages to the main thread requesting information
//    about variables in the main thread scope.
/**********************************************************/
MODULE_NAME.PythonError = PythonError;
MODULE_NAME.PythonVariable = PythonVariable;
MODULE_NAME.PythonKeywords = function(keywords) { 
  var pykw = new _PythonKeywords(keywords, MODULE_NAME._finalizedOptions.worker && !IS_WORKER_SCRIPT);
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
MODULE_NAME.pyversion =  "PYVERSION";
MODULE_NAME.version =  "COLDBREW_VERSION";
MODULE_NAME._slots = {};  // Temporarily stores the JSON serialized version of anything being transferred to JavaScript from Python, before it is returned to the caller.
MODULE_NAME._promises_resolved_values = {};  // Temporarily stores the resolved values of Promises that need to be resolved before being transferred to Python.
MODULE_NAME._vars = {}; // Stores references to JavaScript variables, while Python has proxy objects that shim them.
MODULE_NAME._main_thread_vars = {}; // In the main thread, stores references to main thread JavaScript variables, while the worker thread has proxy objects that shim them. In the worker thread, temporarily holds Proxy objects to main thread JavaScript variables, but later they get moved to _vars.
MODULE_NAME._isPromise = isPromise;
MODULE_NAME._convertError = function (e) {
  return {
    '_internal_coldbrew_error': true,
    'type': e.constructor.name,
    'name': e.name,
    'message': e.message,
    'stack': e.stack,
    'data': (typeof e.errorData !== 'undefined') ? e.errorData : null,
  };
};
MODULE_NAME._try = function(func) {
  try {
    return func();
  } catch (e) {
    return MODULE_NAME._convertError(e);
  }
};
MODULE_NAME._callFunc = function(isAsync, constructable, func, ...args) {
  function resultBuilder(isAsync, constructable, func, unserializedArgs) {
    unserializedArgs = unserializedArgs.map(function(arg) {
      if (isAsync && MODULE_NAME.PythonVariable.isPythonVariable(arg) && typeof arg.__raw_promise__ === 'undefined') {
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
  if (MODULE_NAME._finalizedOptions.worker && !IS_WORKER_SCRIPT) {
    return (async function() {
      unserializedArgs = await Promise.all(unserializedArgs);
      return resultBuilder(true, constructable, func, unserializedArgs);
    })();
  } else {
    return resultBuilder(isAsync, constructable, func, unserializedArgs);
  }
};
MODULE_NAME._serializeToPython = serializeToPython;
MODULE_NAME._unserializeFromPython = unserializeFromPython;
MODULE_NAME._parseUrl = parseUrl;
MODULE_NAME.loaded = false;
MODULE_NAME.initialized = false;
MODULE_NAME.exited = false;
MODULE_NAME.forwardOut = true;
MODULE_NAME.forwardErr = true;
MODULE_NAME._queuedOnReady = [];
MODULE_NAME.standardInBuffer = 'This is the first line of standard input.\nTo override this, either set `MODULE_NAME.standardInBuffer` to the full standard input OR set `MODULE_NAME.onStandardInRead(int size)` to respond interactively to standard input reads OR set `MODULE_NAME.onStandardInReadAsync(int size)` to respond interactively and asynchronously (by returning a Promise).';
MODULE_NAME._standardInTell = 0;
MODULE_NAME._resumeWarn = function(warn=true) { if (warn) { return MODULE_NAME.run('Coldbrew._warn("The Coldbrew Python interpreter is not currently sleeping. Resuming has no effect.")'); } else return 0; };
MODULE_NAME.resume = function(...args) { return MODULE_NAME._resumeWarn(...args); };
MODULE_NAME._mountFS = function(Module) {};
MODULE_NAME.preInit = function(Module) {};
MODULE_NAME.preRun = function(Module) {};
MODULE_NAME.onStandardOut = function(text) { console.log(text); };
MODULE_NAME.onStandardErr = function(text) { console.warn(text); };
MODULE_NAME.onStandardInRead = function(size) { 
  var read = MODULE_NAME.standardInBuffer.substring(MODULE_NAME._standardInTell, MODULE_NAME._standardInTell+size);
  MODULE_NAME._standardInTell += size;
  return read;
};
MODULE_NAME.onStandardInReadAsync = function(size) { 
  return Promise.resolve(MODULE_NAME.onStandardInRead(size));
};
MODULE_NAME._onRuntimeInitialized = function(Module) {
  Module.callMain();
  var oldLoaded = MODULE_NAME.loaded;
  MODULE_NAME.loaded = true;
  if (!oldLoaded) {
    MODULE_NAME._queuedOnReady.forEach(function(onReady) {
      onReady(null, MODULE_NAME);
    });
    MODULE_NAME._queuedOnReady = [];
  }
};
MODULE_NAME._fsReady = function(cb) {
  // If the user already called configure FS, these "false, false, {}" parameters
  // will get ignored, if the user hasn't, "false, false, {}" will be used, but will
  // have no effect.
  _MODULE_NAME_coldbrew_internal_fs_configure(false, false, false, false, {}, function(err, mountPoints) {
    MODULE_NAME._mountFS = function(Module) {
      var prefix = '.filesystem';
      Module.FS.$createFolder(Module.FS.root, prefix, true, true);

      if (IS_NODE_JS) {
        // Load external files
        var pyLibPath = '/usr/local/lib/python'+("PYVERSION".split('.').slice(0,2).join('.'));
        var pyLibPathBuggy = '/usr/local/lib/python'+("PYVERSION".split('.').slice(0,1).join('.'));
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
          fsNamespace += 'MODULE_NAME_';
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
        } else if (BROWSERFS) {
          // Handle BrowserFS here
        }
        Module.FS.$symlink(mountSource, mountPoint);
      });
    }
    cb(err, mountPoints);
  });
};
MODULE_NAME.configureFS = function(options = {}, cb) {
  var defaultOptions = {
    sharedHome: false,
    sharedTmp: false,
    persistHome: false,
    persistTmp: false,
    browserFSOptions: {},
  };
  var finalizedOptions = Object.assign({}, defaultOptions, options);
  _MODULE_NAME_coldbrew_internal_fs_configure(
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
  if (ENABLE_THREADING) {
    defaultOptions.threadWorkers = 1;
    if (FAST_AND_SMALL_BUT_NO_ASYNC && options.worker) {
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
MODULE_NAME._load = function(arg1, arg2) {
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
  MODULE_NAME._finalizedOptions = finalizedOptions;
  if (finalizedOptions.fsOptions) {
    MODULE_NAME.configureFS(finalizedOptions.fsOptions);
  }
  MODULE_NAME._fsReady(function(err, mountPoints) {
    if (IS_WORKER_SCRIPT) {
      MODULE_NAME._pending_main_thread_vars = new Set();
      MODULE_NAME._getMainVariableResponsePromises = {}
      MODULE_NAME._getMainVariable = function(varName) {
        var uid = randid();
        postMessage({'_internal_coldbrew_message': true, '_get_main_var': varName, 'uid': uid});
        return new Promise(function(resolve, reject) {
          MODULE_NAME._getMainVariableResponsePromises[uid] = resolve;
        });
      };
      MODULE_NAME._runMain = function(expression) {
        postMessage({'_internal_coldbrew_message': true, '_run_main': expression});
      };
    }
    MODULE_NAME._usedFiles = new Set();
    MODULE_NAME._textDecoder = (typeof TextDecoder !== 'undefined') ? new TextDecoder("utf-8") : new module4.exports.TextDecoder("utf-8");
    MODULE_NAME.mountPoints = mountPoints;
    COLDBREW_TOP_SCOPE.PTHREAD_POOL_SIZE = finalizedOptions.threadWorkers;
    MODULE_NAME.Module = _MODULE_NAME_coldbrew_internal_instance();
    Object.getOwnPropertyNames(MODULE_NAME.Module.FS).forEach(function(propertyName) {
      if (typeof MODULE_NAME.Module.FS[propertyName] === 'function') {
        var oldFSFunction = MODULE_NAME.Module.FS[propertyName].bind(MODULE_NAME.Module.FS);
        (function(oldFSFunction) {
          MODULE_NAME.Module.FS['$'+propertyName] = function(...args) {
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
    MODULE_NAME._getAsyncYieldRate = MODULE_NAME.Module.cwrap('export_getAsyncYieldRate', 'number', []);
    MODULE_NAME.getAsyncYieldRate = function() {
      var asyncYieldRate = MODULE_NAME._getAsyncYieldRate();
      if (asyncYieldRate >= 2147483647) {
        return Infinity;
      } else {
        return asyncYieldRate;
      }
    };
    MODULE_NAME._setAsyncYieldRate = MODULE_NAME.Module.cwrap('export_setAsyncYieldRate', null, ['number']);
    MODULE_NAME.setAsyncYieldRate = function(rate) {
      if (MODULE_NAME._finalizedOptions.worker) {
        MODULE_NAME.run('Coldbrew._warn("Ignoring manually setting the async yield rate. When workers mode is enabled, we automatically set the yield rate to infinity for you to improve performance. =)")');
        return null;
      }
      if (rate >= 2147483647) {
        rate = 2147483647;
      }
      return MODULE_NAME._setAsyncYieldRate(rate);
    };
    MODULE_NAME._run = MODULE_NAME.Module.cwrap('export_run', 'number', ['string']);
    MODULE_NAME.run = function(script) {
      var ret = MODULE_NAME._run(script);
      if (ret === -1 && MODULE_NAME.initialized) {
        if (!IS_WORKER_SCRIPT) {
          throw new MODULE_NAME.PythonError(MODULE_NAME.getExceptionInfo());
        } else {
          ret = {'_internal_coldbrew_error': true};
        }
      } else if (ret === -2) {
        throw getColdbrewConcurrencyError();
      }
      return ret;
    };
    if (!FAST_AND_SMALL_BUT_NO_ASYNC) {
      MODULE_NAME._runAsync = MODULE_NAME.Module.cwrap('export_runAsync', 'number', ['string'], {
        async: true,
      });
      MODULE_NAME.runAsync = function(script) {
        var retp = MODULE_NAME._runAsync(script);
        return retp.then(function(ret) {
          if (ret === -1 && MODULE_NAME.initialized) {
            if (!IS_WORKER_SCRIPT) {
              return Promise.reject(new MODULE_NAME.PythonError(MODULE_NAME.getExceptionInfo()));
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
    MODULE_NAME._runFile = MODULE_NAME.Module.cwrap('export__runFile', 'number', ['string']);
    if (!FAST_AND_SMALL_BUT_NO_ASYNC) {
      MODULE_NAME._runFileAsync = MODULE_NAME.Module.cwrap('export__runFileAsync', 'number', ['string'], {
        async: true,
      });
    }
    MODULE_NAME.getVariable = function(expression, allowProxy = !finalizedOptions.worker) {
      var uid = randid();
      MODULE_NAME.run('Coldbrew._run(Coldbrew.module_name_var+"._slots.'+uid+' = "+Coldbrew.json.dumps(Coldbrew._serialize_to_js('+expression+')))');
      var ret = (typeof MODULE_NAME._slots[uid] !== 'undefined') ? JSON.parse(MODULE_NAME._slots[uid]) : null;
      delete MODULE_NAME._slots[uid];
      if (allowProxy) {
        return unserializeFromPython(ret);
      } else {
        return ret;
      }
    };
    if (!FAST_AND_SMALL_BUT_NO_ASYNC) {
      MODULE_NAME.getVariableAsync = function(expression, allowProxy = !finalizedOptions.worker) {
        var uid = randid();
        return makePromiseChainable(MODULE_NAME.runAsync('Coldbrew._run(Coldbrew.module_name_var+"._slots.'+uid+' = "+Coldbrew.json.dumps(Coldbrew._serialize_to_js('+expression+')))').then(function() {
          var ret = (typeof MODULE_NAME._slots[uid] !== 'undefined') ? JSON.parse(MODULE_NAME._slots[uid]) : null;
          delete MODULE_NAME._slots[uid];
          if (allowProxy) {
            return unserializeFromPython(ret);
          } else {
            return ret;
          }
        }), !IS_WORKER_SCRIPT, !IS_WORKER_SCRIPT);
      };
    }
    MODULE_NAME.destroyAllVariables = function() {
      return MODULE_NAME.run("for uid in list(Coldbrew._vars):\n\ttry:\n\t\tdel Coldbrew._vars[uid]\n\texcept KeyError:\n\t\tpass");
    };
    MODULE_NAME.getExceptionInfo = function() {
      return MODULE_NAME.getVariable('Coldbrew._exception');
    };
    MODULE_NAME.runFunction = function(functionExpression, ...args) {
      return MODULE_NAME.getVariable('Coldbrew._call_func('+functionExpression+','+args.map(arg => serializeToPython(arg)).join(',')+')');
    };
    if (!FAST_AND_SMALL_BUT_NO_ASYNC) {
      MODULE_NAME.runFunctionAsync = function(functionExpression, ...args) {
        return MODULE_NAME.getVariableAsync('Coldbrew._call_func('+functionExpression+','+args.map(arg => serializeToPython(arg)).join(',')+')');
      };
    }
    MODULE_NAME.getenv = function() { 
      return MODULE_NAME.getVariable('{k:v for k,v in Coldbrew.os.environ.items()}') 
    };
    MODULE_NAME.setenv = function(envVar, val) {
      return MODULE_NAME.runFunction('Coldbrew.os.environ.__setitem__', envVar, val);
    };
    MODULE_NAME.unsetenv = function(envVar, val) {
      return MODULE_NAME.runFunction('(lambda x: Coldbrew._try(lambda: Coldbrew.os.environ.__delitem__(x)))', envVar);
    };
    MODULE_NAME.getcwd = MODULE_NAME.runFunction.bind(MODULE_NAME, 'Coldbrew._getcwd');
    MODULE_NAME._chdir = MODULE_NAME.Module.cwrap('export_chdir', 'number', ['string']);
    MODULE_NAME.chdir = function(path) {
      var ret = MODULE_NAME._chdir(path);
      if (ret === -2) {
        throw getColdbrewConcurrencyError();
      }
      return;
    };
    MODULE_NAME.listFiles = function(path='/') {
      return MODULE_NAME.Module.FS.$readdir(path)
        .filter(function(file) {
          return file !== '.' && file !== '..';
        })
        .map(function (file) {
          var analyzed = MODULE_NAME.Module.FS.$analyzePath(path+'/'+file);
          return {
            name: file,
            isFolder: analyzed.object.isFolder,
            isFile: !analyzed.object.isFolder,
            mode: analyzed.object.mode,
            timestamp: analyzed.object.timestamp,
          }
        });
    };
    MODULE_NAME.createFolder = function(path) {
      return MODULE_NAME.Module.FS.$mkdirTree(path);
    };
    MODULE_NAME.addFile = function(path, data) {
      if (path.indexOf('/') >= 0) {
        MODULE_NAME.Module.FS.$mkdirTree(path.split('/').slice(0,-1).join("/"));
      }
      MODULE_NAME.Module.FS.$writeFile(path, data);
    };
    if (JSZIP) {
      var JSZip;
      if ((!COLDBREW_GLOBAL_SCOPE || typeof COLDBREW_GLOBAL_SCOPE.JSZip === 'undefined')) {
        JSZip = module3.exports;
      } else {
        JSZip = COLDBREW_GLOBAL_SCOPE.JSZip;
      }
      MODULE_NAME.addFilesFromZip = function(path, urlToZip) {
        return new Promise(function (resolve, reject) {
          MODULE_NAME._sendRequest('GET', urlToZip, null, {}, null, true)
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
                MODULE_NAME.addFile(path+'/'+file, textData);
              });
            } else {
              return MODULE_NAME.createFolder(path+'/'+file);
            }
          }));
        });
      };
      MODULE_NAME.downloadPathToZip = function(path, downloadName='download.zip') {
        var zip = new JSZip();
        var zipHelper = function(path, basePath) {
          if (MODULE_NAME.Module.FS.$analyzePath(path).object 
            && MODULE_NAME.Module.FS.$analyzePath(path).object.isFolder) {
            var fileList = MODULE_NAME.listFiles(path);
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
            zip.file(zippedPath, MODULE_NAME.readBinaryFile(path));
          }
        };
        path = path.replace(/\/+/g, '/');
        if (path.length > 1 && path.slice(-1) === '/') {
          path = path.slice(0, -1);
        }
        var basePath = path + '/';
        if (MODULE_NAME.pathExists(path) && MODULE_NAME.pathExists(path).isFile) {
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
    MODULE_NAME.readFile = function(path) {
      return MODULE_NAME._textDecoder.decode(MODULE_NAME.Module.FS.$readFile(path));
    };
    MODULE_NAME.readBinaryFile = function(path) {
      return MODULE_NAME.Module.FS.$readFile(path);
    };
    MODULE_NAME.pathExists = function(path) {
      var analyzed = MODULE_NAME.Module.FS.$analyzePath(path);
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
    MODULE_NAME.deletePath = function(path) {
      var deleteHelper = function(path) {
        if (MODULE_NAME.Module.FS.$analyzePath(path).object 
          && MODULE_NAME.Module.FS.$analyzePath(path).object.isFolder) {
          var fileList = MODULE_NAME.listFiles(path);
          if (fileList.length > 0) {
            fileList.forEach(function (file) {
              deleteHelper(path+'/'+file.name);
            });
          }
          MODULE_NAME.Module.FS.$rmdir(path);
        } else {
          MODULE_NAME.Module.FS.$unlink(path);
        }
      };
      if (path.length > 0 && path.slice(-1) === '/') {
        path = path.slice(0, -1);
      }
      deleteHelper(path);
      return true;
    };
    MODULE_NAME.saveFiles = function() {
      if (IS_NODE_JS) {
        MODULE_NAME.run('Coldbrew._warn("No need to use saveFiles() when using Node.js, files are persisted automatically.")');
        return Promise.resolve(true);
      }
      var isPersistable = Object.keys(mountPoints).map(function(mountPoint) {
        var isPersist = mountPoints[mountPoint] & 2;
        return !!isPersist;
      }).includes(true);
      return new Promise(function (resolve, reject) {
        if (isPersistable) {
          return MODULE_NAME.Module.FS.$syncfs(0, function(err) {
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
    MODULE_NAME.loadFiles = function() {
      if (IS_NODE_JS) {
        MODULE_NAME.run('Coldbrew._warn("No need to use loadFiles() when using Node.js, persisted files are loaded automatically.")');
        return Promise.resolve(true);
      }
      var isPersistable = Object.keys(mountPoints).map(function(mountPoint) {
        var isPersist = mountPoints[mountPoint] & 2;
        return !!isPersist;
      }).includes(true);
      return new Promise(function (resolve, reject) {
        if (isPersistable) {
          return MODULE_NAME.Module.FS.$syncfs(1, function(err) {
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
    MODULE_NAME.runFile = function(path, options={}) {
      var oldcwd = MODULE_NAME.getcwd();
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
      var ret = MODULE_NAME._runFile(path);
      if (ret === -2) {
        throw getColdbrewConcurrencyError();
      }
      MODULE_NAME.chdir(oldcwd);
      return ret;
    };
    if (!FAST_AND_SMALL_BUT_NO_ASYNC) {
      MODULE_NAME.runFileAsync = function(path, options={}) {
        var oldcwd = MODULE_NAME.getcwd();
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
        var retp = MODULE_NAME._runFileAsync(path);
        return retp.then(function(ret) {
          if (ret === -2) {
            throw getColdbrewConcurrencyError();
          }
          MODULE_NAME.chdir(oldcwd);
          return ret;
        }).then(defer);
      };
    }
    MODULE_NAME.resetenv = function() {
      Object.keys(MODULE_NAME.getenv()).forEach(function(key) {
        if (typeof MODULE_NAME._ORIGINAL_ENV_[key] !== 'undefined') {
          MODULE_NAME.setenv(key, MODULE_NAME._ORIGINAL_ENV_[key]);
        } else {
          MODULE_NAME.unsetenv(key);
        }
      });
    };
    MODULE_NAME._initializer = function() {
      MODULE_NAME.run('Coldbrew._finalized_options = '+serializeToPython(finalizedOptions));
      if (finalizedOptions.worker) {
        MODULE_NAME._setAsyncYieldRate(2147483647);
      }
      if (finalizedOptions.asyncYieldRate !== null && typeof finalizedOptions.asyncYieldRate !== 'undefined') {
        MODULE_NAME.setAsyncYieldRate(finalizedOptions.asyncYieldRate);
      }
      var res = MODULE_NAME.run('Coldbrew._clear_argv()');
      res = res + MODULE_NAME.runFunction('Coldbrew._append_argv', 'MODULE_NAME_LOWER.py');
      MODULE_NAME._ORIGINAL_ENV_ = MODULE_NAME.getenv();
      if (res === 0) {
        MODULE_NAME.initialized = true;
        if (!finalizedOptions.hideWarnings) {
          console.warn('Initialized MODULE_NAME Python Environment.');
        }
      } else {
        throw new Error('Failed to initialize MODULE_NAME Python Environment.');
      }
    };
    MODULE_NAME._reset = MODULE_NAME.Module.cwrap('export_reset', null, []);
    MODULE_NAME.reset = function() {
      MODULE_NAME._standardInTell = 0;
      var ret = MODULE_NAME._reset();
      if (ret === -2) {
        throw getColdbrewConcurrencyError();
      }
      MODULE_NAME._initializer();
      return ret;
    };
    if (finalizedOptions.monitorFileUsage) {
      console.warn('Coldbrew is monitoring file usage...use `MODULE_NAME.getUsedFiles()` after running through all relevant code paths in your Python program.');
      var _oldOpen = MODULE_NAME.Module.FS.$open.bind(MODULE_NAME.Module.FS);
      MODULE_NAME.Module.FS.open = function(...args) {
        if (args[0].startsWith && args[0].startsWith('/usr/local/lib/python')) {
          MODULE_NAME._usedFiles.add(args[0]);
        }
        return _oldOpen(...args)
      };
    }
    MODULE_NAME.getUsedFiles = function() {
      return Array.from(MODULE_NAME._usedFiles).join('\n');
    };
    MODULE_NAME.getUnusedModules = function() {
      // Python doesn't boot without required modules
      var requiredModules = ["gc", "imp", "faulthandler", "_tracemalloc",  "_signal"];
      var usedModules = MODULE_NAME.runFunction('Coldbrew._get_imported_modules').concat(requiredModules);
      var allModules = "BUILTIN_MODULES".split(" ");
      return JSON.stringify(allModules.filter(function(module) {
        return !usedModules.includes(module);
      }));
    };
    if (!MODULE_NAME.loaded) {
      MODULE_NAME.onReady(function() {
        MODULE_NAME._initializer();
      });
    }
    MODULE_NAME.onReady(onReadyFunc);
  });
};
MODULE_NAME.unload = function(arg1, arg2) {
  if (MODULE_NAME.loaded) {
    MODULE_NAME.run('pass');
    Object.getOwnPropertyNames(MODULE_NAME).forEach(function (prop) {
      delete MODULE_NAME[prop];
    });
    var oldModule = null;
    if (IS_NODE_JS) {
      oldModule = module;
      module = {exports: {}};
    }
    COLDBREW_TOP_SCOPE.Worker.terminateAllWorkers(true);
    COLDBREW_TOP_SCOPE_FUNC(false, MODULE_NAME);
    if (IS_NODE_JS) {
      module = oldModule;
    }
  }
};
MODULE_NAME.load = function(options = {}) {
  var finalizedOptions = finalizeMainOptions(options);
  if (options.worker && !IS_WORKER_SCRIPT && !MODULE_NAME.loaded) {
    MODULE_NAME._finalizedOptions = finalizedOptions;
    var worker = new COLDBREW_TOP_SCOPE.Worker(SCRIPT_SOURCE);
    var MODULE_NAME_proxy = getComlink().proxy(worker);
    MODULE_NAME.worker = worker;
    MODULE_NAME._workerProxy = MODULE_NAME_proxy;
    return new Promise(function (resolve, reject) {
      worker.addEventListener("message", function workerReadyHandler(event) {
        if (event.data._internal_coldbrew_message && event.data.ready) {
          // Worker is ready, load Coldbrew in the worker
          MODULE_NAME._workerProxy.load(options);
        } else if (event.data._internal_coldbrew_message && event.data.download_url) {
          var aElement = document.createElement("a");
          aElement.href = event.data.download_url;
          aElement.download = event.data.download_name;
          aElement.click();
        } else if (event.data._internal_coldbrew_message && event.data.props) {
          // Assign the proxied properties of the worker module to the main module
          Object.keys(event.data.props).forEach(function (prop) {
            if (!['unload', '_parseUrl', 'createNewInstance', 'PythonVariable', 'PythonError', 'PythonKeywords', '_getMainVariable', '_callFunc', '_try', '_convertError', 'onStandardInRead', 'onStandardInReadAsync'].includes(prop) && event.data.props[prop] === 'function') {
              MODULE_NAME[prop] = function(...args) {
                var serializedArgs = args.map(function(arg) {
                  return serializeToJS(arg);
                });
                var result = Promise.all(serializedArgs)
                  .then(function(serializedArgs) {
                    var retp = MODULE_NAME_proxy[prop](...serializedArgs);
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
              Object.defineProperty(MODULE_NAME, prop, {
                get: MODULE_NAME_proxy[prop],
                set: function(val) {
                  return MODULE_NAME_proxy[prop](prop, val);
                }
              });
            }
          });
          MODULE_NAME.Module = null;
          MODULE_NAME.loaded = true;
          MODULE_NAME.run = MODULE_NAME.runAsync;
          MODULE_NAME.runFunction = MODULE_NAME.runFunctionAsync;
          MODULE_NAME.runFile = MODULE_NAME.runFileAsync;
          MODULE_NAME.getVariable = MODULE_NAME.getVariableAsync;
          // Done loading Coldbrew with worker option
          resolve();
        } else if (event.data._internal_coldbrew_message && event.data._get_var_action) {
          (async function() {
            var value = null;
            var getvar = MODULE_NAME._main_thread_vars[event.data.uid];
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
              delete MODULE_NAME._main_thread_vars[event.data.uid];
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
            MODULE_NAME.worker.postMessage({
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
              // MODULE_NAME.PythonVariable.isPythonVariable(),
              // but since that method calls back into Python we
              // cannot use it here.
              isPythonVariable = true;
              obj = {
                '_internal_coldbrew_var': true,
                'uid': await obj.__uid__,
              };
            }
            MODULE_NAME._main_thread_vars[event.data.uid] = obj;
            MODULE_NAME.worker.postMessage({
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
      MODULE_NAME._load(options, function() {
        // Notify parent of what properties were loaded in, so they can be proxied
        if (IS_WORKER_SCRIPT) {
          postMessage({
            '_internal_coldbrew_message': true, 
            'props': Object.getOwnPropertyNames(MODULE_NAME).reduce(function(props, prop) {
              props[prop] = typeof MODULE_NAME[prop];
              return props;
            }, {})
          });
        }
        resolve();
      });
    });
  }
};
MODULE_NAME.createNewInstance = function() {
  return COLDBREW_TOP_SCOPE_FUNC(false);
};
MODULE_NAME.onReady = function(onReadyFunc) {
  if (onReadyFunc) {
    if (MODULE_NAME.loaded) {
      onReadyFunc(null, MODULE_NAME);
    } else {
      MODULE_NAME._queuedOnReady.push(onReadyFunc);
    }
  }
};
MODULE_NAME._sendRequest = sendRequest;
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
      getComlink().expose(MODULE_NAME, messageAdapter);
    } else {
      getComlink().expose(MODULE_NAME, self);
    }
    var responsePromises = {};
    addEventListener("message", function GetVarHandler(event) {
      if (event.data._internal_coldbrew_message && event.data._get_var_action_response) {
        var resolve = responsePromises[event.data.actionId];
        delete responsePromises[event.data.actionId];
        resolve(unserializeFromJS(event.data.value));
      } else if (event.data._internal_coldbrew_message && event.data._get_var) {
        MODULE_NAME._pending_main_thread_vars.add(event.data._get_var);
        MODULE_NAME._main_thread_vars[event.data._get_var] = new Proxy(function() {}, {
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
        if (typeof MODULE_NAME._getMainVariableResponsePromises[event.data._get_var] !== 'undefined') {
          if (event.data.serializable) {
            delete MODULE_NAME._main_thread_vars[event.data._get_var];
            MODULE_NAME._getMainVariableResponsePromises[event.data._get_var](event.data.serializable_obj);
          } else if (event.data._internal_coldbrew_var) {
            delete MODULE_NAME._main_thread_vars[event.data._get_var];
            MODULE_NAME._getMainVariableResponsePromises[event.data._get_var](event.data._internal_coldbrew_var);
          } else {
            MODULE_NAME._getMainVariableResponsePromises[event.data._get_var]({
              '_internal_coldbrew_get_var': true,
              'uid': event.data._get_var,
            });
          }
          delete MODULE_NAME._getMainVariableResponsePromises[event.data._get_var];
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

    CUSTOMIZED_EXPORTS

    // DO NOT TOUCH THE LINE ABOVE - IT IS AUTO REPLACED

    if (EXPORT === null || typeof EXPORT === 'undefined') {
      EXPORT = Coldbrew;
    }
    return EXPORT;
  })(MODULE_NAME);

  if (typeof module !== 'undefined') module.exports = EXPORT;
  if (typeof window !== 'undefined') window.MODULE_NAME = EXPORT;
  if (typeof self !== 'undefined') self.MODULE_NAME = EXPORT;

  // Inside a pthread, provide _MODULE_NAME_coldbrew_internal_
  if (ENABLE_THREADING && IS_THREAD_SCRIPT) {
    COLDBREW_GLOBAL_SCOPE._MODULE_NAME_coldbrew_internal_ = _MODULE_NAME_coldbrew_internal_; 
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