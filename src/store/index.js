import Vue from 'vue'
import Vuex from 'vuex' // импортируем библиот.'vuex' после инициализации самого App Vue

/** Import modules of STATE of VUEX */
import _SingleAdd from './_single_add.js' // импортируем модуль с данными `state` показа конкретной записи по ее идентификатору сюда в Главный файл `Store`
import _User from './_user.js' // импортируем модуль с данными `state` для Юзера сюда в Главный файл `Store`
import _Notifications from './_notifications.js' // импортируем модуль с данными `state` для Notification(вывод сообщейний,ошибок и т.д.) сюда в Главный файл `Store`
import _Orders from './_orders.js' // импортируем модуль с данными `state` для Orders сюда в Главный файл `Store`
/** //__________________________________ */

Vue.use(Vuex) // подключаем установленную библиотеку 'vuex' для работы с единым хранилищем данных в приложении

export default new Vuex.Store({
  /* `modules` -спец.Объект в `state` для подключения отдельный сущностей сюда в единое хранилище`Store` */
  modules: {
    _SingleAdd: _SingleAdd, // подключаем модуль с данными `state` показа конкретной записи по ее идентификатору сюда в Главный файл `Store`
    _User: _User, // подключаем модуль с данными `state` для Юзера сюда в Главный файл `Store`
    _Notifications: _Notifications, // подключаем модуль с данными `state` для Notification(вывод сообщейний,ошибок и т.д.) сюда в Главный файл `Store`
    _Orders: _Orders // подключаем модуль с данными `state` для Orders сюда в Главный файл `Store`
  },
  /* `state` -Объект.котоый описываеи все состояние нашего приложения */
  state: {
    // some code if you want..
  },
  mutations: { // по-сути это setters. Через `mutations`идет изменение данных(изменение `state`) при использовании `Store`
    /* 1) Если в `mutations` нужно передать не просто одиночное зн-е,то сюда передается Объект с нужными данными,который предварительно нужно сформировать.
      2) В `mutations` не передается и не пишется никаких асинхронных запросов. Для этого есть `actions` */
    // some code if you want..
  },
  getters: {
    // some code if you want..
  },
  actions: {
    /* `context` - спец.св-во
     `data / dataObject` - те данные,которые мы получаем и с кот.нужно работать */
    // some code if you want..
  }
})
