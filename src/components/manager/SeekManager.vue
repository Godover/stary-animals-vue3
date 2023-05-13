<template>
  <div>
    <Table :loading="loading" border height="650" size="small" :columns="columns" :data="data" width="1050">
      <!-- 标题-->
      <template #title="{ row }">
        <Ellipsis :text="row.title" :lines="1" tooltip @click="this.push('/seek_view/'+row.id)"
                  style="color: #2b85e4;user-select: none"/>
      </template>
      <!-- 描述-->
      <template #description="{ row }">
        <Ellipsis :text="row.description" :lines="1" tooltip/>
      </template>
      <!-- 宠类-->
      <template #animalCategory="{ row }">
        <Ellipsis :text="row.animalCategoryDto.name" :lines="1" tooltip/>
      </template>
      <!-- 用户信息 -->
      <template #userInfo="{ row }">
        <Ellipsis :text="row.userDto.userName" :lines="1" tooltip/>
      </template>
      <!-- 用户信息 -->
      <template #gmtCreate="{ row }">
        <Ellipsis :text="row.gmtCreate" :lines="1" tooltip/>
      </template>
      <!-- 类型 -->
      <template #type="{ row }">
        <span :style="row.type===false?'color:green':'color:red'">
        {{ row.type ? '寻主人' : '寻宠' }}
        </span>
      </template>
      <!-- 审核状态 -->
      <template #verifyInfo="{ row }">
        {{ row.verifyDto.statusDesc }}
      </template>
      <!-- 操作 -->
      <template #action="{ row, index }">
        <Dropdown>
          <Button type="primary">
            操作
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <template #list>
            <DropdownMenu>
              <DropdownItem v-if="isAdmin && row.verifyDto.status===1" @click="verify(3,row.id)">下架</DropdownItem>
              <DropdownItem v-if="isAdmin && row.verifyDto.status===3||row.verifyDto.status===2"
                            @click="verify(1,row.id)">重新上架
              </DropdownItem>
              <DropdownItem v-if="isAdmin && row.verifyDto.status===0" @click="verify(1,row.id)">审核通过</DropdownItem>
              <DropdownItem v-if="isAdmin && row.verifyDto.status===0" @click="verify(2,row.id)">审核拒绝</DropdownItem>
              <DropdownItem v-if="row.userDto.id===userInfo.id && row.verifyDto.status===0" @click="verify(4,row.id)">
                取消发布
              </DropdownItem>
              <div v-if="row.userDto.id===userInfo.id &&  row.status===0 && row.verifyDto.status===1">
                <DropdownItem @click="changeStatus(row.id,1)">
                  完成寻找
                </DropdownItem>
                <DropdownItem @click="changeStatus(row.id,2)">
                  放弃寻找
                </DropdownItem>
              </div>
              <DropdownItem v-if="row.userDto.id===userInfo.id && row.verifyDto.status!==3"
                            @click="push('/seek_publish/'+row.id)">重新编辑
              </DropdownItem>
              <DropdownItem v-else-if="isAdmin &&  row.verifyDto.status===4" disabled>主动下架
              </DropdownItem>
              <DropdownItem v-if="row.userDto.id!==userInfo.id ||  row.verifyDto.status===3" disabled>重新编辑
              </DropdownItem>

            </DropdownMenu>
          </template>
        </Dropdown>
      </template>
    </Table>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {verifyModify} from "@/http/api/verifyApi";
import {seekChangeStatus, seekListByUserId} from "@/http/api/seekApi";

export default {
  name: 'SeekManagerComponent',
  components: {},
  data() {
    return {
      loading: true,
      columns: [
        {"title": "标题", "width": 200, "slot": "title"},
        {"title": "描述", "width": 240, "slot": "description"},
        {"title": "宠类", "width": 90, "slot": "animalCategory"},
        {"title": "类型", "width": 70, "align": "center", "slot": "type"},
        {"title": "发布人", "width": 90, "slot": "userInfo"},
        {"title": "发布时间", "width": 150, "slot": "gmtCreate"},
        {"title": "审核状态", "width": 90, "align": "center", "slot": "verifyInfo"},
        {"title": "操作", "slot": "action", "width": 130, "align": "center"}
      ],
      data: []
    }
  },
  methods: {
    verify(status, bizId) {
      let loadingVerify = this.$Message.loading({
        content: '正在处理!',
        duration: 0
      });
      verifyModify(bizId, 2, status, '')
          .then(() => {
            setTimeout(loadingVerify, 0);
            this.$Message.success((status === 4 ? '取消发布' : '审核') + "成功!")
            this.InitData()
          })
          .catch(e => {
            setTimeout(loadingVerify, 0);
          })
    },
    changeStatus(bizId, status) {
      let loadingVerify = this.$Message.loading({
        content: '正在处理!',
        duration: 0
      });
      seekChangeStatus(bizId, status)
          .then(() => {
            setTimeout(loadingVerify, 0);
            this.$Message.success("处理完成!")
            this.InitData()
          })
          .catch(e => {
            setTimeout(loadingVerify, 0);
          })
    },
    InitData() {
      this.loading = true
      seekListByUserId(1, 999)
          .then(data => {
            this.data = data.content
            this.loading = false
          }).catch(v => this.loading = false)
    },
    push(model) {
      window.open(model)
    },
    remove(index) {
      this.data.splice(index, 1);
    }
  },
  computed: {
    ...mapGetters(['isAdmin', 'userInfo'])
  },
  created() {
    this.InitData()
  }
}
</script>
