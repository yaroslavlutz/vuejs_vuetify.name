export default {
  state: {
    loading: false,
    error: null
  },
  mutations: { 
    setLoadingMutate (state, payload) {
      state.loading = payload
    },
    setErrorMutate (state, payload) {
      state.error = payload
    },
    setClearErrorMutate (state) {
      state.error = null
    }
  },
  getters: {
    getLoadingFunc: function (state) { 
      return state.loading
    },

    getErrorFunc: function (state) { 
      return state.error
    }
  },
  actions: {
    // some code if you want..
    setLoadingAction: function ({commit}, payload) { 
      commit('setLoadingMutate', payload)
    },
    setErrorAction: function ({commit}, payload) {
      commit('setErrorMutate', payload)
    },
    clearErrorAction: function ({commit}) {
      commit('setClearErrorMutate')
    }
  }
}
