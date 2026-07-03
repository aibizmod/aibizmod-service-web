import json
import sys
import asyncio
import traceback
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from geo_optimizer import audit_async


def run_async(coro):
    loop = asyncio.new_event_loop()
    try:
        asyncio.set_event_loop(loop)
        return loop.run_until_complete(coro)
    finally:
        loop.close()


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            data = json.loads(body)
            url = data.get("url")
            if not url or not isinstance(url, str):
                self._send_json(400, {"error": "URL is required"})
                return

            if not url.startswith("http://") and not url.startswith("https://"):
                url = "https://" + url

            result = run_async(audit_async(url))
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
            tb = traceback.format_exc()
            self._send_json(500, {"error": str(e), "traceback": tb})

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def _send_json(self, status, data):
        self.send_response(status)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))
