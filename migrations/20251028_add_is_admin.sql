-- Add is_admin column to public.users table
alter table public.users
add column if not exists is_admin boolean default false;

-- Create index for is_admin column
create index if not exists users_is_admin_idx on public.users(is_admin);

-- Seed data for testing (remove after testing)
insert into public.invoices (id, user_id, email, amount, currency, pdf_path, sent)
values
  (gen_random_uuid(), 'test-user-id', 'test@example.com', 9.99, 'EUR', 'https://storage.supabase.co/bucket/test.pdf', false),
  (gen_random_uuid(), 'test-user-id-2', 'test2@example.com', 19.99, 'EUR', 'https://storage.supabase.co/bucket/test2.pdf', true)
on conflict do nothing;
