# 🚀 Deployment Guide - Pakistan Bazaar E-commerce

This guide covers deployment options for your e-commerce application on various cloud platforms.

## Table of Contents

1. [Docker Deployment (Recommended)](#docker-deployment)
2. [Heroku Deployment](#heroku-deployment)
3. [Vercel + Railway](#vercel--railway)
4. [AWS EC2](#aws-ec2)
5. [DigitalOcean](#digitalocean)

---

## 🐳 Docker Deployment (Recommended)

### Prerequisites

- Docker installed
- Docker Compose installed

### Local Docker Deployment

```bash
# 1. Clone or navigate to project
cd "d:/FS Quiz"

# 2. Build all services
docker-compose build

# 3. Start services
docker-compose up -d

# 4. Check status
docker-compose ps

# 5. View logs
docker-compose logs -f

# 6. Stop services
docker-compose down
```

**Access URLs:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

### Push Images to Docker Hub

```bash
# Login to Docker Hub
docker login

# Tag images
docker tag bazaar-backend:latest yourusername/bazaar-backend:latest
docker tag bazaar-frontend:latest yourusername/bazaar-frontend:latest

# Push images
docker push yourusername/bazaar-backend:latest
docker push yourusername/bazaar-frontend:latest
```

---

## 🟣 Heroku Deployment

### Backend on Heroku

```bash
# 1. Install Heroku CLI
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# 2. Login
heroku login

# 3. Create app
cd backend
heroku create bazaar-backend-prod

# 4. Add MongoDB
heroku addons:create mongolab:sandbox

# 5. Set environment variables
heroku config:set NODE_ENV=production

# 6. Deploy
git init
git add .
git commit -m "Initial commit"
git push heroku main

# 7. Open app
heroku open
```

### Frontend on Heroku

```bash
cd frontend

# Create app
heroku create bazaar-frontend-prod

# Add buildpack
heroku buildpacks:add heroku/nodejs

# Create Procfile
echo "web: npm run preview -- --port $PORT --host 0.0.0.0" > Procfile

# Deploy
git init
git add .
git commit -m "Deploy frontend"
git push heroku main
```

---

## 🔷 Vercel + Railway Deployment

### Frontend on Vercel

1. **Install Vercel CLI**

```bash
npm i -g vercel
```

2. **Deploy Frontend**

```bash
cd frontend
vercel login
vercel

# For production
vercel --prod
```

3. **Configure Environment**

- Add `VITE_API_URL` in Vercel dashboard
- Point to Railway backend URL

### Backend on Railway

1. **Go to [Railway.app](https://railway.app)**
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect your repository
5. Select `backend` folder as root
6. Add MongoDB service:
   - Click "+ New"
   - Select "Database" → "MongoDB"
7. Add environment variables:
   ```
   MONGODB_URI=<railway-mongodb-url>
   PORT=5000
   ```
8. Deploy!

---

## ☁️ AWS EC2 Deployment

### 1. Launch EC2 Instance

```bash
# Amazon Linux 2 or Ubuntu
# Open ports: 22, 80, 443, 3000, 5000
```

### 2. Connect and Setup

```bash
# SSH into instance
ssh -i your-key.pem ec2-user@your-ec2-ip

# Install Docker
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 3. Deploy Application

```bash
# Clone repository
git clone your-repo-url
cd your-repo

# Run with Docker Compose
docker-compose up -d

# Setup Nginx (optional)
sudo yum install nginx -y
# Configure reverse proxy
```

---

## 🌊 DigitalOcean App Platform

### 1. Create Account

Go to [DigitalOcean](https://www.digitalocean.com)

### 2. Deploy via GitHub

1. Click "Create" → "App Platform"
2. Connect GitHub repository
3. Configure components:

**Backend Service:**

- Source: `backend` directory
- Build Command: `npm install && npm run build`
- Run Command: `npm run start:prod`
- Port: 5000
- Environment Variables:
  ```
  MONGODB_URI=<mongodb-connection-string>
  NODE_ENV=production
  ```

**Frontend Service:**

- Source: `frontend` directory
- Build Command: `npm install && npm run build`
- Run Command: `npx serve -s dist -l 3000`
- Port: 3000

**Database:**

- Add MongoDB cluster
- Select $15/month tier minimum

### 3. Deploy

Click "Deploy" and wait for build!

---

## 🔐 Environment Variables Setup

### Production Environment Variables

**Backend:**

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bazaar
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.com
```

**Frontend:**

```env
VITE_API_URL=https://your-backend-url.com
```

---

## 🗄️ MongoDB Cloud Setup

### MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP (0.0.0.0/0 for all)
5. Get connection string
6. Add to backend environment variables

---

## 🔍 Testing Deployment

```bash
# Test backend
curl https://your-backend-url.com/products

# Test frontend
open https://your-frontend-url.com
```

---

## 📊 Monitoring & Logs

### Docker Logs

```bash
docker-compose logs -f
docker logs bazaar-backend
docker logs bazaar-frontend
```

### Heroku Logs

```bash
heroku logs --tail -a bazaar-backend-prod
```

### Railway Logs

Check in Railway dashboard

---

## 🛡️ Security Checklist

- [ ] Update CORS origins in backend
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS/SSL
- [ ] Restrict MongoDB access
- [ ] Set up firewall rules
- [ ] Regular security updates
- [ ] Monitor application logs

---

## 💰 Cost Estimates

| Platform         | Backend | Frontend | Database | Total/Month |
| ---------------- | ------- | -------- | -------- | ----------- |
| Heroku           | $7      | $7       | Free\*   | ~$14        |
| Vercel + Railway | $0      | $0       | $5       | ~$5         |
| DigitalOcean     | $12     | $12      | $15      | ~$39        |
| AWS EC2          | $10-30  | -        | $0\*\*   | ~$10-30     |

\*Free tier limited
\*\*Self-hosted MongoDB

---

## 🆘 Troubleshooting

### Issue: Frontend can't connect to backend

- Check CORS settings in backend
- Verify API URL in frontend env
- Check if backend is running

### Issue: MongoDB connection failed

- Verify connection string
- Check IP whitelist
- Ensure database user exists

### Issue: Docker build fails

- Clear Docker cache: `docker-compose build --no-cache`
- Check Docker disk space: `docker system df`
- Restart Docker daemon

---

## 📞 Support

For deployment issues:

1. Check logs first
2. Verify environment variables
3. Test locally with Docker
4. Check platform status pages

---

Made with ❤️ for Pakistan
