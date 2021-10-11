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
        <el-form-item label="关键词" label-width="100px" prop="keywords">
          <el-select
            v-model="optionsModel.keywords"
            clearable
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="输入关键词后回车添加"
            style="width: 50%"
          >
            <el-option
              v-for="(item, index) in optionsModel.keywords"
              :key="item + index"
              :label="item"
              :value="index"
            ></el-option>
          </el-select>
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
          <el-button
            type="primary"
            size="small"
            icon="el-icon-check"
            @click="updateSiteOptions"
          >保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-card>
</template>

<script>
import { getSiteOptions, updateSiteOptions } from '@/request/api'
import { requestResultNotify, handleResultNotify } from '@/utils/notify'

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
      const { code, message, data: { result }} = await getSiteOptions()
      this.optionsModel = result
      requestResultNotify(code, message)
    },

    async updateSiteOptions () {
      const { code, message } = await updateSiteOptions(this.optionsModel)
      handleResultNotify(code, message)
      this.getSiteOptions()
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