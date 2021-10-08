<template>
  <div class="login-page">
    <el-card class="login-card">
      <div class="card-header">
        <img src="@/assets/logo.svg" alt="logo">
      </div>
      <el-form
        :model="user"
        :rules="rules"
        ref="ruleform"
      >
        <el-form-item prop="username">
          <el-input
            v-model="user.username"
            class="username"
            size="small"
            prefix-icon="el-icon-user"
            placeholder="用户名"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="user.password"
            class="password"
            size="small"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="密码"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            size="small"
            @click="login('ruleform')"
          >
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$notify({
            type: 'success',
            title: '登录成功',
            message: '正在跳转到首页...'
          })
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        } else {
          this.$notify({
            type: 'error',
            title: '登录失败'
          })
        }
      })
    }
  }
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
  width: 25%;
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