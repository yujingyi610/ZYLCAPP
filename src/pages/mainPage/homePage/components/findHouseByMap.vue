<template>
	<div id="maps">

		<!--<headers :title="title" v-on:goBackEvent="closePopup"></headers>-->
		<div id="header">
			<div class="header-container">
				<header>
					<div class="back" @click="goBack">
						<span class="iconfont iconleft">&#xe630;</span>
						<span style="color:#989CA8;vertical-align:middle;">返回</span>
					</div>
					<span style="font-size:0.16rem;">{{title}}</span>
					<span class="password_login iconfont" @click="getmaps">&#xe626;</span>
				</header>
			</div>
		</div>
		<div class="findHouseByMap">
			<!--<mt-header title="官方经纪人">
				<mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
			</mt-header>-->
			<div id="bigMap">
				<div id='allmap' style="height: 100%;  "></div>
			</div>
		</div>
		<mt-popup v-model="popupVisible" id="cityslist" position="right" :closeOnClickModal="true" :modal="false">
			<my-header :title="title" v-on:goBackEvent="closePopup" />
			<cityList v-on:closePopEvent="getCityId" v-on:selectedCity="getSelectedCity" v-on:hasRefreshCity="refreshCity" />
		</mt-popup>
		<mt-popup v-model="shaixuanPopupVisible" position="right" :closeOnClickModal="true" id="shaixuanPop">
			<shaixuan v-on:showCityList="showCityList" v-on:shaixuanHandle="getShaixuanData" :newPosition="located"/>
		</mt-popup>
	</div>
</template>
<script>
	import { Header, Button } from "mint-ui";
	import Headers from '@/components/header';
	import Shaixuan from '@/components/shaixuan';
	import CityList from '@/components/cityList/cityList.vue';
	import { MessageBox } from 'mint-ui';
	export default {
		name: "demo",
		components: {
			"mt-header": Header,
			"mt-button": Button
		},
		data() {
			return {
				title: '地图找房',
				shaixuanPopupVisible: false, //筛选弹框

				center: {
					lng: 0,
					lat: 0
				},
				located:null,
				points: [
					[120.21937542, 30.25924446, 99,'余杭',22],
					[121.21437542, 31.25924446, 88,'江干',33]
				],
				popupVisible:false,
				Flagsong:0
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
			goBack() {
				this.$router.go(-1)
			},
			getmaps () {
				this.shaixuanPopupVisible = true;
			},
			getShaixuanData(data) {
				this.Flagsong = 1
				this.shaixuanPopupVisible = false;
				this.getmap(data.cityName,data)
			},
			showCityList () {
				this.popupVisible = true;
			},
			closePopup() {
				//this.$router.go(-1);
				this.popupVisible = false;
			},
			getSelectedCity(val){
				this.located = val.cityName;
				this.getmap(val.cityName)
				this.popupVisible = false;
			},
			getCityId(){

			},
			refreshCity(val){
				this.located = val.cityName;
			},
			addPoint(p, map) {
				var point = new BMap.Point(p[0], p[1]);
				var opts = {
					position: point, // 指定文本标注所在的地理位置
					offset: new BMap.Size(30, -30) //设置文本偏移量

				}
				var titi = p[3]?p[3]: ''
				var num = p[4]?p[4]: ''
				var label = new BMap.Label("<span>" + titi + "</span><span><i>" + num + "</i>个</span>", opts); // 创建文本标注对象

				label.setStyle({
					color: "#fff",
					background: "#25B07E",
					height: ".5rem",
					width: ".8rem",
					borderRadius: "50%",
					borderWidth: 0,
					display: "flex",
					justifyContent: 'space-around',
					flexDirection: "column",
					padding: ".15rem 0"

				});
				label.addEventListener("click", () => {


					this.$router.push({
						name:"findHouseByMapDatail",
						params: {
				            areaId: p[2],
				            areaX: p[0],
				            areaY: p[1]
				        }
					});
					sessionStorage.setItem("areaIds", p[2]);
					sessionStorage.setItem("areaXs", p[0]);
					sessionStorage.setItem("areaYs", p[1]);
				});

				map.addOverlay(label);
			},
			addressDetail() { //获取地理位置
			 	var that = this
			 	var lng = 0
			 	var lat = 0
			 	let city = ''
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r) {
					if(this.getStatus() == BMAP_STATUS_SUCCESS) {
						lng = r.point.lng
						lat = r.point.lat
						city = r.address.city
						console.log(r)
						that.getmap(city)

					} else {
						alert('failed' + this.getStatus());
					}
				}, {
					enableHighAccuracy: true
				})
			},
			initMap(city,lng,lat) {
				var map = new BMap.Map("allmap");
            	//116.417854,39.921988
	            var point = new BMap.Point(lng,lat);
//	            map.centerAndZoom(point, 15);
	            map.centerAndZoom(city,11)
				map.enableScrollWheelZoom();

	            this.points.map((v)=>{
	                this.addPoint(v,map)
	            })
				map.enableDoubleClickZoom(true)

			},
			getmap(city,datas) {
				let url = '/app/3.0/map/building/area';

				let data = {
					"cityName": city? city: "",
//					"provinceName":1
				}
				let datalist = ''

				if(this.Flagsong == 0) {
					datalist = data

				}else {
					datalist = datas

				}
				this.Axios.post(url, datalist).then(res => {
					if(res.code == 0) {
						let areas = res.data.areas
						console.log(areas)
						if (areas.length>0){
							let points_ = areas.map(item=>{
								return [item.areaX, item.areaY, item.areaId, item.area, item.count]
							})
							this.points = points_
							this.initMap(city)
						}else {
							MessageBox.confirm('当前城市暂无楼盘，将为您切换到杭州市!').then(action => {
									this.getmap("杭州市")
							}).catch(action => {

							});
						}

					}
				}).catch(e => {
					console.log(e)
				})
			},

		},
		components: {
			'my-header': Headers,
			'shaixuan': Shaixuan,
			'cityList': CityList,
		},
		created() {
			this.addressDetail()
		},
		mounted() {

		},
	}
</script>
<style>
	#maps #cityslist{
		width: 100%;
	}
	header {

		font-size: 0.14rem;
		height: 0.5rem;
		line-height: 0.5rem;
		text-align: center;
	}

	header .iconleft {
		width: 0.15rem;
		vertical-align: middle;
		color: rgb(152, 156, 168);
	}

	header .password_login {
		position: absolute;
		right: 5%;
		top: 0;
		font-size: .20rem;
	}

	header .back {
		position: absolute;
		height: 0.5rem;
		left: 0;
		top: 0;
		display: inline-block;
		padding-left: 0.12rem;
		width: 0.5rem;
		float: left;
	}

	header .header-container {
		width: 100vw;
		position: fixed;
		height: 0.5rem;
		top: 0;
		z-index: 3000;
		background-color: #fff;
	}

	.findHouseByMap {
		position: absolute;
		top: .5rem;
		bottom: 0;
		left: 0;
		right: 0;
	}

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

	.BMapLabel>span {
		text-align: center
	}

	.BMapLabel>span i {
		font-size: .18rem;
		padding-right: .08rem
	}

	#app {
		height: 100%;
	}

	#bigMap {
		width: 100%;
		height: 100%;
		/* padding-bottom: 0.48rem; */
		overflow: hidden;
	}

	#bigMap .mint-header {
		border-bottom: 1px solid #EAEBED;
		color: #000;
		background-color: #fff;
		position: relative;
		z-index: 999;
	}

	#bigMap h1 {
		margin: .67em 0;
	}

	#bigMap label {
		font-weight: 100;
		font-size: .12rem;
	}

	#bigMap .mintui {
		font-size: .14rem;
	}

	#bigMap .nav-detail {
		height: 0.5rem;
		z-index: 5;
		/* margin: 0 0.1rem; */
		background: #fff;
		position: relative;
	}

	#bigMap .nav-detail a {
		color: #333;
	}

	#bigMap .nav-detail a>div {
		font-size: 0.15rem;
	}

	#bigMap .nav-detail a.is-selected {
		text-decoration: none;
		color: #00B573 !important;
		/* background: #00B573 !important; */
		border-bottom: 2px solid #00B573;
		font-size: 0.14rem;
		font-weight: 700;
		margin-bottom: 0 !important;
	}
</style>
