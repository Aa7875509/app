<template>
<div :class="className" class="ct76873497 clear">
  <div v-show="value.length>0" style="text-align: right;float:right">
  <img @click="$emit('input', '')" src="../../../static/commons/img/commom/ic_close_pre.png" alt="">
  </div>
    <label class="float-left64309" for="">{{lable}}</label>
    <input class="float-left64309 ddscesded" 
  :type="text"
  
  ref="input"
  :value="value" 
  :placeholder="placeholder"
  @input="$emit('input', $event.target.value)"
  >
  
  
</div>
  
</template>
<script>
export default {
  props: {
    text: {
      type: [String],
      default: "text"
    },
    className: {
      type: [String],
      default: ""
    },
    value: {
        type: [String,Number],
        default: ""
    },
    lable: {
      type: [String],
        default: ""
    },
    placeholder: {
      type: [String],
        default: ""
    }
  },
  methods: {
      clear(){
          this.value = ''
      }
  }
};
</script>

<style scoped>
.float-left64309 {
  float: left;
}

.ct76873497{
  background: #fff;
  border-radius: 8px;
}
.ct76873497 input{
    background: #fff;
    height: .88rem;
    font-size: .28rem;
    border: 0;
    outline: none;
    border-radius: 8px;
    width: 60%;
    padding-left: 0.4rem;
    line-height: 0.88rem;

}
.ct76873497 label{
  font-size: .28rem;
  color: #323232;
  line-height: .88rem;
  width: 25%;
  text-align: right;
}
.ct76873497 img{
  margin-right: .06rem;
  height: .44rem;
  line-height: .88rem;
  margin-top: .22rem;
  opacity: 0.3; 
}
.ct76873497 img:active{
   opacity: 1;
}


</style>


