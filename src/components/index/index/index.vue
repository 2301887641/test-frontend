<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../../assets/css/common.styl'

  .home
    padding-bottom: 100px
    margin-top: 5px
    .avator
      display: block;
      max-width: 110px;
      height: 100%;
    .realname
      color: dodgerblue
      font-size: 25px
      font-weight: 700
      margin-top: 5px
      margin-bottom: 5px
    .line-split
      border-bottom: 1px solid #ccc
      margin: 20px 0
</style>
<template>
  <div class="home">
    <Row :gutter="10">
      <!--适应md >= 992px <=1200px-->
      <!--第一列-->
      <Col :md="24" :lg="8">
      <!--内层-->
      <Row :gutter="10">
        <!--第一列列-->
        <Col :md="12" :lg="24">
        <Card class="margin-bottom-8">
          <Row>
            <!--头像-->
            <Col span="7">
            <!--高度需要定死 不然会上下起伏 给row定没用-->
            <Row>
              <Col span="24" style="height:110px;">
              <img :src="avatorPath" class="avator">
              </Col>
            </Row>
            </Col>
            <!--用户信息-->
            <Col span="17">
            <Row>
              <Col offset="3" class="realname">
              Admin
              </Col>
              <Col offset="3" class="nickname">
              super admin
              </Col>
            </Row>
            </Col>
          </Row>
          <!--分割线-->
          <div class="line-split"></div>
          <!--登陆信息-->
          <Row style="height:25px">
            <Col span="12">
            上次登录时间:</Col>
            <Col span="12">
            2017.09.12-13:32:20</Col>
          </Row>
          <Row style="height:25px">
            <Col span="12">
            上次登录地点:</Col>
            <Col span="12">
            北京</Col>
          </Row>
        </Card>
        </Col>
        <Col :md="12" :lg="24" class="margin-bottom-8">
        <Card>
          <!--待办事项标题-->
          <p slot="title" class="card-title">
            <Icon type="flag"></Icon>
            待办事项
          </p>
          <a type="text" slot="extra" @click.prevent="addNewToDoItem">
            <Icon type="plus-round" color="dodgerblue"></Icon>
          </a>
          <!--模态框-->
          <Modal v-model="todoModal" :mask-closable="false" :closable="false" :loading="loading" @on-ok="ok">
            <p slot="header">
              <Icon type="flag"></Icon>
              <span>添加新的待办事项</span>
            </p>
            <Row type="flex" justify="center">
              <Col>
              <Input v-model="todoInputModal" placeholder="请输入..." style="width: 300px"></Input>
              </Col>
            </Row>
          </Modal>
          <!--待办事项列表-->
          <todoList :data="toDoList"/>
        </Card>
        </Col>
      </Row>
      </Col>
      <!--第二列-->
      <Col :md="24" :lg="16">
      <Row :gutter="10">
        <Col :xs="24" :sm="12" :md="6" :lg="6" class="margin-bottom-8">
        <countCard :data="addUsers"/>
        </Col>
        <Col :xs="24" :sm="12" :md="6" :lg="6" class="margin-bottom-8">
        <countCard :data="addUsers2"/>
        </Col>
        <Col :xs="24" :sm="12" :md="6" :lg="6" class="margin-bottom-8">
        <countCard :data="addUsers3"/>
        </Col>
        <Col :xs="24" :sm="12" :md="6" :lg="6" class="margin-bottom-8">
        <countCard :data="addUsers4"/>
        </Col>
      </Row>
      <Row>
          <Card>
            <p slot="title" class="card-title">
              <Icon type="android-compass"></Icon>
              今日服务调用地理分布
            </p>
            <Row>
              <Col :span="8">
              <mapService/>
              </Col>
              <Col :span="15"  offset="1">
              <chinaMap/>
              </Col>
            </Row>
          </Card>
      </Row>
      </Col>

    </Row>
  </div>
</template>

<script>
  import todoList from '@/components/custom/rightHome/todoList/todoList'
  import countCard from '@/components/custom/rightHome/count/countCard'
  import mapService from '@/components/custom/rightHome/mapService/mapService'
  import chinaMap from '@/components/custom/rightHome/map/chinaMap'

  export default {
    name: "home",
    data() {
      return {
        //模型提交加载
        loading: true,
        //待办事项模型
        todoModal: false,
        //代办事项input
        todoInputModal: '',
        //统计数据
        addUsers:{
          iconType:"android-person-topNav",
          backgroundColor:"dodgerblue",
          number:555,
          info:"今日新增用户"
        },
        addUsers2:{
          iconType:"eye",
          backgroundColor:"rgb(100, 213, 114)",
          number:3000,
          info:"今日浏览量"
        },
        addUsers3:{
          iconType:"android-cloud-done",
          backgroundColor:"rgb(255, 213, 114)",
          number:555,
          info:"今日数据采集量"
        },
        addUsers4:{
          iconType:"shuffle",
          backgroundColor:"rgb(242, 94, 67)",
          number:555,
          info:"今日服务调用量"
        },
        //待办事项数据
        toDoList: [
          {
            id: 1,
            isFinashed: false,
            title: '去iView官网学习完整的iView组件'
          },
          {
            isFinashed: true,
            title: '去iView官网学习完整的iView组件'
          },
          {
            isFinashed: true,
            title: '去iView官网学习完整的iView组件'
          },
          {
            isFinashed: true,
            title: '去iView官网学习完整的iView组件'
          },
          {
            isFinashed: true,
            title: '去iView官网学习完整的iView组件'
          }
        ],
        avatorPath: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg"
      }
    },
    methods: {
      //添加代办事项
      addNewToDoItem() {
        this.todoModal = true
      },
      //点击确认模态框
      ok() {

      },
    },
    created(){
      //清除登陆loding
      this.$Spin.hide()
    },
    components: {
      todoList,countCard,mapService,chinaMap
    }
  }
</script>
