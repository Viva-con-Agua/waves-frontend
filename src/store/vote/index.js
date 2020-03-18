import axios from "axios";
import { WAVES_BACKEND_URI } from "../actions";

export const voteActions = {
    POST_VOTE: ({ commit, getters }, vote) => {
        axios
          .post(this.WAVES_BACKEND_URI + `/vote`, vote, getters.getAccessToken)
          .then(resp => {})
          .catch(err => {
            commit("pushError", err.message);
          });
      },
      DELETE_VOTE: ({ commit, getters }, id) => {
        axios
          .delete(this.WAVES_BACKEND_URI + `/vote/${id}`, getters.getAccessToken)
          .then(resp => {})
          .catch(err => {
            commit("pushError", err.message);
          });
      },
};
