<template>
  <div>
    <div class="mui-content " id="content">
      <div class="ct">
          <router-view></router-view>
      </div>
      <div class="mui-bar mui-bar-tab">
			    <span  class="mui-tab-item mui-active" @click="indexBtn">
			        <span class="mui-icon mui-icon-compose"></span>
			        <span class="mui-tab-label">记事本</span>
			    </span>
			    <span class="mui-tab-item" @click="cardsBtn">
			        
              <span class="mui-icon mui-icon-chatbubble"></span>
			        <span class="mui-tab-label">聊天室</span>
			    </span>
			    <!-- <a class="mui-tab-item">
			        <span class="mui-icon mui-icon-email"></span>
			        <span class="mui-tab-label">邮件</span>
			    </a>
			    <a class="mui-tab-item">
			        <span class="mui-icon mui-icon-gear"></span>
			        <span class="mui-tab-label">设置</span>
			    </a> -->
			</div>
    </div>
    <!-- 底部菜单 -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
      this.$router.push("/index");
    },
    cardsBtn() {
      this.$router.push("/card");
    },
    // shareBtn() {
    //   this.$router.push("/share");
    // },
    // mineBtn() {
    //   this.$router.push("/mine");
    // },
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

</style>
