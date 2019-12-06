import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";
import { Machine } from "xstate";

Vue.use(Vuex);
Vue.use(axios);

const apiMockUrl = "http://5c9758f58cb32000145d80e7.mockapi.io/poolEvent";
const API_URI = "/waves/api/v1";

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
  mutations: {
    addPoolEvent(state, poolEvent) {
      state.poolEvents.push(poolEvent);
    },
    updatePoolEvents(state, poolEvents) {
      state.poolEvents = poolEvents;
    },
    setPoolEvent(state, poolEvent) {
      state.poolEvent = poolEvent;
    },
    transition(state, action) {
      state.poolEvent.state = poolEventStateMachine.transition(
        state.poolEvent.state,
        action
      ).value;
    },
    setApplications(state, applications) {
      state.applications = applications;
    },
    addApplication: (state, application) => {
      state.applications.push(application);
    },
    acceptApplication: (state, application) => {
      let index = state.applications.findIndex(
        appl => appl.id === application.id
      );
      state.applications[index] = application;
    },
    rejectApplication: (state, application) => {
      let index = state.applications.findIndex(
        appl => appl.id === application.id
      );
      state.applications[index] = application;
    },
    setApplicationToWaitingList: (state, application) => {
      let index = state.applications.findIndex(
        appl => appl.id === application.id
      );
      state.applications[index] = application;
    },
    addComment: (state, comment) => {
      state.comments.unshift(comment);
    },
    setComments: (state, comments) => {
      state.comments = comments;
    },
    pushError: (state, error) => {
      state.errors.push(error);
    },
    setAccessToken: (state, access_token) => {
      state.access_token = access_token;
    }
  },
  actions: {
    LOAD_DATA: ({ commit }) => {
      axios
        .get("/waves/api/v1/poolevent")
        .then(res => {
          commit("updatePoolEvents", res.data);
        })
        .catch(err => {
          commit("pushError", error);
        });
    },
    POST_POOLEVENT: ({ commit }, { config, poolevent }) => {
      axios
        .post("/waves/api/v1/poolevent", poolevent, config)
        .then(poolEvent => {
          commit("addPoolEvent", poolEvent);
        })
        .catch(err => {
          commit("pushError", err.response);
        });
    },
    ADD_POOLEVENT: ({ commit }, poolEvent) => {
      commit("addPoolEvent", poolEvent);
    },
    DELETE_POOLEVENT: ({ commit }, id) => {
      axios
        .delete(API_URI + `/poolevent/${id}`)
        .then(resp => {})
        .catch(err => {});
    },
    EDIT_POOLEVENT: ({ commit }, poolEvent) => {
      poolEvent.state = "unreleased";
      axios
        .put(apiMockUrl + "/" + poolEvent.id, poolEvent)
        .then(resp => {
          commit("transition", "unrelease");
        })
        .catch(err => {});
    },
    EDIT_AND_SAVE_AS_DRAFT: ({ commit }, poolEvent) => {
      axios
        .put(apiMockUrl + "/" + poolEvent.id, poolEvent)
        .then(resp => {})
        .catch(err => {
          err.message;
        });
    },
    GET_POOLEVENT_BY_ID: ({ commit }, id) => {
      axios.get(API_URI + `/poolevent/${id}`).then(resp => {
        commit("setPoolEvent", resp.data.data);
      });
    },
    SET_TO_RELEASED: ({ commit }, id) => {
      axios
        .put(API_URI + `/poolevent/${id}`, { state: "RELEASED" })
        .then((resp, err) => {
          commit("transition", "release");
        })
        .catch(err => {});
    },
    SET_TO_REFUSED: ({ commit }, id) => {
      axios
        .put(API_URI + `/poolevent/${id}`, { state: "REJECTED" })
        .then((resp, err) => {
          commit("transition", "refuse");
        })
        .catch(err => {});
    },
    SET_TO_UNRELEASED: ({ commit }, id) => {
      axios
        .put(API_URI + `/poolevent/${id}`, { state: "UNRELEASED" })
        .then((resp, err) => {
          commit("transition", "unrelease");
        })
        .catch(err => {});
    },
    APPLY: ({ commit }, { config, application }) => {
      axios
        .post(API_URI + `/application`, application, config)
        .then(resp => {
          commit("addApplication", resp);
        })
        .catch(err => {
          commit("setError", err);
        });
    },
    ACCEPT_APPLICATION: ({ commit }, id) => {
      axios
        .put(API_URI + "/application/" + id, { state: "ACCEPTED" })
        .then(resp => {
          commit("acceptApplication", resp.data);
        })
        .catch(err => {});
    },
    REJECT_APPLICATION: ({ commit }, id) => {
      axios
        .put(API_URI + "/application/" + id, { state: "REJECTED" })
        .then(resp => {
          commit("rejectApplication", resp.data);
        })
        .catch(err => {});
    },
    SET_TO_APPLICATION_WAITINGLIST: ({ commit }, application) => {
      axios
        .put(
          apiMockUrl +
            "/" +
            application.poolEventId +
            "/application/" +
            application.id,
          { state: "WAITING_LIST" }
        )
        .then(resp => {
          commit("setApplicationToWaitingList", resp.data);
        })
        .catch(err => {});
    },
    GET_APPLICATIONS: ({ commit }, id) => {
      axios
        .get(API_URI + `/application/poolevent/${id}`)
        .then(({ data }) => {
          commit("setApplications", data.data);
        })
        .catch(err => {
          commit("setError", err);
        });
    },
    SUBMIT_COMMENT: ({ commit, getters }, comment) => {
      axios
        .post(API_URI + `/comment`, comment.data,getters.getAccessToken)
        .then(resp => {
          console.log(getters.getAccessToken);
          commit("addComment", resp.data);
        })
        .catch(err => {});
    },
    FETCH_COMMENTS: ({ commit }, id) => {
      axios
        .get(API_URI + `/comment/${id}`)
        .then(resp => {
          commit("setComments", resp.data);
        })
        .catch(err => {});
    },
    FETCH_POOLEVENTS_BY_FILTER: ({ commit }, filter) => {
      axios
        .get(API_URI + `/poolevent?${filter}`)
        .then(resp => {
          commit("updatePoolEvents", resp.data);
        })
        .catch(err => {});
    },
    POST_VOTE: ({ commit }, vote) => {
      axios
        .post(API_URI + `/vote`, vote)
        .then(resp => {
          console.log(resp);
        })
        .catch(err => {});
    },
    FETCH_MY_POOLEVENTS: ({ commit }) => {
      axios
        .get(API_URI + "/favorite/1")
        .then(poolevents => {
          commit("updatePoolEvents", poolevents);
        })
        .catch(error => {
          commit("pushError", error);
        });
    },
    SET_ACCESS_TOKEN: ({ commit }, access_token) => {
      commit("setAccessToken", access_token);
    }
  }
});
