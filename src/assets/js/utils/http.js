//axios
import Axios from 'axios'
Axios.defaults.baseURL = "http://localhost:8889/"
Axios.defaults.timeout = 1000 * 15
Axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Axios.defaults.withCredentials = true
//qs将axios发送的json转成form-data
import Qs from 'qs'
let http = {
  get(url, callback, config = '') {
    Axios.get(url, config).then((response) => {
      // 正确接收到响应后我们的所有数据都在data里面
      this.callbackFunc(response, callback)
    }).catch((error) => {
      if (error) {
        // this.errorMessage()
      }
    })
  },
  // ajax post请求
  post(url, data, callback, config = '') {
    Axios.post(url, Qs.stringify(data), config).then((response) => {
      this.callbackFunc(response, callback)
    }).catch((error) => {
      if (error) {
        console.log(error)
        // this.errorMessage()
      }
    })
  },
  // 回调
  callbackFunc(response, callback) {
    if (response.status === 500) {
      response.msg && Ele.Message.error(response.msg)
    } else if (response.status === 200) {
      !callback(response.data) && response.msg && Ele.Message.success(response.msg)
    }
  }


}

export default {
  install: function (vm) {
    vm.prototype.$Http = http
  }
}
