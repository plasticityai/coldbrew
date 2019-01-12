# If you want to customize the module name, edit the line below
MODULE_NAME = "Coldbrew"

# Controls the default amount of memory (must be a multiple of 64KB or 524288) to allocate for the program (it can grow beyond this)
DEFAULT_MEMORY = 524288 * 512

# Controls whether to enable the BrowserFS attachment
BROWSERFS = False

# Controls whether to enable the JSZip attachment
JSZIP = True

# This can be helpful for asm.js, but does more harm than good when using WASM
# AGGRESSIVE_VARIABLE_ELIMINATION="-s AGGRESSIVE_VARIABLE_ELIMINATION=1"
AGGRESSIVE_VARIABLE_ELIMINATION = ""

# By deleting some of the built-in modules, we can save some space
UNUSED_MODULES = "test distutils ensurepip idlelib __pycache__ tkinter"

# Uncomment to enable threading support
# PTHREAD_CFLAGS = "-s USE_PTHREADS=1"
# PTHREAD_LDFLAGS = "-s USE_PTHREADS=1 -s PTHREAD_POOL_SIZE=4"
PTHREAD_CFLAGS = ""
PTHREAD_LDFLAGS = ""


# Controls whether to enable debugging symbols
DEBUG_MODE = True

# Controls whether to disable assertions (when debug mode is enabled)
NO_ASSERTIONS = False