<template>
  <div>
    <v-app-bar
      app
      color="orange"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="2"
          :src="LogoPokemons"
          style="width: 200px;"
        />
        <!-- <h1>Pokemon Api</h1> -->
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <router-view></router-view>
  </div>
</template>

<script>

import LogoPokemons from '@/assets/img/logo-pokemon.png';
export default {
  name: 'App',

  data: () => ({
    //
    LogoPokemons: LogoPokemons
  }),
};
</script>
