import ApplicationHandlerView from "./views/ApplicationHandlerView.vue";
import CreateChallengeView from "./views/CreateChallengeView";
import PoolEventFormView from "./views/PoolEventFormView";
import NotificationsView from "./views/NotificationsView";
import PoolEventView from "./views/PoolEventView";
import BadgesView from "./views/BadgesView";
import PoolEventsView from "./views/PoolEventsView";
import ProfileView from "./views/ProfileView";
import AchievementWikiView from "./views/AchievementWikiView";
import SEEDING from "./views/SEEDING";
import InformationView from "./views/InformationView";
import ErrorView from "./views/ErrorView";
import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/waves",
      name: "PoolEventsView",
      component: PoolEventsView
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
      path: "/waves/poolevent/:id/edit",
      name: "EditPoolevent",
      component: PoolEventFormView
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
      path: "/waves/info",
      name: "information",
      component: InformationView
    },
    {
      path: "/waves/seed",
      name: "seed",
      component: SEEDING
    },
    { path: "*", component: ErrorView }
  ]
});
