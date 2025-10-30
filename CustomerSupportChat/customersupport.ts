import 'dotenv/config';
import OpenAI from 'openai';

// Define the custom `orq` interface for TypeScript
interface OrqConfig {
  retry?: { count: number; on_codes: number[] };
  fallbacks?: Array<{ model: string }>;
  cache?: { enabled: boolean; type: 'exact_match'; ttl: number };
  knowledge_bases?: Array<{
    knowledge_id: string;
    top_k: number;
    threshold: number;
    search_type: 'hybrid_search';
  }>;
  contact?: {
    id: string;
    display_name?: string;
    email?: string;
    metadata?: Array<{ key: string; value: any }>; // Array of key-value pairs
    tags?: string[];
  };
}

// Initialize the OpenAI client
const client = new OpenAI({
  apiKey: process.env.ORQ_API_KEY ?? '',
  baseURL: 'https://api.orq.ai/v2/router',
});

async function main(): Promise<void> {
  try {
    if (!process.env.YOUR_KNOWLEDGE_ID) {
      throw new Error('YOUR_KNOWLEDGE_ID not set in .env');
    }
    const requestParams = {
      model: 'openai/gpt-4o',
      stream: true,
      messages: [
        { role: 'user' as const, content: 'How do I upgrade my account?' },
      ],
      orq: {
        retry: { count: 3, on_codes: [429, 500, 502, 503, 504] },
        fallbacks: [
          { model: 'anthropic/claude-3-5-sonnet-20241022' },
          { model: 'google/gemini-1.5-pro' },
          { model: 'openai/gpt-4o-mini' },
        ],
        cache: { enabled: true, type: 'exact_match', ttl: 3600 },
        knowledge_bases: [
          {
            knowledge_id: process.env.YOUR_KNOWLEDGE_ID, // e.g., ID for "ORQsupport"
            top_k: 5,
            threshold: 0.7,
            search_type: 'hybrid_search',
          },
        ],
        contact: {
          id: 'support-TICKET-789', // Unique ticket ID
          display_name: 'John Smith',
          email: 'john@company.com',
          metadata: [
            { key: 'ticket_id', value: 'TICKET-789' },
            { key: 'customer_tier', value: 'premium' },
            { key: 'issue_category', value: 'billing' },
            { key: 'created_at', value: new Date().toISOString() },
          ],
          tags: ['support', 'billing-issue', 'premium-user'],
        },
      },
    };
    console.log('Request:', JSON.stringify(requestParams, null, 2));

    const start = Date.now();
    const stream = await client.chat.completions.create(
      requestParams as OpenAI.Chat.Completions.ChatCompletionCreateParamsStreaming
    );

    let responseText = '';
    let chunkCount = 0;
    for await (const chunk of stream) {
      chunkCount++;
      const content = chunk.choices[0]?.delta?.content ?? '';
      responseText += content;
      process.stdout.write(content);
    }

    console.log(`\nTime taken: ${Date.now() - start}ms, Chunks: ${chunkCount}`);
    console.log('Full Response:', responseText);
    console.log('Cache status: First run is always a cache miss; run again to check for hit.');
  } catch (error: unknown) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
  }
}

main();