import axios from "axios";
const uri = "http://localhost/backend/waves/api/v1";

export const filterActions = {
  FETCH_REGIONS: async ({ commit }) => {
    try {
      const { data } = await axios.get(uri+ "/regions");
      commit("setRegions", data.data);
    } catch (error) {
      commit("pushError");
    }
  },
  FETCH_MONTHS: async ({ commit }) => {
    try {
      const { data } = await axios.get(uri+ "/months");
      commit("setMonths", data.data);
    } catch (error) {
      commit("pushError");
    }
  },
};

export const filterMutations = {
  setRegions: (state, regions) => {
    state.regions = regions;
  }
};

export const filterGetters = {
  regions: state => {
    return state.regions;
  }
};
