import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import * as firebase from 'firebase'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './stylus/main.styl'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router, 
  store: store,
  render: h => h(App),
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
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUserAction', user)
      }
    })

    this.$store.dispatch('fetchAddsAction')
  }
})
