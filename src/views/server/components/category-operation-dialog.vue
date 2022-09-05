<template>
  <div class="notes-operation-dialog">
    <el-dialog
        :title="title"
        :visible.sync="visible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :before-close="handleClose"
        width="800px"
        @open="init">
      <div class="dialog-container">
        <el-form
            :model="form"
            :rules="rules"
            label-width="80px"
            ref="formRef">
          <el-form-item label="名称：" prop="title">
            <el-input v-model="form.name" placeholder="请输入名称" clearable/>
          </el-form-item>
          <el-form-item label="排序：" prop="instruction">
            <el-input v-model="form.index" placeholder="请输入排序" clearable/>
          </el-form-item>
        </el-form>
      </div>
      <template slot="footer">
        <el-button type="plain" @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "NotesOperationDialog",
  props: {
    visible: {
      type: Boolean,
      default: () => false
    },
    title: {
      type: String,
      default: () => '请输入标题'
    },
    id: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    const rules = {
      name: [
        {required: true, trigger: 'blur', message: '不能为空'},
      ],
      index: [
        {required: true, trigger: 'blur', message: '不能为空'},
      ],
    }
    return {
      form: {
        name: '',
        index: ''
      },
      rules,
    }
  },
  methods: {
    init() {
      if (this.title === '编辑类目') this.getCategoryDetail()
    },
    handleClose() {
      this.form = {
        name: '',
        index: ''
      },
          this.$emit('update:visible', false);
      return false;
    },
    async handleConfirm() {
      if (this.title === '添加类目') await this.handleAdd()
      else await this.handleEdit()
      this.$emit('update-data', false);
      this.handleClose();
    },
    async getCategoryDetail() {
      try {
        this.loading = true
        const params = {id: this.id}
        const resp = await this.$api.server.getCategoryDetail(params);
        if (resp.code === 1) {
          const data = resp.data.category
          this.form.name = data.name
          this.form.index = data.index
        } else {
          this.$message.error(resp.msg)
        }
      } catch (e) {
        this.$message.error('发生错误');
      } finally {
        this.loading = false
      }
    },
    async handleAdd() {
      try {
        const params = this.form
        const res = await this.$api.server.addCategory(params)
        if (res.code === 1) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      } catch (e) {
        this.$message.error('发生错误')
      }
    },
    async handleEdit() {
      try {
        const params = this.form
        params.id = this.id
        const res = await this.$api.server.editCategory(params)
        if (res.code === 1) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      } catch (e) {
        this.$message.error('发生错误')
      }
    },
  },
}
</script>

<style scoped lang="scss">
.el-upload {
  border: 1px solid #eeeeee;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid #eeeeee;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-select {
  width: 100%;
}

::v-deep .ql-editor {
  min-height: 300px;
}
</style>
