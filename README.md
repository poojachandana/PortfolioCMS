# Portfolio Project — Custom CMS (Java Spring Boot + React)

A full custom-built portfolio system with **no third-party CMS dependency**:

- **`backend/`** — Java Spring Boot 3 REST API + custom CMS (JWT auth, CRUD for every content type, file uploads, contact form + email).
- **`admin-panel/`** — React + Vite + Tailwind admin dashboard for managing all content.
- **`frontend/`** — React + Vite + Tailwind public portfolio site, driven dynamically by the CMS API.

```
portfolio-cms/
├── backend/         Spring Boot CMS + REST API (Dockerized for deployment)
├── admin-panel/     React admin dashboard (CMS UI)
└── frontend/        React public portfolio site
```

## 🌐 Live Deployment

| Service | Platform | URL |
|---|---|---|
| Backend API | Render | [portfoliocms-6j29.onrender.com](https://portfoliocms-6j29.onrender.com) |
| Admin Panel | Vercel | [portfolio-cms-theta-gilt.vercel.app](https://portfolio-cms-theta-gilt.vercel.app) |
| Public Site | Vercel | [portfolio-cms-hsmi.vercel.app](https://portfolio-cms-hsmi.vercel.app) |
| Database | Neon (Postgres) | — |

> Render's free tier spins down after 15 minutes of inactivity — the first request after idle can take 30–50 seconds to wake up. This is expected.

---

## 1. Run the backend locally (IntelliJ)

1. Open **`backend/`** as a project in IntelliJ — it auto-detects the Maven `pom.xml`.
2. Let Maven download dependencies.
3. Run `CmsApplication.java`, or from a terminal:
```bash
   cd backend
   mvn spring-boot:run
```
4. The API starts on **http://localhost:8080**.

On first run with an empty database, it seeds a default admin account and prints it to the console:
```
Email:    admin@portfolio.com
Password: Admin@123
```
Change these via env vars `ADMIN_EMAIL` / `ADMIN_PASSWORD` before first boot — **the seeder only runs once**, on an empty database. Changing the env var afterward does nothing until the `users` table is cleared and the app restarts.

By default, local runs use an embedded **H2** file database (`backend/data/cmsdb`) — zero setup needed. Swagger docs: `http://localhost:8080/swagger-ui.html`.

---

## 2. Run the admin panel locally

```bash
cd admin-panel
npm install
cp .env.example .env      # set VITE_API_URL=http://localhost:8080/api
npm run dev
```
Opens on **http://localhost:5173**.

## 3. Run the public portfolio site locally

```bash
cd frontend
npm install
cp .env.example .env      # set VITE_API_URL=http://localhost:8080/api
npm run dev
```
Opens on **http://localhost:3000**.

---

## 4. Deploying for free (Render + Neon + Vercel)

### Database — Neon
1. Create a free project at [neon.tech](https://neon.tech).
2. Click **Connect** → copy the connection string → turn **off** "Connection pooling" to get the direct host (no `-pooler` in the hostname).
3. Build your `DB_URL` as: `jdbc:postgresql://<host>/<database>?sslmode=require`

### Backend — Render
1. Push this repo to GitHub.
2. Render → New → Web Service → connect the repo.
3. **Root Directory**: `backend`
4. **Language**: `Docker` (Render has no native Java runtime — this repo includes a `backend/Dockerfile` for this).
5. **Instance Type**: Free (`$0/month`).
6. Add these environment variables:
```
   SPRING_PROFILES_ACTIVE=postgres
   DB_URL=jdbc:postgresql://<neon-host>/<dbname>?sslmode=require
   DB_USERNAME=<neon-username>
   DB_PASSWORD=<neon-password>
   JWT_SECRET=<any long random string>
   ADMIN_EMAIL=admin@portfolio.com
   ADMIN_PASSWORD=<your choice>
   CORS_ORIGINS=https://<admin-panel>.vercel.app,https://<public-site>.vercel.app
```
7. Deploy. Your backend URL will look like `https://<name>.onrender.com`.

### Admin panel & public site — Vercel
For **each** of `admin-panel` and `frontend`, as **separate** Vercel projects:
1. Vercel → Add New Project → import this repo.
2. On the multi-service screen, click **"Import single project"** on the matching folder card.
3. **Root Directory**: auto-set to `admin-panel` or `frontend`.
4. Add environment variable:
```
   VITE_API_URL=https://<your-backend>.onrender.com/api
```
   Set as **Config** type (not Secret — `VITE_` vars are exposed to the browser anyway).
5. Deploy.
6. **Important**: go back to Render → `CORS_ORIGINS` and add both Vercel URLs once you have them, comma-separated, then let it redeploy.

---

## API overview

All content endpoints live under `/api`. `GET` endpoints for published content are public; everything else (writes, `/api/messages`, `/api/media`) requires a `Authorization: Bearer <token>` header from `/api/auth/login`.

```
POST   /api/auth/login              { email, password } -> { accessToken, refreshToken, ... }
POST   /api/auth/refresh            { refreshToken }

GET    /api/about                   PUT /api/about
GET    /api/skills                  POST/PUT/DELETE /api/skills/{id}
GET    /api/projects                POST/PUT/DELETE /api/projects/{id}
GET    /api/experience              POST/PUT/DELETE /api/experience/{id}
GET    /api/education               POST/PUT/DELETE /api/education/{id}
GET    /api/services                POST/PUT/DELETE /api/services/{id}
GET    /api/testimonials            POST/PUT/DELETE /api/testimonials/{id}
GET    /api/blogs                   POST/PUT/DELETE /api/blogs/{id}
GET    /api/blogs/slug/{slug}
GET    /api/social-links            POST/PUT/DELETE /api/social-links/{id}

POST   /api/contact                 (public) submit contact form
GET    /api/messages                (admin) inbox
PATCH  /api/messages/{id}/read
DELETE /api/messages/{id}

POST   /api/media/upload            (admin, multipart/form-data) upload a file
GET    /api/media
DELETE /api/media/{id}
```

Add `?all=true` to any content-type `GET` list endpoint (while authenticated) to include drafts, for the admin panel.

---

## ⚠️ Known limitations

- **File uploads don't persist on Render's free tier.** Uploaded media is stored on local disk, which is wiped on every redeploy/restart. For permanent image hosting, swap `FileStorageService.java` to use Cloudinary's free tier instead.
- **No Certifications/Achievements content type yet** — not in the original data model. Can be added as a new entity + API + admin page if needed.
- Profile images must be **direct image URLs** or uploaded via the Media Library — Google Drive share links, Dropbox share links, etc. don't work as `<img src>` sources.

## Troubleshooting

**"Invalid email or password" on login, even with correct credentials**
The admin user is only seeded once, on an empty database. If `ADMIN_PASSWORD` was changed after the first boot, the stored user still has the old password. Fix: wipe the `users` table via Neon's SQL Editor (`DELETE FROM users;`) and restart the backend to force re-seeding.

**Public site shows placeholder data ("Your Name") / console shows CORS errors**
`CORS_ORIGINS` on Render must include the exact URL of whichever frontend is calling it. Check the browser console for the blocked origin and add it.

**Frontend shows no data at all / 404s on every API call**
Check `VITE_API_URL` on Vercel — it must include the `/api` suffix (e.g. `https://backend.onrender.com/api`, not just `https://backend.onrender.com`). Changing a Vercel env var requires a manual **Redeploy** to take effect.

---

## Deployment notes

- **Backend**: `backend/Dockerfile` is a multi-stage build (Maven build → slim JRE runtime), used by Render.
- **Frontends**: `npm run build` produces a static `dist/` folder, auto-deployed by Vercel on every push to `main`.
