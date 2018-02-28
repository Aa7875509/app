<template>
    <div>
       <div v-if="jies">
      <my-header :title="'提现'" :back="false" @back="fanhui"></my-header>
        <div class="ct" v-if="haidu">
            <div class="bank">转到银行卡<span>更多</span></div>
            <form class="mui-input-group">
              <div class="mui-input-row mui-radio yinghang ztzhuse" v-for="(item,index) in 3" :key="index">
                <label><span>{{banks}}</span><span>（{{card}}）</span></label>
                <input name="radio1" class="sdsss"  v-model="sadafg" type="radio">
              </div>
            </form>
            <div class="row1">提现金额</div>
            <div class="mui-input-row">
                <label class="widtess">￥</label>
            <input type="text" class="mui-input-clear" placeholder="请输入金额">
            <hr class="line"></hr>
            </div>
            <div class="msg">可提收益￥{{mymoney}}</div>
            <button class="bjzhuse" @click="haidus">提现</button>
            <div style="font-size: .22rem;color: #b4b4b4;margin-top: .38rem;text-align:center;">2小时内到账</div>
        </div>
          <div class="ctr" v-else>
            <img src="../../../../../static/commons/img/mine/ic_succeed.png" alt="">
            <div style="padding-left: .3rem;">
                <div style="color: #323232;font-size:0.28rem">恭喜你，提现 ¥ {{mymoney}}元</div>
                <div style="color: #b4b4b4;font-size:0.22rem">点击查看提现记录</div>
            </div>
        </div>
      </div> 
      <div v-else>
         <cardyio v-on:chuanziyi="chuanziyi" :credit-card-id="creditCardIds"></cardyio>
      </div>
    </div>
</template>
<script>
import myHeader from "../../../../commons/publics/myHeader";
import cardyio from "../../card/cardVerifyingGesturecrYptography";
export default {
  data() {
    return {
      banks:"招商银行",
      card:'0000',
      mymoney:'0',
      sadafg:null,
      haidu:true,
      jies:true,
      creditCardIds:'2',
    };
  },
  mounted() {
    var vm = this;
    var vm=this;
      mui.init({
          keyEventBind: {
              backbutton: true, //关闭back按键监听
          }
      });
      mui.back = function () {
         vm.fanhui();
        
      }
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
      haidus(){
        // this.haidu=false;
         this.jies=false;
      },
      chuanziyi(){
     
         this.jies=true;
         this.haidu=false;
      },
      fanhui(){
       this.$router.push("/mine");
      }
     
  },
  components: {
    myHeader,cardyio,
  }
};
</script>
<style scoped>
  .ctr{
      margin-top: 45px;
      background: #fff;
      display: flex;display: -webkit-flexbox;
      flex-wrap: nowrap;
      justify-content: center;
      padding: 1rem 2rem 1rem 0;
    }
.ct {
  margin: 65px .3rem 0 .3rem;
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
.msg {
  color: #b4b4b4;
  font-size: 0.22rem;
  padding: 0 .3rem;
  margin-top: .2rem;
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
    width: 12%;
    font-size: 0.4rem;

}
.line {
      margin-left: .3rem;
      height: 1px;
      border: 0;
      background: #e1e1e1;
      width: 100%;
      -webkit-margin-before: 0;
      -webkit-margin-after: 0;
      margin-right: .3rem;
    }
  .mui-input-row{
    padding-right: 1.3rem;
  }
  .hiter{
        margin-top:.88rem;
    }
    #changePwd{
       position: absolute;
       width:300px;
       height:300px;
       left:50%;
       top:40%;
       margin-left:-150px;
       margin-top:-150px
    }
</style>

