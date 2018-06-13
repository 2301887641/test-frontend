<style lang="stylus" rel="stylesheet/stylus" scoped>
  .home
    padding-bottom:100px
    margin-top:5px
    .avator_container
      .avator
        display:block
        width: 80%
    .avator_info
      b
        color:dodgerblue
        font-size:25px
</style>
<template>
  <div class="home">
    <Row :gutter="10">
      <Col  :md="24" :lg="8">
      <Card>
        <Row style="line-height:50px">
          <Col span="7">
          <div class="avator_container">
            <img :src="avatorPath" class="avator">
          </div>
          </Col>
          <Col span="14">
          <div class="avator_info">
            <Row>
              <Col>
                <b>Admin</b>
              </Col>
              <Col>super admin</Col>
            </Row>
          </div>
          </Col>
        </Row>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        avatorPath: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg"
      }
    }
  }
</script>
