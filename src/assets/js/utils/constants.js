import router from './router'
const CONSTANTS = {
  //网络相关
  network:{
    //域名
    domain: 'http://localhost:8999/',
    //验证码
    captchaSrc: 'http://localhost:8999/captcha',
  },
  //axios配置
  axios:{
    contentType: 'application/x-www-form-urlencoded',
    timeout: 1000 * 15,
    withCredentials:true,
  },
  //用户相关
  user:{
    token:"user_token",
    loginErrorMsg:"用户名或密码错误,请重新输入!",
  },
  //客户端名称
  restClient:"rest",
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
    SUCCESS:'0000',
    CAPTCHA_ERROR:'1000'
  }
}
export default CONSTANTS
