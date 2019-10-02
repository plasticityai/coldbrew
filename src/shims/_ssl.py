import inspect

OPENSSL_VERSION_NUMBER = None
OPENSSL_VERSION_INFO = None
OPENSSL_VERSION = None
class _SSLContext(object):
    __slots__ = ['options', 'verify_mode', 'check_hostname']

    def __new__(cls, *args, **kwargs):
        self = object.__new__(cls)
        return self

    def __init__(self, *args, **kwargs):
        self.options = None
        self.verify_mode = None
        self.check_hostname = None

    def load_cert_chain(self, *args, **kwargs):
        return None

    def set_ciphers(self, *args, **kwargs):
        return None

    def load_verify_locations(self, *args, **kwargs):
        return None

SSLSession = None
MemoryBIO = None
class SSLError(Exception):
    pass
class SSLZeroReturnError(Exception):
    pass
class SSLWantReadError(Exception):
    pass
class SSLWantWriteError(Exception):
    pass
class SSLSyscallError(Exception):
    pass
class SSLEOFError(Exception):
    pass
class SSLCertVerificationError(Exception):
    pass
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
HAS_SSLv2 = None
HAS_SSLv3 = None
HAS_TLSv1 = None
HAS_TLSv1_1 = None
HAS_TLSv1_2 = None
HAS_TLSv1_3 = None
_DEFAULT_CIPHERS = None
_OPENSSL_API_VERSION = None
HAS_TLS_UNIQUE = None

PROTOCOL_SSLv23 = None
CERT_CERT_REQUIRED = None

PROTO_MINIMUM_SUPPORTED = None
PROTO_SSLv3 = None
PROTO_TLSv1 = None
PROTO_TLSv1_1 = None
PROTO_TLSv1_2 = None
PROTO_TLSv1_3 = None
PROTO_MAXIMUM_SUPPORTED = None
