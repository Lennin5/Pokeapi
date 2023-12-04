<template>
  <v-app>
    <v-app-bar
      fixed
      :color="navigationDrawerColor"
      :dark="navigationDrawerColor !== 'white'"
      :light="navigationDrawerColor === 'white'"   
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
      :color="navigationDrawerColor"
      :dark="navigationDrawerColor !== 'white'"
      :light="navigationDrawerColor === 'white'"   
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
      <v-list-item :style="{padding: mini ? '7px' : '0px'}">
        <v-list-item-content>
          <v-list-item-title class="text-h6 d-flex justify-center">
            <img 
              @click="$router.push('/')"
              class="cursor-pointer"
              alt="Logo"
              style="object-fit: contain;"
              :src="mini ? LogoPokemonsMobile : LogoPokemons"
              width="100%"
              :height="mini ? 'auto' : '120' " />
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    

      <!-- Contenido del menú (iconos) -->
      <v-list dense>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          @click="menuItemClicked(item.path)"
          class="pt-2 pb-2"
          :dark="navigationDrawerColor !== 'white'"
          :light="navigationDrawerColor === 'white'"          
        >
          <v-list-item-icon>
            <v-icon :size="item.icon === 'mdi-checkbox-multiple-blank' ? '20' : '25'"
            >{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <div class="subtitle-2 font-weight-medium">{{ item.text }}</div>
          </v-list-item-content>
        </v-list-item>
      </v-list>


    </v-navigation-drawer>

    <!-- Contenido principal -->
    <v-main style="background-color: #f2f2f2;">
      <!-- Contenido principal de la aplicación -->
      <router-view :mini="mini"></router-view>
    </v-main>
  </v-app>
</template>

<script>
// images
import LogoPokemons from '@/assets/img/logo-pokemon.png';
import LogoPokemonsMobile from '@/assets/img/logo-pokemon-mobile.png';
import { useRootStore } from "@/assets/store/index";

export default {
  name: 'App',

  data: () => ({
    LogoPokemons: LogoPokemons,
    LogoPokemonsMobile: LogoPokemonsMobile,
    drawer: true, // Controla el estado de la barra lateral (colapsada o expandida)
    mini: false, // Controla el estado mini del menú (solo iconos)
    menuItems: [ // Define los elementos del menú
      { text: 'Homepage', icon: 'mdi-home-variant', path: '/' },
      { text: 'All Pokemons', icon: 'mdi-cards', path: '/all-pokemons' },
      { text: 'All Types', icon: 'mdi-checkbox-multiple-blank', path: '/type' },
      { text: 'Legendary Pokemons', icon: 'mdi-star', path: '/legendary-pokemons'},
      { text: 'API', icon: 'mdi-open-in-new', path: 'https://pokeapi.co/' },
      { text: 'lenninlemus.com', icon: 'mdi-coffee', path: 'https://lenninlemus.com'}
    ],
    rootStore: useRootStore(),
    /* navigationDrawerColor: 'orange', */
  }),

  methods: {
    menuItemClicked(path) {
      // Agrega lógica para manejar la selección de elementos del menú aquí
      window.location.href = path;
    },

    toggleMenu() {
      this.mini = !this.mini; // Alterna entre el estado mini y expandido del menú
    },
  },
  
  computed: {
    // Agrega lógica para manejar el color de la barra lateral aquí
    navigationDrawerColor() {
      return this.rootStore.getNavigationDrawerColor;
    }    
  },
};
</script>

<style>
/* Agrega estilos personalizados según tus necesidades */
</style>
