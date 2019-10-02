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
    def __init__(self, *args, **kwargs):
        pass
    
    def __getattr__(self, prop):
        if prop == '__members__':
            return {}
        return None
    

AF_INET = None
SOCK_STREAM = None

from enum import IntEnum

_IntEnum_convert_ = IntEnum._convert_


def new_IntEnum_convert_(*args, **kwargs):
    if args[0] in ['AddressFamily', 'SocketKind', '_SSLMethod', 'AlertDescription', 'SSLErrorNumber', 'VerifyMode']:
        caller_module = args[1]
        caller_context = inspect.stack()[1][0].f_globals

        caller_context[args[0]] = _enum_mock()
        if caller_module == 'ssl' and '_IntEnum' in caller_context:
            caller_context['_IntEnum'] = IntEnumMock()
        if caller_module == 'ssl':
            caller_context['PROTOCOL_SSLv2'] = None
            caller_context['PROTOCOL_SSLv3'] = None
            caller_context['PROTOCOL_SSLv23'] = None
            caller_context['PROTOCOL_TLS'] = None
            caller_context['PROTOCOL_TLS_CLIENT'] = None
            caller_context['PROTOCOL_TLS_SERVER'] = None
            caller_context['PROTOCOL_TLSv1'] = None
            caller_context['PROTOCOL_TLSv1_1'] = None
            caller_context['PROTOCOL_TLSv1_2'] = None
            caller_context['CERT_NONE'] = None
            caller_context['CERT_OPTIONAL'] = None
            caller_context['CERT_REQUIRED'] = None
        return None
    return _IntEnum_convert_(*args, **kwargs)

class IntEnumMock():
    def __init__(self, *args, **kwargs):
        pass
    
    @staticmethod
    def _convert_(*args, **kwargs):
        return new_IntEnum_convert_(*args, **kwargs)


IntEnum._convert_ = new_IntEnum_convert_


SOL_SOCKET = None
SO_TYPE = None
error = OSError
class timeout(Exception):
    pass
has_ipv6 = None
IPPROTO_TCP = None
TCP_NODELAY = None

def getaddrinfo(*args, **kwargs):
    return [[None, None, None, None, None]]