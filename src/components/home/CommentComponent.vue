<template>
  <div class="comment">
    <Title :level="3">评论区</Title>
    <el-form ref="form" :model="form" class="comment-form">
      <el-form-item prop="content">
        <el-input v-model="form.content" placeholder="请输入你要评论内容" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交评论</el-button>
      </el-form-item>
    </el-form>
    <div class="comment-header">评论列表</div>
    <el-empty v-if="comments.length ===0" description="暂无评论,快发表一条试试"/>
    <div class="comment-list" v-loading="loading">
      <div class="comment-item" v-for="(comment, index) in comments" :key="index">
        <div style="display: flex;height: 50px;align-items: center">
          <div style="display: flex">
            <Space size="large">
              <Avatar
                  v-if="comment.userDto!==null && comment.userDto.photoFileDto !== undefined && comment.userDto.photoFileDto !== null"
                  icon="ios-person" size="large"
                  :src="comment.userDto.photoFileDto.filePath"/>
              <Avatar v-else icon="ios-person" size="large"/>
            </Space>
          </div>
          <div class="comment-name" style="display: flex;margin-left: 10px">{{ comment.userDto.userName }}</div>
        </div>
        <div class="comment-content" style="margin-top: 10px;margin-bottom: 10px;margin-left: 10px">{{
            comment.content
          }}
        </div>
        <div class="comment-time">评论时间:&nbsp;&nbsp;{{ comment.gmtCreate }}</div>
      </div>
    </div>
    <el-pagination
        v-if="total > 0"
        class="comment-pagination"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        :page-count="totalPage"
        :page-sizes="[5, 10, 15, 20]"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import {commentList, commentPublish} from "@/http/api/commentApi";

export default {
  name: "CommentComponent",
  props: {
    bizType: {
      type: Number,
      required: true
    }, bizId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      form: {
        content: ''
      },
      comments: [], // 评论列表
      total: 0, // 总评论数
      currentPage: 1, // 当前页码
      totalPage: 1, // 当前页码
      pageSize: 10, // 每页的评论数
      loading: true
    };
  },
  created() {
    // 获取评论列表
    this.getComments();
  },
  methods: {
    // 获取评论列表
    getComments() {
      this.loading = true
      this.comments = []
      commentList(this.bizId, this.bizType, this.currentPage, this.pageSize)
          .then(data => {
            this.comments = data.content;
            this.total = Number.parseInt(data.total)
            this.totalPage = Number.parseInt(data.totalPage)
            this.loading = false
          })
    },
    // 提交评论
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          commentPublish(this.bizId, this.bizType, this.form.content).then(data => {
            this.$Message.success("评论成功!")
            this.form.content = null
            this.getComments()
          })
        }
      });
    },
    // 处理页码改变事件
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getComments()
    }
  }
};
</script>

<style>
.comment {
  width: 100%;
  margin: 10px auto;
}

.comment-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.comment-form {
  margin-bottom: 20px;
}

.comment-list {
  min-height: 50px;
  margin-bottom: 20px;
}

.comment-item {
  padding: 10px;
  border: 1px solid #ebebeb;
  margin-bottom: 10px;
}

.comment-name {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.comment-content {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.comment-time {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.comment-pagination {
  text-align: center;
  margin-bottom: 20px;
}

.el-textarea__inner {
  height: 100px;
}
</style>
