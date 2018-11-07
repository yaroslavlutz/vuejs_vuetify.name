export default {
  /* `state` -Объект.котоый описываеи все состояние нашего приложения */
  state: {
    loading: false,
    error: null
  },
  mutations: { // по-сути это setters. Через `mutations`идет изменение данных(изменение `state`) при использовании `Store`
    /* 1) Если в `mutations` нужно передать не просто одиночное зн-е,то сюда передается Объект с нужными данными,который предварительно нужно сформировать.
      2) В `mutations` не передается и не пишется никаких асинхронных запросов. Для этого есть `actions` */
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
    /* #Возвращаем Loading..` */
    getLoadingFunc: function (state) { // OR: getLoadingFunc() {..}
      return state.loading
    },
    /* #Возвращаем Error..` */
    getErrorFunc: function (state) { // OR: getErrorFunc() {..}
      return state.error
    }
  },
  actions: {
    /* `context` - спец.св-во
     `data / dataObject` - те данные,которые мы получаем и с кот.нужно работать */
    // some code if you want..
    setLoadingAction: function ({commit}, payload) { // OR: setLoadingAction ({commit}, payload) {..}
      commit('setLoadingMutate', payload)
    },
    setErrorAction: function ({commit}, payload) { // OR: setErrorAction ({commit}, payload) {..}
      commit('setErrorMutate', payload)
    },
    clearErrorAction: function ({commit}) { // OR: clearErrorAction ({commit}) {..}
      commit('setClearErrorMutate')
    }
  }
}
