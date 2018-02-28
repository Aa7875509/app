<template>

<div class="ct24362">
    <div class="add54397">添加信用卡成功</div>
    <div>
        <img class="img9438" src="../../../../static/commons/img/mine/ic_succeed.png" alt="">
    </div>
    <div class="hai5240">您还可以继续创建计划</div>
    <div>
        <button class="bjzhuse">去创建计划</button>
    </div>
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
    
  }
};
</script>

<style scoped>
    button {
  width: 5rem;
  height: 1.2rem;
  color: #ffffff;
  font-size: 0.46rem;
  text-align: center;
  border-radius: 0.1rem;
  display: block;
  margin: 0.3rem auto;
}
.add54397{
    font-size: .32rem;
    color: #66bb6a;

}
.img9438{
    height: 1rem;
}
.hai5240{
    font-size: .32rem;
    color: #323232;
}
</style>


