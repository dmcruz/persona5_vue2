import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedPersona: null
  },
  mutations: {
    SET_SELECTED_PERSONA(state, persona) {
      state.selectedPersona = persona;
    }
  },
  actions: {
    selectPersona({ commit }, persona) {
      commit('SET_SELECTED_PERSONA', persona);
    }
  },
  modules: {
  }
})
