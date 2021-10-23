<template>
  <div id="app">
    <el-backtop :bottom="100">
      <i class="el-icon-caret-top"></i>
    </el-backtop>
    <router-view v-wechat-title='$route.meta.title'/>
  </div>
</template>

<script>

