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

def _send_request(self, method, url, body, headers):
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
    timeout = None
    if type(self.timeout) == int:
        timeout = self.timeout
    self.sock = Socket(Coldbrew.run_function_async(Coldbrew.module_name+'._sendRequest', method, url, body, headers, timeout))
    self.__state = http.client._CS_REQ_SENT
    self.__response = None

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

def close(self):
    if hasattr(self, 'sock') and self.sock is not None:
        self.sock.close()

http.client.HTTPConnection._send_request = _send_request
http.client.HTTPConnection.getresponse = getresponse
http.client.HTTPConnection.connect = connect
http.client.HTTPConnection.close = close

http.client.HTTPSConnection._send_request = _send_request
http.client.HTTPSConnection.getresponse = getresponse
http.client.HTTPSConnection.connect = connect
http.client.HTTPSConnection.close = close

ssl._create_default_https_context = lambda *args: SSLContext()