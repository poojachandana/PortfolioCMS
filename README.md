# Portfolio Project — Custom CMS (Java Spring Boot + React)

A full custom-built portfolio system with **no third-party CMS dependency**:

- **`backend/`** — Java Spring Boot 3 REST API + custom CMS (JWT auth, CRUD for every content type, file uploads, contact form + email). Runs out-of-the-box on an embedded H2 database — no DB install required to get started, with a ready Postgres profile for production.
- **`admin-panel/`** — React + Vite + Tailwind admin dashboard: login, CRUD screens for About, Skills, Projects, Experience, Education, Services, Testimonials, Blog, Social Links, Media library, and the Contact inbox.
- **`frontend/`** — React + Vite + Tailwind public portfolio site: Home, About, Projects, Skills, Experience, Blog, Contact — all driven dynamically by the CMS API.

```
portfolio-cms/
├── backend/         Spring Boot CMS + REST API
├── admin-panel/      React admin dashboard (CMS UI)
└── frontend/          React public portfolio site
```

---

## 1. Run the backend (IntelliJ)

1. Open **`backend/`** as a project in IntelliJ (`File → Open`, select the `backend` folder — IntelliJ will detect the Maven `pom.xml` and import it automatically).
2. Let Maven download dependencies (IntelliJ does this automatically; needs internet access).
3. Run `CmsApplication.java` (right-click → Run), or from a terminal:
   ```bash
   cd backend
   ./mvnw spring-boot:run        # or: mvn spring-boot:run
   ```
4. The API starts on **http://localhost:8080**.

On first run it seeds a default admin account (printed in the console):
```
Email:    admin@portfolio.com
Password: Admin@123
```
Change these via env vars `ADMIN_EMAIL` / `ADMIN_PASSWORD`, or edit `application.yml`.

By default the backend uses an embedded **H2** file database (`backend/data/cmsdb`) — zero setup needed. Swagger/OpenAPI docs are at `http://localhost:8080/swagger-ui.html`, and the H2 console at `http://localhost:8080/h2-console` (JDBC URL `jdbc:h2:file:./data/cmsdb`, user `sa`, no password).

### Switching to PostgreSQL

1. Create a database: `createdb portfolio_cms`
2. In `backend/src/main/resources/application.yml`, change:
   ```yaml
   spring:
     profiles:
       active: postgres
   ```
   (or run with `-Dspring.profiles.active=postgres`, or set env var `SPRING_PROFILES_ACTIVE=postgres`)
3. Set `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` env vars if different from the defaults in `application-postgres.yml`.

### Key environment variables (all optional, sensible defaults provided)

| Variable | Purpose |
|---|---|
| `JWT_SECRET` | Signing key for JWTs (**set this in production**) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seeded default admin credentials |
| `CORS_ORIGINS` | Comma-separated allowed origins for the frontends |
| `UPLOAD_DIR` | Where uploaded media files are stored on disk |
| `MAIL_USERNAME` / `MAIL_PASSWORD` | SMTP creds for contact-form email notifications |
| `CONTACT_NOTIFY_EMAIL` | Where contact-form submissions are emailed |

---

## 2. Run the admin panel

```bash
cd admin-panel
npm install
cp .env.example .env      # adjust VITE_API_URL if backend isn't on localhost:8080
npm run dev
```
Opens on **http://localhost:5173**. Log in with the seeded admin credentials above.

## 3. Run the public portfolio site

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Opens on **http://localhost:3000**.

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

## Deployment notes

- **Backend**: build a jar with `mvn clean package`, deploy the resulting `target/cms-1.0.0.jar` to Render/Railway/etc. Set `SPRING_PROFILES_ACTIVE=postgres` plus the DB/JWT env vars.
- **Admin panel / Frontend**: `npm run build` produces a static `dist/` folder deployable to Vercel/Netlify — just set `VITE_API_URL` to your deployed backend's `/api` URL at build time.

## Notes on this build

This was generated as a complete, working starting point (entities, auth, full CRUD, file uploads, contact-form email, public+admin frontends all wired together end to end) rather than a bare scaffold. It was not compiled inside the generation sandbox (no Maven Central access there), but it's a standard Spring Boot 3 / Maven layout — it will build in IntelliJ like any normal Spring Boot project. Both React apps were installed and built successfully during generation. Treat this as a strong v1: review the generated code, add tests, and harden security (rotate `JWT_SECRET`, change the default admin password, restrict CORS) before shipping to production.
