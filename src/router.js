import Vue from 'vue';
import Router from 'vue-router';
import PoolEvents from './views/PoolEvents';
import PoolEventView from './views/PoolEventView';
import PoolEventForm from './views/PoolEventForm';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PoolEvents',
      component: PoolEvents
    },
    {
      path: '/pooleventview/:id' ,
      name: 'pooleventview',
      component: PoolEventView
    },
    {
      path: '/pooleventform',
      name: 'PoolEventForm',
      component: PoolEventForm
    }
  ]
})
