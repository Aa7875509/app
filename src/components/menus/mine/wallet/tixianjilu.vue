<template>
<!-- 提现记录 -->
<div>
  <my-header :title="'分享明细'"></my-header>
<div class="ct">
    
    <div class="table">
            <div class="table-head">
                <div class="table-head-cell">时间</div>
                <div class="table-head-cell">金额</div>
                <div class="table-head-cell">状态</div>
            </div>
            <div v-for="(item,index) in oneShareData" :key="index" class="table-body">
                <div class="table-body-cell">{{item.sharePhone}}</div>
                <div class="table-body-cell">{{item.time}}</div>
                <div class="table-body-cell">{{item.shareAction == 1?'成功':'失败'}}</div>
                
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
      oneShareData: [
        {
          sharePhone: "2017.01.07",
          time: 2222.88,
          shareAction: 1
        },
        {
          sharePhone: "2017.01.07",
          time: 2222.88,
          shareAction: 1
        },
        {
          sharePhone: "2017.01.07",
          time: 2222.88,
          shareAction: 1
        }
      ]
    };
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route.path': function(to,from) {
      console.log("456789");
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
          vm.$router.go(-1);
      }
      
  },
  components: {
    myHeader
  }
};
</script>

<style scoped>
.ct {
  background: #efeef4;
  margin-top: 44px;
}

.row1 {
  background: #7212bd;
  padding-top: 1rem;
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
  padding-bottom: 0.8rem;
}

.row2 {
  display: flex;display: -webkit-flexbox;
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
  display: flex;display: -webkit-flexbox;
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
  display: flex;display: -webkit-flexbox;
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
.table {
  background: #fff;
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


