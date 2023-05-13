<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="newCategoryDto">
        <el-select v-model="chooseNews">
          <el-option v-for="item in newsArr" :label="item.name" :value="item.name"
                     @click="this.form.newCategoryDto = item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <textarea
            v-model="form.content"
            rows="10"
            cols="20"
            class="textareaStyle">
          问问请问
        </textarea>
      </el-form-item>
      <el-form-item label="首页图片" prop="fileDto">
        <FileUploadComponent :img-files="imgFiles"/>
      </el-form-item>
    </el-form>
    <div style="margin-top: 20px; margin-left: 55px">
      <el-button type="primary" @click="submitForm">发布</el-button>
    </div>
  </div>
</template>

<script>
import {newsCategoryList} from "@/http/api/commonApi";
import {mapGetters} from 'vuex'
import router from "@/router";
import {newsModify} from "@/http/api/newsApi";
import FileUploadComponent from "@/components/home/FileUploadComponent";


export default {
  name: "RealTimePublish",
  components: {FileUploadComponent},
  data() {
    return {
      form: {
        "title": "",
        "content": "",
        "description": "",
        "newCategoryDto": null,
        fileDto: null
      },
      imgFiles: [],
      chooseNews: "",
      newsArr: [],
      rules: {
        title: [
          {required: true, message: '标题不能为空', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '内容不能为空', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '简介不能为空', trigger: 'blur'}
        ],
        newCategoryDto: [
          {required: true, message: '分类不能为空', trigger: 'blur'}
        ],
        fileDto: [
          {required: true, message: '请上传图片', trigger: 'change'}
        ]
      },
    }
  },
  watch: {
    imgFiles: {
      handler(val, oldval) {
        if (val.length !== 0) {
          this.form.fileDto = val[0]
        } else {
          this.form.fileDto = null
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['getToken'])
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          newsModify(this.form)
              .then(data => {
                this.$Message.success("提交成功!")
                router.push("/realtime_view/" + data)
              })
        } else {
          return false;
        }
      });
    }
  },
  created() {
    newsCategoryList().then(data => {
      this.newsArr = data
      this.chooseNews = data[0].name
      this.form.newCategoryDto = data[0]
    })
  }
}
</script>
<style>
.textareaStyle {
  width: 100%;
  padding: 4px;
}
</style>
