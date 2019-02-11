<template>
    <div id="root_ListComp">
        <v-container fluid>
            <v-slide-y-transition mode="out-in">
                <v-layout row align-center> <!--row/column/align-center-->
                    <img src="@/assets/logo.png" alt="Vuetify.js" class="identy-img-component-img">
                    <v-flex xs12>
                        <h2 class="identy-name-component-title">This is `ListComp.vue` Component</h2>
                    </v-flex>

                </v-layout>
            </v-slide-y-transition>
        </v-container>

        <v-container fluid>
            <v-layout row align-center> <!--row/column/align-center-->
                <v-flex xs12 sm10 md6 offset-sm1 offset-md3 row>
                    <h1 class="text--secondary">My List Adds:</h1>

                    <v-card class="elevation-10 mb-3"
                            v-for="(add, index) of addsDataFromStoreFunc"
                            v-bind:key="add.id"
                    >
                        <v-layout>
                            <v-flex xs4>
                                <v-card-media height="175px"
                                              v-bind:src="add.imgSrc"
                                ></v-card-media>
                            </v-flex>
                            <v-flex xs8>
                                <v-card-text>
                                    <h4 class="text--primary">{{ add.title }}</h4>
                                    <p>{{ add.description }}</p>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn class="info" v-bind:to="'/single-add/' + add.id">Open</v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>

            <!--Только те записи,кот.добавил Я-->
            <v-layout>
                <v-flex xs12 sm10 md6 offset-sm1 offset-md3>
                    <h1 class="text--secondary">Только те записи,кот.добавил Я:</h1>

                    <v-card class="elevation-10 mb-3" style="background:greenyellow;"
                            v-for="(add, index) of myAddsDataFromStoreFunc"
                            v-bind:key="add.id"
                    >
                        <v-layout>
                            <v-flex xs4>
                                <v-card-media height="175px"
                                              v-bind:src="add.imgSrc"
                                ></v-card-media>
                            </v-flex>
                            <v-flex xs8>
                                <v-card-text>
                                    <h4 class="text--primary">{{ add.title }}</h4>
                                    <p>{{ add.description }}</p>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn class="info" v-bind:to="'/single-add/' + add.id">Open</v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
            <!--/Только те записи,кот.добавил Я-->
        </v-container>
    </div>
</template>


<script>
  export default {
    data () {
      return {
        /*
        addsData: [
          {id: '1', title: '1 Title', description: 'Description1 for 1-Title', promo: false, imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'},
          {id: '2', title: '2 Title', description: 'Description1 for 2-Title', promo: true, imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'},
          {id: '3', title: '3 Title', description: 'Description1 for 3-Title', promo: true, imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'}
        ]
        */
      }
    },
    methods: {
      // some code if you want..
    },
    computed: {
      addsDataFromStoreFunc: function () { 
        return this.$store.getters.getAddsDataFunc
      },
      myAddsDataFromStoreFunc: function () { // OR: addsDataFromStoreFunc() {..}/
        return this.$store.getters.getMyAddsDataFunc
      }
    }
  }
</script>

<style scoped>
    h2.identy-name-component-title{color:#0aa1c3;font-weight:normal;}
    img.identy-img-component-img{width:70px;height:auto;}
</style>
