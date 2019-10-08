#include <emscripten.h>
#include <stdio.h>
#include <Python.h>

extern int _coldbrew_no_yield;
extern int _coldbrew_is_async;
extern int _coldbrew_async_yield_ops;

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
_Coldbrew__is_no_yield(PyObject* self, PyObject* args)
{
  if (_coldbrew_no_yield) {
    Py_RETURN_TRUE;
  } else {
    Py_RETURN_FALSE;
  }
}

static PyObject*
_Coldbrew__run(PyObject* self, PyObject* args)
{
    char* script;
    if (!PyArg_ParseTuple(args, "s", &script))
        return NULL;
    emscripten_run_script(script);
    Py_RETURN_NONE;
}


static PyObject*
_Coldbrew__run_string(PyObject* self, PyObject* args)
{
    char* script;
    if (!PyArg_ParseTuple(args, "s", &script))
        return NULL;
    return PyUnicode_FromString(emscripten_run_script_string(script));
}

void set_asyncify_stack_size(int size);
size_t calculate_coldbrew_stack_size();
static PyObject*
_Coldbrew__sleep(PyObject* self, PyObject* args)
{
    float time;
    if (!PyArg_ParseTuple(args, "f", &time))
        return NULL;
    if (_coldbrew_is_async) {
      set_asyncify_stack_size(calculate_coldbrew_stack_size());
      #if __COLDBREW_ASYNC_DEBUG__
      printf("ASNYNCIFY STACK SIZE: %zu bytes\n", calculate_coldbrew_stack_size());
      emscripten_run_script("console.error('ASYNCIFY BEFORE SLEEP')");
      #endif
      emscripten_sleep((long) (time*1000));
      #if __COLDBREW_ASYNC_DEBUG__
      emscripten_run_script("console.error('ASYNCIFY AFTER SLEEP')");
      #endif
    }
    Py_RETURN_NONE;
}

static PyObject*
_Coldbrew_get_async_yield_rate(PyObject* self, PyObject* args)
{
  return Py_BuildValue("i", _coldbrew_async_yield_ops);
}

static PyObject*
_Coldbrew_set_async_yield_rate(PyObject* self, PyObject* args)
{
    int ops;
    if (!PyArg_ParseTuple(args, "i", &ops))
        return NULL;
    if (ops <= 0) {
      _coldbrew_no_yield = 1;
    } else {
      _coldbrew_async_yield_ops = ops;
    }
    Py_RETURN_NONE;
}

static PyObject*
_Coldbrew__emscripten_version(PyObject* self, PyObject* args)
{
    static char _emscripten_version[11];
    snprintf(_emscripten_version, 11, "%d.%d.%d", __EMSCRIPTEN_major__, __EMSCRIPTEN_minor__, __EMSCRIPTEN_tiny__);
    return PyUnicode_FromString(_emscripten_version);
}


static PyMethodDef _ColdbrewMethods[] =
{
     {"is_async", _Coldbrew_is_async, METH_VARARGS, NULL},
     {"_is_no_yield", _Coldbrew__is_no_yield, METH_VARARGS, NULL},
     {"_run", _Coldbrew__run, METH_VARARGS, NULL},
     {"_run_string", _Coldbrew__run_string, METH_VARARGS, NULL},
     {"_sleep", _Coldbrew__sleep, METH_VARARGS, NULL},
     {"get_async_yield_rate", _Coldbrew_get_async_yield_rate, METH_VARARGS, NULL},
     {"set_async_yield_rate", _Coldbrew_set_async_yield_rate, METH_VARARGS, NULL},
     {"_emscripten_version", _Coldbrew__emscripten_version, METH_VARARGS, NULL},
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
