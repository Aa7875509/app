<template>
    <div class="mui-content">
        <header class="mui-bar mui-bar-nav">
            <a @click="fcard" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">添加</h1>
		</header>
        <div style="margin-top:44px;">
            <form class="mui-input-group">
                <div class="mui-input-row">
                    <label>名字</label>
                    <input type="text" class="mui-input-clear" v-model="formLabelAlign.name" placeholder="请输入名字">
                </div>
                 <div class="mui-input-row">
                    <label>资料1</label>
                    <input type="text" class="mui-input-clear" v-model="formLabelAlign.date" placeholder="请输入资料1">
                </div>
                 <div class="mui-input-row">
                    <label>资料2</label>
                    <input type="text" class="mui-input-clear" v-model="formLabelAlign.worde" placeholder="请输入资料2">
                </div>
                 <div class="mui-input-row">
                    <label>备注</label>
                    <input type="text" class="mui-input-clear" v-model="formLabelAlign.address" placeholder="请输入备注">
                </div>
            </form>
            <div class="mui-content-padded">
				<button  class="mui-btn mui-btn-block mui-btn-primary" @click="adddate">确 定</button>
			</div>
        </div>
    </div>
    <!-- <div class="indexdialog">
        <el-form label-position="right" label-width="80px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
            <el-form-item label="名字" prop="name">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="资料1" prop="date">
                <el-input v-model="formLabelAlign.date"></el-input>
            </el-form-item>
            <el-form-item label="资料2" prop="worde">
                <el-input v-model="formLabelAlign.worde"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="address">
                <el-input v-model="formLabelAlign.address"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button  @click="determine" plain size="small">返 回</el-button>
            <el-button type="primary" @click="adddate('formLabelAlign')" size="small" plain>确 定</el-button>
        </span>
    </div> -->
</template>

<script>
export default {
  data() {
    return {
        formLabelAlign:{name:'',date:'',worde:'',address:''},
    }
  },
  mounted(){
       
  },
  methods: {
       fcard(){
            this.$router.push('/index')
       },
        
        adddate(){
            var v= this;
            if(!v.formLabelAlign.name){
                return mui.toast('名字不能为空');
            }
            if(!v.formLabelAlign.date){
                return mui.toast('资料1不能为空');
            }
            if(!v.formLabelAlign.worde){
                return mui.toast('资料2不能为空');
            }
            if(!v.formLabelAlign.address){
                return mui.toast('备注不能为空');
            }
            var data={
                name:v.formLabelAlign.name,
                date:v.formLabelAlign.date,
                worde:v.formLabelAlign.worde,
                address:v.formLabelAlign.address
            };
            data=JSON.stringify(data);
             v.$ajax({
                data:{
                    s: "App.User_Set.Add",       // 待请求的接口服务名称
                    uuid: localStorage.getItem('uuid'),
                    token: localStorage.getItem('token'),        // 更多接口参数
                    key:'from',
                    data:data,
                    callback: "onCallback"  ,// 客户端的JS回调函数
                    },
                done:function(r){
                    if(r.ret=='200'){
                        if(r.data.err_code=='0'){
                            mui.toast('添加成功');
                            v.$router.push('/index')
                        }else{
                            mui.toast(r.data.err_msg);
                        }
                    }else{
                        mui.toast(r.msg);
                    }
                }
            })
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
