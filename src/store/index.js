import Vuex from "vuex";
import Vue from "vue";
import { Machine } from "xstate";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

const poolEventStateMachine = Machine({
  key: "light",
  initial: "unreleased",
  states: {
    draft: {
      on: {
        unrelease: "unreleased"
      }
    },
    unreleased: {
      on: {
        release: "released",
        refuse: "refused"
      }
    },
    released: {
      on: {
        refuse: "refused"
      }
    },
    refused: {
      on: {
        release: "released"
      }
    }
  }
});

export const store = new Vuex.Store({
  state: {
    errors: [],
    poolEvents: [],
    poolEvent: "",
    currentState: poolEventStateMachine.initial,
    applications: [],
    comments: [],
    isAdmin: true,
    isLogedIn: false,
    access_token: "",
    roles: "",
    months: [],
    statistic: "",
    recomandations: [],
    successMessage: [],
    crewRole: "",
    crewCity: "",
    leaderboard: []
  },
  getters,
  actions,
  mutations
});
