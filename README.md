# SEO Agency Platform

Full-stack SEO agency website starter: React + Vite frontend, Express API, PostgreSQL with Sequelize migrations.

Phase 1: Home page and public service/blog listings. Admin CRUD is planned for Phase 2.

## Start

Run `npm install && npm run dev` in frontend and backend separately. Copy each `.env.example` to `.env` and set PostgreSQL connection in backend. Run `npm run db:migrate` there.

Never commit `.env` credentials. GoDaddy hosting Node.js compatibility must be verified before deployment.
