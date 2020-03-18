import axios from "axios";
import { WAVES_BACKEND_URI } from "../actions";

export const commentActions = {
  SUBMIT_COMMENT: async ({ commit, getters }, comment) => {
    try {
      const { data } = await axios.post(
        WAVES_BACKEND_URI + `/comment`,
        comment.data,
        getters.getAccessToken
      );
      commit("addComment", data.data);
    } catch (error) {
      commit("pushError", error.message);
    }
  },
  FETCH_COMMENTS: async ({ commit }, id) => {
    try {
      const { data } = await axios.get(
        WAVES_BACKEND_URI + `/comment/poolevent/${id}`
      );
      commit("setComments", data.data);
    } catch (error) {
      commit("pushError", error.message);
    }
  }
};
