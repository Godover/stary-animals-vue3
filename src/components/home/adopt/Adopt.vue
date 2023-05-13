<template>
  <div>
    <div style="justify-content: space-between;align-items:center;display: flex">
      <Breadcrumb>
        <BreadcrumbItem to="/adopt">
          <Icon type="ios-home-outline"></Icon>
          领养信息
        </BreadcrumbItem>
      </Breadcrumb>
      <div v-if="isLogin" class="ivu-fr" style="display: flex">
        <Button type="primary" @click="push('/adopt_publish/0')">发布领养</Button>
      </div>
    </div>
    <el-divider style="margin-top: 15px"/>
    <Row>
      <Col span="1" class="ivu-text-center" style="margin-top: 6px">区县：</Col>
      <Col span="23">
        <TagSelect v-if="cityArray.length!==0" v-model="chooseCity" @on-change="searchInfo">
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
        <TagSelect v-if="categoryArray.length!==0" v-model="chooseCategory" @on-change="searchInfo">
          <TagSelectOption v-for="item in categoryArray" :name="item.id">{{ item.name }}</TagSelectOption>
        </TagSelect>
      </Col>
    </Row>
    <Row class-name="ivu-mt-8">
      <Col span="1" class="ivu-text-center" style="margin-top: 6px">供求：</Col>
      <Col span="23">
        <TagSelect v-if="typeArray.length!==0" v-model="chooseType" @on-change="searchInfo">
          <TagSelectOption v-for="item in typeArray" :name="item">{{ item === 0 ? '送养' : '领养' }}</TagSelectOption>
        </TagSelect>
      </Col>
    </Row>
    <!--    最新信息-->
    <Tabs value="name1" class="ivu-mt-16" :animated="true">
      <TabPane icon="ios-information-circle" label="最新信息" name="name1">
        <div v-if="newsAdopt !==null && newsAdopt.length !== 0" class="cardContainer">
          <div style="background:#f8f8f8;margin:1px;padding: 3px;width: 640px" v-for="(item,key) in newsAdopt"
               :key="key">
            <Card :bordered="false" @click="push('/adopt_view/'+item.id)">
              <div style="display: flex">
                <div style="height: 100px;width: 200px;position: relative;">
                  <el-image :src="item.imgFiles[0].filePath"
                            style="width: 100%;height: 100%;object-fit: cover;object-position: center; position: absolute;top: 0;left: 0;"
                            loading="lazy"/>
                </div>
                <div class="ivu-ml-16" style="width: 450px">
                  <ul style="list-style: none">
                    <li class="title">
                      <b v-if="item.supply===0" style="color: #19be6b">[领养]</b>
                      <b v-else style="color: #ed4014">[送养]</b>
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
                      <AdoptStatusComponent :supply="item.supply" :status="item.status"/>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <el-empty v-else description="暂无数据"/>
      </TabPane>
      <!--      已搞定-->
      <TabPane icon="ios-checkmark-circle" label="已搞定" name="name2">
        <div v-if="overAdopt !==null && overAdopt.length !== 0" class="cardContainer">
          <div style="background:#f8f8f8;padding: 3px;width: 640px" v-for="(item,key) in overAdopt" :key="key">
            <Card :bordered="false" @click="push('/adopt_view/'+item.id)">
              <div style="display: flex">
                <div style="height: 100px;width: 200px;position: relative;">
                  <el-image :src="item.imgFiles[0].filePath"
                            style="width: 100%;height: 100%;object-fit: cover;object-position: center; position: absolute;top: 0;left: 0;"
                            loading="lazy"/>
                </div>
                <div class="ivu-ml-16" style="width: 450px">
                  <ul style="list-style: none">
                    <li class="title">
                      <b v-if="item.supply===0" style="color: #19be6b">[领养]</b>
                      <b v-else style="color: #ed4014">[送养]</b>
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
                      <AdoptStatusComponent :supply="item.supply" :status="item.status"/>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <el-empty v-else description="暂无数据"/>
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
import {mapGetters} from "vuex";

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
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    push(model) {
      router.push(model)
    }
    ,
    showLoading() {
      this.count = 0
      this.loadingInstance = ElLoading.service();
    }
    ,
    hideLoading() {
      this.count++
      if (this.count === 2) {
        setTimeout(() => {
          this.loadingInstance.close();
        }, 1000)
      }
    }
    ,
    searchInfo() {
      this.showLoading()
      adoptSearch({
        "page": 1,
        "size": 999,
        "city": this.chooseCity,
        "types": this.chooseCategory,
        "supply": this.chooseType,
        "status": [0, 1, 2]
      }).then(data => {
        this.count++
        this.newsAdopt = data.content
        this.hideLoading()
      })
      adoptSearch({
        "page": 1,
        "size": 999,
        "city": this.chooseCity,
        "types": this.chooseCategory,
        "supply": this.chooseType,
        "status": [1, 2]
      }).then(data => {
        this.count++
        this.overAdopt = data.content
        this.hideLoading()
      })
    }
  }
  ,
  created() {
    //页面初始化
    this.showLoading()
    cityList().then(data => {
      this.count++
      this.chooseCity = data.map(record => record.id)
      this.cityArray = data
      if (this.count === 2) {
        this.searchInfo()
      }
    })
    animalsCategoryList().then(data => {
      this.count++
      this.chooseCategory = data.map(record => record.id)
      this.categoryArray = data
      if (this.count === 2) {
        this.searchInfo()
      }
    })
  }
}
</script>

<style scoped>
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
