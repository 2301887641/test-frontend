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
    <Modal v-model="model" :closable="false" :mask-closable="maskClosable" width="930">
      <p slot="header">
        <Icon type="android-share-alt"></Icon>&nbsp;<span>添加资源</span>
      </p>
      <Row :gutter="16">
        <Col span="10">
          <Card style="margin-bottom:10px;padding:0 12px;">
            <p slot="title" style="position:relative;">
              <Icon type="ios-film-outline"></Icon>
              图标资源
              <a href="#" slot="extra" style="position:absolute;right:10px;" @click="getIcon">
                <Icon type="ios-loop-strong"/>
                换一批
              </a>
            </p>
            <Row>
              <div class="iconWrapper" v-for="(icon,index) in iconData" :key="index" :title="icon"
                   @click="transterIcon(icon)">
                <Icon :type="icon"/>
              </div>
            </Row>
          </Card>
        </Col>
        <Col span="12">
          <Form ref="form" :model="form" :rules="verifyRule" :label-width="80">
            <Form-item label="上级资源:" prop="parentName">
              <Input type="text" :placeholder="form.parentName" disabled/>
            </Form-item>
            <Form-item label="资源名称:" prop="name">
              <Input type="text" v-model="form.name" placeholder="由2-16位字母、数字、中文和下划线组成，下划线不能开头结尾"/>
            </Form-item>
            <Form-item label="资源图标:" prop="icon">
              <Input type="text" v-model="form.icon" disabled placeholder="请点击左侧资源图标库"/>
            </Form-item>
            <Form-item label="资源类型:" prop="resourceType">
              <RadioGroup v-model="form.resourceType" type="button">
                <Radio :label="0">菜单</Radio>
                <Radio :label="1">按钮</Radio>
              </RadioGroup>
            </Form-item>
            <Form-item label="权限标识:" prop="code">
              <Input type="text" v-model="form.code" placeholder="由字母和冒号:组成，冒号:不能开头结尾"/>
            </Form-item>
            <Form-item label="访问地址:" prop="url">
              <Input type="text" v-model="form.url" placeholder="访问地址以'/'开头"/>
            </Form-item>
            <Form-item label="描述:" prop="description">
              <Input v-model="form.description" type="text" placeholder="描述信息..."/>
            </Form-item>
            <Form-item label="排序:" prop="priority">
              <InputNumber :min="0" v-model="form.priority" placeholder="排序"/>
            </Form-item>
          </Form>
        </Col>
      </Row>
      <div slot="footer">
        <Button type="ghost" style="margin-left: 8px" @click="remove">取消</Button>
        <Button type="primary" :loading="load" @click="addOk">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import iconMap from '../../../../assets/js/plugins/embedIcon.js'
  import Vue from 'vue'

  export default {
    name: "resource-topNav",
    data() {
      return {
        formRef:this.$refs.form,
        //模态loding
        load: false,
        //模型
        model: false,
        //模态取消x号关闭
        maskClosable: false,
        //icon数据
        iconData: this.getIcon(),
        //icon实例
        iconInstance: new iconMap(),
        form: {
          parentId: this.parentResourceInfo.parentId,
          name: '',
          icon: '',
          resourceType: 0,
          code: '',
          url: '',
          priority: 0,
          path: '',
          parentName: this.parentResourceInfo.parentName
        },
        verifyRule: {
          name: [
            {required: true, type: "string", message: "请填写资源名称"},
            {pattern: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{2,16}$/, message: "名称格式错误"}
          ],
          icon: [
            {required: true, message: "请选择资源图标"}
          ],
          code: [
            {required: false, pattern: /^(?!:)(?!.*?:$)[a-zA-Z:]+$/, message: "由字母和冒号:组成，冒号:不能开头结尾"}
          ],
          url: [
            {required: false, pattern: /^\/[\w/]+$/, message: "资源访问地址格式必须以‘/’开头"}
          ],
          priority: [
            {required: false, message: "请输入数字", triggle: 'change', type: 'number'}
          ]
        }
      }
    },
    watch: {
      'parentResourceInfo.parentName'() {
        this.form.parentName = this.parentResourceInfo.parentName
      },
      'parentResourceInfo.parentId'() {
        this.form.parentId = this.parentResourceInfo.parentId
        this.form.path = this.parentResourceInfo.parentId
      }
    },
    props: {
      parentResourceInfo: {
        parentId: Number,
        parentName: String
      }
    },
    /**
     * 必须在之前创建否则 getIcon方法中的this.iconInstance.handler()报错
     */
    beforeCreate() {
      this.iconInstance = new iconMap()
    },
    created() {
      this.getIcon()
    },
    methods: {
      //获取下一组icon
      getIcon() {
        this.iconData = this.iconInstance.handler()
      },
      //修改icon图标
      transterIcon(icon) {
        this.form.icon = icon
      },
      //图标初始化
      iconInit() {
        this.iconInstance.init()
        this.getIcon()
      },
      //取消
      remove() {
        this.iconInit()
        this.$refs['form'].resetFields();
        this.model = false
      },
      //刷新操作
      refresh() {
        this.remove()
        this.$parent.getTreegrid()
      },
      //确定
      addOk() {
        this.$refs.form.validate((validate) => {
          if (validate) {
            this.load = true
            this.$http.post("/resource", this.form,this)
          }
        })
      }
    }

  }
</script>
