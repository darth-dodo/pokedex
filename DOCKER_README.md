# Docker Setup for Pokedex

This file provides quick instructions for running the Pokedex application with Docker.

## Prerequisites

- Docker 20.0 or higher
- Docker Compose 2.0 or higher

## Quick Start

### Development Environment

```bash
# Start development server with hot reload
docker-compose --profile development up pokedex-dev

# Access at http://localhost:8080
```

### Production Environment

```bash
# Start production server
docker-compose --profile production up pokedex-prod

# Access at http://localhost:80
```

## Docker Commands

### Build Images

```bash
# Development image
docker build --target development -t pokedex:dev .

# Production image
docker build --target production -t pokedex:prod .
```

### Run Containers

```bash
# Development with volume mounting
docker run -p 8080:8080 -v $(pwd):/app -v /app/node_modules pokedex:dev

# Production
docker run -p 80:80 pokedex:prod
```

## Docker Compose Commands

```bash
# Start services
docker-compose --profile development up    # Development
docker-compose --profile production up     # Production

# Stop services
docker-compose down

# View logs
docker-compose logs pokedex-dev
docker-compose logs pokedex-prod

# Rebuild services
docker-compose build --no-cache
```

## Architecture

- **Multi-stage Dockerfile**: Optimized for both development and production
- **Development**: Node.js with hot reload
- **Production**: Nginx serving static files
- **Volume mounting**: Source code changes reflect immediately in development

## File Structure

```
.
├── Dockerfile              # Multi-stage build configuration
├── docker-compose.yml      # Service orchestration
├── nginx.conf             # Production web server config
├── .dockerignore          # Docker build exclusions
└── docs/DOCKER.md         # Detailed Docker documentation
```

## Troubleshooting

1. **Port conflicts**: Change ports in docker-compose.yml
2. **Permission issues**: `sudo chown -R $USER:$USER .`
3. **Build failures**: `docker system prune -a` and rebuild
4. **Hot reload not working**: Set `CHOKIDAR_USEPOLLING=true`

For detailed Docker configuration and advanced usage, see [docs/DOCKER.md](docs/DOCKER.md).