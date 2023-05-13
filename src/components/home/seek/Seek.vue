<template>
  <div>
    <div style="justify-content: space-between;align-items:center;display: flex">
      <Breadcrumb>
        <BreadcrumbItem to="/seek">
          <Icon type="ios-home-outline"></Icon>
          寻宠信息
        </BreadcrumbItem>
      </Breadcrumb>
      <div v-if="isLogin" class="ivu-fr" style="display: flex">
        <Button type="primary" @click="push('/seek_publish/0')">发布寻宠</Button>
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
        <TagSelect v-if="categoryArray.length!==0" v-model="chooseCategory" @on-change="searchInfo">
          <TagSelectOption v-for="item in categoryArray" :name="item.id">{{ item.name }}</TagSelectOption>
        </TagSelect>
      </Col>
    </Row>
    <Row class-name="ivu-mt-8">
      <Col span="1" class="ivu-text-center" style="margin-top: 6px">类型：</Col>
      <Col span="23">
        <!--        expandable-->
        <TagSelect v-if="typeArray.length!==0" v-model="chooseType" @on-change="searchInfo">
          <TagSelectOption v-for="item in typeArray" :name="item">{{ item === 0 ? '寻宠' : '寻主人' }}</TagSelectOption>
        </TagSelect>
      </Col>
    </Row>
    <Row class-name="ivu-mt-8">
      <Col span="1" class="ivu-text-center" style="margin-top: 6px">酬金：</Col>
      <Col span="23">
        <TagSelect v-model="chooseMoney" @on-change="searchInfo">
          <TagSelectOption v-for="item in moneyArray" :name="item">{{ item }}</TagSelectOption>
        </TagSelect>
      </Col>
    </Row>
    <Tabs v-model="seekStatus" :animated="false"
          @on-click="searchInfo">
      <TabPane icon="ios-information-circle" label="全部" name="全部"></TabPane>
      <TabPane icon="ios-sad" label="寻找中" name="寻找中"></TabPane>
      <TabPane icon="ios-checkmark-circle" label="已找到" name="已找到"></TabPane>
    </Tabs>
    <div style="display: flex">
      <div class="cardContainer">
        <div v-if="infoArray !==null && infoArray.length === 0" style="width: 900px;">
          <el-empty description="暂无数据"/>
        </div>
        <div style="background:#f8f8f8;margin:1px;padding: 4px;width: 900px" v-for="item in infoArray">
          <Card :bordered="false" @click="push('/seek_view/'+item.id)">
            <div style="display: flex">
              <div style="height: 100px;width: 200px;position: relative;">
                <img :src="item.imgFiles[0].filePath"
                     style="width: 100%;height: 100%;object-fit: cover;object-position: center; position: absolute;top: 0;left: 0;">
              </div>
              <div class="ivu-ml-16" style="width: 700px">
                <ul style="list-style: none">
                  <li class="title">
                    <b v-if="item.type" style="color: #ed4014">[寻主人]</b>
                    <b v-else style="color: #19be6b">[寻宠]</b>
                    <b>{{ item.title }}</b>
                  </li>
                  <li class="ivu-mb-8 ivu-mt-4 description">
                    {{ item.description }}
                  </li>
                  <li style="position: absolute;bottom: 10px;width: 660px">
                    <el-text>宠类：{{ item.animalCategoryDto.name }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      区县：
                      <CityComponent :city="item.cityDto"/>
                      &nbsp;&nbsp;
                      时间：{{ item.gmtCreate }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </el-text>
                    <SeekStatusComponent :status="item.status"/>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div style="width: 500px;height:470px;background: #fafafa;border-radius: 5px;">
        <Title :level="4" style="color: #ed4014;margin-top: 10px;margin-left: 20px">热门信息</Title>
        <div v-for="(item, index) in hotList" :key="index" style="width: 200px;margin: 15px 20px;user-select: none"
             @click="push('/seek_view/'+item.id)">
          <el-text class="hotSeek" truncated>{{ item.title }}</el-text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import router from "@/router";
import SeekStatusComponent from "@/components/home/seek/SeekStatusComponent";
import {ElLoading} from "element-plus";
import {seekSearch} from "@/http/api/seekApi";
import {animalsCategoryList, cityList, hotSeekList} from "@/http/api/commonApi";
import CityComponent from "@/components/home/CityComponent";
import {mapGetters} from "vuex";

export default {
  name: 'SeekComponent',
  components: {CityComponent, SeekStatusComponent},
  data() {
    // "綦江区", "大足区", "渝北区", "巴南区", "黔江区", "长寿区", "江津区"
    return {
      hotList: [],
      chooseCity: [],
      chooseCategory: [],
      chooseType: [0, 1],
      chooseMoney: ["0-500元", "500-1000元", "1000元-1500元", "1500-2000元", "2000-3000元"],
      seekStatus: "全部",
      cityArray: [],
      categoryArray: [],
      typeArray: [0, 1],
      moneyArray: ["0-500元", "500-1000元", "1000元-1500元", "1500-2000元", "2000-3000元"],
      infoArray: [],
      count: 0,
      loadingInstance: null
    }
  },
  methods: {
    searchInfo() {
      //页面初始化
      this.loadingInstance = ElLoading.service();
      seekSearch({
        "page": 1,
        "size": 999,
        "city": this.chooseCity,
        "types": this.chooseCategory,
        "supply": this.chooseType,
        "money": this.chooseMoney,
        "status": this.seekStatus === '全部' ? [0, 1, 2] : this.seekStatus === '已找到' ? [1] : [0]
      }).then(data => {
        this.infoArray = data.content
        this.loadingInstance.close();
      })
    },
    push(model) {
      router.push(model)
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  created() {
    this.loadingInstance = ElLoading.service();
    hotSeekList().then(data => {
      this.hotList = data.content
    })
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

.hotSeek:hover {
  color: #2b85e4 !important;
}

</style>
