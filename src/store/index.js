import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
let menu = [
  {
    id: 1,
    level: 1,
    name: 'top1',
    isExpanded: false,
    isSelected: false,
    type: 'button',
    url: '/detail/a',
    parentId: 0
  },
  {
    id: 2,
    level: 1,
    name: 'top2',
    type: 'button',
    isExpanded: false,
    isSelected: false,
    parentId: 0,
    subMenu: [
      {id: 21, level: 2, parentId: 2, name: '简介', type: 'link', url: '/detail/menu'},
      {id: 41, level: 2, parentId: 2, name: '国际化（i18n）', type: "link", url: "/detail2/i18n"},
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
              {id: 449, level: 3, parentId: 444, name: '搭建本地开发环境222', type: "link", url: "/detail2/setup"}
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
]

//记录展开状态 将之前状态清除掉
let preExpanded

//实例
// let extend = new menuExtend();

// function menuExtend() {
//   //全局记录最后的索引
//   let lastIndex = 0
//   //全局自增索引
//   let home = 1
//   //数据结构存放已经展开的所有父类
//   let map = new Map()
//   //开关
//   this.switching = false
//   //初始化方法
//   this.init = function (menu, path) {
//     if (!this.switching) {
//       this.setExpand(menu, path, this.setExpand, this)
//       this.setExpandAfter()
//       this.switching = true
//     }
//   }
//   //寻找父类
//   this.findParent = function (current, previous) {
//     //判断前一个展开的是否是父级
//     if (previous.id === current.parentId) {
//       if (!map.has(previous.id)) {
//         if (map.size > 0) {
//           let keyArr = [...map.keys()]
//           let lastKey = keyArr[map.size - 1]
//           let last = map.get(lastKey)
//           home = last.home + 1
//         }
//         map.set(previous.id, {
//           home: home,
//           element: previous
//         })
//       }
//       return true
//     }
//
//     //判断当前要展开的 有父级的话 从父级开始向后的都需要关闭掉 需要关闭上一个
//     if (map.has(current.parentId)) {
//       //排除子类已经手动关闭的情况
//       if (previous.isExpanded) {
//         let currentParent = map.get(current.parentId);
//         map.forEach((value, key) => {
//           if (value.home > currentParent.home) {
//             value.element.isExpanded = false
//             map.delete(key)
//           }
//         })
//       }
//       return false
//     }
//
//     // 不同级别的将当前族谱全部清除
//     if (map.size > 0) {
//       map.forEach((value, home) => {
//         value.element.isExpanded = false
//       })
//       map.clear()
//     }
//     return false;
//   }
//   //设置展开
//   this.setExpand = function (menu, route, func, funcInstance) {
//     let toJson
//     for (let i = 0; i < menu.length; i++) {
//       toJson = JSON.stringify(menu[i])
//       if (toJson.indexOf(route) > -1) {
//         if (menu[i].type === "button") {
//           lastIndex = menu[i].id
//           map.set(menu[i].id, {
//             home: ++home,
//             element: menu[i]
//           })
//           menu[i].isExpanded = true
//           //将递归替换成循环执行
//           while (func && func instanceof Function) {
//             func = func(menu[i].subMenu, route, funcInstance.setExpand, funcInstance)
//           }
//           return func
//         }
//       }
//     }
//   }
//
//
//   //后置操作
//   this.setExpandAfter = function () {
//     if (map.size > 0) {
//       preExpanded = map.get(lastIndex).element
//       map.delete(lastIndex)
//     }
//   }
// }

const store = new Vuex.Store({
  state: {
    menu
  },
  mutations: {
    //切换状态时 将之前的状态重置
    toggleStatus(state, currentExpanded) {
      if (currentExpanded.type === "button") {
        if (preExpanded) {
          let isParent = extend.findParent(currentExpanded, preExpanded)
          // 关闭上一个
          if (!isParent) {
            (preExpanded !== currentExpanded) && (preExpanded.isExpanded === true) && (preExpanded.isExpanded = !preExpanded.isExpanded)
          }
        }
        preExpanded = currentExpanded
        currentExpanded.isExpanded = !currentExpanded.isExpanded
      }
    },
    init(state, path) {
      if (path.length > 2) {
        extend.init(state.menu, path)
      }
    }
  }
})

export default store
