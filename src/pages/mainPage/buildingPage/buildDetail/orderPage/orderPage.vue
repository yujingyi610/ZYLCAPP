<template>
    <div class="orderPage">
        <mt-header>
            <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        </mt-header>
        <div class="content-wrap">
            <div class="content">
                <div style="padding: 0 .18rem;">
                    <p style="color: #989CA8; line-height: .16rem;">预约项目</p>
                    <div class="title">{{estateName}}</div>
                </div>
                <div style="padding: 0 .18rem;">
                    <div class="input-item">
                        <p class="input-title">姓名</p>
                        <input type="text" placeholder="请输入您的姓名" v-model="name" @change="handlenameFlag()" style="width: 100%"/>
                        <span class="span" v-if="nameFlag === 1">姓名不可为空</span>
                        <span class="span" v-if="nameFlag === 2">请输入有效的姓名</span>
                        <span class="span icon_span iconfont" v-if="nameFlag === 3">&#xe668;</span>
                    </div>
                    <div class="input-item">
                        <p class="input-title">手机号码</p>
                        <input type="text"  placeholder="请输入您的手机号码"  v-model="tel" @change="handlephoneFlag()" style="width: 100%"/>
                        <span class="span" v-if="telFlag === 1">手机号不可为空</span>
                        <span class="span" v-if="telFlag === 2">请输入有效的手机号</span>
                        <span class="span icon_span iconfont" v-if="telFlag === 3">&#xe668;</span>
                    </div>
                    <div class="input-item">
                        <p class="input-title">验证码</p>
                        <div>
                            <input type="text"  placeholder="请输入短信验证码" v-model="CAPTCHA" @change="handlecodeFlag()"/>
                            <span class="span" v-if="codeFlag === 1">验证码不可为空</span>
                            <span class="span" v-if="codeFlag === 2">请输入有效验证码</span>
                            <span class="span icon_span iconfont" v-if="codeFlag === 3">&#xe668;</span>
                            <span v-if="smsCodeFlag" class="get_CAPTCHA" @click="GET_CAPTCHA">获取验证码</span>
                            <span v-if="!smsCodeFlag" class="get_CAPTCHA">{{timeNum}}秒后重试</span>
                        </div>
                    </div>
                </div>
                <div style="background: #25B07E; margin: 0.1rem 0 .2rem;">
                    <img src="static/assets/img_Combined Shape@2x.png" />
                </div>
                <div>
                    <div class="submit_btn" @click="handleSubmit">提交</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { Header, Button, Toast } from 'mint-ui';
    export default {
        components: {
            'mt-header': Header,
            'mt-button': Button
        },
        computed: {
            estateName() {
                return sessionStorage.getItem('estateName')
            }
        },
        data() {
            return{
                name:'',
                tel:sessionStorage.getItem("userPhone")?sessionStorage.getItem("userPhone"):'',
                CAPTCHA:'',
                nameFlag: 0,
                telFlag: 0,
                codeFlag:0,
				smsCodeFlag:true,
				timeNum:60
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            GET_CAPTCHA() {
                let reg=/^1[3456789]\d{9}$/;
				//手机验证
				if ( this.tel === '') {
					//非空
					this.telFlag = 1;
        		}else if( !reg.test(this.tel) ) {
        			//非正常手机号
        			this.telFlag = 2;
        		}else {
        			//正确
        			this.telFlag = 3;
        			this.smsCodeFlag = false;
					this.clock();
                    this.Axios.post('/app/3.0/customresever/sendcode',
                    {
                        mobilePhone: this.tel,
                        estateId: sessionStorage.getItem('estateId')

                    }).then((res)=> {
                        if(res.code == 0) {
                            Toast({
                                message: '发送成功！',
                            });
                            //this.smsCodeFlag = false;
//							this.clock();
						}else{
                            Toast({
                                message: res.msg,
                            });
                        }
                    })
                }
            },
            handlenameFlag(){// 验证姓名
				let reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
				if ( !this.name) {
					//非空
                    this.nameFlag = 1;
                    return
        		}else if( !reg.test(this.name) ) {
        			//非正常
                    this.nameFlag = 2;
                    return
        		}else {
        			//正确
        			this.nameFlag = 3;
        		}
            },
            //验证手机号
			handlephoneFlag(){
				let reg = /^1[3456789]\d{9}$/;
				if ( !this.tel) {
					//非空
                    this.telFlag = 1;
                    return
        		}else if( !reg.test(this.tel) ) {
        			//非正常手机号
                    this.telFlag = 2;
                    return
        		}else {
        			//正确
        			this.telFlag = 3;
        		}
            },
            //验证码
			handlecodeFlag () {
				let regs = /^[0-9]{4}$/
				if ( !this.CAPTCHA) {
					//非空
                    this.codeFlag = 1;
                    return
        		}else if( !regs.test(this.CAPTCHA) ) {
        			//非正常手机号
                    this.codeFlag = 2;
                    return
        		}else {
        			//正确
        			this.codeFlag = 3;
        		}
            },
            clock(){// 验证码倒计时
				let timeIndex = setInterval(()=>{
					this.timeNum -= 1;
					if(this.timeNum == 0){
						this.smsCodeFlag = true;
						clearInterval(timeIndex);
						this.timeNum = 60;
					}
				},1000)
			},
            handleSubmit() {
                this.handlenameFlag()
                this.handlephoneFlag()
                this.handlecodeFlag()
                if( this.nameFlag === 3 && this.codeFlag === 3 && this.telFlag === 3 ){
                    this.Axios.post('/app/3.0/customresever/PanKeList',
                        {
                            customName: this.name,
                            projectId: sessionStorage.getItem('projectId'),
                            mobilePhone: this.tel,
                            securityCode: this.CAPTCHA,
                            estateId: sessionStorage.getItem('estateId')
                        }
                    ).then((res)=> {
                        if( res.code === 0 ){
                            Toast({
                                message: '预约成功！',
                                iconClass: 'icon icon-success'
                            });
                            //this.$router.push('/mainPage/mine')
                            this.$router.push({
                              name: 'orderSuccess',
                              params:{
                                info:res.data
                              }
                            })
                        }else if(res.code === 2){
                          Toast({
                              message: '验证码错误！',
                              iconClass: 'icon icon-error'
                          });
                        }
                    })
                }

            }
        },
    }
</script>

<style scoped>
@import './orderPage.css';

</style>
