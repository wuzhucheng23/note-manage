<template>
  <div class="my-header">
    <div class="left-logo">慧城个人笔记管理系统</div>
    <el-dropdown @click="handleClick">
      <span class="el-dropdown-link">
        <span style="margin-right: 5px">我的</span>
        <i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="handleToManage">管理模式</el-dropdown-item>
        <el-dropdown-item @click.native="handleToRead">阅读模式</el-dropdown-item>
        <el-dropdown-item @click.native="handleExit">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "MyHeader",
  data() {
    return {
      username: '',
      type: ''
    }
  },
  created() {
    this.getUser()
    this.getCategory()
  },
  methods: {
    async getUser() {
      try {
        this.loading = true
        const params = {}
        const resp = await this.$api.server.getUser(params);
        if (resp.code === 1) {
          const data = resp.data
          this.username = data.username
        } else {
          // this.$message.error(resp.msg)
        }
      } catch (e) {
        this.$message.error('发生错误');
      } finally {
        this.loading = false
      }
    },
    async getCategory() {
      try {
        this.loading = true
        const params = {}
        const resp = await this.$api.server.getCategoryList(params);
        if (resp.code === 1) {
          const data = resp.data
          if (data.categoryList.length > 0) this.type = data.categoryList[0].name
        } else {
          // this.$message.error(resp.msg)
        }
      } catch (e) {
        this.$message.error('发生错误');
      } finally {
        this.loading = false
      }
    },
    handleClick(params) {
      console.log(params)
    },
    handleToManage() {
      if (this.$route.fullPath.indexOf('server') === -1) {
        this.$router.push({
          name: 'PersonInfo',
          label: '个人中心',
        })
      }
    },
    handleToRead() {
      if (this.$route.fullPath.indexOf('client') === -1) {
        this.$router.push({
          name: 'ClientList',
          label: '列表',
          params: {
            type: this.type
          }
        })
      }
    },
    handleExit() {
      localStorage.removeItem('token')
      this.$router.push({
        name: 'CommonLogin',
        label: '登陆',
      })
    },
  }
};
</script>

<style scoped lang="scss">
.my-header {
  height: 100%;
  background: #339999;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;

  .left-logo {
    font-size: 24px;
    color: #fff;
    line-height: 30px;
    letter-spacing: 1px;
  }

  .el-dropdown {
    color: #ffffff;
    font-size: 20px;
  }

  .el-dropdown-link {
    cursor: pointer;

    .el-image {
      width: 28px;
      height: 28px;
      position: relative;
      top: 7px;
      border-radius: 50%;
      margin-right: 8px;
    }
  }
}
</style>
