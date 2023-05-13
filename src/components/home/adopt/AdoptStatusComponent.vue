<template>
  <el-text class="ivu-fr" :style="{'background-color':  status === 0 ? 'red' :
            status === 1 ? 'green' : '#c5c8ce','border-radius': '3px','padding':'1px 3px','color': 'white','margin-right':'10px'}">
    {{
      status === 0 ? '待' + (supply === 0 ? '领养' : '送养') :
          status === 1 ? '已' + (supply === 0 ? '领养' : '送养') :
              '已领养'
    }}
  </el-text>
</template>
<script>
export default {
  name: 'AdoptStatusComponent',
  props: {
    status: {
      type: Number,
      default() {
        return 0
      }
    }, supply: {
      type: Number,
      default() {
        return 0
      }
    }
  }
}
</script>
