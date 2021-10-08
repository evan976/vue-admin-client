<template>
  <div class="login-page">
    <el-card class="login-card">
      <div class="card-header">
        <img src="@/assets/images/logo.svg" alt="logo">
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
import { login } from '@/request/api'

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
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        const result = await login(this.user)
        if (result.code === -1) {
          this.$notify({
            title: '失败',
            message: result.message,
            type: 'error'
          })
        } else {
          const { token } = result.data
          this.$store.commit('setToken', token)
          this.$notify({
            title: '成功',
            message: result.message,
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
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