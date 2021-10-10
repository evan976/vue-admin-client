<template>
  <el-header class="app-header">
    <div class="logo">
      <img src="@/assets/images/logo.svg" alt="logo" />
      <h3 class="title">BLOG SYSTEM</h3>
    </div>
    <div class="user-info">
      <a href="#">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img class="avatar" src="@/assets/images/avatar.png" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              icon="el-icon-warning-outline"
              @click.native="$router.push('/setting/profile')">
                个人信息
              </el-dropdown-item>
            <el-dropdown-item
              icon="el-icon-switch-button"
              @click.native="logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </a>
    </div>
  </el-header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logout () {
      this.$store.commit('removeToken')
      this.$notify({
        title: '操作成功',
        message: '退出登录成功',
        type: 'success'
      })
      setTimeout(() => {
        this.$router.push('/login')
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.app-header {
  width: 100%;
  height: 60px;
  background: $module-bg;
  border-bottom: 1px solid $border;
  .logo {
    height: 60px;
    float: left;
    display: flex;
    align-items: center;
    .title {
      margin-left: 10px;
      color: $primary;
    }
  }
  .user-info {
    float: right;
    .avatar {
      margin: 14px 0;
      width: 32px;
    }
  }
}
</style>