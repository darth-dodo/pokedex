# Development Guide

## Setup and Installation

### Prerequisites

#### Docker Setup (Recommended)
- Docker 20.0 or higher
- Docker Compose 2.0 or higher

#### Local Development Setup
- Node.js 18.0 or higher
- Yarn 1.22 or higher
- Modern web browser

### Docker Installation Steps
```bash
# Clone the repository
git clone <repository-url>
cd pokedex

# Start development environment
docker-compose --profile development up pokedex-dev

# Open http://localhost:8080 in your browser
```

### Local Installation Steps
```bash
# Clone the repository
git clone <repository-url>
cd pokedex

# Install dependencies
yarn install

# Start development server
yarn serve

# Open http://localhost:8080 in your browser
```

## Development Workflow

### Available Scripts

#### Docker Commands
- `docker-compose --profile development up pokedex-dev` - Start development with hot reload
- `docker-compose --profile production up pokedex-prod` - Start production server
- `docker-compose down` - Stop all containers
- `docker-compose logs pokedex-dev` - View development logs

#### Local Development Commands
- `yarn serve` - Start development server with hot reload
- `yarn build` - Build for production
- `yarn lint` - Run ESLint for code quality
- `yarn lint --fix` - Auto-fix linting issues

#### Docker Build Commands
- `docker build --target development -t pokedex:dev .` - Build development image
- `docker build --target production -t pokedex:prod .` - Build production image
- `docker run -p 8080:8080 -v $(pwd):/app pokedex:dev` - Run development container
- `docker run -p 80:80 pokedex:prod` - Run production container

### Project Structure Details

#### Components (`src/components/`)
- **PokemonCard.vue**: Displays individual Pokémon details
- **PokemonList.vue**: Shows all Pokémon with selection interface
- **SummaryFavorites.vue**: Manages favorites sidebar

#### Pages (`src/pages/`)
- **homePage.vue**: Main application page
- **favortiesPage.vue**: Dedicated favorites view

#### Core Files
- **App.vue**: Root component with theme management
- **main.js**: Application entry point
- **router/index.js**: Route definitions
- **store/index.js**: Vuex store configuration

## Component Architecture

### Data Flow
1. **API Data**: Fetched in homePage.vue
2. **Store Update**: Data committed to Vuex store
3. **Component Props**: Data passed to child components
4. **User Actions**: Events bubble up to parent components
5. **State Changes**: Mutations update store state

### Component Communication
- **Props Down**: Parent to child data flow
- **Events Up**: Child to parent communication
- **Store**: Global state management
- **Router**: Navigation between pages

## Adding New Features

### Adding a New Component
1. Create component file in `src/components/`
2. Import in parent component
3. Register in components object
4. Add to template with props
5. Handle events in parent methods

### Adding a New Page
1. Create page file in `src/pages/`
2. Import in `src/router/index.js`
3. Add route configuration
4. Create navigation links

### Adding Store Data
1. Define state property in `src/store/index.js`
2. Create mutations for state changes
3. Create actions for async operations
4. Map state/actions in components

## API Integration

### PokéAPI Usage
```javascript
// Basic Pokémon data
const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
const data = await response.json()

// Individual Pokémon details
const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
const details = await pokemon.json()

// Pokémon descriptions
const species = await fetch(details.species.url)
const info = await species.json()
```

### Error Handling
- Network errors are caught and handled gracefully
- Failed API calls show fallback content
- User feedback provided for loading states

## Styling Guidelines

### CSS Architecture
- **Scoped Styles**: Each component has scoped CSS
- **Global Styles**: App-level styles in App.vue
- **NES.css**: Retro gaming aesthetic framework
- **Custom Properties**: CSS variables for theming

### Responsive Design
```css
/* Mobile First Approach */
.component {
  /* Mobile styles */
}

@media screen and (min-width: 768px) {
  .component {
    /* Tablet styles */
  }
}

@media screen and (min-width: 1200px) {
  .component {
    /* Desktop styles */
  }
}
```

### Dark Mode Implementation
```css
.dark-mode .component {
  background-color: #2a2a2a;
  color: #ffffff;
}
```

## Testing Strategy

### Manual Testing Checklist
- [ ] All Pokémon load correctly
- [ ] Favorites can be added/removed
- [ ] Dark mode toggle works
- [ ] Mobile responsive design
- [ ] Easter eggs trigger correctly
- [ ] Audio plays when expected
- [ ] Navigation works properly

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Optimization

### Image Optimization
- Pokémon sprites are optimized by PokéAPI
- Lazy loading implemented for better performance
- Proper alt text for accessibility

### Bundle Optimization
- Vue CLI handles code splitting
- Unused CSS is removed in production
- JavaScript is minified and compressed

### Runtime Performance
- Efficient v-for loops with keys
- Computed properties for expensive calculations
- Event listener cleanup in beforeDestroy

## Docker Architecture

### Multi-Stage Build
The Dockerfile uses multi-stage builds for optimization:

1. **Builder Stage**: Installs dependencies and builds the application
2. **Production Stage**: Serves static files with Nginx
3. **Development Stage**: Provides hot reload development environment

### Docker Compose Profiles
- `development`: Development environment with hot reload
- `production`: Production environment with Nginx
- `development-proxy`: Development with reverse proxy (optional)

### Volume Mounting
Development containers mount source code for hot reloading:
```yaml
volumes:
  - .:/app
  - /app/node_modules
```

## Deployment

### Docker Production Deployment
```bash
# Build and start production container
docker-compose --profile production up -d pokedex-prod

# View logs
docker-compose logs -f pokedex-prod

# Stop container
docker-compose down
```

### Traditional Build Process
```bash
# Create production build
yarn build

# Files are generated in /dist directory
# Deploy dist/ contents to web server
```

### Environment Variables
- No sensitive data in client-side code
- All API endpoints are public
- Configuration through Vue CLI or Docker environment variables

## Common Issues and Solutions

### Development Issues
1. **Port Already in Use**: Change port in vue.config.js
2. **API CORS Errors**: PokéAPI allows all origins
3. **Missing Dependencies**: Run `npm install`

### Production Issues
1. **White Screen**: Check console for JavaScript errors
2. **Images Not Loading**: Verify API endpoints
3. **Routing Issues**: Configure server for SPA routing

## Contributing Guidelines

1. Fork the repository
2. Create feature branch
3. Follow existing code style
4. Test thoroughly
5. Submit pull request with description

## Code Quality

### ESLint Configuration
- Vue/essential rules enabled
- Prettier integration
- Custom rules for project consistency

### Best Practices
- Use semantic HTML
- Add proper alt text to images
- Handle errors gracefully
- Keep components small and focused
- Use descriptive variable names