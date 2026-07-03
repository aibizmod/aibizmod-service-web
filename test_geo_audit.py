#!/usr/bin/env python3
import sys
from geo_optimizer import audit_async
import asyncio
import json

async def test_geo_audit():
    print("Testing GEO audit with aibizmod.com")
    result = await audit_async("https://aibizmod.com")
    
    # Print all available attributes
    print(f"\n=== Result object attributes ===")
    for attr in dir(result):
        if not attr.startswith('_'):
            print(f"{attr}: {getattr(result, attr)}")
    
    # Try to build output
    print(f"\n=== Building output ===")
    output = {
        "score": result.score,
        "band": result.band,
        "citability": result.citability.total_score if result.citability else None,
        "score_breakdown": result.score_breakdown,
        "recommendations": result.recommendations,
        "checked_at": getattr(result, 'checked_at', None),
    }
    
    print(f"\n=== Final output ===")
    print(json.dumps(output, indent=2))

if __name__ == "__main__":
    asyncio.run(test_geo_audit())