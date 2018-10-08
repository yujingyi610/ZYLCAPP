<template>
	<div id="building">

		<my-search :loca="located" :searchValue="searchValue" :type="searchBoxType" v-on:showCityList="showCityList" v-on:showSearchTip="showSearchTip" v-on:showShaixuanPop="showShaixuan" />
		<div class="buildingList" ref="wrapper">
			<div>
				<div class="single" v-for="(item,index) in buildingsList" :key="index" @click="toDetail(item.id)">
					<div class="buildImg">
						<img v-lazy="item.images" style="border-radius:4px;">
						<span class="news" v-if="item.news">新动态</span>
					</div>
					<div class="buildInfo">
						<h3 class="b-title"><span>{{item.estateName}}</span><span :class="item.favorite==true?'iconfont icon-lvcheng_shoucang-yishoucang':'iconfont icon-lvcheng_shoucang-changgui'" @click="collect(item)" @click.stop></span></h3>
						<p class="b-address">{{item.projectAddress}}</p>
						<p class="b-price">均价<span class="price">{{item.price}}</span>元/m²</p>
						<p><span class="b-dis" v-for="dis in item.labels">{{dis}}</span></p>

					</div>
				</div>

			</div>
		</div>
		<bottomNav v-if="isShowNav"></bottomNav>
		<mt-popup v-model="popupVisible" position="right" :closeOnClickModal="true" :modal="false">
			<my-header :title="title" v-on:goBackEvent="closePopup" />
			<cityList v-on:closePopEvent="getCityId" v-on:selectedCity="getSelectedCity" v-on:hasRefreshCity="refreshCity" />
		</mt-popup>
		<mt-popup v-model="shaixuanPopupVisible" position="right" :closeOnClickModal="true" id="shaixuanPop">
			<shaixuan v-on:showCityList="showCityList" v-on:shaixuanHandle="getShaixuanData" :newPosition="located" />
		</mt-popup>
		<mt-popup v-model="searchPopVisible" position="right" :closeOnClickModal="true">
			<search-tip v-on:closeSearchTip="closeSearchTip" v-on:searchHandle="getSearchData" v-on:showCityList="showCityList" :newLocation="located" />
		</mt-popup>
		<div class="has-no-data" v-show="isShowNoData">
			<div class="img_container">
				<!--谁没有上传这个图片我靠了-->
					<!--<img src="../../../../static/images/home/no_building.png">-->
			</div>
			<p v-if="showFlag == 2">抱歉，没有找到符合条件的楼盘～</p>
			<p v-if="showFlag == 1">暂无楼盘，去看看其他房源～</p>
			<div class="btn" v-if="showFlag == 2">
					<button type="button" @click="showShaixuan">更改筛选条件</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import Nav from '@/components/nav';
	import Search from '@/components/Search';
	import SearchTip from '@/components/searchPage';
	import Header from '@/components/header';
	import CityList from '@/components/cityList/cityList.vue';
	import Shaixuan from '@/components/shaixuan';
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				name: "楼盘",
				located: '',
				buildingsList: [], //楼盘列表
				popupVisible: false, //城市列表弹框
				shaixuanPopupVisible: false, //筛选弹框
				searchPopVisible: false,
				title: '城市选择',
				isShowNav: true,
				searchBoxType: null,
				searchValue:null,
				showFlag:1,//1为搜索或其他，2为筛选
				isShowNoData:false,//无返回数据显示提示
			}
		},
		beforeRouteEnter (to, from, next) {
    	next(vm =>{
    		localStorage.setItem("enter_time",new Date());
    		  vm.ajaxLogRequest('/addLog',{
		      logtype:'new_mobile_visit',
		      user_id:sessionStorage.getItem('userid') || null,
		      account_type:localStorage.getItem('account_type'),
		      user_agent:vm.getBrowser(),//浏览器信息
		      cookie:'',//暂无，不知道怎么获取(用户唯一身份)
		      ip_addr:  localStorage.getItem('ip'),
		      os_type:  vm.getPhoneType(),
		      present_url:  window.location.href,
		      record_time: new Date(),
		      version: '3.0.0',
		      source_type:localStorage.getItem('source_type')
    		},'POST')
	    })
	 },
	  beforeRouteLeave(to, from, next) {
	      let userAgent = this.getBrowser();
	      let os_type = this.getPhoneType();
	      let enter_time = localStorage.getItem("enter_time");
	      let leave_time = new Date();
	      let enter_url = window.location.host + to.path;
	      let leave_url = window.location.href;
	      if (leave_url.indexOf("?") > 0) {
	        leave_url = leave_url.substr(0, leave_url.indexOf("?"));
	      }
	      let version = '3.0.0';
	      this.ajaxLogRequest('/addLog', {
	        logtype: 'new_mobile_visit_time',
	        user_id: sessionStorage.getItem('userid') || null,
	        user_agent: userAgent,
	        cookie: '',
	        ip_addr: localStorage.getItem('ip'),
	        os_type: os_type,
	        enter_url: enter_url,
	        leave_url: leave_url,
	        enter_time: enter_time,
	        leave_time: leave_time,
	        version: version,
	      },'POST');
		next();
	},
		methods: {
			//这里是需要用到的三个方法
	  ajaxLogRequest(url, data, type){
			  const appId = 'onlineSale';
			  const appSecurect = 'e9178578-845f-486c-bd18-5011c7472f72';
			  const time = new Date().getTime();
			  let sign = this.$md5(appId + time + appSecurect);
			  let content = [];
			  content.push(data);
			  let jsonData = {
			      appId:appId,
			      time:time,
			      sign:sign,
			      content: content
			  }
			  if(type == 'POST'){
			   jsonData = JSON.stringify(jsonData);
			  // let _url = 'https://partner-sso.gtdreamlife.com/api/logServer' + url; //测试环境log
			  let _url = 'https://ideallife-sso.gtdreamlife.com/api/logServer' + url; //正式环境log
			  	return this.Axios.post(_url,
			  	{jsonData:jsonData},
			  	{headers: {'Content-Type': 'application/x-www-form-urlencoded"'}}
			  	).then((res)=>{//因为服务器的原因，这个功能不能使用
    			console.log(res);
    		})
			}
			},
			getBrowser(){
                var appName = navigator.appName; //浏览器的正式名称
                var appVersion = navigator.appVersion; //浏览器的版本号
                var cookieEnabled = navigator.cookieEnabled; // 返回用户浏览器是否启用了cookie
                var cpuClass = navigator.cpuClass; //返回用户计算机的cpu的型号，通常intel芯片返回"x86"（火狐没有）
                var mimeType = navigator.mimeTypes; // 浏览器支持的所有MIME类型的数组
                var platform = navigator.platform; // 浏览器正在运行的操作系统平台，包括Win16(windows3.x)
                //   Win32(windows98,Me,NT,2000,xp),Mac68K(Macintosh 680x0)
                //     和ＭacPPC(Macintosh PowerPC)
                var plugins = navigator.plugins; //  安装在浏览器上的所有插件的数组
                var userLanguage = navigator.userLanguage; // 用户在自己的操作系统上设置的语言（火狐没有）
                var userAgent = navigator.userAgent; //包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform
                var systemLanguage = navigator.systemLanguage; // 用户操作系统支持的默认语言（火狐没有）
				//判断是否IE
	            var isIe = function() {
	                var i = navigator.userAgent.toLowerCase().indexOf("msie");
	                return i >= 0;
	            }
            //判断是否firefox
	            var isFireFox = function() {
	                var i = navigator.userAgent.toLowerCase().indexOf("firefox");
	                return i >= 0;
	            }
                var info = "";
                var type = "";
                if (isIe()) {
                    type = "IE浏览器";
                } else if (isFireFox()) {
                    type = "火狐浏览器";
                }
								info = userAgent;
                /*info += "浏览器类型：" + type;
                info += "浏览器属性信息：" + userAgent  ;
                info += "浏览器的正式名称：" + appName ;
                info += "浏览器的版本号：" + appVersion ;
                info += "浏览器的是否启用了cookie：" + cookieEnabled ;
                info += "cpu等级：" + cpuClass;
                info += "浏览器的MIME类型：" + mimeType.length;
                info += "系统平台：" + platform;
                info += "安装的插件：" + plugins;
                info += "插件的数量：" + plugins.length;
                info += "用户设置的操作系统语言：" + userLanguage;
                info += "操作系统支持的默认语言：" + systemLanguage ;
                info += "javaEnabled：" + navigator.javaEnabled() ;
                info += "屏幕分辨率高度：" + window.screen.height ;
                info += "屏幕分辨率宽度：" + window.screen.width ;
                info += "颜色质量：" + window.screen.colorDepth + "位";
                info += "像素：" + window.screen.deviceXDPI + "像素/英寸";
                info += "字体是否平滑：" + window.screen.fontSmoothingEnabled ;*/
 				return info;
			},
			getPhoneType(){
				var u = navigator.userAgent;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(isAndroid){
					return 'Android';
				} else if(isiOS){
					return 'ios';
				};
			},
			_initScroll() {
				if(!this.scroll) {
					this.scroll = new BScroll(this.$refs.wrapper, {
						click: true,
						scrollY: true,
						probeType: 3
					});
				} else {
					this.scroll.refresh();
				}
				this.scroll.on('scroll', (pos) => {
					//如果下拉超过50px 就显示下拉刷新的文字
					if(pos.y > 50) {
						this.dropDown = true
					} else {
						this.dropDown = false
					}
					if(this.scrollFlag == true) {
						this.dropUpText = "正在加载数据！"
					}
					//如果上拉
					if(this.scroll.maxScrollY > pos.y + 10) {
						this.dropUp = true

					} else {
						this.dropUp = false
					}
				})
				this.scroll.on('touchEnd', (pos) => {
					// 下拉动作
					if(pos.y > 30) {
						//						this.getarticlesList()
					} else {
						this.dropDown = false
					}
					//上拉加载 总高度>下拉的高度+10 触发加载更多
					if(this.scroll.maxScrollY > pos.y + 10) {
						//		                console.log(this.scroll.maxScrollY)
						this.dropUp = false;
						if(this.scrollFlag == true) {

							this.getarticlesList()
						}
						this.scroll.refresh() //使用refresh 方法 来更新scroll  解决无法滚动的问题
					}
				})
			},
			showCityList() { //显示选择城市列表
				this.popupVisible = true;
			},
			showSearchTip() { //显示搜索面板
				this.searchPopVisible = true;
			},
			closeSearchTip() {
				this.searchPopVisible = false;
			},
			getSelectedCity(city) {
				this.located = city.cityName;
				this.popupVisible = false;
				let params = {
					cityName: this.located
				}
				this.getPageData(params);
			},
			refreshCity(city) {
				this.located = city.cityName;
				let params = {
					cityName: this.located
				}
				this.getPageData(params);
			},
			getCityId(data) { //获取选择城市信息
				console.log(data);
				this.located = data.cityName;
				let params = {
					cityName: this.located
				}
				this.getPageData(params);
				this.popupVisible = false;
			},
			closePopup() { //关闭城市列表弹框
				this.popupVisible = false;
			},
			showShaixuan() {
				this.shaixuanPopupVisible = true;
			},
			collect(item) { //收藏按钮
				let token = localStorage.getItem('token')
				let data = {
					//token: token,
					estateId: item.id,
					lookFlag: item.favorite == true ? 1 : 0
				}

				this.Axios.post('/app/3.0/Interest/EstateInterest', data).then((res) => {
					if(res.code == 3){
						Toast({
							message: '已取消关注',
							iconClass: 'icon icon-success',
							duration: 1500
						});
						item.favorite = false;
					}else if(res.code == 2){
						Toast({
							message: '关注成功',
							iconClass: 'icon icon-success',
							duration: 1500
						});
						item.favorite = true;
					}else if(res.code == 99){
						this.$router.push({
							path:'/login'
						})
					}
				})
			},

			toDetail(estateId) {
				this.$router.push({
					path: '/mainPage/buildDetail',
					query: {
						'estateId': estateId,
					},
				})
//				this.$router.push('/mainPage /buildDetail/'+ estateId)

			},
			getSearchData(data) { //获取搜索数据
				this.searchPopVisible = false;
				this.searchValue = data;
				let params = {
					cityName: this.located,
					estateName: data,
				}
				this.getPageData(params);
				this.showFlag = 1;
			},
			getShaixuanData(data) {
				this.getPageData(data);
				this.shaixuanPopupVisible = false;
				this.showFlag = 2;
			},
			scrollHandle() {
				let top = window.pageYOffset || document.getElementById('app').scrollTop || document.body.scrollTop || 0;
				let appHeight = document.getElementById('app').clientHeight;
				let docHeight = document.documentElement.clientHeight;
				if(appHeight - top < docHeight) {
					console.log('这是我的底线');
				}
			},
			judgeNull(){//判断返回数据是否为空
				if(this.buildingsList.length == 0){
					this.isShowNoData = true;
				}else{
					this.isShowNoData = false;
				}
			},
			getPageData(params) {
				if(this.$route.fullPath.indexOf('buildingList') != -1) { //非导航进入列表
					if(this.$route.query.type == 'local') { //本地楼盘列表
						this.Axios.post('/app/3.0/home/estate/list', params).then((res) => {
							if(res.code == 0) {
								this.buildingsList = res.data;
								this.judgeNull()
							}
						});
					} else if(this.$route.query.type == 'will') { //即将开盘列表页
						this.Axios.post('/app/3.0/home/estate/info/list', params).then((res) => {
							if(res.code == 0) {
								this.buildingsList = res.data;
								this.judgeNull()
							}
						});
					} else if(this.$route.query.type == 'index') { //首页搜索框进入
						this.Axios.post('/app/3.0/home/list', params).then((res) => {
							if(res.code == 0) {
								this.buildingsList = res.data;
								this.judgeNull()
							}
						});
					}
				} else { //通过导航进入列表
					this.Axios.post('/app/3.0/home/list', params).then((res) => {
						if(res.code == 0) {
							this.buildingsList = res.data;
							this.judgeNull()
						}
					})
				}
			},
		},
		created() {
			if(this.$route.fullPath.indexOf('buildingList') != -1) { //非导航进入的楼盘列表
				this.isShowNav = false;
				this.searchBoxType = 3;
			} else { //通过导航进入的楼盘列表
				this.isShowNav = true;
				this.searchBoxType = 2;
			}
		},
		mounted() {

			setTimeout(() => {
				this.$nextTick(() => {
					this._initScroll();
				})
			}, 20)

			let that = this;
			document.addEventListener('scroll', this.scrollHandle);
			if(this.$route.query.type != 'index') {
				var timmer = setInterval(() => {
					if(sessionStorage.getItem('locationInfo')) {
						that.located = JSON.parse(sessionStorage.getItem('locationInfo')).city;
						let params = {
							cityName: that.located
						}
						that.getPageData(params); //初始化页面数据
						clearInterval(timmer);
					}
				}, 30);
			} else {
				this.searchValue = this.$route.query.params;
				var timmer = setInterval(() => {
					if(sessionStorage.getItem('locationInfo')) {
						that.located = JSON.parse(sessionStorage.getItem('locationInfo')).city;
						that.getSearchData(that.$route.query.params); //获取首页搜索数据
						clearInterval(timmer);
					}
				}, 30);
			}

		},
		components: {
			'bottomNav': Nav,
			'my-search': Search,
			'search-tip': SearchTip,
			'my-header': Header,
			'cityList': CityList,
			'shaixuan': Shaixuan,
		}
	}
</script>

<style lang="scss" scoped>
	#building {
		/*padding-bottom: 1rem;*/
	}

	.buildingList {
		position: absolute;
		top: .5rem;
		left: 0;
		bottom: .52rem;
		overflow: hidden;
		box-sizing: border-box;
		padding-left: .16rem;
		width: 100%;
		/*margin-top: 0.1rem;*/
		border-top: solid thin #e8e9ea;
	}

	.buildImg {
		width: 0.94rem;
		height: 0.94rem;
		border-radius: 5px;
		position:relative;
		.news{
			color:#fff;
			display:inline-block;
			width:0.415rem;
			height:0.15rem;
			font-size:0.11rem;
			text-align:center;
			line-height:0.15rem;
			position:absolute;
			background-color:rgba(248,169,9,1);
			bottom:0;
			left:0;
		}
	}

	.buildInfo {
		width: 2.3rem;
		height: 0.94rem;
		padding-right: 0.16rem;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		align-items: flex-start;
	}

	.single {
		display: flex;
		justify-content: space-between;
		padding: 0.22rem 0;
		border-bottom: solid thin #e8e8e8;
	}

	.b-title {
		height: 0.19rem;
		font-size: 0.15rem;
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.b-title span {
		display: block;
		font-size: 0.15rem;
		font-weight: bold;
	}

	.b-address {
		font-size: 0.12rem;
		color: #989CA8;
	}

	.b-price {
		font-size: 0.12rem;
	}

	.b-price span {
		font-size: 0.18rem;
		font-weight: bold;
	}

	.b-dis {
		font-size: 0.11rem;
		color: #6BA686;
		height:0.11rem;
		margin-right:0.05rem;
		display: inline-block;
		padding: 2px;
		border-radius: 2px;
		background-color: rgba(107, 166, 134, 0.10);
		margin-right: .02rem;
	}

	.buildImg img {
		width: 100%;
		height: 100%;
	}

	.icon-lvcheng_shoucang-yishoucang {
		color: #25B07E;
	}

	.icon-lvcheng_shoucang-changgui {
		color: #C6CAD3;
	}

	.iconfont {
		font-size: 0.26rem!important;
	}
	.has-no-data{
		width:100vw;
		height:60vh;
		position:relative;
		.img_container{
			position:absolute;
			width:100%;
			text-align:center;
			top:1rem;
			img{
				display:inline-block;
				width:1.5rem;
				height:1.5rem;
			}
		}
		p{
			text-align: center;
    	position: absolute;
    	top: 2.55rem;
    	font-size: 0.14rem;
    	color: #989CA8;
    	width: 100%;
		}
		.btn{
			text-align:center;
			position: absolute;
    	width: 100%;
    	top: 3rem;
			button{
				width: 1.30rem;
	    	height: 0.42rem;
	    	color: #25B07E;
	    	border: solid thin #25B07E;
	    	background-color: #fff;
	    	border-radius: 0.5rem;
	    	font-size: 0.15rem;
			}
		}
	}
</style>
