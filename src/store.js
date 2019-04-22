import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import { Machine } from 'xstate';


Vue.use(Vuex);
Vue.use(axios);

const apiMockUrl = 'http://5c9758f58cb32000145d80e7.mockapi.io/poolEvent'

const poolEventStateMachine = Machine({
    key: "light",
    initial: "unreleased",
    states: {
        draft: {
            on: {
                unrelease: "unreleased"
            }
        },
        unreleased: {
            on: {
                release: "released",
                refuse: "refused"
            }
        },
        released: {
            on: {
                refuse: "refused"
            }
        },
        refused: {
            on: {
                release: "released"
            }
        }
    }
});


export const store = new Vuex.Store({
    state: {
        poolEvents: [],
        poolEvent: '',
        currentState: poolEventStateMachine.initial,
        applications: [],
        isAdmin: true,
        comments: []
    },
    getters: {
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
        }
    },
    mutations: {
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
            state.poolEvent.state = poolEventStateMachine.transition(state.poolEvent.state, action).value
        },
        setApplications(state, applications) {
            state.applications = applications;
        },
        addApplication: (state, application) => {
            state.applications.push(application);
        },
        acceptApplication: (state, application) => {
            let index = state.applications.findIndex(appl => appl.id === application.id);
            state.applications[index] = application;
        },
        rejectApplication: (state, application) => {
            let index = state.applications.findIndex(appl => appl.id === application.id);
            state.applications[index] = application;
        },
        setApplicationToWaitingList: (state, application) => {
            let index = state.applications.findIndex(appl => appl.id === application.id);
            state.applications[index] = application;
        },
        addComment: (state, comment) => {
            state.comments.unshift(comment);
        },
        setComments: (state, comments) => {
            state.comments = comments;
        }
    },
    actions: {
        LOAD_DATA: ({
            commit
        }) => {
            axios.get(apiMockUrl)
                .then((res) => {
                    commit('updatePoolEvents', res.data);
                }).catch((err) => {
                    console.log(err.message);
                });
        },
        POST_POOLEVENT: ({
            commit
        }, poolEvent) => {
            console.log(poolEvent);
            axios.post(apiMockUrl, poolEvent)
                .then((res) => {
                    commit('addPoolEvent', poolEvent);
                    return {
                        message: "success",
                        created: res
                    };
                }).catch((err) => {
                    console.log(err.message);
                })
        },
        ADD_POOLEVENT: ({
            commit
        }, poolEvent) => {
            commit('addPoolEvent', poolEvent)
        }, DELETE_POOLEVENT: ({ commit }, id) => {
            axios.delete(apiMockUrl + '/' + id)
                .then((resp) => {
                    console.log(resp);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        EDIT_POOLEVENT: ({ commit }, poolEvent) => {
            poolEvent.state = "unreleased";
            axios.put(apiMockUrl + '/' + poolEvent.id, poolEvent)
                .then((resp) => {
                    commit('transition', "unrelease")
                    console.log(resp);
                })
                .catch((err) => { err.message });
        },
        EDIT_AND_SAVE_AS_DRAFT: ({ commit }, poolEvent) => {
            axios.put(apiMockUrl + '/' + poolEvent.id, poolEvent)
                .then((resp) => {
                    console.log(resp);
                })
                .catch((err) => { err.message });
        },
        GET_POOLEVENT_BY_ID: ({
            commit
        }, id) => {
            axios.get(apiMockUrl + '/' + id)
                .then((resp) => {
                    commit('setPoolEvent', resp.data);
                }
                )
        },
        SET_TO_RELEASED: ({ commit }, id) => {
            axios.put(apiMockUrl + '/' + id, { state: "released" })
                .then((resp, err) => {
                    commit('transition', "release")
                })
                .catch((err) => {
                    console.log(err)
                });
        },
        SET_TO_REFUSED: ({ commit }, id) => {
            axios.put(apiMockUrl + '/' + id, { state: "refused" })
                .then((resp, err) => {
                    console.log(resp)
                    commit('transition', "refuse")
                })
                .catch((err) => {
                    console.log(err)
                });
        },
        SET_TO_UNRELEASED: ({ commit }, id) => {
            axios.put(apiMockUrl + '/' + id, { state: "unreleased" })
                .then((resp, err) => {
                    console.log(resp)
                    commit('transition', "unrelease")
                })
                .catch((err) => {
                    console.log(err)
                });
        },
        APPLY: ({ commit }, application) => {
            axios.post(apiMockUrl + "/" + application.poolEventId + "/application", application.application)
                .then((resp) => {
                    commit('addApplication', resp);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        ACCEPT_APPLICATIONS: ({ commit }, application) => {
            axios.put(apiMockUrl + "/" + application.poolEventId + '/application/' + application.id, { state: 'ACCEPTED' })
                .then((resp) => {
                    commit('acceptApplication', resp.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        REJECT_APPLICATIONS: ({ commit }, application) => {
            axios.put(apiMockUrl + "/" + application.poolEventId + '/application/' + application.id, { state: 'REJECTED' })
                .then((resp) => {
                    commit('rejectApplication', resp.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        SET_TO_APPLICATION_WAITINGLIST: ({ commit }, application) => {
            axios.put(apiMockUrl + "/" + application.poolEventId + '/application/' + application.id, { state: 'WAITING_LIST' })
                .then((resp) => {
                    commit('setApplicationToWaitingList', resp.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        GET_APPLICATIONS: ({ commit }, id) => {
            axios.get(apiMockUrl + '/' + id + "/application")
                .then((resp) => {
                    commit('setApplications', resp.data)
                    console.log(resp.data)
                })
                .catch((err) => {
                    console.log(err.message);
                })
        },
        SUBMIT_COMMENT: ({ commit }, comment) => {
            axios.post(apiMockUrl + '/' + comment.id + "/comment", comment.data)
                .then((resp) => {
                    commit('addComment', resp.data);
                })
                .catch((err) => {

                });
        },
        FETCH_COMMENTS: ({ commit }, id) => {
            axios.get(apiMockUrl + '/' + id + "/comment?sortBy=createdAt&order=desc")
                .then((resp) => {
                    commit('setComments', resp.data);
                })
                .catch((err) => {

                });
        }
    }
}
)

