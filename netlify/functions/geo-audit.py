import json
import asyncio
import sys
import os

async def run_audit(url):
    from geo_optimizer import audit_async
    result = await audit_async(url)
    return {
        "score": result.score,
        "band": result.band,
        "citability": result.citability.total_score if result.citability else None,
        "score_breakdown": result.score_breakdown,
        "recommendations": result.recommendations,
        "checked_at": result.timestamp or None,
    }

def handler(event, context):
    try:
        body = json.loads(event.get("body", "{}"))
        url = body.get("url", "")

        if not url:
            return {
                "statusCode": 400,
                "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
                "body": json.dumps({"error": "URL is required"}),
            }

        target_url = url.strip()
        if not target_url.startswith("http://") and not target_url.startswith("https://"):
            target_url = "https://" + target_url

        result = asyncio.run(run_audit(target_url))

        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            "body": json.dumps({
                "score": result["score"],
                "band": result["band"],
                "citability": result["citability"],
                "scoreBreakDown": result["score_breakdown"],
                "recommendations": result["recommendations"],
                "checkedAt": result["checked_at"] or "",
            }),
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": str(e)}),
        }
