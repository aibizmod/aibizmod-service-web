import json
import sys
import asyncio
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from geo_optimizer import audit_async


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)
        try:
            data = json.loads(body)
        except json.JSONDecodeError:
            self._send_error(400, "Invalid JSON body")
            return

        url = data.get("url")
        if not url or not isinstance(url, str):
            self._send_error(400, "URL is required")
            return

        if not url.startswith("http://") and not url.startswith("https://"):
            url = "https://" + url

        try:
            result = asyncio.run(audit_async(url))
            output = {
                "score": getattr(result, "score", 0),
                "band": getattr(result, "band", "foundation"),
                "citability": getattr(result.citability, "total_score", None)
                    if hasattr(result, "citability") and result.citability else None,
                "scoreBreakDown": getattr(result, "score_breakdown", {}),
                "recommendations": getattr(result, "recommendations", []),
                "checkedAt": getattr(result, "timestamp", None) or None,
            }
            self._send_json(200, output)
        except Exception as e:
            self._send_error(500, str(e))

    def do_OPTIONS(self):
        self._cors_headers()
        self.send_response(204)
        self.end_headers()

    def _cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def _send_json(self, status, data):
        self._cors_headers()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def _send_error(self, status, message):
        self._send_json(status, {"error": message})
