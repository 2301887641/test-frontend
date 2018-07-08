<style lang="stylus" scoped>
  @import '../../../../assets/css/common.styl'

  .todoList
    height: 150px;
    overflow: auto;
    .todoListWapper
      line-height: 35px
      margin-left: 14px
      .todoItem
        cursor: pointer
        &:hover
          font-weight: 600
        .to-do-list-item-text
          word-break: keep-all;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 500;
          cursor: pointer;
          height: 36px;
        .finashed
          text-decoration: line-through;
</style>
<template>
  <div class="todoList">
    <div class="todoListWapper" v-for="list in data">
      <Row class="todoItem">
        <Col span="2">
        <Checkbox v-model="list.isFinashed" v-if="!list.isFinashed"></Checkbox>
        <Icon type="pricetags" v-show="list.isFinashed"></Icon>
        </Col>
        <Col span="22">
        <!--row和col不能添加click事件-->
        <p class="to-do-list-item-text" @click="changeItem(list)" :class="{finashed:list.isFinashed}">
          {{list.title}}
        </p>
        </Col>
      </Row>
    </div>
    <Spin fix v-if="load">
      <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>

<script>
  export default {
    name: "todo-list",
    data() {
      return {
        // 加载状态
        load: false,
      }
    },
    methods: {
      changeItem(data) {
        this.load=true
        //TODO
        //ajax提交数据
        data.isFinashed = !data.isFinashed
      }
    },
    props: {
      data: {
        id: Number,
        title: String,
        isFinashed: Boolean
      }
    }
  }
</script>
