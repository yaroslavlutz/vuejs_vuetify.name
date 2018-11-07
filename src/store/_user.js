import * as firebase from 'firebase' // импортируем библиотеку 'firebase' для работы с Firebase и отправки AJAX-запросов

class User {
  constructor (id) {
    this.id = id
  }
}

/* eslint-disable no-undef */
export default {
  /* `state` -Объект.котоый описываеи все состояние нашего приложения */
  state: {
    userData: null
  },
  mutations: { // по-сути это setters. Через `mutations`идет изменение данных(изменение `state`) при использовании `Store`
    /* 1) Если в `mutations` нужно передать не просто одиночное зн-е,то сюда передается Объект с нужными данными,который предварительно нужно сформировать.
      2) В `mutations` не передается и не пишется никаких асинхронных запросов. Для этого есть `actions` */
    setUserDataMutate (state, userObj) {
      state.userData = userObj
    }
  },
  getters: {
    /* #Возвращаем данные Urer`a */
    getUserDataFunc: function (state) { // OR: getUserDataFunc() {..}
      return state.userData
    },
    /* #Проверка залогинен ли Юзер или нет */
    isUserLoggedInFunc (state) {
      return state.userData !== null
    }
  },
  actions: {
    /* `context` - спец.св-во
     `data / dataObject` - те данные,которые мы получаем и с кот.нужно работать */
    registrUserAction: function ({commit}, {email, password}) { // OR: registrUserAction ({commit}, userObj) {..}
      commit('setClearErrorMutate') // очищаем все ошибки,которые у нас есть
      commit('setLoadingMutate', true) // оповещаем пользователя,что идет какая-то обработка/загузка данных

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (user) { // В данном объекте `user` будет хранится ID Юзера,который мы только что создали и он будет храниться в поле `uid`
          commit('setUserDataMutate', new User(user.uid)) // регистрация нового пользователя - запись данных в БД `firebase`
          commit('setLoadingMutate', false) // прекращаем оповещение пользователя,что идет какая-то обработка/загузка данных
        })
        .catch(function (error) { // если какая-то ошибка при регистрация нового пользователя - запись данных в БД `firebase`
          commit('setLoadingMutate', false) // прекращаем оповещение пользователя,что идет какая-то обработка/загузка данных
          commit('setErrorMutate', error.message) // устанавливаем ошибку для оповещения пользователя
        })
    },
    loginUserAction: function ({commit}, {email, password}) { // OR: loginUserAction ({commit}, userObj) {..}
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (user) { // В данном объекте `user` будет хранится ID Юзера,который мы только что создали и он будет храниться в поле `uid`
          commit('setUserDataMutate', new User(user.uid)) // Логинация нового пользователя - запись данных в БД `firebase`
          commit('setLoadingMutate', false) // прекращаем оповещение пользователя,что идет какая-то обработка/загузка данных
        })
        .catch(function (error) { // если какая-то ошибка при регистрация нового пользователя - запись данных в БД `firebase`
          commit('setLoadingMutate', false) // прекращаем оповещение пользователя,что идет какая-то обработка/загузка данных
          commit('setErrorMutate', error.message) // устанавливаем ошибку для оповещения пользователя
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
