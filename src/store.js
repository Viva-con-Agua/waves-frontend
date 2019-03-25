import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'


Vue.use(Vuex);
Vue.use(axios);

const apiMockUrl = 'http://5c9758f58cb32000145d80e7.mockapi.io/poolEvent'

export const store = new Vuex.Store({
    
    state: {
        poolEvents: [],
        poolEvent: null
    },
    getters: {
        getAllPoolEvents(state) {
            return state.poolEvents;
        },
        totalPoolEvents(state) {
            return state.poolEvents.length;
        },
        getPoolEvent(state){
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
        setPoolEvent(state, poolEvent){
            state.poolEvent = poolEvent;
        }
    },
    actions: {
        LOAD_DATA: ({
            commit
        }) => {
            axios.get("http://5c9758f58cb32000145d80e7.mockapi.io/poolEvent")
                .then((res) => {
                    commit('updatePoolEvents', res.data);
                });

        },
        POST_POOLEVENT: ({
            commit
        }, poolEvent) => {
            axios.post("http://5c9758f58cb32000145d80e7.mockapi.io/poolEvent", poolEvent)
                .then((res) => {
                    commit('addPoolEvent', poolEvent);
                    return {
                        message: "success",
                        created: res
                    };
                })
        },
        ADD_POOLEVENT: ({
            commit
        }, poolEvent) => {
            commit('addPoolEvent', poolEvent)
        },
        GET_POOLEVENT_BY_ID: ({
            commit
        }, id) => {
            axios.get(apiMockUrl + '/' + id  )
            .then((poolEvent) => {
                commit('setPoolEvent', poolEvent.data);
            }
            )
        }
    }
})