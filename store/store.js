import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import poolEvents from '../testdata/data'

export const store = new Vuex.Store({
    state: {
        poolEvents
    },
    mutations: {
        change(state, poolEvents) {
            state.poolEvents = poolEvents
        }
    },
    getters: {
        poolEvents: state => state.poolEvents
    }
})
