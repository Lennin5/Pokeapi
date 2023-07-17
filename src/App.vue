<template>
  <v-app>
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
      </div>
      <v-btn href="/" text>
        <span class="mr-2">Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>      

      <v-spacer></v-spacer>



      <v-btn
        href="https://pokeapi.co/api/v2/pokemon/"
        target="_blank"
        text
      >
        <span class="mr-2">Pokeapi</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// images
import LogoPokemons from '@/assets/img/logo-pokemon.png';

export default {
  name: 'App',

  data: () => ({
    LogoPokemons: LogoPokemons
  }),
};
</script>
