<template>
    <div>
        <my-header :title="'钱包'" :back="false" @back="fanhui"></my-header>
        <div class="content">
            <div class="ct">
                <div  class="row1 bjfuse2">
                    <div @click="tatalAssets" class="row1-a">总资产（元）</div>
                    <div v-if="propertyDisplay" style="box-sizing:content-box;height: .42rem;" class="row1-b">
                        <span @click="tatalAssets">{{property.totalAssets}}</span>
                    
                        <img @click="tatalAssetsshow" style="height: .25rem;margin-left:.2rem;margin-bottom: 0.06rem;" src="../../../../../static/commons/img/mine/ic_see.png"   alt="">
                    </div>
                    <div v-else style="box-sizing:content-box;height: .42rem;" class="row1-b"><span @click="tatalAssets">******</span>
                        <img @click="tatalAssetsshow" style="height: .25rem;margin-left:.2rem;margin-bottom: 0.13rem;" src="../../../../../static/commons/img/mine/ic_hide.png"   alt="">
                    </div>
                </div>
                <div class="row2">
                    <div @click="tixian"  class="row2-a ztzhuse">
                        <div style="font-size: 0.28rem;">可提收益</div>
                        <div style="font-size:0.32rem" v-if="propertyDisplay">{{property.canExtractCommission}}</div>
                        <div style="font-size:0.32rem" v-else>******</div>
                    </div>
                    <div @click="tixianjilu" class="row2-b ztzhuse">
                        <div style="font-size: 0.28rem;">已提收益</div>
                        <div style="font-size:0.32rem" v-if="propertyDisplay">{{property.alreadyExtractCommission}}</div>
                        <div style="font-size:0.32rem" v-else>******</div>
                    </div>
                </div>
                <div @click="oneShare" v-if="isProxy" class="row3">
                    <div class="row3-a">收益账单</div>
                    <span class="row3-b mui-icon mui-icon-arrowright"></span>
                </div>
                <div v-if="isProxy" class="row4">
                    <div class="row4-a">
                        <div class="row4-a-a">{{oneProxy.numberPeople}}个</div>
                        <div style="font-size: 0.24rem;" class="grey-mini row4-a-b">总人数（个）</div>
                    </div>
                    <div class="row4-b">
                        <div class="row4-b-a" v-if="propertyDisplay">{{oneProxy.commission}}</div>
                        <div class="row4-b-a" v-else>******</div>
                        <div class="grey-mini row4-b-b">总收益（元）</div>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>
<script>
import myHeader from "../../../../commons/publics/myHeader";
export default {
  data() {
    return {
      property: {
        totalAssets: '0.00',
        canExtractCommission: "0.00",
        alreadyExtractCommission: 0
      },
      propertyDisplay:true,
      isProxy:true,
      oneProxy: {
        numberPeople: 0,
        commission: 0
      },

    }
  },
  mounted() {
    mui.init();
    var vm =this;
      mui.init({
          keyEventBind: {
              backbutton: true, //关闭back按键监听
          }
      });
      mui.back = function () {
          vm.fanhui();
         
      }

     vm.propertyDisplay=vm.$route.query.yanj;
  },
  methods: {
    tixian() {
      //console.log(34567);
      
    },
    tatalAssets() {
       var vm =this;
          vm.$router.push({
								path: '/assets',
								query: {yanj:vm.propertyDisplay}
							})
    },
    fanhui(){
     this.$router.push("/mine");
    },
    oneShare() {
     
      var vm =this;
      vm.$router.push({
            path: '/oneShare',
            query: {yanj:vm.propertyDisplay}
          })
    },
    twoShare() {
     
      var vm =this;
    vm.$router.push({
          path: '/twoShare',
          query: {yanj:vm.propertyDisplay}
        })
    },
    tixianjilu() {
      //this.$router.push("/tixianjilu");
    },
    getData() {
      const self = this;
      this.$ajax({
        url: "openapi/v1/personalCenter/walletBriefInfo",
        type: "post",
        success: function(res) {
          if (res.code == "0000") {
            self.property = res.property;
            if(res.proxy){
              self.isProxy = true;
              self.oneProxy = res.proxy;
            }else{
              self.isProxy = false;  
            }
          }
        }
      });
    },
    tatalAssetsshow() {
      var vm = this;
      vm.propertyDisplay = !vm.propertyDisplay;
     
    }
  },
  created() {
    this.getData();
  },
  components: {
    myHeader
  }
};
</script>
<style scoped>
.ct {
  background: #efeef4;
}
.content {
  margin-top: 0.88rem;
}
.row1 {
  padding-top: 0.5rem;
}
.row1-a {
  text-align: center;
  color: #fff;
  font-size: 0.4rem;
}
.row1-b {
  text-align: center;
  color: #fff;
  font-size: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.4rem;
}
.row2 {
  display: flex;
  display: -webkit-flexbox;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  background: #fff;
}
.row2-a,
.row2-b {
  width: 49%;
  text-align: center;
}
.row2-a {
  border-right: 1px solid #f4f4f4;
}
.row3 {
  display: flex;
  display: -webkit-flexbox;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 0.3rem 0.4rem;
  margin: 0.2rem 0 0.02rem 0;
  background: #fff;
}
.row3-b {
  color: #999;
}
.row4 {
  background: #fafafa;
  margin-top: 0.02rem;
  padding: 0.4rem 0.4rem;
  display: flex;
  display: -webkit-flexbox;
  flex-wrap: nowrap;
  justify-content: space-between;
  font-size: 0.44rem;
  color: #323232;
}
.grey-mini {
  font-size: 0.28rem;
  color: #b4b4b4;
  margin-top: 0.1rem;
}
</style>

