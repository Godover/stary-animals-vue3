<template>
  <div>
    <div style="justify-content: space-between;align-items:center;display: flex">
      <Breadcrumb>
        <BreadcrumbItem to="/adopt">
          <Icon type="ios-home-outline"></Icon>
          领养信息
        </BreadcrumbItem>
      </Breadcrumb>
      <div class="ivu-fr" style="display: flex">
        <Button type="primary" @click="push('/adopt_publish')">发布领养</Button>
      </div>
    </div>
    <el-divider style="margin-top: 15px"/>
    <Row>
      <Col span="1" class="ivu-text-center" style="margin-top: 6px">区县：</Col>
      <Col span="23">
        <TagSelect v-model="chooseCity" @change="searchInfo">
          <TagSelectOption v-for="item in cityArray" :name="item.id">
            <CityComponent :city="item"/>
          </TagSelectOption>
        </TagSelect>
      </Col>
    </Row>
    <Row class-name="ivu-mt-8">
      <Col span="1" class="ivu-text-center" style="margin-top: 6px">宠类：</Col>
      <Col span="23">
        <!--        expandable-->
        <TagSelect v-model="chooseCategory" @change="searchInfo">
          <TagSelectOption v-for="item in categoryArray" :name="item.id">{{ item.name }}</TagSelectOption>
        </TagSelect>
      </Col>
    </Row>
    <Row class-name="ivu-mt-8">
      <Col span="1" class="ivu-text-center" style="margin-top: 6px">供求：</Col>
      <Col span="23">
        <!--        expandable-->
        <TagSelect v-model="chooseType" @change="searchInfo">
          <TagSelectOption v-for="item in typeArray" :name="item">{{ item === 0 ? '送养' : '领养' }}</TagSelectOption>
        </TagSelect>
      </Col>
    </Row>
    <!--    最新信息-->
    <Tabs value="name1" class="ivu-mt-16" :animated="true">
      <TabPane icon="ios-information-circle" label="最新信息" name="name1">
        <div class="cardContainer">
          <div style="background:#f8f8f8;padding: 3px;width: 650px" v-for="item in newsAdopt">
            <Card :bordered="false" @click="push('/adopt_view?id='+item.id)">
              <div style="display: flex">
                <div style="height: 100px;width: 200px;position: relative;">
                  <img :src="item.imgFiles[0].filePath"
                       style="width: 100%;height: 100%;object-fit: cover;object-position: center; position: absolute;top: 0;left: 0;">
                </div>
                <div class="ivu-ml-16" style="width: 450px">
                  <ul style="list-style: none">
                    <li class="title">
                      <b v-if="item.type===1" style="color: #19be6b">[领养]</b>
                      <b v-else style="color: #ed4014">[送养]</b>
                      <b>{{ item.title }}</b>
                    </li>
                    <li class="ivu-mb-8 ivu-mt-4 description">
                      {{ item.description }}{{ item.description }}{{ item.description }}
                    </li>
                    <li style="position: absolute;bottom: 10px;width: 420px">
                      <el-text>宠类：{{ item.category }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        区县：{{ item.city }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        时间：{{ item.time }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </el-text>
                      <AdoptStatusComponent :status="item.status"/>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </TabPane>
      <!--      已搞定-->
      <TabPane icon="ios-checkmark-circle" label="已搞定" name="name2">
        <div class="cardContainer">
          <div style="background:#f8f8f8;padding: 3px;width: 650px" v-for="item in overAdopt">
            <Card :bordered="false">
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
                      {{ item.description }}{{ item.description }}{{ item.description }}
                    </li>
                    <li style="position: absolute;bottom: 10px;width: 420px">
                      <el-text>宠类：{{ item.category }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        区县：{{ item.city }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        时间：{{ item.time }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </el-text>
                      <el-text class="ivu-fr"
                               :style="{'background-color': item.status === 3||item.status === 4 ?'#19be6b':'#c5c8ce','border-radius': '2px',color: 'white',}">
                        {{ item.status === 3 ? '已领养' : item.status === 4 ? '已送养' : '放弃了' }}
                      </el-text>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>


import router from "@/router";
import AdoptStatusComponent from "@/components/home/adopt/AdoptStatusComponent";
import {animalsCategoryList, cityList} from "@/http/api/commonApi";
import {adoptSearch} from "@/http/api/adoptApi";
import {ElLoading} from "element-plus";
import CityComponent from "@/components/home/CityComponent";

export default {
  name: 'AdoptComponent',
  components: {CityComponent, AdoptStatusComponent},
  data() {
    // "綦江区", "大足区", "渝北区", "巴南区", "黔江区", "长寿区", "江津区"
    return {
      chooseCity: [],
      chooseCategory: [],
      chooseType: [0, 1],
      cityArray: [],
      categoryArray: [],
      typeArray: [0, 1],
      newsAdopt: [],
      overAdopt: [],
      count: 0,
      loadingInstance: null
    }
  },
  methods: {
    push(model) {
      router.push(model)
    },
    searchInfo(tags = null) {
      adoptSearch({
        "page": 1,
        "size": 999,
        "city": this.chooseCity,
        "types": this.chooseCategory,
        "supply": this.typeArray,
        "status": [0, 1, 2, 3, 4]
      }).then(data => {
        this.newsAdopt = data.content
        this.loadingInstance.close();
      })
      adoptSearch({
        "page": 1,
        "size": 999,
        "city": this.chooseCity,
        "types": this.chooseCategory,
        "supply": this.typeArray,
        "status": [3, 4]
      }).then(data => {
        this.overAdopt = data.content
        this.loadingInstance.close();
      })
    }
  }, created() {
    //页面初始化
    this.loadingInstance = ElLoading.service();
    cityList().then(data => {
      this.count++
      this.cityArray = data
      if (this.count === 2) {
        this.searchInfo()
      }
    })
    animalsCategoryList().then(data => {
      this.count++
      this.categoryArray = data
      if (this.count === 2) {
        this.searchInfo()
      }
    })
  }
}
</script>

<style>
.cardContainer {
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-size: 16px;
}

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
