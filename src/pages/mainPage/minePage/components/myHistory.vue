<template>
	<div id="myHistory" class="myHistory">
		<mt-header title="浏览记录">
			<mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        </mt-header>
        <div class="myattens" ref="wrapper">
        	<div>
				<div class="el_list" v-for="(list,i) in lists" :key="i">
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
			<img src="../../../../../static/assets/img_mistake_1@2x.png" alt="" class="noDataImg">
			<!-- 暂无UI图 -->
			<div class="msg">暂无浏览记录，快去看看吧～</div>
			<div class="btn" @click="handledetail">去看看</div>
		</div>
	</div>
</template>

<script>
import { Header, Button } from "mint-ui";
import BScroll from 'better-scroll'
	export default {
		name:'myHistory',
		data() {
			return {
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
			goBack() {
				this.$router.go(-1);
			},
			handledetail (e) {
				console.log(1)
				this.$router.push('/mainPage/building')
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
				that.Axios.post('/app/3.0/personUser/PersonEstateslist',data).then(function (data) {
					if(data.data.length>0) {
						that.lists = data.data;
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
						overflow:hidden;
					    text-overflow:ellipsis;
					    white-space:nowrap;
					}
					.address {
						font-size: .12rem;
						color: #989CA8;
						line-height: .16rem;
						margin-top: .1rem;overflow:hidden;
					    text-overflow:ellipsis;
					    white-space:nowrap;
					}
					.price {
						font-size: .12rem;
						color: #333333;
						line-height: .16rem;
						margin-top: .15rem;
						overflow:hidden;
					    text-overflow:ellipsis;
					    white-space:nowrap;
						>span {
							font-size: .18rem;
							color: #333333;
							line-height: .22rem;
						}
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
			position: absolute;
			width: 100%;
			z-index: 999;
			padding-top: 1rem;
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
		
		.el_list:first-child {
		border-top: none;
	}
</style>
