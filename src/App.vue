<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	import axios from 'axios'
	import router from './router'
	export default {
		watch:{
			
		},
		created() {
			
//			axios.defaults.withCredentials = true;
//			axios.defaults.data = {}
//			axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//			//axios.defaults.headers.common['Authentication'] = token;
//			axios.defaults.transformRequest = [function(data) {
//				let ret = ''
//				for(let it in data) {
//					ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//				}
//				return ret
//			}];
//
//			// 请求拦截器
//			axios.interceptors.request.use(function(config) {
//				if(localStorage.getItem("token")) {
//					config.headers.token = localStorage.getItem("token");
//				}
//				return config;
//			}, function(error) {
//				return Promise.reject(error);
//			});
//			// 响应拦截器
//			axios.interceptors.response.use(
//				response => {
//
//					if(response.status !== 200) {
//
//					} else {
//						return response.data;
//					}
//				},
//				error => {
//					console.log('err' + error); // for debug
//					return Promise.reject(error);
//				}
//			);

		}
	}
</script>

<style>
	@import "./assets/style/wx-audio.css";
	#app {
		/* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
		/* margin-top: 60px; */
	}
</style>