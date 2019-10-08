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

    it('should be able launch a separate instance', async function () {
      var logs = await utils.eval(this, () => {
        window.clearConsole();
        Coldbrew.run('x = 5');
        var Coldbrew2 = Coldbrew.createNewInstance();
        return Coldbrew2.load().then(function() { 
          Coldbrew.run('x += 1');
          Coldbrew2.run('x = 10');
          Coldbrew2.run('x += 1');
          Coldbrew.run('print(x)');
          Coldbrew2.run('print(x)');
          return window.consoleLogs;
        });
      });
      expect(logs[0][0]).to.equal('6');
      return expect(logs[1][0]).to.equal('11');
    });

    // Works in Firefox, but not Chrome at the time of writing this test, skip until fixed
    it.skip('should be able to grow the WebAssembly memory', async function() {
      var result = utils.eval(this, () => {
        try {
          Coldbrew.run('memory = []');
          // Allocate 100MB
          for (var i = 0; i < 10; i++) {
            Coldbrew.run('memory.append([0]*(1024*1024*10))');
          }
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return
      });
      return expect(result).to.eventually.be.true;
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
      expect(logs[1][0]).to.include('[Clang');
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

    it('should allow getting Python variables asynchronously in JavaScript', async function () {
      var x = utils.eval(this, () => {
        Coldbrew.run("x = 5**2");
        return Coldbrew.getVariableAsync("x").then(function(x) {
          return x;
        });
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


    it('should allow getting JavaScript asynchronous variables that are undefined in Python', async function () {
      var logs = await utils.eval(this, () => {
        window.clearConsole();
        window.x = Promise.resolve(undefined);
        return Coldbrew.runAsync("print(Coldbrew.get_variable('x'))").then(function() {
          return window.consoleLogs;
        });
      });
      return expect(logs[0][0]).to.equal("None");
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
    
    it('should have a default async yield rate', async function () {
      var rate = utils.eval(this, () => {
        return Coldbrew.getAsyncYieldRate();
      });
      return expect(rate).to.eventually.equal(100);
    });

    it('should allow you to set the async yield rate at load', async function () {
      var rate = utils.eval(this, () => {
        Coldbrew.unload();
        return Coldbrew.load({asyncYieldRate:1337}).then(() => Coldbrew.getAsyncYieldRate());
      });
      return expect(rate).to.eventually.equal(1337);
    });

    it('should allow you to set the async yield rate', async function () {
      var rate = utils.eval(this, () => {
        Coldbrew.setAsyncYieldRate(1337);
        return Coldbrew.getAsyncYieldRate();
      });
      return expect(rate).to.eventually.equal(1337);
    });

    it('should not allow you to set the async yield rate at load in worker mode', async function () {
      var rate = utils.eval(this, () => {
        Coldbrew.unload();
        return Coldbrew.load({asyncYieldRate:1337, worker: true}).then(() => Coldbrew.getAsyncYieldRate());
      });
      return expect(rate).to.eventually.equal(Infinity);
    });

    it('should not allow you to set the async yield rate in worker mode', async function () {
      var rate = utils.eval(this, () => {
        Coldbrew.unload();
        return Coldbrew.load({worker: true}).then(function() {
          Coldbrew.setAsyncYieldRate(1337);
          return Coldbrew.getAsyncYieldRate()
        });
      });
      return expect(rate).to.eventually.equal(Infinity);
    });

    it('should be significantly faster with a higher yield rate', async function () {
      var timeDifference = utils.eval(this, async () => {
        var before;
        before = Date.now(); 
        Coldbrew.setAsyncYieldRate(10);
        await Coldbrew.runAsync('for i in range(100):\n\tprint(i)');
        var total = Date.now() - before;
        Coldbrew.setAsyncYieldRate(100);
        before = Date.now(); 
        await Coldbrew.runAsync('for i in range(100):\n\tprint(i)');
        var total2 = Date.now() - before;
        return total2/total;
      });
      return expect(timeDifference).to.eventually.be.below(.5);
    });

    it('should error if starting new synchronous execution with synchronous execution already in flight', async function () {
      var errorMessage = await utils.eval(this, () => {
        window.clearConsole();
        try {
          Coldbrew.run('Coldbrew.run("Coldbrew.run(\'print(1)\')")');
        } catch (e) {
          return e.message;
        }
      });
      return expect(errorMessage).to.include('already running');
    });

    it('should error if starting new synchronous execution with asynchronous execution already in flight', async function () {
      var errorMessage = await utils.eval(this, () => {
        window.clearConsole();
        Coldbrew.runAsync('for i in range(100):\n\tprint(i)');
        try {
          Coldbrew.run('for i in range(100):\n\tprint(i)');
        } catch (e) {
          return e.message;
        }
      });
      return expect(errorMessage).to.include('already running');
    });

    it('should error if starting new synchronous execution of Python file with asynchronous execution already in flight', async function () {
      var errorMessage = await utils.eval(this, () => {
        window.clearConsole();
        Coldbrew.runAsync('for i in range(100):\n\tprint(i)');
        try {
          Coldbrew.runFile('add.py', {
            cwd: '/coldbrew/examples',
            env: {},
            args: ['5', '15', '-v']
          });
        } catch (e) {
          return e.message;
        }
      });
      return expect(errorMessage).to.include('already running');
    });

    it('should error if starting new asynchronous execution with one already in flight', async function () {
      var errorMessage = await utils.eval(this, async () => {
        window.clearConsole();
        Coldbrew.runAsync('for i in range(100):\n\tprint(i)');
        try {
          await Coldbrew.runAsync('for i in range(100):\n\tprint(i)');
        } catch (e) {
          return e.message;
        }
      });
      return expect(errorMessage).to.include('already running');
    });

    it('should error if starting new asynchronous execution of Python file with one already in flight', async function () {
      var errorMessage = await utils.eval(this, async () => {
        window.clearConsole();
        Coldbrew.runAsync('for i in range(100):\n\tprint(i)');
        try {
          await Coldbrew.runFileAsync('add.py', {
            cwd: '/coldbrew/examples',
            env: {},
            args: ['5', '15', '-v']
          });
        } catch (e) {
          return e.message;
        }
      });
      return expect(errorMessage).to.include('already running');
    });

    it('should warn if sleeping without running asynchronously', async function () {
      var warns = await utils.eval(this, () => {
        window.clearConsole();
        Coldbrew.run('from time import sleep; sleep(.1)');
        return window.consoleWarns;
      });
      return expect(warns[0][0]).to.include('busy wait');
    });

    it('should error if getting JavaScript asynchronous variable without running asynchronously', async function () {
      var errors = await utils.eval(this, () => {
        window.clearConsole();
        window.x = Promise.resolve(Math.pow(5, 2));
        try {
          Coldbrew.run("print(Coldbrew.get_variable('x'))");
        } catch (e) {
          return window.consoleErrors;
        }
      });
      return expect(errors[0][0]).to.include('Python tried to access a JavaScript Promise.');
    });

    it('should error if making HTTP request without running asynchronously', async function () {
      var errors = await utils.eval(this, () => {
        window.clearConsole();
        try {
          Coldbrew.run('import urllib.request; print(urllib.request.urlopen("http://localhost:8000/remote/example.txt").read())');
        } catch (e) {
          return window.consoleErrors;
        }
      });
      return expect(errors[0][0]).to.include('Python tried to make an HTTP request.');
    });
  });
  
  describe('Environment', () => {
    it('should have environment variables defined by default', async function () {
      var defaultKeys = new Set(["PYTHONHOME", "LOGNAME", "USER", "HOME", "FILES", "COLDBREW", "PYVERSION", "COLDBREW_VERSION", "COLDBREW_MODULE_NAME", "COLDBREW_MODULE_NAME_LOWER", "COLDBREW_WARNINGS"]);
      var envKeys = new Set(await utils.eval(this, () => {
        return Object.keys(Coldbrew.getenv());
      }));
      var isSubset = Array.from(defaultKeys.values()).every(function(key) {
        return envKeys.has(key);
      });
      return expect(isSubset).to.be.true;
    });

    it('should let you set environment variables', async function () {
      var env = await utils.eval(this, () => {
        Coldbrew.setenv('FOO', '1');
        return Coldbrew.getenv();
      });
      return expect(env['FOO']).to.equal('1');
    });

    it('should let you unset environment variables', async function () {
      var env = await utils.eval(this, () => {
        Coldbrew.setenv('FOO', '1');
        Coldbrew.unsetenv('NOTDEFINED');
        Coldbrew.unsetenv('FOO');
        return Coldbrew.getenv();
      });
      return expect(env['FOO']).to.equal(undefined);
    });

    it('should let you reset environment variables', async function () {
      var envKeys = await utils.eval(this, () => {
        var oldEnv = Object.keys(Coldbrew.getenv());
        Coldbrew.setenv('FOO', '1');
        var modifiedEnv = Object.keys(Coldbrew.getenv());
        Coldbrew.resetenv();
        return [oldEnv, modifiedEnv, Object.keys(Coldbrew.getenv())];
      });
      expect(envKeys[0].length).to.not.equal(envKeys[1].length);
      return expect(envKeys[0].length).to.equal(envKeys[2].length);
    });

    it('should let you list top level files', async function () {
      var defaultFolders = new Set(["tmp", "home", "dev", "proc", ".filesystem", ".slots", "usr", "coldbrew"])
      var files = await utils.eval(this, () => {
        return Coldbrew.listFiles();
      });
      var allFolders = Object.values(files).every(function(file) {
        return file.isFolder;
      });
      var filesAreDefaultFolders = defaultFolders.size === files.length && Array.from(defaultFolders.values()).every(function(folder) {
        return (new Set(files.map(f => f.name))).has(folder);
      });
      return expect(allFolders && filesAreDefaultFolders).to.be.true;
    });

    it('should let you list a directory\'s files with a trailing slash', async function () {
      var exampleFiles = new Set(["add.py", "fib.py", "threads.py"])
      var files = await utils.eval(this, () => {
        return Coldbrew.listFiles('/coldbrew/examples/');
      });
      var allFiles = Object.values(files).every(function(file) {
        return file.isFile;
      });
      var filesAreExampleFiles = exampleFiles.size === files.length && Array.from(exampleFiles.values()).every(function(file) {
        return (new Set(files.map(f => f.name))).has(file);
      });
      return expect(allFiles && filesAreExampleFiles).to.be.true;
    });

    it('should let you list a directory\'s files without a trailing slash', async function () {
      var exampleFiles = new Set(["add.py", "fib.py", "threads.py"])
      var files = await utils.eval(this, () => {
        return Coldbrew.listFiles('/coldbrew/examples');
      });
      var allFiles = Object.values(files).every(function(file) {
        return file.isFile;
      });
      var filesAreExampleFiles = exampleFiles.size === files.length && Array.from(exampleFiles.values()).every(function(file) {
        return (new Set(files.map(f => f.name))).has(file);
      });
      return expect(allFiles && filesAreExampleFiles).to.be.true;
    });

    it('should not let you list a file path', async function () {
      var files = utils.eval(this, () => {
        return Coldbrew.listFiles('/coldbrew/examples/add.py');
      });
      return expect(files).to.eventually.be.rejected;
    });

    it('should not let you list a unknown path', async function () {
      var files = utils.eval(this, () => {
        return Coldbrew.listFiles('/unknown/a/b/c');
      });
      return expect(files).to.eventually.be.rejected;
    });

    it('should let you create a top level folder', async function () {
      var files = await utils.eval(this, () => {
        Coldbrew.createFolder('/new_folder_test');
        return Coldbrew.listFiles('/new_folder_test');
      });
      return expect(files.length).to.equal(0);
    });

    it('should let you create a nested folder', async function () {
      var files = await utils.eval(this, () => {
        Coldbrew.createFolder('/new_folder_test/a/b/c/d');
        return Coldbrew.listFiles('/new_folder_test/a/b/c/d');
      });
      return expect(files.length).to.equal(0);
    });

    it('should let you add a top level file', async function () {
      var files = await utils.eval(this, () => {
        Coldbrew.addFile('/new_file_text.txt', 'Hello World!');
        return Coldbrew.listFiles('/');
      });
      return expect(files.find(f => f.name === 'new_file_text.txt')).to.not.equal(undefined);
    });

    it('should let you add a nested file', async function () {
      var files = await utils.eval(this, () => {
        Coldbrew.addFile('/new_folder_test/a/b/c/d/new_file_text.txt', 'Hello World!');
        return Coldbrew.listFiles('/new_folder_test/a/b/c/d');
      });
      return expect(files.find(f => f.name === 'new_file_text.txt')).to.not.equal(undefined);
    });

    it('should let you check if a file path exists', async function () {
      var file = await utils.eval(this, () => {
        return Coldbrew.pathExists('/coldbrew/examples/add.py');
      });
      return expect(file.isFile).to.be.true;
    });

    it('should let you check if a folder path exists with a trailing slash', async function () {
      var file = await utils.eval(this, () => {
        return Coldbrew.pathExists('/coldbrew/examples/');
      });
      return expect(file.isFolder).to.be.true;
    });

    it('should let you check if a folder path exists without a trailing slash', async function () {
      var file = await utils.eval(this, () => {
        return Coldbrew.pathExists('/coldbrew/examples');
      });
      return expect(file.isFolder).to.be.true;
    });

    it('should let you check if a path does not exist', async function () {
      var file = await utils.eval(this, () => {
        return Coldbrew.pathExists('/new_folder_test/a/b/c/d');
      });
      return expect(file).to.be.null;
    });

    it('should let you read a file', async function () {
      var content = utils.eval(this, () => {
        Coldbrew.addFile('/new_file_text.txt', 'Hello World!');
        return Coldbrew.readFile('/new_file_text.txt');
      });
      return expect(content).to.eventually.equal('Hello World!');
    });

    it('should let you read a file in binary', async function () {
      function str2ab(str) {
        var buf = new ArrayBuffer(str.length);
        var bufView = new Uint8Array(buf);
        for (var i=0, strLen=str.length; i < strLen; i++) {
          bufView[i] = str.charCodeAt(i);
        }
        return buf;
      }
      var contentTests = await utils.eval(this, () => {
        Coldbrew.addFile('/new_file_text.txt', 'Hello World!');
        var content = Coldbrew.readBinaryFile('/new_file_text.txt');
        return [content.byteLength, (new Uint8Array(content.slice(0,1)))[0], (new Uint8Array(content.slice(-1)))[0]];
      });
      expect(contentTests[0]).to.equal(str2ab('Hello World!').byteLength);
      expect(contentTests[1]).to.equal((new Uint8Array(str2ab('Hello World!').slice(0,1)))[0]);
      return expect(contentTests[2]).to.equal((new Uint8Array(str2ab('Hello World!').slice(-1)))[0]);
    });

    it('should let you delete a file path', async function () {
      var exists = utils.eval(this, () => {
        Coldbrew.deletePath('/coldbrew/examples/add.py');
        return Coldbrew.pathExists('/coldbrew/examples/add.py');
      });
      return expect(exists).to.eventually.be.null;
    });

    it('should let you delete a folder path with a trailing slash', async function () {
      var exists = utils.eval(this, () => {
        Coldbrew.deletePath('/coldbrew/');
        return Coldbrew.pathExists('/coldbrew/');
      });
      return expect(exists).to.eventually.be.null;
    });

    it('should let you delete a folder path without a trailing slash', async function () {
      var exists = utils.eval(this, () => {
        Coldbrew.deletePath('/coldbrew');
        return Coldbrew.pathExists('/coldbrew');
      });
      return expect(exists).to.eventually.be.null;
    });

    it('should not let you delete a path that does not exist', async function () {
      var exists = utils.eval(this, () => {
        Coldbrew.deletePath('/new_folder_test/a/b/c/d');
        return Coldbrew.pathExists('/new_folder_test/a/b/c/d');
      });
      return expect(exists).to.eventually.be.rejected;
    });

    it('should let you add files from a remote ZIP file', async function () {
      var logs = await utils.eval(this, () => {
        return Coldbrew.addFilesFromZip('/home', 'http://localhost:8000/remote/example_project.zip').then(function() {
          Coldbrew.runFile('multiply.py', {
            cwd: '/home/example_project',
            env: {},
            args: ['5', '15', '-v']
          });
          return window.consoleLogs;
        });
      });
      return expect(logs[0][0]).to.include('5 * 15 is 75');
    });

    it('should let you download a file path to a ZIP file', async function () {
      var download = utils.eval(this, () => {
        return Coldbrew.downloadPathToZip('/coldbrew/examples/add.py', 'test_download.zip');
      });
      return expect(download).to.eventually.not.be.rejected;
    });

    it('should let you download a folder path to a ZIP file', async function () {
      var download = utils.eval(this, () => {
        return Coldbrew.downloadPathToZip('/', 'test_download.zip');
      });
      return expect(download).to.eventually.not.be.rejected;
    });

    it('should not persist home files by default', async function () {
      await utils.eval(this, () => {
        Coldbrew.addFile('/home/new_file_text.txt', 'Hello World!');
      });
      await this.test.page.reload({waitUntil: 'domcontentloaded'});
      var files = await utils.eval(this, () => {
        return Coldbrew.load().then(function() {
          return Coldbrew.listFiles('/home');
        });
      });
      return expect(files.find(f => f.name === 'new_file_text.txt')).to.equal(undefined);
    });

    it('should not persist tmp files by default', async function () {
      await utils.eval(this, () => {
        Coldbrew.addFile('/tmp/new_file_text.txt', 'Hello World!');
      });
      await this.test.page.reload({waitUntil: 'domcontentloaded'});
      var files = await utils.eval(this, () => {
        return Coldbrew.load().then(function() {
          return Coldbrew.listFiles('/tmp');
        });
      });
      return expect(files.find(f => f.name === 'new_file_text.txt')).to.equal(undefined);
    });

    it('should let you persist home files', async function () {
      await utils.eval(this, () => {
        Coldbrew.unload();
        return Coldbrew.load({fsOptions: {persistHome: true}}).then(function() {
          Coldbrew.addFile('/home/new_file_text.txt', 'Hello World!');
          return Coldbrew.saveFiles();
        });
      });
      await this.test.page.reload({waitUntil: 'domcontentloaded'});
      var files = await utils.eval(this, () => {
        return Coldbrew.load().then(async function() {
          Coldbrew.unload();
          await Coldbrew.load({fsOptions: {persistHome: true}});
          await Coldbrew.loadFiles();
          return Coldbrew.listFiles('/home');
        });
      });
      return expect(files.find(f => f.name === 'new_file_text.txt')).to.not.equal(undefined);
    });

    it('should let you persist tmp files', async function () {
      await utils.eval(this, () => {
        Coldbrew.unload();
        return Coldbrew.load({fsOptions: {persistTmp: true}}).then(function() {
          Coldbrew.addFile('/tmp/new_file_text.txt', 'Hello World!');
          return Coldbrew.saveFiles();
        });
      });
      await this.test.page.reload({waitUntil: 'domcontentloaded'});
      var files = await utils.eval(this, () => {
        return Coldbrew.load().then(async function() {
          Coldbrew.unload();
          await Coldbrew.load({fsOptions: {persistTmp: true}});
          await Coldbrew.loadFiles();
          return Coldbrew.listFiles('/tmp');
        });
      });
      return expect(files.find(f => f.name === 'new_file_text.txt')).to.not.equal(undefined);
    });

    it('should let you monitor used files', async function () {
      var usedFilesInfo = await utils.eval(this, () => {
        Coldbrew.unload();
        return Coldbrew.load({monitorFileUsage: true}).then(function() {
          var usedFiles = Coldbrew.getUsedFiles();
          return [usedFiles, usedFiles.split('\n').filter(function(path) {
            return !!Coldbrew.pathExists(path);
          })];
        });
      });
      expect(usedFilesInfo[0].split('\n').length).to.be.above(50);
      return expect(usedFilesInfo[1].length).to.be.above(50);
    });

    it('should let you get the unused modules', async function () {
      var unusedModules = await utils.eval(this, () => {
        return Coldbrew.getUnusedModules();
      });
      return expect(JSON.parse(unusedModules)).to.be.an('array').that.includes('_sqlite3').and.includes('mmap').and.includes('zlib');
    });

    it('should let you reset', async function () {
      var resetInfo = await utils.eval(this, () => {
        Coldbrew.run('import collections');
        Coldbrew.run('x = 5');
        Coldbrew.runFile('add.py', {
          cwd: '/coldbrew/examples',
          env: {},
          args: ['5', '15', '-v']
        });
        Coldbrew.getVariable('x');
        Coldbrew.getVariable('collections');
        Coldbrew.reset();
        Coldbrew.run('import sys');
        var x = null
        var collections = null;
        try {
          x = Coldbrew.getVariable('x');
        } catch (e) {
        }
        try {
          collections = Coldbrew.getVariable('collections');
        } catch (e) {
        }
        return [!!x, !!collections, Coldbrew.getVariable('sys.argv')];
      });
      expect(resetInfo[0]).to.be.false;
      expect(resetInfo[1]).to.be.false;
      return expect(resetInfo[2].length).to.equal(1);
    });
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

  describe('POSIX Threads', () => {
    it('should support synchronous execution in threads', async function () {
      var logs = await utils.eval(this, () => {
        window.clearConsole();
        Coldbrew.runFile('threads.py', { cwd: '/coldbrew/examples' });
        return window.consoleLogs;
      });
      return expect(logs[15][0]).to.include('Shared variable `x` is now 3.');
    });

    it('should not allow Coldbrew.run in thread', async function () {
      var warns = await utils.eval(this, () => {
        window.clearConsole();
        Coldbrew.run("import Coldbrew\nimport threading\ndef worker():\n\tColdbrew.run('x = 5')\nt = threading.Thread(target=worker, args=())\nt.start()\nt.join()");
        return window.consoleWarns;
      });
      return expect(warns[warns.length-1][0]).to.include('You can only access JavaScript from the main Python thread.');
    });

    it('should not allow Coldbrew.get_variable in thread', async function () {
      var warns = await utils.eval(this, () => {
        window.clearConsole();
        window.x = 5;
        Coldbrew.run("import Coldbrew\nimport threading\ndef worker():\n\tColdbrew.get_variable('x')\nt = threading.Thread(target=worker, args=())\nt.start()\nt.join()");
        return window.consoleWarns;
      });
      return expect(warns[warns.length-1][0]).to.include('You can only access JavaScript from the main Python thread.');
    });

    it('should not allow Coldbrew.run_function in thread', async function () {
      var warns = await utils.eval(this, () => {
        window.clearConsole();
        function foo(x, y) {
          return Math.pow(x, y);
        }
        window.foo = foo;
        Coldbrew.run("import Coldbrew\nimport threading\ndef worker():\n\tColdbrew.run_function('foo', 5, 2)\nt = threading.Thread(target=worker, args=())\nt.start()\nt.join()");
        return window.consoleWarns;
      });
      return expect(warns[warns.length-1][0]).to.include('You can only access JavaScript from the main Python thread.');
    });
    
    // add test async (sleep, http, yielding)
    // Yielding should be disabled if gettid() == getpid() (no need to yield in a thread)
    // sleep should work (if not remove ASYNCIFY_WHITELIST and if still not maybe thread lock)
    // http should work if the threading guards in Coldbrew.py are disabled for HTTP stuff only
    
    it('should support thread worker pool re-use', async function () {
      utils.eval(this, () => {
        window.clearConsole();
        Coldbrew.runFile('threads.py', { cwd: '/coldbrew/examples', args: ['1'] });
        return window.consoleLogs;
      });
      for (var i = 0; i < 4; i++) {
        await utils.sleep(1);
        logs = await utils.eval(this, () => {
          Coldbrew.runFile('threads.py', { cwd: '/coldbrew/examples', args: ['1'] });
          return window.consoleLogs;
        });
      }
      return expect(logs[39][0]).to.include('Shared variable `x` is now 1.');
    });

    // SKIPPED because it the Module['dynCall_ii call freezes in worker.js
    // I think the thread workers cannot be nested
    it.skip('should support threads when using worker mode', async function () {
      var logs = await utils.eval(this, () => {
        Coldbrew.unload();
        return Coldbrew.load({worker: true, threadWorkers: 4}).then(function() {
          window.clearConsole();
          return Coldbrew.runFile('threads.py', { cwd: '/coldbrew/examples' }).then(function() {
            return window.consoleLogs;
          });
        });
      });
      return expect(logs[15][0]).to.include('Shared variable `x` is now 3.');
    });
    
    // SKIPPED because currently getNewUnusedWorker doesn't work
    it.skip('should support more concurrent threads than worker pool', async function () {
      var logs = await utils.eval(this, () => {
        window.clearConsole();
        Coldbrew.runFile('threads.py', { cwd: '/coldbrew/examples', args: ['5'] });
        return window.consoleLogs;
      });
      return expect(logs[15][0]).to.include('Shared variable `x` is now 3.');
    });
  });

  describe('Worker Mode', () => {
    it('should have Coldbrew.run be window scoped in worker mode', async function () {
      var x = utils.eval(this, async () => {
        Coldbrew.unload();
        await Coldbrew.load({worker: true});
        await Coldbrew.run("Coldbrew.run('x = 5;')");
        return x;
      });
      return expect(x).to.eventually.equal(5);
    });

    it('should have Coldbrew.get_variable be window scoped in worker mode', async function () {
      var x = utils.eval(this, async () => {
        Coldbrew.unload();
        await Coldbrew.load({worker: true});
        window.x = Math.pow(5, 2);
        return Coldbrew.getVariable("Coldbrew.get_variable('x')");
      });
      return expect(x).to.eventually.equal(25);
    });

    it('should have Coldbrew.run_function be window scoped in worker mode', async function () {
      var fooResult = utils.eval(this, async () => {
        Coldbrew.unload();
        await Coldbrew.load({worker: true});
        function foo(x, y) {
          return Math.pow(x, y);
        }
        window.foo = foo;
        return Coldbrew.getVariable("Coldbrew.run_function('foo', 5, 2)");
      });
      return expect(fooResult).to.eventually.equal(25);
    });

    it('should be able to persist files in worker mode', async function () {
      await utils.eval(this, async () => {
        Coldbrew.unload();
        await Coldbrew.load({worker: true, fsOptions: {persistHome: true}});
        await Coldbrew.addFile('/home/new_file_text.txt', 'Hello World!');
        await Coldbrew.saveFiles();
      });
      await this.test.page.reload({waitUntil: 'domcontentloaded'});
      var files = await utils.eval(this, async () => {
        await Coldbrew.load();
        Coldbrew.unload();
        await Coldbrew.load({worker: true, fsOptions: {persistHome: true}});
        await Coldbrew.loadFiles();
        return Coldbrew.listFiles('/home');
      });
      return expect(files.find(f => f.name === 'new_file_text.txt')).to.not.equal(undefined);
    });

    it('should allow redirecting of standard output in worker mode', async function () {
      var output = utils.eval(this, async () => {
        Coldbrew.unload();
        await Coldbrew.load({worker: true});
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

    it('should allow redirecting of standard error in worker mode', async function () {
      var output = utils.eval(this, async () => {
        Coldbrew.unload();
        await Coldbrew.load({worker: true});
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

    it('should use buffer when reading from standard input in worker mode', async function () {
      var input = utils.eval(this, async () => {
        Coldbrew.unload();
        await Coldbrew.load({worker: true});
        Coldbrew.standardInBuffer = 'Hello World!\n';
        return Coldbrew.getVariable("input()");
      });
      return expect(input).to.eventually.equal('Hello World!');
    });

    it('should use standard input read function when reading from standard input in worker mode', async function () {
      var input = utils.eval(this, async () => {
        Coldbrew.unload();
        await Coldbrew.load({worker: true});
        var readBuffer = 'Hello World!\n';
        var tell = 0;
        Coldbrew.onStandardInRead = function(size) {
          var read = readBuffer.substring(tell, tell+size);
          tell += size;
          return read;
        };
        return Coldbrew.getVariable("input()");
      });
      return expect(input).to.eventually.equal('Hello World!');
    });

    it('should use standard input read async function when reading from standard input in worker mode', async function () {
      var input = utils.eval(this, async () => {
        Coldbrew.unload();
        await Coldbrew.load({worker: true});
        var readBuffer = 'Hello World!\n';
        var tell = 0;
        Coldbrew.onStandardInReadAsync = function(size) {
          var read = readBuffer.substring(tell, tell+size);
          tell += size;
          return Promise.resolve(read);
        };
        return Coldbrew.getVariable("input()");
      });
      return expect(input).to.eventually.equal('Hello World!');
    });

    it('should allow HTTP requests in Python in worker mode', async function () {
      var remoteFile = utils.eval(this, async () => {
        Coldbrew.unload();
        await Coldbrew.load({worker: true});
        await Coldbrew.run('import urllib.request');
        return Coldbrew.getVariable('str(urllib.request.urlopen("http://localhost:8000/remote/example.txt").read())');
      });
      return expect(remoteFile).to.eventually.include('downloaded from a remote server');
    });

    it('should let you download a file path to a ZIP file in worker mode', async function () {
      var files = utils.eval(this, async () => {
        Coldbrew.unload();
        await Coldbrew.load({worker: true});
        return Coldbrew.downloadPathToZip('/coldbrew/examples/add.py', 'test_download.zip');
      });
      return expect(files).to.eventually.not.be.rejected;
    });

    it('should unload properly in worker mode', async function () {
      var unloadedProperly = !(await utils.eval(this, async () => {
        Coldbrew.unload();
        await Coldbrew.load({worker: true});
        Coldbrew.unload();
        return Object.keys(Coldbrew);
      })).includes('run');
      return expect(unloadedProperly).to.be.true;
    });

    it('should proxy Python errors in worker mode as a rejected promise', async function () {
      var isPythonError = utils.eval(this, async () => {
        Coldbrew.unload();
        await Coldbrew.load({worker: true});
        return Coldbrew.run('x').catch(function(e) {
          return e instanceof Coldbrew.PythonError;
        });
      });
      return expect(isPythonError).to.eventually.be.true;
    });

    it('should proxy errors in worker mode as a rejected promise', async function () {
      var files = utils.eval(this, async () => {
        Coldbrew.unload();
        await Coldbrew.load({worker: true});
        return Coldbrew.listFiles('/coldbrew/examples/add.py');
      });
      return expect(files).to.eventually.be.rejected;
    });
  });
});