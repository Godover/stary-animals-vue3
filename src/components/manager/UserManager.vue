<template>
  <div>
    <Table :loading="loading" border height="650" size="small" :columns="columns" :data="data" width="1050">
      <!--
               {"title": "序号", "width": 200, "slot": "sort"},
        {"title": "用户名", "width": 240, "slot": "userName"},
        {"title": "邮箱", "width": 80, "slot": "email"},
        {"title": "城市", "width": 70, "align": "center", "slot": "city"},
        {"title": "角色", "width": 130, "slot": "role"},
        {"title": "注册时间", "width": 130, "slot": "gmtCreate"},
        {"title": "最后登录时间", "width": 130, "slot": "lastActiveTime"},
        {"title": "操作", "slot": "action", "width": 80, "align": "center"}
       -->
      <!-- 标题-->
      <template #sort="{ row }">
        <strong style="user-select: none;color: #2b85e4" @click="this.push('/adopt/view?id='+row.id)">
          {{ row.id }}
        </strong>
      </template>
      <!-- 描述-->
      <template #userName="{ row }">
        <Ellipsis :text="row.userName" :lines="1" tooltip/>
      </template>
      <!-- 新闻分类-->
      <template #role="{ row }">
        <Ellipsis :text="row.userCategoryDto.name" :lines="1" tooltip/>
      </template>
      <!-- 邮箱 -->
      <template #email="{ row }">
        <Ellipsis v-if="row.email!==null" :text="row.email" :lines="1" tooltip/>
        <span v-else>暂未设置</span>
      </template>
      <!-- 注册时间 -->
      <template #gmtCreate="{ row }">
        <Ellipsis :text="row.gmtCreate" :lines="1" tooltip/>
      </template>
      <!-- 最近活跃时间 -->
      <template #lastActiveTime="{ row }">
        <Ellipsis :text="row.lastActiveTime" :lines="1" tooltip/>
      </template>
      <!-- 城市 -->
      <template #city="{ row }">
        <CityComponent :city="row.cityDto"/>
      </template>
      <!-- 操作 -->
      <template #action="{ row, index }">
        <Button v-if="row.userCategoryDto.code !== 999" type="primary" size="small" @click="blank(row.id)">拉黑</Button>
        <Button v-else type="error" size="small" @click="blank(row.id)">恢复</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import router from "@/router";
import {userList} from "@/http/api/userApi";
import CityComponent from "@/components/home/CityComponent";

export default {
  name: 'UserManagerComponent',
  components: {CityComponent},
  data() {
    return {
      loading: true,
      columns: [
        {"title": "序号", "width": 80, "slot": "sort"},
        {"title": "用户名", "width": 100, "slot": "userName"},
        {"title": "邮箱", "slot": "email"},
        {"title": "城市", "align": "center", "slot": "city"},
        {"title": "角色", "width": 130, "slot": "role"},
        {"title": "注册时间", "width": 160, "slot": "gmtCreate"},
        {"title": "最后登录时间", "width": 160, "slot": "lastActiveTime"},
        {"title": "操作", "slot": "action", "width": 80, "align": "center"}
      ],
      data: []
    }
  },
  methods: {
    InitData() {
      this.loading = true
      this.data = []
      userList(1, 999)
          .then(data => {
            this.data = data.content
            this.loading = false
          })
    },
    push(model) {
      window.open(model)
    },
    blank(index) {

    }
  },
  created() {
    //页面初始化
    if (!this.isAdmin) {
      router.push('/home')
    }
    this.InitData();
  },
  computed: {
    ...mapGetters(['isAdmin', 'userInfo'])
  }
}
</script>
