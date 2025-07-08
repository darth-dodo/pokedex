<template>
    <div class="select-pokemon-page">
      <img
        src="./../assets/logo-pixel.gif"
        alt="pokémon"
        @click="logoClickCount++"
        @dblclick="secretCode"
        class="logo-image"
      >
      <pokemon-search
        :total-count="totalPokemonCount"
        :filtered-count="filteredPokemonCount"
        :all-pokemon="statePokemonDataList"
        @filter-change="handleFilterChange"
      />
      <div class="select-pokemon-content">
        <pokemon-list
          :pokemon-list="filteredPokemonList"
          :favorites="stateFavoritePokemonList"
          :is-loading="isLoading"
        />
        <summary-favorites
          :pokemon-list="filteredPokemonList"
          :favorites="stateFavoritePokemonList"
        />
      </div>
      
      <pokemon-pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-items="filteredPokemonCount"
        :items-per-page="10"
        @page-change="handlePageChange"
      />
    </div>
  </template>
  
  <script>
  import PokemonList from '@/components/PokemonList'
  import SummaryFavorites from '@/components/SummaryFavorites'
  import PokemonSearch from '@/components/PokemonSearch'
  import PokemonPagination from '@/components/PokemonPagination'
  import { mapState, mapActions, mapGetters } from 'vuex'
  
  export default {
      components: {
          PokemonList,
          SummaryFavorites,
          PokemonSearch,
          PokemonPagination,
      },
      data() {
          return {
              logoClickCount: 0,
              secretSequence: [],
              konamiCode: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'],
              isLoading: true
          }
      },
      computed: {
          ...mapState(['statePokemonDataList', 'stateFavoritePokemonList']),
          ...mapGetters(['filteredPokemonList', 'filteredPokemonCount', 'totalPokemonCount', 'totalPages', 'currentPage']),
      },
      async created() {
          this.isLoading = true
          const pokemonData = await this.getPokemonData()
          this.setPokemonData(pokemonData)
          
          // Fetch detailed data for all Pokemon
          const detailedData = await this.getDetailedPokemonData(pokemonData)
          this.setDetailedPokemonList(detailedData)
          this.isLoading = false
      },
      mounted() {
          document.addEventListener('keydown', this.handleKeydown)
      },
      beforeDestroy() {
          document.removeEventListener('keydown', this.handleKeydown)
      },
      methods: {
          async getPokemonData() {
              const data = await fetch(
                  'https://pokeapi.co/api/v2/pokemon?limit=151'
              )
              const json = await data.json()
              return json.results
          },
          secretCode() {
              if (this.logoClickCount >= 10) {
                  alert('🎉 Logo Master! You clicked the logo 10 times! Try the Konami Code now! 🎉')
                  this.logoClickCount = 0
              }
          },
          handleKeydown(event) {
              this.secretSequence.push(event.code)
              if (this.secretSequence.length > this.konamiCode.length) {
                  this.secretSequence.shift()
              }
              if (this.secretSequence.length === this.konamiCode.length && 
                  this.secretSequence.every((key, index) => key === this.konamiCode[index])) {
                  this.activateKonamiCode()
                  this.secretSequence = []
              }
          },
          activateKonamiCode() {
              alert('🎮 KONAMI CODE ACTIVATED! 🎮\n30 Extra Lives Granted!\n(Just kidding, but you found the secret!)')
              document.body.style.transform = 'rotate(360deg)'
              document.body.style.transition = 'transform 2s ease'
              setTimeout(() => {
                  document.body.style.transform = 'rotate(0deg)'
              }, 2000)
          },
          async getDetailedPokemonData(pokemonList) {
              const detailedData = await Promise.all(
                  pokemonList.map(async (pokemon, index) => {
                      try {
                          const response = await fetch(pokemon.url)
                          const data = await response.json()
                          return {
                              ...data,
                              originalIndex: index
                          }
                      } catch (error) {
                          console.error(`Error fetching data for ${pokemon.name}:`, error)
                          return {
                              id: index + 1,
                              name: pokemon.name,
                              types: [],
                              sprites: { front_default: null },
                              originalIndex: index
                          }
                      }
                  })
              )
              return detailedData
          },
          handleFilterChange(filters) {
              this.setSearchQuery(filters.search)
              this.setSelectedType(filters.type)
              this.setCurrentPage(1) // Reset to first page when filtering
          },
          handlePageChange(page) {
              this.setCurrentPage(page)
              // Scroll to top when changing pages
              window.scrollTo({ top: 0, behavior: 'smooth' })
          },
          ...mapActions(['setPokemonData', 'setDetailedPokemonList', 'setSearchQuery', 'setSelectedType', 'setCurrentPage']),
      },
  }
  </script>
  
  <style scoped>
  .select-pokemon-page {
      text-align: center;
      padding: 20px;
      min-height: 100vh;
      box-sizing: border-box;
  }

  .logo-image {
      cursor: pointer;
      transition: transform 0.3s ease;
      display: block;
      margin: 0 auto 20px auto;
      max-width: 100%;
      height: auto;
  }

  .logo-image:hover {
      transform: scale(1.1);
  }

  .logo-image:active {
      transform: scale(0.9);
  }
  
  .select-pokemon-content {
      text-align: left;
      display: flex;
      justify-content: space-evenly;
      gap: 20px;
      margin-top: 20px;
  }

  @media screen and (max-width: 800px) {
      .select-pokemon-page {
          padding: 15px;
      }
      
      .select-pokemon-content {
          flex-direction: column-reverse;
          gap: 20px;
      }
  }

  @media screen and (max-width: 480px) {
      .select-pokemon-page {
          padding: 10px;
      }
      
      .logo-image {
          margin-bottom: 15px;
          max-width: 90%;
      }
      
      .select-pokemon-content {
          gap: 15px;
          margin-top: 15px;
      }
  }
  </style>
  
