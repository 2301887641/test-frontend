<style lang="stylus" rel="stylesheet/stylus">
  body
    background: url("../../assets/images/login-background.jpg") no-repeat center center fixed
    background-size: cover
    .login
      width: 350px
      height: 450px
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
          <Form-item prop="username">
            <Input type="text" v-model="formData.username" placeholder="请输入用户名">
            <Icon type="person" slot="prepend"></Icon>
            </Input>
          </Form-item>
          <Form-item prop="password">
            <Input type="password" v-model="formData.password" placeholder="请输入密码">
            <Icon type="ios-locked" slot="prepend"></Icon>
            </Input>
          </Form-item>
          <Form-item prop="captcha">
            <Row>
              <Col span="12">
              <Input type="text" v-model="formData.captcha" placeholder="请输入验证码">
              <Icon type="eye" slot="prepend"></Icon>
              </Input>
              </Col>
              <Col span="10" justify="end" push="2">
              <img class="login_captcha" :src="captchaSrc" width="132" height="32" alt="验证码" @click="refreshCaptcha">
              </Col>
            </Row>
          </Form-item>
          <Form-item>
            <Button type="primary" long :loading="load" @click="login('loginForm')">登录</Button>
          </Form-item>
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
        captchaSrc: this.$canstansts.captchaSrc,
        // 表单
        formData: {
          username: '',
          password: '',
          captcha: ''
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
    methods: {
      login(name) {
        this.$refs[name].validate((valid) => {
          if (!valid) {
            this.load = false
            return false
          }
          this.load = true
          this.$Http.post("login/user", this.formData, (result) => {
            this.load = false
            if(result.token){
              this.$lockr.set("user_token",result.token)
              this.$router.replace("index")
            }
          })
        })
      },
      refreshCaptcha() {
        this.captchaSrc = this.$canstansts.captchaSrc + '?id=' + Math.random()
      }
    }
  }
</script>
