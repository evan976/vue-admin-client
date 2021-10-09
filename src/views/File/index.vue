<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>文件管理</span>
      <el-button
        style="float: right;"
        type="primary"
        size="mini"
        icon="el-icon-plus"
      >上传图片</el-button>
    </div>
    <div class="image-preview">
      <el-image
        class="image-item"
        v-for="image in imageData"
        :key="image.key"
        :src="image.url"
        @click="showImageDetial(image)"
      >
        <i class="el-icon-delete"></i>
      </el-image>
    </div>
    <el-dialog
      title="文件信息"
      :visible.sync="dialogVisible"
      width="35%"
    >
      <p class="col">文件名：<span>{{imageDetial.key}}</span></p>
      <p class="col">文件类型：<span>{{imageDetial.type}}</span></p>
      <p class="col">永久地址：<span>{{imageDetial.url}}</span></p>
    </el-dialog>
  </el-card>
</template>

<script>
import { getImageList } from '@/request/api'
import { requestResultNotify } from '@/utils/notify'

export default {
  name: 'File',
  data () {
    return {
      imageData: [],
      imageDetial: {},
      dialogVisible: false
    }
  },

  created () {
    this.getImageData()
  },

  methods: {
    async getImageData () {
      const { code, message, data: { result } } = await getImageList()
      this.imageData = result
      requestResultNotify(code, message)
    },

    showImageDetial (image) {
      this.imageDetial = image
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.image-item {
  margin: 10px;
  border: 1px dashed $grey;
  height: 120px;
  width: auto;
  cursor: pointer;
  &:hover {
    border-color: $primary;
  }
}

.col {
  margin: 0 0 20px 0;
}
</style>