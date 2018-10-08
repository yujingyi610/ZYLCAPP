<template>
	<div id="myAppointment" class="myAppointment">
		<mt-header title="我的预约">
			<mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        </mt-header>
        <div class="myattens" ref="wrapper">
        	<div>
				<div class="el_list" v-for="(list,i) in lists" :key="i">
					<div class="el_top">
						<img v-lazy="list.photo" alt="" class="icon">
						<div class="el_left">
							<div class="name">{{list.finalPropertyConsultName}}</div>
							<p class="identify">{{list.propertyConsultDesc}}</p>
						</div>
						<a class="el_btn" :href='"tel:"+list.finalPropertyConsultPhone'>联系置业顾问</a>
					</div>
					<div class="el_bot" @click="handleDetail(list.estateId)">
						<img v-lazy="list.uriwechat" alt="" class="thumb">
						<div class="des">
							<p class="title">{{list.estateName}}</p>
							<p class="address">{{list.projectaddress}}</p>
							<p class="price">均价
								<span>{{list.unitpriceshow}}</span> 元/m²</p>
						</div>
					</div>
				</div>
			</div>
		</div>		
				
		<div class="noData" v-if="showFlag">
			<img src="../../../../../static/assets/img_mistake_3@2x.png" alt="" class="noDataImg">
			<div class="msg">暂无预约，快去预约吧~</div>
			<div class="btn" @click="handledetail">去预约</div>
		</div>
	</div>
</template>

<script>
import { Header, Button } from "mint-ui";
import BScroll from 'better-scroll'
	export default {
		name: 'myAppointment',
		data() {
			return {
				showFlag:false,
				tel: "15866167211",
				lists: [],
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
			handleDetail (estateId) {
//				this.$router.push('/mainPage/buildDetail/'+ estateId)
				this.$router.push({
					path: '/mainPage/buildDetail',
					query: {
						'estateId': estateId,
					},
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
			loadData() {
				var that = this;
				let data = {
					"mobilePhone":sessionStorage.getItem('userPhone'),
					
				}
				that.Axios.post('/app/3.0/personUser/Personprolist', data).then(function (data) {
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
	.myAppointment {
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
			top: .39rem;
			bottom: 0;
			width: 100%;
			overflow: hidden;
		}
		.el_list {
			padding-top: .26rem;
			padding-bottom: .22rem;
			border-top: .01rem solid #EAEBED;
			.el_top {
				padding: 0 .18rem .1rem .18rem;
				display: flex;
				justify-content: flex-start;
				flex-wrap: nowrap;
				align-items: center;

				.icon {
					width: .36rem;
					height: .36rem;
					border-radius: .2rem;
					overflow: hidden;
				}
				.el_left {
					flex-grow: 1;
					margin-left: .12rem;
					.name {
						font-size: .14rem;
						color: #373C43;
						letter-spacing: 0;
						line-height: .21rem;
					}
					.identify {
						font-size: .12rem;
						color: #C8AB57;
						line-height: .16rem;
					}
				}
				.el_btn {
					display: block;
					text-decoration: none;
					font-size: .12rem;
					line-height: normal;
					color: #FFFFFF;
					padding: .06rem .105rem .07rem .105rem;
					background: #25B07E;
					border-radius: .04rem;
				}
			}
			.el_bot {
				background: rgba(244, 244, 245, 0.50);
				padding: .1rem .18rem;
				position: relative;
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
					}
					.price {
						font-size: .12rem;
						color: #333333;
						line-height: .16rem;
						margin-top: .15rem;
						>span {
							font-size: .18rem;
							color: #333333;
							line-height: .22rem;
						}
					}
				}
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
	
	.el_list:first-child {
		border-top: none;
	}
</style>
