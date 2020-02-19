import axios from "axios";

const API_URI = "/waves/api/v1";

export default {
  LOAD_DATA: ({ commit }, {page,limit}) => {

    axios
      .get(API_URI + `/poolevent?limit=${limit}&page=${page}`)
      .then(res => {
        commit("updatePoolEvents", res.data);
      })
      .catch(err => {
        commit("pushError", err.message);
      });
  },
  POST_POOLEVENT: ({ commit, getters }, poolevent) => {
    axios
      .post(API_URI + "/poolevent", poolevent, getters.getAccessToken)
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

      .catch(err => {
        commit("pushError", err.message);
      });
  },
  PUT_POOLEVENT: ({ commit, getters }, data) => {
    axios
      .put(
        API_URI + "/poolevent/" + data.id,
        data.poolevent,
        getters.getAccessToken
      )
      .then(resp => {
        commit("transition", "unrelease");
      })
      .catch(err => {
        commit("pushError", err.message);
      });
  },
  GET_POOLEVENT_BY_ID: ({ commit }, id) => {
    axios.get(`${API_URI}/poolevent/${id}`).then(({ data }) => {
      commit("setPoolEvent", data.data);
    });
  },
  SET_TO_RELEASED: ({ commit, getters, dispatch }, id) => {
    axios
      .put(
        API_URI + `/poolevent/${id}`,
        { front: { state: "RELEASED" } },
        getters.getAccessToken
      )
      .then(resp => {
        dispatch("GET_POOLEVENT_BY_ID", id);
        commit("pushSuccessMessage", "release");
      })
      .catch(err => {
        commit("pushError", err.message);
      });
  },
  SET_TO_REFUSED: ({ commit, getters, dispatch }, id) => {
    axios
      .put(
        API_URI + `/poolevent/${id}`,
        { front: { state: "REJECTED" } },
        getters.getAccessToken
      )
      .then(resp => {
        dispatch("GET_POOLEVENT_BY_ID", id);
        commit("transition", "refuse");
      })
      .catch(err => {
        commit("pushError", err.message);
      });
  },
  SET_TO_CANCELED: async ({ commit, getters, dispatch }, id) => {
    try {
      await axios.put(
        API_URI + `/poolevent/${id}`,
        { front: { state: "CANCELED" } },
        getters.getAccessToken
      );
      dispatch("GET_POOLEVENT_BY_ID", id);
    } catch (error) {
      commit("pushError", error.message);
    }
  },
  SET_TO_UNRELEASED: ({ commit, dispatch }, id) => {
    axios
      .put(API_URI + `/poolevent/${id}`, { state: "UNRELEASED" })
      .then((resp, err) => {
        dispatch("GET_POOLEVENT_BY_ID", id);
        commit("transition", "unrelease");
      })
      .catch(err => {
        commit("pushError", err.message);
      });
  },
  APPLY: ({ commit }, { config, application }) => {
    axios
      .post(API_URI + `/application`, application, config)
      .then(resp => {
        commit("addApplication", resp);
      })
      .catch(err => {
        commit("pushError", err.message);
      });
  },
  ACCEPT_APPLICATION: ({ commit, getters }, id) => {
    axios
      .put(
        API_URI + "/application/" + id,
        { state: "ACCEPTED" },
        getters.getAccessToken
      )
      .then(resp => {
        commit("acceptApplication", resp.data);
      })
      .catch(err => {
        commit("pushError", err.message);
      });
  },
  REJECT_APPLICATION: ({ commit, getters, dispatch }, id) => {
    axios
      .put(
        API_URI + "/application/" + id,
        { state: "REJECTED" },
        getters.getAccessToken
      )
      .then(resp => {
        commit("acceptApplication", resp.data);
      })
      .catch(err => {
        commit("pushError", err.message);
      });
  },
  GET_APPLICATIONS: async ({ commit, getters, dispatch }, id) => {
    await axios
      .get(API_URI + `/application/poolevent/${id}`, getters.getAccessToken)
      .then(({ data }) => {
        commit("setApplications", data.data);
      })
      .catch(err => {
        dispatch("CHECK_ACCESS", err.response.status);
        commit("pushError", err.message);
      });
  },
  SUBMIT_COMMENT: ({ commit, getters }, comment) => {
    axios
      .post(API_URI + `/comment`, comment.data, getters.getAccessToken)
      .then(resp => {
        commit("addComment", resp.data);
      })
      .catch(err => {
        commit("pushError", err.message);
      });
  },
  FETCH_COMMENTS: ({ commit }, id) => {
    axios
      .get(API_URI + `/comment/${id}`)
      .then(resp => {
        commit("setComments", resp.data);
      })
      .catch(err => {
        commit("pushError", err.message);
      });
  },
  FETCH_POOLEVENTS_BY_FILTER: ({ commit }, filter) => {
    axios
      .get(API_URI + `/poolevent?${filter}`)
      .then(resp => {
        commit("updatePoolEvents", resp.data);
      })
      .catch(err => {
        commit("pushError", err.message);
      });
  },
  POST_VOTE: ({ commit, getters }, vote) => {
    axios
      .post(API_URI + `/vote`, vote, getters.getAccessToken)
      .then(resp => {})
      .catch(err => {
        commit("pushError", err.message);
      });
  },
  DELETE_VOTE: ({ commit, getters }, id) => {
    axios
      .delete(API_URI + `/vote/${id}`, getters.getAccessToken)
      .then(resp => {})
      .catch(err => {
        commit("pushError", err.message);
      });
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
  SET_ACCESS_TOKEN: async ({ commit }, access_token) => {
    await commit("setAccessToken", access_token);
  },
  SET_ROLES: ({ commit }, roles) => {
    commit("setRoles", roles);
  },
  FETCH_ALL_MONTHS: async ({ commit }) => {
    const { data } = await axios.get(API_URI + "/months");
    commit("setMonths", data.months);
  },
  FETCH_USER_STATISTIC: async ({ commit, getters }, userId) => {
    const { data } = await axios.get(
      API_URI + `/application/user/${userId}/statistic`
    );
    commit("setUserStatistic", data.statistic);
  },
  FETCH_RECOMANDATIONS: async ({ commit }) => {
    try {
      const { data } = await axios.get(API_URI + `/favorite/most/me`);
      commit("setRecomandations", data.recomandations);
    } catch (error) {
      commit("pushError", error.message);
    }
  },
  IS_LOGED_IN: ({ commit }, isLogedIn) => {
    commit("setLogedIn", isLogedIn);
  },
  SET_CREW_ROLE_CITY: ({ commit }, crew) => {
    commit("setCrewRoleCity", crew);
  },
  RESET_ERRORS: ({ commit }) => {
    commit("resetErrors");
  },
  LOGOUT: ({ commit }) => {
    window.$cookies.remove("full_name");
    window.$cookies.remove("roles");
    window.$cookies.remove("full_name");
    window.$cookies.remove("first_name");
    window.$cookies.remove("CREW_CITY");
    window.$cookies.remove("CREW_ROLE");
    window.$cookies.remove("WAVES_JWT");
    window.$cookies.remove("last_name");
    window.$cookies.remove("user_id");
    window.$cookies.remove("access_token");
  },
  CHECK_ACCESS: ({ dispatch, commit }, statusCode) => {
    if (statusCode === 401) {
      dispatch("LOGOUT");
      window.location.href = "https://stage.vivaconagua.org";
    } else if (statusCode === 403) {
      commit("pushErrors", "Unauthorized");
    }
  }
};
