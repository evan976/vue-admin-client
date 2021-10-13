<template>
  <div class="dashboard">
    <el-row type="flex" justify="space-around">
      <el-col :span="5">
        <el-card>
          <div class="item">
            <span>全站文章</span>
            <h3>122</h3>
          </div>
          <img src="@/assets/images/articles.svg" />
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="category-nums">
          <div class="item">
            <span>全站分类</span>
            <h3>6</h3>
          </div>
          <img src="@/assets/images/category.svg" />
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="tag-nums">
          <div class="item">
            <span>全站标签</span>
            <h3>12</h3>
          </div>
          <img src="@/assets/images/tags.svg" />
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="days">
          <div class="item">
            <span>建站天数</span>
            <h3>120</h3>
          </div>
          <img src="@/assets/images/date.svg" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.el-card {
  .item {
    float: left;
    span {
      font-size: 14px;
      color: #666;
    }
    h3 {
      font-size: 24px;
      margin: 15px 0;
    }
  }
  img {
    float: right;
  }
}
</style>