<template>
  <div style="justify-content: space-between;align-items:center;display: flex" v-if="adoptDto!==null">
    <Breadcrumb>
      <BreadcrumbItem to="/adopt">
        <Icon type="ios-home-outline"></Icon>
        领养信息
      </BreadcrumbItem>
      <BreadcrumbItem>
        <span>{{ this.adoptDto.title }}</span>
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
  <el-divider style="margin-top: 15px"/>
  <div class="left-section" style="margin-bottom: 50px" v-if="adoptDto!==null">
    <!-- 标题 -->
    <div class="title">
          <span :style="{'color': adoptDto.supply === 0?'#ff1818':'#19be6b','font-size':'26px'}">[{{
              adoptDto.supply === 0 ? '领养' : '送养'
            }}]</span> {{ adoptDto.title }}
      <AdoptStatusComponent :status="adoptDto.status"/>
    </div>
    <!-- 发布人 -->
    <div class="info-section" style="background-color: #f5f5f5">
      <div class="info-section">
        <div class="label">发布人：</div>
        <div class="value">{{ adoptDto.userDto.userName }}</div>
      </div>
      <span style="width: 30px"></span>
      <div class="info-section">
        <div class="label">发布时间：</div>
        <div class="value">{{ adoptDto.gmtCreate }}</div>
      </div>
      <span style="width: 70px"></span>
      <div class="info-section">
        <div class="label">信息编号：</div>
        <div class="value">{{ adoptDto.id }}</div>
      </div>
    </div>
    <!-- 图片和信息 -->
    <div class="info-section" style="margin-top: 10px;">
      <div style="width: 500px">
        <el-carousel :interval="4000" arrow="always">
          <el-carousel-item v-for="item in adoptDto.imgFiles" :key="item.id">
            <img :src="item.filePath" alt=""
                 style="width: 100%; height: 300px; object-fit: cover;object-position: center;  ">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div style="margin-left: 20px;display:flex;flex-wrap: wrap;width:700px;align-content: space-between;">
        <div class="info-section" style="width: 100%">
          <div class="label">数量：</div>
          <div class="value">{{ adoptDto.amount }}</div>
        </div>
        <div class="info-section" style="width: 100%">
          <div class="label">年龄：</div>
          <div class="value">{{ adoptDto.age }}</div>
        </div>
        <div class="info-section" style="width: 100%">
          <div class="label">宠物分类：</div>
          <div class="value">{{ adoptDto.animalCategoryDto.name }}</div>
        </div>
        <div class="info-section" style="width: 100%">
          <div class="label">宠物性别：</div>
          <div class="value">{{ adoptDto.sex === 0 ? '公' : '母' }}</div>
        </div>
        <div class="info-section" style="width: 100%">
          <div class="label">联系人：</div>
          <div class="value">{{ adoptDto.personName }}</div>
        </div>
        <div class="info-section" style="width: 100%">
          <div class="label">微信号：</div>
          <div class="value">{{ adoptDto.weChat }}</div>
        </div>
        <div class="info-section" style="width: 100%">
          <div class="label">手机号：</div>
          <div class="value">{{ adoptDto.phone }}</div>
        </div>
        <div class="info-section" style="width: 100%">
          <div class="label">城市：</div>
          <div class="value">
            {{ adoptDto.cityDto.province }}/
            {{ adoptDto.cityDto.city }}/
            {{ adoptDto.cityDto.county }}
          </div>
        </div>
        <div class="info-section" style="width: 100%">
          <div class="label">供求：</div>
          <el-text tag="b" class="value" :style="{'color':  adoptDto.supply === 0 ? 'red' :'green'}">
            {{ adoptDto.supply === 0 ? '送养' : '领养' }}
          </el-text>
        </div>
        <div class="info-section" style="width: 100%">
          <div class="label">驱虫状态：</div>
          <el-text tag="b" class="value" :style="{'color':  adoptDto.expellingParasite === 0 ? 'red' :'green'}">
            {{ adoptDto.expellingParasite === 0 ? '未驱虫' : '已驱虫' }}
          </el-text>
        </div>
      </div>
    </div>
    <!-- 详细信息 -->
    <div style="margin-top: 20px;">
      <div>
        <el-text tag="b" style="font-size: 20px;color: orange">描述信息</el-text>
      </div>
      <el-text style="font-size: 20px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{ adoptDto.description }}
      </el-text>
    </div>
  </div>
  <el-divider/>
  <CommentComponent v-if="adoptDto!==null" :biz-id="adoptDto.id" :biz-type="1"/>
</template>

<script>
import CommentComponent from "@/components/home/CommentComponent";
import AdoptStatusComponent from "@/components/home/adopt/AdoptStatusComponent";
import {adoptById} from "@/http/api/adoptApi";
import {ElLoading} from 'element-plus';

export default {
  name: 'AdoptView',
  components: {AdoptStatusComponent, CommentComponent},
  data() {
    return {
      loadingInstance: null,
      adoptDto: null,
      breadcrumb: []
    }
  },
  methods: {
    InitData() {
      //页面初始化
      this.loadingInstance = ElLoading.service();
      adoptById(this.$route.params.id)
          .then(data => {
            this.adoptDto = data
            this.loadingInstance.close();
          })
    }
  },
  beforeCreate() {
    this.$nextTick(() => {
      this.InitData()
    });
  }
}
;
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
