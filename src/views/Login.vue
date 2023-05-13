<template>
  <div class="demo-login">
    <Title :level="2" style="position: absolute;top:50px;left: 100px">流浪动物救助及领养平台</Title>
    <Title>登录</Title>
    <Login @on-submit="handleSubmit">
      <UserName name="username"/>
      <Password name="password"/>
      <Submit/>
      <div class="ivu-mt-8">
        <Row :gutter="16">
          <Col span="9">
            <Link to="/">暂不登录,游客访问</Link>
          </Col>
          <Col span="9"/>
          <Col span="6">
            <Link to="/register">立即注册</Link>
          </Col>
        </Row>
      </div>
    </Login>
  </div>
</template>
<script>
import router from "@/router";
import {mapMutations} from "vuex";
import {currentUserInfo, login} from "@/http/api/userApi";

export default {
  data() {
    return {}
  },
  methods: {
    handleSubmit(valid, {username, password}) {
      login(username, password)
          .then(data => {
            this.setToken(data)
            currentUserInfo().then(d1 => {
              this.setUserInfo(d1)
              router.push('/')
            })
          })
    },
    ...mapMutations(['setUserInfo', 'setToken'])
  }
}
</script>
<style>
.demo-login {
  text-align: center;
  width: 400px !important;
  margin: 300px auto !important;
}
</style>
