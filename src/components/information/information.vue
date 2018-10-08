<template>
	<div class="news">
		<div class='item_group'>
			<div class="item" v-for="(item,index) in mydata" @click='goPage(item.url,index)'>
				<div class="item_left">
					<img v-lazy="item.image" width='100%' height="100%">
				</div>
				<div class="item_right">
					<div class='name'>{{item.spokesman}}</div>
					<div class='time'>{{item.time}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import util from '../../../config/util';
	export default {
		name: "news",
		mixins: [util],
		props:['located'],
		data() {
			return {
				mydata: []
			}
		},
		created() {
			//this.getList();
		},
		watch:{
			located(){
				this.getList()
			}
		},
		methods: {
			getList: function() {
				let self = this;
				let params = {
					cityName:this.located,
					pageLimit: 4
				}
				this.Axios.post('/app/3.0/home/news/list',params).then((res) => {
					if(res.code == 0) {
						if (res.data.list.length > 0) {
							this.mydata = res.data.list;
							this.$emit('informations', true)
						}else {
							this.$emit('informations', false)
						}
					}
				})
			},
			goPage: function(url,index) {
//				if(link == '') return;
				//window.location = link;
//				this.$router.push({
//					path: link,
//				})
				window.location.href = url;
				//content埋点start
					var subtype = '0'+(index+1);
					var type = 'homecont004';
					this.ajaxLogRequest('/addLog',{
					      logtype:'new_mobile_homepage_content',
					      user_id:null,//暂无法获取
					      account_type:0,//暂无法获取，0手机号1账号2微信3支付宝4微博5QQ
					      user_agent:this.getBrowser(),//浏览器信息
					      cookie:'',//暂无，不知道怎么获取
					      ip_addr:  '10.9.157.201',//暂无
					      os_type:  this.getPhoneType(),
					      present_url:  window.location.href,
					      record_time: new Date(),
					      version: '3.0.0',//暂无法获取
					      source_type:'',//暂无法获取
					      type:type,
						  subtype:subtype//第几个轮播图
			    		},'POST')
				//content埋点end
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
		}
	}
</script>

<style scoped>
	@import "./information.css";
	.item_left img {
		vertical-align: top;
	}
</style>
