<template>
	<div id='content'>
		
		<div id="digitalLoadingss" v-if="ggst" style="z-index: 10;">
			
			<div class="mui-slider">
				<div class="mui-slider-group">
					<div class="mui-slider-item"><img class="ijh" src="../../../static/commons/img/login/ydy_720x1242_01.png" alt=""></div>
					<div class="mui-slider-item"><img class="ijh" src="../../../static/commons/img/login/ydy_720x1242_02.png" alt=""></div>
					<div class="mui-slider-item"><img class="ijh" src="../../../static/commons/img/login/ydy_720x1242_03.png" alt=""></div>
					<div class="mui-slider-item"><img class="ijh" src="../../../static/commons/img/login/ydy_720x1242_04.png" alt="">
						<button type="button" @click="chudiaoguanggao" class="mui-btn mui-btn-royal mui-btn-outlined difix">立即体验</button>
					</div>
				</div>
			</div>
		</div>
		<div class="login-ct">
			<img src="../../../static/commons/img/logo/logo.png" alt="" class="log-img" />
			<div class="dguewbd">
				<div class="input">
					<img src="../img/login/log_account.png" alt="" />
					<input maxlength="11" placeholder="请输入手机号码" @input="phoneInput" v-model="phone" class="shoujihao" type="text" />
				</div>
				<div class="input2">
					<img src="../img/login/log_verify.png" alt="" />
					<input v-model="yanzhengma" class="yanzhengma" type="text" placeholder="请输入验证码" />
				     <button @click="huoquyanzhengma" :class="{avtive: isGet}" :disabled="isGet" class="button-yanz bjzhuse"> {{ isGet? second + 's重新获取' : '获取短信验证码'}} </button>   
				</div>
				<button class="denglu bjzhuse" @click="denglu"> 登录</button>
			</div>
		</div>
	</div>
</template>
<script>
	import sha1 from "sha1";

	export default {
		data() {
			return {
				second: 60,
				disableStatu: false,
				phone: null,
				yanzhengma: null,
				isGet: false,
				interVal: null,
				_domReady: false,
				_adjust: true,
				needLogin: true,
				ymLogin: true,
				tiaoguo: '跳过3',
				data: {},
				digitalLoadingSetInterval: null,
				ggst: true,
				gongceurl:'http://app.wapvi.cn/',//泓创
			    // gongceurl:'https://app.yorktom123.com/',//他他卡友
				// gongceurl:'https://app-gao.yorktom123.com/',//高总轻松还
				// gongceurl:'https://app-he.yorktom123.com/', //何总卡任还
				
			};
		},
		mounted() {
			var vm = this;
			

			// vm.$router.push("/menus");
			 mui.init({
				keyEventBind: {
					backbutton: true, //关闭back按键监听
				}
			});
			//处理逻辑：1秒内，连续两次按返回键，则退出应用；
			var first = null;
			mui.back = function() {

				//首次按键，提示‘再按一次退出应用’
				if (!first) {
					first = new Date().getTime();//记录第一次按下回退键的时间
					mui.toast('再按一次退出应用');//给出提示
					setTimeout(function() {//1s中后清除
						first = null;
					}, 1000);
				} else {
					if (new Date().getTime() - first < 1000) {//如果两次按下的时间小于1s，
						plus.runtime.quit();//那么就退出app
				} 
			} 
			};
			//获得slider插件对象
			var gallery = mui('.mui-slider');
			gallery.slider({
				interval: 0,
				bounce: false
			});
			// DOMContentLoaded事件处理
			vm.compatibleAdjust();

		},
		methods: {
			chudiaoguanggao() {
				this.ggst = false;
				localStorage.setItem("v1", 1);
			},
			handleChange(index) {

			},
			loginBtn() {
				this.$router.push("/menus");
			},
			clean() {
				var vm = this;
			},
			compatibleAdjust() {
				var vm = this;
				var chucun = localStorage.getItem("v1");
				if(chucun == 1) {
					this.ggst = false;
				};

				// var arr = plus.device.uuid.split(",");
				// vm.data = {
				//   deviceUUID: sha1(arr[0])
				// };

				//测试代码，先写死一部手机的UUID,调试时跳过登录
			    vm.data.deviceUUID = "6ab471129fd6a03674a1daa8509e85a1873f4ff5";
				
				$.ajax({
					type: "post",
					url: vm.gongceurl+"openapi/v1/loading",
					async: true,
					data:vm.data,
					success: function(res) {
						if(res.code == "0000") {
							vm.needLogin = false;
							vm.$router.push("/menus");
							localStorage.setItem("token", res.token);
							localStorage.setItem("openId", res.openId);
						}else{
						
					    }
					}
				});
			},
			huoquyanzhengma() {
				var vm = this;
				// 显示自动消失的提示消息
				if(this.phone) {
					if(this.phone.length == 0) {

						mui.toast("手机号不能为空");
					} else if(
						/^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,6,7,8]{1}\d{8}$|^18[\d]{9}$/.test(
							this.phone
						)
					) {
						//发送手机号
						vm.data.phone = this.phone;
						 var time=setTimeout(function(){
							mui.toast("无网络链接");
						},5000)
						$.ajax({
							type: "post",
							url: vm.gongceurl+"openapi/v1/loginSendSms",
							dataType: "json",
							data: vm.data,
							success: function(res) {
								clearTimeout(time);
								if(res.code == "0000") {
									vm.isGet = true;
									mui.toast(res.msg);
									vm.getYan();
								}else{
									mui.toast(res.msg);
								}
							}
						});
					} else {
						mui.toast("手机号格式错误");
					}
				} else {
					mui.toast("手机号不能为空");
				}
			},
			denglu() {
				var vm = this;
				var data={};
				data.phone = this.phone;

				// data.deviceUUID = plus.device.uuid.split(",")[0];
				// data.deviceUUID = sha1(data.deviceUUID);

				//测试代码，先写死一部手机的UUID,调试时跳过登录
				data.deviceUUID = "6ab471129fd6a03674a1daa8509e85a1873f4ff5";

				data.smsCode = this.yanzhengma;
				// var w = plus.nativeUI.showWaiting("登录中...");
                // var time=setTimeout(function(){
                //        mui.toast("无网络链接");
                //       w.close();
				//   },5000)
				$.ajax({
					type: "post",
					url: vm.gongceurl+"openapi/v1/login",
					dataType: "json",
					data: data,
					success: function(res) {
						// w.close();
						// clearTimeout(time);
						if(res.code == "0000") {
							//登录成功
							localStorage.setItem("token", res.token);
							localStorage.setItem("openId", res.openId);
							vm.$router.push("/menus");
						} else if(res.code == "0003") {
							mui.toast("验证码错误");
						} else if(res.code == "0004") {
							mui.toast("号码未注册，请联系代理商");
						} else {
							mui.toast(res.msg);
						}
					}
				});
			},
			phoneInput(e) {
				this.phone = e.target.value.replace(/\D/g, "");
				if(e.target.value) {
					if(e.target.value.length == 1) {
						if(e.target.value == 1) {} else {
							this.phone = "";
							mui.toast("请输入正确的手机号码");
						}
					}
				}
			},
			getYan() {
				this.second = 60;
				clearInterval(this.interVal);
				var self = this;
				this.interVal = setInterval(function() {
					self.second--;
					if(self.second == 0) {
						clearInterval(self.interVal);
						self.isGet = false;
					}
				}, 1000);
			}
		}
	};
</script>
<style scoped>
	#digitalLoading {
		position: absolute;
		height: 100%;
		width: 100%;
		background: url(../../../static/commons/img/login/and_720x1242.png) no-repeat;
		background-size: 100% 100%;
	}

	#digitalLoadingss {
		position: absolute;
		height: 100%;
		width: 100%;
		background: #fff;
	}

	#digitalLoadingBtn {
		float: right;
		margin-right: 30px;
		margin-top: 30px;
	}
	
	.difix {
		position: absolute;
		bottom: 1rem;
		left: 50%;
		margin-left: -41px;
	}
	
	#content {
		width: 100%;
		background: #efeff4;
		height: 400px;
	}
	
	.login-ct {
		width: 6.9rem;
		height: 7rem;
		border-radius: 8px;
		margin-left: 0.3rem;
		background: #fff;
		position: relative;
		top: 2rem;
	}
	
	.input {
		margin-left: 0.3rem;
		margin-right: 0.3rem;
		margin-bottom: 0.3rem;
		border-bottom: 1px solid #d5d7dc;
		height: 1rem;
		text-align: left;
		padding-left: 0.15rem;
	}
	
	.input2 {
		height: 1rem;
		text-align: left;
		padding-left: 0.15rem;
		margin-left: 0.3rem;
		margin-right: 0.3rem;
		margin-bottom: 0.3rem;
		border-bottom: 1px solid #d5d7dc;
	}
	
	.input .shoujihao {
		outline: none;
		border: none;
		width: 4rem;
		font-size: 14px;
	}
	
	.input img {
		display: inline-block;
		height: 0.42rem;
		margin-top: .15rem;
	}
	
	.input2 img {
		display: inline-block;
		height: 0.42rem;
		margin-top: .15rem;
	}
	
	.log-img {
		width: 2.5rem;
		position: relative;
		top: -1rem;
	}
	
	.input2 .yanzhengma {
		outline: none;
		border: none;
		width: 2.7rem;
		font-size: 14px;
	}
	
	.button-yanz {
		width: 2.7rem;
		height: 0.88rem;
		color: #fff;
		border: 0;
	}
	
	.denglu {
		width: 6.4rem;
		height: 0.96rem;
		color: #fff;
		border-radius: 8px;
		border: 0;
		margin-left: 0.25rem;
		margin-top: 0.5rem;
	}
	
	.dguewbd {
		margin-top: -0.5rem;
	}
	
	.avtive.button-yanz {
		background: #d6d7dc !important;
		color: #7f8393;
		border: 0;
	}
	
	.ijh {
		width: 100%;
		height: 95%;
	}
</style>