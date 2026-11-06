# RankShelter — SEO & Digital Marketing Agency

Production domain intended: **rankshelter.com** (domain DNS and deployment are managed separately).

React + Vite frontend with independent SCSS files, an Express/Sequelize/PostgreSQL backend, and authenticated blog/service management.

## Development

1. Copy `frontend/.env.example` to `frontend/.env` and configure `VITE_API_URL`.
2. Run `npm install` and `npm run dev` inside `frontend`.
3. Configure `backend/.env`, migrate and seed the database, and start the backend separately.

The company contact details in `frontend/src/config/contact.js` must be verified before publishing.
