<template>
  <div class="login-page">
    <el-card class="login-card">
      <div class="card-header">
        <img src="@/assets/images/logo.svg" alt="logo">
      </div>
      <el-form
        :model="userModel"
        :rules="rules"
        ref="ruleform"
      >
        <el-form-item prop="username">
          <el-input
            v-model="userModel.username"
            class="username"
            size="small"
            prefix-icon="el-icon-user"
            placeholder="用户名"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            v-model="userModel.email"
            class="password"
            size="small"
            prefix-icon="el-icon-message"
            placeholder="邮箱"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="userModel.password"
            class="password"
            size="small"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="rel_password">
          <el-input
            v-model="userModel.rel_password"
            class="password"
            size="small"
            type="password"
            prefix-icon="el-icon-warning-outline"
            placeholder="确认密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            size="small"
            @click="register('ruleform')"
          >
            注 册
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { register } from '@/request/api'

export default {
  name: 'Register',
  data () {
    return {
      userModel: {},
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        rel_password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
      }
    }
  },
  methods: {
    register (formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        const { code, message } = await register(this.userModel)
        if (code === 1) {
          this.$notify({
            title: '操作失败',
            type: 'error',
            message
          })
        } else {
          this.$notify({
            title: '操作成功',
            type: 'success',
            message
          })
          this.$router.push('/login')
          this.userModel = {}
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.login-page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../assets/images/bg.svg');
}
.login-card {
  width: 28%;
  color: $white;
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