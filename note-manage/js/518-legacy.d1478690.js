"use strict";(self["webpackChunkcompleted_pro"]=self["webpackChunkcompleted_pro"]||[]).push([[518],{518:function(e,t,a){a.r(t),a.d(t,{default:function(){return p}});var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"log-check"},[a("el-table",{ref:"tableRef",attrs:{data:e.tableList,height:"calc(100vh - 260px)",border:""}},e._l(e.tableColumnList,(function(e){return a("el-table-column",{key:e.prop,attrs:{label:e.label,prop:e.prop,align:"center",width:e.width,"show-overflow-tooltip":""}})})),1),a("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next, jumper","current-page":e.page,"page-size":e.size,total:e.total},on:{"current-change":e.handleChange}})],1)},n=[],l=a(8534),o=(a(5666),{name:"LogCheck",data:function(){var e=[{label:"时间",prop:"time"},{label:"操作",prop:"handle"}];return{tableColumnList:e,tableList:[],page:1,size:10,total:0,loading:!1}},methods:{handleChange:function(e){this.page=e,this.getLogs()},getLogs:function(){var e=this;return(0,l.Z)(regeneratorRuntime.mark((function t(){var a,r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.loading=!0,a={page:e.page,size:e.size},t.next=5,e.$api.server.getLogs(a);case 5:r=t.sent,1===r.code?(n=r.data,e.tableList=n.logList,e.total=n.total):e.$message.error(r.msg),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),e.$message.error("发生错误");case 12:return t.prev=12,e.loading=!1,t.finish(12);case 15:case"end":return t.stop()}}),t,null,[[0,9,12,15]])})))()}},created:function(){this.getLogs()}}),i=o,s=a(3736),c=(0,s.Z)(i,r,n,!1,null,"5f38deda",null),p=c.exports}}]);