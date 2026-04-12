-- Site Settings Table
-- This table stores global site configuration like logo, site name, etc.

CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  logo_url TEXT DEFAULT '/logo.png',
  site_name TEXT DEFAULT 'Boreland Fashions',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure only one row exists
CREATE UNIQUE INDEX IF NOT EXISTS site_settings_single_row_idx ON site_settings((id = 1));

-- Insert default settings
INSERT INTO site_settings (id, logo_url, site_name)
VALUES (1, '/logo.png', 'Boreland Fashions')
ON CONFLICT (id) DO NOTHING;

-- Storage Bucket for Site Assets
-- Run this in Supabase Dashboard > Storage or via SQL:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets', 'site-assets', true);

-- Storage Policies (add these in Supabase Dashboard)
-- Allow authenticated users (admins) to upload files
-- CREATE POLICY "Admins can upload site assets"
--   ON storage.objects FOR INSERT
--   TO authenticated
--   WITH (bucket_id = 'site-assets');

-- Allow public read access
-- CREATE POLICY "Public can view site assets"
--   ON storage.objects FOR SELECT
--   TO public
--   WITH (bucket_id = 'site-assets');

-- Allow admins to update files
-- CREATE POLICY "Admins can update site assets"
--   ON storage.objects FOR UPDATE
--   TO authenticated
--   USING (bucket_id = 'site-assets');

-- Allow admins to delete files
-- CREATE POLICY "Admins can delete site assets"
--   ON storage.objects FOR DELETE
--   TO authenticated
--   USING (bucket_id = 'site-assets');
