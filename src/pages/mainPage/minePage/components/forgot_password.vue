<template>
	<div id="home">
		<headers :title="title" v-on:goBackEvent="closePopup"></headers>

		<div class="content" ref="wrappers">
			<div class="content_small">
				<div class="login">
					<p>手机号</p>
					<input type="tel" v-bind:disabled="disabled" class="input tels" placeholder="请输入您的手机号" v-model="phonename" @change="handlephoneFlag()"  style="width:100%"/>
					<span class="span" v-if="telFlag === 1">手机号不可为空</span>
					<span class="span" v-if="telFlag === 2">请输入有效的手机号</span>
					<span class="span icon_span iconfont" v-if="telFlag === 3">&#xe668;</span>
				</div>
				<div class="login">
					<p>验证码</p>
					<input class="input" type="tel" placeholder="请输入短信验证码" @change="handlecodeFlag()" v-model="codes"  style="width:100%"/>
					<span class="span" v-if="codeFlag === 1">验证码不可为空</span>
					<span class="span" v-if="codeFlag === 2">请输入有效验证码</span>
					<span class="span icon_span iconfont" v-if="codeFlag === 3">&#xe668;</span>
					<span v-if="smsCodeFlag" class="code getSmsCode" @click="getSmsCode()">获取验证码</span>
					<span v-if="!smsCodeFlag" class="code getSmsCode grayColor">{{timeNum}}秒后重试</span>
				</div>
				<div class="login">
					<p>{{passrevise}}</p>
					<input class="input" placeholder="请输入密码" v-model="passwords" @change="handlepassFlag()" :type="active_tpye ? 'password' : 'text' " />
					<span class="eyeshow iconfont" @click="showpassword">&#xe647;</span>
					<span class="span" v-if="passwordsFlag === 1">密码不可为空</span>
					<span class="span" v-if="passwordsFlag === 2">密码必须为6-20位字母和数字组合</span>
					<span class="span icon_span iconfont" v-if="passwordsFlag === 3">&#xe668;</span>
				</div>
			</div>
			<div class="logining" @click="submitForm">提交</div>
		</div>
	</div>
</template>

<script>
	import Headers from '@/components/header';
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				title: sessionStorage.getItem("revise") ? sessionStorage.getItem("revise"):'忘记密码',
				phonename: sessionStorage.getItem("revise") ? sessionStorage.getItem("userPhone"):'',
				codes: '',
				passwords: '',
				telFlag: 0,
				codeFlag: 0,
				passwordsFlag: 0,
				smsCodeFlag: true,
				timeNum: 60,
				active_tpye: true,
				disabled:sessionStorage.getItem("revise") ? true :false,
				passrevise:sessionStorage.getItem("revise") ? "新密码":"密码"
			}
		},
		methods: {
			closePopup() {
				window.history.back();
				sessionStorage.removeItem("revise")
//				this.$router.push('/passwordlogin')
			},
			passwordlogin() {
				this.$router.push('/passwordlogin')
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
			//验证码
			handlecodeFlag() {
				let regs = /^[0-9]{6}$/
				if(this.codes === '') {
					//非空
					this.codeFlag = 1;
				} else if(!regs.test(this.codes)) {
					//非正常手机号
					this.codeFlag = 2;
				} else {
					//正确
					this.codeFlag = 3;
				}
			},
			//密码
			handlepassFlag() {
				let regs = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
				if(this.passwords === '') {
					//非空
					this.passwordsFlag = 1;
				} else if(!regs.test(this.passwords)) {
					//非正常手机号
					this.passwordsFlag = 2;
				} else {
					//正确
					this.passwordsFlag = 3;
				}
			},
			clock() {
				let timeIndex = setInterval(() => {
					this.timeNum -= 1;
					if(this.timeNum == 0) {
						this.smsCodeFlag = true;
						clearInterval(timeIndex);
						this.timeNum = 60;
					}
				}, 1000)
			},
			//验证手机号，发送验证码
			getSmsCode() {
				//手机号
				let reg = /^1[3456789]\d{9}$/;
				//手机验证
				if(this.phonename === '') {
					//非空
					this.telFlag = 1;
				} else if(!reg.test(this.phonename)) {
					//非正常手机号
					this.telFlag = 2;
				} else {
					//正确
					this.telFlag = 3;
					this.smsCodeFlag = false;
					this.clock();
					let url = "/app/3.0/customer/getCapcha";
					let data = {
						"mobile": this.phonename,
						"type": 2
					}
					this.Axios.post(url, data).then(res => {
						if(res.code == 0) {
//							this.smsCodeFlag = false;
//							this.clock();
						}
					}).catch(e => {
						console.log(e)
					})
				}
			},
			getarticlesInfo() {
				let url = '/app/3.0/customer/updatePassword';
				let data = {
					"mobile": this.phonename,
					"password": this.passwords,
					"captcha": this.codes,
					"unionId": 11
				}

				this.Axios.post(url, data).then(res => {
					if(res.code == 0) {
						this.$router.push('/login')
						
					}
					if(res.code == 100) {
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
				if(this.codeFlag == 3 && this.telFlag == 3 && this.passwordsFlag == 3) {
					this.getarticlesInfo()
				} else {
					this.handlephoneFlag()
					this.handlecodeFlag()
					this.handlepassFlag()
				}
			}
		},
		created() {

		},
		mounted() {

		},
		components: {
			'headers': Headers
		}
	}
</script>

<style scoped>
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
	
	.login .code {
		float: right;
		color: #25B07E;
		padding-top: .16rem;
	}
	
	.login .eyeshow {
		float: right;
		color: #989CA8;
		font-size: .2rem;
		padding-top: .13rem;
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
	
	.tels {
		background: #ffffff;
	}
</style>