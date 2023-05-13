<template>
  <div style="width: 1050px;height: 650px;border: #dddddd solid 1px;">
    <Tabs v-model="type" @on-click="InitData">
      <TabPane label="宠类列表" name="0" class="tab">
        <Table :loading="loading" max-height="550" size="small" :columns="categoryColumns" :data="data"
               width="1050">
          <!-- 序号-->
          <template #index="{ index,row }">
            {{ row.id }}
          </template>
          <template #name="{ index,row }">
            {{ row.name }}
          </template>
          <template #bindCount="{ index,row }">
            {{ row.bindCount }}
          </template>
          <!-- 操作 -->
          <template #action="{ index,row }">
            <Button type="primary" size="small" @click="add(row.id,false)">删除</Button>
          </template>
        </Table>
        <el-button type="primary" class="mt-4" style="width: 100%;margin-top: 3px" @click="onAddItem">
          新增
        </el-button>
      </TabPane>
      <TabPane label="城市列表" name="1" class="tab">
        <Table :loading="loading" max-height="550" size="small" :columns="categoryColumns1" :data="data"
               width="1050">
          <!-- 序号-->
          <template #index="{ index,row }">
            {{ index + 1 }}
          </template>
          <template #name="{ index,row }">
            <CityComponent :city="row"/>
          </template>
          <!-- 操作 -->
          <template #action="{ index,row }">
            <Button type="primary" size="small" @click="add(row.id,false)">删除</Button>
          </template>
        </Table>
        <el-button type="primary" class="mt-4" style="width: 100%;margin-top: 3px" @click="onAddItem">
          新增
        </el-button>
      </TabPane>
      <TabPane label="资讯分类" name="2" class="tab">
        <Table :loading="loading" max-height="550" size="small" :columns="categoryColumns1" :data="data"
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
            <Button type="primary" size="small" @click="add(row.id,false)">删除</Button>
          </template>
        </Table>
        <el-button type="primary" class="mt-4" style="width: 100%;margin-top: 3px" @click="onAddItem">
          新增
        </el-button>
      </TabPane>
    </Tabs>
    <Modal v-model="addItem" width="360">
      <template #header>
        <p style="color:#2b85e4;text-align:center">
          <span>添加{{ type === '0' ? '宠物分类' : type === '1' ? '资讯分类' : '城市' }}</span>
        </p>
      </template>
      <div style="text-align:center">
        <el-input v-if="type!=='1'" v-model="name" placeholder="分类名称"/>
        <div v-else>
          <el-input style="margin-bottom: 5px" v-if="type!=='2'" v-model="province" placeholder="省份"/>
          <el-input style="margin-bottom: 5px" v-if="type!=='2'" v-model="city" placeholder="城市"/>
          <el-input style="margin-bottom: 5px" v-if="type!=='2'" v-model="country" placeholder="县区"/>
        </div>
      </div>
      <template #footer>
        <Button type="primary" size="large" long :loading="modal_loading" @click="add(null,true)">添加</Button>
      </template>
    </Modal>
  </div>
</template>

<script>
import {animalsCategoryList, cityList, newsCategoryList} from "@/http/api/commonApi";
import router from "@/router";
import {mapGetters} from "vuex";
import CityComponent from "@/components/home/CityComponent";
import {editAnimalCategory, editCity, editNewsCategory} from "@/http/api/managerApi";

export default {
  name: 'AdoptManagerComponent',
  components: {CityComponent},
  data() {
    return {
      loading: false,
      type: '0',
      addItem: false,
      modal_loading: false,
      name: '',
      province: '',
      city: '',
      country: '',
      categoryColumns: [
        {"title": "序号", align: "center", "slot": "index"},
        {"title": "类型名称", align: "center", "slot": "name"},
        {"title": "绑定信息数量", align: "center", "key": "bindCount"},
        {"title": "创建时间", align: "center", "key": "gmtCreate"},
        {"title": "操作", "slot": "action", "width": 150, "align": "center"}
      ],
      categoryColumns1: [
        {"title": "序号", align: "center", "slot": "index"},
        {"title": "类型名称", align: "center", "slot": "name"},
        {"title": "创建时间", align: "center", "key": "gmtCreate"},
        {"title": "操作", "slot": "action", "width": 150, "align": "center"}
      ],
      data: []
    }
  },
  methods: {
    InitData() {
      this.loading = true
      this.data = []
      if (this.type === '0') {
        animalsCategoryList()
            .then(data => {
              this.data = data
              this.loading = false
            })
      }
      if (this.type === '1') {
        cityList()
            .then(data => {
              this.data = data
              this.loading = false
            })
      }
      if (this.type === '2') {
        newsCategoryList()
            .then(data => {
              this.data = data
              this.loading = false
            })
      }
    },
    push(model) {
      window.open(model)
    },
    add(id = null, isActive = true) {
      this.modal_loading = true;
      if (this.type === '0') {
        editAnimalCategory(id, this.name, null, isActive)
            .then(data => {
              this.modal_loading = false
              this.addItem = false
              this.name = null
              this.$Message.success((isActive ? '添加' : '删除') + '成功')
              this.InitData();
            })
      }
      if (this.type === '1') {
        editCity(id, this.province, this.city, this.country, isActive)
            .then(data => {
              this.modal_loading = false
              this.addItem = false
              this.province = null
              this.city = null
              this.country = null
              this.$Message.success((isActive ? '添加' : '删除') + '成功')
              this.InitData();
            })
      }
      if (this.type === '2') {
        editNewsCategory(id, this.name, null, isActive)
            .then(data => {
              this.modal_loading = false
              this.addItem = false
              this.name = null
              this.$Message.success((isActive ? '添加' : '删除') + '成功')
              this.InitData();
            })
      }
    },
    onAddItem() {
      this.addItem = true;
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


<style scoped>
.tab {

}
</style>
