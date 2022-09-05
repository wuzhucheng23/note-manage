<template>
  <div class="login">
    <div class="container">
      <div class="left-wrap">
        <div>慧城</div>
        <div>个人笔记管理系统</div>
      </div>
      <div class="right-wrap">
        <div class="loginCard">
          <div class="account">
            <div style="text-align: left; padding-top: 50px;">
              <span style="font-size: 18px; padding-left: 105px;">
                用户注册
              </span>
            </div>
            <el-form :model="user" ref="user" class="accountForm">
              <el-form-item
                  prop="account"
                  :rules="[{ required: true, message: '账号不能为空!' }]">
                <el-input
                    type="text"
                    v-model="user.account"
                    placeholder="请输入账号"
                    clearable>
                </el-input>
              </el-form-item>
              <el-form-item
                  prop="password"
                  :rules="[{ required: true, message: '密码不能为空' }]"
                  class="pwd">
                <el-input
                    type="password"
                    v-model="user.password"
                    placeholder="请输入密码"
                    clearable
                    show-password
                    @keyup.enter.native="handleRegister('user')"
                ></el-input>
              </el-form-item>
              <el-form-item
                  prop="password"
                  :rules="[{ required: true, message: '确认密码不能为空' }]"
                  class="pwd">
                <el-input
                    type="password"
                    v-model="user.repeatPassword"
                    placeholder="请输入确认密码"
                    clearable
                    show-password
                    @keyup.enter.native="handleRegister('user')"
                ></el-input>
              </el-form-item>
              <el-form-item
                  prop="username"
                  class="pwd">
                <el-input
                    type="text"
                    v-model="user.username"
                    placeholder="请输入用户名称"
                    clearable
                    @keyup.enter.native="handleRegister('user')"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                    :loading="loading"
                    type="primary"
                    @click="handleRegister('user')"
                    class="loginBtn">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button
                    type="primary"
                    @click="handleBack"
                    class="registerBtn">返&nbsp;回&nbsp;登&nbsp;陆
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      user: {
        account: '',
        password: '',
        username: ''
      },
      loading: false
    };
  },
  methods: {
    async handleRegister() {
      if (!this.user.account) return this.$message.warning('请输入账号')
      if (!this.user.password) return this.$message.warning('请输入密码')
      if (!this.user.repeatPassword) return this.$message.warning('请输入确认密码')
      if (this.user.password !== this.user.repeatPassword) return this.$message.warning('密码与确认密码不一致')
      this.loading = true
      const params = {
        account: this.user.account,
        password: this.user.password,
        username: this.user.username
      }
      try {
        const res = await this.$api.common.register(params)
        if (res.code === 1) {
          this.$message.success(res.msg)
          this.$utils.delayPush('CommonLogin', '登陆')
        } else {
          this.$message.error(res.msg)
        }
      } catch (e) {
        this.$message.error('发生错误');
      } finally {
        this.loading = false
      }
    },
    handleBack() {
      this.$router.back()
    }
  },
};
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #318e8e;

  .left-wrap {
    color: #fff;
    font-size: 40px;
    text-align: center;
  }

  .right-wrap {
    width: 510px;
    height: 510px;
    background: #fefefe;
    box-shadow: 3px 3px 3px 3px rgb(0 0 0 / 30%);

    .styleBtn {
      display: inline-block;
      width: 170px;
      height: 60px;
      font-size: 18px;
      color: gray;
      border: none;
      background-color: #fff;
      border-bottom: 1px gray solid;
    }

    #account {
      //border-bottom: 0 0 3px 0 #339999 solid;
    }

    #mobile {
      width: 168px;
      border-right: 1px gray solid;
      border-left: 1px gray solid;
    }

    .account, .mobile, .weixin {
      margin-top: 5px;
      text-align: center;
    }

    .accountForm {
      display: inline-block;
      width: 300px;
      height: 200px;
      padding-top: 6%;
    }

    .phoneForm {
      display: inline-block;
      width: 300px;
      height: 200px;
      padding-top: 10%;
    }

    .pwd, .code {
      margin-top: 20px;
    }

    .loginBtn, .registerBtn {
      width: 300px;
      height: 40px;
      background-color: #339999;
      border-color: #339999;
    }

    .registerBtn {
      margin-bottom: 20px;
    }

    .memory {
      display: inline-block;
    }

    .forget {
      display: inline-block;
      text-align: right;
      margin-left: 100px;
    }

    a {
      text-decoration: none;
      color: #606266;
    }

    a:hover {
      color: #4096ef;
    }

    .other {
      position: relative;
      top: 40px;
    }
  }
}
</style>
