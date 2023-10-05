import Vue from 'vue';
import './assets/scss/main.scss'
import App from './App.vue';
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import GlobalMethods from './utils/customMethods';
import Homepage from './views/Homepage';
import PokemonDetails from './views/PokemonDetails';
import PokemonTypes from './views/PokemonTypes';
import PokemonType from './views/PokemonType';
import AllPokemonsView from './views/AllPokemonsView';
import PokemonLocationView from './views/PokemonLocationView';
import PokemonRegionView from './views/PokemonRegionView';
import CoffeeTestsView from './views/CoffeeTestsView';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Homepage },
  { path: '/details', component: PokemonDetails },
  { path: '/type', component: PokemonTypes },
  { path: '/type/:type', component: PokemonType },
  { path: '/all-pokemons', component: AllPokemonsView},
  { path: '/location', component: PokemonLocationView},
  { path: '/region/:region', component: PokemonRegionView},
  { path: '/coffee', component: CoffeeTestsView}
];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  vuetify,
  GlobalMethods,
  render: h => h(App)
}).$mount('#app');

Vue.config.productionTip = false;
