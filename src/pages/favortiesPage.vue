/* eslint-disable *
<template>
    <div>
        <h1 class="overview-favorite-pokemon__title">Your favorite Pokémon</h1>
        <router-link class="nes-btn" to="/">Go back</router-link>
        <div class="overview-favortite-pokemon"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
    export default {
        computed: {
            ...mapState(['stateFavoritePokemonList'])
        }
    }
</script>

<style scoped>
.overview-favorite-pokemon {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.overview-favorite-pokemon__title {
    margin-top: 10px;
    text-align: center;
}
</style>