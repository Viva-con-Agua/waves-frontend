import Vue from 'vue';
import Router from 'vue-router';
import Actions from './views/Actions';
import ActionView from './views/ActionView';
import ActionForm from './views/ActionForm';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'actions',
      component: Actions
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
