import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    statePokemonDataList: [],
    stateFavoritePokemonList: [],
    stateDetailedPokemonList: [],
    stateSearchQuery: '',
    stateSelectedType: ''
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
    },
    setDetailedPokemonList(context, payload) {
      context.commit("setDetailedPokemonList", payload);
    },
    setSearchQuery(context, payload) {
      context.commit("setSearchQuery", payload);
    },
    setSelectedType(context, payload) {
      context.commit("setSelectedType", payload);
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
    },
    setDetailedPokemonList(state, list) {
      state.stateDetailedPokemonList = list;
    },
    setSearchQuery(state, query) {
      state.stateSearchQuery = query;
    },
    setSelectedType(state, type) {
      state.stateSelectedType = type;
    }
  },
  getters: {
    filteredPokemonList(state) {
      let filtered = [...state.stateDetailedPokemonList];
      
      // Filter by search query
      if (state.stateSearchQuery) {
        filtered = filtered.filter(pokemon => 
          pokemon.name.toLowerCase().includes(state.stateSearchQuery.toLowerCase())
        );
      }
      
      // Filter by type
      if (state.stateSelectedType) {
        filtered = filtered.filter(pokemon => 
          pokemon.types && pokemon.types.some(type => 
            type.type.name === state.stateSelectedType
          )
        );
      }
      
      return filtered;
    },
    filteredPokemonCount(state, getters) {
      return getters.filteredPokemonList.length;
    },
    totalPokemonCount(state) {
      return state.stateDetailedPokemonList.length;
    }
  }
});
