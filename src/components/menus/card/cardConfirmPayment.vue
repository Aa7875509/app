<template>
    <div>
      <div v-if="jies">
      <my-header  :title="'支付'" :back="false" @back="fanhui" ></my-header>
         <div class="ct" v-if="haidu">
            <div class="bank">付款方式<span>更多</span></div>
            <div class="mui-input-row mui-checkbox yinghang ztzhuse">
                <label><span>{{bankName}}</span><span>（{{cardNo}}）</span></label>
                <input class="sdsss" name="checkbox1" v-model="sadafg" type="checkbox">
            </div>
            <div class="row1">支付金额</div>
            <div class="roi">
              <span class="widtess">￥</span>
              <span class="muinput">{{jinese}}元</span>
            </div>
            <button class="bjzhuse" @click="haidus">确认支付</button>
        </div>
        <div class="ctr" v-else>
            <img src="../../../../static/commons/img/mine/ic_succeed.png" alt="">
            <div style="padding-left: .3rem;">
                <div style="color: #323232;font-size:0.28rem">恭喜你，支付 ¥ {{jinese}}元</div>
                <div style="color: #b4b4b4;font-size:0.22rem">点击查看支付记录</div>
            </div>
        </div>

      </div>
      <div  v-else>
        <cardyio v-on:chuanzi="chuanzi" v-on:chuanzii="chuanzii"  :datas='datas' :credit-card-ids="creditCardIds"></cardyio>
      </div>


    </div>
</template>
<script>
import myHeader from "../../../commons/publics/myHeader";
import cardyio from "./cardVerifyingGesturecrYptography";
export default {
  data() {
    return {
      sadafg:true,
      haidu:true,
      jies:true,
      bankName:'',
      jinese:'0.00',
      cardNo:'0000',
      creditCardIds:'1',//区分是支付还是提现，1为支付，2为提现
      datas:{
        creditCardId:'',//银行卡id
        retentionMoney:'',//保证金
        fee:'',//手续费
        repaymentAmount:'',//还款金额
        planReceipt:'',//计划回执
        bankName:'',//所属银行名称
        cardNo:''//银行卡号后四位
      },

    };
  },
  mounted() {
    var vm = this;

   vm.datas.creditCardId=vm.$route.query.creditCardId;
   vm.datas.retentionMoney=vm.$route.query.retentionMoney;
   vm.datas.fee=vm.$route.query.fee;
   vm.datas.repaymentAmount=vm.$route.query.repaymentAmount;
   vm.datas.planReceipt=vm.$route.query.planReceipt;
   vm.bankName=vm.$route.query.bankName;
   vm.cardNo=vm.$route.query.cardNo;
   if(!vm.datas.fee+vm.datas.retentionMoney){
      vm.jinese=vm.datas.fee+vm.datas.retentionMoney;
   }
   

    mui.init({
        keyEventBind: {
            backbutton: true, //关闭back按键监听
        }
    });
    mui.back = function () {

       vm.fanhui();

    }


  },
  methods: {
      haidus(){
       var vm=this;
        // this.haidu=false;
          vm.$ajax({
        url: "openapi/v1/personalCenter/getSecurityCenter",
        type: "post",
        success: function(res) {
          if(res.code=='0000'){
            if(res.isBindGesturePassword=='1'){

                vm.jies=false;
            }else{

              var btnArray = ['取消', '确定'];
                mui.confirm('还未设置手势密码是否去设置？', '提示', btnArray, function(e) {
                  if (e.index == 1) {
                     vm.$router.push("/addGesture");
                  }
                })
            }
          }
        }})
      },
      chuanzi(){
        this.jies=true;
        this.haidu=false;
      },
      chuanzii(){
        this.jies=true;
      },

      fanhui(){
        var vm=this;
        if(vm.jies==true||vm.haidu==true){
            mui.confirm("是否放弃支付"," ",['否','是'],function(e){
           if(e.index==1){
               vm.$router.push("/card");
           }
         });
        }else{
           vm.$router.push("/card");
        }


      }
  },
  components: {
    myHeader,cardyio
  }
};
</script>
<style scoped>
  .ctr{
      margin-top: .88rem;
      background: #fff;
      display: flex;display: -webkit-flexbox;
      flex-wrap: nowrap;
      justify-content: center;
      padding: 1rem 2rem 1rem 0;
    }
.ct {
  margin:1.18rem .3rem 0 .3rem;
  padding-bottom: 0.4rem;
  background: #fff;
  border-radius: 0.1rem;
  text-align: left;
}
.yinghang{
  border-top: 1px solid #e1e1e1;
  font-size: .28rem;
  background: #fafafa;
  height: .98rem;
  line-height: .98rem;
}
.sdsss{
  margin-top: .1rem
}
#assfd{
 margin-top: .38rem;
 border-radius: 50%;
  float: right;
}
.row1 {
 padding: 0 .3rem;
 line-height: 1.14rem;
 height: 1.14rem;
 color: #323232;
 font-size: .24rem;
}
.row2 {
  border: 0;
  outline: none;
  border-bottom: 1px solid #e1e1e1;
  font-size: 0.7rem;
  font-weight: 600;
  color: #323232;
}
.roi{
  padding: 0 .3rem;
}
.msg {
  color: #b4b4b4;
  font-size: 0.22rem;
  padding: 0 .3rem;
}
button {
  width: 5rem;
  height: 1.2rem;
  color: #ffffff;
  font-size: 0.46rem;
  text-align: center;
  border-radius: 0.1rem;
  display: block;
  margin: .7rem auto;
  margin-bottom: 0;
}
.bank{
  height: .8rem;
  line-height: .8rem;
  margin-top: .3rem;
  color: #323232;
  font-size: .28rem;
  text-align: left;
  padding: 0 .3rem;
}
.bank span{
  float: right;
  color: #646464;
  font-size: .24rem;
}
.widtess{
  position: relative;
  top: -0.15rem;
  font-size: 0.4rem;
  margin-top: -0.4rem;
}

  .muinput{
    display: inline-block;
     height: .7rem;
    line-height:.7rem;
    font-size: .7rem;

  }

</style>

