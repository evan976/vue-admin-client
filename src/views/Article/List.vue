<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>文章列表</span>
      <el-button
        style="float: right;"
        type="primary"
        size="mini"
        icon="el-icon-plus"
        @click="$router.push('/article/edit')"
      >
        发表文章
      </el-button>
    </div>
    <el-table :data="articleData">
      <el-table-column
        prop="id"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
      >
        <template slot-scope="scope">
          <img class="article-img" :src="scope.row.thumb" />
          <div class="article-title">{{scope.row.title}}</div>
          <div class="article-desc">{{scope.row.description}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="category.name"
        label="归类"
        width="140"
      >
        <template slot-scope="scope">
          <div class="category">
            <i class="el-icon-folder-opened"></i>
            {{scope.row.category.name}}
          </div>
          <div class="tags">
            <el-tag
              v-for="item in scope.row.tags"
              :key="item._id"
              size="small"
            >
              <i class="el-icon-price-tag"></i>
              {{item.name}}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="关注"
        width="160"
      >
        <template slot-scope="scope">
          <div class="views">
            <i class="el-icon-view"></i>
            <span style="margin-left: 5px;">浏览 {{scope.row.meta.views}} 次</span>
          </div>
          <div class="comment">
            <i class="el-icon-chat-dot-round"></i>
            <span style="margin-left: 5px;">评论 {{scope.row.meta.comments}} 次</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        width="140"
      >
        <template slot-scope="scope">
          <el-tag
            size="small"
            :type="scope.row.state === 1 ? 'success' : 'warning'"
            disable-transitions
            effect="plain"
          >
            <i :class="scope.row.state === 1 ? 'el-icon-check' : 'el-icon-edit'"></i>
            {{scope.row.state === 1 ? '已发布' : '草稿'}}
          </el-tag>
          <el-tag
            size="small"
            :type="scope.row.origin === 0 ? 'success' : 'danger'"
            disable-transitions
            effect="plain"
          >
            <i :class="scope.row.state === 0 ? 'el-icon-edit-outline' : 'el-icon-document-copy'"></i>
            {{scope.row.origin === 0 ? '原创' : '转载'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="时间"
        width="260"
      >
        <template slot-scope="scope">
          <div>最早发布：{{scope.row.created_at | dateFormat}}</div>
          <div>最后更新：{{scope.row.updated_at | dateFormat}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="140">
        <template slot-scope="scope">
          <el-tag @click="handleClick(scope.row)" type="primary" size="small" effect="plain" hit>
            <i class="el-icon-position"></i>
            查看
          </el-tag>
          <el-tag type="success" size="small" effect="plain" hit>
            <i class="el-icon-edit"></i>
            编辑
          </el-tag>
          <el-tag type="danger" size="small" effect="plain" hit>
            <i class="el-icon-delete"></i>
            删除
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pagination.limit"
      :current-page="pagination.offset"
      :total="pagination.total">
    </el-pagination>
  </el-card>
</template>

<script>
import dayjs from 'dayjs'
import { getArticleList } from '@/request/api'

export default {
  name: 'ArticleList',
  filters: {
    dateFormat: function (date) {
      return dayjs(date).format('YYYY-MM-DD HH:mm')
    }
  },

  data () {
    return {
      articleData: [],
      pagination: {}
    }
  },

  created () {
    this.getArticleData()
  },

  methods: {
    async getArticleData () {
      const { message, data: { articleList, pagination } } = await getArticleList()
      console.log(pagination)
      this.articleData = articleList
      this.pagination = pagination
      this.$notify({
        type: 'success',
        title: '数据请求成功',
        message
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.article-img {
  width: 120px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto 0;
  opacity: .2;
}

.article-title {
  color: #333;
  font-size: 16px;
  font-weight: 500;
}

.article-desc {
  margin-top: 10px;
  font-size: 12px;
}
</style>