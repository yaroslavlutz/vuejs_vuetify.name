import Vue from 'vue'
import Router from 'vue-router'

import AuthGuards from './auth-guards.js'

/** Import Custom components: */
import HomeComp from '@/components/HomeComp.vue'
import ListComp from '@/components/adds/ListComp.vue'
import NewAddComp from '@/components/adds/NewAddComp.vue'
import SingleAddComp from '@/components/adds/SingleAddComp.vue'
import LoginComp from '@/components/auth/LoginComp.vue'
import RegistrationComp from '@/components/auth/RegistrationComp.vue'
import OrdersComp from '@/components/user/OrdersComp.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'HomeComp', component: HomeComp },
    { path: '/list', name: 'ListComp', component: ListComp, beforeEnter: AuthGuards },
    { path: '/new-add', name: 'NewAddComp', component: NewAddComp, beforeEnter: AuthGuards },
    { path: '/single-add/:id', name: 'SingleAddComp', component: SingleAddComp },
    { path: '/login', name: 'LoginComp', component: LoginComp },
    { path: '/registration', name: 'RegistrationComp', component: RegistrationComp },
    { path: '/orders', name: 'OrdersComp', component: OrdersComp, beforeEnter: AuthGuards }
  ],
  mode: 'history'
})
