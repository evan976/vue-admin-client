<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>个人信息</span>
    </div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="basicProfile">
        <el-card>
          <el-form>
            <el-form-item label="个人头像" label-width="100px">
              <el-upload
                class="upload-avatar"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <!-- <el-divider /> -->
              <el-input
              class="avatar-url"
                size="small"
                placeholder="或者直接输入图片地址"
                prefix-icon="el-icon-link">
              </el-input>
            </el-form-item>
            <el-form-item label="昵称" label-width="100px">
              <el-input class="nickname" size="small"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="100px">
              <el-input class="email" size="small"></el-input>
            </el-form-item>
            <el-form-item label="个性签名" label-width="100px">
              <el-input class="slogan" size="small" type="textarea" :rows="4"></el-input>
            </el-form-item>
            <el-form-item label-width="100px">
              <el-button type="primary" size="small" icon="el-icon-check">保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="密码修改" name="changePassword">
        <el-card>
          <el-form>
            <el-form-item label="旧密码" label-width="100px">
              <el-input size="small" type="password" class="password" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" label-width="100px">
              <el-input size="small" type="password" class="new-password" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" label-width="100px">
              <el-input size="small" type="password" class="rel-new-password" show-password></el-input>
            </el-form-item>
            <el-form-item label-width="100px">
              <el-button type="primary" size="small" icon="el-icon-check">更新</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      activeName: 'basicProfile'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.upload-avatar {
  width: 80px;
  height: 80px;
  background-color: #1D1D1D;
  border-radius: 2px;
  border: 1px dashed #434343;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.upload-avatar:hover {
  border-color: $primary;
}

.avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
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