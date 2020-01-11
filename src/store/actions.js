import axios from "axios";

const API_URI = "/waves/api/v1";

export default {
  LOAD_DATA: ({ commit }) => {
    axios
      .get(API_URI + "/poolevent")
      .then(res => {
        commit("updatePoolEvents", res.data);
      })
      .catch(err => {
        commit("pushError", error);
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
      .catch(err => {});
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
      .catch(err => {});
  },
  EDIT_AND_SAVE_AS_DRAFT: ({ commit }, poolEvent) => {
    axios
      .put(apiMockUrl + "/" + poolEvent.id, poolEvent)
      .then(resp => {})
      .catch(err => {});
  },
  GET_POOLEVENT_BY_ID: ({ commit }, id) => {
    axios.get(`${API_URI}/poolevent/${id}`).then(({ data }) => {
      commit("setPoolEvent", data.data);
    });
  },
  SET_TO_RELEASED: ({ commit, getters }, id) => {
    axios
      .put(
        API_URI + `/poolevent/${id}`,
        { front: { state: "RELEASED" } },
        getters.getAccessToken
      )
      .then((resp, err) => {
        commit("transition", "release");
      })
      .catch(err => {});
  },
  SET_TO_REFUSED: ({ commit, getters }, id) => {
    axios
      .put(
        API_URI + `/poolevent/${id}`,
        { front: { state: "REJECTED" } },
        getters.getAccessToken
      )
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
        commit("setError", err);
      });
  },
  REJECT_APPLICATION: ({ commit }, id) => {
    axios
      .put(API_URI + "/application/" + id, { state: "REJECTED" })
      .then(resp => {
        commit("rejectApplication", resp.data);
      })
      .catch(err => {
        commit("setError", err);
      });
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
      .post(API_URI + `/comment`, comment.data, getters.getAccessToken)
      .then(resp => {
        commit("addComment", resp.data);
      })
      .catch(err => {
        commit("setError", err);
      });
  },
  FETCH_COMMENTS: ({ commit }, id) => {
    axios
      .get(API_URI + `/comment/${id}`)
      .then(resp => {
        commit("setComments", resp.data);
      })
      .catch(err => {
        commit("setError", err);
      });
  },
  FETCH_POOLEVENTS_BY_FILTER: ({ commit }, filter) => {
    axios
      .get(API_URI + `/poolevent?${filter}`)
      .then(resp => {
        commit("updatePoolEvents", resp.data);
      })
      .catch(err => {
        commit("setError", err);
      });
  },
  POST_VOTE: ({ commit, getters }, vote) => {
    axios
      .post(API_URI + `/vote`, vote, getters.getAccessToken)
      .then(resp => {})
      .catch(err => {
        commit("setError", err);
      });
  },
  DELETE_VOTE: ({ commit, getters }, id) => {
    axios
      .delete(API_URI + `/vote/${id}`, getters.getAccessToken)
      .then(resp => {})
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
    commit("setAccessToken", access_token).then((response)=>{

    }).catch((err)=>{
      commit("setError", err);
    });
  }
};
