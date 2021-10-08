<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>标签列表</span>
      <el-button
        style="float: right;"
        type="primary"
        size="mini"
        icon="el-icon-plus"
        @click="dialogFormVisible = true"
      >
        新增标签
      </el-button>
    </div>
    <el-table :data="tagData">
      <el-table-column
        prop="id"
        label="ID"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="250">
      </el-table-column>
      <el-table-column
        prop="slug"
        label="别名"
        width="250">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
      </el-table-column>
      <el-table-column
        label="操作"
        width="220">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      width="35%"
      title="新增标签"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="tagModel" :rules="rules" ref="ruleForm">
        <el-form-item label="名称" prop="name" label-width="80px">
          <el-input
            v-model="tagModel.name"
            size="small"
            placeholder="请输入标签名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="别名" prop="slug" label-width="80px">
          <el-input
            v-model="tagModel.slug"
            size="small"
            placeholder="请输入标签别名"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description" label-width="80px">
          <el-input
            v-model="tagModel.description"
            size="small"
            type="textarea"
            :rows="2"
            placeholder="请输入标签描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addTag('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { getTagList } from '@/request/api'

export default {
  name: 'Tag',
  data () {
    return {
      tagData: [],
      tagModel: {},
      dialogFormVisible: false,
      rules: {
        name: [
          { required: true, message: '标签名称不能为空', trigger: 'blur' }
        ],
        slug: [
          { required: true, message: '标签别名不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '标签描述不能为空', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.getTagData()
  },

  methods: {

    async getTagData () {
      const { message, data: { tagList } } = await getTagList()
      this.tagData = tagList
      this.$notify({
        type: 'success',
        title: '数据请求成功',
        message
      })
    },

    addTag (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          this.$notify({
            type: 'success',
            title: '新增标签成功'
          })
        } else {
          this.$notify({
            type: 'error',
            title: '新增标签失败'
          })
        }
      })
    }
  }
}
</script>

<style>

</style>