<template>
  <div style="justify-content: space-between;align-items:center;display: flex">
    <Breadcrumb>
      <BreadcrumbItem to="/realTimeInfo">
        <Icon type="ios-home-outline"></Icon>
        救助信息
      </BreadcrumbItem>
    </Breadcrumb>
    <div class="ivu-fr" style="display: flex">
      <Button type="primary" @click="push('/rescue_publish/0')">发布救助</Button>
    </div>
  </div>
  <el-divider style="margin-top: 15px"/>
  <div class="cardContainer">
    <div style="background:#f8f8f8;padding: 3px;width: 650px" v-for="item in infoArray">
      <Card :bordered="false" @click="push('/rescue_view/'+item.id)">
        <div style="display: flex">
          <div style="height: 100px;width: 200px;position: relative;">
            <img :src="item.imgFiles[0].filePath"
                 style="width: 100%;height: 100%;object-fit: cover;object-position: center; position: absolute;top: 0;left: 0;">
          </div>
          <div class="ivu-ml-16" style="width: 450px">
            <ul style="list-style: none">
              <li class="title">
                <b>{{ item.title }}</b>
              </li>
              <li class="ivu-mb-8 ivu-mt-4 description">
                {{ item.description }}
              </li>
              <li style="position: absolute;bottom: 10px;width: 420px">
                <el-text>
                  宠类：{{ item.animalCategoryDto.name }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  时间：{{ item.gmtCreate }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </el-text>
                <el-text class="ivu-fr"
                         :style="{'background-color': item.status === 1 ?'#19be6b':'red','border-radius': '2px',color: 'white'}">
                  {{ item.status === 0 ? '未完成' : item.status === 1 ? '已完成' : '已放弃' }}
                </el-text>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>


import router from "@/router";
import {rescueList} from "@/http/api/rescueApi";
import CityComponent from "@/components/home/CityComponent";

export default {
  name: 'RescueComponent',
  components: {CityComponent},
  data() {
    return {
      infoArray: []
    }
  },
  methods: {
    push(model) {
      router.push(model)
    }
  }, created() {
    rescueList().then(data => {
      this.infoArray = data.content
    })
  }
}
</script>

<style>
.cardContainer {
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

</style>
