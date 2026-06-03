# My Little Vendors

Nuxt app for discovering and supporting local small businesses, with Supabase auth and PostgreSQL-backed profile data.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Environment Variables

Copy [.env.example](.env.example) to `.env` for local development.

Public values used by the browser:

```bash
NUXT_PUBLIC_SUPABASE_URL=https://your-dev-project.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=your-dev-anon-key
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

Server-only values used only on the Nuxt server:

```bash
SUPABASE_SERVICE_ROLE_KEY=your-server-only-service-role-key
```

Rules:

- Variables prefixed with `NUXT_PUBLIC_` are exposed to the browser.
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-only and never expose it in client code.
- Restart the dev server after changing env vars.

## Vercel + Supabase Environments

Use separate values per Vercel environment in Project Settings > Environment Variables.

- `Development`: local/dev Supabase project
- `Preview`: staging Supabase project
- `Production`: production Supabase project

Recommended variables in Vercel:

```bash
NUXT_PUBLIC_SUPABASE_URL=
NUXT_PUBLIC_SUPABASE_ANON_KEY=
NUXT_PUBLIC_SITE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

Recommended mapping:

- `Development`: `NUXT_PUBLIC_SITE_URL=http://localhost:3000`
- `Preview`: `NUXT_PUBLIC_SITE_URL=https://your-preview-domain.vercel.app`
- `Production`: `NUXT_PUBLIC_SITE_URL=https://yourdomain.com`

## Supabase Auth Redirect Checklist

For each Supabase project, add the matching redirect URLs for both auth pages:

- `http://localhost:3000/signin`
- `http://localhost:3000/signup`
- `https://your-preview-domain.vercel.app/signin`
- `https://your-preview-domain.vercel.app/signup`
- `https://yourdomain.com/signin`
- `https://yourdomain.com/signup`

If you use Google, Facebook, and Kakao providers, also register the corresponding callback URLs in each provider dashboard and in the Supabase Auth provider settings.

## Database Migrations

The project stores SQL migrations in [supabase/migrations](supabase/migrations).

To apply them with the Supabase CLI:

```bash
supabase init
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
