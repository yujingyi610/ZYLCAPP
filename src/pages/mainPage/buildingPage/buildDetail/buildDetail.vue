<template>
	<div class="build-detail">
		<mt-header :title="estateName">
			<mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
			<!--<mt-button slot="right">
				<i class="iconfont ice-fir">&#xe631;</i>
			</mt-button>
			<mt-button slot="right">
				<i class="iconfont ice-fir">&#xe63e;</i>
			</mt-button>-->
			<mt-button icon="more" slot="right" @click="showShare(estateId,1)" style="font-size:0.26rem;"></mt-button>
		</mt-header>
		<!-- <div class="detail-wrap"> -->
		<div class="detail-banner">

			<div class="main-pic-wrap">
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(o, index) in bannerList" :key="index" @click="showPicCarousel">
							<img class="main-pic" :src="o.uriwechat" />
						</div>
					</div>
				</div>
				<div class="swiper-pagination main-pic-num" ></div>
			</div>
			<div  class="estate-detail" v-for="(item, index) in tabList" :key="index" v-if="item.plateName === '基本信息'" :id="item.id">
				<div class="estate-header" >
					<div class="name">
						<div class="bd-title">{{estateName}}</div>
							<div class="tips_box" style="margin-top: -.1rem;">
							<span class="tips_left" v-for="(item, index) in labelList" :key="index">{{item.labelName}}</span>
						</div>
					</div>
				</div>
				<div class="estate-info">
					<div class="info-item price">
						<span class="info-item-title">均价: </span><span class="bold info-item-content">{{price}}<span style='font-size:0.16rem;font-weight:500;'><span style="font-size: .12rem;">元/㎡</span></span></span>
						<!--<img class="calculator info-item-arrows" src="static/assets/icon_calculator@2x.png" height="40" width="40" @click='goPage("calculator")'>-->
						<i class="iconfont" style="font-size: 0.26rem;color: rgba(37,176,126,1);" @click='goPage("calculator")'>&#xe636;</i>
					</div>
					<div class="info-item"><span class="info-item-title">开盘:  </span><span class="info-item-content" style="font-family: myFirstFont;">{{data.openDate}}</span><span class="iconfont" @click='goPage("newOpening")' style="padding-left: .2rem;">&#xe638;</span></div>
					<div class="info-item"><span class="info-item-title">地址:  </span><span class="info-item-content">{{data.address}}</span><span class="iconfont" @click="goPage('surrounding')" style="padding-left: .2rem;">&#xe638;</span></div>
					<div class="info-item"><span class="info-item-title">动态:  </span><span class="info-item-content"><span class="info-item-content-tag" v-if="newFlag !== '1'">最新</span>{{admEstateNewsDBO?admEstateNewsDBO.title:''}}</span><span class="iconfont" @click="goPage('dynamic')" style="padding-left: .2rem;">&#xe638;</span></div>

				</div>
			</div>
		</div>
		<div class="container1" style="top: 0.4rem; background: #fff; z-index: 12; display: none">
			<!--        吸顶        -->

			<nav-bar v-model="activeTab" class="nav-top nav-detail" style="width: 6.3rem; display: flex">
				<div style="width: 6.3rem">
					<tab-item style="padding-bottom:.20rem" :id="index + item.id" v-for="(item, index) in tabList" :key="index">{{item.plateName}}</tab-item>
				</div>
			</nav-bar>
		</div>
		<div class="container">
			<div class="detail bundle" v-for="(item, index) in tabList" :key="index" v-if="item.plateName === '楼盘亮点'" :id="item.id">
				<p class="d-title"><span class="bd-economic">楼盘亮点</span></p>
				<div class='detail-content'>
          			<wx-audio :brightVoice="brightVoice" ref="wxAudioRef"></wx-audio>
					<h4 class="build-h4">{{brightTittle}}</h4>
					<div class='brightSpotSummary'>{{brightDesc}}</div>
				</div>
				<div class="facility">
					<div class="facility-item" v-for="(a, index) in BrightList" :key="index">
						<span class="facility-item-pic"><img :src="a.briPhoto"/></span>
						<span class="facility-item-content">
	              			<span class="title">{{a.briTittle}}</span>
							<span class="details">{{a.briContent}}</span>
						</span>
					</div>
				</div>
			</div>
			<div class="agent bundle" v-for="(item, index) in tabList" :key="index" v-if="item.plateName === '官方顾问'" :id="item.id">
				<p class="d-title"><span class="bd-economic">官方顾问</span></p>
				<div class="tag-wrap">
				<span class="tag">专业服务</span>
				<span class="tag">绿城官方</span>
				<span class="tag">免费咨询</span>
				<span class="tag">户型分析</span>
				</div>
				<div class="agent-content">
					<div class="agent-content-item" v-for="(a, index) in brokerList" :key="index" v-if="index < 3" @click="goPage('orderCounselor', a)">
						<div class="agent-content-item-pic">
							<img :src="a.photo">
						</div>
						<div class="agent-content-item-name">
							<div class="name">{{a.userName}}</div>
							<div class="grade">{{a.userDesc}}</div>
						</div>
						<div class="agent-content-item-tel">
							<!--<img src='static/assets/icon_phone_call@3x.png' />-->
							<i class="iconfont bd-icon">&#xe64a;</i>
						</div>
					</div>
					<div class="agent-content-btn" @click="goPage('agent')">
						<div class="agent-content-btn-text">查看全部官方顾问</div>
					</div>
				</div>

			</div>
			<div class="house bundle" v-for="(item, index) in tabList" :key="index" v-if="item.plateName === '户型展示'" :id="item.id">
				<p class="d-title"><span class="bd-economic">户型展示</span><span class="more" @click="goPage('houseTypeList')"><span>更多</span><i class="iconfont">&#xe638;</i></span></p>
				<div class="row content-wrap">
					<div class="content-item" v-for="o in houseTypeList" :key="o.id" @click="goPage('houseTypeDetail', o.id)">
						<div class="pic-wrap">
							<img :src="o.picWechat" />
						</div>
						<div class="text-wrap">
							<span style="margin-right: 0.1rem">{{o.houseName}}</span>
							<span><b>{{o.houseArea}}</b>/㎡</span>
						</div>
						<div class="tags-wrap">
							<span class="tag-item" v-for="(item2, index2) in o.labelList" :key="index2">{{item2.labelName}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class='building-info bundle' v-for="(item, index) in tabList" :key="index" v-if="item.plateName === '楼栋信息'" :id="item.id">
				<p class="d-title"><span class="bd-economic">楼栋信息</span></p>
				<div class='content-wrap'>
					<div class='building-info-wrap'>
						<div class="building-info-content" id='buildingContent'>
							<img :src="aerialView" width="100%" height="100%">
							<span v-for="(o, i) in aerialViewLabel" :key="i" class="aerialView_label" :style="{top: o.percentY*100+'%', left: o.percentX*100 + '%'}">{{o.labelName}}</span>
						</div>
					</div>
					<div class="text-center" style="font-size: 0.15rem; line-height: .48rem;text-align: center">共{{count}}栋在售</div>
					<div class="text-center agent-content-btn-text" @click="goPage('houseInfo')">查看详细楼栋信息</div>
				</div>
			</div>
			<div class='peripheral bundle' v-for="(item, index) in tabList" :key="index" v-if="item.plateName === '周边概况'" :id="item.id">
				<p class="d-title"><span class="bd-economic">周边概况</span><span class="more" @click="goPage('surrounding')"><span>更多</span><i class="iconfont">&#xe638;</i></span></p>
				<nav-bar v-model="mapActiveTab" class="nav-detail">
					<tab-item id="公交">公交</tab-item>
					<tab-item id="地铁">地铁</tab-item>
					<tab-item id="医院">医院</tab-item>
					<tab-item id="学校">学校</tab-item>
					<tab-item id="公园">公园</tab-item>
				</nav-bar>
				<div class='content-wrap'>
					<div class='map-pic' id='allmap'></div>
					<div class='map-desc'>
						<i style="color:#333333;">免责条款</i><br/>
						<i style="color:#989CA8">本网显示房屋位置、交通、医疗教育、商业等配套信息，来源于第三方网络数据，不作为要约，仅供参考，双方具体权利和义务应以法律规定及买卖合同。</i>
					</div>
				</div>
			</div>
			<div class='building-details bundle' style="margin-top:0.24rem!important" v-for="(item, index) in tabList" :key="index" v-if="item.plateName === '楼盘详情'" :id="item.id">
				<p class="d-title"><span class="bd-economic">楼盘详情</span><span class="more" @click="goPage('floorDetail')"><span>查看全部</span><i class="iconfont">&#xe638;</i></span></p>
				<div class='content-wrap'>
					<div class='d-items'>
						<div class='name'>开&nbsp;&nbsp;发&nbsp;&nbsp;商</div>
						<div class='desc'>{{developUnitName}}</div>
					</div>
					<div class='d-items'>
						<div class='name'>物业服务</div>
						<div class='desc'>{{propertyUnitName}}</div>
					</div>
					<div class='d-items'>
						<div class='name'>产权年限</div>
						<div class='desc'>{{equity}}</div>
					</div>
					<div class='d-items'>
						<div class='name'>规划户数</div>
						<div class='desc'>{{totalRoomNum}}</div>
					</div>
				</div>
			</div>
			<div class='building-details bundle' style="border-bottom:0;">
				<p class="d-title" style="margin-top:0.24rem"><span class="bd-economic">更多楼盘</span></p>
				<div class='content-wrap'>
					<my-scroll :builds="builds"/>
				</div>
			</div>
		</div>
		<my-footer :isCollect="isCollect" :estateId="estateId"></my-footer>
		<mt-popup v-model="popupVisible" position="bottom">
			<div style="background: #F9F9FA;">
				<div class="popup-btn-wrap">
					<div>
						<span class="popup-btn-item" @click="shareFun">
							<i style="display:inline-block;width: 0.6rem;height: 0.6rem;background:white;margin-bottom: 0.09rem;padding-bottom: .015rem;border-radius: .04rem; ">
								<img src="../../../../../static/assets/icon_circle@2x.png" class="share-fir" />
							</i>
							<br/><i style="font-size:10px;">分享朋友圈</i>
						</span>
					</div>
					<span class="popup-btn-item">
						<i style="display: inline-block;width: 0.62rem;height: 0.62rem;background:white;margin-bottom: 0.08rem;border-radius: .04rem;">
							<i class="iconfont" style="font-size: 41px;margin-top: 11px;display: inline-block;color:#4cbf00;">&#xe631;</i>
						</i>
						<br/><i style="font-size:10px;">分享微信</i>
					</span>
				</div>
				<div class="popup-btn-wrap">
					<span class="popup-btn-item">
						<i style="border-radius: .04rem;display:inline-block;width: 0.6rem;height: 0.6rem;background:white;margin-bottom: 0.09rem;">
							<i class="iconfont icon-four" style="color:#808080">&#xe640;</i>
						</i>
						<br/><i style="margin-top:3px;font-size:10px;display: inline-block;">首页</i>
					</span>
					<span class="popup-btn-item">
						<i style="border-radius: .04rem;display:inline-block;width: 0.6rem;height: 0.6rem;background:white;margin-bottom: 0.09rem;">
							<i class="iconfont icon-four" style="color:#808080">&#xe646;</i>
						</i>
						<br/><i style="margin-top:3px;display: inline-block;font-size: 10px;">搜索</i>
					</span>
					<span class="popup-btn-item">
						<i style="border-radius: .04rem;display:inline-block;width: 0.6rem;height: 0.6rem;background:white;margin-bottom: 0.09rem;">
							<i class="iconfont icon-four" style="color:#808080">&#xe644;</i>
						</i>
						<br/><i style="margin-top:3px;display: inline-block;font-size: 10px;">我的关注</i>
					</span>
					<span class="popup-btn-item">
						<i style="border-radius: .04rem;display:inline-block;width: 0.6rem;height: 0.6rem;background:white;margin-bottom: 0.09rem;">
							<i class="iconfont icon-four" style="color:#808080">&#xe635;</i>
						</i>
						<br/><i style="margin-top:3px;display: inline-block;font-size: 10px;">复制链接</i>
					</span>
				</div>
				<div class="popup-cancel" @click="popupVisible = false" style="background:white">取消</div>
			</div>
		</mt-popup>
	</div>
</template>
<script>
import IScroll from "iscroll/build/iscroll-lite.js";

import { Navbar, TabItem } from "mint-ui";
import { Toast, MessageBox } from "mint-ui";
import { Header, Button } from "mint-ui";
import { Popup } from "mint-ui";

import { gotoShare } from '@/api/common/';

import Swiper from "swiper";

// import wx from "weixin-js-sdk";
// import PhotoSwipe from "photoswipe";
// import "photoswipe/dist/photoswipe.css";
// import util from "../../config/util";
import "@/assets/js/previewImage.min.js";

import wxAudio from "@/components/wx-audio/wx-audio.vue";

import Scroll from "@/components/scroll/scroll.vue";
import footer from "@/components/footer/footer.vue";

import picCarousel from "@/components/picCarousel/picCarousel.vue";

export default {
  // mixins: [previewImage],

  watch: {
    activeTab(newValue, oldValue) {
		let _this = this;
      function $$scrollTopValue(className) {
        return document.getElementById(className).offsetTop - 0.9 * _this.fontSize
	  }
	  function $$scrollBottomValue(className) {
        return (
          document.getElementById(className).offsetTop +
          document.getElementById(className).offsetHeight
        );
      }
      if (newValue != oldValue) {
        for (let i = 0; i < this.tabList.length; i++) {
          if (newValue === i + this.tabList[i].id) {
            if (
              $(window).scrollTop() >= $$scrollTopValue(this.tabList[i].id) &&
              $(window).scrollTop() <= $$scrollBottomValue(this.tabList[i].id)
            ) {
            } else {
              $(window).scrollTop($$scrollTopValue(this.tabList[i].id));
            }
          }
        }
        // switch(newValue) {
        //   case "0jbxx":
        //     $(window).scrollTop($$scrollTopValue('jbxx'));
        //     break;
        //   case "1lpld":
        //     $(window).scrollTop($$scrollTopValue('lpld'));
        //     break;
        //   case "2gfjjr":
        //     $(window).scrollTop($$scrollTopValue('gfjjr'));
        //     break;
        //   case "3hxzs":
        //     $(window).scrollTop($$scrollTopValue('hxzs'));
        //     break;
        //   case "4ldxx":
        //     $(window).scrollTop($$scrollTopValue('ldxx'));
        //     break;
        //   case "5zbgk":
        //     $(window).scrollTop($$scrollTopValue('zbgk'));
        //     break;
        //   case "6lpxq":
        //     $(window).scrollTop($$scrollTopValue('lpxq'));
        //     break;
        // }
        if (this.myScroll) {
          let index = newValue.substr(0, 1);
          if (index > 3) {
            this.myScroll.scrollTo(-90 * (index - 3), 0);
          }
          if (index < 1) {
            this.myScroll.scrollTo(0, 0);
          }
        }
      }
    },
    mapActiveTab(newValue, oldValue) {
      if (newValue != oldValue) {
        this.initMap();
      }
    }
  },
  computed: {
    fontSize() {
      return parseInt($("html").css("fontSize"));
    }
  },
  components: {
    "mt-header": Header,
    "mt-button": Button,
    "nav-bar": Navbar,
    "tab-item": TabItem,
    wxAudio,
    "my-scroll": Scroll,
    "my-footer": footer,
    picCarousel,
    "mt-popup": Popup
  },
  data() {
    return {
      myScroll: null,
      activeTab: "", //
      showFlag: false, // 是否显示全部置业顾问
      builds: [], // 更多楼栋
      mapActiveTab: "公交",
      addressX: "120.073933", // 地图坐标
      addressY: "30.291358", // 地图坐标
      // projectName: '这是个项目',// 用于地图
      scrollTop: 0, // 记录当前滚动高度
      totalPrice: null,
      estateId: this.$route.query.estateId, // 楼盘id

      estateName: null,
      labelList: [],
      price: null,
      beginSaleDate: null,
      projectaddress: null,
      admEstateNewsDBO: null,
      brightTittle: null,
      brightDesc: null,
      brightVoice: null,

      developUnitName: null,
      propertyUnitName: null,
      equity: null,
      totalRoomNum: null,

      bannerList: [], // banner图列表
      brokerList: [], // 经纪人列表
      BrightList: [], // 亮点列表
      houseTypeList: [], // 户型列表

      popupVisible: false,
      actions: [
        {
          name: "微信"
        }
      ],
      tabList: [], // 存放动态tab数据

      data: null,

	  isCollect: false, // 是否收藏

	  aerialView: null,// 楼栋信息图

		aerialViewLabel: [],// 楼栋信息图点
		count: 0,// 在售楼栋数

		newFlag: '1',// 楼盘动态是否展示‘最新’，‘1’无新动态
    };
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
    ajaxLogRequest(url, data, type) {
      const appId = "onlineSale";
      const appSecurect = "e9178578-845f-486c-bd18-5011c7472f72";
      const time = new Date().getTime();
      let sign = this.$md5(appId + time + appSecurect);
      let content = [];
      content.push(data);
      let jsonData = {
        appId: appId,
        time: time,
        sign: sign,
        content: content
      };
      if (type == "POST") {
        jsonData = JSON.stringify(jsonData);
        // let _url = 'https://partner-sso.gtdreamlife.com/api/logServer' + url; //测试环境log
        let _url = "https://ideallife-sso.gtdreamlife.com/api/logServer" + url; //正式环境log
        return this.Axios.post(
          _url,
          { jsonData: jsonData },
          { headers: { "Content-Type": 'application/x-www-form-urlencoded"' } }
        ).then(res => {
          //因为服务器的原因，这个功能不能使用
          console.log(res);
        });
      }
    },
    getBrowser() {
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
      };
      //判断是否firefox
      var isFireFox = function() {
        var i = navigator.userAgent.toLowerCase().indexOf("firefox");
        return i >= 0;
      };
      var info = "";
      var type = "";
      if (isIe()) {
        type = "IE浏览器";
      } else if (isFireFox()) {
        type = "火狐浏览器";
      }
			info = userAgent;
      /*info += "浏览器类型：" + type;
      info += "浏览器属性信息：" + userAgent;
      info += "浏览器的正式名称：" + appName;
      info += "浏览器的版本号：" + appVersion;
      info += "浏览器的是否启用了cookie：" + cookieEnabled;
      info += "cpu等级：" + cpuClass;
      info += "浏览器的MIME类型：" + mimeType.length;
      info += "系统平台：" + platform;
      info += "安装的插件：" + plugins;
      info += "插件的数量：" + plugins.length;
      info += "用户设置的操作系统语言：" + userLanguage;
      info += "操作系统支持的默认语言：" + systemLanguage;
      info += "javaEnabled：" + navigator.javaEnabled();
      info += "屏幕分辨率高度：" + window.screen.height;
      info += "屏幕分辨率宽度：" + window.screen.width;
      info += "颜色质量：" + window.screen.colorDepth + "位";
      info += "像素：" + window.screen.deviceXDPI + "像素/英寸";
      info += "字体是否平滑：" + window.screen.fontSmoothingEnabled;*/
      return info;
    },
    getPhoneType() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        return "Android";
      } else if (isiOS) {
        return "ios";
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    //分享
    showShare(mid,type){
			gotoShare(mid,type);
		},
    shareFun(goodsTitle, picUrl, price) {
      let url = "/app/3.0/WXShare/loadShareInfo";
      let data = {
        url: location.href.split("#")[0],
        token: localStorage.setItem("token")
      };
      this.Axios.post(url, data)
        .then(result => {
          //					http://192.168.1.10:8090/
          var link =
            this.$http.defaults.baseURL +
            "/wechat/sharelink.do?goodsId=" +
            this.goodsid +
            "&sourceOpenId=" +
            localStorage.getItem("openId");
          _appID_ = result.data.appID;
          _jsapi_ticket_ = result.data.jsapi_ticket;
          _signature_ = result.data.signature;
          _nonceStr_ = result.data.nonceStr;
          _timestamp_ = result.data.timestamp;

          _title_ = result.data.title;
          _desc_ = result.data.desc;
          _link_ = result.data.link;
          _imgUrl_ = result.data.imgUrl;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: _appID_, // 必填，公众号的唯一标识
            timestamp: _timestamp_, // 必填，生成签名的时间戳
            nonceStr: _nonceStr_, // 必填，生成签名的随机串
            signature: _signature_, // 必填，签名，见附录1
            jsApiList: [
              "checkJsApi",
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "onMenuShareQQ",
              "onMenuShareWeibo",
              "onMenuShareQZone"
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(function() {
            //var link = window.location.href;
            var _data_ = {
              title: _title_, // 分享标题
              desc: _desc_, // 分享描述
              link: _link_, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: _imgUrl_ // 分享图标
            };
            //分享朋友圈
            wx.onMenuShareTimeline({
              title: goodsTitle,
              link: link,
              imgUrl: picUrl, // 自定义图标
              trigger: function(res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回.
                //alert('click shared');
              },
              success: function(res) {
                //alert('shared success');
                //some thing you should do
              },
              cancel: function(res) {
                //alert('shared cancle');
              },
              fail: function(res) {
                //alert(JSON.stringify(res));
              }
            });
            //分享给好友

            wx.onMenuShareAppMessage({
              title: goodsTitle, // 分享标题
              desc: "价格：" + price + "元", // 分享描述
              link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: picUrl, // 自定义图标
              success: function() {
                // 用户确认分享后执行的回调函数
              },
              cancel: function() {
                // 用户取消分享后执行的回调函数
              }
            });
            //QQ
            wx.onMenuShareQQ({
              title: goodsTitle, // 分享标题
              desc: "价格：" + price + "元", // 分享描述
              link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: picUrl, // 自定义图标
              success: function() {
                // 用户确认分享后执行的回调函数
              },
              cancel: function() {
                // 用户取消分享后执行的回调函数
              }
            });
            //qq空间
            wx.onMenuShareQZone({
              title: goodsTitle, // 分享标题
              desc: "价格：" + price + "元", // 分享描述
              link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: picUrl, // 自定义图标
              success: function() {
                // 用户确认分享后执行的回调函数
              },
              cancel: function() {
                // 用户取消分享后执行的回调函数
              }
            });
            wx.error(function(res) {
              //                  alert(res.errMsg);
            });
          });
        })
        .catch(e => {
          console.log(e);
        });
    },
    handleGetEstateInfo() {
      // 获取楼盘详情
      this.tabList = [];
      this.Axios.post("/app/3.0/building_front/estateInfo", {
		id: this.estateId,
		userId: sessionStorage.getItem('userId')
      }).then(res => {
        console.log(res);
        if (res.code === 0) {
          this.data = res.data;
          this.data.id = this.estateId;

		  let data = res.data;

		  this.newFlag = data.newFlag;
          this.estateName = data.estateName; // 楼盘名称
          this.totalPrice = data.totalPrice ? data.totalPrice : ""; //总价
          this.price = data.price; // 均价
          this.beginSaleDate = new Date(data.beginSaleDate)
            .toLocaleString()
            .split(" ")[0]; // 开盘日期
          this.projectaddress = data.address; // 楼盘地址
          this.admEstateNewsDBO = data.admEstateNewsDBO; // 楼盘最新动态（一条）
          this.brightTittle = data.brightTittle; // 亮点主标题
          this.brightDesc = data.brightDesc; // 亮点介绍语
          this.brightVoice = data.brightVoice; // 亮点音频
          this.labelList = data.labelList; // 楼盘标签
          // setTimeout(()=>{
          //   if( this.brightVoice ){
          //     console.log(this.$refs)
          //     this.$refs.wxAudioRef.initData(this.brightVoice)
          //   }
          // },500)

          this.averagePrice = data.averagePrice; // 均价
          this.beginSaleDate = new Date(data.beginSaleDate)
            .toLocaleString()
            .split(" ")[0]; // 开盘日期
          this.projectaddress = data.projectaddress; // 楼盘地址
          this.admEstateNewsDBO = data.admEstateNewsDBO; // 楼盘最新动态（一条）
          this.brightTittle = data.brightTittle; // 亮点主标题
          this.brightDesc = data.brightDesc; // 亮点介绍语
          this.brightVoice = data.brightVoice; // 亮点音频

          this.addressX = data.addressX; // 地图坐标
          this.addressY = data.addressY; // 地图坐标

          this.developUnitName = data.developUnitName; // 开发商
          this.propertyUnitName = data.propertyUnitName; // 物业单位
          this.equity = data.equity; // 产权年限
          this.totalRoomNum = data.totalRoomNum; // 规划户数
          this.isCollect = data.isCollect;

          data.plateList.map(item => {
            if (item.delFlag === "0") {
              this.tabList.push(item);
            }
          });

          sessionStorage.setItem("estateName", this.estateName);
          sessionStorage.setItem("estateId", this.estateId);
          sessionStorage.setItem("projectId", data.projectId);
          sessionStorage.setItem("contactPhone", data.contactPhone);
          setTimeout(() => {
            this.initMap();
          }, 500);

          this.handleGetBannerList();
          this.handleGetEstateBrokerList();
          this.handleGetEstateBrightList();
          this.handleGethouseTypeList();
		  this.handleGetmoreEstateInfo();
		  this.handleGetbuildNewList()
		if( this.myScroll ){
			this.myScroll.refresh();
		}

        }
      });
    },
    handleGetBannerList() {
      // 获取banner
      this.Axios.post("/app/3.0/building_front/ablumList", {
        estateId: this.estateId
      })
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.bannerList = res.data;
          }
        })
        .then(() => {
          this.swiper.updateSlides();
        });
    },
    handleGetEstateBrokerList() {
      // 获取官方经济人列表
      this.Axios.post("/app/3.0/building_front/estateBrokerList", {
        estateId: this.estateId
      }).then(res => {
        console.log(res);
        if (res.code === 0) {
          this.brokerList = res.data.pageListData;
        }
      });
    },
    handleGetEstateBrightList() {
      // 获取亮点列表
      this.Axios.post("/app/3.0/building_front/estateBrightList", {
        estateId: this.estateId
      }).then(res => {
        console.log(res);
        if (res.code === 0) {
          this.BrightList = res.data.pageListData;
        }
      });
    },
    handleGethouseTypeList() {
      // 获取户型列表
      this.Axios.post("/app/3.0/building_front/newEstateHousePic", {
        estateId: this.estateId
      }).then(res => {
        console.log(res);
        if (res.code === 0) {
          this.houseTypeList = res.data;
        }
      });
    },
    handleGetbuildNewList() {
      // 获取标点
      this.Axios.post("/app/3.0/building_front/buildNewList", {
        estateId: this.estateId
      }).then(res => {
        console.log(res);
        if (res.code === 0) {
          // this.houseTypeList = res.data;
          this.aerialView = res.data.data.aerialView;
          this.count = res.data.count;
          this.aerialViewLabel = res.data.labelList;
        }
      });
    },
    handleGetmoreEstateInfo() {
      // 获取更多楼盘
      this.Axios.post("/app/3.0/building_front/moreEstateInfo", {
        estateId: this.estateId
      }).then(res => {
        console.log(res);
        if (res.code === 0) {
          this.builds = res.data;
        }
      });
    },
    goPage(pageName, params) {
      // 路由跳转
      $(window).unbind("scroll");
      if (pageName === "surrounding") {
        this.$router.push(
          pageName +
            "?addressX=" +
            this.addressX +
            "&addressY=" +
            this.addressY +
            "&estateName=" +
            this.estateName
        );
      } else if (pageName === "newOpening") {
        this.$router.push(pageName + "?estateId=" + this.estateId);
      } else if (pageName === "dynamic") {
		this.Axios.post("/app/3.0/building_front/insertEstateNewsIsScan", {
			estateId: this.estateId,
			userId: sessionStorage.getItem('userId')
		})
        this.$router.push(pageName + "?estateId=" + this.estateId);
      } else if (pageName === "calculator") {
        //      this.$router.push(pageName);
        this.$router.push({
          name: pageName,
          params: {
            totalPrice: this.totalPrice
          }
        });
      } else if (pageName === "agent") {
        this.$router.push("agent?estateId=" + this.estateId);
      } else if (pageName === "houseTypeList") {
        this.$router.push(pageName + "?estateId=" + this.estateId);
      } else if (pageName === "floorDetail") {
        this.$router.push({
          name: "floorDetail",
          params: {
            id: this.estateId
          }
        });
      } else if (pageName === "houseTypeDetail") {
        this.$router.push(pageName + "?estateId=" + this.estateId);
      } else if (pageName === "orderCounselor") {
        this.$router.push({
          name: "orderCounselor",
          params: {
            info: params,
            estateInfo: this.data
          }
        });
      } else if (pageName === "houseInfo") {
        this.$router.push(pageName + "?estateId=" + this.estateId);
      }
    },
    watchScroll() {
      // 监听滚动视图

      let offset = $(window).scrollTop();
      // debugger
      function $$offsetTop(className) {
        // console.log(className)
        // console.log($('#' + className))
        return document.getElementById(className).offsetTop;
      }

      function $$clientHeight(className) {
        return document.getElementById(className).clientHeight;
      }

      function $$select(index) {
        $(".mint-tab-item")
          .eq(index)
          .addClass("is-selected")
          .siblings()
          .removeClass("is-selected");
      }

      function $$scrollRange(className) {
        return $$offsetTop(className) + $$clientHeight(className) - 80;
      }

      if (this.tabList[0] && offset <= $$scrollRange(this.tabList[0].id)) {
        this.activeTab = 0 + this.tabList[0].id;
        $$select(0);
      } else if (
        this.tabList[1] &&
        offset <= $$scrollRange(this.tabList[1].id)
      ) {
        this.activeTab = 1 + this.tabList[1].id;
        $$select(1);
      } else if (
        this.tabList[2] &&
        offset <= $$scrollRange(this.tabList[2].id)
      ) {
        this.activeTab = 2 + this.tabList[2].id;
        $$select(2);
      } else if (
        this.tabList[3] &&
        offset <= $$scrollRange(this.tabList[3].id)
      ) {
        this.activeTab = 3 + this.tabList[3].id;
        $$select(3);
      } else if (
        this.tabList[4] &&
        offset <= $$scrollRange(this.tabList[4].id)
      ) {
        this.activeTab = 4 + this.tabList[4].id;
        $$select(4);
      } else if (
        this.tabList[5] &&
        offset <= $$scrollRange(this.tabList[5].id)
      ) {
        this.activeTab = 5 + this.tabList[5].id;
        $$select(5);
      } else if (
        this.tabList[6] &&
        offset <= $$scrollRange(this.tabList[6].id)
      ) {
        this.activeTab = 6 + this.tabList[6].id;
        $$select(6);
      }

      // if(offset <= $$scrollRange('jbxx')){
      // 	this.activeTab = '0jbxx'
      // 	$$select(0);
      // }else if(offset <= $$scrollRange('lpld')){
      // 	this.activeTab = '1lpld'
      // 	$$select(1)
      // }else if(offset <= $$scrollRange('gfjjr')){
      // 	this.activeTab = '2gfjjr'
      // 	$$select(2)
      // }else if(offset <= $$scrollRange('hxzs')){
      // 	this.activeTab = '3hxzs'
      // 	$$select(3)
      // }else if(offset <= $$scrollRange('ldxx')){
      // 	this.activeTab = '4ldxx'
      // 	$$select(4)
      // }else if(offset <= $$scrollRange('zbgk')){
      // 	this.activeTab = '5zbgk'
      // 	$$select(5)
      // }else if(offset <= $$scrollRange('lpxq')){
      // 	this.activeTab = '6lpxq'
      // 	$$select(6)
      // }else{
      // 	this.activeTab = '6lpxq'
      // 	$$select(6)
      // }
      let bannerHeight = $(".estate-header").outerHeight();
      // console.log(offset)
      // console.log(bannerHeight)
      if (offset > bannerHeight) {
        $(".container1").css("display", "flex");
        $(".container1").css("position", "fixed");
        // if (this.tabList[this.tabList.length - 1]) {
        //   $("#" + this.tabList[this.tabList.length - 1].id).css(
        //     "margin-top",
        //     24
        //   );
        // }

        $(".footer").css({
          display: "flex"
        });
      } else {
        $(".container1").css("position", "initial");
        $(".container1").css("display", "none");
        $(".footer").css({
          display: "none"
        });
        // if (this.tabList[this.tabList.length - 1]) {
        //   $("#" + this.tabList[this.tabList.length - 1].id).css(
        //     "margin-top",
        //     0
        //   );
        // }
      }
    },
    initMap() {
      // 初始化地图
      var _this = this;
      this.mapObj = new BMap.Map("allmap");
      let point = new BMap.Point(this.addressX, this.addressY);
      let marker = new BMap.Marker(point); // 创建标注
      this.mapObj.centerAndZoom(point, 15);
      // this.mapObj.disableDragging();
      this.mapObj.addOverlay(marker);
      let opts = {
        position: point, // 指定文本标注所在的地理位置
        offset: new BMap.Size(10, -30) //设置文本偏移量
      };
      var local = new BMap.LocalSearch(this.mapObj, {
        renderOptions: {
          map: this.mapObj,
          autoViewport: true,
          selectFirstResult: false
        }
      });
      local.search(this.mapActiveTab);
      let label = new BMap.Label(this.estateName, opts); // 创建文本标注对象
      label.setStyle({
        color: "#00B96D",
        fontSize: "12px",
        backGround: "#fff",
        height: "20px",
        lineHeight: "18px",
        fontFamily: "微软雅黑",
        padding: "0 10px",
        border: "1px solid #fff",
        maxWidth: "none"
      });
      this.mapObj.addOverlay(label);
      label.addEventListener("click", function() {
        $(window).unbind("scroll");
        _this.$router.push(
          "surrounding?addressX=" +
            _this.addressX +
            "&addressY=" +
            _this.addressY +
            "&estateName=" +
            _this.estateName
        );
      });
      this.mapObj.addEventListener("click", function() {
        $(window).unbind("scroll");
        _this.$router.push(
          "surrounding?addressX=" +
            _this.addressX +
            "&addressY=" +
            _this.addressY +
            "&estateName=" +
            _this.estateName
        );
      });
    },
    showPicCarousel() {
      // 展示大图
      // this.carouselFlag = true;
      // $('#picCarousel').show()
      // this.scrollTop = $(window).scrollTop();
      // $('body').css("top",-top+"px");//给body一个负的top值；
      //       $('body').css("position",'fixed');//给body增加一个类，position:fixed;
      // console.log(this.scrollTop)

      this.$router.push("picCarousel?estateId=" + this.estateId);
      // $('#picCarousel').fadeIn("fast")
      // document.body.style.overflow='hidden';
    },
    closeCarouse() {
      // this.carouselFlag = false;
      // console.log(this.scrollTop)
      // $(window).scrollTop(this.scrollTop);
      // console.log($(window).scrollTop())
      // console.log(this.scrollTop)
      // $('#picCarousel').hide(); //弹出层消失
      //       $('body').css("position",'');//去掉给body的类
      //       $(window).scrollTop(top);//设置页面滚动的高度，如果不设置，关闭弹出层时页面会回到顶部。
    }
  },
  created() {
    // $(".menu").hide();
    // document.title = "楼盘详情";
  },
  mounted() {
    if (this.$route.query.estateId) {
      this.estateId = this.$route.query.estateId;
    } else {
      this.$router.push("/");
    }

    $(window)
      .unbind("scroll")
      .bind("scroll", this.watchScroll);
    // $('.build-detail').scrollTop(0);
    // this.initMap();
    this.swiper = new Swiper(".swiper-container", {
      pagination: {
        el: ".swiper-pagination",
        type: "fraction"
      }
    });
    this.handleGetEstateInfo();

    setTimeout(() => {
      // var myScroll = new IScroll("#wrapper", { scrollX: true, scrollY: false });
      this.myScroll = new IScroll(".container1", {
        // mouseWheel : true,      //鼠标滚轮支持
        scrollbars: false, //滚动条支持
        scrollY: false, //滚动方向（垂直）
        scrollX: true, //滚动方向（水平）
        bounce: true, //边界时的反弹动画，默认true
        click: true, //IScroll默认禁止了点击事件，如需绑定点击事件，请将该参数值设为true
        // freeScroll : true,      //当需要执行两个纬度上的滚动时（即横向、纵向都开启），设置该参数，默认为false
        startX: 0, //滚动条开始的位置（横坐标）
        startY: 0, //滚动条开始的位置（纵坐标）
        // tap : true,             //设置为true时，允许为用户点击或者触摸（并没有滚动时）触发一个自定义事件，或者设置值为一个自定义事件名称的字符串
		// snap : 'li'             //对齐（根据元素li对齐切割整个容器）
		onBeforeScrollStart: function(e) {
          if (this.absDistX > this.absDistY + 5) {
            e.preventDefault();
          }
        },
        //解决第一次无法滑动的问题
        onTouchEnd: function() {
          var self = this;
          if (self.touchEndTimeId) {
            clearTimeout(self.touchEndTimeId);
          }
          self.touchEndTimeId = setTimeout(function() {
            self.absDistX = 0;
            self.absDistY = 0;
          }, 600);
        }
      });

      // console.log(this.$route.query.index)
      // let index = this.$route.query.index;
      // let index = 0;
      // this.chooseOneIndex = Number(index);
      // this.chooseOne = this.navList[index];
      // if( index && index > 3 ){

      //   this.myScroll.scrollTo(-90,0);
      // }
      // $('body').bind("touchmove",function(e){
      // 		e.preventDefault();
      // });
    }, 500);
    //浏览记录记载
    if (sessionStorage.getItem("userId")) {
      let url = "/app/3.0/Browse/EstateBrowse";
      let data = {
        estateId: this.estateId
      };
      this.Axios.post(url, data)
        .then(res => {
          if (res.code == 0) {
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  deactivated() {
    this.$destroy(true);
  }
};
</script>
<style scoped="scoped">
@import "./detail.css";
* {
  -webkit-overflow-scrolling: touch;
}
@font-face {
  font-family: myFirstFont;
  src: url("../../../../assets/style/Bold.ttf");
}
/* .build-detail{
  position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
} */

.overlay-building {
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  height: 100%;
  width: 100%;
}

.overlay-building .building-info-wrap {
  height: auto;
  width: 100%;
  position: absolute;
  top: 50%;
  margin-top: -237.5px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.build-detail
  .detail-banner
  .estate-detail
  .estate-info
  .info-item[data-v-a9449614] {
  margin-bottom: 0.12rem;
  font-size: 0.16rem;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.build-h4 {
  margin: 0.15rem 0 0.075rem 0;
}
.bd-title {
  font-size: 24px;
}
.bd-economic {
  font-size: 21px;
}
.tag-wrap .tag[data-v-a9449614] {
  line-height: 0.11rem;
  font-size: 0.11rem;
  width: 0.5rem;
  height: 0.15rem;
  display: inline-block;
}
.agent-content .agent-content-btn[data-v-a9449614] {
  margin-bottom: 0.24rem;
}
.bd-icon {
  font-size: 22px;
  line-height: 0.36rem;
  color: rgba(37, 176, 126, 1);
}
.ice-fir {
  font-size: 0.26rem;
  /*vertical-align: top;*/
}
.mintui-more:before {
  font-size: 0.26rem;
}
.build-detail .container p.d-title .more i[data-v-a9449614] {
  margin-left: 3px;
}
.build-detail
  .detail-banner
  .estate-detail
  .estate-info
  .info-item[data-v-a9449614] {
  line-height: 0.2rem;
}
/* .facility .facility-item .facility-item-pic img[data-v-a9449614] {
  margin-top: 0.09rem;
} */
.build-detail .container p.d-title[data-v-a9449614] {
  margin-bottom: 0.32rem;
}
.build-detail .container .bundle[data-v-a9449614] {
  margin-top: 0.24rem;
}
.build-detail
  .detail-banner
  .estate-detail
  .estate-info
  .info-item
  .info-item-content
  .info-item-content-tag[data-v-a9449614] {
  margin-right: 0;
}
#buildingContent img {
  border-radius: 8px;
}
/*#989CA8*/
.build-detail .nav-detail a.is-selected[data-v-a9449614] {
  text-decoration: none;
  color: #00b573 !important;
  /*background: #00B573 !important;*/
  /*border-bottom: 2px solid #fff;*/
  color: black !important;
  font-size: 0.14rem;
  font-weight: 700;
  margin-bottom: 0 !important;
}
.build-detail .nav-top.nav-detail a[data-v-a9449614] {
  color: #989ca8;
}
.build-detail .nav-detail a[data-v-a9449614] {
  color: #989ca8;
}
.building_group .building_item[data-v-584614ef] {
  margin-top: 0;
}
.building_group .building_item .address[data-v-584614ef] {
  margin-top: 0.06rem;
}
.building_group .building_item .price[data-v-584614ef] {
  line-height: 0.24rem;
}
.build-detail .container .content-wrap[data-v-a9449614] {
  padding: 0 0.2rem 0.24rem !important;
}
.build-detail .container p.d-title[data-v-a9449614][data-v-a9449614] {
  margin-bottom: 0.15rem;
  overflow: hidden;
}
.mint-tab-item-label {
  font-size: 15px;
}
.agent-content-item[data-v-a9449614] {
  height: 0.57rem;
}
.build-detail .container .bundle[data-v-a9449614] {
  padding-bottom: 0.2rem;
}
.build-detail .container .bundle[data-v-a9449614][data-v-a9449614] {
  padding-bottom: 0;
}

.popup-btn-item[data-v-a9449614] {
  margin-right: 0.23rem;
}
.popup-btn-item img {
  width: 0.36rem;
  height: 0.36rem;
}
.share-fir {
  width: 0.36rem;
  height: 0.39rem;
  display: inline-block;
  color: #25b07e;
  margin-top: 11px;
}
.icon-four {
  font-size: 0.36rem;
  margin-top: 0.12rem;
  display: inline-block;
}
.agent-content-item .agent-content-item-name[data-v-a9449614] {
  margin-left: 0.12rem;
}
.agent-content-item .agent-content-item-name .grade[data-v-a9449614] {
  margin-top: 3px;
}
.build-detail
  .container
  .bundle
  .content-item
  .tags-wrap
  .tag-item[data-v-a9449614] {
  color: #25b07e;
  border: 1px solid #25b07e;
  border-radius: 4px;
  width: 0.5rem;
  height: 0.15rem;
  font-size: 11px;
  padding: 4px;
}
.build-detail .container .bundle .content-item .text-wrap[data-v-a9449614] {
  height: 32px;
}
.build-detail .detail-content .brightSpotSummary {
  margin-bottom: 0.215rem;
}
.aerialView_label{
	position: absolute;
	/* top: 0; */
	background: #25B07E;
	display: inline-block;
	padding: 0.05rem;
	color: #fff;
	border-radius: .06rem;
	font-size: 0.12rem
}
</style>
