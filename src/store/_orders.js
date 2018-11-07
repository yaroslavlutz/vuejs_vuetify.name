import * as firebase from 'firebase' // импортируем библиотеку 'firebase' для работы с Firebase и отправки AJAX-запросов

class OrderData {
  constructor (nameCustomer, phoneCustomer, addId, doneOrNot = false, id = null) {
    this.nameCustomer = nameCustomer
    this.phoneCustomer = phoneCustomer
    this.addId = addId
    this.doneOrNot = doneOrNot
    this.id = id
  }
}

export default {
  /* `state` -Объект.котоый описываеи все состояние нашего приложения */
  state: {
    ordersData: []
  },
  mutations: { // по-сути это setters. Через `mutations`идет изменение данных(изменение `state`) при использовании `Store`
    /* 1) Если в `mutations` нужно передать не просто одиночное зн-е,то сюда передается Объект с нужными данными,который предварительно нужно сформировать.
      2) В `mutations` не передается и не пишется никаких асинхронных запросов. Для этого есть `actions` */
    setNewOrderMutate (state, payload) {
      // state.ordersData.push(payload)
      state.ordersData = payload
    }
  },
  getters: {
    /* #Возвращаем все ордера из `ordersData` для конкретного залогинееного текущего Юзера */
    getOnlyDoneOrdersDataFunc: function (state) {
      return state.ordersData.filter(o => o.doneOrNot)
    },
    getOnlyUndoneOrdersDataFunc: function (state) {
      return state.ordersData.filter(o => !o.doneOrNot)
    },
    getOrdersDataFunc: function (state, getters) {
      return getters.getOnlyUndoneOrdersDataFunc.concat(getters.getOnlyDoneOrdersDataFunc)
      // return state.ordersData
    }
  },
  actions: {
    /* `context` - спец.св-во
     `data / dataObject` - те данные,которые мы получаем и с кот.нужно работать */
    async createOrderAction ({commit}, {nameCustomer, phoneCustomer, addId, ownerID}) {
      const newOrderCreate = new OrderData(nameCustomer, phoneCustomer, addId)

      try {
        /* Мы таким запросом в`firebase` указываем,что ложим данные в таблицу`users` далее тамже сохраняем ключ определенного Юзера и далее подтаблица`orders`
        которая уже содержит данные, передавемые с формы,- это имя Юзера, его телефон */
        await firebase.database().ref(`/users/${ownerID}/orders`).push(newOrderCreate) // 'ads' это мы говорим, что хотим такое имя таблицы БД в`firebase`
      } catch (error) {
        console.log(error)
      }
    },
    async fetchOrdersAction ({commit}) {
      try {
        let currentIdUser = this.getters.getUserDataFunc.id // поскольку у нас уже есть залогиненный Юзер(объект Юзера), то мы знаем его ID и можем его вытащить
        // `/users/${currentIdUser}/orders` - это и есть путь к данным к заказам текущего Юзера,где currentIdUser - это ID текущего залогинееного Юзера
        const fbVal = await firebase.database().ref(`/users/${currentIdUser}/orders`).once('value')
        const dbResultOrdersData = fbVal.val()
        console.log(dbResultOrdersData)
        /*
          Формируем массив Объектов:
        */
        const resultOrdersData = [] // объявляем пустой массив под хранения всех тех данных(ордеров текущего Юзера),кот.мы забираем из БД`firebase`
        Object.keys(dbResultOrdersData).forEach(function (key) { // проходимся по ключам полученного из БД`firebase` Объекта
          let itemOrder = dbResultOrdersData[key]
          resultOrdersData.push(
            new OrderData(itemOrder.nameCustomer, itemOrder.phoneCustomer, itemOrder.addId, itemOrder.doneOrNot, key) // key у нас и есть ID записи,это можно увидеть из console.log(dbResultOrdersData)
          )
        })
        console.log(resultOrdersData)
        commit('setNewOrderMutate', resultOrdersData)
      } catch (error) {
        // throw error
        console.log(error)
      }
    },
    async orderDoneAction ({commit}, payloadObj) {
      let updatedoneOrNotFieldObj = {} // инициализ.пустой объект чтобы в него поместить имя поля,кот.мы хотим точечно обновить в`firebase`(а нам нужно обновить поле`imgSrc`)
      updatedoneOrNotFieldObj.doneOrNot = payloadObj.checkOrderDoneOrNot // записываем в св-во`imgSrc` этого Объекта URL на ссылку с изображением
      let ownerID = this.getters.getUserDataFunc.id
      try {
        await firebase.database().ref(`/users/${ownerID}/orders`).child(payloadObj.orderID).update(updatedoneOrNotFieldObj)
      } catch (error) {
        // throw error
        console.log(error)
      }
    }
  }
}
