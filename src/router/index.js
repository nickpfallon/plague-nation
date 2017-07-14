import Vue from 'vue';
import Router from 'vue-router';
import Mapbox from '@/components/Mapbox';

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Splash',
    //   component: Splash,
    // },
    {
      path: '/map',
      name: 'Mapbox',
      component: Mapbox,
    },
  ],
});
