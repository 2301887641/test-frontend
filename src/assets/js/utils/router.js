const router={
  //对应模块
  home: {
    //子路由
    home_index: {
      path: 'index',
      title: '首页',
      name: 'home_index',
      component: () => import('@/components/index/index/index')
    },
    home_message: {
      path: 'message',
      title: '消息',
      name: 'home_message',
      component: () => import('@/components/custom/topNav/messageCenter/message')
    }
  },
  permission:{
    //权限
    permission_resource:{
      path:'resource',
      title:'资源',
      name:'permission_resource',
      component:()=>import('@/components/business/permission/resource/resource')
    }
  }
}
export default router
