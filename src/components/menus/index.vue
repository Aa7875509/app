<template>
	<div>
		<div class="ct">
			<div class="home1">
				<div class="swipe-ct">
					<mt-swipe :auto="5000">
						<mt-swipe-item><img src="../../../static/commons/img/ic-home/banner01.png" alt=""></mt-swipe-item>
						<mt-swipe-item><img src="../../../static/commons/img/ic-home/banner02.png" alt=""></mt-swipe-item>
						<mt-swipe-item><img src="../../../static/commons/img/ic-home/banner.png" alt=""></mt-swipe-item>
					</mt-swipe>
				</div>
			</div>
			<div class="row2">
				<div style="width:50%;float: left;" @click="lijihukb">
					<div class="shoukuan ztzhuse">
						<div>
							<img src="../../../static/commons/img/ic-home/ic_common_def.png" alt="">
							<div>立即还款</div>
						</div>
					</div>
				</div>
				<div style="width:50%;float: left;"  @click="lijihu">
					<div class="shoukuan ztzhuse">
						<div>
							<img src="../../../static/commons/img/ic-home/ic_retime_def.png" alt="">
							<div>我的收益</div>
						</div>
					</div>
				</div>
			</div>
			<div class="home-2"> <img src="../../../static/commons/img/ic-home/proclaim.png" alt="">
			</div>
			<div class="middle-ban">
				<div class="row3">
					<div style="width:33.3%;float: left;" @click="tiaodaikuan('1')">
						<div class="kuai">
							<div>
								<img src="../../../static/commons/img/ic-home/ic_credit_def.png" alt="">
								<div>办信用卡</div>
							</div>
						</div>
					</div>
					<div style="width:33.3%;float: left;" @click="tiaodaikuan('2')">
						<div class="kuai">
							<div>
								<img src="../../../static/commons/img/ic-home/ic_loan_def.png" alt="">
								<div>贷款</div>
							</div>
						</div>
					</div>
					<div style="width:33.3%;float: left;">
						<div class="kuai">
							<div>
								<img src="../../../static/commons/img/ic-home/ic_inquire_dis.png" alt="">
								<div>征信查询</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row4">
					<div style="width:33.3%;float: left;" @click="lijihukb">
						<div class="kuai">
							<div>
								<img src="../../../static/commons/img/ic-home/ic_cjhk_def.png" alt="">
								<div>超级还款</div>
							</div>
						</div>
					</div>
					<div style="width:33.3%;float: left;">
						<div class="kuai" @click="fenxiang">
							<div>
								<img src="../../../static/commons/img/ic-home/ic_zuanq_def.png" alt="">
								<div>分享赚钱</div>
							</div>
						</div>
					</div>
					<div style="width:33.3%;float: left;" @click="lijihukbss">
						<div class="kuai">
							<div>
								<img src="../../../static/commons/img/ic-home/ic_kefu_def.png" alt="">
								<div>客服中心</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <div class="row5">
				<div class="kuai">
					<div>
						<img src="../../../static/commons/img/ic-home/ic_b_exploit_def.png" alt="">
						<div>超级还款</div>
					</div>
				</div>
			</div>  -->
		</div>
		<div v-if="isupdate" class="mui-backdrop">
			<div class="dialog">
               <div style="height:10%;line-height:.6rem;font-size:0.24rem">强制更新&nbsp;{{data.version}}</div>
				<ol class="dialog-main">
					<li v-for="(item,index) in data.updateContent" :key="index">{{item}}</li>
				</ol>
			   <div class="btm" @click="update">下载更新</div>
			</div>
		</div>
	</div>
</template>

<script>
	import myHeader from "../../commons/publics/myHeader.vue";
	import myInput from "../../../src/commons/publics/myInput";
	export default {
		data() {
			return {
				_adjust: false,
				version:'1.0.2',
				data:{},
				isupdate:false,
			};
		},
		mounted() {
			var vm =this;
			mui.init({
				keyEventBind: {
					backbutton: true, //关闭back按键监听
				}
			});
			vm.$ajax({
				url: "openapi/v1/checkVersion",
				type: "post",
				data:{version:vm.version},
				success: function(res) {
					if (res.code=='0000') {
						vm.data=res.data;
						vm.isupdate=true;
					} 
				}
			})
		},
		methods: {
			
			rightButton() {
				console.log("右边");
			},
			lijihu(){
				this.$router.push('/wallet')

			},
			lijihukb(){
				this.$router.push('/card')
			
			},
			lijihukbss(){
				this.$router.push('/abouUs')
			
			},
			fenxiang(){
				this.$router.push('/share')
			},
			fenxiang(){
				this.$router.push('/share')
			},
			tiaodaikuan(tie){
				var vm=this;
				var you='';
				if(tie=='1'){
					you='办信用卡';
				}else{
					you='贷款';
				}
				mui.openWindowWithTitle({
					url:'http://card.chenwenlin.com/app/18676736313/index',
					id:'detail'
				},{
					title:{//标题配置
						text:you,//标题文字
					},
					back:{//左上角返回箭头
						image:{
							base64Data:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAb1BMVEUAAAAAev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8AAACubimgAAAAI3RSTlMAGfUTGfQTGPMSGPIYGhgaGBsXGxcbFxwXHBccFhwWHRYdHWufDPQAAAABYktHRACIBR1IAAAAB3RJTUUH4QETEBwooeTlkQAAAJVJREFUSMft1EkSgkAQRNFGUXFWHBDBibr/HTUwD5B/48Ig1y+io7u6MqUhf5hsNEY+j5hMgZ/FJ8Xc9ovos3T96utjbfqN/Nb0O/m96Uv5g+mP8ifTn+Ur01/ka9Nf5RvTt/I309/lH6Z/yr9Mn+Q71/MT8B34K/E58Enzv8R/K98HvnF8p3lr8F7izce7lbf3kJ/lDQp9HdBhgg3PAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTAxLTE5VDE2OjI4OjQwKzA4OjAwpTDFwQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wMS0xOVQxNjoyODo0MCswODowMNRtfX0AAAAASUVORK5CYII='
						},
						click:function(){
							plus.webview.close('detail')
						}
					}
				})
			},
			update(){
				var vm = this;
				var updateurl=vm.data.downloadUrl;
			    plus.runtime.openURL(updateurl);
			}	
		},
		components: {
			myHeader,
			myInput
		}
	};
</script>

<style scoped>
    .dialog{
		width: 4rem;
		height: 6rem;
		background: #ffffff;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -2rem;
		margin-top: -4rem;
		border-radius: 0.1rem;
	} 
    
	.dialog-main{
		margin: 0;;
		text-align: left;
		font-size: 0.24rem;
		height:80%;
		border-top: 1px solid #cdcdcd;
		border-bottom: 1px solid #cdcdcd;
	}
    .btm{
		height:10%;
		font-size:0.24rem;
		line-height:.56rem;
	}
	.btm:active{
		color: red;
	}
    .row5img{
		width: 100%;
		height: 1.83rem;
		
	}
	.flex-center {
		position: absolute;
		top: 3.7rem;
		z-index: 999;
		width: 1.5rem;
		left: 3rem;
	}

	.yuan-item {
		width: 0.14rem;
		height: 0.14rem;
		background: #b388ff;
		border-radius: 50%;
		margin: 0 0.18rem;
		float: left;
	}

	.yuan-item.active {
		background: #fff;
	}

	.swipe-ct img {
		width: 7.5rem;
	}

	.swipe-ct {
		height: 4rem;
	}
     .yz{
		 color: #646464;
	 }
	.home-2 {
		font-size: 0.24rem;
		text-align: left;
		color: #646464;
		padding: 0.1rem 0;
		padding-left: 0.3rem;
	}

	.home-2 img {
		width: 0.5rem;
		
	}

	.row2 {
		padding: 0.1rem 0;
		background: #fff;
		padding-top: 0.5rem;
		padding-bottom: 0.3rem;
		margin-top: -7px;
	}

	.row2::after {
		content: "";
		clear: both;
		display: block;
		width: 0;
		height: 0;
	}

	.row3::after {
		content: "";
		clear: both;
		display: block;
		width: 0;
		height: 0;
	}

	.row4::after {
		content: "";
		clear: both;
		display: block;
		width: 0;
		height: 0;
	}

	.shoukuan {
		font-size: 0.26rem;
	}

	.shoukuan img {
		opacity: 1;
		display: block;
		margin: 0.1rem auto;
		width: 0.5rem;
	}

	.shoukuan img:active {
		opacity: 0.7;
	}

	.row3 {
		font-size: 0.26rem;
		color: #646464;
		height: 2rem;
		box-sizing: border-box;
		padding-top: 0.4rem;
	}

	.row3 img {
		opacity: 1;
		display: block;
		margin: 0.1rem auto;
		width: 0.5rem;
	}

	.row3 img:active {
		opacity: 0.7;
	}

	.row4 {
		height: 2rem;
		box-sizing: border-box;
		padding-top: 0.4rem;
		font-size: 0.26rem;
		color: #646464;
	}

	.row4 img {
		opacity: 1;
		display: block;
		margin: 0.1rem auto;
		width: 0.5rem;
	}

	.middle-ban {
		background: #fff;
	}

	.row5 {
		margin-top: 0.2rem;
		font-size: 0.24rem;
		color: #b4b4b4;
		background: #fff;
		padding: 0.65rem 0;
	}

	.row5 img {
		width: 0.8rem;
	}

	.ct {
		margin-bottom: 60px;
	}
</style>
