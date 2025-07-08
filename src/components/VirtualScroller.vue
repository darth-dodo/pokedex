<template>
  <div class="virtual-scroller" ref="scroller" @scroll="handleScroll">
    <div class="virtual-scroller-content" :style="{ height: totalHeight + 'px' }">
      <div class="virtual-items" :style="{ transform: `translateY(${startOffset}px)` }">
        <div
          v-for="item in visibleItems"
          :key="item.index"
          class="virtual-item"
          :style="{ height: itemHeight + 'px' }"
        >
          <slot :item="item.data" :index="item.index"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VirtualScroller',
  props: {
    items: {
      type: Array,
      required: true
    },
    itemHeight: {
      type: Number,
      default: 100
    },
    containerHeight: {
      type: Number,
      default: 400
    },
    buffer: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      scrollTop: 0,
      containerRect: null
    }
  },
  computed: {
    totalHeight() {
      return this.items.length * this.itemHeight
    },
    visibleStartIndex() {
      return Math.max(0, Math.floor(this.scrollTop / this.itemHeight) - this.buffer)
    },
    visibleEndIndex() {
      const visibleCount = Math.ceil(this.containerHeight / this.itemHeight)
      return Math.min(this.items.length - 1, this.visibleStartIndex + visibleCount + this.buffer * 2)
    },
    visibleItems() {
      const items = []
      for (let i = this.visibleStartIndex; i <= this.visibleEndIndex; i++) {
        items.push({
          index: i,
          data: this.items[i]
        })
      }
      return items
    },
    startOffset() {
      return this.visibleStartIndex * this.itemHeight
    }
  },
  mounted() {
    this.updateContainerRect()
    window.addEventListener('resize', this.updateContainerRect)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateContainerRect)
  },
  methods: {
    handleScroll() {
      this.scrollTop = this.$refs.scroller.scrollTop
    },
    updateContainerRect() {
      if (this.$refs.scroller) {
        this.containerRect = this.$refs.scroller.getBoundingClientRect()
      }
    },
    scrollToIndex(index) {
      if (this.$refs.scroller) {
        this.$refs.scroller.scrollTop = index * this.itemHeight
      }
    },
    scrollToTop() {
      if (this.$refs.scroller) {
        this.$refs.scroller.scrollTop = 0
      }
    }
  }
}
</script>

<style scoped>
.virtual-scroller {
  overflow-y: auto;
  position: relative;
  height: 100%;
}

.virtual-scroller-content {
  position: relative;
}

.virtual-items {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.virtual-item {
  position: relative;
  overflow: hidden;
}

/* Smooth scrolling */
.virtual-scroller {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
.virtual-scroller::-webkit-scrollbar {
  width: 8px;
}

.virtual-scroller::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.virtual-scroller::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.virtual-scroller::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.5);
}

/* Dark mode scrollbar */
.dark-mode .virtual-scroller::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.dark-mode .virtual-scroller::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
}

.dark-mode .virtual-scroller::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>