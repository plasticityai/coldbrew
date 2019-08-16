import _Coldbrew
import json
import os
import re
import sys
import time

from collections import deque
from _Coldbrew import *

############################################################
#################START PRIVATE VARIABLES####################
############################################################
''' Various private variables that hold state.'''
############################################################
_slot_id = 0
_var_id = 0
_get_var_id = 0
_vars = {}
_vars_map_search = {}
_vars_list_search = deque()
_get_vars = {}
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
js_error = None
############################################################
###################END PUBLIC VARIABLES#####################
############################################################

############################################################
#################START PRIVATE FUNCTIONS####################
############################################################
''' Various private functions used by Coldbrew.'''
############################################################
def _warn(message):
    if not(_finalized_options['hideWarnings']):
        _Coldbrew._run("console.warn('Coldbrew Warning: '+"+json.dumps(message)+");")

def _error(message):
    _Coldbrew._run("console.error('Coldbrew Error: '+"+json.dumps(message)+");")
    raise RuntimeError()

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
        if re.match('^[A-Za-z0-9]', prop) is not None:
            s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', prop)
            return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()
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

def _delete_uid(uid):
    global _vars
    global _vars_map_search
    global _vars_list_search
    obj = _vars[uid]
    uid = None
    try:
        if obj in _vars_map_search:
            uid = _vars_map_search[obj]
            del _vars_map_search[obj]
    except TypeError as e:
        pass
    if uid is None:
        for i, (sobj, suid) in enumerate(_vars_list_search):
            if obj == sobj and callable(obj):
                uid = suid
                del _vars_list_search[i]
                break
    del _vars[uid]

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

# Shim sleep()
def sleep(t):
    if is_async():
        try:
            _Coldbrew._sleep(t)
        except SystemError:
            pass
    else:
        _warn("Python tried to call sleep("+str(t)+"). Since you are not running in asynchronous mode, sleep() will busy wait (https://en.wikipedia.org/wiki/Busy_waiting) and lock the browser until the sleep is completed.")
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
class _ImportFinder(importlib.abc.MetaPathFinder):
    def find_spec(self, fullname, path, target=None):
        if fullname in sys.builtin_module_names:
            return importlib.machinery.ModuleSpec(
                fullname,
                importlib.machinery.BuiltinImporter,
            )
sys.meta_path.append(_ImportFinder())

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
            return _run_function(module_name_var+'''.onStandardInReadAsync''', size)
        else:
            return _run_function(module_name_var+'''.onStandardInRead''', size)
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
                ProxiedJavaScriptVariable._internal_coldbrew_native_js_worker_proxy(self)

            def _internal_coldbrew_native_js_worker_proxy(self):
                if JavaScriptVariable.__getattribute__(self, '__internal_coldbrew_native_js_worker_proxy') is None and not JavaScriptVariable.__getattribute__(self, '__internal_coldbrew_native_js_worker_proxy_working'):
                    JavaScriptVariable.__setattr__(self, '__internal_coldbrew_native_js_worker_proxy_working', True)
                    JavaScriptVariable.__setattr__(self, '__internal_coldbrew_native_js_worker_proxy', _finalized_options['worker'] and (ProxiedJavaScriptVariable.__typeof_prop__(self, '_internal_coldbrew_native_js_worker_proxy') != "undefined" ))
                    JavaScriptVariable.__setattr__(self, '__internal_coldbrew_native_js_worker_proxy_working', False)
                return JavaScriptVariable.__getattribute__(self, '__internal_coldbrew_native_js_worker_proxy')

            def __typeof_prop__(self, tprop):
                if tprop == '_internal_coldbrew_native_js_worker_proxy':
                    return _get_variable("(("+module_name_var+"._vars['"+obj['uid']+"']._internal_coldbrew_native_js_worker_proxy === true) ? 'boolean' : 'undefined')") 
                return _get_variable("(("+module_name_var+"._vars['"+obj['uid']+"']._internal_coldbrew_native_js_worker_proxy === true) ? ("+module_name_var+"._vars['"+obj['uid']+"']._internal_coldbrew_typeof_prop("+_serialize_to_js(tprop)+")) : (typeof "+module_name_var+"._vars['"+obj['uid']+"']["+module_name_var+"._unserializeFromPython("+_serialize_to_js(tprop)+")]))")

            def __call__(self, *args):
                if obj['constructable'] or obj['callable']:
                    return _get_variable(module_name_var+"._callFunc("+json.dumps(obj['constructable'])+", "+module_name_var+"._vars['"+obj['uid']+"'],"+','.join([_serialize_to_js(arg) for arg in args])+")")
                else:
                    return JavaScriptVariable.__call__(self)

            def __str__(self):
                typeofProp = ProxiedJavaScriptVariable.__typeof_prop__(self, 'toString')
                if typeofProp == 'undefined':
                    return ProxiedJavaScriptVariable.__repr__(self)
                if ProxiedJavaScriptVariable._internal_coldbrew_native_js_worker_proxy(self):
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
                if not ProxiedJavaScriptVariable._internal_coldbrew_native_js_worker_proxy(self):
                    res = _get_variable("Object.getOwnPropertyNames("+module_name_var+"._vars['"+obj['uid']+"']).concat(Object.getOwnPropertyNames(Object.getPrototypeOf("+module_name_var+"._vars['"+obj['uid']+"'])))")
                else:
                    res = _get_variable(module_name_var+"._vars['"+obj['uid']+"']._internal_coldbrew_own_keys")()
                res = [x for x in res if x not in lookup and lookup.add(x) is None]
                if transform:
                    return JavaScriptVariable.internal_key_defs+[_transform_prop(p) for p in res]
                else:
                    return JavaScriptVariable.internal_key_defs+res

            def __destroy__(self):
                if ProxiedJavaScriptVariable._internal_coldbrew_native_js_worker_proxy(self):
                    _get_variable(module_name_var+"._vars['"+obj['uid']+"']._internal_coldbrew_destroy")()
                return _run("delete "+module_name_var+"._vars['"+obj['uid']+"']")

            def __getattr__(self, prop):
                tprop = _transform_prop(prop, ProxiedJavaScriptVariable.__inspect__(self, False))
                if prop == '_internal_coldbrew_native_js_worker_proxy':
                    return ProxiedJavaScriptVariable._internal_coldbrew_native_js_worker_proxy(self)
                elif prop == '__destroyed__':
                    return _get_variable("typeof "+module_name_var+"._vars['"+obj['uid']+"'] === 'undefined'")
                elif prop == '__type__':
                    return obj['type']
                elif prop == '__uid__':
                    return obj['uid']

                typeofProp = ProxiedJavaScriptVariable.__typeof_prop__(self, tprop)
                if typeofProp == 'undefined':
                    raise AttributeError("'"+obj['type']+"' object has no attribute '"+tprop+"'")
                else:
                    if typeofProp == 'function':
                        if ProxiedJavaScriptVariable._internal_coldbrew_native_js_worker_proxy(self):
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
                typeofProp = ProxiedJavaScriptVariable.__typeof_prop__(self, tprop)
                if typeofProp == 'undefined':
                    raise AttributeError(tprop)
                return _run("delete "+module_name_var+"._vars['"+obj['uid']+"']["+module_name_var+"._unserializeFromPython("+_serialize_to_js(tprop)+")]")
            
            def __dir__(self):
                return ProxiedJavaScriptVariable.__inspect__(self)
            
            def __del__(self):
                ProxiedJavaScriptVariable.__destroy__(self)

            def __len__(self):
                typeofPropLength = ProxiedJavaScriptVariable.__typeof_prop__(self, 'length')
                typeofPropSize = ProxiedJavaScriptVariable.__typeof_prop__(self, 'size')
                if typeofPropLength != 'undefined':
                    return _get_variable(module_name_var+"._vars['"+obj['uid']+"'].length")
                elif typeofPropSize == 'function':
                    return _get_variable(module_name_var+"._vars['"+obj['uid']+"'].size")()
                elif typeofPropSize == 'number':
                    return _get_variable(module_name_var+"._vars['"+obj['uid']+"'].size")
                else:
                    return object.__len__(self)
                

            def __iter__(self):
                if _get_variable(module_name_var+"._vars['"+obj['uid']+"'][Symbol.iterator]") is None:
                    raise TypeError("'"+obj['type']+"' object is not iterable")
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
                if not ProxiedJavaScriptVariable._internal_coldbrew_native_js_worker_proxy(self):
                    return _get_variable(module_name_var+"._unserializeFromPython("+_serialize_to_js(prop)+") in "+module_name_var+"._vars['"+obj['uid']+"']")
                else:
                    return _get_variable(module_name_var+"._vars['"+obj['uid']+"']._internal_coldbrew_has("+module_name_var+"._unserializeFromPython("+_serialize_to_js(prop)+")")

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
def _serialize_to_js(obj, export=False):
    global _get_var_id
    global _get_vars
    global _var_id
    global _vars
    global _vars_map_search
    global _vars_list_search
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
        if export:
            _var_id += 1
            uid = None
            try:
                if obj in _vars_map_search:
                    uid = _vars_map_search[obj]
            except TypeError as e:
                pass
            if uid is None:
                for sobj, suid in _vars_list_search:
                    if obj == sobj and callable(obj):
                        uid = suid
                        break
            if uid is None:
                uid = '_internal_pyvar_'+str(_var_id)
                _vars[uid] = obj
                try:
                    _vars_map_search[obj] = uid
                except TypeError as e:
                    _vars_list_search.append((obj, uid))
            return json.dumps({
                '_internal_coldbrew_python_object': True,
                'is_async': is_async(),
                'uid': uid,
                'constructable': type(obj) == type,
                'callable': callable(obj),
                'type': obj.__class__.__name__.replace('-', '_'),
                'name': (obj.__name__ if hasattr(obj, '__name__') else ('PythonCallable' if callable(obj) else 'PythonUnnamed')).replace('<', '').replace('>', '').replace('-', '_'),
            })
        else:
            _get_var_id += 1
            uid = '_internal_pygetvar_'+str(_get_var_id)
            _get_vars[uid] = obj
            return json.dumps({
                '_internal_coldbrew_get_var': True,
                'uid': uid,
            })

def _unserialize_from_js(arg):
    global _vars

    arg = _create_variable_proxy(arg)
    if isinstance(arg, dict) and '_internal_coldbrew_get_var' in arg and arg['_internal_coldbrew_get_var']:
        jsarg = _get_variable(module_name_var+'''._get_vars["'''+arg['uid']+'''"]''') # Grab the JavaScript native variable argument
        _Coldbrew._run('''delete '''+module_name_var+'''._get_vars["'''+arg['uid']+'''"]''') # Clean up the temporary reference
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
def _get_variable(expression):
    _internal_coldbrew_native_js_worker_proxy = _finalized_options['worker']
    
    class Coldbrew:
        json = json
        _vars = _vars

    def __get_variable(expression):
        global js_error
        val = eval(_Coldbrew._run_string(module_name_var+"._serializeToPython("+expression+", true) || null"), {'Coldbrew': Coldbrew})
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
            return _unserialize_from_js(val)

    def __get_variable_async(expression):
        global _slot_id
        _slot_id += 1
        uid = '_internal_pyslot_'+str(_slot_id)
        if is_async():
            _Coldbrew._run('''Promise.resolve('''+expression+''').then(function(val) {
                    '''+module_name_var+'''._slots["'''+uid+'''"] = val;
                    '''+module_name_var+'''._resume_ie = true;
                    '''+module_name_var+'''.resume(false);
                }).catch(function(e) {
                    '''+module_name_var+'''._slots["'''+uid+'''"] = '''+module_name_var+'''._convertError(e);
                    '''+module_name_var+'''._resume_ie = true;
                    '''+module_name_var+'''.resume(false);
                });''')
            while _get_variable('''(typeof '''+module_name_var+'''._slots["'''+uid+'''"] === 'undefined')'''):
                sleep(-1)
            return _get_variable(module_name_var+'''._slots["'''+uid+'''"]''')
        else:
            _error("Python tried to access a JavaScript Promise. Since you are not running in Python in asynchronous mode, this is not allowed.")
    jsvar = __get_variable(expression)
    if JavaScriptVariable.is_javascript_variable(jsvar):
        is_promise = _get_variable(module_name_var+'._isPromise('+module_name_var+'._vars["'+jsvar.__uid__+'"])')
        if is_promise:
            return __get_variable_async(module_name_var+'._vars["'+jsvar.__uid__+'"]')
    return jsvar

def get_variable(expression):
    if _finalized_options['worker']:
        return _run_function(module_name_var+'._getMainVariable', expression)
    else:
        return _get_variable(expression)

def destroy_all_variables():
    _run('for (var member in '+module_name_var+'._vars) delete '+module_name_var+'._vars[member];')


def _handle_run_error(val):
    global js_error
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

def _run(expression):
    val = json.loads(_Coldbrew._run_string("JSON.stringify("+module_name_var+'._try(function () {'+expression+"})) || \"null\""))
    _handle_run_error(val)
    return 0

def run(expression):
    val = json.loads(get_variable("JSON.stringify("+module_name_var+'._try(function () {'+expression+"})) || \"null\""))
    _handle_run_error(val)
    return 0

def _run_function(functionExpression, *args):
    return _get_variable(module_name_var+'._try(function () { return '+module_name_var+'._callFunc(false, '+functionExpression+','+','.join([_serialize_to_js(_barg(arg)) for arg in args])+')})')

def run_function(functionExpression, *args):
    return get_variable(module_name_var+'._try(function () { return '+module_name_var+'._callFunc(false, '+functionExpression+','+','.join([_serialize_to_js(_barg(arg)) for arg in args])+')})')

def reset():
    return _run_function(module_name_var+'.reset')
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
