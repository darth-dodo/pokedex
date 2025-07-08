<template>
    <div>
      <h2>Your chosen favorite Pokémon</h2>
      <p v-if="favoriteListLength < maximumList">
        I can't choose, help me <button
          class="nes-btn is-success"
          @click="startInterval"
          @dblclick="konamiEasterEgg"
        >
          Pick Pokémon
        </button>
      </p>
      <template>
        <p
          v-for="(pokemonName, index) in favorites"
          :key="index"
          class="chosen-pokemon"
        >
          <img
            src="../assets/pokeball.png"
            alt="pokeball"
          >
          {{ pokemonName }}
        </p>
      </template>
      <p v-if="favoriteListLength > 1 && favoriteListLength < maximumList">
        You can add {{ maximumList - favoriteListLength }} more Pokémon
      </p>
      <p v-if="favoriteListLength > 9">
        Your list is full!
      </p>
      <p v-if="favoriteListLength > 9">
        Do you want to <button
          class="nes-btn is-error"
          @click="emptyFavoritePokemonList"
        >
          Delete
        </button> the list?
      </p>
      <router-link
        v-if="favoriteListLength > 0"
        class="nes-btn"
        to="/favorites"
      >
        View your favorite Pokémon
      </router-link>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  import HapticFeedback from '../utils/haptics'
  
      export default {
          name: 'SummaryFavorites',
          props: {
            pokemonList: {
              type: Array,
              required: true
            },
            favorites: {
              type: Array,
              required: true
            }
          },
          data: function() {
              return {
                  maximumList: 10,
                  clickCount: 0
              }
          },
          computed: {
              favoriteListLength() {
                  return this.favorites.length
              }
          },
          methods: {
            startInterval() {
              const self = this
              const intervalID = window.setInterval(pickRandomPokemonOrClearInterval, 500)
              function pickRandomPokemonOrClearInterval() {
                if(self.favoriteListLength < self.maximumList) {
                  self.pickRandomPokemon()
                } else {
                  clearInterval(intervalID)
                }
              }
  
            },
            pickRandomPokemon() {
              const list = this.pokemonList.filter(function(pokemon){
                return !this.favorites.includes(pokemon.name)
              }, this)
              
              const number = Math.floor(Math.random() * Math.floor(list.length));
              this.addFavorite(list[number].name)
            },
            emptyFavoritePokemonList() {
              this.eraseFavoritePokemonList()
              HapticFeedback.error()
              this.clickCount++
              if (this.clickCount === 5) {
                  HapticFeedback.notification()
                  alert('🗑️ You really like clearing lists! Here\'s a secret: Try clicking the logo 10 times! 🗑️')
                  this.clickCount = 0
              }
            },
            konamiEasterEgg() {
              HapticFeedback.notification()
              const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav')
              audio.play().catch(() => {})
              alert('🎮 Konami Code Master! You found the secret double-click! 🎮')
            },
            ...mapActions([
                'addFavorite', 'eraseFavoritePokemonList'
            ])
          }
      }
  </script>
  
  <style scoped>
  .chosen-pokemon {
      text-transform: capitalize;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      padding: 8px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      transition: background-color 0.3s ease;
  }

  .chosen-pokemon:hover {
      background-color: rgba(255, 255, 255, 0.2);
  }

  .chosen-pokemon img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      object-fit: contain;
  }

  .nes-btn {
      margin: 10px 5px;
      min-height: 44px;
      min-width: 44px;
  }

  @media screen and (max-width: 768px) {
      .chosen-pokemon {
          padding: 6px;
          margin-bottom: 8px;
      }

      .chosen-pokemon img {
          width: 16px;
          height: 16px;
          margin-right: 8px;
      }

      .nes-btn {
          margin: 8px 3px;
          font-size: 12px;
          min-height: 44px;
          min-width: 44px;
      }
  }

  @media screen and (max-width: 480px) {
      .chosen-pokemon {
          padding: 5px;
          margin-bottom: 5px;
          font-size: 12px;
      }

      .chosen-pokemon img {
          width: 14px;
          height: 14px;
          margin-right: 6px;
      }

      .nes-btn {
          margin: 5px 2px;
          font-size: 10px;
          padding: 5px 10px;
          min-height: 44px;
          min-width: 44px;
      }
  }
  </style>