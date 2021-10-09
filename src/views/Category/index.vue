<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>分类列表</span>
      <el-button
        style="float: right;" 
        type="primary"
        size="mini"
        icon="el-icon-plus"
        @click="dialogFormVisible = true"
      >
        新增分类
      </el-button>
    </div>
    <el-table :data="categoryData">
      <el-table-column
        prop="id"
        label="ID"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="220">
      </el-table-column>
      <el-table-column
        prop="slug"
        label="别名"
        width="220">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="nums"
        label="文章"
      >
        <template slot-scope="scope">
          <i class="el-icon-document"></i>
          文章 {{scope.row.nums || 0}} 篇
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-tag @click="handleClick(scope.row)" type="primary" size="small" effect="plain" hit>
            <i class="el-icon-position"></i>
            宿主页面
          </el-tag>
          <el-tag type="success" size="small" effect="plain" hit>
            <i class="el-icon-edit"></i>
            编辑分类
          </el-tag>
          <el-tag type="danger" size="small" effect="plain" hit>
            <i class="el-icon-delete"></i>
            回收站
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="10">
    </el-pagination>

    <el-dialog width="35%" title="新增分类" :visible.sync="dialogFormVisible">
      <el-form
        :model="categoryModel"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="名称" prop="name" label-width="80px">
          <el-input
            v-model="categoryModel.name"
            size="small"
            placeholder="请输入分类名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="别名" prop="slug" label-width="80px">
          <el-input
            v-model="categoryModel.slug"
            size="small"
            placeholder="请输入分类别名"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description" label-width="80px">
          <el-input
            v-model="categoryModel.description"
            size="small"
            type="textarea"
            :rows="2"
            placeholder="请输入分类描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addCategory('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { getCategoryList } from '@/request/api'

export default {
  name: 'Category',
  data () {
    return {
      categoryData: [],
      categoryModel: {},
      dialogFormVisible: false,
      rules: {
        name: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' }
        ],
        slug: [
          { required: true, message: '分类别名不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '分类描述不能为空', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.getCategoryData()
  },

  methods: {
    async getCategoryData () {
      const { message, data: { categoryList } } = await getCategoryList()
      this.categoryData = categoryList
      this.$notify({
        type: 'success',
        title: '数据请求成功',
        message
      })
    },

    addCategory (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          this.$notify({
            type: 'success',
            title: '新增分类成功'
          })
        } else {
          this.$notify({
            type: 'error',
            title: '新增分类失败'
          })
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>