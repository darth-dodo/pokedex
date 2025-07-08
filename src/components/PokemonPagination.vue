<template>
  <div class="pagination-container" v-if="totalPages > 1">
    <div class="pagination nes-container is-rounded">
      <div class="pagination-info">
        <span class="page-info">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <span class="items-info">
          Showing {{ startItem }}-{{ endItem }} of {{ totalItems }} Pokémon
        </span>
      </div>
      
      <div class="pagination-controls">
        <button 
          class="nes-btn pagination-btn"
          :class="{ 'is-disabled': currentPage === 1 }"
          @click="goToPage(1)"
          :disabled="currentPage === 1"
        >
          First
        </button>
        
        <button 
          class="nes-btn pagination-btn"
          :class="{ 'is-disabled': currentPage === 1 }"
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
        >
          Previous
        </button>
        
        <div class="page-numbers">
          <button
            v-for="page in visiblePages"
            :key="page"
            class="nes-btn pagination-btn page-number"
            :class="{ 'is-primary': page === currentPage }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          class="nes-btn pagination-btn"
          :class="{ 'is-disabled': currentPage === totalPages }"
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
        >
          Next
        </button>
        
        <button 
          class="nes-btn pagination-btn"
          :class="{ 'is-disabled': currentPage === totalPages }"
          @click="goToPage(totalPages)"
          :disabled="currentPage === totalPages"
        >
          Last
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokemonPagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 20
    }
  },
  computed: {
    startItem() {
      return (this.currentPage - 1) * this.itemsPerPage + 1
    },
    endItem() {
      const end = this.currentPage * this.itemsPerPage
      return end > this.totalItems ? this.totalItems : end
    },
    visiblePages() {
      const pages = []
      const maxVisible = 5
      
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2))
      let end = Math.min(this.totalPages, start + maxVisible - 1)
      
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    }
  },
  methods: {
    goToPage(page) {
      if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
        this.$emit('page-change', page)
      }
    }
  }
}
</script>

<style scoped>
.pagination-container {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

.pagination {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.pagination-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #666;
}

.page-info {
  font-weight: bold;
  color: #333;
}

.items-info {
  font-size: 12px;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.pagination-btn {
  font-size: 12px;
  padding: 8px 12px;
  height: auto;
  min-width: 60px;
}

.page-numbers {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.page-number {
  min-width: 40px;
  padding: 8px 8px;
}

.page-number.is-primary {
  background-color: #0066cc;
  color: white;
}

/* Responsive Design */
@media screen and (max-width: 768px) {
  .pagination {
    padding: 15px;
    gap: 12px;
  }
  
  .pagination-controls {
    gap: 6px;
  }
  
  .pagination-btn {
    font-size: 10px;
    padding: 6px 8px;
    min-width: 50px;
  }
  
  .page-number {
    min-width: 35px;
    padding: 6px 6px;
  }
  
  .pagination-info {
    font-size: 12px;
  }
  
  .items-info {
    font-size: 10px;
  }
}

@media screen and (max-width: 480px) {
  .pagination {
    padding: 10px;
    gap: 10px;
  }
  
  .pagination-controls {
    gap: 4px;
  }
  
  .pagination-btn {
    font-size: 9px;
    padding: 4px 6px;
    min-width: 45px;
  }
  
  .page-number {
    min-width: 30px;
    padding: 4px 4px;
  }
  
  .page-numbers {
    gap: 2px;
  }
  
  .pagination-info {
    font-size: 11px;
  }
  
  .items-info {
    font-size: 9px;
  }
}
</style>