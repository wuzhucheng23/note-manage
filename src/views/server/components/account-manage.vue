<template>
  <div class="account-manage" v-loading="loading">
    <div class="title">个人信息</div>
    <div class="content">
      <div class="form-wrap">
        <el-form
            :model="form"
            :rules="rules"
            label-width="100px"
            ref="formRef">
          <el-form-item
              label="登陆账号："
              prop="account">
            <el-input
                v-model="form.account"
                placeholder="请输入登陆账号"
                clearable
                readonly
            />
          </el-form-item>
          <el-form-item
              label="登陆密码："
              prop="password">
            <el-input
                v-model="form.password"
                placeholder="请输入登陆密码"
                type="password"
                show-password
                clearable
            />
          </el-form-item>
          <el-form-item
              label="确认密码："
              prop="repeatPassword">
            <el-input
                v-model="form.repeatPassword"
                placeholder="请输入确认密码"
                type="password"
                show-password
                clearable
            />
          </el-form-item>
          <el-form-item
              label="用户名称："
              prop="username">
            <el-input
                v-model="form.username"
                placeholder="请输入用户名称"
                clearable
            />
          </el-form-item>
          <el-form-item label=" ">
            <el-button
                type="plain"
                @click="handleReset">
              <span>重置</span>
            </el-button>
            <el-button
                type="primary"
                class="save-btn"
                @click="handleSave">
              <span>确认保存</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountManage",
  data() {
    const rules = {
      account: [
        {required: true, trigger: 'blur', message: '不能为空'},
      ],
      password: [
        {required: true, trigger: 'blur', message: '不能为空'},
      ],
      repeatPassword: [
        {required: true, trigger: 'blur', message: '不能为空'},
      ],
    }
    return {
      form: {
        account: '',
        password: '',
        repeatPassword: '',
        username: ''
      },
      rules,
      loading: false
    }
  },
  methods: {
    async getUser() {
      try {
        this.loading = true
        const params = {}
        const resp = await this.$api.server.getUser(params);
        if (resp.code === 1) {
          const data = resp.data
          this.form.account = data.account
          this.form.password = data.password
          this.form.repeatPassword = data.password
          this.form.username = data.username
        } else {
          this.$message.error(resp.msg)
        }
      } catch (e) {
        this.$message.error('发生错误');
      } finally {
        this.loading = false
      }
    },
    handleReset() {
      this.form = {
        account: this.form.account
      }
    },
    async handleSave() {
      if (this.form.password !== this.form.repeatPassword) return this.$message.warning('登陆密码与确认密码不一致')
      try {
        const params = {
          password: this.form.password,
          name: this.form.username
        }
        const res = await this.$api.server.editUser(params)
        if (res.code === 1) {
          this.$message.success(res.msg)
          this.getUser()
        } else {
          this.$message.error(res.msg)
        }
      } catch (e) {
        this.$message.error('发生错误')
      }
    }
  },
  created() {
    this.getUser()
  }
};
</script>

<style scoped lang="scss">
.title {
  line-height: 40px;
  padding-left: 20px;
  background: #339999;
  color: #ffffff;
}

.content {
  height: calc(100vh - 240px);
  border: 1px solid #eeeeee;
  border-top: unset;
  padding: 100px 300px;

  .save-btn {
    background: #339999;
    border-color: #339999;
  }
}


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

</style>
