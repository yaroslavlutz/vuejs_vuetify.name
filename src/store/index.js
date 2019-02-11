import Vue from 'vue'
import Vuex from 'vuex'

/** Import modules of STATE of VUEX */
import _SingleAdd from './_single_add.js'
import _User from './_user.js'
import _Notifications from './_notifications.js'
import _Orders from './_orders.js'

Vue.use(Vuex) 

export default new Vuex.Store({
  modules: {
    _SingleAdd: _SingleAdd, 
    _User: _User, 
    _Notifications: _Notifications, 
    _Orders: _Orders 
  },
  state: {
  },
  mutations: {
	// some code if you want..
  },
  getters: {
    // some code if you want..
  },
  actions: {
    // some code if you want..
  }
})
