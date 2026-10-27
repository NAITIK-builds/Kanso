# Supabase Setup Guide for Rental House Finder Platform

This platform has full stack integration with **Supabase** for:
- 🔐 **Supabase Cloud Authentication** (User Sign-up, Email/Password Login, Role Metadata for Seekers & Hosts)
- 🗄️ **PostgreSQL Database** (`profiles`, `listings`, `reservations`, `inquiries`, `reviews`, `wishlists`)
- 🛡️ **Row Level Security (RLS)** with safe policies
- ⚡ **Seamless Offline Fallback** (runs in Local / Demo mode when API keys are not yet configured)

---

## 3-Step Setup

### Step 1: Create a Free Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign in or create an account.
2. Click **New Project**, choose an organization, give your project a name (e.g. `rental-rooms`), set a secure database password, and pick the region closest to your users (e.g. `ap-south-1` Mumbai).

---

### Step 2: Run the SQL Schema
1. In your Supabase Dashboard, click on **SQL Editor** in the left sidebar.
2. Click **New Query**.
3. Open [`supabase/schema.sql`](./supabase/schema.sql) (or [`supabase_setup.sql`](./supabase_setup.sql)) in this repository.
4. Copy the entire file content, paste it into the Supabase SQL Editor, and click **Run** (or `Ctrl+Enter` / `Cmd+Enter`).
5. This will:
   - Create the `profiles`, `listings`, `reservations`, `inquiries`, `reviews`, and `wishlists` tables.
   - Set up the automatic `on_auth_user_created` trigger for user registration.
   - Configure Row Level Security (RLS) policies.
   - Pre-populate all **15 verified long-term room listings** across Bengaluru, Pune, Hyderabad, and Mumbai.

---

### Step 3: Configure Environment Variables
1. In your Supabase Dashboard, go to **Project Settings** (gear icon) &gt; **API**.
2. Copy:
   - **Project URL** (e.g., `https://xyzcompany.supabase.co`)
   - **Project API Keys &gt; `anon` / `public` key** (a long JWT token)
3. Open or create the [`.env`](./.env) file in the root of your project:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. Restart the development server:
   ```bash
   npm run dev
   ```

---

## Testing Your Supabase Integration

1. In the navbar, look for the **Supabase** pill button:
   - 🟢 **Green dot**: Successfully connected to your Supabase project! Click to test ping.
   - 🟡 **Amber dot**: Local Demo Mode (default when `.env` is unconfigured).
2. Click **Sign In** / **Create Account**:
   - Register a new account with email & password.
   - The user will be created in **Supabase Auth** & automatically added to the `public.profiles` table.
3. Book a room or list a new room:
   - It will automatically save to your Supabase PostgreSQL database tables in real time!
