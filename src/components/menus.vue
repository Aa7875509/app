<template>
  <div>
    <div class="mui-content " id="content">
      <div class="ct">
          <router-view></router-view>
      </div>
      <div class="muitab">
         <span  class="tab-item mui-active" :class="tuei=='jsb'?'active':''" @click="indexBtn">
			        <span class="mui-icon mui-icon-compose"></span>
			        <span class="label">记事本</span>
			    </span>
			    <span class="tab-item" :class="tuei=='lts'?'active':''" @click="cardsBtn">
              <span class="mui-icon mui-icon-chatbubble"></span>
			        <span class="label">聊天室</span>
			    </span>
           <span class="tab-item" :class="tuei=='bz'?'active':''" @click="mineBtn">
              <span class="mui-icon mui-icon-starhalf"></span>
			        <span class="label">快递</span>
			    </span>
      </div>
    </div>
    <!-- 底部菜单 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      tuei:'jsb',
    };
  },
  mounted() {
    this.rounres(this.$route.path);
    const vm = this;
    mui.init({
      keyEventBind: {
        backbutton: true //关闭back按键监听
      }
    });
  },
  methods: {
    indexBtn() {
      this.tuei='jsb';
      this.$router.push("/index");
    },
    cardsBtn() {
      this.tuei='lts';
      this.$router.push("/card");
    },
    mineBtn() {
       this.tuei='bz';
      this.$router.push("/mine");
    },
    rounres(date) {
      if (date == "/mine") {
        this.panduan();
      }
      if (date == "/share") {
        this.panduan();
      }
      if (date == "/card") {
        this.panduan();
      }
      if (date == "/index") {
        this.panduan();
      }
    },
    panduan() {
      //处理逻辑：1秒内，连续两次按返回键，则退出应用；
      var first = null;
      mui.back = function() {
        //首次按键，提示‘再按一次退出应用’
        if (!first) {
          first = new Date().getTime(); //记录第一次按下回退键的时间
          mui.toast("再按一次退出应用"); //给出提示
          setTimeout(function() {
            //1s中后清除
            first = null;
          }, 1000);
        } else {
          if (new Date().getTime() - first < 1000) {
            //如果两次按下的时间小于1s，
            plus.runtime.quit(); //那么就退出app
          }
        }
      };
    }
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      // debugger;
      this.rounres(this.$route.path);
    }
  }
};
</script>
<style scoped>
.muitab{
       position: fixed;
    z-index: 10;
    right: 0;
    left: 0;
    background-color: #f7f7f7;
    backface-visibility: hidden;
    bottom: 0;
    display: table;
    width: 100%;
    height: 45px;
    padding: 0;
    table-layout: fixed;
    border-top: 0;
    border-bottom: 0;
}
.tab-item{
      display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 45px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.tab-item .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}


.muitab .mui-icon {
    font-size: 24px;
    position: relative;
    z-index: 20;
    padding-top: 3px;
    padding-bottom: 10px;
}
.tab-item .mui-icon~.label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
.active{
      color: #007aff;
}
</style>
