import Vue from 'vue';
import Router from 'vue-router';
import PoolEvents from './views/PoolEvents';
import ActionView from './views/ActionView';
import ActionForm from './views/ActionForm';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'actions',
      component: PoolEvents
    },
    {
      path: '/actionView' ,
      name: 'actionView',
      component: ActionView
    },
    {
      path: '/actionform',
      name: 'ActionForm',
      component: ActionForm
    }

  ]
})
