import asyncio
from geo_optimizer import audit_async

async def test():
    result = await audit_async('https://aibizmod.com')
    print('score:', result.score)
    print('band:', result.band)
    print('has timestamp:', hasattr(result, 'timestamp'))
    print('timestamp:', getattr(result, 'timestamp', 'NO TIMESTAMP'))

asyncio.run(test())