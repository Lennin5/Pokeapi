<template>
  <v-app>
    <v-app-bar
      :color="navigationDrawerColor"
      :theme="navigationDrawerColor !== 'white' ? 'dark' : 'light'"
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
    <v-container class="d-md-block d-lg-none" />

    <v-navigation-drawer
      app
      :color="navigationDrawerColor"
      :theme="navigationDrawerColor !== 'white' ? 'dark' : 'light'"
      style="transition: 0.3s ease-in-out;"
      v-model="drawer"
      v-model:rail="mini"
      class="d-block"
    >

      <v-list-item>
        <template #title>
          <div class="text-h6 d-flex" :class="mini ? 'justify-center' : 'justify-end'" style="width: 100%">
            <!-- Button to expand/collapse the menu -->
            <v-btn size="x-small" icon @click.stop="mini = !mini" class="d-none d-lg-flex">
              <v-icon>{{ mini ? 'mdi-arrow-collapse-right' : 'mdi-arrow-collapse-left' }}</v-icon>
            </v-btn>
            <!-- Button to show/hide the menu -->
            <v-btn icon @click.stop="drawer = !drawer" class="d-md-block d-lg-none">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </template>
      </v-list-item>

      <!-- Logo -->
      <v-list-item :style="{padding: mini ? '7px' : '0px'}">
        <template #title>
          <div class="text-h6 d-flex justify-center">
            <img
              @click="$router.push('/')"
              class="cursor-pointer"
              alt="Logo"
              style="object-fit: contain;"
              :src="mini ? LogoPokemonsMobile : LogoPokemons"
              width="100%"
              :height="mini ? 'auto' : '120'" />
          </div>
        </template>
      </v-list-item>

      <!-- Menu items -->
      <v-list density="compact">
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          @click="menuItemClicked(item.path)"
          class="pt-2 pb-2"
        >
          <template #prepend>
            <v-icon :size="item.icon === 'mdi-checkbox-multiple-blank' ? '20' : '25'">{{ item.icon }}</v-icon>
          </template>
          <div class="text-subtitle-2 font-weight-medium">{{ item.text }}</div>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <!-- Main content -->
    <v-main style="background-color: #f2f2f2;">
      <router-view :mini="mini"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import LogoPokemons from '@/assets/img/logo-pokemon.png';
import LogoPokemonsMobile from '@/assets/img/logo-pokemon-mobile.png';
import { useRootStore } from "@/assets/store/index";

export default {
  name: 'App',

  data: () => ({
    LogoPokemons: LogoPokemons,
    LogoPokemonsMobile: LogoPokemonsMobile,
    drawer: true,
    mini: false,
    menuItems: [
      { text: 'Homepage', icon: 'mdi-home-variant', path: '/' },
      { text: 'All Pokemons', icon: 'mdi-cards', path: '/all-pokemons' },
      { text: 'All Types', icon: 'mdi-checkbox-multiple-blank', path: '/type' },
      { text: 'Legendary Pokemons', icon: 'mdi-star', path: '/legendary-pokemons' },
      { text: 'Pokémon Game', icon: 'mdi-gamepad-variant', path: '/pokemon-game' },
      { text: 'API', icon: 'mdi-api', path: 'https://pokeapi.co/' },
      { text: 'lenninlemus.com', icon: 'mdi-coffee', path: 'https://lenninlemus.com' },
    ],
    rootStore: useRootStore(),
  }),

  methods: {
    menuItemClicked(path) {
      window.location.href = path;
    },

    toggleMenu() {
      this.mini = !this.mini;
    },
  },

  computed: {
    navigationDrawerColor() {
      return this.rootStore.getNavigationDrawerColor;
    },
  },
};
</script>

<style>
/* Custom styles */
</style>
