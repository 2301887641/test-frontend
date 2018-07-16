<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../../../assets/css/common.styl'

</style>
<template>
    <Tooltip class="topIcon" :content="value?'退出全屏':'全屏'" placement="bottom">
      <Icon class="cursor-pointer" @click="toggle" :type="value ? 'arrow-shrink' : 'arrow-expand'" size="23"/>
    </Tooltip>
</template>

<script>
  export default {
    name: "full-screen",
    data() {
      return {}
    },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      //切换
      toggle() {
        this.fullScreenHandle()
        //触发父类的input事件 传递并修改value
        this.$emit("input", !this.value)
      },
      //全屏处理
      fullScreenHandle() {
        if (this.value) {
          this.exitFullscreen()
          return
        }
        let body = document.body
        this.launchFullscreen(body)
      },
      //判断浏览器开启全屏
      launchFullscreen(body) {
        if (body.requestFullScreen) {
          body.requestFullScreen();
        } else if (body.webkitRequestFullScreen) {
          body.webkitRequestFullScreen();
        } else if (body.mozRequestFullScreen) {
          body.mozRequestFullScreen();
        }
      },
      //退出全屏
      exitFullscreen() {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    }
  }
</script>
