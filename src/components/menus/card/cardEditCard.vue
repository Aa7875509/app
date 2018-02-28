<template>
  <div class="ct">
    <my-header :title="'编辑信用卡'"></my-header>
    <div id="ysjdsds" class="content">
      <div  style="background: #efeef4;height:100%;width:100%" class="ct">
        <form class="mui-input-group">
            <div class="mui-input-row">
                <label>姓名：</label>
                <input type="text"  disabled="true"  class="mui-input-clear"  v-model="creditCard.name" placeholder="">
            </div>
            <div class="mui-input-row">
                <label>身份证：</label>
                <input type="text"  disabled="true" class="mui-input-clear"  v-model="creditCard.identityNo" placeholder="">
            </div>
            <div class="mui-input-row">
                <label>信用卡：</label>
                <input type="text"  disabled="true" class="mui-input-clear"   v-model="creditCard.cardNo" placeholder="">
            </div>
            <div class="mui-input-row">
                <label>手机号：</label>
                <input type="text"  disabled="true" class="mui-input-clear" v-model="creditCard.cardPhone" placeholder="">
            </div>
            <div class="mui-input-row" >
                <label>有效期：</label>
                <span class="inst" >{{creditCard.validPeriod}}</span>
            </div>
            <div class="mui-input-row">
                <label>额度：</label>
                <input type="text" class="mui-input-clear"  v-model="creditCard.cardLimit" placeholder="">
            </div>
            <div class="mui-input-row" @click="openPicker('billingDate')">
                <label>账单日：</label>
                <span class="inst" >{{creditCard.billingDate}}</span>
            </div>
            <div class="mui-input-row" @click="openPicker('paymentDueDate')">
                <label>还款日：</label>
                <span class="inst"   >{{creditCard.paymentDueDate}}</span>
            </div>
            <div class="mui-input-row ">
                <label>CVV2：</label>
                <input type="text" disabled="true" class="mui-input-clear"  v-model="creditCard.CVN" placeholder="">
            </div>
        </form>
        <button @click="creditCardSend" class="button1 bjzhuse">完成提交</button>
      </div>
    </div>
  </div>
</template>
<script>
import myHeader from "../../../commons/publics/myHeader";
import pickers from "../../../../static/commons/js/mui.picker.min";
import cardyio from "./cardVerifyingGesturecrYptography";
export default {
  data() {
      var time = new Date();
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var t = time.getDate()
        if (month < 10) {
          month = "0" + month;
        }
      var today =  year + "-" + month + "" + '-' + t;
    return {
      cardType: 1, //1为信用卡，2为储蓄卡
      title: "添加卡片",
      //添加信用卡成功状态
     isd:'',//信用卡id
     jaizai:'',
      //
      creditCard: {
        name: null,
        identityNo: null,
        cardNo: null,
        cardPhone: null,
        validPeriod: "",
        cardLimit: null,
        billingDate: "",
        paymentDueDate: "",
        CVN: null
      },
      creditCardCheck: {
        name: "姓名",
        identityNo: "身份证号",
        cardNo: "卡号",
        cardPhone: "手机号",
        validPeriod: "有效期",
        cardLimit: "额度",
        billingDate: "账单日",
        paymentDueDate: "还款日",
        CVN: "CVV2"
      },
      isChangePayInfo:null,
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
    vm.creditCard=vm.$route.query;

  //   vm.isChangePayInfo=vm.$route.query.isChangePayInfo;
  //  console.log(vm.isChangePayInfo)

  },
  methods: {

      //信用卡提交
     creditCardSend(){
        var vm =this;
        vm.$ajax({
          url: "openapi/v1/consumption/editCreditCard",
          type: "post",
          data: {creditCardId:vm.creditCard.creditCardId,
          cardLimit:vm.creditCard.cardLimit,
          billingDate:vm.creditCard.billingDate,
          paymentDueDate:vm.creditCard.paymentDueDate,
          // CVN:vm.creditCard.CVN,
          // validPeriod:vm.creditCard.validPeriod
          },
          success: function(res) {
          if (res.code == "0000") {
              mui.toast("修改成功!");
              vm.$router.push("/card");

          } else {
           mui.toast(res.msg);
          }
        }
      });
     },
    //表单验证，都不为空时返回true,有一项为空时，返回为空的那个属性
    checkForm(obj) {
      for (let variable in obj) {
        // console.log(variable);
        if (obj[variable]) {
        } else {
           mui.toast(this.creditCardCheck[variable] + "不能为空");
          return variable;
        }
      }
      return true;
    },
  //  myvalidPeriod(){
  //       var vm = this;
  //       var dtPicker = new mui.DtPicker({
  //         type: "month",
  //         beginDate: new Date(2006,12), //设置开始日期
  //         endDate: new Date(2028,11) //设置结束日期
  //       });
  //       dtPicker.show(function(e) {
  //         // console.log(e);
  //         vm.creditCard.validPeriod = e.value;
  //       });
  //  },

    openPicker(value) {

      var vm = this;
      const self = this
      if (value == "paymentDueDate") {      //如果是设置还款日，根据账单日设置可选范围
        var dtPicker = new mui.DtPicker({
          type: "date",
          beginDate: new Date(this.creditCard.billingDate), //设置开始日期
          endDate: new Date(this.monthOver(this.creditCard.billingDate)) //设置结束日期
        });
        dtPicker.show(function(e) {

          vm.creditCard[value] = e.value;
        });
      } else if(value == "billingDate"){   //如果是设置账单日，检测还款日有米有超出取值范围
        var dtPicker = new mui.DtPicker({
          type: "date",
          // beginDate: new Date("2017-04-25"), //设置开始日期
          // endDate: new Date("2017-06-25") //设置结束日期
        });
        dtPicker.show(function(e) {
          vm.creditCard[value] = e.value;
          if((Date.parse(self.creditCard.paymentDueDate)-Date.parse(e.value))>86400000*30 ||
              (Date.parse(self.creditCard.paymentDueDate)-Date.parse(e.value)) < 0 ){
            self.creditCard.paymentDueDate = e.value
            mui.toast("还款日不能超过账单日之后30天，请设置账单日");
          }
        });
      } else{
        var dtPicker = new mui.DtPicker({
          type: "date",

        });
        dtPicker.show(function(e) {
          // console.log(e);
          vm.creditCard[value] = e.value;
        });
      }
    },
    monthOver(time) {
      var time = new Date(time);
      var year = time.getFullYear();
      var month = time.getMonth() + 2;
      var t = time.getDate()
      if (month < 10) {
        month = "0" + month;
      }
      return year + "-" + month + "" + '-' + t;
    },
  },
  computed: {},
  components: {
    myHeader,cardyio
  }
};
</script>
<style scoped>
@import url("../../../../static/commons/css/mui.picker.min.css");
.content {
  margin-top: 1.18rem;
  padding:0 .3rem;
  ;
}
/* input:focus{
    border: 1px solid #8844c8;
} */
.input1 {
  display: block;
  width: 88%;
  border: 0;
  outline: none;
  border-radius: 8px;
  margin: 0.3rem auto;
  padding-left: 0.4rem;
  font-size: 0.28rem;
  height: 0.8rem;
  line-height: 0.8rem;
}
.mui-input-clear{
  font-size: .28rem;

}
.mui-input-row label{
  text-align: right;
  font-size: .32rem;

}
/* .mui-input-row{
  border-bottom: 1px solid #d9d9d9;
} */
#chuxuka {
  width: 2rem;
  margin: 0 auto;
}
#xinyongka {
  margin: 0 auto;
  width: 2rem;
}
.myyingyong {
  width: 2rem;
}
body {
  margin: 0;
  padding: 0;
  background: #efeef4;
}
.inst {
    text-align: left;
    font-size: 0.28rem;
    height: 39px;
    line-height: 39px;
    float: left;
    color: #000;
}

.row1 {
  width: 99%;
  margin: 0.2rem auto;
}

.row1::after {
  content: "";
  clear: both;
  display: block;
  width: 0;
  height: 0;
}
.button1 {
  width: 66%;
  display: block;
  margin: 0.4rem auto;
  border-radius: 0.1rem;
  border: 0;
  font-size: 0.4rem;
  height: 1rem;
  color: #fff;
}
.card-qie {
  padding: 0.2rem 0.4rem;
  font-size: 0.3rem;
  border-bottom: 2px solid #fff;
  color: #333;
}
.qiehuan {
  width: 100%;

  background: #fff;
}
.qiehuan::after {
  content: "";
  clear: both;
  display: block;
  width: 0;
  height: 0;
}
.active.card-qie {
  color: #8844c8;
  border-bottom: 2px solid #8844c8;
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
.add54397 {
  font-size: 0.32rem;
  color: #66bb6a;
  padding-top: 0.58rem;
}
.img9438 {
  height: 1rem;
  padding-top: 0.24rem;
}
.hai5240 {
  font-size: 0.32rem;
  color: #323232;
  padding-top: 0.76rem;
  padding-bottom: 0.45rem;
}
.ct24362 {
  margin-top: 0.88rem;
}
</style>
