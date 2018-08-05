import axios from 'axios'
import constant from '../../assets/js/utils/constants'
axios.defaults.baseURL = constant.baseConfig.domain
axios.defaults.timeout = constant.axios.timeout
axios.defaults.headers['Content-Type'] = constant.axios.contentType
//识别ajax请求
axios.defaults.headers['X-Requested-With'] =constant.axios.xRequestedWith
//跨域
axios.defaults.withCredentials = Constants.axios.withCredentials

const http={
  state:{},
  mutations:{
    select(state,obj){
      $http.get(obj.url,obj.callback,obj.vue)
    }
  },
  actions:{
    select(context,obj){
        context.commit('select',obj)
    }
  }




}
export default http
