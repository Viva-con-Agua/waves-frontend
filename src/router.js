import Vue from 'vue';
import Router from 'vue-router';
import PoolEvents from './views/PoolEvents';
import PoolEventView from './views/PoolEventView';
import PoolEventFormView from './views/PoolEventFormView';
import EditPoolEventFormView from './views/EditPoolEventFormView';
import ApplicationHandlerView from "./views/ApplicationHandlerView.vue";
import home from "./views/home.vue";


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
      path: '/poolevent/:id' ,
      name: 'pooleventview',
      component: PoolEventView
    },
    {
      path: '/pooleventform',
      name: 'PoolEventFormView',
      component: PoolEventFormView
    },
    {
      path: '/editpooleventform/:id',
      name: 'EditPoolEventFormView',
      component: EditPoolEventFormView  
    },
    {
      path: '/applications/:id',
      name: 'applications',
      component: ApplicationHandlerView  
    },
    {
      path: '/home',
      name: 'heme',
      component: home  
    }
  ]
})
