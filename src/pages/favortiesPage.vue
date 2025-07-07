<template>
    <div>
      <h1 class="overview-favorite-pokemon__title" @click="titleClickCount++">
        Your favorite Pokémon
      </h1>
      <router-link
        class="nes-btn"
        to="/"
      >
        Go back
      </router-link>
      <div class="overview-favorite-pokemon">
        <pokemon-card
          v-for="(pokemon, index) in stateFavoritePokemonList"
          :key="index"
          :pokemon-name="pokemon"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  import PokemonCard from '@/components/PokemonCard'
  
      export default {
          components: {
              PokemonCard
          },
          data() {
              return {
                  titleClickCount: 0
              }
          },
          computed: {
              ...mapState([
              'stateFavoritePokemonList'
              ])
          },
          watch: {
              titleClickCount(newVal) {
                  if (newVal === 7) {
                      alert('🏆 Congratulations! You found the final easter egg! You clicked the title 7 times! 🏆')
                      this.titleClickCount = 0
                  }
              }
          }
      }
  </script>
  
  <style scoped>
  .overview-favorite-pokemon {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
  }
  
  .overview-favorite-pokemon__title {
      margin-top: 10px;
      text-align: center;
      cursor: pointer;
      transition: color 0.3s ease;
      user-select: none;
  }

  .overview-favorite-pokemon__title:hover {
      color: #0066cc;
  }

  .nes-btn {
      margin: 20px auto;
      display: block;
      width: fit-content;
  }

  @media screen and (max-width: 860px) {
    .overview-favorite-pokemon {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      padding: 15px;
      gap: 15px;
    }
  }

  @media screen and (max-width: 480px) {
    .overview-favorite-pokemon {
      padding: 10px;
      gap: 10px;
    }

    .overview-favorite-pokemon__title {
      font-size: 20px;
      margin-top: 5px;
    }

    .nes-btn {
      margin: 15px auto;
      font-size: 12px;
    }
  }
  </style>