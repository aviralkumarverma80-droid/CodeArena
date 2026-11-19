# CodeArena — Phase 1

A LeetCode-inspired coding practice platform starter. Phase 1 includes the responsive landing page, searchable/filterable sample problem list, registration, login, JWT sessions, and PostgreSQL-backed user accounts.

## Stack
- React 18 + Vite + React Router
- Custom responsive CSS (dark LeetCode-inspired visual language)
- Node.js + Express
- PostgreSQL + `pg`
- bcrypt password hashing + JWT authentication

## Requirements
- Node.js 18+
- PostgreSQL 14+

## 1. Install dependencies
```bash
npm install
```

## 2. Create the database
Create a PostgreSQL database named `codearena`, then run the schema:
```bash
createdb codearena
psql -d codearena -f server/src/schema.sql
```
If `createdb` is unavailable, create the database using pgAdmin or your preferred PostgreSQL client, then run `server/src/schema.sql` against it.

## 3. Configure environment
Copy `.env.example` to `.env` and update `DATABASE_URL` and `JWT_SECRET`.
```bash
cp .env.example .env
```
Use a long, random secret for `JWT_SECRET`. Never commit `.env`.

## 4. Start development
```bash
npm run dev
```
- Frontend: http://localhost:5173
- API health check: http://localhost:5000/api/health

## Phase 1 functionality
- Responsive home page
- Search and difficulty filters for sample problems
- Signup and login screens
- Server-side input validation
- Password hashing with bcrypt
- JWT authentication and `/api/auth/me`
- Sign out

## Important security notes
The Phase 1 sample problem list is static preview data. There is no code execution in this phase. Do not execute submitted source code directly in the API process. Phase 2 should integrate a sandboxed judge service (for example, Judge0 or an isolated container worker), apply CPU/memory/time limits, and keep hidden tests server-side.

For production, also add HTTPS, rate limiting, email verification, password reset, secure refresh-token strategy, stricter CORS, structured logging, and database migrations.

## Suggested next phases
- Phase 2: problem detail page, Monaco Editor, language selector, submissions, sandboxed code runner
- Phase 3: admin problem authoring and test-case management
- Phase 4: contests, leaderboard, user statistics
- Phase 5: Docker deployment, CI/CD, monitoring and production hardening
