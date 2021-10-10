<template>
  <el-row :gutter="16">
    <el-col :span="17">
      <el-card>
        <div slot="header" class="clearfix">
          <span>发表文章</span>
        </div>
        <el-form
          :model="articleModel"
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
        >
          <el-form-item label="标题" prop="title">
            <el-input
              v-model="articleModel.title"
              class="title"
              size="small"
              placeholder="文章标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input
              v-model="articleModel.description"
              type="textarea"
              :rows="4"
              placeholder="文章描述"
            ></el-input>
          </el-form-item>
          <el-form-item label="关键词" prop="keywords">
            <el-select
              v-model="articleModel.keywords"
              class="keywords"
              size="small"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="输入关键词后回车"
            >
            </el-select>
          </el-form-item>
          <el-form-item label="分类" prop="category">
            <el-select
              size="small"
              class="category"
              placeholder="选择分类"
              v-model="articleModel.category"
            >
              <el-option
                v-for="item in categoryData"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <Markdown v-model="articleModel.content" />
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="7">
      <el-card>
        <div slot="header" class="clearfix">
          <span>标签目录</span>
        </div>
        <el-checkbox-group v-model="articleModel.tags">
          <el-checkbox
            v-for="tag in tagData"
            :key="tag._id"
            :label="tag.name">
              {{tag.name}}
            </el-checkbox>
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
          prefix-icon="el-icon-link"
          v-model="articleModel.thumb"
        >
        </el-input>
      </el-card>
      <el-card class="publish-options">
        <div slot="header" class="clearfix">
          <span>发布选项</span>
        </div>
        <el-form
          :model="articleModel"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item label="文章状态" prop="state">
            <el-select size="small" v-model="articleModel.state">
              <el-option label="草稿" value="0"></el-option>
              <el-option label="发布" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章来源" prop="origin">
            <el-select size="small" v-model="articleModel.origin">
              <el-option label="原创" value="0"></el-option>
              <el-option label="转载" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-divider />
          <el-form-item>
            <el-button
              class="publish-btn"
              type="primary"
              size="small"
              icon="el-icon-check"
              @click="saveArticle('ruleForm')"
            >
              提交
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import Markdown from 'vue-meditor'
import {
  getCategoryList,
  getTagList
} from '@/request/api'

export default {
  name: 'Editor',
  components: {
    Markdown
  },
  data () {
    return {
      imageUrl: '',
      articleModel: {
        tags: []
      },
      tagData: [],
      categoryData: [],
      rules: {
        title: [
          { required: true, message: '文章标题不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '文章简介不能为空', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择一个分类目录', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '文章内容不能为空', trigger: 'blur' }
        ],
      }
    }
  },

  created () {
    this.initData()
  },

  methods: {

    async initData () {
      const { data: { categoryList } } = await getCategoryList()
      const { data: { tagList } } = await getTagList()
      this.categoryData = categoryList
      this.tagData = tagList
    },

    saveArticle (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$notify({
            type: 'success',
            message: '文章发布成功'
          })
        } else {
          this.$notify({
            type: 'danger',
            message: '文章发布失败'
          })
        }
      })
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
  border-radius: 2px;
  border: 1px dashed $border;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all .3s;
}

.upload-thumb:hover {
  border-color: $primary;
}

.avatar-uploader-icon {
  font-size: 20px;
  color: $grey;
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