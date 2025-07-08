<template>
    <div class="select-pokemon-page">
      <img
        src="./../assets/logo-pixel.gif"
        alt="pokémon"
      >
      <pokemon-search
        :total-count="totalPokemonCount"
        :filtered-count="filteredPokemonCount"
        @filter-change="handleFilterChange"
      />
      <div class="select-pokemon-content">
        <pokemon-list
          :pokemon-list="filteredPokemonList"
          :favorites="stateFavoritePokemonList"
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
        :items-per-page="20"
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
      computed: {
          ...mapState(['statePokemonDataList', 'stateFavoritePokemonList']),
          ...mapGetters(['filteredPokemonList', 'filteredPokemonCount', 'totalPokemonCount', 'totalPages', 'currentPage']),
      },
      async created() {
          const pokemonData = await this.getPokemonData()
          this.setPokemonData(pokemonData)
          
          // Fetch detailed data for all Pokemon
          const detailedData = await this.getDetailedPokemonData(pokemonData)
          this.setDetailedPokemonList(detailedData)
      },
      methods: {
          async getPokemonData() {
              const data = await fetch(
                  'https://pokeapi.co/api/v2/pokemon?limit=151'
              )
              const json = await data.json()
              return json.results
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
  }

  .select-pokemon-page > img {
      display: block;
      margin: 0 auto 20px auto;
      max-width: 100%;
      height: auto;
  }
  
  .select-pokemon-content {
      text-align: left;
      display: flex;
      justify-content: space-evenly;
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
      
      .select-pokemon-page > img {
          margin-bottom: 15px;
          max-width: 90%;
      }
      
      .select-pokemon-content {
          gap: 15px;
      }
  }
  </style>
  
