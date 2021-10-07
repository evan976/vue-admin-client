<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>文章列表</span>
      <el-button style="float: right;" type="primary" size="mini" icon="el-icon-plus">发表文章</el-button>
    </div>
    <el-table :data="articleData">
      <el-table-column
        prop="id"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="thumb"
        label="缩略图"
        width="140">
      </el-table-column>
      <el-table-column
        prop="category"
        label="归类"
        width="120">
      </el-table-column>
      <el-table-column
        prop="views"
        label="浏览量"
        width="120">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="datetime"
        label="时间"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'ArticleList',
  data () {
    return {
      articleData: []
    }
  }
}
</script>

<style>

</style>