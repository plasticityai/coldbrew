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

# Enable threading support
ENABLE_THREADING = True

# Controls whether to enable the JSZip attachment
JSZIP = True

# This can be helpful for asm.js, but does more harm than good when using WASM
# AGGRESSIVE_VARIABLE_ELIMINATION="-s AGGRESSIVE_VARIABLE_ELIMINATION=1"
AGGRESSIVE_VARIABLE_ELIMINATION = ""

# Controls whether to enable debugging mode
DEBUG_MODE = False

# Controls whether to disable assertions (when debug mode is enabled)
NO_ASSERTIONS = False

# You can mark built-in modules as unused, so that we can delete them
# when building to save space.
UNUSED_BUILTIN_MODULES = []

# Optional Optimizations
COMPRESS_NETWORK_FILES = True # Compresses the supporting distribution files (.wasm, .data) with zip so that they are smaller and load faster when downloading over the web. It's recommended you load Coldbrew with {worker: true} mode when using this, to offload the decompression into its own web worker.
FAST_AND_SMALL_BUT_NO_ASYNC = False # Reduces the code size emitted and executes faster, but removes asynchronous execution functionality

######################################################################
### Internal Settings 
######################################################################
### The settings below are settings only the Coldbrew maintainers
### should ever really edit.
######################################################################

# Controls whether to enable the BrowserFS attachment
BROWSERFS = False