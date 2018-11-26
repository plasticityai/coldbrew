# Coldbrew: Run Python in JavaScript

Coldbrew is Python (CPython 3.5.2 specifically) compiled into JavaScript using [Emscripten](https://github.com/kripken/emscripten) and WebAssembly/`asm.js`. It is *the easiest way* to run Python code in JavaScript (a web browser). This library also supports Python modules that use native C code.

## Using the library

### Installation
### Running Python
### Accessing the Virtual Filesystem
### Communicating between JavaScript and Python

## Building a Custom Python Environment

### Changing the Module Name
### Adding Python Module Dependencies and Requirements to the Environment
### Bundling files
### Building
### Running

## Example Use Cases

This isn't the most efficient way to run code in a browser. It is an interpreted language, within another interpreted language. `asm.js`/WebAssembly It would of course be better if you hand re-wrote your Python code for the browser. There are be a few legitimate cases where this library would be useful however:

1. An online IDE / coding tutorial website that wants to let people run Python code in a sandbox. It is better to run the Python code in the user's own browser so you don't have execute arbitrary Python code on your servers (for security reasons). It also means you don't have to run servers to execute Python code server side and send the result back to the browser (which is more cost efficient).

2. An online demo for a Python library that makes it easy for people to quickly experiment with it in the browser.

3. A quick-and-dirty solution to porting over Python code to the browser that isn't worth hand re-writing or would be difficult to maintain versions in two different languages. 

4. Access a Python library that is not available in JavaScript. 

## Known Limitations

Any limitations imposed by the browser will be imposed by Python running in the browser (of course). Here are some known limitations:

* Python can access the system's filesystem. JavaScript cannot. However, a virtual filesystem is created and Python is run at the root of that virtual filesystem (`/`).

* Python can access low-level networking like sockets. JavaScript cannot.

* Python can interface with the operating system and shell. JavaScript cannot. Functions like `os.system`, `os.fork`, or `multiprocessing` are not appropriate as there is no notion of a host environment shell or processes as these are operating system level constructs.

## Contributing
The main repository for this project can be found on [GitLab](https://gitlab.com/Plasticity/coldbrew). The [GitHub repository](https://github.com/plasticityai/coldbrew) is only a mirror. Pull requests for more tests, better error-checking, bug fixes, performance improvements, or documentation or adding additional utilties / functionalities are welcome on [GitLab](https://gitlab.com/Plasticity/magnitude).

**Please note**: This library is being actively maintained as we use it. However, due to the nature of compiling a whole other language's interpereter into JavaScript using a tool like Emscripten, certain things might not work or be accessible due to Emscripten's limitations. If you want to contribute a PR to fix something, please feel free to, but if we have no need for whatever happens to be broken we will not fix or provide support for those issues ourselves.

You can contact us at [opensource@plasticity.ai](mailto:opensource@plasticity.ai).


## LICENSE and Attribution

This repository is licensed under the license found [here](LICENSE.txt).

<div>Icon made by <a href="https://www.flaticon.com/authors/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/"           title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"          title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>