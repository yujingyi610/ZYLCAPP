<template>
	<div id="feedback" class="feedback">
		<mt-header title="意见反馈">
			<mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
		</mt-header>
		<div class="textarea-wrap">
			<textarea placeholder="亲爱的用户，我们非常重视您给我们提出宝贵的建议，帮助我们不断完善产品，谢谢！" v-model="text" @keyup="WidthChecks(text)" />
			<span class="font-length">{{fontLength}}/60</span>
		</div>
		<!--<div v-if="show" class="xianzhi">请输入6-50个字节</div>-->
		<div class="btn-wrap">
			<div class="btn" @click="handleSubmit">
				提交
			</div>
		</div>
	</div>
</template>

<script>
	import { Header, Button } from "mint-ui";
	import { Toast } from 'mint-ui';
	export default {
		name: 'feedback',
		data() {
			return {
				text: '',
				show: false,
				fontLengths:60
			}
		},
		computed: {
			fontLength() {
				return this.text.length

			}
		},
		components: {
			"mt-header": Header,
			"mt-button": Button
		},
		created() {

		},
		mounted() {

		},
		filters: {

		},
		methods: {
			WidthCheck(str) {
				var w = 0;
				var tempCount = 0;
				//length 获取字数数，不区分汉子和英文
				for(var i = 0; i < str.length; i++) {
					//charCodeAt()获取字符串中某一个字符的编码
					var c = str.charCodeAt(i);
					//单字节加1
					if((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
						w++;
					} else {
						w += 2;
					}

				}

				if(w > 100 || w < 6) {
					this.show = true
				} else {
					this.show = false
				}

				this.fontLength = 100 - w
			},
			WidthChecks (text) {
				if(text.length < 6) {
					this.show = true
					this.Flagnum = 1
				}else if(text.length > 60){
					Toast({
						message: '超出最大字数限制',
						iconClass: 'iconfont icon-lvcheng_shanchusousuotiaojian',
						duration: 1500
					});
					this.text = text.substring(0,60);
				} else {
					this.show = false
					this.Flagnum = 2
				}
			},
			goBack() {
				this.$router.go(-1);
			},
			handleSubmit() {
				if(this.Flagnum == 2) {

					this.Axios.post('/app/3.0/personUser/PersonbackInsert', {
						customId: "1",
						cusBack: this.text
					}).then((res) => {
						if(res.code === 0) {
							Toast({
								message: '提交成功！',
								iconClass: 'icon icon-success'
							});
							this.$router.push('/mainPage/mine')
						}
					})

				}else {
					//this.show = true
					console.log(2)
					Toast({
						message: '请输入6-60个字符',
						iconClass: 'iconfont icon-lvcheng_shanchusousuotiaojian',
						duration: 1500
					})
				}
			}
		}
	}
</script>

<style scoped>
	.mint-header {
		border-bottom: 1px solid #EAEBED;
		color: #000;
		background-color: #fff;
	}

	h1 {
		margin: .67em 0;
	}

	label {
		font-weight: 100;
		font-size: .12rem;
	}

	.mintui {
		font-size: .14rem;
	}

	.textarea-wrap {
		width: 100%;
		padding: .2rem;
		box-sizing: border-box;
		position: relative;
		border-bottom: 1px solid #EAEBED;
	}

	textarea {
		width: 100%;
		min-height: 2rem;
		border: none;
		padding: 0;
		outline: none;
		resize: none;
	}

	.font-length {
		position: absolute;
		right: .2rem;
		bottom: .2rem;
		color: #C6CAD3;
		font-size: .14rem;
		line-height: .16rem;
	}

	.btn-wrap {
		width: 100%;
		padding: .2rem;
		box-sizing: border-box;
	}

	.btn-wrap .btn {
		background: #25B07E;
		border-radius: 0.08rem;
		width: 100%;
		line-height: .45rem;
		text-align: center;
		font-size: .17rem;
		color: #fff;
	}
	.xianzhi {
		padding: .1rem;
		color: red;
	}
</style>
