import axios from "axios";
const GAMIFY_BACKEND_URI = "http://localhost/backend/gamify";

export const gamificationActions = {
  FETCH_LEADERBOARD: async ({ commit }) => {
    try {
      const { data } = await axios.get(GAMIFY_BACKEND_URI + `/leaderboard`);
      commit("setLeaderboard", data.leaderboard);
    } catch (error) {
      commit("pushError", error.message);
    }
  },
  SAVE_ACHIEVEMENT: async ()=>{
    try {
      const { data } = await axios.get(GAMIFY_BACKEND_URI + `/leaderboard`);
    } catch (error) {
      commit("pushError", error.message);
    }
  }
};

export const gamificationMutations = {
  setLeaderboard: (state, leaderboard) => {
    state.leaderboard = leaderboard;
  }
};

export const gamificationGetters = {
  getLeaderboard: state => {
    return state.leaderboard;
  }
};
