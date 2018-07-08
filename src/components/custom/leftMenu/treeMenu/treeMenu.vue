<style lang="stylus" rel="stylesheet/stylus">
  bgColor = #495060

  .fade-enter-active
    transition: all 0 ease 0
  .fade-enter
    opacity: 0
  .fade-enter-to
    opacity: 1
  .fade-leave-to
    height: 0

  .tree-view
    white-space: nowrap
    width: 100%
    transition: width .3s
    color:#fff
    /*.selected*/
      /*color: #1976d2*/
      /*background: #eee*/
    .button
      .icon
        margin-right:5px
      position: relative
      padding: 10px 15px
      transition: background-color 0.2s ease-in-out 0s, color 0.3s ease-in-out 0.1s
      &:hover
        background-color: #eee
        cursor: pointer;
        color: #1976d2
        font-weight:bolder
        unSelectedCharacter()
      .arrow
        position: absolute
        right: 10px
        width: 24px
        height: 24px
    .expended
      .arrow
        transform: rotate(90deg)
    .subMenu
      .link
        display: block
        padding: 10px 35px
        color:rgba(255, 255, 255, 0.65)
        width:100%
        &:hover
          background-color: #eee
          color: #1976d2
          unSelectedCharacter()
      .router-link-active
        color: #fff!important
        background: #2d8cf0!important
  .treeViewMini
    transform: translate(0, 0)
    width: 50px !important
    .selected
      color: #fff
      background: none
    .level
      .wrapper .wrapper
        width:180px
        &:hover> .subMenu
          display: block !important
          position: absolute
          width: 180px
          left: 179px
          top: 0
          margin: 0 1px
          background: bgColor
    .link
      width: 100%
    > .level
      position: relative
    > .level-1
      &:hover
        > .wrapper
          > .button
            > .character
              color:#fff
              display: block !important
              position: absolute
              width: 180px
              border-bottom:1px solid #1976d2
              left: 50px
              top: 0
              padding: 10px 0 10px 15px
              background: bgColor
              margin: 0 1px
            .arrow
              display: block !important
              position: absolute
              left: 197px
              top: 10px
              width: 24px
              height: 24px
              transform: rotate(90deg)
          > .subMenu
              display: block !important
              position: absolute
              width: 180px
              left: 50px
              top: 45px
              margin: 0 1px
              background: bgColor
      > .wrapper
        > .button
          > span
            display: none

    .treeViewMini
      width:180px!important;

  /*混合函数*/
  unSelectedCharacter {
    user-select: none
  }
</style>
<template>
  <div class="tree-view">
    <div :class="'level level-'+item.level" v-for="(item,index) in menus" :key="item.id">
      <!--
      按钮类型 和 链接类型
      -->
      <div v-if="item.type==='link'">
        <router-link class="link" :class="{selected:item.selected}" :to="item.url"
                     @click.native="dropToggle(item)">{{item.name}}
        </router-link>
      </div>
      <div class="wrapper" v-if="item.type==='button'">
        <div class="button" ref="currentBtn"
             :class="{selected:item.isSelected,expended:item.isExpanded}" @click="dropToggle(item)">
            <i class="icon fa fa-dashboard"></i>
          <span class="character">{{item.name}}</span>
          <span class="arrow">
            <svg xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 24 24">
              <path fill="#ccc" d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z "></path>
            </svg>
          </span>
        </div>
        <transition name="fade">
          <div class="subMenu" v-show="item.isExpanded" v-if="item.subMenu">
            <!--自引用-->
            <treeMenu :menus="item.subMenu"/>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "treeMenu",
    data() {
      return {}
    },
    props: {
      menus: {}
    },
    methods: {
      dropToggle(item) {
        !this.$menu.getShrink() && this.$menu.toggleStatus(item)
      }
    },
    created() {
      if (this.$route) {
        this.$menu.init(this.menus, this.$route.path)
      }
    }
  }
</script>
