<style lang="stylus" scoped>

</style>
<template>
  <div class="resource">
    <topNav/>
    <div class="container">
      <zk-table
        ref="table"
        sum-text="sum"
        index-text="#"
        :data="treeTableData"
        :columns="columns"
        :stripe="props.stripe"
        :border="props.border"
        :show-header="props.showHeader"
        :show-summary="props.showSummary"
        :show-row-hover="props.showRowHover"
        :show-index="props.showIndex"
        :tree-type="props.treeType"
        :is-fold="props.isFold"
        :expand-type="props.expandType"
        :selection-type="props.selectionType">
        <template slot="type" slot-scope="scope">
          <span v-if="scope.row.resourceType==menu"><Icon type="grid"></Icon>&nbsp;菜单</span>
          <span v-else><Icon type="android-radio-button-on"></Icon>&nbsp;按钮</span>
        </template>
        <template slot="icon" slot-scope="scope">
          <span v-if="!!scope.row.icon"><Icon :type="scope.row.icon"></Icon></span>
          <span v-else>-</span>
        </template>
        <template slot="action" slot-scope="scope">
          <Button type="primary" size="small" @click="edit(scope.row.id)">编辑</Button>
          <Button type="success" size="small" @click="addChildView(scope.row)">添加下级</Button>
          <Button type="error" size="small" :loading="load" @click="remove(scope.row.id)">删除</Button>
        </template>
      </zk-table>
    </div>
    <Add ref="resourceAddRef" :parentResourceInfo="parentResourceInfo"/>
    <Edit ref="resourceEditRef" :form="editData" :treeSelect="selectTableData" :parentId="editData.parentId"/>
  </div>
</template>

<script>
  import topNav from '../../../custom/rightHome/topNav/topNav'
  import Add from './resourceAdd'
  import Edit from './resourceEdit'

  export default {
    name: "resource",
    data() {
      return {
        //删除时的load状态
        load: false,
        props: {
          stripe: true,
          border: true,
          showHeader: true,
          showSummary: false,
          showRowHover: true,
          showIndex: false,
          treeType: true,
          isFold: false,
          expandType: false,
          selectionType: false
        },
        columns: [
          {
            label: '资源名称',
            prop: 'name',
            width: '400px',
          },
          {
            label: '资源类型',
            prop: 'resourceType',
            type: 'template',
            template: 'type',
          },
          {
            label: '资源链接',
            prop: 'url',
          },
          {
            label: '权限标识',
            prop: 'code',
          },
          {
            label: '图标',
            prop: 'icon',
            type: 'template',
            template: 'icon',
            width: '80px'
          },
          {
            label: '排序',
            prop: 'priority',
            width: '100px'
          },
          {
            label: '操作',
            type: 'template',
            prop: 'action',
            template: 'action',
          }
        ],
        //表格树数据
        treeTableData: [],
        selectTableData: [],
        //获取修改数据 必须定义成对象格式，否则报警告
        editData: {},
        //enum数值
        menu: this.$constants.enum.resource.Menu,
        //父级资源信息
        parentResourceInfo: {
          parentId: 0,
          parentName: "顶级资源"
        }
      }
    },
    created() {
      this.refresh()
    },
    components: {
      Add, topNav, Edit
    },
    methods: {
      //添加顶级菜单
      addView() {
        this.$refs.resourceAddRef.model = true
        this.parentResourceInfo.parentId = 0
        this.parentResourceInfo.parentName = '顶级资源'
      },
      //添加子类
      addChildView(row) {
        this.parentResourceInfo.parentId = row.id
        this.parentResourceInfo.parentName = row.name
        this.$refs.resourceAddRef.model = true
      },
      edit(id) {
        this.getById(id)
        this.$refs.resourceEditRef.model = true
      },
      //获取treegrid数据
      getTreegrid(id) {
        let path = (!!id) ? "/resource?id=" + id : "/resource"
        this.$http.get(path, this, (result, data) => {
          if (result) {
            if (!!id) {
              this.selectTableData = data.data
              return
            }
            this.treeTableData = data.data
          }
        })
      },
      //根据id获取
      getById(id) {
        this.$http.get("/resource/" + id, this, (result, data) => {
          if (result) {
            this.editData = data.data
            this.getTreegrid(id)
          }
        })
      },
      refresh() {
        this.getTreegrid()
      },
      /**
       * 根据id删除
       * @param id
       */
      remove(id) {
        this.$http.delete("/resource/" + id, this)
      }
    }
  }
</script>
