import * as firebase from 'firebase'

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
  state: {
    ordersData: []
  },
  mutations: { 
    setNewOrderMutate (state, payload) {
      state.ordersData = payload
    }
  },
  getters: {
    getOnlyDoneOrdersDataFunc: function (state) {
      return state.ordersData.filter(o => o.doneOrNot)
    },
    getOnlyUndoneOrdersDataFunc: function (state) {
      return state.ordersData.filter(o => !o.doneOrNot)
    },
    getOrdersDataFunc: function (state, getters) {
      return getters.getOnlyUndoneOrdersDataFunc.concat(getters.getOnlyDoneOrdersDataFunc)
    }
  },
  actions: {
    async createOrderAction ({commit}, {nameCustomer, phoneCustomer, addId, ownerID}) {
      const newOrderCreate = new OrderData(nameCustomer, phoneCustomer, addId)

      try {
        await firebase.database().ref(`/users/${ownerID}/orders`).push(newOrderCreate) // 'ads' это мы говорим, что хотим такое имя таблицы БД в`firebase`
      } catch (error) {
        console.log(error)
      }
    },
    async fetchOrdersAction ({commit}) {
      try {
        let currentIdUser = this.getters.getUserDataFunc.id 
        const fbVal = await firebase.database().ref(`/users/${currentIdUser}/orders`).once('value')
        const dbResultOrdersData = fbVal.val()
        console.log(dbResultOrdersData)

        const resultOrdersData = [] 
        Object.keys(dbResultOrdersData).forEach(function (key) { 
          let itemOrder = dbResultOrdersData[key]
          resultOrdersData.push(
            new OrderData(itemOrder.nameCustomer, itemOrder.phoneCustomer, itemOrder.addId, itemOrder.doneOrNot, key) 
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
      let updatedoneOrNotFieldObj = {} 
      updatedoneOrNotFieldObj.doneOrNot = payloadObj.checkOrderDoneOrNot 
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
