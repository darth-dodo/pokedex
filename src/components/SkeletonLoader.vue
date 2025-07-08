<template>
  <div class="skeleton-loader">
    <div class="skeleton-item" v-for="n in count" :key="n">
      <div class="skeleton-avatar"></div>
      <div class="skeleton-content">
        <div class="skeleton-title"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text skeleton-text-short"></div>
      </div>
      <div class="skeleton-action"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonLoader',
  props: {
    count: {
      type: Number,
      default: 10
    }
  }
}
</script>

<style scoped>
.skeleton-loader {
  padding: 20px;
}

.skeleton-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

.skeleton-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e0e0e0;
  flex-shrink: 0;
}

.skeleton-content {
  flex: 1;
  padding: 0 15px;
}

.skeleton-title {
  height: 16px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 8px;
  width: 60%;
}

.skeleton-text {
  height: 12px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 6px;
  width: 80%;
}

.skeleton-text-short {
  width: 40%;
}

.skeleton-action {
  width: 80px;
  height: 44px;
  background-color: #e0e0e0;
  border-radius: 4px;
  flex-shrink: 0;
}

@keyframes skeleton-pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}

/* Dark mode */
.dark-mode .skeleton-avatar,
.dark-mode .skeleton-title,
.dark-mode .skeleton-text,
.dark-mode .skeleton-action {
  background-color: #404040;
}

/* Responsive Design */
@media screen and (max-width: 768px) {
  .skeleton-item {
    flex-direction: column;
    text-align: center;
    padding: 15px;
  }

  .skeleton-avatar {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
  }

  .skeleton-content {
    width: 100%;
    padding: 0;
    margin-bottom: 10px;
  }

  .skeleton-title {
    width: 80%;
    margin: 0 auto 8px;
  }

  .skeleton-text {
    width: 100%;
    margin: 0 auto 6px;
  }

  .skeleton-text-short {
    width: 60%;
    margin: 0 auto;
  }

  .skeleton-action {
    width: 80px;
    height: 44px;
  }
}

@media screen and (max-width: 480px) {
  .skeleton-loader {
    padding: 10px;
  }

  .skeleton-item {
    padding: 12px;
    margin-bottom: 8px;
  }

  .skeleton-avatar {
    width: 50px;
    height: 50px;
  }

  .skeleton-action {
    width: 70px;
    height: 44px;
  }
}
</style>