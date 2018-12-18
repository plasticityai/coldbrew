#include <stdlib.h>
#include <stdio.h>
#include <emscripten.h>
#include <Python.h>
#include <dlfcn.h>

#define STRINGIFY2(X) #X
#define STRINGIFY(X) STRINGIFY2(X)

// Control variables for async-ifying the Python interpreter
int _coldbrew_async = 0;
int _coldbrew_is_async = 0;
int _coldbrew_async_yield_ops = 100; // By default, yield back to the JavaScript event loop every 100 Python bytecode instructions
void EMSCRIPTEN_KEEPALIVE _coldbrew_yield_to_javascript() {
    static int count = 0;
    /* Emscripten sleeping yields back to the JavaScript event loop */
    emscripten_sleep(1);
}

// Forward Declare Patched Python Functions
int PyRun_SimpleString_coldbrew_async(char *prog);


// Forward Declare Python Builtin Modules
PyMODINIT_FUNC PyInit__Coldbrew(void);

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
    _coldbrew_async = 0;
    _coldbrew_is_async = 0;
    printf("BEFORE RUNSIMPLE\n");
    return PyRun_SimpleString(str);
}

int EMSCRIPTEN_KEEPALIVE export_runAsync(char *str) {
    if (guard_concurrency() < 0) return -1;
    _coldbrew_async = 1;
    _coldbrew_is_async = 1;
    printf("BEFORE RUNSIMPLEASYNC\n");
    int rval = PyRun_SimpleString_coldbrew_async(str);
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
    char result[10000] = {0};
    snprintf(result, sizeof(result), "%s%s%s", "Coldbrew._run_file('", path, "')");
    return export_run(result);
}

int EMSCRIPTEN_KEEPALIVE export__runFileAsync(char *str) {
    // if (guard_concurrency() < 0) return -1;
    // char result[10000] = {0};
    // snprintf(result, sizeof(result), "%s%s%s", "Coldbrew._run_file('", path, "')");
    // printf("BEFORE RUN ASYNC\n");
    if (guard_concurrency() < 0) return -1;
    _coldbrew_async = 1;
    _coldbrew_is_async = 1;
    printf("BEFORE RUNSIMPLEASYNC\n");
    int rval = PyRun_SimpleString_coldbrew_async("Coldbrew._run_file('add.py')");
    _coldbrew_is_async = 0;
    return rval;
}

int _coldbrew_python_initialize() {
    chdir(getenv("FILES"));
    char **pyargv = NULL;
    PySys_SetArgv(0, (wchar_t**) pyargv);
    int rcode1 = PyRun_SimpleString("import Coldbrew");
    emscripten_run_script("console.warn('Initialized "STRINGIFY(MODULE_NAME)" Python Environment.');");
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
    Py_InitializeEx(0);
    _coldbrew_python_initialize();
    emscripten_exit_with_live_runtime();
    return 0;
}
