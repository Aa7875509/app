<template>
    <div id="security">
        <my-header :title="'安全中心'" :back="false" @back='fanhui'>
          </my-header>
        <div class="hiter">
             <div @click="chuangjian" class="row2" v-if="isBindGesturePassword==0">
                <div class="row2-a">
                    <span>创建手势密码</span>
                </div>
                <span style="font-size: 0.5rem;" class="row3-b mui-icon mui-icon-arrowright"></span>
            </div>
            <hr class="line"></hr>
            <div class="row2" @click="xiugai" v-if="isBindGesturePassword==1">
                <div class="row2-a">
                    <span>修改手势密码</span>
                </div>
                <span style="font-size: 0.5rem;" class="row3-b mui-icon mui-icon-arrowright"></span>
            </div>
            <hr class="line" ></hr>
            <div class="row2" @click="zhaohui" v-if="isBindGesturePassword==1">
                <div class="row2-a">
                    <span>找回手势密码</span>
                </div>
                <span style="font-size: 0.5rem;" class="row3-b mui-icon mui-icon-arrowright"></span>
            </div>
        </div>
    </div>
</template>
<script>
import myHeader from "../../../commons/publics/myHeader.vue";
    export default {
        props:['isBindGesturePassword'],
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
                vm.fanhui();
             }
        },
        methods:{
            chuangjian(){
                console.log("创建")
                this.$router.push("/addGesture");
            },
            xiugai(){
                console.log("修改")
                this.$router.push("/editGesture");
            },
            zhaohui(){
                console.log("找回")
                this.$router.push("/backGesture");
            },
            fanhui(){
                this.$router.push("/mine");
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
    }
    .row2 {
            display: flex;display: -webkit-flexbox;
            flex-wrap: nowrap;
            justify-content: space-between;
            padding: .24rem .3rem;
            background: #fff;
        }
    .row2-a {
        display: flex;display: -webkit-flexbox;
        flex-wrap: nowrap;
        justify-content: space-between;
        height: 0.45rem;
    }
    .line {
            margin-left: .3rem;
            height: 1px;
            border: 0;
            background: #e1e1e1;
            width: 100%;
            -webkit-margin-before: 0;
            -webkit-margin-after: 0;
        }
</style>
