<template>
	<div class="home3">
		<my-header :title="'分享'" :leftDisplay="false" :back="false">
		</my-header>

		<div class="margi">
			<div class="fenxiang1 " v-if="fenxiang1">
				<input type="button" class="btn-zi bjzhuse" id="weixfenxiang" value="微信分享" @click="weixfenxiangss" />
			</div>
			<div class="fenxiang1" v-if="fenxiang2">
				<input type="button" class="btn-zi bjzhuse" id="duanxin" value="短信分享" @click="duanxfenx" />
			</div>
			<div class="fenxiang1" v-if="fenxiang3">
				<input type="button" class="btn-zi bjzhuse" id="erweima" value="二维码分享" @click="erweimafen" />
			</div>
		</div>
	</div>
</template>
<script>
	import myHeader from "../../commons/publics/myHeader.vue";
	export default {
		data() {
			return {
				fenxiang1: false,
				fenxiang2: false,
				fenxiang3: false,
				urls: "",
				httpsd: "",
				appname:'泓创金服'
			};
		},
		mounted() {
			mui.init();
			var vm = this;
			this.$ajax({
				url: "openapi/v1/share/getShareList",
				type: "post",
				success: function(res) {
					if(res.code == "0000") {
						for(var i = 0; i < res.data.length; i++) {
							if(res.data[i].action == "1") {
								vm.fenxiang1 = true;
							}
							if(res.data[i].action == "2") {
								vm.fenxiang2 = true;
							}
							if(res.data[i].action == "3") {
								vm.fenxiang3 = true;
							}
						}
					}
				}
			});
		},
		methods: {
			//微信
			weixfenxiangss() {
				var vm = this;
				
				this.$ajax({
					url: "/openapi/v1/share/shareFunction",
					type: "post",
					data: {
						action: "1"
					},
					success: function(res) {
						if(res.code == "0000") {
							vm.httpsd = res.shareUrl;
							var shares = {};
							plus.share.getServices(
								function(s) {
									if(s && s.length > 0) {
										for(var i = 0; i < s.length; i++) {
											var t = s[i];
											shares[t.id] = t;
										}
									}
								},
								function() {
									mui.toast("获取分享服务列表失败");
								}
							);
							var ids = [{
									id: "weixin",
									ex: "WXSceneSession"
								}],
								bts = [{
									title: "发送给微信好友"
								}];
							plus.nativeUI.actionSheet({
									cancel: "取消",
									buttons: bts
								},
								function(e) {
									var i = e.index;
									if(i > 0) {
										var s_id = ids[0].id;
										var share = shares[s_id];
										if(share.authenticated) {
											vm.shareMessage(share, ids[0].ex);
										} else {
											share.authorize(
												function() {
													vm.shareMessage(share, ids[0].ex);
													
												},
												function(e) {
													// mui.toast("认证授权失败：" + e.code + " - " + e.message);
													mui.toast("认证授权失败");
												}
											);
										}
									}
								}
							);
						}
					}
				});
			},
			//二维码
			erweimafen() {
				this.$router.push("/code");
			},
			duanxfenx() {
				this.$router.push("/message");
			},
			shareMessage(share, ex) {
				var vm = this
				//分享内容
				var msg = {
					extra: {
						scene: ex
					}
				};

				msg.href = vm.httpsd;
				msg.title = "邀请您注册使用"+vm.appname+"软件";
				msg.content = "专业、智能、安全的信用卡代还APP,邀请好友注册使用有惊喜！";
				msg.thumbs = ["http://oyrra3h8k.bkt.clouddn.com/register/static/img/logo_108.png"];
				share.send(
					msg,
					function() {
						console.log('分享到"' + share.description + '"成功！ ');
					},
					function(e) {
						console.log('分享到"' + share.description + '"失败: ' + e.code + " - " + e.message);
					}
				);
			}
		},
		components: {
			myHeader,
		}
	};
</script>
<style scoped>
	.margi {
		margin-top: .88rem;
		padding-top: 2rem;
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
		border: 0;
	}
</style>