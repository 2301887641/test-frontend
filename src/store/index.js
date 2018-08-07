import Vuex from 'vuex'
import Vue from 'vue'
//加载子模块
import menu from './modules/menu'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {

  },
  modules:{
    menu
  }
})
export default store
