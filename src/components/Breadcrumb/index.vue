<template>
  <el-breadcrumb class="app-breadcrumb">
    <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.app-breadcrumb {
  height: 80px;
  line-height: 80px;
  background-color: $module-bg;
  padding: 0 20px;
  font-size: 20px;
  border-left: 1px solid $border;
}
</style>