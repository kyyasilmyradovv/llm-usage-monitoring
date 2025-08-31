#!/usr/bin/env python3

import asyncio
import uvicorn

if __name__ == "__main__":
    print("Starting server...")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8008, reload=True)
