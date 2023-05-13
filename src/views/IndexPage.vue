<template>
  <div class="layout">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%','z-index':999,margin: '-1px 0'}">
        <Menu mode="horizontal" :active-name="activeMenu" class="menu-bg">
          <div class="layout-logo">
            流浪动物救助及领养平台
          </div>
          <Row>
            <Col span="9"/>
            <Col span="2">
              <MenuItem name="首页" @click="push('/home')">
                <b>首页</b>
                <!--                <b>A</b>-->
              </MenuItem>
            </Col>
            <Col span="2">
              <MenuItem name="资讯" @click="push('/realtime')">
                <b>资讯</b>
                <!--                <b>B</b>-->
              </MenuItem>
            </Col>
            <Col span="2">
              <MenuItem name="领养" @click="push('/adopt')">
                <b>领养</b>
                <!--                <b>C</b>-->
              </MenuItem>
            </Col>
            <Col span="2">
              <MenuItem name="寻宠" @click="push('/seek')">
                <b>寻宠</b>
                <!--                <b>D</b>-->
              </MenuItem>
            </Col>
            <Col span="2">
              <MenuItem name="救助" @click="push('/rescue')">
                <b>救助</b>
                <!--                <b>E</b>-->
              </MenuItem>
            </Col>
            <Col span="2">
              <MenuItem name="帮助" @click="push('/help')">
                <b>帮助</b>
                <!--                <b>F</b>-->
              </MenuItem>
            </Col>
            <Col span="1"/>
            <Col span="1">
              <Dropdown style="margin-left: 20px;">
                <div style="display: flex">
                  <Space size="large">
                    <Avatar
                        v-if="userInfo!==null && userInfo.photoFileDto !== undefined && userInfo.photoFileDto !== null"
                        icon="ios-person" size="large"
                        :src="userInfo.photoFileDto.filePath"/>
                    <Avatar v-else icon="ios-person" size="large"/>
                  </Space>
                </div>
                <template #list>
                  <DropdownMenu on-cli>
                    <Auth authority="true" :access="isLogin">
                      <DropdownItem @click="push('/edit_user_info/'+userInfo.id)">我的信息</DropdownItem>
                      <DropdownItem @click="push('/info_manager')">信息管理</DropdownItem>
                      <DropdownItem @click="logOut">退出登录</DropdownItem>
                      <template #noMatch>
                        <DropdownItem @click="push('/login')">去登录</DropdownItem>
                      </template>
                    </Auth>
                  </DropdownMenu>
                </template>
              </Dropdown>
            </Col>
          </Row>

        </Menu>
      </Header>
      <Content :style="{margin: '88px 220px 0',padding:'20px 90px', background: '#fff', minHeight: '700px'}">
        <router-view/>
      </Content>
      <Footer class="layout-footer-center">2022-2023 &copy; 袁圣志&郭超</Footer>
    </Layout>
  </div>
</template>
<script>


import {mapGetters, mapMutations} from "vuex";
import router from "@/router";

export default {
  // 使用对象展开运算符将 getter 混入 computed 对象中
  data() {
    return {
      // circleUrl: '',
      circleUrl: 'http://www.zhenpet.com/uc_server/data/avatar/000/51/82/86_avatar_middle.jpg',
      activeMenu: "首页"
    }
  },
  methods: {
    logOut() {
      this.$Modal.confirm({
        title: '提示',
        content: "退出登录",
        onOk: () => {
          router.push("/")
          this.setUserInfo(null)
          this.setToken(null)
        }
      });
    },
    push(model) {
      router.push(model)
    },
    refreshRoute(path) {
      if (path.toString().startsWith("/home")) {
        this.activeMenu = "首页";
      } else if (path.toString().startsWith("/realtime")) {
        this.activeMenu = "资讯";
      } else if (path.toString().startsWith("/adopt")) {
        this.activeMenu = "领养";
      } else if (path.toString().startsWith("/seek")) {
        this.activeMenu = "寻宠";
      } else if (path.toString().startsWith("/rescue")) {
        this.activeMenu = "救助";
      } else if (path.toString().startsWith("/help")) {
        this.activeMenu = "帮助";
      } else {
        this.activeMenu = "";
      }
    },
    ...mapMutations(['setUserInfo', 'setToken'])
  },
  watch: {
    $route: {
      handler(val, oldval) {
        this.refreshRoute(val.path)
      },
      // 深度观察监听
      deep: true
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.refreshRoute(to.path)
    });
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'userInfo'
    ]),
  }
}
</script>

<style scoped>
.layout {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.menu-bg {
  background-color: #2b85e4 !important;
  user-select: none;
}

.layout-logo {
  width: auto;
  padding: 0 30px;
  text-align: center;
  font-size: 22px;
  align-content: center;
  color: white;
  height: 40px;
  background: #5cadff;
  border-radius: 3px;
  line-height: 40px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}

.layout-footer-center {
  text-align: center;
}

.dev-run-preview .dev-run-preview-edit {
  display: none
}

.ivu-layout-header {
  background: #2b85e4 !important;
  padding: 0 50px;
  height: 64px;
  line-height: 64px;
}


.ivu-menu-horizontal.ivu-menu-light:after {
  height: 0 !important;
}

.ivu-menu-item {
  color: white !important;
  font-size: 17px !important;
}

.ivu-menu-item-selected {
  color: #ff9900 !important;
  font-size: 21px !important;
}
</style>
