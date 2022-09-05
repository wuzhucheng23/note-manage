"use strict";(self["webpackChunkcompleted_pro"]=self["webpackChunkcompleted_pro"]||[]).push([[576],{576:function(e,r,t){t.r(r),t.d(r,{default:function(){return c}});var s=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"login"},[t("div",{staticClass:"container"},[e._m(0),t("div",{staticClass:"right-wrap"},[t("div",{staticClass:"loginCard"},[t("div",{staticClass:"account"},[e._m(1),t("el-form",{ref:"user",staticClass:"accountForm",attrs:{model:e.user}},[t("el-form-item",{attrs:{prop:"account",rules:[{required:!0,message:"账号不能为空!"}]}},[t("el-input",{attrs:{type:"text",placeholder:"请输入账号",clearable:""},model:{value:e.user.account,callback:function(r){e.$set(e.user,"account",r)},expression:"user.account"}})],1),t("el-form-item",{staticClass:"pwd",attrs:{prop:"password",rules:[{required:!0,message:"密码不能为空"}]}},[t("el-input",{attrs:{type:"password",placeholder:"请输入密码",clearable:"","show-password":""},nativeOn:{keyup:function(r){return!r.type.indexOf("key")&&e._k(r.keyCode,"enter",13,r.key,"Enter")?null:e.handleRegister("user")}},model:{value:e.user.password,callback:function(r){e.$set(e.user,"password",r)},expression:"user.password"}})],1),t("el-form-item",{staticClass:"pwd",attrs:{prop:"password",rules:[{required:!0,message:"确认密码不能为空"}]}},[t("el-input",{attrs:{type:"password",placeholder:"请输入确认密码",clearable:"","show-password":""},nativeOn:{keyup:function(r){return!r.type.indexOf("key")&&e._k(r.keyCode,"enter",13,r.key,"Enter")?null:e.handleRegister("user")}},model:{value:e.user.repeatPassword,callback:function(r){e.$set(e.user,"repeatPassword",r)},expression:"user.repeatPassword"}})],1),t("el-form-item",{staticClass:"pwd",attrs:{prop:"username"}},[t("el-input",{attrs:{type:"text",placeholder:"请输入用户名称",clearable:""},nativeOn:{keyup:function(r){return!r.type.indexOf("key")&&e._k(r.keyCode,"enter",13,r.key,"Enter")?null:e.handleRegister("user")}},model:{value:e.user.username,callback:function(r){e.$set(e.user,"username",r)},expression:"user.username"}})],1),t("el-form-item",[t("el-button",{staticClass:"loginBtn",attrs:{loading:e.loading,type:"primary"},on:{click:function(r){return e.handleRegister("user")}}},[e._v("注        册 ")])],1),t("el-form-item",[t("el-button",{staticClass:"registerBtn",attrs:{type:"primary"},on:{click:e.handleBack}},[e._v("返 回 登 陆 ")])],1)],1)],1)])])])])},a=[function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"left-wrap"},[t("div",[e._v("慧城")]),t("div",[e._v("个人笔记管理系统")])])},function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticStyle:{"text-align":"left","padding-top":"50px"}},[t("span",{staticStyle:{"font-size":"18px","padding-left":"105px"}},[e._v(" 用户注册 ")])])}],n=t(8534),u=(t(5666),{name:"Register",data:function(){return{user:{account:"",password:"",username:""},loading:!1}},methods:{handleRegister:function(){var e=this;return(0,n.Z)(regeneratorRuntime.mark((function r(){var t,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(e.user.account){r.next=2;break}return r.abrupt("return",e.$message.warning("请输入账号"));case 2:if(e.user.password){r.next=4;break}return r.abrupt("return",e.$message.warning("请输入密码"));case 4:if(e.user.repeatPassword){r.next=6;break}return r.abrupt("return",e.$message.warning("请输入确认密码"));case 6:if(e.user.password===e.user.repeatPassword){r.next=8;break}return r.abrupt("return",e.$message.warning("密码与确认密码不一致"));case 8:return e.loading=!0,t={account:e.user.account,password:e.user.password,username:e.user.username},r.prev=10,r.next=13,e.$api.common.register(t);case 13:s=r.sent,1===s.code?(e.$message.success(s.msg),e.$utils.delayPush("CommonLogin","登陆")):e.$message.error(s.msg),r.next=20;break;case 17:r.prev=17,r.t0=r["catch"](10),e.$message.error("发生错误");case 20:return r.prev=20,e.loading=!1,r.finish(20);case 23:case"end":return r.stop()}}),r,null,[[10,17,20,23]])})))()},handleBack:function(){this.$router.back()}}}),i=u,l=t(3736),o=(0,l.Z)(i,s,a,!1,null,"1e630abb",null),c=o.exports}}]);