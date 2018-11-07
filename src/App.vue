<template>
  <v-app> <!--Единственный корневой инициализурующий тег для `Vuetify`-->

    <!--Navigation Drawer-->
    <v-navigation-drawer app temporary
      v-model="drawer"
    >
      <v-list>
        <v-list-tile
                  v-for="i_link of linksData"
                  v-bind:key="i_link.title"
                  v-on:click=""
                  v-bind:to="i_link.url"
        >
          <v-list-tile-action>
            <v-icon color="pink">{{ i_link.iconName }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="i_link.title"></v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-avatar>
            <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-0">
          </v-list-tile-avatar>
        </v-list-tile>

        <!--LogOut-->
        <v-list-tile flat
                     v-if="isUserLoggedInFunc"
                     v-on:click="onLogoutFunc()"
        >
          <v-list-tile-action>
            <v-icon color="pink">exit_to_app</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>LogOut</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-avatar>
            <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-0">
          </v-list-tile-avatar>
        </v-list-tile>
        <!--/LogOut-->
      </v-list>
    </v-navigation-drawer>
    <!--/Navigation Drawer-->

    <!--Navigation Tool-bar-->
    <v-toolbar app dark color="primary">
      <v-toolbar-side-icon class="hidden-md-and-up"
                            v-on:click="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">LITTUS</router-link>
      </v-toolbar-title>
      <v-btn flat v-on:click="" v-bind:to="`/`">HOME</v-btn>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat
                 v-for="i_link of linksData"
                 v-bind:key="i_link.title"
                 v-bind:to="i_link.url"
          >
            <v-icon left large>{{ i_link.iconName }}</v-icon> {{ i_link.title }}
          </v-btn>

        <!--LogOut-->
          <v-btn flat
                 v-if="isUserLoggedInFunc"
                 v-on:click="onLogoutFunc()">
            <v-icon left large>exit_to_app</v-icon> LogOut
          </v-btn>
        <!--/LogOut-->
      </v-toolbar-items>

    </v-toolbar>
    <!--/Navigation Tool-bar-->

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app></v-footer>

    <!--Блок Показа пользователю сообщений: Регистрация/Логинация/Ошибки ...  v-model="snackbar" v-on:click="snackbar = false"-->
    <template v-if="errorFunc">
      <v-snackbar color="error"
                  v-bind:multi-line="true"
                  v-bind:timeout="9000"
                  v-on:input="snackbarCloseFunc()"
                  v-bind:value="true"
      >
        {{ errorFunc }}
        <v-btn flat color="dark"
               v-on:click="snackbarCloseFunc()"
        >Close</v-btn>

      </v-snackbar>
    </template>
    <!--/Блок Показа пользователю сообщений: Регистрация/Логинация/Ошибки ...-->

  </v-app> <!--/Единственный корневой инициализурующий тег для `Vuetify`-->
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      title: 'Vuetify.js',
      drawer: false
      /*
        linksData: [
          {title: 'Login', iconName: 'account_circle', iconSize: 'large', url: '/login'},
          {title: 'Registration', iconName: 'accessibility', iconSize: 'large', url: '/registration'},
          {title: 'Orders', iconName: 'bookmark_border', iconSize: 'large', url: '/orders'},
          {title: 'New add', iconName: 'note_add', iconSize: 'large', url: '/new-add'},
          {title: 'List', iconName: 'list', iconSize: 'large', url: '/list'}
        ]
      */
    }
  },
  methods: {
    snackbarCloseFunc: function () {
      this.$store.dispatch('clearErrorAction')
    },
    onLogoutFunc: function () {
      this.$store.dispatch('logoutUserAction')
      this.$router.push('/')
    }
  },
  computed: {
    errorFunc: function () {
      return this.$store.getters.getErrorFunc
    },
    isUserLoggedInFunc: function () {
      return this.$store.getters.isUserLoggedInFunc
    },
    linksData: function () {
      if (!this.isUserLoggedInFunc) {
        return [
          {title: 'Login', iconName: 'account_circle', iconSize: 'large', url: '/login'},
          {title: 'Registration', iconName: 'accessibility', iconSize: 'large', url: '/registration'},
        ]
      } else {
        return [
          {title: 'Orders', iconName: 'bookmark_border', iconSize: 'large', url: '/orders'},
          {title: 'New add', iconName: 'note_add', iconSize: 'large', url: '/new-add'},
          {title: 'List', iconName: 'list', iconSize: 'large', url: '/list'}
        ]
      }
    }
  }
}
</script>

<style scoped>
  .pointer{cursor:pointer;}
</style>