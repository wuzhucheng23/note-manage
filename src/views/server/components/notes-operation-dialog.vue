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
          <el-form-item label="标题：" prop="title">
            <el-input
                v-model="form.title"
                placeholder="请输入标题"
                clearable
            />
          </el-form-item>
          <el-form-item label="简介：" prop="introduction">
            <el-input
                v-model="form.introduction"
                placeholder="请输入简介"
                clearable
            />
          </el-form-item>
          <el-form-item label="类目：" prop="category">
            <el-select v-model="form.category" placeholder="请选择">
              <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
              prop="content"
              label="内容：">
            <quill-editor
                ref="myQuillEditor"
                v-model="form.content"
                class="editor"
                :options="editorOption"
            />
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
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
      ['blockquote', 'code-block'], // 引用 代码块
      [{header: 1}, {header: 2}], // 1、2 级标题
      [{list: 'ordered'}, {list: 'bullet'}], // 有序、无序列表
      [{script: 'sub'}, {script: 'super'}], // 上标/下标
      [{indent: '-1'}, {indent: '+1'}], // 缩进
      [{size: ['small', false, 'large', 'huge']}], // 字体大小
      [{header: [1, 2, 3, 4, 5, 6, false]}], // 标题
      [{color: []}, {background: []}], // 字体颜色、字体背景颜色
      [{font: []}], // 字体种类
      [{align: []}], // 对齐方式
      ['clean'], // 清除文本格式
    ]
    const rules = {
      title: [
        {required: true, trigger: 'blur', message: '不能为空'},
      ],
      introduction: [
        {required: true, trigger: 'blur', message: '不能为空'},
      ],
      category: [
        {required: true, trigger: 'blur', message: '不能为空'},
      ],
      content: [
        {required: true, trigger: 'blur', message: '不能为空'},
      ],
    }
    return {
      form: {
        title: '',
        introduction: '',
        category: '',
        content: ''
      },
      rules,
      categoryList: [],
      editorOption: { // 编辑框操作事件
        theme: 'snow', // or 'bubble'
        placeholder: '您想发布点什么？',
        modules: {
          toolbar: {
            container: toolbarOptions,
          }
        }
      }
    }
  },
  methods: {
    init() {
      this.getCategory()
      if (this.title === '编辑笔记') this.getNoteDetail()
    },
    handleClose() {
      this.form = {
        title: '',
        introduction: '',
        category: '',
        content: ''
      },
          this.$emit('update:visible', false);
      return false;
    },
    async handleConfirm() {
      if (this.title === '添加笔记') await this.handleAdd()
      else await this.handleEdit()
      this.$emit('update-data', false);
      this.handleClose();
    },
    async getNoteDetail() {
      try {
        this.loading = true
        const params = {
          id: this.id
        }
        const resp = await this.$api.client.getNoteDetail(params);
        if (resp.code === 1) {
          const data = resp.data.notes
          this.form.title = data.title
          this.form.introduction = data.introduction
          this.form.category = data.category_id
          this.form.content = data.content
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
        const res = await this.$api.server.addNotes(params)
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
        const res = await this.$api.server.editNotes(params)
        if (res.code === 1) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      } catch (e) {
        this.$message.error('发生错误')
      }
    },
    async getCategory() {
      try {
        const params = {}
        const resp = await this.$api.server.getCategoryList(params);
        if (resp.code === 1) {
          const data = resp.data
          this.categoryList = data.categoryList
        } else {
          this.$message.error(resp.msg)
        }
      } catch (e) {
        this.$message.error('发生错误');
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
