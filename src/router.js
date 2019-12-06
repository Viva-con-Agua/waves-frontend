import ApplicationHandlerView from "./views/ApplicationHandlerView.vue";
import EditPoolEventFormView from "./views/EditPoolEventFormView";
import CreateChallengeView from "./views/CreateChallengeView";
import PoolEventFormView from "./views/PoolEventFormView";
import NotificationsView from "./views/NotificationsView";
import PoolEventView from "./views/PoolEventView";
import BadgesView from "./views/BadgesView";
import PoolEvents from "./views/PoolEvents";
import ProfileView from "./views/ProfileView";
import AchievementWikiView from "./views/AchievementWikiView";
import ErrorView from "./views/ErrorView";
import TESTSTUFF from "./views/TESTSTUFF";
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
      name: "create",
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
      path: "/waves/badges",
      name: "BadgesView",
      component: BadgesView
    },
    {
      path: "/waves/notifications",
      name: "NotificationsView",
      component: NotificationsView
    },
    {
      path: "/waves/challenge/create",
      name: "createChallenge",
      component: CreateChallengeView
    },
    {
      path: "/waves/profile",
      name: "Profile",
      component: ProfileView
    },
    {
      path: "/waves/wiki/badges",
      name: "wiki",
      component: AchievementWikiView
    },
    {
      path: "/teststuff",
      name: "test",
      component: TESTSTUFF
    },
    { path: "*", component: ErrorView }
  ]
});
