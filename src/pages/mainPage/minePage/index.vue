<template>
	<div id="mine" class="mine">
		<!--<router-link class="header" tag="div" :to="actionList.zl">
			<div class="personal_data">
				<div class="phone_no" v-if="userId">{{userPhone}}</div>
				<div class="phone_no" v-else>登录/注册</div>
				<div class="note">查看并编辑个人资料</div>
			</div>
			<div class="personal_icon">
				<img :src="userIcon" alt="" v-if="userId">
				<img src="static/assets/icon_sign in@2x.png" alt="" v-else>
			</div>
			</router-link>-->

		<div class="header" tag="div" :to="actionList.zl">
			<div class="personal_data">
				<div class="phone_no" v-if="userId" @click="touser">{{userPhone}}</div>
				<div class="phone_no" v-else style='display: flex;align-items: center;'><span @click="login">登录</span><span style="font-weight: normal;font-size: .18rem;padding: 0 .04rem;">|</span><span @click="login">注册</span></div>
				<div class="note">查看并编辑个人资料</div>
			</div>
			<div class="personal_icon">
				<img class="imgs" v-lazy="userIcon" alt="" v-if="userIcon" @click="touser">
				<img class="imgs" src="static/assets/icon_sign in@2x.png" alt="" v-else>
			</div>
		</div>
		<router-link tag="div" class="list" :to="userId?actionList.yy:actionList.dl">
			<!--<img src="../../../../static/assets/icon_order@3x.png" alt="" class="icon_left">-->
			<span class="icon_left iconfont">&#xe641;</span>
			<span class="name">我的预约</span>
			<span class="icon_right iconfont">&#xe638;</span>
			<!--<img src="../../../../static/assets/icon_right@2x.png" alt="" class="icon_right">-->
		</router-link>
		<router-link tag="div" class="list" :to="userId?actionList.gz:actionList.dl">
			<!--<img src="../../../../static/assets/icon_heart@3x.png" alt="" class="icon_left">-->
			<span class="icon_left iconfont">&#xe63d;</span>
			<span class="name">我的关注</span>
			<span class="icon_right iconfont">&#xe638;</span>
			<!--<img src="../../../../static/assets/icon_right@2x.png" alt="" class="icon_right">-->
		</router-link>
		<router-link tag="div" class="list" :to="userId?actionList.jl:actionList.dl">
			<!--<img src="../../../../static/assets/icon_time@3x.png" alt="" class="icon_left">-->
			<span class="icon_left iconfont">&#xe63a;</span>
			<span class="name">浏览记录</span>
			<span class="icon_right iconfont">&#xe638;</span>
			<!--<img src="../../../../static/assets/icon_right@2x.png" alt="" class="icon_right">-->
		</router-link>
		<router-link tag="div" class="list list_last" :to="userId?actionList.fk:actionList.dl">
			<!--			<img src="../../../../static/assets/icon_support@3x.png" alt="" class="icon_left">-->
			<span class="icon_left iconfont">&#xe643;</span>
			<span class="name">意见反馈</span>
			<span class="icon_right iconfont">&#xe638;</span>
			<!--<img src="../../../../static/assets/icon_right@2x.png" alt="" class="icon_right">-->
		</router-link>
		<div class="sign">
			绿城中国服务热线：<span class="tel">95059</span>
		</div>
		<bottomNav></bottomNav>
		<div v-if="userId" class="exit" @click="exit">退出登录</div>
	</div>
</template>

<script>
	import Nav from "@/components/nav";
	import { MessageBox } from 'mint-ui';
	export default {
		name: "mine",
		data() {
			return {
				userPhone: "",
				userIcon: "",
				actionList: {
					zl: "/mine/personalData",
					yy: "/mine/myAppointment",
					gz: "/mine/myAttention",
					jl: "/mine/myHistory",
					fk: "/mine/feedback",
					dl: "/login"
				},
				userId: sessionStorage.getItem("userId") ?
					sessionStorage.getItem("userId") :
					null //需要从vuex或session中取值
			};
		},
		components: {
			bottomNav: Nav
		},
		created() {
			this.laodData();
		},
		methods: {
			login() {
				this.$router.push("/login");
			},
			register() {
				this.$router.push("/register");
			},
			touser() {
				this.$router.push("/mine/personalData");
			},
			//退出管理
			exit() {
//				let url = '/app/3.0/UserIndex/logout';
//				let data = {}
//				this.Axios.post(url, data).then(res => {
//					if(res.code == 0) {
//						
//					}
//				}).catch(e => {
//					console.log(e)
//				})
				
				
				let that = this;
				MessageBox.confirm('确定要退出当前账号？').then(action => {
					let url = '/app/3.0/UserIndex/logout';
					let data = {}
					that.Axios.post(url, data).then(res => {
						if(res.code == 0) {
							localStorage.removeItem("token");
							sessionStorage.removeItem("userId");
							sessionStorage.removeItem("userPhone");
							that.$router.push("/login");							
						}
					}).catch(e => {
						console.log(e)
					})					
				}).catch(action => {

				});

			},
			//获取登录之后的用户信息
			laodData() {
				if(!this.userId) {
					return;
				}
				var that = this;
				that.Axios.post("/app/3.0/personUser/Personlist", {
						id: that.userId
					})
					.then(function(data) {
//						that.userPhone = data.data.celiPhone;
						that.userPhone = data.data.celiPhone.substr(0,3)+"****"+data.data.celiPhone.substr(7)
						that.userIcon = data.data.photo;
					})
					.catch(function(e) {
						console.log(e);
					});
			}
		}
	};
</script>

<style scoped lang="scss">
	@font-face {
		font-family:myFirstFont;
		src: url('../../../assets/style/Bold.ttf');
	}
	.mine {
		width: 100%;
		font-size: 0.14rem;
		* {
			box-sizing: border-box;
		}
		.header {
			width: 100%;
			padding: 0.5rem 0.21rem 0.24rem 0.21rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: nowrap;
			.personal_data {
				.phone_no {
					font-size: 0.24rem;
					color: #333333;
					line-height: 0.34rem;
					span {
						font-size: 0.24rem;
					}
				}
				.note {
					font-size: 0.12rem;
					color: #989ca8;
					line-height: 0.15rem;
				}
			}
			.personal_icon {
				width: 0.7rem;
				height: 0.7rem;
				border-radius: 0.35rem;
				overflow: hidden;
				.imgs {
					width: 100%;
					height: 100%;
					
				}
			}
		}
		.list {
			padding: 0.2rem 0.22rem;
			vertical-align: middle;
			.icon_left {
				width: 0.22rem;
				vertical-align: -0.05rem;
				margin-right: 0.18rem;
				font-size: 0.22rem;
				color: #25b07e;
			}
			.name {
				color: #373c43;
			}
			.icon_right {
				float: right;
				width: 0.18rem;
				margin-top: 0.01rem;
				font-size: 0.18rem;
			}
		}
		.list_last {
			border-bottom: 0.01rem solid #eaebed;
		}
		.sign {
			margin-top: 0.165rem;
			text-align: center;
			font-size: 0.12rem;
			color: #c6cad3;
			.tel {
				font-size: 0.18rem;
				font-family: myFirstFont;
			}
		}
	}

	.exit {
		position: absolute;
		left: 0;
		bottom: 0.51rem;
		width: 100%;
		height: 0.61rem;
		text-align: center;
		line-height: 0.61rem;
		color: #989ca8;
		font-size: 0.14rem;
		border-top: 0.01rem solid #eaebed;
	}
	

</style>
