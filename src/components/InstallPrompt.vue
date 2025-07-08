<template>
  <div v-if="showInstallPrompt" class="install-prompt">
    <div class="install-content">
      <div class="install-icon">📱</div>
      <div class="install-text">
        <h3>Install Pokedex</h3>
        <p>Get the full app experience with offline access!</p>
      </div>
      <div class="install-actions">
        <button @click="installApp" class="nes-btn is-primary">Install</button>
        <button @click="dismissPrompt" class="nes-btn">Later</button>
      </div>
    </div>
  </div>
</template>

<script>
import HapticFeedback from '../utils/haptics'

export default {
  name: 'InstallPrompt',
  data() {
    return {
      showInstallPrompt: false,
      deferredPrompt: null
    }
  },
  mounted() {
    this.setupInstallPrompt()
  },
  methods: {
    setupInstallPrompt() {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        this.deferredPrompt = e
        this.showInstallPrompt = true
      })

      window.addEventListener('appinstalled', () => {
        this.showInstallPrompt = false
        this.deferredPrompt = null
        HapticFeedback.success()
      })
    },
    async installApp() {
      if (!this.deferredPrompt) return

      HapticFeedback.medium()
      this.deferredPrompt.prompt()
      
      const { outcome } = await this.deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
      
      this.deferredPrompt = null
      this.showInstallPrompt = false
    },
    dismissPrompt() {
      HapticFeedback.light()
      this.showInstallPrompt = false
      
      // Show again after 24 hours
      setTimeout(() => {
        this.showInstallPrompt = true
      }, 24 * 60 * 60 * 1000)
    }
  }
}
</script>

<style scoped>
.install-prompt {
  position: fixed;
  bottom: 90px;
  left: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 2px solid #0066cc;
  border-radius: 12px;
  padding: 16px;
  z-index: 1001;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.install-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.install-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.install-text {
  flex: 1;
}

.install-text h3 {
  margin: 0 0 4px 0;
  font-size: 12px;
  color: #0066cc;
}

.install-text p {
  margin: 0;
  font-size: 10px;
  color: #666;
}

.install-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}

.install-actions .nes-btn {
  font-size: 8px;
  padding: 4px 8px;
  min-width: 60px;
  height: 32px;
}

/* Dark mode */
.dark-mode .install-prompt {
  background-color: rgba(42, 42, 42, 0.95);
  border-color: #66ccff;
}

.dark-mode .install-text h3 {
  color: #66ccff;
}

.dark-mode .install-text p {
  color: #ccc;
}

/* Hide on desktop */
@media screen and (min-width: 769px) {
  .install-prompt {
    display: none;
  }
}

/* Responsive adjustments */
@media screen and (max-width: 480px) {
  .install-prompt {
    bottom: 80px;
    left: 10px;
    right: 10px;
    padding: 12px;
  }
  
  .install-content {
    gap: 8px;
  }
  
  .install-icon {
    font-size: 24px;
  }
  
  .install-text h3 {
    font-size: 10px;
  }
  
  .install-text p {
    font-size: 8px;
  }
  
  .install-actions .nes-btn {
    font-size: 7px;
    padding: 3px 6px;
    min-width: 50px;
    height: 28px;
  }
}
</style>