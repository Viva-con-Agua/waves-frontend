
import Vuex from 'vuex'
import Vue from 'vue'
import poolEvent from './assets/data'


Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        poolEvents : poolEvent
    },
    getters:{
        getAllPoolEvents(state){
            return state.poolEvents.actions;
        },
        totalPoolEvents(state){
            return state.poolEvents.actions.length; 
        }
    },
    mutation:{
        addPoolEvent(state , poolEvent){
            state.poolEvents.actions.push(poolEvent);
        }
    }
})