from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.llm import router as llm_router
from app.api.usage import router as usage_router
from app.db.database import engine
from app.models import models
import asyncio

app = FastAPI(title="LLM Usage Monitoring Service", version="1.0.0")

# Create database tables
async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)

# Create tables on startup
@app.on_event("startup")
async def startup_event():
    await create_tables()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(llm_router, prefix="/api/llm", tags=["llm"])
app.include_router(usage_router, prefix="/api/usage", tags=["usage"])

@app.get("/")
async def root():
    return {"message": "LLM Usage Monitoring Service API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
