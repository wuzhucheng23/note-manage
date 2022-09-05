<template>
  <div id="app">
    <template v-if="!isCommon">
      <el-container>
        <el-header>
          <my-header></my-header>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <my-server-aside v-if="$route.path.indexOf('/server') !== -1"/>
            <my-client-aside v-else></my-client-aside>
          </el-aside>
          <el-main>
            <el-card class="box-card">
              <div slot="header">
                <span v-if="$route.path.indexOf('/server') !== -1"
                      class="view-title">
                  {{ $route.meta.title }}
                </span>
                <span v-else class="view-title">
                  {{ $route.params.type }}
                </span>
              </div>
              <div style="height: calc(100vh - 201px)">
                <router-view/>
              </div>
            </el-card>
          </el-main>
        </el-container>
      </el-container>
    </template>
    <template v-else>
      <router-view/>
    </template>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      login: false
    }
  },
  computed: {
    isCommon() {
      return this.$route.fullPath.indexOf('/common') !== -1
    }
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.el-header {
  padding: 0 !important;
}

.view-title {
  color: #339999;
}
</style>
