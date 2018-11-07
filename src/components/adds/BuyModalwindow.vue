<template>
    <v-layout row justify-center>
        <v-dialog v-model="modelWindow" persistent max-width="400px">
            <v-spacer></v-spacer>
            <v-btn slot="activator" raised color="green">Buy</v-btn>

            <v-card>
                <v-layout>
                    <v-flex xs12>
                        <v-card-title>
                            <h1 class="text--primary">Buy this?</h1>
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field id="name_of_customer" prepend-icon="person" name="nameCustomer" label="YOUR NAME" type="text"
                                          v-model="nameCustomer"
                                          required
                            ></v-text-field>
                            <v-text-field id="phone_of_customer" prepend-icon="person" name="phoneCustomer" label="YOUR PHONE" type="text"
                                        v-model="phoneCustomer"
                                        required
                            ></v-text-field>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="warning" @click="onCancelFunc()">Cancel</v-btn>
                            <v-btn class="success" v-on:click="onSaveFunc()">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-card>

        </v-dialog>
    </v-layout>
</template>


<script>
  export default {
    data () {
      return {
        modelWindow: false, // управление отображением / скрытием модального окна - FALSE - модальное окно с формой скрывается
        nameCustomer: '', // модель input-поля c id="name_of_customer"
        phoneCustomer: '' // модель input-поля c id="phone_of_customer"
      }
    },
    created: function () {
      // this.editedTitle = this.$store.getters.getAddByIdFunc.title // в соответствующую модель загоняем данные из БД`firebase` и эти данные выводятся в соотв.поле `input`
      // this.editedDescription = this.$store.getters.getAddByIdFunc.description // в соответствующую модель загоняем данные из БД`firebase` и эти данные выводятся в соотв.поле `input`
    },
    methods: {
      onCancelFunc: function () {
        this.nameCustomer = '' // чтобы при закрытии окна поля очищались
        this.phoneCustomer = '' // чтобы при закрытии окна поля очищались
        //
        this.modelWindow = false // закрываем модальное окно с формой
      },
      onSaveFunc: function () {
        if (this.nameCustomer !== '' && this.phoneCustomer !== '') { // если данные поля в форме Не равны пустой строке,т.е поля заполнены
          this.$store.dispatch('createOrderAction', {
            nameCustomer: this.nameCustomer,
            phoneCustomer: this.phoneCustomer,
            addId: this.$store.getters.getAddByIdFunc.id,
            ownerID: this.$store.getters.getAddByIdFunc.ownerID
          }) // вместо получения ID записи путем:`this.$store.getters.getAddByIdFunc.id` можно воспользоваться и этой нашей Ф-ей:`this.$store.getters.getIdSingleRecord`
          //
          this.nameCustomer = '' // чтобы при закрытии окна поля очищались
          this.phoneCustomer = '' // чтобы при закрытии окна поля очищались
          this.modelWindow = false // закрываем модальное окно с формой
        }
      }
    },
    computed: {
      // some code if you want..
    }
  }
</script>

