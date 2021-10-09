<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>标签列表</span>
      <el-button
        style="float: right;"
        type="primary"
        size="mini"
        icon="el-icon-plus"
        @click="showAddTagDialog"
      >
        新增标签
      </el-button>
    </div>
    <el-tag
      v-for="tag in tagData"
      :key="tag._id"
      closable
      @close="removeTag(tag._id)"
      @click="showEditDialog(tag._id)"
      hit
    >
      <i class="el-icon-price-tag"></i>
      {{tag.name}}
    </el-tag>
    <el-dialog
      width="35%"
      :title="id ? '编辑标签' : '新增标签'"
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
        <el-form-item label="描述" label-width="80px">
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
        <el-button size="small" type="primary" @click="saveTag('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import {
  getTagList,
  getTag,
  createTag,
  updateTag,
  removeTag
} from '@/request/api'
import { requestResultNotify, handleResultNotify } from '@/utils/notify'

export default {
  name: 'Tag',
  data () {
    return {
      id: '',
      tagData: [],
      tagModel: {},
      dialogFormVisible: false,
      rules: {
        name: [
          { required: true, message: '标签名称不能为空', trigger: 'blur' }
        ],
        slug: [
          { required: true, message: '标签别名不能为空', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.getTagData()
  },

  methods: {

    async getTagData () {
      const { code, message, data: { tagList } } = await getTagList()
      this.tagData = tagList
      requestResultNotify(code, message)
    },

    saveTag (formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        if (this.id) {
          const { code, message } = await updateTag(this.id, this.tagModel)
          handleResultNotify(code, message)
        } else {
          const { code, message } = await createTag(this.tagModel)
          handleResultNotify(code, message)
          this.tagModel = {}
        }
        this.getTagData()
        this.dialogFormVisible = false
      })
    },

    async showEditDialog (id) {
      const { data: { result } } = await getTag(id)
      this.tagModel = result
      this.id = result._id
      this.dialogFormVisible = true
    },

    async showAddTagDialog () {
      this.dialogFormVisible = true
      this.tagModel = {}
      this.id = ''
    },

    removeTag (id) {
      this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          const { code, message } = await removeTag(id)
          handleResultNotify(code, message)
          this.getTagData()
        })
    }
  }
}
</script>
