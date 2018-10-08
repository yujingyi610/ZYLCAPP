<template>
  <div>
    <div id="banner" class="banner" style="position: relative;" v-bind:style="{height:height,width:width}">
      <swipe v-if='data.length > 0' :auto="4000"  :show-indicators="isIndicators">
        <swipe-item v-for="(item, index) in data" :key="index">
          <a>
            <img  v-if="item.imageWechat != null && item.imageWechat !=''" :src="item.imageWechat" @click="goPage(item.url,index)" height="100%"/>
          	<!--<img v-else src="../../../static/images/banner/banner.png" height="100%" width="100%" class="pull-left">-->

          </a>

        </swipe-item>
      </swipe>
      <!--<swipe v-if='data.length == 0' :auto="4000"  :show-indicators="false">
        <swipe-item>
          <a>
            <img src="../../../static/images/banner/banner.png" height="100%" width="100%" class="pull-left">
          </a>
        </swipe-item>
      </swipe>-->
    </div>
  </div>
</template>
<script>
  import { Swipe, SwipeItem } from 'mint-ui';
  export default {
    name: 'banner',
    props: ['data','width','height','isIndicators',"typehandle"],
    created(){
    },
    mounted(){
      //$('')
    },
    methods: {
      goPage(link,index){
						if(this.typehandle == 1) {
								if(link=='') return;
								window.location = link;
		    				var type = 'homebanner001';
		    				//banner埋点start
										this.ajaxLogRequest('/addLog',{
										      logtype:'new_mobile_homepage_banner',
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
										      type:type,
										      subtype:subtype//第几个轮播图
								    		},'POST')
								//banner埋点end
						}
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
    components:{
      'swipe': Swipe,
      'swipe-item': SwipeItem
    }
  }
</script>
<style >
	.tabBtn{
		position: absolute;
		left:50%;
		bottom:.01rem;
		transform: translateX(-50%);
	}
	.tabBtn span{
			display: inline-block;
			width:.3rem;
			height:.02rem;
			background:#f4f3f5 ;
		}
		.tabBtn span.active{
			background:#25b07e;
		}
  .banner img{
    width: 100%;
  }
  .content .mint-swipe-indicators .is-active {
    /*background: #0EB375 !important;*/
  }
  .content .mint-swipe-indicator {
    width: 17px !important;
    height: 4px !important;
    background: #F4F4F5 !important;
    opacity: 1;
    border-radius: 100px !important;
    margin: 0 3px;
  }
  .no_margin .mint-swipe-indicator {
    width: 17px !important;
    height: 4px !important;
    background: #F4F4F5 !important;
    opacity: 1;
    border-radius: 100px !important;
    margin: 0px !important;
  }
  .banner .mint-swipe-indicator.is-active{
    opacity: 1 !important;
  }

  .banner .mint-swipe-indicators .mint-swipe-indicator {
		border-radius: 0;
		height: .02rem;
		width: .08rem;
		background: #ffffff;
		opacity: 1;
	}

	.banner .mint-swipe-indicators .is-active {
		background:#25B07E;
	}
</style>
