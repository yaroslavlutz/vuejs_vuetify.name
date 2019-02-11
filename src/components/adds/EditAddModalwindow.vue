<template>
    <v-layout row justify-center>
        <v-dialog v-model="modelWindow" persistent max-width="400px">
            <v-spacer></v-spacer>
            <v-btn slot="activator" color="primary" dark>Edit</v-btn>

            <v-card>
                <v-layout>
                    <v-flex xs12>
                        <v-card-title>
                            <h1 class="text--primary">Edit this</h1>
                        </v-card-title>
                    </v-flex>
                </v-layout>
                        <v-divider></v-divider>
                <v-layout>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field id="title" prepend-icon="person" name="title" label="TITLE" type="text"
                                          v-model="editedTitle"
                                          required
                            ></v-text-field>
                            <v-textarea id="description" prepend-icon="person" name="description" label="DESCRIPTION" type="text" multi-line
                                        v-model="editedDescription"
                                        required
                            ></v-textarea>
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
        editedTitle: null, 
        editedDescription: null
      }
    },
    created: function () {
      this.editedTitle = this.$store.getters.getAddByIdFunc.title
      this.editedDescription = this.$store.getters.getAddByIdFunc.description
    },
    methods: {
      onCancelFunc: function () {
        this.editedTitle = this.$store.getters.getAddByIdFunc.title
        this.editedDescription = this.$store.getters.getAddByIdFunc.description
        //
        this.modelWindow = false
      },
      onSaveFunc: function () {
        if (this.editedTitle !== '' && this.editedDescription !== '') { 
          this.$store.dispatch('updateSingleAddAction', {
            title: this.editedTitle,
            description: this.editedDescription,
            id: this.$store.getters.getAddByIdFunc.id
          }) 
          this.modelWindow = false 
        }
      }
    },
    computed: {
      // some code if you want..
    }
  }
</script>
