<template>
    <div class="select-pokemon-page">
      <img
        src="./../assets/logo-pixel.gif"
        alt="pokémon"
      >
      <div class="select-pokemon-content">
        <pokemon-list
          :pokemon-list="statePokemonDataList"
          :favorites="stateFavoritePokemonList"
        />
        <summary-favorites
          :pokemon-list="statePokemonDataList"
          :favorites="stateFavoritePokemonList"
        />
      </div>
    </div>
  </template>
  
  <script>
  import PokemonList from '@/components/PokemonList'
  import SummaryFavorites from '@/components/SummaryFavorites'
  import { mapState, mapActions } from 'vuex'
  
  export default {
      components: {
          PokemonList,
          SummaryFavorites,
      },
      computed: {
          ...mapState(['statePokemonDataList', 'stateFavoritePokemonList']),
      },
      async created() {
          const pokemonData = await this.getPokemonData()
          this.setPokemonData(pokemonData)
      },
      methods: {
          async getPokemonData() {
              const data = await fetch(
                  'https://pokeapi.co/api/v2/pokemon?limit=151'
              )
              const json = await data.json()
              return json.results
          },
          ...mapActions(['setPokemonData']),
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
  
