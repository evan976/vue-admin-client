<template>
  <div class="search-wrapper">
    <el-input
      v-model="params.keyword"
      size="small"
      placeholder="输入关键词搜索"
      style="width: 15%; margin-right: 10px"
      prefix-icon="el-icon-search"
    >
    </el-input>

    <el-select
      size="small"
      v-model="params.category"
      style="margin-right: 10px"
      placeholder="选择分类搜索"
    >
      <el-option
        v-for="category in categoryData"
        :key="category._id"
        :label="category.name"
        :value="category._id"
      ></el-option>
    </el-select>

    <el-select
      size="small"
      v-model="params.tags"
      style="margin-right: 10px"
      placeholder="选择标签搜索"
    >
      <el-option
        v-for="tag in tagData"
        :key="tag._id"
        :label="tag.name"
        :value="tag._id"
      ></el-option>
    </el-select>

    <div class="search-btn">
      <el-button
        size="small"
        type="primary"
        @click="getArticleData(params)"
      >
        搜索
      </el-button>
      <el-button size="small" @click="handleReset">重置并刷新</el-button>
    </div>
  </div>
</template>

<script>
import { getCategoryList, getTagList } from '@/request/api'

export default {
  name: 'Search',

  props: {
    getArticleData: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      params: {},
      categoryData: [],
      tagData: []
    }
  },

  created () {
    this.initData()
  },

  methods: {
    async initData () {
      const { result: { data } } = await getCategoryList()
      const { result } = await getTagList()
      this.categoryData = data
      this.tagData = result
    },

    handleReset () {
      this.params = {}
      this.getArticleData(this.params)
    }
  }

}
</script>

<style lang="scss" scoped>
.search-btn {
  margin-top: 10px;
}
</style>