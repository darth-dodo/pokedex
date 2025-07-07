# Pokedex - Educational Vue.js Project

An interactive Pokédex application built with Vue.js 2 for educational purposes. This project demonstrates modern web development practices including responsive design, state management, and user interaction patterns.

## Features

- **Browse Pokémon**: View the first 151 Pokémon with detailed information
- **Favorites Management**: Add up to 10 favorite Pokémon to your collection
- **Mobile Responsive**: Fully responsive design that works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Audio Integration**: Pokémon cries play when selecting favorites
- **Easter Eggs**: Hidden interactive elements throughout the app

## Technical Stack

- **Frontend**: Vue.js 2.6.14
- **Routing**: Vue Router 3.5.1
- **State Management**: Vuex 3.6.2
- **Styling**: NES.css (retro 8-bit styling)
- **API**: PokéAPI for Pokémon data
- **Build Tools**: Vue CLI 5.0.0
- **Package Manager**: Yarn
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (production)

## Project Structure

```
src/
├── components/
│   ├── PokemonCard.vue      # Individual Pokémon display component
│   ├── PokemonList.vue      # List of all Pokémon with selection
│   └── SummaryFavorites.vue # Favorites management sidebar
├── pages/
│   ├── homePage.vue         # Main page with Pokémon selection
│   └── favortiesPage.vue    # Favorites overview page
├── router/
│   └── index.js             # Vue Router configuration
├── store/
│   └── index.js             # Vuex store for state management
├── assets/                  # Images and static assets
└── App.vue                  # Root component with theme management
```

## Getting Started

### Docker Setup (Recommended)

1. **Development Environment**
   ```bash
   # Start development server with hot reload
   docker-compose --profile development up pokedex-dev
   
   # Access at http://localhost:8080
   ```

2. **Production Environment**
   ```bash
   # Build and run production version
   docker-compose --profile production up pokedex-prod
   
   # Access at http://localhost:80
   ```

### Local Development Setup

1. **Install Dependencies**
   ```bash
   yarn install
   ```

2. **Run Development Server**
   ```bash
   yarn serve
   ```

3. **Build for Production**
   ```bash
   yarn build
   ```

4. **Lint Code**
   ```bash
   yarn lint
   ```

### Docker Commands

```bash
# Build development image
docker build --target development -t pokedex:dev .

# Build production image
docker build --target production -t pokedex:prod .

# Run development container
docker run -p 8080:8080 -v $(pwd):/app pokedex:dev

# Run production container
docker run -p 80:80 pokedex:prod
```

## Educational Objectives

This project demonstrates:

- **Component Architecture**: Modular Vue.js components with props and events
- **State Management**: Centralized state using Vuex store
- **Responsive Design**: CSS Grid, Flexbox, and media queries
- **API Integration**: Fetching data from external REST APIs
- **User Experience**: Interactive elements and feedback
- **Accessibility**: Semantic HTML and keyboard navigation
- **Performance**: Optimized images and efficient rendering

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is created for educational purposes. Pokémon content is property of Nintendo/Game Freak/The Pokémon Company.