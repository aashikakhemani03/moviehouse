# MovieHouse

MovieHouse is a React/Vite client with an Express, Socket.IO, and MongoDB server.

## Run with Docker

Copy `.env.example` to `.env`, replace `JWT_SECRET` with a strong random value, then run:

```sh
docker compose up --build
```

Open the client at `http://localhost:8080`; the API health check is at `http://localhost:5001/`. The default Compose database is a local MongoDB container. To use a hosted database, set `MONGO_URI` in `.env`.

## Deploy

- **Render API:** Create a Render Blueprint from this repository using `render.yaml`. Set `MONGO_URI`, `JWT_SECRET`, and `CLIENT_ORIGIN` in the Render service. `CLIENT_ORIGIN` must contain the deployed Netlify site origin, without a trailing slash.
- **Netlify client:** Create a Netlify site for this repository. `netlify.toml` sets the client build directory. Set both `VITE_API_URL` and `VITE_SOCKET_URL` to the Render API origin in Netlify, or use the Actions deployment below.
- **GitHub Actions:** Push to `main` or `master` to run lint, builds, and Docker image checks. To enable workflow deployment, add repository secrets `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`, and `RENDER_DEPLOY_HOOK_URL`; add the repository variable `VITE_SOCKET_URL` with the Render API origin. Pull requests run validation but do not deploy.

The frontend and API are deployed separately: Netlify hosts the static client, and Render runs the Dockerized API. Configure MongoDB Atlas or another persistent MongoDB service for production; the Compose MongoDB container is for local development. The client auth form calls `/api/auth/login` and `/api/auth/register` on `VITE_API_URL`.

The published `main` branch starts with a clean history. Do not push the original local `master` history: earlier commits contain `server/.env`. Rotate any credentials from that local file before reusing them.
