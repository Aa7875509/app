<template>
    <div class="home2">
        <my-header :title="'验证密码'" :back="true"></my-header>
        <div class="hiter">
            <div class="ass">
                <div id='holder2' class="mui-locker" data-locker-options='{"ringColor":"rgba(210,210,210,1)","fillColor":"#ffffff","pointColor":"rgba(0,136,204,1)","lineColor":"rgba(0,136,204,1)"}' data-locker-width='300' data-locker-height='300'></div>
            </div>
        </div>
    </div>
</template>
<script>
    import myHeader from "../../../commons/publics/myHeader.vue";
    const sha1 = require("sha1");

    export default {
       props: ["creditCardIds","datas"],
        data(){
            return {
              oldPwd:'',
              stetime:null
            }
        },
        mounted(){
           var vm=this;

           var vm=this;
            mui.init({
                keyEventBind: {
                    backbutton: true, //关闭back按键监听
                }
            });
            mui.back = function () {

                vm.$router.go(-1);
            }


            mui('#holder2').locker();
            var holder = document.querySelector('#holder2'),
            record = [],
            optionsError={
                "fillColor":"#ffffff",
                "ringColor":"rgba(221, 82, 77, 1)",
                "pointColor":"rgba(221, 82, 77, 1)",
                "lineColor":"rgba(221, 82, 77, 1)",
                "times":2,
            },
            optionsSuccess={
                "fillColor":"#ffffff",
                "ringColor":"rgba(76, 217, 100, 1)",
                "pointColor":"rgba(76, 217, 100, 1)",
                "lineColor":"rgba(76, 217, 100, 1)",
                "times":2,
            };

            //处理事件
            holder.addEventListener('done', function(event) {
                var rs = event.detail;
                if (rs.points.length < 4) {
                    vm.countPwd=false;
                    vm.drawMoreTimes(rs.sender.cxt, rs.sender.pointLocationArr, rs.points, null, rs.sender, optionsError);
                    mui.toast("密码错误,请重新输入");
                    setTimeout(()=>{
                        record = [];
                        rs.sender.clear();
                    },1200);
                    return false
                }else if (rs.points.length > 9) {
                    vm.countPwd=false;
                    vm.drawMoreTimes(rs.sender.cxt, rs.sender.pointLocationArr, rs.points, null, rs.sender, optionsError);
                    mui.toast("密码错误,请重新输入");
                    setTimeout(()=>{
                        record = [];
                        rs.sender.clear();
                    },1200);
                    return false
                }else{
                    var pwd=rs.points.join('');
                    vm.transFormPwd(pwd);
                    setTimeout(()=>{
                        rs.sender.clear();
                        record = [];
                    },1200);
                };
            });

        },
        methods:{
          verifyPwd(pwd){
            const vm=this;
            this.$ajax({
              url:"/openapi/v1/personalCenter/verifyGesturePassword",
              data:{
                gesturePassword:pwd
              },
              success:function(res){
                 vm.chargeCode(res, pwd);
              }
            });
          },
          transFormPwd(pwd){
            var pwd = sha1(pwd.split('').join("-")).toUpperCase();
              this.oldPwd=pwd;
              this.verifyPwd(pwd);
          },
          chargeCode(r,pwd){
            if(r.code=="0000"){
                mui.toast("验证通过");
                if(this.creditCardIds=='1'){
                    this.zhifu1(pwd);
                }else{
                    this.$emit("chuanziyi");
                }
            }else{
                mui.toast(r.msg);
            };
          },
          zhifu1(pwd){
            var vm=this;
             var w = plus.nativeUI.showWaiting( "支付中..." );
            vm.datas.gesturePassword=pwd;

             vm.$ajax({
                url: 'openapi/v1/consumption/createPlanPay',
                type: 'post',
                data:vm.datas,
                success: function(res){
                    // console.log(res)
                    if(res.code == '0000'){

                        // console.log(res)
                          vm.$emit("chuanzi");
                          setTimeout(function(){
                              vm.$router.push("/card");
                              w.close();
                            },3000)
                    }else if(res.code == '1001'){

                              var orderIds=res.orderId;
                              clearInterval(vm.stetime);
                              vm.stetime=setInterval(function(){
                                  vm.$ajax({
                                      url: 'openapi/v1/consumption/checkPlanPayStatus',
                                      type: 'post',
                                      data:{orderId:orderIds},
                                      success: function(res){
                                        if(res.code=='0000'){
                                          clearInterval(vm.stetime);
                                          w.close();
                                          vm.$emit("chuanzi");
                                         }
                                      }
                                  })
                              },2000)
                    }else{
                        w.close();
                         mui.toast(res.msg);
                        vm.$emit("chuanzii");

                    }
                }
            })
          },
          drawMoreTimes(cxt, _PointLocationArr, _LinePointArr, touchPoint, that, options) {
                // debugger
                var R = that.R;
                if (_LinePointArr.length > 0) {
                    cxt.beginPath();
                    for (var i = 0; i < _LinePointArr.length; i++) {
                        var pointIndex = _LinePointArr[i];
                        cxt.lineTo(_PointLocationArr[pointIndex].X, _PointLocationArr[pointIndex].Y);
                    }
                    cxt.lineWidth = (options.lindeWidth || 2) * options.times;
                    cxt.strokeStyle = options.lineColor || "#999"; //连结线颜色
                    cxt.stroke();
                    cxt.closePath();
                    if (touchPoint != null) {
                        var lastPointIndex = _LinePointArr[_LinePointArr.length - 1];
                        var lastPoint = _PointLocationArr[lastPointIndex];
                        cxt.beginPath();
                        cxt.moveTo(lastPoint.X, lastPoint.Y);
                        cxt.lineTo(touchPoint.X, touchPoint.Y);
                        cxt.stroke();
                        cxt.closePath();
                    }
                }
                for (var i = 0; i < _PointLocationArr.length; i++) {
                    var Point = _PointLocationArr[i];
                    cxt.fillStyle = "#d2d2d2"; //圆圈边框颜色
                    cxt.beginPath();
                    cxt.arc(Point.X, Point.Y, R, 0, Math.PI * 2, true);
                    cxt.closePath();
                    cxt.fill();
                    cxt.fillStyle = "#fff"; //圆圈填充颜色
                    cxt.beginPath();
                    cxt.arc(Point.X, Point.Y, R - ((options.ringWidth || 2) * options.times), 0, Math.PI * 2, true);
                    cxt.closePath();
                    cxt.fill();
                    if (_LinePointArr.indexOf(i) >= 0) {
                        cxt.fillStyle = options.ringColor || "#888"; //圆圈边框颜色
                        cxt.beginPath();
                        cxt.arc(Point.X, Point.Y, R, 0, Math.PI * 2, true);
                        cxt.closePath();
                        cxt.fill();
                        cxt.fillStyle = options.fillColor || "#f3f3f3"; //圆圈填充颜色
                        cxt.beginPath();
                        cxt.arc(Point.X, Point.Y, R - ((options.ringWidth || 2) * options.times), 0, Math.PI * 2, true);
                        cxt.closePath();
                        cxt.fill();
                        cxt.fillStyle = options.pointColor || "#777"; //圆圈中心点颜色
                        cxt.beginPath();
                        cxt.arc(Point.X, Point.Y, R - ((options.pointWidth || 16) * options.times), 0, Math.PI * 2, true);
                        cxt.closePath();
                        cxt.fill();
                    }
                }
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
    #holder2 {
        width: 300px;
        height: 300px;
        border: solid 1px #bbb;
        border-radius: 5px;
        margin: 50px auto;
        background-color: #fff;
    }
</style>
