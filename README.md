# Task Management API

A learning + portfolio backend built with Node.js, Express 5, PostgreSQL, Prisma 7, Zod, JWT, and bcryptjs.

## Tech stack

- Node.js (ES modules)
- Express 5
- PostgreSQL (via Supabase)
- Prisma 7 (ORM + migrations)
- Zod (request validation)
- JWT (authentication)
- bcryptjs (password hashing)
- dotenv (environment config)
- cors (CORS)

## Project structure

```
src/
├── app.js                  # Express app setup, middleware, route mounting
├── server.js               # Starts the HTTP server
├── config/
│   ├── env.js              # Zod-validated environment variables
│   └── cors.js             # CORS configuration (allowed origins)
├── lib/
│   └── prisma.js           # Prisma client singleton
├── middleware/
│   ├── auth.middleware.js     # JWT verification
│   ├── admin.middleware.js    # ADMIN role check (RBAC)
│   ├── error.middleware.js    # Global error handler
│   └── notFound.middleware.js # 404 handler
├── utils/
│   ├── ApiError.js           # Custom error class
│   └── asyncHandler.js       # Wrap async route handlers
├── auth/                    # Register + login
├── users/                   # GET /me
├── projects/                # Project CRUD (owner-scoped)
├── tasks/                   # Task CRUD (owner-scoped) + query + pagination
├── admin/                   # Admin-only endpoints (RBAC)
└── routes/                  # Health check routes
```

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

Copy and edit `.env`:

```
PORT=3000
DATABASE_URL="..."
DIRECT_URL="..."
JWT_SECRET="..."          # min 32 chars
CLIENT_URL="http://localhost:3000"   # comma-separated for multiple origins
```

### 3. Generate Prisma client

```bash
npx prisma generate
```

### 4. Run the dev server

```bash
npm run dev
```

Server starts at `http://localhost:3000`.

## API endpoints

### Auth
| Method | Path | Auth |
|--------|------|------|
| POST | `/api/v1/auth/register` | — |
| POST | `/api/v1/auth/login` | — |

### Users
| Method | Path | Auth |
|--------|------|------|
| GET | `/api/v1/users/me` | JWT |

### Projects
| Method | Path | Auth |
|--------|------|------|
| POST | `/api/v1/projects` | JWT |
| GET | `/api/v1/projects` | JWT |
| GET | `/api/v1/projects/:id` | JWT |
| PATCH | `/api/v1/projects/:id` | JWT |
| DELETE | `/api/v1/projects/:id` | JWT |

### Tasks
| Method | Path | Auth |
|--------|------|------|
| POST | `/api/v1/tasks` | JWT |
| GET | `/api/v1/tasks` | JWT |
| GET | `/api/v1/tasks/:id` | JWT |
| PATCH | `/api/v1/tasks/:id` | JWT |
| DELETE | `/api/v1/tasks/:id` | JWT |

`GET /api/v1/tasks` supports query params: `status`, `priority`, `search`, `sortBy`, `order`, `page`, `limit`.

### Admin (ADMIN role only)
| Method | Path | Auth |
|--------|------|------|
| GET | `/api/v1/admin/users` | JWT + ADMIN |
| GET | `/api/v1/admin/stats` | JWT + ADMIN |

## Testing with Postman

1. Start the server: `npm run dev`
2. Open Postman → New Collection → base URL `http://localhost:3000`
3. Create collection variables: `accessToken`, `projectId`, `taskId`
4. Run requests in this order:

| # | Method | Path | Notes |
|---|--------|------|-------|
| 1 | POST | `/api/v1/auth/register` | register a new user |
| 2 | POST | `/api/v1/auth/login` | copy `token` → `accessToken` |
| 3 | GET | `/api/v1/users/me` | uses `accessToken` |
| 4 | POST | `/api/v1/projects` | copy `id` → `projectId` |
| 5 | GET | `/api/v1/projects` | list |
| 6 | GET | `/api/v1/projects/:id` | uses `projectId` |
| 7 | PATCH | `/api/v1/projects/:id` | update |
| 8 | POST | `/api/v1/tasks` | copy `id` → `taskId` |
| 9 | POST | `/api/v1/tasks` | invalid `assignedToId` → expect 404 |
| 10 | POST | `/api/v1/tasks` | garbage `assignedToId` → expect 400 |
| 11 | GET | `/api/v1/tasks` | try `?status=TODO`, `?search=x`, `?page=1&limit=5` |
| 12 | GET | `/api/v1/tasks/:id` | uses `taskId` |
| 13 | PATCH | `/api/v1/tasks/:id` | update |
| 14 | DELETE | `/api/v1/tasks/:id` | delete |
| 15 | DELETE | `/api/v1/projects/:id` | delete |
| 16 | GET | `/api/v1/admin/users` | expect 403 (normal user) |
| 17 | GET | `/api/v1/admin/stats` | expect 403 (normal user) |

To test admin endpoints successfully, create an ADMIN user directly in the database (`UPDATE users SET role='ADMIN' WHERE email='...'`).

## Security notes

- Passwords are hashed with bcrypt (cost factor 12).
- JWT is signed with `JWT_SECRET` and expires in 7 days.
- `req.user.userId` from the verified JWT is the only trusted source of the current user — never trust IDs from the request body.
- Project and task access is scoped to the authenticated user (project owner).
- Task assignment validates `assignedToId` as a UUID and verifies the user exists.
- CORS restricts cross-origin requests to configured `CLIENT_URL` origins.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with hot reload (tsx watch) |
| `npm run build` | Build with TypeScript |
| `npm start` | Start production server |

## Roadmap

- [x] User registration + login
- [x] JWT authentication
- [x] Project CRUD (owner-scoped)
- [x] Task CRUD (owner-scoped)
- [x] Task assignment authorization (UUID + user existence check)
- [x] Task querying (status/priority filter, search, sort)
- [x] Pagination
- [x] Prisma select/include response enrichment
- [x] RBAC (admin-only endpoints)
- [x] CORS
- [ ] Helmet
- [ ] Rate limiting
- [ ] Request body limits
- [ ] JWT/password security improvements
- [ ] Production error handling (Prisma, validation, duplicates, invalid IDs)
- [ ] OpenAPI / Swagger docs
- [ ] Automated testing (unit + integration)
- [ ] Production/deployment (Docker, migrations, logging)