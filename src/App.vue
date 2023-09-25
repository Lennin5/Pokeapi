<template>
  <v-app>
    <v-app-bar
      fixed
      color="orange"
      dark
      scroll-target="#scrolling-techniques-6"
      class="d-md-block d-lg-none"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Collapsing Bar</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-container
      class="d-md-block d-lg-none"
    />

    <v-navigation-drawer
      app
      color="orange"
      dark
      v-model="drawer"
      :mini-variant.sync="mini"
      class="d-block"
    >



      <!-- Logo o título -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 d-flex justify-center">
            <img 
            style="object-fit: contain;"
            :src="mini ? LogoPokemonsMobile : LogoPokemons"
            alt="Logo" height="100" width="100%" />
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Botón para expandir/contraer el menú -->
      <v-list-item @click="toggleMenu" class="d-none d-lg-flex">
        <v-list-item-icon>
          <v-icon>{{ mini ? 'mdi-arrow-expand-all' : 'mdi-arrow-collapse-all' }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ mini ? 'Expandir' : 'Contraer' }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>      

      <!-- Botón para mostrar/ocultar el menú -->
      <v-list-item @click="drawer = !drawer" class="d-md-block d-lg-none">
        <v-list-item-icon>
          <v-icon>{{ mini ? 'mdi-menu' : 'mdi-menu' }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ mini ? 'Mostrar' : 'Ocultar' }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>          

      <!-- Contenido del menú (iconos) -->
      <v-list dense>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          @click="menuItemClicked(item)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>


    </v-navigation-drawer>

    <!-- Contenido principal -->
    <v-main style="background-color: #f2f2f2;">
      <!-- Contenido principal de la aplicación -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// images
import LogoPokemons from '@/assets/img/logo-pokemon.png';
import LogoPokemonsMobile from '@/assets/img/logo-pokemon-mobile.png';

export default {
  name: 'App',

  data: () => ({
    LogoPokemons: LogoPokemons,
    LogoPokemonsMobile: LogoPokemonsMobile,
    drawer: true, // Controla el estado de la barra lateral (colapsada o expandida)
    mini: false, // Controla el estado mini del menú (solo iconos)
    menuItems: [ // Define los elementos del menú
      { text: 'Opción 1', icon: 'mdi-home' },
      { text: 'Opción 3', icon: 'mdi-account' },
    ],
  }),

  methods: {
    menuItemClicked(item) {
      // Agrega lógica para manejar la selección de elementos del menú aquí
      console.log('Elemento del menú seleccionado:', item.text);
    },

    toggleMenu() {
      this.mini = !this.mini; // Alterna entre el estado mini y expandido del menú
    },
  },
};
</script>

<style>
/* Agrega estilos personalizados según tus necesidades */
</style>
