import inspect

class socket():
    __slots__ = []

class _enum_mock():
    __members__ = {}

AF_INET = None
SOCK_STREAM = None

from enum import IntEnum

_IntEnum_convert = IntEnum._convert

def new_IntEnum_convert(*args, **kwargs):
    if args[0] in ['AddressFamily', 'SocketKind', '_SSLMethod']:
        if args[0] == '_SSLMethod':
            inspect.stack()[1][0].f_globals['PROTOCOL_SSLv23'] = None
        inspect.stack()[1][0].f_globals[args[0]] = _enum_mock()
        return None
    return _IntEnum_convert(*args, **kwargs)

IntEnum._convert = new_IntEnum_convert



SOL_SOCKET = None
SO_TYPE = None