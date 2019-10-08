<div align="center"><img src="https://gitlab.com/Plasticity/coldbrew/raw/master/images/coldbrew.png" alt="coldbrew" height="50"></div>

## <div align="center">Coldbrew: Run Python in JavaScript<br /><br />[![pipeline status](https://gitlab.com/Plasticity/coldbrew/badges/master/pipeline.svg)](https://gitlab.com/Plasticity/coldbrew/commits/master)&nbsp;&nbsp;&nbsp;[![npm (scoped)](https://img.shields.io/npm/v/@plasticity/coldbrew.svg)](https://www.npmjs.com/package/@plasticity/coldbrew)&nbsp;&nbsp;&nbsp;[![version](https://img.shields.io/github/release/plasticityai/coldbrew.svg)](https://github.com/plasticityai/coldbrew/releases)</div>

Coldbrew is Python compiled into JavaScript using [Emscripten](https://github.com/kripken/emscripten) and [WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly). It is the easiest way to run Python code in JavaScript (a web browser or Node.js) and is developed by [Plasticity](https://www.plasticity.ai/).

Coldbrew currently uses CPython 3.8.0 and supports Python modules utilizing native C extensions (such as the built-in `sqlite3`). There are a ton of neat features like [HTTP support](#accessing-http-in-python) in Python and [bridge variables](#bridge-variables) to share native objects between the two languages using ES6 Proxies in JavaScript and operator overloads in Python.

Coldbrew also allows you to bundle your own Python application, script, library along with its required modules and dependencies to the environment. See the section on [building a custom Coldbrew Python environment](#building-a-custom-coldbrew-python-environment). The build is [Docker](https://www.docker.com/get-started)-ized so it is very easy to build! 🐳 

## Table of Contents
- [Demo](#demo)
- [Installation](#installation)
- [Using the Library](#using-the-library)
  * [Loading the Environment](#loading-the-environment)
  * [Running Python in JavaScript](#running-python-in-javascript)
    + [Running Python Asynchronously in JavaScript](#running-python-asynchronously-in-javascript)
  * [Running JavaScript in Python](#running-javascript-in-python)
  * [Running Python Files in JavaScript](#running-python-files-in-javascript)
    + [Running Python Files Asynchronously in JavaScript](#running-python-files-asynchronously-in-javascript)
  * [Communicating between JavaScript and Python](#communicating-between-javascript-and-python)
    + [Get Python Variable in JavaScript](#get-python-variable-in-javascript)
    + [Get JavaScript Variable in Python](#get-javascript-variable-in-python)
    + [Run Python Function in JavaScript](#run-python-function-in-javascript)
    + [Run Python Function Asynchronously in JavaScript](#run-python-function-asynchronously-in-javascript)
    + [Run JavaScript Function in Python](#run-javascript-function-in-python)
    + [Run Asynchronous JavaScript Function in Python](#run-asynchronous-javascript-function-in-python)
  * [Bridge Variables](#bridge-variables)
    + [What are Bridge Variables?](#what-are-bridge-variables)
    + [Interacting with Bridge Variables](#interacting-with-bridge-variables)
    + [Bridge Variable Introspection](#bridge-variable-introspection)
    + [Bridge Variable Garbage Collection](#bridge-variable-garbage-collection)
  * [Error Handling](#error-handling)
    + [Catching Python Errors in JavaScript](#catching-python-errors-in-javascript)
    + [Catching JavaScript Errors in Python](#catching-javascript-errors-in-python)
  * [Accessing HTTP in Python](#accessing-http-in-python)
  * [Using Multiple Threads in Python](#using-multiple-threads-in-python)
  * [Accessing the Virtual File System](#accessing-the-virtual-file-system)
    + [Listing files under a directory](#listing-files-under-a-directory)
    + [Create a Folder](#create-a-folder)
    + [Adding a File](#adding-a-file)
    + [Check if a Path Exists](#check-if-a-path-exists)
    + [Reading a File](#reading-a-file)
    + [Deleting a Path](#deleting-a-path)
    + [Adding a `.zip` File](#adding-a-zip-file)
    + [Downloading files to a `.zip` File](#downloading-files-to-a-zip-file)
    + [Saving and Loading Files to Browser Storage](#saving-and-loading-files-to-browser-storage)
  * [Extra Performance by using Workers](#extra-performance-by-using-workers)
  * [Unloading the Environment](#unloading-the-environment)
  * [Creating a New Instance of the Environment](#creating-a-new-instance-of-the-environment)
  * [Accessing the Environment](#accessing-the-environment)
    + [Get the Current Working Directory](#get-the-current-working-directory)
    + [Change Current Working Directory](#change-current-working-directory)
    + [Set Environment Variable](#set-environment-variable)
    + [Delete an Environment Variable](#delete-an-environment-variable)
    + [Get Environment Variables](#get-environment-variables)
    + [Resetting Environment Variables](#resetting-environment-variables)
    + [Access Standard Output](#access-standard-output)
    + [Access Standard Error](#access-standard-error)
    + [Respond to Standard Input with a Buffer](#respond-to-standard-input-with-a-buffer)
    + [Respond to Standard Input Interactively](#respond-to-standard-input-interactively)
    + [Respond to Standard Input Interactively and Asynchronously](#respond-to-standard-input-interactively-and-asynchronously)
    + [Change the Asynchronous Yield Rate](#change-the-asynchronous-yield-rate)
  * [Resetting Coldbrew Environment](#resetting-coldbrew-environment)
  * [Can I install third-party Python modules at run time?](#can-i-install-third-party-python-modules-at-run-time)
- [Building a Custom Coldbrew Python Environment](#building-a-custom-coldbrew-python-environment)
  * [1. Changing the Module Name and Other Settings](#1-changing-the-module-name-and-other-settings)
  * [2. Adding Python Module Dependencies and Requirements to the Environment](#2-adding-python-module-dependencies-and-requirements-to-the-environment)
  * [3. Bundling files](#3-bundling-files)
  * [4. Building](#4-building)
  * [5. Running](#5-running)
  * [6. Deploying](#6-deploying)
  * [7. Saving space (Optional, but recommended)](#7-saving-space-optional-but-recommended)
  * [8. Saving even more space (Optional, but recommended)](#8-saving-even-more-space-optional-but-recommended)
  * [9. Customizing the Export (Optional)](#9-customizing-the-export-optional)
- [Example Use Cases](#example-use-cases)
- [Known Limitations](#known-limitations)
- [Security](#security)
- [Performance and Size Benchmarks](#performance-and-size-benchmarks)
- [Contributing](#contributing)
- [LICENSE and Attribution](#license-and-attribution)

## Demo
You can find a demo with some examples of Coldbrew at [http://coldbrew.plasticity.ai](http://coldbrew.plasticity.ai).

We also have a demo project that ports the [Star Wars API](https://swapi.co/)'s Python Library, [swapi-python](https://github.com/phalt/swapi-python), to JavaScript using Coldbrew at [plasticityai/coldbrew-star-wars-api-demo](https://github.com/plasticityai/coldbrew-star-wars-api-demo). It is a good example of a [custom build](#building-a-custom-coldbrew-python-environment) of Coldbrew.

## Installation
You can use the library in a browser by embedding `coldbrew.js` via our CDN:
```html
<script src="https://cdn.jsdelivr.net/gh/plasticityai/coldbrew@latest/dist/coldbrew.js"></script>
```

You can use the library in Node.js by installing it using `npm`:
```bash
npm install @plasticity/coldbrew@latest
```
and then importing it with:
```javascript
var Coldbrew = require('@plasticity/coldbrew');
```

To use a specific version, replace `@latest` with `@VERSION` where `VERSION` is one of the versions listed on the [releases page](https://github.com/plasticityai/coldbrew/releases).

If you would like to self host the files, you can also download the files from [`dist`](https://github.com/plasticityai/coldbrew/tree/latest/dist) (web) or [`dist-node`](https://github.com/plasticityai/coldbrew/tree/latest/dist-node) (Node.js). You can also [build it yourself from source and use resulting `dist` folder](#6-deploying).

## Using the Library

### Loading the Environment
You can load the Python environment with `Coldbrew.load`:

```javascript
Coldbrew.load(options).then(function() { 
  console.log("Finished loading Coldbrew!"); 
});
```

The `load` method optionally takes a dictionary of options and returns a Promise that resolves when Coldbrew is done loading. The `options` dictionary can contain some or all of the following options (when omitted the values default to the ones shown below):
```javascript
var options = {
  fsOptions: {
    persistHome: false, /* Makes the /home/ directory persistable to browser storage */
    persistTmp: false, /* Makes the /tmp/ directory persistable to browser storage */
  },
  hideWarnings: false, /* Hides warnings */
  monitorFileUsage: false, /* Monitors file usage for slimming the data bundle for a custom Coldbrew Python environment */
  asyncYieldRate: null, /* Allows you to override the default asynchronous yield rate (see setAsyncYieldRate()) */
  worker: false, /* Runs the Coldbrew Python interpreter in a separate Web Worker or Worker thread */
  transformVariableCasing: true, /* Transforms bridge variable properties and methods to camel case or snake case automatically */
  threadWorkers: 1, /* The amount of workers in a pool that will execute Python spawned threads */
};
```

### Running Python in JavaScript
You can run Python in JavaScript like so:
```javascript
Coldbrew.run("import sys");
Coldbrew.run("print('The current Python version is:', sys.version)");
```

The `run` function returns `0` when successful or throws a `Coldbrew.PythonError` if there was an error.

#### Running Python Asynchronously in JavaScript
Python code is run synchronously and will lock up the browser for long running code. To run Python code asynchronously and concurrently with JavaScript, you can run it like so:

```javascript
for(var i=0; i<5; i++) {
  setTimeout(function() { 
    console.log("Every 1 second for 5 seconds from JavaScript.") 
    }, (i+1)*1000); 
}
Coldbrew.runAsync(
`from time import sleep
for i in range(5):
  sleep(1)
  print("Every 1 second for 5 seconds from Python.")
`);
```

The `runAsync` function returns a Promise that resolves to `0` when successful or rejects with a `Coldbrew.PythonError` if there was an error.

### Running JavaScript in Python
You can run JavaScript in Python like so:
```javascript
Coldbrew.run("Coldbrew.run('x = 5;')");
console.log(x); // Prints 5
```

The `run` function returns `0` when successful or throws a `Coldbrew.JavaScriptError` if there was an error.

Note: This runs in the scope of `window` (browser) or `global` (Node.js).

### Running Python Files in JavaScript
You can also run Python files like [add.py](https://github.com/plasticityai/coldbrew/blob/master/src/examples/add.py) in JavaScript:
```javascript
Coldbrew.runFile('add.py', {
  cwd: '/coldbrew/examples',
  env: {},
  args: ['5', '15', '-v']
});
```

The `cwd` option is the path to the folder containing the Python file, the `env` option is a dictionary of environment variables, the `args` is a list of arguments to pass to the Python file.

The `runFile` function returns `0` when successful or throws a `Coldbrew.PythonError` if there was an error.

#### Running Python Files Asynchronously in JavaScript
You can also run Python files like [add.py](https://github.com/plasticityai/coldbrew/blob/master/src/examples/add.py) in JavaScript asynchronously:
```javascript
Coldbrew.runFileAsync('add.py', {
  cwd: '/coldbrew/examples',
  env: {},
  args: ['5', '15', '-v']
});
```

The `runFileAsync` function returns a Promise that resolves to `0` when successful or rejects with a `Coldbrew.PythonError` if there was an error.

### Communicating between JavaScript and Python

You can communicate between the two languages by tranferring variables and calling functions. While only simple examples are shown below, this can be very powerful with "[bridge variables](#bridge-variables)" that allow you to transfer not just "primitive" types between the two languages, but all types.

#### Get Python Variable in JavaScript
You can access a variable from Python in JavaScript like so:
```javascript
Coldbrew.run("x = 5**2");
Coldbrew.getVariable("x"); // Returns 25
```

#### Get JavaScript Variable in Python
You can access a variable from JavaScript in Python like so:
```javascript
var x = Math.pow(5, 2);
Coldbrew.run("print(Coldbrew.get_variable('x'))") // Prints 25
```

Note: This only works if the variable is in the scope of `window` (browser) or `global` (Node.js).

Note: If the variable is a `Promise`, it is automatically resolved to the value (requires running in asynchronous mode).

#### Run Python Function in JavaScript
You can run a function from Python in JavaScript like so:
```javascript
Coldbrew.run(
`def foo(x, y):
  return x**y
`);
Coldbrew.runFunction("foo", 5, 2); // Returns 25
```

You can also run a function with keywords from Python in JavaScript like so:
```javascript
Coldbrew.run(
`def foo(x, y=0):
  return x**y
`);
Coldbrew.runFunction("foo", 5, Coldbrew.PythonKeywords({y: 2})); // Returns 25
```

#### Run Python Function Asynchronously in JavaScript
You can run a function from Python asynchronously in JavaScript like so:
```javascript
Coldbrew.run(
`def foo(x, y):
  return x**y
`);
Coldbrew.runFunctionAsync("foo", 5, 2); // Resolves to 25
```

#### Run JavaScript Function in Python
You can run a function from JavaScript in Python like so:
```javascript
function foo(x, y) {
  return Math.pow(x, y);
}
Coldbrew.run("print(Coldbrew.run_function('foo', 5, 2))"); // Prints 25
```

Note: This only works if the function is in the scope of `window` (browser) or `global` (Node.js).

Note: If the return value is a `Promise`, it is automatically resolved to the value (requires running in asynchronous mode).

### Bridge Variables

#### What are Bridge Variables?
When you call `getVariable` or `get_variable`, if the type of the variable is a "primitive" type, the data is JSON-serialized, passed to the other language and then JSON-unserialized. When the type of the variable is a non "primitive" type, a bridge variable is returned instead that allows you to interact with a variable from the other language as if it were a native variable by essentially performing [RPC-style](https://en.wikipedia.org/wiki/Remote_procedure_call) communication between the two languages.

The bridge variable uses [ECMAScript 6 Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) in JavaScript and [Object Customization](https://docs.python.org/3/reference/datamodel.html#basic-customization) in Python to make it seem like a Python variable is natively accessible in JavaScript and a JavaScript variable is natively accessible in Python.

For example, with bridge variables you can export a Python class like the [`Counter`](https://docs.python.org/3.1/library/collections.html#counter-objects) class from Python to JavaScript and it will behave like it were a JavaScript class:
```javascript
Coldbrew.run("from collections import Counter");
var Counter = Coldbrew.getVariable("Counter");
var c = new Counter(['red', 'blue', 'red', 'green', 'blue', 'blue']);
console.log(c.toString()); // Prints "Counter({'blue': 3, 'red': 2, 'green': 1})"
console.log(c.blue); // Prints "3"
console.log(c.mostCommon(2)); // Prints "[('blue', 3), ('red', 2)]"
```

If you use `Coldbrew.getVariableAsync` you can get the variable asynchronously. Meaning all interaction and methods run on the underlying Python object will be run asynchronously. For example, making [HTTP requests](#accessing-http-in-python) requires running asynchronously:
```javascript
Coldbrew.run("import urllib.request");
var urllib = Coldbrew.getVariableAsync('urllib');
urllib.request.urlopen("http://coldbrew.plasticity.ai/remote/example.txt").read().toString().then(function(contents) {
  console.log(contents);
});
```


You can also go the other way too. You can export a JavaScript class like the [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) class from JavaScript to Python and it will behave like it were a Python class:
```javascript
Coldbrew.run("Date = Coldbrew.get_variable('Date')");
Coldbrew.run("d = Date(1234567890000)");
Coldbrew.run("print(d)"); // Prints "Fri Feb 13 2009 15:31:30 GMT-0800 (Pacific Standard Time)"
Coldbrew.run("print(d.to_iso_string())"); // Prints "2009-02-13T23:31:30.000Z"
```

You can do this with pretty much any type of variable (classes, object instances, functions, modules, primitives, etc.) between both languages.

#### Interacting with Bridge Variables
You can interact with bridge variables as if they were a native variable. Method names or property names are automatically transformed to camel case from snake case when using a Python bridge variable in JavaScript and vice-versa. You can turn this off by passing `transformVariableCasing: false` to the Coldbrew `load` method.

Using [introspection](#bridge-variable-introspection) can help you determine what properties or methods on the object can be accessed. But if you want more [detailed documentation](docs/bridge.md) on how syntax in one language will be translated to the other, you can find [more information here](docs/bridge.md).

#### Bridge Variable Introspection
You can check if a variable is a bridge variable in JavaScript like so:
```javascript
Coldbrew.PythonVariable.isPythonVariable(...) // Returns true or false
```
or in Python like so:
```javascript
Coldbrew.run("print(Coldbrew.JavaScriptVariable.is_javascript_variable(...))") // Prints true or false
```

In both languages, you can use the `.__type__` property to find out the actual type of a bridge variable and you can call the `.__inspect__()` method to return a list of attributes you can access on the object.

#### Implicit Bridge Variables

We've shown how bridge variables are returned when using `getVariable` and `get_variable`. There are many other places where bridge variables are implicitly returned or created. 

For example, `runFunction`, `runFunctionAsync`, and `run_function` can all return bridge variables if the data is not JSON-serializable. Also, any property or method on a bridge variable that is not JSON-serializable is returned as a bridge variable. Moreover, if you pass a bridge variable as an argument to a function that will be run in the other language, it will recieve a reference to the original variable and it should "just work". If you pass a non JSON-serializable variable to a function that will be run in the other language, it will automatically be converted and accessible as a bridge variable in the other language.

#### Bridge Variable Garbage Collection
When creating a bridge variable, a reference to the "real" variable is held in the other language's interpreter to prevent the value from being garbage collected. 

In JavaScript, there are no hooks for the garbage collector so when a bridge variable is created with `getVariable()`, it needs to be explicitly told when it is done being used to remove the reference in the Python interpreter so the memory can be released. You can do this by calling the `__destroy__()` method on the bridge variable. Once destroyed, you should not access the bridge variable anymore and it should be considered invalid. You can check if a variable is already destroyed, by using the `__destroyed__` property. If you want to destroy all bridge variables created at once, run `Coldbrew.destroyAllVariables()`.

In Python, there are hooks for the garbage collector so we know when a bridge variable created by `get_variable()` is garbage collected and can de-reference the variable in JavaScript as well, so there are no memory leaks.

We still expose `__destroy__()`, `__destroyed__`, and `Coldbrew.destroy_all_variables()` in Python for manual garbage collection, if needed.

### Error Handling

#### Catching Python Errors in JavaScript
If you are running a Python using Coldbrew that encounters an error, a `Coldbrew.PythonError` will be thrown in JavaScript. You can then use `e.errorData` on the error object `e` to get more information about the Python context where the error occurred. You can also get information about the last Python exception thrown in JavaScript like so:
```javascript
Coldbrew.getExceptionInfo(); // Returns a dictionary with information from the last Python exception
```

#### Catching JavaScript Errors in Python
If you are running a JavaScript function in Python that encounters an error, a `Coldbrew.JavaScriptError` will be raised in Python. You can then use `e.error_data` on the error object `e` to get more information about the JavaScript context where the error occurred. You can also access the last JavaScript error in Python like so:
```javascript
Coldbrew.run('print(Coldbrew.get_exception_info())');
```

### Accessing HTTP in Python
Python is able to access HTTP connections in Coldbrew and the requests will be shimmed by JavaScript's XHR requests:
```javascript
Coldbrew.runAsync(
`import urllib.request
print(urllib.request.urlopen("http://coldbrew.plasticity.ai/remote/example.txt").read())
`);
```

### Using Multiple Threads in Python
The Python `threading` library is supported and each individual Python thread will run inside a Web Worker for true parallelism. To make threads efficient, a pool of Web Workers are spawned when first loading Coldbrew. You can control the number of workers in the pool using the `threadWorkers` setting on `Coldbrew.load`. Ideally, `threadWorkers` should be set to the maximum number of concurrently running threads your Python application will ever run.

To see an example of multi-threaded Python code running, you can run the [threads.py](https://github.com/plasticityai/coldbrew/blob/master/src/examples/threads.py) file:
```javascript
Coldbrew.runFile('threads.py', { cwd: '/coldbrew/examples' });
```

**Note:** Node.js and some browsers do not support threading as it relies on a JavaScript feature called `SharedArrayBuffer`s which were disabled across many JavaScript engines due to the [Spectre](https://v8.dev/blog/spectre) attacks. Chrome has re-enabled them after fixing the issue, fixes for other browsers and Node.js are [pending](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer).

### Accessing the Virtual File System
Python is not able to access the system's actual file system due to the limitations of the browser, but it can access a virtual file system.

#### Listing files under a directory
You can list files under a directory like so:
```javascript
Coldbrew.listFiles('/')
```

#### Create a Folder
You create a folder like so:
```javascript
Coldbrew.createFolder('/home/myfolder/');
```

#### Adding a File
You can add a file like so:
```javascript
Coldbrew.addFile('/test.txt', 'Hello World!')
```

#### Check if a Path Exists
You can get the information of a path like so:
```javascript
Coldbrew.pathExists('/home');
```
If it exists, a dictionary of path information is returned. If it doesn't exist, `null` is returned.

#### Reading a File
You can read a file like so:
```javascript
Coldbrew.addFile('/test.txt', 'Hello World!');
Coldbrew.readFile('/test.txt');
```

You can also read file back in bytes for binary files like so:
```javascript
Coldbrew.addFile('/test.txt', 'Hello World!');
Coldbrew.readBinaryFile('/test.txt');
```

#### Deleting a Path
You can delete a file or path to a folder like so:
```javascript
Coldbrew.addFile('/test.txt', 'Hello World!');
Coldbrew.deletePath('/test.txt');
```

#### Adding a `.zip` File
You can bulk add files from a ZIP file like so:
```javascript
Coldbrew.addFilesFromZip('/home', 'http://coldbrew.plasticity.ai/remote/example_project.zip').then(function() {
  Coldbrew.runFile('multiply.py', {
    cwd: '/home/example_project',
    env: {},
    args: ['5', '15', '-v']
  });
});
```

#### Downloading files to a `.zip` File
You can download files and folders from the file system to a ZIP file like so:
```javascript
Coldbrew.downloadPathToZip('/', 'download.zip');
```

#### Saving and Loading Files to Browser Storage
If using `persistTmp` or `persistHome` options, you can save files to the browser storage like so:
```javascript
Coldbrew.saveFiles();
```

To load saved files from browser storage back to the virtual file system later you can use:
```javascript
Coldbrew.loadFiles();
```

### Extra Performance by using Workers
You can run the Coldbrew library in a separate worker thread (Web Workers in the browser and Worker threads in Node.js) by passing `worker: true` to the Coldbrew `load` method. 

This will make it so that even synchronous Python execution doesn't block the browser's UI thread or the main JavaScript event loop as it will be running in its own thread. This also means it can utilize multiple cores on a machine with multiple cores. When running in asynchronous mode, the yield rate is automatically set to infinity, since you never need to yield back as it is running on a separate thread. [A high yield rate increases performance as well](#performance-and-size-benchmarks).

Note that when running in workers, every method on the `Coldbrew` object returns a `Promise` since the main thread has to asynchronously communicate back and forth with the worker thread. For example, you would get return values like so:
```javascript
Coldbrew.unload();
Coldbrew.load({worker: true}).then(function() { // Load Coldbrew using workers
  // Done loading!

  // This gets executed in a separate worker thread
  Coldbrew.run("x = 5**2");
  
  // This will fetch the variable 'x' from the separate worker thread
  Coldbrew.getVariable("x").then(function(result) { 
    console.log(result); // Prints 25
  });
});
```

### Unloading the Environment
You can unload the Python environment with `Coldbrew.unload`:
```javascript
Coldbrew.unload();
```

This makes it as if `load()` was never called.

### Creating a New Instance of the Environment
You can create a new instance of the Coldbrew object with `Coldbrew.createNewInstance`:
```javascript
var Coldbrew2 = Coldbrew.createNewInstance();
Coldbrew2.load().then(function() { 
  console.log("Finished loading another Coldbrew!"); 
});
```

### Accessing the Environment

#### Get the Current Working Directory
You can get the current working directory path like so:
```javascript
Coldbrew.getcwd();
```

#### Change Current Working Directory
You can change the current working directory path like so:
```javascript
Coldbrew.chdir('/home');
```

#### Set Environment Variable
You can add/overwrite an environment variable like so:
```javascript
Coldbrew.setenv('FOO', '1');
```

#### Delete an Environment Variable
You can unset an environment variable like so:
```javascript
Coldbrew.unsetenv('FOO');
```

#### Get Environment Variables
You can get back a dictionary of all environment variables like so:
```javascript
Coldbrew.getenv();
```

#### Resetting Environment Variables
You can reset environment variables like so:
```javascript
Coldbrew.resetenv();
```

#### Access Standard Output
By default, standard output is line buffered and each line is sent to `console.log`. You can override this behavior by setting:
```javascript
Coldbrew.onStandardOut = function(line) {
  // Do what you want with each line of standard output
};
```

#### Access Standard Error
By default, standard error is line buffered and each line is sent to `console.warn`. You can override this behavior by setting:
```javascript
Coldbrew.onStandardErr = function(line) {
  // Do what you want with each line of standard error
};
```

#### Respond to Standard Input with a Buffer
If you know ahead of time what your entire standard input buffer is you can set it like so:
```javascript
Coldbrew.standardInBuffer = "This line of text is what will be read from standard input.\n";
```

#### Respond to Standard Input Interactively
You can also respond to standard input interactively by implementing:
```javascript
Coldbrew.onStandardInRead = function(size) {
  // Return a string of `size` bytes (or characters)
};
```

#### Respond to Standard Input Interactively and Asynchronously
If running Python asynchronously, you can respond to standard input asynchronously as well:
```javascript
Coldbrew.onStandardInReadAsync = function(size) {
  // Return a Promise that resolves to a string of `size` bytes (or characters)
};
```

#### Change the Asynchronous Yield Rate
By default, the Python interpreter yields back to the JavaScript event loop every 100 Python bytecode instructions when running asynchronously. You change the number of bytecode instructions from the default to something else with:
```javascript
Coldbrew.setAsyncYieldRate(...)
```

As the number is set higher,  Python code will run faster (since it yields back to the JavaScript event loop less frequently), but the JavaScript VM will feel more locked up. The lower the number, the opposite is true. 

You can retrieve the current yield rate like so:
```javascript
Coldbrew.getAsyncYieldRate()
```

You can also set/get the yield rate in Python with:
```javascript
Coldbrew.run("Coldbrew.set_async_yield_rate(...)");
Coldbrew.run("print(Coldbrew.get_async_yield_rate())");
```


### Can I install third-party Python modules at run time?
Coldbrew only comes with a standard Python installation, with no third-party modules. There is no way to add modules at run time to this environment using something like `pip install`. You can, however, instead [build a custom Coldbrew Python environment](#building-a-custom-coldbrew-python-environment) yourself (it's easy!) which allows you to specify a `requirements.txt` file to pre-load your third-party modules into the environment. 

## Building a Custom Coldbrew Python Environment

You can build a custom Coldbrew Python Environment to access more functionality of Coldbrew and customize various settings.

### 1. Changing the Module Name and Other Settings
To change the global name of the library from `Coldbrew` to something else in JavaScript (or to run multiple custom Coldbrew Python environments on the same page without their names conflicting in the global namespace), you can modify the `MODULE_NAME` setting in `customize/coldbrew_settings.py`. If you are building for Node.js, you will also want to set `NODE = True`. Various other settings can also be modified in `customize/coldbrew_settings.py` like the initial allocated memory size, however, the defaults are generally acceptable if you don't want to modify them. 

### 2. Adding Python Module Dependencies and Requirements to the Environment
Add any requirements of your project in the standard Python [`requirements.txt` format](https://pip.pypa.io/en/stable/reference/pip_install/#requirements-file-format). 

**Note:** Python modules that are pure Python will almost certainly work. Python modules that use C code may or may not work properly depending on if they have external dependencies or rely heavily on specific operating system functionality.

### 3. Bundling files
To bundle additional files or scripts into the virtual file system, simply add them to the `/customize/files` folder. They will be available at runtime under `/files` in the virtual file system.

### 4. Building
To build, simply navigate to the project root in terminal and run `./build.sh`. This will kick off a build process within a Docker container. The first build will take quite some time as it will have to compile Python from source. Subsequent builds will be much faster with caches. If you need to clean all build caches for some reason, run `./clean.sh`.

### 5. Running
To test, simply navigate to the project root in terminal and run `./serve.sh`. This will run a web server at [http://localhost:8000](http://localhost:8000) that will embed your custom Coldbrew Python environment for use.

### 6. Deploying
Deployment files can be found under the `dist` folder. An example `index.html` in the `dist` folder shows how to import and use the library on a page. A `package.json` file will be added to the `dist` folder when building for Node.js, which you can modify as needed.

### 7. Saving space (Optional, but recommended)
The version of Coldbrew distributed by CDN can be quite large since it makes an AJAX request to download the entire Python standard library (`coldbrew.data` file). Your particular Python program / application / script, however, may not need all of these files. We have included an easy way to slim down the data bundle. Modify `customize/keeplist.txt` to include paths to all files of the standard library that your application uses to keep them (sort of like a reverse `.gitignore`), any other files will not be bundled at runtime. 

You can easily generate this list of files to keep by passing `monitorFileUsage: true` to the Coldbrew `load` method and then calling `Coldbrew.getUsedFiles()` in the JavaScript console *after* running your Python program / application / script (to make sure that all files imported by your code were monitored). This saves a **significant** amount of space, so it is recommended!

### 8. Saving even more space (Optional, but recommended)
The WebAssembly binary (`coldbrew.wasm`) contains code for all of Python's compiled built-in modules. However, you may not need all of them. There is a very simple way to remove them during the build process to make the `coldbrew.wasm` file smaller. Modify the `UNUSED_BUILTIN_MODULES` setting in `customize/coldbrew_settings.py` to be a list of unused module names to not include and compile during the build process.

You can easily generate this list of unused modules by calling `Coldbrew.getUnusedModules()` in the JavaScript console *after* running your Python program / application / script (to make sure that all modules your code uses are accounted for).

### 9. Customizing the Export (Optional)
You may want to change what value will be exported by the library. By default, the Coldbrew Python Environment is exported. You can modify what value is exported by setting the `EXPORT` variable in `customize/export.js`.

Whatever you set the `EXPORT` variable to, is what the global variable named `MODULE_NAME` (the same `MODULE_NAME` from `coldbrew_settings.py`) will be set to in browsers or what will be exported in Node.js when `require()`-ing your library.

## Example Use Cases
This [isn't the most efficient way](#performance-and-size-benchmarks) to run code in a JavaScript. It is an interpreted language (Python), within another interpreted language (JavaScript). However, with the emitted WebAssembly code from Emscripten, it actually runs fairly quickly. Emscripten can get fairly close to native machine code speeds, because browsers will compile WebAssembly to machine code. It would, of course, be better if you hand re-wrote your Python code for the browser. However, there are be a few legitimate cases where this library would be useful:

1. An online demo for a Python library that makes it easy for people to quickly experiment with it in the browser / Node.js.

2. A quick-and-dirty solution to porting over Python code to the browser / Node.js that isn't worth hand re-writing, is a legacy codebase, or would be too difficult to maintain multiple versions of in two different languages. (Write once. Deploy anywhere.)

3. Access the [Python Standard Library](https://docs.python.org/3/library/) and [thousands of Python libraries](https://pypi.org/) that are not available in JavaScript. 

4. An online IDE or coding tutorial website that wants to let people run Python code in a sandbox. It is better to run the Python code in the user's own browser so you don't have execute arbitrary Python code on your servers (for security reasons). It also means you don't have to run servers to execute Python code server side and send the result back to the browser (which is more cost efficient).

5. Running Python code at the edge, on-device, instead of on a backend server for user privacy reasons.

## Known Limitations

Any limitations imposed by the browser will be imposed by Python running in the browser (of course). Here are some known limitations:

* Python can access the system's file system. JavaScript cannot. However, a virtual file system is created and Python is run at the files directory of that virtual file system (`/files`).

* Python can access low-level networking like sockets. JavaScript cannot. We have, however, [shimmed HTTP support](#accessing-http-in-python) into Python.

* Python can interface with the operating system and shell. JavaScript cannot. Functions like `os.system`, `os.fork`, or `multiprocessing` are not appropriate as there is no notion of a host environment shell or processes as these are operating system level constructs.

A lot of these things can be "shimmed" in the future just like the virtual file system. Things like `/dev/random` and `/dev/urandom` are actually available even though there is no operating system because Emscripten shims these devices.

Even though on Node.js, it is possible to access some of these features, we still limit the ability of Coldbrew to access these features to maintain compatibility with the browser version of Coldbrew.

## Security
When using Coldbrew in the browser, all Python code does execute in the browser, so it is fairly safe to execute arbitrary Python code in comparison to executing arbitrary Python code server-side on your backend servers. However, you should treat any Python code running on a page in the browser as " `eval()`-ed JavaScript". That means the Python code is *not* sandboxed from manipulating elements on the page, reading cookies, accessing the network, or accessing other site resources.

When using Coldbrew in Node.js, you similarly want to protect against executing arbitrary Python code server-side as there is now an additional risk of code executing on your backend server performing Denial-of-Service attacks or accessing your backend system resources.

Coldbrew is not sandboxed by design, however, if you need that functionality you could use other JavaScript sandboxing solutions like [sandboxed iframes](https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/) or [Realms-shim](https://github.com/Agoric/realms-shim) to create a JavaScript sandbox and run Coldbrew within that.

## Performance and Size Benchmarks
To give a quick sense of how much of a performance hit running Python in JavaScript takes, a few different tests of running [`/coldbrew/examples/fib.py`](https://github.com/plasticityai/coldbrew/blob/master/src/examples/fib.py) are shown below. All tests were run on a MacBook Pro (Retina, 15-inch, Mid 2014) 2.2GHz quad-core Intel Core i7 @ 16GB RAM on SSD with the Google Chrome Browser:


| Benchmark Test                                                             | Native (macOS) CPython Execution   | Coldbrew Synchronous Execution   | Coldbrew Asynchronous Execution   <br /><sup>*(yield rate = 100) (default)*</sup>   | Coldbrew Asynchronous Execution   <br /><sup>*(yield rate = 1000)*</sup>   | Coldbrew Asynchronous Execution   <br /><sup>*(yield rate = 10000)*</sup>  | Coldbrew Asynchronous Execution   <br /><sup>*(yield rate = 100000)*</sup>   |
| -------------------------------------------------------------------------- | :--------------------------------: | :------------------------------: | :---------------------------------------------------------------------------------: | :------------------------------------------------------------------------: | :------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
| `fib.py 100000 -i -v` <br/><sup>(compute intensive workload)</sup>         | 0.149s                             | 0.505s <br/>*(3.39x)*            | 11.62s <br/>*(77.98x)*                                                              | 2.518s <br/>*(16.89x)*                                                     | 1.223s <br/>*(8.20x)*                                                      | 1.115s <br/>*(7.48x)*                                                        |
| `fib.py 25 -v` <br/><sup>(recursive & function call heavy workload)</sup>  | 0.040s                             | 0.154s <br/>*(3.85x)*            | 59.24s <br/>*(1481.00x)*                                                            | 9.699s <br/>*(242.47x)*                                                    | 3.747s <br/>*(93.67x)*                                                     | 3.130s <br/>*(78.25x)*                                                       |
| `fib.py 1000 -f -v` <br/><sup>(file system intensive workload)</sup>       | 0.298s                             | 0.405s <br/>*(1.36x)*            | 11.84s <br/>*(39.73x)*                                                              | 2.463s <br/>*(8.26x)*                                                      | 1.268s <br/>*(4.25x)*                                                      | 1.181s <br/>*(3.96x)*                                                        |

These tests are surely not exhausitive or representative, but should give some sense of how the performance compares at a glance. 

Synchronous execution performs fairly well, with only a minor slowdown. Asynchronous execution is considerably slower. Therefore, we recommended running most code synchronously, if possible, and only running the sections of your Python program that need to be asynchronous (such as code that may be accessing an HTTP connection) in asynchronous mode. We also recommened experimenting with the [yield rate](#change-the-asynchronous-yield-rate) and setting it to a number as high as possible if your application doesn't feel locked up.

## Contributing
The main repository for this project can be found on [GitLab](https://gitlab.com/Plasticity/coldbrew). The [GitHub repository](https://github.com/plasticityai/coldbrew) is only a mirror. Pull requests for more tests, better error-checking, bug fixes, performance improvements, or documentation or adding additional utilties / functionalities are welcome on [GitLab](https://gitlab.com/Plasticity/coldbrew).

**Please note**: This library is being actively maintained as we use it. However, due to the nature of compiling a whole other language's interpreter into JavaScript using a tool like Emscripten, certain things might not work or be accessible due to Emscripten's limitations. If you want to contribute a PR to fix something, please feel free to, but if we have no need for whatever happens to be broken we will likely not fix or provide support for those issues ourselves. If it is simply a matter of exposing a library / function that wasn't exposed or another simple change, open an issue or PR and we'll see if we can do our best to add support.

You can contact us at [opensource@plasticity.ai](mailto:opensource@plasticity.ai).


## LICENSE and Attribution

This repository is licensed under the license found [here](LICENSE.txt).

<div>Icon made by <a href="https://www.flaticon.com/authors/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/"           title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"          title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>