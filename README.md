# LLM Usage Monitoring Service

A prototype service that acts as a proxy to LLM APIs (e.g., OpenAI) and logs token usage for observability and monitoring purposes. This is a simplified version of a core component for AI agentic systems observability.

## Architecture

- **Backend**: Python/FastAPI with PostgreSQL database
- **Frontend**: React/TypeScript with modern CSS styling
- **Database**: PostgreSQL for persistent storage
- **Containerization**: Docker containers orchestrated with Docker Compose

## Database Schema

The service uses a simple but effective database schema:

```sql
CREATE TABLE llm_usage (
    id SERIAL PRIMARY KEY,
    user_label VARCHAR(255) NOT NULL,
    model VARCHAR(100) NOT NULL,
    input_tokens INTEGER NOT NULL,
    output_tokens INTEGER NOT NULL,
    prompt TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Design Considerations:**

- `user_label` and `model` are indexed for fast aggregation queries
- `prompt` and `response` are stored as TEXT to handle long content
- `created_at` timestamp enables time-based analysis
- Simple schema focused on core requirements without over-engineering

## Quick Start

### Prerequisites

- Docker and Docker Compose installed
- OpenAI API key (for testing the service)

### Running the Application

1. **Clone and navigate to the project:**

   ```bash
   cd overmind-llm-usage
   ```

2. **Start all services:**

   ```bash
   docker-compose up --build
   ```

3. **Access the application:**

   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8008
   - API Documentation: http://localhost:8008/docs

4. **Test the service:**
   - Navigate to the Chat tab
   - Enter your OpenAI API key
   - Provide a user label and prompt
   - Send a message and see the response
   - Check the Dashboard tab to see usage statistics

## API Endpoints

### POST /api/llm/chat

Sends a chat request to OpenAI and logs usage.

**Request Body:**

```json
{
  "openai_api_key": "sk-...",
  "model": "gpt-4",
  "user_label": "developer",
  "prompt": "Hello, how are you?"
}
```

**Response:**

```json
{
  "response": "Hello! I'm doing well, thank you for asking...",
  "input_tokens": 8,
  "output_tokens": 15,
  "model": "gpt-4",
  "user_label": "developer"
}
```

### GET /api/usage/summary

Returns aggregated usage statistics grouped by model and user label.

**Response:**

```json
{
  "summaries": [
    {
      "model": "gpt-4",
      "user_label": "developer",
      "total_input_tokens": 150,
      "total_output_tokens": 300,
      "request_count": 5
    }
  ]
}
```

## Testing

Run the backend tests:

```bash
cd backend
python -m pytest tests/
```

## Development

### Backend Development

- Uses FastAPI for modern, fast API development
- SQLAlchemy ORM for database operations
- Pydantic for data validation
- Automatic API documentation with Swagger UI

### Frontend Development

- React 18 with TypeScript
- Modern CSS with glassmorphism design
- Responsive design for mobile and desktop
- Axios for API communication

## Technical Decisions

- **FastAPI**: Chosen for its modern async support, automatic documentation, and excellent performance
- **PostgreSQL**: Selected for its reliability, ACID compliance, and excellent JSON support
- **React + TypeScript**: Modern frontend stack with type safety
- **Docker Compose**: Simple orchestration for development and testing
- **Simple Schema**: Focused on core requirements rather than over-engineering

### Logs

View logs for specific services:

```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres
```
