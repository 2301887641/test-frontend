import Vue from 'vue'
import App from './App'
import router from './router'
//设置常量
import CONSTANSTS from './assets/js/utils/constants'

Vue.prototype.$constants = CONSTANSTS
// 本地存储localstory
import Lockr from 'lockr'

Vue.prototype.$lockr = Lockr
// iview组件
import iView from 'iview'
// 使用 iview CSS
import './assets/css/iviews.css'
// vue上使用iview
Vue.use(iView)

// 粒子效果
import VueParticles from 'vue-particles'
// vue上使用粒子效果
Vue.use(VueParticles)

//Http
import Http from './assets/js/utils/http'

Vue.use(Http)
//treeMenu树形菜单
import treeMenu from './assets/js/plugins/menu'

Vue.use(treeMenu)
//store
import store from './store/index'

Vue.config.productionTip = false
//font-awesome
import 'font-awesome/css/font-awesome.min.css'

import ZkTable from 'vue-table-with-tree-grid'
Vue.use(ZkTable)

/* eslint-disable no-new */
let vue=new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  //挂载后调用
  mounted(){
    this.$store.commit("init")
  }
})
//初始化操作
vue.$Message.config({
  duration: 3
});
