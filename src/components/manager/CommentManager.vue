<template>
  <div>
    <Table :loading="loading" border height="650" size="small" :columns="columns" :data="data" width="1050">
      <!-- 标题-->
      <template #sort="{ row }">
        <strong style="user-select: none;color: #2b85e4" @click="this.push(row.category,row.reportId)">
          {{ row.id }}
        </strong>
      </template>
      <!-- 描述-->
      <template #content="{ row }">
        <Ellipsis :text="row.content" :lines="1" tooltip/>
      </template>
      <!-- 分类-->
      <template #category="{ row }">
        <Ellipsis :text="row.category === 1 ? '领养' : row.category === 2 ? '寻宠 ' : row.category === 4 ? '救助' : '资讯'"
                  :lines="1" tooltip/>
      </template>
      <!-- 用户信息 -->
      <template #userInfo="{ row }">
        <Ellipsis :text="row.userDto.userName" :lines="1" tooltip/>
      </template>
      <!-- 发布时间 -->
      <template #gmtCreate="{ row }">
        <Ellipsis :text="row.gmtCreate" :lines="1" tooltip/>
      </template>
      <!-- 审核状态 -->
      <template #verifyInfo="{ row }">
        {{ row.verifyDto.statusDesc }}
      </template>
      <!-- 操作 -->
      <template v-if="isAdmin" #action="{ row, index }">
        <Dropdown>
          <Button v-if="row.verifyDto.status===0||row.verifyDto.status===1" type="primary">
            审核
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <Button v-else type="primary" disabled>
            审核
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <template v-if="row.verifyDto.status===0||row.verifyDto.status===1" #list>
            <DropdownMenu>
              <DropdownItem v-if="row.verifyDto.status===0" @click="verify(1,row.id)">审核通过</DropdownItem>
              <DropdownItem v-if="row.verifyDto.status===0" @click="verify(2,row.id)">审核拒绝</DropdownItem>
              <DropdownItem v-if="row.verifyDto.status===1" @click="verify(3,row.id)">下架</DropdownItem>
            </DropdownMenu>
          </template>
        </Dropdown>
      </template>
    </Table>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import router from "@/router";
import {commentListNotVerify, verifyModify} from "@/http/api/verifyApi";

export default {
  name: 'CommnentManagerComponent',
  components: {},
  data() {
    return {
      loading: true,
      columns: [
        {"title": "序号", "width": 70, "slot": "sort"},
        {"title": "描述", "slot": "content"},
        {"title": "业务分类", "width": 140, "slot": "category"},
        {"title": "发布人", "width": 130, "slot": "userInfo"},
        {"title": "发布时间", "width": 160, "slot": "gmtCreate"},
        {"title": "审核状态", "width": 90, "align": "center", "slot": "verifyInfo"},
        {"title": "操作", "slot": "action", "width": 130, "align": "center"}
      ],
      data: []
    }
  },
  methods: {
    verify(status, bizId) {
      let loadingVerify = this.$Message.loading({
        content: '正在处理!',
        duration: 0
      });
      verifyModify(bizId, 16, status, '')
          .then(() => {
            setTimeout(loadingVerify, 0);
            this.$Message.success((status === 4 ? '取消发布' : '审核') + "成功!")
            this.InitData()
          })
          .catch(e => {
            setTimeout(loadingVerify, 0);
          })
    },
    InitData() {
      this.data = []
      this.loading = true
      commentListNotVerify(1, 999)
          .then(data => {
            this.data = data.content
            this.loading = false
          })
    },
    push(category, id) {
      if (category === 1) {
        window.open("/adopt_view/" + id)
      }
      if (category === 2) {
        window.open("/seek_view/" + id)
      }
      if (category === 4) {
        window.open("/rescue_view/" + id)
      }
      if (category === 8) {
        window.open("/realtime_view/" + id)
      }

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
