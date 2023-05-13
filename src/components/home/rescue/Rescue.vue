<template>
  <div style="justify-content: space-between;align-items:center;display: flex">
    <Breadcrumb>
      <BreadcrumbItem to="/realtime">
        <Icon type="ios-home-outline"></Icon>
        救助信息
      </BreadcrumbItem>
    </Breadcrumb>
    <div v-if="isLogin" class="ivu-fr" style="display: flex">
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
                <div>
                  <el-text>宠类：{{ item.animalCategoryDto.name }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    区县：
                    <CityComponent :city="item.cityDto"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </el-text>
                </div>
                <el-text>
                  发布时间：{{ item.gmtCreate }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </el-text>
                <RescueStatusComponent :status="item.status"/>
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
import {ElLoading} from "element-plus";
import RescueStatusComponent from "@/components/home/rescue/RescueStatusComponent";
import {mapGetters} from "vuex";

export default {
  name: 'RescueComponent',
  components: {RescueStatusComponent, CityComponent},
  data() {
    return {
      infoArray: [],
      loadingInstance: null
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    push(model) {
      router.push(model)
    }
  }, created() {
    this.loadingInstance = ElLoading.service();
    rescueList()
        .then(data => {
          this.infoArray = data.content
          this.loadingInstance.close()
        })
  }
}
</script>

<style scoped>
.cardContainer {
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

</style>
