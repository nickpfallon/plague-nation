import Vue from 'vue';
import Router from 'vue-router';
import Mapbox from '@/components/Mapbox';
import Splash from '@/components/Splash';
import CountryChart from '@/components/CountryChart'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Splash',
      component: Splash,
    },
    {
      path: '/map',
      name: 'Mapbox',
      components: {
        default: Mapbox,
        // chart: CountryChart
      },
    },
    // {
    //   path: '/map',
    //   name: 'CountryChart',
    //   component: CountryChart,
    // }
  ],
});
