# Release Recommender

Use machine learning to find your new favorite tracks 🎵

Some project highlights:

- [Preact](https://github.com/preactjs/preact) + [Vite](https://github.com/vitejs/vite) + [Zustand](https://github.com/pmndrs/zustand) for the client
- Docker + [Flask](https://github.com/pallets/flask) for the API
- Deployed to Firebase with [Hosting](https://firebase.google.com/docs/hosting) + [Cloud Run](https://firebase.google.com/docs/hosting/cloud-run)

## Development Usage

Go to the `api` folder and create a new `.env` file based on `.env.example` with values filled.

To run the API locally (accessible from http://localhost:8080):

```bash
cd api
docker-compose up
```

To run the client in dev mode (accessible from http://localhost:3000):

```bash
cd client
# install dependencies
yarn
# start the dev server
yarn dev
```

## Deployment

To deploy the API to Cloud Run:

```bash
cd api
# build + host image on Cloud Build
gcloud builds submit --tag gcr.io/release-recommender/api
# deploy the new function
gcloud run deploy api --image gcr.io/release-recommender/api
```

You can also set default deployment settings:

```bash
gcloud config set run/platform managed
gcloud config set run/region us-east1
```

To deploy the client to Firebase Hosting:

```bash
cd client
yarn build
firebase deploy
```
