<template>
  <div>
    <el-form ref="form" :model="news" label-width="100px">
      <el-form-item label="标题">
        <el-input v-model="news.title"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="chooseNews">
          <el-option v-for="item in newsArr" :label="item.name" :value="item.name"
                     @click="this.form.newCategoryId = item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容">
        <textarea
            v-model="news.content"
            rows="10"
            cols="20"
            class="textareaStyle">
          问问请问
        </textarea>
      </el-form-item>
      <el-form-item label="首页图片" prop="receipt">
        <el-upload
            class="upload-demo"
            action="/upload"
            :on-success="handleUploadSuccess"
            :limit="1"
            :before-upload="beforeUpload"
            :file-list="files"
            list-type="picture">
          <el-button slot="upload" size="small" type="success">上传文件
          </el-button>
          <div slot="tip" class="el-upload__tip">
            &nbsp;&nbsp;只能上传jpg/png文件，且不超过5MB
          </div>
        </el-upload>
      </el-form-item>
    </el-form>

    <div style="margin-top: 20px; margin-left: 55px">
      <el-button type="primary" @click="submitForm">发布</el-button>
      <el-button @click="resetForm">重置</el-button>
    </div>
  </div>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue";
import {newsCategoryList} from "@/http/api/commonApi";

export default defineComponent({
  setup() {
    const news = ref({
      "content": "",
      "description": "",
      "fileId": 0,
      "newCategoryId": 0,
      "title": "",
      fileDto: {}
    })
    const newsArr = ref([])
    const files = ref([])
    const chooseNews = ref('')

    onMounted(() => {
      newsCategoryList().then(data => {
        newsArr.value = data
        chooseNews.value = data[0].name
      })
    });
    const submitForm = () => {
      const form = document.getElementById("form");
      form.validate().then((valid) => {
        if (valid) {
          // 提交表单逻辑
          console.log(news.value);
          // 清空表单
          resetForm();
        } else {
          console.log("表单验证失败");
        }
      });
    };

    const resetForm = () => {
      const form = document.getElementById("form");
      form.resetFields();
    };

    const handleUploadSuccess = (response, file, fileList) => {
      console.log(response, file, fileList);
    }
    const beforeUpload = (file) => {
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
    }

    return {
      news,
      submitForm,
      resetForm,
      newsArr,
      chooseNews,
      handleUploadSuccess,
      beforeUpload,
      files
    };
  },
});
</script>
<style>
.textareaStyle {
  width: 100%;
  padding: 4px;
}
</style>
