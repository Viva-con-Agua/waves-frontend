import ApplicationHandlerView from "./views/ApplicationHandlerView.vue";
import EditPoolEventFormView from "./views/EditPoolEventFormView";
import PoolEventFormView from "./views/PoolEventFormView";
import PoolEventView from "./views/PoolEventView";
import BadgesView from "./views/BadgesView";
import PoolEvents from "./views/PoolEvents";
import home from "./views/home.vue";
import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/waves",
      name: "PoolEvents",
      component: PoolEvents
    },
    {
      path: "/waves/poolevent/:id",
      name: "pooleventview",
      component: PoolEventView
    },
    {
      path: "/waves/create",
      name: "PoolEventFormView",
      component: PoolEventFormView
    },
    {
      path: "/waves/editpooleventform/:id",
      name: "EditPoolEventFormView",
      component: EditPoolEventFormView
    },
    {
      path: "/waves/applications/:id",
      name: "applications",
      component: ApplicationHandlerView
    },
    {
      path: "/home",
      name: "heme",
      component: home
    },
    {
      path: "/waves/badges",
      name: "BadgesView",
      component: BadgesView
    }
  ]
});
