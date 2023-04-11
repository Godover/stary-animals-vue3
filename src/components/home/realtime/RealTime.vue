<template>
  <div style="justify-content: space-between;align-items:center;display: flex">
    <Breadcrumb>
      <BreadcrumbItem to="/realTimeInfo">
        <Icon type="ios-home-outline"></Icon>
        资讯信息
      </BreadcrumbItem>
    </Breadcrumb>
    <div class="ivu-fr" style="display: flex">
      <!--      <Button type="primary">发布帖子</Button>-->
    </div>
  </div>
  <el-divider style="margin-top: 15px"/>
  <el-tabs v-model="chooseType" type="card" class="demo-tabs" @click="handleClick">
    <el-tab-pane v-for="item in newsCategoryList" :label="item.name" :name="item.id"/>
  </el-tabs>
  <div v-for="item in newInfos">
    <div style="background:#f8f8f8;padding: 4px" @click="push('/realtime_view?id='+item.id)">
      <Card>
        <div style="display: flex">
          <div style="height: 100px;width: 200px;position: relative;">
            <img :src="item.fileDto.filePath"
                 style="width: 100%;height: 100%;object-fit: cover;object-position: center; position: absolute;top: 0;left: 0;">
          </div>
          <div class="ivu-ml-16" style="width: 1000px">
            <ul style="list-style: none">
              <li style="font-size: 20px"><b>{{ item.title }}</b></li>
              <li class="ivu-mb-8 ivu-mt-4 description">
                {{ item.description }}
              </li>
              <li style="position: absolute;bottom: 10px">
                作者：{{ item.userDto.userName }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                分类：{{ item.newsCategoryDto.name }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                发布时间：{{ item.gmtCreate }}
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
import {newsCategoryList} from "@/http/api/commonApi";
import {newsList} from "@/http/api/newsApi";
import {ElLoading} from "element-plus";

export default {
  name: 'RealTime',
  components: {},
  data() {
    return {
      chooseType: null,
      newInfos: [],
      newsCategoryList: [],
      loadingInstance: null
    }
  },
  methods: {
    handleClick() {
      this.getNewsList()
    },
    push(model) {
      router.push(model)
    },
    getNewsList() {
      //页面初始化
      this.loadingInstance = ElLoading.service();
      newsList(1, 999, this.chooseType)
          .then(data => {
            this.newInfos = data.content
            this.loadingInstance.close();
          })
    }
  }, created() {
    //页面初始化
    this.loadingInstance = ElLoading.service();
    newsCategoryList().then(data => {
      this.chooseType = data[0].id
      this.newsCategoryList = data
      this.getNewsList()
    })

  }
}
</script>

<style>
.description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  padding-right: 30px;
  color: #888;
}
</style>
