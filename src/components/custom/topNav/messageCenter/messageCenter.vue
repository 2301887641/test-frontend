<style lang="stylus" scoped>
  @import '../../../../assets/css/common.styl'
  .topIcon
    .ivu-badge
      vertical-align:baseline!important
</style>
<template>
  <Tooltip class="topIcon" content="查看消息" placement="bottom">
    <Badge :count="value">
      <Icon class="cursor-pointer" type="ios-bell" :size="23" @click="toggle"/>
    </Badge>
  </Tooltip>
</template>

<script>
  export default {
    name: "message-center",
    methods: {
      toggle() {
        //vux分组后，actions还是使用这样的调用方式
        this.$store.dispatch("increment","home_message")
        //跳转路由
        this.$router.push({
          name:"home_message"
        })
        //this.$root.publish_openMenu.$emit('openMenu', "home_message",event.target)
      }
    },
    props: {
      value: {
        type: Number,
        default: 0
      }
    }
  }
</script>
