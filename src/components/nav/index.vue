<template>
    <div id="nav">
      <div class="bottom-nav">
        <router-link class="link router-link-active" to="/mainPage/home">
          <span class="iconfont">&#xe627;</span>
          <span class="nav-weight">首页</span>
        </router-link>
        <router-link class="link" to="/mainPage/building">
          <span class="iconfont">&#xe625;</span>
          <span class="nav-weight">楼盘</span>
        </router-link>
        <router-link class="link" to="/mainPage/infomation">
          <span class="iconfont" id="icn-news">&#xe624;</span>
          <span class="nav-weight">消息</span>
        </router-link>
        <router-link class="link" to="/mainPage/mine">
          <span class="iconfont">&#xe628;</span>
          <span class="nav-weight">我的</span>
        </router-link>
      </div>
    </div>
</template>

<script>
  import "@/assets/icon/iconfont.css"
    export default {
      data(){
        return{
          name:'nav',
          thisRoute:'',
        }
      },
      methods:{
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
			getType(type){
				switch(type){
					case '/mainPage/home' : return 'hometab001';
					case '/mainPage/building' : return 'hometab002';
					case '/mainPage/infomation' : return 'hometab003';
					case '/mainPage/mine' : return 'hometab004';
				}
			}
     },
      beforeMount(){
        this.thisRoute = this.$root._route.fullPath;
      },
      watch:{
        thisRoute(){
//底部Tab埋点start
		var type = this.getType(this.thisRoute);
		this.ajaxLogRequest('/addLog',{
		      logtype:'new_mobile_homepage_tab',
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
		      type:type
    		},'POST')
//底部Tab埋点end
          document.getElementsByClassName('router-link-active')[0].classList.remove('router-link-active');
          let linkEle = document.getElementsByClassName('link');
          if(this.thisRoute.indexOf('/mainPage/home') != -1){
            linkEle[0].classList.add('router-link-active');
          }else if(this.thisRoute.indexOf('/mainPage/building') != -1){
            linkEle[1].classList.add('router-link-active');
          }else if(this.thisRoute.indexOf('/mainPage/infomation') != -1){
            linkEle[2].classList.add('router-link-active');
          }else if(this.thisRoute.indexOf('/mainPage/mine') != -1){
            linkEle[3].classList.add('router-link-active');
          }
        }
      }
    }
</script>

<style scoped>
  .bottom-nav{
    display:flex;
    font-size:0.07rem;
    justify-content:space-around;
    align-items: center;
    background-color:#fff;
  }
  .link{
    display: flex;
    justify-content:space-around;
    align-items: center;
    flex-direction: column;
    background-color:#fff;
  }
  .active{
    color:#373C43!important;
  }
  .nav-weight{
  	font-size: 10px;
  	/*margin:-4px 0 10px 0;*/
  	margin-bottom: 7px;
  }
  #nav .bottom-nav .iconfont {
    font-size: 0.35rem;
    margin-top:3px;
    }
  #nav .bottom-nav #icn-news{
    	font-size: 0.32rem;
    }
   .bd-title[data-v-a9449614] {
    width: 1.32rem;
    height: 0.28rem;
    margin-bottom: 10px;
}
</style>
