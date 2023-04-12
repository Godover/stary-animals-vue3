<template>
  <div
    style="justify-content: space-between; align-items: center; display: flex"
  >
    <Breadcrumb>
      <BreadcrumbItem to="/realTimeInfo">
        <Icon type="ios-home-outline"></Icon>
        救助信息
      </BreadcrumbItem>
    </Breadcrumb>
    <div class="ivu-fr" style="display: flex">
      <Button type="primary" @click="push('/rescue_publish/0')"
        >发布救助</Button
      >
    </div>
  </div>
  <el-divider style="margin-top: 15px" />
  <div class="cardContainer">
    <div
      style="background: #f8f8f8; padding: 3px; width: 650px"
      v-for="item in infoArray"
    >
      <Card :bordered="false" @click="push('/rescue_view/' + item.id)">
        <div style="display: flex">
          <div style="height: 100px; width: 200px; position: relative">
            <img
              :src="item.imgFiles[0].filePath"
              style="
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
                position: absolute;
                top: 0;
                left: 0;
              "
            />
          </div>
          <div class="ivu-ml-16">
            <ul style="list-style: none">
              <li class="title">
                <b>{{ item.title }}</b>
              </li>
              <li class="ivu-mb-8 ivu-mt-4 description">
                {{ item.description }}{{ item.description
                }}{{ item.description }}
              </li>
              <li style="position: absolute; bottom: 10px; width: 420px">
                <el-text
                  >宠类：{{ item.category }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  区县：{{ item.city }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 时间：{{
                    item.time
                  }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </el-text>
                <el-text
                  class="ivu-fr"
                  :style="{
                    'background-color':
                      item.status === 3 || item.status === 4
                        ? '#19be6b'
                        : '#c5c8ce',
                    'border-radius': '2px',
                    color: 'white',
                  }"
                >
                  {{
                    item.status === 3
                      ? "已领养"
                      : item.status === 4
                      ? "已送养"
                      : "放弃了"
                  }}
                </el-text>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "RescueComponent",
  components: {},
  data() {
    return {
      infoArray: [
        {
          url: "https://img1.baidu.com/it/u=1410611840,1889651514&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=304",
          type: 1,
          title: "免费赠送三个月大的猫咪，体外体内除虫已做",
          category: "狗狗",
          city: "城市",
          description:
            "一共12只小狗，2022年12月20号左右出生，2个狗妈妈生的，小狗身体健康活泼可爱，经历了上海冬天最冷的时侯，好养活",
          status: 1,
          time: "3月18日22:02",
        },
        {
          url: "https://img1.baidu.com/it/u=1410611840,1889651514&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=304",
          type: 2,
          title: "免费赠送三个月大的猫咪，体外体内除虫已做",
          category: "狗狗",
          city: "城市",
          description:
            "一共12只小狗，2022年12月20号左右出生，2个狗妈妈生的，小狗身体健康活泼可爱，经历了上海冬天最冷的时侯，好养活",
          status: 1,
          time: "3月18日22:02",
        },
        {
          url: "https://img1.baidu.com/it/u=1410611840,1889651514&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=304",
          type: 2,
          title: "免费赠送三个月大的猫咪，体外体内除虫已做",
          category: "狗狗",
          city: "城市",
          description:
            "一共12只小狗，2022年12月20号左右出生，2个狗妈妈生的，小狗身体健康活泼可爱，经历了上海冬天最冷的时侯，好养活",
          status: 1,
          time: "3月18日22:02",
        },
        {
          url: "https://img1.baidu.com/it/u=1410611840,1889651514&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=304",
          type: 1,
          title: "免费赠送三个月大的猫咪，体外体内除虫已做",
          category: "狗狗",
          city: "城市",
          description:
            "一共12只小狗，2022年12月20号左右出生，2个狗妈妈生的，小狗身体健康活泼可爱，经历了上海冬天最冷的时侯，好养活",
          status: 1,
          time: "3月18日22:02",
        },
        {
          url: "https://img1.baidu.com/it/u=1410611840,1889651514&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=304",
          type: 1,
          title: "免费赠送三个月大的猫咪，体外体内除虫已做",
          category: "狗狗",
          city: "城市",
          description:
            "一共12只小狗，2022年12月20号左右出生，2个狗妈妈生的，小狗身体健康活泼可爱，经历了上海冬天最冷的时侯，好养活",
          status: 3,
          time: "3月18日22:02",
        },
        {
          url: "https://img1.baidu.com/it/u=1410611840,1889651514&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=304",
          type: 1,
          title: "免费赠送三个月大的猫咪，体外体内除虫已做",
          category: "狗狗",
          city: "城市",
          description:
            "一共12只小狗，2022年12月20号左右出生，2个狗妈妈生的，小狗身体健康活泼可爱，经历了上海冬天最冷的时侯，好养活",
          status: 4,
          time: "3月18日22:02",
        },
        {
          url: "https://img1.baidu.com/it/u=1410611840,1889651514&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=304",
          type: 1,
          title: "免费赠送三个月大的猫咪，体外体内除虫已做",
          category: "狗狗",
          city: "城市",
          description:
            "一共12只小狗，2022年12月20号左右出生，2个狗妈妈生的，小狗身体健康活泼可爱，经历了上海冬天最冷的时侯，好养活",
          status: 1,
          time: "3月18日22:02",
        },
      ],
    };
  },
  methods: {
    push(model) {
      router.push(model);
    },
  },
};
</script>

<style>
.cardContainer {
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
