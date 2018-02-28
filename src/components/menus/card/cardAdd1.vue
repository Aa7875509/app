<template>
<!-- 此组件已经废弃，为之前表单分为两页的情形 -->
<div class="ct">
    <my-header :title="title" :back="backStatus" @back="backButton" :right="rightTitle" @rightButton="rightButton">
        
    </my-header>
    <div class="content">

    
    <div v-show="progress==1" class="qiehuan">
		<div @click="cardType = 1" :class="{active:cardType == 1}" class="card-qie" id="xinyongka">信用卡</div>
		<div @click="cardType = 2" :class="{active:cardType == 2}" class="card-qie" id="chuxuka">储蓄卡</div>
	</div>
	<div v-show="progress==1" v-if="cardType == 1" style="background: #efeef4;height:100%;width:100%" class="ct">
			<input type="text" class="input1" placeholder="请输入姓名">
			<input type="text" class="input1" placeholder="请输入身份证">
			<input type="text" class="input1" placeholder="请输入信用卡卡号">
			<input type="text" class="input1" placeholder="请输入绑定手机号">
			
	</div>
    <div v-show="progress==2" class="row1">
				<input type="text" class="input2" placeholder="请输入信用卡有效期">
				<input type="text" class="input2" placeholder="请输入信用卡额度">
			</div>
			<div v-show="progress==2" class="row1">
				<input type="text" class="input2" placeholder="请输入账单日">
				<input type="text" class="input2" placeholder="请输入还款日">
			</div>
			<input v-show="progress==2" type="text" class="input1" placeholder="请输入CVN2">
			<!-- <button v-show="progress==2" class="button1">完成提交</button> -->
	<div v-if="cardType == 2" style="background: #efeef4;height:100%;width:100%" class="ct">
			<input type="text" class="input1" placeholder="请输入姓名">
			<input type="text" class="input1" placeholder="请输入身份证">
			<input type="text" class="input1" placeholder="请输入信用卡卡号">
			<input type="text" class="input1" placeholder="请输入绑定手机号">
			
			<button v-if="completedButton" class="button1">完成提交</button>
	</div>
    </div>
</div>
</template>
<script>
import myHeader from "../../../commons/publics/myHeader";
export default {
  data() {
    return {
      cardType: 1, //1为信用卡，2为储蓄卡
      title: "添加卡片",
      //   rightTitle: "完成",
      progress: 1
    };
  },
  mounted() {
    mui.init();
    for(var i = mui.hooks.inits.length-1,item;i>=0;i--){
          item=mui.hooks.inits[i];
          if(item.name=="pullrefresh"){
              item.repeat=true;
          }
      }
  },
  methods: {
    rightButton() {
      if (this.cardType == 1) {
        if (this.progress == 1) {
          this.progress = 2;
        }
      } else {
        //表单提交添加储蓄卡
      
      }
    },
    backButton() {
      if (this.cardType == 1 && this.progress == 2) {
        this.progress = 1;
      } else {
        this.$router.go(-1);
      }
    }
    //表单验证
  },
  computed: {
    rightTitle: function() {
      if (this.cardType == 1) {
        if (this.progress == 1) {
          return "下一步";
        } else {
          return "创建计划";
        }
      } else {
        return "完成";
      }
    },
    completedButton: function() {
      return this.cardType == 1 && this.progress == 2;
    },
    backStatus: function() {
      return this.cardType == 2 || (this.cardType == 1 && this.progress == 1);
    }
  },
  components: {
    myHeader
  }
};
</script>
<style scoped>
.content{
    margin-top: .88rem;
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
  height: 1rem;
  line-height: 1rem;
}
body {
  margin: 0;
  padding: 0;
  background: #efeef4;
}
.input2 {
  display: block;
  width: 40%;
  border: 0;
  outline: none;
  border-radius: 8px;
  margin: 0.1rem auto;
  padding-left: 0.3rem;
  font-size: 0.3rem;
  height: 1rem;
  line-height: 1rem;
}
.row1 {
  width: 99%;
  margin: 0.2rem auto;
  display: flex;display: -webkit-flexbox;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.button1 {
  width: 66%;
  display: block;
  margin: 0.4rem auto;
  border-radius: 0.1rem;
  border: 0;
  background: #8844c8;
  font-size: 0.4rem;
  height: 1rem;
  color: #fff;
}
.card-qie {
  padding: 0.2rem 0.4rem;
  font-size: 0.4rem;
  border-bottom: 2px solid #fff;
  color: #333;
}
.qiehuan {
  width: 100%;
  display: flex;display: -webkit-flexbox;
  background: #fff;
  justify-content: space-around;
}
.active.card-qie {
  color: #8844c8;
  border-bottom: 2px solid #8844c8;
}
</style>