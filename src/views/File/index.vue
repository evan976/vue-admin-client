<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>文件管理</span>
      <el-button style="float: right;" type="primary" size="mini" icon="el-icon-plus">上传图片</el-button>
    </div>
    <div class="image-preview">
      <el-image 
        style="width: 100px; height: 100px"
        :src="url" 
        :preview-src-list="srcList">
      </el-image>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'file',
  data () {
      return {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ]
      }
    }
}
</script>

<style>

</style>