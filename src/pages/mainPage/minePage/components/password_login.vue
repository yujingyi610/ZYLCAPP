<template>
	<div id="home">
		<!--<headers :title="title" v-on:goBackEvent="closePopup"></headers>-->
		<div id="header">
			<div class="header-container">
				<header>
					<div class="back" @click="goBack">
						<span class="iconfont iconleft">&#xe630;</span>
						<span style="color:#989CA8;vertical-align:middle;">返回</span>
					</div>
					<span style="font-size:0.16rem;">{{title}}</span>
					<span class="password_login" @click="register">注册</span>
				</header>
			</div>
		</div>
		<div class="content" ref="wrappers">
			<div class="content_small">
				<div class="login">
					<p>手机号</p>
					<input class="input" type="tel" placeholder="请输入您的手机号" v-model="phonename" @change="handlephoneFlag()"  style="width:100%"/>
					<span class="span" v-if="telFlag === 1">手机号不可为空</span>
					<span class="span" v-if="telFlag === 2">请输入有效的手机号</span>
					<span class="span icon_span iconfont" v-if="telFlag === 3">&#xe668;</span>
				</div>
				<div class="login">
					<p>密码</p>
					<input class="input" :type="active_tpye ? 'password' : 'text' " placeholder="请输入密码" @change="handlecodeFlag()" v-model="passwords"  style="width:100%"/>
					<span class="span" v-if="codeFlag === 1">密码不可为空</span>
					<span class="span" v-if="codeFlag === 2">密码必须为6-20位字母和数字组合</span>
					<span class="span icon_span iconfont" v-if="codeFlag === 3">&#xe668;</span>
					<span class="eyeshow iconfont" @click="showpassword">&#xe647;</span>
				</div>
				<p class="p_title" @click="forgotpassword"><span>忘记密码</span>
				</p>
			</div>
			<div class="logining" @click="submitForm">登录</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				title: '密码登录',
				phonename: '',
				active_tpye: true,
				passwords: '',
				telFlag: 0,
				codeFlag: 0,
			}
		},
		methods: {
			goBack() {
				window.history.go(-1);
//				window.history.back();
				//this.$router.push('/login')
			},
			register() {
				this.$router.push('/register')
			},
			forgotpassword() {
				this.$router.push('/forgotpassword')
			},
			showpassword() {
				this.active_tpye = !this.active_tpye;
			},
			//验证手机号
			handlephoneFlag() {
				let reg = /^1[3456789]\d{9}$/;
				if(this.phonename === '') {
					//非空
					this.telFlag = 1;
				} else if(!reg.test(this.phonename)) {
					//非正常手机号
					this.telFlag = 2;
				} else {
					//正确
					this.telFlag = 3;
				}
			},
			//密码
			handlecodeFlag() {
				let regs = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
				if(this.passwords === '') {
					//非空
					this.codeFlag = 1;
				} else if(!regs.test(this.passwords)) {
					//非正常手机号
					this.codeFlag = 2;
				} else {
					//正确
					this.codeFlag = 3;
				}
			},
			getarticlesInfo() {
				let url = '/app/3.0/UserIndex/login';
				let data = {
					"mobile": this.phonename,
					"password": this.passwords,
					"loginType": 1,
					"userSource": 11
				}
				this.Axios.post(url, data).then(res => {
					if(res.code == 0) {
						localStorage.setItem("token",res.token)
						sessionStorage.setItem("userId",res.data.id)
						sessionStorage.setItem("userPhone",res.data.userPhone)
						this.$router.push('/mainPage')
					}
					if(res.code == 101) {
						Toast({
							message: res.msg,
							iconClass: 'icon icon-success'
						})
					}
					
				}).catch(e => {
					console.log(e)
				})
			},
			submitForm() {
				if(this.codeFlag == 3 && this.telFlag == 3) {
					this.getarticlesInfo()
				} else {
					this.handlephoneFlag()
					this.handlecodeFlag()
				}
			}
		},
		created() {
			//			this.getarticlesInfo()
		},
		mounted() {

		},
		components: {

		}
	}
</script>

<style scoped>
	header {
		font-size: 0.14rem;
		height: 0.5rem;
		line-height: 0.5rem;
		text-align: center;
	}

	header .iconleft {
		width: 0.15rem;
		vertical-align: middle;
		color: rgb(152, 156, 168);
	}

	header .password_login {
		position: absolute;
		right: 5%;
		top: 0;
		font-size: .12rem;
	}

	header .back {
		position: absolute;
		height: 0.5rem;
		left: 0;
		top: 0;
		display: inline-block;
		padding-left: 0.12rem;
		width: 0.5rem;
		float: left;
	}

	header .header-container {
		width: 100vw;
		position: fixed;
		height: 0.5rem;
		top: 0;
		z-index: 3000;
		background-color: #fff;
	}

	.content {
		position: absolute;
		top: .5rem;
		left: 0;
		bottom: 0;
		overflow: hidden;
		width: 100%;
		border-top: 1px solid #e6e6e6;
	}

	.content_small {
		box-sizing: border-box;
		padding-left: .2rem;
	}

	.login {
		height: .95rem;
		width: 100%;
		box-sizing: border-box;
		padding-top: .2rem;
		padding-right: .2rem;
		border-bottom: 1px solid #e6e6e6;
		position: relative;
	}

	.login p {
		font-size: .12rem;
	}

	.login .input {
		outline: none;
		margin-top: .1rem;
		padding: .15rem 0;
		border: none;

	}
	.login .input::-webkit-input-placeholder {
  	color:#c6cad3;
	}
	.login .input:-moz-placeholder {
	 color:#c6cad3;
	}
	.login .input:-ms-input-placeholder {
	  color:#c6cad3;
	}

	.login .eyeshow {
		float: right;
		color: #989CA8;
		font-size: .2rem;
		padding-top: .13rem;
	}

	.p_title {
		font-size: .14rem;
		padding-top: .1rem;
		line-height: .16rem;
		float: right;
		height: .5rem;
		padding-right: .2rem;
		overflow: hidden;
	}

	.p_title span {
		font-weight: 700;
	}

	.logining {
		height: .45rem;
		width: 90%;
		text-align: center;
		background: #25B07E;
		margin: 0 auto;
		line-height: .45rem;
		color: #FFFFFF;
		font-size: .16rem;
		border-radius: .04rem;
		margin-top: .25rem;
		overflow: hidden;
	}

	.login .span {
		position: absolute;
		right: 5%;
		top: .2rem;
		color: #ff0204;
		font-size: .12rem;
	}

	.login .icon_span {
		color: #25B07E;
		font-size: .16rem;
		font-weight: 600;
	}
</style>
