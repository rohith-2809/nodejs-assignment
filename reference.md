# Project Reference — Node.js School Management API

> This document is a handoff summary for any LLM continuing this project in a future session.
> Generated: 2026-05-20

---

## Project Overview

**Task:** Build a Node.js + Express + MySQL REST API for school management.
- Users can **add schools** and **list schools sorted by proximity** to a given location.
- Assignment requires: working APIs, Git repo, live hosted URL, and a shareable Postman collection.

---

## Current Project Status

| Area | Status | Notes |
|------|--------|-------|
| MySQL DB + schema | Done | `school_management` DB, `schools` table created |
| `POST /addSchool` | Done | With full input validation |
| `GET /listSchools` | Done | Sorted by haversine distance |
| Postman collection JSON | Done | 7 requests with automated test scripts |
| postman-collection.md | Done | Full API documentation |
| Server running locally | Done | `http://localhost:3000` |
| **Git commit + push** | **Pending** | Code not yet pushed to GitHub |
| **Deployment (live URL)** | **Pending** | Not hosted yet — Railway/Render recommended |
| **Postman public share link** | **Pending** | Collection not yet published publicly |

---

## Environment

- **OS:** Windows 11 Pro
- **Shell:** PowerShell (Bash also available)
- **Node.js:** Installed
- **MySQL:** MySQL Community Server 8.0 at `C:\Program Files\MySQL\MySQL Server 8.0\bin\`
- **DB Credentials:** Stored in `.env` (gitignored — do NOT commit or expose)
  - DB_HOST: localhost
  - DB_USER: root
  - DB_NAME: school_management
  - DB_PASSWORD: in `.env` file only

---

## File Structure & Paths

```
C:\Users\LENOVO\Desktop\nodejs-assignment\
├── src\
│   ├── app.js                        # Express app setup, mounts routes
│   ├── config\
│   │   └── db.js                     # mysql2/promise connection pool (size 10)
│   ├── controllers\
│   │   └── schoolController.js       # addSchool, listSchools + haversine distance
│   ├── middleware\
│   │   └── validate.js               # validateSchool, validateListQuery
│   └── routes\
│       └── schoolRoutes.js           # POST /addSchool, GET /listSchools
├── .env                              # DB credentials — GITIGNORED
├── .env.example                      # Safe template for .env (committed)
├── .gitignore                        # Ignores node_modules/ and .env
├── package.json                      # express, mysql2, dotenv, nodemon
├── schema.sql                        # Run once to create DB + table in MySQL
├── server.js                         # Entry point — loads .env, starts Express
├── postman_collection.json           # Importable Postman collection (7 requests)
├── postman-collection.md             # Human-readable API documentation
├── reference.md                      # This file
├── taskImage.png                     # Original assignment image 1
└── taskImage2.png                    # Original assignment image 2
```

---

## API Endpoints

### POST /addSchool
- **Body (JSON):** `name` (string), `address` (string), `latitude` (float -90 to 90), `longitude` (float -180 to 180)
- **Success:** `201` → `{ message: "School added successfully", schoolId }`
- **Failure:** `400` → `{ error: "<validation message>" }`

### GET /listSchools
- **Query params:** `latitude`, `longitude`
- **Success:** `200` → `{ schools: [...] }` — sorted by `distance` (km) ascending, nearest first
- **Failure:** `400` → `{ error: "<validation message>" }`
- **Sorting:** Haversine formula implemented in `schoolController.js → haversineDistance()`

---

## Key Implementation Details

- **DB connection:** `mysql2/promise` pool in `src/config/db.js` — pool size 10
- **Distance calc:** Haversine formula returns distance in km; attached as `distance` field on each school in response
- **Validation middleware:** Runs before controller; coerces lat/lng strings to `parseFloat`; rejects out-of-range values
- **Schema setup:** `schema.sql` must be run once via MySQL CLI before starting server

---

## Workflow Used This Session

1. Read task images → understood full requirements
2. Scaffolded full project (package.json, src/, .env, schema.sql, .gitignore)
3. Installed dependencies via `npm install`
4. Ran `schema.sql` via MySQL CLI to create DB and table
5. Started server in background — confirmed running on `http://localhost:3000`
6. Curl-tested all endpoints (happy path + all validation errors) — all passed
7. Created `postman_collection.json` with 7 requests and automated PM test scripts
8. Created `postman-collection.md` with full human-readable documentation
9. Created `reference.md` (this file)

---

## Remaining Work (Next Session)

### 1. Push to GitHub
```bash
git add .
git commit -m "feat: school management API with Express and MySQL"
git remote add origin <your-github-repo-url>
git push -u origin main
```
> `.env` is already in `.gitignore` — safe to push.

### 2. Deploy to Railway (Recommended — free tier)
1. Go to railway.app → New Project → Deploy from GitHub repo
2. Add a **MySQL plugin** in Railway dashboard
3. Copy Railway's MySQL env values into Railway environment variables (PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
4. Railway auto-detects Node.js and runs `npm start`
5. Copy the live URL from Railway dashboard

### 3. Publish Postman Collection
1. Open Postman → Import `postman_collection.json`
2. Click collection → Share → Publish
3. Copy the public link for submission

---

## Suggestions for Better Results

1. **Health check route** — Add `GET /health → 200 OK` in `schoolRoutes.js`. Most hosting platforms (Railway, Render) use this for uptime monitoring and it is also good practice.

2. **DB connection test on startup** — In `server.js`, run `pool.query('SELECT 1')` before `app.listen()` to fail fast with a clear error if DB credentials are wrong, instead of discovering it on the first API request.

3. **Rename `distance` to `distance_km`** — Makes the response self-documenting without needing to read docs.

4. **Postman environment variables** — Add a `production` environment in Postman with `{{base_url}}` set to the live Railway URL so the same collection tests both local and deployed without manual edits.

5. **Index lat/lng in schema** — For large datasets, add a composite index on `(latitude, longitude)` in `schema.sql` to speed up full-table reads in `listSchools`.

6. **Use Railway MySQL instead of local** — Avoids the complexity of exposing a local MySQL instance to the internet for the live deployment.
