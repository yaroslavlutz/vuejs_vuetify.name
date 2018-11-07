<template>
    <div id="root_RegistrationComp">
        <v-container fluid>
            <v-slide-y-transition mode="out-in">
                <v-layout row align-center> <!--row/column/align-center-->
                    <img src="@/assets/logo.png" alt="Vuetify.js" class="identy-img-component-img">
                    <v-flex xs12>
                        <h2 class="identy-name-component-title">This is `SingleAddComp.vue` Component</h2>
                    </v-flex>
                </v-layout>
            </v-slide-y-transition>
        </v-container>

        <v-container fluid>
                <v-layout row align-center> <!--row/column/align-center-->
                    <v-flex xs12>
                        <v-card>
                            <v-card-media height="300px"
                                    v-bind:src="singleAddDataFunc.imgSrc"
                            ></v-card-media>

                            <v-card-text>
                                <h2 class="text--primary">{{ singleAddDataFunc.title }}</h2>
                                <p>{{ singleAddDataFunc.description }}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <!--<v-btn class="warning" flat>Edit</v-btn> - перемещена в отдельный компонент`src/components/adds/EditAddModalwindow.vue`-->
                                <!--Компонент `src/components/adds/EditAddModalwindow.vue` с модальным окном для редактирования-->
                                <edit-add-modalwindow v-if="isOwnerCurrentUserFunc"></edit-add-modalwindow>

                                <!--<v-btn raised color="blue">Buy</v-btn> - перемещена в отдельный компонент`src/components/BuyModalwindow.vue`-->
                                <!--Компонент`src/components/BuyModalwindow.vue` с модальным окном с формой для покупки чего-то(Buy)-->
                                <buy-modalwindow></buy-modalwindow>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
        </v-container>
    </div>
</template>


<script>
  /** Import Custom components: */
  import EditAddModalwindow from './EditAddModalwindow.vue' // импортируем компонент,где у нас будет Модальное Окно с формой для редактирования(Edit) записи
  import BuyModalwindow from './BuyModalwindow.vue' // импортируем компонент,где у нас будет Модальное Окно с формой для покупки чего-то(Buy)

  export default {
    data () {
      return {
        postId: null // ID конкретной записи, которую мы просматриваем
      }
    },
    components: {
      EditAddModalwindow: EditAddModalwindow,
      BuyModalwindow: BuyModalwindow
    },
    created: function () {
      this.postId = this.$route.params.id // console.log(this.postId); //OR: this.$router.currentRoute.params['id']; Т.к.`this.$route` ЭТО `this.$router.currentRoute`
      /* dispatch() - метод изменения Объекта в`store` через `actions`.
         Тут ВАЖНО - это мы передаем в `src/store/_single_add.js` в его св-во `state` значение`id` текущей записи,которое потом тамже в Геттере`getAddByIdFunc()`
         используем для получения одной конкретной записи по этому самому ID,который мы получаем из параметра роута */
      this.$store.dispatch('currentIdSingleAdd', this.postId)
      console.log(this.postId) // получаем ID той записи,которую в данный момент просматриваем
        // или:
      console.log(this.$store.getters.getIdSingleRecord) // получаем ID той записи,которую в данный момент просматриваем
    },
    computed: {
      singleAddDataFunc: function () {
        return this.$store.getters.getAddByIdFunc
      },
      isOwnerCurrentUserFunc: function () { // обращаемся к getters`getUserDataFunc()`,который возвращ.ID текущего Юзера в`src/store/_user.js` и проверяем эта запись принадлежит этому Юзеру
        if (this.singleAddDataFunc.ownerID === this.$store.getters.getUserDataFunc.id) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style scoped>
    h2.identy-name-component-title{color:#0aa1c3;font-weight:normal;}
    img.identy-img-component-img{width:70px;height:auto;}
</style>
