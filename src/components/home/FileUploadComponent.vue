<template>
  <el-upload
      class="upload"
      action="http://stary.wwsix.cn/endpoint/v1/common/upload"
      :on-success="handleUploadSuccess"
      :headers="{Authorization:getToken}"
      :before-upload="beforeUpload"
      :file-list="imgFiles"
      :limit="limit"
      :on-exceed="onExceed">
    <el-button slot="upload" size="small" type="success">上传文件</el-button>
    <div slot="tip" class="el-upload__tip" style="margin-left: 10px;">
      只能上传jpg/png文件，且不超过1MB{{ this.limit !== 100 ? '，最多上传' + this.limit + '张' : '' }}
    </div>
  </el-upload>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  name: 'FileUploadComponent',
  components: {},
  props: {
    imgFiles: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    limit: {
      type: Number,
      required: false,
      default() {
        return 100;
      }
    }
  },
  data() {
    return {
      loading: {}
    }
  },
  methods: {
    handleUploadSuccess(response, file, fileList) {
      setTimeout(this.loading[file.name], 0);
      if (response.success === true) {
        this.$Message.success(response.data.fileNameOriginal + " 上传成功!")
        this.imgFiles.push(response.data)
      } else {
        this.$Message.error(response.msg)
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
          file.type === "image/jpeg" || file.type === "image/png";
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isJpgOrPng) {
        this.$message.error("上传图片只能是 JPG/PNG 格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传图片大小不能超过 1MB!");
      }
      if (isJpgOrPng && isLt1M) {
        this.loading[file.name] = this.$Message.loading({
          content: '正在上传 ' + file.name,
          duration: 0
        });
      }
      return isJpgOrPng && isLt1M;
    },
    onExceed() {
      this.$message.error("限制上传" + this.limit + "张,请删除原图片后重新上传");
    }
  },
  computed: {
    ...mapGetters([
      'getToken'
    ])
  }
}
</script>
<style scoped>
.upload {
  justify-content: center;
  align-items: center;
}
</style>
