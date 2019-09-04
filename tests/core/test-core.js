const utils = require('../utils');
const { expect } = require('chai');

describe('Core Coldbrew Functionality', () => {
  describe('Initialization', () => {
    it('should initialize properly', async function () {
      return expect(this.test.load).to.eventually.equal(undefined);
    });

    it('should unload properly', async function () {
      var before = (await utils.eval(this, () => {
        return Object.keys(Coldbrew);
      })).includes('run');
      var after = (await utils.eval(this, () => {
        Coldbrew.unload();
        return Object.keys(Coldbrew);
      })).includes('run');
      return expect(before).to.not.equal(after);
    });

    it('should display warnings', async function () {
      var warns = await utils.eval(this, () => {
        window.clearConsole();
        Coldbrew.unload();
        return Coldbrew.load().then(() => window.consoleWarns);
      });
      return expect(warns.length).to.equal(1);
    });

    it('should be able to hide warnings', async function () {
      var warns = await utils.eval(this, () => {
        window.clearConsole();
        Coldbrew.unload();
        return Coldbrew.load({hideWarnings: true}).then(() => window.consoleWarns);
      });
      return expect(warns.length).to.equal(0);
    });

    it('should be able launch in worker mode', async function () {
      var workerType = utils.eval(this, () => {
        Coldbrew.unload();
        return Coldbrew.load({worker: true}).then(() => typeof Coldbrew.worker);
      });
      return expect(workerType).to.eventually.equal('object');
    });
  });

  describe('Basic Cross Language Interaction', () => {
    it('should allow running Python in JavaScript', async function () {
      var logs = await utils.eval(this, () => {
        window.clearConsole();
        Coldbrew.run("import sys");
        Coldbrew.run("print('The current Python version is:', sys.version)");
        return window.consoleLogs;
      });
      expect(logs[0][0]).to.include('The current Python version is');
      expect(logs[1][0]).to.include('[GCC Clang');
      return expect(logs[1][0]).to.include('(Emscripten ');
    });

    it('should allow running Python asynchronously in JavaScript', async function () {
      var logs = await utils.eval(this, () => {
        window.clearConsole();
        for(var i=0; i<2; i++) {
          setTimeout(function() { 
            console.log("Every 1 second for 2 seconds from JavaScript.") 
          }, (i+1)*1000); 
        }
        return Coldbrew.runAsync('from time import sleep\nfor i in range(2):\n\tsleep(1)\n\tprint("Every 1 second for 2 seconds from Python.")')
          .then(() => window.consoleLogs);
      });
      expect(logs.length).to.equal(4);
      expect(logs[0][0]).to.include('from JavaScript');
      return expect(logs[1][0]).to.include('from Python');
    });

    it('should allow running JavaScript in Python', async function () {
      var x = utils.eval(this, () => {
        Coldbrew.run("Coldbrew.run('x = 5;')");
        return x;
      });
      return expect(x).to.eventually.equal(5);
    });

    it('should allow running Python files in JavaScript', async function () {
      var logs = await utils.eval(this, () => {
        window.clearConsole();
        Coldbrew.runFile('add.py', {
          cwd: '/coldbrew/examples',
          env: {},
          args: ['5', '15', '-v']
        });
        return window.consoleLogs;
      });
      return expect(logs[0][0]).to.include('5 + 15 is 20');
    });

    it('should allow running Python files asynchronously in JavaScript', async function () {
      var logs = await utils.eval(this, () => {
        window.clearConsole();
        return Coldbrew.runFileAsync('add.py', {
          cwd: '/coldbrew/examples',
          env: {},
          args: ['5', '15', '-v']
        }).then(() => window.consoleLogs);
      });
      return expect(logs[0][0]).to.include('5 + 15 is 20');
    });

    it('should allow getting Python variables in JavaScript', async function () {
      var x = utils.eval(this, () => {
        Coldbrew.run("x = 5**2");
        return Coldbrew.getVariable("x");
      });
      return expect(x).to.eventually.equal(25);
    });

    it('should allow getting JavaScript variables in Python', async function () {
      var logs = await utils.eval(this, () => {
        window.clearConsole();
        window.x = Math.pow(5, 2);
        Coldbrew.run("print(Coldbrew.get_variable('x'))");
        return window.consoleLogs;
      });
      return expect(logs[0][0]).to.equal("25");
    });

    it('should allow getting JavaScript asynchronous variables in Python', async function () {
      var logs = await utils.eval(this, () => {
        window.clearConsole();
        window.x = Promise.resolve(Math.pow(5, 2));
        return Coldbrew.runAsync("print(Coldbrew.get_variable('x'))").then(function() {
          return window.consoleLogs;
        });
      });
      return expect(logs[0][0]).to.equal("25");
    });

    it('should allow running Python functions in JavaScript', async function () {
      var result = utils.eval(this, () => {
        Coldbrew.run(
        `def foo(x, y):
          return x**y
        `);
        return Coldbrew.runFunction("foo", 5, 2);
      });
      return expect(result).to.eventually.equal(25);
    });

    it('should allow running Python functions asynchronously in JavaScript', async function () {
      var result = utils.eval(this, () => {
        Coldbrew.run(
        `def foo(x, y):
          return x**y
        `);
        var result = Coldbrew.runFunctionAsync("foo", 5, 2);
        if (result.then) {
          return result;
        }
      });
      return expect(result).to.eventually.equal(25);
    });

    it('should allow running Python functions with keywords in JavaScript', async function () {
      var result = utils.eval(this, () => {
        Coldbrew.run(
        `def foo(x, y=0):
          return x**y
        `);
        return Coldbrew.runFunction("foo", 5, Coldbrew.PythonKeywords({y: 2}));
      });
      return expect(result).to.eventually.equal(25);
    });

    it('should allow running Python functions with keywords asynchronously in JavaScript', async function () {
      var result = utils.eval(this, () => {
        Coldbrew.run(
        `def foo(x, y=0):
          return x**y
        `);
        var result = Coldbrew.runFunctionAsync("foo", 5, Coldbrew.PythonKeywords({y: 2}));
        if (result.then) {
          return result;
        }
      });
      return expect(result).to.eventually.equal(25);
    });

    it('should allow running JavaScript functions in Python', async function () {
      var logs = await utils.eval(this, () => {
        window.clearConsole();
        function foo(x, y) {
          return Math.pow(x, y);
        }
        window.foo = foo;
        Coldbrew.run("print(Coldbrew.run_function('foo', 5, 2))");
        return window.consoleLogs;
      });
      return expect(logs[0][0]).to.equal("25");
    });

    it('should allow running JavaScript asynchronous functions in Python', async function () {
      var logs = await utils.eval(this, () => {
        window.clearConsole();
        function foo(x, y) {
          return Promise.resolve(Math.pow(x, y));
        }
        window.foo = foo;
        return Coldbrew.runAsync("print(Coldbrew.run_function('foo', 5, 2))").then(function() {
          return window.consoleLogs;
        });
      });
      return expect(logs[0][0]).to.equal("25");
    });

    it('should throw a PythonError for bad Python code in JavaScript', async function () {
      var errorData = await utils.eval(this, () => {
        try {
          Coldbrew.run('print(x)');
        } catch (e) {
          if (e instanceof Coldbrew.PythonError) {
            return e.errorData;
          }
        }
      });
      var errorDataString = JSON.stringify(errorData, Object.keys(errorData).sort());
      var expectedErrorData = {
        "exctype": "NameError",
        "tb_lineno": 1,
        "value": "name 'x' is not defined",
        "filename": "<string>"
      };
      var expectedErrorDataString = JSON.stringify(expectedErrorData, Object.keys(expectedErrorData).sort());
      return expect(errorDataString).to.equal(expectedErrorDataString);
    });

    it('should reject with a PythonError for bad async Python code in JavaScript', async function () {
      var errorData = await utils.eval(this, () => {
        return Coldbrew.runAsync('print(x)').catch((e) => {
          if (e instanceof Coldbrew.PythonError) {
            return e.errorData;
          }
        });
      });
      var errorDataString = JSON.stringify(errorData, Object.keys(errorData).sort());
      var expectedErrorData = {
        "exctype": "NameError",
        "tb_lineno": 1,
        "value": "name 'x' is not defined",
        "filename": "<string>"
      };
      var expectedErrorDataString = JSON.stringify(expectedErrorData, Object.keys(expectedErrorData).sort());
      return expect(errorDataString).to.equal(expectedErrorDataString);
    });

    it('should throw a JavaScriptError for bad JavaScript code in Python', async function () {
      var errorData = await utils.eval(this, () => {
        Coldbrew.run("error_data = None\ntry:\n\tColdbrew.run('x')\nexcept Coldbrew.JavaScriptError as e:\n\terror_data = e.error_data");
        return Coldbrew.getVariable("error_data");
      });
      expect(errorData.stack).to.not.equal(undefined);
      delete errorData.stack;
      var errorDataString = JSON.stringify(errorData, Object.keys(errorData).sort());
      var expectedErrorData = {
        "data": null,
        "message": "x is not defined",
        "name": "ReferenceError",
        "type": "ReferenceError"
      };
      var expectedErrorDataString = JSON.stringify(expectedErrorData, Object.keys(expectedErrorData).sort());
      return expect(errorDataString).to.equal(expectedErrorDataString);
    });

    it('should set getExceptionInfo() for bad async Python code in JavaScript', async function () {
      var exceptionInfoSet = utils.eval(this, () => {
        return Coldbrew.runAsync('print(x)').catch((e) => {
          if (e instanceof Coldbrew.PythonError) {
            var errorData = e.errorData;
            var exceptionInfo = Coldbrew.getExceptionInfo();
            return JSON.stringify(errorData, Object.keys(errorData).sort()) === JSON.stringify(exceptionInfo, Object.keys(exceptionInfo).sort());
          }
        });
      });
      return expect(exceptionInfoSet).to.eventually.equal(true);
    });

    it('should set get_exception_info() for bad JavaScript code in Python', async function () {
      var exceptionInfoSet = utils.eval(this, () => {
        Coldbrew.run("error_data = None\ntry:\n\tColdbrew.run('x')\nexcept Coldbrew.JavaScriptError as e:\n\terror_data = e.error_data");
        Coldbrew.run("exception_info_set = error_data == Coldbrew.get_exception_info(); print('1', error_data); print('2', Coldbrew.get_exception_info())");
        return Coldbrew.getVariable("exception_info_set");
      });
      return expect(exceptionInfoSet).to.eventually.equal(true);
    });

    it('should allow running Python after a Python error', async function () {
      var x = utils.eval(this, () => {
        try {
          Coldbrew.run("print(x)");
        } catch (e) {
          Coldbrew.run("x = 5**2");
          return Coldbrew.getVariable("x");
        }
      });
      return expect(x).to.eventually.equal(25);
    });
  });

  describe('Asynchronosity', () => {
    // load yield rate
    // set yield rate
    // get yield rate
    // worker yield rate
    // verify yield rate faster
    // warn if two async calls in flight at same time

  });
  
  describe('Environment', () => {
    // Env variables
    // File System
    // File System persistence
    // Monitor file Usage
    // Resetting the environment
  });

  describe('Python Shims', () => {
    it('should allow time.sleep() synchronously in Python', async function () {
      var time = utils.eval(this, () => {
        var before = Date.now();
        Coldbrew.run("from time import sleep; sleep(2)");
        return Date.now()-before;
      });
      return expect(time).to.eventually.be.above(2000);
    });

    it('should allow time.sleep() asynchronously in Python', async function () {
      var time = utils.eval(this, () => {
        var before = Date.now();
        return Coldbrew.runAsync("from time import sleep; sleep(2)").then(function() {
          return Date.now()-before;
        });
      });
      return expect(time).to.eventually.be.above(2000);
    });


    it('should allow HTTP requests in Python', async function () {
      var logs = await utils.eval(this, () => {
        window.clearConsole();
        return Coldbrew.runAsync('import urllib.request; print(urllib.request.urlopen("http://localhost:8000/remote/example.txt").read())').then(function() {
          return window.consoleLogs;
        });
      });
      return expect(logs[0][0]).to.include('downloaded from a remote server');
    });

    it('should by default redirect standard output to console.log', async function () {
      var logs = await utils.eval(this, () => {
        window.clearConsole();
        Coldbrew.run('print("Hello World!")');
        return window.consoleLogs;
      });
      return expect(logs[0][0]).to.include('Hello World!');
    });

    it('should by default redirect standard error to console.warn', async function () {
      var warns = await utils.eval(this, () => {
        window.clearConsole();
        Coldbrew.run('import sys; print("Hello World!", file=sys.stderr)');
        return window.consoleWarns;
      });
      return expect(warns[0][0]).to.include('Hello World!');
    });

    it('should allow redirecting of standard output', async function () {
      var output = utils.eval(this, () => {
        var outputPromise = new Promise(function(resolve, reject) {
          Coldbrew.onStandardOut = function(line) {
            resolve(line);
          };
        });
        Coldbrew.run('print("Hello World!")');
        return outputPromise;
      });
      return expect(output).to.eventually.include('Hello World!');
    });

    it('should allow redirecting of standard error', async function () {
      var output = utils.eval(this, () => {
        var outputPromise = new Promise(function(resolve, reject) {
          Coldbrew.onStandardErr = function(line) {
            resolve(line);
          };
        });
        Coldbrew.run('import sys; print("Hello World!", file=sys.stderr)');
        return outputPromise;
      });
      return expect(output).to.eventually.include('Hello World!');
    });

    it('should by default use buffer when reading from standard input', async function () {
      var logs = await utils.eval(this, () => {
        window.clearConsole();
        Coldbrew.run('print(input())');
        return window.consoleLogs;
      });
      return expect(logs[0][0]).to.include('This is the first line of standard input.');
    });

    it('should by default use buffer when reading from standard input asynchronously', async function () {
      var logs = await utils.eval(this, () => {
        window.clearConsole();
        return Coldbrew.runAsync('print(input())').then(function() {
          return window.consoleLogs;
        });
      });
      return expect(logs[0][0]).to.include('This is the first line of standard input.');
    });

    it('should use standard input read function when reading from standard input', async function () {
      var logs = await utils.eval(this, () => {
        window.clearConsole();
        var readBuffer = 'Hello World!\n';
        var tell = 0;
        Coldbrew.onStandardInRead = function(size) {
          var read = readBuffer.substring(tell, tell+size);
          tell += size;
          return read;
        };
        Coldbrew.run('print(input())');
        return window.consoleLogs;
      });
      return expect(logs[0][0]).to.include('Hello World!');
    });

    it('should use standard input read function when reading from standard input asynchronously', async function () {
      var logs = await utils.eval(this, () => {
        window.clearConsole();
        var readBuffer = 'Hello World!\n';
        var tell = 0;
        Coldbrew.onStandardInRead = function(size) {
          var read = readBuffer.substring(tell, tell+size);
          tell += size;
          return read;
        };
        return Coldbrew.runAsync('print(input())').then(function() {
          return window.consoleLogs;
        });
      });
      return expect(logs[0][0]).to.include('Hello World!');
    });

    it('should use standard input read async function when reading from standard input asynchronously', async function () {
      var logs = await utils.eval(this, () => {
        window.clearConsole();
        var readBuffer = 'Hello World!\n';
        var tell = 0;
        Coldbrew.onStandardInReadAsync = function(size) {
          var read = readBuffer.substring(tell, tell+size);
          tell += size;
          return Promise.resolve(read);
        };
        return Coldbrew.runAsync('print(input())').then(function() {
          return window.consoleLogs;
        });
      });
      return expect(logs[0][0]).to.include('Hello World!');
    });
  });

  // Don't allow unload when in async calls are inflight

  // Bridge
  // Make sure bridge variables work
  // Make sure PythonError, PythonVariable classes work with worker mode


  // Threading
  // test sync
  // test async (sleep, http, yielding)
  // test running multiple times
  // test bridge interaction
  // test worker mode with threading
  // test what happens when # of workers < # of threads

  // Worker
  // test run is window scoped
  // test get variable is window scoped
  // test run function is window scoped
  // test file system works
  // test file system persistence works
  // test standard input, output, error works
  // test network works
  // test download file system as zip works
  // make sure reset works

  // Node
  // test HTTP shim
  // test readFile
  // test worker mode works
  // test add files from zip file 
  // test threading
});