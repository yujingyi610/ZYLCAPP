<template>
	<div id="myAttention" class="myAttention">
		<mt-header title="我的关注">
			<mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        </mt-header>
        <div class="myattens" ref="wrapper">
        	<div>
				<div class="el_list" v-for="(list,i) in lists" :key="i">
					<div class="el_bot" @click="handleDetail(list.estateId)">
						<img v-lazy="list.uriwechat" alt="" class="thumb">
						<div class="des">
							<p class="title">{{list.estateName}} <i class="iconfont focus iconfont icon-lvcheng_shoucang-yishoucang" @click="collect(list.estateId)"></i></p>
							<!--<i class="iconfont focus" :class="isCollect==true?'iconfont icon-lvcheng_shoucang-yishoucang':'iconfont icon-lvcheng_shoucang-changgui'"></i>-->
							<p class="price">均价
								<span>{{list.unitpriceshow}}</span> 元/m²
							</p>
							<p class="bings"><span v-for="(item) of list.lableName" :key="item">{{item?item:''}}</span></p>
						</div>
						<!-- 暂无图片和关注取消接口 -->
						<!--<img src="../../../../../static/assets/icon_heart@2x.png" alt="" class="gzImg">-->
					</div>
					<a :href='"tel:"+list.contactphone' class="el_btn">资讯售楼处</a>
				</div>
			</div>
		</div>
		<div class="noData" v-if="showFlag">
			
			<img src="../../../../../static/assets/img_mistake_1@2x.png" alt="" class="noDataImg">
			<!-- 暂无UI图 -->
			<div class="msg">暂无关注楼盘，快去关注吧～</div>
			<div class="btn" @click="handledetail">去关注</div>
		</div>
	</div>
</template>

<script>
import { Header, Button } from "mint-ui";
import BScroll from 'better-scroll'
import { Toast } from 'mint-ui';
	export default {
		name: 'myAttention',
		data() {
			return {
				tel:null,
				lists: [],
				showFlag:false
			}
		},
		components: {
			"mt-header": Header,
    		"mt-button": Button
		},
		created() {
			this.loadData();
		},
		mounted() {
			setTimeout(() => {
	      		this.$nextTick(()=>{
					this._initScroll();
				})
            },20)
		},
		filters: {

		},
		methods: {
			handledetail () {
				this.$router.push('/mainPage/building')
			},
			goBack() {
				this.$router.go(-1);
			},
			collect(estateId,e) { //收藏按钮
				
				var ev = e||event;
				ev.stopPropagation();
								
				let data = {
					//token: token,
					estateId: estateId,
					lookFlag: 1
				}
				let url = '/app/3.0/Interest/EstateInterest'
				this.Axios.post(url, data).then((res) => {
					if(res.code == 3){
						Toast({
							message: '已取消关注',
							iconClass: 'icon icon-success',
							duration: 1500
						});
						this.loadData();
						if(this.lists.length=0) {
							this.showFlag = true
						}
					}else if(res.code == 2){
						Toast({
							message: '关注成功',
							iconClass: 'icon icon-success',
							duration: 1500
						});
						
					}else if(res.code == 99){
						this.$router.push({
							path:'/login'
						})
					}
				})
			},
			_initScroll () {
				if (!this.scroll) {
				    this.scroll = new BScroll(this.$refs.wrapper, {
				        click: true,
				        scrollY: true,
				        probeType: 3
				    });
				}else{
				    this.scroll.refresh();
				}
			},	
			handleDetail (estateId) {
//				this.$router.push('/mainPage/buildDetail/'+ estateId)
				this.$router.push({
					path: '/mainPage/buildDetail',
					query: {
						'estateId': estateId,
					},
				})
			},
			loadData() {
				var that = this;
				let userPhone = sessionStorage.getItem('userPhone');
				let data = {
					"mobilePhone":sessionStorage.getItem('userPhone'),
				}
				that.Axios.post('/app/3.0/personUser/PersonIntlist',data).then(function (data) {
					
					if(data.data.length>0) {
						that.lists = data.data;
						that.showFlag = false
					}else {
						that.showFlag = true
					}
				}).catch(function (err) {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.myAttention {
		* {
			box-sizing: border-box;
		}
		.mint-header{
			border-bottom: 1px solid #EAEBED;
			color: #000;
			background-color: #fff;
		}
		h1 {
			margin: .67em 0;
		}
		label{
			font-weight: 100;
			font-size: .12rem;
		}
		.mintui{
			font-size: .14rem;
		}
		.myattens {
			position: absolute;
			top: .4rem;
			bottom: 0;
			width: 100%;
			overflow: hidden;
		}
		.el_list {
			padding-top: .26rem;
			padding-bottom: .22rem;
			border-top: .01rem solid #EAEBED;
			.el_bot {
				padding: .1rem .18rem;
				position:relative;
				.thumb {
					width: .74rem;
					height: .74rem;
					border-radius: .04rem;
					vertical-align: top;
					margin-right: .2rem;
				}
				.des {
					display: inline-block;
					width: 60%;
					.title {
						font-size: .15rem;
						color: #333333;
						line-height: .16rem;
						width: 100%;
						overflow:hidden;
					    text-overflow:ellipsis;
					    white-space:nowrap;
					}
					.address {
						font-size: .12rem;
						color: #989CA8;
						line-height: .16rem;
						width: 100%;
						overflow:hidden;
					    text-overflow:ellipsis;
					    white-space:nowrap;
					}
					.price {
						font-size: .12rem;
						color: #333333;
						line-height: .16rem;
						margin-top: .1rem;
						>span {
							font-size: .18rem;
							color: #333333;
							line-height: .22rem;
						}
					}
					.bings {
						width: 100%;
						padding-top: .15rem;
						overflow:hidden;
					    text-overflow:ellipsis;
					    white-space:nowrap;
					    font-size: .12rem;
					}
				}
				.gzImg{
					width: .18rem;
					position: absolute;
					right: .18rem;
					top: 0;
				}
			}
			.el_btn {
				font-size: .14rem;
				color: #6BA686;
				background: rgba(107, 166, 134, 0.10);
				border-radius: .04rem;
				margin: .32rem .18rem 0 .18rem;
				padding: .14rem;
				text-align: center;
				display: block;
				text-decoration: none;
			}
		}
		.noData {
			text-align: center;
			padding-top: 1rem;
			position: absolute;
			width: 100%;
			z-index: 999;
			.noDataImg {
				width: 40%;
			}
		}
		.msg {
			font-size: .14rem;
			color: #989CA8;
			letter-spacing: 0;
		}
		.btn {
			display: inline-block;
			padding: .12rem .3rem;
			border: .01rem solid #25B07E;
			border-radius: .25rem;
			font-size: .15rem;
			line-height: .15rem;
			color: #25B07E;
			margin-top: .5rem;
		}
	}
	
	.focus {
		font-size: 0.26rem;
		margin-right: 4px;
		color: #25B07E;
		position: absolute;
		right: .1rem;
		z-index: 25;
	}
	.el_list:first-child {
		border-top: none;
	}
</style>
