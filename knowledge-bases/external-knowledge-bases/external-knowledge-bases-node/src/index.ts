import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { serve } from '@hono/node-server';
import {
  SearchKnowledgeRequestSchema,
  SearchKnowledgeResponseSchema,
} from './schemas';

const app = new OpenAPIHono();

// Define the search route

// Implement the search endpoint
app.openapi({
  method: 'post',
  path: '/search',
  request: {
    body: {
      content: {
        'application/json': {
          schema: SearchKnowledgeRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: SearchKnowledgeResponseSchema,
        },
      },
      description: 'Search results from the knowledge base',
    },
  },
}, (c) => {
  const request = c.req.valid('json');

  // TODO: Implement your knowledge base search logic here
  // This is a placeholder response
  return c.json({
    matches: [
      {
        id: 'example-id',
        text: 'Example result text',
        vector: [0.1, 0.2, 0.3],
        metadata: { source: 'example' },
        scores: {
          search_score: 0.95,
          rerank_score: 0.92,
        },
      },
    ],
  });
});

// OpenAPI documentation endpoint
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'External Knowledge Base API',
    description:
      'API for searching external knowledge bases that integrates with Orq.ai',
  },
});

// Health check endpoint
app.get('/', (c) => {
  return c.json({ message: 'External Knowledge Base API' });
});

const port = 3000;
console.log(`Server is running on port ${port}`);
console.log(`OpenAPI documentation available at http://localhost:${port}/doc`);

serve({
  fetch: app.fetch,
  port,
});
