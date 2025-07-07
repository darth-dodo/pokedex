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
        <span>{{ pokemon.name }}</span>
        <img
          :key="pokemon.url"
          :src="
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
              1}.png`
          "
          alt="Pokemon`"
        >
        <a
          v-show="!favorites.includes(pokemon.name)"
          class="nes-btn"
          :class="{ 'is-disabled': favoriteListLength === 10 }"
          @click="setFavorites(pokemon.name), playPokemonCry(index + 1), checkEasterEgg(pokemon.name)"
        >Pick me!</a>
        <button
          v-show="favorites.includes(pokemon.name)"
          class="nes-btn is-error"
          @click="setFavorites(pokemon.name), playPokemonCry(index + 1)"
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

  .pokemon-list-item > span {
    width: 40%;
    padding-left: 10px;
    text-align: left;
  }

  .pokemon-list-item img {
      width: 50px;
      height: 50px;
      object-fit: contain;
  }

  .nes-btn {
      width: 120px;
      height: 70px;
  }

  @media screen and (max-width: 768px) {
      .pokemon-list {
          padding: 15px;
      }

      .pokemon-list-item {
          flex-wrap: wrap;
          gap: 10px;
          padding: 8px;
      }

      .pokemon-list-item > span {
          width: 50%;
          padding-left: 5px;
      }

      .pokemon-list-item img {
          width: 40px;
          height: 40px;
      }

      .nes-btn {
          width: 100px;
          height: 50px;
          font-size: 12px;
      }
  }

  @media screen and (max-width: 480px) {
      .pokemon-list {
          padding: 10px;
      }

      .pokemon-list-item {
          flex-direction: column;
          text-align: center;
          padding: 10px;
      }

      .pokemon-list-item > span {
          width: 100%;
          padding-left: 0;
          margin-bottom: 5px;
      }

      .pokemon-list-item img {
          width: 60px;
          height: 60px;
          margin-bottom: 5px;
      }

      .nes-btn {
          width: 90px;
          height: 40px;
          font-size: 10px;
      }
  }
  </style>