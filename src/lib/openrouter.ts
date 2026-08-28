import { supabase } from './supabase';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export async function callOpenRouterAI(
  messages: ChatMessage[],
  action: 'onboard' | 'refine' | 'product_description' | 'banner_copy' | 'general' = 'general'
): Promise<{ content: string; parsedJson: Record<string, unknown> | null }> {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/openrouter-ai`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token ?? import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      'Apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({ messages, action }),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    const msg = (errBody as { error?: string }).error ?? `AI request failed: ${res.status}`;
    throw new Error(msg);
  }

  return res.json();
}
