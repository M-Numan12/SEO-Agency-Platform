# Backend API

Copy `.env.example` to `.env`, set `DATABASE_URL` and long random `JWT_SECRET`.

```bash
npm install
npm run db:migrate
npm run db:seed
# Secure local environment variables; do not commit passwords
ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=your-strong-password npm run admin:create
npm run dev
```

**Public:** GET /api/services, GET /api/services/:slug, GET /api/blogs, GET /api/blogs/:slug.

**Auth:** POST /api/auth/login, GET /api/auth/me, POST /api/auth/logout.

**Admin (session required):** GET/POST /api/admin/blogs and /api/admin/services, GET/PUT/DELETE /api/admin/:type/:id.

Database migrations are additive; never use sequelize.sync({alter:true}) against production. Existing seeders contain only sample data. Make sure `FRONTEND_URL` matches your browser origin exactly. Cookie configuration assumes same-site deployment for production; separate domains need a secure same-site strategy, CSRF protection and stricter origin validation before launch.
