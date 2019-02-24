import _Coldbrew
import json
import os
import sys
import time

from _Coldbrew import *

_slot_id = 0
_var_id = 0
_vars = {}
_get_vars = {}
_exception = None
_builtins = None


pyversion = os.environ['PYVERSION']
version = os.environ['COLDBREW_VERSION']
module_name = os.environ['COLDBREW_MODULE_NAME']
module_name_lower = os.environ['COLDBREW_MODULE_NAME_LOWER']
module_name_var = module_name
js_error = None

def _single_line_try(func, errorType):
    try:
        func()
        return True
    except errorType as e:
        return False

def _barg(arg):
    if type(arg) == bytes:
        return arg.decode('utf8')
    else:
        return arg

def _getcwd():
    return os.getcwd()

def sleep(t):
    if is_async():
        _Coldbrew._sleep(t)
    else:
        _warn("Python tried to call sleep("+str(t)+"). Since you are not running in asynchronous mode, sleep() will busy wait (https://en.wikipedia.org/wiki/Busy_waiting) and lock the browser until the sleep is completed.")
        stime = time.time()
        while time.time()-stime < t:
            pass

time.sleep = sleep # Monkey patch the Python sleep() to run our version sleep()

_old_excepthook = sys.excepthook

def exception_handler(exctype, value, tb):
    global _exception
    _exception = {
            'exctype': exctype.__name__,
            'value': getattr(value, 'message') if hasattr(value, 'message') else str(value),
            'filename': (tb and tb.tb_frame.f_code.co_filename) or None,
            'tb_lineno': (tb and tb.tb_lineno) or None,
        }
    if hasattr(value, 'error_data'):
        _exception['error_data'] = value.error_data
    _old_excepthook(exctype, value, tb)


sys.excepthook = exception_handler

import importlib.abc
import importlib.machinery
import sys

class ImportFinder(importlib.abc.MetaPathFinder):
    def find_spec(self, fullname, path, target=None):
        if fullname in sys.builtin_module_names:
            return importlib.machinery.ModuleSpec(
                fullname,
                importlib.machinery.BuiltinImporter,
            )

sys.meta_path.append(ImportFinder())

class JavaScriptError(Exception):
    pass

def get_variable(expression):
    global js_error
    val = json.loads(_Coldbrew._run_string("JSON.stringify("+expression+") || null"))
    if isinstance(val, dict) and '_internal_coldbrew_error' in val and val['_internal_coldbrew_error']:
        error = JavaScriptError(val['type']+": "+val['message'])
        error.error_data = {
            'type': val['type'],
            'name': val['name'],
            'message': val['message'],
            'stack': val['stack'],
            'data': val['data'],
        }
        js_error = error
        raise error
    else:
        return val

def run(expression):
    global js_error
    val = json.loads(_Coldbrew._run_string("JSON.stringify("+module_name_var+'._try(function () {'+expression+"})) || null"))
    if isinstance(val, dict) and '_internal_coldbrew_error' in val and val['_internal_coldbrew_error']:
        error = JavaScriptError(val['type']+": "+val['message'])
        error.error_data = {
            'type': val['type'],
            'name': val['name'],
            'message': val['message'],
            'stack': val['stack'],
            'data': val['data'],
        }
        js_error = error
        raise error
    return 0

def run_function(functionExpression, *args):
    return get_variable(module_name_var+'._try(function () { return '+functionExpression+'('+','.join([json.dumps(_barg(arg)) for arg in args])+')})');

def run_function_async(functionExpression, *args, **kwargs):
    global _slot_id
    _slot_id += 1
    uid = '_internal_pyslot_'+str(_slot_id)
    if is_async():
        _Coldbrew._run(functionExpression+'('+','.join([json.dumps(_barg(arg)) for arg in args])+''').then(function(val) {
                '''+module_name_var+'''._slots["'''+uid+'''"] = val;
                '''+module_name_var+'''._resume_ie = true;
                '''+module_name_var+'''.resume(false);
            }).catch(function(e) {
                '''+module_name_var+'''._slots["'''+uid+'''"] = '''+module_name_var+'''._convertError(e);
                '''+module_name_var+'''._resume_ie = true;
                '''+module_name_var+'''.resume(false);
            });''')
        while get_variable('''(typeof '''+module_name_var+'''._slots["'''+uid+'''"] === 'undefined')'''):
            sleep(-1)
        return get_variable(module_name_var+'''._slots["'''+uid+'''"]''')
    else:
        _error("Python tried to call an async JavaScript function "+json.dumps(functionExpression)+". Since you are not running in asynchronous mode, this is not allowed.")

class StandardInput():
    def readline(self):
        linebuffer = ''
        while True:
            c = self.read(1)
            linebuffer += c
            if c == '\n' or c == '':
                break
        return linebuffer
        
    def read(self, size):
        if is_async():
            return run_function_async(module_name_var+'''.onStandardInReadAsync''', size)
        else:
            return run_function(module_name_var+'''.onStandardInRead''', size)

sys.stdin = StandardInput()

def _clear_argv():
    sys.argv.clear()

def _append_argv(arg):
    sys.argv.append(arg)

def reset():
    return run_function(module_name_var+'.reset')

def _warn(message):
    if os.environ['COLDBREW_WARNINGS'] == '1':
        _Coldbrew._run("console.warn('Coldbrew Warning: '+"+json.dumps(message)+");")

def _error(message):
    _Coldbrew._run("console.error('Coldbrew Error: '+"+json.dumps(message)+");")
    raise RuntimeError()

def _call_func(func, *args):
    kwargs = {}
    processed_args = []
    for arg in args:
        if isinstance(arg, dict) and '_internal_coldbrew_get_var' in arg and arg['_internal_coldbrew_get_var']:
            jsarg = get_variable(module_name_var+'''._get_vars["'''+arg['uid']+'''"]''') # Grab the JavaScript native variable argument
            _Coldbrew._run('''delete '''+module_name_var+'''._get_vars["'''+arg['uid']+'''"]''') # Clean up the temporary reference
            processed_args.append(arg)
        elif isinstance(arg, dict) and '_internal_coldbrew_keywords' in arg and arg['_internal_coldbrew_keywords']:
            kwargs.update(arg['keywords'])
        else:
            processed_args.append(arg)
    return func(*processed_args, **kwargs)


def _export(obj):
    global _var_id
    global _vars
    try:
        if hasattr(obj, '__dict__'):
            raise TypeError()
        return json.dumps(obj)
    except TypeError as e:
        _var_id += 1
        uid = '_internal_pyvar_'+str(_var_id)
        _vars[uid] = obj
        return json.dumps({
            '_internal_coldbrew_python_object': True,
            'uid': uid,
            'constructable': type(obj) == type,
            'callable': callable(obj),
            'type': obj.__class__.__name__.replace('-', '_'),
            'name': (obj.__name__ if hasattr(obj, '__name__') else ('PythonCallable' if callable(obj) else 'PythonUnnamed')).replace('<', '').replace('>', '').replace('-', '_'),
        })


# Import Shims
import ColdbrewHTTPShim
