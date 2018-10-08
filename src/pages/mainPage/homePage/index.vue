<template>
	<div>
	<div id="home" ref="wrapper">
		<div>
			<search :loca="located" type="1" v-on:reLocated="getLocated" v-on:showCityList="showCityList" v-on:showSearchTip="showSearchTip" v-on:closeCityList="closePopup"></search>
			<div class="banners">
				<banner :typehandle="1" class="fBanner" :data="bannerList" :width="bannerWidth" :height="bannerHeight" :isIndicators="true"></banner>
			</div>
			<div class="buildingNav">
				<div v-for="(item,index) in menuList" :key="index" @click="gotoPage(item.url,item.name)">
					<div class="imagesl"><img v-lazy="item.image"></div>
					<span>{{item.name}}</span>
				</div>
			</div>
			<my-kuaixun></my-kuaixun>
			<my-title v-if="local_builds.length != 0" name="本地楼盘" link="/mainPage/buildingList?type=local" v-on:topMethod="goMorePage" />
				<!--<my-scroll :builds="local_builds" />-->

			<div class="local_builds_better">
				<my-betterscroll :builds="local_builds" type='homecont001' />
			</div>
			<my-title v-if="will_builds.length != 0" name="即将开盘" link="/mainPage/buildingList?type=will" v-on:topMethod="goMorePage" />
			<!--<my-scroll :builds="will_builds" />-->
			<div class="local_builds_better">
				<my-betterscroll :builds="will_builds" type='homecont002'/>
			</div>
			<my-title v-if="good.length != 0" articleType="2" name="好盘推荐" link="/articleList" v-on:topMethod="goMorePage" />
			<div class="haopan">
				<div class="haopan_div" v-for="(item, index) in good" v-if="index < 4" @click="toGoodDetail(item.url,index)">
					<img v-lazy="item.image">
					<div class="pan1">{{item.title}}</div>
					<div class="pan2">{{item.estateName}}</div>
				</div>
			</div>
			<div class='no_margin'>
				<banner :typehandle="1"  class="addImages fBanner" :data="imgArr" width="100%" height="100%" :isIndicators="true"></banner>
			</div>
			<my-title v-if="showifonmation" name="房产资讯" articleType="3" link="/articleList" v-on:topMethod="goMorePage" />
			<div class="home_new" style='padding-bottom: .2rem;'>
				<my-information :located="located" v-on:informations="informations"/>
			</div>

		</div>
		<bottomNav></bottomNav>
	</div>
	<mt-popup v-model="popupVisible" position="right" :closeOnClickModal="true" :modal="false">
		<my-header :title="title" v-on:goBackEvent="closePopup" />
		<cityList v-on:closePopEvent="getCityId" v-on:selectedCity="getSelectedCity" v-on:hasRefreshCity="refreshCity" />
	</mt-popup>
	<mt-popup v-model="popupVisibleSearch" position="right" :closeOnClickModal="true">
		<search-page :isIndex="true" v-on:closeSearchTip="closeSearchTip" v-on:showCityList="showCityList" :newLocation="located" />
	</mt-popup>
	</div>
</template>

<script>
	import { MessageBox, Swipe, SwipeItem, Toast, Popup } from 'mint-ui';
	import wx from 'weixin-js-sdk';
	import Nav from '@/components/nav';
	import Search from '@/components/Search';
	import Banner from '@/components/banner/banner.vue';
	import Myzixun from '@/components/zixun/zixun.vue';
	import Title from '@/components/title/title.vue';
	import Scroll from '@/components/scroll/scroll.vue';
	import Betterscroll from '@/components/scroll/betterscroll.vue';
	import Information from '@/components/information/information.vue';
	import CityList from '@/components/cityList/cityList.vue';
	import SearchDetail from '@/components/searchfilter/searchfilter.vue';
	import Header from "@/components/header";
	import SearchPage from "@/components/searchPage";
	import BScroll from 'better-scroll'
	import betterscroll from 'better-scroll'


	export default {
		beforeRouteEnter (to, from, next) {
    	next(vm =>{
    		let text = window.location.href.split('?')[1].split('&');
    		let account_type = text[0].split("=")[1];
    		let source_type = text[1].split("=")[1];
    		localStorage.setItem('account_type',account_type);
    		localStorage.setItem('source_type',source_type);
    		localStorage.setItem('ip',returnCitySN["cip"] );
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
		data() {
			return {
				name: '首页',
				bannerList: [],
				bannerWidth: '100%',
				bannerHeight: '100%',
				located: null,
				local_builds: [],
				will_builds: [],
				showifonmation:false,
				menuList: [],
				title: '城市选择',
				popupVisible: false, //右侧弹框控制
				popupVisibleSearch: false,
				good: [], //好盘推荐
				imgArr: [{
						imageWechat: require('../../../../static/images/home/my_banner11.png')
					},
					{
						imageWechat: require('../../../../static/images/home/my_banner22.png')
					},
					{
						imageWechat: require('../../../../static/images/home/my_banner33.png')
					}
				], //imageWechat
			}
		},
		methods: {
			_initScroll() {
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
			showCityList() {
				this.popupVisible = true;
			},
			informations (val) {
				this.showifonmation = val
			},
			showSearchTip() {
				this.popupVisibleSearch = true;
			},
			closeSearchTip() {
				this.popupVisibleSearch = false;
			},
			getSelectedCity(city) {
				this.located = city.cityName;
				this.popupVisible = false;
			},
			refreshCity(city) {
				this.located = city.cityName;
			},
			closePopup() { //关闭右侧弹出弹框
				this.popupVisible = false;
			},
			getCityId(city) { //从城市列表组件获取城市id
				//console.log('城市信息',city);
				this.popupVisible = false;
				//this.located = city.cityName;
			},
			getLocated(data){
				this.located = data
			},
			goMorePage(link,articleType) {
				this.$router.push({
					path: link
				})
				sessionStorage.setItem("articleType",articleType)
			},
			gotoPage(url,name) {
//首页模块点击日志
			this.ajaxLogRequest('/addLog',{
		      logtype:'new_mobile_homepage_module_click',
		      user_id:sessionStorage.getItem('userid') || null,
		      account_type:localStorage.getItem('account_type'),
		      user_agent:this.getBrowser(),//浏览器信息
		      cookie:'',//暂无，不知道怎么获取
		      ip_addr:  localStorage.getItem('ip'),
		      os_type:  this.getPhoneType(),
		      present_url:  window.location.href,
		      record_time: new Date(),
		      version: '3.0.0',
		      source_type:localStorage.getItem('source_type'),
		      type:name
    		},'POST')
				window.location.href = url
			},
			toGoodDetail(url,index,type) {
//				this.$router.push({
//					path: url,
//				})
			//content埋点start
					var subtype = '0'+(index+1);
					this.ajaxLogRequest('/addLog',{
					      logtype:'new_mobile_homepage_content',
					      user_id:sessionStorage.getItem('userid') || null,
		      			  account_type:localStorage.getItem('account_type'),
					      user_agent:this.getBrowser(),//浏览器信息
					      cookie:'',//暂无，不知道怎么获取
					      ip_addr:  localStorage.getItem('ip'),
					      os_type:  this.getPhoneType(),
					      present_url:  window.location.href,
					      record_time: new Date(),
					      version: '3.0.0',//暂无法获取
					      source_type:localStorage.getItem('source_type'),
					      type:'homecont003',
						  subtype:subtype//第几个轮播图
			    		},'POST')
			//content埋点end
				window.location.href = url
			},
			initPage() {
				let data = {
					cityName:this.located
				}
				this.Axios.post('/app/3.0/home/banner/list',data).then((res) => { //获取banner图片资源
					if(res.code == 0) {
						this.bannerList = res.data;

					}

				})

				this.Axios.post('/app/3.0/home/estate/list',{cityName:this.located,pageLimit:4,status:0}).then((res) => { //获取本地楼盘列表
					if(res.code == 0) {
						this.local_builds = res.data;
					}
				});
				this.Axios.post('/app/3.0/home/estate/info/list').then((res) => { //获取即将开盘列表
					if(res.code == 0) {
						this.will_builds = res.data;
					}
				});
				this.Axios.post('/app/3.0/home/building/list',data).then((res) => { //获取好盘推荐列表
					if(res.code == 0) {
						this.good = res.data.list;
					}
				})
				this.Axios.post('/app/3.0/home/menu/list').then((res) => { //获取首页菜单列表
					if(res.code == 0) {
						this.menuList = res.data;
					}
				})
			},
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
			}
		},
		created() {
			/*let that = this;
			let timmer = setInterval(()=>{
				if(that.located != null){
					that.initPage();
					clearInterval(timmer)
				}
			},30)*/
		},
		mounted() {
			if (!this.scroll) {
				    this.scroll = new BScroll(this.$refs.wrapper, {
				        click: true,
				        scrollY: true,
				        probeType: 3
				    });
				}else{
				    this.scroll.refresh();
				}

//			this.$refs.betterscroll._initScrollh
		},
		updated() {

		},
		components: {
			'bottomNav': Nav,
			'search': Search,
			'banner': Banner,
			'my-kuaixun': Myzixun,
			'my-title': Title,
			'my-scroll': Scroll,
			'my-betterscroll':Betterscroll,
			'my-information': Information,
			'cityList': CityList,
			'search-tip': SearchDetail,
			'my-header': Header,
			'search-page': SearchPage,
		},
		watch:{
			located(){
				if(this.located != null){
					this.initPage();
				}
			}
		}

	}
</script>

<style scoped>
	#home {
		position: absolute;
		top: .2rem;
		bottom: .5rem;
		width: 100%;
		overflow: hidden;
		left: 0;
		padding-bottom: 1rem;

	}

	.fBanner {
		width: 92vw;
		height: 50vw;
		border-radius: .04rem;
		overflow: hidden;
		margin: 0 auto;
		margin-top: 0.2rem;
	}

	.addImages {
		width: 100%;
		height: 1rem;
	}

	.buildingNav {
		width: 92vw;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 0.1rem;
		margin-top: 0.2rem;
		height: 0.54rem;
	}

	.buildingNav div {
		display: flex;
		height: 0.54rem;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.buildingNav img {
		display: inline-block;
		width: 0.45rem;

	}

	.haopan {
		margin-left: 0.075rem;
		margin-top: 0.14rem;
	}

	.haopan .haopan_div {
		width: 1.665rem;
		margin-left: 0.065rem;
		display: inline-block;
		margin-top: 0.1rem;
	}

	.haopan .haopan_div img {
		width: 100%;
		height: 0.937rem;
		border-radius: .04rem;
	}

	.haopan .haopan_div .pan1 {
		font-family: PingFangSC-Medium;
		font-size: 0.14rem;
		color: #333333;
		line-height: 0.19rem;
		/*margin-top: 0.1rem;*/
	}

	.haopan .haopan_div .pan2 {
		font-family: PingFangSC-Regular;
		font-size: 0.09rem;
		color: #5D5D5D;
		line-height: 0.16rem;
	}
	.local_builds_better{
		position: relative;
		height: 2.5rem;
	}
	.no_margin {
		margin-top: .25rem;
	}
	.mint-popup-right {
		width: 100%;
	}
	.banners .mint-swipe-items-wrap{
		border-radius: .04rem;
	}
	.banners .mint-swipe-items-wrap > div {
		border-radius: .04rem;
	}
	.banners .mint-swipe-indicators .mint-swipe-indicator {
		border-radius: 0;
		height: 2px;
		width: 8px;
		background: #ffffff!important;
		opacity: 1;
	}

</style>
