# Railway Deployment Guide

This guide will help you deploy the Pakistan Bazaar e-commerce application to Railway.

## Overview

This application consists of three services:

1. **MongoDB** - Database
2. **Backend** - NestJS API (Node.js)
3. **Frontend** - React/Vite SPA

## Deployment Steps

### 1. Create a Railway Account

- Go to [railway.app](https://railway.app)
- Sign up with your GitHub account

### 2. Create a New Project

- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose your `ecommerce-store` repository

### 3. Deploy MongoDB

1. In your Railway project, click "+ New"
2. Select "Database" → "Add MongoDB"
3. Railway will automatically provision a MongoDB instance
4. Copy the `MONGO_URL` connection string from the Variables tab

### 4. Deploy Backend Service

1. Click "+ New" → "GitHub Repo" → Select your repository
2. Railway will auto-detect it's a Node.js project
3. **Important**: Set the Root Directory:
   - Go to Settings → Root Directory → Set to `backend`
4. Add Environment Variables:
   - Click "Variables" tab
   - Add the following:
     ```
     MONGODB_URI=${{MongoDB.MONGO_URL}}
     NODE_ENV=production
     PORT=5000
     ```
5. Deploy will start automatically

### 5. Deploy Frontend Service

1. Click "+ New" → "GitHub Repo" → Select your repository again
2. **Important**: Set the Root Directory:
   - Go to Settings → Root Directory → Set to `frontend`
3. Add Environment Variables:
   - Click "Variables" tab
   - Add:
     ```
     VITE_API_URL=${{Backend.RAILWAY_PUBLIC_DOMAIN}}
     ```
   - Note: Replace `Backend` with the actual service name of your backend
4. Deploy will start automatically

### 6. Enable Public Domains

For both Backend and Frontend services:

1. Go to service Settings
2. Click "Networking"
3. Click "Generate Domain" under Public Networking
4. Copy the generated URLs

### 7. Update Frontend API URL

1. Go to Frontend service Variables
2. Update `VITE_API_URL` with the backend's public domain:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```
3. Redeploy the frontend

## Configuration Files

### Backend railway.json

Located at `backend/railway.json`:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm run start:prod"
  }
}
```

### Frontend railway.json

Located at `frontend/railway.json`:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npx serve -s dist -l 3000"
  }
}
```

## Alternative: Deploy Each Service Separately

### Backend Deployment

1. Create a new Railway project
2. Add MongoDB database
3. Add service from GitHub repo (select `backend` directory)
4. Set environment variables
5. Generate domain

### Frontend Deployment

1. Create another Railway service
2. Add service from GitHub repo (select `frontend` directory)
3. Set `VITE_API_URL` to backend domain
4. Generate domain

## Environment Variables Reference

### Backend Variables

| Variable      | Description               | Example                        |
| ------------- | ------------------------- | ------------------------------ |
| `MONGODB_URI` | MongoDB connection string | `mongodb://mongo:27017/bazaar` |
| `NODE_ENV`    | Environment               | `production`                   |
| `PORT`        | Server port               | `5000`                         |

### Frontend Variables

| Variable       | Description     | Example                   |
| -------------- | --------------- | ------------------------- |
| `VITE_API_URL` | Backend API URL | `https://api.railway.app` |

## Using Railway CLI (Alternative Method)

### Install Railway CLI

```bash
npm i -g @railway/cli
```

### Login

```bash
railway login
```

### Deploy Backend

```bash
cd backend
railway init
railway up
railway variables set MONGODB_URI=<your-mongo-uri>
railway variables set NODE_ENV=production
railway open
```

### Deploy Frontend

```bash
cd frontend
railway init
railway up
railway variables set VITE_API_URL=<your-backend-url>
railway open
```

## Troubleshooting

### Build Failures

**Issue**: Build fails with "No start command found"

- **Solution**: Make sure Root Directory is set correctly (`backend` or `frontend`)

**Issue**: Module not found errors

- **Solution**: Check that `package.json` and `package-lock.json` exist in the service directory

### Connection Issues

**Issue**: Frontend can't connect to backend

- **Solution**:
  1. Verify backend is deployed and has a public domain
  2. Update `VITE_API_URL` in frontend variables
  3. Redeploy frontend

**Issue**: Backend can't connect to MongoDB

- **Solution**: Use the Railway reference variable `${{MongoDB.MONGO_URL}}`

### CORS Errors

Add CORS configuration to backend `main.ts`:

```typescript
app.enableCors({
  origin: ["https://your-frontend.railway.app"],
  credentials: true,
});
```

## Monitoring

- **Logs**: Click on each service → View Logs
- **Metrics**: Check CPU, Memory usage in service dashboard
- **Deployments**: View deployment history and rollback if needed

## Cost

Railway offers:

- **Free Trial**: $5 credit (no credit card required)
- **Developer Plan**: $5/month for individual developers
- **Team Plan**: $20/month per user

## Production Checklist

- [ ] MongoDB deployed and accessible
- [ ] Backend deployed with public domain
- [ ] Frontend deployed with public domain
- [ ] Environment variables configured correctly
- [ ] CORS enabled for frontend domain
- [ ] Test all API endpoints
- [ ] Test frontend functionality
- [ ] Monitor logs for errors
- [ ] Set up custom domain (optional)

## Custom Domain Setup

1. Go to service Settings → Networking
2. Click "Add Custom Domain"
3. Enter your domain
4. Add CNAME record to your DNS:
   - Name: `www` or `@`
   - Value: Provided by Railway
5. Wait for DNS propagation (5-30 minutes)

## Continuous Deployment

Railway automatically redeploys when you push to your GitHub repository's main branch. To disable:

1. Go to service Settings
2. Scroll to "Deployments"
3. Toggle "Auto Deploy"

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Issues: https://github.com/wasifullah-x/ecommerce-store/issues

---

## Quick Reference

After setup, your services will be available at:

- **Frontend**: `https://your-frontend.railway.app`
- **Backend**: `https://your-backend.railway.app`
- **MongoDB**: Internal URL (not publicly accessible)

Happy deploying! 🚀
