<style scoped>

</style>
<template>
  <div id="chinaMap" class="chinaMap" style="width:500px;height:280px;"></div>
</template>

<script>
  // 主模块
  let echarts = require('echarts/lib/echarts')
  // 散点图
  require('echarts/lib/chart/scatter')
  // 散点图放大
  require('echarts/lib/chart/effectScatter')
  // 地图
  require('echarts/lib/chart/map')
  // 图例
  require('echarts/lib/component/legend')
  // 提示框
  require('echarts/lib/component/tooltip')
  // 地图geo
  require('echarts/lib/component/geo')
  // 中国地图
  require('echarts/map/js/china')
  export default {
    name: "china-map",
    mounted() {
      let chinaMap = echarts.init(document.getElementById('chinaMap'))
      let showLoadingDefault = {
        text: '加载中...',
        color: '#23531',
        textColor: '#fff',
        // 地图背景色
        maskColor: '#fff',
        zlevel: 0
      }
      // 进行相关配置
      chinaMap.setOption({
        title:{
          text:"热力图分布",
          left: 'center',
          textStyle: {
            color: '#333'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name + ' : ' + params.value
          }
        }, // 鼠标移到图里面的浮动提示框
        visualMap: { //左侧小柱子的配置
          min: 0, // 最小值
          max: 50000, //最大值
          left: 'left', // 定位左边
          top: 'bottom', // 定位底部
          text: ['高', '低'], // 上下两个文字
          realtime: false,
          seriesIndex: [1],
          inRange: {
            color: ['#e0ffff', '#006edd','orangered'] // 深浅颜色
          },
          calculable: true // 显示与否
        },
        geo: { // 这个是重点配置区
          map: 'china', // 表示中国地图
          roam: true,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: 'rgba(0,0,0,0.4)'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [
          {
            name: '香港18区人口密度',
            type: 'map',
            coordinateSystem: 'geo' // 对应上方配置
          },
          {
            name: '启动次数', // 浮动框的标题
            type: 'map',
            geoIndex: 0,
            // 这里就是数据，即数组可以单独放在外面也可以直接写
            data: [
              {name: '广东', value: 15000},
              {name:'新疆',value:7000},
              {name:'山东',value:0}
            ]
          }
        ]
      })
      //chinaMap.showLoading(showLoadingDefault)
    }

  }
</script>
