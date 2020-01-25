export default {
  getAllPoolEvents(state) {
    return state.poolEvents;
  },
  getPoolEvent(state) {
    return state.poolEvent;
  },
  getApplications(state) {
    return state.applications;
  },
  getComments(state) {
    return state.comments;
  },
  isLogedIn(state) {
    return state.isLogedIn;
  },
  isAdmin(state) {
    return state.isAdmin;
  },
  getCurrentUser(state) {
    return state.currentUser;
  },
  getErrors(state) {
    return state.errors;
  },
  getAccessToken(state) {
    return state.access_token;
  },
  getRoles(state) {
    return state.roles;
  },
  getAllMonths: state => {
    return state.months;
  },
  getStatistic: state => {
    return state.statistic;
  },
  getRecomandations: state => {
    return state.recomandations;
  },
  getSuccessMessage: state => {
    return state.successMessage;
  }
};
