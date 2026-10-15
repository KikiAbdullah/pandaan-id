#!/usr/bin/env python3
"""Serve situs HTML statis ini secara lokal; tanpa build, Node, atau backend.

Struktur folder = struktur URL:
    index.html          -> /
    berita/index.html   -> /berita/
    event/index.html    -> /event/
    ... dan seterusnya (folder berisi index.html)
"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
import os

ROOT = Path(__file__).resolve().parents[1]
PORT = int(os.environ.get("PORT", "4173"))


class StaticHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_error(self, code, message=None, explain=None):
        if code == 404:
            body = (ROOT / "404.html").read_bytes()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            if self.command != "HEAD":
                self.wfile.write(body)
            return
        super().send_error(code, message, explain)

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        if urlsplit(self.path).path.startswith("/assets/"):
            self.send_header("Cache-Control", "public, max-age=86400, must-revalidate")
        super().end_headers()

    def log_message(self, format, *args):
        print("%s - %s" % (self.address_string(), format % args))


if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", PORT), StaticHandler)
    print(f"pandaan.id (static) : http://0.0.0.0:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
