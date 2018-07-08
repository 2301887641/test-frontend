<style lang="stylus" scoped>
    .pageTags
      position: relative
      box-sizing: border-box
      padding-right: 120px
      width: 100%
      height: 100%
      .leftPageTag
        position: absolute
        padding: 2px 10px
        overflow: visible
        white-space: nowrap
        transition: left .3s ease
      .rightPageTag
        position: absolute
        right: 0
        top: 0
        box-sizing: border-box
        padding-top: 8px
        text-align: center
        width: 110px
        height: 100%
        background: white
        z-index: 10
</style>
<template>
    <div class="pageTags" ref="scrollCon">
      <!--左侧page标签-->
      <div class="leftPageTag" ref="leftPageTag" :style="{'left':tagLeft+'px'}">
        <transition-group ref="transitionParent" name="taglist-moving-animation">
          <Tag type="dot"
               v-for="(item,index) in data"
               :key="item.name"
               :name="item.name"
               :closable="item.name!=defaultOpenedPageName.name?true:false"
               :color="item.name===currentPageName?'blue':''"
               @click.native="openMenu(item.name)"
               @on-close="closeMenu"
          >{{item.title}}
          </Tag>
        </transition-group>
      </div>
      <!--右侧"标签选项" 默认点击显示下拉的时候,下拉框会错位 通过给body设置overflow:hidden解决掉-->
      <div class="rightPageTag" ref="rightPageTag">
        <Dropdown transfer trigger="click" @on-click="clearHandle">
          <Button size="small" type="primary">
            标签选项
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="clearAll">关闭所有</DropdownItem>
            <DropdownItem name="clearOthers">关闭其他</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
</template>

<script>
  export default {
    name: "page-tags",
    data() {
      return {
        //默认开启的页面
        defaultOpenedPageName: this.$constants.defaultOpenedPage,
        //当前路由名称
        currentPageName: this.$route.name,
        //距离左边的默认值
        tagLeft: 0,
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    mounted(){
      //初始化 这里不设定时器就会有偏移bug
      setTimeout(()=>{
        this.refreshFactory()
      },1)
    },
    beforeCreate(){
      this.$root.publish_openMenu.$on('openMenu', (name) => {
        this.openMenu(name)
      })
    },
    methods: {
      //标签选项处理
      clearHandle(type){
        switch(type){
          case "clearAll":
            this.$store.dispatch("clearAll")
            break;
          case "clearOthers":
            this.$store.dispatch("clearOthers",this.currentPageName)
            break;
        }
      },
      //打开菜单
      openMenu(name) {
        this.$router.push({name: name})
        //关联菜单
        if (this.$route) {
          this.$menu.cascade(this.$store.state.menu.menu, this.$route.path)
        }
      },
      //关闭
      closeMenu(event, router_name) {
        this.$store.commit("close",
          {
            jumpRouterName: router_name,
            currentPageName: this.currentPageName,
          }
        )
      },
      /**
       * 重新计算位置
       * ①当前标签距离父元素左侧的距离 大于 -父元素的left
       * ②当前标签距离父元素左侧的距离 加上 当前元素的宽度
       * 小于
       * 父元素左值 加上 左边滑动条的宽度 (说明元素已经超出了滑块)
       * 重新计算父元素的左值
       */
      refresh(tag,router_name) {
        if (tag.offsetLeft < -this.tagLeft) {
          // 标签在可视区域左侧
          this.tagLeft = -tag.offsetLeft + 10
        } else if (tag.offsetLeft + 10 > -this.tagLeft && tag.offsetLeft + tag.offsetWidth < -this.tagLeft + this.$refs.scrollCon.offsetWidth - 100) {
          // 标签在可视区域
            this.tagLeft = Math.min(0, this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth - tag.offsetLeft - 20)
        } else {
          // 标签在可视区域右侧
          this.tagLeft = -(tag.offsetLeft - (this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) + 20)
        }
      },
      refreshFactory(){
        let children,index
        children = this.$refs.transitionParent.$children
        if (children.length > 0) {
          index=this.$store.state.menu.pageOpendName.indexOf(this.currentPageName)
          this.refresh(children[index].$el,this.currentPageName)
        }
      }
    },
    //使用watch方法监听路由变化
    watch: {
      '$route'(to) {
        this.currentPageName = to.name
        this.$nextTick(() => {
          this.refreshFactory()
        })
      }
    }
  }
</script>
