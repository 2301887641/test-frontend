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
    if(!vm){
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
  put(url, data, callback, vue) {
    axios.put(url, Qs.stringify(data)).then((response) => {
      this.unload(vue)
      this.callbackFactory(response, callback, vue)
    }).catch((error) => {
      this.unload(vue)
      this.errorHandler(callback, error, vue)
    })
  },
  // ajax delete请求
  delete(url, callback, vm) {
    this.vm = vm
    axios.delete(url).then((response) => {
      this.refresh()
      callback(true, response.data)
    }).catch((error) => {
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
  //错误处理器
  errorHandler(callback, error, vue) {
    let notice = {title: "网络异常", desc: "网络连接异常,请联系客服!", duration: 6}
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    if (error.response && error.response.status) {
      vue.$Message.destroy()
      switch (error.response.status) {
        case 401:
          notice.title = "认证异常"
          notice.desc = constant.user.authorationError
          break;
        case 500:
          notice.title = "程序异常"
          notice.desc = constant.user.fatalError
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
          case constant.statusCode.SUCCESS:
            callback(true, response.data)
            //弹窗提示成功
            this.success(vue, response)
            break;
          case constant.statusCode.FATAL_ERROR:
            vue.$Message.destroy()
            vue.$Message.error("错误通知：" + response.data.retInfo)
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
  success2(vue, response) {
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
    vm.prototype.$http = http
  }
}
