<template>
  <el-row :gutter="16">
    <el-col :span="17">
      <el-card>
        <div slot="header" class="clearfix">
          <span>发表文章</span>
        </div>
        <el-form label-width="80px">
          <el-form-item label="标题" prop="title">
            <el-input class="title" size="small" placeholder="文章标题"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="dscription">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="文章描述"
            ></el-input>
          </el-form-item>
          <el-form-item label="关键词" prop="keywords">
            <el-select
              class="keywords"
              size="small"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="输入关键词后回车"
            ></el-select>
          </el-form-item>
          <el-form-item label="分类" prop="category">
            <el-select
              size="small"
              class="category"
              placeholder="选择分类"
            ></el-select>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <article-content />
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="7">
      <el-card>
        <div slot="header" class="clearfix">
          <span>标签目录</span>
        </div>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="复选框 A"></el-checkbox>
          <el-checkbox label="复选框 B"></el-checkbox>
          <el-checkbox label="复选框 C"></el-checkbox>
        </el-checkbox-group>
      </el-card>
      <el-card class="thumb">
        <div slot="header" class="clearfix">
          <span>缩略图</span>
        </div>
        <el-upload
          class="upload-thumb"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false">
          <img v-if="imageUrl" :src="imageUrl" class="article-image">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-divider />
        <el-input
          size="small"
          placeholder="或者直接输入图片地址"
          prefix-icon="el-icon-link">
        </el-input>
      </el-card>
      <el-card class="publish-options">
        <div slot="header" class="clearfix">
          <span>发布选项</span>
        </div>
        <el-form>
          <el-form-item label="文章状态">
            <el-select size="small">
              <el-option label="草稿" value="draft"></el-option>
              <el-option label="发布" value="published"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章来源">
            <el-select size="small">
              <el-option label="原创" value="draft"></el-option>
              <el-option label="转载" value="published"></el-option>
            </el-select>
          </el-form-item>
          <el-divider />
          <el-form-item>
            <el-button class="publish-btn" type="primary" size="small" icon="el-icon-check">提交</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import ArticleContent from '@/components/Meditor'

export default {
  name: 'Editor',
  components: {
    ArticleContent
  },
  data () {
    return {
      checkList: ['选中且禁用','复选框 A']
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.title, .category {
  width: 50%;
}

.keywords {
  width: 100%;
}

.thumb, .publish-options {
  margin-top: 20px;
}

.upload-thumb {
  width: 100%;
  height: 120px;
  background-color: #1D1D1D;
  border-radius: 2px;
  border: 1px dashed #434343;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.upload-thumb:hover {
  border-color: $primary;
}

.avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  width: 305px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.article-image {
  width: 305px;
  height: 120px;
  display: block;
}

.publish-btn {
  width: 100%;
}
</style>