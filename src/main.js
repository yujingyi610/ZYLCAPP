// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import './assets/style/index.scss';
import 'swiper/dist/css/swiper.css';
import echarts from 'echarts'
//import axios from 'axios'
import axios from '@/axios/api.js';
import './filter';
import IScrollView from 'vue-iscroll-view'
import IScroll from 'iscroll'
import VueLazyload from 'vue-lazyload'
//es6转换
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
//新增md5加密
import md5 from 'js-md5'
Vue.prototype.$md5 = md5
Vue.use(IScrollView, IScroll);
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;
Vue.use(Mint);

//Vue.prototype.Axios = axios;
Vue.prototype.Axios = new axios();
Vue.use(VueLazyload, {
	error: '', //这个是请求失败后显示的图片
	loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503918972251&di=5ab7e7f7d2b030702a1ed1d99bde8a59&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3De9378a7b083387449c902778643ff5cf%2F1f178a82b9014a90e9109296ad773912b31beeeb.jpg', //这个是加载的loading过渡效果
	try: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
