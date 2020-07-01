import axios from "axios";
import { WAVES_BACKEND_URI } from "../actions";

export const voteActions = {
  POST_VOTE: async ({ commit, getters }, vote) => {
    try {
      console.log(vote, getters.getAccessToken);
      await axios.post(
        WAVES_BACKEND_URI + `/vote`,
        vote,
        getters.getAccessToken
      );
    } catch (error) {
      commit("pushError", error.message);
    }
  },
  DELETE_VOTE: ({ commit, getters }, id) => {
    axios
      .delete(this.WAVES_BACKEND_URI + `/vote/${id}`, getters.getAccessToken)
      .then(resp => {})
      .catch(err => {
        commit("pushError", err.message);
      });
  }
};
