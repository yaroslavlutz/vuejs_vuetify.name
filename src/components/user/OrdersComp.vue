<template>
    <div id="root_OrdersComp">
        <v-container fluid>
            <v-slide-y-transition mode="out-in">
                <v-layout row align-center> <!--row/column/align-center/justify-center/wrap-->
                    <img src="@/assets/logo.png" alt="Vuetify.js" class="identy-img-component-img">
                    <v-flex xs12>
                        <h2 class="identy-name-component-title">This is `OrdersComp.vue` Component</h2>
                    </v-flex>
                </v-layout>
            </v-slide-y-transition>
        </v-container>

        <v-container fluid>
            <v-layout row align-center> <!--row/column/align-center/justify-center/wrap-->
                <v-flex xs12 sm6 offset-sm3>
                    <h1 class="text--secondary mb-3">ORDERS</h1>
                    <v-list subheader two-line>
                        <v-subheader>LIST NOTIFICATION:</v-subheader>

                        <v-list-tile avatar v-if="ordersDataFromStoreFunc"
                                     v-for="(order, index) of ordersDataFromStoreFunc"
                                     v-bind:key="order.id"
                                     @click=""
                        >
                            <v-list-tile-action>
                                <v-checkbox color="success"
                                        v-bind:input-value="order.doneOrNot"
                                        v-on:change="onCheckBoxDoneFunc(order)"
                                ></v-checkbox>
                            </v-list-tile-action>

                            <v-list-tile-content @click="">
                                <v-list-tile-title>{{ order.nameCustomer }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ order.phoneCustomer }}</v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-btn class="primary" v-bind:to="'/single-add/' + order.addId"
                                >Open</v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                        <v-list-title v-else>
                            <p>У вас нет никаких заказов! </p>
                        </v-list-title>
                    </v-list>
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
            ordersData2: [
              {id: 'ID111', nameCustomer: 'Homer', phoneCustomer: '856-965-856', addId: '1', doneOrNot: false}
            ]
        */
      }
    },
    created: function () {
      this.$store.dispatch('fetchOrdersAction')
    },
    methods: {
      onCheckBoxDoneFunc: function (order) {
        console.log(order)
        console.log(order.id) // здесь будет ID этого ордера с`firebase`
        //
        console.log('doneOrNot --> ' + order.doneOrNot)
        let checkOrderDoneOrNot // объявляем переменную для булевского типа TRUE/FALSE и будем туда помещать нужное зн-е checkBox
        if (order.doneOrNot === true) { // сначала проверяем, этот заказ отмечен как выполненный или нет (стоит включенный checkBox изначально или нет)
          checkOrderDoneOrNot = false // если он уже чекнутый, то мы должны убрать его
        } else {
          checkOrderDoneOrNot = true // если он не чекнутый, то мы должны его чекнуть
        }

        let orderID = order.id // ID данного ордера!!
        this.$store.dispatch('orderDoneAction', {orderID, checkOrderDoneOrNot})
          .then(function () {
            order.doneOrNot = checkOrderDoneOrNot // поменщаем сюда зн-е TRUE/FALSE в зависимости от состояния checkBox и это зн-е будет лететь в`firebase`
          }).catch(function (error) {
          // Handle any errors
        })
      }
    },
    computed: {
      ordersDataFromStoreFunc: function () {
        return this.$store.getters.getOrdersDataFunc
      } // Взять все ордера, которые принадлежат данному Юзеру
    }
  }
</script>

<style scoped>
    h2.identy-name-component-title{color:#0aa1c3;font-weight:normal;}
    img.identy-img-component-img{width:70px;height:auto;}
</style>
