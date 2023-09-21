import Vue from 'vue';
import './assets/scss/main.scss'
import App from './App.vue';
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import GlobalMethods from './utils/customMethods';
import PokemonsList from './components/Homepage';
import PokemonDetails from './components/PokemonDetails';
import PokemonTypes from './components/PokemonTypes';
import PokemonsTypeList from './components/PokemonsTypeList';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: PokemonsList },
  { path: '/details', component: PokemonDetails },
  { path: '/type', component: PokemonTypes },
  { path: '/type/:type', component: PokemonsTypeList }
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
