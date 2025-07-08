<template>
    <div class="pokemon-list">
      <h2>Choose your Pokémon</h2>
      <skeleton-loader v-if="isLoading" :count="10" />
      <virtual-scroller
        v-else
        :items="pokemonList"
        :item-height="getItemHeight()"
        :container-height="getContainerHeight()"
        :buffer="3"
        class="pokemon-virtual-list"
      >
        <template #default="{ item: pokemon, index }">
          <div
            class="pokemon-list-item"
            :key="pokemon.url"
          >
        {{ index + 1 + '. ' }}
        <i
          v-if="favorites.includes(pokemon.name)"
          class="nes-icon is-small heart"
        />
        <i
          v-else
          class="nes-icon is-small heart is-empty"
        />
        <div class="pokemon-info">
          <span class="pokemon-name">{{ pokemon.name }}</span>
          <div class="pokemon-types" v-if="pokemon.types">
            <span 
              v-for="type in pokemon.types" 
              :key="type.type.name"
              class="type-badge"
              :class="`type-${type.type.name}`"
            >
              {{ type.type.name }}
            </span>
          </div>
        </div>
        <progressive-image
          :key="pokemon.url || pokemon.id"
          :src="
            pokemon.sprites?.front_default || 
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id || index + 1}.png`
          "
          :alt="pokemon.name"
          class-name="pokemon-sprite"
          :placeholder-color="getPokemonColor(pokemon.types)"
        />
        <a
          v-show="!favorites.includes(pokemon.name)"
          class="nes-btn"
          :class="{ 'is-disabled': favoriteListLength === 10 }"
          @click="setFavorites(pokemon.name), playPokemonCry(pokemon.id || index + 1), checkEasterEgg(pokemon.name)"
        >Pick me!</a>
        <button
          v-show="favorites.includes(pokemon.name)"
          class="nes-btn is-error"
          @click="setFavorites(pokemon.name), playPokemonCry(pokemon.id || index + 1)"
        >
          Remove
        </button>
          </div>
        </template>
      </virtual-scroller>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  import SkeletonLoader from './SkeletonLoader'
  import ProgressiveImage from './ProgressiveImage'
  import VirtualScroller from './VirtualScroller'
  import HapticFeedback from '../utils/haptics'
  
  export default {
      name: 'PokemonList',
      components: {
          SkeletonLoader,
          ProgressiveImage,
          VirtualScroller,
      },
      props: {
          pokemonList: {
              type: Array,
              required: true,
          },
          favorites: {
              type: Array,
              required: true,
          },
          isLoading: {
              type: Boolean,
              default: false,
          },
      },
      computed: {
          favoriteListLength() {
              return this.favorites.length
          },
      },
      methods: {
          setFavorites(name) {
              if (this.favorites.includes(name)) {
                  const indexInArray = this.favorites.indexOf(name)
                  this.deleteFavorite(indexInArray)
                  HapticFeedback.light()
                  return
              }
              if (this.favoriteListLength < 10) {
                  this.addFavorite(name)
                  HapticFeedback.success()
              } else {
                  HapticFeedback.error()
              }
          },
          playPokemonCry(pokemonId) {
              const audio = new Audio(
                  `https://pokemoncries.com/cries-old/${pokemonId}.mp3`
              )
              audio.play()
          },
          checkEasterEgg(pokemonName) {
              if (pokemonName === 'pikachu') {
                  HapticFeedback.notification()
                  setTimeout(() => {
                      alert('⚡ Pika Pika! You found the electric mouse! ⚡')
                  }, 500)
              }
          },
          getPokemonColor(types) {
              if (!types || types.length === 0) return '#f0f0f0'
              const typeColors = {
                  normal: '#A8A878',
                  fire: '#F08030',
                  water: '#6890F0',
                  electric: '#F8D030',
                  grass: '#78C850',
                  ice: '#98D8D8',
                  fighting: '#C03028',
                  poison: '#A040A0',
                  ground: '#E0C068',
                  flying: '#A890F0',
                  psychic: '#F85888',
                  bug: '#A8B820',
                  rock: '#B8A038',
                  ghost: '#705898',
                  dragon: '#7038F8',
                  dark: '#705848',
                  steel: '#B8B8D0',
                  fairy: '#EE99AC'
              }
              return typeColors[types[0].type.name] || '#f0f0f0'
          },
          getItemHeight() {
              if (window.innerWidth <= 480) return 140
              if (window.innerWidth <= 768) return 160
              return 120
          },
          getContainerHeight() {
              return Math.min(window.innerHeight - 300, 600)
          },
          ...mapActions(['addFavorite', 'deleteFavorite']),
      },
  }
  </script>
  
  <style scoped>
  .pokemon-list {
      text-transform: capitalize;
      box-sizing: border-box;
      padding: 20px;
  }
  
  .pokemon-virtual-list {
      height: 600px;
      max-height: calc(100vh - 300px);
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 0.05);
  }
  
  .pokemon-list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
      padding: 10px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      transition: background-color 0.3s ease;
  }

  .pokemon-list-item:hover {
      background-color: rgba(255, 255, 255, 0.2);
  }

  .pokemon-info {
    width: 40%;
    padding-left: 10px;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .pokemon-name {
    font-weight: bold;
    font-size: 14px;
  }

  .pokemon-types {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }

  .type-badge {
    font-size: 10px;
    padding: 8px 12px;
    border-radius: 8px;
    font-weight: bold;
    text-transform: uppercase;
    border: 2px solid rgba(0,0,0,0.2);
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0.1);
  }
  
  .type-badge:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0,0,0,0.4);
  }
  
  .type-badge:active {
    transform: scale(0.95);
  }

  .pokemon-sprite {
    width: 50px;
    height: 50px;
    object-fit: contain;
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

  .nes-btn {
      width: 120px;
      height: 70px;
      min-height: 44px;
      min-width: 44px;
  }

  /* Responsive Design */
  @media screen and (max-width: 768px) {
    .pokemon-list {
        padding: 15px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .pokemon-list > h2 {
        width: 100%;
        margin-bottom: 20px;
    }

    .pokemon-list-item {
      flex-direction: column;
      text-align: center;
      padding: 15px;
      margin-bottom: 10px;
      width: calc(50% - 5px);
      box-sizing: border-box;
    }

    .pokemon-info {
      width: 100%;
      padding-left: 0;
      text-align: center;
      margin-bottom: 10px;
    }

    .pokemon-name {
      font-size: 14px;
      margin-bottom: 6px;
    }

    .pokemon-types {
      justify-content: center;
      gap: 4px;
    }

    .type-badge {
      font-size: 9px;
      padding: 6px 10px;
      min-height: 44px;
      min-width: 44px;
    }

    .pokemon-sprite {
      width: 60px;
      height: 60px;
      margin: 8px 0;
    }

    .nes-btn {
      width: 80px;
      height: 44px;
      min-height: 44px;
      min-width: 44px;
      font-size: 10px;
      margin-top: 8px;
    }
  }

  @media screen and (max-width: 480px) {
    .pokemon-list {
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .pokemon-list > h2 {
        width: 100%;
        margin-bottom: 15px;
    }

    .pokemon-list-item {
      flex-direction: column;
      text-align: center;
      padding: 12px;
      margin-bottom: 8px;
      width: calc(50% - 4px);
      box-sizing: border-box;
    }

    .pokemon-info {
      width: 100%;
      padding-left: 0;
      text-align: center;
      margin-bottom: 8px;
    }

    .pokemon-name {
      font-size: 13px;
      margin-bottom: 5px;
    }

    .pokemon-types {
      justify-content: center;
      gap: 3px;
    }

    .type-badge {
      font-size: 8px;
      padding: 6px 8px;
      min-height: 44px;
      min-width: 44px;
    }

    .pokemon-sprite {
      width: 50px;
      height: 50px;
      margin: 6px 0;
    }

    .nes-btn {
      width: 70px;
      height: 44px;
      min-height: 44px;
      min-width: 44px;
      font-size: 9px;
      margin-top: 6px;
    }
  }
  </style>