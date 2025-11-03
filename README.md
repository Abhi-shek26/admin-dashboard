# Admin Dashboard

A clean, minimal admin dashboard built with Next.js and TypeScript for monitoring CV analysis, user demographics, feedback, and other analytics. The project uses MongoDB for data storage and NextAuth for a simple credentials-based admin sign-in.

## Features

- Dashboard pages showing KPIs, charts and top users
- CV analysis tracking and history
- User demographics (country, career stage, paid/free)
- Feedback collection and satisfaction metrics
- Simple credentials provider for admin login (configured in NextAuth)
- Seed script to populate the database with mock data for development

## Tech stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- MongoDB with Mongoose
- NextAuth for authentication (credentials provider)
- Recharts for charts
- Tailwind CSS for styling

## Quick start

1. Install dependencies

```powershell
npm install
```

2. Create a `.env.local` file in the project root and set the required environment variables (see below).

3. Run the development server

```powershell
npm run dev
```

Open http://localhost:3000 in your browser.

## Environment variables

Create a `.env.local` file at the project root. The project expects at least the following variables:

- `MONGODB_URI` - MongoDB connection string (required)
- `NEXTAUTH_SECRET` - Secret used by NextAuth (recommended for production)

Example `.env.local`:

```text
MONGODB_URI=mongodb://localhost:27017/admin-dashboard
NEXTAUTH_SECRET=your_long_random_secret_here
```

Notes:
- The API route for NextAuth is configured in `src/pages/api/auth/[...nextauth].ts` and uses a credentials provider with a hard-coded admin user (`admin@aariyatech.com` / `admin123`) for demo purposes. Replace with a secure provider for production.

## Scripts

- `npm run dev` - Start Next.js in development mode
- `npm run build` - Build the production app
- `npm run start` - Start the production server (after build)
- `npm run lint` - Run ESLint
- `npm run seed` - Seed the database with mock data (uses `ts-node` and `src/scripts/seed.ts`)

## Seeding the database

The project includes a seed script to create mock users, CV analyses and feedback for development. Before running it, make sure `MONGODB_URI` is set in `.env.local`.

Run:

```powershell
npm run seed
```

What the seeder does:
- Clears `User`, `CvAnalysis`, and `Feedback` collections
- Creates ~200 mock users with randomized countries, career stages, and paid/free status
- Generates CV analyses and feedback entries linked to those users

## Data models (brief)

- User: { name, email, country, careerStage: ['Fresher'|'Graduate'|'Experienced'], isPaid }
- CvAnalysis: { userId (ref User), score (0-100), timestamps }
- Feedback: { userId (ref User), rating (1-5), satisfaction: ['Happy'|'Neutral'|'Unhappy'], timestamps }

## Authentication

Auth is powered by NextAuth using a credentials provider defined in `src/pages/api/auth/[...nextauth].ts`.

- Default demo admin: `admin@aariyatech.com` / `admin123`
- Session strategy: JWT

For production, replace the demo credentials with a secure provider (OAuth, database-backed users, or custom verification).

## Deployment

This app can be deployed to Vercel or any Node.js hosting that supports Next.js. Ensure environment variables (`MONGODB_URI`, `NEXTAUTH_SECRET`) are configured in your hosting provider.

Deployment notes:

- Set NODE_ENV=production when building
- Provide a robust `NEXTAUTH_SECRET` in production
- Consider using managed MongoDB (Atlas) for production

## Development notes & tips

- The `src/lib/db.ts` file implements a cached Mongoose connection to avoid multiple connections during development.
- Charts live under `src/components/charts` and dashboard components under `src/components/dashboard`.
- Add or replace data providers in `src/pages/api/analytics/*` for adding new endpoints or analytics.

## Contributing

Contributions are welcome. For small fixes and features:

1. Fork the repository
2. Create a feature branch
3. Open a pull request describing your changes

## License

This repository does not contain a license file. Add one if you intend to open-source the code.

---

If you'd like, I can also:

- Add a badges section (build/lint/coverage)
- Expand the deployment section with example Vercel or Docker instructions
- Replace the demo credentials with database-backed users and update the README accordingly
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
