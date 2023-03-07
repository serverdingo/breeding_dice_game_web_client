import Vue from 'vue';
import Router from 'vue-router';
import Main from '../components/Main.vue';
import Breed from '../components/Breed.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
    {
      path: '/breed',
      name: 'Breed',
      component: Breed,
    },
  ],
});
