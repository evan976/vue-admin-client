<template>
  <div class="login-page">
    <el-card class="login-card">
      <div class="card-header">
        <img src="@/assets/logo.svg" alt="logo">
      </div>
      <el-form>
        <el-form-item>
          <el-input class="username" size="small" prefix-icon="el-icon-user" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="password" size="small" type="password" prefix-icon="el-icon-lock" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" size="small">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-card {
  width: 30%;
  color: #fff;
  .card-header {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    h3 {
      margin-left: 10px;
    }
  }
  .login-btn {
    width: 100%;
    font-size: 14px;
  }
}
</style>