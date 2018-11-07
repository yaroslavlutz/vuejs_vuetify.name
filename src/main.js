import Vue from 'vue'
import App from './App.vue'
import router from './router' // импортируем библиотеку 'vue-router'
import store from './store/index.js' // импортируем уже из `/store/index.js`(т.к.туда мы его первично импортировали и инициализировали) библиотеку 'vuex'
import * as firebase from 'firebase' // импортируем библиотеку 'firebase' для работы с Firebase и отправки AJAX-запросов
import Vuetify from 'vuetify' // импортируем библиотеку(frontend framework for Vue.js) 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './stylus/main.styl' // импортируем файл со стилями, в котором можно писать на языке препроцессора и благодаря установленному пакету "stylus" такой код SCSS будет компилироваться в CSS

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router, // используем библ.'vue-router'
  store: store, // используем библ.'vuex'
  render: h => h(App), // это не что иное, как: render: function(h){ return h(App); } , где h - это тоже Ф-я
  /* Или вместо этой строчки - `render: h => h(App)`:
      components: {App},
      template: '<App/>'
  */
  created () {
    // Initialize Firebase - configuration of Object
    var config = {
      apiKey: 'AIzaSyAiyY-Dz4cxbTWMmArm807PUBwRbAMod_Y',
      authDomain: 'vuejs-vuetify-name.firebaseapp.com',
      databaseURL: 'https://vuejs-vuetify-name.firebaseio.com',
      projectId: 'vuejs-vuetify-name',
      storageBucket: 'vuejs-vuetify-name.appspot.com',
      messagingSenderId: '541857996656'
    }
    firebase.initializeApp(config)
    /* Чтобы данные залогиненного Юзера сохранялись в сессии или локал-сторадже */
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUserAction', user)
      }
    })
    /* Чтобы при загрузке первоначальной приложения данные по записям(объявления) подгружались в приложение */
    this.$store.dispatch('fetchAddsAction')
    // this.$store.dispatch('fetchOrdersAction')
  }
})
