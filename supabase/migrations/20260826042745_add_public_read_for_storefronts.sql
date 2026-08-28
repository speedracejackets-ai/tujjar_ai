/*
# Public storefront read access

## Purpose
The new public storefront route (`/store/[slug]`) loads a store and its
products using the anon Supabase key — no logged-in user. The existing RLS
policies on `stores` and `products` only allow the owner (`auth.uid() = user_id`)
to read, so the anon role sees nothing and the storefront appears empty.

## Changes
1. `stores`: add a SELECT policy for `anon, authenticated` that exposes any
   store whose `status` is `active`. This keeps pending/draft stores private
   to their owner while letting visitors view published storefronts.
2. `products`: add a SELECT policy for `anon, authenticated` that exposes
   active products belonging to any store. Products are the public catalog;
   there is no sensitive column in this table.

## Security notes
- Only SELECT is granted to anon. INSERT/UPDATE/DELETE remain owner-only.
- `stores.ai_config`, contact fields, and colors are intentionally public on
  published storefronts — they drive the storefront UI.
- No columns are dropped or renamed; no data is touched.
*/

-- Public read access to published stores
DROP POLICY IF EXISTS "Public can view active stores" ON stores;
CREATE POLICY "Public can view active stores"
  ON stores FOR SELECT
  TO anon, authenticated
  USING (status = 'active');

-- Public read access to active products (catalog)
DROP POLICY IF EXISTS "Public can view active products" ON products;
CREATE POLICY "Public can view active products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (is_active = true);
