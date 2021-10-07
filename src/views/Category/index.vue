<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>分类列表</span>
      <el-button style="float: right;" type="primary" size="mini" icon="el-icon-plus">新增分类</el-button>
    </div>
    <el-table :data="categoryData">
      <el-table-column
        prop="id"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="slug"
        label="别名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="nums"
        label="文章"
        width="120"
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
  name: 'Category',
  data () {
    return {
      categoryData: []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>