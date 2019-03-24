
import Vuex from 'vuex'
import Vue from 'vue'
import poolEvents from './assets/data'


Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        poolEvents : poolEvents
    },
    getters:{
        getAllPoolEvents(state){
            return state.poolEvents.actions;
        },
        totalPoolEvents(state){
            return state.poolEvents.actions.length; 
        }
    },
    mutations:{
        addPoolEvent (state , poolEvent){
            state.poolEvents.actions.push(poolEvent);
            console.log(state.poolEvents.actions);
        }
    },
    actions : {
        ADD_POOLEVENT : ({commit}, poolEvent) => {
            console.log(poolEvent.title);
            commit( 'addPoolEvent' , poolEvent)
          }
    }
})