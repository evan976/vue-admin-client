<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>个人信息</span>
    </div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane label="基本信息" name="basicProfile">
        <el-card>
          <el-form :model="profileModel">
            <el-form-item label="个人头像" label-width="100px">
              <el-upload
                class="upload-avatar"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false">
                <img
                  v-if="profileModel.gravatar"
                  :src="profileModel.gravatar"
                  class="avatar"
                >
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-input
              v-model="profileModel.gravatar"
              class="avatar-url"
                size="small"
                placeholder="或者直接输入图片地址"
                prefix-icon="el-icon-link">
              </el-input>
            </el-form-item>
            <el-form-item label="昵称" label-width="100px">
              <el-input
                v-model="profileModel.username"
                class="nickname"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="100px">
              <el-input
                v-model="profileModel.email"
                class="email"
                size="small"
                prefix-icon="el-icon-message"
              ></el-input>
            </el-form-item>
            <el-form-item label="个性签名" label-width="100px">
              <el-input
                v-model="profileModel.slogan"
                class="slogan"
                size="small"
                type="textarea"
                :rows="4"
              ></el-input>
            </el-form-item>
            <el-form-item label-width="100px">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-check"
              >保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="安全设置" name="changePassword">
        <el-card>
          <el-form :model="passwordModel" :rules="rules" ref="ruleForm">
            <el-form-item
              label="原密码"
              prop="password"
              label-width="100px"
            >
              <el-input
                v-model="passwordModel.password"
                class="password"
                size="small"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="new_password" label-width="100px">
              <el-input
                v-model="passwordModel.new_password"
                class="new-password"
                size="small"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="rel_new_password" label-width="100px">
              <el-input
                v-model="passwordModel.rel_new_password"
                class="rel-new-password"
                size="small"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label-width="100px">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-check"
                @click="updatePassword('ruleForm')"
              >更新</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { getUserInfo } from '@/request/api'

export default {
  name: 'Profile',
  data() {
    return {
      activeName: 'basicProfile',
      profileModel: {},
      passwordModel: {},
      rules: {
        password: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        new_password: [
          { required: true, message: '新密码不能为空', trigger: 'blur' }
        ],
        rel_new_password: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.getUserInfo()
  },

  methods: {

    async getUserInfo () {
      const { message, data: { user } } = await getUserInfo()
      this.profileModel = user
      this.$notify({
        type: 'success',
        title: '数据请求成功',
        message
      })
    },

    handleClick(tab, event) {
      console.log(tab, event)
    },

    updatePassword (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$notify({
            type: 'success',
            title: '密码修改成功',
            message: '请重新登录，正在跳转...',
            duration: 0
          })
          setTimeout(() => {
            this.$router.push('/login')
          }, 3000)
        } else {
          this.$notify({
            type: 'error',
            title: '密码修改失败'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.upload-avatar {
  width: 80px;
  height: 80px;
  border-radius: 2px;
  border: 1px dashed $border;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all .3s;
}

.upload-avatar:hover {
  border-color: $primary;
}

.avatar-uploader-icon {
  font-size: 20px;
  color: $grey;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}

.avatar {
  width: 80px;
  height: 80px;
  display: block;
}

.avatar-url {
  width: 30%;
}

.nickname, .email, .slogan,
.password, .new-password, .rel-new-password {
  width: 50%;
}
</style>