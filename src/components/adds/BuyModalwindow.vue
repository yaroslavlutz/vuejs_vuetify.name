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
        modelWindow: false,
        nameCustomer: '', 
        phoneCustomer: '' 
      }
    },
    created: function () {

    },
    methods: {
      onCancelFunc: function () {
        this.nameCustomer = '' 
        this.phoneCustomer = '' 
        //
        this.modelWindow = false 
      },
      onSaveFunc: function () {
        if (this.nameCustomer !== '' && this.phoneCustomer !== '') { 
          this.$store.dispatch('createOrderAction', {
            nameCustomer: this.nameCustomer,
            phoneCustomer: this.phoneCustomer,
            addId: this.$store.getters.getAddByIdFunc.id,
            ownerID: this.$store.getters.getAddByIdFunc.ownerID
          })
          //
          this.nameCustomer = '' 
          this.phoneCustomer = '' 
          this.modelWindow = false 
        }
      }
    },
    computed: {
      // some code if you want..
    }
  }
</script>

