<style lang="stylus" scoped>

</style>
<template>
  <div class="resource">
    <topNav/>
    <div class="container">
    </div>
    <Add ref="resourceAddRef" :iconData="iconData"/>
  </div>
</template>

<script>
  import topNav from '../../../custom/rightHome/topNav/topNav'
  import Add from './resourceAdd'
  import iconArr from '../../../../assets/js/plugins/embedIcon.js'

  export default {
    name: "resource",
    iconData:[],
    data() {
      return {
      }
    },
    created(){
      this.iconData=iconArr
    },
    components: {
      Add, topNav
    },
    methods:{
      add(){
        this.$refs.resourceAddRef.resourceAddModel=true
      },
      getList(){

      }
    }
  }
</script>
