<template>
    <div id="root_RegistrationComp">
        <v-container fluid>
            <v-layout align-center justify-center> <!--row/column/align-center/justify-center/wrap-->
                <img src="@/assets/logo.png" alt="Vuetify.js" class="identy-img-component-img">
                <v-flex xs12>
                    <h2 class="identy-name-component-title">This is `RegistrationComp.vue` Component</h2>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container fluid fill-height>
            <v-layout align-center justify-center> <!--row/column/align-center/justify-center/wrap-->
                <v-flex xs12 sm9 md6 lg6>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Registration form</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-icon left large>lock</v-icon>
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="ref_form" lazy-validation
                                    v-model="validCheckFormLogin">

                                <v-text-field id="name" prepend-icon="person" name="name" label="Name User" type="text"
                                              v-model="name"
                                              v-bind:counter="5"
                                              v-bind:rules="thisNameRules"
                                              required
                                ></v-text-field>
                                <v-text-field id="email" prepend-icon="person" name="email" label="E-mail" type="email"
                                              v-model="email"
                                              v-bind:rules="thisEmailRules"
                                              required
                                ></v-text-field>
                                <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"
                                              v-model="password"
                                              v-bind:counter="6"
                                              v-bind:rules="thisPasswordRules"
                                              required
                                ></v-text-field>
                                <v-text-field id="confirm_password" prepend-icon="lock" name="confirm_password" label="Confirm Password" type="password"
                                              v-model="confirmPassword"
                                              v-bind:counter="6"
                                              v-bind:rules="thisConfirmPasswordRules"
                                              required
                                ></v-text-field>

                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"
                                   v-on:click="onSubmitFunc"
                                   v-bind:loading="loadingFunc"
                                   v-bind:disabled="!validCheckFormLogin"
                            >Create Account</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>

</template>


<script>
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ /* регулярное выр-е для валидации корректности E-mail пользователя */

  export default {
    data () {
      return {
        name: '',
        thisNameRules: [ 
          function (v) {
            if (v) { return true } else { return 'Name User is required' } // OR: v => !!v || 'Name User is required',
          },
          function (v) {
            if (v && v.length >= 5) { return true } else { return 'Name User должен быть не менее 5 символов' } // OR: v => (v && v.length >= 5) || 'Name User должен быть не менее 5 символов' // v => (v && v.length <= 5) || 'Name User должен быть менее 5 символов'
          }
        ],
        email: '',
        thisEmailRules: [ 
          function (v) {
            if (v) { return true } else { return 'E-mail is required' } // OR: v => !!v || 'E-mail is required',
          },
          function (v) {
            if (emailRegex.test(v)) { return true } else { return 'E-mail must be valid' } // v => emailRegex.test(v) || 'E-mail must be valid' // OR: v => /.+@.+/.test(v) || 'E-mail must be valid'
          }
        ],
        password: '',
        thisPasswordRules: [  
          function (v) {
            if (v) { return true } else { return 'Password is required' } // OR: v => !!v || 'Password is required',
          },
          function (v) {
            if (v && v.length >= 6) { return true } else { return 'Password должен быть не менее 6 символов' } // OR: v => (v && v.length >= 6) || 'Password должен быть не менее 6 символов' // v => (v && v.length <= 6) || 'Password должен быть менее 6 символов'
          }
        ],
        confirmPassword: '',
        thisConfirmPasswordRules: [ 
          function (v) {
            if (v) { return true } else { return 'Confirm Password is required' } // OR: v => !!v || 'Confirm Password is required',
          },
          v => v === this.password || 'Confirm Password должен совпадать с полем Password'
        ],
        validCheckFormLogin: false
      }
    },
    methods: {
      onSubmitFunc: function () {
        if (this.$refs.ref_form.validate()) {
          const userObjValidation = {
            name: this.name,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword
          }
          this.validCheckFormLogin = true
          console.log(userObjValidation)

          this.$store.dispatch('registrUserAction', userObjValidation)
        }
        // clear field of form Registration
        this.name = ''
        this.email = ''
        this.password = ''
        this.confirmPassword = ''
        // redirect to `Home` page
        this.$router.push('/')
      }
    },
    computed: {
      loadingFunc () {
        return this.$store.getters.getLoadingFunc
      }
    }
  }
</script>

<style scoped>
    h2.identy-name-component-title{color:#0aa1c3;font-weight:normal;}
    img.identy-img-component-img{width:70px;height:auto;}
</style>
