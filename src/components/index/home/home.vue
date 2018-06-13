<style lang="stylus" rel="stylesheet/stylus">
  html, body
    color: #fff
    font-size: 16px
    width: 100%
    height: 100%


  .index
    width: 100%
    height: 100%
    .left
      height: 100%
      background: rgb(73, 80, 96)
      margin-right: 5px
      position: fixed
      top: 0
      left: 0
      z-index: 21
      transition: width .3s
      .logo
        text-align: center
        padding: 10px 0 0 0
        .treeViewMini
          transform: translate(0, 0)
          width: 50px !important
    .nav
      height: 100px
      padding-left:230px
      position:fixed
      width:100%
      box-sizing: border-box
      display: block
      box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1)
      transition: padding .3s
      z-index:20
      .nav_header
        height: 60px
        position:relative
        background: #fff
        box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1)
        .navicon
          display: inline-block
          margin:0 20px 0 5px
          line-height:60px
          .ivu-btn:focus
            -webkit-box-shadow: 0 0 0 2px rgba(255, 255, 255, .2)
            box-shadow: 0 0 0 2px rgba(255, 255, 255, .2)
        .menu_tag
          display:inline-block
          width:300px
          line-height:60px
        .avator_container
          position:absolute
          right:15px
          top:20px
          color:#333
          vertical-align:top
          height:27px
    .bottom
      position: absolute
      top: 100px
      right: 0
      bottom: 0
      overflow: auto
      background-color: #F0F0F0
      z-index: 1
      transition: left .3s
      color:#333
      .bottom_container
        margin:10px
</style>
<template>
  <div class="index">
    <div class="left">
      <div class="logo">
        <!--<img class="tree-view" src="../../../assets/images/logo.jpg" height="44"/>-->
      </div>
      <treeMenu :menus="menu"/>
    </div>
    <div class="nav" :style="{paddingLeft:this.shrink?'50px':'230px'}">
      <div class="nav_header">
        <div class="navicon">
          <Button type="text" :style="{transform:'rotateZ('+(this.shrink?'-90':'0')+'deg)'}" @click="toggleNavicon">
            <Icon type="navicon" size="32"></Icon>
          </Button>
        </div>
        <div class="menu_tag">
          <breadcrumbNav/>
        </div>
        <div class="avator_container">
          <fullScreen v-model="isFull" @input="toggleFullScreen"/>
        </div>
      </div>
    </div>
    <div class="bottom" :style="{left:this.shrink?'50px':'230px'}">
      <div class="bottom_container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import treeMenu from '@/components/custom/leftMenu/treeMenu/treeMenu'
  import breadcrumbNav from '@/components/custom/topNav/breadcrumb/breadcrumbNav'
  import fullScreen from '@/components/custom/topNav/fullScreen/fullScreen'

  export default {
    name: "index",
    data() {
      return {
        //菜单是否收缩
        shrink: false,
        //菜单数据
        menu: [],
        //默认是否全屏显示
        isFull:false
      }
    },
    components: {
      treeMenu,breadcrumbNav,fullScreen
    },
    created() {
      this.menu = this.$store.state.menu
    },
    methods: {
      toggle() {
        this.$menu.toggleMenu(this.menu, this.$route.path)
      },
      //切换菜单收缩
      toggleNavicon() {
        this.$menu.toggleMenu(this.menu, this.$route.path)
        this.shrink = this.$menu.getShrink()
      },
      //全屏反馈父元素 必须存在
      toggleFullScreen(isFull){
      }
    },
  }
</script>
