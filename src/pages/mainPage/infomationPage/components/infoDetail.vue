<template>
	<div id="infoDetail" class="infoDetail">
		<mt-header title="资讯列表">
			<mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        </mt-header>
        <div class="wrappers" ref="wrapper">
			<div>

		<div class="msg_block" v-for="(zx,i) in zxs" :key="i" @click='goto(zx.id)'>
			<!-- <div class="msg_left">
				<img src="../../../../../static/assets/img_mistake_2@2x.png" alt="">
				<div class="totals">{{lists.length}}</div>
			</div> -->
			<div class="r">
				<div class="msg_center">
					<div class="msg_title">
						{{zx.noticeName}}</div>
					<p class="des">
						{{zx.content}}</p>
				</div>
				<div class="msg_right">
					{{zx.time?zx.time.split(' ')[0]:''}}
				</div>
				<img src="../../../../../static/assets/icon_right@2x.png" alt="" class="icon_more" v-if="true"><!-- 暂无图片，视接口返回 -->
			</div>
			<div class="botImg" v-if="zx.image">
				<img :src="zx.image" alt="">
			</div>
		</div>
		</div>
		</div>
	</div>
</template>

<script>
import { Header, Button } from "mint-ui";
import BScroll from 'better-scroll'
	export default {
		components: {
			"mt-header": Header,
			"mt-button": Button
		},
		data() {
			return {
				zxs: []
			}
		},
		created() {
			this.loadData();
		},
		mounted() {
			setTimeout(() => {
				this.$nextTick(() => {
					this._initScroll();
				})
			}, 20)
		},
		filters: {

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
				this.$router.go(-1);
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
			},
			loadData() {
				var that = this;
				that.Axios.post('/app/3.0/notice/list')
				.then(function (res) {
					that.zxs = res.data;
				}).catch(function (err) {
					console.log(err)
				})
			},
			goto(id) {
				this.$router.push({
					path: '/noticeInfo',
					query: {
						noticeId: id
					}
				});//跳转至 兆森 文章详情模板

			},
		}
	}
</script>

<style scoped lang="scss">
	.infoDetail {
		width: 100%;
		font-size: .14rem;
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
		.msg_block {
			width: 100%;
			padding: 0 0 0 .18rem;
			.msg_left {
				width: .36rem;
				height: .36rem;
				margin-right: .12rem;
				position: relative;
				margin: .18rem .12rem .165rem 0;

				img {
					width: 100%;
					height: 100%;
					border-radius: .04rem;
					overflow: hidden;
				}
				.totals {
					width: .14rem;
					height: .14rem;
					background: red;
					color: #FFFFFF;
					font-size: .12rem;
					text-align: center;
					border-radius: .07rem;
					position: absolute;
					top: -.06rem;
					right: -.06rem;
				}
			}
			.r {
				flex-grow: 1;
				display: flex;
				justify-content: space-between;
				border-bottom: .01rem solid #EAEBED;
				padding-right: .18rem;
				.msg_center {
					padding: .18rem 0 .165rem 0;
					// margin-right: .465rem;
					width: 2.4rem;
					.msg_title {
						font-size: .15rem;
						color: #333333;
						line-height: .19rem;
					}
					.des {
						width: 100%;
						font-size: .12rem;
						color: #CBCDD3;
						letter-spacing: 0;
						line-height: .16rem;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
				.msg_right {
					align-self: center;
					font-size: .14rem;
					color: #989CA8;
					letter-spacing: 0;
					line-height: .21rem;
				}
				.icon_more {
					width: .18rem;
					align-self: center;
				}
			}
			.botImg{
				width: 100%;
				padding-right: .18rem;

				img{
					width: 100%;
				}
			}
		}
	}
	.wrappers {
		position: absolute;
		top: .4rem;
		bottom: 0;
		width: 100%;
		overflow: hidden;
	}
</style>
