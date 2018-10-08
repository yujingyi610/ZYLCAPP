<template>
	<div class="zixun_box">
		<img src="../../../static/images/home/kuaixun.png" class="zixun_bg">
		<div class='zixun'>
			<div class="main-pic-wrap text_list">
				<div class="swiper-container left" style="background:#f4f4f5">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(item, index) in mydata" :key="index" @click="handleRouter(item.id)">
							{{item.title}}
						</div>
					</div>
				</div>
				<span class="zixun_more" @click="more">更多</span>
			</div>

		</div>
	</div>
</template>
<script>
	//import { Swipe, SwipeItem } from 'mint-ui';
	import Swiper from 'swiper';
	export default {
		name: 'zixun',
		props: ['name', 'link'],
		data() {
			return {
				mydata: [],
				moreType: null,
				swiper: null
			}
		},
		created() {
			this.getList();
		},
		methods: {
			
			getList() {
				let self = this;
				let params = {
					pageLimit: 4
				}
				this.Axios.post('/app/3.0/content/news/list', params).then((res) => { //获取首页资讯
					if(res.code == 0) {
						this.mydata = res.data.data;
						
					}
				}).then(() => {
					this.swiper = new Swiper('.swiper-container', {
						autoplay: true,
						loop : true,
						direction: 'vertical',
					})

				})
			},
			handleRouter (id) {
				this.$router.push('/articleList/articleinfo')
				sessionStorage.setItem("articleid",id)
			},
			more() {
				this.$router.push({
					path: '/articleList',
					query: this.moreType,
					articleType: 1
				})
				sessionStorage.setItem("articleType", 1)
			}
		},
		mounted() {
			
		}
	}
</script>
<style scoped>
	/*@import './zixun.css';*/
	
	.zixun_box {
		margin-left: 0.14rem;
		height: 0.25rem;
		margin-top: 0.25rem;
		width: 100%;
	}
	
	.zixun_box .zixun_bg {
		width: 20%;
		width: 0.57rem;
		height: 0.25rem;
		margin-right: 0.1rem;
		float: left;
	}
	.zixun {
		float: left;
		height: 0.25rem;
		width: 80%;
	}
	.text_list {
		height: 0.25rem;
		width: 90%;
		text-align: left;
		border-radius: .04rem;
		border: .01rem solid #F4F4F5;
		position: relative;
	}
	.swiper-container{
		height:0.25rem;
	}
	.swiper-slide {
		text-align: left;
		height: 0.25rem!important;
		line-height:0.25rem;
		padding-left:0.1rem;
		width:80%;
		overflow: hidden;
      	text-overflow:ellipsis;
      	white-space: nowrap;
	}
	
	.zixun_more {
		position: absolute;
		top: .06rem;
		right: .08rem;
		border-left: 1px solid #989CA8;
		padding-left: .1rem;
		font-size: 0.12rem;
		z-index: 5;
		font-family: PingFangSC-Regular;
	}
</style>