import axios from "axios";
import { pooleventActions } from "./poolevent";
import { commentActions } from "./comment";
import { applicationActions } from "./application";
import { voteActions } from "./vote";
import { authActions } from "./auth";
import { gamificationActions } from "./gamification";

export const WAVES_BACKEND_URI = "http://localhost/backend/waves/api/v1";

export default {
  ...pooleventActions,
  ...commentActions,
  ...applicationActions,
  ...voteActions,
  ...authActions,
  ...gamificationActions,
  FETCH_USER_STATISTIC: async ({ commit, getters }, userId) => {
    const { data } = await axios.get(
      this.WAVES_BACKEND_URI + `/application/user/${userId}/statistic`
    );
    commit("setUserStatistic", data.statistic);
  },
  FETCH_RECOMANDATIONS: async ({ commit }) => {
    try {
      const { data } = await axios.get(
        this.WAVES_BACKEND_URI + `/favorite/most/me`
      );
      commit("setRecomandations", data.recomandations);
    } catch (error) {
      commit("pushError", error.message);
    }
  },

  RESET_ERRORS: ({ commit }) => {
    commit("resetErrors");
  }
};
