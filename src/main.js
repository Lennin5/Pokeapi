import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import GlobalMethods from './utils/customMethods';
import PokemonsList from './components/PokemonsList';
import PokemonDetails from './components/PokemonDetails';
import PokemonTypes from './components/PokemonTypes';
import PokemonType from './components/PokemonType';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: PokemonsList },
  { path: '/details', component: PokemonDetails },
  { path: '/type', component: PokemonTypes },
  { path: '/type/:type', component: PokemonType }
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
