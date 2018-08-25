import router from './router'
const CONSTANTS = {
  //基础设置 网络相关和本地相关
  baseConfig:{
    //域名
    domain: 'http://localhost:8999/',
    //验证码
    captchaSrc: 'http://localhost:8999/captcha',
    //客户端名称
    restClient:"rest"
  },
  //axios配置
  axios:{
    contentType: 'application/x-www-form-urlencoded',
    timeout: 1000 * 15,
    //跨域必开
    withCredentials:true,
    xRequestedWith:"XMLHttpRequest"
  },
  //用户相关
  user:{
    token:"user_token",
    loginErrorMsg:"用户名或密码错误,请重新输入!",
    fatalError:"程序发生错误,请联系后台人员!",
    authorationError:"当前用户认证失败,请重新认证!"
  },
  //路由
  router: {
    //路由地址
    router:router,
    //默认开启的页面
    defaultOpenedPage: {
      title: '首页',
      path: '/index',
      name: 'home_index'
    },
  },
  //后台返回状态码
  statusCode:{
    //成功
    SUCCESS:200,
    //验证码错误
    CAPTCHA_ERROR:1000,
    //后台致命错误
    FATAL_ERROR:5000
  },
  //枚举
  enum:{
    resource:{
      Menu:1,
      Button:2
    }
  }
}
export default CONSTANTS
