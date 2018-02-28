<template>
<!-- 组件参数:
    props:  title: 中间的文字
            right: 右边的文字
            back: false表示自定义左边点击事件回调，true表示默认，为返回上一级路由
            leftDisplay: false表示是否显示左边图标
    events：back: 左边点击事件回调
            rightButton: 右边点击事件回调

 -->
<div class="ct23452 bjzhuse" >
    <div @click="leftButton" class="left324223">
        <span v-if="leftDisplay" class="mui-icon mui-icon-back"></span>
    </div>
    <div class="title43453">{{title}}</div>
    <div @click="rightButton" class="right87786 ztfuse1">{{right}}</div>
</div>
</template>

<script>

export default {
  props: {
    title: {
      type: [String, Number]
    },
    leftDisplay: {
      type: [Boolean],
      default: true
    },
    right: {
      type: [String, Number]
    },
    back: {
      type: [Boolean],
      default: true
    }
  },

  methods: {
    leftButton() {

      if (this.back) {
        this.$router.go(-1);
      } else {
        this.$emit("back");
      }
    },
    rightButton() {
      this.$emit("rightButton");
    }
  }
};
</script>

<style scoped>
.ct23452 {
  height: 0.88rem;
  vertical-align: middle;
  line-height: 0.88rem;
  padding: 0;
  display: flex;
  display: -webkit-flexbox;
  flex-wrap: nowrap;
  justify-content: space-between;
  position: fixed;
  z-index: 1;
  width: 100%;
  top: 0;
  /* background: #7e57c2; */
}
.title43453 {
  color: #fff;
  font-size: .36rem;
  width: 2rem;
  text-align: center;
}
.right87786 {
  font-size: .26rem;
  width: 1.66rem;
  text-align: right;
  padding-right: .3rem;
}
.left324223 {
  color: #fff;
  width: 1.36rem;
  padding-left: .3rem;
  text-align: left;
}
</style>


