#include <stdlib.h>
#include <stdio.h>
#include <emscripten.h>
#include <Python.h>
#include <dlfcn.h>

PyMODINIT_FUNC PyInit__coldbrew_hello(void);

int runpython(char *str) {
    printf("%s", str);
    return PyRun_SimpleString(str);
    }

int main(int argc, char** argv) {

    setenv("PYTHONHOME", "/", 0);

    fprintf(stderr, "Initializing...\n");

    PyImport_AppendInittab("_coldbrew_hello", PyInit__coldbrew_hello);

    Py_InitializeEx(0);

    fprintf(stderr, "Home directory: %s\n", Py_GetPythonHome());

    emscripten_exit_with_live_runtime();
    return 0;
}
