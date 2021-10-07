<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>站点设置</span>
    </div>
    <el-card>
      <el-form>
        <el-form-item label="网站标题" label-width="100px">
          <el-input class="title" size="small"></el-input>
        </el-form-item>
        <el-form-item label="网站副标题" label-width="100px">
          <el-input class="sub-title" size="small"></el-input>
        </el-form-item>
        <el-form-item label="关键词" label-width="100px">
          <el-input class="site-keywords" size="small"></el-input>
        </el-form-item>
        <el-form-item label="站点描述" label-width="100px">
          <el-input class="site-desc" size="small" type="textarea" :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="ICP备案号" label-width="100px">
          <el-input class="icp" size="small"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" size="small" icon="el-icon-check">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-card>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.title, .sub-title, .site-keywords, .site-desc, .icp {
  width: 50%;
}
</style>