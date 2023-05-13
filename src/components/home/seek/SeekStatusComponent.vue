<template>
  <el-text class="ivu-fr" :style="{'background-color':  status === 0 ? 'red' :
            status === 1? 'green' : '#c5c8ce','border-radius': '3px','padding':'1px 3px','color':  'white','margin-right':'10px'}">
    {{ status === 0 ? '寻找中' : status === 1 ? '已找到' : '已放弃' }}
  </el-text>
</template>
<script>
export default {
  name: 'SeekStatusComponent',
  props: {
    status: {
      type: Number,
      default() {
        return 4
      }
    }
  }
}
</script>
