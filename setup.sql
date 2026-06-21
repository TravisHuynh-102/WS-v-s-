-- 1. Create the registrations table
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  child_name TEXT NOT NULL,
  child_age INTEGER NOT NULL,
  special_needs TEXT,
  child_count INTEGER NOT NULL DEFAULT 1,
  bill_url TEXT NOT NULL
);

-- 2. Create the storage bucket for payment bills
-- Go to Storage -> Create a new bucket named "payment_bills"
-- Make sure to check the "Public" option so the images can be viewed.

-- 3. Setup Storage Policies to allow anonymous uploads (if needed)
-- Note: It's recommended to do this through the Supabase UI:
-- Storage -> payment_bills -> Policies -> New Policy
-- "Enable insert for anonymous users" where bucket_id = 'payment_bills'
