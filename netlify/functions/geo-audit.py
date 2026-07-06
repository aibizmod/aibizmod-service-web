import json
import asyncio
import sys


def handler(event, context):
    try:
        body = json.loads(event.get("body", "{}"))
        url = body.get("url", "")

        if not url:
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                "body": json.dumps({"error": "URL is required"}),
            }

        target_url = url.strip()
        if not target_url.startswith("http://") and not target_url.startswith("https://"):
            target_url = "https://" + target_url

        from geo_optimizer import audit_async

        result = asyncio.run(audit_async(target_url))

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps(
                {
                    "score": result.score,
                    "band": result.band,
                    "citability": result.citability.total_score if result.citability else None,
                    "scoreBreakDown": result.score_breakdown,
                    "recommendations": result.recommendations,
                    "checkedAt": result.timestamp or "",
                }
            ),
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps({"error": str(e)}),
        }
