<template>
	<div id="personalData" class="personalData">
		<mt-header title="个人信息">
			<mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        </mt-header>
		<div class="ml_list">
			<div class="f-left">头像</div>
			<div class="f-right" @click="openFileUpload">
				<span class="rl"><img :src="customPhoto" alt=""></span>
				<form style="display: none">
					<input type="file" accept="image/*" capture="camera" @change="GetPic($event)" id="fileInput">
					<!-- <input type="submit" id="fileSubmit" name="Submit" value="上传" @click="submitPic"/> -->
				</form>
				<span class="rr iconfont">
					&#xe638;
					<!--<img src="../../../../../static/assets/icon_right@2x.png" alt="" class="icon_more" >-->
				</span>
			</div>
			
		</div>
		<div class="ml_list">
			<div class="f-left">昵称</div>
			<div class="f-right">
				<span class="rl">
					<input type="text" placeholder="请输入昵称" v-model="customName"/>
				</span>
				<span class="rr iconfont">
					&#xe638;
					<!--<img src="../../../../../static/assets/icon_right@2x.png" alt="" class="icon_more" >-->
				</span>
			</div>
			
		</div>
		<div class="ml_list">
			<div class="f-left">密码</div>
			<div class="f-right">
				<span class="rl" @click="forgotpassword">
					<!--<input type="password" placeholder="请输入密码" v-model="password"/>-->
					修改密码
				</span>
				<span class="rr iconfont">
					&#xe638;
					<!--<img src="../../../../../static/assets/icon_right@2x.png" alt="" class="icon_more" >-->
				</span>
			</div>
			
		</div>
		<div class="ml_list">
			<div class="f-left">手机号</div>
			<div class="f-right">
				<span class="rl">{{mobilePhone}}</span>
				<span class="rr">
					
				</span>
			</div>
			
		</div>
		<div>
			<div class="save_btn" @click="handleSave">保存</div>
		</div>
	</div>
</template>

<script>
import { Header, Button, Toast } from "mint-ui";
	export default {
		name:'personalData',
		data() {
			return {
				customName: "",
				password: null,
				customPhoto: null,// 展示用的url
				mobilePhone: null,
				photoUrl: null,// 上传用的url
			}
		},
		components: {
			"mt-header": Header,
    		"mt-button": Button
		},
		created() {
			
		},
		mounted() {
			this.handleGetCustomInfo()
		},
		filters: {

		},
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			forgotpassword () {
				this.$router.push('/forgotpassword')
				sessionStorage.setItem("revise","修改密码")
			},
			openFileUpload() {
				$('#fileInput').click()
			},
			GetPic(e) {
				let $target = e.target || e.srcElement
				let file = $target.files[0]
				var reader = new FileReader()
				reader.onload = (data) => {
					let res = data.target || data.srcElement
					this.customPhoto = res.result
					console.log(data)
				}
				reader.readAsDataURL(file)

				this.submitPic()
			},
			submitPic() {
				let _this = this;
				var formData = new FormData(); 
				formData.append('upfile', $('#fileInput')[0].files[0]);  //添加图片信息的参数
				// formData.append('jobId', getTimeMs());  //请求ID
				// formData.append('token', currentToken);  //用户登录标识
				
				$.ajax({
					type:'POST',
					url: 'https://zylc1.gtdreamlife.com/file/upload/api',
					cache: false, //上传文件不需要缓存
					data: formData,
					dataType:'JSON',
					processData: false, // 告诉jQuery不要去处理发送的数据
					contentType: false, // 告诉jQuery不要去设置Content-Type请求头
					success: function(result) {
						console.log(result)
						if(result.code == '0'){// 接口请求成功，正确返回
							_this.photoUrl = result.data;
							console.log(_this.photoUrl)
						}
					}	
				});
			},
			handleGetCustomInfo() {// 获取用户信息
				this.Axios.post('/app/3.0/personUser/Personinfolist', {
					
				}) //返回字段暂缺
				.then(res=> {
					if( res.code === 0 ){
						let data = res.data;
						this.customName = data.customName ? data.customName : '';
						this.password = data.password;
						this.customPhoto = data.customPhoto;
						this.mobilePhone = data.mobilePhone;
					}
				})
			},
			handleSave() {// 保存
				// this.submitPic()
				this.Axios.post('/app/3.0/personUser/Personinfoupdate', {
					id: "1",
					customName: this.customName,
					password: this.password,
					customPhoto: this.photoUrl ? this.photoUrl : this.customPhoto
				}) //返回字段暂缺
				.then(res=> {
					if( res.code === 0 ){
						Toast({
							message: '保存成功！',
							iconClass: 'icon icon-success'
						});
						this.$router.push('/mainPage/mine')
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.personalData{
		font-size: .14rem;
		color: #373C43;
		*{
			box-sizing: border-box;
		}
		.mint-header{
			border-bottom: 1px solid #EAEBED;
			color: #000;
			background-color: #fff;
		}
		h1 {
			margin: .67em 0;
		}
		label{
			font-weight: 100;
			font-size: .12rem;
		}
		.mintui{
			font-size: .14rem;
		}

		input{
			text-align: right;
			outline: none;
			border: none;
		}
		.save_btn{
			font-size: .17rem;
			color: #FFFFFF;
			width: 2.95rem;
			background: #25B07E;
			margin: .4rem auto;
			text-align: center;
			border-radius: .04rem;
			line-height: .45rem;
		}
		.ml_list{
			margin: 0 0 0 .18rem;
			padding: .2rem .18rem .2rem 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: .01rem solid #EAEBED;;
			.f-left{
				
			}
			.f-right{
				float: right;
				display: flex;
				align-items: center;
				.rl{
					margin-right: .12rem;
					img{
						width: .25rem;
						height: .25rem;
						border-radius: .14rem;
						
					}
				}
				.rr{
					color: #989CA8;
					.icon_more{
						width: .18rem;;
					}
				}
			}
		}
		
	}
	
</style>
