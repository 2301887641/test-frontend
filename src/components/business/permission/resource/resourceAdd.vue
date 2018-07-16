<style lang="stylus" scoped>
  .iconWrapper
    display: inline-block
    cursor: pointer
    text-align: center
    position: relative
    width: 50px
    height: 50px
    &:hover
      border: 1px solid #dddee1
      border-radius: 4px
      box-shadow: 1px 1px 1px
      i
        color: #2db7f5
    i
      width: 18px
      font-size: 23px
      position: absolute
      left: 50%
      top: 50%
      margin: -11px 0 0 -9px
</style>
<template>
  <div class="resourceAdd">
    <Modal v-model="resourceAddModel" :closable="false" :mask-closable="maskClosable" width="930">
      <p slot="header">
        <Icon type="android-share-alt"></Icon>&nbsp;<span>添加资源</span>
      </p>
      <Row :gutter="16">
        <Col span="10">
        <Card style="margin-bottom:10px;padding:0 12px;">
          <p slot="title" style="position:relative;">
            <Icon type="ios-film-outline"></Icon>
            图标资源
            <a href="#" slot="extra" style="position:absolute;right:10px;">
              <Icon type="ios-loop-strong" @click=""></Icon>
              下一批
            </a>
          </p>
          <Row>
            <div class="iconWrapper" v-for="(icon,index) in iconData" :key="index" :title="icon">
              <Icon :type="icon"/>
            </div>
          </Row>
        </Card>
        </Col>
        <Col span="12">
        <Form ref="form" :model="form" :rules="verifyRule" :label-width="80">
          <Form-item label="上级资源:" prop="parentName">
            <treeselect v-model="form.parentName" :multiple="false" :options="options"/>
          </Form-item>
          <Form-item label="资源名称:" prop="name">
            <Input type="text" v-model="form.name"></Input>
          </Form-item>
          <Form-item label="资源图标:" prop="icon">
            <Input type="text" v-model="form.icon"></Input>
          </Form-item>
        </Form>
        </Col>
      </Row>

    </Modal>
  </div>
</template>

<script>
  // import the component
  import treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    name: "resource-topNav",
    components: {
      treeselect
    },
    props: {
      iconData: {
        default: Array
      }
    },
    data() {
      return {
        //模型
        resourceAddModel: false,
        maskClosable:false,
        options: [{
          id: 'a',
          label: 'a',
          children: [{
            id: 'aa',
            label: 'aa',
          }, {
            id: 'ab',
            label: 'ab',
          }],
        }, {
          id: 'b',
          label: 'b',
        }, {
          id: 'c',
          label: 'c',
        }],
        form: {
          parentName: '',
          name: '',
          icon: ''
        },
        verifyRule: {
          name: [
            {required: true, message: "请填写资源名称"}
          ],
          icon: [
            {required: true, message: "请选择资源图标"}
          ]
        }
      }
    },

  }
</script>
