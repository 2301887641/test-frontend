import Constants from '../../assets/js/utils/constants'
import Lockr from 'lockr'
import Router from '../../router'

const menu = {
  state: {
    //是否缓存路由
    cachePage: [],
    //左侧菜单数据
    menu: [
      {
        id: 1,
        level: 1,
        name: '权限管理',
        type: 'button',
        isExpanded: false,
        isSelected: false,
        parentId: 0,
        subMenu: [
          {id: 21, level: 2, parentId: 2, name: '资源管理', type: 'link', url: '/resource'},
          {id: 41, level: 2, parentId: 2, name: '消息', type: "link", url: "/message"},
          {id: 42, level: 2, parentId: 2, name: '语言服务', type: "link", url: "/detail/language-service"},
          {id: 43, level: 2, parentId: 2, name: '安全', type: "link", url: "/detail/security"},
        ]
      },
      {
        id: 3,
        level: 1,
        name: 'top3',
        type: 'button',
        isExpanded: false,
        isSelected: false,
        parentId: 0,
        subMenu: [
          {id: 21, level: 2, parentId: 3, name: '简介2', type: 'link', url: '/detail/menu'},
          {id: 41, level: 2, parentId: 3, name: '国际化2（i18n）', type: "link", url: "/detail/i18n"},
          {id: 42, level: 2, parentId: 3, name: '语言服务2', type: "link", url: "/detail2/language-service"},
          {id: 43, level: 2, parentId: 3, name: '安全2', type: "link", url: "/detail3/security"},
          {
            id: 44,
            level: 2,
            name: '环境设置与部署',
            type: "button",
            isExpanded: false,
            isSelected: false,
            parentId: 3,
            subMenu: [
              {id: 441, level: 3, parentId: 44, name: '搭建本地开发环境', type: "link", url: "/detail/setup"},
              {id: 442, level: 3, parentId: 44, name: '搭建方式剖析', type: "link", url: "/detail/setup-systemjs-anatomy"},
              {id: 443, level: 3, parentId: 44, name: '浏览器支持', type: "link", url: "/detail/browser-support"},
              {
                id: 444,
                level: 3,
                parentId: 44,
                name: 'npm 包',
                type: "button",
                isExpanded: false,
                isSelected: false,
                subMenu: [
                  {id: 449, level: 3, parentId: 444, name: '搭建本地开发环境222', type: "link", url: "/message"}
                ]
              },
            ]
          },
          {
            id: 445,
            level: 3,
            parentId: 3,
            name: 'TypeScript 配置',
            type: "button",
            url: "/detail/typescript-configuration",
            isExpanded: false,
            isSelected: false,
            subMenu: [
              {id: 446, level: 3, parentId: 445, name: '预 (AoT) 编译器', type: "link", url: "/detail/aot-compiler"},
              {id: 447, level: 3, parentId: 445, name: '预 (AoT) 编译器', type: "link", url: "/detail/metadata"},
              {id: 448, level: 3, parentId: 445, name: '部署', type: "link", url: "/detail/deployment"}
            ]
          },
        ]
      }
    ],
    //已经点开的页面列表
    pageOpendList: [Constants.router.defaultOpenedPage],
    //记录已经点开的名称和索引
    pageOpendName: ["home_index"]
  },
  mutations: {
    //初始化函数
    init(state) {
      let cachePage = Lockr.get("cacheOpendPage")
      let cachePageName = Lockr.get("cacheOpendPageName")
      if (cachePage && cachePageName) {
        state.pageOpendList = JSON.parse(cachePage)
        state.pageOpendName = JSON.parse(cachePageName)
      }
    },
    //添加到已打开列表
    increment(state, routeName) {
      //检测是否已存在
      if (state.pageOpendName.indexOf(routeName) >= 0) {
        return true
      }
      let router, temp = {}
      for (let item in Constants.router.router) {
        router = Constants.router.router[item][routeName]
        if (router) {
          temp.name = router.name
          temp.title = router.title
          temp.path = router.path
          state.pageOpendList.push(temp)
          //记录名称和索引
          state.pageOpendName.push(temp.name)
          Lockr.set("cacheOpendPage", JSON.stringify(state.pageOpendList))
          Lockr.set("cacheOpendPageName", JSON.stringify(state.pageOpendName))
          continue
        }
      }
    },
    //关闭某个
    close(state, obj) {
      let index = state.pageOpendName.indexOf(obj.jumpRouterName)
      let location = index
      if (index >= 0) {
        //提前记录位置 好筛选上一个还是下一个
        if (index === state.pageOpendName.length - 1) {
          location = state.pageOpendName.length - 2
        }
        //根据索引删除
        state.pageOpendList.splice(index, 1)
        //删除附属
        state.pageOpendName.splice(index, 1)
        //路由跳转
        if (obj.currentPageName === obj.jumpRouterName) {
          Router.push({
            name: state.pageOpendList[location].name
          })
        }
        Lockr.set("cacheOpendPage", JSON.stringify(state.pageOpendList))
        Lockr.set("cacheOpendPageName", JSON.stringify(state.pageOpendName))
      }
    },
    //关闭所有
    clearAll(state) {
      state.pageOpendList.splice(1)
      state.pageOpendName.splice(1)
      Lockr.set("cacheOpendPage", JSON.stringify(state.pageOpendList))
      Lockr.set("cacheOpendPageName", JSON.stringify(state.pageOpendName))
      Router.push({
        name: Constants.router.defaultOpenedPage.name
      })
    },
    //关闭除了当前和首页外的所有
    clearOthers(state, routeName) {
      let current = state.pageOpendName.indexOf(routeName)
      if (current > 0) {
        state.pageOpendList = [state.pageOpendList[0], state.pageOpendList[current]]
        state.pageOpendName = [state.pageOpendName[0], state.pageOpendName[current]]
      }else if(current === 0 && state.pageOpendList.length>1){
        state.pageOpendList = [state.pageOpendList[0]]
        state.pageOpendName = [state.pageOpendName[0]]
      }
      Lockr.set("cacheOpendPage", JSON.stringify(state.pageOpendList))
      Lockr.set("cacheOpendPageName", JSON.stringify(state.pageOpendName))
    }
  },
  actions: {
    increment(context, name) {
      context.commit('increment', name)
    },
    clearAll(context) {
      context.commit('clearAll')
    },
    clearOthers(context,routeName){
      context.commit('clearOthers',routeName)
    }
  }
}

export default menu
