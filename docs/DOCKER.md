# Docker Configuration Guide

## Overview

This project uses Docker for containerization with multi-stage builds and Docker Compose for orchestration. The setup supports both development and production environments.

## Architecture

### Multi-Stage Dockerfile

The Dockerfile contains three stages:

1. **Builder Stage**: Node.js 18 Alpine with yarn for building
2. **Production Stage**: Nginx Alpine for serving static files
3. **Development Stage**: Node.js 18 Alpine with hot reload

### Docker Compose Services

- `pokedex-dev`: Development environment with hot reload
- `pokedex-prod`: Production environment with Nginx
- `nginx-dev`: Optional reverse proxy for development

## Quick Start

### Development Environment

```bash
# Start development server
docker-compose --profile development up pokedex-dev

# Access at http://localhost:8080
# Hot reload is enabled for code changes
```

### Production Environment

```bash
# Start production server
docker-compose --profile production up pokedex-prod

# Access at http://localhost:80
# Optimized build with Nginx serving static files
```

## Docker Commands

### Building Images

```bash
# Build development image
docker build --target development -t pokedex:dev .

# Build production image
docker build --target production -t pokedex:prod .

# Build all stages
docker build -t pokedex:latest .
```

### Running Containers

```bash
# Development with volume mounting
docker run -p 8080:8080 -v $(pwd):/app -v /app/node_modules pokedex:dev

# Production
docker run -p 80:80 pokedex:prod

# Background (detached)
docker run -d -p 80:80 --name pokedex-container pokedex:prod
```

### Container Management

```bash
# View running containers
docker ps

# View logs
docker logs pokedex-container

# Stop container
docker stop pokedex-container

# Remove container
docker rm pokedex-container

# Remove image
docker rmi pokedex:prod
```

## Docker Compose Commands

### Service Management

```bash
# Start all services in profile
docker-compose --profile development up

# Start specific service
docker-compose up pokedex-dev

# Start in background
docker-compose --profile production up -d

# Stop all services
docker-compose down

# Remove volumes
docker-compose down -v
```

### Logs and Monitoring

```bash
# View logs for all services
docker-compose logs

# View logs for specific service
docker-compose logs pokedex-dev

# Follow logs (real-time)
docker-compose logs -f pokedex-prod

# View service status
docker-compose ps
```

### Rebuilding Services

```bash
# Rebuild service
docker-compose build pokedex-dev

# Rebuild and start
docker-compose up --build pokedex-dev

# Force rebuild (no cache)
docker-compose build --no-cache pokedex-prod
```

## Configuration Files

### Dockerfile

Multi-stage build configuration:
- **Dependencies**: Yarn for package management
- **Build**: Vue CLI for application build
- **Production**: Nginx for static file serving
- **Development**: Node.js for hot reload

### docker-compose.yml

Service definitions:
- **Profiles**: development, production, development-proxy
- **Networks**: Custom bridge network
- **Volumes**: Source code mounting for development

### nginx.conf

Production web server configuration:
- **Gzip compression**: Enabled for better performance
- **Security headers**: XSS protection, frame options
- **Caching**: Static assets cached for 1 year
- **SPA routing**: Fallback to index.html for client-side routing

### .dockerignore

Excludes unnecessary files:
- Node modules and build artifacts
- Documentation and screenshots
- IDE and OS files
- Git and Docker configuration

## Environment Variables

### Development Environment

```bash
# Set in docker-compose.yml
NODE_ENV=development
CHOKIDAR_USEPOLLING=true  # For file watching in containers
```

### Production Environment

```bash
# Set in docker-compose.yml
NODE_ENV=production
```

### Custom Environment Variables

```bash
# Add to docker-compose.yml
environment:
  - VUE_APP_API_URL=https://api.example.com
  - VUE_APP_VERSION=1.0.0
```

## Volume Configuration

### Development Volumes

```yaml
volumes:
  - .:/app                    # Source code
  - /app/node_modules         # Exclude node_modules
```

### Production Volumes

```yaml
# Static files served by Nginx
volumes:
  - ./dist:/usr/share/nginx/html
```

## Networking

### Port Mapping

- **Development**: 8080:8080 (Vue dev server)
- **Production**: 80:80 (Nginx)
- **Development Proxy**: 3000:80 (Optional Nginx proxy)

### Custom Networks

```yaml
networks:
  pokedex-network:
    driver: bridge
```

## Performance Optimization

### Image Size Optimization

- **Alpine Linux**: Minimal base images
- **Multi-stage builds**: Excludes development dependencies
- **Layer caching**: Optimized Dockerfile layer order

### Build Performance

```bash
# Use BuildKit for faster builds
DOCKER_BUILDKIT=1 docker build -t pokedex:prod .

# Parallel builds with Docker Compose
docker-compose build --parallel
```

### Runtime Performance

- **Nginx**: Efficient static file serving
- **Gzip compression**: Reduced bandwidth usage
- **Browser caching**: Reduced server load

## Security Best Practices

### Image Security

- **Alpine Linux**: Minimal attack surface
- **Non-root user**: Nginx runs as nginx user
- **No secrets**: No sensitive data in images

### Network Security

- **Custom networks**: Service isolation
- **Security headers**: XSS and clickjacking protection
- **HTTPS ready**: SSL termination at proxy level

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   lsof -i :8080
   
   # Use different port
   docker run -p 3000:8080 pokedex:dev
   ```

2. **Permission denied**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

3. **Build failures**
   ```bash
   # Clear Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker-compose build --no-cache
   ```

4. **Hot reload not working**
   ```bash
   # Enable polling in container
   environment:
     - CHOKIDAR_USEPOLLING=true
   ```

### Debugging

```bash
# Shell into running container
docker exec -it pokedex-container sh

# Debug build process
docker build --target development --progress=plain .

# Check container logs
docker logs -f pokedex-container
```

## Production Deployment

### Cloud Deployment

```bash
# Build for specific platform
docker buildx build --platform linux/amd64 -t pokedex:prod .

# Push to registry
docker push your-registry/pokedex:prod
```

### CI/CD Integration

```yaml
# GitHub Actions example
- name: Build Docker image
  run: docker build -t pokedex:${{ github.sha }} .

- name: Push to registry
  run: docker push pokedex:${{ github.sha }}
```

### Health Checks

```dockerfile
# Add to Dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1
```

## Monitoring

### Resource Usage

```bash
# Check resource usage
docker stats pokedex-container

# Check image sizes
docker images pokedex
```

### Log Management

```bash
# Limit log size
docker run --log-opt max-size=10m --log-opt max-file=3 pokedex:prod

# Use log driver
docker run --log-driver json-file pokedex:prod
```

## Advanced Configuration

### Custom Nginx Configuration

```bash
# Override nginx.conf
docker run -v ./custom-nginx.conf:/etc/nginx/nginx.conf pokedex:prod
```

### Development Tools

```bash
# Add development tools
docker run -v $(pwd):/app -v /app/node_modules --entrypoint sh pokedex:dev
```

### Multi-Environment Setup

```yaml
# docker-compose.override.yml for local development
version: '3.8'
services:
  pokedex-dev:
    environment:
      - DEBUG=true
      - LOG_LEVEL=debug
```