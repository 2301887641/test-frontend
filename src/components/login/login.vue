<style lang="stylus" rel="stylesheet/stylus">
  body
    background: url("../../assets/images/login-background.jpg") no-repeat center center fixed
    background-size: cover
    .login
      width: 350px
      height: 440px
      margin-left: -(@width/ 2)
      margin-top: -(@height/ 2)
      position: absolute
      top: 35%
      left: 50%
      border: 2px solid #fff
      border-radius: 5px
      padding: 25px 15px
      .login_logo
        text-align: center
        padding: 10px
      .login_form
        .login_captcha:hover
          cursor: pointer
</style>
<template>
  <div>
    <vue-particles color="#dedede"></vue-particles>
    <div class="login">
      <div class="login_logo">
        <img src="../../assets/images/login-title.png" height="113" width="118"/>
      </div>
      <div class="login_form">
        <Form ref="loginForm" :model="formData" :rules="verifyRule">
          <FormItem prop="username">
            <Input type="text" v-model="formData.username" placeholder="请输入用户名">
            <Icon type="person" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formData.password" placeholder="请输入密码">
            <Icon type="ios-locked" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="captcha" style="margin-bottom:30px;">
            <Row>
              <Col span="12">
              <Input type="text" v-model="formData.captcha" placeholder="请输入验证码">
              <Icon type="eye" slot="prepend"></Icon>
              </Input>
              </Col>
              <Col span="12" justify="end" push="2" style="height:28px;">
              <img class="login_captcha" :src="captchaSrc" width="132" height="32" alt="验证码" @click="refreshCaptcha">
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button type="primary" long :loading="load" size="large" @click="login('loginForm')">登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        // 加载状态
        load: false,
        // 验证码地址
        captchaSrc: this.$constants.baseConfig.captchaSrc,
        // 表单
        formData: {
          username: '',
          password: '',
          captcha: '',
          client_name: this.$constants.baseConfig.restClient
        },
        //验证规则
        verifyRule: {
          username: [
            {required: true, message: "请填写名称"}
          ],
          password: [
            {required: true, message: "请填写密码"}
          ],
          captcha: [
            {required: true, message: "请填写验证码"}
          ]
        }
      }
    },
    created(){
      //获取token 去服务器验证合法性
      let token=this.$lockr.get(this.$constants.user.token);
      if(token){
        // this.$Spin.show()
      }
    },
    methods: {
      login(name) {
        this.$refs[name].validate((valid) => {
          if (!valid) {
            this.load = false
            return false
          }
          this.load = true
          this.$Http.post("login", this.formData, (status, result) => {
            if (status) {
              switch (result.retCode) {
                case this.$constants.statusCode.CAPTCHA_ERROR:
                  this.$Message.error({
                    content: result.retInfo,
                    duration: 5,
                    closable: true
                  })
                  break;
                case this.$constants.statusCode.SUCCESS:
                  this.$Spin.show()
                  this.$lockr.set(this.$constants.user.token, result.data.token)
                  this.$router.replace("index")
                  break;
              }
            }
          }, this)
        })
      },
      //刷新验证码
      refreshCaptcha() {
        this.captchaSrc = this.$constants.baseConfig.captchaSrc + '?id=' + Math.random()
      }
    }
  }
</script>
