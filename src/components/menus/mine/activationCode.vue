<template>
    <div>
         <!-- 邀请码 -->
        <div v-if="jihuomaqiehuan">
            <my-header  :title="'邀请码'" :back="false" @back="asdsda" :right="'出售'" @rightButton="qiehuan"></my-header>
            <div class="title">
                <div class="tou bjzhuse">
                    <div>邀请码库存</div>
                    <div style="font-size:.44rem;margin-top:.15rem" v-cloak>{{yqmdata}}</div>
                </div>
                  <div class="gaodu bjfuse2">
                     <div class="yimai xian">
                        <span>已买（个）</span>
                        <span v-cloak>{{yimai}}</span>
                     </div>
                     <div class="yimai">
                         <span>已卖（个）</span>
                        <span v-cloak>{{yimai2}}</span>
                     </div>
                </div>
                <div class="gaodus">
                    <div class="yimai">
                        <div class="kuandu" :class="isUsed==1?'':'ztzhusexian'" @click="changeItem(2)">
                           <span>已使用</span>
                           <span v-cloak>({{yishiyon}})</span>
                        </div>
                    </div>
                    <div class="yimai">
                        <div class="kuandu" :class="isUsed==1?'ztzhusexian':''" @click="changeItem(1)">
                            <span>未使用</span>
                            <span v-cloak>({{weishiyon}})</span>
                        </div>
                    </div>
                </div>

                <!-- <div id="pullrefreshOOOO" class="mui-content mui-scroll-wrapper">
                    <div class="mui-scroll"> -->
                        <div id="fanwei">
                            <div class="quany"  v-if="isUsed==2">
                                <div  class="quanys" v-for="(item,index) in shiy" :key="index">
                                    <span class='ezwenzi' v-cloak>{{item.code}}</span>
                                    <button class="btn bjzhuse" @click="hanshu(item.code)">一键复制</button>
                                </div>
                            </div>
                            <div class="quany"  v-else>
                                <div  class="quanys" v-for="(item,index) in wshiy" :key="index">
                                    <span class='ezwenzi' v-cloak>{{item.code}}</span>
                                    <button class="btn bjzhuse" @click="hanshu(item.code)">一键复制</button>
                                </div>
                            </div>
                        </div>
                    <!-- </div>
                </div> -->
            </div>
        </div>
        <div v-else>
            <my-header  :title="'邀请码'" :back="false" @back="qiehuans" ></my-header>
            <div class="title">
                <div v-show="!isConfirmClicked">
                    <div class="mui-input-group">
                        <div class="mui-input-row ipt1">
                            <label>出售号码：</label>
                            <input v-model="phones" type="text" class="mui-input-clear" placeholder="请输入手机号码">
                        </div>
                        <div class="mui-input-row ipt2">
                             <label>出售个数：</label>
                            <input v-model="sellTotal" type="text" class="mui-input-clear" placeholder="请输入数量">
                        </div>
                    </div>
                    <div class="fenxiang1">
                        <button class="btn-zi bjzhuse" @click="checkInfo">确定</button>
                    </div>
                </div>
                <div v-show="isConfirmClicked">
                    <div class="ass">
                        <div id='mmp' class="mui-locker" data-locker-options='{"ringColor":"rgba(210,210,210,1)","fillColor":"#ffffff","pointColor":"rgba(0,136,204,1)","lineColor":"rgba(0,136,204,1)"}' data-locker-width='300' data-locker-height='300'></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import myHeader from "../../../commons/publics/myHeader.vue";
    const sha1 = require('sha1');

    export default {
        data(){
            return {
                jihuomaqiehuan:true,
                yqmdata:'',//库存
                yimai:'',//已买
                yimai2:'',//已卖
                yishiyon:'',//已使用
                weishiyon:'',//未使用
                isUsed:1,
                wshiy:[],
                shiy:[],
                isConfirmClicked:false,
                optionsError:{
                    "fillColor":"#ffffff",
                    "ringColor":"rgba(221, 82, 77, 1)",
                    "pointColor":"rgba(221, 82, 77, 1)",
                    "lineColor":"rgba(221, 82, 77, 1)",
                    "times":2,
                },
                optionsSuccess:{
                    "fillColor":"#ffffff",
                    "ringColor":"rgba(76, 217, 100, 1)",
                    "pointColor":"rgba(76, 217, 100, 1)",
                    "lineColor":"rgba(76, 217, 100, 1)",
                    "times":2,
                },
                regPhone: new RegExp("^1[0-9]{10}$"),
                regSellNo:new RegExp("^\\d{1,}$"),
                phones:'',
                sellTotal:'',
                page:1,
                shujukaiguan:true,
                fazhi:true,
            }
        },
        beforeMount(){
            this.getMyInvitationCode();
        },
        mounted(){
           var vm = this;
           mui.init({
                keyEventBind: {
                    backbutton: true, //关闭back按键监听
                }
            });
            mui.back = function () {
                if(jihuomaqiehuan){
                    vm.asdsda();
                }else{
                    vm.qiehuans();
                }
            };

            vm.$watch('isConfirmClicked',(val)=>{
                if (val) {
                    mui('#mmp').locker();
                    var mmp = document.querySelector('#mmp'),
                    record = [];

                    //处理事件
                    mmp.addEventListener('done', function(event) {
                        var rs = event.detail;
                        if (rs.points.length < 4) {
                            vm.drawMoreTimes(rs.sender.cxt, rs.sender.pointLocationArr, rs.points, null, rs.sender, vm.optionsError);
                            mui.toast("密码太短，至少四位,请重新设置");
                            setTimeout(()=>{
                                record = [];
                                rs.sender.clear();
                            },1200);
                            return false
                        }else if (rs.points.length > 9) {
                            vm.drawMoreTimes(rs.sender.cxt, rs.sender.pointLocationArr, rs.points, null, rs.sender, vm.optionsError);
                            mui.toast("密码太长，最多九位,请重新设置");
                            setTimeout(()=>{
                                record = [];
                                rs.sender.clear();
                            },1200);
                            return false
                        }else{
                            var pwd=rs.points.join('');
                            vm.drawMoreTimes(rs.sender.cxt, rs.sender.pointLocationArr, rs.points, null, rs.sender, vm.optionsSuccess);
                            vm.transFormPwd(pwd);
                            setTimeout(()=>{
                                rs.sender.clear();
                                record = [];
                            },1200);
                        };
                    });
                }
            });
            $("#fanwei").on("swipeup", function(e) {
				if(vm.shujukaiguan){
					if(vm.fazhi){
						vm.page++;
                        var w = plus.nativeUI.showWaiting("加载中...");
                        vm.getMyInvitationCode();
                        setTimeout(() => {
                            w.close();
                        }, 1000);
					}
				}
			})
            /**
             * 以下这段代码可能解决下拉刷新、上拉加载问题
             *
             *  mui('#pullrefreshOOOO').scroll();
             *
                document.getElementById('fanwei').addEventListener('scrollend', function(e) {
                    if(e.detail.y<=e.detail.maxScrollY){    //滚动到底部
                        vm.getMyInvitationCode();
                    };
                    if(e.detail.y>=0){  //滚动到顶部
                        vm.page=1;
                        vm.getMyInvitationCode();
                    }
                })
             *
             *
             */
        },
        methods:{
            // 获取我的激活码
            getMyInvitationCode(){
                const vm=this;
                var w = plus.nativeUI.showWaiting("加载中...");
                     setTimeout(() => {
                            w.close();
                        }, 5000);
                vm.shujukaiguan=false;
                this.$ajax({
                    url:'openapi/v1/personalCenter/myInvitationCode',
                    data:{
                        action:vm.isUsed,
                        page:vm.page,
                        pageLength:10
                    },
                    success:function(rp){
                      vm.shujukaiguan=true;
                        if (rp.code="0000") {
                            vm.yqmdata=rp.data.surplus;         //库存
                            vm.yimai=rp.data.total;             //已买
                            vm.yimai2=rp.data.sell;             //已卖
                            vm.yishiyon=rp.data.used;           //已使用
                            vm.weishiyon=rp.data.unused;        //未使用
                             if(rp.invitationCodes.length<10){
							   vm.fazhi=false;
							   if(vm.page>1){
                                    mui.toast("已无更多数据");
							   }
                            }else{
                                vm.fazhi=true;
                            }

                             if(vm.page==1){
                                   if (vm.isUsed==1) {
                                        vm.wshiy=rp.invitationCodes;     //isUsed=1 未使用
                                    }else{
                                        vm.shiy=rp.invitationCodes;     //isUsed=2 已使用
                                    }
                                }else{

                                    if (vm.isUsed==1) {
                                        vm.wshiy= vm.wshiy.concat(rp.invitationCodes);//isUsed=1 未使用
                                    }else{
                                        vm.shiy= vm.shiy.concat(rp.invitationCodes);//isUsed=2 已使用
                                    }
                                }
                        }else{
                            mui.toast(rp.msg);
                        }
                        setTimeout(() => {
                            w.close();
                        }, 1200);
                    }
                });
            },
            changeItem(item){
                this.page=1
                this.isUsed=item;
                this.getMyInvitationCode();
            },
            asdsda(){
                this.$router.push("/mine");
            },
            qiehuan(){
                this.jihuomaqiehuan=false;
            },
            qiehuans(){
                this.jihuomaqiehuan=true;
                this.isConfirmClicked=false;
                this.isUsed=1;
                this.getMyInvitationCode();
            },
            checkInfo(){
                var isPhone=this.regPhone.test(this.phones);
                var isSellNo=this.regSellNo.test(this.sellTotal);
                if (isPhone&&isSellNo) {
                    // 判断输入的邀请码数量是否大于库存
                    if (this.sellTotal>this.yqmdata) {
                        mui.toast("出售邀请码个数有误，请重新输入");
                    }else{
                        this.isHaveHandPwd();
                    };
                }else{
                    if (!isPhone) {
                        mui.toast("电话号码有误！");
                        this.phones='';
                        return
                    };
                    if (!isSellNo) {
                        mui.toast("出售个数有误！");
                        this.sellTotal='';
                        return;
                    };
                }
            },
            erweimafen(){
                const vm=this;
                this.$ajax({
                    url:'openapi/v1/personalCenter/sellInvitationCode',
                    data:{
                        phone:vm.phones,
                        sellTotal:vm.sellTotal,
                    },
                    success:function(rp){
                        if(rp.code=="0000"){
                            setTimeout(()=>{
                                vm.isConfirmClicked=false;
                                vm.jihuomaqiehuan=true;
                                vm.getMyInvitationCode();
                            },500);
                        }else{
                            mui.toast(rp.msg);
                        };
                    }
                });
            },
            // 是否绑定了手势密码
            isHaveHandPwd() {
                var vm = this;
                this.$ajax({
                    url: 'openapi/v1/personalCenter/getSecurityCenter',
                    success: function(res) {
                        if (!res.isBindGesturePassword) {
                            /*
                                1 = 绑定，当绑定时，不可创建手势密码;
                                0 = 未绑定，
                            */
                            mui.confirm("您还未设置安全密码，是否立即去设置？"," ",['否','是'],vm.hahahahaha);
                        }else{
                            vm.isConfirmClicked=true;
                        };
                    },
                });
            },
            // 未绑定手势密码，是否创建
            hahahahaha(s){
                if (s.index==1) {
                    // 去创建
                    this.$router.replace("/security/" + 0);
                }else if (s.index==0){
                    // 不创建
                    return
                };
            },
            hanshu(is){
                if("iOS" != plus.os.name){
                    //安卓
                    var Context = plus.android.importClass("android.content.Context");
                    var main = plus.android.runtimeMainActivity();
                    var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
                    plus.android.invoke(clip,"setText",is)
                }else{
                     //ios
                    var UIPasteboard  = plus.ios.importClass("UIPasteboard");
                    //这步会有异常因为UIPasteboard是不允许init的，init的问题会在新版中修改
                    var generalPasteboard = UIPasteboard.generalPasteboard();
                    // 设置/获取文本内容: www.bcty365.com
                    generalPasteboard.setValueforPasteboardType(is, "public.utf8-plain-text");
                    var value = generalPasteboard.valueForPasteboardType("public.utf8-plain-text");
                };
                mui.toast("复制成功！");
            },
            transFormPwd(pwd){
                var pwd = sha1(pwd.split('').join("-")).toUpperCase();
                this.verifyPwd(pwd);
            },
            verifyPwd(pwd){
                const vm=this;
                this.$ajax({
                    url:"openapi/v1/personalCenter/verifyGesturePassword",
                    data:{
                        gesturePassword:pwd
                    },
                    success:function(res){
                        vm.chargeCode(res);
                    }
                })
            },
            chargeCode(r){
                if (r.code=="0000") {
                    mui.toast("校验成功！");
                    setTimeout(()=>{
                        this.erweimafen();
                    },500);
                }else{
                    mui.toast(r.msg);
                }
            },
            drawMoreTimes(cxt, _PointLocationArr, _LinePointArr, touchPoint, that, options) {
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
        },
        watch:{
            'jihuomaqiehuan':function(val){
                if (val) {
                    this.isUsed=1;
                    this.page=1;
                }else{
                    this.phones='';
                    this.sellTotal='';
                }
            }
        }
    }
</script>
<style scoped>
    [v-cloak] {
         display: none
     }
    * {
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    .btn{
        height: 0.6rem;
        width: 1.6rem;
        font-size: 0.22rem;
        color: #fff;
        line-height: 0.3rem;
    }
    .ezwenzi{
        display: inline-block;
        line-height: 0.6rem;
        font-size: .28rem;
    }
    .quanys {
      border-top: 0.5px solid #e1e1e1;
      padding: 0.3rem 0.3rem;
      display: flex;display: -webkit-flexbox;
      flex-wrap: nowrap;
      justify-content: space-between;
      background: #fff;
    }
    .quany{
        overflow: auto;
    }
    .title{
        margin-top: .88rem;
    }
    .fenxiang1 {
        margin-top: 0.6rem;
    }
    .btn-zi {
        width: 6.4rem;
        height: 0.96rem;
        border-radius: 8px;
        margin: 0 auto;
        color: #fff;
        font-size: 0.32rem;
    }
    .tou{
        height: 2rem;
        color: #fff;
        padding-top: 0.5rem
    }
    .gaodu{
        height: .88rem;
        color: #fff;
          font-size: .28rem;
    }
    .gaodu .yimai{
        float: left;
        width: 50%;
        height: .88rem;
        line-height: .88rem;
    }
    .gaodus .yimai{
        float: left;
        width: 50%;
        height: .86rem;
        line-height: .86rem;
    }
    .gaodus{
        margin-top: .3rem;
        font-size: .28rem;
        height: .88rem;
        background: #fff;
        color: #646464;
    }
    .kuandu{
        margin: 0 .6rem;
    }
    label{
        font-size: .3rem;
    }
    .mui-input-clear{
         font-size: .3rem;
    }
    #mmp{
        width: 3.0rem;
        height: 3.0rem;
        border: 1px solid #bbb;
        border-radius: 5px;
        margin: 1.2rem auto;
        background-color: #fff;
    }
</style>
