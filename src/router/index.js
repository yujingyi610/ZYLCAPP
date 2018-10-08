import Vue from 'vue'
import Router from 'vue-router'

import { MessageBox } from 'mint-ui';

//引入组件
import MainPage from '@/pages/mainPage';//App页面入口
import Home from '@/pages/mainPage/homePage';//首页

import Building from '@/pages/mainPage/buildingPage';//楼盘
import buildDetail from '@/pages/mainPage/buildingPage/buildDetail/buildDetail.vue';//楼盘详情
import calculator from '@/pages/mainPage/buildingPage/buildDetail/calculator/calculator.vue';//房贷计算器
import houseInfo from '@/pages/mainPage/buildingPage/buildDetail/houseInfo/houseInfo.vue';//房源信息
import newOpening from '@/pages/mainPage/buildingPage/buildDetail/newOpening/newOpening.vue';// 最新开盘
import surrounding from '@/pages/mainPage/buildingPage/buildDetail/surrounding/surrounding.vue';// 全屏地图
import dynamic from '@/pages/mainPage/buildingPage/buildDetail/dynamic/dynamic.vue';// 动态详情
import dynamicDetail from '@/pages/mainPage/buildingPage/buildDetail/dynamic/dynamicDetail/dynamicDetail.vue';// 动态详情
import agent from '@/pages/mainPage/buildingPage/buildDetail/agent/agent.vue';// 官方经纪人
import houseTypeList from '@/pages/mainPage/buildingPage/buildDetail/houseTypeList/houseTypeList.vue';// 户型列表
import floorDetail from '@/pages/mainPage/buildingPage/buildDetail/floorDetail/floorDetail.vue';// 楼盘详情（全部信息）
import HousesPic from '@/pages/mainPage/buildingPage/buildDetail/HousesPic/HousesPic.vue';// 楼盘相册
import orderPage from '@/pages/mainPage/buildingPage/buildDetail/orderPage/orderPage.vue';// 预约项目
import orderSuccess from '@/pages/mainPage/buildingPage/buildDetail/orderSuccess/orderSuccess.vue';// 预约成功
import orderCounselor from '@/pages/mainPage/buildingPage/buildDetail/orderCounselor/orderCounselor.vue';// 预约顾问
import houseTypeDetail from '@/pages/mainPage/buildingPage/buildDetail/houseTypeDetail/houseTypeDetail.vue';// 户型详情
import houseTypePic from '@/pages/mainPage/buildingPage/buildDetail/houseTypeDetail/houseTypePic/houseTypePic.vue';// 户型大图
import picCarousel from '@/components/picCarousel/picCarousel.vue';// 相册大图

//首页组件
import CityList from '@/components/cityList/cityList.vue';//城市列表
import Shaixuan from '@/components/shaixuan';//筛选页面

import ArticleList from '@/pages/mainPage/homePage/components/articleList.vue';// 文章列表
import ArticleInfo from '@/pages/mainPage/homePage/components/articleInfo.vue';// 文章列表详情页

import FindHouseByMap from '@/pages/mainPage/homePage/components/findHouseByMap.vue';// 地图找房
import FindHouseByMapDetail from '@/pages/mainPage/homePage/components/findHouseByMapDetail.vue';// 地图找房

import noticeInfo from '@/pages/mainPage/infomationPage/components/noticeInfo.vue';// 公告详情页

import Infomation from '@/pages/mainPage/infomationPage';//资讯
import infoDetail from '@/pages/mainPage/infomationPage/components/infoDetail.vue';//资讯详情

//我的
import Mine from '@/pages/mainPage/minePage';//我的
import personalData from '@/pages/mainPage/minePage/components/personalData';//个人资料
import myAppointment from '@/pages/mainPage/minePage/components/myAppointment';//我的预约
import myAttention from '@/pages/mainPage/minePage/components/myAttention';//我的关注
import myHistory from '@/pages/mainPage/minePage/components/myHistory';//浏览历史

import Login from '@/pages/mainPage/minePage/components/login';//登录
import Register from '@/pages/mainPage/minePage/components/register';//注册
import Passwordlogin from '@/pages/mainPage/minePage/components/password_login';//密码登录
import Forgotpassword from '@/pages/mainPage/minePage/components/forgot_Password';//忘记密码
import ModifyPassword from '@/pages/mainPage/minePage/components/ModifyPassword';//忘记密码

import feedback from '@/pages/mainPage/minePage/components/feedback';//意见反馈




// import demo from '@/pages/demo.vue';//意见反馈
// import HelloWorld from '@/pages/HelloWorld.vue';//意见反馈

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'MianPage',
      component:MainPage,
      children:[
        {
          path:'/',
          redirect:'mainPage'
        },
        {
          path:'mainPage',
          component:MainPage,
          children:[
            {
              path:'/',
              redirect:'home'
            },
            {
              path:'/',
              component:Home,
            },
            {
              path:'home',//首页
              component:Home,
            },
            {
              path:'cityList',//城市列表
              component:CityList
            },
            {
              path:'shaixuan',//筛选
              component:Shaixuan
            },
            {
              path:'building',//楼盘入口
              component:Building,
            },
            {
              path:'buildingList',//楼盘列表
              component:Building,
            },
            {
              path:'buildDetail',//楼盘详情
              component:buildDetail,
            },
            {
              path:'houseInfo',// 房源信息
              component: houseInfo
            },
            {
              path: 'calculator',
              name:'calculator',
              component: calculator// 房贷计算器
            },
            {
              path: 'newOpening',
              component: newOpening// 最新开盘
            },
            {
              name: 'surrounding',
              path: 'surrounding',
              component: surrounding// 全屏地图
            },
            {
              name: 'dynamic',
              path: 'dynamic',
              component: dynamic// 楼盘动态
            },
            {
              name: 'dynamicDetail',
              path: 'dynamicDetail',
              component: dynamicDetail// 动态详情
            },
            {
              path: 'agent',
              component: agent// 官方经纪人
            },
            {
              path: 'houseTypeList',
              component: houseTypeList// 户型列表
            },
            {
              path: 'houseTypeDetail',
              component: houseTypeDetail// 户型详情
            },
            {
              path: 'houseTypePic',
              component: houseTypePic// 户型大图
            },
            {
              name: 'floorDetail',
              path: 'floorDetail',
              component: floorDetail// 楼盘详情
            },
            {
              path: 'HousesPic',
              component: HousesPic// 楼盘相册
            },
            {
              path: 'picCarousel',
              component: picCarousel// 相册大图
            },
            {
              path: 'orderPage',
              component: orderPage// 预约项目
            },
            {
              name: 'orderCounselor',
              path: 'orderCounselor',
              component: orderCounselor// 预约顾问
            },
            {
              name: 'orderSuccess',
              path: 'orderSuccess',
              component: orderSuccess// 预约成功
            },
            {
              path:'infomation',
              component:Infomation,
            },
            {
              path:'mine',
              component:Mine,
            },
            {
							name: 'articleList',  //文章list
							path:'/articleList',
							component:ArticleList,
						},
						{
							name: 'articleInfo',  //文章详情
							path:'/articleList/articleInfo',
							component:ArticleInfo,
            },
            {
							name: 'findHouseByMap',
							path:'/findHouseByMap',
							component:FindHouseByMap,
            },
            {
							name: 'noticeInfo',  //文章详情
							path:'/noticeInfo',
							component:noticeInfo,
            },
						{
							name: 'findHouseByMapDatail',
							path:'/findHouseByMapDatail',
							component:FindHouseByMapDetail,
						},
          ],
        },


      ]
    },
		{
			name: 'infoDetail',//资讯列表
			path:'/infoDetail',
			component:infoDetail,
		},
		{
			name: 'personalData',//个人资料
			path:'/mine/personalData',
			component:personalData,
		},
		{
			name: 'myAppointment',//我的预约
			path:'/mine/myAppointment',
			component:myAppointment,
		},
		{
			name: 'myAttention',//我的关注
			path:'/mine/myAttention',
			component:myAttention,
		},
		{
			name: 'myHistory',//浏览历史
			path:'/mine/myHistory',
			component:myHistory,
		},
		{
			name: 'feedback',//意见反馈
			path:'/mine/feedback',
			component:feedback,
		},
		{
			name: 'login',//登录
			path:'/login',
			component:Login,
		},
		{
			name: 'passwordlogin',//密码登录
			path:'/passwordlogin',
			component:Passwordlogin,
		},
		{
			name: 'forgotpassword',//忘记密码
			path:'/forgotpassword',
			component:Forgotpassword,
    },
    {
			name: 'ModifyPassword',//修改密码
			path:'/ModifyPassword',
			component:ModifyPassword,
		},
		{
			name: 'register',//
			path:'/register',
			component:Register,
		},
		{
			name: 'myAppointment',//我的预约
			path:'/mine/myAppointment',
			component:myAppointment,
		},
		{
			name: 'myAttention',//我的关注
			path:'/mine/myAttention',
			component:myAttention,
		},
		{
			name: 'myHistory',//浏览历史
			path:'/mine/myHistory',
			component:myHistory,
		},
		{
			name: 'feedback',//意见反馈
			path:'/mine/feedback',
			component:feedback,
    },
  ]
})

export default router

// router.beforeEach((to, from, next) => {
//   if (to.fullPath.indexOf('/mine/') !== -1) {
//     if( sessionStorage.getItem() )
//     next();
//     return;
//   }

// })

