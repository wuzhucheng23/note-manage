<template>
  <div class="my-aside">
    <el-menu
        :default-active="activeIndex"
        background-color="#339999"
        text-color="#fff"
        active-text-color="#f6c15f"
        router>
      <el-menu-item index="/server/person-info">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页统计</span>
      </el-menu-item>
      <el-menu-item index="/server/note-manage">
        <i class="el-icon-s-management"></i>
        <span slot="title">笔记管理</span>
      </el-menu-item>
      <el-menu-item index="/server/category-manage">
        <i class="el-icon-menu"></i>
        <span slot="title">类目管理</span>
      </el-menu-item>
      <el-menu-item index="/server/log-check">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">查看日志</span>
      </el-menu-item>
      <el-menu-item index="/server/account-manage">
        <i class="el-icon-user-solid"></i>
        <span slot="title">账户管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "MyAside",
  computed: {
    activeIndex() {
      return this.$route.path
    }
  }
}
</script>

<style scoped lang="scss">
.my-aside {
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
