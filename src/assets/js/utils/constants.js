import router from './router'
const CONSTANTS = {
  //域名
  domain: 'http://localhost:8999/',
  //验证码
  captchaSrc: 'http://localhost:8999/captcha',
  //axios配置
  contentType: 'application/x-www-form-urlencoded',
  timeout: 1000 * 15,
  withCredentials:true,
  //客户端名称
  restClient:"rest",
  loginErrorMsg:"用户名或密码错误",
  //rest信息
  retCode:'0000',
  //获取菜单页面的url
  menuUrl: 'menu',
  //路由
  router: router,
  //默认开启的页面
  defaultOpenedPage: {
    title: '首页',
    path: '/index',
    name: 'home_index'
  }
}
export default CONSTANTS
