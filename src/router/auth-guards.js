import store from '../store/index.js' 

export default function (to, from, next) {
  if (store.getters.getUserDataFunc) {
    next()
  } else {
    next('/login?loginError=TRUE')
  }
}
