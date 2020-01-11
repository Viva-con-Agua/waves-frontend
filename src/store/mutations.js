export default {
    addPoolEvent(state, poolEvent) {
      state.poolEvents.push(poolEvent);
    },
    updatePoolEvents(state, poolEvents) {
      state.poolEvents = poolEvents;
    },
    setPoolEvent(state, poolEvent) {
      state.poolEvent = poolEvent;
    },
    transition(state, action) {
      state.poolEvent.state = poolEventStateMachine.transition(
        state.poolEvent.state,
        action
      ).value;
    },
    setApplications(state, applications) {
      state.applications = applications;
    },
    addApplication: (state, application) => {
      state.applications.push(application);
    },
    acceptApplication: (state, application) => {
      let index = state.applications.findIndex(
        appl => appl.id === application.id
      );
      state.applications[index] = application;
    },
    rejectApplication: (state, application) => {
      let index = state.applications.findIndex(
        appl => appl.id === application.id
      );
      state.applications[index] = application;
    },
    setApplicationToWaitingList: (state, application) => {
      let index = state.applications.findIndex(
        appl => appl.id === application.id
      );
      state.applications[index] = application;
    },
    addComment: (state, comment) => {
      state.comments.unshift(comment);
    },
    setComments: (state, comments) => {
      state.comments = comments;
    },
    pushError: (state, error) => {
      state.errors.push(error);
    },
    setAccessToken: (state, access_token) => {
      state.access_token = access_token;
    }
  }