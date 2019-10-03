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

# Controls the default amount of memory (must be a multiple of 64KB) to allocate for the program (it can grow beyond this)
DEFAULT_MEMORY = (64*1024) * 320

# This can be helpful for asm.js, but does more harm than good when using WASM
# AGGRESSIVE_VARIABLE_ELIMINATION="-s AGGRESSIVE_VARIABLE_ELIMINATION=1"
AGGRESSIVE_VARIABLE_ELIMINATION = ""

# Controls whether to enable debugging mode
DEBUG_MODE = False

# Controls whether to disable assertions (when debug mode is enabled)
NO_ASSERTIONS = False

# You can mark built in modules as unused, so that we can delete them
# when building to save space.
UNUSED_BUILTIN_MODULES = []

######################################################################
### Optional Optimizations
######################################################################
### You can change settings here to make your build run faster or use
### less space by trading off against other resources / disabling
### features. Unless you really need to eek out more performance,
### it's recommended you leave the values below as they are.
######################################################################
# Compresses the supporting distribution files (.wasm, .data) with zip so that they are smaller and load faster when downloading over the web. 
# It's recommended you load Coldbrew with {worker: true} mode when using this, to offload the decompression into its own web worker.
COMPRESS_NETWORK_FILES = True

# Reduces the code size emitted and executes faster, but removes asynchronous execution functionality.
FAST_AND_SMALL_BUT_NO_ASYNC = False

# Controls whether to enable the JSZip attachment (can make the output smaller, but disables all functions that handle ZIP files).
# Note: If COMPRESS_NETWORK_FILES is True, then JSZIP will be True, even if you set it to False.
JSZIP = True

# Controls whether to enable threading support.
# If you turn this off, the output size is smaller, but threading support will be gone.
ENABLE_THREADING = True

######################################################################
### Internal Settings 
######################################################################
### The settings below are settings only the Coldbrew maintainers
### should ever really edit.
######################################################################

# Controls whether to enable the BrowserFS attachment
BROWSERFS = False