from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, select
from app.db.database import get_db
from app.models import models
from app.schemas import schemas

router = APIRouter()

@router.get("/summary", response_model=schemas.UsageSummaryResponse)
async def get_usage_summary(db: AsyncSession = Depends(get_db)):
    # Query to get aggregated usage data
    stmt = select(
        models.LLMUsage.model,
        models.LLMUsage.user_label,
        func.sum(models.LLMUsage.input_tokens).label('total_input_tokens'),
        func.sum(models.LLMUsage.output_tokens).label('total_output_tokens'),
        func.count(models.LLMUsage.id).label('request_count')
    ).group_by(
        models.LLMUsage.model,
        models.LLMUsage.user_label
    )
    
    result = await db.execute(stmt)
    usage_summary = result.all()
    
    # Convert to response format
    summaries = [
        schemas.UsageSummary(
            model=row.model,
            user_label=row.user_label,
            total_input_tokens=row.total_input_tokens,
            total_output_tokens=row.total_output_tokens,
            request_count=row.request_count
        )
        for row in usage_summary
    ]
    
    return schemas.UsageSummaryResponse(summaries=summaries)
