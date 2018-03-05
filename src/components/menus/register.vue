<template>
	<div class="loading">
		<div class="mui-content">
			<header class="mui-bar mui-bar-nav">
                <a @click="fcard" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
                <h1 class="mui-title">注册</h1>
            </header>
            <div style="height:44px;"></div>
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='account' v-model="ruleForm.name" type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' v-model="ruleForm.password" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
                <div class="mui-input-row">
					<label>确认密码</label>
					<input id='password' v-model="ruleForm.password1" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
				<div class="mui-input-row">
					<label>验证码</label>
                    <input  type="text" v-model="ruleForm.passimg" class="mui-input-clear mui-input" maxlength="4" placeholder="请输入验证码">
					<span class="input_img" @click="myurlimg()" :style="'background:url(data:image/png;base64,'+urlimg+') no-repeat;background-size: 100% 100%;'"></span>
				</div>
			</form>
			
			<div class="mui-content-padded">
				<button  class="mui-btn mui-btn-block mui-btn-danger" @click="submitForm">确 定</button>
			</div>
			<div class="mui-content-padded oauth-area">

			</div>
		</div>
  </div>
</template>
<script>

	export default {
		data() {
			return {
				urlimg:'',
				urlimgid:'',
				switchs:false,
				ruleForm: {
					name: '',
					password:'',
					password1:'',
					passimg:''
				},
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
			 this.myurlimg()
			 if(localStorage.getItem('zidong')=='12'){
               this.$router.push('/menus')
			 }
			 
			 
			
		},
		methods: {
		    fcard(){
                 this.$router.push('/')
            },
        submitForm() {
			
            const v = this;
			if(!v.ruleForm.name){
                return mui.toast('账号不能为空',{ duration:'long', type:'div' })
			}
			if(v.ruleForm.name.length<2){
				 return mui.toast('账号长度应大于两位',{ duration:'long', type:'div' })
			}
			if(!v.ruleForm.password){
                return mui.toast('密码不能为空',{ duration:'long', type:'div' })
			}
			if(v.ruleForm.password.length<2){
				 return mui.toast('密码长度应大于两位',{ duration:'long', type:'div' })
            }
            if(v.ruleForm.password!=v.ruleForm.password1){
				 return mui.toast('两次输入密码不一致！')
			}
			if(!v.ruleForm.passimg){
				return mui.toast('验证码不能为空',{ duration:'long', type:'div' })
			}
			v.$ajax({
				data:{
					s: "App.Captcha.Verify",       // 待请求的接口服务名称
					captcha_id: v.urlimgid,
					captcha_code: v.ruleForm.passimg,        // 更多接口参数
					callback: "onCallback"  ,// 客户端的JS回调函数
					},
				done:function(r){
					if(r.ret=='200'){
						if(r.data.err_code=='0'){
							v.ajaxmy();
						}else{
							mui.toast(r.data.err_msg,{ duration:'long', type:'div' })
						}
					}else{
						mui.toast(r.msg,{ duration:'long', type:'div' })
					}
				}
			})
        },
          ajaxmy(){
            const v = this;
            var p =md5(v.ruleForm.password)
            v.$ajax({
                data:{
                    s: "App.User.Register",       // 待请求的接口服务名称
                    username: v.ruleForm.name,
                    password: p,        // 更多接口参数
                    callback: "onCallback"  ,// 客户端的JS回调函数
                    },
                done:function(r){
                    if(r.ret=='200'){
                        if(r.data.err_code=='0'){
                            var btnArray = ['确认'];
                            mui.alert('注册成功！', '提示！', btnArray, function(e) {
                                v.$router.push('/')
                            });
                        }else{
                            mui.toast(r.data.err_msg);
                        }
                    }else{
                            mui.toast(r.msg);
                    }
                }
            })
        },
        resetForm() {
            const v = this;
            this.$router.push('/register')
        },
        //获取验证，图片
         myurlimg(){
            const v = this;
            v.$ajax({
                data:{
                    s: "App.Captcha.Create",       // 待请求的接口服务名称
                    return_format: 'data',
                    callback: "onCallback"  ,// 客户端的JS回调函数
                    },
                done:function(r){
                    if(r.ret=='200'){
                            if(r.data.err_code=='0'){
                                v.urlimgid=r.data.captcha_id	//字符串	验证码唯一ID，用于校验时核对（return_format=data时返回此字段）
                                v.urlimg= r.data.captcha_img
                        }else{
							mui.toast(r.data.err_msg,{ duration:'long', type:'div' }) 
                            
                        }
                    }else{
						mui.toast(r.msg,{ duration:'long', type:'div' })
                    }
                }
            })
        }
		}
	};
</script>
<style scoped>
	.input_img{
		position: absolute;
		top: 0;
		right: 30px;
		height: 39px;
		width: 100px;
	}
</style>