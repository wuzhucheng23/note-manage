<template>
  <div class="article" v-loading="loading">
    <div class="title">
      {{ article.title }}（{{ article.time }}）
    </div>
    <div class="content">
      <div v-html="article.content"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      loading: false,
      article: {}
    }
  },
  created() {
    this.getNoteDetail()
  },
  methods: {
    async getNoteDetail() {
      try {
        this.loading = true
        const params = {
          id: this.$route.query.id,
          type: 'read'
        }
        const resp = await this.$api.client.getNoteDetail(params);
        if (resp.code === 1) {
          const data = resp.data.notes
          this.article = data
        } else {
          this.$message.error(resp.msg)
        }
      } catch (e) {
        this.$message.error('发生错误');
      } finally {
        this.loading = false
      }
    },
  }
};
</script>

<style scoped lang="scss">
.title {
  line-height: 40px;
  background: #339999;
  color: #ffffff;
  padding-left: 20px;
}

.content {
  border: 1px solid #eeeeee;
  height: calc(100vh - 240px);
  padding: 20px 30px;
  overflow: auto;
}
</style>
