import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    statePokemonDataList: [],
    stateFavoritePokemonList: []
  },
  actions: {
    setPokemonData(context, payload) {
      context.commit("setPokemonData", payload);
    },
    setFavoritePokemonList(context, payload) {
      context.commit("setFavoritePokemonList", payload)
    },
    addFavorite(context, payload) {
      context.commit("addFavorite", payload);
    },
    deleteFavorite(context, payload) {
      context.commit("deleteFavorite", payload);
    },
    eraseFavoritePokemonList(context) {
      context.commit("eraseFavoritePokemonList");
    }
  },
  mutations: {
    setPokemonData(state, list) {
      state.statePokemonDataList = list;
    },
    setFavoritePokemonList(state, list) {
      state.stateFavoritePokemonList = list;
    },
    addFavorite(state, name) {
      state.stateFavoritePokemonList.push(name);
    },
    deleteFavorite(state, item) {
      state.stateFavoritePokemonList.splice(item, 1);
    },
    eraseFavoritePokemonList(state) {
      state.stateFavoritePokemonList = [];
    }
  },
});
