<template>
  <div class="pokemon-search">
    <div class="search-container nes-container is-rounded">
      <h3>Search & Filter Pokémon</h3>
      
      <!-- Search Input -->
      <div class="search-input-container">
        <label for="pokemon-search" class="search-label">Search by name:</label>
        <input
          id="pokemon-search"
          v-model="searchQuery"
          type="text"
          class="nes-input"
          placeholder="Enter Pokémon name..."
          @input="onSearchInput"
        />
      </div>

      <!-- Type Filter -->
      <div class="type-filter-container">
        <label class="search-label">Filter by type:</label>
        <div class="type-buttons">
          <button
            v-for="type in pokemonTypes"
            :key="type.name"
            class="nes-btn type-btn"
            :class="{ 'is-primary': selectedType === type.name, [`type-${type.name}`]: true }"
            @click="selectType(type.name)"
          >
            {{ type.name }}
          </button>
          <button
            class="nes-btn is-warning"
            @click="clearFilters"
          >
            Clear All
          </button>
        </div>
      </div>

      <!-- Results Info -->
      <div class="results-info">
        <p class="results-text">
          Showing {{ filteredCount }} of {{ totalCount }} Pokémon
          <span v-if="searchQuery || selectedType">
            {{ searchQuery ? `| Search: "${searchQuery}"` : '' }}
            {{ selectedType ? `| Type: ${selectedType}` : '' }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokemonSearch',
  props: {
    totalCount: {
      type: Number,
      default: 0
    },
    filteredCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      searchQuery: '',
      selectedType: '',
      pokemonTypes: [
        { name: 'normal', color: '#A8A878' },
        { name: 'fire', color: '#F08030' },
        { name: 'water', color: '#6890F0' },
        { name: 'electric', color: '#F8D030' },
        { name: 'grass', color: '#78C850' },
        { name: 'ice', color: '#98D8D8' },
        { name: 'fighting', color: '#C03028' },
        { name: 'poison', color: '#A040A0' },
        { name: 'ground', color: '#E0C068' },
        { name: 'flying', color: '#A890F0' },
        { name: 'psychic', color: '#F85888' },
        { name: 'bug', color: '#A8B820' },
        { name: 'rock', color: '#B8A038' },
        { name: 'ghost', color: '#705898' },
        { name: 'dragon', color: '#7038F8' },
        { name: 'dark', color: '#705848' },
        { name: 'steel', color: '#B8B8D0' },
        { name: 'fairy', color: '#EE99AC' }
      ]
    }
  },
  methods: {
    onSearchInput() {
      this.emitFilters()
    },
    selectType(typeName) {
      this.selectedType = this.selectedType === typeName ? '' : typeName
      this.emitFilters()
    },
    clearFilters() {
      this.searchQuery = ''
      this.selectedType = ''
      this.emitFilters()
    },
    emitFilters() {
      this.$emit('filter-change', {
        search: this.searchQuery.toLowerCase().trim(),
        type: this.selectedType
      })
    }
  }
}
</script>

<style scoped>
.pokemon-search {
  margin-bottom: 20px;
}

.search-container {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
}

.search-input-container {
  margin-bottom: 20px;
}

.search-label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 14px;
}

.nes-input {
  width: 100%;
  max-width: 300px;
}

.type-filter-container {
  margin-bottom: 20px;
}

.type-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.type-btn {
  font-size: 12px;
  padding: 8px 12px;
  min-width: 80px;
  height: auto;
  text-transform: capitalize;
}

/* Pokemon Type Colors */
.type-normal { background-color: #A8A878; }
.type-fire { background-color: #F08030; }
.type-water { background-color: #6890F0; }
.type-electric { background-color: #F8D030; }
.type-grass { background-color: #78C850; }
.type-ice { background-color: #98D8D8; }
.type-fighting { background-color: #C03028; }
.type-poison { background-color: #A040A0; }
.type-ground { background-color: #E0C068; }
.type-flying { background-color: #A890F0; }
.type-psychic { background-color: #F85888; }
.type-bug { background-color: #A8B820; }
.type-rock { background-color: #B8A038; }
.type-ghost { background-color: #705898; }
.type-dragon { background-color: #7038F8; }
.type-dark { background-color: #705848; }
.type-steel { background-color: #B8B8D0; }
.type-fairy { background-color: #EE99AC; }

.type-btn:not(.is-primary) {
  color: white;
  border: 2px solid #333;
}

.results-info {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 2px solid #ddd;
}

.results-text {
  margin: 0;
  font-size: 14px;
  color: #666;
}

/* Responsive Design */
@media screen and (max-width: 768px) {
  .pokemon-search {
    margin: 10px 0;
  }
  
  .search-container {
    padding: 15px;
    margin: 0 10px;
  }
  
  .nes-input {
    max-width: 100%;
  }
  
  .type-buttons {
    gap: 6px;
  }
  
  .type-btn {
    font-size: 10px;
    padding: 6px 8px;
    min-width: 60px;
  }
}

@media screen and (max-width: 480px) {
  .pokemon-search {
    margin: 5px 0;
  }
  
  .search-container {
    padding: 10px;
    margin: 0 5px;
  }
  
  .search-input-container {
    margin-bottom: 15px;
  }
  
  .type-filter-container {
    margin-bottom: 15px;
  }
  
  .type-btn {
    font-size: 9px;
    padding: 4px 6px;
    min-width: 50px;
  }
  
  .search-label {
    font-size: 12px;
    margin-bottom: 6px;
  }
  
  .results-text {
    font-size: 12px;
  }
  
  .results-info {
    margin-top: 10px;
    padding-top: 10px;
  }
}
</style>