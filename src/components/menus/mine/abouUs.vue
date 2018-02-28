<template>
    <div >
        <my-header  :title="'关于我们'" :back="true"> </my-header>
        <div class="hiter">
              <img src="../../../../static/commons/img/logo/logo.png" class="imgs"/>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;泓创（深圳）科技开发有限公司，（下面简称“泓创金服”）专注于全国范围内信用卡管理软件研发及销售，包括信用卡管理软件销售程序编写、信用卡管理软件公式编写、支付行业通道搭建等。</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;泓创金服坚持以帮助微小型企业实现创业梦想为宗旨，通过专业的财会金融知识，帮助提升一站式销售服务，帮助客户提升销量，助力客户打造核心竞争力。</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;泓创金服设计理念：“创意成就商机”，我们用自己的智慧给客户一个极具创造力的软件，让客户在信用卡相关领域面前不再错失良机。</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;泓创金服抱着“自强不息、专注专业、勇于创新、诚恳务实”的精神，坚持以“客户服务质量”为中心，不断的拓展您的事业是我们的目标，顾客的满意是我们追求的唯一标准，我们的成功离不开您的支持，我们希望我们的努力能够为你们企业打造优秀的信用卡管理软件，为企业信息化建设做出努力。</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们所有的软件都是自主研发，没有现成的模版。这是我们与其它行业的区别。</p>
        </div>
    </div>
</template>
<script>
    import myHeader from "../../../commons/publics/myHeader.vue";

    export default {
        data(){
            return {
              
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
        methods:{
             erweimafen(){
                   var vm =this;
             }
        },
  components: {
    myHeader
  }
    }
</script>
<style scoped>
.hiter{
        margin-top:.88rem;
        padding: .4rem;
      
    }
    .imgs{
       margin: .2rem auto;
       width: 1.7rem;
       height: 1.7rem;
    }
    p{
        text-align: left;
        font-size: .24rem;
    }
</style>