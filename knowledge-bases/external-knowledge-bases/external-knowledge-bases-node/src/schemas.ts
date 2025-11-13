import { z } from '@hono/zod-openapi';

/**
 * Placeholder for search filter schema.
 * Extend this based on your specific filter requirements.
 */
export const SearchFilterSchema = z
  .record(z.unknown())
  .openapi('SearchFilter', {
    description: 'The metadata filter to apply to the search',
  });

/**
 * Additional search options
 */
export const SearchOptionsSchema = z
  .object({
    include_vectors: z.boolean().optional().openapi({
      description: 'Whether to include the vector in the chunk',
    }),
    include_metadata: z.boolean().optional().openapi({
      description: 'Whether to include the metadata in the chunk',
    }),
    include_scores: z.boolean().optional().openapi({
      description: 'Whether to include the scores in the chunk',
    }),
  })
  .openapi('SearchOptions');

/**
 * Override the rerank configuration for this search.
 * If not provided, will use the knowledge base configured rerank settings.
 */
export const RerankConfigSchema = z
  .object({
    model: z.string().openapi({
      description:
        'The name of the rerank model to use. Refer to the model list (https://docs.orq.ai/docs/proxy#/rerank-models).',
      example: 'cohere/rerank-multilingual-v3.0',
    }),
    threshold: z
      .number()
      .min(0)
      .max(1)
      .default(0)
      .optional()
      .openapi({
        description:
          'The threshold value used to filter the rerank results, only documents with a relevance score greater than the threshold will be returned',
      }),
    top_k: z
      .number()
      .int()
      .min(1)
      .max(100)
      .default(10)
      .optional()
      .openapi({
        description:
          'The number of top results to return after reranking. If not provided, will default to the knowledge base configured `top_k`.',
      }),
  })
  .openapi('RerankConfig');

/**
 * Override the agentic RAG configuration for this search.
 * If not provided, will use the knowledge base configured agentic RAG settings.
 */
export const AgenticRagConfigSchema = z
  .object({
    model: z.string().openapi({
      description:
        'The name of the model for the Agent to use. Refer to the model list (https://docs.orq.ai/docs/proxy#/chat-models).',
    }),
  })
  .openapi('AgenticRagConfig');

/**
 * Schema for searching a knowledge base
 */
export const SearchKnowledgeRequestSchema = z
  .object({
    query: z.string().openapi({
      description: 'The query to use to search the knowledge base',
    }),
    top_k: z
      .number()
      .int()
      .min(1)
      .max(100)
      .optional()
      .openapi({
        description:
          'The number of results to return. If not provided, will default to the knowledge base configured `top_k`.',
      }),
    threshold: z
      .number()
      .min(0)
      .max(1)
      .optional()
      .openapi({
        description:
          'The threshold to apply to the search. If not provided, will default to the knowledge base configured `threshold`',
      }),
    search_type: z
      .enum(['vector_search', 'keyword_search', 'hybrid_search'])
      .default('hybrid_search')
      .optional()
      .openapi({
        description:
          'The type of search to perform. If not provided, will default to the knowledge base configured `retrieval_type`',
      }),
    filter_by: SearchFilterSchema.optional().openapi({
      description:
        'The metadata filter to apply to the search. Check the Searching a Knowledge Base documentation for more information.',
    }),
    search_options: SearchOptionsSchema.optional().openapi({
      description: 'Additional search options',
    }),
    rerank_config: RerankConfigSchema.optional().openapi({
      description:
        'Override the rerank configuration for this search. If not provided, will use the knowledge base configured rerank settings.',
    }),
    agentic_rag_config: AgenticRagConfigSchema.optional().openapi({
      description:
        'Override the agentic RAG configuration for this search. If not provided, will use the knowledge base configured agentic RAG settings.',
    }),
  })
  .openapi('SearchKnowledgeRequest');

/**
 * Scores for a search result
 */
export const ScoresSchema = z
  .object({
    rerank_score: z.number().optional(),
    search_score: z.number().optional(),
  })
  .openapi('Scores');

/**
 * A single match from the knowledge base search
 */
export const MatchSchema = z
  .object({
    id: z.string(),
    text: z.string(),
    vector: z.array(z.number()).optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
    scores: ScoresSchema.optional(),
  })
  .openapi('Match');

/**
 * Response schema for knowledge base search
 */
export const SearchKnowledgeResponseSchema = z
  .object({
    matches: z.array(MatchSchema),
  })
  .openapi('SearchKnowledgeResponse');
