<template>
  <div style="justify-content: space-between;align-items:center;display: flex">
    <Breadcrumb>
      <BreadcrumbItem to="/help">
        <Icon type="ios-home-outline"></Icon>
        帮助信息
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
  <el-divider style="margin-top: 15px"/>
  <div>
    <Row>
      <Col span="12">
        <Title :level="3">关于我们</Title>
        重庆三峡学院计算机科学与技术专业2023届计本3班 袁圣志&郭超 合作开发
      </Col>
      <Col span="12">
        <Title :level="3">帮助信息</Title>
        <div>
          <p>流浪动物救助及领养平台，为城市动物而生，以救助城市流浪动物为核心业务的宠物类综合网站，本网站将会一直以让城市动物生活的更好为目的坚定不移的发展下去！</p>
        </div>
        <div>
          <p>我们的宣言：为城市动物而生</p>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>


export default {
  name: 'HelpComponent',
  components: {}
}
</script>
