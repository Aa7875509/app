<template>
    <div class="realName">  
        <my-header :title="'实名认证'" :back="true"> 
          </my-header>
    <div class="hiter"></div>
         <div class="hiterse">
             请确认信息真实有效，否则会影响您的正常使用
         </div>
         <div style="padding:0 .3rem;">
              <input type="text" class="input1" v-model="name" maxlength="10" placeholder="请输入姓名">
		       <input type="text" class="input1"  @input="must"  maxlength="18" v-model="id" placeholder="请输入身份证">
         </div>
         <button class="bjzhuse" @click="shoushijiesuo">确定提交</button>
    </div>
</template>
<script>
import myHeader from "../../../commons/publics/myHeader.vue";

export default {
  data() {
    return {
      name: "",
      id: ""
    };
  },
  mounted() {
     var vm=this;
      mui.init({
          keyEventBind: {
              backbutton: true, //关闭back按键监听
          }
      });
      mui.back = function () {
          vm.$router.go(-1);
      }
  },
  methods: {
    shoushijiesuo() {
      var vm = this;
      if(!vm.name){
         mui.toast('姓名不能为空');
      }
      if(!vm.id){
         mui.toast('身份证不能为空');
      }
      this.$ajax({
        url: "/openapi/v1/limu/idAndNameCheck",
        type: "post",
        data: {
          name: vm.name,
          identityNo: vm.id
        },
        success: function(res) {
          if (res.code == "0000") {
             mui.toast("身份证验证成功!");
            vm.$router.push("/mine");
          }else{
            mui.toast(res.msg);
          }
        }
      });
    },
    must(){
      var vm = this;
      if(!/^[0-9a-zA-Z]*$/g.test(vm.id)){
        mui.toast('请输入正确的身份证');
      }
      
    }
  },
  components: {
    myHeader
  }
};
</script>
<style scoped>
.hiter {
  margin-top: .88rem;
  text-align: left;
}
.hiterse {
  color: #646464;
  font-size: 0.22rem;
  height: 0.92rem;
  line-height: 1.2rem;
  text-align: left;
  padding: 0 0.5rem;
}
.input1 {
  display: block;
  border: 0;
  outline: none;
  border-radius: 8px;
  margin: 0.3rem auto;
  padding-left: 0.4rem;
  font-size: 0.24rem;
  height: 0.8rem;
  line-height: 0.8rem;
}
button {
  width: 5rem;
  height: 1.2rem;
  color: #ffffff;
  font-size: 0.46rem;
  text-align: center;
  border-radius: 0.1rem;
  display: block;
  margin: 0.7rem auto;
  margin-bottom: 0;
}
</style>