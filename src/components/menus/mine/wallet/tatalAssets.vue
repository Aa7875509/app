<template>
<div>
<my-header :title="'提现'"></my-header>

    <div class="ct">
        <div class="row1">支付金额</div>
        <div class="row2">
            ¥ 5555.00
        </div>
        <div class="msg">输入金额超过可提现金额</div>
        <button class="bjzhuse">提现</button>
        <div style="font-size: .22rem;color: #b4b4b4;margin-top: .38rem;text-align:center;">2小时内到账</div>
    </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
        
    };
  },
  mounted() {
    mui.init();
    const self = this;
    // this.$ajax({
    //     url: '/openapi/v1/personalCenter/getUserInfo',
    //     type: 'post',
    //     success: function(res){
    //         console.log(res)
    //         if(res.code == '0000'){
    //             console.log(res)
    //             self.phone = res.data.phone
    //             self.userName = res.data.userName

    //         }
    //     }
    // })
  },
  methods: {
      
  }
};
</script>
<style scoped>
.ct {
  width: 7rem;
  margin: 0.2rem auto;
  margin-top: .88rem;
  padding-bottom: 0.4rem;
  background: #fff;
  border-radius: 0.1rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  padding-top: 0.4rem;
}
.row1 {
  font-size: 0.34rem;
  color: #323232;
}
.row2 {
  padding: 0.6rem 0 0.6rem 0;
  border-bottom: 1px solid #e1e1e1;
  font-size: 0.7rem;
  font-weight: 600;
  color: #323232;
}
.msg {
  color: #f00;
  font-size: 0.1rem;
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
  margin: 1.2rem auto;
  margin-bottom: 0;
}
</style>

