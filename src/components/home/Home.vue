<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem to="/adopt">
        <Icon type="ios-home-outline"></Icon>
        首页
      </BreadcrumbItem>
    </Breadcrumb>
    <el-divider/>
    <Row style="max-height: 330px; height: 400px; overflow: hidden">
      <Col span="8" class="ivu-pr-16">
        <el-carousel>
          <div class="smallpic_item">
            <el-carousel-item v-for="(item, index) in urls" :key="index">
              <img :src="item.url" style="width: 100%; height: 100%"/>
              <h5>保护动物，你我共同的使命</h5>
            </el-carousel-item>
          </div>
        </el-carousel>
      </Col>
      <Col span="10" class="ivu-pr-16">
        <Title :level="4">热点资讯</Title>
        <Paragraph>
          <ul>
            <li
                v-for="item in hotRealTime"
                style="align-items: center; user-select: none"
                @click="push('/realtime_view?id=' + item.id)">
              <el-text tag="b" class="w-350px" truncated>
                {{ item.title }}
              </el-text>
              <el-text class="ivu-fr" size="small">3月18日21:35:06</el-text>
            </li>
          </ul>
        </Paragraph>
      </Col>
      <Col span="6">
        <Title :level="4">养宠趣闻</Title>
        <Paragraph>
          <div>
            <ul>
              <li
                  v-for="item in hotInteresting"
                  @click="push('/realtime_view?id=' + item.id)">
                <el-text tag="b" truncated>{{ item.title }}</el-text>
              </li>
            </ul>
          </div>
        </Paragraph>
      </Col>
    </Row>
    <Title :level="3" class="ivu-mt-16 ivu-mb-16">最新领养</Title>
    <div style="display: flex; flex-wrap: wrap">
      <div
          v-for="item in hotAdopts"
          style="width: 255px; user-select: none"
          @click="push('/adopt_view?id=' + item.id)">
        <div style="background: #f8f8f8; padding: 3px">
          <Card :bordered="false">
            <template #title>
              <el-text size="small" style="width: 150px" truncated>{{
                  item.title
                }}
              </el-text>
              <el-text size="small" class="ivu-fr">{{
                  item.gmtCreate
                }}
              </el-text>
            </template>
            <div style="height: 150px;width: 100%;position: relative;">
              <img :src="item.imgFiles[0].filePath"
                   style="width: 100%;height: 100%;object-fit: cover;object-position: center; position: absolute;top: 0;left: 0;">
            </div>
          </Card>
        </div>
      </div>
    </div>
    <Title :level="3" class="ivu-mt-16 ivu-mb-16">最新寻宠</Title>
    <div class="cardContainer">
      <div
          v-for="item in hotSeeks"
          style="width: 255px; background: #f8f8f8; padding: 3px"
          @click="push('/seek_view?id=' + item.id)">
        <Card :bordered="false">
          <template #title>
            <el-text size="small" style="width: 150px" truncated>{{
                item.title
              }}
            </el-text>
            <el-text size="small" class="ivu-fr">{{ item.gmtCreate }}</el-text>
          </template>
          <div style="height: 150px;width: 100%;position: relative;">
            <img :src="item.imgFiles[0].filePath"
                 style="width: 100%;height: 100%;object-fit: cover;object-position: center; position: absolute;top: 0;left: 0;">
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

import {hotAdoptList, hotNewsList, hotSeekList} from "@/http/api/commonApi";
import {ElLoading} from "element-plus";

export default {
  name: "HomeComponent",
  components: {},
  data() {
    return {
      urls: [
        {
          url: "https://img1.baidu.com/it/u=1410611840,1889651514&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=304",
        },
        {
          url: "https://img0.baidu.com/it/u=1329903597,3197318107&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667",
        },
        {
          url: "https://img0.baidu.com/it/u=1329903597,3197318107&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667",
        },
      ],
      hotRealTime: [],
      hotInteresting: [],
      hotAdopts: [],
      hotSeeks: [],
      count: 0,
      loadingInstance: null
    };
  },
  created: function () {
    //页面初始化
    this.loadingInstance = ElLoading.service();
    hotNewsList(0).then(data => {
      this.count++
      this.hotRealTime = data.content;
      if (this.count === 4) {
        this.loadingInstance.close();
      }
    });
    hotNewsList(1).then(data => {
      this.count++
      this.hotInteresting = data.content;
      if (this.count === 4) {
        this.loadingInstance.close();
      }
    });
    hotSeekList().then(data => {
      this.count++
      this.hotSeeks = data.content
      if (this.count === 4) {
        this.loadingInstance.close();
      }
    })
    hotAdoptList().then(data => {
      this.count++
      this.hotAdopts = data.content
      if (this.count === 4) {
        this.loadingInstance.close();
      }
    })
  },
  methods: {
    push(model) {
      router.push(model);
    },
  },
};
</script>

<style scoped>
.smallpic_item h5 {
  position: absolute;
  left: 3rem;
  bottom: 1.2rem;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 132%;
  display: flex;
  align-items: center;
  letter-spacing: 0.02em;
  font-feature-settings: "liga" off;
  color: #ffffff;
}

.w-350px {
  width: 350px;
}

.el-divider--vertical {
  display: inline-block;
  width: 1px;
  height: 100%;
  margin: 0 8px;
  vertical-align: middle;
  position: relative;
}

.cardContainer {
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

b:hover {
  color: #2b85e4 !important;
}
</style>
