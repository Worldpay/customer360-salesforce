#!/usr/bin/env python3
"""Static server for the HTML prototypes.

These paths serve the Customer 360 shell so the address bar can be bookmarked:
/, /alerts, /analytics, /customers, /crosssell, /churn
"""
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.abspath(__file__))
SHELL = "/modules/customer-360-shell/preview.html"
ROUTES = {"/", "/alerts", "/analytics", "/customers", "/crosssell", "/churn"}


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        path = self.path.split("?", 1)[0]
        if path != "/" and path.endswith("/"):
            path = path[:-1]
        if path in ROUTES:
            query = self.path.split("?", 1)[1] if "?" in self.path else ""
            self.path = SHELL + (("?" + query) if query else "")
        return super().do_GET()


if __name__ == "__main__":
    os.chdir(ROOT)
    ThreadingHTTPServer(("127.0.0.1", 3131), Handler).serve_forever()
