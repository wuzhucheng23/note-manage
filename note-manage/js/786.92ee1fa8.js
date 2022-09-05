"use strict";(self["webpackChunkcompleted_pro"]=self["webpackChunkcompleted_pro"]||[]).push([[786],{3786:function(e,s,r){r.r(s),r.d(s,{default:function(){return c}});var a=function(){var e=this,s=e.$createElement,r=e._self._c||s;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"account-manage"},[r("div",{staticClass:"title"},[e._v("个人信息")]),r("div",{staticClass:"content"},[r("div",{staticClass:"form-wrap"},[r("el-form",{ref:"formRef",attrs:{model:e.form,rules:e.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"登陆账号：",prop:"account"}},[r("el-input",{attrs:{placeholder:"请输入登陆账号",clearable:"",readonly:""},model:{value:e.form.account,callback:function(s){e.$set(e.form,"account",s)},expression:"form.account"}})],1),r("el-form-item",{attrs:{label:"登陆密码：",prop:"password"}},[r("el-input",{attrs:{placeholder:"请输入登陆密码",type:"password","show-password":"",clearable:""},model:{value:e.form.password,callback:function(s){e.$set(e.form,"password",s)},expression:"form.password"}})],1),r("el-form-item",{attrs:{label:"确认密码：",prop:"repeatPassword"}},[r("el-input",{attrs:{placeholder:"请输入确认密码",type:"password","show-password":"",clearable:""},model:{value:e.form.repeatPassword,callback:function(s){e.$set(e.form,"repeatPassword",s)},expression:"form.repeatPassword"}})],1),r("el-form-item",{attrs:{label:"用户名称：",prop:"username"}},[r("el-input",{attrs:{placeholder:"请输入用户名称",clearable:""},model:{value:e.form.username,callback:function(s){e.$set(e.form,"username",s)},expression:"form.username"}})],1),r("el-form-item",{attrs:{label:" "}},[r("el-button",{attrs:{type:"plain"},on:{click:e.handleReset}},[r("span",[e._v("重置")])]),r("el-button",{staticClass:"save-btn",attrs:{type:"primary"},on:{click:e.handleSave}},[r("span",[e._v("确认保存")])])],1)],1)],1)])])},t=[],o={name:"AccountManage",data(){const e={account:[{required:!0,trigger:"blur",message:"不能为空"}],password:[{required:!0,trigger:"blur",message:"不能为空"}],repeatPassword:[{required:!0,trigger:"blur",message:"不能为空"}]};return{form:{account:"",password:"",repeatPassword:"",username:""},rules:e,loading:!1}},methods:{async getUser(){try{this.loading=!0;const e={},s=await this.$api.server.getUser(e);if(1===s.code){const e=s.data;this.form.account=e.account,this.form.password=e.password,this.form.repeatPassword=e.password,this.form.username=e.username}else this.$message.error(s.msg)}catch(e){this.$message.error("发生错误")}finally{this.loading=!1}},handleReset(){this.form={account:this.form.account}},async handleSave(){if(this.form.password!==this.form.repeatPassword)return this.$message.warning("登陆密码与确认密码不一致");try{const e={password:this.form.password,name:this.form.username},s=await this.$api.server.editUser(e);1===s.code?(this.$message.success(s.msg),this.getUser()):this.$message.error(s.msg)}catch(e){this.$message.error("发生错误")}}},created(){this.getUser()}},l=o,n=r(3736),i=(0,n.Z)(l,a,t,!1,null,"85cf7458",null),c=i.exports}}]);