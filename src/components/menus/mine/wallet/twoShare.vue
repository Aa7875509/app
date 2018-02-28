<template>
    <div>
      <!-- 二级分享 -->
        <my-header :title="'分享明细'" :back="false" @back='fanhui'></my-header>

        <div class="title" >
            <div  class="row1 bjzhuse">
			    <div class="row1-a">总计分享收益（元）</div>
			    <div v-if="propertyDisplay" style="box-sizing:content-box;height: .42rem;" class="row1-b">
				   <span>{{totalAssets}}</span>
				   <!-- <img @click="tatalAssetsshow" style="height: .25rem;margin-left:.2rem;margin-bottom: 0.06rem;" src="../../../../../static/commons/img/mine/ic_see.png"   alt=""> -->
			    </div>
			    <div v-else style="box-sizing:content-box;height: .42rem;" class="row1-b">
                    <span>******</span>
                    <!-- <img @click="tatalAssetsshow" style="height: .25rem;margin-left:.2rem;margin-bottom: 0.13rem;" src="../../../../../static/commons/img/mine/ic_hide.png"   alt=""> -->
			    </div>
            </div>
            <div class="wode bjfuse2" ><span  @click="openPicker">{{nian}}年{{yue}}月&nbsp;<span class="mui-icon mui-icon-arrowdown"></span></span></div>
            <div class="table">
                <div class="table-head">
                    <div class="table-head-cell">用户</div>
                    <div class="table-head-cell">时间</div>
                    <div class="table-head-cell">来源</div>
                    <div class="table-head-cell">收益</div>
                </div>
                <div class="aout" id="tabContainer">
                    <div v-for="(item,index) in oneShareData" :key="index" class="table-body">
                        <div class="table-body-cell">{{item.sharePhone}}</div>
                        <div class="table-body-cell">{{item.time}}</div>
                        <div class="table-body-cell">{{item.shareAction==1?"注册":"刷卡分润"}}</div>
                        <div class="table-body-cell">{{propertyDisplay?item.shareAmount:"******"}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import myHeader from "../../../../../src/commons/publics/myHeader";
export default {
    data() {
        const _now=new Date();
        const _month=_now.getMonth()+1<9?('0'+_now.getMonth()+1):(_now.getMonth()+1);
        const _queryAt=_now.getFullYear()+'-'+_month;

        return {
            propertyDisplay: this.$route.query.yanj,
            totalAssets: "",
            oneShareData: [],
            nian: "2017",
            yue: "11",
            queryAt:_queryAt,
            page:1,
            pageLength:10,
            pageSum:'',
            shifjiaz:true,
            shujukaiguan:true
        }
    },
    mounted() {
        var vm=this;
        mui.init({
            keyEventBind: {
                backbutton: true, //关闭back按键监听
            }
        });
        mui.back = function () {
           vm.fanhui()
        }

        this.getClassAShareData();

        $(".aout").css("height", window.innerHeight - 240);
        // 下拉刷新
        $("#tabContainer").on("swipedown", function(e) {
            var w = plus.nativeUI.showWaiting("刷新中...");
            vm.page=1;
            vm.getClassAShareData();
            setTimeout(() => {
                w.close();
            }, 1000);
        });
        //上拉加载
        $("#tabContainer").on("swipeup", function(e) {
            // var w = plus.nativeUI.showWaiting("加载中...");
            // vm.page++;
            // if (vm.page<=vm.pageSum) {
            //     vm.getClassAShareData();
            // }else{
            //     mui.toast("没有更多数据!");
            // };
            // setTimeout(() => {
            //     w.close();
            // }, 1000);
           if( vm.shujukaiguan){
                if(vm.shifjiaz){
                var w = plus.nativeUI.showWaiting("加载中...");
                vm.page++;
                // if (vm.page<=vm.pageSum) {
                    vm.getClassAShareData();
                // }else{
                //     mui.toast("没有更多数据!");
                // };
                    setTimeout(() => {
                        w.close();
                    }, 1000);
                }
           }
        });
    },
    methods: {
        // 眼睛切换
        // tatalAssetsshow() {
        //     this.propertyDisplay = !this.propertyDisplay
        // },
        // 日期控件
        openPicker() {
            var vm = this;
            var dtPicker = new mui.DtPicker({
                type: "month"
            });
            dtPicker.show(function(e) {
                vm.nian = e.y.text;
                vm.yue = e.m.text;
                vm.queryAt = vm.nian +'-'+ vm.yue ;
            });
        },
        // 获得二级分享数据
        getClassAShareData(){
            var vm=this;
            vm.shujukaiguan=false;
            this.$ajax({
                url:"/openapi/v1/personalCenter/getSubordinateShare",
                data:{
                    action:2,
                    queryAt:vm.queryAt,
                    page:vm.page,
                    pageLength:vm.pageLength
                },
                success:function(r){
                    if (r.code!=="0000") {
                        mui.toast(r.msg);
                    }else{
                        vm.shujukaiguan=true;
                        vm.totalAssets=r.totalAmount;
                          if(r.data.length<10){
                                vm.shifjiaz=false;
                               if(vm.page>1){
                                   mui.toast("已无更多数据");
							   }
                            }else{
                                vm.shifjiaz=true;
                            }
                        if(vm.page==1){
                            vm.oneShareData=r.data;
                        }else{
                          vm.oneShareData= vm.oneShareData.concat(r.data);
                        }

                    }
                },
            })
        },
       
        fanhui(){
                var vm =this;
                vm.$router.push({
                path: '/wallet',
                query: {yanj:vm.propertyDisplay}
            })
         },
       
    },
    components: {
        myHeader
    },
    watch:{
        "queryAt":function(newValue,oldValue){
            if (newValue!==oldValue) {
                this.getClassAShareData();
            };
        }
    }
};
</script>
<style scoped>
    .title {
      margin-top: 0.88rem;
    }
    .wode {
      height: 0.98rem;
      line-height: 0.98rem;
      color: #fff;
      
      font-size: 0.3rem;
    }
    .table {
      background: #fff;
    }
    .aout {
      overflow: auto;
    }
    .table-head {
      display: flex;
      display: -webkit-flexbox;
      flex-wrap: nowrap;
      justify-content: space-between;
      padding: 0.3rem 0;
    }

    .table-head-cell {
      width: 25%;
      font-size: 0.28rem;
      border-right: 0.5px solid #e1e1e1;
    }
    .table-head-cell:last-child {
      border-right: 0;
    }
    .table-body {
      border-top: 0.5px solid #e1e1e1;
      padding: 0.3rem 0;
      display: flex;
      display: -webkit-flexbox;
      flex-wrap: nowrap;
      justify-content: space-between;
    }
    .table-body-cell {
      width: 25%;
      font-size: 0.22rem;
    }
    .hong {
      color: #ef5350;
      /* 黄色：ffca28
        绿色：66bb6a */
    }
    .huang {
      color: #ffca28;
    }
    .lv {
      color: #66bb6a;
    }
    button {
      width: 5rem;
      height: 1.2rem;
      color: #ffffff;
      font-size: 0.46rem;
      text-align: center;
      background: #7e57c2;
      border-radius: 0.1rem;
      display: block;
      margin: 0.3rem auto;
    }
    .dibu {
      position: fixed;
      bottom: 0.3rem;
      display: table;
      width: 100%;
      padding: 0 0.3rem;
      table-layout: fixed;
      border-top: 0;
      border-bottom: 0;
      color: #646464;
    }
    .row1 {
      padding-top: 0.5rem;
    }
    .row1-a {
      text-align: center;
      color: #fff;
      font-size: 0.3rem;
    }
    .row1-b {
      text-align: center;
      color: #fff;
      font-size: 0.5rem;
      padding-top: 0.5rem;
      padding-bottom: 0.4rem;
    }
</style>
