#!/usr/bin/env python3
import sys
from geo_optimizer import audit_async
import asyncio
import json

async def run_geo_audit_for_frontend(url: str):
    try:
        result = await audit_async(url)
        
        # Convert result to frontend-compatible format
        output = {
            "score": result.score,
            "band": result.band,
            "citability": result.citability.total_score if result.citability else None,
            "score_breakdown": result.score_breakdown,
            "recommendations": result.recommendations,
            "checked_at": result.timestamp or None,
        }
        
        return output
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Usage: python run_geo_audit.py <url>"}), file=sys.stderr)
        sys.exit(1)
    
    url = sys.argv[1]
    asyncio.run(run_geo_audit_for_frontend(url))