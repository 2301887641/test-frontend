import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Home from '@/components/index/home/home'
import Constants from '../assets/js/utils/constants'
import iView from 'iview'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    //从首页跳转到home的子组件index 访问子组件会默认访问父组件
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children:[
        Constants.router.router.home.home_index,
        Constants.router.router.home.home_message,
        Constants.router.router.permission.permission_resource
      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  iView.LoadingBar.start()
  next()
})

router.afterEach((to,from,next)=>{
  iView.LoadingBar.finish()
})

export default router
