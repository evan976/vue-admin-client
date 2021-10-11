<template>
  <el-row :gutter="16">
    <el-col :span="17">
      <el-card>
        <div slot="header" class="clearfix">
          <span>{{id ? '编辑文章' : '发表文章'}}</span>
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
                v-for="category in categoryData"
                :key="category._id"
                :label="category.name"
                :value="category._id"
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
        <el-select
          v-if="tagData.length > 0"
          v-model="articleModel.tags"
          style="width: 100%"
          size="small"
          multiple
          placeholder="请选择标签"
        >
          <el-option
            v-for="tag in tagData"
            :key="tag._id"
            :label="tag.name"
            :value="tag._id"
          ></el-option>
        </el-select>
      </el-card>
      <el-card class="thumb">
        <div slot="header" class="clearfix">
          <span>缩略图</span>
        </div>
        <el-upload
          class="upload-thumb"
          action="http://localhost:8000/api/private/v1/images/upload"
          :show-file-list="false">
          <img v-if="articleModel.thumb" :src="articleModel.thumb" class="article-image">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-divider />
        <el-input
          v-model="articleModel.thumb"
          size="small"
          placeholder="或者直接输入图片地址"
          prefix-icon="el-icon-link"
        >
        </el-input>
      </el-card>
      <el-card class="publish-options">
        <div slot="header" class="clearfix">
          <span>发布选项</span>
        </div>
        <el-form>
          <el-form-item label="文章状态">
            <el-select size="small" v-model="articleModel.state">
              <el-option
                v-for="state in articleState"
                :key="state.value"
                :label="state.label"
                :value="state.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章来源">
            <el-select size="small" v-model="articleModel.origin">
              <el-option
                v-for="origin in articleOrigin"
                :key="origin.value"
                :label="origin.label"
                :value="origin.value"
              ></el-option>
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
  getTagList,
  getArticle,
  createArticle,
  updateArticle
} from '@/request/api'
import { handleResultNotify } from '@/utils/notify'

export default {
  name: 'Editor',
  props: {
    id: {
      type: String
    }
  },

  components: {
    Markdown
  },
  data () {
    return {
      articleModel: {},
      tagData: [],
      categoryData: [],
      articleState: [
        { label: '暂存草稿', value: 0 },
        { label: '直接发布', value: 1 }
      ],
      articleOrigin: [
        { label: '原创', value: 0 },
        { label: '转载', value: 1 }
      ],
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

  computed: {
    
  },

  created () {
    this.id && this.getArticleDetail()
    this.initData()
  },

  methods: {

    async initData () {
      const { data: { categoryList } } = await getCategoryList()
      const { data: { tagList } } = await getTagList()
      this.categoryData = categoryList
      this.tagData = tagList
    },

    async getArticleDetail () {
      const { data: { result } } = await getArticle(this.id)
      this.articleModel = Object.assign({}, this.articleModel, result)
    },

    saveArticle (formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        if (!this.id) {
          const { code, message } = await createArticle(this.articleModel)
          handleResultNotify(code, message)
          this.$router.push('/article/list')
        } else {
          const { code, message } = await updateArticle(this.id, this.articleModel)
          handleResultNotify(code, message)
          this.getArticleDetail()
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