#include <stdlib.h>
#include <stdio.h>
#include <emscripten.h>
#include <Python.h>
#include <dlfcn.h>
#if __EMSCRIPTEN_PTHREADS__
#include <pthread.h>
#endif

#define STRINGIFY2(X) #X
#define STRINGIFY(X) STRINGIFY2(X)

// Control variables for async-ifying the Python interpreter
void* _coldbrew_stack_start = 0;
int _coldbrew_no_yield = 1;
int _coldbrew_is_async = 0;
int _coldbrew_is_sync = 0;
int _coldbrew_async_yield_ops = 100; // By default, yield back to the JavaScript event loop every 100 Python bytecode instructions
void* _coldbrew_main_thread_id = 0;

// Forward Declare Python Builtin Modules
PyMODINIT_FUNC PyInit__Coldbrew(void);
PyMODINIT_FUNC PyInit__sqlite3(void);
// ***REQUIREMENTS_PYINITS*** *DO NOT TOUCH*

// Guard for concurrency
int guard_concurrency() {
    if (_coldbrew_is_async || _coldbrew_is_sync) {
        return -1;
    }
    return 0;
}

// Set the size of the buffer that the stack will be saved to
EM_JS(void, set_asyncify_stack_size, (int size), {
  Asyncify.StackSize = size;
});

// Calculate approximate stack size
#define STACKMIN 4096
size_t calculate_coldbrew_stack_size() {
    void* p = NULL;
    void* _coldbrew_stack_end = (void*)&p;
    size_t calculated = (_coldbrew_stack_start-_coldbrew_stack_end);
    return calculated < STACKMIN ? STACKMIN : calculated;
}

// Python interpreter loop yielding helpers
void _coldbrew_pre_func_ptr_call(int id) {
    _coldbrew_no_yield += 1;
}
void _coldbrew_post_func_ptr_call(int id) {
    _coldbrew_no_yield -= 1;
}
void _coldbrew_yield_to_javascript() {
    // Really, we should only yield if on the main thread, 
    // there's no point to yielding on a Worker since nothing 
    // else is running there and it just makes things slower.
    if (pthread_self() != _coldbrew_main_thread_id) return;

    /* Emscripten sleeping yields back to the JavaScript event loop */
    set_asyncify_stack_size(calculate_coldbrew_stack_size());
    #if __COLDBREW_ASYNC_DEBUG__
    printf("ASNYNCIFY STACK SIZE: %zu bytes\n", calculate_coldbrew_stack_size());
    emscripten_run_script("console.error('ASYNCIFY BEFORE SLEEP (YIELD)')");
    #endif
    emscripten_sleep(1);
    #if __COLDBREW_ASYNC_DEBUG__
    emscripten_run_script("console.error('ASYNCIFY AFTER SLEEP (YIELD)')");
    #endif

}

// Exported functions
int EMSCRIPTEN_KEEPALIVE export_run(char *str) {
    if (guard_concurrency() < 0) return -2;
    void* p = NULL;
    _coldbrew_stack_start = (void*)&p;
    _coldbrew_no_yield = 1;
    _coldbrew_is_async = 0;
    _coldbrew_is_sync = 1;
    int rval = PyRun_SimpleString(str);
    _coldbrew_is_sync = 0;
    return rval;
}

int EMSCRIPTEN_KEEPALIVE export_runAsync(char *str) {
    if (guard_concurrency() < 0) return -2;
    void* p = NULL;
    _coldbrew_stack_start = (void*)&p;
    _coldbrew_no_yield = 0;
    _coldbrew_is_async = 1;
    int rval = PyRun_SimpleString(str);
    _coldbrew_no_yield = 1;
    _coldbrew_is_async = 0;
    return rval;
}

int EMSCRIPTEN_KEEPALIVE export_chdir(char *path) {
    if (guard_concurrency() < 0) return -2;
    return chdir(path);
}

int EMSCRIPTEN_KEEPALIVE export__runFile(char *path) {
    if (guard_concurrency() < 0) return -2;
    void* p = NULL;
    _coldbrew_stack_start = (void*)&p;
    FILE* fp = fopen(path, "r");
    if (fp == NULL) {
        emscripten_run_script("console.error('Coldbrew Error: The Python file to be run could not be found in the current working directory.')");
        return -1;
    }
    _coldbrew_no_yield = 1;
    _coldbrew_is_async = 0;
    _coldbrew_is_sync = 1;
    int rval = PyRun_AnyFileEx(fp, path, 1);
    _coldbrew_is_sync = 0;
    return rval;
}

int EMSCRIPTEN_KEEPALIVE export__runFileAsync(char *path) {
    if (guard_concurrency() < 0) return -2;
    void* p = NULL;
    _coldbrew_stack_start = (void*)&p;
    FILE* fp = fopen(path, "r");
    if (fp == NULL) {
        emscripten_run_script("console.error('Coldbrew Error: The Python file to be run could not be found in the current working directory.')");
        return -1;
    }
    _coldbrew_no_yield = 0;
    _coldbrew_is_async = 1;
    int rval = PyRun_AnyFileEx(fp, path, 1);
    _coldbrew_no_yield = 1;
    _coldbrew_is_async = 0;
    return rval;
}

int EMSCRIPTEN_KEEPALIVE export_getAsyncYieldRate() {
    return _coldbrew_async_yield_ops;
}

void EMSCRIPTEN_KEEPALIVE export_setAsyncYieldRate(int ops) {
    _coldbrew_async_yield_ops = ops;
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
    if (guard_concurrency() < 0) return -2;
    int before_yield_ops = _coldbrew_async_yield_ops;
    _coldbrew_async_yield_ops = 2147483647;
    int rcode1 = PyRun_SimpleString("Coldbrew.run_function('"STRINGIFY(MODULE_NAME)".resetenv')");
    int rcode2 = PyRun_SimpleString("_coldbrew_restore_context()");
    _coldbrew_python_initialize();
    _coldbrew_async_yield_ops = before_yield_ops;
    return rcode1 | rcode2;
}

// Main
int main(int argc, char** argv) {
    #if __EMSCRIPTEN_PTHREADS__
    _coldbrew_main_thread_id = pthread_self();
    #endif
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
