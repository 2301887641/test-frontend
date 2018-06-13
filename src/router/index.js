import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Home from '@/components/index/home/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    //从首页跳转到home的子组件index 访问子组件会默认访问父组件
    {
      path:'/',
      name:'Home',
      component: Home,
      redirect: '/index',
      children:[
         {path:'index',title:'index',name:'home_index',component:()=>import('@/components/index/index/index')}
      ]
    }
  ]
})
