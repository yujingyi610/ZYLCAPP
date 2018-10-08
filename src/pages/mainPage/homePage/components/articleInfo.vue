<template>
	<div id="home">
		<headers :title="title" v-on:goBackEvent="closePopup"></headers>
		<div class="articles" ref="wrappers">
			<div>
				<div class="worddetail">
					<h3>{{articleslist.title}}</h3>
					<div class="nodestime">
						<span class="name">{{articleslist.estateName}}</span>
						<span class="nodes">{{articleslist.author}}</span>
						<span class="time">{{articleslist.time}}</span>
					</div>
					<div class="words" id="words">
						<!--{{}}-->
						<!--<p>在大部分情况下如果一个学生简历不出彩，学校更好，学历更高，获得面试的机会肯定更大。这里值得注意的是，本科院校其实比想象中的重要，因为很多公司是看第一学历的，据我了解某些在给薪酬和offer的时候会考虑第一学历。比如，我这一届，我就发现双985的学生好像基本都收到某公司的offer.</p>
						<img src="" />
						<p>2.github 这里我想说一下，有一些同学的github里面空空荡荡的，然后还放在简历上面，这种情况至少在我眼里算是减分项，放个空的github是几个意思，告诉我你注册了个账号么…所以，如果自己的github上几乎没啥内容就别放了，更别搞种熟人相互stars这种操作。。。3.写跟岗位相关的我之前看到一份简历，南开大学的，其实各方面都挺不错，但是简历里面居然写了一些自己CPA过了几门这种信息，这其实对于计算机相关的岗位是不太合适的，给人有一种对自己技术没有信心，希望通过别的方式来强行加分的感觉。当然，还好那个同学在面试的过程当中表现不错，打消了这个疑虑。但是这种操作还是少做的好4.成绩如果成绩好，一定要记得写自己的排名，某些公司很关注这个，我一同学第一次面没写成绩挂了，第二次加上成绩就过了，这个东西至少能证明你学习能力还可以，毕竟大家都喜欢抱佛脚嘛，抱佛脚抱得好也是一门手艺5.算法岗除非真的很突出！不太建议本科同学申请这个岗位，突出点参考我上面提的五点。大部分不太突出的本科同学申请算法岗当炮灰的可能性挺大的。当然，如果你真的很感兴趣，那可以试试，我这里说的主要是那种因为算法岗待遇更好一点，然后花2-3个月强行转算法的同学</p>
					-->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Headers from '@/components/header';
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				title:'文章详情',
				articleslist:{}
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
			closePopup () {
				window.history.back();
			},
			getarticlesInfo () {
				let url = '/app/3.0/content/news/info';
				let data = {
					"id":sessionStorage.getItem("articleid")
				}
				this.Axios.post(url,data).then(res => {
					if(res.code == 0){
						this.articleslist = res.data
						let dImg = document.getElementById("words");
		    			dImg.innerHTML = this.articleslist.content;
//		    			dImg.find("strong").css("line-height", ".24rem")
		    			dImg.firstElementChild.style.width = "100%";
					}
				}).catch(e => {
					console.log(e)
				})
			},
		},
		created() {
			this.getarticlesInfo()
		},
		mounted() {
			this.$nextTick(() => {
				if(!this.scroll) {
					this.scroll = new BScroll(this.$refs.wrappers, {
						//开启点击事件 默认为false
						click: true,
						scrollY: true
					})
				} else if(!this.$refs.wrappers) {
					return
				} else {
					this.scroll.refresh()
				}
			})

		},
		components: {
			'headers': Headers
		}
	}
</script>

<style scoped>
	.articles {
		position: absolute;
		top:.5rem;
		left: 0;
		bottom: 0;
		overflow: hidden;
	}
	.worddetail {
		width: 100%;
		box-sizing: border-box;
		padding: .15rem;
	}
	.worddetail h3 {
		font-size: .22rem;
		line-height: .26rem;
	}
	.worddetail .nodestime {
		margin: .2rem .07rem .3rem 0;
	}
	.worddetail .nodestime span{
		font-size: .15rem;
	}
	.worddetail .nodestime .name {
		color: #C6CAD3;
	}
	.worddetail .nodestime .nodes {
		color: #6BA686;
	}
	.worddetail .nodestime .time {
		color: #C6CAD3;
	}
	.worddetail .words p{
		font-size: .15rem;
		line-height: .25rem;

	}
	.worddetail .words strong{
		line-height: .24rem;
    	text-decoration: none!important;

	}
	img{
		width: 100%;
	}
</style>
