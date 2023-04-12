<template>
  <div class="publish-form">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
      style="max-width: 1000px; margin: 20px auto"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="宠物性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio label="公"></el-radio>
          <el-radio label="母"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="宠物年龄" prop="age">
        <el-input-number
          v-model="form.age"
          :min="1"
          :max="30"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="宠物分类" prop="animalCategoryId">
        <el-select v-model="form.animalCategoryId" placeholder="请选择">
          <el-option label="猫咪" value="cat"></el-option>
          <el-option label="狗狗" value="dog"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细信息" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="personName">
        <el-input v-model="form.personName"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="城市" prop="cityId">
        <el-input v-model="form.cityId"></el-input>
      </el-form-item>
      <el-form-item label="详细位置" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="酬金" prop="money">
        <el-input-number
          v-model="form.money"
          :min="0"
          :max="99999"
          :step="50"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="寻宠/寻主人" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="0">寻宠</el-radio>
          <el-radio :label="1">寻主人</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图片列表" prop="uploadImages">
        <el-upload
          class="upload-demo"
          :action="uploadAction"
          :headers="{ Authorization: getToken() }"
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="uploadImages"
          :show-file-list="true"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        >
          <el-button slot="upload" size="small" type="success"
            >上传文件</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SeekPublish",
  data() {
    return {
      form: {
        userId: "",
        title: "",
        sex: "公",
        age: "",
        animalCategoryId: "",
        description: "",
        personName: "",
        phone: "",
        cityId: "",
        address: "",
        money: 0,
        type: 1,
        imgFileIds: "a.png,b.png,c.png",
      },
      uploadImages: [],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        sex: [{ required: true, message: "请选择宠物性别", trigger: "change" }],
        age: [{ required: true, message: "请输入宠物年龄", trigger: "change" }],
        animalCategoryId: [
          { required: true, message: "请选择宠物分类", trigger: "change" },
        ],
        description: [
          { required: true, message: "请输入详细信息", trigger: "blur" },
        ],
        personName: [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        cityId: [{ required: true, message: "请输入城市", trigger: "blur" }],
        address: [
          { required: true, message: "请输入详细位置", trigger: "blur" },
        ],
        money: [{ required: true, message: "请输入酬金", trigger: "change" }],
        type: [
          { required: true, message: "请选择寻宠/寻主人", trigger: "change" },
        ],
      },
    };
  },
  created() {
    //编辑的时候图片列表赋值
    this.uploadImages = [];
    let imgs = this.form.imgFileIds.split(",");
    imgs.map((item) => {
      this.uploadImages.push({ name: item.split(".")[0], url: item });
    });
    console.log(this.uploadImages);
  },
  methods: {
    submitForm(formName) {
      console.log(this.form);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // TODO: 发布信息的相关操作
          this.$message.success("发布成功！");
        } else {
          this.$message.error("请正确填写信息");
        }
      });
    },
    getToken() {
      // 获取当前用户 Token
      return localStorage.getItem("token");
    },
    beforeUpload(file) {
      // 检查图片格式，返回 false 可以阻止上传
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJPG) {
        this.$message.error("只能上传 JPG/PNG 格式的图片");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB");
        return false;
      }
      return true;
    },
    handleSuccess(response, file, fileList) {
      // 图片上传成功，处理响应结果，将图片链接添加到 uploadImages 中
      if (response.status === 0) {
        const url = response.data.url;
        // 图片上传成功拼接成字符串上传
        this.form.imgFileIds += "," + url;
        this.uploadImages.push({ name: file.name, url: url });
      } else {
        this.$message.error("上传图片失败");
      }
    },
    handleExceed(files, fileList) {
      // 限制上传图片数量
      this.$message.error(`最多只能上传 ${this.uploadImages.length} 张图片`);
    },
  },
  computed: {
    uploadAction() {
      // 上传图片的 API 接口地址
      return "/api/upload"; // 假设为该地址
    },
  },
};
</script>
