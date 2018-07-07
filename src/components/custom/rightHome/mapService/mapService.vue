<style lang="stylus" scoped>
.mapService
  height: 283px;
  overflow: auto;

</style>
<template>
  <div class="mapService">
    <Table class="mapServiceTable" :loading="loading" :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
    export default {
        name: "map-service",
        data(){
          return {
            loading:false,
            columns: [
              {
                title: '城市',
                key: 'city'
              },
              {
                title: '流量',
                key: 'flow'
              }
            ],
            data: [
              {
                city: '北京',
                flow: 18
              },
              {
                city: '北京',
                flow: 18
              },
              {
                city: '北京',
                flow: 18
              },
              {
                city: '北京',
                flow: 18
              },
              {
                city: '北京',
                flow: 18
              },
              {
                city: '北京',
                flow: 18
              },
              {
                city: '北京',
                flow: 18
              }
            ]
          }
        }
    }
</script>
