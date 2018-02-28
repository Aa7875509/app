<template>
    <div>
      <!-- 卡包详情 -->
        <my-header :title="'计划详情'" :back="true"></my-header>
        <div class="title" >
            <div class="wode bjfuse2" ><span  @click="openPicker">{{nian}}年{{yue}}月&nbsp;<span class="mui-icon mui-icon-arrowdown"></span></span></div>
            <div class="table">
                <div class="table-head">
                    <div class="table-head-cell">时间</div>
                    <div class="table-head-cell">金额</div>
                    <div class="table-head-cell">操作</div>
                    <div class="table-head-cell">状态</div>
                </div>
            <div class="aout" id="shuzxonsd">
                <div v-for="(item,index) in oneShareData" :key="index" class="table-body">
                        <div class="table-body-cell">{{item.planAt}}</div>
                        <div class="table-body-cell">{{item.planAmount}}</div>
                        <div class="table-body-cell">{{item.type==1?'还款':'消费'}}</div>
                        <div class="table-body-cell hong" v-if="item.status == 0">消费失败</div>
                        <div class="table-body-cell lv" v-else-if="item.status == 1">已完成</div>
                        <div class="table-body-cell huang" v-else-if="item.status == 2">待完成</div>
                    </div>
                </div>
            </div>
            <div class="dibu" v-if="xfsb" >
                <button @click="haidus" >{{jihua}}</button>
            </div>
        </div>
    </div>
</template>
<script>
import myHeader from "../../../commons/publics/myHeader.vue";
export default {
  data() {
     var my = this;
    var now = new Date();
    var today = now.getFullYear()+'';
   var ri= ((now.getMonth() + 1) < 10 ? "0" : "") + (now.getMonth() + 1)
    return {
      oneShareData: [],
      nian: '',
      yue: '',
      creditCardId:'',
      db2: [],
      mydate:'',
      xfsb:false,
      jihua:'再次生成计划',
      xianshi:'',
      length:1,
      rowCount:null,
      shifjiaz:true,
      kongzhikaiguan:true,
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
    vm.creditCardId=vm.$route.query.creditCardId;
    vm.xianshi=vm.$route.query.status;
      if(vm.xianshi==3){//
            vm.xfsb=true;
            vm.jihua='再次生成计划';
            $(".aout").css("height", window.innerHeight - 240);
        }
      if(vm.xianshi==0){//消费失败
              vm.xfsb=true;
              vm.jihua='重新生成计划';
              $(".aout").css("height", window.innerHeight - 240);
      }
      if(vm.xianshi==2){//消费失败
             vm.haidus()
             return;
      }
      if(vm.xianshi==1){//消费失败
              vm.xfsb=false;
              $(".aout").css("height", window.innerHeight - 140);
      }
    vm.myajas();
    
    $("#shuzxonsd").on("swipeup", function(e) {
      if(vm.kongzhikaiguan){
        //数据是否正在请求中
          if(vm.shifjiaz){
            if(vm.rowCount>10){
                    var w = plus.nativeUI.showWaiting("加载中...");
                    vm.length++;
                  
                    vm.myajas();
                    setTimeout(() => {
                    w.close();
                }, 1000);
            }
        }
      }
     
      
    });
  },
  methods: {
    // 请求数据
    myajas() {
        var vm=this;
        var w = plus.nativeUI.showWaiting("加载中...");
         var sousuo='';
        if(!vm.nian){
        
        }else{
          sousuo=vm.nian+'-'+vm.yue;
        }
        vm.kongzhikaiguan=false;
        vm.$ajax({
           url: "openapi/v1/consumption/getCreditPlans",
                type: "post",
                data:{creditCardId:vm.creditCardId,planAt:sousuo,page:vm.length,pageLength:10,},
                success: function(res) {
              if(res.code=='0000'){
                vm.kongzhikaiguan=true;
                 w.close();
                if(res.data.length<10){
                   vm.shifjiaz=false;
                   if(vm.length>1){
                       mui.toast("已无更多数据");
							   }
                }else{
                     vm.shifjiaz=true;
                }
                if(vm.length==1){
                  vm.oneShareData=res.data;
                }else{
                  vm.oneShareData= vm.oneShareData.concat(res.data);
                }
                  vm.rowCount=res.rowCount;
              if(!res.planAts) return
                  vm.mydate=res.planAts;
                  vm.nian=vm.mydate[0].slice(0,4);
                  vm.yue=vm.mydate[0].slice(-2);
            }else{
              mui.toast(res.msg);
               w.close();
            }
          }
        })
    },
    haidus() {
      var vm=this;
      this.$router.push({
        path: "/cardEstablishComplete",
        query: { id: vm.creditCardId}
      });
    },
    openPicker() {
       var vm = this;
       if(vm.mydate.length==0){
            mui.toast("没有数据");
            return
       };
      var dtPicker = new mui.DtPicker({
        type: "month",
        beginDate: new Date(vm.mydate[0].slice(0,4),vm.mydate[0].slice(-2)-1),
        endDate: new Date(vm.mydate[1].slice(0,4),vm.mydate[1].slice(-2)-1),
      });
      dtPicker.show(function(e) {
        vm.nian = e.y.text;
        vm.yue = e.m.text;
        vm.length=1;
        vm.myajas();
      });
    }
  },
  components: {
    myHeader
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
.lang{
  color: #42a5f5;
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
  bottom: 0.04rem;
  display: table;
  width: 100%;
  padding: 0 0.3rem;
  table-layout: fixed;
  border-top: 0;
  border-bottom: 0;
  color: #646464;
}
</style>