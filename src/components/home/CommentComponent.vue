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
    <div class="comment-list">
      <div class="comment-item" v-for="(comment, index) in comments" :key="index">
        <div class="comment-name">{{ comment.name }}</div>
        <div class="comment-content">{{ comment.content }}</div>
        <div class="comment-time">{{ formatDate(comment.time) }}</div>
      </div>
      <el-pagination
          v-if="total > 0"
          class="comment-pagination"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentComponent",
  props: {
    bizType: {
      type: Number,
      required: true
    }, bizId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      form: {
        name: '',
        content: ''
      },
      comments: [], // 评论列表
      total: 0, // 总评论数
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页的评论数
    };
  },
  created() {
    // 获取评论列表
    this.getComments();
  },
  methods: {
    // 格式化日期
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const day = d.getDate();
      const hours = d.getHours();
      const minutes = d.getMinutes();
      const seconds = d.getSeconds();
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    // 获取评论列表
    getComments() {
      // TODO: 发送请求，获取评论列表
      // 这里采用手动添加数据的方式模拟
      const data = [
        {
          name: '小明',
          content: '这篇文章写得很好！',
          time: '2023-04-09T11:23:00.000Z'
        },
        {
          name: '小红',
          content: '我也很喜欢这篇文章！',
          time: '2023-04-09T12:34:56.000Z'
        }
      ]
      this.comments = data;
      this.total = data.length;
    },
    // 提交评论
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // TODO: 发送请求，提交评论
          const comment = {
            bizId: this.bizId,
            bizType: this.bizType,
            content: this.form.content
          }
          this.comments.unshift(comment); // 把新评论添加到评论列表开头
          this.form.content=null
          this.total += 1;
        }
      });
    },
    // 处理页码改变事件
    handleCurrentChange(page) {
      this.currentPage = page;
      // TODO: 发送请求，获取对应的评论列表
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
}

.el-textarea__inner {
  height: 100px;
}
</style>
