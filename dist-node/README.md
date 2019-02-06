<div align="center"><img src="https://gitlab.com/Plasticity/coldbrew/raw/master/images/coldbrew.png" alt="coldbrew" height="50"></div>

## <div align="center">Coldbrew: Run Python in JavaScript<br /><br />[![pipeline status](https://gitlab.com/Plasticity/coldbrew/badges/master/pipeline.svg)](https://gitlab.com/Plasticity/coldbrew/commits/master)&nbsp;&nbsp;&nbsp;[![npm (scoped)](https://img.shields.io/npm/v/@plasticity/coldbrew.svg)](https://www.npmjs.com/package/@plasticity/coldbrew)&nbsp;&nbsp;&nbsp;[![version](https://img.shields.io/github/release/plasticityai/coldbrew.svg)](https://github.com/plasticityai/coldbrew/releases)</div>

Coldbrew is Python compiled into JavaScript using [Emscripten](https://github.com/kripken/emscripten) and [WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)/`asm.js`. It is the easiest way to run Python code in JavaScript (a web browser or Node.js) and is developed by [Plasticity](https://www.plasticity.ai/).

Coldbrew currently uses CPython 3.5.2 and supports Python modules utilizing native C extensions (such as the built-in `sqlite3`).

Coldbrew also allows you to bundle your own Python application, script, library along with its required modules and dependencies to the environment. See the section on [building a custom Coldbrew Python environment](#building-a-custom-coldbrew-python-environment). The build is [Docker](https://www.docker.com/get-started)-ized so it is very easy to build! 🐳 

## Table of Contents
- [Demo](#demo)
- [Installation](#installation)
- [Using the Library](#using-the-library)
  * [Loading the Environment](#loading-the-environment)
  * [Running Python in JavaScript](#running-python-in-javascript)
    + [Running Python Asynchronously in JavaScript](#running-python-asynchronously-in-javascript)
  * [Running Python Files in JavaScript](#running-python-files-in-javascript)
    + [Running Python Files Asynchronously in JavaScript](#running-python-files-asynchronously-in-javascript)
  * [Communicating between JavaScript and Python](#communicating-between-javascript-and-python)
    + [Get Python Variable in JavaScript](#get-python-variable-in-javascript)
    + [Get JavaScript Variable in Python](#get-javascript-variable-in-python)
    + [Run Python Function in JavaScript](#run-python-function-in-javascript)
    + [Run Python Function Asynchronously in JavaScript](#run-python-function-asynchronously-in-javascript)
    + [Run JavaScript Function in Python](#run-javascript-function-in-python)
    + [Run Asynchronous JavaScript Function in Python](#run-asynchronous-javascript-function-in-python)
  * [Error Handling](#error-handling)
    + [Catching Python Errors in JavaScript](#catching-python-errors-in-javascript)
    + [Catching JavaScript Errors in Python](#catching-javascript-errors-in-python)
  * [Accessing HTTP in Python](#accessing-http-in-python)
  * [Accessing the Virtual Filesystem](#accessing-the-virtual-filesystem)
    + [Listing files under a directory](#listing-files-under-a-directory)
    + [Create a Folder](#create-a-folder)
    + [Adding a File](#adding-a-file)
    + [Check if a Path Exists](#check-if-a-path-exists)
    + [Reading a File](#reading-a-file)
    + [Deleting a Path](#deleting-a-path)
    + [Adding a `.zip` File](#adding-a-zip-file)
    + [Saving and Loading Files to Browser Storage](#saving-and-loading-files-to-browser-storage)
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
  * [8. Customizing the Export (Optional)](#8-customizing-the-export-optional)
- [Example Use Cases](#example-use-cases)
- [Known Limitations](#known-limitations)
- [Security](#security)
- [Benchmarks](#benchmarks)
- [Contributing](#contributing)
- [LICENSE and Attribution](#license-and-attribution)

## Demo
You can find a demo with some examples of Coldbrew at [http://coldbrew.plasticity.ai](http://coldbrew.plasticity.ai).

## Installation
You can use the library in a browser by embedding `coldbrew.asm.js` via our CDN:
```html
<script src="https://cdn.jsdelivr.net/gh/plasticityai/coldbrew@latest/dist/coldbrew.asm.js"></script>
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
    sharedHome: false, /* Makes the /home/ directory in the virtual file system a "shared directory" between multiple instances of Coldbrew running */
    sharedTmp: false, /* Makes the /tmp/ directory in the virtual file system a "shared directory" between multiple instances of Coldbrew running */
    persistHome: false, /* Makes the /home/ directory persistable to browser storage */
    persistTmp: false, /* Makes the /tmp/ directory persistable to browser storage */
  },
  hideWarnings: false, /* Hides warnings */
  monitorFileUsage: false, /* Monitors file usage for slimming the data bundle for a custom Coldbrew Python environment */
  asyncYieldRate: null, /* Allows you to override the default asynchronous yield rate (see setAsyncYieldRate()) */
};
```

### Running Python in JavaScript
You can run Python in JavaScript like so:
```javascript
Coldbrew.run("import sys");
Coldbrew.run("print('The current Python version is:', sys.version)");
```

The `run` function returns `0` when successful or throws a `PythonError` if there was an error.

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

The `runAsync` function returns a Promise that resolves to `0` when successful or rejects with a `PythonError` if there was an error.

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

The `runFile` function returns `0` when successful or throws a `PythonError` if there was an error.

#### Running Python Files Asynchronously in JavaScript
You can also run Python files like [add.py](https://github.com/plasticityai/coldbrew/blob/master/src/examples/add.py) in JavaScript asynchronously:
```javascript
Coldbrew.runFileAsync('add.py', {
  cwd: '/coldbrew/examples',
  env: {},
  args: ['5', '15', '-v']
});
```

The `runFileAsync` function returns a Promise that resolves to `0` when successful or rejects with a `PythonError` if there was an error.

### Communicating between JavaScript and Python

#### Get Python Variable in JavaScript
You can access a variable from Python in JavaScript like so:
```javascript
Coldbrew.run("x = 5**2");
Coldbrew.getVariable("x"); // Returns 25
```

Note: This only works if the data in the variable is JSON serializable.

#### Get JavaScript Variable in Python
You can access a variable from JavaScript in Python like so:
```javascript
var x = Math.pow(5, 2);
Coldbrew.run("print(Coldbrew.get_variable('x'))") // Prints 25
```

Note: This only works if the data in the variable is JSON serializable.

Note: This only works if the variable is in the scope of `window` (browser), `self` (worker), or `global` (Node.js).

#### Run Python Function in JavaScript
You can run a function from Python in JavaScript like so:
```javascript
Coldbrew.run(
`def foo(x, y):
  return x**y
`);
Coldbrew.runFunction("foo", 5, 2); // Resolves to 25
```

Note: This only works if the data returned by the function is JSON serializable.

#### Run Python Function Asynchronously in JavaScript
You can run a function from Python asynchronously in JavaScript like so:
```javascript
Coldbrew.run(
`def foo(x, y):
  return x**y
`);
Coldbrew.runFunctionAsync("foo", 5, 2); // Resolves to 25
```

Note: This only works if the data returned by the function is JSON serializable.

#### Run JavaScript Function in Python
You can run a function from JavaScript in Python like so:
```javascript
function foo(x, y) {
  return Math.pow(x, y);
}
Coldbrew.run("print(Coldbrew.run_function('foo', 5, 2))"); // Prints 25
```

Note: This only works if the data returned by the function is JSON serializable.

Note: This only works if the function is in the scope of `window` (browser), `self` (worker), or `global` (Node.js).

#### Run Asynchronous JavaScript Function in Python
You can run a asynchronous function from JavaScript (that returns a Promise) in Python like so:
```javascript
function foo(x, y) {
  return Promise.resolve(Math.pow(x, y));
}
Coldbrew.runAsync("print(Coldbrew.run_function_async('foo', 5, 2))"); // Prints 25
```

Note: This only works if the data returned by the function is JSON serializable.

Note: This only works if the function is in the scope of `window` (browser), `self` (worker), or `global` (Node.js).

### Error Handling

#### Catching Python Errors in JavaScript
If you are running a Python using Coldbrew that encounters an error, a `Coldbrew.PythonError` will be thrown in JavaScript. You can then use `e.errorData` on the error object `e` to get more information about the Python context where the error occurred. You can also get information about the last Python exception thrown in JavaScript like so:
```javascript
Coldbrew.getExceptionInfo(); // Returns a dictionary with information from the last Python exception
```

#### Catching JavaScript Errors in Python
If you are running a JavaScript function in Python that encounters an error, a `Coldbrew.JavaScriptError` will be raised in Python. You can then use `e.error_data` on the error object `e` to get more information about the JavaScript context where the error occurred. You can also access the last JavaScript error in Python like so:
```javascript
Coldbrew.run('print(Coldbrew.js_error)');
```

### Accessing HTTP in Python
Python is able to access HTTP connections in Coldbrew and the requests will be shimmed by JavaScript's XHR requests:
```javascript
Coldbrew.runAsync(
`import urllib.request
print(urllib.request.urlopen("http://coldbrew.plasticity.ai/example.txt").read())
`);
```

### Accessing the Virtual Filesystem
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
Coldbrew.addFilesFromZip('/home', 'http://coldbrew.plasticity.ai/example_project.zip').then(function() {
  Coldbrew.runFile('multiply.py', {
    cwd: '/home/example_project',
    env: {},
    args: ['5', '15', '-v']
  });
});
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
To build, simply navigate to the project root in terminal and run `./build.sh`. This will kick off a build process within a Docker container. The first build will take quite some time as it will have to compile Python from source. Subsequent builds will be much faster with caches. If you need to clean all caches for some reason, run `./clean.sh`.

### 5. Running
To test, simply navigate to the project root in terminal and run `./serve.sh`. This will run a web server at [http://localhost:8000](http://localhost:8000) that will embed your custom Coldbrew Python environment for use.

### 6. Deploying
Deployment files can be found under the `dist` folder. An example `index.html` in the `dist` folder shows how to import and use the library on a page. A `package.json` file will be added to the `dist` folder when building for Node.js, which you can modify as needed.

### 7. Saving space (Optional, but recommended)
The version of Coldbrew distributed by CDN can be quite large since it makes an AJAX request to download the entire Python standard library. Your particular Python program / application / script, however, may not need all of these files. We have included an easy way to slim down the data bundle. Modify `customize/keeplist.txt` to include paths to all files of the standard library that your application uses to keep them (sort of like a reverse `.gitignore`), any other files will not be bundled at runtime. You can easily generate this list of files by passing `monitorFileUsage: true` to the Coldbrew `load` method and then calling `Coldbrew.getUsedFiles()` in the JavaScript console *after* running your Python program / application / script (to make sure that all files imported by your code were monitored). This saves a **significant** amount of space, so it is recommended!

### 8. Customizing the Export (Optional)
You may want to change what value will be exported by the library. By default, the Coldbrew Python Environment is exported. You can modify what value is exported by setting the `EXPORT` variable in `customize/export.js`.

Whatever you set the `EXPORT` variable to, is what the global variable named `MODULE_NAME` (the same `MODULE_NAME` from `coldbrew_settings.py`) will be set to in browsers or what will be exported in Node.js when `require()`-ing your library.

## Example Use Cases
This [isn't the most efficient way](#benchmarks) to run code in a JavaScript. It is an interpreted language (Python), within another interpreted language (JavaScript). However, with the emitted `asm.js`/WebAssembly code from Emscripten, it actually runs fairly quickly. Emscripten can get fairly close to native machine code speeds, because browsers will compile WebAssembly or `asm.js` to machine code. It would, of course, be better if you hand re-wrote your Python code for the browser. However, there are be a few legitimate cases where this library would be useful:

1. An online demo for a Python library that makes it easy for people to quickly experiment with it in the browser / Node.js.

2. A quick-and-dirty solution to porting over Python code to the browser / Node.js that isn't worth hand re-writing, is a legacy codebase, or would be too difficult to maintain multiple versions of in two different languages. (Write once. Deploy anywhere.)

3. Access the [Python Standard Library](https://docs.python.org/3/library/) and [thousands of Python libraries](https://pypi.org/) that are not available in JavaScript. 

4. An online IDE or coding tutorial website that wants to let people run Python code in a sandbox. It is better to run the Python code in the user's own browser so you don't have execute arbitrary Python code on your servers (for security reasons). It also means you don't have to run servers to execute Python code server side and send the result back to the browser (which is more cost efficient).

5. Running Python code at the edge, on-device, instead of on a backend server for user privacy reasons.

## Known Limitations

Any limitations imposed by the browser will be imposed by Python running in the browser (of course). Here are some known limitations:

* Python can access the system's file system. JavaScript cannot. However, a virtual file system is created and Python is run at the files directory of that virtual file system (`/files`).

* Python's `threading` library is currently not supported. However, this is due to an [upstream bug](https://github.com/kripken/emscripten/issues/7382) in the V8 engine that Chrome uses. Soon, that bug will be fixed and Coldbrew will support `threading`.

* Python can access low-level networking like sockets. JavaScript cannot. We have, however, [shimmed HTTP support](#accessing-http-in-python) into Python.

* Python can interface with the operating system and shell. JavaScript cannot. Functions like `os.system`, `os.fork`, or `multiprocessing` are not appropriate as there is no notion of a host environment shell or processes as these are operating system level constructs.

A lot of these things can be "shimmed" in the future just like the virtual file system. Things like `/dev/random` and `/dev/urandom` are actually available even though there is no operating system because Emscripten shims these devices.

Even though on Node.js, it is possible to access some of these features, we still limit the ability of Coldbrew to access these features to maintain compatibility with the browser version of Coldbrew.

## Security
When using Coldbrew in the browser, all Python code does execute in the browser, so it is fairly safe to execute arbitrary Python code in comparison to executing arbitrary Python code server-side on your backend servers. However, you should treat any Python code running on a page in the browser as " `eval()`-ed JavaScript". That means the Python code is *not* sandboxed from manipulating elements on the page, reading cookies, or accessing the network.

When using Coldbrew in Node.js, you similarly want to protect against executing arbitrary Python code server-side as there is now an additional risk of code executing on your backend server performing Denial-of-Service attacks or accessing your backend system resources.

## Benchmarks
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

**Please note**: This library is being actively maintained as we use it. However, due to the nature of compiling a whole other language's interpreter into JavaScript using a tool like Emscripten, certain things might not work or be accessible due to Emscripten's limitations. If you want to contribute a PR to fix something, please feel free to, but if we have no need for whatever happens to be broken we will likely not fix or provide support for those issues ourselves. If it is simply a matter of exposing a library / function that wasn't exposed or another simple change, open an issue or PR and we'll see if we can add support.

You can contact us at [opensource@plasticity.ai](mailto:opensource@plasticity.ai).


## LICENSE and Attribution

This repository is licensed under the license found [here](LICENSE.txt).

<div>Icon made by <a href="https://www.flaticon.com/authors/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/"           title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"          title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>