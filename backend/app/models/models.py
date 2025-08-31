from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.db.database import Base

class LLMUsage(Base):
    __tablename__ = "llm_usage"
    
    id = Column(Integer, primary_key=True, index=True)
    user_label = Column(String(255), nullable=False, index=True)
    model = Column(String(100), nullable=False, index=True)
    input_tokens = Column(Integer, nullable=False)
    output_tokens = Column(Integer, nullable=False)
    prompt = Column(Text, nullable=False)
    response = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<LLMUsage(user_label='{self.user_label}', model='{self.model}', input_tokens={self.input_tokens}, output_tokens={self.output_tokens})>"
