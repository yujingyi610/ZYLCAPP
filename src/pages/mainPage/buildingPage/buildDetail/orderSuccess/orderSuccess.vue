<template>
    <div class="orderSuccess">
        <mt-header>
                <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        </mt-header>
        <div class="text-wrap">
            <p style="font-size: .32rem;">Hello,</p>
            <p style="font-size: .32rem;">美好生活 置业绿城</p>
            <p style="font-size: .12rem;">绿城官方产品与服务一站式直销平台</p>
        </div>
        <div class="content">
            <div class="user-wrap">
                <div style="float: left;">
                    <p class="title">预约姓名</p>
                    <p class="details">{{customName}}</p>
                </div>
                <div style="float: right; text-align: right;">
                    <p class="title">手机号码</p>
                    <p class="details">{{mobilePhone}}</p>
                </div>
            </div>
            <div class="prj-wrap">
                <div class="prj-pic-wrap">
                    <img v-if="uriwechat" :src="uriwechat" />
                    <img v-else src="http://temp.im/640x260/ccc" />
                </div>
                <div class="prj-right">
                    <p class="prj-name">{{estateName}}</p>
                    <p class="prj-addrs">{{projectAddress}}</p>
                    <p class="prj-price">均价<b>{{unitpriceshow}}</b>元/㎡</p>
                </div>
            </div>
            <div style="font-size:0;">
                <img src="static/assets/img_group@2x.png"/>
            </div>
            <div class="counselor-wrap">
                <div>
                    <div class="counselor-pic-wrap">
                        <img :src="photo" />
                    </div>
                    <div class="counselor-name-wrap">
                        <p class="counselor-name">{{propertyConsultName}}</p>
                        <p class="counselor-tag">金牌经纪人</p>
                    </div>
                </div>
                <div class="counselor-right">
                    <a :href="tel">
                        <img src="static/assets/icon_phone_call_1@2x.png" />
                    </a>

                </div>
            </div>
        </div>
        <div class="content-bottom">
            <div style="float: left;">
                <p class="text">美好生活</p>
                <p class="text">我们就从置业绿城开始！</p>
                <p class="text-tips">长按识别二维码<span class="arrows"><img src="static/assets/arrow@2x.png" /></span></p>
            </div>
            <div class="content-bottom-right">
                <img src="static/assets/img_crcard@2x.png" />
            </div>
        </div>
    </div>
</template>

<script>
import { Header, Button } from 'mint-ui';
    export default {
        components: {
			'mt-header': Header,
			'mt-button': Button
        },
        data() {
            return{
                estateName: '',
                estateId: '',
                projectAddress: '',
                unitpriceshow: '',
                uriwechat: '',
                customName: '',
                mobilePhone: '',
                propertyConsultName: '',
                propertyConsultMobile: '',
                photo: ''
          }
        },
        computed: {
            tel() {
                return 'tel:' +  this.propertyConsultMobile
            }
        },
        methods:{
            goBack() {// 返回
                this.$router.push({
                    path:'/mainPage/buildDetail',
                    query:{
                        'estateId': this.estateId,
                    },
                })
            }
        },
        created() {
            console.log(this.$route.params.info)
            let info = this.$route.params.info;
            this.estateName = info.estateName;
            this.estateId = info.estateId;
            this.projectAddress = info.projectAddress;
            this.unitpriceshow = info.unitpriceshow;
            this.uriwechat = info.uriwechat;
            this.customName = info.customName;
            this.mobilePhone = info.mobilePhone;
            this.propertyConsultName = info.propertyConsultName;
            this.propertyConsultMobile = info.propertyConsultMobile;
            this.photo = info.photo;
        }
    }
</script>

<style scoped>
@import './orderSuccess.css';
.mint-header{
    /* border-bottom: 1px solid #EAEBED; */
    color: #ffffff;
    background-color: transparent;
    position: fixed;
    z-index: 999;
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
</style>
