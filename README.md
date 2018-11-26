# Coldbrew: Run Python in JavaScript

Coldbrew is Python (CPython 3.5.2 specifically) compiled into JavaScript using [Emscripten](https://github.com/kripken/emscripten). It is *the easiest way* to run Python code in JavaScript (a web browser). This library also supports Python modules that use native C code.

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

## Known Limitations

Any limitations imposed by the browser will be imposed by Python running in the browser (of course). Here are some known limitations:

* Python can access the system's filesystem. JavaScript cannot. However, a virtual filesystem is created and Python is run at the root of that virtual filesystem (`/`).

* Python can access low-level networking like sockets. JavaScript cannot.

* Python can interface with the operating system and shell. JavaScript cannot. Functions like `os.system`, `os.fork`, or `multiprocessing` are not appropriate as there is no notion of a host environment shell or processes as these are operating system level constructs.

## Contributing
The main repository for this project can be found on [GitLab](https://gitlab.com/Plasticity/coldbrew). The [GitHub repository](https://github.com/plasticityai/coldbrew) is only a mirror. Pull requests for more tests, better error-checking, bug fixes, performance improvements, or documentation or adding additional utilties / functionalities are welcome on [GitLab](https://gitlab.com/Plasticity/magnitude).

*Please note*: This library is being actively maintained as we use it. However, due to the nature of compiling a whole other language's interpereter into JavaScript using a tool like Emscripten, certain things might not work or be accessible due to Emscripten's limitations. If want to contribute a PR to fix something, please feel free to, but if we have no need for whatever happens to be broken we will not fix or provide support for those issues.

You can contact us at [opensource@plasticity.ai](mailto:opensource@plasticity.ai).


## LICENSE and Attribution

This repository is licensed under the license found [here](LICENSE.txt).

<div>Icon made by <a href="https://www.flaticon.com/authors/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/"           title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"          title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>