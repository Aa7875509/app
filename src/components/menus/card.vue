<template>
	<div>
		<my-header :title="'卡包'" :right="'添加卡片'" @rightButton="cardAdd" :leftDisplay="false" :back="false">
		</my-header>
		<div class="mui-content mui-scroll-wrapper">
			<div class="mui-scroll">
				<div id="sliderSegmentedControl">
					<div class="muicontro" @click="asdada">
						<span class="myyingyong " :class="xianshi==true?'ztzhuse ztzhusexian':''">
	                        信用卡
	                    </span>
					</div>
					<div class="muicontro" @click="xosap">
						<span class="myyingyong " :class="xianshi==true?'':'ztzhuse ztzhusexian'">
							储蓄卡
						</span>
					</div>
				</div>
				<div>
					<div v-show="xianshi" id="ysjdsdsttt">
						<ul class="mui-table-view" id="yyyyyy">
							<li class="mui-table-view-cell"  v-for="(item,index) in xinyongcadr" :key="index">
								<div class="mui-slider-right mui-disabled">
									<a class="mui-btn zise bjzhuse" @click="bianji(item.creditCardId)">编辑</a>
									<a class="mui-btn mui-btn-red" @click="isDel(item,$event)">删除</a>
								</div>
								<div class="mui-slider-handle">
									<div class="home2-indes" @click="cardplan(item.creditCardId,item.status)">
										<div class="home-2-1" >
											<span>{{item.bankName}}</span>
											<span>{{item.cardNo}}</span>
											<span class="mui-icon mui-icon-arrowright cardOperations"></span>
										</div>
										<div class="home-2-2">
											<div>
												<span>{{item.repaymentAt}}号</span><span>还款时间</span>
											</div>
											<div>
												<span>{{item.repaymentAmount}}</span><span>还款金额</span>
											</div>
											<div>
												<span v-if="item.status=='0'" style="color:#ef5350;font-size:.32rem;">不匹配</span>
												<span v-if="item.status=='1'" style="color:#42a5f5;font-size:.32rem;">进行中</span>
												<span v-if="item.status=='2'" style="color:#ffca28;font-size:.32rem;">创建状态</span>
												<span v-if="item.status=='3'" style="color:#66bb6a;font-size:.32rem;">已完成</span>
												<span style="color:#b4b4b4;font-size:.22rem;">还款状态</span>
											</div>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="mobile" v-show="!xianshi">
						<div class="backs" :style="yansee(item.bankName)" v-for="(item,index) in chuxucadr" :key="index">
							<span>{{item.bankName}}</span>
							<span>{{item.cardNo}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import myHeader from '../../commons/publics/myHeader.vue'
	export default {
		data() {
			return {
				ass: '1',
				w: '',
				yanse: "background:#64b5f6",
				xianshi: true,
				chuxucadr: [],
				xinyongcadr: [
					// {bankName:1,cardNo:1,creditCardId:1,repaymentAt:1,repaymentAmount:1,status:1},
					// {bankName:1,cardNo:1,creditCardId:1,repaymentAt:1,repaymentAmount:1,status:1},
					// {bankName:1,cardNo:1,creditCardId:1,repaymentAt:1,repaymentAmount:1,status:1},
					// {bankName:1,cardNo:1,creditCardId:1,repaymentAt:1,repaymentAmount:1,status:1},
					// {bankName:1,cardNo:1,creditCardId:1,repaymentAt:1,repaymentAmount:1,status:1},
					// {bankName:1,cardNo:1,creditCardId:1,repaymentAt:1,repaymentAmount:1,status:1},
					],
				page:1,
				pageLength:5,
				fazhi:true,
				shujukaiguan:true
			}
		},
		created: function() {
			this.xingyongka();
			this.chuxuka();
		},
		mounted() {
			var vm = this;
			//     var w = plus.nativeUI.showWaiting( "刷新中..." );
			//     setTimeout(function(){

			   $('#yyyyyy').css('height',window.innerHeight-150);
			   $('.mobile').css('height', window.innerHeight - 150);
			    //   w.close();
			    // },1000)
			// $("#ysjdsdsttt").on("swipedown", function(e) {

			// 	vm.w = plus.nativeUI.showWaiting("刷新中...");
			// 	vm.shuaxinpanduan();
			// 	setTimeout(() => {
			// 		vm.w.close();
			// 	}, 1000);
			// })

			$("#ysjdsdsttt").on("swipeup", function(e) {
				if(vm.shujukaiguan){
					if(vm.fazhi){
						vm.page++;
						vm.w = plus.nativeUI.showWaiting("加载中...");
						vm.shuaxinpanduan();
					}
				}	
			})
			mui.init();
			vm.yansee(this.bank);

		},

		methods: {
			// 能否删除
			isDel(item,event){
				var vm=this;
				if (item.status==1) {
					mui.toast("计划进行中不能删除");
					return;
				}else{
					 var li = event.target.parentNode.parentNode;
					mui.confirm('确认删除该银行卡？', ' ', ['确认', '取消'], function(e) {
						if (e.index == 0) {
							vm.delAjax(item.creditCardId);
							 setTimeout(() => {
								li.parentNode.removeChild(li);
				            }, 1000);
						} else {
							setTimeout(function() {
								mui.swipeoutClose(li);  
							}, 0);
						}
					});
				};
			},
			delAjax(ids){
				var vm=this;
				// vm.shujukaiguan=false;
				var w = plus.nativeUI.showWaiting("删除中...");
				vm.$ajax({
					url: "openapi/v1/consumption/delCreditCard",
					type: "post",
					data:{creditCardId:ids},
					success: function(res) {
						w.close();
						// vm.shujukaiguan=true;
                           if (res.code=='0000') {
							//   vm.xingyongka()
							  setTimeout(() => {
									mui.toast("删除成功！");
									
								}, 1200);
						   } else {
							   mui.toast(res.msg);
						   } 
					}
				})
				
			},
			xosap() {
				this.page=1;
				this.xianshi = false;
				// 
				// this.chuxuka();
			},
			cardAdd() {

				const self = this;
				this.$ajax({
					url: "openapi/v1/consumption/addCardAssist",
					type: "post",
					success: function(res) {
						if(res.code == "0000") {
							// 带查询参数，变成 /register?plan=private
							self.$router.push({
								path: '/cardAdd',
								query: {
									name: res.name,
									identity: res.identity
								}
							})
							// self.creditCard.name = res.name;
							// self.creditCard.identityNo = res.identity;
							// self.saveCard.name = res.name;
							// self.saveCard.identityNo = res.identity;

						} else if(res.code == "0001") {
							var btnArray = ['取消', '确定'];
							mui.confirm('还未进行实名制是否去实名制认证？', '提示', btnArray, function(e) {
								if(e.index == 1) {
								self.$router.push("/realName");
								}
							})
						} else {
							mui.toast(res.msg);
						}
					}
				});

			},
			bianji(item) {
				var vm = this;
				this.$ajax({
					url: "openapi/v1/consumption/getCreditCardDetailed",
					type: "post",
					data: {
						creditCardId: item
					},
					success: function(res) {
						if(res.code == "0000") {
							vm.$router.push({
								path: '/cardEditCard',
								query: res.data
							})
						} else {
							mui.toast(res.msg);
						}
					}
				});
			},
			asdada() {
				this.xianshi = true;
				this.page=1;
				// $('#yyyyyy').css('height',window.innerHeight-150);
				// this.xingyongka();
			},
			yansee(bank) {
				var vm = this;
				if(bank == "建设银行") {
					return vm.yanse = "background:#64b5f6";

				} else if(bank == "招商银行") {
					return vm.yanse = "background:#e57373";

				} else if(bank == "光大银行") {
					return vm.yanse = "background:#ffd54f";

				} else if(bank == "农业银行") {
					return vm.yanse = "background:#81c784";

				} else {
					return vm.yanse = "background:#64b5f6";

				}
			},
			cardplan(itm,isd) {
				this.$router.push({
					path: '/cardPlan',
					query: {
						creditCardId: itm,
						status:isd
					}
				})
			},
			xingyongka() {
				var vm = this;
				this.$ajax({
					url: "openapi/v1/consumption/getCreditCardList",
					type: "post",
					data: {
						page: vm.page,
						pageLength: 5,
					},
					success: function(res) {
						if(res.code == "0000") {
                             if(res.data.length<5){
							   vm.fazhi=false;
							   if(vm.page>1){
                                    mui.toast("已无更多数据");
							   }
                            }else{
                                vm.fazhi=true;
                            }
                        if(vm.page==1){
                            vm.xinyongcadr = res.data;
                        }else{
                           vm.xinyongcadr= vm.xinyongcadr.concat(res.data);
                        }
                           	
						}
					}
				});
			},
			chuxuka() {
				var vm = this;
				vm.shujukaiguan=false;
				this.$ajax({
					url: "openapi/v1/consumption/getDebitCardsList",
					type: "post",
					data: {
						page: vm.page,
						pageLength: 5,
					},
					success: function(res) {
                         vm.shujukaiguan=true;
						if(res.code == "0000") {
                           
                             if(res.data.length<5){
                               vm.fazhi=false;
                               if(vm.page>1){
                                    mui.toast("已无更多数据");
							   }
                            }else{
                                vm.fazhi=true;
                            }
							if(vm.page==1){
								vm.chuxucadr = res.data;
							}else{
							vm.chuxucadr= vm.chuxucadr.concat(res.data);
							}
						}
					}
				});
			},
			shuaxinpanduan() {
				var vm = this;
				if(vm.xianshi) {
					vm.xingyongka();
				} else {
					vm.chuxuka();
				}
			}
		},
		components: {
			myHeader,
		}
	}
</script>
<style scoped>
    .mui-table-view{
		background: none;
	}
	.home2,
	.mui-content {
		margin-top: .88rem;
	}

	.myyingyong {
		display: inline-block;
		width: 2rem;
		height: .98rem;
		line-height: .98rem;
		font-size: .3rem;
		color: #646464;
	}

	.mui-table-view-cell {
		border-top: .3rem solid #EFEFF4 !important;
	}

	.home2-indes {
		color: #646464;
	}

	

	.zise {
		color: #fff;
	}

	#sliderSegmentedControl {
		background: #fff;
		height: .98rem;
	}

	.cardOperations {
		float: right;
		line-height: 0.88rem;
		margin-right: 0.3rem;
		color: #b4b4b4;
	}

	.home-2-1 {
		display: inline-block;
		width: 100%;
		text-align: left;
		padding-left: 0.3rem;
		font-size: 0.28rem;
		height: .88rem;
		line-height: .88rem;
		border-bottom: 1px solid #EFEFF4;
		color: #332323;
		background: #fff;
	}

	.home-2-2 {
		height: 1.64rem;
		border-bottom: 1px solid #EFEFF4;
		display: -webkit-box;
		-webkit-box-pack: justify;
		padding: .4rem .3rem;
		background: #FAFAFA;
	}

	.mui-table-view-cell {
		padding: 0;
	}

	.home-2-2 div {
		height: 1.64rem;
	}

	.home-2-2 div span {
		display: block;
		text-align: center;
	}

	.home-2-2 div span:nth-of-type(1) {
		font-size: .32rem;
		color: #323232;
	}

	.home-2-2 div span:nth-of-type(2) {
		font-size: 0.22rem;
		color: #B4B4B4;
	}

	.mobile {
		padding: 0 .3rem;
		overflow: auto;
	}

	#ysjdsdsttt {
		overflow: auto;
	}

	.backs {
		height: 2rem;
		line-height: 2rem;
		margin-top: .3rem;
		border-radius: 8px;
		text-align: left;
		padding: 0 .3rem;
		color: #fff;
	}

	.muicontro {
		width: 50%;
		float: left;
		height: .98rem;
	}
</style>
