let menuUtils = {
  //上一个展开
  preExpanded: false,
  //全局记录最后的索引
  lastIndex: 0,
  //全局自增索引
  index: 1,
  //数据结构存放已经展开的所有父类
  map: new Map(),
  //是否开启路由功能 开关
  routeSwitching: false,
  //是否收缩
  shrink: false,
  //初始化方法
  init: function (menu, path) {
    if (path.length > 2) {
      if (!this.routeSwitching) {
        this.setExpand(menu, path, this.setExpand, this)
        this.setExpandAfter()
        this.routeSwitching = true
      }
    }
  },
  //寻找父类
  findParent: function (current, previous) {
    //判断前一个展开的是否是父级
    if (previous.id === current.parentId) {
      if (!this.map.has(previous.id)) {
        if (this.map.size > 0) {
          let keyArr = [...this.map.keys()]
          let lastKey = keyArr[this.map.size - 1]
          let last = this.map.get(lastKey)
          this.index = last.index + 1
        }
        this.map.set(previous.id, {
          index: this.index,
          element: previous
        })
      }
      return true
    }

    //判断当前要展开的 有父级的话 从父级开始向后的都需要关闭掉 需要关闭上一个
    if (this.map.has(current.parentId)) {
      //排除子类已经手动关闭的情况
      if (previous.isExpanded) {
        let currentParent = this.map.get(current.parentId);
        this.map.forEach((value, key) => {
          if (value.index > currentParent.index) {
            value.element.isExpanded = false
            value.element.isSelected = false
            this.map.delete(key)
          }
        })
      }
      return false
    }
    // 不同级别的将当前族谱全部清除
    this.cleanMap()
    return false;
  },
  //清理map
  cleanMap() {
    if (this.map.size > 0) {
      this.map.forEach((value, index) => {
        value.element.isExpanded = false
        value.element.isSelected = false
      })
      this.map.clear()
    }
  },
  //将菜单还原到原始状态
  clear() {
    if (this.map.size > 0) {
      this.cleanMap()
      this.closePrevious()
    }
    if(this.preExpanded){
      this.preExpanded.isExpanded = false
    }
  },
  //关闭上一个的状态
  closePrevious() {
    if (this.preExpanded) {
      this.preExpanded.isExpanded = false
      this.preExpanded.isSelected = false
    }
  },
  //设置展开
  setExpand: function (menu, route, func, funcInstance) {
    let toJson
    for (let i = 0; i < menu.length; i++) {
      toJson = JSON.stringify(menu[i])
      if (toJson.indexOf(route) > -1) {
        if (menu[i].type === "button") {
          funcInstance.lastIndex = menu[i].id
          funcInstance.map.set(menu[i].id, {
            index: ++funcInstance.index,
            element: menu[i]
          })
          menu[i].isExpanded = true
          menu[i].isSelected = true
          //将递归替换成循环执行  this.setExpand(menu[i].subMenu, route)
          while (func && func instanceof Function) {
            func = func(menu[i].subMenu, route, funcInstance.setExpand, funcInstance)
          }
          return func
        }
      }
    }
  },
  //后置操作
  setExpandAfter: function () {
    if (this.map.size > 0) {
      this.preExpanded = this.map.get(this.lastIndex).element
      this.map.delete(this.lastIndex)
    }
  },
  //切换状态
  toggleStatus: function (currentExpanded) {
    if (currentExpanded.type === "button") {
      if (this.preExpanded) {
        let isParent = this.findParent(currentExpanded, this.preExpanded)
        // 关闭上一个
        if (!isParent) {
          if (this.preExpanded !== currentExpanded && this.preExpanded.isExpanded === true) {
            this.closePrevious()
          }
        }
      }
      this.preExpanded = currentExpanded
      currentExpanded.isExpanded = !currentExpanded.isExpanded
      currentExpanded.isSelected = !currentExpanded.isSelected
    }
  },
  //设置展开和收缩的class
  setClassName() {
    let treeViewArr = document.getElementsByClassName("tree-view")
    for (let i = 0; i < treeViewArr.length; i++) {
      if (treeViewArr[i].className.indexOf("treeViewMini") === -1) {
        treeViewArr[i].className = treeViewArr[i].className + " treeViewMini"
      } else {
        treeViewArr[i].className = "tree-view"
      }
    }

  },
  //清理button的selected状态
  cleanButton() {
    let selectedArr = document.getElementsByClassName("selected")
    for (let i = 0; i < selectedArr.length; i++) {
      selectedArr[i].className = selectedArr[i].className.replace("selected", "")
    }
  },
  //切换菜单收缩
  toggleMenu: function (menu, path) {
    this.setClassName()
    let treeViewMiniArr = document.getElementsByClassName("treeViewMini");
    //收缩菜单
    if (treeViewMiniArr.length) {
      this.shrink = true
      this.clear()
    } else {
      if(this.preExpanded){
        this.preExpanded.isSelected = false
      }
      //清理收缩状态下的选中
      this.cleanButton()
      //展开菜单
      this.shrink = false
      this.sprinkInit(menu, path)
    }
  },
  //获取收缩状态
  getShrink() {
    return this.shrink;
  },
  //收缩初始化
  sprinkInit(menu, path) {
    if (path.length > 2) {
      this.setExpand(menu, path, this.setExpand, this)
    }
  }
}

export default {
  install: function (vm) {
    vm.prototype.$menu = menuUtils
  }
}
