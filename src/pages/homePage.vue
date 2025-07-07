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
    </div>
  </template>
  
  <script>
  import PokemonList from '@/components/PokemonList'
  import SummaryFavorites from '@/components/SummaryFavorites'
  import PokemonSearch from '@/components/PokemonSearch'
  import { mapState, mapActions, mapGetters } from 'vuex'
  
  export default {
      components: {
          PokemonList,
          SummaryFavorites,
          PokemonSearch,
      },
      computed: {
          ...mapState(['statePokemonDataList', 'stateFavoritePokemonList']),
          ...mapGetters(['filteredPokemonList', 'filteredPokemonCount', 'totalPokemonCount']),
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
          },
          ...mapActions(['setPokemonData', 'setDetailedPokemonList', 'setSearchQuery', 'setSelectedType']),
      },
  }
  </script>
  
  <style scoped>
  .select-pokemon-page {
      text-align: center;
  }
  
  .select-pokemon-content {
      text-align: left;
      display: flex;
      justify-content: space-evenly;
  }

  @media screen and (max-width: 800px) {
      .select-pokemon-content {
          flex-direction: column-reverse;
      }
  }
  </style>
  
