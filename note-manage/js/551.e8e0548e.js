"use strict";(self["webpackChunkcompleted_pro"]=self["webpackChunkcompleted_pro"]||[]).push([[551],{3551:function(t,e,i){i.r(e),i.d(e,{default:function(){return m}});var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"note-manage"},[i("div",{staticClass:"select-box"},[i("div",[i("span",[t._v("类目：")]),i("el-select",{staticStyle:{"margin-right":"16px"},attrs:{placeholder:"请选择"},model:{value:t.category,callback:function(e){t.category=e},expression:"category"}},t._l(t.categoryList,(function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1),i("el-button",{staticClass:"search-btn",attrs:{type:"primary"},on:{click:t.handleSearch}},[i("span",[t._v("搜索")])]),i("el-button",{staticClass:"search-btn",attrs:{type:"primary"},on:{click:t.handleReset}},[i("span",[t._v("重置")])])],1),i("div",[i("el-button",{staticClass:"add-btn",attrs:{type:"primary"},on:{click:t.handleAddNote}},[i("span",[t._v("添加笔记")])])],1)]),i("div",{staticClass:"notes-box"},[i("el-table",{ref:"tableRef",attrs:{data:t.tableList,height:"calc(100vh - 320px)",border:""}},t._l(t.tableColumnList,(function(e){return i("el-table-column",{key:e.prop,attrs:{label:e.label,prop:e.prop,align:"center",width:e.width,"show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(a){var s=a.row;return["category_id"===e.prop?i("div",[i("div",{staticClass:"el-tooltip cell no-padding"},[t._v(" "+t._s(t._f("categoryFilter")(s[e.prop],t.categoryList))+" ")])]):"operation"===e.prop?i("div",[i("el-button",{attrs:{type:"text"},on:{click:function(e){return t.handleUpdateItem(s)}}},[i("span",[t._v("编辑")])]),i("el-divider",{attrs:{direction:"vertical"}}),i("el-button",{attrs:{type:"text"},on:{click:function(e){return t.handleDeleteItem(s)}}},[i("span",[t._v("删除")])])],1):i("div",{staticClass:"el-tooltip cell no-padding"},[t._v(" "+t._s(s[e.prop])+" ")])]}}],null,!0)})})),1),i("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next, jumper","current-page":t.page,"page-size":t.size,total:t.total},on:{"current-change":t.handleChange}})],1),i("notes-operation-dialog",{attrs:{visible:t.visible,title:t.title,id:t.editId},on:{"update:visible":function(e){t.visible=e},"update-data":t.handleUpdateData}})],1)},s=[],o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"notes-operation-dialog"},[i("el-dialog",{attrs:{title:t.title,visible:t.visible,"close-on-click-modal":!1,"close-on-press-escape":!1,"before-close":t.handleClose,width:"800px"},on:{"update:visible":function(e){t.visible=e},open:t.init}},[i("div",{staticClass:"dialog-container"},[i("el-form",{ref:"formRef",attrs:{model:t.form,rules:t.rules,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"标题：",prop:"title"}},[i("el-input",{attrs:{placeholder:"请输入标题",clearable:""},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),i("el-form-item",{attrs:{label:"简介：",prop:"introduction"}},[i("el-input",{attrs:{placeholder:"请输入简介",clearable:""},model:{value:t.form.introduction,callback:function(e){t.$set(t.form,"introduction",e)},expression:"form.introduction"}})],1),i("el-form-item",{attrs:{label:"类目：",prop:"category"}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.category,callback:function(e){t.$set(t.form,"category",e)},expression:"form.category"}},t._l(t.categoryList,(function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),i("el-form-item",{attrs:{prop:"content",label:"内容："}},[i("quill-editor",{ref:"myQuillEditor",staticClass:"editor",attrs:{options:t.editorOption},model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}})],1)],1)],1),i("template",{slot:"footer"},[i("el-button",{attrs:{type:"plain"},on:{click:t.handleClose}},[t._v("取消")]),i("el-button",{attrs:{type:"primary"},on:{click:t.handleConfirm}},[t._v("确定")])],1)],2)],1)},r=[],l={name:"NotesOperationDialog",props:{visible:{type:Boolean,default:()=>!1},title:{type:String,default:()=>"请输入标题"},id:{type:Number,default:()=>0}},data(){const t=[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"]],e={title:[{required:!0,trigger:"blur",message:"不能为空"}],introduction:[{required:!0,trigger:"blur",message:"不能为空"}],category:[{required:!0,trigger:"blur",message:"不能为空"}],content:[{required:!0,trigger:"blur",message:"不能为空"}]};return{form:{title:"",introduction:"",category:"",content:""},rules:e,categoryList:[],editorOption:{theme:"snow",placeholder:"您想发布点什么？",modules:{toolbar:{container:t}}}}},methods:{init(){this.getCategory(),"编辑笔记"===this.title&&this.getNoteDetail()},handleClose(){return this.form={title:"",introduction:"",category:"",content:""},this.$emit("update:visible",!1),!1},async handleConfirm(){"添加笔记"===this.title?await this.handleAdd():await this.handleEdit(),this.$emit("update-data",!1),this.handleClose()},async getNoteDetail(){try{this.loading=!0;const t={id:this.id},e=await this.$api.client.getNoteDetail(t);if(1===e.code){const t=e.data.notes;this.form.title=t.title,this.form.introduction=t.introduction,this.form.category=t.category_id,this.form.content=t.content}else this.$message.error(e.msg)}catch(t){this.$message.error("发生错误")}finally{this.loading=!1}},async handleAdd(){try{const t=this.form,e=await this.$api.server.addNotes(t);1===e.code?this.$message.success(e.msg):this.$message.error(e.msg)}catch(t){this.$message.error("发生错误")}},async handleEdit(){try{const t=this.form;t.id=this.id;const e=await this.$api.server.editNotes(t);1===e.code?this.$message.success(e.msg):this.$message.error(e.msg)}catch(t){this.$message.error("发生错误")}},async getCategory(){try{const t={},e=await this.$api.server.getCategoryList(t);if(1===e.code){const t=e.data;this.categoryList=t.categoryList}else this.$message.error(e.msg)}catch(t){this.$message.error("发生错误")}}}},n=l,c=i(3736),d=(0,c.Z)(n,o,r,!1,null,"01c95a74",null),p=d.exports,h={name:"NoteManage",components:{notesOperationDialog:p},data(){const t=[{label:"ID",prop:"id"},{label:"标题",prop:"title"},{label:"简介",prop:"introduction"},{label:"类目",prop:"category_id"},{label:"操作",prop:"operation"}];return{category:"",categoryList:[],tableColumnList:t,tableList:[],page:1,size:10,total:0,loading:!1,title:"",visible:!1,editId:0}},filters:{categoryFilter(t,e){return e.find((e=>e.id===t)).name}},methods:{handleUpdateData(){this.getNotes()},handleReset(){this.category="",this.getNotes()},handleChange(t){this.page=t,this.getNotes()},async handleDeleteItem({id:t}){try{await this.$confirm("此操作将永久删除该笔记，是否继续？","提示",{type:"warning"});const e={id:t};await this.$api.server.deltNotes(e),this.$message.success("删除成功"),await this.getNotes()}catch(e){this.$message.info("取消删除")}},handleUpdateItem({id:t}){this.editId=t,this.title="编辑笔记",this.visible=!0},handleAddNote(){this.title="添加笔记",this.visible=!0},handleSearch(){this.getNotes()},async getNotes(){try{this.loading=!0;const t={page:this.page,size:this.size,category:this.category},e=await this.$api.server.getNotes(t);if(1===e.code){const t=e.data;this.tableList=t.notesList,this.total=t.total}else this.$message.error(e.msg)}catch(t){this.$message.error("发生错误")}finally{this.loading=!1}},async getCategory(){try{const t={},e=await this.$api.server.getCategoryList(t);if(1===e.code){const t=e.data;this.categoryList=t.categoryList}else this.$message.error(e.msg)}catch(t){this.$message.error("发生错误")}}},created(){this.getNotes(),this.getCategory()}},g=h,u=(0,c.Z)(g,a,s,!1,null,"7ba9b95a",null),m=u.exports}}]);