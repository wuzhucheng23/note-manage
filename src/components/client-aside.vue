<template>
  <div class="client-aside">
    <el-menu
        router
        :default-active="'/client/list/' + defaultActive"
        background-color="#339999"
        text-color="#fff"
        active-text-color="#f6c15f">
      <el-menu-item
          v-for="item in list"
          :key="item.id"
          :index="'/client/list/' + item.name">
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "ClientAside",
  data() {
    return {
      list: [],
      defaultActive: ''
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    async getCategory() {
      try {
        const params = {}
        const resp = await this.$api.server.getCategoryList(params);
        if (resp.code === 1) {
          const data = resp.data
          this.list = data.categoryList.sort((x, y) => x.index - y.index)
          if (data.categoryList > 0) this.defaultActive = data.categoryList[0].name
        } else {
          // this.$message.error(resp.msg)
        }
      } catch (e) {
        this.$message.error('发生错误');
      }
    },
  }
}
</script>

<style scoped lang="scss">
.client-aside {
  height: calc(100vh - 60px);
  background: #339999;
}

.el-menu {
  border-right: none;
}

::v-deep .el-menu-item i {
  color: #ffffff !important;
}

::v-deep .is-active i {
  color: #f6c15f !important;
}

</style>
