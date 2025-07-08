<template>
  <div class="bottom-nav" :class="{ 'dark-mode': isDarkMode }">
    <router-link to="/" class="nav-item" :class="{ active: $route.path === '/' }">
      <div class="nav-icon">🏠</div>
      <span class="nav-label">Home</span>
    </router-link>
    
    <router-link to="/favorites" class="nav-item" :class="{ active: $route.path === '/favorites' }">
      <div class="nav-icon">❤️</div>
      <span class="nav-label">Favorites</span>
      <div v-if="favoriteCount > 0" class="badge">{{ favoriteCount }}</div>
    </router-link>
    
    <div class="nav-item" @click="scrollToTop">
      <div class="nav-icon">⬆️</div>
      <span class="nav-label">Top</span>
    </div>
    
    <div class="nav-item" @click="toggleDarkMode">
      <div class="nav-icon">{{ isDarkMode ? '☀️' : '🌙' }}</div>
      <span class="nav-label">Theme</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HapticFeedback from '../utils/haptics'

export default {
  name: 'BottomNavigation',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(['stateFavoritePokemonList']),
    favoriteCount() {
      return this.stateFavoritePokemonList.length
    }
  },
  methods: {
    scrollToTop() {
      HapticFeedback.light()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    toggleDarkMode() {
      HapticFeedback.medium()
      this.$emit('toggle-dark-mode')
    }
  }
}
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 0;
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.bottom-nav.dark-mode {
  background-color: rgba(42, 42, 42, 0.95);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #666;
  padding: 8px 12px;
  border-radius: 12px;
  min-width: 60px;
  min-height: 60px;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
  user-select: none;
}

.nav-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.nav-item:active {
  transform: translateY(0);
  background-color: rgba(0, 0, 0, 0.1);
}

.nav-item.active {
  color: #0066cc;
  background-color: rgba(0, 102, 204, 0.1);
}

.dark-mode .nav-item {
  color: #ccc;
}

.dark-mode .nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.dark-mode .nav-item:active {
  background-color: rgba(255, 255, 255, 0.2);
}

.dark-mode .nav-item.active {
  color: #66ccff;
  background-color: rgba(102, 204, 255, 0.2);
}

.nav-icon {
  font-size: 20px;
  margin-bottom: 4px;
  transition: transform 0.3s ease;
}

.nav-item:hover .nav-icon {
  transform: scale(1.1);
}

.nav-label {
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge {
  position: absolute;
  top: 4px;
  right: 8px;
  background-color: #ff4444;
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 10px;
  font-weight: bold;
  min-width: 16px;
  text-align: center;
  line-height: 1;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* Add padding to body to prevent content overlap */
body {
  padding-bottom: 80px;
}

/* Hide on desktop */
@media screen and (min-width: 769px) {
  .bottom-nav {
    display: none;
  }
}

/* Responsive adjustments */
@media screen and (max-width: 480px) {
  .nav-item {
    min-width: 50px;
    min-height: 50px;
    padding: 6px 8px;
  }
  
  .nav-icon {
    font-size: 18px;
    margin-bottom: 2px;
  }
  
  .nav-label {
    font-size: 9px;
  }
  
  .badge {
    top: 2px;
    right: 6px;
    padding: 1px 4px;
    font-size: 9px;
  }
}
</style>