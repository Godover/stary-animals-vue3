<template>
  <div>
    <div class="left-section" style="margin-bottom: 50px" v-if="rescueDto!==null">
      <div style="justify-content: space-between;align-items:center;display: flex">
        <Breadcrumb>
          <BreadcrumbItem to="/rescue">
            <Icon type="ios-home-outline"></Icon>
            救助信息
          </BreadcrumbItem>
          <BreadcrumbItem>
            <span>{{ this.rescueDto.title }}</span>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <el-divider style="margin-top: 15px"/>
      <!-- 标题 -->
      <div class="title">
        <span style="color: orange;font-size: 26px">[救助]</span> {{ rescueDto.title }}
        <RescueStatusComponent :status="rescueDto.status"/>
      </div>
      <!-- 发布人 -->
      <div class="info-section" style="background-color: #f5f5f5;position: relative">
        <div class="info-section">
          <div class="label">发布人：</div>
          <div class="value">{{ rescueDto.userDto.userName }}</div>
        </div>
        <span style="width: 30px"></span>
        <div class="info-section">
          <div class="label">发布时间：</div>
          <div class="value">{{ rescueDto.gmtCreate }}</div>
        </div>
        <span style="width: 70px"></span>
        <div class="info-section">
          <div class="label">信息编号：</div>
          <div class="value">{{ rescueDto.id }}</div>
        </div>
        <div class="info-section"
             style="position: absolute;right: 0;width: 200px;display: flex;align-items: center;justify-content: center;font-weight: bold;color: red">
          <div class="value">捐助二维码在此处</div>
        </div>
      </div>
      <!-- 图片和信息 -->
      <div class="info-section" style="margin-top: 10px;position: relative">
        <div style="width: 500px">
          <el-carousel :interval="4000" arrow="always">
            <el-carousel-item v-for="item in rescueDto.imgFiles" :key="item.id">
              <img :src="item.filePath" alt=""
                   style="width: 100%; height: 300px; object-fit: cover;object-position: center;">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div style="background-color: gainsboro;width: 200px;height: 200px;position: absolute;right: 0">
          <img :src="rescueDto.payImgDto.filePath" alt=""
               style="width: 100%; height: 200px; object-fit: cover;object-position: center;">
        </div>
        <div style="margin-left: 20px;display:flex;flex-wrap: wrap;width:800px;align-content: space-between;">
          <div class="info-section" style="width: 100%">
            <div class="label">救助金额：</div>
            <div class="value">{{ rescueDto.money }}元</div>
          </div>
          <div class="info-section" style="width: 100%">
            <div class="label">宠物分类：</div>
            <div class="value">{{ rescueDto.animalCategoryDto.name }}</div>
          </div>
          <div class="info-section" style="width: 100%">
            <div class="label">城市信息：</div>
            <div class="value">
              <CityComponent :city="rescueDto.cityDto"/>
            </div>
          </div>
          <div class="info-section" style="width: 100%">
            <div class="label">详细位置：</div>
            <div class="value">{{ rescueDto.address }}</div>
          </div>
          <div class="info-section" style="width: 100%">
            <div class="label">简介信息：</div>
            <div>
              <div class="value">{{ rescueDto.introduction }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 详细信息 -->
      <div style="margin-top: 20px;">
        <div>
          <el-text tag="b" style="font-size: 20px;color: orange">描述信息</el-text>
        </div>
        <el-text style="font-size: 20px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {{ rescueDto.description }}
        </el-text>
      </div>
    </div>
    <el-divider/>
    <CommentComponent v-if="rescueDto!==null" :biz-id="rescueDto.id" :biz-type="4"/>
  </div>
</template>

<script>
import CommentComponent from "@/components/home/CommentComponent";
import {rescueById} from "@/http/api/rescueApi";
import {ElLoading} from 'element-plus';
import RescueStatusComponent from "@/components/home/rescue/RescueStatusComponent";
import CityComponent from "@/components/home/CityComponent";

export default {
  name: 'RescueView',
  components: {CityComponent, RescueStatusComponent, CommentComponent},
  data() {
    return {
      loadingInstance: null,
      rescueDto: null
    }
  },
  methods: {
    InitData() {
      //页面初始化
      this.loadingInstance = ElLoading.service();
      rescueById(this.$route.params.id)
          .then(data => {
            this.rescueDto = data
            this.loadingInstance.close();
          })
    }
  },
  beforeCreate() {
    this.$nextTick(() => {
      this.InitData()
    });
  }
};
</script>

<style scoped>
.info-section {
  display: flex;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

</style>
