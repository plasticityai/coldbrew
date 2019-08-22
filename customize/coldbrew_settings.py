######################################################################
### Customizable Settings 
######################################################################
### The settings below are settings you can try and change to
### customize your own build of Coldbrew.
######################################################################

# If you want to customize the module name, edit the line below
MODULE_NAME = "Coldbrew"

# If you want to build for Node.js, turn this property on
NODE = False

# Controls the default amount of memory (must be a multiple of 64KB or 524288) to allocate for the program (it can grow beyond this)
DEFAULT_MEMORY = 524288 * 30

# Controls whether to enable the BrowserFS attachment
BROWSERFS = False

# Controls whether to enable the JSZip attachment
JSZIP = True

# This can be helpful for asm.js, but does more harm than good when using WASM
# AGGRESSIVE_VARIABLE_ELIMINATION="-s AGGRESSIVE_VARIABLE_ELIMINATION=1"
AGGRESSIVE_VARIABLE_ELIMINATION = ""

# Controls whether to enable debugging mode
DEBUG_MODE = False

# Controls whether to disable assertions (when debug mode is enabled)
NO_ASSERTIONS = False

# Optional Optimizations
USE_COMPRESSION = True # Compresses the the distribution files (.wasm, .data) with zip so that they are smaller and load faster when downloading over the web
FAST_AND_SMALL_BUT_NO_ASYNC = False # Reduces the code size emitted and executes faster, but removes asynchronous execution functionality

######################################################################
### Internal Settings 
######################################################################
### The settings below are settings only the Coldbrew maintainers
### should ever really edit.
######################################################################

# By deleting some of the built-in modules, we can save some space
UNUSED_MODULES = "test distutils ensurepip idlelib __pycache__ tkinter"

# Uncomment to enable threading support
PTHREAD_CFLAGS = ""
PTHREAD_LDFLAGS = ""
# PTHREAD_CFLAGS = "-s USE_PTHREADS=1"
# PTHREAD_LDFLAGS = "-s USE_PTHREADS=1 -s PTHREAD_POOL_SIZE=4"