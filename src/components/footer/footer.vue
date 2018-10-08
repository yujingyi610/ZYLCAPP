<template>
	<div>
		<div class="footer text-center">
			<!-- <div class="footer-bg" style="flex:0 0 25%;font-size:0.13rem;">
				<a :href="'tel:'+item.contactphone" @click="doCall($event, item.contactphone)">
					<img src="../../assets/icon-phone.png" width="20" height="20">
					<span class="consult">热线电话</span>
				</a>
			</div>
			<div class="footer-bg" style="flex: 0 0 25%;"  @click="goPage('consulting')">
			  <img src="../../assets/icon-consult.png" width="20" height="20">
			  <span class="consult">我要咨询</span>
		    </div>
			<div style="flex:2;" @click="goPage('order/orderhouse')">立即预约</div> -->
			<div style="flex: 2">
				<span class="bottom-left" @click="collect"><i class="iconfont focus" :class="isCollect==true?'iconfont icon-lvcheng_shoucang-yishoucang':'iconfont icon-lvcheng_shoucang-changgui'"></i>{{isCollect==true?'已关注':'关注'}}</span>
			</div>
			<div style="flex: 3;">
				<span class="bottom-btn" @click="goOrder">预约看房</span>
			</div>
			<div style="flex: 3;">
				<span class="bottom-btn"><a :href="tel">咨询售楼处</a></span>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		computed: {
			tel() {
				return 'tel:' + sessionStorage.getItem('contactPhone')
			}
		},
		props: ['isCollect',"estateId"],
		data() {
			return {
				looks: 0,
				lookt: true,
			}
		},
		methods: {
			goOrder() {
				this.$router.push('orderPage')
			},
			collect() { //收藏按钮
				let token = localStorage.getItem('token')
				
				let data = {
					//token: token,
					estateId: this.estateId,
					lookFlag: this.isCollect == true ? 1 : 0
				}

				this.Axios.post('/app/3.0/Interest/EstateInterest', data).then((res) => {
					if(res.code == 3){
						Toast({
							message: '已取消关注',
							iconClass: 'icon icon-success',
							duration: 1500
						});
						this.isCollect = false;
					}else if(res.code == 2){
						Toast({
							message: '关注成功',
							iconClass: 'icon icon-success',
							duration: 1500
						});
						this.isCollect = true;
					}else if(res.code == 99){
						this.$router.push({
							path:'/login'
						})
					}
				})
			},
		}
	}
</script>

<style>
	@import "./footer.css";
	a {
		text-decoration: none;
		color: #fff;
	}
	
	.bottom-left {
		vertical-align: top;
	}
	
	.focus {
		font-size: 0.26rem;
		margin-right: 4px;
		color: #c6cad3;
	}
</style>