<style lang="stylus" rel="stylesheet/stylus">
  *
    user-select: none

  html, body
    font-size: 16px
    width: 100%
    height: 100%
    overflow: hidden

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
        width: 100%
        text-align: center
        padding: 10px 0 0 0
        img
          transform: translate(0, 0)
          height: 44px
    .nav
      height: 100px
      padding-left: 230px
      position: fixed
      width: 100%
      box-sizing: border-box
      display: block
      box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1)
      transition: padding .3s
      z-index: 20
      .nav_header
        height: 60px
        position: relative
        background: #fff
        box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1)
        z-index: 11
        .navicon
          display: inline-block
          margin: 0 20px 0 5px
          line-height: 60px
          .ivu-btn:focus
            -webkit-box-shadow: 0 0 0 2px rgba(255, 255, 255, .2)
            box-shadow: 0 0 0 2px rgba(255, 255, 255, .2)
        .menu_tag
          display: inline-block
          width: 300px
          line-height: 60px
        .avator_container
          position: absolute
          right: 0
          top: 0
          height: 100%
          width:300px
          .userInfoWapper
            position: absolute
            right: 0
            top: 0
            width: 150px
            height: 100%
            font-size:13px
      .nav_bottom
        height: 40px
        z-index: -1
        overflow: hidden
        background: #f0f0f0
    .bottom
      position: absolute
      top: 100px
      right: 0
      bottom: 0
      overflow: auto
      background-color: #F0F0F0
      z-index: 1
      transition: left .3s
      word-break: keep-all
      white-space: nowrap
      .bottom_container
        margin: 10px
</style>
<template>
  <div class="index">
    <div class="left"
         :style="{width:this.shrink?this.leftMiniWidth:this.leftWidth,overflow: this.shrink ? 'visible' : 'auto'}">
      <div class="logo">
        <img v-show="!this.shrink" src="../../../assets/images/logo.jpg"/>
        <img v-show="this.shrink" src="../../../assets/images/logo-min.jpg"/>
      </div>
      <!--左侧菜单-->
      <treeMenu :menus="menu"/>
    </div>
    <div class="nav" :style="{paddingLeft:this.shrink?this.leftMiniWidth:this.leftWidth}">
      <!--最上部-->
      <div class="nav_header">
        <div class="navicon">
          <!--收缩和展开按钮-->
          <Button type="text" :style="{transform:'rotateZ('+(this.shrink?'-90':'0')+'deg)'}" @click="toggleNavicon">
            <Icon type="navicon" size="32"></Icon>
          </Button>
        </div>
        <!--面包屑-->
        <div class="menu_tag">
          <breadcrumbNav/>
        </div>
        <!--右侧全屏和消息提醒-->
        <div class="avator_container">
          <fullScreen v-model="isFull" @input="toggleFullScreen"/>
          <messageCenter v-model="messageCount"/>
          <div class="userInfoWapper">
            <Row type="flex" justify="center" align="middle" style="height:100%;">
              <Dropdown class="userInfo">
                <a href="javascript:void(0)">
                  管理员
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem>个人中心</DropdownItem>
                  <DropdownItem divided>退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Avatar :src="avatorPath" style="margin-left:10px"></Avatar>
            </Row>
          </div>
        </div>
      </div>
      <div class="nav_bottom">
        <pageTags :data="pageList"/>
      </div>
    </div>
    <!--右侧下方主体-->
    <div class="bottom" :style="{left:this.shrink?this.leftMiniWidth:this.leftWidth}">
      <div class="bottom_container">
        <keep-alive exclude="home">
          <router-view/>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
  import treeMenu from '@/components/custom/leftMenu/treeMenu/treeMenu'
  import breadcrumbNav from '@/components/custom/topNav/breadcrumb/breadcrumbNav'
  import fullScreen from '@/components/custom/topNav/fullScreen/fullScreen'
  import messageCenter from '@/components/custom/topNav/messageCenter/messageCenter'
  import pageTags from '@/components/custom/topNav/pageTags/pageTags'

  export default {
    name: "index",
    data() {
      return {
        //左侧菜单默认宽度
        leftWidth: "200px",
        //左侧菜单收缩的宽度
        leftMiniWidth: '50px',
        //菜单是否收缩
        shrink: false,
        //菜单数据
        menu: [],
        //默认是否全屏显示
        isFull: false,
        //消息总数
        messageCount: 3,
        avatorPath: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg"
      }
    },
    components: {
      treeMenu,
      breadcrumbNav,
      fullScreen,
      messageCenter,
      pageTags,
    },
    created() {
      this.menu = this.$store.state.menu.menu
    },
    //缓存数据
    computed: {
      pageList() {
        return this.$store.state.menu.pageOpendList
      }
    },
    methods: {
      keys(){
        console.log(this.$route.name)
        return "1"
      },
      //切换菜单
      toggle() {
        this.$menu.toggleMenu(this.menu, this.$route.path)
      },
      //切换菜单收缩
      toggleNavicon() {
        this.$menu.toggleMenu(this.menu, this.$route.path)
        this.shrink = this.$menu.getShrink()
      },
      //全屏反馈父元素 必须存在
      toggleFullScreen(isFull) {
      }
    },
  }
</script>
