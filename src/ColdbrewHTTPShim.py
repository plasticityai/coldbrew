import Coldbrew
import http.client
import io
import ssl

class Socket():
    def __init__(self, data):
        self.fp = io.BytesIO()
        response = 'HTTP/1.1 '+str(data['status'])+' '+data['statusText']+'\n'+data['headers']+'\r\n'+data['responseText']
        self.fp.write(bytes(response, "utf8"))
        self.fp.seek(0)

    def makefile(self, mode):
        return self.fp

    def close(self):
        pass

class SSLContext():
    verify_mode = None
    check_hostname = None

    def load_cert_chain(self, *args):
        return None

def putrequest(self, method, url, skip_host=False, skip_accept_encoding=False):
    self._coldbrew_method = method
    if type(self) == http.client.HTTPConnection:
        new_url = 'http://'+self.host
        if self.port != 80:
            new_url += ':'+str(self.port)
        new_url += url
        url = new_url
    if type(self) == http.client.HTTPSConnection:
        new_url = 'https://'+self.host
        if self.port != 443:
            new_url += ':'+str(self.port)
        new_url += url
        url = new_url
    self._coldbrew_url = url

def putheader(self, header, *args):
    if not hasattr(self, '_coldbrew_headers'):
        self._coldbrew_headers = {}
    self._coldbrew_headers[header] = '\r\n\t'.join(args)

def endheaders(self, message_body=None, *, encode_chunked=False):
    self._coldbrew_body = message_body or ""
    timeout = None
    if type(self.timeout) == int:
        timeout = self.timeout
    self.sock = Socket(Coldbrew.run_function_async(Coldbrew.module_name+'._sendRequest', self._coldbrew_method, self._coldbrew_url, self._coldbrew_body, self._coldbrew_headers, timeout))
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

ssl._create_default_https_context = lambda *args: SSLContext()