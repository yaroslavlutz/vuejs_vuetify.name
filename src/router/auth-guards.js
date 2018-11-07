import store from '../store/index.js' // импортируем уже из `/store/index.js`(т.к.туда мы его первично импортировали и инициализировали) библиотеку 'vuex'

export default function (to, from, next) {
  if (store.getters.getUserDataFunc) {
    next()
  } else {
    next('/login?loginError=TRUE')
  }
}
