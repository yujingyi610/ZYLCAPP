<template>
    <div id="houseInfo">
        <mt-header title="房源信息">
			<mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        </mt-header>
        <div class="content" :style="{bottom: bottom}">
            <div class="aerialView-wrap">
                <img :src="aerialView" height="100%">
                <span v-for="(o, i) in aerialViewLabel" :key="i" 
                class="aerialView_label" 
                :style="{top: o.percentY*100+'%', left: o.percentX*100 + '%'}"
                @click="handleShowBuildInfo(o)">{{o.labelName}}</span>
            </div>
        </div>
        
        <transition name="alert">
            <div class="change" v-if="buildInfo">
                <h2 class="title">{{buildInfo.buildingName}}</h2>
                <p class="buildItem">单元：{{buildInfo.unitCount}}个</p>
                <p class="buildItem">层数：{{buildInfo.floorCount}}层</p>
                <p class="buildItem">户数：{{buildInfo.houseCount}}户</p>
                <div class="hosueType-wrap">
                    <div class="houseTypeItem" v-for="(item, index) in buildInfo.houseList" :key="index">
                        <img :src="item.picWechat" />
                        <p>{{item.houseName}} <b>{{item.housearea}}</b>/㎡</p>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { Header, Button } from "mint-ui";

import { Popup } from "mint-ui";
    export default {
        components: {
            "mt-header": Header,
            "mt-button": Button,
            "mt-popup": Popup
        },
        data() {
            return{
                popupVisible: false,

                aerialView: null,// 楼栋信息图
                aerialViewLabel: [],// 楼栋信息图点
                
                estateId: this.$route.query.estateId,

                buildList: [],
                buildInfo: null,// 单个楼栋的信息

                bottom: 0
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            handleGetbuildNewList() {
                // 获取标点
                this.Axios.post("/app/3.0/building_front/buildNewList", {
                    estateId: this.estateId
                }).then(res => {
                    if (res.code === 0) {
                        this.aerialView = res.data.data.aerialView;
                        this.aerialViewLabel = res.data.labelList;
                        this.buildList = res.data.buildList;// 存所有楼栋
                    }
                });
            },
            handleShowBuildInfo(o) {// 点击某个楼栋标签，显示该楼栋数据
                this.buildList.map(item=>{
                    if( item.id === o.buildingId ){
                        this.buildInfo = item;
                        console.log(this.buildInfo)
                        this.popupVisible = true;
                        this.bottom = '2.5rem'
                    }
                })
            }
        },
        created() {
            console.log(111)
            this.handleGetbuildNewList()
        }
    }
</script>

<style scoped>
#houseInfo{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 999;
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
.aerialView-wrap{
    position: relative;
    /* height: 100%; */
    width: fit-content;
}
.aerialView_label{
	position: absolute;
	/* top: 0; */
	background: #25B07E;
	display: inline-block;
	padding: 0.08rem;
	color: #fff;
	border-radius: .06rem;
    font-size: 0.14rem;
    transform: translate(-50%, -150%);
}
.content{
    position: absolute;
    top: 0.4rem;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-x: auto;
    /* overflow-y: hidden; */
    z-index: -1;
}

.alert-enter-active {
    animation: bounce-in 1s;
}

.alert-leave-active {
    animation: bounce-out 1s;
}

@keyframes bounce-in {
    0% {
        transform: translateY(2.5rem);
    }
    100% {
        transform: translateY(0);
    }
}

@keyframes bounce-out {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(2.5rem);
    }
}

.change{
    width: 100%;
    background: #fff;
    height: 2.5rem;
    position: fixed;
    bottom: 0rem;
    padding: .2rem;
    box-sizing: border-box;
}
.title{
    font-size: .24rem;
    color: #333;
    line-height: 0.5rem;
}
.buildItem{
    color: #989CA8;
    font-size: .14rem;
    line-height: .2rem;
}
.hosueType-wrap{
    white-space: nowrap;
}
.houseTypeItem{
    width: 1.56rem;
    display: inline-block;
    margin-right: .1rem;
}
.houseTypeItem img{
    width:1.56rem;
    height: .9rem;
}
.houseTypeItem p{
    text-align: center;
    line-height: .2rem;
}
</style>