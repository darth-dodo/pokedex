<template>
    <div
      v-if="pokemonData && pokemonDescription"
      class="pokemon-card nes-container is-rounded"
    >
      <div class="pokemon-card__image">
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`"
          :alt="pokemonData.name"
        >
      </div>
      <div class="pokemon-card__text">
        <p>Name: {{ pokemonData.name }}</p>
        <p>No. {{ pokemonData.id }}</p>
        <p>
          Type: <span
            v-for="(typesOfPokemon, index) in pokemonData.types"
            :key="`type${index}`"
          >
            {{ typesOfPokemon.type.name }}
          </span>
        </p>
        <p>{{ pokemonDescription[0].flavor_text }}</p>
      </div>
    </div>
  </template>
  
  <script>
      export default {
        name: 'PokemonCard',
        props: {
          pokemonName: {
            type: String,
            default: ''
          }
        },
        data: function () {
          return {
            pokemonData: null,
            pokemonDescription: null
          }
        },
        async created () {
          if (this.pokemonName) {
            this.pokemonData = await this.getDataSpecificPokemon(this.pokemonName)
            this.pokemonDescription = await this.getPokemonDescription(this.pokemonData)
        }
      },
        methods: {
          async getDataSpecificPokemon(name) {
            const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
            const json = await data.json()
            return json
          },
          async getPokemonDescription(pokemonData) {
            const data = await fetch(`${pokemonData.species.url}`)
            const json = await data.json()
            return json.flavor_text_entries.filter(function(element) {
              return element.language.name === 'en'
            })
          }
        }
          
      }
  </script>
  
  <style scoped>
  .pokemon-card {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 10px;
    padding: 20px;
    max-width: 100%;
    box-sizing: border-box;
  }

  .pokemon-card__image {
    flex: 0 0 auto;
    margin-right: 15px;
  }

  .pokemon-card__image img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }

  .pokemon-card__text {
    flex: 1;
    text-align: left;
  }

  .pokemon-card__text p {
    margin: 8px 0;
    word-wrap: break-word;
  }

  @media screen and (max-width: 768px) {
    .pokemon-card {
      flex-direction: column;
      text-align: center;
      margin: 10px 5px;
      padding: 15px;
    }

    .pokemon-card__image {
      margin-right: 0;
      margin-bottom: 10px;
    }

    .pokemon-card__image img {
      width: 80px;
      height: 80px;
    }

    .pokemon-card__text {
      text-align: center;
    }
  }

  @media screen and (max-width: 480px) {
    .pokemon-card {
      margin: 5px;
      padding: 10px;
    }

    .pokemon-card__image img {
      width: 60px;
      height: 60px;
    }

    .pokemon-card__text p {
      font-size: 12px;
      margin: 5px 0;
    }
  }
  </style>