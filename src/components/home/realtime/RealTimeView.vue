<template>
  <div v-if="newsDto!==null">
    <div style="justify-content: space-between;align-items:center;display: flex">
      <Breadcrumb>
        <BreadcrumbItem to="/realtime">
          <Icon type="ios-home-outline"></Icon>
          资讯信息
        </BreadcrumbItem>
        <BreadcrumbItem>
          <span>{{ this.newsDto.title }}</span>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <el-divider style="margin-top: 15px"/>

    <div class="title">{{ this.newsDto.title }}</div>
    <!-- 发布人 -->
    <div class="info-section" style="justify-content: center">
      <div class="info-section">
        <div class="label">发布人：</div>
        <div class="value">{{ newsDto.userDto.userName }}</div>
      </div>
      <span style="width: 15px"></span>
      <div class="info-section">
        <div class="label">发布时间：</div>
        <div class="value">{{ newsDto.gmtCreate }}</div>
      </div>
      <span style="width: 15px"></span>
      <div class="info-section">
        <div class="label">新闻分类：</div>
        <div class="value">{{ newsDto.newsCategoryDto.name }}</div>

        <div class="label">信息编号：</div>
        <div class="value">{{ newsDto.id }}</div>
      </div>
    </div>
    <div style="margin: 20px 30px;font-size: 20px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {{ newsDto.content }}
    </div>
    <el-divider/>
    <CommentComponent :biz-id="newsDto.id" :biz-type="8"/>
  </div>
</template>

<script>
import CommentComponent from "@/components/home/CommentComponent";
import {ElLoading} from "element-plus";
import {newsById} from "@/http/api/newsApi";

export default {
  name: 'RealTimeView',
  // import引入的组件需要注入到对象中才能使用
  components: {CommentComponent},
  // 这里存放数据
  data() {
    return {
      newsDto: null,
      loadingInstance: null
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //页面初始化
    this.loadingInstance = ElLoading.service();
    newsById(this.$route.params.id)
        .then(data => {
          this.newsDto = data
          this.loadingInstance.close();
        })
  }
}
</script>

<style scoped>
.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  justify-content: center;
  align-content: center;
  display: flex;
  color: #444444;
  align-items: center;
}

.info-section {
  display: flex;
}
</style>
