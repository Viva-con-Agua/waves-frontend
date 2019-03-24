
import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'


Vue.use(Vuex);
Vue.use(axios);

export const store = new Vuex.Store({
    state: {
        poolEvents: []
    },
    getters: {
        getAllPoolEvents(state) {
            return state.poolEvents;
        },
        totalPoolEvents(state) {
            return state.poolEvents.length;
        }
    },
    mutations: {
        addPoolEvent(state, poolEvent) {
            state.poolEvents.push(poolEvent);
        },
        updatePoolEvents(state, poolEvents) {
            state.poolEvents = poolEvents;
        }
    },
    actions: {
        LOAD_DATA: ({ commit }) => {
            axios.get("http://5c9758f58cb32000145d80e7.mockapi.io/poolEvent")
                .then((res) => {
                    commit('updatePoolEvents', res.data);
                    console.log(res);
                }
                )

        },
        POST_POOLEVENT: ({ commit }, poolEvent) => {
            axios.post("http://5c9758f58cb32000145d80e7.mockapi.io/poolEvent", poolEvent)
                .then((res) => {
                    commit('addPoolEvent', poolEvent)
                    console.log(poolEvent);
                })
        },
        ADD_POOLEVENT: ({ commit }, poolEvent) => {
            commit('addPoolEvent', poolEvent)
        }
    }
})