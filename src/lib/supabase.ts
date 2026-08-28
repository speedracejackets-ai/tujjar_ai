import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Store = {
  id: string;
  user_id: string;
  store_slug: string;
  name: string;
  description: string;
  business_type: string;
  logo_url: string;
  primary_color: string;
  secondary_color: string;
  hero_title: string;
  hero_subtitle: string;
  contact_email: string;
  contact_phone: string;
  instagram: string;
  facebook: string;
  whatsapp: string;
  ai_config: Record<string, unknown>;
  status: string;
  created_at: string;
};

export type Product = {
  id: string;
  store_id: string;
  name: string;
  description: string;
  price: number;
  compare_price: number | null;
  image_urls: string[];
  category: string;
  sku: string;
  stock: number;
  is_active: boolean;
  ai_generated: boolean;
  created_at: string;
};

export type Order = {
  id: string;
  store_id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: unknown[];
  total_price: number;
  status: string;
  notes: string;
  created_at: string;
};

export type Subscription = {
  id: string;
  user_id: string;
  store_id: string;
  plan: string;
  price_syp: number;
  payment_method: string;
  payment_status: string;
  transaction_ref: string;
  starts_at: string;
  expires_at: string | null;
  created_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  store_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
};
