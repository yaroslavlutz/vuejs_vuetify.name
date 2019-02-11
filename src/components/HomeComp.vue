<template>
  <div id="root_HomeComp">
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <v-layout row align-center> <!--row/column/align-center/justify-center/wrap-->
          <img src="@/assets/logo.png" alt="Vuetify.js" class="identy-img-component-img">
          <v-flex xs12>

            <h2 class="identy-name-component-title">This is `HomeComp.vue` Component</h2>
          </v-flex>
        </v-layout>
      </v-slide-y-transition>
    </v-container>

    <v-container v-if="!loadingAllAppFunc">
      <v-layout row align-center> <!--row/column/align-center/justify-center/wrap-->
        <v-flex xs12>
          <code>Slider Carousel - https://vuetifyjs.com/ru/components/carousels</code>
          <v-carousel>
            <v-carousel-item
                    v-for="(add, index) in addsDataOnlyPromoFromStoreFunc"
                    v-bind:key="add.id"
                    v-bind:src="add.imgSrc"
            >
              <div class="carousel-link">
                <v-btn class="error" v-bind:to="'/single-add/' + add.id">{{ add.title }}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>

        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-else>
      <v-layout row>
        <v-flex class="text-xs-center" xs12>
          <v-progress-circular
                  :size="70"
                  :width="7"
                  color="purple"
                  indeterminate
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-lg>
      <v-layout row justify-center wrap> <!--row/column/align-center/justify-center/wrap-->
        <v-flex xs12 sm6 md6 lg4
                v-for="(add, index) of addsDataFromStoreFunc"
                v-bind:key="add.id"
                v-bind:src="add.imgSrc"
        >
          <v-card>
            <v-img
                    v-bind:src="add.imgSrc"
                    aspect-ratio="2.75"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ add.title }}</h3>
                <div>{{ add.description }}</div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat class="warning" v-bind:to="'/single-add/' + add.id">Open</v-btn>
            </v-card-actions>
          </v-card>

        </v-flex>
      </v-layout>
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
    addsDataFromStoreFunc: function () { // OR: addsDataFromStoreFunc() {..}
     
      return this.$store.getters.getAddsDataFunc
    }, 
    addsDataOnlyPromoFromStoreFunc: function () { // OR: addsDataOnlyPromoFromStoreFunc() {..}
      
      return this.$store.getters.getAddsDataOnlyPromoFunc
    }, // Взять те записи, у которых свойство "promo" true
    loadingAllAppFunc: function () {
      return this.$store.getters.getLoadingFunc
    }
  }
}
</script>

<style scoped lang="stylus">
h1, h2 {
  font-weight: normal;
}
#root_HomeComp {
  h2.identy-name-component-title{color:#0aa1c3;font-weight:normal;}
}

img.identy-img-component-img{width:70px;height:auto;}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
    a {
      color: #b9171f;
    }
}
.carousel-link{position: absolute; bottom:50px; left:50%; background:rgba(0, 0, 0, 0.5); transform:translate(-50%,0);padding:10px 20px; border-radius:6px;}
</style>
