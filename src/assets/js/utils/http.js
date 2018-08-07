//axios
import axios from 'axios'
import constant from './constants'

axios.defaults.baseURL = constant.baseConfig.domain
axios.defaults.timeout = constant.axios.timeout
axios.defaults.headers['Content-Type'] = constant.axios.contentType
//识别ajax请求
axios.defaults.headers['X-Requested-With'] = constant.axios.xRequestedWith
axios.defaults.withCredentials = constant.axios.withCredentials
//qs将axios发送的json转成form-data
import Qs from 'qs'

let http = {
  //vue实例
  vm: null,
  //notice组件的error错误提示
  notice_error: {
    title: "网络链接异常",
    desc: "网络连接失败,请检查网络!"
  },
  /**
   * get请求
   * @param url  请求路径
   * @param vm  vue实例 一般传递this
   * @param callback   回调函数
   */
  get(url, vm, callback) {
    if (!vm) {
      console.log("get方法中请传递vue实例")
    }
    this.vm = vm
    axios.get(url).then((response) => {
      if (callback && callback instanceof Function) {
        callback(true, response.data)
      }
    }).catch((error) => {
      this.error(error)
    })
  },
  /**
   * post请求
   * @param url  地址
   * @param data  数据
   * @param vm   vue实例
   * @param callback  回调
   */
  post(url, data, vm, callback) {
    if (!vm) {
      console.log("post方法中请传递vue实例")
    }
    this.vm = vm
    axios.post(url, Qs.stringify(data)).then((response) => {
      this.success(response.data, callback)
    }).catch((error) => {
      this.unload()
      this.error(error)
    })
  },
  // ajax put请求
  put(url, data, vm, callback) {
    if (!vm) {
      console.log("put方法中请传递vue实例")
    }
    this.vm = vm
    axios.put(url, Qs.stringify(data)).then((response) => {
      this.success(response.data, callback)
    }).catch((error) => {
      console.log(error)
      this.unload()
      this.error(error)
    })
  },
  // ajax delete请求
  delete(url, vm, callback) {
    if (!vm) {
      console.log("delete方法中请传递vue实例")
    }
    this.vm = vm
    axios.delete(url).then((response) => {
      this.success(response.data, callback)
    }).catch((error) => {
      this.unload()
      this.error(error)
    })
  },
  /**
   * 成功后的回调
   * @param msg 成功信息
   */
  success(data, callback) {
    if (callback && callback instanceof Function) {
      callback(true, data.data)
    }
    this.unload()
    this.refresh()
    this.vm.$Message.success(data.retInfo)
  },
  /**
   * 成功后的刷新操作
   */
  refresh() {
    if (this.vm.refresh && (this.vm.refresh instanceof Function)) {
      this.vm.refresh()
    }
  },
  /**
   * 发生错误的回调
   * @param error
   */
  error(error) {
    console.log(error)
    //说明已经连接了网络
    if (error.response && error.response.status) {
      if (error.response.status == 401) {
        this.notice_error.title = "授权失败"
        this.notice_error.desc = "当前用户登陆失败"
      } else {
        this.notice_error.title = "网络繁忙"
        this.notice_error.desc = error.response.data.retInfo
      }
    }
    //网络异常
    this.noticeError()
  },
  /**
   * notice组件的error异常
   */
  noticeError() {
    this.vm.$Notice.error({
      title: this.notice_error.title,
      desc: this.notice_error.desc
    })
  },
  /**
   * 取消load状态
   */
  unload() {
    if (this.vm && this.vm.$data && this.vm.$data.load) {
      this.vm.$data.load = false
    }
  },
}

export default {
  install: function (vm) {
    vm.prototype.$http = http
  }
}
