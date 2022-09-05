<template>
  <div class="note-manage" v-loading="loading">
    <div class="select-box">
      <div>
        <span>类目：</span>
        <el-select
            v-model="category"
            placeholder="请选择"
            style="margin-right: 16px">
          <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
        <el-button
            type="primary"
            class="search-btn"
            @click="handleSearch">
          <span>搜索</span>
        </el-button>
        <el-button
            type="primary"
            class="search-btn"
            @click="handleReset">
          <span>重置</span>
        </el-button>
      </div>
      <div>
        <el-button
            type="primary"
            class="add-btn"
            @click="handleAddNote">
          <span>添加笔记</span>
        </el-button>
      </div>
    </div>
    <div class="notes-box">
      <el-table
          :data="tableList"
          height="calc(100vh - 320px)"
          ref="tableRef" border>
        <el-table-column
            v-for="item in tableColumnList"
            :key="item.prop"
            :label="item.label"
            :prop="item.prop"
            align="center"
            :width="item.width"
            show-overflow-tooltip>
          <template slot-scope="{ row }">
            <div v-if="item.prop === 'category_id'">
              <div class="el-tooltip cell no-padding">
                {{ row[item.prop] | categoryFilter(categoryList) }}
              </div>
            </div>
            <div v-else-if="item.prop === 'operation'">
              <el-button
                  type="text"
                  @click="handleUpdateItem(row)">
                <span>编辑</span>
              </el-button>
              <el-divider direction="vertical"/>
              <el-button
                  type="text"
                  @click="handleDeleteItem(row)">
                <span>删除</span>
              </el-button>
            </div>
            <div v-else class="el-tooltip cell no-padding">
              {{ row[item.prop] }}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :current-page="page"
          :page-size="size"
          :total="total"
          @current-change="handleChange">
      </el-pagination>
    </div>
    <notes-operation-dialog
        :visible.sync="visible"
        :title="title" :id="editId"
        @update-data="handleUpdateData"
    />
  </div>
</template>

<script>
import notesOperationDialog from "@/views/server/components/notes-operation-dialog";

export default {
  name: "NoteManage",
  components: {
    notesOperationDialog,
  },
  data() {
    const tableColumnList = [
      {label: 'ID', prop: 'id'},
      {label: '标题', prop: 'title'},
      {label: '简介', prop: 'introduction'},
      {label: '类目', prop: 'category_id'},
      {label: '操作', prop: 'operation'},
    ]
    return {
      category: '',
      categoryList: [],
      tableColumnList,
      tableList: [],
      page: 1,
      size: 10,
      total: 0,
      loading: false,
      title: '',
      visible: false,
      editId: 0
    }
  },
  filters: {
    categoryFilter(value, categoryList) {
      return categoryList.find(item => item.id === value).name
    }
  },
  methods: {
    handleUpdateData() {
      this.getNotes()
    },
    handleReset() {
      this.category = ''
      this.getNotes()
    },
    handleChange(value) {
      this.page = value
      this.getNotes()
    },
    async handleDeleteItem({id}) {
      try {
        await this.$confirm('此操作将永久删除该笔记，是否继续？', '提示', {type: 'warning'})
        const params = {id};
        await this.$api.server.deltNotes(params);
        this.$message.success('删除成功');
        await this.getNotes()
      } catch (e) {
        this.$message.info('取消删除');
      }
    },
    handleUpdateItem({id}) {
      this.editId = id
      this.title = '编辑笔记'
      this.visible = true
    },
    handleAddNote() {
      this.title = '添加笔记'
      this.visible = true
    },
    handleSearch() {
      this.getNotes()
    },
    async getNotes() {
      try {
        this.loading = true
        const params = {
          page: this.page,
          size: this.size,
          category: this.category
        }
        const resp = await this.$api.server.getNotes(params);
        if (resp.code === 1) {
          const data = resp.data
          this.tableList = data.notesList
          this.total = data.total
        } else {
          this.$message.error(resp.msg)
        }
      } catch (e) {
        this.$message.error('发生错误');
      } finally {
        this.loading = false
      }
    },
    async getCategory() {
      try {
        // this.loading = true
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
      } finally {
        // this.loading = false
      }
    },
  },
  created() {
    this.getNotes()
    this.getCategory()
  }
};
</script>

<style scoped lang="scss">
.select-box {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;

  .search-btn, .add-btn {
    background: #339999;
    border-color: #339999;
  }
}

.no-padding {
  padding: 0 !important;
}

.el-table {
  margin-bottom: 20px;

  .el-button {
    color: #339999;
  }
}

.el-pagination {
  text-align: right;
  position: relative;
}

::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #339999;
}

::v-deep .el-pagination__total {
  position: absolute;
  left: 0;
}
</style>
