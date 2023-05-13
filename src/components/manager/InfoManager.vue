<template>
  <div>
    <div style="justify-content: space-between;align-items:center;display: flex">
      <Breadcrumb>
        <BreadcrumbItem to="/adopt">
          <Icon type="ios-home-outline"></Icon>
          信息管理
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <el-divider style="margin-top: 15px"/>
    <div style="display: flex">
      <Row>
        <Col span="5">
          <Menu active-name="1" width="auto" class="menu-bg">
            <MenuGroup title="内容管理">
              <MenuItem name="1" @click="this.push('/info_manager/adopt')">
                <Icon type="md-document"/>
                领养管理
              </MenuItem>
              <MenuItem name="2" @click="this.push('/info_manager/seek')">
                <Icon type="md-document"/>
                寻宠管理
              </MenuItem>
              <MenuItem name="3" @click="this.push('/info_manager/rescue')">
                <Icon type="md-document"/>
                救助管理
              </MenuItem>
              <MenuItem v-if="isAdmin" name="4" @click="this.push('/info_manager/news')">
                <Icon type="md-document"/>
                资讯管理
              </MenuItem>
              <MenuItem v-if="isAdmin" name="5" @click="this.push('/info_manager/comment')">
                <Icon type="md-chatbubbles"/>
                评论管理
              </MenuItem>
            </MenuGroup>
            <MenuGroup v-if="isAdmin" title="系统管理">
              <MenuItem name="6" @click="this.push('/info_manager/user')">
                <Icon type="md-heart"/>
                用户管理
              </MenuItem>
              <MenuItem name="7" @click="this.push('/info_manager/base')">
                <Icon type="md-heart"/>
                通用信息管理
              </MenuItem>
              <MenuItem name="8" @click="this.push('/info_manager/help')">
                <Icon type="md-leaf"/>
                帮助信息
              </MenuItem>
            </MenuGroup>
          </Menu>
        </Col>
        <Col span="19">
          <router-view/>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>

import AdoptManagerComponent from "@/components/manager/AdoptManager"
import router from "@/router";
import {mapGetters} from "vuex";

export default {
  name: 'InfoManagerComponent',
  components: {AdoptManagerComponent},
  data() {
    return {}
  },
  methods: {
    push(url) {
      router.replace(url)
    }
  },
  computed: {
    ...mapGetters(['isAdmin', 'userInfo'])
  },
}
</script>


<style scoped>
.menu-bg {
  margin-right: 0.02rem;
  border-left: #dddddd solid 1px;
  border-top: #dddddd solid 1px;
  border-bottom: #dddddd solid 1px;
  height: 100%
}
</style>
