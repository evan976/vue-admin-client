<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>站点设置</span>
    </div>
    <el-card>
      <el-form :model="optionsModel">
        <el-form-item label="网站标题" label-width="100px">
          <el-input
            v-model="optionsModel.title"
            class="title"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="网站副标题" label-width="100px">
          <el-input
            v-model="optionsModel.sub_title"
            class="sub-title"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="网站地址" label-width="100px">
          <el-input
            v-model="optionsModel.site_url"
            class="site-address"
            size="small"
            prefix-icon="el-icon-link"
          ></el-input>
        </el-form-item>
        <el-form-item label="关键词" label-width="100px">
          <el-input class="site-keywords" size="small"></el-input>
        </el-form-item>
        <el-form-item label="ICP备案号" label-width="100px">
          <el-input
            v-model="optionsModel.site_icp"
            class="icp"
            size="small"
            prefix-icon="el-icon-key"
          ></el-input>
        </el-form-item>
        <el-form-item label="站点描述" label-width="100px">
          <el-input
            v-model="optionsModel.description"
            class="site-desc"
            size="small"
            type="textarea"
            :rows="4"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" size="small" icon="el-icon-check">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-card>
</template>

<script>
import { getSiteOptions } from '@/request/api'

export default {
  name: 'Option',
  data () {
    return {
      optionsModel: {}
    }
  },
  created () {
    this.getSiteOptions()
  },
  methods: {
    async getSiteOptions () {
      const { message, data: { result }} = await getSiteOptions()
      this.optionsModel = result
      this.$notify({
        type: 'success',
        title: '成功',
        message
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title,
.sub-title,
.site-address,
.site-keywords,
.site-desc,
.icp {
  width: 50%;
}
</style>