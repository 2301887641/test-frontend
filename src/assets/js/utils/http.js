//axios
import Axios from 'axios'
import Constants from './constants'

Axios.defaults.baseURL = Constants.baseConfig.domain
Axios.defaults.timeout = Constants.axios.timeout
Axios.defaults.headers['Content-Type'] = Constants.axios.contentType
//识别ajax请求
Axios.defaults.headers['X-Requested-With'] =Constants.axios.xRequestedWith
Axios.defaults.withCredentials = Constants.axios.withCredentials
//qs将axios发送的json转成form-data
import Qs from 'qs'

let http = {
  //模式 分为静默和正常  静默模式不会给出反馈信息
  //true:正常模式  false:静默方式
  pattern:true,
  get(url, callback, vue) {
    Axios.get(url).then((response) => {
      this.unload(vue)
      // 正确接收到响应后我们的所有数据都在data里面
      this.callbackFactory(response, callback, vue)
      if(!this.pattern){
        this.pattern=true
      }
    }).catch((error) => {
      this.unload(vue)
      this.errorHandler(callback, error, vue)
    })
  },
  // ajax post请求
  post(url, data, callback, vue) {
    Axios.post(url, Qs.stringify(data)).then((response) => {
      this.unload(vue)
      this.callbackFactory(response, callback, vue)
    }).catch((error) => {
      this.unload(vue)
      this.errorHandler(callback, error, vue)
    })
  },
  // ajax put请求
  put(url, data, callback, vue) {
    Axios.put(url, Qs.stringify(data)).then((response) => {
      this.unload(vue)
      this.callbackFactory(response, callback, vue)
    }).catch((error) => {
      this.unload(vue)
      this.errorHandler(callback, error, vue)
    })
  },
  //取消load状态
  unload(vue) {
    if (vue && vue.$data && vue.$data.load) {
      vue.$data.load = false
    }
  },
  //错误处理器
  errorHandler(callback, error, vue) {
    let notice = {title: "网络异常", desc: "网络连接异常,请联系客服!", duration: 6}
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    if (error.response && error.response.status) {
      vue.$Message.destroy()
      switch (error.response.status) {
        case 401:
          notice.title = "认证异常"
          notice.desc = Constants.user.authorationError
          break;
        case 500:
          notice.title = "程序异常"
          notice.desc = Constants.user.fatalError
          break;
        default:
          break;
      }
      vue.$Notice.error({
        title: notice.title,
        desc: notice.desc,
        duration: notice.duration,
      })
      return
    }
    vue.$Notice.error({
      title: notice.title,
      desc: notice.desc,
      duration: notice.duration,
    })
  },
  // 回调
  callbackFactory(response, callback, vue) {
    switch (response.status) {
      case 200:
        switch (response.data.retCode) {
          case Constants.statusCode.SUCCESS:
            callback(true, response.data)
            //弹窗提示成功
            this.success(vue, response)
            break;
          case Constants.statusCode.FATAL_ERROR:
            vue.$Notice.error({
              title: "程序异常",
              desc: "程序发生错误,请联系后台人员!",
              duration:6,
            })
            break;
          default:
            callback(true, response.data)
            break;
        }
        break;
      default:
        break;
    }
  },
  //成功后的自动处理
  success(vue, response) {
    if (!!this.pattern && response.data.retInfo != undefined && response.data.retInfo.length > 0) {
      vue.$Notice.success({title: response.data.retInfo})
    }
    //如果vue视图上有模型model的话关闭掉。
    if (vue.$data.model !== undefined && !!vue.$data.model) {
      vue.$data.model = false
    }
  }
}

export default {
  install: function (vm) {
    vm.prototype.$Http = http
  }
}
