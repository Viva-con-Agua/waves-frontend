import axios from "axios";
const GAMIFY_BACKEND_URI = "http://localhost/backend/waves/api/v1";

export const supporterActions = {
  FETCH_ALL_USERS: async ({ commit }) => {
    try {
      const { data } = await axios.get(GAMIFY_BACKEND_URI + `/user`);
      commit("setSupporters", data.data);
    } catch (error) {
      commit("pushError", error.message);
    }
  }
};

export const supporterMutations = {
  setSupporters: (state, supporters) => {
    state.supporters = supporters;
  }
};

export const supporterGetters = {
  supporters: state => {
    return state.supporters;
  }
};
