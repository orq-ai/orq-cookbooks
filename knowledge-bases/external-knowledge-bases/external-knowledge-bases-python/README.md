# External Knowledge Base - Python

Example FastAPI application showing how to build an external knowledge base API that integrates with [Orq.ai](https://orq.ai).

This example demonstrates the expected request/response format for external knowledge bases, allowing Orq.ai to search your documents without uploading them to the platform.

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

View interactive API docs at `http://localhost:8000/docs`

## API Endpoint

**POST /search**

This endpoint must match the format expected by Orq.ai's external knowledge base integration.

**Request:**

```json
{
  "query": "your search query",
  "top_k": 10,
  "threshold": 0.7,
  "search_type": "hybrid_search",
  "filter_by": {},
  "search_options": {
    "include_vectors": true,
    "include_metadata": true,
    "include_scores": true
  },
  "rerank_config": {
    "model": "cohere/rerank-multilingual-v3.0",
    "threshold": 0,
    "top_k": 10
  }
}
```

**Response:**

```json
{
  "matches": [
    {
      "id": "doc-123",
      "text": "Matching text content...",
      "vector": [0.1, 0.2, 0.3],
      "metadata": {"source": "document.pdf"},
      "scores": {
        "search_score": 0.95,
        "rerank_score": 0.92
      }
    }
  ]
}
```

## Integrating with Orq.ai

When creating an external knowledge base in Orq.ai:

1. Set your **API URL** to your endpoint (e.g., `https://api.example.com/search`)
2. Provide your **API Key** - Orq.ai will send it as `Authorization: Bearer <API_KEY>`
3. Ensure your endpoint returns responses matching the schema above

See the [Orq.ai External Knowledge Base documentation](https://docs.orq.ai/docs/knowledge/external) for more details.

## Implementation Notes

- The `/search` endpoint uses Pydantic schemas for request/response validation
- Modify the endpoint logic in `main.py` to connect to your vector database
- Schemas are defined in `schemas.py` and match Orq.ai's expected format
- All scores should be between 0 and 1

## Files

- `main.py` - FastAPI application with `/search` endpoint
- `schemas.py` - Pydantic request/response schemas
- `requirements.txt` - Python dependencies
