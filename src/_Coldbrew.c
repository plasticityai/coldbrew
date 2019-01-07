#include <emscripten.h>
#include <stdio.h>
#include <Python.h>

extern int _coldbrew_is_async;

static PyObject*
_Coldbrew_is_async(PyObject* self, PyObject* args)
{
  if (_coldbrew_is_async) {
    Py_RETURN_TRUE;
  } else {
    Py_RETURN_FALSE;
  }
}

static PyObject*
_Coldbrew_run(PyObject* self, PyObject* args)
{
    char* script;
    if (!PyArg_ParseTuple(args, "s", &script))
        return NULL;
    emscripten_run_script(script);
    Py_RETURN_NONE;
}


static PyObject*
_Coldbrew_run_string(PyObject* self, PyObject* args)
{
    char* script;
    if (!PyArg_ParseTuple(args, "s", &script))
        return NULL;
    return PyUnicode_FromString(emscripten_run_script_string(script));
}

static PyObject*
_Coldbrew__sleep(PyObject* self, PyObject* args)
{
    float time;
    if (!PyArg_ParseTuple(args, "f", &time))
        return NULL;
    if (_coldbrew_is_async) {
      emscripten_sleep((int) (time*1000));
    }
    Py_RETURN_NONE;
}



static PyMethodDef _ColdbrewMethods[] =
{
     {"is_async", _Coldbrew_is_async, METH_VARARGS, NULL},
     {"run", _Coldbrew_run, METH_VARARGS, NULL},
     {"run_string", _Coldbrew_run_string, METH_VARARGS, NULL},
     {"_sleep", _Coldbrew__sleep, METH_VARARGS, NULL},
     {NULL, NULL, 0, NULL}
};

static struct PyModuleDef _ColdbrewModule = {
   PyModuleDef_HEAD_INIT,
   "_Coldbrew",   /* name of module */
   NULL, /* module documentation, may be NULL */
   -1,       /* size of per-interpreter state of the module,
                or -1 if the module keeps state in global variables. */
   _ColdbrewMethods
};

PyMODINIT_FUNC
PyInit__Coldbrew(void)
{
    PyObject *m;

    m = PyModule_Create(&_ColdbrewModule);
    if (m == NULL)
        return NULL;

    return m;
}
