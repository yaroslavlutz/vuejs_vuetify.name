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
  import EditAddModalwindow from './EditAddModalwindow.vue'
  import BuyModalwindow from './BuyModalwindow.vue' 

  export default {
    data () {
      return {
        postId: null 
      }
    },
    components: {
      EditAddModalwindow: EditAddModalwindow,
      BuyModalwindow: BuyModalwindow
    },
    created: function () {
      this.postId = this.$route.params.id // console.log(this.postId); //OR: this.$router.currentRoute.params['id']; Т.к.`this.$route` ЭТО `this.$router.currentRoute`
      this.$store.dispatch('currentIdSingleAdd', this.postId)
      console.log(this.postId) 
        // или:
      console.log(this.$store.getters.getIdSingleRecord) 
    },
    computed: {
      singleAddDataFunc: function () {
        return this.$store.getters.getAddByIdFunc
      },
      isOwnerCurrentUserFunc: function () { 
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
