<template>
  <v-app>
    <v-app-bar
      fixed
      color="orange"
      dark
      class="d-md-block d-lg-none"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title class="d-flex justify-center w-100" style="margin-right: 50px;">
        <img 
          @click="$router.push('/')"
          class="cursor-pointer pa-4"
          style="object-fit: contain;"
          :src="mini ? LogoPokemonsMobile : LogoPokemons"
          alt="Logo" height="100" width="100%" 
        />        
      </v-toolbar-title>
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

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6 d-flex justify-end" :class="mini ? 'justify-center' : 'justify-end'" width="100%">
          <!-- Botón para expandir/contraer el menú -->
          <v-btn x-small icon @click.stop="mini = !mini" class="d-none d-lg-flex ">
            <v-icon>{{ mini ? 'mdi-arrow-collapse-right' : 'mdi-arrow-collapse-left' }}</v-icon>
          </v-btn>         
          <!-- Botón para mostrar/ocultar el menú -->   
          <v-btn icon @click.stop="drawer = !drawer" class="d-md-block d-lg-none">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

      <!-- Logo o título -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 d-flex justify-center">
            <img 
              @click="$router.push('/')"
              class="cursor-pointer"
              alt="Logo"
              style="object-fit: contain;"
              :src="mini ? LogoPokemonsMobile : LogoPokemons"
              width="100%"
              :height="mini ? 'auto' : '100' " />
          </v-list-item-title>
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
      { text: 'Homepage', icon: 'mdi-home' },
      { text: 'All Pokemons', icon: 'mdi-cards' },
      { text: 'All Types', icon: 'mdi-checkbox-multiple-blank' },
      { text: 'About', icon: 'mdi-information' },
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
