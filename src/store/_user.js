import * as firebase from 'firebase' 

class User {
  constructor (id) {
    this.id = id
  }
}

/* eslint-disable no-undef */
export default {
  state: {
    userData: null
  },
  mutations: { 
    setUserDataMutate (state, userObj) {
      state.userData = userObj
    }
  },
  getters: {
    getUserDataFunc: function (state) {
      return state.userData
    },

    isUserLoggedInFunc (state) {
      return state.userData !== null
    }
  },
  actions: {

    registrUserAction: function ({commit}, {email, password}) { 
      commit('setClearErrorMutate') 
      commit('setLoadingMutate', true) 

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (user) {
          commit('setUserDataMutate', new User(user.uid)) 
          commit('setLoadingMutate', false) 
        })
        .catch(function (error) { 
          commit('setLoadingMutate', false) 
          commit('setErrorMutate', error.message)
        })
    },
    loginUserAction: function ({commit}, {email, password}) { 
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (user) { 
          commit('setUserDataMutate', new User(user.uid)) 
          commit('setLoadingMutate', false) 
        })
        .catch(function (error) {
          commit('setLoadingMutate', false) 
          commit('setErrorMutate', error.message) 
        })
    },
    autoLoginUserAction: function ({commit}, payload) {
      commit('setUserDataMutate', new User(payload.uid))
    },
    logoutUserAction: function ({commit}) {
      firebase.auth().signOut()
      commit('setUserDataMutate', null)
    }
  }
}
