<template>
  <div class="category-manage" v-loading="loading">
    <div class="add-btn">
      <el-button type="primary" @click="handleAdd">添加类目</el-button>
    </div>
    <el-table :data="tableList" height="calc(100vh - 320px)" ref="tableRef" border>
      <el-table-column
          v-for="item in tableColumnList"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          align="center"
          :width="item.width"
          show-overflow-tooltip>
        <template slot-scope="{ row }">
          <div v-if="item.prop === 'operation'">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="handleDel(row)">删除</el-button>
          </div>
          <div v-else class="el-tooltip cell no-padding">{{ row[item.prop] }}</div>
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
    <category-operation-dialog
        :visible.sync="visible"
        :title="title"
        :id="editId"
        @update-data="handleUpdateData"
    />
  </div>
</template>

<script>
import CategoryOperationDialog from './category-operation-dialog'

export default {
  name: "CategoryManage",
  components: {
    CategoryOperationDialog,
  },
  data() {
    const tableColumnList = [
      {label: 'ID', prop: 'id'},
      {label: '名称', prop: 'name'},
      {label: '排序', prop: 'index'},
      {label: '操作', prop: 'operation'},
    ]
    const tableList = [
      {
        id: 1,
        name: '标题1',
        index: '1',
      }
    ]
    return {
      tableColumnList,
      tableList,
      page: 1,
      size: 10,
      total: 0,
      loading: false,
      visible: false,
      title: '',
      editId: 0
    }
  },
  methods: {
    handleUpdateData() {
      this.getCategory()
    },
    handleAdd() {
      this.title = '添加类目'
      this.visible = true
    },
    handleEdit({id}) {
      this.editId = id
      this.title = '编辑类目'
      this.visible = true
    },
    async handleDel({id}) {
      try {
        await this.$confirm('此操作将永久删除该类目，是否继续？', '提示', {type: 'warning'})
        const params = {id};
        await this.$api.server.delCategory(params);
        this.$message.success('删除成功');
        await this.getCategory();
      } catch (e) {
        this.$message.info('取消删除');
      }
    },
    handleChange(value) {
      this.page = value
      this.getCategory()
    },
    async getCategory() {
      try {
        this.loading = true
        const params = {
          page: this.page,
          size: this.size
        }
        const resp = await this.$api.server.getCategory(params);
        if (resp.code === 1) {
          const data = resp.data
          this.tableList = data.categoryList.sort((x, y) => x.index - y.index)
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
  },
  created() {
    this.getCategory()
  }
};
</script>

<style scoped lang="scss">
.add-btn {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;

  .el-button {
    background: #339999;
    border-color: #339999;
  }
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
