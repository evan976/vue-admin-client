<template>
  <el-aside class="app-aside" width="200px">
    <div class="user-info">
      <img src="@/assets/images/avatar.png" />
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
  height: 100%;
  background: $module-bg;
  .user-info {
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid $border;
    img {
      width: 64px;
    }
    span {
      font-size: 20px;
      font-weight: 500;
      margin: 10px 0;
      color: $dark;
    }
  }
}
</style>