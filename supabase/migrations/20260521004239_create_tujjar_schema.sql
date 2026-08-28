/*
  # Tujjar Multi-Tenant E-Commerce Platform Schema

  ## Overview
  Complete multi-tenant schema for Tujjar, a Syrian merchant e-commerce platform.

  ## Tables Created
  1. `stores` - Merchant storefronts, each linked to a Supabase auth user
  2. `products` - Products tied strictly to a store
  3. `subscriptions` - Manual payment subscriptions (Syriatel/ShamCash pending states)
  4. `orders` - Customer orders per store
  5. `banners` - Promotional banners per store
  6. `themes` - AI-generated theme configurations per store
  7. `notifications` - Merchant notification log

  ## Security
  - RLS enabled on all tables
  - All policies check auth.uid() ownership through store_id or user_id
*/

-- STORES
CREATE TABLE IF NOT EXISTS stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  store_slug text UNIQUE NOT NULL,
  name text NOT NULL DEFAULT '',
  description text DEFAULT '',
  business_type text DEFAULT '',
  logo_url text DEFAULT '',
  primary_color text DEFAULT '#00C2CB',
  secondary_color text DEFAULT '#008080',
  hero_title text DEFAULT '',
  hero_subtitle text DEFAULT '',
  contact_email text DEFAULT '',
  contact_phone text DEFAULT '',
  instagram text DEFAULT '',
  facebook text DEFAULT '',
  whatsapp text DEFAULT '',
  ai_config jsonb DEFAULT '{}',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Store owner can view own store"
  ON stores FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Store owner can insert own store"
  ON stores FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Store owner can update own store"
  ON stores FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Store owner can delete own store"
  ON stores FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- PRODUCTS
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  description text DEFAULT '',
  price numeric(12,2) NOT NULL DEFAULT 0,
  compare_price numeric(12,2) DEFAULT NULL,
  image_urls text[] DEFAULT '{}',
  category text DEFAULT '',
  sku text DEFAULT '',
  stock integer DEFAULT 0,
  is_active boolean DEFAULT true,
  ai_generated boolean DEFAULT false,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Store owner can view own products"
  ON products FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stores WHERE stores.id = products.store_id AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Store owner can insert own products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM stores WHERE stores.id = products.store_id AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Store owner can update own products"
  ON products FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stores WHERE stores.id = products.store_id AND stores.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM stores WHERE stores.id = products.store_id AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Store owner can delete own products"
  ON products FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stores WHERE stores.id = products.store_id AND stores.user_id = auth.uid()
    )
  );

-- SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  store_id uuid REFERENCES stores(id) ON DELETE SET NULL,
  plan text NOT NULL DEFAULT 'basic',
  price_syp numeric(12,2) DEFAULT 0,
  payment_method text DEFAULT '',
  payment_status text DEFAULT 'pending',
  transaction_ref text DEFAULT '',
  starts_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User can view own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "User can insert own subscriptions"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User can update own subscriptions"
  ON subscriptions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ORDERS
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  customer_name text DEFAULT '',
  customer_phone text DEFAULT '',
  customer_address text DEFAULT '',
  items jsonb DEFAULT '[]',
  total_price numeric(12,2) DEFAULT 0,
  status text DEFAULT 'new',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Store owner can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stores WHERE stores.id = orders.store_id AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Store owner can update own orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stores WHERE stores.id = orders.store_id AND stores.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM stores WHERE stores.id = orders.store_id AND stores.user_id = auth.uid()
    )
  );

-- BANNERS
CREATE TABLE IF NOT EXISTS banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  title text DEFAULT '',
  subtitle text DEFAULT '',
  image_url text DEFAULT '',
  link_url text DEFAULT '',
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Store owner can view own banners"
  ON banners FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stores WHERE stores.id = banners.store_id AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Store owner can insert own banners"
  ON banners FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM stores WHERE stores.id = banners.store_id AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Store owner can update own banners"
  ON banners FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stores WHERE stores.id = banners.store_id AND stores.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM stores WHERE stores.id = banners.store_id AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Store owner can delete own banners"
  ON banners FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stores WHERE stores.id = banners.store_id AND stores.user_id = auth.uid()
    )
  );

-- THEMES
CREATE TABLE IF NOT EXISTS themes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  name text DEFAULT 'Default',
  config jsonb DEFAULT '{}',
  is_active boolean DEFAULT false,
  ai_generated boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE themes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Store owner can view own themes"
  ON themes FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stores WHERE stores.id = themes.store_id AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Store owner can insert own themes"
  ON themes FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM stores WHERE stores.id = themes.store_id AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Store owner can update own themes"
  ON themes FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stores WHERE stores.id = themes.store_id AND stores.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM stores WHERE stores.id = themes.store_id AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Store owner can delete own themes"
  ON themes FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stores WHERE stores.id = themes.store_id AND stores.user_id = auth.uid()
    )
  );

-- NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  store_id uuid REFERENCES stores(id) ON DELETE CASCADE,
  title text DEFAULT '',
  message text DEFAULT '',
  type text DEFAULT 'info',
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "User can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_stores_user_id ON stores(user_id);
CREATE INDEX IF NOT EXISTS idx_products_store_id ON products(store_id);
CREATE INDEX IF NOT EXISTS idx_orders_store_id ON orders(store_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_banners_store_id ON banners(store_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
