<template>
    <div id="root_NewAddComp">
        <v-container fluid>
            <v-layout row align-center> <!--row/column/align-center/justify-center/wrap-->
                <img src="@/assets/logo.png" alt="Vuetify.js" class="identy-img-component-img">
                <v-flex xs12>
                    <h2 class="identy-name-component-title">This is `NewAddComp.vue` Component</h2>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container fluid>
            <v-layout row align-center> <!--row/column/align-center/justify-center/wrap-->
                <v-flex xs12 sm6 offset-sm3>
                    <h1 class="text--secondary">Create new Add</h1>
                    <v-card-text>
                        <v-form ref="ref_form" lazy-validation
                                v-model="validCheckFormNewAdd">

                            <v-text-field id="title" prepend-icon="spellcheck" name="title" label="Add new title" type="text"
                                          v-model="title"
                                          v-bind:rules="thisTitleRules"
                                          required
                            ></v-text-field>
                            <v-text-field id="description" prepend-icon="spellcheck" name="description" label="Add new Description" type="text"
                                          v-model="description"
                                          v-bind:rules="thisDescriptionRules"
                                          multi-line
                                          no-resize
                                          required
                            ></v-text-field>
                        </v-form>
                    </v-card-text>

                    <v-layout xs12 row>
                        <v-flex xs12>
                            <v-btn class="warning"
                                   v-on:click="triggerClickInputFileUploadFunc()"
                            >Upload
                                <v-icon right dark>cloud_upload</v-icon>
                            </v-btn>
                            <input type="file" accept="image/*" ref="inputFileUpload" style="display:none;"
                                   v-on:change="onInputFileChangeFunc($event)"
                            >
                            <img v-bind:src="imageSrc" height="150" width="100%" alt="" v-if="imageSrc"> <!-- https://cdn.vuetifyjs.com/images/carousel/sky.jpg -->
                        </v-flex>
                    </v-layout>

                    <v-layout row class="mt-3">
                        <v-flex xs12>
                            <v-switch color="orange"
                                      v-bind:label="`Add to promo`"
                                      v-model="promo"
                            ></v-switch>
                        </v-flex>
                    </v-layout>

                    <v-layout row class="mt-3">
                        <v-flex xs12>
                            <v-btn class="success"
                                   v-bind:disabled="!validCheckFormNewAdd"
                                   v-on:click="onSubmitFunc()"
                            >Create New Add</v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>


<script>
  export default {
    data () {
      return {
        title: '',
        thisTitleRules: [  
          function (v) {
            if (v) { return true } else { return 'Add new title is required' } // OR: v => !!v || 'Add new title is required',
          }
        ],
        description: '',
        thisDescriptionRules: [ 
          function (v) {
            if (v) { return true } else { return 'Add new Description is required' } // OR: v => !!v || 'Add new Description is required',
          }
        ],
        promo: false,
        validCheckFormNewAdd: false,

        imageObj: null, 
        imageSrc: '' 
      }
    },
    methods: {
      onSubmitFunc: function () { // onSubmitFunc(){..}
        if (this.$refs.ref_form.validate() && this.image !== '') {
          const newAddObjValidation = {
            title: this.title,
            description: this.description,
            promo: this.promo,
            // imgSrc: 'https://cdn-images-1.medium.com/max/1200/1*nq9cdMxtdhQ0ZGL8OuSCUQ.jpeg'
            imgSrc2: this.imageObj
          }
          this.validCheckFormNewAdd = true
          console.log(newAddObjValidation)

          this.$store.dispatch('createNewAddAction', newAddObjValidation)
          this.title = ''
          this.description = ''
          this.promo = ''
          this.$router.push('/list')
        }
      },
      triggerClickInputFileUploadFunc: function () {
        this.$refs.inputFileUpload.click()
      },
      onInputFileChangeFunc: function (event) {
        let uploadFile = event.target.files[0] 
        const readerFile = new FileReader() 

        readerFile.onload = e => { 
          this.imageSrc = readerFile.result 
        }
        readerFile.readAsDataURL(uploadFile) 
        this.imageObj = uploadFile 
      }
    }
  }
</script>

<style scoped>
    h2.identy-name-component-title{color:#0aa1c3;font-weight:normal;}
    img.identy-img-component-img{width:70px;height:auto;}
</style>
