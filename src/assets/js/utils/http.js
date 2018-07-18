//axios
import Axios from 'axios'
import Constants from './constants'

Axios.defaults.baseURL = Constants.network.domain
Axios.defaults.timeout = Constants.axios.timeout
Axios.defaults.headers['Content-Type'] = Constants.axios.contentType
Axios.defaults.withCredentials = Constants.axios.withCredentials
//qs将axios发送的json转成form-data
import Qs from 'qs'

let http = {
  get(url, callback,vueInstance) {
    Axios.get(url, config).then((response) => {
      this.unload(vueInstance)
      // 正确接收到响应后我们的所有数据都在data里面
      this.callbackFunc(response, callback)
    }).catch((error) => {
      this.unload(vueInstance)
      this.errorHandler(error,vueInstance)
    })
  },
  // ajax post请求
  post(url, data, callback, vueInstance) {
    if(vueInstance.alertable!==undefined && !!vueInstance.alertable){
      vueInstance.alertable=false
    }
    Axios.post(url, Qs.stringify(data)).then((response) => {
      this.unload(vueInstance)
      this.callbackFunc(response, callback)
    }).catch((error) => {
      this.unload(vueInstance)
      this.errorHandler(callback,error,vueInstance)
    })
  },
  //取消load状态
  unload(vueInstance){
    if(vueInstance && vueInstance.$data && vueInstance.$data.load){
      vueInstance.$data.load = false
    }
  },
  //错误处理器
  errorHandler(callback,error,vueInstance){
    let notice = {title: "网络异常", desc: "网络连接异常,请联系客服!",duration:4.5},visible=true
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    if (error.response && error.response.status) {
      switch(error.response.status){
        case 401:
          visible=false
          vueInstance.$Message.destroy()
          vueInstance.$Message.error({
            content: Constants.user.loginErrorMsg,
            duration: 7,
            closable: true
          })
          break;
        default:
          notice.desc = "网络请求失败,请稍后重新请求!"
      }
    }
    !!visible && vueInstance.$Notice.destroy() && vueInstance.$Notice.error({
      title: notice.title,
      desc: notice.desc,
      duration:notice.duration
    })
    callback(false,error.response.status)
  },
  // 回调
  callbackFunc(response, callback) {
    switch(response.status){
      case 200:
        callback(true,response.data)
        break;
      default:
        break;
    }
  }
}

export default {
  install: function (vm) {
    vm.prototype.$Http = http
  }
}
