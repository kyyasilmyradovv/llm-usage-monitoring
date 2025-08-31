from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ChatRequest(BaseModel):
    openai_api_key: str
    model: str
    user_label: str
    prompt: str

class ChatResponse(BaseModel):
    response: str
    input_tokens: int
    output_tokens: int
    model: str
    user_label: str

class UsageSummary(BaseModel):
    model: str
    user_label: str
    total_input_tokens: int
    total_output_tokens: int
    request_count: int

class UsageSummaryResponse(BaseModel):
    summaries: list[UsageSummary]
