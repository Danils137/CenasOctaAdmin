# CenasOcta Admin Panel

This admin panel allows administrators to manage invoices, view user information, and handle payment statuses.

## Prerequisites

- Node.js 18+
- Supabase project with the following tables:
  - `users` (with is_admin column)
  - `profiles` (user profiles)
  - `invoices` (invoice data)

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Rename `.env.example` to `.env` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Run the database migration: execute the SQL in `migrations/20251028_add_is_admin.sql` in your Supabase SQL editor.

## Local Development

1. Start the development server: `npm run dev`.
2. Open `http://localhost:5173/admin` in your browser.
3. Log in with a Supabase-authenticated user account.

## Becoming an Admin

To access the admin panel, your user account must have `is_admin = true` in the `profiles` table.

1. Log into your Supabase dashboard.
2. Navigate to the `profiles` table.
3. Edit your user's record to set `is_admin` to `true`.
4. Alternatively, run this SQL:
   ```sql
   update public.profiles set is_admin = true where id = 'your-user-id';
   ```

## Testing

### Seed Data

The migration includes test invoice data. Insert manually if needed:

```sql
insert into public.invoices (id, user_id, email, amount, currency, pdf_path, sent)
values
  (gen_random_uuid(), 'admin-user-id', 'admin@example.com', 9.99, 'EUR', 'https://your-path/test.pdf', false);
```

### Testing Features

- **Invoice List**: Filter by email or status (Sent/Pending).
- **View Details**: Click "View" to see full invoice info and PDF link.
- **Mark Sent**: Change status to sent after processing.
- **Resend**: Trigger the `generate-invoice` Edge Function for resending.

## RLS Policies

Ensure these policies are in place for secure access:

- Admins can read/write invoices.
- Invoices are readable only by the owner or admins.

Example policy:
```sql
create policy "Admins can view all invoices" on invoices
for all using (
  exists (select 1 from profiles where id = auth.uid() and is_admin = true)
);
```

## Edge Functions

The "Resend" button calls `/functions/v1/generate-invoice` with `resend: true`.

Ensure the Edge Function supports the resend flag.

## Deployment

1. Build the project: `npm run build`.
2. Deploy to your hosting platform (e.g., Vercel, Netlify).
3. Ensure environment variables are set in production.

## Troubleshooting

- **Access Denied**: Check if your user has `is_admin` set.
- **No Invoices**: Verify RLS policies.
- **Resend Fails**: Check Supabase Edge Function logs.

Contact the development team for additional support.
