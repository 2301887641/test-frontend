<style scoped>

</style>
<template>
    <div class="breadcrumbNav">
      <Breadcrumb>
        <BreadcrumbItem to="/">
          <Icon type="ios-home-outline"></Icon> 首页
        </BreadcrumbItem>
        <BreadcrumbItem to="#" v-for="(item,key) in data" :key="key">
          <Icon type="social-buffer-outline"></Icon> {{item}}
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
</template>

<script>
    export default {
        name: "breadcrumb-nav",
        data(){
          return {}
        },
      props:{
          data:{
            default:Array
          }
      }
    }
</script>
