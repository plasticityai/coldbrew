from __future__ import print_function

import os
import posixpath
import sys
try:
    from urllib import unquote
except:
    from urllib.parse import unquote

try:
    import SimpleHTTPServer
except:
    import http.server as SimpleHTTPServer
try:
    import SocketServer
except:
    import socketserver as SocketServer

src_path =  os.path.abspath('src')
dist_path =  os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else 'dist')
if len(sys.argv) > 1 and sys.argv[1].strip() == 'dist-node':
    raise RuntimeError("Cannot serve Node.js build on a web server.")
root_path =  os.path.abspath('./')

class Handler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        """Translate a /-separated PATH to the local filename syntax."""
        # abandon query parameters
        path = path.split('?',1)[0]
        path = path.split('#',1)[0]
        path = posixpath.normpath(unquote(path))
        words = path.split('/')
        words = list(filter(None, words))
        if len(words) >= 1 and words[0] == "remote":
            os.chdir(src_path)
        elif len(words) >= 1 and words[0] == "images":
            os.chdir(root_path)
        else:
            os.chdir(dist_path)
        path = os.getcwd()
        for word in words:
            drive, word = os.path.splitdrive(word)
            head, word = os.path.split(word)
            if word in (os.curdir, os.pardir): continue
            path = os.path.join(path, word)
        return path

    def log_message(self, format, *args):
        pass

Handler.extensions_map['.wasm'] = 'application/wasm'

httpd = SocketServer.TCPServer(("", 8000), Handler)

print("Serving HTTP on 0.0.0.0 port 8000 ...")

httpd.serve_forever()