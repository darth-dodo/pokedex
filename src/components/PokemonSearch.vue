<template>
  <div class="pokemon-search">
    <!-- Quick Filter Chips -->
    <div class="quick-filters">
      <div class="quick-filter-chip" @click="applyQuickFilter('popular')">
        🔥 Popular
      </div>
      <div class="quick-filter-chip" @click="applyQuickFilter('starter')">
        🌱 Starters
      </div>
      <div class="quick-filter-chip" @click="applyQuickFilter('legendary')">
        ✨ Legendary
      </div>
      <div class="quick-filter-chip" @click="applyQuickFilter('fire')">
        🔥 Fire
      </div>
      <div class="quick-filter-chip" @click="applyQuickFilter('water')">
        💧 Water
      </div>
      <div class="quick-filter-chip" @click="applyQuickFilter('electric')">
        ⚡ Electric
      </div>
    </div>

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
import HapticFeedback from '../utils/haptics'

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
  computed: {
    suggestions() {
      if (!this.searchQuery || this.searchQuery.length < 2) return []
      
      const query = this.searchQuery.toLowerCase().trim()
      return this.allPokemon
        .filter(pokemon => pokemon.name.toLowerCase().includes(query))
        .slice(0, 5)
    }
  },
  methods: {
    onSearchInput() {
      this.emitFilters()
    },
    selectType(typeName) {
      this.selectedType = this.selectedType === typeName ? '' : typeName
      HapticFeedback.selection()
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
    },
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion.name
      this.showSuggestions = false
      this.selectedSuggestionIndex = -1
      HapticFeedback.light()
      this.emitFilters()
    },
    hideSuggestions() {
      setTimeout(() => {
        this.showSuggestions = false
        this.selectedSuggestionIndex = -1
      }, 200)
    },
    handleKeydown(event) {
      if (!this.showSuggestions || this.suggestions.length === 0) return
      
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          this.selectedSuggestionIndex = Math.min(
            this.selectedSuggestionIndex + 1,
            this.suggestions.length - 1
          )
          break
        case 'ArrowUp':
          event.preventDefault()
          this.selectedSuggestionIndex = Math.max(
            this.selectedSuggestionIndex - 1,
            -1
          )
          break
        case 'Enter':
          event.preventDefault()
          if (this.selectedSuggestionIndex >= 0) {
            this.selectSuggestion(this.suggestions[this.selectedSuggestionIndex])
          }
          break
        case 'Escape':
          this.showSuggestions = false
          this.selectedSuggestionIndex = -1
          break
      }
    },
    applyQuickFilter(filterType) {
      HapticFeedback.medium()
      switch (filterType) {
        case 'popular':
          this.searchQuery = ''
          this.selectedType = ''
          this.$emit('quick-filter', { type: 'popular', value: ['pikachu', 'charizard', 'blastoise', 'venusaur', 'mew'] })
          break
        case 'starter':
          this.searchQuery = ''
          this.selectedType = ''
          this.$emit('quick-filter', { type: 'starter', value: ['bulbasaur', 'charmander', 'squirtle'] })
          break
        case 'legendary':
          this.searchQuery = ''
          this.selectedType = ''
          this.$emit('quick-filter', { type: 'legendary', value: ['articuno', 'zapdos', 'moltres', 'mewtwo', 'mew'] })
          break
        case 'fire':
        case 'water':
        case 'electric':
          this.searchQuery = ''
          this.selectedType = filterType
          this.emitFilters()
          break
      }
    }
  }
}
</script>

<style scoped>
.pokemon-search {
  margin-bottom: 20px;
}

.quick-filters {
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

.quick-filter-chip {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0.1);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.quick-filter-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

.quick-filter-chip:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* Individual chip colors */
.quick-filter-chip:nth-child(1) { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); }
.quick-filter-chip:nth-child(2) { background: linear-gradient(135deg, #4ecdc4 0%, #44bd32 100%); }
.quick-filter-chip:nth-child(3) { background: linear-gradient(135deg, #feca57 0%, #ff9ff3 100%); }
.quick-filter-chip:nth-child(4) { background: linear-gradient(135deg, #ff9500 0%, #ff6348 100%); }
.quick-filter-chip:nth-child(5) { background: linear-gradient(135deg, #3742fa 0%, #2f3542 100%); }
.quick-filter-chip:nth-child(6) { background: linear-gradient(135deg, #ffd32a 0%, #ff9f1a 100%); }

.search-container {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
}

.search-input-container {
  margin-bottom: 20px;
}

.search-wrapper {
  position: relative;
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

.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-width: 300px;
  background-color: white;
  border: 2px solid #333;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
}

.suggestion-item {
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s ease;
  min-height: 44px;
}

.suggestion-item:hover,
.suggestion-item.active {
  background-color: #f0f0f0;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-name {
  font-weight: 500;
  text-transform: capitalize;
  color: #333;
}

.suggestion-type {
  font-size: 10px;
  text-transform: uppercase;
  background-color: #e0e0e0;
  padding: 2px 6px;
  border-radius: 4px;
  color: #666;
}

/* Dark mode suggestions */
.dark-mode .suggestions-dropdown {
  background-color: #404040;
  border-color: #666;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.dark-mode .suggestion-item {
  border-bottom-color: #555;
}

.dark-mode .suggestion-item:hover,
.dark-mode .suggestion-item.active {
  background-color: #505050;
}

.dark-mode .suggestion-name {
  color: #fff;
}

.dark-mode .suggestion-type {
  background-color: #555;
  color: #ccc;
}

/* Dark mode quick filters */
.dark-mode .quick-filter-chip {
  box-shadow: 0 2px 4px rgba(0,0,0,0.4);
}

.dark-mode .quick-filter-chip:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.5);
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
  min-height: 44px;
  height: auto;
  text-transform: capitalize;
}

/* Pokemon Type Colors with better contrast */
.type-normal { background-color: #A8A878; color: #000; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.type-fire { background-color: #F08030; color: #000; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.type-water { background-color: #6890F0; color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.type-electric { background-color: #F8D030; color: #000; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.type-grass { background-color: #78C850; color: #000; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.type-ice { background-color: #98D8D8; color: #000; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.type-fighting { background-color: #C03028; color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.type-poison { background-color: #A040A0; color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.type-ground { background-color: #E0C068; color: #000; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.type-flying { background-color: #A890F0; color: #000; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.type-psychic { background-color: #F85888; color: #000; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.type-bug { background-color: #A8B820; color: #000; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.type-rock { background-color: #B8A038; color: #000; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.type-ghost { background-color: #705898; color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.type-dragon { background-color: #7038F8; color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.type-dark { background-color: #705848; color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.type-steel { background-color: #B8B8D0; color: #000; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.type-fairy { background-color: #EE99AC; color: #000; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }

.type-btn:not(.is-primary) {
  border: 2px solid rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0.1);
}

.type-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0,0,0,0.4);
}

.type-btn:active {
  transform: scale(0.95);
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
    min-height: 44px;
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
    min-height: 44px;
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
  
  .quick-filters {
    gap: 6px;
    margin-bottom: 10px;
  }
  
  .quick-filter-chip {
    font-size: 10px;
    padding: 6px 12px;
    min-height: 44px;
    min-width: 44px;
  }
}
</style>