<template>
  <div>
    <el-form ref="form" :model="news" label-width="100px">
      <el-form-item label="标题">
        <el-input v-model="news.title"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="news.category">
          <el-option label="政治" value="politics"></el-option>
          <el-option label="经济" value="economy"></el-option>
          <el-option label="文化" value="culture"></el-option>
          <el-option label="科技" value="technology"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="内容">
        <div style="width: 800px;height: 300px" id="editor" ref="editor"></div>
      </el-form-item> -->
      <el-form-item label="内容">
        <textarea
          v-model="news.content"
          rows="10"
          cols="20"
          class="textareaStyle"
        >
          问问请问
        </textarea>
      </el-form-item>
    </el-form>
    <div style="margin-top: 20px; margin-left: 55px">
      <el-button type="primary" @click="submitForm">发布</el-button>
      <el-button @click="resetForm">重置</el-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElButton,
} from "element-plus";
import Quill from "quill";

export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElSelect,
    ElOption,
    ElButton,
  },
  setup() {
    const news = ref({
      title: "",
      category: "",
      content: "",
    });

    let quillEditor = null;

    onMounted(() => {
      quillEditor = new Quill(document.querySelector("#editor"), {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, true] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
            ["clean"],
          ],
        },
      });

      quillEditor.on("text-change", () => {
        news.value.content = quillEditor.root.innerHTML;
      });
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
      quillEditor.setContents([{ insert: "\n" }]);
    };

    return {
      news,
      submitForm,
      resetForm,
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
