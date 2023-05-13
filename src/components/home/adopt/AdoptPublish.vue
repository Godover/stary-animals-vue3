<template>
  <el-form v-if="this.animalCategoryArray.length!==0&&this.cityArray.length!==0" :model="form" ref="form" :rules="rules"
           label-width="100px" style="max-width: 1000px; margin: 20px auto;">
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title" placeholder="请输入标题"></el-input>
    </el-form-item>
    <el-form-item label="宠物性别" prop="sex">
      <el-radio-group v-model="form.sex">
        <el-radio :label="0">母</el-radio>
        <el-radio :label="1">公</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="宠物数量" prop="amount">
      <el-input-number v-model="form.amount" :min="1" :max="10" label="数量"></el-input-number>
    </el-form-item>
    <el-form-item label="宠物年龄" prop="age">
      <el-input-number v-model="form.age" :min="1" :max="30" label="年龄"></el-input-number>
    </el-form-item>
    <el-form-item label="描述信息" prop="description">
      <el-input v-model="form.description" type="textarea" placeholder="请输入描述信息"></el-input>
    </el-form-item>
    <el-form-item label="联系人" prop="personName">
      <el-input v-model="form.personName" placeholder="请输入联系人姓名"></el-input>
    </el-form-item>
    <el-form-item label="微信号" prop="weChat">
      <el-input v-model="form.weChat" placeholder="请输入微信号"></el-input>
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
    <el-form-item label="供求类型" prop="supply">
      <el-radio-group v-model="form.supply">
        <el-radio :label="0">领养</el-radio>
        <el-radio :label="1">送养</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="宠物分类" prop="animalCategoryDto">
      <el-select v-if="this.animalCategoryArray.length !== 0" v-model="chooseAnimals" placeholder="请选择宠物分类">
        <el-option v-for="item in animalCategoryArray" :value="item.name" @click="this.form.animalCategoryDto = item">
          {{ item.name }}
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="驱虫状态" prop="expellingParasite">
      <el-radio-group v-model="form.expellingParasite">
        <el-radio :label="0">否</el-radio>
        <el-radio :label="1">是</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="疫苗状态" prop="vaccine">
      <el-radio-group v-model="form.vaccine">
        <el-radio :label="0">否</el-radio>
        <el-radio :label="1">是</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="上传图片" prop="imgFiles">
      <FileUploadComponent :img-files="form.imgFiles"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import CityComponent from "@/components/home/CityComponent";
import {animalsCategoryList, cityList} from "@/http/api/commonApi";
import {adoptById, adoptModifyById} from "@/http/api/adoptApi";
import router from "@/router";
import {ElLoading} from "element-plus";
import FileUploadComponent from "@/components/home/FileUploadComponent";

export default {
  name: 'AdoptPublish',
  components: {FileUploadComponent, CityComponent},
  data() {
    return {
      form: {
        "id": this.$route.params.id === undefined || Number.parseInt(this.$route.params.id.toString()) === 0 ? null : this.$route.params.id,
        "age": 1,
        "amount": 1,
        "animalCategoryDto": {},
        "cityDto": {},
        "description": "",
        "expellingParasite": 0,
        "personName": "",
        "phone": "",
        "sex": 0,
        "supply": 0,
        "title": "",
        "vaccine": 0,
        "status": 0,
        "weChat": "",
        "imgFiles": []
      },
      rules: {
        title: [
          {required: true, message: '标题不能为空', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择宠物性别', trigger: 'change'}
        ],
        amount: [
          {required: true, message: '请填写数量', trigger: 'blur'}
        ],
        age: [
          {required: true, message: '请填写年龄', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请填写描述信息', trigger: 'blur'}
        ],
        personName: [
          {required: true, message: '请填写联系人', trigger: 'blur'}
        ],
        weChat: [
          {required: true, message: '请填写微信号', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请填写手机号', trigger: 'blur'}
        ],
        cityDto: [
          {required: true, message: '请选择城市', trigger: 'change'}
        ],
        supply: [
          {required: true, message: '请选择供求类型', trigger: 'change'}
        ],
        animalCategoryDto: [
          {required: true, message: '请选择宠物分类', trigger: 'change'}
        ],
        expellingParasite: [
          {required: true, message: '请选择驱虫状态', trigger: 'change'},
        ],
        vaccine: [
          {required: true, message: '请选择疫苗状态', trigger: 'change'}
        ],
        imgFiles: [
          {required: true, message: '请上传图片', trigger: 'change'}
        ]
      },
      chooseCity: null,
      cityArray: [],
      chooseAnimals: null,
      animalCategoryArray: [],
      loadingInstance: null,
      count: 0
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
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          adoptModifyById(this.form)
              .then(data => {
                this.$Message.success("提交成功!")
                router.push("/adopt_view/" + data)
              })
        } else {
          return false;
        }
      });
    }
  },
  created() {
    this.showLoading(2)
    if (this.form.id !== null) {
      this.showLoading(3)
      adoptById(this.form.id).then(data => {
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
  }
}
</script>
