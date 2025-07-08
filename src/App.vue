<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <div class="theme-toggle">
      <button @click="toggleDarkMode" class="nes-btn is-primary">
        {{ isDarkMode ? '☀️' : '🌙' }}
      </button>
    </div>
    <router-view />
    <bottom-navigation 
      :is-dark-mode="isDarkMode" 
      @toggle-dark-mode="toggleDarkMode"
    />
    <install-prompt />
  </div>
</template>

<script>
import BottomNavigation from './components/BottomNavigation'
import InstallPrompt from './components/InstallPrompt'

export default {
  name: 'App',
  components: {
    BottomNavigation,
    InstallPrompt
  },
  data() {
    return {
      isDarkMode: false
    }
  },
  mounted() {
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme !== null) {
      this.isDarkMode = JSON.parse(savedTheme)
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode))
    }
  }
}
</script>

<style>
#app {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.dark-mode {
  background-color: #2a2a2a;
  color: #ffffff;
}

.dark-mode .nes-container {
  background-color: #404040;
  color: #ffffff;
}

.dark-mode .nes-btn {
  background-color: #404040;
  color: #ffffff;
}

.dark-mode .nes-btn:hover {
  background-color: #505050;
}

.dark-mode .nes-btn.is-primary {
  background-color: #0066cc;
}

.dark-mode .nes-btn.is-success {
  background-color: #00cc66;
}

.dark-mode .nes-btn.is-error {
  background-color: #cc0000;
}

@media screen and (max-width: 768px) {
  .theme-toggle {
    display: none;
  }
  
  #app {
    padding-bottom: 80px;
  }
}

@media screen and (min-width: 769px) {
  .theme-toggle {
    top: 10px;
    right: 10px;
  }
}
</style>
