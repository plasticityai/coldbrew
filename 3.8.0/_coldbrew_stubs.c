#include "Python.h"


PyObject *
os_posix_spawn_impl(PyObject *module, int *path, PyObject *argv,
                    PyObject *env, PyObject *file_actions,
                    PyObject *setpgroup, int resetids, int setsid,
                    PyObject *setsigmask, PyObject *setsigdef,
                    PyObject *scheduler) {
  return NULL;
}

PyObject *
os_posix_spawnp_impl(PyObject *module, int *path, PyObject *argv,
                     PyObject *env, PyObject *file_actions,
                     PyObject *setpgroup, int resetids, int setsid,
                     PyObject *setsigmask, PyObject *setsigdef,
                     PyObject *scheduler) {
  return NULL;
}

static PyMethodDef _coldbrew_stubsMethods[] =
{
     {NULL, NULL, 0, NULL}
};

static struct PyModuleDef _coldbrew_stubsModule = {
   PyModuleDef_HEAD_INIT,
   "_coldbrew_stubs",   /* name of module */
   NULL, /* module documentation, may be NULL */
   -1,       /* size of per-interpreter state of the module,
                or -1 if the module keeps state in global variables. */
   _coldbrew_stubsMethods
};

PyMODINIT_FUNC
PyInit__coldbrew_stubs(void)
{
    PyObject *m;

    m = PyModule_Create(&_coldbrew_stubsModule);
    if (m == NULL)
        return NULL;

    return m;
}