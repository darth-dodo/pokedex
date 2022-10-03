<template>
    <div class="select-pokemon-page">
        <img src="./../assets/logo-pixel.gif"
        alt="pokémon"/>
        <h1>Home Page</h1>
        <div class="select-pokemon-content" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
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
                'https://pokeapi.co/api/v2/pokemon?limit=150'
            )
            const apiResult = await data.json()
            return apiResult.results
        },
        ...mapActions(['setPokemonData', 'addFavorite', 'deleteFavorite', 'eraseFavoritePokemonList']),
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
</style>