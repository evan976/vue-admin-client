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
        prop="count"
        label="文章数"
        width="180">
          <template slot-scope="scope">
            <el-tag
              type="success"
              size="mini"
              effect="dark">
              {{scope.row.count}}
              </el-tag>
          </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="220">
        <template slot-scope="scope">
          <el-tag
            @click="handleClick(scope.row)"
            type="primary"
            size="small"
            effect="plain"
            hit
          >
            <i class="el-icon-position"></i>
            查看
          </el-tag>
          <el-tag
            type="success"
            size="small"
            effect="plain"
            @click="showEditCategoryDialog(scope.row._id)"
            hit
          >
            <i class="el-icon-edit"></i>
            编辑
          </el-tag>
          <el-tag
            type="danger"
            size="small"
            effect="plain"
            @click="removeCategory(scope.row._id)"
            hit
          >
            <i class="el-icon-delete"></i>
            删除
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
        <el-form-item label="扩展" label-width="80px">
          <div
            class="category-extends"
            v-for="(item, index) in categoryModel.extend"
            :key="index"
          >
            <el-input
              v-model="item.label"
              class="extend-input"
              size="small"
              placeholder="label"
            ></el-input>
            <el-input
              v-model="item.value"
              class="extend-input"
              size="small"
              placeholder="value"
            ></el-input>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="categoryModel.extend.splice(index, 1)"
            ></el-button>
          </div>
          <el-button
            style="width: 100%"
            size="small"
            icon="el-icon-plus"
            @click="categoryModel.extend.push({})"
          >增加扩展</el-button>
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
  getCategory,
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
      params: {},
      categoryData: [],
      categoryModel: {
        extend: []
      },
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
      this.params.offset = val
      this.getCategoryData(this.params)
    },

    handleSizeChange (val) {
      this.params.limit = val
      this.getCategoryData(this.params)
    },

    async getCategoryData () {
      const { code, message, result: { data, pagination } } = await getCategoryList(this.params)
      this.categoryData = data
      this.pagination = pagination
      requestResultNotify(code, message)
    },

    async getCategory (id) {
      const { result } = await getCategory(id)
      this.categoryModel = result
      this.id = id
    },

    showAddCategoryDialog () {
      this.dialogFormVisible = true
      this.categoryModel = { extend: [] }
      this.id = ''
    },

    showEditCategoryDialog (id) {
      this.getCategory(id)
      this.dialogFormVisible = true
    },

    saveCategory (formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        if (!this.id) {
          const { code, message } = await createCategory(this.categoryModel)
          handleResultNotify(code, message)

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
.category-extends {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .extend-input {
    margin-right: 10px;
  }
}
</style>