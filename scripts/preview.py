#!/usr/bin/env python3
"""Serve the plain HTML Laravel handoff locally; no Node/npm required."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit
import mimetypes
import os

ROOT = Path(__file__).resolve().parents[1] / "public"
SITE = ROOT / "site"
PORT = int(os.environ.get("PORT", "4173"))
ROUTES = {
    "/": "index.html",
    "/berita": "berita/index.html",
    "/berita/akhir-pekan-di-kaki-arjuno": "berita/akhir-pekan-di-kaki-arjuno/index.html",
    "/info-jalan": "info-jalan/index.html",
    "/info-jalan/road-1": "info-jalan/road-1/index.html",
    "/direktori": "direktori/index.html",
    "/direktori/kafe-and-nongkrong/kedai-sore": "direktori/kafe-and-nongkrong/kedai-sore/index.html",
    "/event": "event/index.html",
    "/event/pasar-kreatif-pandaan": "event/pasar-kreatif-pandaan/index.html",
    "/tentang": "tentang/index.html",
    "/kerja-sama": "kerja-sama/index.html",
    "/kontribusi": "kontribusi/index.html",
    "/offline": "offline.html",
}

class PreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def translate_path(self, path):
        clean = unquote(urlsplit(path).path)
        if clean in ROUTES:
            return str(SITE / ROUTES[clean])
        if clean.endswith("/") and clean[:-1] in ROUTES:
            return str(SITE / ROUTES[clean[:-1]])
        return super().translate_path(clean)

    def send_error(self, code, message=None, explain=None):
        if code == 404:
            file_path = SITE / "404.html"
            body = file_path.read_bytes()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("X-Content-Type-Options", "nosniff")
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

    def guess_type(self, path):
        mime_type, _ = mimetypes.guess_type(path)
        return mime_type or "application/octet-stream"

    def log_message(self, format, *args):
        print("%s - %s" % (self.address_string(), format % args))

if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", PORT), PreviewHandler)
    print(f"Pandaan.id HTML preview: http://0.0.0.0:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
