import Vue from 'vue'
import Vuex from 'vuex'
import { filterAll } from "@/assets/constants.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    allProducts: {},
    filteredProducts: [],
    dropdownValue: null,
    isAuth: false,
    adminStep: 0,
    showLoader: true,
  },
  mutations: {
    saveCategories(state, value) {
      state.categories = value
    },
    saveFilteredProducts(state, category) {
      if (category === undefined || category === filterAll) {
        state.filteredProducts = state.allProducts
      } else {
        state.filteredProducts = {
          [category]: state.allProducts[category]
        }
      }
    },
    saveDropdownSelect(state, value) {
      state.dropdownValue = value
    },
    onIsAuthChange(state, value) {
      state.isAuth = value
    },
    adminStepChange(state, value) {
      state.adminStep = value
    },
    showLoaderChange(state, value) {
      state.showLoader = value
    },
    saveAllProducts(state, value) {
      state.allProducts = value
    },
  },
  actions: {
  },
  modules: {
  }
})
