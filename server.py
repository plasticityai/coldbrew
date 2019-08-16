from __future__ import print_function

import os
import sys

try:
    import SimpleHTTPServer
except:
    import http.server as SimpleHTTPServer
try:
    import SocketServer
except:
    import socketserver as SocketServer


class Handler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

Handler.extensions_map['.wasm'] = 'application/wasm'

httpd = SocketServer.TCPServer(("", 8000), Handler)

print("Serving HTTP on 0.0.0.0 port 8000 ...")

os.chdir(sys.argv[1] if len(sys.argv) > 1 else 'src')
httpd.serve_forever()