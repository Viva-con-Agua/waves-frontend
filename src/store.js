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
        poolEvent: null,
        currentState: poolEventStateMachine.initial
    },
    getters: {
        getAllPoolEvents(state) {
            return state.poolEvents;
        },
        totalPoolEvents(state) {
            return state.poolEvents.length;
        },
        getPoolEvent(state) {
            return state.poolEvent;
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
        applyToEvent(state , poolEvent){
            state.poolEvent = poolEvent; 
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
        EDIT_AND_SAVE_AS_DRAFT: ({commit} , poolEvent) =>{
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
                .then((poolEvent) => {
                    commit('setPoolEvent', poolEvent.data);
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
        APPLY : ({commit}, poolEvent) => {
            console.log(poolEvent)
            axios.put(apiMockUrl + "/"+ poolEvent.id , {applications : poolEvent.applications})
            .then((resp , err) => {
                commit('applyToEvent', {applications : poolEvent.applications})
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }
}
)

