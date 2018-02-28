<template>
    <div>
        <!-- 预览 -->
        <my-header :title="'预览明细'" @back="goCreatePlan" :back="false"></my-header>
        <div class="table mytable" id="refreshYYY">
            <div class="table-head">
                <div class="table-head-cell">日期</div>
                <div class="table-head-cell">金额</div>
                <div class="table-head-cell">操作</div>
            </div>
            <div class="aout">
                <div v-for="(item,index) in plandatas" :key="index" class="table-body">
                    <div class="table-body-cell">{{item.planTime}}</div>
                    <div class="table-body-cell">{{item.amount}}</div>
                    <div class="table-body-cell" :class="item.type==0?'hong':''">{{item.type == 1?'还款':'消费'}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import myHeader from '../../../commons/publics/myHeader.vue'
    export default {
        props:{
            plandatas:{
                type:Array,
                default:[],
                required:true,
            },
        },
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
                    vm.goCreatePlan();
                }
           /*
            // 下拉刷新
            $("#refreshYYY").on("swipedown",function(){
                var w = plus.nativeUI.showWaiting( "刷新中..." );
                setTimeout(() => {
                    w.close();
                }, 1000);
                setTimeout(()=>{
                    mui.toast("为你推荐了5篇文章！");
                },1200);
            });
            // 上拉加载
            $("#refreshYYY").on("swipeup",function(){
                var w = plus.nativeUI.showWaiting( "加载中..." );
                setTimeout(() => {
                    w.close();
                }, 1000);
                setTimeout(() => {
                    mui.toast("没有更多数据了！");
                }, 1200);
            })
            */

            var w = plus.nativeUI.showWaiting( "加载中..." );
            setTimeout(() => {
                w.close();
            }, 1000);
        },
        methods:{
            goCreatePlan(){
                this.$emit('welcomeBack');
            },
        },
        components:{
            myHeader
        },
    }
</script>
<style scoped>
    .mytable{
       margin-top: 0.88rem;
    }
    .table {
      background: #fff;
    }
    .aout{

      overflow:auto;
    }
    .table-head {
      display: flex;display: -webkit-flexbox;
      flex-wrap: nowrap;
      justify-content: space-between;
      padding: 0.3rem 0;
    }

    .table-head-cell {
      width: 33%;
      font-size: 0.28rem;
      border-right: 0.5px solid #e1e1e1;
    }
    .table-head-cell:last-child {
      border-right: 0;
    }
    .table-body {
      border-top: 0.5px solid #e1e1e1;
      padding: 0.3rem 0;
      display: flex;display: -webkit-flexbox;
      flex-wrap: nowrap;
      justify-content: space-between;
    }
    .table-body-cell {
      width: 33%;
      font-size: 0.22rem;
    }
</style>
