<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>个人信息</span>
    </div>
    <el-tabs
      v-model="activeName"
    >
      <el-tab-pane label="基本信息" name="basicProfile">
        <el-card>
          <el-form :model="profileModel">
            <el-form-item label="个人头像" label-width="100px">
              <el-upload
                class="upload-avatar"
                :headers="headers"
                :action="action"
                :show-file-list="false"
                :before-upload="beforeUpload"
                :on-success="successUpload"
              >
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
                disabled
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
                @click="updateProfile"
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
            <el-form-item
              label="新密码"
              prop="new_password"
              label-width="100px"
            >
              <el-input
                v-model="passwordModel.new_password"
                class="new-password"
                size="small"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item
              label="确认密码"
              prop="rel_new_password"
              label-width="100px"
            >
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
import { getUserInfo, updateUserInfo } from '@/request/api'
import { requestResultNotify, handleResultNotify } from '@/utils/notify'

export default {
  name: 'Profile',
  data() {
    return {
      action: 'http://localhost:8000/api/private/v1/images/upload',
      headers: {
        Authorization: null
      },
      activeName: 'basicProfile',
      profileModel: {
        gravatar: null
      },
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

    beforeUpload () {
      const token = this.$store.state.token
      this.headers.Authorization = `Bearer ${token}`
    },

    successUpload (result) {
      const { code, message, result: { url } } = result
      this.profileModel.gravatar = url
      handleResultNotify(code, message)
    },


    async getUserInfo () {
      const { code, message, result } = await getUserInfo()
      this.profileModel = result
      requestResultNotify(code, message)
    },

    async updateProfile () {
      const { code, message } = await updateUserInfo(this.profileModel)
      handleResultNotify(code, message)
      this.getUserInfo()
    },

    updatePassword (formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        const { code, message } = await updateUserInfo(this.passwordModel)
        if (code === 1) {
          this.$notify({
            type: 'success',
            title: '操作成功',
            message
          })
          setTimeout(() => {
            this.$router.push('/login')
          }, 2000)
        } else {
          this.$notify({
            type: 'error',
            title: '操作失败',
            message
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

.nickname, .email, .slogan, .avatar-url,
.password, .new-password, .rel-new-password {
  width: 50%;
}
</style>