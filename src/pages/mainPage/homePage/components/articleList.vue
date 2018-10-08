<template>
	<div id="home">
		<headers :title="title" v-on:goBackEvent="closePopup"></headers>

		<div class="nav" ref="wrapperh">
			<div class="contents">
				<ol style="margin-left: 0.28rem;">
					<li data-type="0" v-for="(item,index) of listschange" :class="indexFlag == index ? 'colorcalss' : '' " @click="changetype(item,index)">{{item.newsName}}</li>
				</ol>
			</div>
		</div>
		<div class="articles" ref="wrapper">
			<p class="drop_down" v-if="dropDown">松手刷新数据...</p>
			<div>

				<div class="articles_list" v-for="(item,index) of articleslist" :key="index" @click="detailinfo(item.id)">

					<div class="p_title">
						<div class="span1">{{item.title}}</div>
				 		<div class="span2">
							<span class="times">{{item.time}}</span>
							<span class="iconfont righticon">&#xe6a2;</span>
						</div>
					</div>
					<div v-if="item.type == 2" class="p_introduce">
						{{item.summary}}
					</div>
					<div v-if="item.type == 1" class="p_intro_img">
						<img v-lazy="item.image"/>
					</div>
				</div>
			</div>
			<p class="drop_up" v-if="dropUp">{{dropUpText}}</p>
		</div>
	</div>
</template>

<script>
	import Headers from '@/components/header';
	import BScroll from 'better-scroll'
//	import axios from "@/axios/api.js"
	export default {
		data() {
			return {
				title:'文章列表',
				articleslist:[],
				indexFlag:-1,
				nums:0,
				dropUp:false,
				dropDown:false,
				scrollFlag:true,
				dropUpText:'',
				listschange:[{name:"全部"},{name:"房产"},{name:"养老"},{name:"活1动"},{name:"活2动"},{name:"活3动"},{name:"活44动"}]
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
			detailinfo (id) {
				this.$router.push('/articleList/articleinfo')
				sessionStorage.setItem("articleid",id)
			},
			_initScrollh () {
				this.scrollh = new BScroll(this.$refs.wrapperh, {
					click: true,
					scrollY: false,
					scrollX:true
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
				this.scroll.on('scroll', (pos) => {
                    //如果下拉超过50px 就显示下拉刷新的文字
                    if(pos.y>50){
                        this.dropDown = true
                    }else{
                        this.dropDown = false
                    }
                    if(this.scrollFlag == true){
                    	this.dropUpText = "正在加载数据！"
                    }
                      	//如果上拉
                    if(this.scroll.maxScrollY>pos.y+10){
                    	this.dropUp = true

                    }else {
                    	this.dropUp = false
                    }
                })
				this.scroll.on('touchEnd', (pos) => {
					// 下拉动作
                    if(pos.y > 30){
                    	this.getarticlesList()
                    }else {
                    	this.dropDown = false
                    }
                    //上拉加载 总高度>下拉的高度+10 触发加载更多
                    if(this.scroll.maxScrollY>pos.y+10){
//		                console.log(this.scroll.maxScrollY)
                        this.dropUp = false;
                        if(this.scrollFlag == true){

                       		this.getarticlesList()
                       	}
                        this.scroll.refresh() //使用refresh 方法 来更新scroll  解决无法滚动的问题
                    }
            	})
			},
			changetype(item,index){
				this.indexFlag = index
				this.nums = 0
				this.articleslist = []
				this.getarticlesList(item.newsTypeId)
			},
			getarticlesList (newsTypeId) {
				let url = '/app/3.0/content/news/list';
				this.nums  = this.nums + 1
				let data = {
					"newsTypeId":newsTypeId ? newsTypeId : '',
					"pageCurrent":this.nums,
					"pageLimit":10
				}
				this.Axios.post(url,data).then(res => {
					if(res.code == 0){
						let data = res.data.data
						let total = parseInt( (res.data.total)/10 )
						this.articleslist = this.articleslist.concat(data)
						if(this.nums > total){
							this.scrollFlag = false;
							this.dropUpText = "没有更多数据！"
						}
					}
				}).catch(e => {
					console.log(e)
				})
			},
			getarticlesType (newsTypeId) {
				let url = '/app/3.0/content/news/type/list';
				let data = {
//					"newsTypeId":newsTypeId ? newsTypeId : ""
				}
				this.Axios.post(url,data).then(res => {
					if(res.code == 0){
						this.listschange = res.data

					}
				}).catch(e => {
					console.log(e)
				})
			}
		},
		created() {
			this.getarticlesList()
			this.getarticlesType()
			this.indexFlag = 0

//			if(sessionStorage.getItem("articleType") == 1){
//			}
//			if(sessionStorage.getItem("articleType") == 2){
//				this.indexFlag = 2
//			}
//			if(sessionStorage.getItem("articleType") == 3){
//				this.indexFlag = 3
//			}
		},
		mounted() {
			setTimeout(() => {
	      		this.$nextTick(()=>{
	      			this._initScrollh()
					this._initScroll();
				})
            },20)
		},
		components: {
			'headers': Headers
		},
		updated() {

		}
	}
</script>

<style scoped>
	.colorcalss {
		color: black!important;
		border-bottom:2px solid #4dd252!important;
		border-bottom: .02rem solid #25B07E!important;
	}
	.drop_down{
	    width: 100%;
	    height: .5rem;
	    line-height:.5rem;
	    text-align: center;
	    font-size:0.2rem;
	    color:#CCC;
	}
	.drop_up {
		position: absolute;
		bottom: 0;
		width: 100%;
	    height: .5rem;
	    line-height:.5rem;
	    text-align: center;
	    font-size:0.15rem;
	    color:#CCC;
	}
	.nav {
		width: 100%;
		position: absolute;
		top: .5rem;
		z-index: 1;
		height:.4rem;
		background: white;
		box-sizing: border-box;
		overflow: hidden;
		border-bottom: 1px solid #e6e6e6;
	}

	.nav .contents{
		float: left;
	}
	.nav .contents ol{
		white-space:nowrap;
	}
	.nav .contents ol li{
		display:inline-block;
		padding:0 .15rem;
		line-height:.37rem;
		color: #989CA8;
		border: none;
		outline: none;
	}
	.articles {
		position: absolute;
		top:.9rem;
		left: 0;
		bottom: 0;
		overflow: hidden;
		width: 100%;
		z-index: 1;
	}
	.articles_list {
		width: 100%;
		box-sizing: border-box;
		padding: .1rem .15rem .1rem .15rem;
		border-bottom: 1px solid #e6e6e6;
	}
	.articles_list .p_title {
		font-size: .14rem;
		font-weight: 600;
		line-height: .4rem;
		color: #373C43;
		height: .4rem;
		overflow: hidden;
	}
	.articles_list .p_title .span1 {
		width: 65%;
		float: left;
		overflow:hidden;
	    text-overflow:ellipsis;
	    white-space:nowrap;
	}
	.articles_list .p_title .span2 {
		width: 30%;
		float: right;
		font-size: .12rem;
		color: #828282;
		font-weight: 200;
	}
	.articles_list .p_title .span2 .times{
		overflow:hidden;
	    text-overflow:ellipsis;
	    white-space:nowrap;
	}
	.articles_list .p_introduce {
		font-size: .12rem;
		line-height: .18rem;
		color: #CBCDD3;
		overflow:hidden;
	    text-overflow:ellipsis;
	    white-space:nowrap;
	}
	.articles_list .p_intro_img {
		padding-top: .07rem;
	}
	.articles_list .p_intro_img img{
		width: 100%;
	}
	ol li:hover{
		border:1px solid red;
	}
</style>
