<template>
    <div >
        <my-header  :title="'总资产'" :back="false" @back="fanhui"> </my-header>

        <div class="hiter" id="shuzxon">
            <div class="zichan bjfuse2">
                <span >总资产（元）</span>
                <span v-if="ifsd">
                    <span class="shuzi">{{yuan}}</span>
                    </span>
                <span v-else>
                    <span class="shuzi">*******</span>
                </span>
            </div>
            <div id="main" style="width: 6rem;height:4rem;"></div>
            <div class="xiantyiao">
                <div class="lift">
                    <div class="lift-quan"><div class="uanyi"></div></div>
                    <div class="lift-zi">
                        <div>保证金（元）</div>
                        <div v-if="ifsd">{{mony}}</div>
                        <div v-else>*******</div>
                    </div>
                </div>
                <div class="lift">
                    <div class="lift-quan2"><div class="uaner"></div></div>
                    <div class="lift-zi">
                        <div>可用余额（元）</div>
                        <div v-if="ifsd">{{kymony}}</div>
                         <div v-else>*******</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import myHeader from "../../../commons/publics/myHeader.vue";

    // 引入echarts
    import echarts from 'echarts'
    export default {
        data(){
            return {
              yuan:'0',
              ifsd:true,
              kymony:'0',
              mony:'0'
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
            $("#shuzxon").on("swipedown",function(e){
                    var w = plus.nativeUI.showWaiting( "刷新中..." );
                    setTimeout(() => {
                    w.close();
                    }, 1000);
                })
            vm.ajax();
            vm.ifsd=vm.$route.query.yanj;		
        },
        methods:{
              fanhui(){
                    var vm =this;
                    vm.$router.push({
                    path: '/wallet',
                    query: {yanj:vm.ifsd}
                })
              },
             erweimafen(){
                   var vm =this;
             },
             ajax(){
                 var vm= this;
                 this.$ajax({
                    url: '/openapi/v1/personalCenter/assetsDetailed',
                    type: 'post',
                    success: function(res){
                        if(res.code == '0000'){
                            vm.yuan= res.totalAssets;
                            vm.mony= res.guaranteeAmount;
                            vm.kymony= res.availableBalance;
                            vm.yunatu()
                        }
                    }
                })
             },
             yunatu(){
                var vm =this;
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('main'));
                // 指定图表的配置项和数据
                var option = {
                     tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    series: [
                        {
                            name:'总资产',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '12',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:vm.kymony, name:'保证金',  itemStyle:{
                                    normal:{color:'#81c784'}
                                 }},
                                {value:vm.mony, name:'可用余额',itemStyle:{
                                    normal:{color:'#ffd54f'}
                                }}
                            ]
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
             }
        },
        components: {
            myHeader
        }
    }
</script>
<style scoped>
.hiter{
        margin-top:.88rem;
         background: #FFF;
      
    }
   .zichan{
       height: 1.26rem;
       line-height: 1.26rem;
       color: #fff;
       font-size: .38rem;

   }
   .zichan span:nth-of-type(1){
       
       float: left;
       padding-left: 0.3rem;
       height: 100%;
   }
  #main{
      margin: 0 auto;
  }
  .shuzi{
      display: inline-block;
      width: 3.5rem;
      text-align: left;
  }
  img{
      height: .25rem;
  }
  .xiantyiao{
      height: 1.3rem;
      border-top:1px solid #e1e1e1;
  }
  .lift{
      float: left;
      width: 50%;
  }
  .lift-quan{
      line-height: 1.3rem;
      width: 30%;
      float: left;
       padding-top: 0.5rem
  }
  .lift-quan2{
      line-height: 1.3rem;
      width: 30%;
      float: left;
      padding-top: 0.5rem;
  }
  .lift-zi{
     float: left;
    line-height: 0.6rem;
    font-size: .24rem;
    color: #b4b4b4;
  }
  .lift-zi div:nth-of-type(2){
      font-size: .36rem;
  }
   .uanyi{
        width: .22rem;
        height: .22rem;
        background: #ffd54f;
        border-radius: 50%;
        margin: 0 auto;
        
   }
    .uaner{
        width: .22rem;
        height: .22rem;
        background: #81c784;
        border-radius: 50%;
        margin: 0 auto;
   }
</style>