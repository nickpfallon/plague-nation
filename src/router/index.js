import Vue from 'vue';
import Router from 'vue-router';
import Mapbox from '@/components/Mapbox';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Mapbox',
      component: Mapbox,
    },
  ],
});
