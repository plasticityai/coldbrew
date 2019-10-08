import _Coldbrew
import json
import os
import sys
import time

from _Coldbrew import *

############################################################
######################PATCH JSON DUMPS######################
############################################################
''' Patch JSON Dumps to always produce proper JSON.'''

############################################################
_old_json_dumps = json.dumps
def _new_json_dumps(*args, **kwargs):
    kwargs['allow_nan'] = False
    return _old_json_dumps(*args, **kwargs)
json.dumps = _new_json_dumps

############################################################
#################START PRIVATE VARIABLES####################
############################################################
''' Various private variables that hold state.'''
############################################################
_slot_id = 0
_var_id = 0
_vars = {} # Stores references to Python variables that are shimmed in JavaScript by Proxy variables.
_exception = None
_builtins = None
_finalized_options = {}
class _StopIteration:
    pass
############################################################
##################END PRIVATE VARIABLES#####################
############################################################

############################################################
##################START PUBLIC VARIABLES####################
############################################################
''' Various public variables that hold state or 
information.'''
############################################################
pyversion = os.environ['PYVERSION']
version = os.environ['COLDBREW_VERSION']
module_name = os.environ['COLDBREW_MODULE_NAME']
module_name_lower = os.environ['COLDBREW_MODULE_NAME_LOWER']
module_name_var = module_name
_js_error = None
############################################################
###################END PUBLIC VARIABLES#####################
############################################################

############################################################
#################START PRIVATE FUNCTIONS####################
############################################################
''' Various private functions used by Coldbrew.'''
############################################################
def _async_advise(verb):
    return 'You '+verb+' use getVariableAsync(), runAsync(), runFunctionAsync(), or runFileAsync() instead.'

def _try(f):
    try:
        return f()
    except Exception as e:
        return None

def _run_guard(*args):
    if 'threadWorkers' in _finalized_options:
        import threading
        if threading.current_thread() is not threading.main_thread():
            _error("You can only access JavaScript from the main Python thread.")
    return _Coldbrew._run(*args)

def _run_string_guard(*args):
    if 'threadWorkers' in _finalized_options:
        import threading
        if threading.current_thread() is not threading.main_thread():
            _error("You can only access JavaScript from the main Python thread.")
    return _Coldbrew._run_string(*args)

_Coldbrew._run_guard = _run_guard
_Coldbrew._run_string_guard = _run_string_guard
del _run_guard
del _run_string_guard

def _warn(message):
    if not(_finalized_options['hideWarnings']):
        _Coldbrew._run("console.warn('Coldbrew Warning: '+"+json.dumps(message)+");")

def _error(message):
    _Coldbrew._run("console.error('Coldbrew Error: '+"+json.dumps(message)+");")
    raise RuntimeError('Coldbrew Error: '+message)

def _barg(arg):
    if type(arg) == bytes:
        return arg.decode('utf8')
    else:
        return arg

def _getcwd():
    return os.getcwd()

def _clear_argv():
    sys.argv.clear()

def _append_argv(arg):
    sys.argv.append(arg)

def _transform_prop(prop, reverse=None):
    if not(isinstance(reverse, list)) and _finalized_options['transformVariableCasing']:
        if prop.isalnum():
            result = ""
            for i, c in enumerate(prop):
                if i < (len(prop)-1) and c.islower() and prop[i+1].isupper():
                    result += c.lower()+"_"
                else:
                    result += c.lower()
            return result
        else:
            return prop
    elif _finalized_options['transformVariableCasing']:
        transformed_keys = [_transform_prop(p) for p in reverse]
        try:
            index_of_transformed_prop = transformed_keys.index(prop)
            return reverse[index_of_transformed_prop]
        except:
            return prop
    return prop

def _call_func(func, *args):
    class Coldbrew:
        json = json
        _vars = _vars

    kwargs = {}
    newArgs = []
    for arg in args:
        if isinstance(arg, dict) and '_internal_coldbrew_keywords' in arg and arg['_internal_coldbrew_keywords']:
            for key, val in arg['keywords'].items():
                arg['keywords'][key] = _unserialize_from_js(eval(val, {'Coldbrew': Coldbrew}))
            kwargs.update(arg['keywords'])
        else:
            newArgs.append(arg)
    return func(*[_unserialize_from_js(arg) for arg in newArgs], **kwargs)
############################################################
##################END PRIVATE FUNCTIONS#####################
############################################################

############################################################
#################START MISCELLANEOUS SHIMS##################
############################################################
''' Various small miscellaneous shims that shim really
core functionality like sleep, standard input, 
exception handling, and import loading. '''
############################################################

# Shim sys.version
try:
    _sys_version_repo_index = sys.version.index(" (/b/s/w/ir/cache/git/chr")
except:
    _sys_version_repo_index = None
if _sys_version_repo_index:
    sys.version = sys.version[:_sys_version_repo_index]+" (Emscripten "+_Coldbrew._emscripten_version()+" / Coldbrew "+version+")]"

# Shim sleep()
def sleep(t):
    if is_async():
        try:
            _Coldbrew._sleep(t)
        except SystemError:
            pass
    else:
        _warn("Python called sleep("+str(t)+"). Since you are not running in asynchronous mode, sleep() will busy wait (https://en.wikipedia.org/wiki/Busy_waiting) and lock the browser until the sleep is completed. "+_async_advise('may want to'))
        stime = time.time()
        while time.time()-stime < t:
            pass
time.sleep = sleep # Monkey patch the Python sleep() to run our version sleep()

# Shim execepthook
_old_excepthook = sys.excepthook
def _exception_handler(exctype, value, tb):
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
sys.excepthook = _exception_handler

# Shim import path finder
import importlib.abc
import importlib.machinery
import sys
class _ImportWatcher(object):
    @classmethod
    def find_module(cls, name, path, target=None):
        if 'threadWorkers' not in _finalized_options and name.split('.')[0] == 'threading':
            _warn("You attempted to use import 'threading' in Coldbrew without threading enabled. Please enable threading in the settings file.")
        return None

class _ImportFinder(importlib.abc.MetaPathFinder):
    def find_spec(self, fullname, path, target=None):
        if fullname in sys.builtin_module_names:
            return importlib.machinery.ModuleSpec(
                fullname,
                importlib.machinery.BuiltinImporter,
            )
sys.meta_path.append(_ImportFinder())
sys.meta_path.insert(0, _ImportWatcher)

# Shim standard input
class _StandardInput():
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
            return run_function(module_name_var+'''.onStandardInReadAsync''', size)
        else:
            return run_function(module_name_var+'''.onStandardInRead''', size)
sys.stdin = _StandardInput()
############################################################
##################END MISCELLANEOUS SHIMS###################
############################################################

############################################################
################START CREATE VARIABLE PROXY#################
############################################################
''' Creates a native Python variable from a JavaScript 
variable reference that mirrors that JavaScript variable
so it looks like a native Python variable. If the argument
is not a JavaScript variable reference, it is simply
returned. '''
############################################################
def _create_variable_proxy(obj):
    if isinstance(obj, dict) and '_internal_coldbrew_javascript_object' in obj and obj['_internal_coldbrew_javascript_object']:
        class ProxiedJavaScriptVariable(JavaScriptVariable):
            def __init__(self):
                JavaScriptVariable.__setattr__(self, '__internal_coldbrew_native_js_worker_proxy', None)
                JavaScriptVariable.__setattr__(self, '__internal_coldbrew_native_js_worker_proxy_working', False)
                ProxiedJavaScriptVariable._internal_coldbrew_native_js_worker_proxy_func(self)

            def _internal_coldbrew_native_js_worker_proxy_func(self):
                if JavaScriptVariable.__getattribute__(self, '__internal_coldbrew_native_js_worker_proxy') is None and not JavaScriptVariable.__getattribute__(self, '__internal_coldbrew_native_js_worker_proxy_working'):
                    JavaScriptVariable.__setattr__(self, '__internal_coldbrew_native_js_worker_proxy_working', True)
                    JavaScriptVariable.__setattr__(self, '__internal_coldbrew_native_js_worker_proxy', _finalized_options['worker'] and (ProxiedJavaScriptVariable.__typeof_prop__(self, '_internal_coldbrew_native_js_worker_proxy') != "undefined" ))
                    JavaScriptVariable.__setattr__(self, '__internal_coldbrew_native_js_worker_proxy_working', False)
                return JavaScriptVariable.__getattribute__(self, '__internal_coldbrew_native_js_worker_proxy')

            def __typeof_prop__(self, tprop):
                if tprop == '_internal_coldbrew_native_js_worker_proxy':
                    return _get_variable("(("+module_name_var+"._vars['"+obj['uid']+"']._internal_coldbrew_native_js_worker_proxy === true) ? 'boolean' : 'undefined')") 
                if tprop == '_internal_coldbrew_get_var_id' and ProxiedJavaScriptVariable._internal_coldbrew_native_js_worker_proxy_func(self):
                    return 'string'
                return _get_variable("(("+module_name_var+"._vars['"+obj['uid']+"']._internal_coldbrew_native_js_worker_proxy === true) ? ("+module_name_var+"._vars['"+obj['uid']+"']._internal_coldbrew_typeof_prop("+_serialize_to_js(tprop)+")) : (typeof "+module_name_var+"._vars['"+obj['uid']+"']["+module_name_var+"._unserializeFromPython("+_serialize_to_js(tprop)+")]))")

            def __has_prop__(self, tprop):
                if tprop == '_internal_coldbrew_get_var_id' and ProxiedJavaScriptVariable._internal_coldbrew_native_js_worker_proxy_func(self):
                    return True
                return _get_variable("(("+module_name_var+"._vars['"+obj['uid']+"']._internal_coldbrew_native_js_worker_proxy === true) ? ("+module_name_var+"._vars['"+obj['uid']+"']._internal_coldbrew_has_prop("+_serialize_to_js(tprop)+")) : ("+module_name_var+"._unserializeFromPython("+_serialize_to_js(tprop)+") in "+module_name_var+"._vars['"+obj['uid']+"']))")

            def __call__(self, *args):
                if obj['constructable'] or obj['callable']:
                    return _get_variable(module_name_var+"._callFunc("+json.dumps(is_async())+","+json.dumps(obj['constructable'])+", "+module_name_var+"._vars['"+obj['uid']+"'],"+','.join([_serialize_to_js(arg) for arg in args])+")")
                else:
                    return JavaScriptVariable.__call__(self)

            def __str__(self):
                hasProp = ProxiedJavaScriptVariable.__has_prop__(self, 'toString')
                if not hasProp:
                    return ProxiedJavaScriptVariable.__repr__(self)
                if ProxiedJavaScriptVariable._internal_coldbrew_native_js_worker_proxy_func(self):
                    return ProxiedJavaScriptVariable.__getattr__(self, 'toString')()
                else:
                    return _get_variable(module_name_var+"._vars['"+obj['uid']+"'].toString()")

            def __repr__(self):
                if obj['constructable'] or obj['callable']:
                    return "<JavaScriptVariable '"+obj['name']+"'>"
                else:
                    return '<JavaScriptVariable '+obj['type']+'.instance at '+obj['uid']+' (use str() to get the string representation)>'

            def __inspect__(self, transform = True):
                lookup = set()
                if not ProxiedJavaScriptVariable._internal_coldbrew_native_js_worker_proxy_func(self):
                    res = _get_variable(module_name_var+"._vars['"+obj['uid']+"'] && Object.getOwnPropertyNames("+module_name_var+"._vars['"+obj['uid']+"']).concat(Object.getOwnPropertyNames(Object.getPrototypeOf("+module_name_var+"._vars['"+obj['uid']+"'])))")
                else:
                    res = _get_variable(module_name_var+"._vars['"+obj['uid']+"'] && " + module_name_var+"._vars['"+obj['uid']+"']._internal_coldbrew_own_keys")()
                res = res or []
                res = [x for x in res if x not in lookup and lookup.add(x) is None]
                if transform:
                    return JavaScriptVariable.internal_key_defs+[_transform_prop(p) for p in res]
                else:
                    return JavaScriptVariable.internal_key_defs+res

            def __destroy__(self):
                if ProxiedJavaScriptVariable._internal_coldbrew_native_js_worker_proxy_func(self):
                    _get_variable(module_name_var+"._vars['"+obj['uid']+"']._internal_coldbrew_destroy")()
                return _run("delete "+module_name_var+"._vars['"+obj['uid']+"']")

            def __getattr__(self, prop):
                if prop == '_internal_coldbrew_native_js_worker_proxy':
                    return ProxiedJavaScriptVariable._internal_coldbrew_native_js_worker_proxy_func(self)
                elif prop == '__destroyed__':
                    return _get_variable("!("+module_name_var+"._vars.hasOwnProperty('"+obj['uid']+"'))")
                elif prop == '__type__':
                    return obj['type']
                elif prop == '__uid__':
                    return obj['uid']

                tprop = _transform_prop(prop, ProxiedJavaScriptVariable.__inspect__(self, False))
                typeofProp = ProxiedJavaScriptVariable.__typeof_prop__(self, tprop)
                hasProp = ProxiedJavaScriptVariable.__has_prop__(self, tprop)
                if not hasProp:
                    raise AttributeError("'"+obj['type']+"' object has no attribute '"+tprop+"'")
                else:
                    if typeofProp == 'function':
                        if ProxiedJavaScriptVariable._internal_coldbrew_native_js_worker_proxy_func(self):
                            return _get_variable(module_name_var+"._vars['"+obj['uid']+"']["+module_name_var+"._unserializeFromPython("+_serialize_to_js(tprop)+")]")
                        else:
                            return _get_variable(module_name_var+"._vars['"+obj['uid']+"']["+module_name_var+"._unserializeFromPython("+_serialize_to_js(tprop)+")].bind("+module_name_var+"._vars['"+obj['uid']+"'])")
                    else:
                        return _get_variable(module_name_var+"._vars['"+obj['uid']+"']["+module_name_var+"._unserializeFromPython("+_serialize_to_js(tprop)+")]")

            def __setattr__(self, prop, value):
                tprop = _transform_prop(prop, ProxiedJavaScriptVariable.__inspect__(self, False))
                _run(module_name_var+"._vars['"+obj['uid']+"']["+module_name_var+"._unserializeFromPython("+_serialize_to_js(tprop)+")] = "+module_name_var+"._unserializeFromPython("+_serialize_to_js(value)+")")
                return value
            
            def __delattr__(self, prop):
                tprop = _transform_prop(prop, ProxiedJavaScriptVariable.__inspect__(self, False))
                hasProp = ProxiedJavaScriptVariable.__has_prop__(self, tprop)
                if not hasProp:
                    raise AttributeError(tprop)
                return _run("delete "+module_name_var+"._vars['"+obj['uid']+"']["+module_name_var+"._unserializeFromPython("+_serialize_to_js(tprop)+")]")
            
            def __dir__(self):
                return ProxiedJavaScriptVariable.__inspect__(self)
            
            def __del__(self):
                ProxiedJavaScriptVariable.__destroy__(self)

            def __len__(self):
                hasPropLength = ProxiedJavaScriptVariable.__has_prop__(self, 'length')
                typeofPropSize = ProxiedJavaScriptVariable.__typeof_prop__(self, 'size')
                hasPropSize = ProxiedJavaScriptVariable.__has_prop__(self, 'size')
                if hasPropLength:
                    return _get_variable(module_name_var+"._vars['"+obj['uid']+"'].length")
                elif typeofPropSize == 'function':
                    return _get_variable(module_name_var+"._vars['"+obj['uid']+"'].size")()
                elif hasPropSize:
                    return _get_variable(module_name_var+"._vars['"+obj['uid']+"'].size")
                else:
                    return object.__len__(self)
                

            def __iter__(self):
                if _get_variable(module_name_var+"._vars['"+obj['uid']+"'][Symbol.iterator]") is None:
                    raise TypeError("'"+obj['type']+"' object is not iterable")
                if not ProxiedJavaScriptVariable._internal_coldbrew_native_js_worker_proxy_func(self):
                    jsiter = _get_variable(module_name_var+"._vars['"+obj['uid']+"'][Symbol.iterator].bind("+module_name_var+"._vars['"+obj['uid']+"'])")()
                else:
                    jsiter = _get_variable(module_name_var+"._vars['"+obj['uid']+"'][Symbol.iterator]")()
                while True:
                    nexti = jsiter.next()
                    if nexti['done'] == True:
                        break
                    else:
                        yield nexti['value']

            def __getitem__(self, prop):
                return ProxiedJavaScriptVariable.__getattr__(self, prop)

            def __setitem__(self, prop, value):
                return ProxiedJavaScriptVariable.__setattr__(self, prop, value)

            def __delitem__(self, prop):
                return ProxiedJavaScriptVariable.__delattr__(self, prop)

            def __contains__(self, prop):
                if type(prop) == str:
                    tprop = _transform_prop(prop, ProxiedJavaScriptVariable.__inspect__(self, False))
                else:
                    tprop = prop
                if not ProxiedJavaScriptVariable._internal_coldbrew_native_js_worker_proxy_func(self):
                    return _get_variable(module_name_var+"._unserializeFromPython("+_serialize_to_js(tprop)+") in "+module_name_var+"._vars['"+obj['uid']+"']")
                else:
                    return _get_variable(module_name_var+"._vars['"+obj['uid']+"']._internal_coldbrew_has("+module_name_var+"._unserializeFromPython("+_serialize_to_js(tprop)+"))")

        return ProxiedJavaScriptVariable()
    else:
        return obj
############################################################
#################END CREATE VARIABLE PROXY##################
############################################################

############################################################
################START COMMUNICATION HELPERS#################
############################################################
''' Functions that facilitate communcation between
Python and JavaScript '''
############################################################
def _serialize_to_js(obj):
    global _var_id
    global _vars
    if JavaScriptVariable.is_javascript_variable(obj):
        if obj._internal_coldbrew_native_js_worker_proxy == True:
            return json.dumps({
                '_internal_coldbrew_get_js_var': True,
                'uid': obj._internal_coldbrew_get_var_id,
            })
        else:
            return json.dumps({
                '_internal_coldbrew_var': True,
                'uid': obj.__uid__,
            })
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
            'is_async': is_async(),
            'uid': uid,
            'constructable': type(obj) == type,
            'callable': callable(obj),
            'type': obj.__class__.__name__.replace('-', '_'),
            'name': (obj.__name__ if hasattr(obj, '__name__') else ('PythonCallable' if callable(obj) else 'PythonUnnamed')).replace('<', '').replace('>', '').replace('-', '_'),
        })

def _unserialize_from_js(arg):
    global _vars
    arg = _create_variable_proxy(arg)
    if isinstance(arg, dict) and '_internal_coldbrew_get_var' in arg and arg['_internal_coldbrew_get_var']:
        jsarg = _get_variable(module_name_var+'''._main_thread_vars["'''+arg['uid']+'''"]''') # Grab the JavaScript native variable argument
        _Coldbrew._run_guard('''delete '''+module_name_var+'''._main_thread_vars["'''+arg['uid']+'''"]''') # Clean up the temporary reference
        return jsarg
    elif isinstance(arg, dict) and '_internal_coldbrew_var' in arg and arg['_internal_coldbrew_var']:
        return _vars[arg['uid']]
    else:
        return arg
############################################################
#################END COMMUNICATION HELPERS##################
############################################################

############################################################
####################START PUBLIC CLASSES####################
''' Public classes that Python code can interact with '''
############################################################
class JavaScriptError(Exception):
    pass

class JavaScriptVariable(object):
    internal_key_defs = ['__type__', '__uid__', '__inspect__', '__destroy__', '__destroyed__', '__str__', '__repr__']

    @staticmethod
    def is_javascript_variable(obj):
        return isinstance(obj, JavaScriptVariable)
############################################################
#####################END PUBLIC CLASSES#####################
############################################################

############################################################
####################START PUBLIC FUNCTIONS##################
############################################################
''' Public functions that allow Python code to interact
with the Coldbrew environment '''
############################################################
# Runs in worker
def _get_variable(expression):
    _internal_coldbrew_native_js_worker_proxy = _finalized_options['worker']
    
    class Coldbrew:
        json = json
        _vars = _vars

    def __get_variable(expression):
        global _js_error
        val = eval(_Coldbrew._run_string_guard(module_name_var+"._serializeToPython("+expression+", true) || null"), {'Coldbrew': Coldbrew})
        if isinstance(val, dict) and '_internal_coldbrew_error' in val and val['_internal_coldbrew_error']:
            error = JavaScriptError(val['type']+": "+val['message'])
            error.error_data = {
                'type': val['type'],
                'name': val['name'],
                'message': val['message'],
                'stack': val['stack'],
                'data': val['data'],
            }
            _js_error = error.error_data
            raise error
        else:
            return _unserialize_from_js(val)

    def __get_variable_async(expression):
        global _slot_id
        _slot_id += 1
        uid = '_internal_pyslot_'+str(_slot_id)
        if is_async():
            _Coldbrew._run_guard('''Promise.resolve('''+expression+''').then(function(val) {
                    '''+module_name_var+'''._promises_resolved_values["'''+uid+'''"] = val;
                    '''+module_name_var+'''._resume_ie = true;
                    '''+module_name_var+'''.resume(false);
                }).catch(function(e) {
                    '''+module_name_var+'''._promises_resolved_values["'''+uid+'''"] = '''+module_name_var+'''._convertError(e);
                    '''+module_name_var+'''._resume_ie = true;
                    '''+module_name_var+'''.resume(false);
                });''')
            while _get_variable('''(!('''+module_name_var+'''._promises_resolved_values.hasOwnProperty("'''+uid+'''")))'''):
                sleep(-1)
            res = _get_variable(module_name_var+'''._promises_resolved_values["'''+uid+'''"]''')
            _Coldbrew._run_guard('delete '+module_name_var+'''._promises_resolved_values["'''+uid+'''"]''')
            return res 
        else:
            _error("Python tried to access a JavaScript Promise. Since you are not running in Python in asynchronous mode, this is not allowed.")
    jsvar = __get_variable(expression)
    if JavaScriptVariable.is_javascript_variable(jsvar):
        is_promise = _get_variable(module_name_var+'._isPromise('+module_name_var+'._vars["'+jsvar.__uid__+'"])')
        if is_promise:
            return __get_variable_async(module_name_var+'._vars["'+jsvar.__uid__+'"]')
    return jsvar

# Runs on main thread
def get_variable(expression):
    if _finalized_options['worker']:
        return _run_function(module_name_var+'._getMainVariable', expression)
    else:
        return _get_variable(expression)

def destroy_all_variables():
    return _run('''for (var member in '''+module_name_var+'''._vars) { 
        if ('''+module_name_var+'''._vars[member]._internal_coldbrew_native_js_worker_proxy) {
            '''+module_name_var+'''._vars[member]._internal_coldbrew_destroy();
        }
        delete '''+module_name_var+'''._vars[member];
    }''')


def _handle_run_error(val):
    global _js_error
    if isinstance(val, dict) and '_internal_coldbrew_error' in val and val['_internal_coldbrew_error']:
        error = JavaScriptError(val['type']+": "+val['message'])
        error.error_data = {
            'type': val['type'],
            'name': val['name'],
            'message': val['message'],
            'stack': val['stack'],
            'data': val['data'],
        }
        _js_error = error.error_data
        raise error

# Runs in worker
def _run(expression):
    val = json.loads(_Coldbrew._run_string_guard("JSON.stringify("+module_name_var+'._try(function () {'+expression+"})) || \"null\""))
    _handle_run_error(val)
    return 0

# Runs on main thread
def run(expression):
    val = json.loads(get_variable("JSON.stringify("+module_name_var+'._try(function () {'+expression+"})) || \"null\""))
    _handle_run_error(val)
    return 0

# Runs in worker
def _run_function(functionExpression, *args):
    return _get_variable(module_name_var+'._try(function () { return '+module_name_var+'._callFunc('+json.dumps(is_async())+', false, '+functionExpression+','+','.join([_serialize_to_js(_barg(arg)) for arg in args])+')})')

# Runs on main thread
def run_function(functionExpression, *args):
    return get_variable(module_name_var+'._try(function () { return '+module_name_var+'._callFunc('+json.dumps(is_async())+', false, '+functionExpression+','+','.join([_serialize_to_js(_barg(arg)) for arg in args])+')})')

def get_exception_info():
    return _js_error

def reset():
    return _run_function(module_name_var+'.reset')

def _get_imported_modules():
    return list(sys.modules.keys())

############################################################
#####################END PUBLIC FUNCTIONS###################
############################################################


############################################################
###################START IMPORT OTHER SHIMS#################
############################################################
''' Import other shims for Python functionality '''
############################################################
import ColdbrewHTTPShim
############################################################
####################END IMPORT OTHER SHIMS##################
############################################################
