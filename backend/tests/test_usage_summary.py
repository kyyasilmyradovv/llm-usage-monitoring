import pytest
from app.api.usage import get_usage_summary
from app.models.models import LLMUsage
from app.db.database import get_db
from unittest.mock import Mock, patch

def test_usage_summary_aggregation():
    # Mock database session
    mock_db = Mock()
    
    # Mock query result
    mock_result = [
        Mock(
            model="gpt-4",
            user_label="test_user",
            total_input_tokens=100,
            total_output_tokens=50,
            request_count=2
        ),
        Mock(
            model="gpt-3.5-turbo",
            user_label="test_user",
            total_input_tokens=75,
            total_output_tokens=30,
            request_count=1
        )
    ]
    
    # Mock the query chain
    mock_query = Mock()
    mock_query.group_by.return_value.all.return_value = mock_result
    mock_db.query.return_value = mock_query
    
    # Test the function
    with patch('app.api.usage.get_db', return_value=mock_db):
        result = get_usage_summary(mock_db)
        
        # Verify the result
        assert len(result.summaries) == 2
        assert result.summaries[0].model == "gpt-4"
        assert result.summaries[0].total_input_tokens == 100
        assert result.summaries[0].total_output_tokens == 50
        assert result.summaries[0].request_count == 2
