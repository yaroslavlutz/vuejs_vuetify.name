import * as firebase from 'firebase' 

class AddsData {
  constructor (title, description, promo = false, imgSrc = 'https://cdn-images-1.medium.com/max/1200/1*nq9cdMxtdhQ0ZGL8OuSCUQ.jpeg', ownerID = null, id = null) {
    this.title = title
    this.description = description
    this.promo = promo
    this.imgSrc = imgSrc
    this.ownerID = ownerID
    this.id = id
  }
}

/* eslint-disable no-undef */
export default {
  state: {
    addsData: [], 
    thisId: null
  },
  mutations: { 
    createNewAddMutate (state, newAddObjValidation) {
      state.addsData.push(newAddObjValidation)
    },
    currentIdSingleAddMutate (state, _id) {
      state.thisId = _id
    },
    setAllAddsFromDb (state, payload) {
      state.addsData = payload
    },

    setUpdateSingleAdd (state, updateSingleAddDataObj) {
      function needId (value) {
        return value.id === updateSingleAddDataObj.id
      }

      const newDataForSingleAdd = state.addsData.find(needId)
      newDataForSingleAdd.title = updateSingleAddDataObj.title 
      newDataForSingleAdd.description = updateSingleAddDataObj.description 
    }
  },
  getters: {
    getAddsDataFunc: function (state) { 
      return state.addsData
    },
    getAddsDataOnlyPromoFunc: function (state) { 
      function isPromoTrue (value) {
        return value.promo === true
      }
      let filteredByPromo = state.addsData.filter(isPromoTrue)
      return filteredByPromo
    },

    getMyAddsDataFunc: function (state, getters) { 
      function isIdCurrentUser (value) { 
        return value.ownerID === getters.getUserDataFunc.id
      }
      let filteredAllAddsByIdCurentUser = state.addsData.filter(isIdCurrentUser)
      return filteredAllAddsByIdCurentUser
    },

    getAddByIdFunc: function (state) { 
      function isId (value) {
        return value.id === state.thisId
      }
      return state.addsData.find(isId)

    },

    getIdSingleRecord: function (state) { 
      return state.thisId
    }
  },
  actions: {
    async createNewAddAction ({commit}, newAddObjValidation) { 
      newAddObjValidation.ownerID = this.getters.getUserDataFunc.id 
      const newAddsData = new AddsData(newAddObjValidation.title, newAddObjValidation.description, newAddObjValidation.promo, newAddObjValidation.imgSrc, newAddObjValidation.ownerID)

      const dbResultAddsData = firebase.database().ref('ads').push(newAddsData)  
      newAddsData.id = dbResultAddsData.key

      /* for image */
      const imageObj = newAddObjValidation.imgSrc2
      let imageextention = imageObj.name.slice(imageObj.name.lastIndexOf('.')) 
      const fileData = await firebase.storage().ref(`ads/${dbResultAddsData.key}.${imageextention}`).put(imageObj)
      let storageRef = firebase.storage().ref()
      await storageRef.child(`ads/${dbResultAddsData.key}.${imageextention}`).getDownloadURL() 
        .then(function (url) {
          let imgSrcUpdateFieldInDb = {} 
          imgSrcUpdateFieldInDb.imgSrc = url 
          firebase.database().ref('ads').child(dbResultAddsData.key).update(imgSrcUpdateFieldInDb) 
        }).catch(function (error) {

        })

      commit('createNewAddMutate', newAddsData)
      location.href = 'http://localhost:8080/list'
    },
    currentIdSingleAdd: function ({commit}, _id) { 
      commit('currentIdSingleAddMutate', _id)
    },
    async fetchAddsAction ({commit}) {
      const fbVal = await firebase.database().ref('ads').once('value')
      const dbResultAllAddsData = fbVal.val()

      const resultAddsData = [] 
      Object.keys(dbResultAllAddsData).forEach(function (key) { 
        let ad = dbResultAllAddsData[key]
        resultAddsData.push(
          new AddsData(ad.title, ad.description, ad.promo, ad.imgSrc, ad.ownerID, key) 
        )
      })
      console.log(resultAddsData)
      commit('setAllAddsFromDb', resultAddsData)
    },
    async updateSingleAddAction ({commit}, {title, description, id}) { 
      try {
        await firebase.database().ref('ads').child(id).update({title, description})
      } catch (error) {
        console.log(error)
      }
     
      let updateSingleAddDataObj = {} 
      updateSingleAddDataObj.title = title 
      updateSingleAddDataObj.description = description 
      updateSingleAddDataObj.id = id
           commit('setUpdateSingleAdd', updateSingleAddDataObj)
    }
  }
}
