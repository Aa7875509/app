<template>
	<div>
		<my-header :title="'我的'" :leftDisplay="false" :back="false">
		</my-header>
		<div class="ctr">
			<div class="row1">
				<div class="touxiang">
					<img class="touxiang" src="../../../static/commons/img/logo_256.png" alt="">
					<div class="row1-a">
						<div style="font-size: 0.32rem;text-align:left">{{userName}}</div>
						<div style="font-size: 0.24rem;color:#b4b4b4;text-align:left">{{phone}}</div>

						<div class="agent" >
							<span>用户等级：</span><span>{{levelName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
							<a v-show="isRaiseLevel=='1'" href="#forward" class="mui-btn" style="padding: 2px 10px;">提升等级</a>
						</div>

					</div>
				</div>
			</div>
			<div class="main">
				<div v-show="isShowInvitationCode=='1'">
					<div @click="tojihuoma" class="row2">
						<div class="row2-a">
							<img src="../../../static/commons/img/myicon/ic_fradd.png" />
							<span>我的邀请码</span>
						</div>
						<span style="font-size: 0.5rem;" class="row3-b mui-icon mui-icon-arrowright"></span>
					</div>
					<hr class="line"></hr>
				</div>
				<div v-show="iferyaosu=='0'">
					<div @click="shimin" class="row2">
						<div class="row2-a">
							<img src="../../../static/commons/img/myicon/ic_shim.png" />
							<span>实名认证</span>
						</div>
						<span style="font-size: 0.5rem;" class="row3-b mui-icon mui-icon-arrowright"></span>
					</div>
					<hr class="line"></hr>
				</div>
				<div @click="toWallet" class="row2">
					<div class="row2-a">
						<img src="../../../static/commons/img/myicon/ic_wallet.png" />
						<span>钱包</span>
					</div>
					<span style="font-size: 0.5rem;" class="row3-b mui-icon mui-icon-arrowright"></span>
				</div>
				<hr class="line"></hr>
				<div class="row2" @click="security">
					<div class="row2-a">
						<img src="../../../static/commons/img/myicon/ic_center.png" />
						<span>安全中心</span>
					</div>
					<span style="font-size: 0.5rem;" class="row3-b mui-icon mui-icon-arrowright"></span>
				</div>
				<hr class="line"></hr>
				<div class="row2" @click="abouUs">
					<div class="row2-a">
						<img src="../../../static/commons/img/myicon/ic_us.png" />
						<span>关于我们</span>
					</div>
					<span style="font-size: 0.5rem;" class="row3-b mui-icon mui-icon-arrowright"></span>
				</div>
				<!--<hr class="line"></hr>
				<div class="row2" @click="commonProblem">
					<div class="row2-a">
						<img src="../../../static/commons/img/myicon/ic_question.png" />
						<span>常见问题</span>
					</div>
					<span style="font-size: 0.5rem;" class="row3-b mui-icon mui-icon-arrowright"></span>
				</div> -->
				<hr class="line"></hr>
				<div class="row2" @click="tuichu">
					<div class="row2-a">
						<img src="../../../static/commons/img/myicon/ic_exit.png" />
						<span>安全退出</span>
					</div>
					<span style="font-size: 0.5rem;" class="row3-b mui-icon mui-icon-arrowright"></span>
				</div>
			</div>
		</div>
		<div id="forward" class="mui-popover mui-popover-action mui-popover-bottom">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a href="#">客服电话：{{guestPhone}}</a>
				</li>
				<li class="mui-table-view-cell">
					<a href="#" @click="promotionLevel" >呼叫</a>
				</li>
				<li class="mui-table-view-cell">
					<a href="#" @click="hanshu(guestPhone)">复制号码</a>
				</li>
			</ul>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a href="#forward"><b>取消</b></a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import myHeader from '../../commons/publics/myHeader.vue'
	export default {
		data() {
			var userName = localStorage.getItem('userName')
			var phone = localStorage.getItem('phone')
			var iferyaosu = localStorage.getItem('iferyaosu')
			var isShowInvitationCode = localStorage.getItem('isShowInvitationCode')
			var levelName = localStorage.getItem('levelName')
			var guestPhone = localStorage.getItem('guestPhone')
			var isRaiseLevel = localStorage.getItem('isRaiseLevel')
			return {
				phone: phone,
				userName: userName,
				iferyaosu: iferyaosu,
				isShowInvitationCode:isShowInvitationCode,
				levelName:levelName,
				guestPhone:guestPhone,
				isRaiseLevel:isRaiseLevel,
			}
		},
		mounted() {
			mui.init();
			mui('body').on('shown', '.mui-popover', function(e) {
			//console.log('shown', e.detail.id);//detail为当前popover元素
			});
			mui('body').on('hidden', '.mui-popover', function(e) {
				//console.log('hidden', e.detail.id);//detail为当前popover元素
			});
			const self = this
			this.$ajax({
				url: '/openapi/v1/personalCenter/getUserInfo',
				type: 'post',
				success: function(res) {
					if(res.code == '0000') {
						localStorage.setItem('userName', res.data.userName);
						localStorage.setItem('phone', res.data.phone);
						localStorage.setItem('iferyaosu', res.data.isPassIdAndNameCheck);
						localStorage.setItem('isShowInvitationCode', res.data.isShowInvitationCode);
						localStorage.setItem('levelName', res.data.levelName);
						localStorage.setItem('isRaiseLevel', res.data.isRaiseLevel);
						self.phone = res.data.phone;
						self.userName = res.data.userName;
						self.iferyaosu = res.data.isPassIdAndNameCheck;
						self.isShowInvitationCode = res.data.isShowInvitationCode;
						self.levelName = res.data.levelName;
						self.isRaiseLevel = res.data.isRaiseLevel;
						if(res.data.guestPhone==''){
							self.guestPhone='';
						}else{
                            self.guestPhone = res.data.guestPhone;
						}
					}
				}
			})
		},
		methods: {
			getData() {

			},
			// commonProblem(){
            //     this.$router.push("/commonProblem");
			// },
			promotionLevel(){
				var vm=this;
                     plus.device.dial( vm.guestPhone, false);
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
			tojihuoma(){
             this.$router.push("/activationCode");
			},
			toWallet() {
				this.$router.push("/wallet");
			},
			security() {
				var vm = this;
				this.$ajax({
					url: 'openapi/v1/personalCenter/getSecurityCenter',
					success: function(res) {
						//(1=绑定，当绑定时，不可创建手势密码;0=未绑定，)
						vm.$router.push("/security/" + res.isBindGesturePassword);
					},
				});
			},
			//退出软件
			tuichu() {
				// alert("暂时关闭");
				// return ;
				const self = this;
				// self.signOut();
				"iOS" == plus.os.name ?
					plus.nativeUI.confirm(
						"是否确定退出登录？",
						function(e) {
							if(e.index > 0) {
								self.signOut();
							}
						},
						"提示", ["取消", "确定"]
					) :
					confirm("是否确定退出登录？") && self.signOut();
			},
			//安全退出
			signOut() {
				const self = this
				this.$ajax({
					url: 'openapi/v1/signOut',
					type: 'post',
					success: function(res) {
						if(res.code == '0000') {
							self.$router.push("/");
						}
					}
				})
			},
			abouUs() {
				this.$router.push("/abouUs");
			},
			shimin() {
				this.$router.push("/realName");
			}
		},
		components: {
			myHeader,
		}
	}
</script>
<style scoped>
	.agent{
		line-height: 25px;
		text-align:left;
	}
	.ctr {
		background: #efeef4;
		margin-top: .88rem;
	}

	.row1 {
		background: #fff;
		padding: .5rem .3rem;
		display: flex;
		display: -webkit-flexbox;
		flex-wrap: nowrap;
		justify-content: space-between;
	}

	.touxiang {
		display: flex;
		display: -webkit-flexbox;
		flex-wrap: nowrap;
		justify-content: space-between;
	}

	.row1-a {
		padding-top: .1rem;
		padding-left: .1rem;
		color: #645464;
		font-size: .2rem;
	}

	.row1-b {
		text-align: center;
		color: #fff;
		font-size: .5rem;
		padding-top: .5rem;
		padding-bottom: .8rem;
		display: flex;
		display: -webkit-flexbox;
		flex-wrap: nowrap;
		justify-content: space-between;
	}

	.main {
		background: #fff;
		margin-top: .3rem;
	}

	.row2 {
		display: flex;
		display: -webkit-flexbox;
		flex-wrap: nowrap;
		justify-content: space-between;
		padding: .24rem .3rem;
		background: #fff;
	}

	.row2 img {
		margin-top: 0.05rem;
		width: .4rem;
		height: 0.4rem;
		margin-right: .26rem;
	}

	.row2-a {
		display: flex;
		display: -webkit-flexbox;
		flex-wrap: nowrap;
		justify-content: space-between;
		height: 0.45rem;
		line-height: 0.5rem;
	}

	.line {
		margin-left: .9rem;
		height: 1px;
		border: 0;
		background: #e1e1e1;
		width: 6.6rem;
		box-sizing: border-box;
		-webkit-margin-before: 0;
		-webkit-margin-after: 0;
	}

	.row3 {
		display: flex;
		display: -webkit-flexbox;
		flex-wrap: nowrap;
		justify-content: space-between;
		padding: .3rem .4rem;
		margin: .2rem 0 0.02rem 0;
		background: #fff;
	}

	.row3-b {
		color: #999;
	}

	.row4 {
		background: #fafafa;
		margin-top: .05rem;
		padding: .4rem .4rem;
		display: flex;
		display: -webkit-flexbox;
		flex-wrap: nowrap;
		justify-content: space-between;
		font-size: .44rem;
		color: #323232;
	}

	.grey-mini {
		font-size: .28rem;
		color: #b4b4b4;
		margin-top: .1rem;
	}

	.touxiang img {
		width: 1.1rem;
		height: 1.1rem;
		border-radius: 50%;
	}
</style>
