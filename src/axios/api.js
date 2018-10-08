import axios from 'axios'
//import router from './router'
import Router from 'vue-router'

const service = axios.create({
	// baseURL: process.env.BASE_API, // api的base_url
	timeout: 100000 // 请求超时时间
});

service.defaults.withCredentials = true;
service.defaults.data = {}
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//var token = localStorage.getItem("token");
//service.defaults.headers.common['Authentication'] = token;
service.defaults.transformRequest = [function (data) {
	let ret = ''
	for (let it in data) {
		ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
	}
	return ret
}];

// 最后编译出来就是  cache   getTimestamps 在对象上  get post 在原型上  好处 避免变量污染
export default class Request {
	constructor() {
		
		// 优化版
		this.getTimestamps =  async (url, data, method) => {
			
				return service[method](url, { ...data})
			
		 
		}
	}
	get(url, data) {
		return this.getTimestamps(url, data, 'get')
	}
	post(url, data) {
		return this.getTimestamps(url, data, 'post')
	}
	
}

/*服务加载时，获取token*/
//function getUrlKey(name){
//       return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
//}
//token = token||getUrlKey('token');

// 请求拦截器
service.interceptors.request.use(function (config) {
	if (localStorage.getItem("token")) {
		config.headers.token = localStorage.getItem("token");
	}else {
//		Router.replace({
//          path: '/login'
//      })
	}
	return config;
}, function (error) {
	return Promise.reject(error);
});
// 响应拦截器
service.interceptors.response.use(
	response => {

		if (response.code == 0) {
//			Router.replace({
//          	path: '/login'
//      	})
		} else {
			return response.data;
		}
	},
	error => {
		console.log('err' + error); // for debug
		return Promise.reject(error);
	}
);

