# Shree Nath Manufacturing & Production Frontend

Phase 1 contains the Next.js App Router shell, the reference CRM theme, responsive sidebar/header, shared UI primitives, and the login page presentation. The login form is visual only at this stage; authentication is added with the API wrapper in a later phase.

## Run locally

```powershell
npm install
npm run dev
```

Open <http://localhost:3000/dashboard> for the dashboard shell or <http://localhost:3000/login> for the login page.

Set `NEXT_PUBLIC_API_URL` in `.env.local` before connecting the frontend to the backend. Do not place credentials or secrets in `NEXT_PUBLIC_` variables.

The existing CRM in `..\frontend` is a read-only reference and is not part of this app.
