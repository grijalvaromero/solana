import { createStore } from 'vuex'

import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'



const store = createStore({
 
    namespaced: true,
    actions:actions,
    getters:getters,
    mutations:mutations,
    state
  
})

export default store
