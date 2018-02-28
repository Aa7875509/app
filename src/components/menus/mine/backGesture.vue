<template>
    <div >
        
         <my-header  :title="'找回密码'" :back="false" @back='fanhui'> </my-header>
        <div class="hiter">
              <input type="text" class="btn" v-model="messige" placeholder="请输入验证码"/>
             <span class="myprimary bjzhuse" @click="dianji">
                {{mouse}}
            </span>
        </div>
         <div class="fenxiang1">
            <input type="button" class="btn-zi bjzhuse" id="erweima" v-model="mouset" @click="erweimafen" />
        </div>
    </div>
</template>
<script>
    import myHeader from "../../../commons/publics/myHeader.vue";

    export default {
        data(){
            return {
               messige:"",
               shuzi:60,
               yui:true,
               mouse:'点击获取',
               mouset:'确定找回',
               sttr:'',
            }
        },
        mounted(){
          var vm=this;
                mui.init({
                    keyEventBind: {
                        backbutton: true, //关闭back按键监听
                    }
                });
                mui.back = function () {
                vm.fanhui();
                    
                }
            
        },
        methods:{
            fanhui(){
             var vm = this;
              this.$ajax({
                url: 'openapi/v1/personalCenter/getSecurityCenter',
                success: function(res) {
                  //(1=绑定，当绑定时，不可创建手势密码;0=未绑定，)
                  vm.$router.push("/security/" + res.isBindGesturePassword);
                },
              });
          },
            dianji(){
                   var vm = this;
                   if(!vm.mouse){
                      mui.toast('验证码不能为空');
                   }
                   if(vm.yui){
                       vm.shuzi=60;
                        this.$ajax({
                            url: "/openapi/v1/personalCenter/getBackgesturePasswordSendSMS",
                            type: "post",
                            success: function(res) {
                            if (res.code == "0000") {
                                mui.toast(res.msg);
                                vm.yui=false;
                                clearInterval(vm.sttr)
                                vm.sttr= setInterval(function(){
                                vm.shuzi--;
                                vm.mouse=vm.shuzi+"s后重发";
                                    if(vm.shuzi==0){
                                        vm.yui=true;
                                        vm.mouse='点击获取';
                                        clearInterval(vm.sttr)
                                    }
                                },1000)
                            }else{
                               mui.toast(res.msg);
                            }
                        }
                        })
                   }
               
            },
             erweimafen(){
                var vm =this;
                if(!vm.mouse){
                      mui.toast('验证码不能为空');
                   }
                this.$ajax({
                    url: "/openapi/v1/personalCenter/verifyGesturePasswordSMS",
                    type: "post",
                    data:{smsCode:vm.messige},
                    success: function(res) {
                    if (res.code == "0000") {
                         mui.toast(res.msg);
                         vm.$router.push("/addGesture");
                     }else{
                          mui.toast(res.msg);
                     }
                   }
                });
             }
        },
  components: {
    myHeader
  }
    }
</script>
<style scoped>
.hiter{
        margin-top:65px;
        padding: 0 .3rem;
         height: 0.96rem;
    }
    .btn{
        float: left;
        width: 70%;
        margin: 0;
        height: 0.96rem;
        font-size: .28rem;
        border: 0;
        border-radius: 0;

    }
    .fenxiang1 {
           margin-top: 0.6rem;
        }
    .myprimary{
        float: left;
        margin: 0;
        width: 30%;
        height: 0.96rem;
        line-height: 0.96rem;
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
       
        color: #fff;
        font-size: 0.32rem;
    }
    .btn-zi {
        width: 6.4rem;
        height: 0.96rem;
        border-radius: 8px;
        margin: 0 auto;
        color: #fff;
        font-size: 0.32rem;
    }
</style>