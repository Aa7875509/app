<template>
    <div class="code">
        <my-header :title="'分享'" :back="true"> 
        </my-header>
            <img class="ert" :src="urlsurls"/>
            <img class="img" src="../../../../static/commons/img/ic-home/bg_2w.png" alt="">    
    </div>
</template>
<script>
import myHeader from "../../../commons/publics/myHeader.vue";

    export default {
        data(){
            return {
                 urlsurls:'',
            }
        },
        mounted(){
             var vm = this;
                mui.init({
                    keyEventBind: {
                        backbutton: true, //关闭back按键监听
                    }
                });
                mui.back = function () {
                    
                    vm.$router.go(-1);
                }
                this.$ajax({
                 url: "openapi/v1/share/shareFunction",
                 type: "post",
                 data: {
                    action: "3"
                    },
                success: function(res) {
                    if (res.code == "0000") {
                        vm.urlsurls = res.image;
                    }else{
                        mui.toast(res.msg);
                    }
                }
                });
        },
        methods:{
           
        },
        components: {
            myHeader
        }
    }
</script>
<style scoped>
  .size{
      font-size: .32rem;
      color: #646464;
      text-align: center;
      margin:2rem 0 .5rem 0;
  }
  .ert{
      width: 250px;
      height: 250px;
      font-size: .32rem;
      color: #646464;
      margin: 0 auto;
      z-index: 100;
  }
  .img{
      position: absolute;
      top: 2rem;
      left: 0;
      width: 100%;
      z-index: 0;
  }
  .ert{
      position: absolute;
      top: 3.8rem;
      left: 50%;
      margin-left: -125px;
      -webkit-transform:scale(0.6);
      transform:scale(0.6);
  }
  
  
</style>