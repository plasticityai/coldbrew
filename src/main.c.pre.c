#include <stdlib.h>
#include <stdio.h>
#include <emscripten.h>
#include <Python.h>
#include <dlfcn.h>

#define STRINGIFY2(X) #X
#define STRINGIFY(X) STRINGIFY2(X)

// Control variables for async-ifying the Python interpreter
int _coldbrew_no_yield = 1;
int _coldbrew_is_async = 0;
int _coldbrew_is_async_paused = 0;
int _coldbrew_async_yield_ops = 100; // By default, yield back to the JavaScript event loop every 100 Python bytecode instructions
void EMSCRIPTEN_KEEPALIVE _coldbrew_pre_func_ptr_call(int id) {
    _coldbrew_no_yield += 1;
    // if (_coldbrew_is_async) {
    //     // If it was running asynchronously, it no longer is, and the pause status is 1
    //     _coldbrew_is_async = 0; 
    //     _coldbrew_is_async_paused = 1; 
    // }
}
void EMSCRIPTEN_KEEPALIVE _coldbrew_post_func_ptr_call(int id) {
    _coldbrew_no_yield -= 1;
    // if (_coldbrew_is_async_paused && _coldbrew_no_yield == 0) {
    //     // If async was paused, and no-yield is now 0, turn on async, and pause status is now 0
    //     _coldbrew_is_async = 1; 
    //     _coldbrew_is_async_paused = 0;
    // }
}
void EMSCRIPTEN_KEEPALIVE _coldbrew_yield_to_javascript() {
    static int count = 0;
    /* Emscripten sleeping yields back to the JavaScript event loop */
    emscripten_sleep(1);
}

// Forward Declare Python Builtin Modules
PyMODINIT_FUNC PyInit__Coldbrew(void);
PyMODINIT_FUNC PyInit__sqlite3(void);
// ***REQUIREMENTS_PYINITS*** *DO NOT TOUCH*

// Gaurd for concurrency

int guard_concurrency() {
    if (_coldbrew_is_async) {
        emscripten_run_script("console.error('Coldbrew Error: The Coldbrew Python interpreter is already running asynchronously. You cannot run the Coldbrew Python interpreter concurrently. Please wait for all previous executions to finish.');");
        return -1;
    }
    return 0;
}

// Exported functions
int EMSCRIPTEN_KEEPALIVE export_run(char *str) {
    if (guard_concurrency() < 0) return -1;
    _coldbrew_no_yield = 1;
    _coldbrew_is_async = 0;
    _coldbrew_is_async_paused = 0;
    return PyRun_SimpleString(str);
}

int EMSCRIPTEN_KEEPALIVE export_runAsync(char *str) {
    if (guard_concurrency() < 0) return -1;
    _coldbrew_no_yield = 0;
    _coldbrew_is_async = 1;
    _coldbrew_is_async_paused = 0;
    int rval = PyRun_SimpleString(str);
    _coldbrew_no_yield = 1;
    _coldbrew_is_async = 0;
    return rval;
}

int EMSCRIPTEN_KEEPALIVE export_setenv(char *key, char *val) {
    if (guard_concurrency() < 0) return -1;
    return setenv(key, val, 1);
}

int EMSCRIPTEN_KEEPALIVE export_unsetenv(char *key) {
    if (guard_concurrency() < 0) return -1;
    return unsetenv(key);
}

int EMSCRIPTEN_KEEPALIVE export_chdir(char *path) {
    if (guard_concurrency() < 0) return -1;
    return chdir(path);
}

int EMSCRIPTEN_KEEPALIVE export__runFile(char *path) {
    if (guard_concurrency() < 0) return -1;
    FILE* fp = fopen(path, "r");
    if (fp == NULL) {
        emscripten_run_script("console.error('Coldbrew Error: The Python file to be run could not be found in the current working directory.')");
        return -1;
    }
    _coldbrew_no_yield = 1;
    _coldbrew_is_async = 0;
    _coldbrew_is_async_paused = 0;
    return PyRun_AnyFileEx(fp, path, 1);
}

int EMSCRIPTEN_KEEPALIVE export__runFileAsync(char *path) {
    if (guard_concurrency() < 0) return -1;
    FILE* fp = fopen(path, "r");
    if (fp == NULL) {
        emscripten_run_script("console.error('Coldbrew Error: The Python file to be run could not be found in the current working directory.')");
        return -1;
    }
    _coldbrew_no_yield = 0;
    _coldbrew_is_async = 1;
    _coldbrew_is_async_paused = 0;
    int rval = PyRun_AnyFileEx(fp, path, 1);
    _coldbrew_no_yield = 1;
    _coldbrew_is_async = 0;
    return rval;
}

int EMSCRIPTEN_KEEPALIVE export_getAsyncYieldRate() {
    return _coldbrew_async_yield_ops;
}

void EMSCRIPTEN_KEEPALIVE export_setAsyncYieldRate(int ops) {
    if (ops <= 0) {
      _coldbrew_no_yield = 0;
    } else {
      _coldbrew_async_yield_ops = ops;
    }
}

int _coldbrew_python_initialize() {
    chdir(getenv("FILES"));
    char **pyargv = NULL;
    PySys_SetArgv(0, (wchar_t**) pyargv);
    int rcode1 = PyRun_SimpleString("import Coldbrew");
    int rcode2 = PyRun_SimpleString(
        "__coldbrew_saved_context__ = {}\n"
        "\n"
        "def _coldbrew_save_context():\n"
        "    import sys\n"
        "    __coldbrew_saved_context__.update(sys.modules[__name__].__dict__)\n"
        "\n"
        "def _coldbrew_restore_context():\n"
        "    import sys\n"
        "    names = list(sys.modules[__name__].__dict__.keys())\n"
        "    for n in names:\n"
        "        if n not in __coldbrew_saved_context__:\n"
        "            del sys.modules[__name__].__dict__[n]\n\n"
    );
    int rcode3 = PyRun_SimpleString("_coldbrew_save_context()");
    return rcode1 | rcode2 | rcode3;
}

int EMSCRIPTEN_KEEPALIVE export_reset() {
    if (guard_concurrency() < 0) return -1;
    int rcode1 = PyRun_SimpleString("Coldbrew.run_function('"STRINGIFY(MODULE_NAME)".resetenv')");
    int rcode2 = PyRun_SimpleString("_coldbrew_restore_context()");
    _coldbrew_python_initialize();
    return rcode1 | rcode2;
}

// Main
int main(int argc, char** argv) {
    setenv("PYTHONHOME", "/usr/local/", 1);
    setenv("LOGNAME", "coldbrew", 1);   
    setenv("USER", "coldbrew", 1); 
    setenv("HOME", "/home", 1);
    setenv("FILES", "/files", 1);
    setenv("COLDBREW", "true", 1);
    setenv("PYVERSION", STRINGIFY(PYVERSION), 1);
    setenv("COLDBREW_VERSION", STRINGIFY(COLDBREW_VERSION), 1);
    setenv("COLDBREW_MODULE_NAME", STRINGIFY(MODULE_NAME), 1);
    setenv("COLDBREW_MODULE_NAME_LOWER", STRINGIFY(MODULE_NAME_LOWER), 1);
    setenv("COLDBREW_WARNINGS", "1", 1);
    setenv("COLDBREW_ASYNC_FUNC", "", 1);
    rmdir("/home/web_user");
    Py_SetProgramName((wchar_t*) STRINGIFY(MODULE_NAME_LOWER));
    PyImport_AppendInittab("_Coldbrew", PyInit__Coldbrew);
    PyImport_AppendInittab("_sqlite3", PyInit__sqlite3);
    // ***REQUIREMENTS_IMPORTS*** *DO NOT TOUCH*
    Py_InitializeEx(0);
    _coldbrew_python_initialize();
    emscripten_exit_with_live_runtime();
    return 0;
}
