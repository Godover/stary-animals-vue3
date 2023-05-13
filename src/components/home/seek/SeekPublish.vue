<template>
  <div class="publish-form">
    <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        style="max-width: 1000px; margin: 20px auto">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="宠物性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio :label="0">母</el-radio>
          <el-radio :label="1">公</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="酬金" prop="money">
        <el-input-number
            v-model="form.money"
            :min="0"
            :max="99999"
            :step="50"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="宠物年龄" prop="age">
        <el-input-number
            v-model="form.age"
            :min="1"
            :max="30"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="描述信息" prop="description">
        <el-input type="textarea" v-model="form.description" placeholder="请输入描述信息"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="personName">
        <el-input v-model="form.personName" placeholder="请输入联系人"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
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
      <el-form-item label="宠物分类" prop="animalCategoryDto">
        <el-select v-if="this.animalCategoryArray.length !== 0" v-model="chooseAnimals" placeholder="请选择宠物分类">
          <el-option v-for="item in animalCategoryArray" :value="item.name" @click="this.form.animalCategoryDto = item">
            {{ item.name }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="寻找类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="0">寻宠</el-radio>
          <el-radio :label="1">寻主人</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上传图片" prop="imgFiles">
        <FileUploadComponent :img-files="form.imgFiles"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import FileUploadComponent from "@/components/home/FileUploadComponent";
import {animalsCategoryList, cityList} from "@/http/api/commonApi";
import {ElLoading} from "element-plus";
import {seekById, seekModifyById} from "@/http/api/seekApi";
import CityComponent from "@/components/home/CityComponent";
import router from "@/router";

export default {
  name: "SeekPublish",
  components: {CityComponent, FileUploadComponent},
  data() {
    return {
      form: {
        "id": this.$route.params.id === undefined || Number.parseInt(this.$route.params.id.toString()) === 0 ? null : this.$route.params.id,
        title: "",
        sex: 0,
        age: 0,
        animalCategoryDto: {},
        description: "",
        personName: "",
        phone: "",
        cityDto: {},
        address: "",
        money: 0,
        status: 0,
        type: 0,
        imgFiles: [],
      },
      rules: {
        "title": [
          {
            "required": true,
            "message": "请输入标题",
            "trigger": "blur"
          }
        ],
        "sex": [
          {
            "required": true,
            "message": "请选择宠物性别",
            "trigger": "change"
          }
        ],
        "age": [
          {
            "required": true,
            "message": "请输入宠物年龄",
            "trigger": "change"
          }
        ],
        "animalCategoryId": [
          {
            "required": true,
            "message": "请选择宠物分类",
            "trigger": "change"
          }
        ],
        "description": [
          {
            "required": true,
            "message": "请输入详细信息",
            "trigger": "blur"
          }
        ],
        "personName": [
          {
            "required": true,
            "message": "请输入联系人",
            "trigger": "blur"
          }
        ],
        "phone": [
          {
            "required": true,
            "message": "请输入联系电话",
            "trigger": "blur"
          }
        ],
        "cityId": [
          {
            "required": true,
            "message": "请输入城市",
            "trigger": "blur"
          }
        ],
        "address": [
          {
            "required": true,
            "message": "请输入详细位置",
            "trigger": "blur"
          }
        ],
        "money": [
          {
            "required": true,
            "message": "请输入酬金",
            "trigger": "change"
          }
        ],
        "type": [
          {
            "required": true,
            "message": "请选择寻宠/寻主人",
            "trigger": "change"
          }
        ],
        "imgFiles": [
          {
            "required": true,
            "message": "请上传图片",
            "trigger": "change"
          }
        ]
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
      this.showLoading(3)
      seekById(this.form.id).then(data => {
        if (data !== null) {
          this.form = data
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
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          seekModifyById(this.form).then(data => {
            this.$Message.success("提交成功!")
            router.push("/seek_view/" + data)
          })
        } else {
          return false
        }
      });
    },
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
  }
};
</script>
