import { createApp } from 'vue';
import './assets/scss/main.scss';
import App from './App.vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import vuetify from './plugins/vuetify';
import {
  getElementTypeLogo,
  getElementColorNormal,
  getElementColorHex,
  getRandomPokemonType,
  getRandomPokemonColorNormal,
  getRandomPokemonColorHex,
  setElementOpacity,
} from './utils/customMethods';
import Homepage from './views/Homepage';
import PokemonDetails from './views/PokemonDetails';
import PokemonTypes from './views/PokemonTypes';
import PokemonType from './views/PokemonType';
import AllPokemonsView from './views/AllPokemonsView';
import PokemonLocationView from './views/PokemonLocationView';
import PokemonRegionView from './views/PokemonRegionView';
import LegendaryPokemonsView from './views/LegendaryPokemonsView';

const pinia = createPinia();

const routes = [
  { path: '/', component: Homepage },
  { path: '/details', component: PokemonDetails },
  { path: '/pokemon/:id', component: PokemonDetails },
  { path: '/type', component: PokemonTypes },
  { path: '/type/:type', component: PokemonType },
  { path: '/all-pokemons', component: AllPokemonsView },
  { path: '/location', component: PokemonLocationView },
  { path: '/region/:region', component: PokemonRegionView },
  { path: '/legendary-pokemons', component: LegendaryPokemonsView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.config.globalProperties.getElementTypeLogo = getElementTypeLogo;
app.config.globalProperties.getElementColorNormal = getElementColorNormal;
app.config.globalProperties.getElementColorHex = getElementColorHex;
app.config.globalProperties.getRandomPokemonType = getRandomPokemonType;
app.config.globalProperties.getRandomPokemonColorNormal = getRandomPokemonColorNormal;
app.config.globalProperties.getRandomPokemonColorHex = getRandomPokemonColorHex;
app.config.globalProperties.setElementOpacity = setElementOpacity;

app.use(router);
app.use(pinia);
app.use(vuetify);
app.mount('#app');
