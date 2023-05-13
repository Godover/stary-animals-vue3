<template>
  <div>
    <Table :loading="loading" border height="650" size="small" :columns="columns" :data="data" width="1050">
      <!-- 标题-->
      <template #title="{ row }">
        <Ellipsis :text="row.title" :lines="1" tooltip @click="this.push('/adopt_view/'+row.id)"
                  style="color: #2b85e4;user-select: none"/>
      </template>
      <!-- 描述-->
      <template #introduction="{ row }">
        <Ellipsis :text="row.description" :lines="1" tooltip/>
      </template>
      <!-- 新闻分类-->
      <template #newsCategory="{ row }">
        <Ellipsis :text="row.newsCategoryDto.name" :lines="1" tooltip/>
      </template>
      <!-- 用户信息 -->
      <template #userInfo="{ row }">
        <Ellipsis :text="row.userDto.userName" :lines="1" tooltip/>
      </template>
      <!-- 发布时间 -->
      <template #gmtCreate="{ row }">
        <Ellipsis :text="row.gmtCreate" :lines="1" tooltip/>
      </template>
      <!-- 操作 -->
      <template #action="{ row, index }">
        <Button type="error" size="small" @click="remove(row.id)">删除</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import router from "@/router";
import {newsDeleteById, newsList} from "@/http/api/newsApi";

export default {
  name: 'AdoptManagerComponent',
  components: {},
  data() {
    return {
      loading: true,
      columns: [
        {"title": "标题", "width": 270, "slot": "title"},
        {"title": "描述", "width": 340, "slot": "introduction"},
        {"title": "分类", "width": 100, "slot": "newsCategory"},
        {"title": "发布人", "width": 110, "slot": "userInfo"},
        {"title": "发布时间", "width": 150, "slot": "gmtCreate"},
        {"title": "操作", "slot": "action", "width": 80, "align": "center"}
      ],
      data: []
    }
  },
  methods: {
    InitData() {
      this.loading = true
      newsList(1, 999, null)
          .then(data => {
            this.data = data.content
            this.loading = false
          })
    },
    push(model) {
      window.open(model)
    },
    remove(id) {
      this.loading = true;
      newsDeleteById(id)
          .then(data => {
            this.InitData();
          }).catch(e => this.loading = false)
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
