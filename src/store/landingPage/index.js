import axios from "axios";
import { WAVES_BACKEND_URI } from "../actions";

export const commentActions = {
    FETCH_ALL_MONTHS: async ({ commit }) => {
        const { data } = await axios.get(this.WAVES_BACKEND_URI + "/months");
        commit("setMonths", data.months);
      },
};
