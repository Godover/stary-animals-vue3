<template>
  <el-form v-if="this.animalCategoryArray.length!==0&&this.cityArray.length!==0" :model="form" ref="form" :rules="rules"
           label-width="100px" style="max-width: 1000px; margin: 20px auto;">
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title" placeholder="请输入标题"></el-input>
    </el-form-item>
    <el-form-item label="宠物性别" prop="gender">
      <el-radio-group v-model="form.gender">
        <el-radio label="male">公</el-radio>
        <el-radio label="female">母</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="数量" prop="quantity">
      <el-input-number v-model="form.amount" :min="1" :max="10" label="数量"></el-input-number>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input-number v-model="form.age" :min="0" :max="30" label="年龄"></el-input-number>
    </el-form-item>
    <el-form-item label="描述信息" prop="description">
      <el-input v-model="form.description" type="textarea" placeholder="请输入描述信息"></el-input>
    </el-form-item>
    <el-form-item label="联系人" prop="contactPerson">
      <el-input v-model="form.contactPerson" placeholder="请输入联系人姓名"></el-input>
    </el-form-item>
    <el-form-item label="微信号" prop="weChat">
      <el-input v-model="form.weChat" placeholder="请输入微信号"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="phoneNumber">
      <el-input v-model="form.phoneNumber" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item label="城市" prop="city">
      <el-select v-if="this.cityArray.length !== 0" v-model="form.city" placeholder="请选择城市">
        <el-option v-for="item in cityArray" :value="item.id">
          <CityComponent :city="item"/>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="供求类型" prop="supplyDemand">
      <el-radio-group v-model="form.supplyDemand">
        <el-radio label="supply">供应</el-radio>
        <el-radio label="demand">需求</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="宠物分类" prop="category">
      <el-select v-if="this.animalCategoryArray.length !== 0" v-model="form.category" placeholder="请选择宠物分类">
        <el-option v-for="item in animalCategoryArray" :value="item.id">
          {{ item.name }}
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="驱虫状态" prop="isDewormed">
      <el-radio-group v-model="form.isDewormed">
        <el-radio label="true">是</el-radio>
        <el-radio label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="疫苗状态" prop="isVaccinated">
      <el-radio-group v-model="form.isVaccinated">
        <el-radio label="true">是</el-radio>
        <el-radio label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="上传图片">
      <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :file-list="form.images">
        <el-button slot="upload" size="small" type="success">上传文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import CityComponent from "@/components/home/CityComponent";
import {animalsCategoryList, cityList} from "@/http/api/commonApi";

export default {
  name: 'AdoptPublish',
  components: {CityComponent},
  data() {
    return {
      form: {
        "id": this.$route.params.id === undefined ? null : this.$route.params.id,
        "age": 1,
        "amount": 1,
        "animalCategoryId": 0,
        "cityId": 0,
        "description": "string",
        "expellingParasite": 0,
        "personName": "string",
        "phone": "string",
        "sex": 0,
        "supply": 0,
        "title": "string",
        "vaccine": 0,
        "weChat": "string",
        "imgFileIds": []
      },
      rules: {
        title: [
          {required: true, message: '标题不能为空', trigger: 'blur'}
        ],
        gender: [
          {required: true, message: '请选择宠物性别', trigger: 'change'}
        ],
        quantity: [
          {required: true, message: '请填写数量', trigger: 'blur'}
        ],
        age: [
          {required: true, message: '请填写年龄', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请填写描述信息', trigger: 'blur'}
        ],
        contactPerson: [
          {required: true, message: '请填写联系人', trigger: 'blur'}
        ],
        weChat: [
          {required: true, message: '请填写微信号', trigger: 'blur'}
        ],
        phoneNumber: [
          {required: true, message: '请填写手机号', trigger: 'blur'}
        ],
        city: [
          {required: true, message: '请选择城市', trigger: 'change'}
        ],
        supplyDemand: [
          {required: true, message: '请选择供求类型', trigger: 'change'}
        ],
        category: [
          {required: true, message: '请选择宠物分类', trigger: 'change'}
        ],
        isDewormed: [
          {required: true, message: '请选择驱虫状态', trigger: 'change'},
        ],
        isVaccinated: [
          {required: true, message: '请选择疫苗状态', trigger: 'change'}
        ],
        images: [
          {required: true, message: '请上传图片', trigger: 'change'}
        ]
      },
      cityArray: [],
      animalCategoryArray: [],
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('提交成功')
        } else {

          return false;
        }
      });
    },
    handlePreview(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  },
  created() {
    cityList().then(data => {
      this.form.cityId = data[0].id
      this.cityArray = data
    })
    animalsCategoryList().then(data => {
      this.form.animalCategoryId = data[0].id
      this.animalCategoryArray = data
    })
  }
}
</script>
