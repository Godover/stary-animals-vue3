<template>
  <div>
    <div style="justify-content: space-between;align-items:center;display: flex">
      <Breadcrumb>
        <BreadcrumbItem to="/seek">
          <Icon type="ios-home-outline"></Icon>
          寻宠信息
        </BreadcrumbItem>
      </Breadcrumb>
      <div class="ivu-fr" style="display: flex">
        <Button type="primary" @click="push('/seek_publish')">发布寻宠</Button>
      </div>
    </div>
    <el-divider style="margin-top: 15px"/>
    <Row>
      <Col span="1" class="ivu-text-center" style="margin-top: 6px">区县：</Col>
      <Col span="23">
        <TagSelect v-model="chooseCity">
          <TagSelectOption v-for="item in cityArray" :name="item">{{ item }}</TagSelectOption>
        </TagSelect>
      </Col>
    </Row>
    <Row class-name="ivu-mt-8">
      <Col span="1" class="ivu-text-center" style="margin-top: 6px">宠类：</Col>
      <Col span="23">
        <!--        expandable-->
        <TagSelect v-model="chooseCategory">
          <TagSelectOption v-for="item in categoryArray" :name="item">{{ item }}</TagSelectOption>
        </TagSelect>
      </Col>
    </Row>
    <Row class-name="ivu-mt-8">
      <Col span="1" class="ivu-text-center" style="margin-top: 6px">类型：</Col>
      <Col span="23">
        <!--        expandable-->
        <TagSelect v-model="chooseType">
          <TagSelectOption v-for="item in typeArray" :name="item">{{ item }}</TagSelectOption>
        </TagSelect>
      </Col>
    </Row>
    <Row class-name="ivu-mt-8">
      <Col span="1" class="ivu-text-center" style="margin-top: 6px">酬金：</Col>
      <Col span="23">
        <!--        expandable-->
        <TagSelect v-model="chooseMoney">
          <TagSelectOption v-for="item in moneyArray" :name="item">{{ item }}</TagSelectOption>
        </TagSelect>
      </Col>
    </Row>
    <Tabs value="name1" class="ivu-mt-16" :animated="false">
      <TabPane icon="ios-information-circle" label="全部" name="name1"></TabPane>
      <TabPane icon="ios-sad" label="寻找中" name="name2"></TabPane>
      <TabPane icon="ios-checkmark-circle" label="已找到" name="name3"></TabPane>
    </Tabs>
    <div style="display: flex">
      <div class="cardContainer">
        <div style="background:#f8f8f8;padding: 4px;width: 900px" v-for="item in infoArray">
          <Card :bordered="false" @click="push('seek_view?id='+item.id)">
            <div style="display: flex">
              <div style="height: 100px;width: 200px;position: relative;">
                <img :src="item.imgFiles[0].filePath"
                     style="width: 100%;height: 100%;object-fit: cover;object-position: center; position: absolute;top: 0;left: 0;">
              </div>
              <div class="ivu-ml-16" style="width: 700px">
                <ul style="list-style: none">
                  <li class="title">
                    <b v-if="item.type" style="color: #ed4014">[寻宠]</b>
                    <b v-else style="color: #19be6b">[寻主人]</b>
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
                    <SeekStatusComponent style="position: absolute;right: 0" :status="item.status"/>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div style="width: 500px;background: #fafafa;border-radius: 5px;">
        <Title :level="4" style="color: #ed4014;margin-top: 10px;margin-left: 20px">热门信息</Title>
        <div v-for="(item, index) in hotList" :key="index" style="width: 200px;margin: 15px 20px">
          <el-text class="item" truncated>{{ item.title }}</el-text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import router from "@/router";
import SeekStatusComponent from "@/components/home/seek/SeekStatusComponent";
import {ElLoading} from "element-plus";
import {seekList} from "@/http/api/seekApi";
import {hotSeekList} from "@/http/api/commonApi";
import CityComponent from "@/components/home/CityComponent";

export default {
  name: 'SeekComponent',
  components: {CityComponent, SeekStatusComponent},
  data() {
    // "綦江区", "大足区", "渝北区", "巴南区", "黔江区", "长寿区", "江津区"
    return {
      hotList: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'],
      chooseCity: ["万州区", "涪陵区", "渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区"],
      chooseCategory: ["狗狗", "猫咪", "鸟", "鱼", "小宠", "其他"],
      chooseType: ["找宠物", "找主人"],
      chooseMoney: ["免酬金", "500元以下", "500-1000元", "1000元-1500元", "1500-2000元", "2000元以上", "面议"],
      cityArray: ["万州区", "涪陵区", "渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区"],
      categoryArray: ["狗狗", "猫咪", "鸟", "鱼", "小宠", "其他"],
      typeArray: ["找宠物", "找主人"],
      moneyArray: ["500元以下", "500-1000元", "1000元-1500元", "1500-2000元", "2000元以上"],
      infoArray: [],
      loadingInstance: null
    }
  },
  methods: {
    InitData() {
      //页面初始化
      this.loadingInstance = ElLoading.service();
      seekList(1, 999)
          .then(data => {
            this.infoArray = data.content
            this.loadingInstance.close();
          })
      hotSeekList().then(data => {
        this.hotList = data.content
      })
    },
    push(model) {
      router.push(model)
    }
  },
  beforeCreate() {
    this.$nextTick(() => {
      this.InitData()
    });
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
