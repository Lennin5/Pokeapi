import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import PokemonsList from './components/PokemonsList';
import RedRed from './components/RedRed';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: PokemonsList },
  { path: '/red', component: RedRed },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');

Vue.config.productionTip = false;
