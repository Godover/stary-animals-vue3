<template>
  <div class="help-form">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="100px"
      style="max-width: 1000px; margin: 20px auto"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="宠物分类" prop="animalCategoryId">
        <el-select v-model="form.animalCategoryId" placeholder="请选择">
          <el-option label="🐶 狗" value="dog"></el-option>
          <el-option label="🐱 猫" value="cat"></el-option>
          <el-option label="🐰 兔子" value="rabbit"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="简介信息" prop="introduction">
        <el-input type="textarea" v-model="form.introduction"></el-input>
      </el-form-item>
      <el-form-item label="描述信息" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="城市" prop="cityId">
        <el-select v-model="form.cityId" placeholder="请选择">
          <el-option label="北京" value="Beijing"></el-option>
          <el-option label="上海" value="Shanghai"></el-option>
          <el-option label="广州" value="Guangzhou"></el-option>
          <el-option label="深圳" value="Shenzhen"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="图片列表" prop="images">
        <el-upload
          class="upload-demo"
          action="/upload"
          :on-success="handleUploadSuccess"
          :before-upload="beforeUpload"
          :file-list="uploadImages"
          list-type="picture"
        >
          <el-button slot="upload" size="small" type="success"
            >上传文件</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过5MB
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="收款图片" prop="receipt">
        <el-upload
          class="upload-demo"
          action="/upload"
          :on-success="handleUploadSuccess"
          :before-upload="beforeUpload"
          :file-list="uploadReceipt"
          list-type="picture"
        >
          <el-button slot="upload" size="small" type="success"
            >上传文件</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过5MB
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="求助金额" prop="money">
        <el-input-number
          v-model="form.money"
          :min="0"
          :max="3000"
          step="10"
        ></el-input-number>
        元
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "RescuePublish",
  data() {
    return {
      form: {
        id: null,
        userId: null,
        title: "",
        animalCategoryId: "",
        introduction: "",
        description: "",
        cityId: "",
        address: "",
        imgFileIds: "a.png,https://i.loli.net/2017/08/21/599a521472424.jpg",
        payImgId: null,
        money: 0,
      },
      uploadReceipt: [
        { name: "A", url: "https://i.loli.net/2017/08/21/599a521472424.jpg" },
      ],
      uploadImages: [],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        animalCategoryId: [
          { required: true, message: "请选择宠物分类", trigger: "change" },
        ],
        introduction: [
          { required: true, message: "请输入简介信息", trigger: "blur" },
        ],
        description: [
          { required: true, message: "请输入描述信息", trigger: "blur" },
        ],
        cityId: [{ required: true, message: "请选择城市", trigger: "change" }],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        images: [{ required: true, message: "请上传图片", trigger: "blur" }],
        receipt: [
          { required: true, message: "请上传收款图片", trigger: "blur" },
        ],
        money: [{ required: true, message: "请输入求助金额", trigger: "blur" }],
      },
    };
  },
  created() {
    //编辑的时候图片列表赋值
    console.log(this.$route);
    // if (this.$route.params.id == 0) 这一句判断是编辑还是新增
    //图片列表
    this.uploadImages = [];
    let imgs = this.form.imgFileIds.split(",");
    imgs.map((item) => {
      this.uploadImages.push({ name: item.split(".")[0], url: item });
    });
    //收款图片
    this.getPayImgById();
  },
  methods: {
    getPayImgById() {
      this.uploadReceipt = [];
      // 获取收款码
      // 收款码接口({ id: this.form.payImgId }).then((res) => {
      //   this.uploadReceipt.push({ name: res.fileName, url: res.filePath });
      // });
    },
    handleUploadSuccess(response, file, fileList) {
      console.log(response, file, fileList);
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJpgOrPng) {
        this.$message.error("上传图片只能是 JPG/PNG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }
      return isJpgOrPng && isLt5M;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.success("提交成功!");
        } else {
          this.$message.error("请填写完整信息!");
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
