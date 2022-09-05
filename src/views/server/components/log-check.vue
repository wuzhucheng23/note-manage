<template>
  <div class="log-check" v-loading="loading">
    <el-table
        :data="tableList"
        height="calc(100vh - 260px)"
        ref="tableRef"
        border>
      <el-table-column
          v-for="item in tableColumnList"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          align="center"
          :width="item.width"
          show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :current-page="page"
        :page-size="size"
        @current-change="handleChange"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "LogCheck",
  data() {
    const tableColumnList = [
      {label: '时间', prop: 'time'},
      {label: '操作', prop: 'handle'},
    ]
    return {
      tableColumnList,
      tableList: [],
      page: 1,
      size: 10,
      total: 0,
      loading: false
    }
  },
  methods: {
    handleChange(value) {
      this.page = value
      this.getLogs()
    },
    async getLogs() {
      try {
        this.loading = true
        const params = {
          page: this.page,
          size: this.size
        }
        const resp = await this.$api.server.getLogs(params);
        if (resp.code === 1) {
          const data = resp.data
          this.tableList = data.logList
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
    this.getLogs()
  }
};
</script>

<style scoped lang="scss">
.el-table {
  margin-bottom: 20px;
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
