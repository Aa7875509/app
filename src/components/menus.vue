<template>
  <div>
    <div class="mui-content " id="content">
      <div class="ct">
          <router-view></router-view>
      </div>
    </div>
    <!-- 底部菜单 -->
    <div class="home-7" style="z-index: 10;">
        <a class="home-7-1" id="home1" @click="indexBtn">
            <span class="bartab1-1" v-if="ass1"></span>
            <span class="bartab1" v-else></span>
            <span  :class="ass1?'myactiv ztzhuse':'muitablabel'">首页</span>
        </a>
        <a class="home-7-1" id="home2" @click="cardsBtn">
            <span class="bartab2-1"  v-if="ass2"></span>
            <span class="bartab2" v-else></span>
            <span  :class="ass2?'myactiv ztzhuse':'muitablabel'">卡包</span>
        </a>
        <a class="home-7-1" id="home3" @click="shareBtn">
            <span class="bartab3-1" v-if="ass3"></span>
            <span class="bartab3" v-else></span>
            <span  :class="ass3?'myactiv ztzhuse':'muitablabel'" >分享</span>
        </a>
        <a class="home-7-1" id="home4" @click="mineBtn">
            <span class="bartab4-1" v-if="ass4"></span>
            <span class="bartab4" v-else></span>
            <span  :class="ass4?'myactiv ztzhuse':'muitablabel'">我的</span>
        </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      _adjust: false,
      ass1: true,
      ass2: false,
      ass3: false,
      ass4: false,
    };
  },
  mounted() {
    this.rounres(this.$route.path)
    const vm=this;
    mui.init({
      keyEventBind: {
        backbutton: true, //关闭back按键监听
      }
    });
    

  },
  methods: {
    indexBtn(){
        this.$router.push('/index')
        this.ass1=true;
        this.ass2=false;
        this.ass3=false;
        this.ass4=false;
    },
    cardsBtn(){
        this.$router.push('/card')
        this.ass1=false;
        this.ass2=true;
        this.ass3=false;
        this.ass4=false;
    },
    shareBtn(){
        this.ass1=false;
        this.ass2=false;
        this.ass3=true;
        this.ass4=false;
        this.$router.push('/share')
    },
    mineBtn(){
        this.ass1=false;
        this.ass2=false;
        this.ass3=false;
        this.ass4=true;
        this.$router.push('/mine')
    },
    rounres(date){
      if(date=='/mine'){
        this.ass1=false;
        this.ass2=false;
        this.ass3=false;
        this.ass4=true;
        this.panduan()
        }
      if(date=='/share'){
        this.ass1=false;
        this.ass2=false;
        this.ass3=true;
        this.ass4=false;
        this.panduan()
        }
         if(date=='/card'){
        this.ass1=false;
        this.ass2=true;
        this.ass3=false;
        this.ass4=false;
        this.panduan()
        }
        if(date=='/index'){
         this.ass1=true;
         this.ass2=false;
         this.ass3=false;
         this.ass4=false;
         this.panduan()
        }
     },
     panduan(){
         //处理逻辑：1秒内，连续两次按返回键，则退出应用；
        var first = null;
        mui.back = function() {

            //首次按键，提示‘再按一次退出应用’
            if (!first) {
                first = new Date().getTime();//记录第一次按下回退键的时间
                mui.toast('再按一次退出应用');//给出提示
                setTimeout(function() {//1s中后清除
                    first = null;
                }, 1000);
            } else {
                if (new Date().getTime() - first < 1000) {//如果两次按下的时间小于1s，
                    plus.runtime.quit();//那么就退出app
            } 
          } 
        };
     }

  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      // debugger;
      this.rounres(this.$route.path)
    }
  }
};
</script>
<style scoped>

.bartab1{
	display: block;
	width: .5rem;
	height: .5rem;
	margin: 0 auto;
	background: url('../../static/commons/img/ic-home/ic_home_def.png') no-repeat;
	background-size: 100% 100%;
}
.bartab1-1{
	display: block;
	width: .5rem;
	height: .5rem;
	margin: 0 auto;
	background: url('../../static/commons/img/ic-home/ic_home_Pre.png') no-repeat;
	background-size: 100% 100%;
}
.bartab2{
	display: block;
	width: .5rem;
	height: .5rem;
	margin: 0 auto;
	background: url(../../static/commons/img/ic-home/ic_card_def.png) no-repeat;
	background-size: 100% 100%;
}
.bartab2-1{
	display: block;
	width: .5rem;
	height: .5rem;
	margin: 0 auto;
	background: url(../../static/commons/img/ic-home/ic_card_Pre.png) no-repeat;
	background-size: 100% 100%;
}
.bartab3{
	display: block;
	width: .5rem;
	height: .5rem;
	margin: 0 auto;
	background: url(../../static/commons/img/ic-home/ic_share_def.png) no-repeat;
	background-size: 100% 100%;
}
.bartab3-1{
	display: block;
	width: .5rem;
	height: .5rem;
	margin: 0 auto;
	background: url(../../static/commons/img/ic-home/ic_share_Pre.png) no-repeat;
	background-size: 100% 100%;
}
.bartab4{
	display: block;
	width: .5rem;
	height: .5rem;
	margin: 0 auto;
	background: url(../../static/commons/img/ic-home/ic_mine_def.png) no-repeat;
	background-size: 100% 100%;
}
.bartab4-1{
	display: block;
	width: .5rem;
	height: .5rem;
	margin: 0 auto;
	background: url(../../static/commons/img/ic-home/ic_mine_Pre.png) no-repeat;
	background-size: 100% 100%;
}
.home-7{

	position: fixed;
	background: #fff;
	bottom: 0;
    display: table;
    width: 100%;
    height: 55px;
    padding:0 .3rem;
    table-layout: fixed;
    border-top: 0;
    border-bottom: 0;
    color: #646464;

}
.home-7-1{
	float: left;
    overflow: hidden;
    width: 24%;
    height: 55px;
    text-align: center;
    padding-top: 6px;
}
.home-7-1 .muitablabel{
  display: inline-block;
	font-size: 0.24rem;
	color: #646464;
}

.home-7-1 .myactiv{
  display: inline-block;
	font-size: 0.24rem;
}

</style>
