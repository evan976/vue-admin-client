<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>分类列表</span>
      <el-button
        style="float: right;" 
        type="primary"
        size="mini"
        icon="el-icon-plus"
        @click="showAddCategoryDialog"
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
        label="操作"
        width="160">
        <template slot-scope="scope">
          <el-tag
            @click="handleClick(scope.row)"
            type="primary"
            size="small"
            effect="plain"
            hit
          >
            <i class="el-icon-position"></i>
            宿主页面
          </el-tag>
          <el-tag
            type="success"
            size="small"
            effect="plain"
            @click="showEditCategoryDialog(scope.row)"
            hit
          >
            <i class="el-icon-edit"></i>
            编辑分类
          </el-tag>
          <el-tag
            type="danger"
            size="small"
            effect="plain"
            @click="removeCategory(scope.row._id)"
            hit
          >
            <i class="el-icon-delete"></i>
            回收站
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="pagination.offset"
      :page-size="pagination.limit"
      :total="pagination.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>

    <el-dialog
      width="35%"
      :title="id ? '编辑分类': '新增分类'"
      :visible.sync="dialogFormVisible"
    >
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
        <el-form-item label="描述" label-width="80px">
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
        <el-button size="small" type="primary" @click="saveCategory('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import {
  getCategoryList,
  createCategory,
  updateCategory,
  removeCategory
} from '@/request/api'

import { requestResultNotify, handleResultNotify } from '@/utils/notify'

export default {
  name: 'Category',
  data () {
    return {
      id: '',
      categoryData: [],
      categoryModel: {},
      pagination: {},
      dialogFormVisible: false,
      rules: {
        name: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' }
        ],
        slug: [
          { required: true, message: '分类别名不能为空', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.getCategoryData()
  },

  methods: {

    handleCurrentChange (val) {
      console.log(val)
    },

    handleSizeChange (val) {
      console.log(val)
    },

    async getCategoryData () {
      const { code, message, data: { categoryList, pagination } } = await getCategoryList()
      this.categoryData = categoryList
      this.pagination = pagination
      requestResultNotify(code, message)
    },

    showAddCategoryDialog () {
      this.dialogFormVisible = true
      this.categoryModel = {}
      this.id = ''
    },

    showEditCategoryDialog (category) {
      this.dialogFormVisible = true
      this.categoryModel = category
      this.id = category._id
    },

    saveCategory (formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        if (!this.id) {
          const { code, message } = await createCategory(this.categoryModel)
          handleResultNotify(code, message)
          this.categoryModel = {}

        } else {
          const { code, message } = await updateCategory(this.id, this.categoryModel)
          handleResultNotify(code, message)
        }
        this.getCategoryData()
        this.dialogFormVisible = false
      })
    },

    removeCategory (id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          const { code, message } = await removeCategory(id)
          handleResultNotify(code, message)
          this.getCategoryData()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>