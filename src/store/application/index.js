import axios from "axios";
import { WAVES_BACKEND_URI } from "../actions";

export const applicationActions = {
  APPLY: ({ commit }, { config, application }) => {
    axios
      .post(WAVES_BACKEND_URI + `/application`, application, config)
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
        WAVES_BACKEND_URI + "/application/" + id,
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
  REJECT_APPLICATION: ({ commit, getters }, id) => {
    axios
      .put(
        WAVES_BACKEND_URI + "/application/" + id,
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
      .get(WAVES_BACKEND_URI + `/application/poolevent/${id}`, getters.getAccessToken)
      .then(({ data }) => {
        commit("setApplications", data.data);
      })
      .catch(err => {
        dispatch("CHECK_ACCESS", err.response.status);
        commit("pushError", err.message);
      });
  },
};
