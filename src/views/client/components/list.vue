<template>
  <div class="list">
    <div class="list-box">
      <div class="list-item"
           v-for="item in list"
           :key="item.id"
           @click="handleToDetail(item)">
        <div class="right-wrap">
          <div class="title">{{ item.title }}</div>
          <div class="time">{{ item.time }} </div>
          <div class="desc">{{ item.introduction }}</div>
          <div class="content" v-html="item.content"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      list: [],
      categoryList: [],
      category: ''
    }
  },
  watch: {
    $route (value) {
      const nameList = value.path.split('/')
      const name = nameList[nameList.length - 1]
      this.category = this.categoryList.find(item => item.name === name).id
      this.getNotes()
    }
  },
  async created() {
    await this.getCategory()
    await this.getNotes()
  },
  methods: {
    handleToDetail({ id }) {
      this.$router.push({
        name: 'ClientArticle',
        label: '文章',
        params: {
          type: this.$route.params.type,
        },
        query: {
          id
        }
      })
    },
    async getNotes () {
      try {
        this.loading = true
        const params = {
          page: 1,
          size: 1000000,
          category: this.category
        }
        const resp = await this.$api.server.getNotes(params);
        if (resp.code === 1) {
          const data = resp.data
          this.list = data.notesList
        } else {
          this.$message.error(resp.msg)
        }
      } catch (e) {
        this.$message.error('发生错误');
      } finally {
        this.loading = false
      }
    },
    async getCategory () {
      try {
        const params = {}
        const resp = await this.$api.server.getCategoryList(params);
        if (resp.code === 1) {
          const data = resp.data
          this.categoryList = data.categoryList
          if (data.categoryList > 0) this.category = data.categoryList[0].id
        } else {
          this.$message.error(resp.msg)
        }
      } catch (e) {
        this.$message.error('发生错误');
      }
    },
  }
}
</script>

<style scoped lang="scss">
::-webkit-scrollbar {
  width: 0;
}
.list-box {
  overflow: auto;
  height: calc(100vh - 200px);
  .list-item {
    height: 200px;
    background: #f6f6f6;
    border-radius: 10px;
    margin-bottom: 20px;
    overflow: hidden;
    display: flex;
    cursor: pointer;
    &:last-child {
      margin-bottom: 0;
    }
    .left-wrap {
      .el-image {
        height: 250px;
        width: 250px;
        vertical-align: middle;
      }
    }
    .right-wrap {
      padding: 20px;
      .time {
        margin-bottom: 10px;
        color: #9999;
        font-size: 14px;
      }
      .title {
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: bold;
      }
      .desc {
        overflow: hidden;
        text-overflow: ellipsis;
        line-break: anywhere;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
        font-size: 14px;
        margin-bottom: 10px;
      }
      .content {
        overflow: hidden;
        text-overflow: ellipsis;
        line-break: anywhere;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
    }
  }
}
</style>
