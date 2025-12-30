# Docker Deployment Guide

This guide explains how to build and deploy the Docker images for the Pakistan Bazaar application.

## Prerequisites

- Docker Desktop installed ([Download here](https://www.docker.com/products/docker-desktop))
- GitHub account
- Docker Hub account or GitHub Container Registry access

## Building Docker Images Locally

### Option 1: Using Docker Compose (Recommended)

```bash
# Build all services
docker compose build

# Build and run all services
docker compose up -d
```

### Option 2: Building Individual Images

```bash
# Build backend image
docker build -t pakistan-bazaar-backend:latest ./backend

# Build frontend image
docker build -t pakistan-bazaar-frontend:latest ./frontend
```

## Pushing to GitHub Container Registry

### 1. Authenticate with GitHub Container Registry

```bash
# Create a Personal Access Token (PAT) on GitHub with 'write:packages' scope
# Then login:
echo YOUR_GITHUB_TOKEN | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
```

### 2. Tag Images for GitHub Container Registry

```bash
# Tag backend image
docker tag pakistan-bazaar-backend:latest ghcr.io/wasifullah-x/pakistan-bazaar-backend:latest

# Tag frontend image
docker tag pakistan-bazaar-frontend:latest ghcr.io/wasifullah-x/pakistan-bazaar-frontend:latest
```

### 3. Push Images to GitHub Container Registry

```bash
# Push backend image
docker push ghcr.io/wasifullah-x/pakistan-bazaar-backend:latest

# Push frontend image
docker push ghcr.io/wasifullah-x/pakistan-bazaar-frontend:latest
```

## Pushing to Docker Hub (Alternative)

### 1. Login to Docker Hub

```bash
docker login
```

### 2. Tag Images for Docker Hub

```bash
# Tag backend image
docker tag pakistan-bazaar-backend:latest YOUR_DOCKERHUB_USERNAME/pakistan-bazaar-backend:latest

# Tag frontend image
docker tag pakistan-bazaar-frontend:latest YOUR_DOCKERHUB_USERNAME/pakistan-bazaar-frontend:latest
```

### 3. Push Images to Docker Hub

```bash
# Push backend image
docker push YOUR_DOCKERHUB_USERNAME/pakistan-bazaar-backend:latest

# Push frontend image
docker push YOUR_DOCKERHUB_USERNAME/pakistan-bazaar-frontend:latest
```

## Using Pre-built Images

Once images are pushed, you can update `docker-compose.yml` to use the pre-built images:

```yaml
services:
  backend:
    image: ghcr.io/wasifullah-x/pakistan-bazaar-backend:latest
    # Remove the 'build' section

  frontend:
    image: ghcr.io/wasifullah-x/pakistan-bazaar-frontend:latest
    # Remove the 'build' section
```

## Deployment Steps (Complete Workflow)

1. **Install Docker Desktop**

   - Download and install from [docker.com](https://www.docker.com/products/docker-desktop)
   - Restart your computer if needed

2. **Build Images**

   ```bash
   cd "D:\FS Quiz"
   docker compose build
   ```

3. **Test Locally**

   ```bash
   docker compose up -d
   ```

   - Backend: http://localhost:5000
   - Frontend: http://localhost:3000
   - MongoDB: localhost:27017

4. **Login to GitHub Container Registry**

   ```bash
   # Create PAT at: https://github.com/settings/tokens
   # Required scope: write:packages, read:packages, delete:packages
   echo YOUR_TOKEN | docker login ghcr.io -u wasifullah-x --password-stdin
   ```

5. **Tag and Push Images**

   ```bash
   # Tag images
   docker tag fs-quiz-backend:latest ghcr.io/wasifullah-x/ecommerce-store-backend:latest
   docker tag fs-quiz-frontend:latest ghcr.io/wasifullah-x/ecommerce-store-frontend:latest

   # Push images
   docker push ghcr.io/wasifullah-x/ecommerce-store-backend:latest
   docker push ghcr.io/wasifullah-x/ecommerce-store-frontend:latest
   ```

6. **Make Images Public (Optional)**
   - Go to: https://github.com/users/wasifullah-x/packages
   - Select each package
   - Click "Package settings"
   - Scroll down and click "Change visibility"
   - Select "Public"

## Verifying Deployment

After pushing images, verify they exist:

```bash
# List your packages
# Visit: https://github.com/wasifullah-x?tab=packages

# Pull and test an image
docker pull ghcr.io/wasifullah-x/ecommerce-store-backend:latest
```

## Troubleshooting

### Docker not found

- Ensure Docker Desktop is installed and running
- Restart terminal after installation

### Authentication failed

- Generate a new Personal Access Token with correct permissions
- Use the token (not your password) when logging in

### Build failures

- Ensure all dependencies are in package.json files
- Check Dockerfile paths are correct
- Ensure you're in the project root directory

### Image too large

- Add a `.dockerignore` file to exclude unnecessary files:
  ```
  node_modules
  .git
  .env
  *.log
  ```

## Production Deployment Options

Once images are pushed to a registry, you can deploy using:

1. **Cloud Platforms**

   - AWS ECS/Fargate
   - Google Cloud Run
   - Azure Container Instances
   - DigitalOcean App Platform

2. **Container Orchestration**

   - Kubernetes
   - Docker Swarm

3. **Simple VPS**
   - Install Docker on VPS
   - Pull images from registry
   - Run with docker compose

## Environment Variables for Production

Create a `.env` file for production deployment:

```env
MONGODB_URI=mongodb://mongodb:27017/pakistan-bazaar
NODE_ENV=production
PORT=5000
```

## Security Best Practices

1. Never commit sensitive data (tokens, passwords)
2. Use environment variables for configuration
3. Regularly update base images
4. Scan images for vulnerabilities:
   ```bash
   docker scan pakistan-bazaar-backend:latest
   ```

## Continuous Deployment

Consider setting up GitHub Actions to automatically build and push images on every commit. See [DEPLOYMENT.md](DEPLOYMENT.md) for CI/CD setup.
