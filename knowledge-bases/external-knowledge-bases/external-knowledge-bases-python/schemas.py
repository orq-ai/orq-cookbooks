from typing import Any, Dict, List, Literal, Optional
from pydantic import BaseModel, Field, ConfigDict


class SearchFilterSchema(BaseModel):
    """
    Placeholder for search filter schema.
    Extend this based on your specific filter requirements.
    """
    model_config = ConfigDict(extra='allow')


class SearchOptionsSchema(BaseModel):
    """Additional search options"""
    include_vectors: Optional[bool] = Field(
        None,
        description="Whether to include the vector in the chunk"
    )
    include_metadata: Optional[bool] = Field(
        None,
        description="Whether to include the metadata in the chunk"
    )
    include_scores: Optional[bool] = Field(
        None,
        description="Whether to include the scores in the chunk"
    )


class RerankConfigSchema(BaseModel):
    """Override the rerank configuration for this search. If not provided, will use the knowledge base configured rerank settings."""
    model: str = Field(
        ...,
        description="The name of the rerank model to use. Refer to the model list (https://docs.orq.ai/docs/proxy#/rerank-models).",
        examples=["cohere/rerank-multilingual-v3.0"]
    )
    threshold: Optional[float] = Field(
        0,
        ge=0,
        le=1,
        description="The threshold value used to filter the rerank results, only documents with a relevance score greater than the threshold will be returned"
    )
    top_k: Optional[int] = Field(
        10,
        ge=1,
        le=100,
        description="The number of top results to return after reranking. If not provided, will default to the knowledge base configured `top_k`."
    )


class AgenticRagConfigSchema(BaseModel):
    """Override the agentic RAG configuration for this search. If not provided, will use the knowledge base configured agentic RAG settings."""
    model: str = Field(
        ...,
        description="The name of the model for the Agent to use. Refer to the model list (https://docs.orq.ai/docs/proxy#/chat-models)."
    )


class SearchKnowledgeRequestSchema(BaseModel):
    """Schema for searching a knowledge base"""
    query: str = Field(
        ...,
        description="The query to use to search the knowledge base"
    )
    top_k: Optional[int] = Field(
        None,
        ge=1,
        le=100,
        description="The number of results to return. If not provided, will default to the knowledge base configured `top_k`."
    )
    threshold: Optional[float] = Field(
        None,
        ge=0,
        le=1,
        description="The threshold to apply to the search. If not provided, will default to the knowledge base configured `threshold`"
    )
    search_type: Optional[Literal['vector_search', 'keyword_search', 'hybrid_search']] = Field(
        'hybrid_search',
        description="The type of search to perform. If not provided, will default to the knowledge base configured `retrieval_type`"
    )
    filter_by: Optional[SearchFilterSchema] = Field(
        None,
        description="The metadata filter to apply to the search. Check the Searching a Knowledge Base documentation for more information."
    )
    search_options: Optional[SearchOptionsSchema] = Field(
        None,
        description="Additional search options"
    )
    rerank_config: Optional[RerankConfigSchema] = Field(
        None,
        description="Override the rerank configuration for this search. If not provided, will use the knowledge base configured rerank settings."
    )
    agentic_rag_config: Optional[AgenticRagConfigSchema] = Field(
        None,
        description="Override the agentic RAG configuration for this search. If not provided, will use the knowledge base configured agentic RAG settings."
    )


class ScoresSchema(BaseModel):
    """Scores for a search result"""
    rerank_score: Optional[float] = None
    search_score: Optional[float] = None


class MatchSchema(BaseModel):
    """A single match from the knowledge base search"""
    id: str
    text: str
    vector: Optional[List[float]] = None
    metadata: Optional[Dict[str, Any]] = None
    scores: Optional[ScoresSchema] = None


class SearchKnowledgeResponseSchema(BaseModel):
    """Response schema for knowledge base search"""
    matches: List[MatchSchema]
