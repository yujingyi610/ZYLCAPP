<template>

	<div class="nav" ref="wrapperh">
		<div class="contents">
			<ol>
				<li v-for='(item,index) in builds' :key="item.id" >
					<div class='building_picture' @click='goDetail(item.id,index)'>
						<img v-lazy="item.images">
						<!--<img v-lazy="item.images==null?'http://temp.im/640x260/ccc':item.images">-->
					</div>

					<p class='name'>
						<span style="float: left; font-size: .15rem; font-weight: 600;">{{item.estateName?item.estateName:''}} </span>
						<span class="iconfont lvcheng" :class="item.favorite==true?'icon-lvcheng_shoucang-yishoucang':'icon-lvcheng_shoucang-changgui'" @click="follow(item)"></span>
					</p>
					<p class="address">{{item.projectAddress?item.projectAddress:''}}</p>
					<p class="icon_collect" style='padding-top:.09rem'>均价 <span class="price">{{item.price?item.price:''}}</span> 元/㎡</p>

					<p class='build_tag' style="margin-top:.045rem;line-height: .19rem;">
						<span class="my_label" v-for='a in item.labels' :key="a" style="font-size: .11rem;">{{a?a:''}}</span>
					</p>
				</li>
			</ol>
		</div>
	</div>

</template>
<script>
	import BScroll from 'better-scroll'
	import {Toast} from 'mint-ui'
	export default {
		data(){
			return {
				looks: 0,
			}
		},
		props: ['builds', 'tt','type'],
		mounted() {
//			window.addEventListener('scroll', this.handleScroll);
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
			goto: function(link) {
				this.$emit('topMethod', link)
			},
			follow (item) {


				let data = {
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
			goDetail(estateId,index) {
				//content埋点start
					var subtype = '0'+(index+1);
					var type = this.type;
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
//				this.$router.push('/mainPage/buildDetail/'+ estateId)
				this.$router.push({
					path: '/mainPage/buildDetail',
					query: {
						'estateId': estateId,
					},
				})
			},
			_initScrollh() {
				if (!this.scrollh) {
				    this.scrollh = new BScroll(this.$refs.wrapperh, {
				       click: false,
					scrollY: false,
					scrollX: true
				    });
				}else{
				    this.scroll.refresh();
				}
			},
		},
		mounted() {
			setTimeout(() => {
				this.$nextTick(()=>{
					this._initScrollh();
				})

			},200)
		}
	}
</script>
<style scoped>

	.nav {
		width: 100%;
		position: absolute;
		top: 0rem;
		height: 2.5rem;
		background: white;
		box-sizing: border-box;
		overflow: hidden;
	}

	.nav .contents {
		float: left;
	}

	.nav .contents ol {
		white-space: nowrap;
	}

	.nav .contents ol li {
		display: inline-block;
		width: 2.47rem;
		padding: 0 .1rem;
		height: 2.5rem;
		vertical-align: middle;
	}

	.nav .building_picture {
		width: 2.47rem;
		height: 1.39rem;
		margin-top: .1rem;
	}

	.nav .building_picture img {
		width: 100%;
		height: 100%;
		border-radius: .04rem;
	}

	.nav .name {
		font-size: 0.15rem;
		color: #333333;
		line-height: 0.19rem;
		height: 0.19rem;
		padding-top: .12rem;
	}
	.nav .name .lvcolors{
		color: #25B07E;
	}

	.nav .name .lvcolor {

	}
	.nav .address {
		font-family: PingFangSC-Regular;
		font-size: 0.12rem;
		color: #989CA8;
		padding-top: 0.04rem;
		line-height: .12rem;
		height: .12rem;
	}

	.nav .icon_collect {
		font-family: PingFangSC-Regular;
		font-size: 0.12rem;
		color: #333333;
		line-height: 0.16rem;
		height: 0.16rem;
		padding-top: 0.05rem;
		vertical-align: middle;
	}

	.nav .icon_collect .price {
		font-family: DINAlternate-Bold;
		font-size: 0.18rem;
		color: #333333;
	}

	.nav .build_tag {
		padding-top: 0.07rem;
		font-size: .12rem;
		color: #6BA686;
		height: .19rem;
	}

	.nav .build_tag .my_label {
		background: #e4f5ec;
		padding: 0 .03rem;
		border-radius: .04rem;
		margin-right: .04rem;
	}
	.lvcheng {
		font-size: .26rem;
		color: #25B07E;
		float: left;
		margin-top: 0.03rem;
		margin-left: .08rem;
	}

	.nav .build_tag .my_label:first-child {}
</style>
