import _Coldbrew
import json
import os
import sys
import time

from _Coldbrew import *

_slot_id = 1
_exception = None
_builtins = None


pyversion = os.environ['PYVERSION']
version = os.environ['COLDBREW_VERSION']
moduleName = os.environ['COLDBREW_MODULE_NAME']
moduleNameLower = os.environ['COLDBREW_MODULE_NAME_LOWER']

def sleep(time):
    if is_async():
        _Coldbrew._sleep(time)
    else:
        _warn("Python tried to call sleep(). Since you are not running in asynchronous mode, sleep() has no effect.")

time.sleep = sleep # Monkey patch the Python sleep() to run our version sleep()

_old_excepthook = sys.excepthook

def exception_handler(exctype, value, tb):
    global _exception
    _exception = {
            'exctype': exctype.__name__,
            'value': getattr(value, 'message') if hasattr(value, 'message') else str(value),
            'filename': tb.tb_frame.f_code.co_filename,
            'tb_lineno': tb.tb_lineno,
        }
    _old_excepthook(exctype, value, tb)


sys.excepthook = exception_handler

def get_variable(expression):
    return json.loads(run_string("JSON.stringify("+expression+") || null"))

def run_function(functionExpression, *args):
    return get_variable(functionExpression+'('+','.join([json.dumps(arg) for arg in args])+')');

def run_function_async(functionExpression, *args, **kwargs):
    global _slot_id
    _slot_id += 1
    uid = '_internal_pyslot_'+str(_slot_id)
    if is_async():
        run(functionExpression+'('+','.join([json.dumps(arg) for arg in args])+''').then(function(val) {
                '''+moduleName+'''._slots["'''+uid+'''"] = val;
                '''+moduleName+'''._resume_ie = true;
                '''+moduleName+'''.resume(false);
            });''')
        while get_variable('''(typeof '''+moduleName+'''._slots["'''+uid+'''"] === 'undefined')'''):
            sleep(-1)
        return get_variable(moduleName+'''._slots["'''+uid+'''"]''')
    else:
        _error("Python tried to call an async JavaScript function "+json.dumps(functionExpression)+". Since you are not running in asynchronous mode, this is not allowed.")

def _clear_argv():
    sys.argv.clear()

def _append_argv(arg):
    sys.argv.append(arg)

def reset():
    return run_function(moduleName+'.reset')

def _warn(message):
    if os.environ['COLDBREW_WARNINGS'] == '1':
        run("console.warn('Coldbrew Warning: '+"+json.dumps(message)+");")

def _error(message):
    run("console.error('Coldbrew Error: '+"+json.dumps(message)+");")
    raise RuntimeError()