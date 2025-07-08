<template>
  <div class="progressive-image" :class="{ loaded: isLoaded }">
    <div 
      v-if="!isLoaded" 
      class="placeholder"
      :style="{ backgroundColor: placeholderColor }"
    >
      <div class="loading-spinner"></div>
    </div>
    <img
      v-show="isLoaded"
      :src="src"
      :alt="alt"
      :class="className"
      @load="onLoad"
      @error="onError"
      loading="lazy"
    >
  </div>
</template>

<script>
export default {
  name: 'ProgressiveImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    placeholderColor: {
      type: String,
      default: '#f0f0f0'
    }
  },
  data() {
    return {
      isLoaded: false,
      hasError: false
    }
  },
  methods: {
    onLoad() {
      this.isLoaded = true
      this.hasError = false
      this.$emit('load')
    },
    onError() {
      this.hasError = true
      this.$emit('error')
    }
  }
}
</script>

<style scoped>
.progressive-image {
  position: relative;
  display: inline-block;
  overflow: hidden;
  transition: all 0.3s ease;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-top: 2px solid #0066cc;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: opacity 0.3s ease;
}

.loaded img {
  opacity: 1;
}

/* Dark mode */
.dark-mode .placeholder {
  background: linear-gradient(90deg, #404040 25%, #505050 50%, #404040 75%);
  background-size: 200% 100%;
}

.dark-mode .loading-spinner {
  border-color: #666;
  border-top-color: #66ccff;
}
</style>