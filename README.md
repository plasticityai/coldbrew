<div align="center"><img src="https://gitlab.com/Plasticity/coldbrew/raw/master/images/coldbrew.png" alt="coldbrew" height="50"></div>

## <div align="center">Coldbrew: Run Python in JavaScript<br /><br />[![pipeline status](https://gitlab.com/Plasticity/coldbrew/badges/master/pipeline.svg)](https://gitlab.com/Plasticity/coldbrew/commits/master)</div>

Coldbrew is Python compiled into JavaScript using [Emscripten](https://github.com/kripken/emscripten) and [WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)/`asm.js`. It is the easiest way to run Python code in JavaScript (a web browser) and is developed by [Plasticity](https://www.plasticity.ai/).

Coldbrew currently uses CPython 3.5.2 and supports Python modules utilizing native C extensions (such as the built-in `sqlite3`).

Coldbrew also allows you to bundle your own Python application, script, library along with its required modules and dependencies to the environment. See the section on [building a custom Coldbrew Python environment](#building-a-custom-coldbrew-python-environment). The build is [Docker](https://www.docker.com/get-started)-ized so it is very easy to build! 🐳 

## Using the Library

### Demo
You find a demo at [http://coldbrew.plasticity.ai.com](http://coldbrew.plasticity.ai.com).

### Installation
You can import the CDN version of this library using the following code:

You can also [build it yourself from source and use resulting `dist` folder](#deploying).

### Loading the Environment

### Running Python in JavaScript

#### Running Python Asynchronously

### Running Python Files in JavaScript

#### Running Python Files Asynchronously

### Running JavaScript in Python

### Communicating between JavaScript and Python

### Error Handling
#### Catching Python Errors in JavaScript
#### Catching JavaScript Errors in JavaScript

### Accessing the Virtual Filesystem

#### Listing files under a directory

#### Adding a File

#### Adding a `.zip` File

### Accessing environment variables

### Can I install Python modules at run time?
Coldbrew only comes with a standard Python installation, with no third-party modules. There is no way to add modules at run time to this environment using something like `pip install`. You can also, however, instead [build a custom Coldbrew Python environment](#building-a-custom-coldbrew-python-environment) yourself (it's easy!) which allows you to specify a `requirements.txt` file to pre-load your modules into the environment. 

## Building a Custom Coldbrew Python Environment

### 1. Changing the Module Name and Other Settings
To change the global name of the library from `Coldbrew` to something else (so you could run custom Coldbrew Python environments without their names conflicting in the global namespace), you can modify `customize/coldbrew_settings.py`. Various other settings can also be modified in `customize/coldbrew_settings.py`, however, the defaults are generally acceptable.

### 2. Adding Python Module Dependencies and Requirements to the Environment
Add any requirements of your project in the standard Python [`requirements.txt` format](https://pip.pypa.io/en/stable/reference/pip_install/#requirements-file-format). Note: Python modules that are pure Python will almost certainly work. Python modules that use C code may or may not work properly depending on if they have external dependencies or rely heavily on specific operating system functionality.

### 3. Bundling files
To bundle additional files into the virtual file system, simply add them to the `/customize/files` folder. They will be available at runtime under `/files` in the virtual file system.

### 4. Building
To build, simply navigate to the project root in terminal and run `./build.sh`. This will kick off a build process within a Docker container.

### 5. Running
To test, simply navigate to the project root in terminal and run `./serve.sh`. This will run a web server at [http://localhost:8000](http://localhost:8000) that will embed your custom Coldbrew Python environment.

### 6. Saving space (Optional)
The version of Coldbrew distributed by CDN can be quite large since it makes an AJAX request to download the entire Python standard library. Your particular Python program / application / script, however, may not need all of these files. We have included an easy way to slim down the data bundle. Modify `customize/keeplist.txt` to include paths to all files of the standard library that your application uses to keep them (sort of like a reverse `.gitignore`), any other files will not be bundled at runtime. You can easily generate this list of files by passing `monitorFileUsage: true` to the Coldbrew `load` method and then calling `Coldbrew.getUsedFiles()` in the JavaScript console *after* running your Python program / application / script. 

### 7. Deploying
Deployment files can be found under the `dist` folder. An example `index.html` in the `dist` folder shows how to import the library onto a page.

## Example Use Cases
This isn't the most efficient way to run code in a browser. It is an interpreted language (Python), within another interpreted language (JavaScript). However, with the emitted `asm.js`/WebAssembly code from Emscripten, it actually runs fairly quickly. Emscripten can get fairly close to native machine code speeds, because browsers will compile WebAssembly or `asm.js` to machine code. It would, of course, be better if you hand re-wrote your Python code for the browser. However, there are be a few legitimate cases where this library would be useful:

1. An online IDE or coding tutorial website that wants to let people run Python code in a sandbox. It is better to run the Python code in the user's own browser so you don't have execute arbitrary Python code on your servers (for security reasons). It also means you don't have to run servers to execute Python code server side and send the result back to the browser (which is more cost efficient).

2. An online demo for a Python library that makes it easy for people to quickly experiment with it in the browser.

3. A quick-and-dirty solution to porting over Python code to the browser that isn't worth hand re-writing or would be difficult to maintain multiple versions in two different languages. (Write once. Deploy anywhere.)

4. Access the [thousands of Python libraries](https://pypi.org/) that are not available in JavaScript. 

5. Running Python code at the edge, on-device instead of on a backend server for user privacy reasons.

## Known Limitations

Any limitations imposed by the browser will be imposed by Python running in the browser (of course). Here are some known limitations:

* Python can access the system's file system. JavaScript cannot. However, a virtual file system is created and Python is run at the root of that virtual file system (`/`).

* Python's `threading` library is currently not supported. However, this is due to an [upstream bug](https://github.com/kripken/emscripten/issues/7382) in the V8 engine that Chrome uses. Soon that bug will be fixed and Coldbrew will support `threading`.

* Python can access low-level networking like sockets. JavaScript cannot.

* Python can interface with the operating system and shell. JavaScript cannot. Functions like `os.system`, `os.fork`, or `multiprocessing` are not appropriate as there is no notion of a host environment shell or processes as these are operating system level constructs.

A lot of these things can be "shimmed" in the future just like the virtual file system. Things like `/dev/random` and `/dev/urandom` are actually available even though there is no operating system because Emscripten shims these devices.

## Security

All Python code does execute in the browser, so it is fairly safe to execute arbitrary Python code in comparison to executing arbitrary Python code server-side on your backend servers. However, you should treat any Python code running on a page in the browser as " `eval()`-ed JavaScript". That means the Python code is *not* sandboxed from manipulating elements on the page, reading cookies, or accessing the network.

## Contributing
The main repository for this project can be found on [GitLab](https://gitlab.com/Plasticity/coldbrew). The [GitHub repository](https://github.com/plasticityai/coldbrew) is only a mirror. Pull requests for more tests, better error-checking, bug fixes, performance improvements, or documentation or adding additional utilties / functionalities are welcome on [GitLab](https://gitlab.com/Plasticity/coldbrew).

**Please note**: This library is being actively maintained as we use it. However, due to the nature of compiling a whole other language's interpreter into JavaScript using a tool like Emscripten, certain things might not work or be accessible due to Emscripten's limitations. If you want to contribute a PR to fix something, please feel free to, but if we have no need for whatever happens to be broken we will likely not fix or provide support for those issues ourselves. If it is simply a matter of exposing a library / function that wasn't exposed or another simple change, open an issue or PR and we'll see if we can add support.

You can contact us at [opensource@plasticity.ai](mailto:opensource@plasticity.ai).


## LICENSE and Attribution

This repository is licensed under the license found [here](LICENSE.txt).

<div>Icon made by <a href="https://www.flaticon.com/authors/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/"           title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"          title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>