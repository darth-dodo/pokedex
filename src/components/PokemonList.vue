<template>
    <div class="pokemon-list">
      <h2>Choose your Pokémon</h2>
      <p
        v-for="(pokemon, index) in pokemonList"
        :key="pokemon.url"
        class="pokemon-list-item"
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
        <img
          :key="pokemon.url || pokemon.id"
          :src="
            pokemon.sprites?.front_default || 
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id || index + 1}.png`
          "
          :alt="pokemon.name"
          class="pokemon-sprite"
        >
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
      </p>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  
  export default {
      name: 'PokemonList',
      props: {
          pokemonList: {
              type: Array,
              required: true,
          },
          favorites: {
              type: Array,
              required: true,
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
                  return
              }
              if (this.favoriteListLength < 10) {
                  this.addFavorite(name)
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
                  setTimeout(() => {
                      alert('⚡ Pika Pika! You found the electric mouse! ⚡')
                  }, 500)
              }
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
    padding: 2px 6px;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    border: 1px solid #333;
  }

  .pokemon-sprite {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }

  /* Pokemon Type Colors */
  .type-normal { background-color: #A8A878; }
  .type-fire { background-color: #F08030; }
  .type-water { background-color: #6890F0; }
  .type-electric { background-color: #F8D030; color: #333; }
  .type-grass { background-color: #78C850; }
  .type-ice { background-color: #98D8D8; color: #333; }
  .type-fighting { background-color: #C03028; }
  .type-poison { background-color: #A040A0; }
  .type-ground { background-color: #E0C068; color: #333; }
  .type-flying { background-color: #A890F0; }
  .type-psychic { background-color: #F85888; }
  .type-bug { background-color: #A8B820; }
  .type-rock { background-color: #B8A038; }
  .type-ghost { background-color: #705898; }
  .type-dragon { background-color: #7038F8; }
  .type-dark { background-color: #705848; }
  .type-steel { background-color: #B8B8D0; color: #333; }
  .type-fairy { background-color: #EE99AC; color: #333; }

  .nes-btn {
      width: 120px;
      height: 70px;
  }

  /* Responsive Design */
  @media screen and (max-width: 768px) {
    .pokemon-list {
        padding: 15px;
    }

    .pokemon-list-item {
      flex-direction: column;
      text-align: center;
      padding: 15px;
      margin-bottom: 20px;
    }

    .pokemon-info {
      width: 100%;
      padding-left: 0;
      text-align: center;
      margin-bottom: 10px;
    }

    .pokemon-name {
      font-size: 16px;
      margin-bottom: 8px;
    }

    .pokemon-types {
      justify-content: center;
      gap: 6px;
    }

    .type-badge {
      font-size: 11px;
      padding: 3px 8px;
    }

    .pokemon-sprite {
      width: 80px;
      height: 80px;
      margin: 10px 0;
    }

    .nes-btn {
      width: 100px;
      height: 50px;
      font-size: 12px;
      margin-top: 10px;
    }
  }

  @media screen and (max-width: 480px) {
    .pokemon-list {
        padding: 10px;
    }

    .pokemon-list-item {
      padding: 20px;
      margin-bottom: 25px;
    }

    .pokemon-name {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .pokemon-types {
      gap: 8px;
    }

    .type-badge {
      font-size: 12px;
      padding: 4px 10px;
    }

    .pokemon-sprite {
      width: 100px;
      height: 100px;
      margin: 15px 0;
    }

    .nes-btn {
      width: 120px;
      height: 60px;
      font-size: 14px;
      margin-top: 15px;
    }
  }
  </style>