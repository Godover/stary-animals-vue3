<template>
  <div v-loading="userInfo === null">
    <div v-if="userInfo!==null">
      <div slot="header">
        <h2>用户信息</h2>
      </div>
      <div class="user-info">
        <div class="avatar">
          <el-upload
              class="avatar-uploader"
              action="http://stary.wwsix.cn/endpoint/v1/common/upload"
              :on-success="handleUploadSuccess"
              :headers="{Authorization:getToken}"
              :before-upload="beforeUpload"
              :show-file-list="false">
            <img v-if="userInfo.photoFileDto !== null" :src="userInfo.photoFileDto.filePath" class="avatar"/>
            <el-icon v-else class="avatar-uploader-icon">
            </el-icon>
          </el-upload>
        </div>
        <div class="info">
          <el-form ref="userInfoForm" :model="userInfo" label-width="120px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userInfo.userName"></el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
              <el-date-picker v-model="userInfo.birthday" type="date" placeholder="选择日期" value-format="YYYY-MM-DD">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="userInfo.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="userInfo.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item label="城市" prop="cityDto">
              <el-select v-if="this.cityArray.length !== 0" v-model="chooseCity" placeholder="请选择城市"
                         style="width: 300px">
                <el-option v-for="item in cityArray"
                           :value="(item.province!==null?item.province:'') + (item.province !== null ? '/' : '') +
                   (item.city!==null?item.city:'') + (item.city !== null ? '/' : '') +
                    (item.county!==null?item.county:'')"
                           @click="this.userInfo.cityDto = item">
                  <CityComponent :city="item"/>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="角色信息" prop="role">
              <el-radio-group v-model="userInfo.userCategoryDto.name" disabled>
                <el-radio :label="'管理员'">管理员</el-radio>
                <el-radio :label="'注册用户'">普通用户</el-radio>
                <el-radio :label="'黑名单'">黑名单</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否为管理员" prop="isAdmin">
              <el-switch v-model="userInfo.isAdmin" active-color="#13ce66" inactive-color="#ff4949"
                         disabled></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CityComponent from "@/components/home/CityComponent";
import {currentUserInfo, getUserById, userModify} from "@/http/api/userApi";
import {cityList} from "@/http/api/commonApi";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'EditUserInfoView',
  components: {CityComponent},
  data() {
    return {
      userInfo: null,
      chooseCity: null,
      cityArray: [],
      loading: []
    }
  },
  computed: {
    ...mapGetters(['getToken'])
  },
  methods: {
    handleUploadSuccess(response, file, fileList) {
      setTimeout(this.loading[file.name], 0);
      if (response.success === true) {
        this.$Message.success(response.data.fileNameOriginal + " 上传成功!")
        this.userInfo.photoFileDto = response.data
      } else {
        this.$Message.error(response.msg)
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
          file.type === "image/jpeg" || file.type === "image/png";
      const isLt5M = file.size / 1024 / 1024 < 1;
      if (!isJpgOrPng) {
        this.$message.error("上传图片只能是 JPG/PNG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过 1MB!");
      }
      if (isJpgOrPng && isLt5M) {
        this.loading[file.name] = this.$Message.loading({
          content: '正在上传 ' + file.name,
          duration: 0
        });
      }
      return isJpgOrPng && isLt5M;
    },
    submitForm() {
      this.$refs.userInfoForm.validate(valid => {
        if (valid) {
          userModify(this.userInfo)
              .then(data => {
                this.$message.success('保存成功!')
                this.InitData()
                currentUserInfo().then(user => {
                  this.setUserInfo(user)
                })
              })
        } else {
          this.$message.error('表单验证失败，请检查输入')
          return false
        }
      })
    },
    InitData() {
      this.userInfo = null
      getUserById(this.$route.params.id)
          .then(data => {
            this.userInfo = data
            let item = data.cityDto
            if (item === null) {
              this.chooseCity = "暂未设置"
            } else {
              this.chooseCity = (item.province !== null ? item.province : '') + (item.province !== null ? '/' : '') +
                  (item.city !== null ? item.city : '') + (item.city !== null ? '/' : '') +
                  (item.county !== null ? item.county : '')
            }
          })
    },
    ...mapMutations(['setUserInfo'])
  }, created() {
    this.InitData()
    cityList().then(data => {
      this.cityArray = data
    })
  },

}
</script>

<style scoped>
.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.avatar {
  margin-right: 30px;
  width: 250px;
}

.info {
  flex: 1;
}

.el-form-item__label {
  font-weight: bold;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 350px;
  height: 350px;
  text-align: center;
}
</style>
