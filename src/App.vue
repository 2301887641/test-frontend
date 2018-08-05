<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import vue from 'vue'

  export default {
    name: 'App',
    beforeCreate() {
      //创建发布订阅模式
      //①用途: 点击除菜单以外跳转链接时 需要初始化左侧菜单
      this.$root.publish_openMenu = new vue()
      //②用途：和事件相关
      this.$root.publish_event=new vue();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width: 100%
    height: 100%
</style>
