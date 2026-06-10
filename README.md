# FLsocial

A social web app with a login/register authentication backend.

## Project Structure

```
FLSocialWeb/
├── frontend/          # Frontend (Vite + vanilla JS)
│   ├── index.html     # Entry page (includes login/register UI)
│   ├── index.js       # Entry script
│   ├── src/
│   │   ├── js/
│   │   │   ├── auth/        # Login / register / sign-out / token check logic
│   │   │   └── components/  # Page components
│   │   └── css/             # Styles
│   ├── data/          # Mock page data (db.json)
│   └── .env           # Backend URL and token key config
└── backend/           # Backend (Express + Prisma + JWT)
    ├── index.js       # Server entry (port 9090)
    ├── src/
    │   ├── api/       # /api/login, /api/register
    │   └── utils/     # Encryption, token generation/verification
    ├── prisma/        # Database schema (SQLite)
    └── .env           # Database URL and token secret
```

## Getting Started

Create the env files from the templates, then install dependencies:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

pnpm install:all
pnpm --dir backend exec prisma db push   # create the local SQLite database
```

Start the backend and frontend (in two terminals):

```bash
pnpm dev:backend    # Backend at http://localhost:9090
pnpm dev:frontend   # Frontend at http://localhost:5173
```

## Features

- Register / login (passwords hashed with bcrypt, stored in a local SQLite database)
- Persistent login via JWT token, auto-login on page refresh
- After login, the social feed is revealed; the navbar shows the username and a sign-out button
