<template>
  <el-aside class="app-aside">
    <div class="user-info">
      <img src="@/assets/gravatar.png" />
      <span>evan</span>
    </div>
    <Menu />
  </el-aside>
</template>

<script>
import Menu from '@/components/Menu'

export default {
  name: 'Aside',
  components: {
    Menu
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.app-aside {
  width: 200px !important;
  height: 100%;
  background: #1f1f1f;
  .user-info {
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid $module-bg;
    img {
      width: 64px;
    }
    span {
      font-size: 20px;
      font-weight: 500;
      margin: 10px 0;
      color: #8a8a8a;
    }
  }
}
</style>