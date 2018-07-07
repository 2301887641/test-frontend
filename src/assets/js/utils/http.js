//axios
import Axios from 'axios'
import Constants from './constants'

Axios.defaults.baseURL = Constants.domain
Axios.defaults.timeout = Constants.timeout
Axios.defaults.headers['Content-Type'] = Constants.contentType
Axios.defaults.withCredentials = Constants.withCredentials
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
          notice.title="登陆失败!"
          notice.desc = "用户名或密码错误,请重新输入!"
          notice.duration = 7
          break;
        default:
          notice.desc = "网络请求失败,请稍后重新请求!"
      }
    }
    !!visible && vueInstance.$Notice.error({
      title: notice.title,
      desc: notice.desc,
      duration:notice.duration
    })
    callback(false,error.response.status)
  },
  // 回调
  callbackFunc(response, callback) {
    if (response.status === 200) {
      callback(true,response.data)
    }
  }
}

export default {
  install: function (vm) {
    vm.prototype.$Http = http
  }
}
