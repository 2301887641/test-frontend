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
        <Icon type="android-share-alt"></Icon>&nbsp;<span>修改资源</span>
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
            <Form-item label="上级资源:">
              <treeselect
                :value="compute_value"
                :multiple="false"
                :searchable="false"
                :clearable="true"
                :options="treeSelect"
                :normalizer="normalizer"
                :beforeClearAll="clearAll"
                @select="select"
                placeholder="顶级资源"
              />
            </Form-item>
            <Form-item label="资源名称:" prop="name">
              <Input type="text" v-model="form.name" placeholder="由2-16位字母、数字、中文和下划线组成，下划线不能开头结尾"/>
            </Form-item>
            <Form-item label="资源图标:" prop="icon">
              <Input type="text" v-model="form.icon" placeholder="请点击左侧资源图标库"/>
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
  // import the component
  import treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'


  import iconMap from '../../../../assets/js/plugins/embedIcon.js'

  export default {
    name: "resource-edit",
    props: {
      form: {
        default: Object
      },
      treeSelect: {
        default: Array
      },
      parentId: {
        type: Number,
      }
    },
    components: {
      treeselect
    },
    data() {
      return {
        // 自定义字段
        normalizer(node) {
          return {
            id: node.id,
            label: node.name,
            children: node.children
          }
        },
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
        //验证规则
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
    //必须在之前创建否则 getIcon方法中的this.iconInstance.handler()报错
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
      //图标初始化
      iconInit() {
        this.iconInstance.init()
        this.getIcon()
      },
      remove() {
        this.iconInit()
        this.$refs['form'].resetFields();
        this.model = false
      },
      refresh() {
        this.remove()
        this.$parent.getTreegrid()
      },
      addOk() {
        this.$refs.form.validate((validate) => {
          if (validate && this.verifyParentId()) {
            this.load = true
            this.$http.put("/resource", this.form,this)
          }
        })
      },
      //修改icon图标
      transterIcon(icon) {
        this.form.icon = icon
      },
      //树形结构选择后事件
      select(node, instanceId) {
        this.form.parentId = node.id
        this.verifyParentId()
      },
      //验证parentId
      verifyParentId() {
        if (this.form.parentId == this.form.id) {
          this.$Message.destroy()
          this.$Message.error("不能将自己设为上级资源")
          return false
        }

        return true
      },
      /**
       * 点击treeselect删除时回调
       * @returns {boolean}
       */
      clearAll() {
        this.form.parentId = 0
        return true
      }
    },
    computed: {
      //对value属性进行计算
      compute_value() {
        if (this.form.parentId == 0) {
          return null
        }
        return this.form.parentId
      }
    }
  }
</script>
