<template>
  <div>
    <Table :loading="loading" border height="650" size="small" :columns="columns" :data="data" width="1050">
      <!-- 标题-->
      <template #title="{ row }">
        <strong style="user-select: none;color: #2b85e4" @click="this.push('/adopt/view?id='+row.id)">
          {{ row.title }}
        </strong>
      </template>
      <!-- 描述-->
      <template #introduction="{ row }">
        <Ellipsis :text="row.introduction" :lines="1" tooltip/>
      </template>
      <!-- 新闻分类-->
      <template #animalCategory="{ row }">
        <Ellipsis :text="row.animalCategoryDto.name" :lines="1" tooltip/>
      </template>
      <!-- 用户信息 -->
      <template #userInfo="{ row }">
        <Ellipsis :text="row.userInfoDto.userName" :lines="1" tooltip/>
      </template>
      <!-- 用户信息 -->
      <template #gmtCreate="{ row }">
        <Ellipsis :text="row.userInfoDto.gmtCreate" :lines="1" tooltip/>
      </template>
      <!-- 供求 -->
      <template #supply="{ row }">
        <span :style="row.supply===0?'color:green':'color:red'">
        {{ row.supply === 0 ? '领养' : '送养' }}
        </span>
      </template>
      <!-- 审核状态 -->
      <template #verifyInfo="{ row }">
        {{ row.verifyInfo.statusDesc }}
      </template>
      <!-- 操作 -->
      <template #action="{ row, index }">
        <Button v-if="Math.random() > 0.5" type="primary" size="small" @click="remove(index)">通过</Button>
        <Button v-else type="error" size="small" @click="remove(index)">下架</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import {adoptListByUserId} from "@/http/api/adoptApi";
import {mapGetters} from "vuex";
import router from "@/router";

export default {
  name: 'HelpManagerComponent',
  components: {},
  data() {
    return {
      loading: true,
      columns: [
        {"title": "标题", "width": 200, "slot": "title"},
        {"title": "描述", "width": 240, "slot": "introduction"},
        {"title": "宠类", "width": 80, "slot": "animalCategory"},
        {"title": "供求", "width": 70, "align": "center", "slot": "supply"},
        {"title": "发布人", "width": 130, "slot": "userInfo"},
        {"title": "发布时间", "slot": "gmtCreate"},
        {"title": "审核状态1", "width": 90, "align": "center", "slot": "verifyInfo"},
        {"title": "操作", "slot": "action", "width": 80, "align": "center"}
      ],
      data: []
    }
  },
  methods: {
    InitData() {
      console.log(123123)
      adoptListByUserId(1, 20)
          .then(data => {
            this.data = data.content
            this.loading = false
          })
    },
    push(model) {
      window.open(model)
    },
    remove(index) {
      this.data.splice(index, 1);
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
