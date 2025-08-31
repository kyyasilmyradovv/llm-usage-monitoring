from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import get_db
from app.models import models
from app.schemas import schemas
from openai import OpenAI
import os

router = APIRouter()

@router.post("/chat", response_model=schemas.ChatResponse)
async def chat_with_llm(
    request: schemas.ChatRequest,
    db: AsyncSession = Depends(get_db)
):
    try:
        # Create OpenAI client with user's API key
        client = OpenAI(api_key=request.openai_api_key)
        
        # Make request to OpenAI
        response = client.chat.completions.create(
            model=request.model,
            messages=[{"role": "user", "content": request.prompt}]
        )
        
        # Extract response content and token usage
        response_content = response.choices[0].message.content
        usage = response.usage
        
        # Log usage to database
        usage_record = models.LLMUsage(
            user_label=request.user_label,
            model=request.model,
            input_tokens=usage.prompt_tokens,
            output_tokens=usage.completion_tokens,
            prompt=request.prompt,
            response=response_content
        )
        
        db.add(usage_record)
        await db.commit()
        await db.refresh(usage_record)
        
        return schemas.ChatResponse(
            response=response_content,
            input_tokens=usage.prompt_tokens,
            output_tokens=usage.completion_tokens,
            model=request.model,
            user_label=request.user_label
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error communicating with OpenAI: {str(e)}")
