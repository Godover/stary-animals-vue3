<template>
  <div style="width: 1050px;height: 650px;border: #dddddd solid 1px;">
    <Tabs value="name1">
      <TabPane label="宠类列表" name="name1" class="tab">
        <Table :loading="loading" max-height="550" size="small" :columns="animalCategoryColumns" :data="data"
               width="1050">
          <!-- 序号-->
          <template #index="{ index,row }">
            {{ row.id }}
          </template>
          <template #name="{ index,row }">
            {{ row.name }}
          </template>
          <!-- 操作 -->
          <template #action="{ index,row }">
            <Button type="primary" size="small" @click="remove(index)">删除</Button>
          </template>
        </Table>
        <el-button type="primary" class="mt-4" style="width: 100%;margin-top: 3px" @click="onAddItem">
          新增
        </el-button>
      </TabPane>
      <TabPane label="城市列表" name="name2" class="tab">
        <Table :loading="loading" max-height="550" size="small" :columns="animalCategoryColumns" :data="data"
               width="1050">
          <!-- 序号-->
          <template #index="{ index,row }">
            {{ index + 1 }}
          </template>
          <template #name="{ index,row }">
            {{ row.name }}
          </template>
          <!-- 操作 -->
          <template #action="{ index,row }">
            <Button type="primary" size="small" @click="remove(index)">删除</Button>
          </template>
        </Table>
        <el-button type="primary" class="mt-4" style="width: 100%;margin-top: 3px" @click="onAddItem">
          新增
        </el-button>
      </TabPane>
      <TabPane label="资讯分类" name="name3" class="tab">
        <Table :loading="loading" max-height="550" size="small" :columns="animalCategoryColumns" :data="data"
               width="1050">
          <!-- 序号-->
          <template #index="{ index,row }">
            {{ index + 1 }}
          </template>
          <template #name="{ index,row }">
            {{ row.name }}
          </template>
          <!-- 操作 -->
          <template #action="{ index,row }">
            <Button type="primary" size="small" @click="remove(index)">删除</Button>
          </template>
        </Table>
        <el-button type="primary" class="mt-4" style="width: 100%;margin-top: 3px" @click="onAddItem">
          新增
        </el-button>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import {animalsCategoryList} from "@/http/api/commonApi";

export default {
  name: 'AdoptManagerComponent',
  components: {},
  data() {
    return {
      loading: false,
      animalCategoryColumns: [
        {
          "title": "序号",
          align: "center",
          "slot": "index"
        }, {
          "title": "类型名称",
          align: "center",
          "slot": "name"
        }, {
          "title": "绑定信息数量",
          align: "center",
          "key": "bindCount"
        }, {
          "title": "创建时间",
          align: "center",
          "key": "gmtCreate"
        },
        {
          "title": "操作",
          "slot": "action",
          "width": 150,
          "align": "center"
        }
      ],
      data: []
    }
  },
  methods: {
    InitData() {
      console.log(123123)
      animalsCategoryList()
          .then(data => {
            this.data = data.content
            this.loading = false
          })
    },
    push(model) {
      window.open(model)
    },
    onAddItem() {

    },
    remove(index) {
      this.data.splice(index, 1);
    }
  },
  beforeCreate() {
    //页面初始化
    this.$nextTick(() => {
      this.InitData();
    });
  }
}
</script>


<style scoped>
.tab {

}
</style>
