<style lang="stylus" scoped>
  .countCard
    width: 100%
    height: 100px
    .leftIconWrapper
      height: 100%
      border-radius: 3px 0 0 3px
      text-align: center
      .leftIcon
        line-height: 100px
    .contentMapper
      height: 100%
      text-align: center
      .content
        width: 100%
        height: 100%
        line-height: 2
        .number
          font-size: 30px
          font-weight: 700
        .message
          font-size: 12px
          color: #C8C6C6

</style>
<template>
  <Card class="card" :padding="0">
    <div class="countCard">
      <Col span="8" class="leftIconWrapper"
           :style="{background:this.data.backgroundColor?this.data.backgroundColor:this.defaultColor}">
      <Icon class="leftIcon" :type="this.data.iconType" color="white" size="40"></Icon>
      </Col>
      <Col span="16" class="contentMapper">
      <div class="content">
        <p class="number" :style="{color:this.data.backgroundColor?this.data.backgroundColor:this.defaultColor}">
          <countTo :startVal='startVal' :endVal='this.data.number' :duration='duration' :suffix="suffix"></countTo>
        </p>
        <p class="message" v-text="this.data.info"></p>
      </div>
      </Col>
    </div>
  </Card>
</template>


<script>
  import countTo from 'vue-count-to'
  export default {
    name: "count-cart",
    data() {
      return {
        //默认颜色
        defaultColor: "dodgerblue",
        //起始值
        startVal:0,
        //间隔
        duration:3000,
        //后缀
        suffix:""
      }
    },
    components:{
      countTo
    },
    props: {
      data: {
        iconType: {
          type: String,
          default: "eye-disabled"
        },
        backgroundColor: {
          type: String,
          default: "dodgerblue"
        },
        number: {
          type: Number,
          default: 0
        },
        info: {
          type: String,
          default: "暂无信息"
        },
      }
    }
  }
</script>
