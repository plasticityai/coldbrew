import Coldbrew
import http.client
import socket
import _socket
import ssl
import _ssl

def putrequest(self, method, url, skip_host=False, skip_accept_encoding=False):
    self._coldbrew_method = method
    self._coldbrew_url = None 
    self._coldbrew_body = None
    self._coldbrew_headers = None
    if isinstance(self, http.client.HTTPConnection) and not((hasattr(self, 'default_port') and self.default_port == 443)):
        new_url = 'http://'+self.host
        if self.port != 80:
            new_url += ':'+str(self.port)
        new_url += url
        url = new_url
    if isinstance(self, http.client.HTTPSConnection) or (hasattr(self, 'default_port') and self.default_port == 443):
        new_url = 'https://'+self.host
        if self.port != 443:
            new_url += ':'+str(self.port)
        new_url += url
        url = new_url
    self._coldbrew_url = url

def putheader(self, header, *args):
    if not hasattr(self, '_coldbrew_headers') or self._coldbrew_headers is None:
        self._coldbrew_headers = {}
    self._coldbrew_headers[header] = '\r\n\t'.join(args)

def endheaders(self, message_body=None, *, encode_chunked=False):
    if not Coldbrew.is_async():
        Coldbrew._error("Python tried to make an HTTP request. Since you are not running in asynchronous mode, this is not allowed. "+Coldbrew._async_advise('should'))
    self._coldbrew_body = message_body or ""
    timeout = None
    if type(self.timeout) == int:
        timeout = self.timeout
    try:
        self.sock = _socket.socket(self, Coldbrew.run_function(Coldbrew.module_name_var+'._sendRequest', self._coldbrew_method, self._coldbrew_url, self._coldbrew_body, self._coldbrew_headers, timeout))
    except Coldbrew.JavaScriptError as e:
        c_error = ConnectionError("An error occurred when Coldbrew sent the HTTP request with JavaScript. See the `Coldbrew.get_exception_info()` attribute for more information on the original error.")
        c_error.js_error = e
        raise c_error
    self.__state = http.client._CS_REQ_SENT
    self.__response = None

def send(self, *args, **kwargs):
    pass

def getresponse(self, *args):
    if self.debuglevel > 0:
        response = self.response_class(self.sock, self.debuglevel,
                                       method=self._method)
    else:
        response = self.response_class(self.sock, method=self._method)

    try:
        try:
            response.begin()
        except ConnectionError:
            self.close()
            raise
        assert response.will_close != http.client._UNKNOWN
        self.__state = http.client._CS_IDLE

        if response.will_close:
            # this effectively passes the connection to the response
            self.close()
        else:
            # remember this, so we can tell when it is complete
            self.__response = response

        return response
    except:
        response.close()
        raise

def connect(self):
    pass

def set_tunnel(self, *args, **kwargs):
    return None

def close(self):
    if hasattr(self, 'sock') and self.sock is not None:
        self.sock.close()



http.client.HTTPConnection.putrequest = putrequest
http.client.HTTPConnection.putheader = putheader
http.client.HTTPConnection.endheaders = endheaders
http.client.HTTPConnection.send = send
http.client.HTTPConnection.getresponse = getresponse
http.client.HTTPConnection.connect = connect
http.client.HTTPConnection.set_tunnel = set_tunnel
http.client.HTTPConnection.close = close

http.client.HTTPSConnection.putrequest = putrequest
http.client.HTTPSConnection.putheader = putheader
http.client.HTTPSConnection.endheaders = endheaders
http.client.HTTPSConnection.send = send
http.client.HTTPSConnection.getresponse = getresponse
http.client.HTTPSConnection.connect = connect
http.client.HTTPSConnection.set_tunnel = set_tunnel
http.client.HTTPSConnection.close = close

ssl._create_default_https_context = lambda *args, **kwargs: _ssl._SSLContext()
ssl.CERT_CERT_REQUIRED = ssl.CERT_REQUIRED

def SSLContext__init(self, protocol, *args, **kwargs):
    self.protocol = protocol
    self.options = 0

def wrap_socket(self, sock, *args, **kwargs):
    return sock

ssl.SSLContext.__init__ = SSLContext__init
ssl.SSLContext.wrap_socket = wrap_socket

socket.inet_pton = lambda *args, **kwargs: None
