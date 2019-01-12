import inspect

OPENSSL_VERSION_NUMBER = None
OPENSSL_VERSION_INFO = None
OPENSSL_VERSION = None
class _SSLContext(object):
    __slots__ = []
    def __new__(cls, *args, **kwargs):
        self = object.__new__(cls)
        return self
MemoryBIO = None
SSLError = None
SSLZeroReturnError = None
SSLWantReadError = None
SSLWantWriteError = None
SSLSyscallError = None
SSLEOFError = None
CERT_NONE = None
CERT_OPTIONAL = None
CERT_REQUIRED = None
def txt2obj(*args, **kwargs):
    return [0, 0, 0, 0]
nid2obj  = None
RAND_status = None
RAND_add = None
RAND_bytes = None
RAND_pseudo_bytes = None
RAND_egd = None
HAS_SNI = None
HAS_ECDH = None
HAS_NPN = None
HAS_ALPN = None
_OPENSSL_API_VERSION = None
HAS_TLS_UNIQUE = None

PROTOCOL_SSLv23 = None