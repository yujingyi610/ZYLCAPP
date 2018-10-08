<template>
    <div id="picCarousel" style="overflow: hidden;">
        <mt-header>
            <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
            <mt-button slot="right" @click="goAllPicPage">全部图片</mt-button>
        </mt-header>
        <div class="swipe">
            <div class="swipe-wrap">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(o, index) in picList[activeIndex]" :key="index">
                            <img class="main-pic" :src="o.uriwechat"/>
                        </div>
                    </div>
                     <!--<div class="swiper-pagination main-pic-num" style="color:white;"></div>-->
                </div>
                 <div class="swiper-pagination main-pic-num" style="color:white;"></div>
            </div>

            <!-- <mt-swipe :show-indicators="false" :auto="0">
                <mt-swipe-item style="text-align: center; vertical-align:middle;"><span></span><img src="http://temp.im/640x260/ccc" /></mt-swipe-item>
                <mt-swipe-item style="text-align: center; vertical-align:middle;"><span></span><img src="http://temp.im/640x260/c1c" /></mt-swipe-item>
                <mt-swipe-item style="text-align: center; vertical-align:middle;"><span></span><img src="http://temp.im/640x260/85c" /></mt-swipe-item>
            </mt-swipe> -->
        </div>
        <!-- <div class="num">1/<span>43</span></div> -->
        <div class="footer-tags-wrap">
            <span :class="activeIndex === index?'footer-tags active':'footer-tags'" v-for="(item, index) in picList" :key="index" @click="activeIndex = index">{{item[0].albumTypeName}}({{item.length}})</span>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
import { Header, Button } from 'mint-ui';
import { Swipe, SwipeItem } from 'mint-ui';
    export default {
        components: {
            'mt-header': Header,
            'mt-button': Button,
            // 'mt-swipe': Swipe,
            // 'mt-swipe-item': SwipeItem,
        },
        watch: {
            activeIndex() {
                console.log(this.picList[this.activeIndex])
                // this.swiper.updateSlides();
                // this.swiper.update(); //swiper更新

                // console.log(this.swiper)
                this.$nextTick(() => {
                    this.swiper = null;
                    this.swiper = new Swiper('.swiper-container', {
                        pagination: {
                            el: '.swiper-pagination',
                            type: 'fraction',
                            //-----------------
                            loop:true,
                            direction : 'horizontal'
                        },
                    });
                })
            }
        },
        data() {
            return{
                flag: false,
                picList: [],
                activeIndex: 0,
                swiper: null
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
                // $('#picCarousel').fadeOut("fast")
                //  document.body.style.overflow='initial';
                // this.$emit('close')
            },
            handleGetAlbumListInfo() {// 获取所有相册
                this.picList = [];
                this.Axios.post("/app/3.0/building_front/albumListInfo", { estateId: this.$route.query.estateId}).then(res=>{
                    console.log(res)
                    if( res.code === 0 ){
                        let data = res.data;

                        for( let key in data ){
                            if( key.indexOf('data') != -1 && data[key].length > 0 ){
                                this.picList.push(data[key])
                            }
                        }
                        console.log(this.picList)
                        console.log(this.picList[this.activeIndex])
                    }
                }).then(()=>{
                    this.swiper.updateSlides();

                })
            },
            goAllPicPage() {
                this.$router.push('/mainPage/HousesPic?estateId=' + this.$route.query.estateId);
            }
        },
        mounted() {
            // $(window).scrollTop(0)
            // document.body.style.overflow='hidden';
            this.handleGetAlbumListInfo()
            this.swiper = new Swiper('.swiper-container', {
                pagination: {
                    el: '.swiper-pagination',
                    type: 'fraction',
                },
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                bserveParents:true,//修改swiper的父元素时，自动初始化swiper
            });

        }
    }
</script>

<style scoped>
@import "./picCarousel.css";
#picCarousel{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    z-index: 2;
    /* display: none; */
}
img{
    width: 100%;
    vertical-align: middle
}
.swipe {
    position: absolute;
    top: .4rem;
    bottom: .4rem;
    left: 0;
    right: 0;
}
.swipe span{height: 100%;vertical-align: middle;display: inline-block}
.footer-tags-wrap{
    color: #ffffff;
    font-size: .12rem;
    height: .4rem;
    position: absolute;
    bottom: 0;
    line-height: .4rem;
    width: 100%;
    padding: 0 .2rem;
    white-space: nowrap;
    overflow-x: auto;
}
.footer-tags{
    padding: .05rem;
    margin-right: .1rem;
    border-radius: 0.04rem;
}
.footer-tags.active{
    background: #3E3F44
}
.num{
    color: #fff;
    font-size: .18rem;
    text-align: center;
    position: absolute;
    width: 100%;
    bottom: .45rem;
    font-family: PingFangSC-Regular;
}
.num span{
    font-size: .15rem;
}
.swipe-wrap{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
</style>
