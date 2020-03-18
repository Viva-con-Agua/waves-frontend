import axios from "axios";
import { WAVES_BACKEND_URI } from "../actions";

export const pooleventActions = {
  FETCH_POOLEVENTS_BY_FILTER: async ({ commit }, filter) => {
    try {
      const { data } = await axios.get(
        WAVES_BACKEND_URI + `/poolevent?${filter}`
      );
      commit("updatePoolEvents", data.data.poolevents);
    } catch (error) {
      commit("pushError", error.message);
    }
  },
  GET_POOLEVENT_BY_ID: async ({ commit }, id) => {
    try {
      const { data } = await axios.get(`${WAVES_BACKEND_URI}/poolevent/${id}`);
      commit("setPoolEvent", data.data);
    } catch (error) {
      commit("pushError", error.message);
    }
  },
  FETCH_MY_POOLEVENTS: async ({ commit }) => {
    try {
      const { data } = await axios.get(WAVES_BACKEND_URI + "/favorite");
      commit("updatePoolevents", data.data);
    } catch (error) {
      commit("pushError", error.message);
    }
  },
  POST_POOLEVENT: async ({ commit, getters }, poolevent) => {
    try {
      await axios.post(
        WAVES_BACKEND_URI + "/poolevent",
        poolevent,
        getters.getAccessToken
      );
    } catch (error) {
      commit("pushError", error.response);
    }
  },
  DELETE_POOLEVENT: async ({ commit }, id) => {
    try {
      axios.delete(this.WAVES_BACKEND_URI + `/poolevent/${id}`);
    } catch (error) {
      commit("pushError", error.message);
    }
  },
  PUT_POOLEVENT: async ({ commit, getters }, data) => {
    try {
      await axios.put(
        this.WAVES_BACKEND_URI + "/poolevent/" + data.id,
        data.poolevent,
        getters.getAccessToken
      );
    } catch (error) {
      commit("pushError", error.message);
    }
  },
  SET_TO_RELEASED: ({ commit, getters, dispatch }, id) => {
    axios
      .put(
        this.WAVES_BACKEND_URI + `/poolevent/${id}`,
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
        this.WAVES_BACKEND_URI + `/poolevent/${id}`,
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
        this.WAVES_BACKEND_URI + `/poolevent/${id}`,
        { front: { state: "CANCELED" } },
        getters.getAccessToken
      );
      dispatch("GET_POOLEVENT_BY_ID", id);
    } catch (error) {
      commit("pushError", error.message);
    }
  }
};
