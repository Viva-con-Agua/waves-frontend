import axios from "axios";

const access_token = {
  headers: {
    authorization: "Bearer " + window.$cookies.get("waves_access_token")
  }
};

export const favoriteActions = {
  FETCH_MY_FAVORITES: async ({ commit }) => {
    try {
      const { data } = await axios.get(
        "http://localhost/backend/waves/api/v1" + `/favorite`,
        access_token
      );
      console.log(data);
      commit("setFavorites", data.data);
    } catch (error) {
      commit("pushError", error.message);
    }
  }
};

export const favoriteGetters = {
  favorites(state) {
    return state.favorites;
  }
};

export const favoriteMutations = {
  setFavorites: (state, favorites) => {
    state.favorites = favorites;
  }
};
