<template>
    <div>
        <div v-if="isPreview">
            <!-- 创建计划 -->
            <my-header :title="'创建计划'" :right="'费用说明'" @rightButton="noticeBtn" :back="false" @back="goCards"></my-header>
            <div class="ycontent">
                <div>
                    <div class="card-bg bjfuse2">
                      <h4 class="txt1 ztfuse1">&nbsp;请输入还款金额&nbsp;</h4>
                        <div class="mui-input-row txt2">
                            <label>￥</label>
                            <input type="text" placeholder="0.00" v-model.trim="ysum" @blur="bluerInput" @focus="focusInput" class="mui-input-clear" data-input-clear="2">
                            <span @click="clearDt" class="mui-icon mui-icon-clear" :class="Number(ysum)==0?'mui-hidden':''"></span>
                        </div>
                    </div>
                    <div class="dates">
                        <button @click="openPicker(1)" type="button" class="mui-btn mui-btn-link colorBtn">
                            {{time1||"选择日期"}}
                            <span class="mui-icon mui-icon-arrowdown mui-icon-right"></span>
                        </button>至
                        <button @click="openPicker(2)" type="button" class="mui-btn mui-btn-link colorBtn">
                            {{time2||"选择日期"}}
                            <span class="mui-icon mui-icon-arrowdown mui-icon-right"></span>
                        </button>
                    </div>
                    <div class="jes">
                        <a @click="proportionsFn" id="oPopover" class="mui-btn mui-btn-link colorBtn">
                            请选择您的保证金比例
                            <span class="mui-icon mui-icon-arrowdown mui-icon-right"></span>
                            {{ptions?(ptions+"%"):''}}
                        </a>
                        <div id="proportions" class="mui-popover mui-popover-action mui-popover-bottom YYYprop">
                            <div id="dfs" class="mui-scroll-wrapper">
                                <div class="mui-scroll">
                                    <ul class="mui-table-view">
                                        <li @click="selectItem(item)" class="mui-table-view-cell" :key="index" :class="item.status?'':'disabledS'" v-for="(item,index) in proportions">{{item.proportion}}%</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mui-card">
                        <div class="mui-card-header yhed">
                            <a class="ya1">消费明细</a>
                            <a class="ya2 ztzhuse" @click="gotoYULAN">预览</a>
                        </div>
                        <div class="mui-card-content ycont">
                            <p>您选择自动还款共计{{dataSS.totalMonth}}个月</p>
                            <p>账单时间：{{dataSS.billingAt}}</p>
                            <p>还款保证金：{{(dataSS.retentionMoney)}}元</p>
                            <p>银行手续费：{{(dataSS.fee)}}元</p>
                            <p>总计：{{dataSS.totalAmount}}元</p>
                        </div>
                    </div>
                    <div class="ybtns">
                        <button class="mui-btn mui-btn-primary bjzhuse" @click="submitPlan('提交')">提交计划</button>
                    </div>


                    <div id="textNotice" class="mui-popover mui-popover-action mui-popover-bottom YYYNotice">
                        <div id="textNo" class="mui-scroll-wrapper">
                            <div class="mui-scroll">
                                <div class="mui-card yyd">
                                    <div class="mui-card-header">
                                        <a class="yyd1">费用说明</a>
                                    </div>
                                    <div class="mui-card-content yydcont">
                                        <p>
                                            1、还款保证金 <span>（此金额在还款成功后，次日原路退回）</span>
                                            <p>计算方式：保证金=还款金额*保证金比例</p>
                                            <p>保证金比例</p>
                                            <p>(1）还款期剩余3天，比例可选值（20%）</p>
                                            <p>(2）还款期剩余4天，比例可选值（15%、20%、）</p>
                                            <p>(3）还款期剩余5~7天，比例可选值（10%、15%、20%）</p>
                                            <p>(4）还款期剩余8天以上，比例可选值（5%、10%、15%、20%）</p>
                                            <p>(5）1000元≤还款金额≤2000元，比例可选值（15%）</p>
                                            <p>(6）2000元＜还款金额＜3000元，比例可选值（10%）</p>
                                            <p>示例，还款金额：10000元，保证金比例5%；</p>
                                            <p>还款保证金：10000*5%=500元</p>
                                        </p>
                                        <p>
                                            2、银行手续费
                                            <p>计算方式：手续费=还款金额*<span style="color:ff1d1d">8.5‰</span>*还款月数</p>
                                            <p>示例，还款金额：10000元，还款月数为1个月</p>
                                            <p>手续费：10000*8.5‰*1=85元</p>
                                        </p>
                                        <p>
                                            3、用户须知
                                            <p>还款期内，由于用户自身原因，导致的还款失败所产生的费用（包括但不限于银行违约金及逾期利息等）及其他后果，由用户自行承担。</p>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <card-preview @welcomeBack="isPreview=true;" :plandatas="plans"></card-preview>
        </div>

    </div>
</template>
<script>
    import myHeader from '../../../commons/publics/myHeader.vue'
    import cardPreview from "./cardPreview.vue"
    export default {
        data(){
            return {
                time1:null,
                time2:null,
                ptions:null,// 保证金比例
                ysum:"",
                creditCardId:this.$route.query.id,
                startTime:'',
                endTime:'',
                proportions:[],
                plans:[],
                dataSS:{},
                isPreview:true,
                cardLimit:'',
                pker:'',
                nian:'',
                yue:''
            }
        },
        watch:{
            "ysum":function(newValue,oldValue){
                if(newValue!=oldValue){
                    this.plans=[];
                    this.dataSS={};
                    this.time1="";
                    this.time2="";
                    this.proportions=[];
                    this.ptions="";
                };
            },
            "time1":function(newValue,oldValue){
                if(newValue!=oldValue){
                    this.time2="";
                    this.plans=[];
                    this.dataSS={};
                    this.proportions=[];
                    this.ptions="";
                };
            },
            "time2":function(newValue,oldValue){
                if(newValue!=oldValue){
                    this.plans=[];
                    this.dataSS={};
                    this.proportions=[];
                    this.ptions="";
                };
            },
            "ptions":function(newValue,oldValue){
                if(newValue!=oldValue){
                    this.plans=[];
                    this.dataSS={};
                };
            },
            "isPreview":function(newValue,oldValue){
                if(newValue){
                    mui.init();
                    setTimeout(()=>{
                        mui('#dfs').scroll();
                        mui('#textNo').scroll();
                    },0);
                };
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
                vm.goCards();
            }
            this.time1=null;
            this.time2=null;
            mui('#dfs').scroll();
            mui('#textNo').scroll();
        },
        methods:{
            focusInput(){
                this.getPreData(1);
            },
            getPreData(action){
                const vm=this;
                mui.init();
                const w = plus.nativeUI.showWaiting( "加载中..." );
                this.$ajax({
                    url:"/openapi/v1/consumption/createPlanAssist",
                    data:{
                        creditCardId:vm.creditCardId,
                        action:action,
                        repaymentAmount:vm.ysum||'',
                        startTime:vm.time1?vm.time1.slice(0,7).replace(/年/g,'-'):'',
                        endTime:vm.time2?vm.time2.slice(0,7).replace(/年/g,'-'):'',
                    },
                    success:function(res){
                        if (res.code!=="0000") {
                            mui.toast(res.msg);
                            return false;
                        }else{
                            if (action==1) {
                                vm.startTime=res.timeInterval.startTime;
                                vm.endTime=res.timeInterval.endTime;
                                // vm.time1=vm.startTime.replace(/-/g,'年')+'月';
                                // vm.time2=vm.endTime.replace(/-/g,'年')+'月';
                                vm.cardLimit=res.cardLimit;
                            }else if (action==2) {
                                vm.proportions=res.proportion;
                            };
                            w.close();
                        };
                    }
                })
            },
            noticeBtn(){
                mui('#textNotice').popover('toggle');
            },
            gotoYULAN(){
                if (!this.plans.length) {
                    mui.toast("请输入还款金额和还款日期");
                }else{
                    this.isPreview=false;
                };
            },
            openPicker(flag){
                const vm=this;
                if (Number(vm.ysum)==0) {
                    mui.toast("请输入还款金额");
                    return false;
                };
                 if (flag==1) {
                    var dtpicker=new mui.DtPicker({
                        type: "month",
                        beginDate: new Date(vm.startTime.slice(0,4),vm.startTime.slice(-2)-1),
                        endDate: new Date(vm.endTime.slice(0,4),vm.endTime.slice(-2)-1),
                        // endDate: vm.endTfn(flag),
                    });
                 }
                 if (flag==2) {
                     var dtpicker=new mui.DtPicker({
                        type: "month",
                        beginDate: new Date(vm.nian,vm.yue-1),
                        endDate: new Date(vm.endTime.slice(0,4),vm.endTime.slice(-2)-1),
                        // endDate: vm.endTfn(flag),
                    });
                 }

                dtpicker.show( function(e){
                    if (flag==1) {
                        // 起始时间
                        vm.nian=e.y.text;
                        vm.yue=e.m.text;
                        vm.time1=e.y.text+'年'+e.m.text+'月';
                    }else if(flag==2){
                        // 截止时间
                        vm.time2=e.y.text+'年'+e.m.text+'月';
                        setTimeout(()=>{
                            vm.getPreData(2);
                        },200);
                    };
                });
                vm.pker=dtpicker;
            },
            endTfn(flag){
                if (flag==1) return;
                if (!this.time1) return;
                var year= this.time1.slice(0,4), month=this.time1.slice(-3, -1);
                var _year = new Date(year+'/'+month);
                var y1=new Date(_year.setMonth(_year.getMonth()+6));
                return new Date(y1.getFullYear(),y1.getMonth())
            },
            submitPlan(sign){
                const vm=this;
                this.$ajax({
                    url:'/openapi/v1/consumption/createPlan',
                    data:{
                        creditCardId:vm.creditCardId,
                        proportion:vm.ptions,
                        repaymentAmount:vm.ysum,
                        startTime:vm.time1.slice(0,7).replace(/年/g,'-'),
                        endTime:vm.time2.slice(0,7).replace(/年/g,'-'),
                    },
                    success:function(res){
                        if (res.code!=="0000") {
                            setTimeout(()=>{
                                mui.toast(res.msg);
                            },1000);
                            return
                        }else{
                            switch (sign) {
                                case "提交":
                                    vm.$router.push({path:"/cardConfirmPayment",query:{
                                        fee:res.data.fee,
                                        cardNo:res.data.cardNo,
                                        bankName:res.data.bankName,
                                        repaymentAmount:vm.ysum,
                                        planReceipt:res.planReceipt,
                                        creditCardId:vm.creditCardId,
                                        retentionMoney:res.data.retentionMoney,
                                    }});
                                    break;
                                case "消费":
                                    vm.dataSS=res.data;     // 消费明细数据
                                    vm.plans=res.plans;     // 预览计划数据
                                    break;
                            };
                        }
                    }
                });
            },
            selectItem(item){
                if (!item.status) return;
                this.ptions=item.proportion;
                mui("#proportions").popover('hide');
                setTimeout(()=>{
                    this.submitPlan("消费");
                },300);
            },
            bluerInput(){
                if (this.ysum=="") {
                    this.ysum="";
                }else{
                    const isNumber=!isNaN(this.ysum);
                    if (isNumber) {
                        if (this.ysum*1<1000) {
                            this.ysum="";
                            mui.toast("最小还款金额为1000...");
                        }else if(this.ysum*1>this.cardLimit){
                            this.ysum="";
                            mui.toast("最大还款金额为"+this.cardLimit);
                        }else{
                            this.ysum=Number(this.ysum).toFixed(2);
                        };
                    }else{
                        this.ysum="";
                        mui.toast("请输入正确的金额...");
                    };
                }
            },
            clearDt(){
                this.ysum="";
            },
            proportionsFn(){
                if (!this.proportions.length) {
                    mui.toast("请输入还款金额和还款日期");
                }else{
                    mui('#proportions').popover('show');
                }
            },
            goCards(){
                if (this.time1||this.time2) {
                    this.pker.hide();
                };
                mui.confirm("是否放弃编辑内容"," ",['否','是'],this.actionss);
            },
            actionss(s){
                if (s.index==1) {
                    this.$router.replace("/card");
                }else if (s.index==0){
                    return
                };
            },
        },
        computed:{
            nMonth:function(){
                if (!this.time1) return;
                if (!this.time2) return;
                var year=this.time2.slice(0,4)-this.time1.slice(0,4);
                var month=this.time2.slice(-3,-1)-this.time1.slice(-3,-1);
                var tmlMonth;
                if (year) {
                    tmlMonth=year*12+month;
                }else{
                    tmlMonth=month;
                };
                return tmlMonth+1;
            },
        },
        components:{
            myHeader,
            cardPreview,
        }
    }
</script>
<style scoped>
    .ycontent{
        margin-top: 0.88rem;
    }
    .textNotice{
        font-size: 0.26rem;
        color:#b3a0d9;
    }
    .card-bg{
       
        height:3.0rem;
    }
    .card-bg h4,
    .card-bg h2{
        margin-top: 0;
        margin-bottom: 0;
        text-align: center;
        font-weight: normal;
    }
    .card-bg .txt1{
        
        font-size: 0.22rem;
        padding:0.6rem 0;
    }
    .card-bg .txt1::after,
    .card-bg .txt1::before{
        display: inline-block;
        content: '';
        vertical-align: middle;
        border-style: solid;
        border-color: #fff;
        border-width: 1px 0.55rem 0 0.55rem;
    }
    .card-bg .txt2{
        color: #fff;
        padding-top:0.18rem;
    }
    .card-bg .txt2 label{
        font-size: 0.4rem;
        text-align: right;
        padding: 0.24rem 0.15rem 0.12rem 0;
    }
    .card-bg .txt2 input{
        font-size:0.6rem;
        padding:0;
    }
    .card-bg .txt2 span.mui-icon.mui-icon-clear{
        color: #fff;
        line-height: 0.76rem;
    }
    .dates,.jes{
        height:0.97rem;
        border-bottom: 0.01rem solid #e1e1e1;
        background: #fff;
        line-height: 0.97rem;
        font-size:0.28rem;
        color: #646464;
    }
    #info {
        padding: 0.2rem 0.1rem;
    }
    #oPopover{
        width: 3.60rem;
    }
    .colorBtn {
        font-size: 0.28rem;
        padding: 0.08rem;
        margin: 0.22rem;
        min-width: 1.8rem;
        color: #646464;
    }
    .jes{
        margin-bottom: 0.5rem;
    }
    .yhed{
        height: 0.88rem;
    }
    .yhed .ya1,
    .yhed .ya2 {
        font-size:.28rem;
        color:#646464;
    }
    
    .ycont{
        /* height:2.8rem; */
        text-align: left;
    }
    .ycont p{
        font-size: 0.24rem;
        margin-top: 0;
        margin-left: 0.3rem;
        margin-bottom: 0.12rem;
        color: #b4b4b4;
    }
    .ycont p:first-child{
        margin-top: 0.16rem;
    }
    .ybtns{
        margin-top:1.34rem;
    }
    .ybtns>button{
        height: 0.98rem;
        width: 5rem;
        font-size:0.36rem;
        
    }
    .yyd .yyd1{
        color: #323232;
    }
    .yyd .yydcont{
        /* height: 11.5rem; */
        text-align: left;
    }
    .yyd .yydcont p{
        font-size: 0.26rem;
        color: #323232;
        margin-left: 0.4rem;
        margin-top: 0;
        margin-bottom: 0.12rem;
    }
    .yyd .yydcont p:first-child{
        margin-top: 0.16rem;
    }
    .yyd .yydcont p span{
        color: #b4b4b4;
        font-size:.24rem;
    }
    .YYYprop{
        height: 6rem;
    }
    .YYYNotice{
        height: 9.38rem;
    }
    .disabledS{
        opacity: .4;
        background: #cfcfcf;
    }
    .txt2>input::-webkit-input-placeholder {
        color: #b3a0d9;
        text-overflow: ellipsis;
    }
    .txt2>input:-moz-placeholder {
        color: #b3a0d9 !important;
        text-overflow: ellipsis;
    }
    .txt2>input::-moz-placeholder {
        color: #b3a0d9 !important;
        text-overflow: ellipsis;
    }
    .txt2>input:-ms-input-placeholder {
        color: #b3a0d9 !important;
        text-overflow: ellipsis;
    }
</style>























