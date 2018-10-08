<template>
	<div class="infos">

		<div class="headers">消息</div>

		<div id="infomation" class="infomation" ref="wrapper">
			<div>
				<div class="msg_block" @click='goto("zx")'>
					<div class="msg_left">
						<div class="smol_icon">
							<span class="iconfont imgss">&#xe648;</span>
						</div>
					</div>
					<div class="r">
						<div class="msg_center">
							<div class="msg_title">
								绿城资讯
							</div>
							<p class="des">
								{{infoTitle?infoTitle:'暂无资讯动态'}}
							</p>
						</div>
						<div class="msg_right">
						{{infoDate}}
						</div>
					</div>

				</div>
				<div class="msg_block" v-for="(list,i) in lists" :key="i" @click='goto("per",list.estateId)'>
					<div class="msg_left">
						<div class="smol_icon">
							<img v-lazy="list.uriWechat" />
							<div class="point" v-if="list.pv == 0? true : false"></div>
						</div>
					</div>
					<div class="r">
						<div class="msg_center">
							<div class="msg_title">
								{{list.estateName?list.estateName:''}}
							</div>
							<p class="des">
								{{list.pv == 0?'您关注的'+list.estateName+'有了新动态':'暂无新动态'}}
							</p>
						</div>
						<div class="msg_right">
							{{list.pushTime}}
						</div>
					</div>

				</div>
			</div>
		</div>
		<bottomNav></bottomNav>
	</div>
</template>

<script>
	import Nav from '@/components/nav';
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				lists: [],
				infoLength: 0,
				infoTitle: "",
				infoDate: "",
				showFlags:true,

			}
		},
		components: {
			bottomNav: Nav,
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
				let url = '/app/3.0/personMessage/PersonMsglist'
				that.Axios.post(url, {})
					.then(function(res) {
						if(res.code === 0) {
							that.lists = res.data;
						}

					})

				that.Axios.post('/app/3.0/personMessage/PersonNewslist')
					.then(function(res) {
						if(res.code === 0) {
							that.infoLength = res.data.length
							//							if(that.infoLength > 0) {
							that.infoTitle = res.data[0].newsTitle;
							that.infoDate = res.data[0].createTime;
							//							}
						}

					})
			},
			goto(f, estateId) {
				if(f == "zx") {
					this.$router.push({
						path: '/infoDetail',
					});
				} else if(f == "per") {
					this.$router.push({
						path: '/mainPage/dynamic',
						query: {
							estateId: estateId
						}
					});
					this.changeState(estateId)
				}
			},
			changeState(estateId) {
				let url = '/app/3.0/personMessage/append';
				let data = {
					"estateId": estateId,
				}
				this.Axios.post(url, data).then(res => {
					if(res.code == 0) {}
				}).catch(e => {
					console.log(e)
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.infos {
		width: 100%;
	}

	.headers {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		line-height: .5rem;
		text-align: center;
		height: .5rem;
		border-bottom: .01rem solid #eaebed;
		font-family: PingFangSC-Medium;
		font-size: .18rem;
		color: #000000;
	}

	.infomation {
		width: 100%;
		position: absolute;
		top: .5rem;
		bottom: .5rem;
		overflow: hidden;
	}

	.msg_block {
		width: 100%;
		height: .765rem;
	}

	.msg_block .msg_left {
		width: .765rem;
		height: .765rem;
		float: left;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.msg_block .msg_left .smol_icon {
		width: .42rem;
		height: .42rem;
		background: #25B07E;
		border-radius: .04rem;
		text-align: center;
		line-height: .42rem;
		position: relative;
		overflow: hidden;
	}

	.msg_block .msg_left .smol_icon .imgss {
		font-size: .32rem;
		color: #ffffff;
	}

	.msg_block .msg_left .smol_icon img {
		/*position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: .32rem;*/

		width: 100%;
		height: 100%;
	}

	.r {
		width: 100%;
		height: .765rem;
		border-bottom: .01rem solid #eaebed;
	}

	.r .msg_center {
		width: 55%;
		height: .765rem;
		float: left;
	}

	.r .msg_center .msg_title {
		padding-top: .20rem;
		font-size: .15rem;
		color: #333333;
		overflow: hidden;
	   	text-overflow:ellipsis;
	    white-space:nowrap;
	}

	.r .msg_center .des {
		padding-top: .08rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: .12rem;
		color: #CBCDD3;
		overflow: hidden;
	   	text-overflow:ellipsis;
	    white-space:nowrap;
	}

	.r .msg_right {
		width: 20%;
		float: right;
		height: .765rem;
		text-align: center;
		line-height: .765rem;
		font-size: .14rem;
		color:#989ca8;
		overflow: hidden;
	   	text-overflow:ellipsis;
	    white-space:nowrap;
	}

	.point {
		width: .1rem;
		height: .1rem;
		background: red;
		color: #FFFFFF;
		text-align: center;
		border-radius: .06rem;
		position: absolute;
		top: -.03rem;
		right: -.03rem;
		font-size: 0.12rem;

	}
</style>
