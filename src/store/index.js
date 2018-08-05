import Vuex from 'vuex'
import Vue from 'vue'
//加载子模块
import menu from './modules/menu'
import http from './modules/http'

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
    menu,
    http
  }
})
export default store
