import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    statePokemonDataList: [],
    stateFavoritePokemonList: [],
    stateDetailedPokemonList: [],
    stateSearchQuery: '',
    stateSelectedType: '',
    stateCurrentPage: 1,
    stateItemsPerPage: 20
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
    },
    setCurrentPage(context, payload) {
      context.commit("setCurrentPage", payload);
    },
    setItemsPerPage(context, payload) {
      context.commit("setItemsPerPage", payload);
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
    },
    setCurrentPage(state, page) {
      state.stateCurrentPage = page;
    },
    setItemsPerPage(state, itemsPerPage) {
      state.stateItemsPerPage = itemsPerPage;
    }
  },
  getters: {
    allFilteredPokemonList(state) {
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
    filteredPokemonList(state, getters) {
      const allFiltered = getters.allFilteredPokemonList;
      const start = (state.stateCurrentPage - 1) * state.stateItemsPerPage;
      const end = start + state.stateItemsPerPage;
      return allFiltered.slice(start, end);
    },
    filteredPokemonCount(state, getters) {
      return getters.allFilteredPokemonList.length;
    },
    totalPokemonCount(state) {
      return state.stateDetailedPokemonList.length;
    },
    totalPages(state, getters) {
      return Math.ceil(getters.filteredPokemonCount / state.stateItemsPerPage);
    },
    currentPage(state) {
      return state.stateCurrentPage;
    }
  }
});
