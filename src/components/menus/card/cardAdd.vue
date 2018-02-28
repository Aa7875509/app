<template>
<div class="ctt">

    <my-header v-if="cardAdd==1"  :back="true" :title="'添加卡片'">

    </my-header>
    <my-header v-else  :back="false" @back="fanhui"  >

    </my-header>
    <div v-if="cardAdd==1">
    <div id="ysjdsds" class="content">

        <div class="qiehuan clear">
          <div style="width:50%;float: left; background: #fff;">
            <div @click="cardType = 1" :class="{ztzhusexian :cardType == 1}" class="card-qie" id="xinyongka">
              信用卡
              </div>
              </div>
              <div style="width:50%;float: left; background: #fff;">
            <div @click="cardType = 2" :class="{ztzhusexian:cardType == 2}" class="card-qie" id="chuxuka">
              储蓄卡
            </div>
          </div>
        </div>
	  <div v-if="cardType == 1" style="height:100%;width:100%;" class="ct">
      <div class="field-ct">
        <mt-field label="姓名：" disabled placeholder="请输入姓名" v-model="creditCard.name"></mt-field>
      <hr class="line"></hr>
      </div>
      
      <div class="field-ct">
        <mt-field label="身份证号：" readonly placeholder="请输入身份证号" v-model="creditCard.identityNo"></mt-field>
      <hr class="line"></hr>
      </div>
      
      <div class="field-ct">
        <mt-field label="卡号：" placeholder="请输入信用卡卡号" v-model="creditCard.cardNo"></mt-field>
      <hr class="line"></hr>
      </div>
     
      <div class="field-ct">
        <mt-field label="手机号：" placeholder="请输入绑定手机号" v-model="creditCard.phone"></mt-field>
      <hr class="line"></hr>
      </div>
      
      <div class="field-ct">

          <div @click="openPicker('validPeriod')" class="input2">
           <span style="display:inline-block;width: 30%; text-align: right ;font-size: .32rem;">有效期：</span><span style="margin-left:15px;font-size: .32rem;"> {{creditCard.validPeriod}}</span>
            </div>
      <hr class="line"></hr>
      </div>
      
      <div class="field-ct">
        <mt-field label="额度：" placeholder="请输入信用卡额度" v-model="creditCard.cardLimit"></mt-field>
      <hr class="line"></hr>
      </div>
     
      <div class="field-ct">
        <div style="padding-left: 0.2rem;" @click="openPicker('billingDate')" class="input2">
            <span style="display:inline-block;width: 30% ;text-align: right;  font-size: .32rem;">账单日：</span><span style="margin-left:15px;font-size: .32rem;">{{creditCard.billingDate}}</span>
            </div>
            <hr class="line"></hr>
      </div>
     
      <div class="field-ct">
        <div style="padding-left: 0.2rem;" @click="openPicker('paymentDueDate')" class="input2">
           <span style="display:inline-block;width:30%;text-align: right; font-size: .32rem;">还款日：</span><span style="margin-left:15px;font-size: .32rem;">{{creditCard.paymentDueDate}}</span>
        </div>
        <hr class="line"></hr>
      </div>
      
      <div class="field-ct">
        <mt-field label="CVV2：" v-model="creditCard.CNV" placeholder="请输入CVV2" ></mt-field>
      <hr class="line"></hr>
      </div>


      <div class="row1 clear">
        <div style="width:50%;float: left;">
          <input style="margin:0;" v-model="creditCard.phoneSMS" type="text" class="input2" placeholder="请输入验证码">
        </div>
          <div style="width:50%;float: left;">
            <button @click="getYan" :class="{avtive: isGet}" :disabled="isGet" class="button-yanz bjzhuse"> {{ isGet? second + 's重新获取' : '获取短信验证码'}} </button>
          </div>


		  </div>
      <button @click="creditCardSend" class="button1 bjzhuse">完成提交</button>
	</div>


			<!-- <button v-show="progress==2" class="button1">完成提交</button> -->
	<div v-if="cardType == 2" style="background: #efeef4;height:100%;width:100%" class="ct">
    <div class="field-ct">
        <mt-field label="姓名：" disabled placeholder="请输入姓名" v-model="saveCard.name"></mt-field>
      <hr class="line"></hr>
      </div>
      <div class="field-ct">
        <mt-field label="身份证号：" readonly placeholder="请输入身份证号" v-model="saveCard.identityNo"></mt-field>
      <hr class="line"></hr>
      </div>
      <div class="field-ct">
        <mt-field label="卡号：" placeholder="请输入银行卡号" v-model="saveCard.cardNo"></mt-field>
     <hr class="line"></hr>
      </div>
      <div class="field-ct">
        <mt-field label="手机号：" placeholder="请输入绑定手机号" v-model="saveCard.phone"></mt-field>
      <hr class="line"></hr>
      </div>
			<!-- <input v-model="saveCard.name" type="text" class="input1" placeholder="请输入姓名">
			<input v-model="saveCard.identityNo" type="text" class="input1" placeholder="请输入身份证">
			<input v-model="saveCard.cardNo" type="text" class="input1" placeholder="请输入储蓄卡卡号">
			<input v-model="saveCard.phone" type="text" class="input1" placeholder="请输入绑定手机号"> -->
      <div class="row1 clear">
        <div style="width:50%;float: left;">
          <input style="margin:0;" v-model="saveCard.phoneSMS" type="text" class="input2" placeholder="请输入验证码">
        </div>
          <div style="width:50%;float: left;">
            <button @click="getYan" :class="{avtive: isGet}" :disabled="isGet" class="button-yanz bjzhuse"> {{ isGet? second + 's重新获取' : '获取短信验证码'}} </button>
          </div>


		  </div>
      <button @click="saveCardSend" class="button1 bjzhuse">完成提交</button>


	</div>

    </div>
    </div>
    <div v-if="cardAdd==2">
      <div v-if="cardSuccessType==1" class="ct24362">
        <div class="add54397">添加信用卡成功</div>
        <div>
            <img class="img9438" src="../../../../static/commons/img/mine/ic_succeed.png" alt="">
        </div>
        <div class="hai5240">您还可以继续创建计划</div>
        <div>
            <button class="chuangjian bjzhuse" @click="createPlan">去创建计划</button>
        </div>
      </div>
      <div v-if="cardSuccessType==2" class="ct24362">
        <div class="add54397">添加成功</div>
        <div>
            <img class="img9438" src="../../../../static/commons/img/mine/ic_succeed.png" alt="">
        </div>

      </div>

    </div>
</div>
</template>
<script>
import myHeader from "../../../commons/publics/myHeader";
import { Toast, Indicator, Loadmore } from "mint-ui";
import pickers from "../../../../static/commons/js/mui.picker.min";
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
      cardAdd: 1, //1表示正在填写表单，表示在提交手机验证码，2表示提交成功
      yanzhengma: null,
      isGet: false,
      interVal: null,
      second: 60,
      cardSuccessType: null,   //  添加卡片成功，类型  1为信用卡，2为储蓄卡
      //信用卡
      creditCard: {
        action: 1, //1=信用卡，2=储蓄卡
        name: "姓名",
        identityNo: "",
        cardNo: null,
        phone: null,
        validPeriod: '请输入有效期',
        cardLimit: null,
        billingDate: '请输入账单日',
        paymentDueDate: '请输入还款日',
        CNV: "",
        phoneSMS: ""
      },
      //储蓄卡
      saveCard: {
        action: 2, //1=信用卡，2=储蓄卡
        name: "",
        identityNo: "",
        cardNo: null,
        phone: null,
        phoneSMS: null,
      },
      creditCardCheck: {
        name: "姓名",
        identityNo: "身份证号",
        cardNo: "卡号",
        phone: "手机号",
        validPeriod: "有效期",
        cardLimit: "额度",
        billingDate: "账单日",
        paymentDueDate: "还款日",
        CNV: "CVV2"
      },
      id: '',
      name: '',
      cardNo: '',
    };
  },

  mounted() {
    // document
    //   .getElementById("ysjdsds")
    //   .addEventListener("swipedown", function(e) {
    //     console.log("swipedown");
    //     Indicator.open();

    //     setTimeout(() => {
    //       Indicator.close();
    //     }, 1000);
    //   });
    //this.addCardAssist();
   
    const self = this

   
            mui.init({
                keyEventBind: {
                    backbutton: true, //关闭back按键监听
                }
            });
            mui.back = function () {
              if(self.cardAdd==1){
                self.$router.go(-1);
              }else{
                self.fanhui();
              }   
            }
    //console.log(this.$route.query)
    self.creditCard.name = this.$route.query.name;
    self.creditCard.identityNo = this.$route.query.identity;
    self.saveCard.name = this.$route.query.name;
    self.saveCard.identityNo = this.$route.query.identity;

  },
  wathc:{
    'cardSuccessType':function (val) {
      if (val==2) {
        Toast("三秒后将会自动返回至卡包！");
        setTimeout(()=>{
          this.$router.push('/card');
        },3000);
      }
    }
  },

  methods: {
    //表单验证，都不为空时返回true,有一项为空时，返回为空的那个属性
    checkForm(obj) {
      for (let variable in obj) {
        //console.log(variable);
        if (obj[variable]) {
          //
        } else {
          Toast(this.creditCardCheck[variable] + "不能为空");
          return variable;
        }
      }
      return true;
    },
    //信用卡提交
    creditCardSend() {
      // Indicator.open();
 
      // setTimeout(()=>{
      //   Indicator.close();
      // },1000)
      // return;
      if (this.checkForm(this.creditCard) === true) {

        this.creditSubmit();

      }
    },
    //提交表单数据
    creditSubmit() {
      const self = this;
      this.$ajax({
        url: "openapi/v1/consumption/addCard",
        type: "post",
        data: self.creditCard,
        success: function(res) {

          if (res.code == "0000") {
            Toast(res.msg);
            self.cardAdd = 2;
            self.cardSuccessType = 1
            self.id = res.creditCardId
          } else {
            Toast(res.msg);
          }
        }
      });
    },
    saveCardSend(){
      if (this.checkForm(this.saveCard) === true) {
        Toast("成功");
        this.saveCardSubmit();

      }
    },
    saveCardSubmit(){
      const self = this;
      this.$ajax({
        url: "openapi/v1/consumption/addCard",
        type: "post",
        data: self.saveCard,
        success: function(res) {

          if (res.code == "0000") {
            Toast(res.msg);
            self.cardSuccessType = 2
            self.id = res.creditCardId

            self.cardAdd = 2;
          } else {
            Toast(res.msg);
          }
        }
      });
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
            Toast('还款日不能超过账单日之后30天，请设置账单日');
          }
        });
      } else{
        var dtPicker = new mui.DtPicker({
          type: "month",
          beginDate: new Date(2006,12), //设置开始日期
          endDate: new Date(2028,11) //设置结束日期
        });
        dtPicker.show(function(e) {
          // console.log(e);
          vm.creditCard[value] = e.value;
        });
      }
    },
    //创建计划，通过路由传参，传后端返回的新建的信用卡id和填写的姓名，卡号
    createPlan() {
      const self = this;
      this.$router.push({ path: '/cardEstablishComplete', query: { id:self.id,name: self.creditCard.name,cardNo: self.creditCard.cardNo }});
    },
    //发送手机获取验证码前，对手机号做正则校验
    regBeforeSendSMS(phone){
      if(/^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,6,7,8]{1}\d{8}$|^18[\d]{9}$/.test(phone)){
        return true;
      } else{
        return false;
      }
    },
    getYan() {
      
      this.second = 60;
      const self = this
      clearInterval(this.interVal);
      this.interVal = setInterval(function() {
        self.second--;
        if (self.second == 0) {
          clearInterval(self.interVal);
          self.isGet = false;
        }
      }, 1000);
      if(this.cardType == 1){
        if(this.regBeforeSendSMS(self.creditCard.phone)){
          this.addCardSendSMS();
        } else{
          Toast('手机号格式错误');
        }

      } else{
        if(this.regBeforeSendSMS(self.saveCard.phone)){
          this.saveCardSendSMS()
        } else{
          Toast('手机号格式错误');
        }

      }


    },
    //获取用户前置判断，获取姓名和身份证号，改为上一个路由组件判断。
    addCardAssist() {
      const self = this;
      this.$ajax({
        url: "openapi/v1/consumption/addCardAssist",
        type: "post",
        success: function(res) {
          //console.log(res);
          if (res.code == "0000") {
            self.creditCard.name = res.name;
            self.creditCard.identityNo = res.identity;
            self.saveCard.name = res.name;
            self.saveCard.identityNo = res.identity;

          } else {
            Toast(res.msg);
          }
        }
      });
    },
    //信用卡手机验证码
    addCardSendSMS() {
      this.isGet = true;
      const self = this;
      this.$ajax({
        url: "openapi/v1/consumption/addCardSendSMS",
        type: "post",
        data: { cardNo: self.creditCard.cardNo, phone: self.creditCard.phone },
        success: function(res) {
          //console.log(res);
          if (res.code == "0000") {
            Toast('短信发送成功，请注意查收');
            this.cardAdd = 2;
          } else {
            Toast(res.msg);
            clearInterval(self.interVal);
            self.isGet = false;
          }
        }
      });
    },
    //储蓄卡手机验证码
    saveCardSendSMS() {
      this.isGet = true;
      const self = this;
      this.$ajax({
        url: "openapi/v1/consumption/addCardSendSMS",
        type: "post",
        data: { cardNo: self.saveCard.cardNo, phone: self.saveCard.phone },
        success: function(res) {
          //console.log(res);
          if (res.code == "0000") {
            Toast('短信发送成功，请注意查收');
            this.cardAdd = 2;
          } else {
            Toast(res.msg);
            clearInterval(self.interVal);
            self.isGet = false;
          }
        }
      });
    },
    fanhui(){
      this.$router.push('/card');
    }
  },

  computed: {},

  components: {
    myHeader
  },
  created(){
    //console.log('created',Date.now())
  },

};
</script>
<style scoped>
@import url("../../../../static/commons/css/mui.picker.min.css");
.content {
  margin-top: 0.88rem;
}
/* input:focus{
    border: 1px solid #8844c8;
} */
.input1 {
  display: block;
  width: 88%;
  border: 0;
  outline: none;
  border-radius: 0;
  margin: 0.3rem auto;
  padding-left: 0.4rem;
  font-size: 0.28rem;
  height: 0.8rem;
  line-height: 0.8rem;
}
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
.input2 {
      display: block;
    border: 0;
    border-radius: 0;
    outline: none;
    padding-left: 6px;
    font-size:.32rem;
    /* height: 0.8rem; */
    line-height: 40px;
    background: #fff;
    text-align: left;
}

.row1 {
  width: 99%;

}

/* .row1::after {
  content: "";
  clear: both;
  display: block;
  width: 0;
  height: 0;
} */
.button1 {
  width: 66%;
  display: block;
  margin: 0.4rem auto;
  margin-bottom: 0;
  border-radius: 0.1rem;
  border: 0;
 
  font-size: 0.4rem;
  height: 1rem;
  color: #fff;
}
.card-qie {
  padding: 0.2rem 0.4rem;
  font-size: 0.3rem;

  color: #333;
}
.qiehuan {
  width: 100%;

  background: #fff;
}
/* .qiehuan::after {
  content: "";
  clear: both;
  display: block;
  width: 0;
  height: 0;
} */
/* .active.card-qie {
  color: #8844c8;
  border-bottom: 2px solid #8844c8;
} */
.mint-cell-title{
  text-align: right;
  font-size: .32rem;
}
.chuangjian {
  width: 5rem;
  height: 1.2rem;
  color: #ffffff;
  font-size: 0.46rem;
  text-align: center;
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
.avtive.button-yanz {
  background: #d6d7dc !important;
  color: #7f8393;
  border: 0;
}
.button-yanz {
    width: 100%;
    height: 40px;
    font-size: 16px;
    
    color: #fff;
    border: 0;
    border-radius: 0;
}
.field-ct {
  text-align: left;
  background: #fff;
}
.ct{
  padding: .3rem;
}
.line {
		margin-left: .3rem;
		height: 1px;
		border: 0;
		background: #e1e1e1;
		box-sizing: border-box;
		-webkit-margin-before: 0;
		-webkit-margin-after: 0;
	}
</style>
