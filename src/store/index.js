import Vuex from "vuex";
import Vue from "vue";
import { Machine } from "xstate";
import mutations from "./mutations";
import actions from "./actions";



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
    currentUser: {
      id: "0",
      name: "John Doe"
    },
    isAdmin: true,
    isLogedIn: true,
    access_token: ""
  },
  getters: {
    getAllPoolEvents(state) {
      return state.poolEvents;
    },
    getPoolEvent(state) {
      return state.poolEvent;
    },
    getApplications(state) {
      return state.applications;
    },
    getComments(state) {
      return state.comments;
    },
    isLogedIn(state) {
      return state.isLogedIn;
    },
    isAdmin(state) {
      return state.isAdmin;
    },
    getCurrentUser(state) {
      return state.currentUser;
    },
    getErrors(state) {
      return state.errors;
    },
    getAccessToken(state) {
      return state.access_token;
    }
  },
  actions,
  mutations
});
