import * as firebase from 'firebase' // импортируем библиотеку 'firebase' для работы с Firebase и отправки AJAX-запросов

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
  /* `state` -Объект.котоый описываеи все состояние нашего приложения */
  state: {
    /* Когда мы работали не через БД `firebase` мы брали данные отсюда
      addsData: [
        {id: '1', title: '1 Title', description: 'Description1 for 1-Title', promo: false, imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'},
        {id: '2', title: '2 Title', description: 'Description1 for 2-Title', promo: true, imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'},
        {id: '3', title: '3 Title', description: 'Description1 for 3-Title', promo: true, imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'}
      ]
    */
    addsData: [], // тут будут храниться все записи из БД`firebase`
    thisId: null
  },
  mutations: { // по-сути это setters. Через `mutations`идет изменение данных(изменение `state`) при использовании `Store`
    /* 1) Если в `mutations` нужно передать не просто одиночное зн-е,то сюда передается Объект с нужными данными,который предварительно нужно сформировать.
      2) В `mutations` не передается и не пишется никаких асинхронных запросов. Для этого есть `actions` */
    createNewAddMutate (state, newAddObjValidation) {
      state.addsData.push(newAddObjValidation)
    },
    currentIdSingleAddMutate (state, _id) {
      state.thisId = _id
    },
    setAllAddsFromDb (state, payload) {
      state.addsData = payload
    },
    /* Ищем по Идентификатору записи нужную запись в существующем массиве Объектов(`state.addsData`)со всеми данными и обновляем ее */
    setUpdateSingleAdd (state, updateSingleAddDataObj) {
      function needId (value) {
        return value.id === updateSingleAddDataObj.id
      }
      /* Или на ES-6:
        const newDataForSingleAdd = state.addsData.find(a => {
          return a.id === updateSingleAddDataObj.id
        })
      */
      const newDataForSingleAdd = state.addsData.find(needId)
      newDataForSingleAdd.title = updateSingleAddDataObj.title // обновляем нужные данные в существующем массиве Объектов(`state.addsData`) со всеми данными по записям
      newDataForSingleAdd.description = updateSingleAddDataObj.description // обновляем нужные данные в существующем массиве Объектов(`state.addsData`) со всеми данными по записям
    }
  },
  getters: {
    /* #Возвращаем все записи в `addsData` */
    getAddsDataFunc: function (state) { // OR: getAddsDataFunc() {..}
      return state.addsData
    },
    /* #Возвращаем те записи в `addsData` у которых св-во `promo` true */
    getAddsDataOnlyPromoFunc: function (state) { // OR: getAddsDataOnlyPromoFunc() {..}
      function isPromoTrue (value) {
        return value.promo === true
      }
      let filteredByPromo = state.addsData.filter(isPromoTrue)
      return filteredByPromo
      /* OR: return state.addsData.filter(item => { return item.promo === true }) */
    },
    /* #Возвращаем те записи в `addsData` которые добавил текущий пользователь */
    getMyAddsDataFunc: function (state, getters) { // OR: getMyAddsDataFunc() {..}
      function isIdCurrentUser (value) { // обращаемся к getters`getUserDataFunc()`,который возвращ.ID текущего Юзера в`src/store/_user.js` и при совпадении фильтруем Наш массив с данными по всем записям, отбирая лишь те,что принадлежат данному Юзеру
        return value.ownerID === getters.getUserDataFunc.id
      }
      let filteredAllAddsByIdCurentUser = state.addsData.filter(isIdCurrentUser)
      return filteredAllAddsByIdCurentUser
    },
    /* #Возвращаем ту одну запись из `addsData` по ее указанному ID,т.е.по св-ву `id` - это для получение и просмотра Single-записи в компоненте `/src/components/adds/SingleAddComp.vue` */
    getAddByIdFunc: function (state) { // OR: getAddByIdFunc() {..}
      function isId (value) {
        return value.id === state.thisId
      }
      return state.addsData.find(isId)
      /* OR: return adIdFind => {return state.addsData.find(ad => ad.id === adIdFind) } */
    },
    /* #Возвращаем ID той одной записи (записи просмотра single-записи) */
    getIdSingleRecord: function (state) { // OR: getAddByIdFunc() {..}
      return state.thisId
    }
  },
  actions: {
    /* `context` - спец.св-во
     `data / dataObject` - те данные,которые мы получаем и с кот.нужно работать */
    async createNewAddAction ({commit}, newAddObjValidation) { // OR: createNewAddAction ({commit}, newAddObjValidation) {..}
      newAddObjValidation.ownerID = this.getters.getUserDataFunc.id // поскольку у нас уже есть залогиненный Юзер (объект Юзера), то мы знаем его ID и можем его вытащить
      const newAddsData = new AddsData(newAddObjValidation.title, newAddObjValidation.description, newAddObjValidation.promo, newAddObjValidation.imgSrc, newAddObjValidation.ownerID)

      const dbResultAddsData = firebase.database().ref('ads').push(newAddsData) // 'ads' это мы говорим, что хотим такое имя таблицы БД в `firebase`
      console.log(dbResultAddsData) // то,что получили из БД `firebase`
      console.log('ID записи из `firebase` --> ' + dbResultAddsData.key) // идентификатор записи уже сформированный и взятый из БД `firebase`
      newAddsData.id = dbResultAddsData.key // немного изменяем наш массив со всеми объявлениями, перезаписывая ID его новой записи нужным идентификатором из БД `firebase`

      /* for image */
      const imageObj = newAddObjValidation.imgSrc2
      console.log('++imageObj --> ' + imageObj)
      /** Сохранение загруженного изображения в "Storage" Firebase. Имя изображения содержит в своем названии ID записи! */
      let imageextention = imageObj.name.slice(imageObj.name.lastIndexOf('.')) // получаем расширение нашего изображения
      const fileData = await firebase.storage().ref(`ads/${dbResultAddsData.key}.${imageextention}`).put(imageObj) // Сохраняем(ложим) изображение в "Storage" Firebase по такому пути и такому имени файла
      /** (!!!)
       * 1.Берем только что загруженное изображение,а именно его URL по его ключю(ключ у нас содержится в`dbResultAddsData.key`).В переменной `imageextention` содержится расширение этого изображения
       * 2.Записываем в св-во`imgSrc` Объекта`imgSrcUpdateFieldInDb` URL на изображение,кот.мы получаем(и которое мы только что загрузили) из `firebase.storage()`.Этот URL на изображение содержится в Promise `url`
       * 3.Обновляем в`firebase`(там где именно у нас хранятся данные по записям) по нужному ключу-идентификатору(dbResultAddsData.key) зн-е поля `imgSrc` реальным URL из `firebase.storage()`(где реально лежат загруженные изображения)
      */
      let storageRef = firebase.storage().ref()
      await storageRef.child(`ads/${dbResultAddsData.key}.${imageextention}`).getDownloadURL() // по-сути `ads/${dbResultAddsData.key}.${imageextention}` это - `ads/${this.$store.getters.getIdSingleRecord}..png`, причем именно так, с 2-мя точками перед расширением файла
        .then(function (url) {
          let imgSrcUpdateFieldInDb = {} // инициализ.пустой объект чтобы в него поместить имя поля,кот.мы хотим точечно обновить в`firebase`(а нам нужно обновить поле`imgSrc`)
          // console.log(url)
          imgSrcUpdateFieldInDb.imgSrc = url // записываем в св-во`imgSrc` этого Объекта URL на изображение,кот.мы получили из `firebase.storage()`.Этот URL на изображение содержится в Promise `url`
          firebase.database().ref('ads').child(dbResultAddsData.key).update(imgSrcUpdateFieldInDb) // обновляем в`firebase`(там где именно у нас хранятся данные по записям) по нужному ключу-идентификатору(dbResultAddsData.key) зн-е поля `imgSrc` реальным URL из `firebase.storage()`(где реально лежат загруженные изображения)
        }).catch(function (error) {
          // Handle any errors
        })
      /* _____________________________________________/for image */
      //
      commit('createNewAddMutate', newAddsData)
      location.href = 'http://localhost:8080/list'
    },
    currentIdSingleAdd: function ({commit}, _id) { // OR: currentIdSingleAdd ({commit}, _id) {..}
      commit('currentIdSingleAddMutate', _id)
    },
    async fetchAddsAction ({commit}) {
      const fbVal = await firebase.database().ref('ads').once('value')
      const dbResultAllAddsData = fbVal.val()
      console.log(dbResultAllAddsData) // console.log(dbResultAllAddsData['-LQKUIkCp_Fvfbfj6d8B'].description)
      /*
        Формируем массив Объектов:
      */
      const resultAddsData = [] // объявляем пустой массив под хранения всех тех данных,кот.мы забираем из БД`firebase`
      Object.keys(dbResultAllAddsData).forEach(function (key) { // проходимся по ключам полученного из БД`firebase` Объекта
        let ad = dbResultAllAddsData[key]
        resultAddsData.push(
          new AddsData(ad.title, ad.description, ad.promo, ad.imgSrc, ad.ownerID, key)  // key у нас и есть ID записи,это можно увидеть из console.log(dbResultAllAddsData)
        )
      })
      console.log(resultAddsData)
      commit('setAllAddsFromDb', resultAddsData)
    },
    async updateSingleAddAction ({commit}, {title, description, id}) { // в `payload` у нас содержится Объект с именами свойств,кот.мы хотим обновлять в`firebase`.Передаем мы этот Объект из`src/components/adds/EditAddModalwindow.vue` метод`onSaveFunc()`
      try {
        await firebase.database().ref('ads').child(id).update({title, description})
      } catch (error) {
        console.log(error)
      }
      /* Формируем Объект с свойствами,кот.мы хотим обновить в`firebase` и обновляем эти данные в`firebase` по ID конкретной записи */
      let updateSingleAddDataObj = {} // инициализ.пустой объект чтобы в него поместить имя полей,кот.мы хотим точечно обновить в`firebase`(а нам нужно обновить поле`title и description`) и ID записи
      updateSingleAddDataObj.title = title // записываем в св-во`title` этого Объекта данные переданные из Формы редактирования Single-записи
      updateSingleAddDataObj.description = description // записываем в св-во`description` этого Объекта данные переданные из Формы редактирования Single-записи
      updateSingleAddDataObj.id = id
      /* Этот commit призван обновить данные на фронтенде,чтобы мы мнгновенно получили редактируемый результат на экран */
      commit('setUpdateSingleAdd', updateSingleAddDataObj)
    }
  }
}
