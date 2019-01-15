import inspect
import io

class socket():
    __slots__ = ['conn', 'fp']

    def __init__(self, conn, data, *args, **kwargs):
        if not type(data) == dict or 'status' not in data:
            return
        self.conn = conn
        self.fp = io.BytesIO()
        response = 'HTTP/1.1 '+str(data['status'])+' '+data['statusText']+'\n'+data['headers']+'\r\n'+data['responseText']
        self.fp.write(bytes(response, "utf8"))
        self.fp.seek(0)

    def makefile(self, mode):
        return self.fp

    def settimeout(self, *args, **kwargs):
        if hasattr(self, 'conn'):
            self.conn.timeout = args[0]
        return None

    def setsockopt(self, *args, **kwargs):
        pass

    def connect(self, *args, **kwargs):
        pass

    def close(self):
        pass



class _enum_mock():
    __members__ = {}

    def __init__(self, *args, **kwargs):
        pass

AF_INET = None
SOCK_STREAM = None

from enum import IntEnum

_IntEnum_convert = IntEnum._convert

def new_IntEnum_convert(*args, **kwargs):
    if args[0] in ['AddressFamily', 'SocketKind', '_SSLMethod']:
        if args[0] == '_SSLMethod':
            inspect.stack()[1][0].f_globals['PROTOCOL_SSLv23'] = None
        inspect.stack()[1][0].f_globals[args[0]] = _enum_mock
        return None
    return _IntEnum_convert(*args, **kwargs)

IntEnum._convert = new_IntEnum_convert



SOL_SOCKET = None
SO_TYPE = None
error = None
timeout = None
has_ipv6 = None
IPPROTO_TCP = None
TCP_NODELAY = None

def getaddrinfo(*args, **kwargs):
    return [[None, None, None, None, None]]