# vuejs_vuetify.name

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

______________________________ПРИМЕР именования функций в store для (mutations, getters, actions) ДЛЯ ОДНООБРАЗИЯ и наглядности:
  /* `state` -Объект.котоый описываеи все состояние нашего приложения
     `payload` - те данные,которые мы получаем и с кот.нужно работать */
  state: {
    loading: false,
    error: null
  },
  mutations: { // по-сути это setters. Через `mutations`идет изменение данных(изменение `state`) при использовании `Store`
    /* 1) Если в `mutations` нужно передать не просто одиночное зн-е,то сюда передается Объект с нужными данными,который предварительно нужно сформировать.
      2) В `mutations` не передается и не пишется никаких асинхронных запросов. Для этого есть `actions` */
    setLoadingFunc (state, payload) { // OR: setLoadingFunc: function() {..}
      state.loading = payload
    },
    setErrorFunc (state, payload) { // OR: setErrorFunc: function() {..}
      state.loading = payload
    },
    setSomeNameFunc (state, payload) { // OR: setSomeNameFunc: function() {..}
      state.loading = payload
    },
  },
  getters: { // по-сути это getters. Они всегда что-то возвращают
    /* #Возвращаем Loading.. */
    getLoadingFunc: function (state) { // OR: getLoadingFunc() {..}
      return state.loading
    },
    /* #Возвращаем Error.. */
    getErrorFunc: function (state) { // OR: getErrorFunc() {..}
      return state.error
    }
  },
  actions: { // это Ф-ии действий. Именно они вызываются(идет к ним обращение) из того или иного Компонента. `actions` всегда дергают`mutations`, которые уже изменяют конкретные данные в`state`
    /* `context` или {commit} - спец.св-во
       `payload` - те данные,которые мы получаем и с кот.нужно работать
        В `actions` можно передать еще`getters`. Это будет Объект`getters` через кот.мы можем обращаться к данным Геттерам и брать нужные нам данные
    */
    setLoadingAction: function ({commit}, payload) { // OR: setLoadingAction ({commit}, payload) {..}
      commit('setLoadingMutate', payload)
    },
    setErrorAction: function ({commit}, payload) { // OR: setErrorAction ({commit}, payload) {..}
      commit('setErrorMutate', payload)
    },
    setSomeNameAction: function ({commit}, getters) { // OR: setSomeNameAction ({commit}) {..}
      let error = getters.getters.getErrorFunc // конечно можно и не передавать Объект`getters`, а просто обратиться так: let error = this.getters.getErrorFunc
      commit('setSomeNameFunc', error)
    }
  }