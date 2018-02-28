<template>
    <div class="home2">

        <my-header v-if="!isInitPwd" :title="'原始密码'" :back="false" @back='fanhui'></my-header>
        <my-header v-else :title="'新密码'" :back="false" @back='fanhui'> </my-header>
        <div class="hiter">
              <div class="ass">
                  <div id='changePwd' class="mui-locker" data-locker-options='{"ringColor":"rgba(210,210,210,1)","fillColor":"#ffffff","pointColor":"rgba(0,136,204,1)","lineColor":"rgba(0,136,204,1)"}' data-locker-width='300' data-locker-height='300'></div>
              </div>
        </div>
    </div>
</template>
<script>
    import myHeader from "../../../commons/publics/myHeader.vue";

    const sha1 = require("sha1");
    export default {
        data(){
            return {
              isInitPwd:false,
              newPwd:'',
              oldPwd:'',
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
                vm.fanhui()
            }


            mui('#changePwd').locker();
            var changePwd = document.querySelector('#changePwd'),
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

            changePwd.addEventListener('done', function(event) {
                var rs = event.detail;
                if (rs.points.length < 4) {
                    vm.drawMoreTimes(rs.sender.cxt, rs.sender.pointLocationArr, rs.points, null, rs.sender, optionsError);
                    mui.toast("密码错误，至少四位");
                    setTimeout(()=>{
                        record = [];
                        rs.sender.clear();
                    },1200);
                    return false

                }else if (rs.points.length > 9) {
                    vm.drawMoreTimes(rs.sender.cxt, rs.sender.pointLocationArr, rs.points, null, rs.sender, optionsError);
                    mui.toast("密码错误，最多九位");
                    setTimeout(()=>{
                        record = [];
                        rs.sender.clear();
                    },1200);
                    return false
                }else{
                    var pwd=rs.points.join('');
                    if (vm.isInitPwd) {
                        vm.drawMoreTimes(rs.sender.cxt, rs.sender.pointLocationArr, rs.points, null, rs.sender, optionsSuccess);
                    };
                    vm.transFormPwd(pwd);
                    setTimeout(()=>{
                        rs.sender.clear();
                        record = [];
                    },1200);
                };
            });
        },
        methods:{
            fanhui(){
                var vm = this;
                this.$ajax({
                    url: 'openapi/v1/personalCenter/getSecurityCenter',
                    success: function(res) {
                        //(1=绑定，当绑定时，不可创建手势密码;0=未绑定，)
                        vm.$router.push("/security/" + res.isBindGesturePassword);
                    },
                });
            },
            verifyPwd(pwd){
                const vm=this;
                this.$ajax({
                    url:"/openapi/v1/personalCenter/verifyGesturePassword",
                    data:{
                        gesturePassword:pwd
                    },
                    success:function(res){
                        vm.chargeCode(res);
                    }
                })
            },
            transFormPwd(pwd){
                var pwd = sha1(pwd.split('').join("-")).toUpperCase();
                if(this.isInitPwd){
                    this.newPwd=pwd;
                    this.updateNewPwd(this.oldPwd,this.newPwd);
                }else{
                    this.oldPwd=pwd;
                    this.verifyPwd(pwd);
                };
            },
            chargeCode(r){
                if (r.code=="0000") {
                    mui.toast("校验成功，请重新设置密码");
                    this.isInitPwd=true;
                }else{
                    mui.toast(r.msg);
                    this.isInitPwd=false;
                };
            },
            updateNewPwd(oPwd,nPwd){
                const vm=this;
                this.$ajax({
                    url:"/openapi/v1/personalCenter/editGesturePassword",
                    data:{
                        originalGesturePassword:oPwd,
                        newGesturePassword:nPwd,
                    },
                    success:function(res){
                        if (res.code=="0000") {
                            mui.toast("修改成功");
                            vm.$router.push('/security/'+1);
                        }else{
                            mui.toast(res.msg);
                        }
                    }
                });
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
    #changePwd {
        width: 3.0rem;
        height: 3.0rem;
        border: 1px solid #bbb;
        border-radius: 5px;
        margin: 1.2rem auto;
        background-color: #fff;
    }
</style>
