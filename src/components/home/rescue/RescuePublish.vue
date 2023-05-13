<template>
  <div class="help-form">
    <el-form
        :model="form" ref="form" :rules="rules" label-width="100px" style="max-width: 1000px; margin: 20px auto">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="求助金额" prop="money">
        <el-input-number v-model="form.money" :min="0" :max="3000" :step="50"></el-input-number>
        元
      </el-form-item>
      <el-form-item label="宠物分类" prop="animalCategoryDto">
        <el-select v-if="this.animalCategoryArray.length !== 0" v-model="chooseAnimals" placeholder="请选择宠物分类">
          <el-option v-for="item in animalCategoryArray" :value="item.name" @click="this.form.animalCategoryDto = item">
            {{ item.name }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="简介信息" prop="introduction">
        <el-input v-model="form.introduction" placeholder="请输入简介信息"></el-input>
      </el-form-item>
      <el-form-item label="描述信息" prop="description">
        <el-input v-model="form.description" type="textarea" placeholder="请输入描述信息"></el-input>
      </el-form-item>
      <el-form-item label="城市" prop="cityDto">
        <el-select v-if="this.cityArray.length !== 0" v-model="chooseCity" placeholder="请选择城市" style="width: 300px">
          <el-option v-for="item in cityArray"
                     :value="(item.province!==null?item.province:'') + (item.province !== null ? '/' : '') +
                   (item.city!==null?item.city:'') + (item.city !== null ? '/' : '') +
                    (item.county!==null?item.county:'')"
                     @click="this.form.cityDto = item">
            <CityComponent :city="item"/>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细位置" prop="address">
        <el-input v-model="form.address" placeholder="请输入详细位置"></el-input>
      </el-form-item>
      <el-form-item label="图片列表" prop="imgFiles">
        <FileUploadComponent :img-files="form.imgFiles"/>
      </el-form-item>
      <el-form-item label="收款图片" prop="payImgDto">
        <FileUploadComponent :img-files="uploadReceipt" :limit="1"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import CityComponent from "@/components/home/CityComponent";
import FileUploadComponent from "@/components/home/FileUploadComponent";
import {animalsCategoryList, cityList} from "@/http/api/commonApi";
import {rescueById, rescueModifyById} from "@/http/api/rescueApi";
import {ElLoading} from "element-plus";
import router from "@/router";

export default {
  name: "RescuePublish",
  components: {FileUploadComponent, CityComponent},
  data() {
    return {
      form: {
        id: this.$route.params.id === undefined || Number.parseInt(this.$route.params.id.toString()) === 0 ? null : this.$route.params.id,
        title: "",
        animalCategoryDto: {},
        introduction: "",
        description: "",
        cityDto: {},
        address: "",
        imgFiles: [],
        payImgDto: {},
        money: 0,
        status: 0
      },
      uploadReceipt: [],
      rules: {
        title: [{required: true, message: "请输入标题", trigger: "blur"}],
        animalCategoryDto: [{required: true, message: "请选择宠物分类", trigger: "change"},],
        introduction: [{required: true, message: "请输入简介信息", trigger: "blur"},],
        description: [{required: true, message: "请输入描述信息", trigger: "blur"},],
        cityDto: [{required: true, message: "请选择城市", trigger: "change"}],
        address: [{required: true, message: "请输入详细地址", trigger: "blur"},],
        imgFiles: [{required: true, message: "请上传图片", trigger: "blur"}],
        payImgDto: [{required: true, message: "请上传收款图片", trigger: "blur"},],
        money: [{required: true, message: "请输入求助金额", trigger: "blur"}],
      },
      chooseCity: null,
      cityArray: [],
      chooseAnimals: null,
      animalCategoryArray: [],
      loadingInstance: null,
      count: 0
    };
  },
  created() {
    this.showLoading(2)
    if (this.form.id !== null) {
      console.log(123)
      this.showLoading(3)
      rescueById(this.form.id)
          .then(data => {
            console.log(456)
            if (data !== null) {
              this.form = data
              this.uploadReceipt.push(data.payImgDto)
            }
            this.hideLoading()
          })
    }
    cityList().then(data => {
      this.form.cityDto = data[0]
      let item = data[0]
      this.chooseCity = (item.province !== null ? item.province : '') + (item.province !== null ? '/' : '') +
          (item.city !== null ? item.city : '') + (item.city !== null ? '/' : '') +
          (item.county !== null ? item.county : '')
      this.cityArray = data
      this.hideLoading()
    })
    animalsCategoryList().then(data => {
      this.form.animalCategoryDto = data[0]
      this.chooseAnimals = data[0].name
      this.animalCategoryArray = data
      this.hideLoading()
    })
  },
  watch: {
    uploadReceipt: {
      handler(val, oldval) {
        if (val.length !== 0) {
          this.form.payImgDto = val[0]
        } else {
          this.form.payImgDto = null
        }
      }
    }
  },
  methods: {
    showLoading(v) {
      this.count = v
      this.loadingInstance = ElLoading.service();
    },
    hideLoading() {
      this.count--
      if (this.count === 0) {
        this.loadingInstance.close();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          rescueModifyById(this.form).then(data => {
            this.$Message.success("提交成功!")
            router.push("/rescue_view/" + data)
          })
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style>
/*.help-form {*/
/*  margin: 0 auto;*/
/*}*/
</style>
