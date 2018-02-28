<template>
    <div class="code">
        <my-header :title="'分享'" :back="true"> 
          </my-header>
          <div class="tou">
                <div style="padding:1rem .3rem;">
                <input type="text" class="input1" v-model="name" placeholder="请输入分享手机号">
            </div>
            <div class="dibu">
                <button  class="bjzhuse" @click="haidus">分享到手机</button>
            </div>
          </div>
    </div>
</template>
<script>
import myHeader from "../../../commons/publics/myHeader.vue";

    export default {
        data(){
            return {

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
                
                vm.$router.go(-1);
            }
        },
        methods:{

        },
        components: {
            myHeader
        }
    }
</script>
<style scoped>
  .tou{
      margin-top: .88rem;
  }
  button {
  width: 5rem;
  height: 1.2rem;
  color: #ffffff;
  font-size: 0.46rem;
  text-align: center;
  border-radius: 0.1rem;
  display: block;
  margin: 0.3rem auto;   
}
.dibu{
    position: fixed;
    bottom: 0.8rem;
    display: table;
    width: 100%;
    padding: 0 .3rem;
    table-layout: fixed;
    border-top: 0;
    border-bottom: 0;
    color: #646464;
}
</style>